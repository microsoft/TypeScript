/// <reference path='fourslash.ts' />

// @Filename: declarations.d.ts
////declare module /*module*/"jquery"

// @Filename: user.ts
///////<reference path="declarations.d.ts"/>
////import [|/*importFoo*/foo|], {bar} from "jquery";
////import * as [|/*importBaz*/baz|] from "jquery";
////import [|/*importBang*/bang|] = require("jquery");
////[|foo/*useFoo*/|]([|bar/*useBar*/|], [|baz/*useBaz*/|], [|bang/*useBang*/|]);

verify.quickInfoAt("useFoo", "(alias) module \"jquery\"\nimport foo");
verify.quickInfoAt("useBar", "(alias) module \"jquery\"\nimport bar");
verify.quickInfoAt("useBaz", "(alias) module \"jquery\"\nimport baz");
verify.quickInfoAt("useBang", "(alias) module \"jquery\"\nimport bang = require(\"jquery\")");

verify.baselineGoToDefinition(
    "useFoo", "importFoo",
    "useBar",
    "useBaz", "importBaz",
    "useBang", "importBang"
);