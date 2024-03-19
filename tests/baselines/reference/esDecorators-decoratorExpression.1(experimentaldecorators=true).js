//// [tests/cases/conformance/esDecorators/esDecorators-decoratorExpression.1.ts] ////

//// [esDecorators-decoratorExpression.1.ts]
declare let x: any;

{ @x().y class C {} }

{ @new x class C {} }

{ @x().y() class C {} }

{ @x?.y class C {} }

{ @x?.y() class C {} }

{ @x?.["y"] class C {} }

{ @x?.() class C {} }

{ @x`` class C {} }

{ @x``() class C {} }

{ @x.y`` class C {} }

{ @x.y``() class C {} }

{ class C { @x().y m() {} } }

{ class C { @new x m() {} } }

{ class C { @x().y() m() {} } }

{ class C { @x?.y m() {} } }

{ class C { @x?.y() m() {} } }

{ class C { @x?.["y"] m() {} } }

{ class C { @x?.() m() {} } }

{ class C { @x`` m() {} } }

{ class C { @x``() m() {} } }

{ class C { @x.y`` m() {} } }

{ class C { @x.y``() m() {} } }


//// [esDecorators-decoratorExpression.1.js]
{
    let C = class C {
    };
    C = __decorate([
        x().y
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        new x
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        x().y()
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        x?.y
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        x?.y()
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        x?.["y"]
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        x?.()
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        x ``
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        x ``()
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        x.y ``
    ], C);
}
{
    let C = class C {
    };
    C = __decorate([
        x.y ``()
    ], C);
}
{
    class C {
        m() { }
    }
    __decorate([
        x().y
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        new x
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        x().y()
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        x?.y
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        x?.y()
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        x?.["y"]
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        x?.()
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        x ``
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        x ``()
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        x.y ``
    ], C.prototype, "m", null);
}
{
    class C {
        m() { }
    }
    __decorate([
        x.y ``()
    ], C.prototype, "m", null);
}
