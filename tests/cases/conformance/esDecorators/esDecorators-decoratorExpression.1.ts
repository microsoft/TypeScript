// @target: esnext
// @experimentalDecorators: *
// @noEmitHelpers: true
// @noTypesAndSymbols: true

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
