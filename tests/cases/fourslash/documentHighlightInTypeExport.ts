/// <reference path='fourslash.ts'/>

// @Filename: /1.ts
//// type [|A|] = 1;
//// export { [|A|] as [|B|] };

{
    const [AType, AExport, asB] = test.rangesInFile("/1.ts");
    verify.documentHighlightsOf(AType, [AType, AExport, asB]);
    verify.documentHighlightsOf(AExport, [AType, AExport, asB]);
    verify.documentHighlightsOf(asB, [asB]);
}

// @Filename: /2.ts
//// type [|A|] = 1;
//// let [|A|]: [|A|] = 1;
//// export { [|A|] as [|B|] };

{ // a little strange, but the the type/value namespaces work too
    const [AType, ALet, ADecl, AExport, asB] = test.rangesInFile("/2.ts");
    verify.documentHighlightsOf(AType, [AType, ADecl, AExport, asB]);
    verify.documentHighlightsOf(ADecl, [AType, ADecl, AExport, asB]);
    verify.documentHighlightsOf(ALet, [ALet, AExport, asB]);
    verify.documentHighlightsOf(AExport, [AType, ALet, ADecl, AExport, asB]);
    verify.documentHighlightsOf(asB, [asB]);
}

// @Filename: /3.ts
//// type [|A|] = 1;
//// let [|A|]: [|A|] = 1;
//// export type { [|A|] as [|B|] };

{ // properly handle type only
    const [AType, ALet, ADecl, AExport, asB] = test.rangesInFile("/3.ts");
    verify.documentHighlightsOf(AType, [AType, ADecl, AExport, asB]);
    verify.documentHighlightsOf(ADecl, [AType, ADecl, AExport, asB]);
    verify.documentHighlightsOf(AExport, [AType, ADecl, AExport, asB]);
    verify.documentHighlightsOf(ALet, [ALet]);
    verify.documentHighlightsOf(asB, [asB]);
}

// would be nice if this could work the same for imports too, but getSymbolAtLocation()
// of the imported symbol (when aliased) returns undefined

// // @Filename: /4.ts
// //// import type { [|Tee|] as [|T|] } from "whatEveh";
// //// let [|T|]: [|T|];
//
// {
//     const [TeeImport, asT, TLet, TDecl] = test.rangesInFile("/4.ts");
//     verify.documentHighlightsOf(TeeImport, [TeeImport, asT, TDecl]);
//     // verify.documentHighlightsOf(asT, [TeeImport, asT, TDecl]);
//     // verify.documentHighlightsOf(TDecl, [TeeImport, asT, TDecl]);
//     // verify.documentHighlightsOf(TLet, [TLet]);
// }
