//// [tests/cases/compiler/mergedModuleDeclarationCodeGen4.ts] ////

//// [mergedModuleDeclarationCodeGen4.ts]
namespace superContain {
    export namespace contain {
        export namespace my.buz {
            export namespace data {
                export function foo() { }
            }
        }
        export namespace my.buz {
            export namespace data {
                export function bar(contain, my, buz, data) {
                    foo();
                }
            }
        }
    }
}

//// [mergedModuleDeclarationCodeGen4.js]
var superContain;
(function (superContain) {
    var contain;
    (function (contain_1) {
        var my;
        (function (my) {
            var buz;
            (function (buz) {
                var data;
                (function (data) {
                    function foo() { }
                    data.foo = foo;
                })(data = buz.data || (buz.data = {}));
            })(buz = my.buz || (my.buz = {}));
        })(my = contain_1.my || (contain_1.my = {}));
        (function (my_1) {
            var buz;
            (function (buz_1) {
                var data;
                (function (data_1) {
                    function bar(contain, my, buz, data) {
                        data_1.foo();
                    }
                    data_1.bar = bar;
                })(data = buz_1.data || (buz_1.data = {}));
            })(buz = my_1.buz || (my_1.buz = {}));
        })(my = contain_1.my || (contain_1.my = {}));
    })(contain = superContain.contain || (superContain.contain = {}));
})(superContain || (superContain = {}));
