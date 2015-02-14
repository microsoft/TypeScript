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
    var contain;
    (function (_contain) {
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
        })(my = _contain.my || (_contain.my = {}));
        var my;
        (function (_my) {
            var buz;
            (function (_buz) {
                var data;
                (function (_data) {
                    function bar(contain, my, buz, data) {
                        _data.foo();
                    }
                    _data.bar = bar;
                })(data = _buz.data || (_buz.data = {}));
            })(buz = _my.buz || (_my.buz = {}));
        })(my = _contain.my || (_contain.my = {}));
    })(contain = superContain.contain || (superContain.contain = {}));
})(superContain || (superContain = {}));
