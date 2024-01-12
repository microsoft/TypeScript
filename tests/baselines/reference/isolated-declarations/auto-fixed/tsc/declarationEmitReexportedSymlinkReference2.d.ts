//// [tests/cases/compiler/declarationEmitReexportedSymlinkReference2.ts] ////

//// [index.ts]
export * from './keys';
//// [keys.ts]
import {MetadataAccessor} from "@raymondfeng/pkg2";

export const ADMIN = MetadataAccessor.create<boolean>('1');
//// [index.d.ts]
export * from './types';
//// [types.d.ts]
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
//// [package.json]
{
    "name": "@raymondfeng/pkg1",
    "version": "1.0.0",
    "description": "",
    "main": "dist/index.js",
    "typings": "dist/index.d.ts"
}
//// [index.d.ts]
import "./secondary";
export * from './types';
//// [types.d.ts]
export {MetadataAccessor} from '@raymondfeng/pkg1';
//// [secondary.d.ts]
export {IdType} from '@raymondfeng/pkg1';
//// [package.json]
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
import { MetadataAccessor } from "@raymondfeng/pkg2";
export declare const ADMIN: MetadataAccessor<boolean, import("@raymondfeng/pkg2/dist/secondary").IdType>;
//# sourceMappingURL=keys.d.ts.map