//// [tests/cases/compiler/methodContainingLocalFunction.ts] ////

//// [methodContainingLocalFunction.ts]
// The first case here (BugExhibition<T>) caused a crash. Try with different permutations of features.
class BugExhibition<T> {
    public exhibitBug(): void {
        function localFunction() { }
        var x: { (): void; };
        x = localFunction;
    }
}

class BugExhibition2<T> {
    private static get exhibitBug() {
        function localFunction() { }
        var x: { (): void; };
        x = localFunction;
        return null;
    }
}

class BugExhibition3<T> {
    public exhibitBug(): void {
        function localGenericFunction<U>(u?: U) { }
        var x: { (): void; };
        x = localGenericFunction;
    }
}

class C {
    exhibit(): void {
        var funcExpr = <U>(u?: U) => { };
        var x: { (): void; };
        x = funcExpr;
    }
}

module M {
    export function exhibitBug(): void {
        function localFunction() { }
        var x: { (): void; };
        x = localFunction;
    }
}

enum E {
    A = (() => {
        function localFunction() { }
        var x: { (): void; };
        x = localFunction;
        return 0;
    })()
}

/// [Declarations] ////



//// [/.src/methodContainingLocalFunction.d.ts]
declare class BugExhibition<T> {
    exhibitBug(): void;
}
declare class BugExhibition2<T> {
    private static get exhibitBug();
}
declare class BugExhibition3<T> {
    exhibitBug(): void;
}
declare class C {
    exhibit(): void;
}
declare namespace M {
    function exhibitBug(): void;
}
declare enum E {
    A
}
/// [Errors] ////

methodContainingLocalFunction.ts(44,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== methodContainingLocalFunction.ts (1 errors) ====
    // The first case here (BugExhibition<T>) caused a crash. Try with different permutations of features.
    class BugExhibition<T> {
        public exhibitBug(): void {
            function localFunction() { }
            var x: { (): void; };
            x = localFunction;
        }
    }
    
    class BugExhibition2<T> {
        private static get exhibitBug() {
            function localFunction() { }
            var x: { (): void; };
            x = localFunction;
            return null;
        }
    }
    
    class BugExhibition3<T> {
        public exhibitBug(): void {
            function localGenericFunction<U>(u?: U) { }
            var x: { (): void; };
            x = localGenericFunction;
        }
    }
    
    class C {
        exhibit(): void {
            var funcExpr = <U>(u?: U) => { };
            var x: { (): void; };
            x = funcExpr;
        }
    }
    
    module M {
        export function exhibitBug(): void {
            function localFunction() { }
            var x: { (): void; };
            x = localFunction;
        }
    }
    
    enum E {
        A = (() => {
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            function localFunction() { }
            var x: { (): void; };
            x = localFunction;
            return 0;
        })()
    }