//// [tests/cases/compiler/signatureOverloadsWithComments.ts] ////

//// [signatureOverloadsWithComments.ts]
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




//// [signatureOverloadsWithComments.d.ts]
/**
 * Docs
 */
declare function Foo(): {
    new (): {
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
    };
};
