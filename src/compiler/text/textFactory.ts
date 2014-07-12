///<reference path='references.ts' />

module TypeScript.TextFactory {
    /**
     * Return startLineBreak = index-1, lengthLineBreak = 2   if there is a \r\n at index-1
     * Return startLineBreak = index,   lengthLineBreak = 1   if there is a 1-char newline at index
     * Return startLineBreak = index+1, lengthLineBreak = 0   if there is no newline at index.
     */
    function getStartAndLengthOfLineBreakEndingAt(
        text: IText, index: number, info: LinebreakInfo): void {

        var c = text.charCodeAt(index);
        if (c === CharacterCodes.lineFeed) {
            if (index > 0 && text.charCodeAt(index - 1) === CharacterCodes.carriageReturn) {
                // "\r\n" is the only 2-character line break.
                info.startPosition = index - 1;
                info.length = 2;
            }
            else {
                info.startPosition = index;
                info.length = 1;
            }
        }
        else if (TextUtilities.isAnyLineBreakCharacter(c)) {
            info.startPosition = index;
            info.length = 1;
        }
        else {
            info.startPosition = index + 1;
            info.length = 0;
        }
    }

    class LinebreakInfo {
        constructor(public startPosition: number,
                     public length: number) {
        }
    }

    class TextLine implements ITextLine {
        private _text: IText = null;
        private _textSpan: TextSpan = null;
        private _lineBreakLength: number;
        private _lineNumber: number;

        constructor(text: IText, body: TextSpan, lineBreakLength: number, lineNumber: number) {
            if (text === null) {
                throw Errors.argumentNull('text');
            }
            Debug.assert(lineBreakLength >= 0);
            Debug.assert(lineNumber >= 0);
            this._text = text;
            this._textSpan = body;
            this._lineBreakLength = lineBreakLength;
            this._lineNumber = lineNumber;
        }

        public start(): number {
            return this._textSpan.start();
        }

        public end(): number {
            return this._textSpan.end();
        }

        public endIncludingLineBreak(): number {
            return this.end() + this._lineBreakLength;
        }

        public extent(): TextSpan {
            return this._textSpan;
        }

        public extentIncludingLineBreak(): TextSpan {
            return TextSpan.fromBounds(this.start(), this.endIncludingLineBreak());
        }

        public toString(): string {
            return this._text.toString(this._textSpan);
        }

        public lineNumber(): number {
            return this._lineNumber;
        }
    }

    class TextBase implements IText {
        /**
         * The length of the text represented by StringText.
         */
        public length(): number {
            throw Errors.abstract();
        }

        /**
         * Returns a character at given position. Throws an ArgumentOutOfRangeException when position is negative or 
         * greater than length.
         * @param position The position to get the character from.
         */
        public charCodeAt(position: number): number {
            throw Errors.abstract();
        }

        checkSubSpan(span: TextSpan): void {
            if (span.start() < 0 || span.start() > this.length() || span.end() > this.length()) {
                throw Errors.argumentOutOfRange("span");
            }
        }

        /**
         * Provides a string representation of the StringText located within given span. Throws an ArgumentOutOfRangeException when given span is outside of the text range.
         */
        public toString(span: TextSpan = null): string {
            throw Errors.abstract();
        }

        public subText(span: TextSpan): IText {
            this.checkSubSpan(span);

            return new SubText(this, span);
        }

        public substr(start: number, length: number, intern: boolean): string {
            throw Errors.abstract();
        }

        /**
         * Copy a range of characters from this IText to a destination array.
         */
        public copyTo(sourceIndex: number, destination: number[], destinationIndex: number, count: number): void {
            throw Errors.abstract();
        }

        /**
         * The length of the text represented by StringText.
         */
        public lineCount(): number {
            return this._lineStarts().length;
        }

        /**
         * The sequence of lines represented by StringText.
         */
        public lines(): ITextLine[] {
            var lines: ITextLine[] = [];

            var length = this.lineCount();
            for (var i = 0; i < length; ++i) {
                lines[i] = this.getLineFromLineNumber(i);
            }

            return lines;
        }

        public lineMap(): LineMap {
            return new LineMap(() => this._lineStarts(), this.length());
        }

        public _lineStarts(): number[]{
            throw Errors.abstract();
        }

        private linebreakInfo = new LinebreakInfo(0, 0);
        public getLineFromLineNumber(lineNumber: number): ITextLine {
            var lineStarts = this._lineStarts();

            if (lineNumber < 0 || lineNumber >= lineStarts.length) {
                throw Errors.argumentOutOfRange("lineNumber");
            }

            var first = lineStarts[lineNumber];
            if (lineNumber === lineStarts.length - 1) {
                return new TextLine(this, new TextSpan(first, this.length() - first), 0, lineNumber);
            }
            else {
                getStartAndLengthOfLineBreakEndingAt(this, lineStarts[lineNumber + 1] - 1, this.linebreakInfo);
                return new TextLine(this, new TextSpan(first, this.linebreakInfo.startPosition - first), this.linebreakInfo.length, lineNumber);
            }

        }

        private lastLineFoundForPosition: ITextLine = null;
        public getLineFromPosition(position: number): ITextLine {
            // After asking about a location on a particular line
            // it is common to ask about other position in the same line again.
            // try to see if this is the case.
            var lastFound = this.lastLineFoundForPosition;
            if (lastFound !== null &&
                lastFound.start() <= position &&
                lastFound.endIncludingLineBreak() > position) {
                return lastFound;
            }

            var lineNumber = this.getLineNumberFromPosition(position);

            var result = this.getLineFromLineNumber(lineNumber);
            this.lastLineFoundForPosition = result;
            return result;
        }

        public getLineNumberFromPosition(position: number): number {
            if (position < 0 || position > this.length()) {
                throw Errors.argumentOutOfRange("position");
            }

            if (position === this.length()) {
                // this can happen when the user tried to get the line of items
                // that are at the absolute end of this text (i.e. the EndOfLine
                // token, or missing tokens that are at the end of the text).
                // In this case, we want the last line in the text.
                return this.lineCount() - 1;
            }

            // Binary search to find the right line
            var lineNumber = ArrayUtilities.binarySearch(this._lineStarts(), position);
            if (lineNumber < 0) {
                lineNumber = (~lineNumber) - 1;
            }

            return lineNumber;
        }

        public getLinePosition(position: number): LineAndCharacter {
            if (position < 0 || position > this.length()) {
                throw Errors.argumentOutOfRange("position");
            }

            var lineNumber = this.getLineNumberFromPosition(position);

            return new LineAndCharacter(lineNumber, position - this._lineStarts()[lineNumber]);
        }
    }

    /**
     * An IText that represents a subrange of another IText.
     */
    class SubText extends TextBase {
        private text: IText;
        private span: TextSpan;

        /**
         * The line start position of each line.
         */
        private _lazyLineStarts: number[] = null;

        constructor(text: IText, span: TextSpan) {
            super();

            if (text === null) {
                throw Errors.argumentNull("text");
            }

            if (span.start() < 0 ||
                span.start() >= text.length() ||
                 span.end() < 0 ||
                 span.end() > text.length()) {
                throw Errors.argument("span");
            }

            this.text = text;
            this.span = span;
        }

        public length(): number {
            return this.span.length();
        }

        public charCodeAt(position: number): number {
            if (position < 0 || position > this.length()) {
                throw Errors.argumentOutOfRange("position");
            }

            return this.text.charCodeAt(this.span.start() + position);
        }

        public subText(span: TextSpan): IText {
            this.checkSubSpan(span);

            return new SubText(this.text, this.getCompositeSpan(span.start(), span.length()));
        }

        public copyTo(sourceIndex: number, destination: number[], destinationIndex: number, count: number): void {
            var span = this.getCompositeSpan(sourceIndex, count);
            this.text.copyTo(span.start(), destination, destinationIndex, span.length());
        }

        public substr(start: number, length: number, intern: boolean): string {
            var startInOriginalText = this.span.start() + start;
            return this.text.substr(startInOriginalText, length, intern);
        }

        private getCompositeSpan(start: number, length: number): TextSpan {
            var compositeStart = MathPrototype.min(this.text.length(), this.span.start() + start);
            var compositeEnd = MathPrototype.min(this.text.length(), compositeStart + length);
            return new TextSpan(compositeStart, compositeEnd - compositeStart);
        }

        public _lineStarts(): number[] {
            if (!this._lazyLineStarts) {
                this._lazyLineStarts = TextUtilities.parseLineStarts({ charCodeAt: index => this.charCodeAt(index), length: this.length() });
            }

            return this._lazyLineStarts;
        }
    }

    /**
     * Implementation of IText based on a System.String input
     */
    class StringText extends TextBase {
        /**
         * Underlying string on which this IText instance is based
         */
        private source: string = null;

        /**
         * The line start position of each line.
         */
        private _lazyLineStarts: number[] = null;

        /**
         * Initializes an instance of StringText with provided data.
         */
        constructor(data: string) {
            super();

            if (data === null) {
                throw Errors.argumentNull("data");
            }

            this.source = data;
        }

        /**
         * The length of the text represented by StringText.
         */
        public length(): number {
            return this.source.length;
        }

        /**
         * Returns a character at given position. Throws an ArgumentOutOfRangeException when position is negative or 
         * greater than length.
         * @param position The position to get the character from.
         */
        public charCodeAt(position: number): number {
            if (position < 0 || position >= this.source.length) {
                throw Errors.argumentOutOfRange("position");
            }

            return this.source.charCodeAt(position);
        }

        public substr(start: number, length: number, intern: boolean) {
            return this.source.substr(start, length);
        }

        /**
         * Provides a string representation of the StringText located within given span. Throws an ArgumentOutOfRangeException when given span is outside of the text range.
         */
        public toString(span: TextSpan = null): string {
            if (span === null) {
                span = new TextSpan(0, this.length());
            }

            this.checkSubSpan(span);

            if (span.start() === 0 && span.length() === this.length()) {
                return this.source;
            }

            return this.source.substr(span.start(), span.length());
        }

        public copyTo(sourceIndex: number, destination: number[], destinationIndex: number, count: number): void {
            StringUtilities.copyTo(this.source, sourceIndex, destination, destinationIndex, count);
        }

        public _lineStarts(): number[] {
            if (this._lazyLineStarts === null) {
                this._lazyLineStarts = TextUtilities.parseLineStarts(this.source);
            }

            return this._lazyLineStarts;
        }
    }

    export function createText(value: string): IText {
        return new StringText(value);
    }
}

module TypeScript.SimpleText {
    /**
     * An IText that represents a subrange of another IText.
     */
    class SimpleSubText implements ISimpleText {
        private text: ISimpleText = null;
        private span: TextSpan = null;

        constructor(text: ISimpleText, span: TextSpan) {
            if (text === null) {
                throw Errors.argumentNull("text");
            }

            if (span.start() < 0 ||
                span.start() >= text.length() ||
                 span.end() < 0 ||
                 span.end() > text.length()) {
                throw Errors.argument("span");
            }

            this.text = text;
            this.span = span;
        }

        private checkSubSpan(span: TextSpan): void {
            if (span.start() < 0 || span.start() > this.length() || span.end() > this.length()) {
                throw Errors.argumentOutOfRange("span");
            }
        }

        private checkSubPosition(position: number): void {
            if (position < 0 || position >= this.length()) {
                throw Errors.argumentOutOfRange("position");
            }
        }

        public length(): number {
            return this.span.length();
        }

        public subText(span: TextSpan): ISimpleText {
            this.checkSubSpan(span);

            return new SimpleSubText(this.text, this.getCompositeSpan(span.start(), span.length()));
        }

        public copyTo(sourceIndex: number, destination: number[], destinationIndex: number, count: number): void {
            var span = this.getCompositeSpan(sourceIndex, count);
            this.text.copyTo(span.start(), destination, destinationIndex, span.length());
        }

        public substr(start: number, length: number, intern: boolean): string {
            var span = this.getCompositeSpan(start, length);
            return this.text.substr(span.start(), span.length(), intern);
        }

        private getCompositeSpan(start: number, length: number): TextSpan {
            var compositeStart = MathPrototype.min(this.text.length(), this.span.start() + start);
            var compositeEnd = MathPrototype.min(this.text.length(), compositeStart + length);
            return new TextSpan(compositeStart, compositeEnd - compositeStart);
        }

        public charCodeAt(index: number): number {
            this.checkSubPosition(index);
            return this.text.charCodeAt(this.span.start() + index);
        }

        public lineMap(): LineMap {
            return LineMap1.fromSimpleText(this);
        }
    }

    class SimpleStringText implements ISimpleText {
        private _lineMap: LineMap = null;

        constructor(private value: string) {
        }

        public length(): number {
            return this.value.length;
        }

        public copyTo(sourceIndex: number, destination: number[], destinationIndex: number, count: number): void {
            StringUtilities.copyTo(this.value, sourceIndex, destination, destinationIndex, count);
        }

        private static charArray: number[] = ArrayUtilities.createArray<number>(1024, 0);

        public substr(start: number, length: number, intern: boolean): string {
            if (intern) {
                // use a shared array instance of the length of this substring isn't too large.
                var array: number[] = length <= SimpleStringText.charArray.length
                    ? SimpleStringText.charArray
                    : ArrayUtilities.createArray<number>(length, /*defaultValue:*/0);
                this.copyTo(start, array, 0, length);
                return Collections.DefaultStringTable.addCharArray(array, 0, length);
            }

            return this.value.substr(start, length);
        }

        public subText(span: TextSpan): ISimpleText {
            return new SimpleSubText(this, span);
        }

        public charCodeAt(index: number): number {
            return this.value.charCodeAt(index);
        }

        public lineMap(): LineMap {
            if (!this._lineMap) {
                this._lineMap = LineMap1.fromString(this.value);
            }

            return this._lineMap;
        }
    }

    // Class which wraps a host IScriptSnapshot and exposes an ISimpleText for newer compiler code. 
    class SimpleScriptSnapshotText implements ISimpleText {

        constructor(public scriptSnapshot: IScriptSnapshot) {
        }

        public charCodeAt(index: number): number {
            return this.scriptSnapshot.getText(index, index + 1).charCodeAt(0);
        }

        public length(): number {
            return this.scriptSnapshot.getLength();
        }

        public copyTo(sourceIndex: number, destination: number[], destinationIndex: number, count: number): void {
            var text = this.scriptSnapshot.getText(sourceIndex, sourceIndex + count);
            StringUtilities.copyTo(text, 0, destination, destinationIndex, count);
        }

        public substr(start: number, length: number, intern: boolean): string {
            return this.scriptSnapshot.getText(start, start + length);
        }

        public subText(span: TextSpan): ISimpleText {
            return new SimpleSubText(this, span);
        }

        public lineMap(): LineMap {
            return new LineMap(() => this.scriptSnapshot.getLineStartPositions(), this.length());
        }
    }

    export function fromString(value: string): ISimpleText {
        return new SimpleStringText(value);
    }

    export function fromScriptSnapshot(scriptSnapshot: IScriptSnapshot): ISimpleText {
        return new SimpleScriptSnapshotText(scriptSnapshot);
    }
}
   