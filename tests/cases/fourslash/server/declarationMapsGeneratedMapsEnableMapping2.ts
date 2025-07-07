/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
////{
////    "compilerOptions": {
////        "outDir": "./dist",
////        "sourceMap": true,
////        "sourceRoot": "/home/src/workspaces/project/",
////        "declaration": true,
////        "declarationMap": true,
////        "newLine": "lf",
////    },
////    "files": ["/home/src/workspaces/project/index.ts"],
////}

// @Filename: /home/src/workspaces/project/index.ts
// @emitThisFile: true
////export class Foo {
////    member: string;
////    /*2*/methodName(propName: SomeType): SomeType { return propName; }
////    otherMethod() {
////        if (Math.random() > 0.5) {
////            return {x: 42};
////        }
////        return {y: "yes"};
////    }
////}
////
////export interface /*SomeType*/SomeType {
////    member: number;
////}

// @Filename: /home/src/workspaces/project/mymodule.ts
////import * as mod from "/home/src/workspaces/project/dist/index";
////const instance = new mod.Foo();
////instance.[|/*1*/methodName|]({member: 12});

// @Filename: /home/src/workspaces/project/dist/index.js.map
////{"version":3,"file":"index.js","sourceRoot":"/home/src/workspaces/project/","sources":["index.ts"],"names":[],"mappings":";;;AAAA;IAAA;IASA,CAAC;IAPG,wBAAU,GAAV,UAAW,QAAkB,IAAc,OAAO,QAAQ,CAAC,CAAC,CAAC;IAC7D,yBAAW,GAAX;QACI,IAAI,IAAI,CAAC,MAAM,EAAE,GAAG,GAAG,EAAE,CAAC;YACtB,OAAO,EAAC,CAAC,EAAE,EAAE,EAAC,CAAC;QACnB,CAAC;QACD,OAAO,EAAC,CAAC,EAAE,KAAK,EAAC,CAAC;IACtB,CAAC;IACL,UAAC;AAAD,CAAC,AATD,IASC;AATY,kBAAG"}

// @Filename: /home/src/workspaces/project/dist/index.js
////"use strict";
////Object.defineProperty(exports, "__esModule", { value: true });
////exports.Foo = void 0;
////var Foo = /** @class */ (function () {
////    function Foo() {
////    }
////    Foo.prototype.methodName = function (propName) { return propName; };
////    Foo.prototype.otherMethod = function () {
////        if (Math.random() > 0.5) {
////            return { x: 42 };
////        }
////        return { y: "yes" };
////    };
////    return Foo;
////}());
////exports.Foo = Foo;
//////# sourceMappingURL=index.js.map

// @Filename: /home/src/workspaces/project/dist/index.d.ts.map
////{"version":3,"file":"index.d.ts","sourceRoot":"/home/src/workspaces/project/","sources":["index.ts"],"names":[],"mappings":"AAAA,qBAAa,GAAG;IACZ,MAAM,EAAE,MAAM,CAAC;IACf,UAAU,CAAC,QAAQ,EAAE,QAAQ,GAAG,QAAQ;IACxC,WAAW;;;;;;;CAMd;AAED,MAAM,WAAW,QAAQ;IACrB,MAAM,EAAE,MAAM,CAAC;CAClB"}

// @Filename: /home/src/workspaces/project/dist/index.d.ts
////export declare class Foo {
////    member: string;
////    methodName(propName: SomeType): SomeType;
////    otherMethod(): {
////        x: number;
////        y?: undefined;
////    } | {
////        y: string;
////        x?: undefined;
////    };
////}
////export interface SomeType {
////    member: number;
////}
//////# sourceMappingURL=index.d.ts.map

goTo.file("/home/src/workspaces/project/index.ts");
verify.getEmitOutput([
    "/home/src/workspaces/project/dist/index.js.map",
    "/home/src/workspaces/project/dist/index.js",
    "/home/src/workspaces/project/dist/index.d.ts.map",
    "/home/src/workspaces/project/dist/index.d.ts"
]);
verify.baselineGoToImplementation("1");// getImplementationAtPosition
verify.baselineGoToType("1");// getTypeDefinitionAtPosition
verify.baselineGoToDefinition("1");// getDefinitionAndBoundSpan
verify.baselineGetDefinitionAtPosition("1"); // getDefinitionAtPosition
