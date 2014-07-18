///<reference path='references.ts' />

module TypeScript {
    export class LineMap {
        public static empty = new LineMap(() => [0], 0);
        private _lineStarts: number[] = null;

        constructor(private _computeLineStarts: () => number[], private length: number) {
        }

        public toJSON(key: any) {
            return { lineStarts: this.lineStarts(), length: this.length };
        }

        public equals(other: LineMap): boolean {
            return this.length === other.length &&
                   ArrayUtilities.sequenceEquals(this.lineStarts(), other.lineStarts(), (v1, v2) => v1 === v2);
        }

        public lineStarts(): number[] {
            if (this._lineStarts === null) {
                this._lineStarts = this._computeLineStarts();
            }

            return this._lineStarts;
        }

        public lineCount(): number {
            return this.lineStarts().length;
        }

        public getPosition(line: number, character: number): number {
            return this.lineStarts()[line] + character;
        }

        public getLineNumberFromPosition(position: number): number {
            if (position < 0 || position > this.length) {
                throw Errors.argumentOutOfRange("position");
            }

            if (position === this.length) {
                // this can happen when the user tried to get the line of items
                // that are at the absolute end of this text (i.e. the EndOfLine
                // token, or missing tokens that are at the end of the text).
                // In this case, we want the last line in the text.
                return this.lineCount() - 1;
            }

            // Binary search to find the right line
            var lineNumber = ArrayUtilities.binarySearch(this.lineStarts(), position);
            if (lineNumber < 0) {
                lineNumber = (~lineNumber) - 1;
            }

            return lineNumber;
        }

        public getLineStartPosition(lineNumber: number): number {
            return this.lineStarts()[lineNumber];
        }

        public fillLineAndCharacterFromPosition(position: number, lineAndCharacter: ILineAndCharacter): void {
            if (position < 0 || position > this.length) {
                throw Errors.argumentOutOfRange("position");
            }

            var lineNumber = this.getLineNumberFromPosition(position);
            lineAndCharacter.line = lineNumber;
            lineAndCharacter.character = position - this.lineStarts()[lineNumber];
        }

        public getLineAndCharacterFromPosition(position: number): LineAndCharacter {
            if (position < 0 || position > this.length) {
                throw Errors.argumentOutOfRange("position");
            }

            var lineNumber = this.getLineNumberFromPosition(position);

            return new LineAndCharacter(lineNumber, position - this.lineStarts()[lineNumber]);
        }
    }
}