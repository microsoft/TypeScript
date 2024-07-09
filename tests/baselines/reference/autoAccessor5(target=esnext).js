//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor5.ts] ////

//// [autoAccessor5.ts]
class C1 {
    accessor ["w"]: any;
    accessor ["x"] = 1;
    static accessor ["y"]: any;
    static accessor ["z"] = 2;
}

declare var f: any;
class C2 {
    accessor [f()] = 1;
}

//// [autoAccessor5.js]
class C1 {
    accessor ["w"];
    accessor ["x"] = 1;
    static accessor ["y"];
    static accessor ["z"] = 2;
}
class C2 {
    accessor [f()] = 1;
}
