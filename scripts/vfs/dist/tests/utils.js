"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function theory(name, data, callback) {
    describe(name, () => {
        for (const theory of data) {
            const title = Array.isArray(theory) ? theory.toString() : theory.title;
            const args = Array.isArray(theory) ? theory : theory.args;
            it(title, () => callback(...args));
        }
    });
}
exports.theory = theory;

//# sourceMappingURL=utils.js.map
