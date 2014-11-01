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
        SyntaxKind[SyntaxKind["BreakKeyword"] = 13] = "BreakKeyword";
        SyntaxKind[SyntaxKind["CaseKeyword"] = 14] = "CaseKeyword";
        SyntaxKind[SyntaxKind["CatchKeyword"] = 15] = "CatchKeyword";
        SyntaxKind[SyntaxKind["ContinueKeyword"] = 16] = "ContinueKeyword";
        SyntaxKind[SyntaxKind["DebuggerKeyword"] = 17] = "DebuggerKeyword";
        SyntaxKind[SyntaxKind["DefaultKeyword"] = 18] = "DefaultKeyword";
        SyntaxKind[SyntaxKind["DeleteKeyword"] = 19] = "DeleteKeyword";
        SyntaxKind[SyntaxKind["DoKeyword"] = 20] = "DoKeyword";
        SyntaxKind[SyntaxKind["ElseKeyword"] = 21] = "ElseKeyword";
        SyntaxKind[SyntaxKind["FalseKeyword"] = 22] = "FalseKeyword";
        SyntaxKind[SyntaxKind["FinallyKeyword"] = 23] = "FinallyKeyword";
        SyntaxKind[SyntaxKind["ForKeyword"] = 24] = "ForKeyword";
        SyntaxKind[SyntaxKind["FunctionKeyword"] = 25] = "FunctionKeyword";
        SyntaxKind[SyntaxKind["IfKeyword"] = 26] = "IfKeyword";
        SyntaxKind[SyntaxKind["InKeyword"] = 27] = "InKeyword";
        SyntaxKind[SyntaxKind["InstanceOfKeyword"] = 28] = "InstanceOfKeyword";
        SyntaxKind[SyntaxKind["NewKeyword"] = 29] = "NewKeyword";
        SyntaxKind[SyntaxKind["NullKeyword"] = 30] = "NullKeyword";
        SyntaxKind[SyntaxKind["ReturnKeyword"] = 31] = "ReturnKeyword";
        SyntaxKind[SyntaxKind["SwitchKeyword"] = 32] = "SwitchKeyword";
        SyntaxKind[SyntaxKind["ThisKeyword"] = 33] = "ThisKeyword";
        SyntaxKind[SyntaxKind["ThrowKeyword"] = 34] = "ThrowKeyword";
        SyntaxKind[SyntaxKind["TrueKeyword"] = 35] = "TrueKeyword";
        SyntaxKind[SyntaxKind["TryKeyword"] = 36] = "TryKeyword";
        SyntaxKind[SyntaxKind["TypeOfKeyword"] = 37] = "TypeOfKeyword";
        SyntaxKind[SyntaxKind["VarKeyword"] = 38] = "VarKeyword";
        SyntaxKind[SyntaxKind["VoidKeyword"] = 39] = "VoidKeyword";
        SyntaxKind[SyntaxKind["WhileKeyword"] = 40] = "WhileKeyword";
        SyntaxKind[SyntaxKind["WithKeyword"] = 41] = "WithKeyword";
        SyntaxKind[SyntaxKind["ClassKeyword"] = 42] = "ClassKeyword";
        SyntaxKind[SyntaxKind["ConstKeyword"] = 43] = "ConstKeyword";
        SyntaxKind[SyntaxKind["EnumKeyword"] = 44] = "EnumKeyword";
        SyntaxKind[SyntaxKind["ExportKeyword"] = 45] = "ExportKeyword";
        SyntaxKind[SyntaxKind["ExtendsKeyword"] = 46] = "ExtendsKeyword";
        SyntaxKind[SyntaxKind["ImportKeyword"] = 47] = "ImportKeyword";
        SyntaxKind[SyntaxKind["SuperKeyword"] = 48] = "SuperKeyword";
        SyntaxKind[SyntaxKind["ImplementsKeyword"] = 49] = "ImplementsKeyword";
        SyntaxKind[SyntaxKind["InterfaceKeyword"] = 50] = "InterfaceKeyword";
        SyntaxKind[SyntaxKind["LetKeyword"] = 51] = "LetKeyword";
        SyntaxKind[SyntaxKind["PackageKeyword"] = 52] = "PackageKeyword";
        SyntaxKind[SyntaxKind["PrivateKeyword"] = 53] = "PrivateKeyword";
        SyntaxKind[SyntaxKind["ProtectedKeyword"] = 54] = "ProtectedKeyword";
        SyntaxKind[SyntaxKind["PublicKeyword"] = 55] = "PublicKeyword";
        SyntaxKind[SyntaxKind["StaticKeyword"] = 56] = "StaticKeyword";
        SyntaxKind[SyntaxKind["YieldKeyword"] = 57] = "YieldKeyword";
        SyntaxKind[SyntaxKind["AnyKeyword"] = 58] = "AnyKeyword";
        SyntaxKind[SyntaxKind["BooleanKeyword"] = 59] = "BooleanKeyword";
        SyntaxKind[SyntaxKind["ConstructorKeyword"] = 60] = "ConstructorKeyword";
        SyntaxKind[SyntaxKind["DeclareKeyword"] = 61] = "DeclareKeyword";
        SyntaxKind[SyntaxKind["GetKeyword"] = 62] = "GetKeyword";
        SyntaxKind[SyntaxKind["ModuleKeyword"] = 63] = "ModuleKeyword";
        SyntaxKind[SyntaxKind["RequireKeyword"] = 64] = "RequireKeyword";
        SyntaxKind[SyntaxKind["NumberKeyword"] = 65] = "NumberKeyword";
        SyntaxKind[SyntaxKind["SetKeyword"] = 66] = "SetKeyword";
        SyntaxKind[SyntaxKind["StringKeyword"] = 67] = "StringKeyword";
        SyntaxKind[SyntaxKind["OpenBraceToken"] = 68] = "OpenBraceToken";
        SyntaxKind[SyntaxKind["CloseBraceToken"] = 69] = "CloseBraceToken";
        SyntaxKind[SyntaxKind["OpenParenToken"] = 70] = "OpenParenToken";
        SyntaxKind[SyntaxKind["CloseParenToken"] = 71] = "CloseParenToken";
        SyntaxKind[SyntaxKind["OpenBracketToken"] = 72] = "OpenBracketToken";
        SyntaxKind[SyntaxKind["CloseBracketToken"] = 73] = "CloseBracketToken";
        SyntaxKind[SyntaxKind["DotToken"] = 74] = "DotToken";
        SyntaxKind[SyntaxKind["DotDotDotToken"] = 75] = "DotDotDotToken";
        SyntaxKind[SyntaxKind["SemicolonToken"] = 76] = "SemicolonToken";
        SyntaxKind[SyntaxKind["CommaToken"] = 77] = "CommaToken";
        SyntaxKind[SyntaxKind["LessThanToken"] = 78] = "LessThanToken";
        SyntaxKind[SyntaxKind["GreaterThanToken"] = 79] = "GreaterThanToken";
        SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 80] = "LessThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 81] = "GreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 82] = "EqualsEqualsToken";
        SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 83] = "EqualsGreaterThanToken";
        SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 84] = "ExclamationEqualsToken";
        SyntaxKind[SyntaxKind["EqualsEqualsEqualsToken"] = 85] = "EqualsEqualsEqualsToken";
        SyntaxKind[SyntaxKind["ExclamationEqualsEqualsToken"] = 86] = "ExclamationEqualsEqualsToken";
        SyntaxKind[SyntaxKind["PlusToken"] = 87] = "PlusToken";
        SyntaxKind[SyntaxKind["MinusToken"] = 88] = "MinusToken";
        SyntaxKind[SyntaxKind["AsteriskToken"] = 89] = "AsteriskToken";
        SyntaxKind[SyntaxKind["PercentToken"] = 90] = "PercentToken";
        SyntaxKind[SyntaxKind["PlusPlusToken"] = 91] = "PlusPlusToken";
        SyntaxKind[SyntaxKind["MinusMinusToken"] = 92] = "MinusMinusToken";
        SyntaxKind[SyntaxKind["LessThanLessThanToken"] = 93] = "LessThanLessThanToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanToken"] = 94] = "GreaterThanGreaterThanToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanToken"] = 95] = "GreaterThanGreaterThanGreaterThanToken";
        SyntaxKind[SyntaxKind["AmpersandToken"] = 96] = "AmpersandToken";
        SyntaxKind[SyntaxKind["BarToken"] = 97] = "BarToken";
        SyntaxKind[SyntaxKind["CaretToken"] = 98] = "CaretToken";
        SyntaxKind[SyntaxKind["ExclamationToken"] = 99] = "ExclamationToken";
        SyntaxKind[SyntaxKind["TildeToken"] = 100] = "TildeToken";
        SyntaxKind[SyntaxKind["AmpersandAmpersandToken"] = 101] = "AmpersandAmpersandToken";
        SyntaxKind[SyntaxKind["BarBarToken"] = 102] = "BarBarToken";
        SyntaxKind[SyntaxKind["QuestionToken"] = 103] = "QuestionToken";
        SyntaxKind[SyntaxKind["ColonToken"] = 104] = "ColonToken";
        SyntaxKind[SyntaxKind["EqualsToken"] = 105] = "EqualsToken";
        SyntaxKind[SyntaxKind["PlusEqualsToken"] = 106] = "PlusEqualsToken";
        SyntaxKind[SyntaxKind["MinusEqualsToken"] = 107] = "MinusEqualsToken";
        SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 108] = "AsteriskEqualsToken";
        SyntaxKind[SyntaxKind["PercentEqualsToken"] = 109] = "PercentEqualsToken";
        SyntaxKind[SyntaxKind["LessThanLessThanEqualsToken"] = 110] = "LessThanLessThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanEqualsToken"] = 111] = "GreaterThanGreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanEqualsToken"] = 112] = "GreaterThanGreaterThanGreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["AmpersandEqualsToken"] = 113] = "AmpersandEqualsToken";
        SyntaxKind[SyntaxKind["BarEqualsToken"] = 114] = "BarEqualsToken";
        SyntaxKind[SyntaxKind["CaretEqualsToken"] = 115] = "CaretEqualsToken";
        SyntaxKind[SyntaxKind["SlashToken"] = 116] = "SlashToken";
        SyntaxKind[SyntaxKind["SlashEqualsToken"] = 117] = "SlashEqualsToken";
        SyntaxKind[SyntaxKind["SourceUnit"] = 118] = "SourceUnit";
        SyntaxKind[SyntaxKind["QualifiedName"] = 119] = "QualifiedName";
        SyntaxKind[SyntaxKind["ObjectType"] = 120] = "ObjectType";
        SyntaxKind[SyntaxKind["FunctionType"] = 121] = "FunctionType";
        SyntaxKind[SyntaxKind["ArrayType"] = 122] = "ArrayType";
        SyntaxKind[SyntaxKind["ConstructorType"] = 123] = "ConstructorType";
        SyntaxKind[SyntaxKind["GenericType"] = 124] = "GenericType";
        SyntaxKind[SyntaxKind["TypeQuery"] = 125] = "TypeQuery";
        SyntaxKind[SyntaxKind["TupleType"] = 126] = "TupleType";
        SyntaxKind[SyntaxKind["UnionType"] = 127] = "UnionType";
        SyntaxKind[SyntaxKind["ParenthesizedType"] = 128] = "ParenthesizedType";
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
        SyntaxKind[SyntaxKind["PrefixUnaryExpression"] = 165] = "PrefixUnaryExpression";
        SyntaxKind[SyntaxKind["DeleteExpression"] = 166] = "DeleteExpression";
        SyntaxKind[SyntaxKind["TypeOfExpression"] = 167] = "TypeOfExpression";
        SyntaxKind[SyntaxKind["VoidExpression"] = 168] = "VoidExpression";
        SyntaxKind[SyntaxKind["ConditionalExpression"] = 169] = "ConditionalExpression";
        SyntaxKind[SyntaxKind["BinaryExpression"] = 170] = "BinaryExpression";
        SyntaxKind[SyntaxKind["PostfixUnaryExpression"] = 171] = "PostfixUnaryExpression";
        SyntaxKind[SyntaxKind["MemberAccessExpression"] = 172] = "MemberAccessExpression";
        SyntaxKind[SyntaxKind["InvocationExpression"] = 173] = "InvocationExpression";
        SyntaxKind[SyntaxKind["ArrayLiteralExpression"] = 174] = "ArrayLiteralExpression";
        SyntaxKind[SyntaxKind["ObjectLiteralExpression"] = 175] = "ObjectLiteralExpression";
        SyntaxKind[SyntaxKind["ObjectCreationExpression"] = 176] = "ObjectCreationExpression";
        SyntaxKind[SyntaxKind["ParenthesizedExpression"] = 177] = "ParenthesizedExpression";
        SyntaxKind[SyntaxKind["ParenthesizedArrowFunctionExpression"] = 178] = "ParenthesizedArrowFunctionExpression";
        SyntaxKind[SyntaxKind["SimpleArrowFunctionExpression"] = 179] = "SimpleArrowFunctionExpression";
        SyntaxKind[SyntaxKind["CastExpression"] = 180] = "CastExpression";
        SyntaxKind[SyntaxKind["ElementAccessExpression"] = 181] = "ElementAccessExpression";
        SyntaxKind[SyntaxKind["FunctionExpression"] = 182] = "FunctionExpression";
        SyntaxKind[SyntaxKind["OmittedExpression"] = 183] = "OmittedExpression";
        SyntaxKind[SyntaxKind["VariableDeclaration"] = 184] = "VariableDeclaration";
        SyntaxKind[SyntaxKind["VariableDeclarator"] = 185] = "VariableDeclarator";
        SyntaxKind[SyntaxKind["ArgumentList"] = 186] = "ArgumentList";
        SyntaxKind[SyntaxKind["ParameterList"] = 187] = "ParameterList";
        SyntaxKind[SyntaxKind["TypeArgumentList"] = 188] = "TypeArgumentList";
        SyntaxKind[SyntaxKind["TypeParameterList"] = 189] = "TypeParameterList";
        SyntaxKind[SyntaxKind["HeritageClause"] = 190] = "HeritageClause";
        SyntaxKind[SyntaxKind["EqualsValueClause"] = 191] = "EqualsValueClause";
        SyntaxKind[SyntaxKind["CaseSwitchClause"] = 192] = "CaseSwitchClause";
        SyntaxKind[SyntaxKind["DefaultSwitchClause"] = 193] = "DefaultSwitchClause";
        SyntaxKind[SyntaxKind["ElseClause"] = 194] = "ElseClause";
        SyntaxKind[SyntaxKind["CatchClause"] = 195] = "CatchClause";
        SyntaxKind[SyntaxKind["FinallyClause"] = 196] = "FinallyClause";
        SyntaxKind[SyntaxKind["TypeParameter"] = 197] = "TypeParameter";
        SyntaxKind[SyntaxKind["Constraint"] = 198] = "Constraint";
        SyntaxKind[SyntaxKind["SimplePropertyAssignment"] = 199] = "SimplePropertyAssignment";
        SyntaxKind[SyntaxKind["FunctionPropertyAssignment"] = 200] = "FunctionPropertyAssignment";
        SyntaxKind[SyntaxKind["Parameter"] = 201] = "Parameter";
        SyntaxKind[SyntaxKind["EnumElement"] = 202] = "EnumElement";
        SyntaxKind[SyntaxKind["TypeAnnotation"] = 203] = "TypeAnnotation";
        SyntaxKind[SyntaxKind["ExternalModuleReference"] = 204] = "ExternalModuleReference";
        SyntaxKind[SyntaxKind["ModuleNameModuleReference"] = 205] = "ModuleNameModuleReference";
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
            "any": 58 /* AnyKeyword */,
            "boolean": 59 /* BooleanKeyword */,
            "break": 13 /* BreakKeyword */,
            "case": 14 /* CaseKeyword */,
            "catch": 15 /* CatchKeyword */,
            "class": 42 /* ClassKeyword */,
            "continue": 16 /* ContinueKeyword */,
            "const": 43 /* ConstKeyword */,
            "constructor": 60 /* ConstructorKeyword */,
            "debugger": 17 /* DebuggerKeyword */,
            "declare": 61 /* DeclareKeyword */,
            "default": 18 /* DefaultKeyword */,
            "delete": 19 /* DeleteKeyword */,
            "do": 20 /* DoKeyword */,
            "else": 21 /* ElseKeyword */,
            "enum": 44 /* EnumKeyword */,
            "export": 45 /* ExportKeyword */,
            "extends": 46 /* ExtendsKeyword */,
            "false": 22 /* FalseKeyword */,
            "finally": 23 /* FinallyKeyword */,
            "for": 24 /* ForKeyword */,
            "function": 25 /* FunctionKeyword */,
            "get": 62 /* GetKeyword */,
            "if": 26 /* IfKeyword */,
            "implements": 49 /* ImplementsKeyword */,
            "import": 47 /* ImportKeyword */,
            "in": 27 /* InKeyword */,
            "instanceof": 28 /* InstanceOfKeyword */,
            "interface": 50 /* InterfaceKeyword */,
            "let": 51 /* LetKeyword */,
            "module": 63 /* ModuleKeyword */,
            "new": 29 /* NewKeyword */,
            "null": 30 /* NullKeyword */,
            "number": 65 /* NumberKeyword */,
            "package": 52 /* PackageKeyword */,
            "private": 53 /* PrivateKeyword */,
            "protected": 54 /* ProtectedKeyword */,
            "public": 55 /* PublicKeyword */,
            "require": 64 /* RequireKeyword */,
            "return": 31 /* ReturnKeyword */,
            "set": 66 /* SetKeyword */,
            "static": 56 /* StaticKeyword */,
            "string": 67 /* StringKeyword */,
            "super": 48 /* SuperKeyword */,
            "switch": 32 /* SwitchKeyword */,
            "this": 33 /* ThisKeyword */,
            "throw": 34 /* ThrowKeyword */,
            "true": 35 /* TrueKeyword */,
            "try": 36 /* TryKeyword */,
            "typeof": 37 /* TypeOfKeyword */,
            "var": 38 /* VarKeyword */,
            "void": 39 /* VoidKeyword */,
            "while": 40 /* WhileKeyword */,
            "with": 41 /* WithKeyword */,
            "yield": 57 /* YieldKeyword */,
            "{": 68 /* OpenBraceToken */,
            "}": 69 /* CloseBraceToken */,
            "(": 70 /* OpenParenToken */,
            ")": 71 /* CloseParenToken */,
            "[": 72 /* OpenBracketToken */,
            "]": 73 /* CloseBracketToken */,
            ".": 74 /* DotToken */,
            "...": 75 /* DotDotDotToken */,
            ";": 76 /* SemicolonToken */,
            ",": 77 /* CommaToken */,
            "<": 78 /* LessThanToken */,
            ">": 79 /* GreaterThanToken */,
            "<=": 80 /* LessThanEqualsToken */,
            ">=": 81 /* GreaterThanEqualsToken */,
            "==": 82 /* EqualsEqualsToken */,
            "=>": 83 /* EqualsGreaterThanToken */,
            "!=": 84 /* ExclamationEqualsToken */,
            "===": 85 /* EqualsEqualsEqualsToken */,
            "!==": 86 /* ExclamationEqualsEqualsToken */,
            "+": 87 /* PlusToken */,
            "-": 88 /* MinusToken */,
            "*": 89 /* AsteriskToken */,
            "%": 90 /* PercentToken */,
            "++": 91 /* PlusPlusToken */,
            "--": 92 /* MinusMinusToken */,
            "<<": 93 /* LessThanLessThanToken */,
            ">>": 94 /* GreaterThanGreaterThanToken */,
            ">>>": 95 /* GreaterThanGreaterThanGreaterThanToken */,
            "&": 96 /* AmpersandToken */,
            "|": 97 /* BarToken */,
            "^": 98 /* CaretToken */,
            "!": 99 /* ExclamationToken */,
            "~": 100 /* TildeToken */,
            "&&": 101 /* AmpersandAmpersandToken */,
            "||": 102 /* BarBarToken */,
            "?": 103 /* QuestionToken */,
            ":": 104 /* ColonToken */,
            "=": 105 /* EqualsToken */,
            "+=": 106 /* PlusEqualsToken */,
            "-=": 107 /* MinusEqualsToken */,
            "*=": 108 /* AsteriskEqualsToken */,
            "%=": 109 /* PercentEqualsToken */,
            "<<=": 110 /* LessThanLessThanEqualsToken */,
            ">>=": 111 /* GreaterThanGreaterThanEqualsToken */,
            ">>>=": 112 /* GreaterThanGreaterThanGreaterThanEqualsToken */,
            "&=": 113 /* AmpersandEqualsToken */,
            "|=": 114 /* BarEqualsToken */,
            "^=": 115 /* CaretEqualsToken */,
            "/": 116 /* SlashToken */,
            "/=": 117 /* SlashEqualsToken */
        };
        var kindToText = new Array();
        for (var name in textToKeywordKind) {
            if (textToKeywordKind.hasOwnProperty(name)) {
                kindToText[textToKeywordKind[name]] = name;
            }
        }
        kindToText[60 /* ConstructorKeyword */] = "constructor";
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
                case 87 /* PlusToken */:
                case 88 /* MinusToken */:
                case 100 /* TildeToken */:
                case 99 /* ExclamationToken */:
                case 91 /* PlusPlusToken */:
                case 92 /* MinusMinusToken */:
                    return true;
                default:
                    return false;
            }
        }
        SyntaxFacts.isPrefixUnaryExpressionOperatorToken = isPrefixUnaryExpressionOperatorToken;
        function isBinaryExpressionOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 89 /* AsteriskToken */:
                case 116 /* SlashToken */:
                case 90 /* PercentToken */:
                case 87 /* PlusToken */:
                case 88 /* MinusToken */:
                case 93 /* LessThanLessThanToken */:
                case 94 /* GreaterThanGreaterThanToken */:
                case 95 /* GreaterThanGreaterThanGreaterThanToken */:
                case 78 /* LessThanToken */:
                case 79 /* GreaterThanToken */:
                case 80 /* LessThanEqualsToken */:
                case 81 /* GreaterThanEqualsToken */:
                case 28 /* InstanceOfKeyword */:
                case 27 /* InKeyword */:
                case 82 /* EqualsEqualsToken */:
                case 84 /* ExclamationEqualsToken */:
                case 85 /* EqualsEqualsEqualsToken */:
                case 86 /* ExclamationEqualsEqualsToken */:
                case 96 /* AmpersandToken */:
                case 98 /* CaretToken */:
                case 97 /* BarToken */:
                case 101 /* AmpersandAmpersandToken */:
                case 102 /* BarBarToken */:
                case 114 /* BarEqualsToken */:
                case 113 /* AmpersandEqualsToken */:
                case 115 /* CaretEqualsToken */:
                case 110 /* LessThanLessThanEqualsToken */:
                case 111 /* GreaterThanGreaterThanEqualsToken */:
                case 112 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                case 106 /* PlusEqualsToken */:
                case 107 /* MinusEqualsToken */:
                case 108 /* AsteriskEqualsToken */:
                case 117 /* SlashEqualsToken */:
                case 109 /* PercentEqualsToken */:
                case 105 /* EqualsToken */:
                case 77 /* CommaToken */:
                    return true;
                default:
                    return false;
            }
        }
        SyntaxFacts.isBinaryExpressionOperatorToken = isBinaryExpressionOperatorToken;
        function isAssignmentOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 114 /* BarEqualsToken */:
                case 113 /* AmpersandEqualsToken */:
                case 115 /* CaretEqualsToken */:
                case 110 /* LessThanLessThanEqualsToken */:
                case 111 /* GreaterThanGreaterThanEqualsToken */:
                case 112 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                case 106 /* PlusEqualsToken */:
                case 107 /* MinusEqualsToken */:
                case 108 /* AsteriskEqualsToken */:
                case 117 /* SlashEqualsToken */:
                case 109 /* PercentEqualsToken */:
                case 105 /* EqualsToken */:
                    return true;
                default:
                    return false;
            }
        }
        SyntaxFacts.isAssignmentOperatorToken = isAssignmentOperatorToken;
        function isType(kind) {
            switch (kind) {
                case 122 /* ArrayType */:
                case 58 /* AnyKeyword */:
                case 65 /* NumberKeyword */:
                case 59 /* BooleanKeyword */:
                case 67 /* StringKeyword */:
                case 39 /* VoidKeyword */:
                case 121 /* FunctionType */:
                case 120 /* ObjectType */:
                case 123 /* ConstructorType */:
                case 125 /* TypeQuery */:
                case 124 /* GenericType */:
                case 119 /* QualifiedName */:
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
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxNodes.interfaces.generated.ts", syntaxInterfaces, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxRewriter.generated.ts", rewriter, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxWalker.generated.ts", walker, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\scannerUtilities.generated.ts", scannerUtilities, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxVisitor.generated.ts", visitor, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\defaultSyntaxVisitor.generated.ts", defaultVisitor, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxUtilities.generated.ts", servicesUtilities, false);
