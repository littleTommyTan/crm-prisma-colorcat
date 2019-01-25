import * as jwt from 'jsonwebtoken';

import { prisma } from '../generated/prisma-client';

interface Context {
  request: any;
}
export enum Identity {
  Creator,
  Editor
}

export async function Certify(context: Context, args, identity) {
  const token = context.request.header("authorization");
  if (token) {
    const { userId } = jwt.verify(token, "crm-mc-colorcat") as {
      userId: string;
    };
    const adminName = await prisma.admin({ id: userId }).name();
    if (identity === Identity.Creator) {
      return { ...args, creator: adminName, creatorId: userId };
    }
    return {
      ...args,
      editor: adminName,
      editorId: userId,
      editedAt: new Date().toString()
    };
  }
  throw new AuthError();
}

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}
