///<reference path="fourslash.ts" />

//// var x = class myClass {
////    getClassName (){
////        m/*0*/
////    }
////    /*1*/
//// }

verify.completions(
    { marker: "0", includes: { name: "myClass", text: "(local class) myClass", kind: "local class" } },
    {
        marker: "1",
        exact: [
            "abstract",
            "async",
            "constructor",
            "declare",
            "get",
            "override",
            "private",
            "protected",
            "public",
            "readonly",
            "set",
            "static",
        ].map(
            name => ({ name, sortText: completion.SortText.GlobalsOrKeywords })
        ),
        isNewIdentifierLocation: true,
    }
);
