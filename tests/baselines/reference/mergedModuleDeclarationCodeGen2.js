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
var my;
(function (_my) {
    var data;
    (function (_data) {
        function data(my) {
            _data.foo.buz();
        }
    })(data = _my.data || (_my.data = {}));
})(my || (my = {}));
