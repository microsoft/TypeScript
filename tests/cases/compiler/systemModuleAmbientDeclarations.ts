// @module: system
// @isolatedModules: true

// @filename: file1.ts
declare class Promise { }
declare function Foo(): void;
declare class C {}
declare enum E {X = 1};

export var promise = Promise;
export var foo = Foo;
export var c = C;
export var e = E;

// @filename: file2.ts
export declare function foo();

// @filename: file3.ts
export declare class C {}

// @filename: file4.ts
export declare var v: number;

// @filename: file5.ts
export declare enum E {X = 1}

// @filename: file6.ts
export declare module M { var v: number; }
