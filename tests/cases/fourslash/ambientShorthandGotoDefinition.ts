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
goTo.definition();
verify.caretAtMarker("importFoo");
goTo.definition();
verify.caretAtMarker("module");

goTo.marker("useBar");
verify.quickInfoIs("import bar");
goTo.definition();
verify.caretAtMarker("module");

goTo.marker("useBaz");
verify.quickInfoIs("import baz");
goTo.definition();
verify.caretAtMarker("importBaz");
goTo.marker("idBaz");
goTo.definition();
verify.caretAtMarker("module");

goTo.marker("useBang");
verify.quickInfoIs("import bang = require(\"jquery\")");
goTo.definition();
verify.caretAtMarker("importBang");
goTo.marker("idBang");
goTo.definition();
verify.caretAtMarker("module");
