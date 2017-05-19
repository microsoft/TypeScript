/// <reference path='fourslash.ts' />

// @Filename: declarations.d.ts
////declare module /*module*/"jquery"

// @Filename: user.ts
///////<reference path="declarations.d.ts"/>
////import /*importFoo*/foo, {bar} from "jquery";
////import * as /*importBaz*/baz from "jquery";
////import /*importBang*/bang = require("jquery");
////foo/*useFoo*/(bar/*useBar*/, baz/*useBaz*/, bang/*useBang*/);

verify.quickInfoAt("useFoo", "import foo");
verify.goToDefinition({
    useFoo: "module",
    importFoo: "module"
});

verify.quickInfoAt("useBar", "import bar");
verify.goToDefinition("useBar", "module");

verify.quickInfoAt("useBaz", "import baz");
verify.goToDefinition({
    useBaz: "importBaz",
    importBaz: "module"
});

verify.quickInfoAt("useBang", "import bang = require(\"jquery\")");
verify.goToDefinition({
    useBang: "module",
    importBang: "module"
});
