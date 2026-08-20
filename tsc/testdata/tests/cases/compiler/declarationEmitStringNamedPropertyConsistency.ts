// @declaration: true
// @emitDeclarationOnly: true

function createSlice<T>(o: T) {
    return o
}
export const platformSlice = createSlice({
    "query": {
        "search" : "",
        "user": ""
    },
});
