/// <reference path="fourslash.ts"/>

// @noLib: true

/////**/

verify.completions({ marker: "", exact: ["undefined", "globalThis", ...completion.statementKeywordsWithTypes] });
