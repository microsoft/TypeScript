//// [tests/cases/compiler/mergedModuleDeclarationCodeGen4.ts] ////

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
    let contain;
    (function (contain_1) {
        let my;
        (function (my) {
            let buz;
            (function (buz) {
                let data;
                (function (data) {
                    function foo() { }
                    data.foo = foo;
                })(data = buz.data || (buz.data = {}));
            })(buz = my.buz || (my.buz = {}));
        })(my = contain_1.my || (contain_1.my = {}));
        (function (my_1) {
            let buz;
            (function (buz_1) {
                let data;
                (function (data_1) {
                    function bar(contain, my, buz, data) {
                        foo();
                    }
                    data_1.bar = bar;
                })(data = buz_1.data || (buz_1.data = {}));
            })(buz = my_1.buz || (my_1.buz = {}));
        })(my = contain_1.my || (contain_1.my = {}));
    })(contain = superContain.contain || (superContain.contain = {}));
})(superContain || (superContain = {}));
