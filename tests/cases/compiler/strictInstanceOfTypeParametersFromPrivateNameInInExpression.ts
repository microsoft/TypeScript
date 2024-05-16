// @strictInstanceOfTypeParameters: true
// @target: es2015

class UnconstrainedWithPrivate<T> {
    #brand;
    value: T;
    constructor(value: T) {
        this.value = value;
    }
    copyValue(other: object) {
        if (#brand in other) {
            this.value = other.value;
        }
    }
}

class ConstrainedWithPrivate<T extends string> {
    #brand;
    value: T;
    copyValue(other: object) {
        if (#brand in other) {
            this.value = other.value;
        }
    }
}
