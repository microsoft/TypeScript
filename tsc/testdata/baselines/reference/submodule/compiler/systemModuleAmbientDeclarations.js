//// [tests/cases/compiler/systemModuleAmbientDeclarations.ts] ////

//// [file1.ts]
declare class Promise { }
declare function Foo(): void;
declare class C {}
declare enum E {X = 1};

export var promise = Promise;
export var foo = Foo;
export var c = C;
export var e = E;

//// [file2.ts]
export declare function foo();

//// [file3.ts]
export declare class C {}

//// [file4.ts]
export declare var v: number;

//// [file5.ts]
export declare enum E {X = 1}

//// [file6.ts]
export declare module M { var v: number; }


//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e = exports.c = exports.foo = exports.promise = void 0;
;
exports.promise = Promise;
exports.foo = Foo;
exports.c = C;
exports.e = E;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file6.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
