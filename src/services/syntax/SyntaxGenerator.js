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
        SyntaxKind[SyntaxKind["SeparatedList"] = 2] = "SeparatedList";
        SyntaxKind[SyntaxKind["TriviaList"] = 3] = "TriviaList";
        SyntaxKind[SyntaxKind["WhitespaceTrivia"] = 4] = "WhitespaceTrivia";
        SyntaxKind[SyntaxKind["NewLineTrivia"] = 5] = "NewLineTrivia";
        SyntaxKind[SyntaxKind["MultiLineCommentTrivia"] = 6] = "MultiLineCommentTrivia";
        SyntaxKind[SyntaxKind["SingleLineCommentTrivia"] = 7] = "SingleLineCommentTrivia";
        SyntaxKind[SyntaxKind["SkippedTokenTrivia"] = 8] = "SkippedTokenTrivia";
        SyntaxKind[SyntaxKind["ErrorToken"] = 9] = "ErrorToken";
        SyntaxKind[SyntaxKind["EndOfFileToken"] = 10] = "EndOfFileToken";
        SyntaxKind[SyntaxKind["IdentifierName"] = 11] = "IdentifierName";
        SyntaxKind[SyntaxKind["RegularExpressionLiteral"] = 12] = "RegularExpressionLiteral";
        SyntaxKind[SyntaxKind["NumericLiteral"] = 13] = "NumericLiteral";
        SyntaxKind[SyntaxKind["StringLiteral"] = 14] = "StringLiteral";
        SyntaxKind[SyntaxKind["BreakKeyword"] = 15] = "BreakKeyword";
        SyntaxKind[SyntaxKind["CaseKeyword"] = 16] = "CaseKeyword";
        SyntaxKind[SyntaxKind["CatchKeyword"] = 17] = "CatchKeyword";
        SyntaxKind[SyntaxKind["ContinueKeyword"] = 18] = "ContinueKeyword";
        SyntaxKind[SyntaxKind["DebuggerKeyword"] = 19] = "DebuggerKeyword";
        SyntaxKind[SyntaxKind["DefaultKeyword"] = 20] = "DefaultKeyword";
        SyntaxKind[SyntaxKind["DeleteKeyword"] = 21] = "DeleteKeyword";
        SyntaxKind[SyntaxKind["DoKeyword"] = 22] = "DoKeyword";
        SyntaxKind[SyntaxKind["ElseKeyword"] = 23] = "ElseKeyword";
        SyntaxKind[SyntaxKind["FalseKeyword"] = 24] = "FalseKeyword";
        SyntaxKind[SyntaxKind["FinallyKeyword"] = 25] = "FinallyKeyword";
        SyntaxKind[SyntaxKind["ForKeyword"] = 26] = "ForKeyword";
        SyntaxKind[SyntaxKind["FunctionKeyword"] = 27] = "FunctionKeyword";
        SyntaxKind[SyntaxKind["IfKeyword"] = 28] = "IfKeyword";
        SyntaxKind[SyntaxKind["InKeyword"] = 29] = "InKeyword";
        SyntaxKind[SyntaxKind["InstanceOfKeyword"] = 30] = "InstanceOfKeyword";
        SyntaxKind[SyntaxKind["NewKeyword"] = 31] = "NewKeyword";
        SyntaxKind[SyntaxKind["NullKeyword"] = 32] = "NullKeyword";
        SyntaxKind[SyntaxKind["ReturnKeyword"] = 33] = "ReturnKeyword";
        SyntaxKind[SyntaxKind["SwitchKeyword"] = 34] = "SwitchKeyword";
        SyntaxKind[SyntaxKind["ThisKeyword"] = 35] = "ThisKeyword";
        SyntaxKind[SyntaxKind["ThrowKeyword"] = 36] = "ThrowKeyword";
        SyntaxKind[SyntaxKind["TrueKeyword"] = 37] = "TrueKeyword";
        SyntaxKind[SyntaxKind["TryKeyword"] = 38] = "TryKeyword";
        SyntaxKind[SyntaxKind["TypeOfKeyword"] = 39] = "TypeOfKeyword";
        SyntaxKind[SyntaxKind["VarKeyword"] = 40] = "VarKeyword";
        SyntaxKind[SyntaxKind["VoidKeyword"] = 41] = "VoidKeyword";
        SyntaxKind[SyntaxKind["WhileKeyword"] = 42] = "WhileKeyword";
        SyntaxKind[SyntaxKind["WithKeyword"] = 43] = "WithKeyword";
        SyntaxKind[SyntaxKind["ClassKeyword"] = 44] = "ClassKeyword";
        SyntaxKind[SyntaxKind["ConstKeyword"] = 45] = "ConstKeyword";
        SyntaxKind[SyntaxKind["EnumKeyword"] = 46] = "EnumKeyword";
        SyntaxKind[SyntaxKind["ExportKeyword"] = 47] = "ExportKeyword";
        SyntaxKind[SyntaxKind["ExtendsKeyword"] = 48] = "ExtendsKeyword";
        SyntaxKind[SyntaxKind["ImportKeyword"] = 49] = "ImportKeyword";
        SyntaxKind[SyntaxKind["SuperKeyword"] = 50] = "SuperKeyword";
        SyntaxKind[SyntaxKind["ImplementsKeyword"] = 51] = "ImplementsKeyword";
        SyntaxKind[SyntaxKind["InterfaceKeyword"] = 52] = "InterfaceKeyword";
        SyntaxKind[SyntaxKind["LetKeyword"] = 53] = "LetKeyword";
        SyntaxKind[SyntaxKind["PackageKeyword"] = 54] = "PackageKeyword";
        SyntaxKind[SyntaxKind["PrivateKeyword"] = 55] = "PrivateKeyword";
        SyntaxKind[SyntaxKind["ProtectedKeyword"] = 56] = "ProtectedKeyword";
        SyntaxKind[SyntaxKind["PublicKeyword"] = 57] = "PublicKeyword";
        SyntaxKind[SyntaxKind["StaticKeyword"] = 58] = "StaticKeyword";
        SyntaxKind[SyntaxKind["YieldKeyword"] = 59] = "YieldKeyword";
        SyntaxKind[SyntaxKind["AnyKeyword"] = 60] = "AnyKeyword";
        SyntaxKind[SyntaxKind["BooleanKeyword"] = 61] = "BooleanKeyword";
        SyntaxKind[SyntaxKind["ConstructorKeyword"] = 62] = "ConstructorKeyword";
        SyntaxKind[SyntaxKind["DeclareKeyword"] = 63] = "DeclareKeyword";
        SyntaxKind[SyntaxKind["GetKeyword"] = 64] = "GetKeyword";
        SyntaxKind[SyntaxKind["ModuleKeyword"] = 65] = "ModuleKeyword";
        SyntaxKind[SyntaxKind["RequireKeyword"] = 66] = "RequireKeyword";
        SyntaxKind[SyntaxKind["NumberKeyword"] = 67] = "NumberKeyword";
        SyntaxKind[SyntaxKind["SetKeyword"] = 68] = "SetKeyword";
        SyntaxKind[SyntaxKind["StringKeyword"] = 69] = "StringKeyword";
        SyntaxKind[SyntaxKind["OpenBraceToken"] = 70] = "OpenBraceToken";
        SyntaxKind[SyntaxKind["CloseBraceToken"] = 71] = "CloseBraceToken";
        SyntaxKind[SyntaxKind["OpenParenToken"] = 72] = "OpenParenToken";
        SyntaxKind[SyntaxKind["CloseParenToken"] = 73] = "CloseParenToken";
        SyntaxKind[SyntaxKind["OpenBracketToken"] = 74] = "OpenBracketToken";
        SyntaxKind[SyntaxKind["CloseBracketToken"] = 75] = "CloseBracketToken";
        SyntaxKind[SyntaxKind["DotToken"] = 76] = "DotToken";
        SyntaxKind[SyntaxKind["DotDotDotToken"] = 77] = "DotDotDotToken";
        SyntaxKind[SyntaxKind["SemicolonToken"] = 78] = "SemicolonToken";
        SyntaxKind[SyntaxKind["CommaToken"] = 79] = "CommaToken";
        SyntaxKind[SyntaxKind["LessThanToken"] = 80] = "LessThanToken";
        SyntaxKind[SyntaxKind["GreaterThanToken"] = 81] = "GreaterThanToken";
        SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 82] = "LessThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 83] = "GreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 84] = "EqualsEqualsToken";
        SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 85] = "EqualsGreaterThanToken";
        SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 86] = "ExclamationEqualsToken";
        SyntaxKind[SyntaxKind["EqualsEqualsEqualsToken"] = 87] = "EqualsEqualsEqualsToken";
        SyntaxKind[SyntaxKind["ExclamationEqualsEqualsToken"] = 88] = "ExclamationEqualsEqualsToken";
        SyntaxKind[SyntaxKind["PlusToken"] = 89] = "PlusToken";
        SyntaxKind[SyntaxKind["MinusToken"] = 90] = "MinusToken";
        SyntaxKind[SyntaxKind["AsteriskToken"] = 91] = "AsteriskToken";
        SyntaxKind[SyntaxKind["PercentToken"] = 92] = "PercentToken";
        SyntaxKind[SyntaxKind["PlusPlusToken"] = 93] = "PlusPlusToken";
        SyntaxKind[SyntaxKind["MinusMinusToken"] = 94] = "MinusMinusToken";
        SyntaxKind[SyntaxKind["LessThanLessThanToken"] = 95] = "LessThanLessThanToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanToken"] = 96] = "GreaterThanGreaterThanToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanToken"] = 97] = "GreaterThanGreaterThanGreaterThanToken";
        SyntaxKind[SyntaxKind["AmpersandToken"] = 98] = "AmpersandToken";
        SyntaxKind[SyntaxKind["BarToken"] = 99] = "BarToken";
        SyntaxKind[SyntaxKind["CaretToken"] = 100] = "CaretToken";
        SyntaxKind[SyntaxKind["ExclamationToken"] = 101] = "ExclamationToken";
        SyntaxKind[SyntaxKind["TildeToken"] = 102] = "TildeToken";
        SyntaxKind[SyntaxKind["AmpersandAmpersandToken"] = 103] = "AmpersandAmpersandToken";
        SyntaxKind[SyntaxKind["BarBarToken"] = 104] = "BarBarToken";
        SyntaxKind[SyntaxKind["QuestionToken"] = 105] = "QuestionToken";
        SyntaxKind[SyntaxKind["ColonToken"] = 106] = "ColonToken";
        SyntaxKind[SyntaxKind["EqualsToken"] = 107] = "EqualsToken";
        SyntaxKind[SyntaxKind["PlusEqualsToken"] = 108] = "PlusEqualsToken";
        SyntaxKind[SyntaxKind["MinusEqualsToken"] = 109] = "MinusEqualsToken";
        SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 110] = "AsteriskEqualsToken";
        SyntaxKind[SyntaxKind["PercentEqualsToken"] = 111] = "PercentEqualsToken";
        SyntaxKind[SyntaxKind["LessThanLessThanEqualsToken"] = 112] = "LessThanLessThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanEqualsToken"] = 113] = "GreaterThanGreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanEqualsToken"] = 114] = "GreaterThanGreaterThanGreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["AmpersandEqualsToken"] = 115] = "AmpersandEqualsToken";
        SyntaxKind[SyntaxKind["BarEqualsToken"] = 116] = "BarEqualsToken";
        SyntaxKind[SyntaxKind["CaretEqualsToken"] = 117] = "CaretEqualsToken";
        SyntaxKind[SyntaxKind["SlashToken"] = 118] = "SlashToken";
        SyntaxKind[SyntaxKind["SlashEqualsToken"] = 119] = "SlashEqualsToken";
        SyntaxKind[SyntaxKind["SourceUnit"] = 120] = "SourceUnit";
        SyntaxKind[SyntaxKind["QualifiedName"] = 121] = "QualifiedName";
        SyntaxKind[SyntaxKind["ObjectType"] = 122] = "ObjectType";
        SyntaxKind[SyntaxKind["FunctionType"] = 123] = "FunctionType";
        SyntaxKind[SyntaxKind["ArrayType"] = 124] = "ArrayType";
        SyntaxKind[SyntaxKind["ConstructorType"] = 125] = "ConstructorType";
        SyntaxKind[SyntaxKind["GenericType"] = 126] = "GenericType";
        SyntaxKind[SyntaxKind["TypeQuery"] = 127] = "TypeQuery";
        SyntaxKind[SyntaxKind["TupleType"] = 128] = "TupleType";
        SyntaxKind[SyntaxKind["InterfaceDeclaration"] = 129] = "InterfaceDeclaration";
        SyntaxKind[SyntaxKind["FunctionDeclaration"] = 130] = "FunctionDeclaration";
        SyntaxKind[SyntaxKind["ModuleDeclaration"] = 131] = "ModuleDeclaration";
        SyntaxKind[SyntaxKind["ClassDeclaration"] = 132] = "ClassDeclaration";
        SyntaxKind[SyntaxKind["EnumDeclaration"] = 133] = "EnumDeclaration";
        SyntaxKind[SyntaxKind["ImportDeclaration"] = 134] = "ImportDeclaration";
        SyntaxKind[SyntaxKind["ExportAssignment"] = 135] = "ExportAssignment";
        SyntaxKind[SyntaxKind["MemberFunctionDeclaration"] = 136] = "MemberFunctionDeclaration";
        SyntaxKind[SyntaxKind["MemberVariableDeclaration"] = 137] = "MemberVariableDeclaration";
        SyntaxKind[SyntaxKind["ConstructorDeclaration"] = 138] = "ConstructorDeclaration";
        SyntaxKind[SyntaxKind["IndexMemberDeclaration"] = 139] = "IndexMemberDeclaration";
        SyntaxKind[SyntaxKind["GetAccessor"] = 140] = "GetAccessor";
        SyntaxKind[SyntaxKind["SetAccessor"] = 141] = "SetAccessor";
        SyntaxKind[SyntaxKind["PropertySignature"] = 142] = "PropertySignature";
        SyntaxKind[SyntaxKind["CallSignature"] = 143] = "CallSignature";
        SyntaxKind[SyntaxKind["ConstructSignature"] = 144] = "ConstructSignature";
        SyntaxKind[SyntaxKind["IndexSignature"] = 145] = "IndexSignature";
        SyntaxKind[SyntaxKind["MethodSignature"] = 146] = "MethodSignature";
        SyntaxKind[SyntaxKind["Block"] = 147] = "Block";
        SyntaxKind[SyntaxKind["IfStatement"] = 148] = "IfStatement";
        SyntaxKind[SyntaxKind["VariableStatement"] = 149] = "VariableStatement";
        SyntaxKind[SyntaxKind["ExpressionStatement"] = 150] = "ExpressionStatement";
        SyntaxKind[SyntaxKind["ReturnStatement"] = 151] = "ReturnStatement";
        SyntaxKind[SyntaxKind["SwitchStatement"] = 152] = "SwitchStatement";
        SyntaxKind[SyntaxKind["BreakStatement"] = 153] = "BreakStatement";
        SyntaxKind[SyntaxKind["ContinueStatement"] = 154] = "ContinueStatement";
        SyntaxKind[SyntaxKind["ForStatement"] = 155] = "ForStatement";
        SyntaxKind[SyntaxKind["ForInStatement"] = 156] = "ForInStatement";
        SyntaxKind[SyntaxKind["EmptyStatement"] = 157] = "EmptyStatement";
        SyntaxKind[SyntaxKind["ThrowStatement"] = 158] = "ThrowStatement";
        SyntaxKind[SyntaxKind["WhileStatement"] = 159] = "WhileStatement";
        SyntaxKind[SyntaxKind["TryStatement"] = 160] = "TryStatement";
        SyntaxKind[SyntaxKind["LabeledStatement"] = 161] = "LabeledStatement";
        SyntaxKind[SyntaxKind["DoStatement"] = 162] = "DoStatement";
        SyntaxKind[SyntaxKind["DebuggerStatement"] = 163] = "DebuggerStatement";
        SyntaxKind[SyntaxKind["WithStatement"] = 164] = "WithStatement";
        SyntaxKind[SyntaxKind["PlusExpression"] = 165] = "PlusExpression";
        SyntaxKind[SyntaxKind["NegateExpression"] = 166] = "NegateExpression";
        SyntaxKind[SyntaxKind["BitwiseNotExpression"] = 167] = "BitwiseNotExpression";
        SyntaxKind[SyntaxKind["LogicalNotExpression"] = 168] = "LogicalNotExpression";
        SyntaxKind[SyntaxKind["PreIncrementExpression"] = 169] = "PreIncrementExpression";
        SyntaxKind[SyntaxKind["PreDecrementExpression"] = 170] = "PreDecrementExpression";
        SyntaxKind[SyntaxKind["DeleteExpression"] = 171] = "DeleteExpression";
        SyntaxKind[SyntaxKind["TypeOfExpression"] = 172] = "TypeOfExpression";
        SyntaxKind[SyntaxKind["VoidExpression"] = 173] = "VoidExpression";
        SyntaxKind[SyntaxKind["CommaExpression"] = 174] = "CommaExpression";
        SyntaxKind[SyntaxKind["AssignmentExpression"] = 175] = "AssignmentExpression";
        SyntaxKind[SyntaxKind["AddAssignmentExpression"] = 176] = "AddAssignmentExpression";
        SyntaxKind[SyntaxKind["SubtractAssignmentExpression"] = 177] = "SubtractAssignmentExpression";
        SyntaxKind[SyntaxKind["MultiplyAssignmentExpression"] = 178] = "MultiplyAssignmentExpression";
        SyntaxKind[SyntaxKind["DivideAssignmentExpression"] = 179] = "DivideAssignmentExpression";
        SyntaxKind[SyntaxKind["ModuloAssignmentExpression"] = 180] = "ModuloAssignmentExpression";
        SyntaxKind[SyntaxKind["AndAssignmentExpression"] = 181] = "AndAssignmentExpression";
        SyntaxKind[SyntaxKind["ExclusiveOrAssignmentExpression"] = 182] = "ExclusiveOrAssignmentExpression";
        SyntaxKind[SyntaxKind["OrAssignmentExpression"] = 183] = "OrAssignmentExpression";
        SyntaxKind[SyntaxKind["LeftShiftAssignmentExpression"] = 184] = "LeftShiftAssignmentExpression";
        SyntaxKind[SyntaxKind["SignedRightShiftAssignmentExpression"] = 185] = "SignedRightShiftAssignmentExpression";
        SyntaxKind[SyntaxKind["UnsignedRightShiftAssignmentExpression"] = 186] = "UnsignedRightShiftAssignmentExpression";
        SyntaxKind[SyntaxKind["ConditionalExpression"] = 187] = "ConditionalExpression";
        SyntaxKind[SyntaxKind["LogicalOrExpression"] = 188] = "LogicalOrExpression";
        SyntaxKind[SyntaxKind["LogicalAndExpression"] = 189] = "LogicalAndExpression";
        SyntaxKind[SyntaxKind["BitwiseOrExpression"] = 190] = "BitwiseOrExpression";
        SyntaxKind[SyntaxKind["BitwiseExclusiveOrExpression"] = 191] = "BitwiseExclusiveOrExpression";
        SyntaxKind[SyntaxKind["BitwiseAndExpression"] = 192] = "BitwiseAndExpression";
        SyntaxKind[SyntaxKind["EqualsWithTypeConversionExpression"] = 193] = "EqualsWithTypeConversionExpression";
        SyntaxKind[SyntaxKind["NotEqualsWithTypeConversionExpression"] = 194] = "NotEqualsWithTypeConversionExpression";
        SyntaxKind[SyntaxKind["EqualsExpression"] = 195] = "EqualsExpression";
        SyntaxKind[SyntaxKind["NotEqualsExpression"] = 196] = "NotEqualsExpression";
        SyntaxKind[SyntaxKind["LessThanExpression"] = 197] = "LessThanExpression";
        SyntaxKind[SyntaxKind["GreaterThanExpression"] = 198] = "GreaterThanExpression";
        SyntaxKind[SyntaxKind["LessThanOrEqualExpression"] = 199] = "LessThanOrEqualExpression";
        SyntaxKind[SyntaxKind["GreaterThanOrEqualExpression"] = 200] = "GreaterThanOrEqualExpression";
        SyntaxKind[SyntaxKind["InstanceOfExpression"] = 201] = "InstanceOfExpression";
        SyntaxKind[SyntaxKind["InExpression"] = 202] = "InExpression";
        SyntaxKind[SyntaxKind["LeftShiftExpression"] = 203] = "LeftShiftExpression";
        SyntaxKind[SyntaxKind["SignedRightShiftExpression"] = 204] = "SignedRightShiftExpression";
        SyntaxKind[SyntaxKind["UnsignedRightShiftExpression"] = 205] = "UnsignedRightShiftExpression";
        SyntaxKind[SyntaxKind["MultiplyExpression"] = 206] = "MultiplyExpression";
        SyntaxKind[SyntaxKind["DivideExpression"] = 207] = "DivideExpression";
        SyntaxKind[SyntaxKind["ModuloExpression"] = 208] = "ModuloExpression";
        SyntaxKind[SyntaxKind["AddExpression"] = 209] = "AddExpression";
        SyntaxKind[SyntaxKind["SubtractExpression"] = 210] = "SubtractExpression";
        SyntaxKind[SyntaxKind["PostIncrementExpression"] = 211] = "PostIncrementExpression";
        SyntaxKind[SyntaxKind["PostDecrementExpression"] = 212] = "PostDecrementExpression";
        SyntaxKind[SyntaxKind["MemberAccessExpression"] = 213] = "MemberAccessExpression";
        SyntaxKind[SyntaxKind["InvocationExpression"] = 214] = "InvocationExpression";
        SyntaxKind[SyntaxKind["ArrayLiteralExpression"] = 215] = "ArrayLiteralExpression";
        SyntaxKind[SyntaxKind["ObjectLiteralExpression"] = 216] = "ObjectLiteralExpression";
        SyntaxKind[SyntaxKind["ObjectCreationExpression"] = 217] = "ObjectCreationExpression";
        SyntaxKind[SyntaxKind["ParenthesizedExpression"] = 218] = "ParenthesizedExpression";
        SyntaxKind[SyntaxKind["ParenthesizedArrowFunctionExpression"] = 219] = "ParenthesizedArrowFunctionExpression";
        SyntaxKind[SyntaxKind["SimpleArrowFunctionExpression"] = 220] = "SimpleArrowFunctionExpression";
        SyntaxKind[SyntaxKind["CastExpression"] = 221] = "CastExpression";
        SyntaxKind[SyntaxKind["ElementAccessExpression"] = 222] = "ElementAccessExpression";
        SyntaxKind[SyntaxKind["FunctionExpression"] = 223] = "FunctionExpression";
        SyntaxKind[SyntaxKind["OmittedExpression"] = 224] = "OmittedExpression";
        SyntaxKind[SyntaxKind["VariableDeclaration"] = 225] = "VariableDeclaration";
        SyntaxKind[SyntaxKind["VariableDeclarator"] = 226] = "VariableDeclarator";
        SyntaxKind[SyntaxKind["ArgumentList"] = 227] = "ArgumentList";
        SyntaxKind[SyntaxKind["ParameterList"] = 228] = "ParameterList";
        SyntaxKind[SyntaxKind["TypeArgumentList"] = 229] = "TypeArgumentList";
        SyntaxKind[SyntaxKind["TypeParameterList"] = 230] = "TypeParameterList";
        SyntaxKind[SyntaxKind["ExtendsHeritageClause"] = 231] = "ExtendsHeritageClause";
        SyntaxKind[SyntaxKind["ImplementsHeritageClause"] = 232] = "ImplementsHeritageClause";
        SyntaxKind[SyntaxKind["EqualsValueClause"] = 233] = "EqualsValueClause";
        SyntaxKind[SyntaxKind["CaseSwitchClause"] = 234] = "CaseSwitchClause";
        SyntaxKind[SyntaxKind["DefaultSwitchClause"] = 235] = "DefaultSwitchClause";
        SyntaxKind[SyntaxKind["ElseClause"] = 236] = "ElseClause";
        SyntaxKind[SyntaxKind["CatchClause"] = 237] = "CatchClause";
        SyntaxKind[SyntaxKind["FinallyClause"] = 238] = "FinallyClause";
        SyntaxKind[SyntaxKind["TypeParameter"] = 239] = "TypeParameter";
        SyntaxKind[SyntaxKind["Constraint"] = 240] = "Constraint";
        SyntaxKind[SyntaxKind["SimplePropertyAssignment"] = 241] = "SimplePropertyAssignment";
        SyntaxKind[SyntaxKind["FunctionPropertyAssignment"] = 242] = "FunctionPropertyAssignment";
        SyntaxKind[SyntaxKind["Parameter"] = 243] = "Parameter";
        SyntaxKind[SyntaxKind["EnumElement"] = 244] = "EnumElement";
        SyntaxKind[SyntaxKind["TypeAnnotation"] = 245] = "TypeAnnotation";
        SyntaxKind[SyntaxKind["ExternalModuleReference"] = 246] = "ExternalModuleReference";
        SyntaxKind[SyntaxKind["ModuleNameModuleReference"] = 247] = "ModuleNameModuleReference";
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
            "any": 60 /* AnyKeyword */,
            "boolean": 61 /* BooleanKeyword */,
            "break": 15 /* BreakKeyword */,
            "case": 16 /* CaseKeyword */,
            "catch": 17 /* CatchKeyword */,
            "class": 44 /* ClassKeyword */,
            "continue": 18 /* ContinueKeyword */,
            "const": 45 /* ConstKeyword */,
            "constructor": 62 /* ConstructorKeyword */,
            "debugger": 19 /* DebuggerKeyword */,
            "declare": 63 /* DeclareKeyword */,
            "default": 20 /* DefaultKeyword */,
            "delete": 21 /* DeleteKeyword */,
            "do": 22 /* DoKeyword */,
            "else": 23 /* ElseKeyword */,
            "enum": 46 /* EnumKeyword */,
            "export": 47 /* ExportKeyword */,
            "extends": 48 /* ExtendsKeyword */,
            "false": 24 /* FalseKeyword */,
            "finally": 25 /* FinallyKeyword */,
            "for": 26 /* ForKeyword */,
            "function": 27 /* FunctionKeyword */,
            "get": 64 /* GetKeyword */,
            "if": 28 /* IfKeyword */,
            "implements": 51 /* ImplementsKeyword */,
            "import": 49 /* ImportKeyword */,
            "in": 29 /* InKeyword */,
            "instanceof": 30 /* InstanceOfKeyword */,
            "interface": 52 /* InterfaceKeyword */,
            "let": 53 /* LetKeyword */,
            "module": 65 /* ModuleKeyword */,
            "new": 31 /* NewKeyword */,
            "null": 32 /* NullKeyword */,
            "number": 67 /* NumberKeyword */,
            "package": 54 /* PackageKeyword */,
            "private": 55 /* PrivateKeyword */,
            "protected": 56 /* ProtectedKeyword */,
            "public": 57 /* PublicKeyword */,
            "require": 66 /* RequireKeyword */,
            "return": 33 /* ReturnKeyword */,
            "set": 68 /* SetKeyword */,
            "static": 58 /* StaticKeyword */,
            "string": 69 /* StringKeyword */,
            "super": 50 /* SuperKeyword */,
            "switch": 34 /* SwitchKeyword */,
            "this": 35 /* ThisKeyword */,
            "throw": 36 /* ThrowKeyword */,
            "true": 37 /* TrueKeyword */,
            "try": 38 /* TryKeyword */,
            "typeof": 39 /* TypeOfKeyword */,
            "var": 40 /* VarKeyword */,
            "void": 41 /* VoidKeyword */,
            "while": 42 /* WhileKeyword */,
            "with": 43 /* WithKeyword */,
            "yield": 59 /* YieldKeyword */,
            "{": 70 /* OpenBraceToken */,
            "}": 71 /* CloseBraceToken */,
            "(": 72 /* OpenParenToken */,
            ")": 73 /* CloseParenToken */,
            "[": 74 /* OpenBracketToken */,
            "]": 75 /* CloseBracketToken */,
            ".": 76 /* DotToken */,
            "...": 77 /* DotDotDotToken */,
            ";": 78 /* SemicolonToken */,
            ",": 79 /* CommaToken */,
            "<": 80 /* LessThanToken */,
            ">": 81 /* GreaterThanToken */,
            "<=": 82 /* LessThanEqualsToken */,
            ">=": 83 /* GreaterThanEqualsToken */,
            "==": 84 /* EqualsEqualsToken */,
            "=>": 85 /* EqualsGreaterThanToken */,
            "!=": 86 /* ExclamationEqualsToken */,
            "===": 87 /* EqualsEqualsEqualsToken */,
            "!==": 88 /* ExclamationEqualsEqualsToken */,
            "+": 89 /* PlusToken */,
            "-": 90 /* MinusToken */,
            "*": 91 /* AsteriskToken */,
            "%": 92 /* PercentToken */,
            "++": 93 /* PlusPlusToken */,
            "--": 94 /* MinusMinusToken */,
            "<<": 95 /* LessThanLessThanToken */,
            ">>": 96 /* GreaterThanGreaterThanToken */,
            ">>>": 97 /* GreaterThanGreaterThanGreaterThanToken */,
            "&": 98 /* AmpersandToken */,
            "|": 99 /* BarToken */,
            "^": 100 /* CaretToken */,
            "!": 101 /* ExclamationToken */,
            "~": 102 /* TildeToken */,
            "&&": 103 /* AmpersandAmpersandToken */,
            "||": 104 /* BarBarToken */,
            "?": 105 /* QuestionToken */,
            ":": 106 /* ColonToken */,
            "=": 107 /* EqualsToken */,
            "+=": 108 /* PlusEqualsToken */,
            "-=": 109 /* MinusEqualsToken */,
            "*=": 110 /* AsteriskEqualsToken */,
            "%=": 111 /* PercentEqualsToken */,
            "<<=": 112 /* LessThanLessThanEqualsToken */,
            ">>=": 113 /* GreaterThanGreaterThanEqualsToken */,
            ">>>=": 114 /* GreaterThanGreaterThanGreaterThanEqualsToken */,
            "&=": 115 /* AmpersandEqualsToken */,
            "|=": 116 /* BarEqualsToken */,
            "^=": 117 /* CaretEqualsToken */,
            "/": 118 /* SlashToken */,
            "/=": 119 /* SlashEqualsToken */
        };
        var kindToText = new Array();
        for (var name in textToKeywordKind) {
            if (textToKeywordKind.hasOwnProperty(name)) {
                kindToText[textToKeywordKind[name]] = name;
            }
        }
        kindToText[62 /* ConstructorKeyword */] = "constructor";
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
            return getPrefixUnaryExpressionFromOperatorToken(tokenKind) !== 0 /* None */;
        }
        SyntaxFacts.isPrefixUnaryExpressionOperatorToken = isPrefixUnaryExpressionOperatorToken;
        function isBinaryExpressionOperatorToken(tokenKind) {
            return getBinaryExpressionFromOperatorToken(tokenKind) !== 0 /* None */;
        }
        SyntaxFacts.isBinaryExpressionOperatorToken = isBinaryExpressionOperatorToken;
        function getPrefixUnaryExpressionFromOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 89 /* PlusToken */:
                    return 165 /* PlusExpression */;
                case 90 /* MinusToken */:
                    return 166 /* NegateExpression */;
                case 102 /* TildeToken */:
                    return 167 /* BitwiseNotExpression */;
                case 101 /* ExclamationToken */:
                    return 168 /* LogicalNotExpression */;
                case 93 /* PlusPlusToken */:
                    return 169 /* PreIncrementExpression */;
                case 94 /* MinusMinusToken */:
                    return 170 /* PreDecrementExpression */;
                default:
                    return 0 /* None */;
            }
        }
        SyntaxFacts.getPrefixUnaryExpressionFromOperatorToken = getPrefixUnaryExpressionFromOperatorToken;
        function getPostfixUnaryExpressionFromOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 93 /* PlusPlusToken */:
                    return 211 /* PostIncrementExpression */;
                case 94 /* MinusMinusToken */:
                    return 212 /* PostDecrementExpression */;
                default:
                    return 0 /* None */;
            }
        }
        SyntaxFacts.getPostfixUnaryExpressionFromOperatorToken = getPostfixUnaryExpressionFromOperatorToken;
        function getBinaryExpressionFromOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 91 /* AsteriskToken */:
                    return 206 /* MultiplyExpression */;
                case 118 /* SlashToken */:
                    return 207 /* DivideExpression */;
                case 92 /* PercentToken */:
                    return 208 /* ModuloExpression */;
                case 89 /* PlusToken */:
                    return 209 /* AddExpression */;
                case 90 /* MinusToken */:
                    return 210 /* SubtractExpression */;
                case 95 /* LessThanLessThanToken */:
                    return 203 /* LeftShiftExpression */;
                case 96 /* GreaterThanGreaterThanToken */:
                    return 204 /* SignedRightShiftExpression */;
                case 97 /* GreaterThanGreaterThanGreaterThanToken */:
                    return 205 /* UnsignedRightShiftExpression */;
                case 80 /* LessThanToken */:
                    return 197 /* LessThanExpression */;
                case 81 /* GreaterThanToken */:
                    return 198 /* GreaterThanExpression */;
                case 82 /* LessThanEqualsToken */:
                    return 199 /* LessThanOrEqualExpression */;
                case 83 /* GreaterThanEqualsToken */:
                    return 200 /* GreaterThanOrEqualExpression */;
                case 30 /* InstanceOfKeyword */:
                    return 201 /* InstanceOfExpression */;
                case 29 /* InKeyword */:
                    return 202 /* InExpression */;
                case 84 /* EqualsEqualsToken */:
                    return 193 /* EqualsWithTypeConversionExpression */;
                case 86 /* ExclamationEqualsToken */:
                    return 194 /* NotEqualsWithTypeConversionExpression */;
                case 87 /* EqualsEqualsEqualsToken */:
                    return 195 /* EqualsExpression */;
                case 88 /* ExclamationEqualsEqualsToken */:
                    return 196 /* NotEqualsExpression */;
                case 98 /* AmpersandToken */:
                    return 192 /* BitwiseAndExpression */;
                case 100 /* CaretToken */:
                    return 191 /* BitwiseExclusiveOrExpression */;
                case 99 /* BarToken */:
                    return 190 /* BitwiseOrExpression */;
                case 103 /* AmpersandAmpersandToken */:
                    return 189 /* LogicalAndExpression */;
                case 104 /* BarBarToken */:
                    return 188 /* LogicalOrExpression */;
                case 116 /* BarEqualsToken */:
                    return 183 /* OrAssignmentExpression */;
                case 115 /* AmpersandEqualsToken */:
                    return 181 /* AndAssignmentExpression */;
                case 117 /* CaretEqualsToken */:
                    return 182 /* ExclusiveOrAssignmentExpression */;
                case 112 /* LessThanLessThanEqualsToken */:
                    return 184 /* LeftShiftAssignmentExpression */;
                case 113 /* GreaterThanGreaterThanEqualsToken */:
                    return 185 /* SignedRightShiftAssignmentExpression */;
                case 114 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                    return 186 /* UnsignedRightShiftAssignmentExpression */;
                case 108 /* PlusEqualsToken */:
                    return 176 /* AddAssignmentExpression */;
                case 109 /* MinusEqualsToken */:
                    return 177 /* SubtractAssignmentExpression */;
                case 110 /* AsteriskEqualsToken */:
                    return 178 /* MultiplyAssignmentExpression */;
                case 119 /* SlashEqualsToken */:
                    return 179 /* DivideAssignmentExpression */;
                case 111 /* PercentEqualsToken */:
                    return 180 /* ModuloAssignmentExpression */;
                case 107 /* EqualsToken */:
                    return 175 /* AssignmentExpression */;
                case 79 /* CommaToken */:
                    return 174 /* CommaExpression */;
                default:
                    return 0 /* None */;
            }
        }
        SyntaxFacts.getBinaryExpressionFromOperatorToken = getBinaryExpressionFromOperatorToken;
        function getOperatorTokenFromBinaryExpression(tokenKind) {
            switch (tokenKind) {
                case 206 /* MultiplyExpression */:
                    return 91 /* AsteriskToken */;
                case 207 /* DivideExpression */:
                    return 118 /* SlashToken */;
                case 208 /* ModuloExpression */:
                    return 92 /* PercentToken */;
                case 209 /* AddExpression */:
                    return 89 /* PlusToken */;
                case 210 /* SubtractExpression */:
                    return 90 /* MinusToken */;
                case 203 /* LeftShiftExpression */:
                    return 95 /* LessThanLessThanToken */;
                case 204 /* SignedRightShiftExpression */:
                    return 96 /* GreaterThanGreaterThanToken */;
                case 205 /* UnsignedRightShiftExpression */:
                    return 97 /* GreaterThanGreaterThanGreaterThanToken */;
                case 197 /* LessThanExpression */:
                    return 80 /* LessThanToken */;
                case 198 /* GreaterThanExpression */:
                    return 81 /* GreaterThanToken */;
                case 199 /* LessThanOrEqualExpression */:
                    return 82 /* LessThanEqualsToken */;
                case 200 /* GreaterThanOrEqualExpression */:
                    return 83 /* GreaterThanEqualsToken */;
                case 201 /* InstanceOfExpression */:
                    return 30 /* InstanceOfKeyword */;
                case 202 /* InExpression */:
                    return 29 /* InKeyword */;
                case 193 /* EqualsWithTypeConversionExpression */:
                    return 84 /* EqualsEqualsToken */;
                case 194 /* NotEqualsWithTypeConversionExpression */:
                    return 86 /* ExclamationEqualsToken */;
                case 195 /* EqualsExpression */:
                    return 87 /* EqualsEqualsEqualsToken */;
                case 196 /* NotEqualsExpression */:
                    return 88 /* ExclamationEqualsEqualsToken */;
                case 192 /* BitwiseAndExpression */:
                    return 98 /* AmpersandToken */;
                case 191 /* BitwiseExclusiveOrExpression */:
                    return 100 /* CaretToken */;
                case 190 /* BitwiseOrExpression */:
                    return 99 /* BarToken */;
                case 189 /* LogicalAndExpression */:
                    return 103 /* AmpersandAmpersandToken */;
                case 188 /* LogicalOrExpression */:
                    return 104 /* BarBarToken */;
                case 183 /* OrAssignmentExpression */:
                    return 116 /* BarEqualsToken */;
                case 181 /* AndAssignmentExpression */:
                    return 115 /* AmpersandEqualsToken */;
                case 182 /* ExclusiveOrAssignmentExpression */:
                    return 117 /* CaretEqualsToken */;
                case 184 /* LeftShiftAssignmentExpression */:
                    return 112 /* LessThanLessThanEqualsToken */;
                case 185 /* SignedRightShiftAssignmentExpression */:
                    return 113 /* GreaterThanGreaterThanEqualsToken */;
                case 186 /* UnsignedRightShiftAssignmentExpression */:
                    return 114 /* GreaterThanGreaterThanGreaterThanEqualsToken */;
                case 176 /* AddAssignmentExpression */:
                    return 108 /* PlusEqualsToken */;
                case 177 /* SubtractAssignmentExpression */:
                    return 109 /* MinusEqualsToken */;
                case 178 /* MultiplyAssignmentExpression */:
                    return 110 /* AsteriskEqualsToken */;
                case 179 /* DivideAssignmentExpression */:
                    return 119 /* SlashEqualsToken */;
                case 180 /* ModuloAssignmentExpression */:
                    return 111 /* PercentEqualsToken */;
                case 175 /* AssignmentExpression */:
                    return 107 /* EqualsToken */;
                case 174 /* CommaExpression */:
                    return 79 /* CommaToken */;
                default:
                    return 0 /* None */;
            }
        }
        SyntaxFacts.getOperatorTokenFromBinaryExpression = getOperatorTokenFromBinaryExpression;
        function isAssignmentOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 116 /* BarEqualsToken */:
                case 115 /* AmpersandEqualsToken */:
                case 117 /* CaretEqualsToken */:
                case 112 /* LessThanLessThanEqualsToken */:
                case 113 /* GreaterThanGreaterThanEqualsToken */:
                case 114 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                case 108 /* PlusEqualsToken */:
                case 109 /* MinusEqualsToken */:
                case 110 /* AsteriskEqualsToken */:
                case 119 /* SlashEqualsToken */:
                case 111 /* PercentEqualsToken */:
                case 107 /* EqualsToken */:
                    return true;
                default:
                    return false;
            }
        }
        SyntaxFacts.isAssignmentOperatorToken = isAssignmentOperatorToken;
        function isType(kind) {
            switch (kind) {
                case 124 /* ArrayType */:
                case 60 /* AnyKeyword */:
                case 67 /* NumberKeyword */:
                case 61 /* BooleanKeyword */:
                case 69 /* StringKeyword */:
                case 41 /* VoidKeyword */:
                case 123 /* FunctionType */:
                case 122 /* ObjectType */:
                case 125 /* ConstructorType */:
                case 127 /* TypeQuery */:
                case 126 /* GenericType */:
                case 121 /* QualifiedName */:
                case 11 /* IdentifierName */:
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
            { name: 'extendsOrImplementsKeyword', isToken: true, tokenKinds: ['ExtendsKeyword', 'ImplementsKeyword'] },
            { name: 'typeNames', isSeparatedList: true, requiresAtLeastOneItem: true, elementType: 'INameSyntax' }
        ],
        syntaxKinds: ["ExtendsHeritageClause", "ImplementsHeritageClause"],
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
            { name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
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
            { name: 'operatorToken', isToken: true, tokenKinds: ['PlusPlusToken', 'MinusMinusToken', 'PlusToken', 'MinusToken', 'TildeToken', 'ExclamationToken'] },
            { name: 'operand', type: 'IUnaryExpressionSyntax' }
        ],
        syntaxKinds: ["PreIncrementExpression", "PreDecrementExpression", "PlusExpression", "NegateExpression", "BitwiseNotExpression", "LogicalNotExpression"]
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
            { name: 'operatorToken', isToken: true, tokenKinds: ['PlusPlusToken', 'MinusMinusToken'] }
        ],
        syntaxKinds: ["PostIncrementExpression", "PostDecrementExpression"]
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
            { name: 'operatorToken', isToken: true, tokenKinds: ['AsteriskToken', 'SlashToken', 'PercentToken', 'PlusToken', 'MinusToken', 'LessThanLessThanToken', 'GreaterThanGreaterThanToken', 'GreaterThanGreaterThanGreaterThanToken', 'LessThanToken', 'GreaterThanToken', 'LessThanEqualsToken', 'GreaterThanEqualsToken', 'InstanceOfKeyword', 'InKeyword', 'EqualsEqualsToken', 'ExclamationEqualsToken', 'EqualsEqualsEqualsToken', 'ExclamationEqualsEqualsToken', 'AmpersandToken', 'CaretToken', 'BarToken', 'AmpersandAmpersandToken', 'BarBarToken', 'BarEqualsToken', 'AmpersandEqualsToken', 'CaretEqualsToken', 'LessThanLessThanEqualsToken', 'GreaterThanGreaterThanEqualsToken', 'GreaterThanGreaterThanGreaterThanEqualsToken', 'PlusEqualsToken', 'MinusEqualsToken', 'AsteriskEqualsToken', 'SlashEqualsToken', 'PercentEqualsToken', 'EqualsToken', 'CommaToken'] },
            { name: 'right', type: 'IExpressionSyntax' }
        ],
        syntaxKinds: ["MultiplyExpression", "DivideExpression", "ModuloExpression", "AddExpression", "SubtractExpression", "LeftShiftExpression", "SignedRightShiftExpression", "UnsignedRightShiftExpression", "LessThanExpression", "GreaterThanExpression", "LessThanOrEqualExpression", "GreaterThanOrEqualExpression", "InstanceOfExpression", "InExpression", "EqualsWithTypeConversionExpression", "NotEqualsWithTypeConversionExpression", "EqualsExpression", "NotEqualsExpression", "BitwiseAndExpression", "BitwiseExclusiveOrExpression", "BitwiseOrExpression", "LogicalAndExpression", "LogicalOrExpression", "OrAssignmentExpression", "AndAssignmentExpression", "ExclusiveOrAssignmentExpression", "LeftShiftAssignmentExpression", "SignedRightShiftAssignmentExpression", "UnsignedRightShiftAssignmentExpression", "AddAssignmentExpression", "SubtractAssignmentExpression", "MultiplyAssignmentExpression", "DivideAssignmentExpression", "ModuloAssignmentExpression", "AssignmentExpression", "CommaExpression"]
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
    var kindName = definition.syntaxKinds ? definition.syntaxKinds[0] : getNameWithoutSuffix(definition);
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
        return child.elementType + "[]";
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
            else if (child.isList || child.isSeparatedList) {
                result += "            !isShared(" + getSafeName(child) + ") && (" + getSafeName(child) + ".parent = this);\r\n";
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
function generateKindMethod(definition) {
    var result = "";
    return result;
}
function generateSlotMethods(definition) {
    var result = "";
    return result;
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
    var result = "    export class " + definition.name + " extends SyntaxNode";
    if (definition.interfaces) {
        result += " implements ";
        result += definition.interfaces.join(", ");
    }
    result += " {\r\n";
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
    result += "            super(data);\r\n";
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
            if (child.isList || child.isSeparatedList) {
                result += "            !isShared(" + getSafeName(child) + ") && (" + getSafeName(child) + ".parent = this)";
            }
            else if (child.isOptional) {
                result += "            " + getSafeName(child) + " && (" + getSafeName(child) + ".parent = this)";
            }
            else {
                result += "            " + getSafeName(child) + ".parent = this";
            }
        }
        result += ";\r\n";
    }
    result += "        }\r\n";
    if (definition.name === "BinaryExpressionSyntax") {
        result += "        public kind(): SyntaxKind { return SyntaxFacts.getBinaryExpressionFromOperatorToken(this.operatorToken.kind()); }\r\n";
    }
    else if (definition.name === "PrefixUnaryExpressionSyntax") {
        result += "        public kind(): SyntaxKind { return SyntaxFacts.getPrefixUnaryExpressionFromOperatorToken(this.operatorToken.kind()); }\r\n";
    }
    else if (definition.name === "PostfixUnaryExpressionSyntax") {
        result += "        public kind(): SyntaxKind { return SyntaxFacts.getPostfixUnaryExpressionFromOperatorToken(this.operatorToken.kind()); }\r\n";
    }
    else if (definition.name === "HeritageClauseSyntax") {
        result += "        public kind(): SyntaxKind { return this.extendsOrImplementsKeyword.kind() === SyntaxKind.ExtendsKeyword ? SyntaxKind.ExtendsHeritageClause : SyntaxKind.ImplementsHeritageClause; }\r\n";
    }
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
        if (d.syntaxKinds) {
            return TypeScript.ArrayUtilities.contains(d.syntaxKinds, kindName);
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
    result += "\r\n\r\n";
    result += "    export var nodeMetadata: string[][] = [";
    for (var i = 0; i <= TypeScript.SyntaxKind.LastNode; i++) {
        if (i < TypeScript.SyntaxKind.FirstNode) {
            result += "[],";
            continue;
        }
        var kindName = syntaxKindName(i);
        var definition = getDefinitionForKind(i);
        var metadata = "[";
        var children = definition.children.filter(function (m) { return m.type !== "SyntaxKind"; }).map(function (m) { return '"' + m.name + '"'; });
        metadata += children.join(",");
        metadata += "],";
        result += metadata;
    }
    result += "];\r\n\r\n";
    result += "    export module Syntax {\r\n";
    result += "        export interface ISyntaxFactory {\r\n";
    result += "            isConcrete: boolean;\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        result += "            " + definition.name + ": { new(data: number";
        for (var j = 0; j < definition.children.length; j++) {
            var child = definition.children[j];
            result += ", " + child.name + ": " + getType(child);
        }
        result += "): " + definition.name + " };\r\n";
    }
    result += "        }\r\n";
    result += "    }\r\n";
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
    result += "module TypeScript.Syntax.";
    var moduleName = abstract ? "Abstract" : "Concrete";
    result += moduleName;
    result += " {\r\n";
    result += "    // Inject this module as the factory for producing syntax nodes in the parser.\r\n";
    result += "    Parser.syntaxFactory = " + moduleName + ";\r\n";
    result += "    export var isConcrete: boolean = " + !abstract + ";\r\n\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (i > 0) {
            result += "\r\n";
        }
        result += generateNode(definition, abstract);
    }
    result += "\r\n\r\n    ";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (definition.syntaxKinds) {
            continue;
        }
        if (i) {
            result += ", ";
        }
        result += "(<any>" + definition.name + ").prototype.__kind = SyntaxKind." + getNameWithoutSuffix(definition);
    }
    result += ";\r\n";
    result += "}";
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
    result += "module TypeScript {\r\n" + "    export class SyntaxRewriter implements ISyntaxVisitor {\r\n" + "        public visitToken(token: ISyntaxToken): ISyntaxToken {\r\n" + "            return token;\r\n" + "        }\r\n" + "\r\n" + "        public visitNode(node: ISyntaxNode): ISyntaxNode {\r\n" + "            return visitNodeOrToken(this, node);\r\n" + "        }\r\n" + "\r\n" + "        public visitNodeOrToken(node: ISyntaxNodeOrToken): ISyntaxNodeOrToken {\r\n" + "            return isToken(node) ? <ISyntaxNodeOrToken>this.visitToken(<ISyntaxToken>node) : this.visitNode(<ISyntaxNode>node);\r\n" + "        }\r\n" + "\r\n" + "        public visitList<T extends ISyntaxNodeOrToken>(list: T[]): T[] {\r\n" + "            var newItems: T[] = undefined;\r\n" + "\r\n" + "            for (var i = 0, n = list.length; i < n; i++) {\r\n" + "                var item = list[i];\r\n" + "                var newItem = <T>this.visitNodeOrToken(item);\r\n" + "\r\n" + "                if (item !== newItem && !newItems) {\r\n" + "                    newItems = [];\r\n" + "                    for (var j = 0; j < i; j++) {\r\n" + "                        newItems.push(list[j]);\r\n" + "                    }\r\n" + "                }\r\n" + "\r\n" + "                if (newItems) {\r\n" + "                    newItems.push(newItem);\r\n" + "                }\r\n" + "            }\r\n" + "\r\n" + "            // Debug.assert(!newItems || newItems.length === childCount(list));\r\n" + "            return !newItems ? list : Syntax.list<T>(newItems);\r\n" + "        }\r\n" + "\r\n" + "        public visitSeparatedList<T extends ISyntaxNodeOrToken>(list: T[]): T[] {\r\n" + "            var newItems: ISyntaxNodeOrToken[] = undefined;\r\n" + "\r\n" + "            for (var i = 0, n = childCount(list); i < n; i++) {\r\n" + "                var item = childAt(list, i);\r\n" + "                var newItem = isToken(item) ? <ISyntaxNodeOrToken>this.visitToken(<ISyntaxToken>item) : this.visitNode(<ISyntaxNode>item);\r\n" + "\r\n" + "                if (item !== newItem && !newItems) {\r\n" + "                    newItems = [];\r\n" + "                    for (var j = 0; j < i; j++) {\r\n" + "                        newItems.push(childAt(list, j));\r\n" + "                    }\r\n" + "                }\r\n" + "\r\n" + "                if (newItems) {\r\n" + "                    newItems.push(newItem);\r\n" + "                }\r\n" + "            }\r\n" + "\r\n" + "            // Debug.assert(newItems === undefined || newItems.length === childCount(list));\r\n" + "            return !newItems ? list : Syntax.separatedList<T>(newItems);\r\n" + "        }\r\n";
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
            else if (child.isList) {
                result += "this.visitList(node." + child.name + ")";
            }
            else if (child.isSeparatedList) {
                result += "this.visitSeparatedList(node." + child.name + ")";
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
    result += "///<reference path='references.ts' />\r\n" + "\r\n" + "module TypeScript {\r\n" + "    export class SyntaxWalker implements ISyntaxVisitor {\r\n" + "        public visitToken(token: ISyntaxToken): void {\r\n" + "        }\r\n" + "\r\n" + "        public visitNode(node: ISyntaxNode): void {\r\n" + "            visitNodeOrToken(this, node);\r\n" + "        }\r\n" + "\r\n" + "        public visitNodeOrToken(nodeOrToken: ISyntaxNodeOrToken): void {\r\n" + "            if (isToken(nodeOrToken)) { \r\n" + "                this.visitToken(<ISyntaxToken>nodeOrToken);\r\n" + "            }\r\n" + "            else {\r\n" + "                this.visitNode(<ISyntaxNode>nodeOrToken);\r\n" + "            }\r\n" + "        }\r\n" + "\r\n" + "        private visitOptionalToken(token: ISyntaxToken): void {\r\n" + "            if (token === undefined) {\r\n" + "                return;\r\n" + "            }\r\n" + "\r\n" + "            this.visitToken(token);\r\n" + "        }\r\n" + "\r\n" + "        public visitOptionalNode(node: ISyntaxNode): void {\r\n" + "            if (node === undefined) {\r\n" + "                return;\r\n" + "            }\r\n" + "\r\n" + "            this.visitNode(node);\r\n" + "        }\r\n" + "\r\n" + "        public visitOptionalNodeOrToken(nodeOrToken: ISyntaxNodeOrToken): void {\r\n" + "            if (nodeOrToken === undefined) {\r\n" + "                return;\r\n" + "            }\r\n" + "\r\n" + "            this.visitNodeOrToken(nodeOrToken);\r\n" + "        }\r\n" + "\r\n" + "        public visitList(list: ISyntaxNodeOrToken[]): void {\r\n" + "            for (var i = 0, n = list.length; i < n; i++) {\r\n" + "               this.visitNodeOrToken(list[i]);\r\n" + "            }\r\n" + "        }\r\n" + "\r\n" + "        public visitSeparatedList(list: ISyntaxNodeOrToken[]): void {\r\n" + "            for (var i = 0, n = childCount(list); i < n; i++) {\r\n" + "                var item = childAt(list, i);\r\n" + "                this.visitNodeOrToken(item);\r\n" + "            }\r\n" + "        }\r\n";
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
            else if (child.isList) {
                result += "            this.visitList(node." + child.name + ");\r\n";
            }
            else if (child.isSeparatedList) {
                result += "            this.visitSeparatedList(node." + child.name + ");\r\n";
            }
            else if (isNodeOrToken(child)) {
                if (child.isOptional) {
                    result += "            this.visitOptionalNodeOrToken(node." + child.name + ");\r\n";
                }
                else {
                    result += "            this.visitNodeOrToken(node." + child.name + ");\r\n";
                }
            }
            else if (child.type !== "SyntaxKind") {
                if (child.isOptional) {
                    result += "            this.visitOptionalNode(node." + child.name + ");\r\n";
                }
                else {
                    result += "            this.visitNode(node." + child.name + ");\r\n";
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
    var result = "///<reference path='references.ts' />\r\n" + "\r\n" + "module TypeScript {\r\n" + "    export class ScannerUtilities {\r\n";
    var i;
    var keywords = [];
    for (i = TypeScript.SyntaxKind.FirstKeyword; i <= TypeScript.SyntaxKind.LastKeyword; i++) {
        keywords.push({ kind: i, text: TypeScript.SyntaxFacts.getText(i) });
    }
    keywords.sort(function (a, b) { return a.text.localeCompare(b.text); });
    result += "        public static identifierKind(str: string, start: number, length: number): SyntaxKind {\r\n";
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
    result += "        if (isToken(element)) { return visitor.visitToken(<ISyntaxToken>element); }\r\n";
    result += "        switch (element.kind()) {\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (definition.syntaxKinds) {
            result += "           ";
            for (var j = 0; j < definition.syntaxKinds.length; j++) {
                result += " case SyntaxKind." + definition.syntaxKinds[j] + ":";
            }
            result += "\r\n                ";
        }
        else {
            result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ": ";
        }
        result += "return visitor.visit" + getNameWithoutSuffix(definition) + "(<" + definition.name + ">element);\r\n";
    }
    result += "        }\r\n\r\n";
    result += "        throw Errors.invalidOperation();\r\n";
    result += "    }\r\n\r\n";
    result += "    export interface ISyntaxVisitor {\r\n";
    result += "        visitToken(token: ISyntaxToken): any;\r\n";
    for (i = 0; i < definitions.length; i++) {
        definition = definitions[i];
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
    result += "    function isSeparatedListTypeScriptSpecific(list: ISyntaxNodeOrToken[]): boolean {\r\n";
    result += "        for (var i = 0, n = childCount(list); i < n; i++) {\r\n";
    result += "            if (isTypeScriptSpecific(childAt(list, i))) {\r\n";
    result += "                return true;\r\n";
    result += "            }\r\n";
    result += "        }\r\n\r\n";
    result += "        return false;\r\n";
    result += "    }\r\n\r\n";
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
    result += "        if (isSeparatedList(element)) { return isSeparatedListTypeScriptSpecific(<ISyntaxNodeOrToken[]>element); }\r\n\r\n";
    result += "        switch (element.kind()) {\r\n";
    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (!definition.isTypeScriptSpecific) {
            continue;
        }
        if (definition.syntaxKinds) {
            for (var j = 0; j < definition.syntaxKinds.length; j++) {
                result += "            case SyntaxKind." + definition.syntaxKinds[j] + ":\r\n";
            }
        }
        else {
            result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ":\r\n";
        }
    }
    result += "                return true;\r\n";
    var triviallyFalseDefinitions = definitions.filter(function (d) { return d.children.filter(function (c) { return c.type !== "SyntaxKind" && !c.isToken; }).length === 0; });
    for (var i = 0; i < triviallyFalseDefinitions.length; i++) {
        var definition = triviallyFalseDefinitions[i];
        if (definition.isTypeScriptSpecific) {
            continue;
        }
        if (definition.syntaxKinds) {
            for (var j = 0; j < definition.syntaxKinds.length; j++) {
                result += "            case SyntaxKind." + definition.syntaxKinds[j] + ":\r\n";
            }
        }
        else {
            result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ":\r\n";
        }
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
        if (definition.syntaxKinds) {
            result += "           ";
            for (var j = 0; j < definition.syntaxKinds.length; j++) {
                result += " case SyntaxKind." + definition.syntaxKinds[j] + ":";
            }
        }
        else {
            result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ":";
        }
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
            if (child.isList) {
                result += getPropertyAccess(child, "node") + ".length > 0";
            }
            else if (child.isSeparatedList) {
                result += getPropertyAccess(child, "node") + ".childCount() > 0";
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
var syntaxNodesAbstract = generateNodes(true);
var syntaxInterfaces = generateSyntaxInterfaces();
var rewriter = generateRewriter();
var walker = generateWalker();
var scannerUtilities = generateScannerUtilities();
var visitor = generateVisitor();
var defaultVisitor = generateDefaultVisitor();
var servicesUtilities = generateServicesUtilities();
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxNodes.concrete.generated.ts", syntaxNodesConcrete, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxNodes.abstract.generated.ts", syntaxNodesAbstract, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxNodes.interfaces.generated.ts", syntaxInterfaces, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxRewriter.generated.ts", rewriter, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxWalker.generated.ts", walker, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\scannerUtilities.generated.ts", scannerUtilities, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxVisitor.generated.ts", visitor, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\defaultSyntaxVisitor.generated.ts", defaultVisitor, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxUtilities.generated.ts", servicesUtilities, false);
