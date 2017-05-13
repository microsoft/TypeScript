///<reference path='references.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypeScript;
(function (TypeScript) {
    var Location = (function () {
        function Location(fileName, lineMap, start, length) {
            this._fileName = fileName;
            this._lineMap = lineMap;
            this._start = start;
            this._length = length;
        }
        Location.prototype.fileName = function () {
            return this._fileName;
        };
        Location.prototype.lineMap = function () {
            return this._lineMap;
        };
        Location.prototype.line = function () {
            return this._lineMap ? this._lineMap.getLineNumberFromPosition(this.start()) : 0;
        };
        Location.prototype.character = function () {
            return this._lineMap ? this._lineMap.getLineAndCharacterFromPosition(this.start()).character() : 0;
        };
        Location.prototype.start = function () {
            return this._start;
        };
        Location.prototype.length = function () {
            return this._length;
        };
        Location.equals = function (location1, location2) {
            return location1._fileName === location2._fileName && location1._start === location2._start && location1._length === location2._length;
        };
        return Location;
    })();
    TypeScript.Location = Location;
    var Diagnostic = (function (_super) {
        __extends(Diagnostic, _super);
        function Diagnostic(fileName, lineMap, start, length, diagnosticKey, _arguments, additionalLocations) {
            if (_arguments === void 0) { _arguments = null; }
            if (additionalLocations === void 0) { additionalLocations = null; }
            _super.call(this, fileName, lineMap, start, length);
            this._diagnosticKey = diagnosticKey;
            this._arguments = (_arguments && _arguments.length > 0) ? _arguments : null;
            this._additionalLocations = (additionalLocations && additionalLocations.length > 0) ? additionalLocations : null;
        }
        Diagnostic.prototype.toJSON = function (key) {
            var result = {};
            result.start = this.start();
            result.length = this.length();
            result.diagnosticCode = this._diagnosticKey;
            var _arguments = this.arguments();
            if (_arguments && _arguments.length > 0) {
                result.arguments = _arguments;
            }
            return result;
        };
        Diagnostic.prototype.diagnosticKey = function () {
            return this._diagnosticKey;
        };
        Diagnostic.prototype.arguments = function () {
            return this._arguments;
        };
        /**
         * Get the text of the message in the given language.
         */
        Diagnostic.prototype.text = function () {
            return TypeScript.getLocalizedText(this._diagnosticKey, this._arguments);
        };
        /**
         * Get the text of the message including the error code in the given language.
         */
        Diagnostic.prototype.message = function () {
            return TypeScript.getDiagnosticMessage(this._diagnosticKey, this._arguments);
        };
        /**
         * If a derived class has additional information about other referenced symbols, it can
         * expose the locations of those symbols in a general way, so they can be reported along
         * with the error.
         */
        Diagnostic.prototype.additionalLocations = function () {
            return this._additionalLocations || [];
        };
        Diagnostic.equals = function (diagnostic1, diagnostic2) {
            return Location.equals(diagnostic1, diagnostic2) && diagnostic1._diagnosticKey === diagnostic2._diagnosticKey && TypeScript.ArrayUtilities.sequenceEquals(diagnostic1._arguments, diagnostic2._arguments, function (v1, v2) { return v1 === v2; });
        };
        Diagnostic.prototype.info = function () {
            return getDiagnosticInfoFromKey(this.diagnosticKey());
        };
        return Diagnostic;
    })(Location);
    TypeScript.Diagnostic = Diagnostic;
    function newLine() {
        // TODO: We need to expose an extensibility point on our hosts to have them tell us what 
        // they want the newline string to be.  That way we can get the correct result regardless
        // of which host we use
        return "\r\n";
    }
    TypeScript.newLine = newLine;
    function getLargestIndex(diagnostic) {
        var largest = -1;
        var regex = /\{(\d+)\}/g;
        var match;
        while (match = regex.exec(diagnostic)) {
            var val = parseInt(match[1]);
            if (!isNaN(val) && val > largest) {
                largest = val;
            }
        }
        return largest;
    }
    function getDiagnosticInfoFromKey(diagnosticKey) {
        var result = TypeScript.diagnosticInformationMap[diagnosticKey];
        TypeScript.Debug.assert(result);
        return result;
    }
    function getLocalizedText(diagnosticKey, args) {
        var diagnosticMessageText = diagnosticKey;
        TypeScript.Debug.assert(diagnosticMessageText !== undefined && diagnosticMessageText !== null);
        var actualCount = args ? args.length : 0;
        // We have a string like "foo_0_bar_1".  We want to find the largest integer there.
        // (i.e.'1').  We then need one more arg than that to be correct.
        var expectedCount = 1 + getLargestIndex(diagnosticKey);
        if (expectedCount !== actualCount) {
            throw new Error(getLocalizedText(TypeScript.DiagnosticCode.Expected_0_arguments_to_message_got_1_instead, [expectedCount, actualCount]));
        }
        // This should also be the same number of arguments as the message text
        var valueCount = 1 + getLargestIndex(diagnosticMessageText);
        if (valueCount !== expectedCount) {
            throw new Error(getLocalizedText(TypeScript.DiagnosticCode.Expected_the_message_0_to_have_1_arguments_but_it_had_2, [diagnosticMessageText, expectedCount, valueCount]));
        }
        diagnosticMessageText = diagnosticMessageText.replace(/{(\d+)}/g, function (match, num) {
            return typeof args[num] !== 'undefined' ? args[num] : match;
        });
        diagnosticMessageText = diagnosticMessageText.replace(/{(NL)}/g, function (match) {
            return TypeScript.newLine();
        });
        return diagnosticMessageText;
    }
    TypeScript.getLocalizedText = getLocalizedText;
    function getDiagnosticMessage(diagnosticKey, args) {
        var diagnostic = getDiagnosticInfoFromKey(diagnosticKey);
        var diagnosticMessageText = getLocalizedText(diagnosticKey, args);
        var message;
        if (diagnostic.category === 1 /* Error */) {
            message = getLocalizedText(TypeScript.DiagnosticCode.error_TS_0_1, [diagnostic.code, diagnosticMessageText]);
        }
        else if (diagnostic.category === 0 /* Warning */) {
            message = getLocalizedText(TypeScript.DiagnosticCode.warning_TS_0_1, [diagnostic.code, diagnosticMessageText]);
        }
        else {
            message = diagnosticMessageText;
        }
        return message;
    }
    TypeScript.getDiagnosticMessage = getDiagnosticMessage;
})(TypeScript || (TypeScript = {}));
