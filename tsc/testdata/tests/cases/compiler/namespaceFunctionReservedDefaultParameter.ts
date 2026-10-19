// @target: es2015

namespace Dependencies {
    export function scripts(static = false) {
        if (static) {
            return "static.js";
        }
        return "interactive.js";
    }
}
