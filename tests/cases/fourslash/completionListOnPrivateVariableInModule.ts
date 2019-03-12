/// <reference path='fourslash.ts'/>

//// module Foo {     var testing = "";     test/**/ }

verify.completions({ marker: "", includes: { name: "testing", text: "var testing: string" } });
