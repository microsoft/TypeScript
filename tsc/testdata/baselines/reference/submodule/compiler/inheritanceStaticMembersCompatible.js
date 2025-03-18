//// [tests/cases/compiler/inheritanceStaticMembersCompatible.ts] ////

//// [inheritanceStaticMembersCompatible.ts]
class a {
    static x: a;
}

class b extends a {
    static x: b;
}

//// [inheritanceStaticMembersCompatible.js]
class a {
    static x;
}
class b extends a {
    static x;
}
