/// <reference path='fourslash.ts' />
// @strictNullChecks: true

////class TokenType {
////    label;
////    token;
////    constructor([|label, token? |]) {
////        this.label = label;
////        this.token = token || "N/A";
////    }
////}
////new TokenType("HI");
verify.codeFix({
    description: "Infer parameter types from usage",
    index: 2,
    newFileContent:

`class TokenType {
    label;
    token;
    constructor(label: string, token?: string | undefined ) {
        this.label = label;
        this.token = token || "N/A";
    }
}
new TokenType("HI");`,
});
