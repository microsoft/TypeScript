//// [tests/cases/conformance/expressions/typeAssertions/duplicatePropertiesInTypeAssertions01.ts] ////

//// [duplicatePropertiesInTypeAssertions01.ts]
let x = <{a: number; a: number}>{};

/// [Declarations] ////



//// [duplicatePropertiesInTypeAssertions01.d.ts]
declare let x: {
    a: number;
    a: number;
};
//# sourceMappingURL=duplicatePropertiesInTypeAssertions01.d.ts.map
/// [Errors] ////

duplicatePropertiesInTypeAssertions01.ts(1,11): error TS2300: Duplicate identifier 'a'.
duplicatePropertiesInTypeAssertions01.ts(1,22): error TS2300: Duplicate identifier 'a'.


==== duplicatePropertiesInTypeAssertions01.ts (2 errors) ====
    let x = <{a: number; a: number}>{};
              ~
!!! error TS2300: Duplicate identifier 'a'.
                         ~
!!! error TS2300: Duplicate identifier 'a'.