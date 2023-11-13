//// [tests/cases/conformance/es6/arrowFunction/disallowLineTerminatorBeforeArrow.ts] ////

//// [disallowLineTerminatorBeforeArrow.ts]
var f1 = (): void
    => { }
var f2 = (x: string, y: string): void /*
  */  => { }
var f3 = (x: string, y: number, ...rest: any[]): void
    => { }
var f4 = (x: string, y: number, ...rest: any[]): void /*
  */  => { }
var f5 = (...rest: any[]): void
    => { }
var f6 = (...rest: any[]): void /*
  */  => { }
var f7 = (x: string, y: number, z: number = 10): void
    => { }
var f8 = (x: string, y: number, z: number = 10): void /*
  */  => { }
var f9 = (a: number): number
    => a;
var f10 = (a: number) :
  number
    => a
var f11 = (a: number): number /*
    */ => a;
var f12 = (a: number) :
  number /*
    */ => a

// Should be valid.
var f11 = (a: number
    ): number => a;

// Should be valid.
var f12 = (a: number)
    : number => a;

// Should be valid.
var f13 = (a: number):
    number => a;

// Should be valid.
var f14 = (): void /* */ => {}

// Should be valid.
var f15 = (a: number): number /* */ => a

// Should be valid.
var f16 = (a: number, b = 10):
  number /* */ => a + b;

function foo(func: () => boolean): void { }
foo(()
    => true);
foo(()
    => { return false; });

module m {
    class City {
        constructor(x: number, thing = ()
            => 100) {
        }

        public m = ()
            => 2 * 2 * 2
    }

    export enum Enum {
        claw = (()
            => 10)()
    }

    export var v: any = x: any: any
        => new City(Enum.claw);
}


/// [Declarations] ////



//// [disallowLineTerminatorBeforeArrow.d.ts]
declare var f1: () => void;
declare var f2: (x: string, y: string) => void;
declare var f3: (x: string, y: number, ...rest: any[]) => void;
declare var f4: (x: string, y: number, ...rest: any[]) => void;
declare var f5: (...rest: any[]) => void;
declare var f6: (...rest: any[]) => void;
declare var f7: (x: string, y: number, z?: number) => void;
declare var f8: (x: string, y: number, z?: number) => void;
declare var f9: (a: number) => number;
declare var f10: (a: number) => number;
declare var f11: (a: number) => number;
declare var f12: (a: number) => number;
declare var f11: (a: number) => number;
declare var f12: (a: number) => number;
declare var f13: (a: number) => number;
declare var f14: () => void;
declare var f15: (a: number) => number;
declare var f16: (a: number, b?: number) => number;
declare function foo(func: () => boolean): void;
declare namespace m {
    enum Enum {
        claw
    }
    var v: any, any: any;
}

/// [Errors] ////

disallowLineTerminatorBeforeArrow.ts(67,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
disallowLineTerminatorBeforeArrow.ts(71,25): error TS2304: Cannot find name 'x'.
disallowLineTerminatorBeforeArrow.ts(71,26): error TS1005: ',' expected.
disallowLineTerminatorBeforeArrow.ts(72,9): error TS1128: Declaration or statement expected.


==== disallowLineTerminatorBeforeArrow.ts (4 errors) ====
    var f1 = (): void
        => { }
    var f2 = (x: string, y: string): void /*
      */  => { }
    var f3 = (x: string, y: number, ...rest: any[]): void
        => { }
    var f4 = (x: string, y: number, ...rest: any[]): void /*
      */  => { }
    var f5 = (...rest: any[]): void
        => { }
    var f6 = (...rest: any[]): void /*
      */  => { }
    var f7 = (x: string, y: number, z: number = 10): void
        => { }
    var f8 = (x: string, y: number, z: number = 10): void /*
      */  => { }
    var f9 = (a: number): number
        => a;
    var f10 = (a: number) :
      number
        => a
    var f11 = (a: number): number /*
        */ => a;
    var f12 = (a: number) :
      number /*
        */ => a
    
    // Should be valid.
    var f11 = (a: number
        ): number => a;
    
    // Should be valid.
    var f12 = (a: number)
        : number => a;
    
    // Should be valid.
    var f13 = (a: number):
        number => a;
    
    // Should be valid.
    var f14 = (): void /* */ => {}
    
    // Should be valid.
    var f15 = (a: number): number /* */ => a
    
    // Should be valid.
    var f16 = (a: number, b = 10):
      number /* */ => a + b;
    
    function foo(func: () => boolean): void { }
    foo(()
        => true);
    foo(()
        => { return false; });
    
    module m {
        class City {
            constructor(x: number, thing = ()
                => 100) {
            }
    
            public m = ()
                => 2 * 2 * 2
        }
    
        export enum Enum {
            claw = (()
            ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                => 10)()
        }
    
        export var v: any = x: any: any
                            ~
!!! error TS2304: Cannot find name 'x'.
                             ~
!!! error TS1005: ',' expected.
            => new City(Enum.claw);
            ~~
!!! error TS1128: Declaration or statement expected.
    }
    