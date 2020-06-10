//// [index.js]
// @ts-nocheck
function foo() {
    module.exports = exports = function (o) {
        return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
    };
    exports.methods = methods;
}

//// [index.js]
// @ts-nocheck
function foo() {
    module.exports = exports = function (o) {
        return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
    };
    exports.methods = methods;
}


//// [index.d.ts]
declare function _exports(o: any): any;
declare namespace _exports {
    const methods: any;
}
export = _exports;
