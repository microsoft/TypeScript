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
var my = my || (my = {});
(function (my) {
    var data = my.data || (my.data = {});
    (function (data) {
        var foo = data.foo || (data.foo = {});
        (function (foo) {
            function buz() { }
            foo.buz = buz;
        })(foo);
    })(data);
})(my);
(function (my_1) {
    var data = my_1.data || (my_1.data = {});
    (function (data_1) {
        function data(my) {
            data_1.foo.buz();
        }
    })(data);
})(my);
