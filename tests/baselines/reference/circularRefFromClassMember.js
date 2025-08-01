//// [tests/cases/compiler/circularRefFromClassMember.ts] ////

//// [circularRefFromClassMember.ts]
// Test for #61606

const result: boolean[] = [];
class Test {
    n: 42 | "" = 42 as any;
    foo(): void {
        if (this.n === "") {
            return;
        }
        for (let i = 0; i < 1; i++) {
            const localN = this.n;
            const localN_alias = localN;
            result[localN_alias] = true;
        }
    }
}


//// [circularRefFromClassMember.js]
// Test for #61606
var result = [];
var Test = /** @class */ (function () {
    function Test() {
        this.n = 42;
    }
    Test.prototype.foo = function () {
        if (this.n === "") {
            return;
        }
        for (var i = 0; i < 1; i++) {
            var localN = this.n;
            var localN_alias = localN;
            result[localN_alias] = true;
        }
    };
    return Test;
}());
