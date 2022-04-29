/// <reference path="fourslash.ts" />

// @noLib: true

////namespace m { export interface point2 { } }
////namespace m2 { export var zz = 10; }
////namespace m3 { export var zz2 = 10; export interface point3 { } }
////interface point {
////    x: number;
////    y: number;
////}
////var xx = 10;
////var tt = /*valueExpr*/xx;
////var yy: /*typeExpr*/point = { x: 4, y: 3 + /*valueExprInObjectLiteral*/tt };
////var kk: m3.point3/*membertypeExpr*/ = m3.zz2/*membervalueExpr*/;
////var zz = </*typeExpr2*/point>{ x: 4, y: 3 };

const values: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = completion.globalsPlus([
    { name: "m2", text: "namespace m2" }, // With no type side, allowed only in value
    { name: "m3", text: "namespace m3" },
    { name: "xx", text: "var xx: number" },
    { name: "tt", text: "var tt: number" },
    { name: "yy", text: "var yy: point" },
    { name: "kk", text: "var kk: m3.point3" },
    { name: "zz", text: "var zz: point" },
], { noLib: true });

const types: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = completion.sorted([
    completion.globalThisEntry,
    { name: "m", text: "namespace m" },
    { name: "m3", text: "namespace m3" },
    { name: "point", text: "interface point" },
    ...completion.typeKeywords,
]);

const filterValuesByName = (name: string) => {
    return values.filter(entry => {
        if (typeof entry === 'string') {
            return entry !== name;
        }

        return entry.name !== name;
    })
}

verify.completions(
    { marker: "valueExpr", exact: filterValuesByName('tt'), isNewIdentifierLocation: true },
    { marker: "typeExpr", exact: types, },
    { marker: "valueExprInObjectLiteral", exact: filterValuesByName('yy') },
    { marker: "membertypeExpr", exact: [{ name: "point3", text: "interface m3.point3" }] },
    { marker: "membervalueExpr", exact: [{ name: "zz2", text: "var m3.zz2: number" }] },
);
