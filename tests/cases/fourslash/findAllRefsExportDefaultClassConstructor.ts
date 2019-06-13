////export default class {
////    [|[|{| "contextRangeIndex": 0 |}constructor|]() {}|]
////}

verify.singleReferenceGroup("class default", "constructor");
