// @target: esnext
// @experimentalDecorators: *
// @noEmitHelpers: true
// @noTypesAndSymbols: true

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
