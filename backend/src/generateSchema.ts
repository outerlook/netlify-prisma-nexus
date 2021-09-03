import {makeSchema, mutationType, objectType, queryType} from "nexus";
import {nexusPrisma} from "@kenchi/nexus-plugin-prisma";
import * as path from "path";

const GENERATING_SCHEMA = process.env.GENERATING_SCHEMA;

const generatingSchemaOnly = GENERATING_SCHEMA ? {
    contextType: {
        module: require.resolve("./context"),
        export: "Context"
    },
    sourceTypes: {
        modules: [
            {
                module: require.resolve(".prisma/client/index.d.ts"),
                alias: "prisma"
            }
        ]
    },
    outputs: {
        schema: path.join(__dirname, "./schema.graphql"),
        typegen: path.join(__dirname, "./generated/generated-schema-nexus.ts")
    }
} : {}

export const schema = makeSchema({
        types: {
            Mutation: mutationType({
                definition: t => {
                    t.crud.createOneUser()
                }
            }),
            Query: queryType({
                definition: t => {
                    t.crud.users()
                }
            }),
            Users: objectType({
                name: "User", definition: t => {
                    t.model.id();
                    t.model.name();
                    t.model.email();
                }
            })
        },
        plugins: [
            nexusPrisma({
                experimentalCRUD: true,
                outputs: {typegen: path.join(__dirname, "./generated/nexus-prisma.ts")}
            })
        ],
        ...generatingSchemaOnly
    })
;
