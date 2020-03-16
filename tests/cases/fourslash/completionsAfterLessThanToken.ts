/// <reference path="fourslash.ts" />

//// function f() {
//// 	const k: Record</**/
//// }

goTo.marker();
verify.completions({
    includes: [
        { name: "string", sortText: completion.SortText.GlobalsOrKeywords }
    ]
});
