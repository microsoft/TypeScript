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
        SyntaxKind[SyntaxKind["ExternalModuleReference"] = 211] = "ExternalModuleReference";
        SyntaxKind[SyntaxKind["ModuleNameModuleReference"] = 212] = "ModuleNameModuleReference";
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
var argumentChecks = false;
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
            { name: 'requireKeyword', isToken: true, tokenKinds: ['RequireKeyword'], excludeFromAST: true },
            { name: 'openParenToken', isToken: true, excludeFromAST: true },
            { name: 'stringLiteral', isToken: true, tokenKinds: ['StringLiteral'] },
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
            { name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
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
            { name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
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
            { name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
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
            { name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
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
            { name: 'name', type: 'INameSyntax', isOptional: true },
            { name: 'stringLiteral', isToken: true, isOptional: true, tokenKinds: ['StringLiteral'] },
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
            { name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            { name: 'callSignature', type: 'CallSignatureSyntax' },
            { name: 'block', type: 'BlockSyntax', isOptional: true },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
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
            { name: 'propertyName', isToken: true },
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
            { name: 'block', type: 'BlockSyntax', isOptional: true },
            { name: 'expression', type: 'IExpressionSyntax', isOptional: true }
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
            { name: 'block', type: 'BlockSyntax', isOptional: true },
            { name: 'expression', type: 'IExpressionSyntax', isOptional: true }
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
            { name: 'right', isToken: true, tokenKinds: ['IdentifierName'] }
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
            { name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
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
            { name: 'name', isToken: true, tokenKinds: ['IdentifierName'] }
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
            { name: 'templateExpression', type: 'IPrimaryExpressionSyntax' },
        ]
    },
    {
        name: 'TemplateExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            { name: 'templateStartToken', isToken: true, excludeFromAST: true },
            { name: 'templateClauses', isList: true, elementType: 'TemplateClauseSyntax' },
        ]
    },
    {
        name: 'TemplateClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            { name: 'expression', type: 'IExpressionSyntax' },
            { name: 'templateMiddleOrEndToken', isToken: true, elementType: 'TemplateSpanSyntax' },
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
            { name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
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
            { name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
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
            { name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
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
            { name: 'block', type: 'BlockSyntax', isOptional: true },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'MemberFunctionDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberDeclarationSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            { name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
            { name: 'callSignature', type: 'CallSignatureSyntax' },
            { name: 'block', type: 'BlockSyntax', isOptional: true },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    {
        name: 'GetAccessorSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberDeclarationSyntax', 'IPropertyAssignmentSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken', isTypeScriptSpecific: true },
            { name: 'getKeyword', isToken: true, excludeFromAST: true },
            { name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
            { name: 'callSignature', type: 'CallSignatureSyntax' },
            { name: 'block', type: 'BlockSyntax' }
        ]
    },
    {
        name: 'SetAccessorSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberDeclarationSyntax', 'IPropertyAssignmentSyntax'],
        children: [
            { name: 'modifiers', isList: true, elementType: 'ISyntaxToken', isTypeScriptSpecific: true },
            { name: 'setKeyword', isToken: true, excludeFromAST: true },
            { name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
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
            { name: 'identifier', isToken: true, isOptional: true, tokenKinds: ['IdentifierName'] },
            { name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    {
        name: 'ContinueStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            { name: 'continueKeyword', isToken: true },
            { name: 'identifier', isToken: true, isOptional: true, tokenKinds: ['IdentifierName'] },
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
            { name: 'variableDeclaration', type: 'VariableDeclarationSyntax', isOptional: true },
            { name: 'initializer', type: 'IExpressionSyntax', isOptional: true },
            { name: 'firstSemicolonToken', isToken: true, tokenKinds: ['SemicolonToken'], excludeFromAST: true },
            { name: 'condition', type: 'IExpressionSyntax', isOptional: true },
            { name: 'secondSemicolonToken', isToken: true, tokenKinds: ['SemicolonToken'], excludeFromAST: true },
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
            { name: 'variableDeclaration', type: 'VariableDeclarationSyntax', isOptional: true },
            { name: 'left', type: 'IExpressionSyntax', isOptional: true },
            { name: 'inKeyword', isToken: true, excludeFromAST: true },
            { name: 'expression', type: 'IExpressionSyntax' },
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
            { name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
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
            { name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
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
        name: 'SimplePropertyAssignmentSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPropertyAssignmentSyntax'],
        children: [
            { name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
            { name: 'colonToken', isToken: true, excludeFromAST: true },
            { name: 'expression', type: 'IExpressionSyntax' }
        ]
    },
    {
        name: 'FunctionPropertyAssignmentSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPropertyAssignmentSyntax'],
        children: [
            { name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
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
            { name: 'identifier', isToken: true, isOptional: true, tokenKinds: ['IdentifierName'] },
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
            { name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
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
            { name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
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
    var kind = TypeScript.SyntaxKind[kindName];
    return kind;
}
var sortedDefinitions = definitions.sort(function (d1, d2) { return firstKind(d1) - firstKind(d2); });
function getStringWithoutSuffix(definition) {
    if (TypeScript.StringUtilities.endsWith(definition, "Syntax")) {
        return definition.substring(0, definition.length - "Syntax".length);
    }
    return definition;
}
function getStringWithoutPrefix(definition) {
    if (definition.charAt(0) == "I" && definition.charAt(1).toUpperCase() == definition.charAt(1)) {
        return definition.substring(1);
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
var hasKind = false;
function pascalCase(value) {
    return value.substr(0, 1).toUpperCase() + value.substr(1);
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
function getPropertyAccess(child, instance) {
    if (instance === void 0) { instance = "this"; }
    if (child.type === "SyntaxKind") {
        return instance + "._kind";
    }
    return instance + "." + child.name;
}
function generateProperties(definition) {
    var result = "";
    if (definition.name === "SourceUnitSyntax") {
        result += "        public syntaxTree: SyntaxTree = undefined;\r\n";
    }
    var newLine = false;
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        if (getType(child) === "SyntaxKind") {
            result += "        private _" + child.name + ": " + getType(child) + ";\r\n";
            newLine = true;
        }
        else if (child.name === "arguments") {
            result += "    public " + child.name + ": " + getType(child) + ";\r\n";
        }
        hasKind = hasKind || (getType(child) === "SyntaxKind");
    }
    if (newLine) {
        result += "\r\n";
    }
    return result;
}
function generateNullChecks(definition) {
    var result = "";
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        if (!child.isOptional && !child.isToken) {
            result += "        if (!" + child.name + ") { throw Errors.argumentNull('" + child.name + "'); }\r\n";
        }
    }
    return result;
}
function generateIfKindCheck(child, tokenKinds, indent) {
    var result = "";
    result += indent + "        if (";
    for (var j = 0; j < tokenKinds.length; j++) {
        if (j > 0) {
            result += " && ";
        }
        var tokenKind = tokenKinds[j];
        if (tokenKind === "IdentifierName") {
            result += "!SyntaxFacts.isIdentifierName(" + child.name + ".tokenKind)";
        }
        else {
            result += child.name + ".tokenKind !== SyntaxKind." + tokenKind;
        }
    }
    result += ") { throw Errors.argument('" + child.name + "'); }\r\n";
    return result;
}
function generateSwitchCase(tokenKind, indent) {
    return indent + "            case SyntaxKind." + tokenKind + ":\r\n";
}
function generateBreakStatement(indent) {
    return indent + "                break;\r\n";
}
function generateSwitchCases(tokenKinds, indent) {
    var result = "";
    for (var j = 0; j < tokenKinds.length; j++) {
        var tokenKind = tokenKinds[j];
        result += generateSwitchCase(tokenKind, indent);
    }
    if (tokenKinds.length > 0) {
        result += generateBreakStatement(indent);
    }
    return result;
}
function generateDefaultCase(child, indent) {
    var result = "";
    result += indent + "            default:\r\n";
    result += indent + "                throw Errors.argument('" + child.name + "');\r\n";
    return result;
}
function generateSwitchKindCheck(child, tokenKinds, indent) {
    if (tokenKinds.length === 0) {
        return "";
    }
    var result = "";
    var identifierName = TypeScript.ArrayUtilities.where(tokenKinds, function (v) { return v.indexOf("IdentifierName") >= 0; });
    var notIdentifierName = TypeScript.ArrayUtilities.where(tokenKinds, function (v) { return v.indexOf("IdentifierName") < 0; });
    if (identifierName.length > 0) {
        result += indent + "        if (!SyntaxFacts.isIdentifierName(" + child.name + ".tokenKind)) {\r\n";
        if (notIdentifierName.length === 0) {
            result += indent + "            throw Errors.argument('" + child.name + "');\r\n";
            result += indent + "        }\r\n";
            return result;
        }
        indent += "    ";
    }
    if (notIdentifierName.length <= 2) {
        result += generateIfKindCheck(child, notIdentifierName, indent);
    }
    else if (notIdentifierName.length > 2) {
        result += indent + "        switch (" + child.name + ".tokenKind) {\r\n";
        result += generateSwitchCases(notIdentifierName, indent);
        result += generateDefaultCase(child, indent);
        result += indent + "        }\r\n";
    }
    if (identifierName.length > 0) {
        result += indent + "    }\r\n";
    }
    return result;
}
function tokenKinds(child) {
    return child.tokenKinds ? child.tokenKinds : [pascalCase(child.name)];
}
function generateKindCheck(child) {
    var indent = "";
    var result = "";
    if (child.isOptional) {
        indent = "    ";
        result += "        if (" + child.name + ") {\r\n";
    }
    var kinds = tokenKinds(child);
    if (kinds.length <= 2) {
        result += generateIfKindCheck(child, kinds, indent);
    }
    else {
        result += generateSwitchKindCheck(child, kinds, indent);
    }
    if (child.isOptional) {
        result += "        }\r\n";
    }
    return result;
}
function generateKindChecks(definition) {
    var result = "";
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        if (child.isToken) {
            result += generateKindCheck(child);
        }
    }
    return result;
}
function generateArgumentChecks(definition) {
    var result = "";
    if (argumentChecks) {
        result += generateNullChecks(definition);
        result += generateKindChecks(definition);
        if (definition.children.length > 0) {
            result += "\r\n";
        }
    }
    return result;
}
function generateConstructor(definition) {
    var i;
    var child;
    var base = baseType(definition);
    var result = "";
    result += "        constructor(";
    var children = definition.children;
    var kindChild = undefined;
    for (i = 0; i < children.length; i++) {
        child = children[i];
        if (getType(child) === "SyntaxKind") {
            kindChild = child;
        }
        if (getType(child) !== "SyntaxKind" && child.name !== "arguments") {
            result += "public ";
        }
        result += getSafeName(child) + ": " + getType(child);
        result += ",\r\n                    ";
    }
    result += "data: number) {\r\n";
    if (kindChild) {
        result += "            super(kind, data); \r\n";
    }
    else {
        result += "            super(SyntaxKind." + getNameWithoutSuffix(definition) + ", data); \r\n";
    }
    if (definition.children.length > 0) {
        result += "\r\n";
    }
    result += generateArgumentChecks(definition);
    for (i = 0; i < definition.children.length; i++) {
        child = definition.children[i];
        if (child.type === "SyntaxKind" || child.name === "arguments") {
            result += "            " + getPropertyAccess(child) + " = " + getSafeName(child) + ";\r\n";
        }
    }
    for (i = 0; i < definition.children.length; i++) {
        child = definition.children[i];
        if (child.type !== "SyntaxKind") {
            if (child.isOptional) {
                result += "            " + getSafeName(child) + " && (" + getSafeName(child) + ".parent = this);\r\n";
            }
            else {
                result += "            " + getSafeName(child) + ".parent = this;\r\n";
            }
        }
    }
    result += "        }\r\n";
    return result;
}
function isOptional(child) {
    if (child.isOptional) {
        return true;
    }
    if (child.isList && !child.requiresAtLeastOneItem) {
        return true;
    }
    if (child.isSeparatedList && !child.requiresAtLeastOneItem) {
        return true;
    }
    return false;
}
function generateFactory1Method(definition) {
    return "";
    var mandatoryChildren = TypeScript.ArrayUtilities.where(definition.children, function (c) { return !isOptional(c); });
    if (mandatoryChildren.length === definition.children.length) {
        return "";
    }
    var result = "\r\n        public static create(";
    var i;
    var child;
    for (i = 0; i < mandatoryChildren.length; i++) {
        child = mandatoryChildren[i];
        result += child.name + ": " + getType(child);
        if (i < mandatoryChildren.length - 1) {
            result += ",\r\n                             ";
        }
    }
    result += "): " + definition.name + " {\r\n";
    result += "            return new " + definition.name + "(";
    for (i = 0; i < definition.children.length; i++) {
        child = definition.children[i];
        if (!isOptional(child)) {
            result += child.name;
        }
        else if (child.isList) {
            result += "Syntax.emptyList<" + child.elementType + ">()";
        }
        else if (child.isSeparatedList) {
            result += "Syntax.emptySeparatedList<" + child.elementType + ">()";
        }
        else {
            result += "undefined";
        }
        result += ", ";
    }
    result += "/*data:*/ 0);\r\n";
    result += "        }\r\n";
    return result;
}
function isKeywordOrPunctuation(kind) {
    if (TypeScript.StringUtilities.endsWith(kind, "Keyword")) {
        return true;
    }
    if (TypeScript.StringUtilities.endsWith(kind, "Token") && kind !== "IdentifierName" && kind !== "EndOfFileToken") {
        return true;
    }
    return false;
}
function isDefaultConstructable(definition) {
    if (!definition) {
        return false;
    }
    for (var i = 0; i < definition.children.length; i++) {
        if (isMandatory(definition.children[i])) {
            return false;
        }
    }
    return true;
}
function isMandatory(child) {
    if (isOptional(child)) {
        return false;
    }
    if (child.type === "SyntaxKind" || child.isList || child.isSeparatedList) {
        return true;
    }
    if (child.isToken) {
        var kinds = tokenKinds(child);
        var isFixed = kinds.length === 1 && isKeywordOrPunctuation(kinds[0]);
        return !isFixed;
    }
    return !isDefaultConstructable(memberDefinitionType(child));
}
function generateFactory2Method(definition) {
    return "";
    var mandatoryChildren = TypeScript.ArrayUtilities.where(definition.children, isMandatory);
    if (mandatoryChildren.length === definition.children.length) {
        return "";
    }
    var i;
    var child;
    var result = "\r\n        public static create1(";
    for (i = 0; i < mandatoryChildren.length; i++) {
        child = mandatoryChildren[i];
        result += child.name + ": " + getType(child);
        if (i < mandatoryChildren.length - 1) {
            result += ",\r\n                              ";
        }
    }
    result += "): " + definition.name + " {\r\n";
    result += "            return new " + definition.name + "(";
    for (i = 0; i < definition.children.length; i++) {
        child = definition.children[i];
        if (isMandatory(child)) {
            result += child.name;
        }
        else if (child.isList) {
            result += "Syntax.emptyList<" + child.elementType + ">()";
        }
        else if (child.isSeparatedList) {
            result += "Syntax.emptySeparatedList<" + child.elementType + ">()";
        }
        else if (isOptional(child)) {
            result += "undefined";
        }
        else if (child.isToken) {
            result += "Syntax.token(SyntaxKind." + tokenKinds(child)[0] + ")";
        }
        else {
            result += child.type + ".create1()";
        }
        result += ", ";
    }
    result += "/*data:*/ 0);\r\n";
    result += "        }\r\n";
    return result;
}
function generateFactoryMethod(definition) {
    return generateFactory1Method(definition) + generateFactory2Method(definition);
}
function generateBrands(definition, accessibility) {
    var properties = "";
    var types = [];
    if (definition.interfaces) {
        var ifaces = definition.interfaces.slice(0);
        var i;
        for (i = 0; i < ifaces.length; i++) {
            var current = ifaces[i];
            while (current !== undefined) {
                if (!TypeScript.ArrayUtilities.contains(ifaces, current)) {
                    ifaces.push(current);
                }
                current = interfaces[current];
            }
        }
        for (i = 0; i < ifaces.length; i++) {
            var type = ifaces[i];
            type = getStringWithoutSuffix(type);
            if (isInterface(type)) {
                type = "_" + type.substr(1, 1).toLowerCase() + type.substr(2) + "Brand";
            }
            types.push(type);
        }
    }
    if (types.length > 0) {
        properties += "       ";
        for (var i = 0; i < types.length; i++) {
            if (accessibility) {
                properties += " public ";
            }
            properties += types[i] + ": any;";
        }
        properties += "\r\n";
    }
    return properties;
}
function generateAcceptMethod(definition) {
    var result = "";
    if (!hasKind) {
        result += "\r\n";
        result += "        public accept(visitor: ISyntaxVisitor): SyntaxKind {\r\n";
        result += "            return visitor.visit" + getNameWithoutSuffix(definition) + "(this);\r\n";
        result += "        }\r\n";
    }
    return result;
}
function generateKindMethod(definition) {
    var result = "";
    if (!hasKind) {
        result += "\r\n";
        result += "        public kind(): SyntaxKind {\r\n";
        result += "            return SyntaxKind." + getNameWithoutSuffix(definition) + ";\r\n";
        result += "        }\r\n";
    }
    return result;
}
function generateSlotMethods(definition) {
    var result = "";
    result += "\r\n";
    result += "        public childCount(): number {\r\n";
    var slotCount = hasKind ? (definition.children.length - 1) : definition.children.length;
    result += "            return " + slotCount + ";\r\n";
    result += "        }\r\n\r\n";
    result += "        public childAt(slot: number): ISyntaxElement {\r\n";
    if (slotCount === 0) {
        result += "            throw Errors.invalidOperation();\r\n";
    }
    else {
        result += "            switch (slot) {\r\n";
        var index = 0;
        for (var i = 0; i < definition.children.length; i++) {
            var child = definition.children[i];
            if (child.type === "SyntaxKind") {
                continue;
            }
            result += "                case " + index + ": return this." + child.name + ";\r\n";
            index++;
        }
        result += "                default: throw Errors.invalidOperation();\r\n";
        result += "            }\r\n";
    }
    result += "        }\r\n";
    return result;
}
function generateFirstTokenMethod(definition) {
    var result = "";
    result += "\r\n";
    result += "    public firstToken(): ISyntaxToken {\r\n";
    result += "        var token: ISyntaxToken = undefined;\r\n";
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        if (getType(child) === "SyntaxKind") {
            continue;
        }
        if (child.name === "endOfFileToken") {
            continue;
        }
        result += "        if (";
        if (child.isOptional) {
            result += getPropertyAccess(child) + " && ";
        }
        if (child.isToken) {
            result += getPropertyAccess(child) + ".width() > 0";
            result += ") { return " + getPropertyAccess(child) + "; }\r\n";
        }
        else {
            result += "(token = " + getPropertyAccess(child) + ".firstToken())";
            result += ") { return token; }\r\n";
        }
    }
    if (definition.name === "SourceUnitSyntax") {
        result += "        return this._endOfFileToken;\r\n";
    }
    else {
        result += "        return undefined;\r\n";
    }
    result += "    }\r\n";
    result += "    }\r\n";
    return result;
}
function generateLastTokenMethod(definition) {
    var result = "";
    result += "\r\n";
    result += "    public lastToken(): ISyntaxToken {\r\n";
    if (definition.name === "SourceUnitSyntax") {
        result += "        return this._endOfFileToken;\r\n";
    }
    else {
        result += "        var token: ISyntaxToken = undefined;\r\n";
        for (var i = definition.children.length - 1; i >= 0; i--) {
            var child = definition.children[i];
            if (getType(child) === "SyntaxKind") {
                continue;
            }
            if (child.name === "endOfFileToken") {
                continue;
            }
            result += "        if (";
            if (child.isOptional) {
                result += getPropertyAccess(child) + " && ";
            }
            if (child.isToken) {
                result += getPropertyAccess(child) + ".width() > 0";
                result += ") { return " + getPropertyAccess(child) + "; }\r\n";
            }
            else {
                result += "(token = " + getPropertyAccess(child) + ".lastToken())";
                result += ") { return token; }\r\n";
            }
        }
        result += "        return undefined;\r\n";
    }
    result += "    }\r\n";
    return result;
}
function baseType(definition) {
    return TypeScript.ArrayUtilities.firstOrDefault(definitions, function (d) { return d.name === definition.baseType; });
}
function memberDefinitionType(child) {
    return TypeScript.ArrayUtilities.firstOrDefault(definitions, function (d) { return d.name === child.type; });
}
function derivesFrom(def1, def2) {
    var current = def1;
    while (current) {
        var base = baseType(current);
        if (base === def2) {
            return true;
        }
        current = base;
    }
    return false;
}
function contains(definition, child) {
    return TypeScript.ArrayUtilities.any(definition.children, function (c) { return c.name === child.name && c.isList === child.isList && c.isSeparatedList === child.isSeparatedList && c.isToken === child.isToken && c.type === child.type; });
}
function generateAccessors(definition) {
    var result = "";
    return result;
}
function generateWithMethod(definition, child) {
    return "";
    var result = "";
    result += "\r\n";
    result += "        public with" + pascalCase(child.name) + "(" + getSafeName(child) + ": " + getType(child) + "): " + definition.name + " {\r\n";
    result += "            return this.update(";
    for (var i = 0; i < definition.children.length; i++) {
        if (i > 0) {
            result += ", ";
        }
        if (definition.children[i] === child) {
            result += getSafeName(child);
        }
        else {
            result += getPropertyAccess(definition.children[i]);
        }
    }
    result += ");\r\n";
    result += "        }\r\n";
    if (child.isList || child.isSeparatedList) {
        if (TypeScript.StringUtilities.endsWith(child.name, "s")) {
            var pascalName = pascalCase(child.name);
            pascalName = pascalName.substring(0, pascalName.length - 1);
            var argName = getSafeName(child);
            argName = argName.substring(0, argName.length - 1);
            result += "\r\n";
            result += "        public with" + pascalName + "(" + argName + ": " + child.elementType + "): " + definition.name + " {\r\n";
            result += "            return this.with" + pascalCase(child.name) + "(";
            if (child.isList) {
                result += "Syntax.list<" + child.elementType + ">([" + argName + "])";
            }
            else {
                result += "Syntax.separatedList<" + child.elementType + ">([" + argName + "])";
            }
            result += ");\r\n";
            result += "        }\r\n";
        }
    }
    return result;
}
function generateWithMethods(definition) {
    var result = "";
    return "";
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        result += generateWithMethod(definition, child);
    }
    return result;
}
function generateTriviaMethods(definition) {
    return "";
    var result = "\r\n";
    result += "        public withLeadingTrivia(trivia: ISyntaxTriviaList): " + definition.name + " {\r\n";
    result += "            return <" + definition.name + ">super.withLeadingTrivia(trivia);\r\n";
    result += "        }\r\n\r\n";
    result += "        public withTrailingTrivia(trivia: ISyntaxTriviaList): " + definition.name + " {\r\n";
    result += "            return <" + definition.name + ">super.withTrailingTrivia(trivia);\r\n";
    result += "        }\r\n";
    return result;
}
function generateUpdateMethod(definition) {
    var result = "";
    result += "\r\n";
    result += "        public update(";
    var i;
    var child;
    for (i = 0; i < definition.children.length; i++) {
        child = definition.children[i];
        result += getSafeName(child) + ": " + getType(child);
        if (i < definition.children.length - 1) {
            result += ",\r\n                      ";
        }
    }
    result += "): " + definition.name + " {\r\n";
    if (definition.children.length === 0) {
        result += "            return this;\r\n";
    }
    else {
        result += "            if (";
        for (i = 0; i < definition.children.length; i++) {
            child = definition.children[i];
            if (i !== 0) {
                result += " && ";
            }
            result += getPropertyAccess(child) + " === " + getSafeName(child);
        }
        result += ") {\r\n";
        result += "                return this;\r\n";
        result += "            }\r\n\r\n";
        result += "            return new " + definition.name + "(";
        for (i = 0; i < definition.children.length; i++) {
            child = definition.children[i];
            result += getSafeName(child);
            result += ", ";
        }
        result += "this.parsedInStrictMode() ? SyntaxConstants.NodeParsedInStrictModeMask : 0);\r\n";
    }
    result += "        }\r\n";
    return result;
}
function generateNode(definition, abstract) {
    var result = "    export class " + definition.name + " implements ISyntaxNode";
    if (definition.interfaces) {
        result += ", ";
        result += definition.interfaces.join(", ");
    }
    result += " {\r\n";
    result += "        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;\r\n";
    if (definition.name === "SourceUnitSyntax") {
        result += "        public syntaxTree: SyntaxTree = undefined;\r\n";
    }
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        result += "        public " + child.name + ": " + getType(child) + ";\r\n";
    }
    result += generateBrands(definition, true);
    result += "        constructor(data: number";
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        result += ", " + getSafeName(child) + ": " + getType(child);
    }
    result += ") {\r\n";
    result += "            if (data) { this.__data = data; }\r\n";
    if (definition.name === "SourceUnitSyntax") {
        result += "            this.parent = undefined,\r\n";
    }
    if (definition.children) {
        for (var i = 0; i < definition.children.length; i++) {
            var child = definition.children[i];
            if (child.excludeFromAST && abstract) {
                continue;
            }
            result += "            this." + child.name + " = " + getSafeName(child) + ",\r\n";
        }
    }
    if (definition.children.length > 0) {
        var first = true;
        for (var i = 0; i < definition.children.length; i++) {
            var child = definition.children[i];
            if (child.excludeFromAST && abstract) {
                continue;
            }
            if (!first) {
                result += ",\r\n";
            }
            first = false;
            if (child.isOptional) {
                result += "            " + getSafeName(child) + " && (" + getSafeName(child) + ".parent = this)";
            }
            else {
                result += "            " + getSafeName(child) + ".parent = this";
            }
        }
        result += ";\r\n";
    }
    result += "        }\r\n";
    result += generateKindMethod(definition);
    result += generateSlotMethods(definition);
    result += generateAcceptMethod(definition);
    result += "    }";
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
function getDefinitionForKind(kind) {
    var kindName = syntaxKindName(kind);
    return TypeScript.ArrayUtilities.firstOrDefault(definitions, function (d) {
        if (getNameWithoutSuffix(d) === kindName) {
            return true;
        }
        return false;
    });
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
    result += "\r\n";
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
    result += "    }";
    return result;
}
function generateNodes(abstract) {
    var result = "///<reference path='references.ts' />\r\n\r\n";
    result += "module TypeScript";
    result += " {\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (i > 0) {
            result += "\r\n";
        }
        result += generateNode(definition, abstract);
    }
    result += "\r\n}";
    return result;
}
function isInterface(name) {
    return name.substr(0, 1) === "I" && name.substr(1, 1).toUpperCase() === name.substr(1, 1);
}
function isNodeOrToken(child) {
    return child.type && isInterface(child.type);
}
function generateRewriter() {
    var result = "///<reference path='references.ts' />\r\n\r\n";
    result += "module TypeScript {\r\n" + "    export class SyntaxRewriter implements ISyntaxVisitor {\r\n" + "        public visitToken(token: ISyntaxToken): ISyntaxToken {\r\n" + "            return token;\r\n" + "        }\r\n" + "\r\n" + "        public visitNode(node: ISyntaxNode): ISyntaxNode {\r\n" + "            return visitNodeOrToken(this, node);\r\n" + "        }\r\n" + "\r\n" + "        public visitNodeOrToken(node: ISyntaxNodeOrToken): ISyntaxNodeOrToken {\r\n" + "            return isToken(node) ? <ISyntaxNodeOrToken>this.visitToken(<ISyntaxToken>node) : this.visitNode(<ISyntaxNode>node);\r\n" + "        }\r\n" + "\r\n" + "        public visitList<T extends ISyntaxNodeOrToken[]>(list: T): T {\r\n" + "            var newItems: T = undefined;\r\n" + "\r\n" + "            for (var i = 0, n = list.length; i < n; i++) {\r\n" + "                var item = list[i];\r\n" + "                var newItem = this.visitNodeOrToken(item);\r\n" + "\r\n" + "                if (item !== newItem && !newItems) {\r\n" + "                    newItems = [];\r\n" + "                    for (var j = 0; j < i; j++) {\r\n" + "                        newItems.push(list[j]);\r\n" + "                    }\r\n" + "                }\r\n" + "\r\n" + "                if (newItems) {\r\n" + "                    newItems.push(newItem);\r\n" + "                }\r\n" + "            }\r\n" + "\r\n" + "            // Debug.assert(!newItems || newItems.length === childCount(list));\r\n" + "            return !newItems ? list : <T>Syntax.list(newItems);\r\n" + "        }\r\n" + "\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        result += "\r\n";
        result += "        public visit" + getNameWithoutSuffix(definition) + "(node: " + definition.name + "): any {\r\n";
        if (definition.children.length === 0) {
            result += "            return node;\r\n";
            result += "        }\r\n";
            continue;
        }
        result += "            return node.update(\r\n";
        for (var j = 0; j < definition.children.length; j++) {
            var child = definition.children[j];
            result += "                ";
            if (child.isOptional) {
                result += "!node." + child.name + " ? undefined : ";
            }
            if (child.isToken) {
                result += "this.visitToken(node." + child.name + ")";
            }
            else if (child.isList || child.isSeparatedList) {
                result += "this.visitList(node." + child.name + ")";
            }
            else if (child.type === "SyntaxKind") {
                result += "node.kind";
            }
            else if (isNodeOrToken(child)) {
                result += "<" + child.type + ">this.visitNodeOrToken(node." + child.name + ")";
            }
            else {
                result += "<" + child.type + ">this.visitNode(node." + child.name + ")";
            }
            if (j < definition.children.length - 1) {
                result += ",\r\n";
            }
        }
        result += ");\r\n";
        result += "        }\r\n";
    }
    result += "    }";
    result += "\r\n}";
    return result;
}
function generateWalker() {
    var result = "";
    result += "///<reference path='references.ts' />\r\n" + "\r\n" + "module TypeScript {\r\n" + "    export class SyntaxWalker implements ISyntaxVisitor {\r\n" + "        public visitToken(token: ISyntaxToken): void {\r\n" + "        }\r\n" + "\r\n" + "        private visitOptionalToken(token: ISyntaxToken): void {\r\n" + "            if (token === undefined) {\r\n" + "                return;\r\n" + "            }\r\n" + "\r\n" + "            this.visitToken(token);\r\n" + "        }\r\n" + "\r\n" + "        private visitOptionalNode(node: ISyntaxNode): void {\r\n" + "            if (node === undefined) {\r\n" + "                return;\r\n" + "            }\r\n" + "\r\n" + "            node.accept(this);\r\n" + "        }\r\n" + "\r\n" + "        public visitList(list: ISyntaxNodeOrToken[]): void {\r\n" + "            for (var i = 0, n = list.length; i < n; i++) {\r\n" + "                list[i].accept(this);\r\n" + "            }\r\n" + "        }\r\n" + "\r\n";
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
            else if (isNodeOrToken(child)) {
                if (child.isOptional) {
                    result += "            visitNodeOrToken(this, node." + child.name + ");\r\n";
                }
                else {
                    result += "            node." + child.name + ".accept(this);\r\n";
                }
            }
            else if (child.type === "ISyntaxToken") {
                if (child.isOptional) {
                    result += "            this.visitOptionalToken(node." + child.name + ");\r\n";
                }
                else {
                    result += "            this.visitToken(node." + child.name + ");\r\n";
                }
            }
            else if (child.type !== "SyntaxKind") {
                if (child.isOptional) {
                    result += "            this.visitOptionalNode(node." + child.name + ");\r\n";
                }
                else {
                    result += "            node." + child.name + ".accept(this);\r\n";
                }
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
function generateScannerUtilities() {
    var result = "///<reference path='references.ts' />\r\n" + "\r\n" + "module TypeScript {\r\n" + "    export module ScannerUtilities {\r\n";
    result += "        export function fixedWidthTokenLength(kind: SyntaxKind) {\r\n";
    result += "            switch (kind) {\r\n";
    for (var k = TypeScript.SyntaxKind.FirstFixedWidth; k <= TypeScript.SyntaxKind.LastFixedWidth; k++) {
        result += "                case SyntaxKind." + syntaxKindName(k) + ": return " + TypeScript.SyntaxFacts.getText(k).length + ";\r\n";
    }
    result += "                default: throw new Error();\r\n";
    result += "            }\r\n";
    result += "        }\r\n\r\n";
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
function generateVisitor() {
    var result = "";
    result += "///<reference path='references.ts' />\r\n\r\n";
    result += "module TypeScript {\r\n";
    result += "    export function visitNodeOrToken(visitor: ISyntaxVisitor, element: ISyntaxNodeOrToken): any {\r\n";
    result += "        if (element === undefined) { return undefined; }\r\n";
    result += "        return element.accept(visitor);\r\n";
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
function generateDefaultVisitor() {
    var result = "";
    result += "///<reference path='references.ts' />\r\n\r\n";
    result += "module TypeScript {\r\n";
    if (!forPrettyPrinter) {
        result += "    export class SyntaxVisitor implements ISyntaxVisitor {\r\n";
        result += "        public defaultVisit(node: ISyntaxNodeOrToken): any {\r\n";
        result += "            return undefined;\r\n";
        result += "        }\r\n";
        result += "\r\n";
        result += "        public visitToken(token: ISyntaxToken): any {\r\n";
        result += "            return this.defaultVisit(token);\r\n";
        result += "        }\r\n";
        for (var i = 0; i < definitions.length; i++) {
            var definition = definitions[i];
            result += "\r\n        public visit" + getNameWithoutSuffix(definition) + "(node: " + definition.name + "): any {\r\n";
            result += "            return this.defaultVisit(node);\r\n";
            result += "        }\r\n";
        }
        result += "    }";
    }
    result += "\r\n}";
    return result;
}
function generateFactory() {
    var result = "///<reference path='references.ts' />\r\n";
    result += "\r\nmodule TypeScript.Syntax {\r\n";
    result += "    export interface IFactory {\r\n";
    var i;
    var j;
    var definition;
    var child;
    for (i = 0; i < definitions.length; i++) {
        definition = definitions[i];
        result += "        " + camelCase(getNameWithoutSuffix(definition)) + "(";
        for (j = 0; j < definition.children.length; j++) {
            if (j > 0) {
                result += ", ";
            }
            child = definition.children[j];
            result += child.name + ": " + getType(child);
        }
        result += "): " + definition.name + ";\r\n";
    }
    result += "    }\r\n\r\n";
    result += "    export class NormalModeFactory implements IFactory {\r\n";
    for (i = 0; i < definitions.length; i++) {
        definition = definitions[i];
        result += "        " + camelCase(getNameWithoutSuffix(definition)) + "(";
        for (j = 0; j < definition.children.length; j++) {
            if (j > 0) {
                result += ", ";
            }
            child = definition.children[j];
            result += getSafeName(child) + ": " + getType(child);
        }
        result += "): " + definition.name + " {\r\n";
        result += "            return new " + definition.name + "(";
        for (j = 0; j < definition.children.length; j++) {
            child = definition.children[j];
            result += getSafeName(child);
            result += ", ";
        }
        result += "/*data:*/ 0);\r\n";
        result += "        }\r\n";
    }
    result += "    }\r\n\r\n";
    result += "    export class StrictModeFactory implements IFactory {\r\n";
    for (i = 0; i < definitions.length; i++) {
        definition = definitions[i];
        result += "        " + camelCase(getNameWithoutSuffix(definition)) + "(";
        for (j = 0; j < definition.children.length; j++) {
            if (j > 0) {
                result += ", ";
            }
            child = definition.children[j];
            result += getSafeName(child) + ": " + getType(child);
        }
        result += "): " + definition.name + " {\r\n";
        result += "            return new " + definition.name + "(";
        for (j = 0; j < definition.children.length; j++) {
            child = definition.children[j];
            result += getSafeName(child);
            result += ", ";
        }
        result += "/*data:*/ SyntaxConstants.NodeParsedInStrictModeMask);\r\n";
        result += "        }\r\n";
    }
    result += "    }\r\n\r\n";
    result += "    export var normalModeFactory: IFactory = new NormalModeFactory();\r\n";
    result += "    export var strictModeFactory: IFactory = new StrictModeFactory();\r\n";
    result += "}";
    return result;
}
function generateServicesUtilities() {
    var result = "";
    result += generateIsTypeScriptSpecific();
    return result;
}
function generateIsTypeScriptSpecific() {
    var result = "";
    result += "module TypeScript {\r\n";
    result += "    function isListTypeScriptSpecific(list: ISyntaxNodeOrToken[]): boolean {\r\n";
    result += "        for (var i = 0, n = list.length; i < n; i++) {\r\n";
    result += "            if (isTypeScriptSpecific(list[i])) {\r\n";
    result += "                return true;\r\n";
    result += "            }\r\n";
    result += "        }\r\n\r\n";
    result += "        return false;\r\n";
    result += "    }\r\n\r\n";
    result += "    export function isTypeScriptSpecific(element: ISyntaxElement): boolean {\r\n";
    result += "        if (!element) { return false; }\r\n";
    result += "        if (isToken(element)) { return false; }\r\n";
    result += "        if (isList(element)) { return isListTypeScriptSpecific(<ISyntaxNodeOrToken[]>element); }\r\n";
    result += "        switch (element.kind()) {\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (!definition.isTypeScriptSpecific) {
            continue;
        }
        result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ":\r\n";
    }
    result += "                return true;\r\n";
    var triviallyFalseDefinitions = definitions.filter(function (d) { return d.children.filter(function (c) { return c.type !== "SyntaxKind" && !c.isToken; }).length === 0; });
    for (var i = 0; i < triviallyFalseDefinitions.length; i++) {
        var definition = triviallyFalseDefinitions[i];
        if (definition.isTypeScriptSpecific) {
            continue;
        }
        result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ":\r\n";
    }
    result += "                return false;\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (definition.isTypeScriptSpecific) {
            continue;
        }
        if (definition.children.filter(function (c) { return c.type !== "SyntaxKind" && !c.isToken; }).length === 0) {
            continue;
        }
        result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ":";
        result += "\r\n";
        result += "                return is" + getNameWithoutSuffix(definition) + "TypeScriptSpecific(<" + definition.name + ">element);\r\n";
    }
    result += "        }\r\n";
    result += "    }\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (definition.isTypeScriptSpecific) {
            continue;
        }
        var importantChildren = definition.children.filter(function (d) { return d.type !== "SyntaxKind" && !d.isToken; });
        if (importantChildren.length > 0) {
            result += generateIsTypeScriptSpecificMethod(definition);
        }
    }
    result += "}";
    return result;
}
function generateIsTypeScriptSpecificMethod(definition) {
    var result = "\r\n    function is" + getNameWithoutSuffix(definition) + "TypeScriptSpecific(node: " + definition.name + "): boolean {\r\n";
    result += "        return ";
    var addedCheck = false;
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        if (child.type === "SyntaxKind") {
            continue;
        }
        if (child.isToken) {
            continue;
        }
        if (addedCheck) {
            result += " ||\r\n               ";
        }
        addedCheck = true;
        if (child.isTypeScriptSpecific) {
            if (child.isList || child.isSeparatedList) {
                result += getPropertyAccess(child, "node") + ".length > 0";
            }
            else {
                result += "!!" + getPropertyAccess(child, "node");
            }
        }
        else {
            result += "isTypeScriptSpecific(" + getPropertyAccess(child, "node") + ")";
        }
    }
    if (!addedCheck) {
        result += "false";
    }
    result += ";\r\n";
    result += "    }\r\n";
    return result;
}
var syntaxNodesConcrete = generateNodes(false);
var syntaxInterfaces = generateSyntaxInterfaces();
var rewriter = generateRewriter();
var walker = generateWalker();
var scannerUtilities = generateScannerUtilities();
var visitor = generateVisitor();
var defaultVisitor = generateDefaultVisitor();
var servicesUtilities = generateServicesUtilities();
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxNodes.concrete.generated.ts", syntaxNodesConcrete, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxRewriter.generated.ts", rewriter, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxWalker.generated.ts", walker, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\scannerUtilities.generated.ts", scannerUtilities, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxVisitor.generated.ts", visitor, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\defaultSyntaxVisitor.generated.ts", defaultVisitor, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxUtilities.generated.ts", servicesUtilities, false);
