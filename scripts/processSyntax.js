var ts;
(function (ts) {
    ts.sys = (function () {
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
                    return __filename;
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
})(ts || (ts = {}));
var ts;
(function (ts) {
    var Ternary;
    (function (Ternary) {
        Ternary[Ternary["False"] = 0] = "False";
        Ternary[Ternary["Maybe"] = 1] = "Maybe";
        Ternary[Ternary["True"] = -1] = "True";
    })(Ternary || (Ternary = {}));
    function main() {
        if (ts.sys.args.length < 1) {
            ts.sys.write("Usage:" + ts.sys.newLine);
            ts.sys.write("\tnode processSyntax.js <synatx-json-input-file>" + ts.sys.newLine);
            return;
        }
        var inputFilePath = ts.sys.args[0].replace(/\\/g, "/");
        var inputStr = ts.sys.readFile(inputFilePath);
        var syntax = JSON.parse(inputStr);
        var output = buildSyntaxOutput(syntax);
        var inputDirectory = inputFilePath.substr(0, inputFilePath.lastIndexOf("/"));
        var outputPath = inputDirectory + "/factory.generated.ts";
        ts.sys.writeFile(outputPath, output);
    }
    function buildSyntaxOutput(syntax) {
        var syntaxKindTable;
        var syntaxTypeTable;
        var syntaxSubTypesTable;
        var lastWriteSucceeded;
        var writer;
        return writeFileWorker();
        function computeSyntaxTables() {
            syntaxKindTable = {};
            syntaxTypeTable = {};
            syntaxSubTypesTable = {};
            for (var i = 0; i < syntax.length; i++) {
                var nodeType = syntax[i];
                nodeType.handlerType = normalizeType(nodeType.handlerType);
                nodeType.types = normalizeType(nodeType.types);
                nodeType.type = normalizeType(nodeType.type);
                if (nodeType.kind) {
                    nodeType.kind = nodeType.kind.replace(/\s+/g, "");
                    syntaxKindTable[nodeType.kind] = nodeType;
                }
                if (!nodeType.type) {
                    nodeType.type = nodeType.types;
                }
                if (nodeType.type) {
                    syntaxTypeTable[nodeType.type] = nodeType;
                }
                if (nodeType.baseType) {
                    nodeType.baseType = normalizeType(nodeType.baseType);
                    var subTypes = getProperty(syntaxSubTypesTable, nodeType.baseType);
                    if (!subTypes) {
                        subTypes = [];
                        syntaxSubTypesTable[nodeType.baseType] = subTypes;
                    }
                    subTypes.push(nodeType);
                }
                if (nodeType.name) {
                    nodeType.name = nodeType.name.replace(/\s+/g, "");
                }
                else {
                    nodeType.name = nodeType.kind || nodeType.type;
                }
                var children = nodeType.children;
                if (children) {
                    for (var j = 0; j < children.length; j++) {
                        var member = children[j];
                        member.type = normalizeType(member.type);
                    }
                }
            }
        }
        function writeFileWorker() {
            writer = new TextWriter();
            computeSyntaxTables();
            writeFile();
            return writer.toString();
        }
        function writeFile() {
            writer.writeln("/// <reference path=\"parser.ts\"/>");
            writer.writeln("/// <reference path=\"factory.ts\"/>");
            writer.writeln();
            writer.writeln("module ts {");
            writer.indent();
            writeVisitorHandlerInterface();
            writeVisitorInterface();
            writeFactoryModule();
            writeVisitorModule();
            writer.dedent();
            writer.writeln("}");
            writer.dedent();
        }
        function writeFactoryModule() {
            writer.writeln("export module Factory {");
            writer.indent();
            lastWriteSucceeded = false;
            for (var i = 0; i < syntax.length; i++) {
                var nodeType = syntax[i];
                writeFactoryModuleCreateFunctionForNode(nodeType);
                writeFactoryModuleUpdateFunctionForNode(nodeType);
            }
            writer.dedent();
            writer.writeln("}");
            writer.writeln();
        }
        function writeFactoryModuleCreateFunctionForNode(nodeType) {
            if (!nodeType.kind || !nodeType.children) {
                return;
            }
            if (lastWriteSucceeded) {
                writer.writeln();
            }
            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.baseType;
            var name = nodeType.name || kind || type;
            var children = nodeType.children;
            writer.write("export function create" + formatName(name) + "(");
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                writer.write(member.paramName || member.name);
                if (member.optional) {
                    writer.write("?");
                }
                writer.write(": " + formatType(member.type));
                if (member.isNodeArray) {
                    writer.write("[]");
                }
                writer.write(", ");
            }
            writer.write("location?: TextRange, flags?: NodeFlags");
            if (nodeType.modifiers) {
                writer.write(", modifiers?: Node[]");
            }
            writer.writeln("): " + formatType(type) + " {");
            writer.indent();
            writer.writeln("var node = beginNode<" + formatType(type) + ">(SyntaxKind." + kind + ");");
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                var paramName = member.paramName || member.name;
                writer.write("node." + formatName(member.name) + " = ");
                if (member.converter) {
                    writer.write("" + member.converter + "(");
                }
                else if (member.isNodeArray) {
                    writer.write("createNodeArray(");
                }
                writer.write(paramName);
                if (member.converter || member.isNodeArray) {
                    writer.write(")");
                }
                writer.writeln(";");
            }
            writer.write("return finishNode(node, location, flags");
            if (nodeType.modifiers) {
                writer.write(", modifiers");
            }
            writer.writeln(");");
            writer.dedent();
            writer.writeln("}");
            lastWriteSucceeded = true;
        }
        function writeFactoryModuleUpdateFunctionForNode(nodeType) {
            if (!nodeType.update || !nodeType.kind || !nodeType.children) {
                return;
            }
            if (lastWriteSucceeded) {
                writer.writeln();
            }
            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.baseType;
            var name = nodeType.name || kind || type;
            var children = nodeType.children;
            writer.write("export function update" + formatName(name) + "(node: " + formatType(type));
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                if (member.readonly) {
                    continue;
                }
                writer.write(", ");
                var paramName = member.paramName || member.name;
                writer.write(formatName(paramName));
                writer.write(": " + formatType(member.type));
                if (member.isNodeArray) {
                    writer.write("[]");
                }
            }
            writer.writeln("): " + formatType(type) + " {");
            writer.indent();
            writer.write("if (");
            lastWriteSucceeded = false;
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                if (member.readonly) {
                    continue;
                }
                if (lastWriteSucceeded) {
                    writer.write(" || ");
                }
                var paramName = member.paramName || member.name;
                writer.write("node." + formatName(member.name) + " !== " + formatName(paramName));
                lastWriteSucceeded = true;
            }
            writer.writeln(") {");
            writer.indent();
            writer.write("return create" + formatName(name) + "(");
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                if (member.readonly) {
                    writer.write("node." + formatName(member.name));
                }
                else {
                    var paramName = member.paramName || member.name;
                    writer.write(paramName);
                }
                writer.write(", ");
            }
            writer.write("node, node.flags");
            if (nodeType.modifiers) {
                writer.write(", node.modifiers");
            }
            writer.writeln(");");
            writer.dedent();
            writer.writeln("}");
            writer.writeln("return node;");
            writer.dedent();
            writer.writeln("}");
            lastWriteSucceeded = true;
        }
        function writeVisitorHandlerInterface() {
            writer.writeln("export interface VisitorHandler {");
            writer.indent();
            for (var i = 0; i < syntax.length; i++) {
                writeVisitorHandlerMethodSignatureForNode(syntax[i]);
            }
            writer.dedent();
            writer.writeln("}");
            writer.writeln();
        }
        function writeVisitorHandlerMethodSignatureForNode(nodeType) {
            if (!nodeType.visit || !nodeType.handler) {
                return;
            }
            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.baseType;
            var name = nodeType.name || kind || type;
            var handlerType = nodeType.handlerType || type;
            writer.writeln("visit" + formatName(name) + "? (node: " + formatType(type) + "): " + formatType(handlerType) + ";");
        }
        function writeVisitorInterface() {
            writer.writeln("export interface Visitor {");
            writer.indent();
            for (var i = 0; i < syntax.length; i++) {
                writeVisitorInterfaceMethodSignatureForNode(syntax[i]);
            }
            writer.dedent();
            writer.writeln("}");
            writer.writeln();
        }
        function writeVisitorInterfaceMethodSignatureForNode(nodeType) {
            if (!nodeType.visit) {
                return;
            }
            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.baseType;
            var name = nodeType.name || kind || type;
            var handlerType = nodeType.handlerType || type;
            writer.writeln("visit" + formatName(name) + "(node: " + formatType(type) + "): " + formatType(handlerType) + ";");
        }
        function writeVisitorModule() {
            writer.writeln("export module Visitor {");
            writer.indent();
            writer.writeln("var activeVisitor: Visitor;");
            writer.writeln();
            writeVisitorModuleCreateFunction();
            writeVisitorModuleFunctions();
            writeVisitorModuleFooter();
            writer.dedent();
            writer.writeln("}");
        }
        function writeVisitorModuleCreateFunction() {
            writer.writeln("export function create(handler: VisitorHandler): Visitor {");
            writer.indent();
            writer.writeln("var visitor: Visitor = {");
            writer.indent();
            for (var i = 0; i < syntax.length; i++) {
                var nodeType = syntax[i];
                if (!nodeType.visit) {
                    continue;
                }
                var kind = nodeType.kind;
                var type = nodeType.type || nodeType.baseType;
                var name = nodeType.name || kind || type;
                writer.writeln("visit" + formatName(name) + ",");
            }
            writer.dedent();
            writer.writeln("};");
            writer.writeln();
            writer.writeln("return visitor;");
            writer.writeln();
            lastWriteSucceeded = false;
            for (var i = 0; i < syntax.length; i++) {
                writeVisitorCreateFunctionVisitFunctionForNode(syntax[i]);
            }
            writeVisitorCreateFunctionVisitNodeFunction();
            writer.dedent();
            writer.writeln("}");
            writer.writeln();
        }
        function writeVisitorCreateFunctionVisitFunctionForNode(nodeType) {
            if (!nodeType.visit) {
                return;
            }
            if (lastWriteSucceeded) {
                writer.writeln();
            }
            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.baseType;
            var name = nodeType.name || kind || type;
            var handlerType = nodeType.handlerType || type;
            writer.writeln("function visit" + formatName(name) + "(node: " + formatType(type) + "): " + formatType(handlerType) + " {");
            writer.indent();
            writer.write("return visitNode(node, Visitor.visit" + formatName(name));
            if (nodeType.handler) {
                writer.write(", handler.visit" + formatName(name));
            }
            writer.writeln(");");
            writer.dedent();
            writer.writeln("}");
            lastWriteSucceeded = true;
        }
        function writeVisitorCreateFunctionVisitNodeFunction() {
            writer.suspendIndenting();
            writer.writeln("\n            function visitNode<TNode extends Node, TResult extends Node>(node: TNode, coreVisitor: (node: TNode) => TResult, handlerVisitor?: (node: TNode) => TResult): TResult {\n                if (!node) {\n                    return <TResult><Node>node;\n                }\n\n                var savedVisitor = activeVisitor;\n                activeVisitor = visitor;\n                var result = handlerVisitor ? handlerVisitor(node) : coreVisitor(node);\n                activeVisitor = savedVisitor;\n                return result;\n            }");
            writer.resumeIndenting();
        }
        function writeVisitorModuleFunctions() {
            lastWriteSucceeded = false;
            for (var i = 0; i < syntax.length; i++) {
                writeVisitorModuleFunctionForNode(syntax[i]);
            }
        }
        function writeVisitorModuleFunctionForNode(nodeType) {
            if (!nodeType.visit) {
                return;
            }
            if (lastWriteSucceeded) {
                writer.writeln();
            }
            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.baseType;
            var name = nodeType.name || kind || type;
            writer.writeln("export function visit" + formatName(name) + "(node: " + formatType(type) + "): " + formatType(type) + " {");
            writer.indent();
            if (nodeType.shallow) {
                writer.writeln("return node;");
            }
            else {
                writer.writeln("if (!node || !activeVisitor) {");
                writer.indent();
                writer.writeln("return node;");
                writer.dedent();
                writer.writeln("}");
                if (nodeType.types) {
                    writeVisitorFunctionBodyForTypeUnion(nodeType);
                }
                else if (!nodeType.kind) {
                    writeVisitorFunctionBodyForSuperType(nodeType);
                }
                else if (nodeType.update) {
                    writeVisitorFunctionBodyForNode(nodeType);
                }
                else {
                    writer.writeln("return node;");
                }
            }
            writer.dedent();
            writer.writeln("}");
            lastWriteSucceeded = true;
        }
        function writeVisitorFunctionBodyForTypeUnion(unionType) {
            var returnType = unionType.type || unionType.baseType;
            var types = splitUnionType(unionType.types);
            for (var i = 0; i < types.length; i++) {
                var nodeType = getProperty(syntaxTypeTable, types[i]);
                if (!nodeType) {
                    ts.sys.write(("warning: could not find entry with type \"" + types[i] + "\"") + ts.sys.newLine);
                    continue;
                }
                if (!nodeType.nodeTest) {
                    continue;
                }
                writer.writeln("if (" + nodeType.nodeTest + "(node)) {");
                writer.indent();
                writeVisitorFunctionBodyVisitNode(nodeType, unionType);
                writer.dedent();
                writer.writeln("}");
            }
            writer.writeln("switch (node.kind) {");
            writer.indent();
            var lastWriteWasVisit = true;
            for (var i = 0; i < types.length; i++) {
                var nodeType = getProperty(syntaxTypeTable, types[i]);
                if (!nodeType || nodeType.nodeTest) {
                    continue;
                }
                var kind = nodeType.kind;
                var type = nodeType.type || nodeType.baseType;
                var name = nodeType.name || kind || type;
                lastWriteWasVisit = writeVisitorFunctionBodyCasesForSubTypes(nodeType, unionType, lastWriteWasVisit);
            }
            if (!lastWriteWasVisit) {
                writer.indent();
                writer.writeln("return node;");
                writer.dedent();
            }
            writer.writeln("default:");
            writer.indent();
            writer.writeln("reportUnexpectedNode(node);");
            writer.writeln("return node;");
            writer.dedent();
            writer.dedent();
            writer.writeln("}");
        }
        function writeVisitorFunctionBodyCasesForSubTypes(nodeType, outerType, lastWriteWasVisit) {
            if (nodeType.kind) {
                var kind = nodeType.kind;
                var type = nodeType.type || nodeType.baseType;
                var name = nodeType.name || kind;
                if (nodeType.visit) {
                    if (!lastWriteWasVisit) {
                        writer.indent();
                        writer.writeln("return node;");
                        writer.dedent();
                    }
                }
                writer.writeln("case SyntaxKind." + kind + ":");
                if (nodeType.visit) {
                    writer.indent();
                    writeVisitorFunctionBodyVisitNode(nodeType, outerType);
                    writer.dedent();
                }
                lastWriteWasVisit = nodeType.visit;
            }
            else {
                var subTypes = getProperty(syntaxSubTypesTable, nodeType.type);
                if (!subTypes) {
                    ts.sys.write(("warning: could not find subtypes for type \"" + nodeType.type + "\"") + ts.sys.newLine);
                }
                else {
                    for (var i = 0; i < subTypes.length; i++) {
                        lastWriteWasVisit = writeVisitorFunctionBodyCasesForSubTypes(subTypes[i], outerType, lastWriteWasVisit);
                    }
                }
            }
            return lastWriteWasVisit;
        }
        function writeVisitorFunctionBodyForSuperType(nodeType) {
            var subTypes = getProperty(syntaxSubTypesTable, nodeType.type);
            if (!subTypes) {
                ts.sys.write(("warning: could not find subtypes for type '" + nodeType.type + "'") + ts.sys.newLine);
                return;
            }
            writer.writeln("switch (node.kind) {");
            writer.indent();
            var remainingTypes = [];
            for (var i = 0; i < subTypes.length; i++) {
                var subType = subTypes[i];
                var kind = subType.kind;
                var type = subType.type || subType.baseType;
                var name = subType.name || kind || type;
                if (subType.kind) {
                    writer.writeln("case SyntaxKind." + kind + ":");
                    writer.indent();
                    writeVisitorFunctionBodyVisitNode(subType, nodeType);
                    writer.dedent();
                }
                else {
                    remainingTypes.push(subType);
                }
            }
            if (remainingTypes.length === 1) {
                var subType = remainingTypes[0];
                writer.writeln("default:");
                writer.indent();
                writeVisitorFunctionBodyVisitNode(subType, nodeType);
                writer.dedent();
            }
            else {
                if (remainingTypes.length > 0) {
                    ts.sys.write("warning: too many subtypes." + ts.sys.newLine);
                }
                writer.writeln("default:");
                writer.indent();
                writer.writeln("reportUnexpectedNode(node);");
                writer.writeln("return node;");
                writer.dedent();
            }
            writer.dedent();
            writer.writeln("}");
        }
        function writeVisitorFunctionBodyForNode(nodeType) {
            var kind = nodeType.kind;
            var type = nodeType.type;
            var name = nodeType.name || kind || type;
            writer.writeln("return Factory.update" + formatName(name) + "(");
            writer.indent();
            writer.write("node");
            var children = nodeType.children;
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                if (member.readonly) {
                    continue;
                }
                writer.writeln(",");
                writeVisitorFunctionBodyVisitMember(member);
            }
            writer.writeln(")");
            writer.dedent();
        }
        function writeVisitorFunctionBodyVisitMember(member) {
            var memberNodeType = getProperty(syntaxTypeTable, member.type);
            if (!memberNodeType || !memberNodeType.visit) {
                writer.write("node." + formatName(member.name));
            }
            else {
                var kind = memberNodeType.kind;
                var type = memberNodeType.type || memberNodeType.baseType;
                var name = memberNodeType.name || kind || type;
                if (member.isNodeArray) {
                    writer.write("visitNodes(node." + formatName(member.name) + ", activeVisitor.visit" + formatName(name) + ")");
                }
                else {
                    writer.write("activeVisitor.visit" + formatName(name) + "(node." + formatName(member.name) + ")");
                }
            }
        }
        function writeVisitorFunctionBodyVisitNode(nodeType, outerNodeType) {
            if (nodeType.visit) {
                var kind = nodeType.kind;
                var type = nodeType.type || nodeType.types || nodeType.baseType;
                var name = nodeType.name || kind || type;
                var handlerType = nodeType.handlerType || type;
                var outerType = outerNodeType.type || outerNodeType.types || outerNodeType.baseType;
                if (!isTypeAssignableTo(handlerType, outerType)) {
                    var intersection = getIntersectionType(handlerType, outerType);
                    if (!intersection) {
                        ts.sys.write(("warning: no intersection of types between " + handlerType + " and " + outerType) + ts.sys.newLine);
                        writer.writeln("// warning: no intersection of types between " + handlerType + " and " + outerType);
                        writer.writeln("return node;");
                        return;
                    }
                    if (outerNodeType.nodeTest) {
                        writer.writeln("var visited = activeVisitor.visit" + formatName(name) + "(<" + formatType(type) + ">node);");
                        writer.writeln("if (visited && !" + outerNodeType.nodeTest + "(visited)) {");
                        writer.indent();
                        writer.writeln("reportUnexpectedNodeAfterVisit(visited, node);");
                        writer.writeln("return node;");
                        writer.dedent();
                        writer.writeln("}");
                        writer.writeln("return <" + formatType(intersection) + ">visited;");
                        return;
                    }
                    writer.writeln("// warning: visitor returns possibly incompatible node type, add a nodeTest.");
                    writer.writeln("return <" + formatType(intersection) + ">activeVisitor.visit" + formatName(name) + "(<" + formatType(type) + ">node);");
                    return;
                }
                writer.writeln("return activeVisitor.visit" + formatName(name) + "(<" + formatType(type) + ">node);");
            }
            else {
                writer.writeln("return node;");
            }
        }
        function writeVisitorModuleFooter() {
            writer.suspendIndenting();
            writer.writeln("\n        export function visitNodes<TNode extends Node>(nodes: NodeArray<TNode>, visitNode: (node: TNode) => TNode, shouldCacheNode?: (node: Node) => boolean, cacheNode?: (node: TNode) => TNode, removeMissingNodes?: boolean): NodeArray<TNode> {\n            if (!nodes || !activeVisitor) {\n                return nodes;\n            }\n\n            var updatedNodes: TNode[];\n            var updatedOffset = 0;\n            var cacheOffset = 0;\n\n            for (var i = 0; i < nodes.length; i++) {\n                var updatedIndex = i - updatedOffset;\n                var node = nodes[i];\n                if (shouldCacheNode && shouldCacheNode(node)) {\n                    if (!updatedNodes) {\n                        updatedNodes = nodes.slice(0, i);\n                    }\n                    if (cacheNode) {\n                        while (cacheOffset < updatedIndex) {\n                            updatedNodes[cacheOffset] = cacheNode(updatedNodes[cacheOffset]);\n                            cacheOffset++;\n                        }\n                    }\n                    cacheOffset = updatedIndex;\n                }\n                var updatedNode = visitNode(node);\n                if ((updatedNodes || updatedNode !== node || (!updatedNode && removeMissingNodes))) {\n                    if (!updatedNodes) {\n                        updatedNodes = nodes.slice(0, i);\n                    }\n                    if (!updatedNode && removeMissingNodes) {\n                        updatedOffset++;\n                    }\n                    else {\n                        updatedNodes[i - updatedOffset] = updatedNode;\n                    }\n                }\n            }\n\n            if (updatedNodes) {\n                return Factory.createNodeArray(updatedNodes, nodes);\n            }\n\n            return nodes;\n        }");
            writer.resumeIndenting();
        }
        function normalizeType(type) {
            if (type) {
                type = type.replace(/\s+/g, "");
                if (isUnionType(type)) {
                    var types = splitUnionType(type);
                    types.sort();
                    type = types.join("|");
                }
            }
            return type;
        }
        function getCompatibleTypeSubset(source, target) {
            if (!source || !target) {
                return;
            }
            if (source === target) {
                return source;
            }
            var flatSource = flattenType(source);
            var flatTarget = flattenType(target);
            var flatIntersection = getIntersectionType(flatSource, flatTarget);
            return flatIntersection;
        }
        function flattenType(type) {
            if (!type) {
                return void 0;
            }
            var parts = [];
            var seen = {};
            flattenTypeWorker(type);
            parts.sort();
            return parts.join("|");
            function flattenTypeWorker(type) {
                if (isAliasType(type)) {
                    flattenTypeWorker(getAliasType(type));
                }
                else if (isUnionType(type)) {
                    var types = splitUnionType(type);
                    for (var i = 0; i < types.length; i++) {
                        flattenTypeWorker(types[i]);
                    }
                }
                else {
                    writeType(type);
                }
            }
            function writeType(type) {
                if (!hasProperty(seen, type)) {
                    seen[type] = true;
                    parts.push(type);
                }
            }
        }
        function isTypeAssignableTo(source, target) {
            if (!source || !target) {
                return false;
            }
            if (source === target) {
                return true;
            }
            if (isUnionType(source)) {
                return isUnionTypeAssignableToType(source, target);
            }
            else if (isUnionType(target)) {
                return isTypeAssignableToUnionType(source, target);
            }
            else if (isAliasType(source)) {
                return isTypeAssignableTo(getAliasType(source), target);
            }
            else if (isAliasType(target)) {
                return isTypeAssignableTo(source, getAliasType(target));
            }
            else {
                return isSubtypeOfType(source, target);
            }
        }
        function isUnionTypeAssignableToType(sourceUnion, target) {
            if (!sourceUnion || !target) {
                return false;
            }
            var sourceTypes = splitUnionType(sourceUnion);
            for (var i = 0, l = sourceTypes.length; i < l; i++) {
                var related = isTypeAssignableTo(sourceTypes[i], target);
                if (!related) {
                    return false;
                }
            }
            return true;
        }
        function isTypeAssignableToUnionType(source, targetUnion) {
            if (!source || !targetUnion) {
                return false;
            }
            var targetTypes = splitUnionType(targetUnion);
            for (var i = 0, l = targetTypes.length; i < l; i++) {
                if (isTypeAssignableTo(source, targetTypes[i])) {
                    return true;
                }
            }
            return false;
        }
        function isSubtypeOfType(source, superType) {
            if (!source || !superType) {
                return false;
            }
            var sourceNode = syntaxTypeTable[source];
            if (!sourceNode || !sourceNode.baseType) {
                return false;
            }
            return isTypeAssignableTo(sourceNode.baseType, superType);
        }
        function isUnionType(type) {
            if (type) {
                return type.indexOf("|") !== -1;
            }
            return false;
        }
        function isAliasType(type) {
            if (type) {
                var nodeType = syntaxTypeTable[type];
                if (nodeType && nodeType.types) {
                    return true;
                }
            }
            return false;
        }
        function getAliasType(type) {
            if (type) {
                var nodeType = syntaxTypeTable[type];
                if (nodeType && nodeType.types) {
                    return nodeType.types;
                }
            }
        }
        function splitUnionType(type) {
            if (!type) {
                return [];
            }
            return type.split(/\|/g).sort();
        }
        function getIntersectionType(flatLeft, flatRight) {
            var left = splitUnionType(flatLeft);
            var right = splitUnionType(flatRight);
            var set = {};
            var result = [];
            for (var i = 0; i < left.length; i++) {
                set[left[i]] = true;
            }
            for (var i = 0; i < right.length; i++) {
                if (hasProperty(set, right[i])) {
                    result.push(right[i]);
                }
            }
            if (result.length) {
                return result.sort().join("|");
            }
        }
        function formatName(type) {
            if (!type) {
                return type;
            }
            return type.replace(/\|/g, "Or");
        }
        function formatType(type) {
            if (!type) {
                return "any";
            }
            return type.replace(/\|/g, " | ");
        }
    }
    var TextWriter = (function () {
        function TextWriter(text) {
            this._parts = [];
            this._indent = 0;
            this._newlineRequested = false;
            this._indentingSuspendedDepth = 0;
            this._indentLevels = ["", "    "];
            this.length = 0;
            if (text) {
                this.write(text);
            }
        }
        TextWriter.prototype.write = function (text) {
            if (text) {
                var lines = text.split(/\r\n|\r|\n/g);
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (i > 0) {
                        this._newlineRequested = true;
                    }
                    this.tryWriteNewline();
                    this._parts.push(line);
                    this.length += line.length;
                }
            }
        };
        TextWriter.prototype.writeln = function (text) {
            if (text) {
                this.write(text);
            }
            else if (this._newlineRequested) {
                this.writeNewline();
            }
            this._newlineRequested = true;
        };
        TextWriter.prototype.indent = function () {
            this._indent++;
        };
        TextWriter.prototype.dedent = function () {
            this._indent = Math.max(0, this._indent - 1);
        };
        TextWriter.prototype.suspendIndenting = function () {
            this._indentingSuspendedDepth++;
        };
        TextWriter.prototype.resumeIndenting = function () {
            this._indentingSuspendedDepth = Math.max(0, this._indentingSuspendedDepth - 1);
        };
        TextWriter.prototype.clear = function () {
            this.length = 0;
            this._parts.length = 0;
        };
        TextWriter.prototype.toString = function () {
            var text = this._parts.join("");
            return text;
        };
        TextWriter.prototype.tryWriteIndent = function () {
            if (this._indentingSuspendedDepth || !this._indent) {
                return;
            }
            var indent = this.getIndent(this._indent);
            this._parts.push(indent);
            this.length += indent.length;
        };
        TextWriter.prototype.tryWriteNewline = function () {
            if (!this._newlineRequested) {
                return;
            }
            this._newlineRequested = false;
            this.writeNewline();
            this.tryWriteIndent();
        };
        TextWriter.prototype.writeNewline = function () {
            this._parts.push(ts.sys.newLine);
            this.length += ts.sys.newLine.length;
        };
        TextWriter.prototype.getIndent = function (level) {
            if (level in this._indentLevels) {
                return this._indentLevels[level];
            }
            var indent = this.getIndent(level - 1) + this._indentLevels[1];
            this._indentLevels[level] = indent;
            return indent;
        };
        return TextWriter;
    })();
    function hasProperty(map, key) {
        if (map) {
            return Object.prototype.hasOwnProperty.call(map, key);
        }
    }
    function getProperty(map, key) {
        if (map && hasProperty(map, key)) {
            return map[key];
        }
    }
    main();
})(ts || (ts = {}));
//# sourceMappingURL=file:///C:/dev/TypeScript/scripts/processSyntax.js.map