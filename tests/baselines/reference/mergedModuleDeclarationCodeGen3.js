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
(function (_my) {
    (function (_data) {
        (function (_foo) {
            function data(my, foo) {
                _data.buz();
            }
        })(_data.foo || (_data.foo = {}));
        var foo = _data.foo;
    })(_my.data || (_my.data = {}));
    var data = _my.data;
})(my || (my = {}));
