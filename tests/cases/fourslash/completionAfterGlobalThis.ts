/// <reference path='fourslash.ts'/>

////globalThis./**/

verify.completions({
    marker: "",
    exact: [
        { name: "globalThis", kind: "module" },
        ...completion.globalsVars,
        { name: "undefined", kind: "var" }
    ]
});
