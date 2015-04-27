//// [systemModule5.ts]

export function foo() {}


//// [systemModule5.js]
System.register([], function(exports_1) {
    function foo() { }
    exports_1("foo", foo);
    return {
        setters:[],
        execute: function() {
        }
    }
});
