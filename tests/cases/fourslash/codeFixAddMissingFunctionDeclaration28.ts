/// <reference path='fourslash.ts' />

////foo({
////    prop001: '',
////    prop002: '',
////    prop003: '',
////    prop004: '',
////    prop005: '',
////    prop006: '',
////    prop007: '',
////    prop008: '',
////    prop009: '',
////    prop010: '',
////    prop011: '',
////    prop012: '',
////    prop013: '',
////    prop014: '',
////    prop015: '',
////    prop016: '',
////    prop017: '',
////    prop018: '',
////    prop019: '',
////    prop020: '',
////});

verify.codeFix({
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "foo"],
    index: 0,
    newFileContent:
`foo({
    prop001: '',
    prop002: '',
    prop003: '',
    prop004: '',
    prop005: '',
    prop006: '',
    prop007: '',
    prop008: '',
    prop009: '',
    prop010: '',
    prop011: '',
    prop012: '',
    prop013: '',
    prop014: '',
    prop015: '',
    prop016: '',
    prop017: '',
    prop018: '',
    prop019: '',
    prop020: '',
});

function foo(arg0: { prop001: string; prop002: string; prop003: string; prop004: string; prop005: string; prop006: string; prop007: string; prop008: string; prop009: string; prop010: string; prop011: string; prop012: string; prop013: string; prop014: string; prop015: string; prop016: string; prop017: string; prop018: string; prop019: string; prop020: string; }) {
    throw new Error("Function not implemented.");
}
`,
});
