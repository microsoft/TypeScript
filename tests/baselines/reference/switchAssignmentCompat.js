//// [tests/cases/compiler/switchAssignmentCompat.ts] ////

//// [switchAssignmentCompat.ts]
class Foo { }

switch (0) {
    case Foo: break; // Error expected
}


//// [switchAssignmentCompat.js]
"use strict";
class Foo {
}
switch (0) {
    case Foo: break; // Error expected
}
