"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function theory(name, data, callback) {
    describe(name, () => {
        for (const row of typeof data === "function" ? data() : data) {
            it(row.toString(), () => callback(...row));
        }
    });
}
exports.theory = theory;
function recordError(action) {
    try {
        action();
        return undefined;
    }
    catch (e) {
        return e;
    }
}
exports.recordError = recordError;

//# sourceMappingURL=utils.js.map
