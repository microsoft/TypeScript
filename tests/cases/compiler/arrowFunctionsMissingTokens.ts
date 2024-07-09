
module missingArrowsWithCurly {
    var a = () { };

    var b = (): void { }

    var c = (x) { };

    var d = (x: number, y: string) { };

    var e = (x: number, y: string): void { };
}

module missingCurliesWithArrow {
    module withStatement {
        var a = () => var k = 10;};

        var b = (): void => var k = 10;}

        var c = (x) => var k = 10;};

        var d = (x: number, y: string) => var k = 10;};

        var e = (x: number, y: string): void => var k = 10;};

        var f = () => var k = 10;}
    }

    module withoutStatement {
        var a = () => };

        var b = (): void => }

        var c = (x) => };

        var d = (x: number, y: string) => };

        var e = (x: number, y: string): void => };

        var f = () => }
    }
}

module ce_nEst_pas_une_arrow_function {
    var a = ();

    var b = (): void;

    var c = (x);

    var d = (x: number, y: string);

    var e = (x: number, y: string): void;
}

module okay {
    var a = () => { };

    var b = (): void => { }

    var c = (x) => { };

    var d = (x: number, y: string) => { };

    var e = (x: number, y: string): void => { };
}