// Repro from #6072

class Foo {}

function maker (value: string): typeof maker.Bar {
    return maker.Bar;
}

namespace maker {
    export class Bar extends Foo {}
}
