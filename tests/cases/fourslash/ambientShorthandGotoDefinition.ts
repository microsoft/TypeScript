/// <reference path='fourslash.ts' />

// @Filename: declarations.d.ts
/////*module*/declare module "jquery"

// @Filename: user.ts
///////<reference path="declarations.d.ts"/>
////import /*importFoo*/foo, {bar} from "jquery";
////import /*importBaz*/* as /*idBaz*/baz from "jquery";
/////*importBang*/import /*idBang*/bang = require("jquery");
////foo/*useFoo*/(bar/*useBar*/, baz/*useBaz*/, bang/*useBang*/);

verify.quickInfoAt("useFoo", "import foo");
verify.goToDefinition({
    useFoo: "importFoo",
    importFoo: "module"
});

verify.quickInfoAt("useBar", "import bar");
verify.goToDefinition("useBar", "module");

verify.quickInfoAt("useBaz", "import baz");
verify.goToDefinition({
    useBaz: "importBaz",
    idBaz: "module"
});

verify.quickInfoAt("useBang", "import bang = require(\"jquery\")");
verify.goToDefinition({
    useBang: "importBang",
    idBang: "module"
});
