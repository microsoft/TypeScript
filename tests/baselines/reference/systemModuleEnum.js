//// [systemModuleEnum.ts]

export enum Foo {}

export module Bar {
	export var baz = (): any => {}
}


//// [systemModuleEnum.js]
System.register([], function(exports_1) {
    var Foo, Bar;
    return {
        setters:[],
        execute: function() {
            (function (Foo) {
            })(Foo || (Foo = {}));
            exports_1("Foo", Foo);
            (function (Bar) {
                Bar.baz = function () { };
            })(Bar = Bar || (Bar = {}));
            exports_1("Bar", Bar);
        }
    }
});
