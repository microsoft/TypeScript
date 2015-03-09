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
        function buz() {
        }
        data.buz = buz;
    })(data = my.data || (my.data = {}));
})(my || (my = {}));
var my;
(function (_my) {
    var data;
    (function (_data) {
        var foo;
        (function (_foo) {
            function data(my, foo) {
                _data.buz();
            }
        })(foo = _data.foo || (_data.foo = {}));
    })(data = _my.data || (_my.data = {}));
})(my || (my = {}));
