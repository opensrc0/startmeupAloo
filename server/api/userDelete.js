const db = require('../mysql/connection');
const {GraphQLObjectType, GraphQLBoolean, GraphQLID, GraphQLNonNull} = require('graphql');

// response type
const userDeleteType = new GraphQLObjectType({
    name: 'UserDelete',
    description: 'User delete type',
    fields: {
        deleted: {
            type: GraphQLBoolean,
        },
    },
});

// response sql query
function userDeleteSQL(source, args, root, ast) {
    const sql = "DELETE FROM de_user WHERE user_id = ?";
    return new Promise(resolve => {
        db.query(sql, [args.user_id], (error, results) => {
            resolve({deleted: true});
        });
    });
}

// api function
const userDeleteQuery = {
    type: userDeleteType,
    description: 'user delete query',
    args: {
        user_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve(source, args, root, ast) {
        return userDeleteSQL(source, args, root, ast);
    },
};

// export
module.exports = {userDeleteQuery, userDeleteType, userDeleteSQL};