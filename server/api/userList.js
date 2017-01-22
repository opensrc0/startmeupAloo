const db = require('../mysql/connection');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');

// response type
const postsType = new GraphQLObjectType({
    name: 'Posts',
    description: 'User posts list',
    fields: {
        post_id: {
            type: GraphQLID,
        },
        title: {
            type: GraphQLString,
        },
        body: {
            type: GraphQLString,
        }
    }
});

const userListType = new GraphQLObjectType({
    name: 'UserList',
    description: 'User list type',
    fields: {
        user_id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        job: {
            type: GraphQLString,
        },
        posts: {
            type: new GraphQLList(postsType),
        }
    },
});

// response sql query
function userListSQL(source, args, root, ast) {
    // pagination params
    const page = (args.page > 1) ? args.page : 1;
    const per_page = (args.per_page > 1) ? args.per_page : 10;
    const offset = (page - 1) * per_page;

    // check if we have the posts fields active so we can do a join
    let joinPosts = false;
    for (const field of ast.fieldASTs[0].selectionSet.selections) {
        if (field.name.value === 'posts') {
            joinPosts = true;
            break;
        }
    }

    // build the sql
    // @todo it should only fetch the requested fields not *
    let sql = "SELECT * FROM user LIMIT ?, ?";
    if (joinPosts) {
        sql = "SELECT * FROM (SELECT * FROM user LIMIT ?, ?) AS u "+
            "JOIN post AS p USING (user_id) "+
            "ORDER BY u.user_id, p.post_id";
    }

    // db call
    return new Promise(resolve => {
        db.query(sql, [offset, per_page], (error, results) => {
            if (joinPosts) {
                // make sure you add the posts as nested data when joining
                let new_results = [];
                for (const result of results) {
                    new_results[result.user_id] = new_results[result.user_id] ||
                        Object.assign({}, result, {posts: []});
                    new_results[result.user_id].posts.push(result);
                }
                results = new_results;
            }
            resolve(results);
        });
    });
}

// api function
const userListQuery = {
    type: new GraphQLList(userListType),
    description: 'User list query',
    args: {
        page: {
            type: GraphQLInt,
        },
        per_page: {
            type: GraphQLInt,
        },
    },
    resolve(source, args, root, ast) {
        return userListSQL(source, args, root, ast);
    },
};

// export
module.exports = {userListQuery, userListType, userListSQL};