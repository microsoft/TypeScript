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
}
class b extends a {
}
