/// <reference path='fourslash.ts'/>

////globalThis./**/

verify.completions({
    marker: "",
    unsorted: [
        completion.globalThisEntry,
        ...completion.globalsVars,
        completion.undefinedVarEntry
    ].map(e => {
        if (e.sortText === completion.SortText.Deprecated(completion.SortText.GlobalsOrKeywords)) {
            return { ...e, sortText: completion.SortText.Deprecated(completion.SortText.LocationPriority) };
        }
        return { ...e, sortText: completion.SortText.LocationPriority };
    })
});
