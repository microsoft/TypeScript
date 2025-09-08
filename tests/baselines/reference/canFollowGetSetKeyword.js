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
    get;
    *x() { }
}
class B {
    set;
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
