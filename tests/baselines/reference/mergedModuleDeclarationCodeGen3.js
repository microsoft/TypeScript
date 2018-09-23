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
var my = my || (my = {});
(function (my) {
    var data = my.data || (my.data = {});
    (function (data) {
        function buz() { }
        data.buz = buz;
    })(data);
})(my);
(function (my_1) {
    var data = my_1.data || (my_1.data = {});
    (function (data_1) {
        var foo = data_1.foo || (data_1.foo = {});
        (function (foo_1) {
            function data(my, foo) {
                data_1.buz();
            }
        })(foo);
    })(data);
})(my);
