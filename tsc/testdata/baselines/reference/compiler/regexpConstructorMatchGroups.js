//// [tests/cases/compiler/regexpConstructorMatchGroups.ts] ////

//// [regexpConstructorMatchGroups.ts]
declare const pattern: string;
const matches = "".match(new RegExp(pattern));
if (matches) matches.groups;


//// [regexpConstructorMatchGroups.js]
"use strict";
const matches = "".match(new RegExp(pattern));
if (matches)
    matches.groups;
