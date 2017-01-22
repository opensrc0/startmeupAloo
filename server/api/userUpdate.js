const db = require('../mysql/connection');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull} = require('graphql');

// response type
const userUpdateType = new GraphQLObjectType({
    name: 'UserUpdate',
    description: 'User update type',
    fields: {
        user_id: {
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
});

// response sql query
function userUpdateSQL(source, args, root, ast) {
    const sql = "UPDATE de_user SET password = ?, name = ?, gender = ?, dob = ? WHERE user_id = ?";
    return new Promise(resolve => {
        db.query(sql, [args.name, args.job, args.user_id], (error, results) => {
            resolve(args);
        });
    });
}

// api function
const userUpdateQuery = {
    type: userUpdateType,
    description: 'user update query',
    args: {
        password: {
            type: GraphQLString,
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
        user_id: {
            type: new GraphQLNonNull(GraphQLString),
        },        
    },
    resolve(source, args, root, ast) {
        return userUpdateSQL(source, args, root, ast);
    },
};

// export
module.exports = {userUpdateQuery, userUpdateType, userUpdateSQL};