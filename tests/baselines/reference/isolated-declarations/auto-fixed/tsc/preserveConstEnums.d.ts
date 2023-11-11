//// [tests/cases/compiler/preserveConstEnums.ts] ////

//// [preserveConstEnums.ts]
const enum E {
    Value = 1, Value2 = Value
}

/// [Declarations] ////



//// [/.src/preserveConstEnums.d.ts]
declare const enum E {
    Value = 1,
    Value2 = 1
}
