/// <reference path='fourslash.ts'/>

////globalThis./**/

// TODO: This is right except for globalThis and undefined
verify.completions({
    marker: "",
    exact: [
        { name: "globalThis", kind: "module" },
        ...completion.globalsVars,
        { name: "undefined", kind: "var" }
    ]
});
