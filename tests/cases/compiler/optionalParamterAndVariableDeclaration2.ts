// @target: es2015
// @strictNullChecks: true

class C {
    constructor(options?: number) {
        var options = (options || 0);
    }
}
