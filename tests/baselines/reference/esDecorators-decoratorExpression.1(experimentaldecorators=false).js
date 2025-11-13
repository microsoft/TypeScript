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
    @x().y
    class C {
    }
}
{
    @new x
    class C {
    }
}
{
    @x().y()
    class C {
    }
}
{
    @x?.y
    class C {
    }
}
{
    @x?.y()
    class C {
    }
}
{
    @x?.["y"]
    class C {
    }
}
{
    @x?.()
    class C {
    }
}
{
    @x ``
    class C {
    }
}
{
    @x ``()
    class C {
    }
}
{
    @x.y ``
    class C {
    }
}
{
    @x.y ``()
    class C {
    }
}
{
    class C {
        @x().y
        m() { }
    }
}
{
    class C {
        @new x
        m() { }
    }
}
{
    class C {
        @x().y()
        m() { }
    }
}
{
    class C {
        @x?.y
        m() { }
    }
}
{
    class C {
        @x?.y()
        m() { }
    }
}
{
    class C {
        @x?.["y"]
        m() { }
    }
}
{
    class C {
        @x?.()
        m() { }
    }
}
{
    class C {
        @x ``
        m() { }
    }
}
{
    class C {
        @x ``()
        m() { }
    }
}
{
    class C {
        @x.y ``
        m() { }
    }
}
{
    class C {
        @x.y ``()
        m() { }
    }
}
