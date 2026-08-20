// @target: es2015
// @strict: false
class f {
    set x(value) {
        return null; // Should be an error
    }
}

