const db = require('../mysql/connection');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull} = require('graphql');

// response type
const loginType = new GraphQLObjectType({
    name: 'Login',
    description: 'Login type',
    fields: {
        id: {
            type: GraphQLString,
        },        
        user_id: {
            type: GraphQLString,
        },
        gender: {
            type: GraphQLString,
        },
        dob: {
            type: GraphQLString,
        },        
        is_verified: {
            type: GraphQLID,
        },       
        jwt_token: {
            type: GraphQLString,
        }
    },
});

// response sql query
function emailLoginSQL(source, args, root, ast) {
    const sql = "SELECT u.id,u.user_id,u.gender,u.dob,ep.is_verified FROM de_user u, de_user_emails_phones ep where u.user_id=ep.user_id and type=1 and value=? and password=?";
    return new Promise(resolve => {
        db.query(sql, [args.email, args.password], (error, results) => {
            let response = {};
            if (results.length && results[0].user_id) {
                response = Object.assign(response, results[0], {
                    jwt_token: '637u2jiht925oiwenfoienr923j5092j3roiwealk',
                });
            }
            resolve(response);
        });
    });
}

// api function
const emailLoginQuery = {
    type: loginType,
    description: 'Email Login query',
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve(source, args, root, ast) {
        return emailLoginSQL(source, args, root, ast);
    },
};

// export
module.exports = {emailLoginQuery, loginType, emailLoginSQL};