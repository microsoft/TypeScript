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
    (function (data) {
        (function (foo) {
            function buz() {
            }
            foo.buz = buz;
        })(data.foo || (data.foo = {}));
        var foo = data.foo;
    })(my.data || (my.data = {}));
    var data = my.data;
})(my || (my = {}));
var my;
(function (my) {
    (function (data) {
        function data(my) {
            data.foo.buz();
        }
    })(my.data || (my.data = {}));
    var data = my.data;
})(my || (my = {}));
