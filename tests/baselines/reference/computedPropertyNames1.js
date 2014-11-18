//// [computedPropertyNames1.ts]
var v = {
    get [0 + 1]() { return 0 },
    set [0 + 1](v) { }
}

//// [computedPropertyNames1.js]
var v = {
    get [0 + 1]() {
        return 0;
    },
    set [0 + 1](v) {
    }
};
