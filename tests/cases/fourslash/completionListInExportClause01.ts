/// <reference path='fourslash.ts'/>

// @Filename: m1.ts
////export var foo: number = 1;
////export function bar() { return 10; }
////export function baz() { return 10; }
////export { foo as "hello world", foo as break }

// @Filename: m2.ts
////export {/*1*/, /*2*/ from "./m1"
////export {/*3*/} from "./m1"
////export {foo,/*4*/ from "./m1"
////export {bar as /*5*/, /*6*/ from "./m1"
////export {foo, bar, baz as b,/*7*/} from "./m1"
////export {foo, bar, baz as b, "hello world" as d, /*8*/} from "./m1"
////export {foo, bar, baz as b, "hello world" as d, break as break_, /*9*/} from "./m1"

const type = { name: "type", sortText: completion.SortText.GlobalsOrKeywords };
const hello: FourSlashInterface.ExpectedCompletionEntry = { name: "hello world", insertText: `"hello world"` };

verify.baselineCompletions();
