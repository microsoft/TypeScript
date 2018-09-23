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
var superContain = superContain || (superContain = {});
(function (superContain) {
    var contain = superContain.contain || (superContain.contain = {});
    (function (contain_1) {
        var my = contain_1.my || (contain_1.my = {});
        (function (my) {
            var buz = my.buz || (my.buz = {});
            (function (buz) {
                var data = buz.data || (buz.data = {});
                (function (data) {
                    function foo() { }
                    data.foo = foo;
                })(data);
            })(buz);
        })(my);
        (function (my_1) {
            var buz = my_1.buz || (my_1.buz = {});
            (function (buz_1) {
                var data = buz_1.data || (buz_1.data = {});
                (function (data_1) {
                    function bar(contain, my, buz, data) {
                        data_1.foo();
                    }
                    data_1.bar = bar;
                })(data);
            })(buz);
        })(my);
    })(contain);
})(superContain);
