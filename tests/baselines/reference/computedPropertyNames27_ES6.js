//// [computedPropertyNames27_ES6.ts]
class Base {
}
class C extends Base {
    [(super(), "prop")]() { }
}

//// [computedPropertyNames27_ES6.js]
class Base {
}
class C extends Base {
    [(super(), "prop")]() { }
}
