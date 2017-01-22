const {GraphQLSchema, GraphQLObjectType} = require('graphql');
const {emailLoginQuery} = require('./api/login');
const {userListQuery} = require('./api/userList');
const {userCreateQuery} = require('./api/userCreate');
const {userUpdateQuery} = require('./api/userUpdate');
const {userDeleteQuery} = require('./api/userDelete');

// schema
const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'All read only API queries',
        fields: {
            login: emailLoginQuery,
            userList: userListQuery,
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        description: 'All writing API queries',
        fields: {
            userCreate: userCreateQuery,
            userUpdate: userUpdateQuery,
            userDelete: userDeleteQuery,
        }
    }),
});

// export
module.exports = Schema;