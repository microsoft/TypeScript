/// <reference path='fourslash.ts'/>

// @Filename: file.ts
////export var x = 10;
////export var y = 10;
////export default class C {
////}

// @Filename: a.ts
////import { /*1*/ } from "./file.ts";  // no globals in imports - export not found

//@Filename: file.tsx
/////// <reference path="/*2*/..\services\services.ts" /> // no globals in reference paths
////import { /*3*/ } from "./file1.ts";  // no globals in imports - export not found
////var test = "/*4*/"; // no globals in strings
/////*5*/class A { // insert globals
////    foo(): string { return ''; }
////}
////
////class /*6*/B extends A { // no globals after class keyword
////    bar(): string {
//// /*7*/ // insert globals
////        return '';
////    }
////}
////
////class C</*8*/ U extends A, T extends A> { // no globals at beginning of generics
////    x: U;
////    y = this./*9*/x; // no globals inserted for member completions
////   /*10*/ // insert globals
////}
/////*11*/ // insert globals
////const y = <div /*12*/ />; // no globals in jsx attribute found
////const z = <div =/*13*/ />; // no globals in jsx attribute with syntax error
////const x = `/*14*/ ${/*15*/}`; // globals only in template expression
////var user = </*16*/User name=/*17*/{ /*18*/window.isLoggedIn ? window.name : '/*19*/'} />; // globals only in JSX expression (but not in JSX expression strings)

const x = ["test", "A", "B", "C", "y", "z", "x", "user"];
const globals = completion.sorted([...x, ...completion.globals])
verify.completions(
    { marker: ["1"], exact: ["x", "y", { name: "type", sortText: completion.SortText.GlobalsOrKeywords }], isGlobalCompletion: false },
    { marker: ["3"], exact: [{ name: "type", sortText: completion.SortText.GlobalsOrKeywords }], isNewIdentifierLocation: true, isGlobalCompletion: false },
    { marker: ["6", "8", "12", "14"], exact: undefined, isGlobalCompletion: false },
    { marker: "2", exact: ["a.ts", "file.ts"], isGlobalCompletion: false, isNewIdentifierLocation: true },
    { marker: ["4", "19"], exact: [], isGlobalCompletion: false },
    { marker: ["5", "11"], exact: globals, isGlobalCompletion: true },
    { marker: ["18"], exact: globals.filter(name => name !== 'user'), isGlobalCompletion: true },
    { marker: "7", exact: completion.globalsInsideFunction(x), isGlobalCompletion: true },
    { marker: "9", exact: ["x", "y"], isGlobalCompletion: false },
    { marker: "10", exact: completion.classElementKeywords, isGlobalCompletion: false, isNewIdentifierLocation: true },
    { marker: "13", exact: completion.globalTypesPlus(["A", "B", "C"]), isGlobalCompletion: false },
    { marker: "15", exact: globals.filter(name => name !== 'x'), isGlobalCompletion: true, isNewIdentifierLocation: true },
    { marker: "16", unsorted: [...x, completion.globalThisEntry, ...completion.globalsVars, completion.undefinedVarEntry].filter(name => name !== 'user'), isGlobalCompletion: false },
    { marker: "17", exact: completion.globalKeywords, isGlobalCompletion: false },
);
