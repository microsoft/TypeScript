///<reference path='references.ts' />

/**
 * Represents an immutable snapshot of text.
 */
module TypeScript {
    /**
     * Represents an immutable snapshot of text.
     */
    export interface ISimpleText {
        /**
         * Total number of characters in the text source.
         */
        length(): number;

        substr(start: number, length: number): string;

        charCodeAt(index: number): number;
        lineMap(): LineMap;
    }
}