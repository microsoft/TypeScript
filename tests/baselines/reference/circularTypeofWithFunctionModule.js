//// [circularTypeofWithFunctionModule.ts]
// Repro from #6072

class Foo {}

function maker (value: string): typeof maker.Bar {
    return maker.Bar;
}

namespace maker {
    export class Bar extends Foo {}
}


//// [circularTypeofWithFunctionModule.js]
// Repro from #6072
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
function maker(value) {
    return maker.Bar;
}
var maker;
(function (maker) {
    var Bar = (function (_super) {
        __extends(Bar, _super);
        function Bar() {
            _super.apply(this, arguments);
        }
        return Bar;
    }(Foo));
    maker.Bar = Bar;
})(maker || (maker = {}));
