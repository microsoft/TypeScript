// @target: es2022
// @lib: es2022,es2023.intl
// @strict: true

const pr = new Intl.PluralRules("en-US");
const category = pr.selectRange(1, 2);

const exact: Intl.LDMLPluralRule = category;
