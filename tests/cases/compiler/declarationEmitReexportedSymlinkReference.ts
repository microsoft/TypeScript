// @filename: monorepo/pkg1/dist/index.d.ts
export * from './types';
// @filename: monorepo/pkg1/dist/types.d.ts
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
// @filename: monorepo/pkg1/package.json
{
    "name": "@raymondfeng/pkg1",
    "version": "1.0.0",
    "description": "",
    "main": "dist/index.js",
    "typings": "dist/index.d.ts"
}
// @filename: monorepo/pkg2/dist/index.d.ts
export * from './types';
// @filename: monorepo/pkg2/dist/types.d.ts
export * from '@raymondfeng/pkg1';
// @filename: monorepo/pkg2/package.json
{
    "name": "@raymondfeng/pkg2",
    "version": "1.0.0",
    "description": "",
    "main": "dist/index.js",
    "typings": "dist/index.d.ts"
}
// @filename: monorepo/pkg3/src/index.ts
export * from './keys';
// @filename: monorepo/pkg3/src/keys.ts
import {MetadataAccessor} from "@raymondfeng/pkg2";

export const ADMIN = MetadataAccessor.create<boolean>('1');
// @filename: monorepo/pkg3/tsconfig.json
{
    "compilerOptions": {
      "outDir": "dist",
      "rootDir": "src",
      "target": "es5",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true,
      "declaration": true
    }
}
// @link: tests/cases/compiler/monorepo/pkg1 -> tests/cases/compiler/monorepo/pkg2/node_modules/@raymondfeng/pkg1
// @link: tests/cases/compiler/monorepo/pkg2 -> tests/cases/compiler/monorepo/pkg3/node_modules/@raymondfeng/pkg2
