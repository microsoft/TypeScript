//// [tests/cases/compiler/decoratorsOnComputedProperties.ts] ////

//// [decoratorsOnComputedProperties.ts]
function x(o: object, k: PropertyKey) { }
let i = 0;
function foo(): string { return ++i + ""; }

const fieldNameA: string = "fieldName1";
const fieldNameB: string = "fieldName2";
const fieldNameC: string = "fieldName3";

class A {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    @x [fieldNameC]: any = null;
}

void class B {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    @x [fieldNameC]: any = null;
};

class C {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    @x [fieldNameC]: any = null;
    ["some" + "method"]() {}
}

void class D {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    @x [fieldNameC]: any = null;
    ["some" + "method"]() {}
};

class E {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    ["some" + "method"]() {}
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    @x [fieldNameC]: any = null;
}

void class F {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    ["some" + "method"]() {}
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    @x [fieldNameC]: any = null;
};

class G {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    ["some" + "method"]() {}
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    ["some" + "method2"]() {}
    @x [fieldNameC]: any = null;
}

void class H {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    ["some" + "method"]() {}
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    ["some" + "method2"]() {}
    @x [fieldNameC]: any = null;
};

class I {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    @x ["some" + "method"]() {}
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    ["some" + "method2"]() {}
    @x [fieldNameC]: any = null;
}

void class J {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    @x ["some" + "method"]() {}
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    ["some" + "method2"]() {}
    @x [fieldNameC]: any = null;
};

//// [decoratorsOnComputedProperties.js]
function x(o, k) { }
let i = 0;
function foo() { return ++i + ""; }
const fieldNameA = "fieldName1";
const fieldNameB = "fieldName2";
const fieldNameC = "fieldName3";
class A {
    @x
    ["property"];
    @x
    [Symbol.toStringTag];
    @x
    ["property2"] = 2;
    @x
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    @x
    [foo()];
    @x
    [foo()] = null;
    [fieldNameA];
    @x
    [fieldNameB];
    @x
    [fieldNameC] = null;
}
void class B {
    @x
    ["property"];
    @x
    [Symbol.toStringTag];
    @x
    ["property2"] = 2;
    @x
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    @x
    [foo()];
    @x
    [foo()] = null;
    [fieldNameA];
    @x
    [fieldNameB];
    @x
    [fieldNameC] = null;
};
class C {
    @x
    ["property"];
    @x
    [Symbol.toStringTag];
    @x
    ["property2"] = 2;
    @x
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    @x
    [foo()];
    @x
    [foo()] = null;
    [fieldNameA];
    @x
    [fieldNameB];
    @x
    [fieldNameC] = null;
    ["some" + "method"]() { }
}
void class D {
    @x
    ["property"];
    @x
    [Symbol.toStringTag];
    @x
    ["property2"] = 2;
    @x
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    @x
    [foo()];
    @x
    [foo()] = null;
    [fieldNameA];
    @x
    [fieldNameB];
    @x
    [fieldNameC] = null;
    ["some" + "method"]() { }
};
class E {
    @x
    ["property"];
    @x
    [Symbol.toStringTag];
    @x
    ["property2"] = 2;
    @x
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    @x
    [foo()];
    @x
    [foo()] = null;
    ["some" + "method"]() { }
    [fieldNameA];
    @x
    [fieldNameB];
    @x
    [fieldNameC] = null;
}
void class F {
    @x
    ["property"];
    @x
    [Symbol.toStringTag];
    @x
    ["property2"] = 2;
    @x
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    @x
    [foo()];
    @x
    [foo()] = null;
    ["some" + "method"]() { }
    [fieldNameA];
    @x
    [fieldNameB];
    @x
    [fieldNameC] = null;
};
class G {
    @x
    ["property"];
    @x
    [Symbol.toStringTag];
    @x
    ["property2"] = 2;
    @x
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    @x
    [foo()];
    @x
    [foo()] = null;
    ["some" + "method"]() { }
    [fieldNameA];
    @x
    [fieldNameB];
    ["some" + "method2"]() { }
    @x
    [fieldNameC] = null;
}
void class H {
    @x
    ["property"];
    @x
    [Symbol.toStringTag];
    @x
    ["property2"] = 2;
    @x
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    @x
    [foo()];
    @x
    [foo()] = null;
    ["some" + "method"]() { }
    [fieldNameA];
    @x
    [fieldNameB];
    ["some" + "method2"]() { }
    @x
    [fieldNameC] = null;
};
class I {
    @x
    ["property"];
    @x
    [Symbol.toStringTag];
    @x
    ["property2"] = 2;
    @x
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    @x
    [foo()];
    @x
    [foo()] = null;
    @x
    ["some" + "method"]() { }
    [fieldNameA];
    @x
    [fieldNameB];
    ["some" + "method2"]() { }
    @x
    [fieldNameC] = null;
}
void class J {
    @x
    ["property"];
    @x
    [Symbol.toStringTag];
    @x
    ["property2"] = 2;
    @x
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    @x
    [foo()];
    @x
    [foo()] = null;
    @x
    ["some" + "method"]() { }
    [fieldNameA];
    @x
    [fieldNameB];
    ["some" + "method2"]() { }
    @x
    [fieldNameC] = null;
};
