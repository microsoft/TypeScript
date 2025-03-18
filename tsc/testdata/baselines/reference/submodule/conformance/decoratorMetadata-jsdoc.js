//// [tests/cases/conformance/decorators/decoratorMetadata-jsdoc.ts] ////

//// [decoratorMetadata-jsdoc.ts]
declare var decorator: any;

class X {
    @decorator()
    a?: string?;
    @decorator()
    b?: string!;
    @decorator()
    c?: *;
}

//// [decoratorMetadata-jsdoc.js]
class X {
    @decorator()
    a;
    ;
    @decorator()
    b;
}
!;
c ?  :  * ;
