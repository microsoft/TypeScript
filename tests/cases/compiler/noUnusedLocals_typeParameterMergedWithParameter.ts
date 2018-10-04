// @noUnusedLocals: true
// @noUnusedParameters: true

function useNone<T>(T: number) {}

function useParam<T>(T: number) {
    return T;
}

function useTypeParam<T>(T: T) {}

function useBoth<T>(T: T) {
    return T;
}
