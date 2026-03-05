//// [tests/cases/compiler/inheritanceStaticMembersCompatible.ts] ////

//// [inheritanceStaticMembersCompatible.ts]
class a {
    static x: a;
}

class b extends a {
    static x: b;
}

//// [inheritanceStaticMembersCompatible.js]
"use strict";
class a {
}
class b extends a {
}
