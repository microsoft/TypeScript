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
    fixId: "fixRemoveOverrideModifier",
    fixAllDescription: "Remove all unnecessary 'override' modifiers",
    newFileContent: `class B {
    foo (v: string) {}
    fooo (v: string) {}
}
class D extends B {
    override foo (v: string) {}
    fooo (v: string) {}
    bar(v: string) {}
}
class C {
    foo(v: string) {}
}
function f () {
    return class extends B {
        override foo (v: string) {}
        fooo (v: string) {}
        bar(v: string) {}
    }
}
class E extends (class {
    foo () { }
    bar () { }
}) {
    override foo () { }
    bar () { }
    baz() {}
    bazz () {}
}
function ff () {
    return class {
        foo () {}
    }
}`
})

