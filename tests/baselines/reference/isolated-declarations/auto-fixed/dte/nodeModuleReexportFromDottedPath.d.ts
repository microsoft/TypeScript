//// [tests/cases/compiler/nodeModuleReexportFromDottedPath.ts] ////

//// [index.d.ts]
export interface PrismaClientOptions {
  rejectOnNotFound?: any;
}

export class PrismaClient<T extends PrismaClientOptions = PrismaClientOptions> {
  private fetcher;
}

//// [index.d.ts]
export * from ".prisma/client";

//// [index.ts]
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

/index.ts(4,16): error TS9037: Default exports can't be inferred with --isolatedDeclarations.


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
!!! error TS9037: Default exports can't be inferred with --isolatedDeclarations.
!!! related TS9036 /index.ts:4:1: Move the expression in default export to a variable and add a type annotation to it.
    