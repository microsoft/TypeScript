/// <reference path="fourslash.ts" />

////namespace Foo.Bar {
////    export enum E {
////        E1 = 0,
////        E2 = 1,
////    }
////    export interface Baz {
////        prop1: string;
////        prop2: number;
////        prop3: E.E1;
////        prop4: Foo.Bar.E.E1;
////    }
////}
////[|const foo: Foo.Bar.Baz = {}|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const foo: Foo.Bar.Baz = {
    prop1: "",
    prop2: 0,
    prop3: Foo.Bar.E.E1,
    prop4: Foo.Bar.E.E1
}`,
});
