// @target: es2015
// once caused stack overflow
class C {
    static x() {
        var r = this;
        return this;
    }
}