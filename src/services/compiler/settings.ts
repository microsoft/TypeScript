///<reference path='references.ts' />

module TypeScript {
    export function settingsChangeAffectsSyntax(before: ts.CompilerOptions, after: ts.CompilerOptions): boolean {
        // If the automatic semicolon insertion option has changed, then we have to dump all
        // syntax trees in order to reparse them with the new option.
        //
        // If the language version changed, then that affects what types of things we parse. So
        // we have to dump all syntax trees.
        //
        // If propagateEnumConstants changes, then that affects the constant value data we've 
        // stored in the ISyntaxElement.
        return before.module !== after.module || before.target !== after.target;
    }
}