//// [noUnusedLocals_typeParameterMergedWithParameter.ts]
function useNone<T>(T: number) {}

function useParam<T>(T: number) {
    return T;
}

function useTypeParam<T>(T: T) {}

function useBoth<T>(T: T) {
    return T;
}


//// [noUnusedLocals_typeParameterMergedWithParameter.js]
function useNone(T) { }
function useParam(T) {
    return T;
}
function useTypeParam(T) { }
function useBoth(T) {
    return T;
}
