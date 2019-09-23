// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: true
// @target: es6
// @filename: lateBoundClassMemberAssignmentJS2.js
const _sym = "my-fake-sym";
class MyClass {
    constructor() {
        this[_sym] = "ok";
    }

    method() {
        this[_sym] = "yep";
        const x = this[_sym];
    }
}