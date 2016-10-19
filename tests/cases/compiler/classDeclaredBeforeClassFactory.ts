// Should be OK due to hoisting
class Derived extends makeBaseClass() {}

function makeBaseClass() {
    return class Base {};
}
