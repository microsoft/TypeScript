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
declare const _default: invalid;
export default _default;
//# sourceMappingURL=index.d.ts.map
/// [Errors] ////

/index.ts(4,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== /node_modules/.prisma/client/index.d.ts (0 errors) ====
    export interface PrismaClientOptions {
      rejectOnNotFound?: any;
    }
    
    export class PrismaClient<T extends PrismaClientOptions = PrismaClientOptions> {
      private fetcher;
    }
    
==== /node_modules/@prisma/client/index.d.ts (0 errors) ====
    export * from ".prisma/client";
    
==== /index.ts (1 errors) ====
    import { PrismaClient } from "@prisma/client";
    declare const enhancePrisma: <TPrismaClientCtor>(client: TPrismaClientCtor) => TPrismaClientCtor & { enhanced: unknown };
    const EnhancedPrisma = enhancePrisma(PrismaClient);
    export default new EnhancedPrisma();
                   ~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    