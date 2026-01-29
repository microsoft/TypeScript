//// [tests/cases/compiler/exportAssignedNamespaceIsVisibleInDeclarationEmit.ts] ////

//// [thing.d.ts]
declare namespace Foo {
    export interface Bar {}
    export function f(): Bar;
}
export = Foo;
//// [index.ts]
import { f } from "./thing";
export const thing = f();

//// [index.js]
import { f } from "./thing";
export const thing = f();


//// [index.d.ts]
export declare const thing: import("./thing").Bar;
