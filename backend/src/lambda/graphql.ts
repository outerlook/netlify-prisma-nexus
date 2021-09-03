import {PrismaClient} from "@prisma/client";
import {ApolloServer} from "apollo-server-lambda";
import {schema} from "../generateSchema";
import {Handler} from "@netlify/functions";

const prisma = new PrismaClient();

export const server = new ApolloServer({
    schema,
    context: {prisma}
});


const handler: Handler = (event, context, callback) => {
    return server.createHandler({})(event, context, callback);
};


export {handler};
