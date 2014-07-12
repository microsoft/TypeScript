//// [mergedModuleDeclarationCodeGen4.ts]
module superContain {
    export module contain {
        export module my.buz {
            export module data {
                export function foo() { }
            }
        }
        export module my.buz {
            export module data {
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
    (function (contain) {
        (function (my) {
            (function (buz) {
                (function (data) {
                    function foo() {
                    }
                    data.foo = foo;
                })(buz.data || (buz.data = {}));
                var data = buz.data;
            })(my.buz || (my.buz = {}));
            var buz = my.buz;
        })(contain.my || (contain.my = {}));
        var my = contain.my;
        (function (my) {
            (function (buz) {
                (function (data) {
                    function bar(contain, my, buz, data) {
                        data.foo();
                    }
                    data.bar = bar;
                })(buz.data || (buz.data = {}));
                var data = buz.data;
            })(my.buz || (my.buz = {}));
            var buz = my.buz;
        })(contain.my || (contain.my = {}));
        var my = contain.my;
    })(superContain.contain || (superContain.contain = {}));
    var contain = superContain.contain;
})(superContain || (superContain = {}));
