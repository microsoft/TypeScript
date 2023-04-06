/// <reference path="fourslash.ts" />

// @Filename: a.ts
////export default function /*def*/f() {}

// @Filename: b.ts
////import /*deg*/g from "./a";
////[|/*ref*/g|]();

// @Filename: c.ts
////import { f } from "./a";

verify.baselineCommands(
    { type: "findAllReferences", markerOrRange: ['def', 'deg'] },
    { type: "goToDefinition", markerOrRange: "ref" },
);
