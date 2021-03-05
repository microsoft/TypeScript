/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

//// abstract class Base {
////     abstract bar(): void;
//// }
//// class Sub extends Base {
////     [|abstract bar() {}|]
//// }

verify.codeFix({
    description: "Add 'override' modifier",
    newRangeContent: "override abstract bar() {}",
    index: 0
})
