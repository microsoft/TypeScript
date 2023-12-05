/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "outDir": "./dist",
////        "inlineSourceMap": true,
////        "inlineSources": true,
////        "declaration": true,
////        "declarationMap": true,
////        "newLine": "lf",
////    },
////    "files": ["/index.ts"],
////}

// @Filename: /index.ts
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

// @Filename: /mymodule.ts
////import * as mod from "/dist/index";
////const instance = new mod.Foo();
////instance.[|/*1*/methodName|]({member: 12});

// @Filename: /dist/index.js
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
//////# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTtJQUFBO0lBU0EsQ0FBQztJQVBHLHdCQUFVLEdBQVYsVUFBVyxRQUFrQixJQUFjLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM3RCx5QkFBVyxHQUFYO1FBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDdEIsT0FBTyxFQUFDLENBQUMsRUFBRSxFQUFFLEVBQUMsQ0FBQztRQUNuQixDQUFDO1FBQ0QsT0FBTyxFQUFDLENBQUMsRUFBRSxLQUFLLEVBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ0wsVUFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksa0JBQUciLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRm9vIHtcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBtZXRob2ROYW1lKHByb3BOYW1lOiBTb21lVHlwZSk6IFNvbWVUeXBlIHsgcmV0dXJuIHByb3BOYW1lOyB9XG4gICAgb3RoZXJNZXRob2QoKSB7XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICAgICAgICByZXR1cm4ge3g6IDQyfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3k6IFwieWVzXCJ9O1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTb21lVHlwZSB7XG4gICAgbWVtYmVyOiBudW1iZXI7XG59Il19

// @Filename: /dist/index.d.ts.map
////{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../index.ts"],"names":[],"mappings":"AAAA,qBAAa,GAAG;IACZ,MAAM,EAAE,MAAM,CAAC;IACf,UAAU,CAAC,QAAQ,EAAE,QAAQ,GAAG,QAAQ;IACxC,WAAW;;;;;;;CAMd;AAED,MAAM,WAAW,QAAQ;IACrB,MAAM,EAAE,MAAM,CAAC;CAClB"}

// @Filename: /dist/index.d.ts
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

goTo.file("/index.ts");
verify.getEmitOutput(["/dist/index.js", "/dist/index.d.ts.map", "/dist/index.d.ts"]);

verify.baselineGoToImplementation("1");// getImplementationAtPosition
verify.baselineGoToType("1");// getTypeDefinitionAtPosition
verify.baselineGoToDefinition("1");// getDefinitionAndBoundSpan
verify.baselineGetDefinitionAtPosition("1"); // getDefinitionAtPosition