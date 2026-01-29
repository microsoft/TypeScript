//// [tests/cases/compiler/caseInsensitiveFileSystemWithCapsImportTypeDeclarations.ts] ////

//// [index.ts]
import { TypeB } from './type-b';

export class Broken {
    method () {
        return { } as TypeB;
    }
}
//// [type-b.ts]
import { Merge } from './types';
import { TypeA } from './type-a';

export type TypeB = Merge<TypeA, {
    b: string;
}>;
//// [type-a.ts]
export type TypeA = {
    a: string;
}
//// [types.ts]
export type Merge<T, U> = T & U;


//// [types.js]
export {};
//// [type-a.js]
export {};
//// [type-b.js]
export {};
//// [index.js]
export class Broken {
    method() {
        return {};
    }
}


//// [types.d.ts]
export type Merge<T, U> = T & U;
//// [type-a.d.ts]
export type TypeA = {
    a: string;
};
//// [type-b.d.ts]
import { Merge } from './types';
import { TypeA } from './type-a';
export type TypeB = Merge<TypeA, {
    b: string;
}>;
//// [index.d.ts]
import { TypeB } from './type-b';
export declare class Broken {
    method(): TypeB;
}
