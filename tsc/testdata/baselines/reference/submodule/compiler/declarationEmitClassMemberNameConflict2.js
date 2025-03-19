//// [tests/cases/compiler/declarationEmitClassMemberNameConflict2.ts] ////

//// [declarationEmitClassMemberNameConflict2.ts]
const Bar = 'bar';

enum Hello {
    World
}

enum Hello1 {
    World1
}

class Foo {
    // Same names + string => OK
    Bar = Bar;

    // Same names + enum => OK
    Hello = Hello;

    // Different names + enum => OK
    Hello2 = Hello1;
}

//// [declarationEmitClassMemberNameConflict2.js]
const Bar = 'bar';
var Hello;
(function (Hello) {
    Hello[Hello["World"] = 0] = "World";
})(Hello || (Hello = {}));
var Hello1;
(function (Hello1) {
    Hello1[Hello1["World1"] = 0] = "World1";
})(Hello1 || (Hello1 = {}));
class Foo {
    // Same names + string => OK
    Bar = Bar;
    // Same names + enum => OK
    Hello = Hello;
    // Different names + enum => OK
    Hello2 = Hello1;
}
