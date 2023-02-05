// @target:es5
// @experimentaldecorators: true

// from #2971
function func(s: string): void {
}

class A {
    @((x, p, d) => {
        var a = 3;
        func(a);
        return d;
    })
    m() {

    }
}