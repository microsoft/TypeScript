//// [tests/cases/conformance/enums/enumExportMergingES6.ts] ////

//// [enumExportMergingES6.ts]
export enum Animals {
	Cat = 1
}
export enum Animals {
	Dog = 2
}
export enum Animals {
	CatDog = Cat | Dog
}


/// [Declarations] ////



//// [enumExportMergingES6.d.ts]
export declare enum Animals {
    Cat = 1
}
export declare enum Animals {
    Dog = 2
}
export declare enum Animals {
    CatDog
}
/// [Errors] ////

enumExportMergingES6.ts(8,2): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== enumExportMergingES6.ts (1 errors) ====
    export enum Animals {
    	Cat = 1
    }
    export enum Animals {
    	Dog = 2
    }
    export enum Animals {
    	CatDog = Cat | Dog
    	~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    