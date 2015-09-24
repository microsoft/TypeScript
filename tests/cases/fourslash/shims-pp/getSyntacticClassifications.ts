/// <reference path="fourslash.ts"/>

//// // comment
//// module M {
////     var v = 0 + 1;
////     var s = "string";
////
////     class C<T> {
////     }
////
////     enum E {
////     }
////
////     interface I {
////     }
////
////     module M1.M2 {
////     }
//// }

var c = classification;
verify.syntacticClassificationsAre(
    c.comment("// comment"),
    c.keyword("module"), c.moduleName("M"), c.punctuation("{"),
        c.keyword("var"), c.identifier("v"), c.operator("="), c.numericLiteral("0"), c.operator("+"), c.numericLiteral("1"), c.punctuation(";"),
        c.keyword("var"), c.identifier("s"), c.operator("="), c.stringLiteral('"string"'), c.punctuation(";"),
        c.keyword("class"), c.className("C"), c.punctuation("<"), c.typeParameterName("T"), c.punctuation(">"), c.punctuation("{"),
        c.punctuation("}"),
        c.keyword("enum"), c.enumName("E"), c.punctuation("{"),
        c.punctuation("}"),
        c.keyword("interface"), c.interfaceName("I"), c.punctuation("{"),
        c.punctuation("}"),
        c.keyword("module"), c.moduleName("M1"), c.punctuation("."), c.moduleName("M2"), c.punctuation("{"),
        c.punctuation("}"),
    c.punctuation("}"));