//// [tests/cases/compiler/misspelledNewMetaProperty.ts] ////

//// [misspelledNewMetaProperty.ts]
function foo(){new.targ}

//// [misspelledNewMetaProperty.js]
function foo() { new.targ; }
