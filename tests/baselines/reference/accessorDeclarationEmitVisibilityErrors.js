//// [accessorDeclarationEmitVisibilityErrors.ts]
export class Q {
    set bet(arg: DoesNotExist) {}
}

//// [accessorDeclarationEmitVisibilityErrors.js]
export class Q {
    set bet(arg) { }
}
