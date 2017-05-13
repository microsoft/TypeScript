///<reference path='references.ts' />

module TypeScript {
    export class LineAndCharacter {
        private _line: number = 0;
        private _character: number = 0;

        /**
         * Initializes a new instance of a LinePosition with the given line and character. ArgumentOutOfRangeException if "line" or "character" is less than zero.
         * @param line The line of the line position. The first line in a file is defined as line 0 (zero based line numbering).
         * @param character The character position in the line.
         */
        
        constructor(line: number, character: number) {
            if (line < 0) {
                throw Errors.argumentOutOfRange("line");
            }

            if (character < 0) {
                throw Errors.argumentOutOfRange("character");
            }

            this._line = line;
            this._character = character;
        }

        public line(): number {
            return this._line;
        }

        public character(): number {
            return this._character;
        }
    }
}