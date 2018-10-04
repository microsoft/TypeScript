//// [mergedModuleDeclarationCodeGen3.ts]
module my.data {
    export function buz() { }
}
module my.data.foo {
    function data(my, foo) {
        buz();
    }
}

//// [mergedModuleDeclarationCodeGen3.js]
var my;
(function (my) {
    var data;
    (function (data) {
        function buz() { }
        data.buz = buz;
    })(data = my.data || (my.data = {}));
})(my || (my = {}));
(function (my_1) {
    var data;
    (function (data_1) {
        var foo;
        (function (foo_1) {
            function data(my, foo) {
                data_1.buz();
            }
        })(foo = data_1.foo || (data_1.foo = {}));
    })(data = my_1.data || (my_1.data = {}));
})(my || (my = {}));
