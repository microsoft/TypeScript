//// [mergedModuleDeclarationCodeGen2.ts]
module my.data.foo {
    export function buz() { }
}
module my.data {
    function data(my) {
        foo.buz();
    }
}

//// [mergedModuleDeclarationCodeGen2.js]
var my;
(function (my) {
    var data;
    (function (data) {
        var foo;
        (function (foo) {
            function buz() { }
            foo.buz = buz;
        })(foo = data.foo || (data.foo = {}));
    })(data = my.data || (my.data = {}));
})(my || (my = {}));
(function (my_1) {
    var data;
    (function (data_1) {
        function data(my) {
            data_1.foo.buz();
        }
    })(data = my_1.data || (my_1.data = {}));
})(my || (my = {}));
