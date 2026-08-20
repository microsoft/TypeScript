// @target: es2015
// once caused stack overflow
class C {
    static get x() {
        return this;
    }
}
