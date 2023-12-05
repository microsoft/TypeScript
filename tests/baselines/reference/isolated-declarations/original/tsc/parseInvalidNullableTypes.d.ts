//// [tests/cases/compiler/parseInvalidNullableTypes.ts] ////

//// [parseInvalidNullableTypes.ts]
function f1(a: string): a is ?string {
    return true;
}

function f2(a: string?) {}
function f3(a: number?) {}

function f4(a: ?string) {}
function f5(a: ?number) {}

function f6(a: string): ?string {
    return true;
}

const a = 1 as any?;
const b: number? = 1;

const c = 1 as ?any;
const d: ?number = 1;

let e: unknown?;
let f: never?;
let g: void?;
let h: undefined?;


/// [Declarations] ////



//// [parseInvalidNullableTypes.d.ts]
declare function f1(a: string): a is ?string;
declare function f2(a: ?string): invalid;
declare function f3(a: ?number): invalid;
declare function f4(a: ?string): invalid;
declare function f5(a: ?number): invalid;
declare function f6(a: string): ?string;
declare const a: any;
declare const b: ?number;
declare const c: any;
declare const d: ?number;
declare let e: ?unknown;
declare let f: ?never;
declare let g: ?void;
declare let h: ?undefined;

/// [Errors] ////

parseInvalidNullableTypes.ts(1,30): error TS2677: A type predicate's type must be assignable to its parameter's type.
  Type 'string | null' is not assignable to type 'string'.
    Type 'null' is not assignable to type 'string'.
parseInvalidNullableTypes.ts(1,30): error TS17020: '?' at the start of a type is not valid TypeScript syntax. Did you mean to write 'string | null | undefined'?
parseInvalidNullableTypes.ts(5,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parseInvalidNullableTypes.ts(5,16): error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'string | undefined'?
parseInvalidNullableTypes.ts(6,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parseInvalidNullableTypes.ts(6,16): error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'number | undefined'?
parseInvalidNullableTypes.ts(8,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parseInvalidNullableTypes.ts(8,16): error TS17020: '?' at the start of a type is not valid TypeScript syntax. Did you mean to write 'string | null | undefined'?
parseInvalidNullableTypes.ts(9,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parseInvalidNullableTypes.ts(9,16): error TS17020: '?' at the start of a type is not valid TypeScript syntax. Did you mean to write 'number | null | undefined'?
parseInvalidNullableTypes.ts(11,25): error TS17020: '?' at the start of a type is not valid TypeScript syntax. Did you mean to write 'string | null | undefined'?
parseInvalidNullableTypes.ts(12,5): error TS2322: Type 'boolean' is not assignable to type 'string'.
parseInvalidNullableTypes.ts(15,16): error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'any'?
parseInvalidNullableTypes.ts(16,10): error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'number | undefined'?
parseInvalidNullableTypes.ts(18,16): error TS17020: '?' at the start of a type is not valid TypeScript syntax. Did you mean to write 'any'?
parseInvalidNullableTypes.ts(19,10): error TS17020: '?' at the start of a type is not valid TypeScript syntax. Did you mean to write 'number | null | undefined'?
parseInvalidNullableTypes.ts(21,8): error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'unknown'?
parseInvalidNullableTypes.ts(22,8): error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'never'?
parseInvalidNullableTypes.ts(23,8): error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'void'?
parseInvalidNullableTypes.ts(24,8): error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'undefined'?


==== parseInvalidNullableTypes.ts (20 errors) ====
    function f1(a: string): a is ?string {
                                 ~~~~~~~
!!! error TS2677: A type predicate's type must be assignable to its parameter's type.
!!! error TS2677:   Type 'string | null' is not assignable to type 'string'.
!!! error TS2677:     Type 'null' is not assignable to type 'string'.
                                 ~~~~~~~
!!! error TS17020: '?' at the start of a type is not valid TypeScript syntax. Did you mean to write 'string | null | undefined'?
        return true;
    }
    
    function f2(a: string?) {}
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                   ~~~~~~~
!!! error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'string | undefined'?
    function f3(a: number?) {}
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                   ~~~~~~~
!!! error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'number | undefined'?
    
    function f4(a: ?string) {}
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                   ~~~~~~~
!!! error TS17020: '?' at the start of a type is not valid TypeScript syntax. Did you mean to write 'string | null | undefined'?
    function f5(a: ?number) {}
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                   ~~~~~~~
!!! error TS17020: '?' at the start of a type is not valid TypeScript syntax. Did you mean to write 'number | null | undefined'?
    
    function f6(a: string): ?string {
                            ~~~~~~~
!!! error TS17020: '?' at the start of a type is not valid TypeScript syntax. Did you mean to write 'string | null | undefined'?
        return true;
        ~~~~~~
!!! error TS2322: Type 'boolean' is not assignable to type 'string'.
    }
    
    const a = 1 as any?;
                   ~~~~
!!! error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'any'?
    const b: number? = 1;
             ~~~~~~~
!!! error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'number | undefined'?
    
    const c = 1 as ?any;
                   ~~~~
!!! error TS17020: '?' at the start of a type is not valid TypeScript syntax. Did you mean to write 'any'?
    const d: ?number = 1;
             ~~~~~~~
!!! error TS17020: '?' at the start of a type is not valid TypeScript syntax. Did you mean to write 'number | null | undefined'?
    
    let e: unknown?;
           ~~~~~~~~
!!! error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'unknown'?
    let f: never?;
           ~~~~~~
!!! error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'never'?
    let g: void?;
           ~~~~~
!!! error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'void'?
    let h: undefined?;
           ~~~~~~~~~~
!!! error TS17019: '?' at the end of a type is not valid TypeScript syntax. Did you mean to write 'undefined'?
    