//// [tests/cases/compiler/declarationEmitStringNamedPropertyConsistency.ts] ////

//// [declarationEmitStringNamedPropertyConsistency.ts]
function createSlice<T>(o: T) {
    return o
}
export const platformSlice = createSlice({
    "query": {
        "search" : "",
        "user": ""
    },
});




//// [declarationEmitStringNamedPropertyConsistency.d.ts]
export declare const platformSlice: {
    query: {
        search: string;
        user: string;
    };
};
