///<reference path='references.ts' />

/**
 * Immutable representation of a line in an IText instance.
 */
module TypeScript {
    export interface ITextLine {
        /**
         * Start of the line.
         */
        start(): number;

        /**
         * End of the line not including the line break.
         */
        end(): number;

        /**
         * End of the line including the line break.
         */
        endIncludingLineBreak(): number;

        /**
         * Extent of the line not including the line break.
         */
        extent(): TextSpan;

        /**
         * Extent of the line including the line break.
         */
        extentIncludingLineBreak(): TextSpan;

        /**
         * Gets the text of the line excluding the line break.
         */
        toString(): string;

        /**
         * Gets the line number for this line.
         */
        lineNumber(): number;
    }
}