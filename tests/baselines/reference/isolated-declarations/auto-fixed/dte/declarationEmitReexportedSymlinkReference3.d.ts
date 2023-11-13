//// [tests/cases/compiler/declarationEmitReexportedSymlinkReference3.ts] ////

//// [monorepo/pkg3/src/index.ts]
export * from './keys';
//// [monorepo/pkg3/src/keys.ts]
import {MetadataAccessor} from "@raymondfeng/pkg2";

export const ADMIN = MetadataAccessor.create<boolean>('1');
//// [monorepo/pkg1/dist/index.d.ts]
export * from './types';
//// [monorepo/pkg1/dist/types.d.ts]
export declare type A = {
    id: string;
};
export declare type B = {
    id: number;
};
export declare type IdType = A | B;
export declare class MetadataAccessor<T, D extends IdType = IdType> {
    readonly key: string;
    private constructor();
    toString(): string;
    static create<T, D extends IdType = IdType>(key: string): MetadataAccessor<T, D>;
}
//// [monorepo/pkg1/package.json]
{
    "name": "@raymondfeng/pkg1",
    "version": "1.0.0",
    "description": "",
    "main": "dist/index.js",
    "typings": "dist/index.d.ts"
}
//// [monorepo/pkg2/dist/index.d.ts]
export * from './types';
//// [monorepo/pkg2/dist/types.d.ts]
export {MetadataAccessor} from '@raymondfeng/pkg1';
//// [monorepo/pkg2/package.json]
{
    "name": "@raymondfeng/pkg2",
    "version": "1.0.0",
    "description": "",
    "main": "dist/index.js",
    "typings": "dist/index.d.ts"
}

/// [Declarations] ////



//// [/.src/monorepo/pkg3/dist/index.d.ts]
export * from './keys';
//# sourceMappingURL=index.d.ts.map

//// [/.src/monorepo/pkg3/dist/keys.d.ts]
export declare const ADMIN: invalid;
//# sourceMappingURL=keys.d.ts.map

/// [Errors] ////

monorepo/pkg3/src/keys.ts(3,14): error TS2742: The inferred type of 'ADMIN' cannot be named without a reference to '../../pkg2/node_modules/@raymondfeng/pkg1/dist'. This is likely not portable. A type annotation is necessary.
monorepo/pkg3/src/keys.ts(3,22): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== monorepo/pkg3/src/index.ts (0 errors) ====
    export * from './keys';
==== monorepo/pkg3/src/keys.ts (2 errors) ====
    import {MetadataAccessor} from "@raymondfeng/pkg2";
    
    export const ADMIN = MetadataAccessor.create<boolean>('1');
                 ~~~~~
!!! error TS2742: The inferred type of 'ADMIN' cannot be named without a reference to '../../pkg2/node_modules/@raymondfeng/pkg1/dist'. This is likely not portable. A type annotation is necessary.
                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
==== monorepo/pkg1/dist/index.d.ts (0 errors) ====
    export * from './types';
==== monorepo/pkg1/dist/types.d.ts (0 errors) ====
    export declare type A = {
        id: string;
    };
    export declare type B = {
        id: number;
    };
    export declare type IdType = A | B;
    export declare class MetadataAccessor<T, D extends IdType = IdType> {
        readonly key: string;
        private constructor();
        toString(): string;
        static create<T, D extends IdType = IdType>(key: string): MetadataAccessor<T, D>;
    }
==== monorepo/pkg1/package.json (0 errors) ====
    {
        "name": "@raymondfeng/pkg1",
        "version": "1.0.0",
        "description": "",
        "main": "dist/index.js",
        "typings": "dist/index.d.ts"
    }
==== monorepo/pkg2/dist/index.d.ts (0 errors) ====
    export * from './types';
==== monorepo/pkg2/dist/types.d.ts (0 errors) ====
    export {MetadataAccessor} from '@raymondfeng/pkg1';
==== monorepo/pkg2/package.json (0 errors) ====
    {
        "name": "@raymondfeng/pkg2",
        "version": "1.0.0",
        "description": "",
        "main": "dist/index.js",
        "typings": "dist/index.d.ts"
    }