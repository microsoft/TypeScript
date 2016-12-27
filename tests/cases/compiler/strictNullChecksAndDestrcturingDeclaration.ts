// @strictNullChecks: true
// @declaration: true

// Repro from #10078

class A {
    f({x}: { x?: boolean } = {}) { };
}
class B extends A {
    f({x, y}: { x?: boolean, y?: boolean } = {}) { };
}