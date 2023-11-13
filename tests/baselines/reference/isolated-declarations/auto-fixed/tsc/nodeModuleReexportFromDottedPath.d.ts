//// [tests/cases/compiler/nodeModuleReexportFromDottedPath.ts] ////

//// [/node_modules/.prisma/client/index.d.ts]
export interface PrismaClientOptions {
  rejectOnNotFound?: any;
}

export class PrismaClient<T extends PrismaClientOptions = PrismaClientOptions> {
  private fetcher;
}

//// [/node_modules/@prisma/client/index.d.ts]
export * from ".prisma/client";

//// [/index.ts]
import { PrismaClient } from "@prisma/client";
declare const enhancePrisma: <TPrismaClientCtor>(client: TPrismaClientCtor) => TPrismaClientCtor & { enhanced: unknown };
const EnhancedPrisma = enhancePrisma(PrismaClient);
export default new EnhancedPrisma();


/// [Declarations] ////



//// [/index.d.ts]
import { PrismaClient } from "@prisma/client";
declare const _default: PrismaClient<import(".prisma/client").PrismaClientOptions>;
export default _default;
//# sourceMappingURL=index.d.ts.map