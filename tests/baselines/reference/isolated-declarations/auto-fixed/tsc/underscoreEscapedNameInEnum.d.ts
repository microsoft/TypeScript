//// [tests/cases/compiler/underscoreEscapedNameInEnum.ts] ////

//// [underscoreEscapedNameInEnum.ts]
enum E {
    "__foo" = 1,
    bar = E["__foo"] + 1
}


/// [Declarations] ////



//// [underscoreEscapedNameInEnum.d.ts]
declare enum E {
    "__foo" = 1,
    bar = 2
}
