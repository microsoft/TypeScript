/// <reference path="fourslash.ts" />

// @Filename: class.ts
////export class Class { }
// @Filename: interface.ts
////import { Class } from './class';
////
////export interface Foo {
////    x: Class;
////}
// @Filename: index.ts
////import { Foo } from './interface';
////
////class /*1*/X implements Foo {}
goTo.marker("1");
verify.codeFix({
    index: 1,
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "Foo"],
    newFileContent: {
        "/tests/cases/fourslash/index.ts":
`import { Class } from './class';
import { Foo } from './interface';

class X implements Foo {
    x: Class;
}`
    }
});
