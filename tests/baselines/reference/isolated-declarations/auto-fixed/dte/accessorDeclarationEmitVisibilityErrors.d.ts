//// [tests/cases/compiler/accessorDeclarationEmitVisibilityErrors.ts] ////

//// [accessorDeclarationEmitVisibilityErrors.ts]
export class Q {
    set bet(arg: DoesNotExist) {}
}

/// [Declarations] ////



//// [accessorDeclarationEmitVisibilityErrors.d.ts]
export declare class Q {
    set bet(arg: DoesNotExist);
}
//# sourceMappingURL=accessorDeclarationEmitVisibilityErrors.d.ts.map
/// [Errors] ////

accessorDeclarationEmitVisibilityErrors.ts(2,18): error TS2304: Cannot find name 'DoesNotExist'.
accessorDeclarationEmitVisibilityErrors.ts(2,18): error TS4106: Parameter 'arg' of accessor has or is using private name 'DoesNotExist'.


==== accessorDeclarationEmitVisibilityErrors.ts (2 errors) ====
    export class Q {
        set bet(arg: DoesNotExist) {}
                     ~~~~~~~~~~~~
!!! error TS2304: Cannot find name 'DoesNotExist'.
                     ~~~~~~~~~~~~
!!! error TS4106: Parameter 'arg' of accessor has or is using private name 'DoesNotExist'.
    }