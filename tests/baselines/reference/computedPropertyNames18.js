//// [computedPropertyNames18.ts]
function foo() {
    var obj = {
        [this.bar]: 0
    }
}

//// [computedPropertyNames18.js]
function foo() {
    var obj = {
        [this.bar]: 0
    };
}
