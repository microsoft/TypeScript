/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
//// class B {
////     foo (v: string) {}
////     fooo (v: string) {}
//// }
//// class D extends B {
////     override foo (v: string) {}
////     fooo (v: string) {}
////     override bar(v: string) {}
//// }
//// class C {
////     override foo(v: string) {}
//// }
//// function f () {
////     return class extends B {
////         override foo (v: string) {}
////         fooo (v: string) {}
////         override bar(v: string) {}
////     }
//// }
//// class E extends (class {
////     foo () { }
////     bar () { }
//// }) {
////     override foo () { }
////     bar () { }
////     baz() {}
////     override bazz () {}
//// }
//// function ff () {
////     return class {
////         override foo () {}
////     }
//// }

verify.codeFixAll({
    fixId: "fixAddOverrideModifier",
    fixAllDescription: "Add all missing 'override' modifiers",
    newFileContent: `class B {
    foo (v: string) {}
    fooo (v: string) {}
}
class D extends B {
    override foo (v: string) {}
    override fooo (v: string) {}
    override bar(v: string) {}
}
class C {
    override foo(v: string) {}
}
function f () {
    return class extends B {
        override foo (v: string) {}
        override fooo (v: string) {}
        override bar(v: string) {}
    }
}
class E extends (class {
    foo () { }
    bar () { }
}) {
    override foo () { }
    override bar () { }
    baz() {}
    override bazz () {}
}
function ff () {
    return class {
        override foo () {}
    }
}`
})

