//// [tests/cases/compiler/objectFromEntriesAdditionalProperty.ts] ////

//// [objectFromEntriesAdditionalProperty.ts]
declare const keys: ("language" | "theme")[];
const settings = Object.fromEntries(keys.map(key => [key, ""]));
settings.timestamp = "";


//// [objectFromEntriesAdditionalProperty.js]
"use strict";
const settings = Object.fromEntries(keys.map(key => [key, ""]));
settings.timestamp = "";
