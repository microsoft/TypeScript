//// [tests/cases/compiler/parsingClassRecoversWhenHittingUnexpectedSemicolon.ts] ////

//// [parsingClassRecoversWhenHittingUnexpectedSemicolon.ts]
class C {
    public f() { };
    private m;
}


//// [parsingClassRecoversWhenHittingUnexpectedSemicolon.js]
"use strict";
class C {
    f() { }
    ;
    m;
}
