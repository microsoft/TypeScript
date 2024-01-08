//// [tests/cases/compiler/arrayFind.ts] ////

//// [arrayFind.ts]
// test fix for #18112, type guard predicates should narrow returned element
function isNumber(x: any): x is number {
  return typeof x === "number";
}

const arrayOfStringsNumbersAndBooleans = ["string", false, 0, "strung", 1, true];
const foundNumber: number | undefined = arrayOfStringsNumbersAndBooleans.find(isNumber);

const readonlyArrayOfStringsNumbersAndBooleans = arrayOfStringsNumbersAndBooleans as ReadonlyArray<string | number | boolean>;
const readonlyFoundNumber: number | undefined = readonlyArrayOfStringsNumbersAndBooleans.find(isNumber);


/// [Declarations] ////



//// [arrayFind.d.ts]
declare function isNumber(x: any): x is number;
declare const arrayOfStringsNumbersAndBooleans: invalid;
declare const foundNumber: number | undefined;
declare const readonlyArrayOfStringsNumbersAndBooleans: ReadonlyArray<string | number | boolean>;
declare const readonlyFoundNumber: number | undefined;

/// [Errors] ////

arrayFind.ts(6,42): error TS9017: Only const arrays can be inferred with --isolatedDeclarations.


==== arrayFind.ts (1 errors) ====
    // test fix for #18112, type guard predicates should narrow returned element
    function isNumber(x: any): x is number {
      return typeof x === "number";
    }
    
    const arrayOfStringsNumbersAndBooleans = ["string", false, 0, "strung", 1, true];
                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9017: Only const arrays can be inferred with --isolatedDeclarations.
!!! related TS9027 arrayFind.ts:6:7: Add a type annotation to the variable arrayOfStringsNumbersAndBooleans.
    const foundNumber: number | undefined = arrayOfStringsNumbersAndBooleans.find(isNumber);
    
    const readonlyArrayOfStringsNumbersAndBooleans = arrayOfStringsNumbersAndBooleans as ReadonlyArray<string | number | boolean>;
    const readonlyFoundNumber: number | undefined = readonlyArrayOfStringsNumbersAndBooleans.find(isNumber);
    