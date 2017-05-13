///<reference path='references.ts' />
var TypeScript;
(function (TypeScript) {
    var LineMap = (function () {
        function LineMap(_computeLineStarts, length) {
            this._computeLineStarts = _computeLineStarts;
            this.length = length;
            this._lineStarts = null;
        }
        LineMap.prototype.toJSON = function (key) {
            return { lineStarts: this.lineStarts(), length: this.length };
        };
        LineMap.prototype.equals = function (other) {
            return this.length === other.length && TypeScript.ArrayUtilities.sequenceEquals(this.lineStarts(), other.lineStarts(), function (v1, v2) { return v1 === v2; });
        };
        LineMap.prototype.lineStarts = function () {
            if (this._lineStarts === null) {
                this._lineStarts = this._computeLineStarts();
            }
            return this._lineStarts;
        };
        LineMap.prototype.lineCount = function () {
            return this.lineStarts().length;
        };
        LineMap.prototype.getPosition = function (line, character) {
            return this.lineStarts()[line] + character;
        };
        LineMap.prototype.getLineNumberFromPosition = function (position) {
            if (position < 0 || position > this.length) {
                throw TypeScript.Errors.argumentOutOfRange("position");
            }
            if (position === this.length) {
                // this can happen when the user tried to get the line of items
                // that are at the absolute end of this text (i.e. the EndOfLine
                // token, or missing tokens that are at the end of the text).
                // In this case, we want the last line in the text.
                return this.lineCount() - 1;
            }
            // Binary search to find the right line
            var lineNumber = TypeScript.ArrayUtilities.binarySearch(this.lineStarts(), position);
            if (lineNumber < 0) {
                lineNumber = (~lineNumber) - 1;
            }
            return lineNumber;
        };
        LineMap.prototype.getLineStartPosition = function (lineNumber) {
            return this.lineStarts()[lineNumber];
        };
        LineMap.prototype.fillLineAndCharacterFromPosition = function (position, lineAndCharacter) {
            if (position < 0 || position > this.length) {
                throw TypeScript.Errors.argumentOutOfRange("position");
            }
            var lineNumber = this.getLineNumberFromPosition(position);
            lineAndCharacter.line = lineNumber;
            lineAndCharacter.character = position - this.lineStarts()[lineNumber];
        };
        LineMap.prototype.getLineAndCharacterFromPosition = function (position) {
            if (position < 0 || position > this.length) {
                throw TypeScript.Errors.argumentOutOfRange("position");
            }
            var lineNumber = this.getLineNumberFromPosition(position);
            return new TypeScript.LineAndCharacter(lineNumber, position - this.lineStarts()[lineNumber]);
        };
        LineMap.empty = new LineMap(function () { return [0]; }, 0);
        return LineMap;
    })();
    TypeScript.LineMap = LineMap;
})(TypeScript || (TypeScript = {}));
