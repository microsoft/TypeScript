// @strictNullChecks: true

// Repros from #10641

const CONFIG = {
    foo: '',
    setFoo: function(foo: string) {
        CONFIG.foo = foo;
    }
};

const helper = function<T>(t: T[]) {
    helper(t.slice(1));
}