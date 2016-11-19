//// [typePredicateStructuralMatch.ts]
// Repro from #12235

getResults1([]);
getResults1({data: []});

getResults2([]);
getResults2({data: []});

type Result = { value: string };
type Results = Result[];

function isResponseInData<T>(value: T | { data: T}): value is { data: T } {
    return value.hasOwnProperty('data');
}

function getResults1(value: Results | { data: Results }): Results {
    return isResponseInData(value) ? value.data : value;
}

function isPlainResponse<T>(value: T | { data: T}): value is T {
    return !value.hasOwnProperty('data');
}

function getResults2(value: Results | { data: Results }): Results {
    return isPlainResponse(value) ? value : value.data;
}

//// [typePredicateStructuralMatch.js]
// Repro from #12235
getResults1([]);
getResults1({ data: [] });
getResults2([]);
getResults2({ data: [] });
function isResponseInData(value) {
    return value.hasOwnProperty('data');
}
function getResults1(value) {
    return isResponseInData(value) ? value.data : value;
}
function isPlainResponse(value) {
    return !value.hasOwnProperty('data');
}
function getResults2(value) {
    return isPlainResponse(value) ? value : value.data;
}
