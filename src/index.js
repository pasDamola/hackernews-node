const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')


const resolvers = {
    Query,
    Mutation,
    AuthPayload
}

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://us1.prisma.sh/oyincode-3cafd3/database/dev',
            secret: 'mysecret123',
            debug: true,
        }),
    }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))