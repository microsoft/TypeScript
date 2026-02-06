/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
////{
////    "compilerOptions": {
////        "stableTypeOrdering": true,
////        "module": "commonjs",
////        "target": "es2015",
////        "lib": ["es5"],
////        "strict": false,
////        "outDir": "./dist",
////        "inlineSourceMap": true,
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

// @Filename: /home/src/workspaces/project/dist/index.js
////"use strict";
////Object.defineProperty(exports, "__esModule", { value: true });
////exports.Foo = void 0;
////class Foo {
////    methodName(propName) { return propName; }
////    otherMethod() {
////        if (Math.random() > 0.5) {
////            return { x: 42 };
////        }
////        return { y: "yes" };
////    }
////}
////exports.Foo = Foo;
//////# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLEdBQUc7SUFFWixVQUFVLENBQUMsUUFBa0IsSUFBYyxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDN0QsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFDbkIsQ0FBQztRQUNELE9BQU8sRUFBQyxDQUFDLEVBQUUsS0FBSyxFQUFDLENBQUM7SUFDdEIsQ0FBQztDQUNKO0FBVEQsa0JBU0MifQ==

// @Filename: /home/src/workspaces/project/dist/index.d.ts.map
////{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../index.ts"],"names":[],"mappings":"AAAA,qBAAa,GAAG;IACZ,MAAM,EAAE,MAAM,CAAC;IACf,UAAU,CAAC,QAAQ,EAAE,QAAQ,GAAG,QAAQ;IACxC,WAAW;;;;;;;CAMd;AAED,MAAM,WAAW,QAAQ;IACrB,MAAM,EAAE,MAAM,CAAC;CAClB"}

// @Filename: /home/src/workspaces/project/dist/index.d.ts
////export declare class Foo {
////    member: string;
////    methodName(propName: SomeType): SomeType;
////    otherMethod(): {
////        x: number;
////        y?: undefined;
////    } | {
////        x?: undefined;
////        y: string;
////    };
////}
////export interface SomeType {
////    member: number;
////}
//////# sourceMappingURL=index.d.ts.map

goTo.file("/home/src/workspaces/project/index.ts");
verify.getEmitOutput([
    "/home/src/workspaces/project/dist/index.js",
    "/home/src/workspaces/project/dist/index.d.ts.map",
    "/home/src/workspaces/project/dist/index.d.ts"
]);

verify.baselineGoToImplementation("1");// getImplementationAtPosition
verify.baselineGoToType("1");// getTypeDefinitionAtPosition
verify.baselineGoToDefinition("1");// getDefinitionAndBoundSpan
verify.baselineGetDefinitionAtPosition("1"); // getDefinitionAtPosition