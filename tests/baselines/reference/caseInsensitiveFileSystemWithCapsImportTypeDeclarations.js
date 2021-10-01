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
"use strict";
exports.__esModule = true;
//// [type-a.js]
"use strict";
exports.__esModule = true;
//// [type-b.js]
"use strict";
exports.__esModule = true;
//// [index.js]
"use strict";
exports.__esModule = true;
exports.Broken = void 0;
var Broken = /** @class */ (function () {
    function Broken() {
    }
    Broken.prototype.method = function () {
        return {};
    };
    return Broken;
}());
exports.Broken = Broken;


//// [types.d.ts]
export declare type Merge<T, U> = T & U;
//// [type-a.d.ts]
export declare type TypeA = {
    a: string;
};
//// [type-b.d.ts]
import { Merge } from './types';
import { TypeA } from './type-a';
export declare type TypeB = Merge<TypeA, {
    b: string;
}>;
//// [index.d.ts]
import { TypeB } from './type-b';
export declare class Broken {
    method(): TypeB;
}
