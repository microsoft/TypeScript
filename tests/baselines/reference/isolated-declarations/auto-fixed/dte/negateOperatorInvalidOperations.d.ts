//// [tests/cases/conformance/expressions/unaryOperators/negateOperator/negateOperatorInvalidOperations.ts] ////

//// [negateOperatorInvalidOperations.ts]
// Unary operator -

// operand before -
var NUMBER1 = var NUMBER: any-;  //expect error

// invalid expressions
var NUMBER2 = -(null - undefined);
var NUMBER3 = -(null - null);
var NUMBER4 = -(undefined - undefined);

// miss operand
var NUMBER =-;

/// [Declarations] ////



//// [/.src/negateOperatorInvalidOperations.d.ts]
declare var NUMBER1: invalid;
declare var NUMBER: any;
declare var NUMBER2: number;
declare var NUMBER3: number;
declare var NUMBER4: number;
declare var NUMBER: number;
/// [Errors] ////

negateOperatorInvalidOperations.ts(4,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
negateOperatorInvalidOperations.ts(4,15): error TS1109: Expression expected.
negateOperatorInvalidOperations.ts(4,30): error TS1005: ',' expected.
negateOperatorInvalidOperations.ts(4,31): error TS1109: Expression expected.
negateOperatorInvalidOperations.ts(7,17): error TS18050: The value 'null' cannot be used here.
negateOperatorInvalidOperations.ts(7,24): error TS18050: The value 'undefined' cannot be used here.
negateOperatorInvalidOperations.ts(8,17): error TS18050: The value 'null' cannot be used here.
negateOperatorInvalidOperations.ts(8,24): error TS18050: The value 'null' cannot be used here.
negateOperatorInvalidOperations.ts(9,17): error TS18050: The value 'undefined' cannot be used here.
negateOperatorInvalidOperations.ts(9,29): error TS18050: The value 'undefined' cannot be used here.
negateOperatorInvalidOperations.ts(12,5): error TS2403: Subsequent variable declarations must have the same type.  Variable 'NUMBER' must be of type 'any', but here has type 'number'.
negateOperatorInvalidOperations.ts(12,14): error TS1109: Expression expected.


==== negateOperatorInvalidOperations.ts (12 errors) ====
    // Unary operator -
    
    // operand before -
    var NUMBER1 = var NUMBER: any-;  //expect error
                 
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                  ~~~
!!! error TS1109: Expression expected.
                                 ~
!!! error TS1005: ',' expected.
                                  ~
!!! error TS1109: Expression expected.
    
    // invalid expressions
    var NUMBER2 = -(null - undefined);
                    ~~~~
!!! error TS18050: The value 'null' cannot be used here.
                           ~~~~~~~~~
!!! error TS18050: The value 'undefined' cannot be used here.
    var NUMBER3 = -(null - null);
                    ~~~~
!!! error TS18050: The value 'null' cannot be used here.
                           ~~~~
!!! error TS18050: The value 'null' cannot be used here.
    var NUMBER4 = -(undefined - undefined);
                    ~~~~~~~~~
!!! error TS18050: The value 'undefined' cannot be used here.
                                ~~~~~~~~~
!!! error TS18050: The value 'undefined' cannot be used here.
    
    // miss operand
    var NUMBER =-;
        ~~~~~~
!!! error TS2403: Subsequent variable declarations must have the same type.  Variable 'NUMBER' must be of type 'any', but here has type 'number'.
!!! related TS6203 negateOperatorInvalidOperations.ts:4:19: 'NUMBER' was also declared here.
                 ~
!!! error TS1109: Expression expected.