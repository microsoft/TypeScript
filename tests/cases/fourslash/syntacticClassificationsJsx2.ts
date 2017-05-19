/// <reference path="fourslash.ts"/>

// @Filename: file1.tsx
////let x  = <div.name b = "some-value" c = {1}>
////    some jsx text
////</div.name>;
////
////let y = <element.name attr="123"/>

const c = classification;   
verify.syntacticClassificationsAre(
    c.keyword("let"), c.identifier("x"), c.operator("="),
        c.punctuation("<"), 
            c.jsxOpenTagName("div.name"),
                c.jsxAttribute("b"), c.operator("="), c.jsxAttributeStringLiteralValue(`"some-value"`),
                c.jsxAttribute("c"), c.operator("="), c.punctuation("{"), c.numericLiteral("1"), c.punctuation("}"),
            c.punctuation(">"),
            c.jsxText(`
    some jsx text
`),
        c.punctuation("<"), c.punctuation("/"), c.jsxCloseTagName("div.name"), c.punctuation(">"), c.punctuation(";"),
    c.keyword("let"), c.identifier("y"), c.operator("="),
        c.punctuation("<"), 
            c.jsxSelfClosingTagName("element.name"), 
                c.jsxAttribute("attr"), c.operator("="), c.jsxAttributeStringLiteralValue(`"123"`), 
           c.punctuation("/"), c.punctuation(">")
) 