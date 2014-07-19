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
    (function (_contain) {
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
        })(_contain.my || (_contain.my = {}));
        var my = _contain.my;
        (function (_my) {
            (function (_buz) {
                (function (_data) {
                    function bar(contain, my, buz, data) {
                        _data.foo();
                    }
                    _data.bar = bar;
                })(_buz.data || (_buz.data = {}));
                var data = _buz.data;
            })(_my.buz || (_my.buz = {}));
            var buz = _my.buz;
        })(_contain.my || (_contain.my = {}));
        var my = _contain.my;
    })(superContain.contain || (superContain.contain = {}));
    var contain = superContain.contain;
})(superContain || (superContain = {}));
