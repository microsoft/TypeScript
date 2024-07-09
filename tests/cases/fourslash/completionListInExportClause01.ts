/// <reference path='fourslash.ts'/>

// @Filename: m1.ts
////export var foo: number = 1;
////export function bar() { return 10; }
////export function baz() { return 10; }

// @Filename: m2.ts
////export {/*1*/, /*2*/ from "./m1"
////export {/*3*/} from "./m1"
////export {foo,/*4*/ from "./m1"
////export {bar as /*5*/, /*6*/ from "./m1"
////export {foo, bar, baz as b,/*7*/} from "./m1"

const type = { name: "type", sortText: completion.SortText.GlobalsOrKeywords };

verify.completions(
    { marker: ["1", "2", "3"], exact: ["bar", "baz", "foo", type] },
    { marker: "4", exact: ["bar", "baz", type] },
    { marker: "5", exact: undefined, isNewIdentifierLocation: true },
    { marker: "6", exact: ["baz", "foo", type] },
    { marker: "7", exact: undefined },
);
