/// <reference path="fourslash.ts"/>

// @noLib: true

/////**/

verify.completions({ marker: "", exact: ["globalThis", "undefined", ...completion.statementKeywordsWithTypes] });
