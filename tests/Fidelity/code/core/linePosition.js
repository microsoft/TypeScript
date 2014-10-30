///<reference path='references.ts' />
var TypeScript;
(function (TypeScript) {
    var LineAndCharacter = (function () {
        /**
         * Initializes a new instance of a LinePosition with the given line and character. ArgumentOutOfRangeException if "line" or "character" is less than zero.
         * @param line The line of the line position. The first line in a file is defined as line 0 (zero based line numbering).
         * @param character The character position in the line.
         */
        function LineAndCharacter(line, character) {
            this._line = 0;
            this._character = 0;
            if (line < 0) {
                throw TypeScript.Errors.argumentOutOfRange("line");
            }
            if (character < 0) {
                throw TypeScript.Errors.argumentOutOfRange("character");
            }
            this._line = line;
            this._character = character;
        }
        LineAndCharacter.prototype.line = function () {
            return this._line;
        };
        LineAndCharacter.prototype.character = function () {
            return this._character;
        };
        return LineAndCharacter;
    })();
    TypeScript.LineAndCharacter = LineAndCharacter;
})(TypeScript || (TypeScript = {}));
