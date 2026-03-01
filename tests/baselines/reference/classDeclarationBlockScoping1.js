//// [tests/cases/compiler/classDeclarationBlockScoping1.ts] ////

//// [classDeclarationBlockScoping1.ts]
class C {
}

{
    class C {
    }
}

//// [classDeclarationBlockScoping1.js]
"use strict";
class C {
}
{
    class C {
    }
}
