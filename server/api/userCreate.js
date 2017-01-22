const db = require('../mysql/connection');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull} = require('graphql');

// response type
const userCreateType = new GraphQLObjectType({
    name: 'UserCreate',
    description: 'User create type',
    fields: {
        user_id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },        
        gender: {
            type: GraphQLString,
        },
        dob: {
            type: GraphQLString,
        },  
    },
});

// response sql query
function userCreateSQL(source, args, root, ast) {
    const sql = "INSERT INTO de_user SET user_id = ?, password = ?, name=?, gender=?, dob=?";
    return new Promise(resolve => {
        db.query(sql, [args.user_id, args.password], (error, results) => {
            const response = Object.assign({}, args, {
                user_id: results.insertId,
            });
            resolve(response);
        });
    });
}

// api function
const userCreateQuery = {
    type: userCreateType,
    description: 'user create query',
    args: {
        user_id: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        },    
        name: {
            type: GraphQLString,
        },            
        gender: {
            type: GraphQLString,
        },
        dob: {
            type: GraphQLString,
        },        
    },
    resolve(source, args, root, ast) {
        return userCreateSQL(source, args, root, ast);
    },
};

// export
module.exports = {userCreateQuery, userCreateType, userCreateSQL};