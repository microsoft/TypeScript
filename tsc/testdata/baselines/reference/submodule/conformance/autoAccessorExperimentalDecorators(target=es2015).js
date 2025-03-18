//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessorExperimentalDecorators.ts] ////

//// [autoAccessorExperimentalDecorators.ts]
declare var dec: (target: any, key: PropertyKey, desc: PropertyDescriptor) => void;

class C1 {
    @dec
    accessor a: any;

    @dec
    static accessor b: any;
}

class C2 {
    @dec
    accessor #a: any;

    @dec
    static accessor #b: any;
}


//// [autoAccessorExperimentalDecorators.js]
class C1 {
    @dec
    accessor a;
    @dec
    static accessor b;
}
class C2 {
    @dec
    accessor #a;
    @dec
    static accessor #b;
}
