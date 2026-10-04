// @target: es2022
// @noTypesAndSymbols: true

namespace N {
    export const key = "a";
    export const source: any = { a: 1, b: undefined, pair: [3, 4] };
    export const fallback = 2;

    export const { [key]: computed, b = fallback } = source;
    export const [x, y] = source.pair;
}
