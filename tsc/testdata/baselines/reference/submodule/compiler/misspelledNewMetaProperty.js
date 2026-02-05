//// [tests/cases/compiler/misspelledNewMetaProperty.ts] ////

//// [misspelledNewMetaProperty.ts]
function foo(){new.targ}

//// [misspelledNewMetaProperty.js]
"use strict";
function foo() { new.targ; }
