// @allowJs: true
// @checkJs: true
// @emitDeclarationOnly: true
// @strict: true
// @target: es6
// @declaration: true
// @filename: lateBoundClassMemberAssignmentJS.js
const _sym = Symbol("_sym");
export class MyClass {
    constructor() {
        var self = this
        self[_sym] = "ok";
    }

    method() {
        var self = this
        self[_sym] = "yep";
        const x = self[_sym];
    }
}
