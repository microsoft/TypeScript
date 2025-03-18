//// [tests/cases/compiler/invalidReferenceSyntax1.ts] ////

//// [invalidReferenceSyntax1.ts]
/// <reference path="missingquote.ts />
class C {

}

//// [invalidReferenceSyntax1.js]
class C {
}
