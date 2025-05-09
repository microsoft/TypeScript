//// [tests/cases/conformance/esDecorators/esDecorators-decoratorExpression.2.ts] ////

//// [esDecorators-decoratorExpression.2.ts]
declare let x: any;
declare let g: <T>(...args: any) => any;
declare let h: () => <T>(...args: any) => any;

{ @x! class C {} }

{ @x.y! class C {} }

{ @x!.y class C {} }

{ @g<number>() class C {} }

{ @(g<number>) class C {} }

{ @(h()<number>) class C {} }

{ @(x().y) class C {} }

{ @(x().y()) class C {} }

{ @(x``) class C {} }

{ @(x.y``) class C {} }

{ @(x?.y!) class C {} }

{ @(x["y"]) class C {} }

{ @(x?.["y"]) class C {} }

{ class C { @x! m() {} } }

{ class C { @x.y! m() {} } }

{ class C { @x!.y m() {} } }

{ class C { @g<number>() m() {} } }

{ class C { @(g<number>) m() {} } }

{ class C { @(h()<number>) m() {} } }

{ class C { @(x().y) m() {} } }

{ class C { @(x().y()) m() {} } }

{ class C { @(x``) m() {} } }

{ class C { @(x.y``) m() {} } }

{ class C { @(x?.y!) m() {} } }

{ class C { @(x["y"]) m() {} } }

{ class C { @(x?.["y"]) m() {} } }


//// [esDecorators-decoratorExpression.2.js]
{
    let C = class C {
    };
    C = __decorate([
        x
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        x.y
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        x.y
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        g()
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        (g)
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        (h())
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        (x().y)
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        (x().y())
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        (x ``)
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        (x.y ``)
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        (x?.y)
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        (x["y"])
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        (x?.["y"])
    ], C);
}
{
    class C {
        m() { }
    }
    __decorate([
        x
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        x.y
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        x.y
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        g()
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        (g)
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        (h())
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        (x().y)
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        (x().y())
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        (x ``)
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        (x.y ``)
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        (x?.y)
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        (x["y"])
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        (x?.["y"])
    ], C.prototype, "m", null);
}
