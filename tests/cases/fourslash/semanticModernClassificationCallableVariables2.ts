//// import "node";
//// var fs = require("fs")
//// require.resolve('react');
//// require.resolve.paths;
//// interface LanguageMode { getFoldingRanges?: (d: string) => number[]; };
//// function (mode: LanguageMode | undefined) { if (mode && mode.getFoldingRanges) { return mode.getFoldingRanges('a'); }};
//// function b(a: () => void) { a(); };

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("variable.declaration", "fs"), 
    c2.semanticToken("interface.declaration", "LanguageMode"), 
    c2.semanticToken("member.declaration", "getFoldingRanges"), 
    c2.semanticToken("parameter.declaration", "d"), 
    c2.semanticToken("parameter.declaration", "mode"), 
    c2.semanticToken("interface", "LanguageMode"), 
    c2.semanticToken("parameter", "mode"), 
    c2.semanticToken("parameter", "mode"), 
    c2.semanticToken("member", "getFoldingRanges"), 
    c2.semanticToken("parameter", "mode"), 
    c2.semanticToken("member", "getFoldingRanges"), 
    c2.semanticToken("function.declaration", "b"), 
    c2.semanticToken("function.declaration", "a"), 
    c2.semanticToken("function", "a"), 
);;