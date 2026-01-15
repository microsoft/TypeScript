// @declaration: true

// @Filename: declFile.d.ts
declare namespace M {
    declare var x;
    declare function f();

    declare namespace N { }

    declare class C { }
}

// @Filename: client.ts
///<reference path="declFile.d.ts" preserve="true"/>
var x = new M.C(); // Declaration file wont get emitted because there are errors in declaration file
