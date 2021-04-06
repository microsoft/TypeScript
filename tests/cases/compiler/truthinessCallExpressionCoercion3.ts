// @strictNullChecks: true
// @lib: esnext,dom

// from #41640, based on an example in ant-design
interface I {
    always(): void
}

function f(result: unknown) {
    if ((result as I).always) {
        return result
    }
}
function g(result: unknown) {
    if (((result as I)).always) {
        return result
    }
}
