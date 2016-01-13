/// <reference path="fourslash.ts"/>

// @Filename: file1.tsx
////let x  = <div a = "some-value" b = {1}>
////    some jsx text
////</div>;
////
////let y = <element attr="123"/>

const c = classification;   
verify.syntacticClassificationsAre(
    c.keyword("let"), c.identifier("x"), c.operator("="),
        c.punctuation("<"), 
            c.jsxOpenTagName("div"),
                c.jsxAttribute("a"), c.operator("="), c.jsxAttributeStringLiteralValue(`"some-value"`),
                c.jsxAttribute("b"), c.operator("="), c.punctuation("{"), c.numericLiteral("1"), c.punctuation("}"),
            c.punctuation(">"),
            c.jsxText(`
    some jsx text
`),
        c.punctuation("<"), c.punctuation("/"), c.jsxCloseTagName("div"), c.punctuation(">"), c.punctuation(";"),
    c.keyword("let"), c.identifier("y"), c.operator("="),
        c.punctuation("<"), 
            c.jsxSelfClosingTagName("element"), 
                c.jsxAttribute("attr"), c.operator("="), c.jsxAttributeStringLiteralValue(`"123"`), 
           c.punctuation("/"), c.punctuation(">")
) 