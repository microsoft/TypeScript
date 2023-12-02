//// [tests/cases/compiler/expandoFunctionNestedAssigments.ts] ////

//// [expandoFunctionNestedAssigments.ts]
function Foo(): void {

}
let d: number = (Foo.inVariableInit = 1);


function bar(p: number = (Foo.inNestedFunction = 1)): void {

}

(Foo.bla = { foo: 1}).foo = (Foo.baz = 1) + (Foo.bar  = 0);

if(Foo.fromIf = 1) {
    Foo.inIf = 1;
}

while(Foo.fromWhileCondition = 1) {
    Foo.fromWhileBody = 1;
    {
        Foo.fromWhileBodyNested = 1;
    }
}

do {
    Foo.fromDoBody = 1;
    {
        Foo.fromDoBodyNested = 1;
    }
} while(Foo.fromDoCondition = 1);

for(Foo.forInit = 1; (Foo.forCond = 1) > 1; Foo.forIncr = 1){
    Foo.fromForBody = 1;
    {
        Foo.fromForBodyNested = 1;
    }
}

for(let f of (Foo.forOf = []) ){
    Foo.fromForOfBody = 1;
    {
        Foo.fromForOfBodyNested = 1;
    }
}


for(let f in (Foo.forIn = []) ){
    Foo.fromForInBody = 1;
    {
        Foo.fromForInBodyNested = 1;
    }
}

/// [Declarations] ////



//// [expandoFunctionNestedAssigments.d.ts]
declare function Foo(): void;
declare let d: number;
declare function bar(p?: number): void;
//# sourceMappingURL=expandoFunctionNestedAssigments.d.ts.map
/// [Errors] ////

expandoFunctionNestedAssigments.ts(4,18): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(7,31): error TS2339: Property 'inNestedFunction' does not exist on type 'typeof Foo'.
expandoFunctionNestedAssigments.ts(11,2): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(11,30): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(11,46): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(13,4): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(14,5): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(17,7): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(18,5): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(20,9): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(25,5): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(27,9): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(29,9): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(31,5): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(31,23): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(31,45): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(32,5): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(34,9): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(38,15): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(39,5): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(41,9): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(46,15): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(47,5): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionNestedAssigments.ts(49,9): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== expandoFunctionNestedAssigments.ts (24 errors) ====
    function Foo(): void {
    
    }
    let d: number = (Foo.inVariableInit = 1);
                     ~~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    
    function bar(p: number = (Foo.inNestedFunction = 1)): void {
                                  ~~~~~~~~~~~~~~~~
!!! error TS2339: Property 'inNestedFunction' does not exist on type 'typeof Foo'.
    
    }
    
    (Foo.bla = { foo: 1}).foo = (Foo.baz = 1) + (Foo.bar  = 0);
     ~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
                                 ~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
                                                 ~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    if(Foo.fromIf = 1) {
       ~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        Foo.inIf = 1;
        ~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    }
    
    while(Foo.fromWhileCondition = 1) {
          ~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        Foo.fromWhileBody = 1;
        ~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        {
            Foo.fromWhileBodyNested = 1;
            ~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        }
    }
    
    do {
        Foo.fromDoBody = 1;
        ~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        {
            Foo.fromDoBodyNested = 1;
            ~~~~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        }
    } while(Foo.fromDoCondition = 1);
            ~~~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    for(Foo.forInit = 1; (Foo.forCond = 1) > 1; Foo.forIncr = 1){
        ~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
                          ~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
                                                ~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        Foo.fromForBody = 1;
        ~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        {
            Foo.fromForBodyNested = 1;
            ~~~~~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        }
    }
    
    for(let f of (Foo.forOf = []) ){
                  ~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        Foo.fromForOfBody = 1;
        ~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        {
            Foo.fromForOfBodyNested = 1;
            ~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        }
    }
    
    
    for(let f in (Foo.forIn = []) ){
                  ~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        Foo.fromForInBody = 1;
        ~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        {
            Foo.fromForInBodyNested = 1;
            ~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        }
    }