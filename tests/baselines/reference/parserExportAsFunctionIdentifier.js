//// [parserExportAsFunctionIdentifier.ts]
interface Foo {
       export(): string;
}

var f: Foo;
var x = f.export();


//// [parserExportAsFunctionIdentifier.js]
var f;
var x = f["export"]();
