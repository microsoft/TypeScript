/// <reference path="fourslash.ts"/>

// @noLib: true

/////**/

verify.completions({
    marker: "",
    exact: [
        completion.globalThisEntry,
        completion.undefinedVarEntry,
        ...completion.statementKeywordsWithTypes
    ]
});
