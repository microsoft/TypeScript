//// [tests/cases/conformance/es2023/intlPluralRulesSelectRangeES2023.ts] ////

//// [intlPluralRulesSelectRangeES2023.ts]
const pr = new Intl.PluralRules("en-US");
const category = pr.selectRange(1, 2);

const exact: Intl.LDMLPluralRule = category;


//// [intlPluralRulesSelectRangeES2023.js]
"use strict";
const pr = new Intl.PluralRules("en-US");
const category = pr.selectRange(1, 2);
const exact = category;
