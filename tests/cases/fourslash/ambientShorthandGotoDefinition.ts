/// <reference path='fourslash.ts' />

// @Filename: declarations.d.ts
/////*module*/declare module "jquery"

// @Filename: user.ts
///////<reference path="declarations.d.ts"/>
////import /*importFoo*/foo, {bar} from "jquery";
////import /*importBaz*/* as /*idBaz*/baz from "jquery";
/////*importBang*/import /*idBang*/bang = require("jquery");
////foo/*useFoo*/(bar/*useBar*/, baz/*useBaz*/, bang/*useBang*/);

goTo.marker("useFoo");
verify.quickInfoIs("import foo");
verify.goToDefinition(
    "useFoo", "importFoo",
    "importFoo", "module");

goTo.marker("useBar");
verify.quickInfoIs("import bar");
verify.goToDefinition("useBar", "module");

goTo.marker("useBaz");
verify.quickInfoIs("import baz");
verify.goToDefinition(
    "useBaz", "importBaz",
    "idBaz", "module");

goTo.marker("useBang");
verify.quickInfoIs("import bang = require(\"jquery\")");
verify.goToDefinition(
    "useBang", "importBang",
    "idBang", "module");
