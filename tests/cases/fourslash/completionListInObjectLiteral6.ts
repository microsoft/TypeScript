/// <reference path='fourslash.ts'/>

////const foo = {
////    a: "a",
////    b: "b"
////};
////function fn<T extends { [key: string]: any }>(obj: T, events: { [Key in `on_${string & keyof T}`]?: Key }) {}
////
////fn(foo, {
////    /*1*/
////})
////fn({ a: "a", b: "b" }, {
////    /*2*/
////})

verify.completions({
    marker: ["1", "2"],
    exact: [
        { name: "on_a", sortText: completion.SortText.OptionalMember },
        { name: "on_b", sortText: completion.SortText.OptionalMember }
    ]
});
