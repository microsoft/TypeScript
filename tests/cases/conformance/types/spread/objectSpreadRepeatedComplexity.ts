// @strict: true
function f(cnd: Record<number, boolean>){
    // Type is a union of 2^(n-1) members, where n is the number of spread objects
    return {
        // Without this one, it collapses to {} ?
        ...(cnd[1] &&
            cnd[2] && {
            prop0: 0,
        }),

        // With one prop each, it collapses to a single object (#34853?)
        ...(cnd[3] && {
            prop3a: 1,
            prop3b: 1,
        }),
        ...(cnd[4] && {
            prop4a: 1,
            prop4b: 1,
        }),
        ...(cnd[5] && {
            prop5a: 1,
            prop5b: 1,
        }),
        ...(cnd[6] && {
            prop6a: 1,
            prop6b: 1,
        }),
        ...(cnd[7] && {
            prop7a: 1,
            prop7b: 1,
        }),
        ...(cnd[8] && {
            prop8a: 1,
            prop8b: 1,
        }),
        ...(cnd[9] && {
            prop9a: 1,
            prop9b: 1,
        }),
        ...(cnd[10] && {
            prop10a: 1,
            prop10b: 1,
        }),
        ...(cnd[11] && {
            prop11a: 1,
            prop11b: 1,
        }),
        ...(cnd[12] && {
            prop12a: 1,
            prop12b: 1,
        }),
        ...(cnd[13] && {
            prop13a: 1,
            prop13b: 1,
        }),
        ...(cnd[14] && {
            prop14a: 1,
            prop14b: 1,
        }),
        ...(cnd[15] && {
            prop15a: 1,
            prop15b: 1,
        }),
        ...(cnd[16] && {
            prop16a: 1,
            prop16b: 1,
        }),
        ...(cnd[17] && {
            prop17a: 1,
            prop17b: 1,
        }),
        ...(cnd[18] && {
            prop18a: 1,
            prop18b: 1,
        }),
        ...(cnd[19] && {
            prop19a: 1,
            prop19b: 1,
        }),
        ...(cnd[20] && {
            prop20a: 1,
            prop20b: 1,
        }),
    };
}