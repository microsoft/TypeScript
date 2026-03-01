//// [tests/cases/compiler/accessorDeclarationEmitVisibilityErrors.ts] ////

//// [accessorDeclarationEmitVisibilityErrors.ts]
export class Q {
    set bet(arg: DoesNotExist) {}
}

//// [accessorDeclarationEmitVisibilityErrors.js]
export class Q {
    set bet(arg) { }
}


//// [accessorDeclarationEmitVisibilityErrors.d.ts]
export declare class Q {
    set bet(arg: DoesNotExist);
}
