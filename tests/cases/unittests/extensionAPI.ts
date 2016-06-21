/// <reference path="..\..\..\src\harness\harness.ts" />

namespace ts {
    describe("Extension API", () => {

        function prettyPrintDiagnostic(diagnostic: Diagnostic): string {
            const message = flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            if (diagnostic.file) {
                const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                return `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
            }
            else {
                return `!!!${message}`;
            }
        }

        function checkDiagnostics(diagnostics: Diagnostic[], expectedDiagnosticCodes?: (number | string)[]) {
            if (!expectedDiagnosticCodes) {
                return;
            }

            for (let i = 0; i < expectedDiagnosticCodes.length; i++) {
                assert.equal(expectedDiagnosticCodes[i], diagnostics[i] && diagnostics[i].code, `Could not find expeced diagnostic.`);
            }
            if (expectedDiagnosticCodes.length === 0 && diagnostics.length) {
                throw new Error(`Unexpected diagnostic (${diagnostics.length - 1} more): ${prettyPrintDiagnostic(diagnostics[0])}`);
            }
            assert.equal(diagnostics.length, expectedDiagnosticCodes.length, "Resuting diagnostics count does not match expected");
        }

        interface ExtensionTestOptions {
            compilerOptions: CompilerOptions;
            availableExtensions: string[];
            expectedDiagnostics: (number | string)[];
        }

        const {content: libContent} = Harness.getDefaultLibraryFile(Harness.IO);
        const tsLibContents = Harness.IO.readFile("built/local/typescript_standalone.d.ts");
        const virtualLib: Map<string> = {
            "/lib/lib.d.ts": libContent,
            "/lib/typescript.d.ts": tsLibContents
        };

        let virtualFs: Map<string> = {};

        const getCanonicalFileName = createGetCanonicalFileName(true);

        function loadSetIntoFsAt(set: Map<string>, prefix: string) {
            forEachKey(set, key => void (virtualFs[getCanonicalFileName(combinePaths(prefix, key))] = set[key]));
        }

        function loadSetIntoFs(set: Map<string>) {
            forEachKey(set, key => void (virtualFs[getCanonicalFileName(key)] = set[key]));
        }

        const mockHost: CompilerHost = {
            useCaseSensitiveFileNames() { return true; },
            getNewLine() { return "\n"; },
            readFile(path) { return virtualFs[this.getCanonicalFileName(path)]; },
            writeFile(path, content, foo, bar, baz) {
                virtualFs[this.getCanonicalFileName(path)] = content;
            },
            fileExists(path) {
                return !!virtualFs[this.getCanonicalFileName(path)];
            },
            directoryExists(path) {
                const fullPath = this.getCanonicalFileName(path);
                return forEach(getKeys(virtualFs), key => startsWith(key, fullPath));
            },
            getCurrentDirectory(): string { return "/"; },
            getSourceFile(path, languageVersion, onError): SourceFile {
                const fullPath = this.getCanonicalFileName(path);
                return createSourceFile(fullPath, virtualFs[fullPath], languageVersion);
            },
            getDefaultLibLocation() {
                return "/lib/";
            },
            getDefaultLibFileName(options) {
                return combinePaths(this.getDefaultLibLocation(), getDefaultLibFileName(options));
            },
            getCanonicalFileName,
            getDirectories(path) {
                path = this.getCanonicalFileName(path);
                return filter(map(filter(getKeys(virtualFs),
                    fullpath => startsWith(fullpath, path) && fullpath.substr(path.length, 1) === "/"),
                        fullpath => fullpath.substr(path.length + 1).indexOf("/") >= 0 ? fullpath.substr(0, 1 + path.length + fullpath.substr(path.length + 1).indexOf("/")) : fullpath),
                            fullpath => fullpath.lastIndexOf(".") === -1);
            },
            loadExtension(path) {
                const fullPath = this.getCanonicalFileName(path);
                const m = {exports: {}};
                ((module, exports, require) => { eval(virtualFs[fullPath]); })(
                    m,
                    m.exports,
                    (name: string) => {
                        return this.loadExtension(
                            this.getCanonicalFileName(
                                ts.resolveModuleName(name, fullPath, {module: ts.ModuleKind.CommonJS}, this, true).resolvedModule.resolvedFileName
                            )
                        );
                    }
                );
                return m.exports;
            },
            trace(s) {
                console.log(s);
            }
        };

        const extensionAPI: Map<string> = {
            "package.json": `{
  "name": "typescript-plugin-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "",
  "types": "index.d.ts"
}`,
            "index.ts": `
import * as tsi from "typescript";

export abstract class SyntacticLintWalker implements tsi.LintWalker {
    private static __tsCompilerExtensionKind: tsi.ExtensionKind.SyntacticLint = "syntactic-lint";
    constructor(protected ts: typeof tsi, protected args: any) {}
    abstract visit(node: tsi.Node, accept: tsi.LintAcceptMethod, error: tsi.LintErrorMethod): void;
}

export abstract class SemanticLintWalker implements tsi.LintWalker {
    private static __tsCompilerExtensionKind: tsi.ExtensionKind.SemanticLint = "semantic-lint";
    constructor(protected ts: typeof tsi, protected checker: tsi.TypeChecker, protected args: any) {}
    abstract visit(node: tsi.Node, accept: tsi.LintAcceptMethod, error: tsi.LintErrorMethod): void;
}
`
        };
        // Compile extension API once (generating .d.ts and .js)

        function compile(fileset: Map<string>, options: ts.CompilerOptions): Diagnostic[] {
            loadSetIntoFs(virtualLib);
            loadSetIntoFs(fileset);

            const program = createProgram(filter(getKeys(fileset), name => name != "package.json"), options, mockHost);
            program.emit();

            return ts.getPreEmitDiagnostics(program);
        }

        function buildMap(map: Map<string>, out: Map<string>, compilerOptions?: CompilerOptions, shouldError?: boolean): Diagnostic[] {
            const diagnostics = compile(map, compilerOptions ? compilerOptions : {module: ModuleKind.CommonJS, declaration: true});
            if (shouldError && diagnostics && diagnostics.length) {
                for (let i = 0; i < diagnostics.length; i++) {
                    console.log(prettyPrintDiagnostic(diagnostics[i]));
                }
                throw new Error("Compiling test harness extension API code resulted in errors.");
            }
            copyMap(virtualFs, out);
            virtualFs = {};
            return diagnostics;
        }
        buildMap(extensionAPI, extensionAPI, {module: ModuleKind.CommonJS, declaration: true, baseUrl: ".", paths: {"typescript": ["/lib/typescript.d.ts"]}}, /*shouldError*/true);

        const extensions: Map<Map<string>> = {
            "test-syntactic-lint": {
                "package.json": `{
  "name": "test-syntactic-lint",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {SyntacticLintWalker} from "typescript-plugin-api";

export default class IsNamedFoo extends SyntacticLintWalker {
    constructor(ts, args) { super(ts, args); }
    visit(node, accept, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "foo") {
                error("Identifier 'foo' is forbidden.", node);
            }
        }
        accept();
    }
}
`,
            },
            "test-semantic-lint": {
                "package.json": `{
  "name": "test-semantic-lint",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "author": ""
}`,
                "main.ts": `
import {SemanticLintWalker} from "typescript-plugin-api";

export default class IsValueFoo extends SemanticLintWalker {
    constructor(ts, checker, args) { super(ts, checker, args); }
    visit(node, accept, error) {
        const type = this.checker.getTypeAtLocation(node);
        if (type.flags & this.ts.TypeFlags.StringLiteral) {
            if (node.text === "foo") {
                error("String literal type 'foo' is forbidden.", node);
            }
        }
        accept();
    }
}
`,
            },
            "test-extension-arguments": {
                "package.json": `{
  "name": "test-extension-arguments",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {SyntacticLintWalker} from "typescript-plugin-api";

export default class IsNamedX extends SyntacticLintWalker {
    constructor(ts, args) { super(ts, args); }
    visit(node, accept, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            for (let i = 0; i<this.args.length; i++) {
                if (node.text.toLowerCase() === this.args[i]) {
                    error(\`Identifier \${this.args[i]} is forbidden.\`, node);
                }
            }
        }
        accept();
    }
}
                `
            },
            "test-multi-extension": {
                "package.json": `{
  "name": "test-multi-extension",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {SyntacticLintWalker, SemanticLintWalker} from "typescript-plugin-api";

export class IsNamedFoo extends SyntacticLintWalker {
    constructor(ts, args) { super(ts, args); }
    visit(node, accept, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "foo") {
                error("Identifier 'foo' is forbidden.", node);
            }
        }
        accept();
    }
}

export class IsNamedBar extends SyntacticLintWalker {
    constructor(ts, args) { super(ts, args); }
    visit(node, accept, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "bar") {
                error("Identifier 'bar' is forbidden.", node);
            }
        }
        accept();
    }
}

export class IsValueFoo extends SemanticLintWalker {
    constructor(ts, checker, args) { super(ts, checker, args); }
    visit(node, accept, error) {
        const type = this.checker.getTypeAtLocation(node);
        if (type.flags & this.ts.TypeFlags.StringLiteral) {
            if (node.text === "foo") {
                error("String literal type 'foo' is forbidden.", node);
            }
        }
        accept();
    }
}

export class IsValueBar extends SemanticLintWalker {
    constructor(ts, checker, args) { super(ts, checker, args); }
    visit(node, accept, error) {
        const type = this.checker.getTypeAtLocation(node);
        if (type.flags & this.ts.TypeFlags.StringLiteral) {
            if (node.text === "bar") {
                error("String literal type 'bar' is forbidden.", node);
            }
        }
        accept();
    }
}
`
            }
        };

        // Compile each extension once with the extension API in its node_modules folder (also generating .d.ts and .js)
        forEachKey(extensions, extName => {
            loadSetIntoFsAt(extensionAPI, "/node_modules/typescript-plugin-api");
            buildMap(extensions[extName], extensions[extName], {module: ModuleKind.CommonJS, declaration: true, experimentalDecorators: true, baseUrl: "/", paths: {"typescript": ["lib/typescript.d.ts"]}}, /*shouldError*/true);
        });

        /**
         * Setup a new test, where all extensions specified in the options hash are available in a node_modules folder, alongside the extension API
         */
        function test(sources: Map<string>, options: ExtensionTestOptions) {
            forEach(options.availableExtensions, ext => loadSetIntoFsAt(extensions[ext], `/node_modules/${ext}`));
            const diagnostics = buildMap(sources, sources, options.compilerOptions);
            checkDiagnostics(diagnostics, options.expectedDiagnostics);
        }

        it("can load syntactic lint extensions", () => {
            test({
                "main.ts": `console.log("Hello, world!");`,
            }, {
                availableExtensions: ["test-syntactic-lint"],
                expectedDiagnostics: [],
                compilerOptions: {
                    extensions: ["test-syntactic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });

            test({
                "main.ts": `interface Foo {a; b;}`,
            }, {
                availableExtensions: ["test-syntactic-lint"],
                expectedDiagnostics: ["test-syntactic-lint"],
                compilerOptions: {
                    extensions: ["test-syntactic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("can load semantic lint extensions", () => {
            test({
                "main.ts": `console.log("Hello, world!");`,
            }, {
                availableExtensions: ["test-semantic-lint"],
                expectedDiagnostics: [],
                compilerOptions: {
                    extensions: ["test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });

            test({
                "main.ts": `const s: "foo" = "foo";`,
            }, {
                availableExtensions: ["test-semantic-lint"],
                expectedDiagnostics: ["test-semantic-lint", "test-semantic-lint"],
                compilerOptions: {
                    extensions: ["test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("can load semantic & syntactic lint extensions simultaneously", () => {
            test({
                "main.ts": `console.log("Hello, world!");`,
            }, {
                availableExtensions: ["test-syntactic-lint", "test-semantic-lint"],
                expectedDiagnostics: [],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });

            test({
                "main.ts": `const s: "foo" = "foo";`,
            }, {
                availableExtensions: ["test-syntactic-lint", "test-semantic-lint"],
                expectedDiagnostics: ["test-semantic-lint", "test-semantic-lint"],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });

            test({
                "main.ts": `interface Foo {a; b;}`,
            }, {
                availableExtensions: ["test-syntactic-lint", "test-semantic-lint"],
                expectedDiagnostics: ["test-syntactic-lint"],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });

            test({
                "main.ts": `interface Foo {a; b;}
                const s: "foo" = "foo";`,
            }, {
                availableExtensions: ["test-syntactic-lint", "test-semantic-lint"],
                expectedDiagnostics: ["test-syntactic-lint", "test-semantic-lint", "test-semantic-lint"],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("can pass arguments to lint rules", () => {
            test({
                "main.ts": `interface Foo {a; b;}`,
            }, {
                availableExtensions: ["test-extension-arguments"],
                expectedDiagnostics: ["test-extension-arguments", "test-extension-arguments"],
                compilerOptions: {
                    extensions: {
                        "test-extension-arguments": ["a", "b"]
                    },
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("can load multiple rules from a single extension", () => {
            test({
                "main.ts": `interface Foo {b;}
                interface Bar {a;}
                const f: "foo" = "foo";
                let b: "bar" = "bar";`,
            }, {
                availableExtensions: ["test-multi-extension"],
                expectedDiagnostics: ["test-multi-extension[IsNamedFoo]", "test-multi-extension[IsNamedBar]", "test-multi-extension[IsValueFoo]", "test-multi-extension[IsValueFoo]", "test-multi-extension[IsValueBar]", "test-multi-extension[IsValueBar]"],
                compilerOptions: {
                    extensions: ["test-multi-extension"],
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("can error when it fails to load a lint rule", () => {
            test({
                "main.ts": `console.log("Hello, world!");`,
            }, {
                availableExtensions: [],
                expectedDiagnostics: [6151, 6151],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });
        });
    });
}
