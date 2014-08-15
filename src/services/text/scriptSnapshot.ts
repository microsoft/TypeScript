///<reference path='references.ts' />

module TypeScript {
    // Represents an immutable snapshot of a script at a specified time.  Once acquired, the 
    // snapshot is observably immutable.  i.e. the same calls with the same parameters will return
    // the same values.
    export interface IScriptSnapshot {
        // Get's a portion of the script snapshot specified by [start, end).  
        getText(start: number, end: number): string;

        // Get's the length of this script snapshot.
        getLength(): number;

        // This call returns the array containing the start position of every line.  
        // i.e."[0, 10, 55]".  TODO: consider making this optional.  The language service could
        // always determine this (albeit in a more expensive manner).
        getLineStartPositions(): number[];

        // Returns a text change range representing what text has changed since the specified version.
        // If the change cannot be determined (say, because a file was opened/closed), then 'null' 
        // should be returned.
        getTextChangeRangeSinceVersion(scriptVersion: number): TextChangeRange;
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

            public getTextChangeRangeSinceVersion(scriptVersion: number): TypeScript.TextChangeRange {
                throw Errors.notYetImplemented();
            }
        }

        export function fromString(text: string): IScriptSnapshot {
            return new StringScriptSnapshot(text);
        }
    }
}