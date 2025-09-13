
namespace missingArrowsWithCurly {
    var a = () { };

    var b = (): void { }

    var c = (x) { };

    var d = (x: number, y: string) { };

    var e = (x: number, y: string): void { };
}

namespace missingCurliesWithArrow {
    namespace withStatement {
        var a = () => var k = 10;};

        var b = (): void => var k = 10;}

        var c = (x) => var k = 10;};

        var d = (x: number, y: string) => var k = 10;};

        var e = (x: number, y: string): void => var k = 10;};

        var f = () => var k = 10;}
    }

    namespace withoutStatement {
        var a = () => };

        var b = (): void => }

        var c = (x) => };

        var d = (x: number, y: string) => };

        var e = (x: number, y: string): void => };

        var f = () => }
    }
}

namespace ce_nEst_pas_une_arrow_function {
    var a = ();

    var b = (): void;

    var c = (x);

    var d = (x: number, y: string);

    var e = (x: number, y: string): void;
}

namespace okay {
    var a = () => { };

    var b = (): void => { }

    var c = (x) => { };

    var d = (x: number, y: string) => { };

    var e = (x: number, y: string): void => { };
}