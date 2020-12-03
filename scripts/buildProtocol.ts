/// <reference types="node"/>

import * as ts from "../lib/typescript";
import * as path from "path";

function endsWith(s: string, suffix: string) {
    return s.lastIndexOf(suffix, s.length - suffix.length) !== -1;
}

function isStringEnum(declaration: ts.EnumDeclaration) {
    return declaration.members.length && declaration.members.every(m => !!m.initializer && m.initializer.kind === ts.SyntaxKind.StringLiteral);
}

class DeclarationsWalker {
    private visitedTypes: ts.Type[] = [];
    private text = "";
    private removedTypes: ts.Type[] = [];

    private constructor(private typeChecker: ts.TypeChecker, private protocolFile: ts.SourceFile) {
    }

    static getExtraDeclarations(typeChecker: ts.TypeChecker, protocolFile: ts.SourceFile): string {
        const walker = new DeclarationsWalker(typeChecker, protocolFile);
        walker.visitTypeNodes(protocolFile);
        let text = walker.text
            ? `declare namespace ts.server.protocol {\n${walker.text}}`
            : "";
        if (walker.removedTypes) {
            text += "\ndeclare namespace ts {\n";
            text += "    // these types are empty stubs for types from services and should not be used directly\n";
            for (const type of walker.removedTypes) {
                text += `    export type ${type.symbol.name} = never;\n`;
            }
            text += "}";
        }
        return text;
    }

    private processType(type: ts.Type): void {
        if (this.visitedTypes.indexOf(type) >= 0) {
            return;
        }
        this.visitedTypes.push(type);
        const s = type.aliasSymbol || type.getSymbol();
        if (!s) {
            return;
        }
        if (s.name === "Array" || s.name === "ReadOnlyArray") {
            // we should process type argument instead
            return this.processType((<any>type).typeArguments[0]);
        }
        else {
            const declarations = s.getDeclarations();
            if (declarations) {
                for (const decl of declarations) {
                    const sourceFile = decl.getSourceFile();
                    if (sourceFile === this.protocolFile || /lib(\..+)?\.d.ts/.test(path.basename(sourceFile.fileName))) {
                        return;
                    }
                    if (decl.kind === ts.SyntaxKind.EnumDeclaration && !isStringEnum(decl as ts.EnumDeclaration)) {
                        this.removedTypes.push(type);
                        return;
                    }
                    else {
                        // splice declaration in final d.ts file
                        const text = decl.getFullText();
                        this.text += `${text}\n`;
                        // recursively pull all dependencies into result dts file

                        this.visitTypeNodes(decl);
                    }
                }
            }
        }
    }

    private visitTypeNodes(node: ts.Node) {
        if (node.parent) {
            switch (node.parent.kind) {
                case ts.SyntaxKind.VariableDeclaration:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                case ts.SyntaxKind.Parameter:
                case ts.SyntaxKind.IndexSignature:
                    if (((<ts.VariableDeclaration | ts.MethodDeclaration | ts.PropertyDeclaration | ts.ParameterDeclaration | ts.PropertySignature | ts.MethodSignature | ts.IndexSignatureDeclaration>node.parent).type) === node) {
                        this.processTypeOfNode(node);
                    }
                    break;
                case ts.SyntaxKind.InterfaceDeclaration:
                    const heritageClauses = (<ts.InterfaceDeclaration>node.parent).heritageClauses;
                    if (heritageClauses) {
                        if (heritageClauses[0].token !== ts.SyntaxKind.ExtendsKeyword) {
                            throw new Error(`Unexpected kind of heritage clause: ${ts.SyntaxKind[heritageClauses[0].kind]}`);
                        }
                        for (const type of heritageClauses[0].types) {
                            this.processTypeOfNode(type);
                        }
                    }
                    break;
            }
        }
        ts.forEachChild(node, n => this.visitTypeNodes(n));
    }

    private processTypeOfNode(node: ts.Node): void {
        if (node.kind === ts.SyntaxKind.UnionType) {
            for (const t of (<ts.UnionTypeNode>node).types) {
                this.processTypeOfNode(t);
            }
        }
        else {
            const type = this.typeChecker.getTypeAtLocation(node);
            if (type && !(type.flags & (ts.TypeFlags.TypeParameter))) {
                this.processType(type);
            }
        }
    }
}

function writeProtocolFile(outputFile: string, protocolTs: string, typeScriptServicesDts: string) {
    const options = { target: ts.ScriptTarget.ES5, declaration: true, noResolve: false, types: <string[]>[], stripInternal: true };

    /**
     * 1st pass - generate a program from protocol.ts and typescriptservices.d.ts and emit core version of protocol.d.ts with all internal members stripped
     * @return text of protocol.d.t.s
     */
    function getInitialDtsFileForProtocol() {
        const program = ts.createProgram([protocolTs, typeScriptServicesDts, path.join(typeScriptServicesDts, "../lib.es5.d.ts")], options);

        let protocolDts: string | undefined;
        const emitResult = program.emit(program.getSourceFile(protocolTs), (file, content) => {
            if (endsWith(file, ".d.ts")) {
                protocolDts = content;
            }
        });

        if (protocolDts === undefined) {
            const diagHost: ts.FormatDiagnosticsHost = {
                getCanonicalFileName(f) { return f; },
                getCurrentDirectory() { return "."; },
                getNewLine() { return "\r\n"; }
            };
            const diags = emitResult.diagnostics.map(d => ts.formatDiagnostic(d, diagHost)).join("\r\n");
            throw new Error(`Declaration file for protocol.ts is not generated:\r\n${diags}`);
        }
        return protocolDts;
    }

    const protocolFileName = "protocol.d.ts";
    /**
     * Second pass - generate a program from protocol.d.ts and typescriptservices.d.ts, then augment core protocol.d.ts with extra types from typescriptservices.d.ts
     */
    function getProgramWithProtocolText(protocolDts: string, includeTypeScriptServices: boolean) {
        const host = ts.createCompilerHost(options);
        const originalGetSourceFile = host.getSourceFile;
        host.getSourceFile = (fileName) => {
            if (fileName === protocolFileName) {
                return ts.createSourceFile(fileName, protocolDts, options.target);
            }
            return originalGetSourceFile.apply(host, [fileName]);
        };
        const rootFiles = includeTypeScriptServices ? [protocolFileName, typeScriptServicesDts] : [protocolFileName];
        return ts.createProgram(rootFiles, options, host);
    }

    let protocolDts = getInitialDtsFileForProtocol();
    const program = getProgramWithProtocolText(protocolDts, /*includeTypeScriptServices*/ true);

    const protocolFile = program.getSourceFile("protocol.d.ts")!;
    const extraDeclarations = DeclarationsWalker.getExtraDeclarations(program.getTypeChecker(), protocolFile);
    if (extraDeclarations) {
        protocolDts += extraDeclarations;
    }
    protocolDts += "\nimport protocol = ts.server.protocol;";
    protocolDts += "\nexport = protocol;";
    protocolDts += "\nexport as namespace protocol;";

    // do sanity check and try to compile generated text as standalone program
    const sanityCheckProgram = getProgramWithProtocolText(protocolDts, /*includeTypeScriptServices*/ false);
    const diagnostics = [...sanityCheckProgram.getSyntacticDiagnostics(), ...sanityCheckProgram.getSemanticDiagnostics(), ...sanityCheckProgram.getGlobalDiagnostics()];

    ts.sys.writeFile(outputFile, protocolDts);

    if (diagnostics.length) {
        const flattenedDiagnostics = diagnostics.map(d => `${ts.flattenDiagnosticMessageText(d.messageText, "\n")} at ${d.file ? d.file.fileName : "<unknown>"} line ${d.start}`).join("\n");
        throw new Error(`Unexpected errors during sanity check: ${flattenedDiagnostics}`);
    }
}

if (process.argv.length < 5) {
    console.log(`Expected 3 arguments: path to 'protocol.ts', path to 'typescriptservices.d.ts' and path to output file`);
    process.exit(1);
}

const protocolTs = process.argv[2];
const typeScriptServicesDts = process.argv[3];
const outputFile = process.argv[4];
writeProtocolFile(outputFile, protocolTs, typeScriptServicesDts);
