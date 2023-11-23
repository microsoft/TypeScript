//// [tests/cases/compiler/mappedTypeNoTypeNoCrash.ts] ////

//// [mappedTypeNoTypeNoCrash.ts]
type T0<T> = ({[K in keyof T]}) extends ({[key in K]: T[K]}) ? number : never;

/// [Declarations] ////



//// [mappedTypeNoTypeNoCrash.d.ts]
type T0<T> = ({
    [K in keyof T]: ;
}) extends ({
    [key in K]: T[K];
}) ? number : never;
//# sourceMappingURL=mappedTypeNoTypeNoCrash.d.ts.map
/// [Errors] ////

mappedTypeNoTypeNoCrash.ts(1,51): error TS2304: Cannot find name 'K'.
mappedTypeNoTypeNoCrash.ts(1,51): error TS4081: Exported type alias 'T0' has or is using private name 'K'.
mappedTypeNoTypeNoCrash.ts(1,57): error TS2304: Cannot find name 'K'.
mappedTypeNoTypeNoCrash.ts(1,57): error TS4081: Exported type alias 'T0' has or is using private name 'K'.


==== mappedTypeNoTypeNoCrash.ts (4 errors) ====
    type T0<T> = ({[K in keyof T]}) extends ({[key in K]: T[K]}) ? number : never;
                                                      ~
!!! error TS2304: Cannot find name 'K'.
                                                      ~
!!! error TS4081: Exported type alias 'T0' has or is using private name 'K'.
                                                            ~
!!! error TS2304: Cannot find name 'K'.
                                                            ~
!!! error TS4081: Exported type alias 'T0' has or is using private name 'K'.