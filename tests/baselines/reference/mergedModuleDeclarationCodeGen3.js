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
    (function (data) {
        function buz() {
        }
        data.buz = buz;
    })(my.data || (my.data = {}));
    var data = my.data;
})(my || (my = {}));
var my;
(function (my) {
    (function (data) {
        (function (foo) {
            function data(my, foo) {
                data.buz();
            }
        })(data.foo || (data.foo = {}));
        var foo = data.foo;
    })(my.data || (my.data = {}));
    var data = my.data;
})(my || (my = {}));
