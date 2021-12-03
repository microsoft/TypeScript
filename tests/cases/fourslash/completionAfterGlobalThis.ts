/// <reference path='fourslash.ts'/>

////globalThis./**/

verify.completions({
    marker: "",
    unsorted: [
        completion.globalThisEntry,
        ...completion.globalsVars,
        completion.undefinedVarEntry
    ].map(e => {
        if (e.sortText === completion.SortText.DeprecatedGlobalsOrKeywords) {
            return { ...e, sortText: completion.SortText.DeprecatedLocationPriority };
        }
        return { ...e, sortText: completion.SortText.LocationPriority };
    })
});
