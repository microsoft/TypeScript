// @declaration: true

// @Filename: /node_modules/.prisma/client/index.d.ts
export interface PrismaClientOptions {
  rejectOnNotFound?: any;
}

export class PrismaClient<T extends PrismaClientOptions = PrismaClientOptions> {
  private fetcher;
}

// @Filename: /node_modules/@prisma/client/index.d.ts
export * from ".prisma/client";

// @Filename: /index.ts
import { PrismaClient } from "@prisma/client";
declare const enhancePrisma: <TPrismaClientCtor>(client: TPrismaClientCtor) => TPrismaClientCtor & { enhanced: unknown };
const EnhancedPrisma = enhancePrisma(PrismaClient);
export default new EnhancedPrisma();
