//// [tests/cases/compiler/declarationEmitExpressionInExtends4.ts] ////

//// [declarationEmitExpressionInExtends4.ts]
function getSomething(): {
    new(): {};
} {
    return class D { }
}

const CBase: {
    new(): {};
} = getSomething();
class C extends CBase {

}

const C2Base: any = SomeUndefinedFunction();
class C2 extends C2Base {

}


class C3 extends SomeUndefinedFunction {

}

/// [Declarations] ////


/// [Errors] ////

declarationEmitExpressionInExtends4.ts(14,21): error TS2304: Cannot find name 'SomeUndefinedFunction'.
declarationEmitExpressionInExtends4.ts(20,18): error TS2304: Cannot find name 'SomeUndefinedFunction'.
declarationEmitExpressionInExtends4.ts(20,18): error TS4020: 'extends' clause of exported class 'C3' has or is using private name 'SomeUndefinedFunction'.


==== declarationEmitExpressionInExtends4.ts (3 errors) ====
    function getSomething(): {
        new(): {};
    } {
        return class D { }
    }
    
    const CBase: {
        new(): {};
    } = getSomething();
    class C extends CBase {
    
    }
    
    const C2Base: any = SomeUndefinedFunction();
                        ~~~~~~~~~~~~~~~~~~~~~
!!! error TS2304: Cannot find name 'SomeUndefinedFunction'.
    class C2 extends C2Base {
    
    }
    
    
    class C3 extends SomeUndefinedFunction {
                     ~~~~~~~~~~~~~~~~~~~~~
!!! error TS2304: Cannot find name 'SomeUndefinedFunction'.
                     ~~~~~~~~~~~~~~~~~~~~~
!!! error TS4020: 'extends' clause of exported class 'C3' has or is using private name 'SomeUndefinedFunction'.
    
    }