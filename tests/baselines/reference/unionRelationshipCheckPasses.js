//// [unionRelationshipCheckPasses.ts]
const item: { foo?: undefined } | { foo: number } = null as any as { foo?: number | undefined };


//// [unionRelationshipCheckPasses.js]
"use strict";
var item = null;
