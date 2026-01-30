//// [tests/cases/conformance/classes/propertyMemberDeclarations/canFollowGetSetKeyword.ts] ////

//// [canFollowGetSetKeyword.ts]
class A {
    get
    *x() {}
}
class B {
    set
    *x() {}
}
const c = {
    get
    *x() {}
};
const d = {
    set
    *x() {}
};

//// [canFollowGetSetKeyword.js]
class A {
    *x() { }
}
class B {
    *x() { }
}
const c = {
    get,
    *x() { }
};
const d = {
    set,
    *x() { }
};
