///<reference path='references.ts' />

module TypeScript {
    export var LocalizedDiagnosticMessages: IIndexable<any> = null;

    export class Location {
        private _fileName: string;
        private _lineMap: LineMap;
        private _start: number;
        private _length: number;

        constructor(fileName: string, lineMap: LineMap, start: number, length: number) {
            this._fileName = fileName;
            this._lineMap = lineMap;
            this._start = start;
            this._length = length;
        }

        public fileName(): string {
            return this._fileName;
        }

        public lineMap(): LineMap {
            return this._lineMap;
        }

        public line(): number {
            return this._lineMap ? this._lineMap.getLineNumberFromPosition(this.start()) : 0;
        }

        public character(): number {
            return this._lineMap ? this._lineMap.getLineAndCharacterFromPosition(this.start()).character() : 0;
        }

        public start(): number {
            return this._start;
        }

        public length(): number {
            return this._length;
        }

        public static equals(location1: Location, location2: Location): boolean {
            return location1._fileName === location2._fileName &&
                location1._start === location2._start &&
                location1._length === location2._length;
        }
    }

    export class Diagnostic extends Location {
        private _diagnosticKey: string;
        private _arguments: any[];
        private _additionalLocations: Location[];

        constructor(fileName: string, lineMap: LineMap, start: number, length: number, diagnosticKey: string, _arguments: any[]= null, additionalLocations: Location[] = null) {
            super(fileName, lineMap, start, length);
            this._diagnosticKey = diagnosticKey;
            this._arguments = (_arguments && _arguments.length > 0) ? _arguments : null;
            this._additionalLocations = (additionalLocations && additionalLocations.length > 0) ? additionalLocations : null;
        }

        public toJSON(key: any): any {
            var result: any = {};
            result.start = this.start();
            result.length = this.length();

            result.diagnosticCode = this._diagnosticKey;

            var _arguments: any[] = (<any>this).arguments();
            if (_arguments && _arguments.length > 0) {
                result.arguments = _arguments;
            }

            return result;
        }

        public diagnosticKey(): string {
            return this._diagnosticKey;
        }

        public arguments(): any[] {
            return this._arguments;
        }

        /**
         * Get the text of the message in the given language.
         */
        public text(): string {
            return TypeScript.getLocalizedText(this._diagnosticKey, this._arguments);
        }

        /**
         * Get the text of the message including the error code in the given language.
         */
        public message(): string {
            return TypeScript.getDiagnosticMessage(this._diagnosticKey, this._arguments);
        }

        /**
         * If a derived class has additional information about other referenced symbols, it can
         * expose the locations of those symbols in a general way, so they can be reported along
         * with the error.
         */
        public additionalLocations(): Location[] {
            return this._additionalLocations || [];
        }

        public static equals(diagnostic1: Diagnostic, diagnostic2: Diagnostic): boolean {
            return Location.equals(diagnostic1, diagnostic2) &&
                diagnostic1._diagnosticKey === diagnostic2._diagnosticKey &&
                ArrayUtilities.sequenceEquals(diagnostic1._arguments, diagnostic2._arguments, (v1, v2) => v1 === v2);
        }

        public info(): DiagnosticInfo {
            return getDiagnosticInfoFromKey(this.diagnosticKey());
        }
    }

    export function newLine(): string {
        // TODO: We need to expose an extensibility point on our hosts to have them tell us what 
        // they want the newline string to be.  That way we can get the correct result regardless
        // of which host we use
        return Environment ? Environment.newLine : "\r\n";
    }

    function getLargestIndex(diagnostic: string): number {
        var largest = -1;
        var regex = /\{(\d+)\}/g;

        var match: RegExpExecArray;
        while (match = regex.exec(diagnostic)) {
            var val = parseInt(match[1]);
            if (!isNaN(val) && val > largest) {
                largest = val;
            }
        }

        return largest;
    }

    function getDiagnosticInfoFromKey(diagnosticKey: string): DiagnosticInfo {
        var result: DiagnosticInfo = diagnosticInformationMap[diagnosticKey];
        Debug.assert(result);
        return result;
    }

    export function getLocalizedText(diagnosticKey: string, args: any[]): string {
        if (LocalizedDiagnosticMessages) {
            //Debug.assert(LocalizedDiagnosticMessages.hasOwnProperty(diagnosticKey));
        }

        var diagnosticMessageText: string = LocalizedDiagnosticMessages ? LocalizedDiagnosticMessages[diagnosticKey] : diagnosticKey;
        Debug.assert(diagnosticMessageText !== undefined && diagnosticMessageText !== null);

        var actualCount = args ? args.length : 0;
        // We have a string like "foo_0_bar_1".  We want to find the largest integer there.
        // (i.e.'1').  We then need one more arg than that to be correct.
        var expectedCount = 1 + getLargestIndex(diagnosticKey);

        if (expectedCount !== actualCount) {
            throw new Error(getLocalizedText(DiagnosticCode.Expected_0_arguments_to_message_got_1_instead, [expectedCount, actualCount]));
        }

        // This should also be the same number of arguments as the message text
        var valueCount = 1 + getLargestIndex(diagnosticMessageText);
        if (valueCount !== expectedCount) {
            throw new Error(getLocalizedText(DiagnosticCode.Expected_the_message_0_to_have_1_arguments_but_it_had_2, [diagnosticMessageText, expectedCount, valueCount]));
        }

        diagnosticMessageText = diagnosticMessageText.replace(/{(\d+)}/g, function (match, num?) {
            return typeof args[num] !== 'undefined'
                ? args[num]
                : match;
        });

        diagnosticMessageText = diagnosticMessageText.replace(/{(NL)}/g, function (match) {
            return TypeScript.newLine();
        });

        return diagnosticMessageText;
    }

    export function getDiagnosticMessage(diagnosticKey: string, args: any[]): string {
        var diagnostic = getDiagnosticInfoFromKey(diagnosticKey);
        var diagnosticMessageText = getLocalizedText(diagnosticKey, args);

        var message: string;
        if (diagnostic.category === DiagnosticCategory.Error) {
            message = getLocalizedText(DiagnosticCode.error_TS_0_1, [diagnostic.code, diagnosticMessageText]);
        }
        else if (diagnostic.category === DiagnosticCategory.Warning) {
            message = getLocalizedText(DiagnosticCode.warning_TS_0_1, [diagnostic.code, diagnosticMessageText]);
        }
        else {
            message = diagnosticMessageText;
        }

        return message;
    }
}