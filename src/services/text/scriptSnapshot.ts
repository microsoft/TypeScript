///<reference path='references.ts' />

module TypeScript {
    /**
     * Represents an immutable snapshot of a script at a specified time.Once acquired, the 
     * snapshot is observably immutable. i.e. the same calls with the same parameters will return
     * the same values.
     */
    export interface IScriptSnapshot {
        /** Gets a portion of the script snapshot specified by [start, end). */
        getText(start: number, end: number): string;

        /** Gets the length of this script snapshot. */
        getLength(): number;

        /**
         * This call returns the array containing the start position of every line.  
         * i.e."[0, 10, 55]".  TODO: consider making this optional.  The language service could
         * always determine this (albeit in a more expensive manner).
         */
        getLineStartPositions(): number[];

        /**
         * Gets the TextChangeRange that describe how the text changed between this text and 
         * an older version.  This information is used by the incremental parser to determine
         * what sections of the script need to be re-parsed.  'undefined' can be returned if the 
         * change range cannot be determined.  However, in that case, incremental parsing will
         * not happen and the entire document will be re - parsed.
         */
        getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange;
    }

    export module ScriptSnapshot {
        class StringScriptSnapshot implements IScriptSnapshot {
            private _lineStartPositions: number[] = null;

            constructor(private text: string) {
            }

            public getText(start: number, end: number): string {
                return this.text.substring(start, end);
            }

            public getLength(): number {
                return this.text.length;
            }

            public getLineStartPositions(): number[]{
                if (!this._lineStartPositions) {
                    this._lineStartPositions = TextUtilities.parseLineStarts(this.text);
                }

                return this._lineStartPositions;
            }

            public getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange {
                throw Errors.notYetImplemented();
            }
        }

        export function fromString(text: string): IScriptSnapshot {
            return new StringScriptSnapshot(text);
        }
    }
}