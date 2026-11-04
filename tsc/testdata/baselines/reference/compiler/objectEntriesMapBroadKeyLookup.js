//// [tests/cases/compiler/objectEntriesMapBroadKeyLookup.ts] ////

//// [objectEntriesMapBroadKeyLookup.ts]
declare const languages: Record<"en" | "fr", string>;
declare const language: string;

new Map(Object.entries(languages)).get(language);


//// [objectEntriesMapBroadKeyLookup.js]
"use strict";
new Map(Object.entries(languages)).get(language);
