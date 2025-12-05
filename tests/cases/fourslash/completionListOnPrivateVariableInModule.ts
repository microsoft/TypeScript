/// <reference path='fourslash.ts'/>

//// namespace Foo {     var testing = "";     test/**/ }

verify.completions({ marker: "", includes: { name: "testing", text: "var testing: string" } });
