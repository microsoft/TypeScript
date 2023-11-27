//// [tests/cases/conformance/expressions/typeAssertions/duplicatePropertiesInTypeAssertions02.ts] ////

//// [duplicatePropertiesInTypeAssertions02.ts]
let x = {} as {a: number; a: number};

/// [Declarations] ////



//// [duplicatePropertiesInTypeAssertions02.d.ts]
declare let x: {
    a: number;
};
//# sourceMappingURL=duplicatePropertiesInTypeAssertions02.d.ts.map
/// [Errors] ////

duplicatePropertiesInTypeAssertions02.ts(1,16): error TS2300: Duplicate identifier 'a'.
duplicatePropertiesInTypeAssertions02.ts(1,27): error TS2300: Duplicate identifier 'a'.


==== duplicatePropertiesInTypeAssertions02.ts (2 errors) ====
    let x = {} as {a: number; a: number};
                   ~
!!! error TS2300: Duplicate identifier 'a'.
                              ~
!!! error TS2300: Duplicate identifier 'a'.