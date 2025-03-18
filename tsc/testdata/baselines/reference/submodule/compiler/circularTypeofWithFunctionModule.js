//// [tests/cases/compiler/circularTypeofWithFunctionModule.ts] ////

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
class Foo {
}
function maker(value) {
    return maker.Bar;
}
(function (maker) {
    class Bar extends Foo {
    }
    maker.Bar = Bar;
})(maker || (maker = {}));
