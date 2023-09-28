// @strict: true
// @noEmit: true

// From #47357

function foo<T extends Record<string | symbol, any>>(target: T, p: string | symbol) {
    target[p] = "";
}