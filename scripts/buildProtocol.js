/// <reference types="node"/>
"use strict";
var ts = require("../lib/typescript");
var path = require("path");
function endsWith(s, suffix) {
    return s.lastIndexOf(suffix, s.length - suffix.length) !== -1;
}
var DeclarationsWalker = (function () {
    function DeclarationsWalker(typeChecker, protocolFile) {
        this.typeChecker = typeChecker;
        this.protocolFile = protocolFile;
        this.visitedTypes = [];
        this.text = "";
    }
    DeclarationsWalker.getExtraDeclarations = function (typeChecker, protocolFile) {
        var text = "declare namespace ts.server.protocol {\n";
        var walker = new DeclarationsWalker(typeChecker, protocolFile);
        walker.visitTypeNodes(protocolFile);
        return walker.text
            ? "declare namespace ts.server.protocol {\n" + walker.text + "}"
            : "";
    };
    DeclarationsWalker.prototype.processType = function (type) {
        if (this.visitedTypes.indexOf(type) >= 0) {
            return;
        }
        this.visitedTypes.push(type);
        var s = type.aliasSymbol || type.getSymbol();
        if (!s) {
            return;
        }
        if (s.name === "Array") {
            // we should process type argument instead
            return this.processType(type.typeArguments[0]);
        }
        else {
            for (var _i = 0, _a = s.getDeclarations(); _i < _a.length; _i++) {
                var decl = _a[_i];
                var sourceFile = decl.getSourceFile();
                if (sourceFile === this.protocolFile || path.basename(sourceFile.fileName) === "lib.d.ts") {
                    return;
                }
                // splice declaration in final d.ts file
                var text = decl.getFullText();
                this.text += text + "\n";
                // recursively pull all dependencies into result dts file
                this.visitTypeNodes(decl);
            }
        }
    };
    DeclarationsWalker.prototype.visitTypeNodes = function (node) {
        var _this = this;
        if (node.parent) {
            switch (node.parent.kind) {
                case ts.SyntaxKind.VariableDeclaration:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                case ts.SyntaxKind.Parameter:
                case ts.SyntaxKind.IndexSignature:
                    if ((node.parent.type) === node) {
                        var type = this.typeChecker.getTypeAtLocation(node);
                        if (type && !(type.flags & ts.TypeFlags.TypeParameter)) {
                            this.processType(type);
                        }
                    }
                    break;
            }
        }
        ts.forEachChild(node, function (n) { return _this.visitTypeNodes(n); });
    };
    return DeclarationsWalker;
}());
function generateProtocolFile(protocolTs, typeScriptServicesDts) {
    var options = { target: ts.ScriptTarget.ES5, declaration: true, noResolve: true, types: [], stripInternal: true };
    /**
     * 1st pass - generate a program from protocol.ts and typescriptservices.d.ts and emit core version of protocol.d.ts with all internal members stripped
     * @return text of protocol.d.t.s
     */
    function getInitialDtsFileForProtocol() {
        var program = ts.createProgram([protocolTs, typeScriptServicesDts], options);
        var protocolDts;
        program.emit(program.getSourceFile(protocolTs), function (file, content) {
            if (endsWith(file, ".d.ts")) {
                protocolDts = content;
            }
        });
        if (protocolDts === undefined) {
            throw new Error("Declaration file for protocol.ts is not generated");
        }
        return protocolDts;
    }
    var protocolFileName = "protocol.d.ts";
    /**
     * Second pass - generate a program from protocol.d.ts and typescriptservices.d.ts, then augment core protocol.d.ts with extra types from typescriptservices.d.ts
     */
    function getProgramWithProtocolText(protocolDts, includeTypeScriptServices) {
        var host = ts.createCompilerHost(options);
        var originalGetSourceFile = host.getSourceFile;
        host.getSourceFile = function (fileName) {
            if (fileName === protocolFileName) {
                return ts.createSourceFile(fileName, protocolDts, options.target);
            }
            return originalGetSourceFile.apply(host, [fileName]);
        };
        var rootFiles = includeTypeScriptServices ? [protocolFileName, typeScriptServicesDts] : [protocolFileName];
        return ts.createProgram(rootFiles, options, host);
    }
    var protocolDts = getInitialDtsFileForProtocol();
    var program = getProgramWithProtocolText(protocolDts, /*includeTypeScriptServices*/ true);
    var protocolFile = program.getSourceFile("protocol.d.ts");
    var extraDeclarations = DeclarationsWalker.getExtraDeclarations(program.getTypeChecker(), protocolFile);
    if (extraDeclarations) {
        protocolDts += extraDeclarations;
    }
    // do sanity check and try to compile generated text as standalone program
    var sanityCheckProgram = getProgramWithProtocolText(protocolDts, /*includeTypeScriptServices*/ false);
    var diagnostics = program.getSyntacticDiagnostics().concat(program.getSemanticDiagnostics(), program.getGlobalDiagnostics());
    if (diagnostics.length) {
        var flattenedDiagnostics = diagnostics.map(function (d) { return ts.flattenDiagnosticMessageText(d.messageText, "\n"); }).join("\n");
        throw new Error("Unexpected errors during sanity check: " + flattenedDiagnostics);
    }
    return protocolDts;
}
if (process.argv.length < 5) {
    console.log("Expected 3 arguments: path to 'protocol.ts', path to 'typescriptservices.d.ts' and path to output file");
    process.exit(1);
}
var protocolTs = process.argv[2];
var typeScriptServicesDts = process.argv[3];
var outputFile = process.argv[4];
var generatedProtocolDts = generateProtocolFile(protocolTs, typeScriptServicesDts);
ts.sys.writeFile(outputFile, generatedProtocolDts);
//# sourceMappingURL=file:///C:/repo/TypeScript/scripts/buildProtocol.js.map