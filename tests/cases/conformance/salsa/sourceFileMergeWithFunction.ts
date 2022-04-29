// @Filename: types.d.ts
declare function foo(props: any): any;
export default foo;
export as namespace foo;

// @Filename: foo.ts
/// <reference path="types.d.ts" />
declare function foo(): any;
