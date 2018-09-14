const { GraphQLServer } = require('graphql-yoga')

// 1

let links = [{
    id: 'link-0',
    url: 'howtographql.com',
    description: 'Fullstack tutorial for graphql'
}]

let idCount = links.length
console.log(idCount);
// 2
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links
    },

    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        }
    }
}

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))