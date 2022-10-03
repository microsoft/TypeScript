// @declaration: true

// @Filename: declFile.d.ts
declare module M {
    declare var x;
    declare function f();

    declare module N { }

    declare class C { }
}

// @Filename: client.ts
///<reference path="declFile.d.ts"/>
var x = new M.C(); // Declaration file wont get emitted because there are errors in declaration file
