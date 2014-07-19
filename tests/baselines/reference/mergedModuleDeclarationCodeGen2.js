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
(function (_my) {
    (function (_data) {
        function data(my) {
            _data.foo.buz();
        }
    })(_my.data || (_my.data = {}));
    var data = _my.data;
})(my || (my = {}));
