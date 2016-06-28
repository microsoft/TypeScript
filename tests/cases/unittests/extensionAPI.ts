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
            readFile(path) { return virtualFs[mockHost.getCanonicalFileName(path)]; },
            writeFile(path, content, foo, bar, baz) {
                virtualFs[mockHost.getCanonicalFileName(path)] = content;
            },
            fileExists(path) {
                return !!virtualFs[mockHost.getCanonicalFileName(path)];
            },
            directoryExists(path) {
                const fullPath = mockHost.getCanonicalFileName(path);
                return forEach(getKeys(virtualFs), key => startsWith(key, fullPath));
            },
            getCurrentDirectory(): string { return "/"; },
            getSourceFile(path, languageVersion, onError): SourceFile {
                const fullPath = mockHost.getCanonicalFileName(path);
                return createSourceFile(fullPath, virtualFs[fullPath], languageVersion);
            },
            getDefaultLibLocation() {
                return "/lib/";
            },
            getDefaultLibFileName(options) {
                return combinePaths(mockHost.getDefaultLibLocation(), getDefaultLibFileName(options));
            },
            getCanonicalFileName,
            getDirectories(path) {
                path = mockHost.getCanonicalFileName(path);
                return filter(map(filter(getKeys(virtualFs),
                    fullpath => startsWith(fullpath, path) && fullpath.substr(path.length, 1) === "/"),
                        fullpath => fullpath.substr(path.length + 1).indexOf("/") >= 0 ? fullpath.substr(0, 1 + path.length + fullpath.substr(path.length + 1).indexOf("/")) : fullpath),
                            fullpath => fullpath.lastIndexOf(".") === -1);
            },
            loadExtension(path) {
                const fullPath = mockHost.getCanonicalFileName(path);
                const m = { exports: {} };
                ((module, exports, require) => { eval(virtualFs[fullPath]); })(
                    m,
                    m.exports,
                    (name: string) => {
                        return mockHost.loadExtension(
                            mockHost.getCanonicalFileName(
                                ts.resolveModuleName(name, fullPath, { module: ts.ModuleKind.CommonJS }, mockHost, true).resolvedModule.resolvedFileName
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
    static "extension-kind": tsi.ExtensionKind.SyntacticLint = "syntactic-lint";
    protected ts: typeof tsi;
    protected args: any;
    protected host: tsi.CompilerHost;
    protected program: tsi.Program;
    constructor(state: {ts: typeof tsi, args: any, host: tsi.CompilerHost, program: tsi.Program}) {
        this.ts = state.ts;
        this.args = state.args;
        this.host = state.host;
        this.program = state.program;
    }
    abstract visit(node: tsi.Node, stop: tsi.LintStopMethod, error: tsi.LintErrorMethod): void;
}

export abstract class SemanticLintWalker implements tsi.LintWalker {
    static "extension-kind": tsi.ExtensionKind.SemanticLint = "semantic-lint";
    protected ts: typeof tsi;
    protected args: any;
    protected host: tsi.CompilerHost;
    protected program: tsi.Program;
    protected checker: tsi.TypeChecker;
    constructor(state: {ts: typeof tsi, args: any, host: tsi.CompilerHost, program: tsi.Program, checker: tsi.TypeChecker}) {
        this.ts = state.ts;
        this.args = state.args;
        this.host = state.host;
        this.program = state.program;
        this.checker = state.checker;
    }
    abstract visit(node: tsi.Node, stop: tsi.LintStopMethod, error: tsi.LintErrorMethod): void;
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
            const diagnostics = compile(map, compilerOptions ? compilerOptions : { module: ModuleKind.CommonJS, declaration: true });
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
        buildMap(extensionAPI, extensionAPI, { module: ModuleKind.CommonJS, declaration: true, baseUrl: ".", paths: { "typescript": ["/lib/typescript.d.ts"] } }, /*shouldError*/true);

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
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "foo") {
                error("Identifier 'foo' is forbidden.", node);
            }
        }
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
    constructor(state) { super(state); }
    visit(node, stop, error) {
        const type = this.checker.getTypeAtLocation(node);
        if (type.flags & this.ts.TypeFlags.StringLiteral) {
            if (node.text === "foo") {
                error("String literal type 'foo' is forbidden.", node);
            }
        }
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
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            for (let i = 0; i<this.args.length; i++) {
                if (node.text.toLowerCase() === this.args[i]) {
                    error(\`Identifier \${this.args[i]} is forbidden.\`, node);
                }
            }
        }
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
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "foo") {
                error("Identifier 'foo' is forbidden.", node);
            }
        }
    }
}

export class IsNamedBar extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "bar") {
                error("Identifier 'bar' is forbidden.", node);
            }
        }
    }
}

export class IsValueFoo extends SemanticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        const type = this.checker.getTypeAtLocation(node);
        if (type.flags & this.ts.TypeFlags.StringLiteral) {
            if (node.text === "foo") {
                error("String literal type 'foo' is forbidden.", node);
            }
        }
    }
}

export class IsValueBar extends SemanticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        const type = this.checker.getTypeAtLocation(node);
        if (type.flags & this.ts.TypeFlags.StringLiteral) {
            if (node.text === "bar") {
                error("String literal type 'bar' is forbidden.", node);
            }
        }
    }
}
`
            },
            "test-multierrors": {
                "package.json": `{
  "name": "test-multierrors",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {SyntacticLintWalker} from "typescript-plugin-api";

export default class IsNamedFooOrBar extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "foo") {
                error("FOO", "Identifier 'foo' is forbidden.", node);
            }
            if (node.text.toLowerCase() === "bar") {
                error("BAR", "Identifier 'bar' is forbidden.", node);
            }
        }
    }
}

export class NoShortNames extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.length == 1) {
                error("SINGLE", "Single character identifiers are forbidden", node);
            }
            else if (node.text.length <= 3) {
                error("SHORT", "Short identifiers are forbidden.", node);
            }
        }
    }
}
`,
            },
            "test-errors": {
                "package.json": `{
  "name": "test-errors",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {SyntacticLintWalker} from "typescript-plugin-api";

export default class Throws extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("Not allowed.");
        stop();
    }
}

export class Throws2 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("THROWS2", "Not allowed.");
        stop();
    }
}

export class Throws3 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("THROWS3", "Not allowed.", node);
        stop();
    }
}

export class Throws4 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("THROWS4", "Not allowed.", 0, 10);
        stop();
    }
}

export class Throws5 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("Not allowed.", node);
        stop();
    }
}

export class Throws6 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("Not allowed.", 0, 10);
        stop();
    }
}
`,
            },
        };

        // Compile each extension once with the extension API in its node_modules folder (also generating .d.ts and .js)
        forEachKey(extensions, extName => {
            loadSetIntoFsAt(extensionAPI, "/node_modules/typescript-plugin-api");
            buildMap(extensions[extName], extensions[extName], { module: ModuleKind.CommonJS, declaration: true, experimentalDecorators: true, baseUrl: "/", paths: { "typescript": ["lib/typescript.d.ts"] } }, /*shouldError*/true);
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

        it("can handle multiple diagnostics from a single rule", () => {
            test({
                "main.ts": `
const foo = 3;
const bar = 4;
const x = 3 * 4;              
                `,
            }, {
                availableExtensions: ["test-multierrors"],
                expectedDiagnostics: ["test-multierrors(FOO)", "test-multierrors[NoShortNames](SHORT)", "test-multierrors(BAR)", "test-multierrors[NoShortNames](SHORT)", "test-multierrors[NoShortNames](SINGLE)",],
                compilerOptions: {
                    extensions: ["test-multierrors"],
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("sucessfully handles all six avalable error method overloads", () => {
            test({
                "main.ts": `console.log('Hello, world!')`,
            }, {
                availableExtensions: ["test-errors"],
                expectedDiagnostics: ["test-errors", "test-errors[Throws2](THROWS2)", "test-errors[Throws3](THROWS3)", "test-errors[Throws5]", "test-errors[Throws4](THROWS4)", "test-errors[Throws6]"],
                compilerOptions: {
                    extensions: ["test-errors"],
                    module: ModuleKind.CommonJS,
                }
            });
        });
    });
}
