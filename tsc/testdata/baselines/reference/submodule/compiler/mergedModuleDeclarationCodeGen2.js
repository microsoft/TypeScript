//// [tests/cases/compiler/mergedModuleDeclarationCodeGen2.ts] ////

//// [mergedModuleDeclarationCodeGen2.ts]
namespace my.data.foo {
    export function buz() { }
}
namespace my.data {
    function data(my) {
        foo.buz();
    }
}

//// [mergedModuleDeclarationCodeGen2.js]
"use strict";
var my;
(function (my) {
    let data;
    (function (data) {
        let foo;
        (function (foo) {
            function buz() { }
            foo.buz = buz;
        })(foo = data.foo || (data.foo = {}));
    })(data = my.data || (my.data = {}));
})(my || (my = {}));
(function (my_1) {
    let data;
    (function (data_1) {
        function data(my) {
            data_1.foo.buz();
        }
    })(data = my_1.data || (my_1.data = {}));
})(my || (my = {}));
