//// [tests/cases/compiler/inheritanceStaticMembersIncompatible.ts] ////

//// [inheritanceStaticMembersIncompatible.ts]
class a {
    static x: string;
}

class b extends a {
    static x: number;
}

//// [inheritanceStaticMembersIncompatible.js]
class a {
    static x;
}
class b extends a {
    static x;
}
