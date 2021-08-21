//@target: ES2021
class Parent {
    concat(...args) {
        console.log(this, ...args)
    }
}
class Test extends Parent {
    *b() {
        const a = do {
            yield;
            console.log(super["concat"]);
            console.log(super.concat);
            super.concat(1,2);
            super["concat"](1,2);
            1;
        }
    }
}
[...new Test().b()]
// Correct result:
// [Function: concat]
// [Function: concat]
// Test {} 1 2
// Test {} 1 2
