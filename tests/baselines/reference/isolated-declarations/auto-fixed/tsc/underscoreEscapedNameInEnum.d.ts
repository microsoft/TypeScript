//// [tests/cases/compiler/underscoreEscapedNameInEnum.ts] ////

//// [underscoreEscapedNameInEnum.ts]
enum E {
    "__foo" = 1,
    bar = E["__foo"] + 1
}


/// [Declarations] ////



//// [/.src/underscoreEscapedNameInEnum.d.ts]
declare enum E {
    "__foo" = 1,
    bar = 2
}
