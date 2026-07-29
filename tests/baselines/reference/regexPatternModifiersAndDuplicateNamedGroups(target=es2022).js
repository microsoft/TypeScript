//// [tests/cases/conformance/es2025/regexPatternModifiersAndDuplicateNamedGroups.ts] ////

//// [regexPatternModifiersAndDuplicateNamedGroups.ts]
const dupNames = /(?<y>\d{4})-\d{2}|\d{2}\/(?<y>\d{4})/;
const modifiers = /(?i:abc)/;

//// [regexPatternModifiersAndDuplicateNamedGroups.js]
"use strict";
const dupNames = /(?<y>\d{4})-\d{2}|\d{2}\/(?<y>\d{4})/;
const modifiers = /(?i:abc)/;
