////export default class {
////    [|[|{| "contextRangeIndex": 0, "isDefinition": true |}constructor|]() {}|]
////}

verify.singleReferenceGroup("class default", "constructor");
