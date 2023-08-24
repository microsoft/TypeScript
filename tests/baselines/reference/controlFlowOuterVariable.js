//// [tests/cases/compiler/controlFlowOuterVariable.ts] ////

//// [controlFlowOuterVariable.ts]
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

//// [controlFlowOuterVariable.js]
// Repros from #10641
var CONFIG = {
    foo: '',
    setFoo: function (foo) {
        CONFIG.foo = foo;
    }
};
var helper = function (t) {
    helper(t.slice(1));
};
