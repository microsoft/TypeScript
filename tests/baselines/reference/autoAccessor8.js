//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor8.ts] ////

//// [autoAccessor8.ts]
class C1 {
    accessor a: any;
    static accessor b: any;
}

declare class C2 {
    accessor a: any;
    static accessor b: any;
}

function f() {
    class C3 {
        accessor a: any;
        static accessor b: any;
    }
    return C3;
}


//// [autoAccessor8.js]
class C1 {
    accessor a;
    static accessor b;
}
function f() {
    class C3 {
        accessor a;
        static accessor b;
    }
    return C3;
}


//// [autoAccessor8.d.ts]
declare class C1 {
    accessor a: any;
    static accessor b: any;
}
declare class C2 {
    accessor a: any;
    static accessor b: any;
}
declare function f(): {
    new (): {
        a: any;
    };
    b: any;
};
