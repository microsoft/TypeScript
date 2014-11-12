var sys = (function () {
    function getWScriptSystem() {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var fileStream = new ActiveXObject("ADODB.Stream");
        fileStream.Type = 2;
        var binaryStream = new ActiveXObject("ADODB.Stream");
        binaryStream.Type = 1;
        var args = [];
        for (var i = 0; i < WScript.Arguments.length; i++) {
            args[i] = WScript.Arguments.Item(i);
        }
        function readFile(fileName, encoding) {
            if (!fso.FileExists(fileName)) {
                return undefined;
            }
            fileStream.Open();
            try {
                if (encoding) {
                    fileStream.Charset = encoding;
                    fileStream.LoadFromFile(fileName);
                }
                else {
                    fileStream.Charset = "x-ansi";
                    fileStream.LoadFromFile(fileName);
                    var bom = fileStream.ReadText(2) || "";
                    fileStream.Position = 0;
                    fileStream.Charset = bom.length >= 2 && (bom.charCodeAt(0) === 0xFF && bom.charCodeAt(1) === 0xFE || bom.charCodeAt(0) === 0xFE && bom.charCodeAt(1) === 0xFF) ? "unicode" : "utf-8";
                }
                return fileStream.ReadText();
            }
            catch (e) {
                throw e;
            }
            finally {
                fileStream.Close();
            }
        }
        function writeFile(fileName, data, writeByteOrderMark) {
            fileStream.Open();
            binaryStream.Open();
            try {
                fileStream.Charset = "utf-8";
                fileStream.WriteText(data);
                if (writeByteOrderMark) {
                    fileStream.Position = 0;
                }
                else {
                    fileStream.Position = 3;
                }
                fileStream.CopyTo(binaryStream);
                binaryStream.SaveToFile(fileName, 2);
            }
            finally {
                binaryStream.Close();
                fileStream.Close();
            }
        }
        return {
            args: args,
            newLine: "\r\n",
            useCaseSensitiveFileNames: false,
            write: function (s) {
                WScript.StdOut.Write(s);
            },
            readFile: readFile,
            writeFile: writeFile,
            resolvePath: function (path) {
                return fso.GetAbsolutePathName(path);
            },
            fileExists: function (path) {
                return fso.FileExists(path);
            },
            directoryExists: function (path) {
                return fso.FolderExists(path);
            },
            createDirectory: function (directoryName) {
                if (!this.directoryExists(directoryName)) {
                    fso.CreateFolder(directoryName);
                }
            },
            getExecutingFilePath: function () {
                return WScript.ScriptFullName;
            },
            getCurrentDirectory: function () {
                return new ActiveXObject("WScript.Shell").CurrentDirectory;
            },
            exit: function (exitCode) {
                try {
                    WScript.Quit(exitCode);
                }
                catch (e) {
                }
            }
        };
    }
    function getNodeSystem() {
        var _fs = require("fs");
        var _path = require("path");
        var _os = require('os');
        var platform = _os.platform();
        var useCaseSensitiveFileNames = platform !== "win32" && platform !== "win64" && platform !== "darwin";
        function readFile(fileName, encoding) {
            if (!_fs.existsSync(fileName)) {
                return undefined;
            }
            var buffer = _fs.readFileSync(fileName);
            var len = buffer.length;
            if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
                len &= ~1;
                for (var i = 0; i < len; i += 2) {
                    var temp = buffer[i];
                    buffer[i] = buffer[i + 1];
                    buffer[i + 1] = temp;
                }
                return buffer.toString("utf16le", 2);
            }
            if (len >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
                return buffer.toString("utf16le", 2);
            }
            if (len >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
                return buffer.toString("utf8", 3);
            }
            return buffer.toString("utf8");
        }
        function writeFile(fileName, data, writeByteOrderMark) {
            if (writeByteOrderMark) {
                data = '\uFEFF' + data;
            }
            _fs.writeFileSync(fileName, data, "utf8");
        }
        return {
            args: process.argv.slice(2),
            newLine: _os.EOL,
            useCaseSensitiveFileNames: useCaseSensitiveFileNames,
            write: function (s) {
                _fs.writeSync(1, s);
            },
            readFile: readFile,
            writeFile: writeFile,
            watchFile: function (fileName, callback) {
                _fs.watchFile(fileName, { persistent: true, interval: 250 }, fileChanged);
                return {
                    close: function () {
                        _fs.unwatchFile(fileName, fileChanged);
                    }
                };
                function fileChanged(curr, prev) {
                    if (+curr.mtime <= +prev.mtime) {
                        return;
                    }
                    callback(fileName);
                }
                ;
            },
            resolvePath: function (path) {
                return _path.resolve(path);
            },
            fileExists: function (path) {
                return _fs.existsSync(path);
            },
            directoryExists: function (path) {
                return _fs.existsSync(path) && _fs.statSync(path).isDirectory();
            },
            createDirectory: function (directoryName) {
                if (!this.directoryExists(directoryName)) {
                    _fs.mkdirSync(directoryName);
                }
            },
            getExecutingFilePath: function () {
                return process.mainModule.filename;
            },
            getCurrentDirectory: function () {
                return process.cwd();
            },
            getMemoryUsage: function () {
                if (global.gc) {
                    global.gc();
                }
                return process.memoryUsage().heapUsed;
            },
            exit: function (exitCode) {
                process.exit(exitCode);
            }
        };
    }
    if (typeof WScript !== "undefined" && typeof ActiveXObject === "function") {
        return getWScriptSystem();
    }
    else if (typeof module !== "undefined" && module.exports) {
        return getNodeSystem();
    }
    else {
        return undefined;
    }
})();
var TypeScript;
(function (TypeScript) {
    var Errors = (function () {
        function Errors() {
        }
        Errors.argument = function (argument, message) {
            return new Error("Invalid argument: " + argument + ". " + message);
        };
        Errors.argumentOutOfRange = function (argument) {
            return new Error("Argument out of range: " + argument);
        };
        Errors.argumentNull = function (argument) {
            return new Error("Argument null: " + argument);
        };
        Errors.abstract = function () {
            return new Error("Operation not implemented properly by subclass.");
        };
        Errors.notYetImplemented = function () {
            return new Error("Not yet implemented.");
        };
        Errors.invalidOperation = function (message) {
            return new Error("Invalid operation: " + message);
        };
        return Errors;
    })();
    TypeScript.Errors = Errors;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var ArrayUtilities = (function () {
        function ArrayUtilities() {
        }
        ArrayUtilities.sequenceEquals = function (array1, array2, equals) {
            if (array1 === array2) {
                return true;
            }
            if (!array1 || !array2) {
                return false;
            }
            if (array1.length !== array2.length) {
                return false;
            }
            for (var i = 0, n = array1.length; i < n; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }
            return true;
        };
        ArrayUtilities.contains = function (array, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === value) {
                    return true;
                }
            }
            return false;
        };
        ArrayUtilities.distinct = function (array, equalsFn) {
            var result = [];
            for (var i = 0, n = array.length; i < n; i++) {
                var current = array[i];
                for (var j = 0; j < result.length; j++) {
                    if (equalsFn(result[j], current)) {
                        break;
                    }
                }
                if (j === result.length) {
                    result.push(current);
                }
            }
            return result;
        };
        ArrayUtilities.last = function (array) {
            if (array.length === 0) {
                throw TypeScript.Errors.argumentOutOfRange('array');
            }
            return array[array.length - 1];
        };
        ArrayUtilities.lastOrDefault = function (array, predicate) {
            for (var i = array.length - 1; i >= 0; i--) {
                var v = array[i];
                if (predicate(v, i)) {
                    return v;
                }
            }
            return undefined;
        };
        ArrayUtilities.firstOrDefault = function (array, func) {
            for (var i = 0, n = array.length; i < n; i++) {
                var value = array[i];
                if (func(value, i)) {
                    return value;
                }
            }
            return undefined;
        };
        ArrayUtilities.first = function (array, func) {
            for (var i = 0, n = array.length; i < n; i++) {
                var value = array[i];
                if (!func || func(value, i)) {
                    return value;
                }
            }
            throw TypeScript.Errors.invalidOperation();
        };
        ArrayUtilities.sum = function (array, func) {
            var result = 0;
            for (var i = 0, n = array.length; i < n; i++) {
                result += func(array[i]);
            }
            return result;
        };
        ArrayUtilities.select = function (values, func) {
            var result = new Array(values.length);
            for (var i = 0; i < values.length; i++) {
                result[i] = func(values[i]);
            }
            return result;
        };
        ArrayUtilities.where = function (values, func) {
            var result = new Array();
            for (var i = 0; i < values.length; i++) {
                if (func(values[i])) {
                    result.push(values[i]);
                }
            }
            return result;
        };
        ArrayUtilities.any = function (array, func) {
            for (var i = 0, n = array.length; i < n; i++) {
                if (func(array[i])) {
                    return true;
                }
            }
            return false;
        };
        ArrayUtilities.all = function (array, func) {
            for (var i = 0, n = array.length; i < n; i++) {
                if (!func(array[i])) {
                    return false;
                }
            }
            return true;
        };
        ArrayUtilities.binarySearch = function (array, value) {
            var low = 0;
            var high = array.length - 1;
            while (low <= high) {
                var middle = low + ((high - low) >> 1);
                var midValue = array[middle];
                if (midValue === value) {
                    return middle;
                }
                else if (midValue > value) {
                    high = middle - 1;
                }
                else {
                    low = middle + 1;
                }
            }
            return ~low;
        };
        ArrayUtilities.createArray = function (length, defaultValue) {
            var result = new Array(length);
            for (var i = 0; i < length; i++) {
                result[i] = defaultValue;
            }
            return result;
        };
        ArrayUtilities.grow = function (array, length, defaultValue) {
            var count = length - array.length;
            for (var i = 0; i < count; i++) {
                array.push(defaultValue);
            }
        };
        ArrayUtilities.copy = function (sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
            for (var i = 0; i < length; i++) {
                destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
            }
        };
        ArrayUtilities.indexOf = function (array, predicate) {
            for (var i = 0, n = array.length; i < n; i++) {
                if (predicate(array[i])) {
                    return i;
                }
            }
            return -1;
        };
        return ArrayUtilities;
    })();
    TypeScript.ArrayUtilities = ArrayUtilities;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var StringUtilities = (function () {
        function StringUtilities() {
        }
        StringUtilities.isString = function (value) {
            return Object.prototype.toString.apply(value, []) === '[object String]';
        };
        StringUtilities.endsWith = function (string, value) {
            return string.substring(string.length - value.length, string.length) === value;
        };
        StringUtilities.startsWith = function (string, value) {
            return string.substr(0, value.length) === value;
        };
        StringUtilities.repeat = function (value, count) {
            return Array(count + 1).join(value);
        };
        return StringUtilities;
    })();
    TypeScript.StringUtilities = StringUtilities;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    (function (SyntaxKind) {
        SyntaxKind[SyntaxKind["None"] = 0] = "None";
        SyntaxKind[SyntaxKind["List"] = 1] = "List";
        SyntaxKind[SyntaxKind["WhitespaceTrivia"] = 2] = "WhitespaceTrivia";
        SyntaxKind[SyntaxKind["NewLineTrivia"] = 3] = "NewLineTrivia";
        SyntaxKind[SyntaxKind["MultiLineCommentTrivia"] = 4] = "MultiLineCommentTrivia";
        SyntaxKind[SyntaxKind["SingleLineCommentTrivia"] = 5] = "SingleLineCommentTrivia";
        SyntaxKind[SyntaxKind["SkippedTokenTrivia"] = 6] = "SkippedTokenTrivia";
        SyntaxKind[SyntaxKind["ErrorToken"] = 7] = "ErrorToken";
        SyntaxKind[SyntaxKind["EndOfFileToken"] = 8] = "EndOfFileToken";
        SyntaxKind[SyntaxKind["IdentifierName"] = 9] = "IdentifierName";
        SyntaxKind[SyntaxKind["RegularExpressionLiteral"] = 10] = "RegularExpressionLiteral";
        SyntaxKind[SyntaxKind["NumericLiteral"] = 11] = "NumericLiteral";
        SyntaxKind[SyntaxKind["StringLiteral"] = 12] = "StringLiteral";
        SyntaxKind[SyntaxKind["NoSubstitutionTemplateToken"] = 13] = "NoSubstitutionTemplateToken";
        SyntaxKind[SyntaxKind["TemplateStartToken"] = 14] = "TemplateStartToken";
        SyntaxKind[SyntaxKind["TemplateMiddleToken"] = 15] = "TemplateMiddleToken";
        SyntaxKind[SyntaxKind["TemplateEndToken"] = 16] = "TemplateEndToken";
        SyntaxKind[SyntaxKind["BreakKeyword"] = 17] = "BreakKeyword";
        SyntaxKind[SyntaxKind["CaseKeyword"] = 18] = "CaseKeyword";
        SyntaxKind[SyntaxKind["CatchKeyword"] = 19] = "CatchKeyword";
        SyntaxKind[SyntaxKind["ContinueKeyword"] = 20] = "ContinueKeyword";
        SyntaxKind[SyntaxKind["DebuggerKeyword"] = 21] = "DebuggerKeyword";
        SyntaxKind[SyntaxKind["DefaultKeyword"] = 22] = "DefaultKeyword";
        SyntaxKind[SyntaxKind["DeleteKeyword"] = 23] = "DeleteKeyword";
        SyntaxKind[SyntaxKind["DoKeyword"] = 24] = "DoKeyword";
        SyntaxKind[SyntaxKind["ElseKeyword"] = 25] = "ElseKeyword";
        SyntaxKind[SyntaxKind["FalseKeyword"] = 26] = "FalseKeyword";
        SyntaxKind[SyntaxKind["FinallyKeyword"] = 27] = "FinallyKeyword";
        SyntaxKind[SyntaxKind["ForKeyword"] = 28] = "ForKeyword";
        SyntaxKind[SyntaxKind["FunctionKeyword"] = 29] = "FunctionKeyword";
        SyntaxKind[SyntaxKind["IfKeyword"] = 30] = "IfKeyword";
        SyntaxKind[SyntaxKind["InKeyword"] = 31] = "InKeyword";
        SyntaxKind[SyntaxKind["InstanceOfKeyword"] = 32] = "InstanceOfKeyword";
        SyntaxKind[SyntaxKind["NewKeyword"] = 33] = "NewKeyword";
        SyntaxKind[SyntaxKind["NullKeyword"] = 34] = "NullKeyword";
        SyntaxKind[SyntaxKind["ReturnKeyword"] = 35] = "ReturnKeyword";
        SyntaxKind[SyntaxKind["SwitchKeyword"] = 36] = "SwitchKeyword";
        SyntaxKind[SyntaxKind["ThisKeyword"] = 37] = "ThisKeyword";
        SyntaxKind[SyntaxKind["ThrowKeyword"] = 38] = "ThrowKeyword";
        SyntaxKind[SyntaxKind["TrueKeyword"] = 39] = "TrueKeyword";
        SyntaxKind[SyntaxKind["TryKeyword"] = 40] = "TryKeyword";
        SyntaxKind[SyntaxKind["TypeOfKeyword"] = 41] = "TypeOfKeyword";
        SyntaxKind[SyntaxKind["VarKeyword"] = 42] = "VarKeyword";
        SyntaxKind[SyntaxKind["VoidKeyword"] = 43] = "VoidKeyword";
        SyntaxKind[SyntaxKind["WhileKeyword"] = 44] = "WhileKeyword";
        SyntaxKind[SyntaxKind["WithKeyword"] = 45] = "WithKeyword";
        SyntaxKind[SyntaxKind["ClassKeyword"] = 46] = "ClassKeyword";
        SyntaxKind[SyntaxKind["ConstKeyword"] = 47] = "ConstKeyword";
        SyntaxKind[SyntaxKind["EnumKeyword"] = 48] = "EnumKeyword";
        SyntaxKind[SyntaxKind["ExportKeyword"] = 49] = "ExportKeyword";
        SyntaxKind[SyntaxKind["ExtendsKeyword"] = 50] = "ExtendsKeyword";
        SyntaxKind[SyntaxKind["ImportKeyword"] = 51] = "ImportKeyword";
        SyntaxKind[SyntaxKind["SuperKeyword"] = 52] = "SuperKeyword";
        SyntaxKind[SyntaxKind["ImplementsKeyword"] = 53] = "ImplementsKeyword";
        SyntaxKind[SyntaxKind["InterfaceKeyword"] = 54] = "InterfaceKeyword";
        SyntaxKind[SyntaxKind["LetKeyword"] = 55] = "LetKeyword";
        SyntaxKind[SyntaxKind["PackageKeyword"] = 56] = "PackageKeyword";
        SyntaxKind[SyntaxKind["PrivateKeyword"] = 57] = "PrivateKeyword";
        SyntaxKind[SyntaxKind["ProtectedKeyword"] = 58] = "ProtectedKeyword";
        SyntaxKind[SyntaxKind["PublicKeyword"] = 59] = "PublicKeyword";
        SyntaxKind[SyntaxKind["StaticKeyword"] = 60] = "StaticKeyword";
        SyntaxKind[SyntaxKind["YieldKeyword"] = 61] = "YieldKeyword";
        SyntaxKind[SyntaxKind["AnyKeyword"] = 62] = "AnyKeyword";
        SyntaxKind[SyntaxKind["BooleanKeyword"] = 63] = "BooleanKeyword";
        SyntaxKind[SyntaxKind["ConstructorKeyword"] = 64] = "ConstructorKeyword";
        SyntaxKind[SyntaxKind["DeclareKeyword"] = 65] = "DeclareKeyword";
        SyntaxKind[SyntaxKind["GetKeyword"] = 66] = "GetKeyword";
        SyntaxKind[SyntaxKind["ModuleKeyword"] = 67] = "ModuleKeyword";
        SyntaxKind[SyntaxKind["RequireKeyword"] = 68] = "RequireKeyword";
        SyntaxKind[SyntaxKind["NumberKeyword"] = 69] = "NumberKeyword";
        SyntaxKind[SyntaxKind["SetKeyword"] = 70] = "SetKeyword";
        SyntaxKind[SyntaxKind["StringKeyword"] = 71] = "StringKeyword";
        SyntaxKind[SyntaxKind["OpenBraceToken"] = 72] = "OpenBraceToken";
        SyntaxKind[SyntaxKind["CloseBraceToken"] = 73] = "CloseBraceToken";
        SyntaxKind[SyntaxKind["OpenParenToken"] = 74] = "OpenParenToken";
        SyntaxKind[SyntaxKind["CloseParenToken"] = 75] = "CloseParenToken";
        SyntaxKind[SyntaxKind["OpenBracketToken"] = 76] = "OpenBracketToken";
        SyntaxKind[SyntaxKind["CloseBracketToken"] = 77] = "CloseBracketToken";
        SyntaxKind[SyntaxKind["DotToken"] = 78] = "DotToken";
        SyntaxKind[SyntaxKind["DotDotDotToken"] = 79] = "DotDotDotToken";
        SyntaxKind[SyntaxKind["SemicolonToken"] = 80] = "SemicolonToken";
        SyntaxKind[SyntaxKind["CommaToken"] = 81] = "CommaToken";
        SyntaxKind[SyntaxKind["LessThanToken"] = 82] = "LessThanToken";
        SyntaxKind[SyntaxKind["GreaterThanToken"] = 83] = "GreaterThanToken";
        SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 84] = "LessThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 85] = "GreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 86] = "EqualsEqualsToken";
        SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 87] = "EqualsGreaterThanToken";
        SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 88] = "ExclamationEqualsToken";
        SyntaxKind[SyntaxKind["EqualsEqualsEqualsToken"] = 89] = "EqualsEqualsEqualsToken";
        SyntaxKind[SyntaxKind["ExclamationEqualsEqualsToken"] = 90] = "ExclamationEqualsEqualsToken";
        SyntaxKind[SyntaxKind["PlusToken"] = 91] = "PlusToken";
        SyntaxKind[SyntaxKind["MinusToken"] = 92] = "MinusToken";
        SyntaxKind[SyntaxKind["AsteriskToken"] = 93] = "AsteriskToken";
        SyntaxKind[SyntaxKind["PercentToken"] = 94] = "PercentToken";
        SyntaxKind[SyntaxKind["PlusPlusToken"] = 95] = "PlusPlusToken";
        SyntaxKind[SyntaxKind["MinusMinusToken"] = 96] = "MinusMinusToken";
        SyntaxKind[SyntaxKind["LessThanLessThanToken"] = 97] = "LessThanLessThanToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanToken"] = 98] = "GreaterThanGreaterThanToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanToken"] = 99] = "GreaterThanGreaterThanGreaterThanToken";
        SyntaxKind[SyntaxKind["AmpersandToken"] = 100] = "AmpersandToken";
        SyntaxKind[SyntaxKind["BarToken"] = 101] = "BarToken";
        SyntaxKind[SyntaxKind["CaretToken"] = 102] = "CaretToken";
        SyntaxKind[SyntaxKind["ExclamationToken"] = 103] = "ExclamationToken";
        SyntaxKind[SyntaxKind["TildeToken"] = 104] = "TildeToken";
        SyntaxKind[SyntaxKind["AmpersandAmpersandToken"] = 105] = "AmpersandAmpersandToken";
        SyntaxKind[SyntaxKind["BarBarToken"] = 106] = "BarBarToken";
        SyntaxKind[SyntaxKind["QuestionToken"] = 107] = "QuestionToken";
        SyntaxKind[SyntaxKind["ColonToken"] = 108] = "ColonToken";
        SyntaxKind[SyntaxKind["EqualsToken"] = 109] = "EqualsToken";
        SyntaxKind[SyntaxKind["PlusEqualsToken"] = 110] = "PlusEqualsToken";
        SyntaxKind[SyntaxKind["MinusEqualsToken"] = 111] = "MinusEqualsToken";
        SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 112] = "AsteriskEqualsToken";
        SyntaxKind[SyntaxKind["PercentEqualsToken"] = 113] = "PercentEqualsToken";
        SyntaxKind[SyntaxKind["LessThanLessThanEqualsToken"] = 114] = "LessThanLessThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanEqualsToken"] = 115] = "GreaterThanGreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanEqualsToken"] = 116] = "GreaterThanGreaterThanGreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["AmpersandEqualsToken"] = 117] = "AmpersandEqualsToken";
        SyntaxKind[SyntaxKind["BarEqualsToken"] = 118] = "BarEqualsToken";
        SyntaxKind[SyntaxKind["CaretEqualsToken"] = 119] = "CaretEqualsToken";
        SyntaxKind[SyntaxKind["SlashToken"] = 120] = "SlashToken";
        SyntaxKind[SyntaxKind["SlashEqualsToken"] = 121] = "SlashEqualsToken";
        SyntaxKind[SyntaxKind["SourceUnit"] = 122] = "SourceUnit";
        SyntaxKind[SyntaxKind["QualifiedName"] = 123] = "QualifiedName";
        SyntaxKind[SyntaxKind["ObjectType"] = 124] = "ObjectType";
        SyntaxKind[SyntaxKind["FunctionType"] = 125] = "FunctionType";
        SyntaxKind[SyntaxKind["ArrayType"] = 126] = "ArrayType";
        SyntaxKind[SyntaxKind["ConstructorType"] = 127] = "ConstructorType";
        SyntaxKind[SyntaxKind["GenericType"] = 128] = "GenericType";
        SyntaxKind[SyntaxKind["TypeQuery"] = 129] = "TypeQuery";
        SyntaxKind[SyntaxKind["TupleType"] = 130] = "TupleType";
        SyntaxKind[SyntaxKind["UnionType"] = 131] = "UnionType";
        SyntaxKind[SyntaxKind["ParenthesizedType"] = 132] = "ParenthesizedType";
        SyntaxKind[SyntaxKind["InterfaceDeclaration"] = 133] = "InterfaceDeclaration";
        SyntaxKind[SyntaxKind["FunctionDeclaration"] = 134] = "FunctionDeclaration";
        SyntaxKind[SyntaxKind["ModuleDeclaration"] = 135] = "ModuleDeclaration";
        SyntaxKind[SyntaxKind["ClassDeclaration"] = 136] = "ClassDeclaration";
        SyntaxKind[SyntaxKind["EnumDeclaration"] = 137] = "EnumDeclaration";
        SyntaxKind[SyntaxKind["ImportDeclaration"] = 138] = "ImportDeclaration";
        SyntaxKind[SyntaxKind["ExportAssignment"] = 139] = "ExportAssignment";
        SyntaxKind[SyntaxKind["MemberFunctionDeclaration"] = 140] = "MemberFunctionDeclaration";
        SyntaxKind[SyntaxKind["MemberVariableDeclaration"] = 141] = "MemberVariableDeclaration";
        SyntaxKind[SyntaxKind["ConstructorDeclaration"] = 142] = "ConstructorDeclaration";
        SyntaxKind[SyntaxKind["IndexMemberDeclaration"] = 143] = "IndexMemberDeclaration";
        SyntaxKind[SyntaxKind["GetAccessor"] = 144] = "GetAccessor";
        SyntaxKind[SyntaxKind["SetAccessor"] = 145] = "SetAccessor";
        SyntaxKind[SyntaxKind["PropertySignature"] = 146] = "PropertySignature";
        SyntaxKind[SyntaxKind["CallSignature"] = 147] = "CallSignature";
        SyntaxKind[SyntaxKind["ConstructSignature"] = 148] = "ConstructSignature";
        SyntaxKind[SyntaxKind["IndexSignature"] = 149] = "IndexSignature";
        SyntaxKind[SyntaxKind["MethodSignature"] = 150] = "MethodSignature";
        SyntaxKind[SyntaxKind["Block"] = 151] = "Block";
        SyntaxKind[SyntaxKind["IfStatement"] = 152] = "IfStatement";
        SyntaxKind[SyntaxKind["VariableStatement"] = 153] = "VariableStatement";
        SyntaxKind[SyntaxKind["ExpressionStatement"] = 154] = "ExpressionStatement";
        SyntaxKind[SyntaxKind["ReturnStatement"] = 155] = "ReturnStatement";
        SyntaxKind[SyntaxKind["SwitchStatement"] = 156] = "SwitchStatement";
        SyntaxKind[SyntaxKind["BreakStatement"] = 157] = "BreakStatement";
        SyntaxKind[SyntaxKind["ContinueStatement"] = 158] = "ContinueStatement";
        SyntaxKind[SyntaxKind["ForStatement"] = 159] = "ForStatement";
        SyntaxKind[SyntaxKind["ForInStatement"] = 160] = "ForInStatement";
        SyntaxKind[SyntaxKind["EmptyStatement"] = 161] = "EmptyStatement";
        SyntaxKind[SyntaxKind["ThrowStatement"] = 162] = "ThrowStatement";
        SyntaxKind[SyntaxKind["WhileStatement"] = 163] = "WhileStatement";
        SyntaxKind[SyntaxKind["TryStatement"] = 164] = "TryStatement";
        SyntaxKind[SyntaxKind["LabeledStatement"] = 165] = "LabeledStatement";
        SyntaxKind[SyntaxKind["DoStatement"] = 166] = "DoStatement";
        SyntaxKind[SyntaxKind["DebuggerStatement"] = 167] = "DebuggerStatement";
        SyntaxKind[SyntaxKind["WithStatement"] = 168] = "WithStatement";
        SyntaxKind[SyntaxKind["PrefixUnaryExpression"] = 169] = "PrefixUnaryExpression";
        SyntaxKind[SyntaxKind["DeleteExpression"] = 170] = "DeleteExpression";
        SyntaxKind[SyntaxKind["TypeOfExpression"] = 171] = "TypeOfExpression";
        SyntaxKind[SyntaxKind["VoidExpression"] = 172] = "VoidExpression";
        SyntaxKind[SyntaxKind["ConditionalExpression"] = 173] = "ConditionalExpression";
        SyntaxKind[SyntaxKind["BinaryExpression"] = 174] = "BinaryExpression";
        SyntaxKind[SyntaxKind["PostfixUnaryExpression"] = 175] = "PostfixUnaryExpression";
        SyntaxKind[SyntaxKind["MemberAccessExpression"] = 176] = "MemberAccessExpression";
        SyntaxKind[SyntaxKind["InvocationExpression"] = 177] = "InvocationExpression";
        SyntaxKind[SyntaxKind["ArrayLiteralExpression"] = 178] = "ArrayLiteralExpression";
        SyntaxKind[SyntaxKind["ObjectLiteralExpression"] = 179] = "ObjectLiteralExpression";
        SyntaxKind[SyntaxKind["ObjectCreationExpression"] = 180] = "ObjectCreationExpression";
        SyntaxKind[SyntaxKind["ParenthesizedExpression"] = 181] = "ParenthesizedExpression";
        SyntaxKind[SyntaxKind["ParenthesizedArrowFunctionExpression"] = 182] = "ParenthesizedArrowFunctionExpression";
        SyntaxKind[SyntaxKind["SimpleArrowFunctionExpression"] = 183] = "SimpleArrowFunctionExpression";
        SyntaxKind[SyntaxKind["CastExpression"] = 184] = "CastExpression";
        SyntaxKind[SyntaxKind["ElementAccessExpression"] = 185] = "ElementAccessExpression";
        SyntaxKind[SyntaxKind["FunctionExpression"] = 186] = "FunctionExpression";
        SyntaxKind[SyntaxKind["OmittedExpression"] = 187] = "OmittedExpression";
        SyntaxKind[SyntaxKind["TemplateExpression"] = 188] = "TemplateExpression";
        SyntaxKind[SyntaxKind["TemplateAccessExpression"] = 189] = "TemplateAccessExpression";
        SyntaxKind[SyntaxKind["VariableDeclaration"] = 190] = "VariableDeclaration";
        SyntaxKind[SyntaxKind["VariableDeclarator"] = 191] = "VariableDeclarator";
        SyntaxKind[SyntaxKind["ArgumentList"] = 192] = "ArgumentList";
        SyntaxKind[SyntaxKind["ParameterList"] = 193] = "ParameterList";
        SyntaxKind[SyntaxKind["TypeArgumentList"] = 194] = "TypeArgumentList";
        SyntaxKind[SyntaxKind["TypeParameterList"] = 195] = "TypeParameterList";
        SyntaxKind[SyntaxKind["HeritageClause"] = 196] = "HeritageClause";
        SyntaxKind[SyntaxKind["EqualsValueClause"] = 197] = "EqualsValueClause";
        SyntaxKind[SyntaxKind["CaseSwitchClause"] = 198] = "CaseSwitchClause";
        SyntaxKind[SyntaxKind["DefaultSwitchClause"] = 199] = "DefaultSwitchClause";
        SyntaxKind[SyntaxKind["ElseClause"] = 200] = "ElseClause";
        SyntaxKind[SyntaxKind["CatchClause"] = 201] = "CatchClause";
        SyntaxKind[SyntaxKind["FinallyClause"] = 202] = "FinallyClause";
        SyntaxKind[SyntaxKind["TemplateClause"] = 203] = "TemplateClause";
        SyntaxKind[SyntaxKind["TypeParameter"] = 204] = "TypeParameter";
        SyntaxKind[SyntaxKind["Constraint"] = 205] = "Constraint";
        SyntaxKind[SyntaxKind["SimplePropertyAssignment"] = 206] = "SimplePropertyAssignment";
        SyntaxKind[SyntaxKind["FunctionPropertyAssignment"] = 207] = "FunctionPropertyAssignment";
        SyntaxKind[SyntaxKind["Parameter"] = 208] = "Parameter";
        SyntaxKind[SyntaxKind["EnumElement"] = 209] = "EnumElement";
        SyntaxKind[SyntaxKind["TypeAnnotation"] = 210] = "TypeAnnotation";
        SyntaxKind[SyntaxKind["ComputedPropertyName"] = 211] = "ComputedPropertyName";
        SyntaxKind[SyntaxKind["ExternalModuleReference"] = 212] = "ExternalModuleReference";
        SyntaxKind[SyntaxKind["ModuleNameModuleReference"] = 213] = "ModuleNameModuleReference";
        SyntaxKind[SyntaxKind["FirstStandardKeyword"] = SyntaxKind.BreakKeyword] = "FirstStandardKeyword";
        SyntaxKind[SyntaxKind["LastStandardKeyword"] = SyntaxKind.WithKeyword] = "LastStandardKeyword";
        SyntaxKind[SyntaxKind["FirstFutureReservedKeyword"] = SyntaxKind.ClassKeyword] = "FirstFutureReservedKeyword";
        SyntaxKind[SyntaxKind["LastFutureReservedKeyword"] = SyntaxKind.SuperKeyword] = "LastFutureReservedKeyword";
        SyntaxKind[SyntaxKind["FirstFutureReservedStrictKeyword"] = SyntaxKind.ImplementsKeyword] = "FirstFutureReservedStrictKeyword";
        SyntaxKind[SyntaxKind["LastFutureReservedStrictKeyword"] = SyntaxKind.YieldKeyword] = "LastFutureReservedStrictKeyword";
        SyntaxKind[SyntaxKind["FirstTypeScriptKeyword"] = SyntaxKind.AnyKeyword] = "FirstTypeScriptKeyword";
        SyntaxKind[SyntaxKind["LastTypeScriptKeyword"] = SyntaxKind.StringKeyword] = "LastTypeScriptKeyword";
        SyntaxKind[SyntaxKind["FirstKeyword"] = SyntaxKind.FirstStandardKeyword] = "FirstKeyword";
        SyntaxKind[SyntaxKind["LastKeyword"] = SyntaxKind.LastTypeScriptKeyword] = "LastKeyword";
        SyntaxKind[SyntaxKind["FirstToken"] = SyntaxKind.ErrorToken] = "FirstToken";
        SyntaxKind[SyntaxKind["LastToken"] = SyntaxKind.SlashEqualsToken] = "LastToken";
        SyntaxKind[SyntaxKind["FirstPunctuation"] = SyntaxKind.OpenBraceToken] = "FirstPunctuation";
        SyntaxKind[SyntaxKind["LastPunctuation"] = SyntaxKind.SlashEqualsToken] = "LastPunctuation";
        SyntaxKind[SyntaxKind["FirstFixedWidth"] = SyntaxKind.FirstKeyword] = "FirstFixedWidth";
        SyntaxKind[SyntaxKind["LastFixedWidth"] = SyntaxKind.LastPunctuation] = "LastFixedWidth";
        SyntaxKind[SyntaxKind["FirstTrivia"] = SyntaxKind.WhitespaceTrivia] = "FirstTrivia";
        SyntaxKind[SyntaxKind["LastTrivia"] = SyntaxKind.SkippedTokenTrivia] = "LastTrivia";
        SyntaxKind[SyntaxKind["FirstNode"] = SyntaxKind.SourceUnit] = "FirstNode";
        SyntaxKind[SyntaxKind["LastNode"] = SyntaxKind.ModuleNameModuleReference] = "LastNode";
    })(TypeScript.SyntaxKind || (TypeScript.SyntaxKind = {}));
    var SyntaxKind = TypeScript.SyntaxKind;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var SyntaxFacts;
    (function (SyntaxFacts) {
        var textToKeywordKind = {
            "any": 62 /* AnyKeyword */,
            "boolean": 63 /* BooleanKeyword */,
            "break": 17 /* BreakKeyword */,
            "case": 18 /* CaseKeyword */,
            "catch": 19 /* CatchKeyword */,
            "class": 46 /* ClassKeyword */,
            "continue": 20 /* ContinueKeyword */,
            "const": 47 /* ConstKeyword */,
            "constructor": 64 /* ConstructorKeyword */,
            "debugger": 21 /* DebuggerKeyword */,
            "declare": 65 /* DeclareKeyword */,
            "default": 22 /* DefaultKeyword */,
            "delete": 23 /* DeleteKeyword */,
            "do": 24 /* DoKeyword */,
            "else": 25 /* ElseKeyword */,
            "enum": 48 /* EnumKeyword */,
            "export": 49 /* ExportKeyword */,
            "extends": 50 /* ExtendsKeyword */,
            "false": 26 /* FalseKeyword */,
            "finally": 27 /* FinallyKeyword */,
            "for": 28 /* ForKeyword */,
            "function": 29 /* FunctionKeyword */,
            "get": 66 /* GetKeyword */,
            "if": 30 /* IfKeyword */,
            "implements": 53 /* ImplementsKeyword */,
            "import": 51 /* ImportKeyword */,
            "in": 31 /* InKeyword */,
            "instanceof": 32 /* InstanceOfKeyword */,
            "interface": 54 /* InterfaceKeyword */,
            "let": 55 /* LetKeyword */,
            "module": 67 /* ModuleKeyword */,
            "new": 33 /* NewKeyword */,
            "null": 34 /* NullKeyword */,
            "number": 69 /* NumberKeyword */,
            "package": 56 /* PackageKeyword */,
            "private": 57 /* PrivateKeyword */,
            "protected": 58 /* ProtectedKeyword */,
            "public": 59 /* PublicKeyword */,
            "require": 68 /* RequireKeyword */,
            "return": 35 /* ReturnKeyword */,
            "set": 70 /* SetKeyword */,
            "static": 60 /* StaticKeyword */,
            "string": 71 /* StringKeyword */,
            "super": 52 /* SuperKeyword */,
            "switch": 36 /* SwitchKeyword */,
            "this": 37 /* ThisKeyword */,
            "throw": 38 /* ThrowKeyword */,
            "true": 39 /* TrueKeyword */,
            "try": 40 /* TryKeyword */,
            "typeof": 41 /* TypeOfKeyword */,
            "var": 42 /* VarKeyword */,
            "void": 43 /* VoidKeyword */,
            "while": 44 /* WhileKeyword */,
            "with": 45 /* WithKeyword */,
            "yield": 61 /* YieldKeyword */,
            "{": 72 /* OpenBraceToken */,
            "}": 73 /* CloseBraceToken */,
            "(": 74 /* OpenParenToken */,
            ")": 75 /* CloseParenToken */,
            "[": 76 /* OpenBracketToken */,
            "]": 77 /* CloseBracketToken */,
            ".": 78 /* DotToken */,
            "...": 79 /* DotDotDotToken */,
            ";": 80 /* SemicolonToken */,
            ",": 81 /* CommaToken */,
            "<": 82 /* LessThanToken */,
            ">": 83 /* GreaterThanToken */,
            "<=": 84 /* LessThanEqualsToken */,
            ">=": 85 /* GreaterThanEqualsToken */,
            "==": 86 /* EqualsEqualsToken */,
            "=>": 87 /* EqualsGreaterThanToken */,
            "!=": 88 /* ExclamationEqualsToken */,
            "===": 89 /* EqualsEqualsEqualsToken */,
            "!==": 90 /* ExclamationEqualsEqualsToken */,
            "+": 91 /* PlusToken */,
            "-": 92 /* MinusToken */,
            "*": 93 /* AsteriskToken */,
            "%": 94 /* PercentToken */,
            "++": 95 /* PlusPlusToken */,
            "--": 96 /* MinusMinusToken */,
            "<<": 97 /* LessThanLessThanToken */,
            ">>": 98 /* GreaterThanGreaterThanToken */,
            ">>>": 99 /* GreaterThanGreaterThanGreaterThanToken */,
            "&": 100 /* AmpersandToken */,
            "|": 101 /* BarToken */,
            "^": 102 /* CaretToken */,
            "!": 103 /* ExclamationToken */,
            "~": 104 /* TildeToken */,
            "&&": 105 /* AmpersandAmpersandToken */,
            "||": 106 /* BarBarToken */,
            "?": 107 /* QuestionToken */,
            ":": 108 /* ColonToken */,
            "=": 109 /* EqualsToken */,
            "+=": 110 /* PlusEqualsToken */,
            "-=": 111 /* MinusEqualsToken */,
            "*=": 112 /* AsteriskEqualsToken */,
            "%=": 113 /* PercentEqualsToken */,
            "<<=": 114 /* LessThanLessThanEqualsToken */,
            ">>=": 115 /* GreaterThanGreaterThanEqualsToken */,
            ">>>=": 116 /* GreaterThanGreaterThanGreaterThanEqualsToken */,
            "&=": 117 /* AmpersandEqualsToken */,
            "|=": 118 /* BarEqualsToken */,
            "^=": 119 /* CaretEqualsToken */,
            "/": 120 /* SlashToken */,
            "/=": 121 /* SlashEqualsToken */
        };
        var kindToText = new Array();
        for (var name in textToKeywordKind) {
            if (textToKeywordKind.hasOwnProperty(name)) {
                kindToText[textToKeywordKind[name]] = name;
            }
        }
        kindToText[64 /* ConstructorKeyword */] = "constructor";
        function getTokenKind(text) {
            if (textToKeywordKind.hasOwnProperty(text)) {
                return textToKeywordKind[text];
            }
            return 0 /* None */;
        }
        SyntaxFacts.getTokenKind = getTokenKind;
        function getText(kind) {
            var result = kindToText[kind];
            return result;
        }
        SyntaxFacts.getText = getText;
        function isAnyKeyword(kind) {
            return kind >= TypeScript.SyntaxKind.FirstKeyword && kind <= TypeScript.SyntaxKind.LastKeyword;
        }
        SyntaxFacts.isAnyKeyword = isAnyKeyword;
        function isAnyPunctuation(kind) {
            return kind >= TypeScript.SyntaxKind.FirstPunctuation && kind <= TypeScript.SyntaxKind.LastPunctuation;
        }
        SyntaxFacts.isAnyPunctuation = isAnyPunctuation;
        function isPrefixUnaryExpressionOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 91 /* PlusToken */:
                case 92 /* MinusToken */:
                case 104 /* TildeToken */:
                case 103 /* ExclamationToken */:
                case 95 /* PlusPlusToken */:
                case 96 /* MinusMinusToken */:
                    return true;
                default:
                    return false;
            }
        }
        SyntaxFacts.isPrefixUnaryExpressionOperatorToken = isPrefixUnaryExpressionOperatorToken;
        function isBinaryExpressionOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 93 /* AsteriskToken */:
                case 120 /* SlashToken */:
                case 94 /* PercentToken */:
                case 91 /* PlusToken */:
                case 92 /* MinusToken */:
                case 97 /* LessThanLessThanToken */:
                case 98 /* GreaterThanGreaterThanToken */:
                case 99 /* GreaterThanGreaterThanGreaterThanToken */:
                case 82 /* LessThanToken */:
                case 83 /* GreaterThanToken */:
                case 84 /* LessThanEqualsToken */:
                case 85 /* GreaterThanEqualsToken */:
                case 32 /* InstanceOfKeyword */:
                case 31 /* InKeyword */:
                case 86 /* EqualsEqualsToken */:
                case 88 /* ExclamationEqualsToken */:
                case 89 /* EqualsEqualsEqualsToken */:
                case 90 /* ExclamationEqualsEqualsToken */:
                case 100 /* AmpersandToken */:
                case 102 /* CaretToken */:
                case 101 /* BarToken */:
                case 105 /* AmpersandAmpersandToken */:
                case 106 /* BarBarToken */:
                case 118 /* BarEqualsToken */:
                case 117 /* AmpersandEqualsToken */:
                case 119 /* CaretEqualsToken */:
                case 114 /* LessThanLessThanEqualsToken */:
                case 115 /* GreaterThanGreaterThanEqualsToken */:
                case 116 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                case 110 /* PlusEqualsToken */:
                case 111 /* MinusEqualsToken */:
                case 112 /* AsteriskEqualsToken */:
                case 121 /* SlashEqualsToken */:
                case 113 /* PercentEqualsToken */:
                case 109 /* EqualsToken */:
                case 81 /* CommaToken */:
                    return true;
                default:
                    return false;
            }
        }
        SyntaxFacts.isBinaryExpressionOperatorToken = isBinaryExpressionOperatorToken;
        function isAssignmentOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 118 /* BarEqualsToken */:
                case 117 /* AmpersandEqualsToken */:
                case 119 /* CaretEqualsToken */:
                case 114 /* LessThanLessThanEqualsToken */:
                case 115 /* GreaterThanGreaterThanEqualsToken */:
                case 116 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                case 110 /* PlusEqualsToken */:
                case 111 /* MinusEqualsToken */:
                case 112 /* AsteriskEqualsToken */:
                case 121 /* SlashEqualsToken */:
                case 113 /* PercentEqualsToken */:
                case 109 /* EqualsToken */:
                    return true;
                default:
                    return false;
            }
        }
        SyntaxFacts.isAssignmentOperatorToken = isAssignmentOperatorToken;
        function isType(kind) {
            switch (kind) {
                case 126 /* ArrayType */:
                case 62 /* AnyKeyword */:
                case 69 /* NumberKeyword */:
                case 63 /* BooleanKeyword */:
                case 71 /* StringKeyword */:
                case 43 /* VoidKeyword */:
                case 125 /* FunctionType */:
                case 124 /* ObjectType */:
                case 127 /* ConstructorType */:
                case 129 /* TypeQuery */:
                case 128 /* GenericType */:
                case 123 /* QualifiedName */:
                case 9 /* IdentifierName */:
                    return true;
            }
            return false;
        }
        SyntaxFacts.isType = isType;
    })(SyntaxFacts = TypeScript.SyntaxFacts || (TypeScript.SyntaxFacts = {}));
})(TypeScript || (TypeScript = {}));
var forPrettyPrinter = false;
var interfaces = {
    IMemberDeclarationSyntax: 'IClassElementSyntax',
    IStatementSyntax: 'IModuleElementSyntax',
    INameSyntax: 'ITypeSyntax',
    IUnaryExpressionSyntax: 'IExpressionSyntax',
    IPostfixExpressionSyntax: 'IUnaryExpressionSyntax',
    ILeftHandSideExpressionSyntax: 'IPostfixExpressionSyntax',
    IMemberExpressionSyntax: 'ILeftHandSideExpressionSyntax',
    ICallExpressionSyntax: 'ILeftHandSideExpressionSyntax',
    IPrimaryExpressionSyntax: 'IMemberExpressionSyntax'
};
var definitions = [
    {
        name: 'SourceUnitSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'moduleElements', isList: true, elementType: 'IModuleElementSyntax' },
            { name: 'endOfFileToken', isToken: true }
        ]
    },
    {
        name: 'ExternalModuleReferenceSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleReferenceSyntax'],
        children: [
            { name: 'requireKeyword', isToken: true, excludeFromAST: true },
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'stringLiteral', isToken: true },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ModuleNameModuleReferenceSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleReferenceSyntax'],
        children: [
            { name: 'moduleName', type: 'INameSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ImportDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            { name: 'importKeyword', isToken: true, excludeFromAST: true },
            { name: 'identifier', isToken: true },
            { name: 'equalsToken', isToken: true, excludeFromAST: true },
            { name: 'moduleReference', type: 'IModuleReferenceSyntax' },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ExportAssignmentSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            { name: 'exportKeyword', isToken: true, excludeFromAST: true },
            { name: 'equalsToken', isToken: true, excludeFromAST: true },
            { name: 'identifier', isToken: true },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ClassDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            { name: 'classKeyword', isToken: true, excludeFromAST: true },
            { name: 'identifier', isToken: true },
            { name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true },
            { name: 'heritageClauses', isList: true, elementType: 'HeritageClauseSyntax' },
            { name: 'openBraceToken', isToken: true, excludeFromAST: true },
            { name: 'classElements', isList: true, elementType: 'IClassElementSyntax' },
            { name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'InterfaceDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            { name: 'interfaceKeyword', isToken: true, excludeFromAST: true },
            { name: 'identifier', isToken: true },
            { name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true },
            { name: 'heritageClauses', isList: true, elementType: 'HeritageClauseSyntax' },
            { name: 'body', type: 'ObjectTypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'HeritageClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'extendsOrImplementsKeyword', isToken: true },
            { name: 'typeNames', isSeparatedList: true, requiresAtLeastOneItem: true, elementType: 'INameSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ModuleDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            { name: 'moduleKeyword', isToken: true, excludeFromAST: true },
            { name: 'name', type: 'INameSyntax' },
            { name: 'openBraceToken', isToken: true, excludeFromAST: true },
            { name: 'moduleElements', isList: true, elementType: 'IModuleElementSyntax' },
            { name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'FunctionDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken', isTypeScriptSpecific: true },
            { name: 'functionKeyword', isToken: true, excludeFromAST: true },
            { name: 'asterixToken', isToken: true, isOptional: true },
            { name: 'identifier', isToken: true },
            { name: 'callSignature', type: 'CallSignatureSyntax' },
            { name: 'body', type: 'BlockSyntax | ISyntaxToken', isOptional: true }
        ]
    },
    {
        name: 'VariableStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken', isTypeScriptSpecific: true },
            { name: 'variableDeclaration', type: 'VariableDeclarationSyntax' },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    {
        name: 'VariableDeclarationSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'varKeyword', isToken: true },
            { name: 'variableDeclarators', isSeparatedList: true, requiresAtLeastOneItem: true, elementType: 'VariableDeclaratorSyntax' }
        ]
    },
    {
        name: 'VariableDeclaratorSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'propertyName', type: 'IPropertyNameSyntax' },
            { name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true, isTypeScriptSpecific: true },
            { name: 'equalsValueClause', type: 'EqualsValueClauseSyntax', isOptional: true }
        ]
    },
    {
        name: 'EqualsValueClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'equalsToken', isToken: true, excludeFromAST: true },
            { name: 'value', type: 'IExpressionSyntax' }
        ]
    },
    {
        name: 'PrefixUnaryExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            { name: 'operatorToken', isToken: true },
            { name: 'operand', type: 'IUnaryExpressionSyntax' }
        ]
    },
    {
        name: 'ArrayLiteralExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            { name: 'openBracketToken', isToken: true, excludeFromAST: true },
            { name: 'expressions', isSeparatedList: true, elementType: 'IExpressionSyntax' },
            { name: 'closeBracketToken', isToken: true, excludeFromAST: true }
        ]
    },
    {
        name: 'OmittedExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IExpressionSyntax'],
        children: []
    },
    {
        name: 'ParenthesizedExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'expression', type: 'IExpressionSyntax' },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true }
        ]
    },
    {
        name: 'SimpleArrowFunctionExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            { name: 'parameter', type: 'ParameterSyntax' },
            { name: 'equalsGreaterThanToken', isToken: true, excludeFromAST: true },
            { name: 'body', type: 'BlockSyntax | IExpressionSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ParenthesizedArrowFunctionExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            { name: 'callSignature', type: 'CallSignatureSyntax' },
            { name: 'equalsGreaterThanToken', isToken: true, excludeFromAST: true },
            { name: 'body', type: 'BlockSyntax | IExpressionSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'QualifiedNameSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['INameSyntax'],
        children: [
            { name: 'left', type: 'INameSyntax' },
            { name: 'dotToken', isToken: true, excludeFromAST: true },
            { name: 'right', isToken: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'TypeArgumentListSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'lessThanToken', isToken: true },
            { name: 'typeArguments', isSeparatedList: true, elementType: 'ITypeSyntax' },
            { name: 'greaterThanToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ConstructorTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            { name: 'newKeyword', isToken: true, excludeFromAST: true },
            { name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true },
            { name: 'parameterList', type: 'ParameterListSyntax' },
            { name: 'equalsGreaterThanToken', isToken: true, excludeFromAST: true },
            { name: 'type', type: 'ITypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'FunctionTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            { name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true },
            { name: 'parameterList', type: 'ParameterListSyntax' },
            { name: 'equalsGreaterThanToken', isToken: true, excludeFromAST: true },
            { name: 'type', type: 'ITypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ObjectTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            { name: 'openBraceToken', isToken: true, excludeFromAST: true },
            { name: 'typeMembers', isSeparatedList: true, elementType: 'ITypeMemberSyntax' },
            { name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ArrayTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            { name: 'type', type: 'ITypeSyntax' },
            { name: 'openBracketToken', isToken: true, excludeFromAST: true },
            { name: 'closeBracketToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'GenericTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            { name: 'name', type: 'INameSyntax' },
            { name: 'typeArgumentList', type: 'TypeArgumentListSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'TypeQuerySyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            { name: 'typeOfKeyword', isToken: true, excludeFromAST: true },
            { name: 'name', type: 'INameSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'TupleTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            { name: 'openBracketToken', isToken: true, excludeFromAST: true },
            { name: 'types', isSeparatedList: true, elementType: 'ITypeSyntax' },
            { name: 'closeBracketToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'UnionTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            { name: 'left', type: 'ITypeSyntax' },
            { name: 'barToken', isToken: true, excludeFromAST: true },
            { name: 'right', type: 'ITypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ParenthesizedTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'type', type: 'ITypeSyntax' },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'TypeAnnotationSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'colonToken', isToken: true, excludeFromAST: true },
            { name: 'type', type: 'ITypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'BlockSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'openBraceToken', isToken: true },
            { name: 'statements', isList: true, elementType: 'IStatementSyntax' },
            { name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ]
    },
    {
        name: 'ParameterSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'dotDotDotToken', isToken: true, isOptional: true, isTypeScriptSpecific: true },
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            { name: 'identifier', isToken: true },
            { name: 'questionToken', isToken: true, isOptional: true, isTypeScriptSpecific: true },
            { name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true, isTypeScriptSpecific: true },
            { name: 'equalsValueClause', type: 'EqualsValueClauseSyntax', isOptional: true, isTypeScriptSpecific: true }
        ]
    },
    {
        name: 'MemberAccessExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberExpressionSyntax', 'ICallExpressionSyntax'],
        children: [
            { name: 'expression', type: 'ILeftHandSideExpressionSyntax' },
            { name: 'dotToken', isToken: true, excludeFromAST: true },
            { name: 'name', isToken: true }
        ]
    },
    {
        name: 'PostfixUnaryExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPostfixExpressionSyntax'],
        children: [
            { name: 'operand', type: 'ILeftHandSideExpressionSyntax' },
            { name: 'operatorToken', isToken: true }
        ]
    },
    {
        name: 'ElementAccessExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberExpressionSyntax', 'ICallExpressionSyntax'],
        children: [
            { name: 'expression', type: 'ILeftHandSideExpressionSyntax' },
            { name: 'openBracketToken', isToken: true, excludeFromAST: true },
            { name: 'argumentExpression', type: 'IExpressionSyntax' },
            { name: 'closeBracketToken', isToken: true, excludeFromAST: true }
        ]
    },
    {
        name: 'TemplateAccessExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberExpressionSyntax', 'ICallExpressionSyntax'],
        children: [
            { name: 'expression', type: 'ILeftHandSideExpressionSyntax' },
            { name: 'templateExpression', type: 'IPrimaryExpressionSyntax' }
        ]
    },
    {
        name: 'TemplateExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            { name: 'templateStartToken', isToken: true, excludeFromAST: true },
            { name: 'templateClauses', isList: true, elementType: 'TemplateClauseSyntax' }
        ]
    },
    {
        name: 'TemplateClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'expression', type: 'IExpressionSyntax' },
            { name: 'templateMiddleOrEndToken', isToken: true, elementType: 'TemplateSpanSyntax' }
        ]
    },
    {
        name: 'InvocationExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ICallExpressionSyntax'],
        children: [
            { name: 'expression', type: 'ILeftHandSideExpressionSyntax' },
            { name: 'argumentList', type: 'ArgumentListSyntax' }
        ]
    },
    {
        name: 'ArgumentListSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'typeArgumentList', type: 'TypeArgumentListSyntax', isOptional: true },
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'arguments', isSeparatedList: true, elementType: 'IExpressionSyntax' },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true }
        ]
    },
    {
        name: 'BinaryExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IExpressionSyntax'],
        children: [
            { name: 'left', type: 'IExpressionSyntax' },
            { name: 'operatorToken', isToken: true },
            { name: 'right', type: 'IExpressionSyntax' }
        ]
    },
    {
        name: 'ConditionalExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IExpressionSyntax'],
        children: [
            { name: 'condition', type: 'IExpressionSyntax' },
            { name: 'questionToken', isToken: true, excludeFromAST: true },
            { name: 'whenTrue', type: 'IExpressionSyntax' },
            { name: 'colonToken', isToken: true, excludeFromAST: true },
            { name: 'whenFalse', type: 'IExpressionSyntax' }
        ]
    },
    {
        name: 'ConstructSignatureSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeMemberSyntax'],
        children: [
            { name: 'newKeyword', isToken: true, excludeFromAST: true },
            { name: 'callSignature', type: 'CallSignatureSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'MethodSignatureSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeMemberSyntax'],
        children: [
            { name: 'propertyName', type: 'IPropertyNameSyntax' },
            { name: 'questionToken', isToken: true, isOptional: true, itTypeScriptSpecific: true },
            { name: 'callSignature', type: 'CallSignatureSyntax' }
        ]
    },
    {
        name: 'IndexSignatureSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeMemberSyntax'],
        children: [
            { name: 'openBracketToken', isToken: true },
            { name: 'parameters', isSeparatedList: true, elementType: 'ParameterSyntax' },
            { name: 'closeBracketToken', isToken: true },
            { name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'PropertySignatureSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeMemberSyntax'],
        children: [
            { name: 'propertyName', type: 'IPropertyNameSyntax' },
            { name: 'questionToken', isToken: true, isOptional: true },
            { name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'CallSignatureSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeMemberSyntax'],
        children: [
            { name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true, isTypeScriptSpecific: true },
            { name: 'parameterList', type: 'ParameterListSyntax' },
            { name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true, isTypeScriptSpecific: true }
        ]
    },
    {
        name: 'ParameterListSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'parameters', isSeparatedList: true, elementType: 'ParameterSyntax' },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true }
        ]
    },
    {
        name: 'TypeParameterListSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'lessThanToken', isToken: true },
            { name: 'typeParameters', isSeparatedList: true, elementType: 'TypeParameterSyntax' },
            { name: 'greaterThanToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'TypeParameterSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'identifier', isToken: true },
            { name: 'constraint', type: 'ConstraintSyntax', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ConstraintSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'extendsKeyword', isToken: true, excludeFromAST: true },
            { name: 'typeOrExpression', type: 'ISyntaxNodeOrToken' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ElseClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'elseKeyword', isToken: true, excludeFromAST: true },
            { name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    {
        name: 'IfStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'ifKeyword', isToken: true, excludeFromAST: true },
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'condition', type: 'IExpressionSyntax' },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true },
            { name: 'statement', type: 'IStatementSyntax' },
            { name: 'elseClause', type: 'ElseClauseSyntax', isOptional: true }
        ]
    },
    {
        name: 'ExpressionStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'expression', type: 'IExpressionSyntax' },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    {
        name: 'ConstructorDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IClassElementSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            { name: 'constructorKeyword', isToken: true },
            { name: 'callSignature', type: 'CallSignatureSyntax' },
            { name: 'body', type: 'BlockSyntax | ISyntaxToken', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'MemberFunctionDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberDeclarationSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            { name: 'asterixToken', isToken: true, isOptional: true },
            { name: 'propertyName', type: 'IPropertyNameSyntax' },
            { name: 'callSignature', type: 'CallSignatureSyntax' },
            { name: 'body', type: 'BlockSyntax | ISyntaxToken', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'GetAccessorSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IAccessorSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken', isTypeScriptSpecific: true },
            { name: 'getKeyword', isToken: true, excludeFromAST: true },
            { name: 'propertyName', type: 'IPropertyNameSyntax' },
            { name: 'callSignature', type: 'CallSignatureSyntax' },
            { name: 'block', type: 'BlockSyntax' }
        ]
    },
    {
        name: 'SetAccessorSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IAccessorSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken', isTypeScriptSpecific: true },
            { name: 'setKeyword', isToken: true, excludeFromAST: true },
            { name: 'propertyName', type: 'IPropertyNameSyntax' },
            { name: 'callSignature', type: 'CallSignatureSyntax' },
            { name: 'block', type: 'BlockSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'MemberVariableDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberDeclarationSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            { name: 'variableDeclarator', type: 'VariableDeclaratorSyntax' },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'IndexMemberDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IClassElementSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            { name: 'indexSignature', type: 'IndexSignatureSyntax' },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ThrowStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'throwKeyword', isToken: true, excludeFromAST: true },
            { name: 'expression', type: 'IExpressionSyntax' },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    {
        name: 'ReturnStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'returnKeyword', isToken: true },
            { name: 'expression', type: 'IExpressionSyntax', isOptional: true },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    {
        name: 'ObjectCreationExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            { name: 'newKeyword', isToken: true, excludeFromAST: true },
            { name: 'expression', type: 'IMemberExpressionSyntax' },
            { name: 'argumentList', type: 'ArgumentListSyntax', isOptional: true }
        ]
    },
    {
        name: 'SwitchStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'switchKeyword', isToken: true, excludeFromAST: true },
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'expression', type: 'IExpressionSyntax' },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true },
            { name: 'openBraceToken', isToken: true, excludeFromAST: true },
            { name: 'switchClauses', isList: true, elementType: 'ISwitchClauseSyntax' },
            { name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ]
    },
    {
        name: 'CaseSwitchClauseSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ISwitchClauseSyntax'],
        children: [
            { name: 'caseKeyword', isToken: true, excludeFromAST: true },
            { name: 'expression', type: 'IExpressionSyntax' },
            { name: 'colonToken', isToken: true, excludeFromAST: true },
            { name: 'statements', isList: true, elementType: 'IStatementSyntax' }
        ]
    },
    {
        name: 'DefaultSwitchClauseSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ISwitchClauseSyntax'],
        children: [
            { name: 'defaultKeyword', isToken: true, excludeFromAST: true },
            { name: 'colonToken', isToken: true, excludeFromAST: true },
            { name: 'statements', isList: true, elementType: 'IStatementSyntax' }
        ]
    },
    {
        name: 'BreakStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'breakKeyword', isToken: true },
            { name: 'identifier', isToken: true, isOptional: true },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    {
        name: 'ContinueStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'continueKeyword', isToken: true },
            { name: 'identifier', isToken: true, isOptional: true },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    {
        name: 'ForStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'forKeyword', isToken: true, excludeFromAST: true },
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'initializer', type: 'VariableDeclarationSyntax | IExpressionSyntax', isOptional: true },
            { name: 'firstSemicolonToken', isToken: true, excludeFromAST: true },
            { name: 'condition', type: 'IExpressionSyntax', isOptional: true },
            { name: 'secondSemicolonToken', isToken: true, excludeFromAST: true },
            { name: 'incrementor', type: 'IExpressionSyntax', isOptional: true },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true },
            { name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    {
        name: 'ForInStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'forKeyword', isToken: true, excludeFromAST: true },
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'left', type: 'VariableDeclarationSyntax | IExpressionSyntax' },
            { name: 'inKeyword', isToken: true, excludeFromAST: true },
            { name: 'right', type: 'IExpressionSyntax' },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true },
            { name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    {
        name: 'WhileStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'whileKeyword', isToken: true, excludeFromAST: true },
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'condition', type: 'IExpressionSyntax' },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true },
            { name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    {
        name: 'WithStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'withKeyword', isToken: true, excludeFromAST: true },
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'condition', type: 'IExpressionSyntax' },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true },
            { name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    {
        name: 'EnumDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            { name: 'enumKeyword', isToken: true, excludeFromAST: true },
            { name: 'identifier', isToken: true },
            { name: 'openBraceToken', isToken: true, excludeFromAST: true },
            { name: 'enumElements', isSeparatedList: true, elementType: 'EnumElementSyntax' },
            { name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'EnumElementSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'propertyName', type: 'IPropertyNameSyntax' },
            { name: 'equalsValueClause', type: 'EqualsValueClauseSyntax', isOptional: true }
        ]
    },
    {
        name: 'CastExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            { name: 'lessThanToken', isToken: true, excludeFromAST: true },
            { name: 'type', type: 'ITypeSyntax' },
            { name: 'greaterThanToken', isToken: true, excludeFromAST: true },
            { name: 'expression', type: 'IUnaryExpressionSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'ObjectLiteralExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            { name: 'openBraceToken', isToken: true, excludeFromAST: true },
            { name: 'propertyAssignments', isSeparatedList: true, elementType: 'IPropertyAssignmentSyntax' },
            { name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ]
    },
    {
        name: 'ComputedPropertyNameSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPropertyNameSyntax'],
        children: [
            { name: 'openBracketToken', isToken: true },
            { name: 'expression', type: 'IExpressionSyntax' },
            { name: 'closeBracketToken', isToken: true }
        ]
    },
    {
        name: 'SimplePropertyAssignmentSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPropertyAssignmentSyntax'],
        children: [
            { name: 'propertyName', type: 'IPropertyNameSyntax' },
            { name: 'colonToken', isToken: true, excludeFromAST: true },
            { name: 'expression', type: 'IExpressionSyntax' }
        ]
    },
    {
        name: 'FunctionPropertyAssignmentSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPropertyAssignmentSyntax'],
        children: [
            { name: 'asterixToken', isToken: true, isOptional: true },
            { name: 'propertyName', type: 'IPropertyNameSyntax' },
            { name: 'callSignature', type: 'CallSignatureSyntax' },
            { name: 'block', type: 'BlockSyntax' }
        ]
    },
    {
        name: 'FunctionExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            { name: 'functionKeyword', isToken: true, excludeFromAST: true },
            { name: 'asterixToken', isToken: true, isOptional: true },
            { name: 'identifier', isToken: true, isOptional: true },
            { name: 'callSignature', type: 'CallSignatureSyntax' },
            { name: 'block', type: 'BlockSyntax' }
        ]
    },
    {
        name: 'EmptyStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'semicolonToken', isToken: true }
        ]
    },
    {
        name: 'TryStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'tryKeyword', isToken: true, excludeFromAST: true },
            { name: 'block', type: 'BlockSyntax' },
            { name: 'catchClause', type: 'CatchClauseSyntax', isOptional: true },
            { name: 'finallyClause', type: 'FinallyClauseSyntax', isOptional: true }
        ]
    },
    {
        name: 'CatchClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'catchKeyword', isToken: true, excludeFromAST: true },
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'identifier', isToken: true },
            { name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true, isTypeScriptSpecified: true },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true },
            { name: 'block', type: 'BlockSyntax' }
        ]
    },
    {
        name: 'FinallyClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'finallyKeyword', isToken: true, excludeFromAST: true },
            { name: 'block', type: 'BlockSyntax' }
        ]
    },
    {
        name: 'LabeledStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'identifier', isToken: true },
            { name: 'colonToken', isToken: true, excludeFromAST: true },
            { name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    {
        name: 'DoStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'doKeyword', isToken: true, excludeFromAST: true },
            { name: 'statement', type: 'IStatementSyntax' },
            { name: 'whileKeyword', isToken: true, excludeFromAST: true },
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'condition', type: 'IExpressionSyntax' },
            { name: 'closeParenToken', isToken: true, excludeFromAST: true },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    {
        name: 'TypeOfExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            { name: 'typeOfKeyword', isToken: true, excludeFromAST: true },
            { name: 'expression', type: 'IUnaryExpressionSyntax' }
        ]
    },
    {
        name: 'DeleteExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            { name: 'deleteKeyword', isToken: true, excludeFromAST: true },
            { name: 'expression', type: 'IUnaryExpressionSyntax' }
        ]
    },
    {
        name: 'VoidExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            { name: 'voidKeyword', isToken: true, excludeFromAST: true },
            { name: 'expression', type: 'IUnaryExpressionSyntax' }
        ]
    },
    {
        name: 'DebuggerStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'debuggerKeyword', isToken: true },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    }
];
function firstKind(definition) {
    var kindName = getNameWithoutSuffix(definition);
    return TypeScript.SyntaxKind[kindName];
}
definitions.sort(function (d1, d2) { return firstKind(d1) - firstKind(d2); });
function getStringWithoutSuffix(definition) {
    if (TypeScript.StringUtilities.endsWith(definition, "Syntax")) {
        return definition.substring(0, definition.length - "Syntax".length);
    }
    return definition;
}
function getNameWithoutSuffix(definition) {
    return getStringWithoutSuffix(definition.name);
}
function getType(child) {
    if (child.isToken) {
        return "ISyntaxToken";
    }
    else if (child.isSeparatedList) {
        return "ISeparatedSyntaxList<" + child.elementType + ">";
    }
    else if (child.isList) {
        return child.elementType + "[]";
    }
    else {
        return child.type;
    }
}
function camelCase(value) {
    return value.substr(0, 1).toLowerCase() + value.substr(1);
}
function getSafeName(child) {
    if (child.name === "arguments") {
        return "_" + child.name;
    }
    return child.name;
}
function generateConstructorFunction(definition) {
    var result = "    export var " + definition.name + ": " + getNameWithoutSuffix(definition) + "Constructor = <any>function(data: number";
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        result += ", ";
        result += getSafeName(child);
        result += ": " + getType(child);
    }
    result += ") {\r\n";
    result += "        if (data) { this.__data = data; }\r\n";
    if (definition.children.length) {
        result += "        ";
        for (var i = 0; i < definition.children.length; i++) {
            if (i) {
                result += ", ";
            }
            var child = definition.children[i];
            result += "this." + child.name + " = " + getSafeName(child);
        }
        result += ";\r\n";
    }
    if (definition.children.length > 0) {
        result += "        ";
        for (var i = 0; i < definition.children.length; i++) {
            if (i) {
                result += ", ";
            }
            var child = definition.children[i];
            if (child.isOptional) {
                result += getSafeName(child) + " && (" + getSafeName(child) + ".parent = this)";
            }
            else {
                result += getSafeName(child) + ".parent = this";
            }
        }
        result += ";\r\n";
    }
    result += "    };\r\n";
    result += "    " + definition.name + ".prototype.kind = SyntaxKind." + getNameWithoutSuffix(definition) + ";\r\n";
    result += "    " + definition.name + ".prototype.childCount = " + definition.children.length + ";\r\n";
    result += "    " + definition.name + ".prototype.childAt = function(index: number): ISyntaxElement {\r\n";
    if (definition.children.length) {
        result += "        switch (index) {\r\n";
        for (var j = 0; j < definition.children.length; j++) {
            result += "            case " + j + ": return this." + definition.children[j].name + ";\r\n";
        }
        result += "        }\r\n";
    }
    else {
        result += "        throw Errors.invalidOperation();\r\n";
    }
    result += "    }\r\n";
    return result;
}
function generateSyntaxInterfaces() {
    var result = "///<reference path='references.ts' />\r\n\r\n";
    result += "module TypeScript {\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (i > 0) {
            result += "\r\n";
        }
        result += generateSyntaxInterface(definition);
    }
    result += "}";
    return result;
}
function generateSyntaxInterface(definition) {
    var result = "    export interface " + definition.name + " extends ISyntaxNode";
    if (definition.interfaces) {
        result += ", ";
        result += definition.interfaces.join(", ");
    }
    result += " {\r\n";
    if (definition.name === "SourceUnitSyntax") {
        result += "        syntaxTree: SyntaxTree;\r\n";
    }
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        result += "        " + child.name + ": " + getType(child) + ";\r\n";
    }
    result += "    }\r\n";
    result += "    export interface " + getNameWithoutSuffix(definition) + "Constructor {";
    result += " new (data: number";
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        result += ", ";
        result += getSafeName(child);
        result += ": " + getType(child);
    }
    result += "): " + definition.name;
    result += " }\r\n";
    return result;
}
function generateNodes() {
    var result = "///<reference path='references.ts' />\r\n\r\n";
    result += "module TypeScript";
    result += " {\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (i) {
            result += "\r\n";
        }
        result += generateConstructorFunction(definition);
    }
    result += "}";
    return result;
}
function isInterface(name) {
    return name.substr(0, 1) === "I" && name.substr(1, 1).toUpperCase() === name.substr(1, 1);
}
function generateWalker() {
    var result = "";
    result += "///<reference path='references.ts' />\r\n" + "\r\n" + "module TypeScript {\r\n" + "    export class SyntaxWalker implements ISyntaxVisitor {\r\n" + "        public visitToken(token: ISyntaxToken): void {\r\n" + "        }\r\n" + "\r\n" + "        private visitOptionalToken(token: ISyntaxToken): void {\r\n" + "            if (token === undefined) {\r\n" + "                return;\r\n" + "            }\r\n" + "\r\n" + "            this.visitToken(token);\r\n" + "        }\r\n" + "\r\n" + "        public visitList(list: ISyntaxNodeOrToken[]): void {\r\n" + "            for (var i = 0, n = list.length; i < n; i++) {\r\n" + "                visitNodeOrToken(this, list[i]);\r\n" + "            }\r\n" + "        }\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        result += "\r\n";
        result += "        public visit" + getNameWithoutSuffix(definition) + "(node: " + definition.name + "): void {\r\n";
        for (var j = 0; j < definition.children.length; j++) {
            var child = definition.children[j];
            if (child.isToken) {
                if (child.isOptional) {
                    result += "            this.visitOptionalToken(node." + child.name + ");\r\n";
                }
                else {
                    result += "            this.visitToken(node." + child.name + ");\r\n";
                }
            }
            else if (child.isList || child.isSeparatedList) {
                result += "            this.visitList(node." + child.name + ");\r\n";
            }
            else if (child.isToken) {
                if (child.isOptional) {
                    result += "            this.visitOptionalToken(node." + child.name + ");\r\n";
                }
                else {
                    result += "            this.visitToken(node." + child.name + ");\r\n";
                }
            }
            else {
                result += "            visitNodeOrToken(this, node." + child.name + ");\r\n";
            }
        }
        result += "        }\r\n";
    }
    result += "    }";
    result += "\r\n}";
    return result;
}
function firstEnumName(e, value) {
    for (var name in e) {
        if (e[name] === value) {
            return name;
        }
    }
}
function groupBy(array, func) {
    var result = {};
    for (var i = 0, n = array.length; i < n; i++) {
        var v = array[i];
        var k = func(v);
        var list = result[k] || [];
        list.push(v);
        result[k] = list;
    }
    return result;
}
function generateKeywordCondition(keywords, currentCharacter, indent) {
    var length = keywords[0].text.length;
    var result = "";
    var index;
    if (keywords.length === 1) {
        var keyword = keywords[0];
        if (currentCharacter === length) {
            return " return SyntaxKind." + firstEnumName(TypeScript.SyntaxKind, keyword.kind) + ";\r\n";
        }
        var keywordText = keywords[0].text;
        result = " return (";
        for (var i = currentCharacter; i < length; i++) {
            if (i > currentCharacter) {
                result += " && ";
            }
            index = i === 0 ? "start" : ("start + " + i);
            result += "str.charCodeAt(" + index + ") === CharacterCodes." + keywordText.substr(i, 1);
        }
        result += ") ? SyntaxKind." + firstEnumName(TypeScript.SyntaxKind, keyword.kind) + " : SyntaxKind.IdentifierName;\r\n";
    }
    else {
        result += " // " + TypeScript.ArrayUtilities.select(keywords, function (k) { return k.text; }).join(", ") + "\r\n";
        index = currentCharacter === 0 ? "start" : ("start + " + currentCharacter);
        result += indent + "switch(str.charCodeAt(" + index + ")) {\r\n";
        var groupedKeywords = groupBy(keywords, function (k) { return k.text.substr(currentCharacter, 1); });
        for (var c in groupedKeywords) {
            if (groupedKeywords.hasOwnProperty(c)) {
                result += indent + "  case CharacterCodes." + c + ":";
                result += generateKeywordCondition(groupedKeywords[c], currentCharacter + 1, indent + "    ");
            }
        }
        result += indent + "  default: return SyntaxKind.IdentifierName;\r\n";
        result += indent + "}\r\n";
    }
    return result;
}
function min(array, func) {
    var min = func(array[0]);
    for (var i = 1; i < array.length; i++) {
        var next = func(array[i]);
        if (next < min) {
            min = next;
        }
    }
    return min;
}
function max(array, func) {
    var max = func(array[0]);
    for (var i = 1; i < array.length; i++) {
        var next = func(array[i]);
        if (next > max) {
            max = next;
        }
    }
    return max;
}
function generateUtilities() {
    var result = "";
    result += "        var fixedWidthArray = [";
    for (var i = 0; i <= TypeScript.SyntaxKind.LastFixedWidth; i++) {
        if (i) {
            result += ", ";
        }
        if (i < TypeScript.SyntaxKind.FirstFixedWidth) {
            result += "0";
        }
        else {
            result += TypeScript.SyntaxFacts.getText(i).length;
        }
    }
    result += "];\r\n";
    result += "        function fixedWidthTokenLength(kind: SyntaxKind) {\r\n";
    result += "            return fixedWidthArray[kind];\r\n";
    result += "        }\r\n";
    return result;
}
function generateScannerUtilities() {
    var result = "///<reference path='references.ts' />\r\n" + "\r\n" + "module TypeScript {\r\n" + "    export module ScannerUtilities {\r\n";
    var i;
    var keywords = [];
    for (i = TypeScript.SyntaxKind.FirstKeyword; i <= TypeScript.SyntaxKind.LastKeyword; i++) {
        keywords.push({ kind: i, text: TypeScript.SyntaxFacts.getText(i) });
    }
    keywords.sort(function (a, b) { return a.text.localeCompare(b.text); });
    result += "        export function identifierKind(str: string, start: number, length: number): SyntaxKind {\r\n";
    var minTokenLength = min(keywords, function (k) { return k.text.length; });
    var maxTokenLength = max(keywords, function (k) { return k.text.length; });
    result += "            switch (length) {\r\n";
    for (i = minTokenLength; i <= maxTokenLength; i++) {
        var keywordsOfLengthI = TypeScript.ArrayUtilities.where(keywords, function (k) { return k.text.length === i; });
        if (keywordsOfLengthI.length > 0) {
            result += "              case " + i + ":";
            result += generateKeywordCondition(keywordsOfLengthI, 0, "                ");
        }
    }
    result += "              default: return SyntaxKind.IdentifierName;\r\n";
    result += "            }\r\n";
    result += "        }\r\n";
    result += "    }\r\n";
    result += "}";
    return result;
}
function syntaxKindName(kind) {
    for (var name in TypeScript.SyntaxKind) {
        if (TypeScript.SyntaxKind[name] === kind) {
            return name;
        }
    }
    throw new Error();
}
function generateVisitor() {
    var result = "";
    result += "///<reference path='references.ts' />\r\n\r\n";
    result += "module TypeScript {\r\n";
    result += "    export function visitNodeOrToken(visitor: ISyntaxVisitor, element: ISyntaxNodeOrToken): any {\r\n";
    result += "        if (element === undefined) { return undefined; }\r\n";
    result += "        switch (element.kind) {\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ": ";
        result += "return visitor.visit" + getNameWithoutSuffix(definition) + "(<" + definition.name + ">element);\r\n";
    }
    result += "            default: return visitor.visitToken(<ISyntaxToken>element);\r\n";
    result += "        }\r\n";
    result += "    }\r\n\r\n";
    result += "    export interface ISyntaxVisitor {\r\n";
    result += "        visitToken(token: ISyntaxToken): any;\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        result += "        visit" + getNameWithoutSuffix(definition) + "(node: " + definition.name + "): any;\r\n";
    }
    result += "    }";
    result += "\r\n}";
    return result;
}
var syntaxNodesConcrete = generateNodes();
var syntaxInterfaces = generateSyntaxInterfaces();
var walker = generateWalker();
var scannerUtilities = generateScannerUtilities();
var visitor = generateVisitor();
var utilities = generateUtilities();
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxNodes.concrete.generated.ts", syntaxNodesConcrete, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxInterfaces.generated.ts", syntaxInterfaces, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxWalker.generated.ts", walker, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\scannerUtilities.generated.ts", scannerUtilities, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxVisitor.generated.ts", visitor, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\utilities.generated.ts", utilities, false);
//# sourceMappingURL=file:///C:/VSPro_1/src/typescript/public_cyrusn/src/services/syntax/SyntaxGenerator.js.map
