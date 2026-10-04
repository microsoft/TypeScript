//@target: ES6
class C {
    get [Symbol.hasInstance]() {
        return "";
    }
    get [Symbol.toPrimitive]() {
        return "";
    }
}