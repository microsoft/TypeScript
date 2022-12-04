/// <reference path='fourslash.ts'/>

////globalThis./**/

verify.completions({
    marker: "",
    unsorted: [
        completion.globalThisEntry,
        ...completion.globalsVars,
        ...completion.pseudoVars
    ].map(e => {
        if (e.sortText === completion.SortText.Deprecated(completion.SortText.GlobalsOrKeywords)) {
            return { ...e, sortText: completion.SortText.Deprecated(completion.SortText.LocationPriority) };
        }
        return { ...e, sortText: completion.SortText.LocationPriority };
    })
});
