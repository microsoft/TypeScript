// @declaration: true
// @emitDeclarationOnly: true

/**
 * Docs
 */
function Foo() {
    return class Bar {
        /**
         * comment 1
         */
        foo(bar: string): void;
        /**
         * @deprecated This signature is deprecated
         *
         * comment 2
         */
        foo(): string;
        foo(bar?: string): string | void {
            return 'hi'
        }
    }
}
