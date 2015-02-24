//@target: ES6
var x = {
    [Symbol()]: 0,
    [Symbol()]() { },
    get [Symbol()]() {
        return 0;
    }
}