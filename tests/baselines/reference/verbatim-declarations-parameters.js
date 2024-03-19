//// [tests/cases/compiler/verbatim-declarations-parameters.ts] ////

//// [verbatim-declarations-parameters.ts]
type Map = {} & { [P in string]: any }
type MapOrUndefined = Map | undefined | "dummy"
export class Foo {
  constructor(
    // Type node is accurate, preserve
    public reuseTypeNode?: Map | undefined,
    public reuseTypeNode2?: Exclude<MapOrUndefined, "dummy">,
    // Resolve type node, requires adding | undefined
    public resolveType?: Map,
  ) { }
}

export function foo1(
    // Type node is accurate, preserve
    reuseTypeNode: Map | undefined = {},
    reuseTypeNode2: Exclude<MapOrUndefined, "dummy">  = {},
    // Resolve type node, requires adding | undefined
    resolveType: Map = {}, 
    requiredParam: number) {

}


//// [verbatim-declarations-parameters.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
exports.foo1 = foo1;
var Foo = /** @class */ (function () {
    function Foo(
    // Type node is accurate, preserve
    reuseTypeNode, reuseTypeNode2, 
    // Resolve type node, requires adding | undefined
    resolveType) {
        this.reuseTypeNode = reuseTypeNode;
        this.reuseTypeNode2 = reuseTypeNode2;
        this.resolveType = resolveType;
    }
    return Foo;
}());
exports.Foo = Foo;
function foo1(
// Type node is accurate, preserve
reuseTypeNode, reuseTypeNode2, 
// Resolve type node, requires adding | undefined
resolveType, requiredParam) {
    if (reuseTypeNode === void 0) { reuseTypeNode = {}; }
    if (reuseTypeNode2 === void 0) { reuseTypeNode2 = {}; }
    if (resolveType === void 0) { resolveType = {}; }
}


//// [verbatim-declarations-parameters.d.ts]
type Map = {} & {
    [P in string]: any;
};
type MapOrUndefined = Map | undefined | "dummy";
export declare class Foo {
    reuseTypeNode?: Map | undefined;
    reuseTypeNode2?: Exclude<MapOrUndefined, "dummy">;
    resolveType?: Map | undefined;
    constructor(reuseTypeNode?: Map | undefined, reuseTypeNode2?: Exclude<MapOrUndefined, "dummy">, resolveType?: Map | undefined);
}
export declare function foo1(reuseTypeNode: Map | undefined, reuseTypeNode2: Exclude<MapOrUndefined, "dummy">, resolveType: Map | undefined, requiredParam: number): void;
export {};
