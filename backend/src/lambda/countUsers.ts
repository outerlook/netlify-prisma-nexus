import { Handler } from "@netlify/functions";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const handler: Handler = async (event, context) => {
  const usuariosCount = await prisma.user.count()
  return {
    statusCode: 200,
    body: `There are ${usuariosCount} users`,
  };
};

export { handler };
