////export default class {
////    [|[|{| "declarationRangeIndex": 0 |}constructor|]() {}|]
////}

verify.singleReferenceGroup("class default", "constructor");
