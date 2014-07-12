//// [aliasBug.js]
var foo;
(function (foo) {
    var Provide = (function () {
        function Provide() {
        }
        return Provide;
    })();
    foo.Provide = Provide;

    (function (bar) {
        (function (baz) {
            var boo = (function () {
                function boo() {
                }
                return boo;
            })();
            baz.boo = boo;
        })(bar.baz || (bar.baz = {}));
        var baz = bar.baz;
    })(foo.bar || (foo.bar = {}));
    var bar = foo.bar;
})(foo || (foo = {}));

var provide = foo;
var booz = foo.bar.baz;

var p = new provide.Provide();

function use() {
    var p1;
    var p2;
    var p3;
    var p22 = new provide.Provide();
}
