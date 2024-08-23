import * as Harness from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";

describe("unittests:: services:: Transpile", () => {
    interface TranspileTestSettings {
        options?: ts.TranspileOptions;
        noSetFileName?: boolean;
        testVerbatimModuleSyntax?: true | "only";
    }

    function transpilesCorrectly(nameIn: string, input: string, testSettings: TranspileTestSettings) {
        const runOnce = (name: string, testSettings: TranspileTestSettings) =>
            describe(name, () => {
                let transpileResult: ts.TranspileOutput;
                let oldTranspileResult: string;
                let oldTranspileDiagnostics: ts.Diagnostic[];

                const transpileOptions: ts.TranspileOptions = testSettings.options || {};
                if (!transpileOptions.compilerOptions) {
                    transpileOptions.compilerOptions = {};
                }
                if (transpileOptions.compilerOptions.target === undefined) {
                    transpileOptions.compilerOptions.target = ts.ScriptTarget.ES5;
                }

                if (transpileOptions.compilerOptions.newLine === undefined) {
                    // use \r\n as default new line
                    transpileOptions.compilerOptions.newLine = ts.NewLineKind.CarriageReturnLineFeed;
                }

                transpileOptions.compilerOptions.sourceMap = true;

                let unitName = transpileOptions.fileName;
                if (!unitName) {
                    unitName = transpileOptions.compilerOptions.jsx ? "file.tsx" : "file.ts";
                    if (!testSettings.noSetFileName) {
                        transpileOptions.fileName = unitName;
                    }
                }

                transpileOptions.reportDiagnostics = true;

                const justName = "transpile/" + name.replace(/[^a-z0-9\-. ()=]/gi, "") + (transpileOptions.compilerOptions.jsx ? ts.Extension.Tsx : ts.Extension.Ts);
                const toBeCompiled = [{
                    unitName,
                    content: input,
                }];
                const canUseOldTranspile = !transpileOptions.renamedDependencies;

                before(() => {
                    transpileResult = ts.transpileModule(input, transpileOptions);

                    if (canUseOldTranspile) {
                        oldTranspileDiagnostics = [];
                        oldTranspileResult = ts.transpile(input, transpileOptions.compilerOptions, transpileOptions.fileName, oldTranspileDiagnostics, transpileOptions.moduleName);
                    }
                });

                after(() => {
                    transpileResult = undefined!;
                    oldTranspileResult = undefined!;
                    oldTranspileDiagnostics = undefined!;
                });

                /* eslint-disable no-restricted-syntax */
                it("Correct errors for " + justName, () => {
                    Harness.Baseline.runBaseline(justName.replace(/\.tsx?$/, ".errors.txt"), transpileResult.diagnostics!.length === 0 ? null : Harness.Compiler.getErrorBaseline(toBeCompiled, transpileResult.diagnostics!));
                });

                if (canUseOldTranspile) {
                    it("Correct errors (old transpile) for " + justName, () => {
                        Harness.Baseline.runBaseline(justName.replace(/\.tsx?$/, ".oldTranspile.errors.txt"), oldTranspileDiagnostics.length === 0 ? null : Harness.Compiler.getErrorBaseline(toBeCompiled, oldTranspileDiagnostics));
                    });
                }
                /* eslint-enable no-restricted-syntax */

                it("Correct output for " + justName, () => {
                    Harness.Baseline.runBaseline(justName.replace(/\.tsx?$/, ts.Extension.Js), transpileResult.outputText);
                });

                if (canUseOldTranspile) {
                    it("Correct output (old transpile) for " + justName, () => {
                        Harness.Baseline.runBaseline(justName.replace(/\.tsx?$/, ".oldTranspile.js"), oldTranspileResult);
                    });
                }
            });

        if (testSettings.testVerbatimModuleSyntax !== "only") {
            runOnce(nameIn, testSettings);
        }
        if (testSettings.testVerbatimModuleSyntax) {
            runOnce(nameIn + " (verbatimModuleSyntax=true)", {
                ...testSettings,
                options: {
                    ...testSettings.options,
                    compilerOptions: {
                        ...testSettings.options?.compilerOptions,
                        verbatimModuleSyntax: true,
                    },
                },
            });
        }
    }

    transpilesCorrectly("Generates no diagnostics with valid inputs", `var x = 0;`, {
        options: { compilerOptions: { module: ts.ModuleKind.CommonJS } },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly(
        "Generates no diagnostics for missing file references",
        `/// <reference path="file2.ts" />
var x = 0;`,
        {
            options: { compilerOptions: { module: ts.ModuleKind.CommonJS } },
            testVerbatimModuleSyntax: true,
        },
    );

    transpilesCorrectly("Generates no diagnostics for missing module imports", `import {a} from "module2";`, {
        options: { compilerOptions: { module: ts.ModuleKind.CommonJS } },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Generates expected syntactic diagnostics", `a b`, {
        options: { compilerOptions: { module: ts.ModuleKind.CommonJS } },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Does not generate semantic diagnostics", `var x: string = 0;`, {
        options: { compilerOptions: { module: ts.ModuleKind.CommonJS } },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Generates module output", `var x = 0; export {};`, {
        options: { compilerOptions: { module: ts.ModuleKind.AMD } },
    });

    transpilesCorrectly("Uses correct newLine character", `var x = 0;`, {
        options: { compilerOptions: { module: ts.ModuleKind.CommonJS, newLine: ts.NewLineKind.LineFeed } },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Sets module name", "var x = 1; export {};", {
        options: { compilerOptions: { module: ts.ModuleKind.System, newLine: ts.NewLineKind.LineFeed }, moduleName: "NamedModule" },
    });

    transpilesCorrectly("No extra errors for file without extension", `"use strict";\r\nvar x = 0;`, {
        options: { compilerOptions: { module: ts.ModuleKind.CommonJS }, fileName: "file" },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly(
        "Rename dependencies - System",
        `import {foo} from "SomeName";\n` +
            `declare function use(a: any);\n` +
            `use(foo);`,
        {
            options: { compilerOptions: { module: ts.ModuleKind.System, newLine: ts.NewLineKind.LineFeed }, renamedDependencies: { SomeName: "SomeOtherName" } },
        },
    );

    transpilesCorrectly(
        "Rename dependencies - AMD",
        `import {foo} from "SomeName";\n` +
            `declare function use(a: any);\n` +
            `use(foo);`,
        {
            options: { compilerOptions: { module: ts.ModuleKind.AMD, newLine: ts.NewLineKind.LineFeed }, renamedDependencies: { SomeName: "SomeOtherName" } },
        },
    );

    transpilesCorrectly(
        "Rename dependencies - UMD",
        `import {foo} from "SomeName";\n` +
            `declare function use(a: any);\n` +
            `use(foo);`,
        {
            options: { compilerOptions: { module: ts.ModuleKind.UMD, newLine: ts.NewLineKind.LineFeed }, renamedDependencies: { SomeName: "SomeOtherName" } },
        },
    );

    transpilesCorrectly(
        "Transpile with emit decorators and emit metadata",
        `import {db} from './db';\n` +
            `function someDecorator(target) {\n` +
            `    return target;\n` +
            `} \n` +
            `@someDecorator\n` +
            `class MyClass {\n` +
            `    db: db;\n` +
            `    constructor(db: db) {\n` +
            `        this.db = db;\n` +
            `        this.db.doSomething(); \n` +
            `    }\n` +
            `}\n` +
            `export {MyClass}; \n`,
        {
            options: {
                compilerOptions: {
                    module: ts.ModuleKind.CommonJS,
                    newLine: ts.NewLineKind.LineFeed,
                    noEmitHelpers: true,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    target: ts.ScriptTarget.ES5,
                },
            },
            testVerbatimModuleSyntax: true,
        },
    );

    transpilesCorrectly("Supports backslashes in file name", "var x", {
        options: { fileName: "a\\b.ts" },
    });

    transpilesCorrectly("transpile file as 'tsx' if 'jsx' is specified", `var x = <div/>`, {
        options: { compilerOptions: { jsx: ts.JsxEmit.React, newLine: ts.NewLineKind.LineFeed } },
    });

    transpilesCorrectly("transpile .js files", "const a = 10;", {
        options: { compilerOptions: { newLine: ts.NewLineKind.LineFeed, module: ts.ModuleKind.CommonJS }, fileName: "input.js", reportDiagnostics: true },
    });

    transpilesCorrectly("Supports urls in file name", "var x", {
        options: { fileName: "http://somewhere/directory//directory2/file.ts" },
    });

    transpilesCorrectly("Accepts string as enum values for compile-options", "export const x = 0", {
        options: {
            compilerOptions: {
                module: "es6" as any as ts.ModuleKind,
                // Capitalization and spaces ignored
                target: " Es6 " as any as ts.ScriptTarget,
            },
        },
    });

    transpilesCorrectly("Report an error when compiler-options module-kind is out-of-range", "", {
        options: { compilerOptions: { module: 123 as any as ts.ModuleKind } },
    });

    transpilesCorrectly("Report an error when compiler-options target-script is out-of-range", "", {
        options: { compilerOptions: { module: 123 as any as ts.ModuleKind } },
    });

    transpilesCorrectly("Support options with lib values", "const a = 10;", {
        options: { compilerOptions: { lib: ["es6", "dom"], module: ts.ModuleKind.CommonJS }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Support options with types values", "const a = 10;", {
        options: { compilerOptions: { types: ["jquery", "typescript"], module: ts.ModuleKind.CommonJS }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'allowJs'", "x;", {
        options: { compilerOptions: { allowJs: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'allowSyntheticDefaultImports'", "x;", {
        options: { compilerOptions: { allowSyntheticDefaultImports: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'allowUnreachableCode'", "x;", {
        options: { compilerOptions: { allowUnreachableCode: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'allowUnusedLabels'", "x;", {
        options: { compilerOptions: { allowUnusedLabels: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'alwaysStrict'", "x;", {
        options: { compilerOptions: { alwaysStrict: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'baseUrl'", "x;", {
        options: { compilerOptions: { baseUrl: "./folder/baseUrl" }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'charset'", "x;", {
        options: { compilerOptions: { charset: "en-us" }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'declaration'", "x;", {
        options: { compilerOptions: { declaration: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'declarationMap'", "x;", {
        options: { compilerOptions: { declarationMap: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'declarationDir'", "x;", {
        options: { compilerOptions: { declarationDir: "out/declarations" }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'emitBOM'", "x;", {
        options: { compilerOptions: { emitBOM: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'emitDecoratorMetadata'", "x;", {
        options: { compilerOptions: { emitDecoratorMetadata: true, experimentalDecorators: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'experimentalDecorators'", "x;", {
        options: { compilerOptions: { experimentalDecorators: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'forceConsistentCasingInFileNames'", "x;", {
        options: { compilerOptions: { forceConsistentCasingInFileNames: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'isolatedModules'", "x;", {
        options: { compilerOptions: { isolatedModules: true }, fileName: "input.js", reportDiagnostics: true },
    });

    transpilesCorrectly("Does not support setting 'isolatedModules'", "x;", {
        options: { compilerOptions: { isolatedModules: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: "only",
    });

    transpilesCorrectly("Supports setting 'jsx'", "x;", {
        options: { compilerOptions: { jsx: 1 }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'lib'", "x;", {
        options: { compilerOptions: { lib: ["es2015", "dom"] }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'locale'", "x;", {
        options: { compilerOptions: { locale: "en-us" }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'module'", "x;", {
        options: { compilerOptions: { module: ts.ModuleKind.CommonJS }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'moduleResolution'", "x;", {
        options: { compilerOptions: { moduleResolution: ts.ModuleResolutionKind.Node10 }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'newLine'", "x;", {
        options: { compilerOptions: { newLine: ts.NewLineKind.CarriageReturnLineFeed }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'noEmit'", "x;", {
        options: { compilerOptions: { noEmit: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'noEmitHelpers'", "x;", {
        options: { compilerOptions: { noEmitHelpers: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'noEmitOnError'", "x;", {
        options: { compilerOptions: { noEmitOnError: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'noErrorTruncation'", "x;", {
        options: { compilerOptions: { noErrorTruncation: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'noFallthroughCasesInSwitch'", "x;", {
        options: { compilerOptions: { noFallthroughCasesInSwitch: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'noImplicitAny'", "x;", {
        options: { compilerOptions: { noImplicitAny: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'noImplicitReturns'", "x;", {
        options: { compilerOptions: { noImplicitReturns: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'noImplicitThis'", "x;", {
        options: { compilerOptions: { noImplicitThis: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'noImplicitUseStrict'", "x;", {
        options: { compilerOptions: { noImplicitUseStrict: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'noLib'", "x;", {
        options: { compilerOptions: { noLib: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'noResolve'", "x;", {
        options: { compilerOptions: { noResolve: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'out'", "x;", {
        options: { compilerOptions: { out: "./out" }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'outDir'", "x;", {
        options: { compilerOptions: { outDir: "./outDir" }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'outFile'", "x;", {
        options: { compilerOptions: { outFile: "./outFile" }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'paths'", "x;", {
        options: { compilerOptions: { paths: { "*": ["./generated*"] } }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'preserveConstEnums'", "x;", {
        options: { compilerOptions: { preserveConstEnums: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'reactNamespace'", "x;", {
        options: { compilerOptions: { reactNamespace: "react" }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'jsxFactory'", "x;", {
        options: { compilerOptions: { jsxFactory: "createElement" }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'jsxFragmentFactory'", "x;", {
        options: { compilerOptions: { jsxFactory: "x", jsxFragmentFactory: "frag" }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'removeComments'", "x;", {
        options: { compilerOptions: { removeComments: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'rootDir'", "x;", {
        options: { compilerOptions: { rootDir: "./rootDir" }, fileName: "./rootDir/input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'rootDirs'", "x;", {
        options: { compilerOptions: { rootDirs: ["./a", "./b"] }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'skipLibCheck'", "x;", {
        options: { compilerOptions: { skipLibCheck: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'skipDefaultLibCheck'", "x;", {
        options: { compilerOptions: { skipDefaultLibCheck: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'strictNullChecks'", "x;", {
        options: { compilerOptions: { strictNullChecks: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'stripInternal'", "x;", {
        options: { compilerOptions: { stripInternal: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'suppressExcessPropertyErrors'", "x;", {
        options: { compilerOptions: { suppressExcessPropertyErrors: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'suppressImplicitAnyIndexErrors'", "x;", {
        options: { compilerOptions: { suppressImplicitAnyIndexErrors: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'target'", "x;", {
        options: { compilerOptions: { target: 2 }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'types'", "x;", {
        options: { compilerOptions: { types: ["jquery", "jasmine"] }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'typeRoots'", "x;", {
        options: { compilerOptions: { typeRoots: ["./folder"] }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'incremental'", "x;", {
        options: { compilerOptions: { incremental: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'composite'", "x;", {
        options: { compilerOptions: { composite: true }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports setting 'tsbuildinfo'", "x;", {
        options: { compilerOptions: { incremental: true, tsBuildInfoFile: "./folder/config.tsbuildinfo" }, fileName: "input.js", reportDiagnostics: true },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly(
        "Correctly serialize metadata when transpile with CommonJS option",
        `import * as ng from "angular2/core";` +
            `declare function foo(...args: any[]);` +
            `@foo` +
            `export class MyClass1 {` +
            `    constructor(private _elementRef: ng.ElementRef){}` +
            `}`,
        {
            options: {
                compilerOptions: {
                    target: ts.ScriptTarget.ES5,
                    module: ts.ModuleKind.CommonJS,
                    moduleResolution: ts.ModuleResolutionKind.Node10,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                },
            },
            testVerbatimModuleSyntax: true,
        },
    );

    transpilesCorrectly(
        "Correctly serialize metadata when transpile with System option",
        `import * as ng from "angular2/core";` +
            `declare function foo(...args: any[]);` +
            `@foo` +
            `export class MyClass1 {` +
            `    constructor(private _elementRef: ng.ElementRef){}` +
            `}`,
        {
            options: {
                compilerOptions: {
                    target: ts.ScriptTarget.ES5,
                    module: ts.ModuleKind.System,
                    moduleResolution: ts.ModuleResolutionKind.Node10,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    isolatedModules: true,
                },
            },
        },
    );

    transpilesCorrectly("Supports readonly keyword for arrays", "let x: readonly string[];", {
        options: { compilerOptions: { module: ts.ModuleKind.CommonJS } },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Supports 'as const' arrays", `([] as const).forEach(k => console.log(k));`, {
        options: { compilerOptions: { module: ts.ModuleKind.CommonJS } },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Infer correct file extension", `const fn = <T>(a: T) => a`, {
        noSetFileName: true,
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly(
        "Export star as ns conflict does not crash",
        `
var a;
export { a as alias };
export * as alias from './file';`,
        {
            noSetFileName: true,
            testVerbatimModuleSyntax: true,
        },
    );

    transpilesCorrectly(
        "Elides import equals referenced only by export type",
        `import IFoo = Namespace.IFoo;` +
            `export type { IFoo };`,
        {
            options: { compilerOptions: { module: ts.ModuleKind.CommonJS } },
        },
    );

    transpilesCorrectly(
        "Does not elide import equals referenced only by export type",
        `import IFoo = Namespace.IFoo;` +
            `export type { IFoo };`,
        {
            options: { compilerOptions: { module: ts.ModuleKind.CommonJS } },
            testVerbatimModuleSyntax: "only",
        },
    );

    transpilesCorrectly(
        "Elides import equals referenced only by type only export specifier",
        `import IFoo = Namespace.IFoo;` +
            `export { type IFoo };`,
        {
            options: { compilerOptions: { module: ts.ModuleKind.CommonJS } },
        },
    );

    transpilesCorrectly(
        "Does not elide import equals referenced only by type only export specifier",
        `import IFoo = Namespace.IFoo;` +
            `export { type IFoo };`,
        {
            options: { compilerOptions: { module: ts.ModuleKind.CommonJS } },
            testVerbatimModuleSyntax: "only",
        },
    );

    transpilesCorrectly("Can transpile .ts extensions without error", `import { foo } from "./foo.ts";`, {
        options: { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext } },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly("Ignores `allowImportingTsExtensions` without `noEmit` error", `import { foo } from "./foo.ts";`, {
        options: { compilerOptions: { module: ts.ModuleKind.ESNext, allowImportingTsExtensions: true, target: ts.ScriptTarget.ESNext } },
        testVerbatimModuleSyntax: true,
    });

    transpilesCorrectly(
        "Preserves exported const merged with type-only import",
        `
        import fooValue from "./values";
        import type {Foo} from "./types";

        const Foo: Foo = fooValue as any as Foo;

        export {Foo};
    `,
        {
            options: { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext } },
            testVerbatimModuleSyntax: true,
        },
    );

    transpilesCorrectly(
        "Elides re-export of type-only import",
        `
        import type { Foo } from "./types";
        export { Foo };
        `,
        {
            options: { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext } },
        },
    );

    transpilesCorrectly(
        "Syntactically string but non-evaluatable enum members do not get reverse mapping",
        // eslint-disable-next-line no-template-curly-in-string
        "import { BAR } from './bar'; enum Foo { A = `${BAR}` }",
        {
            options: { compilerOptions: { target: ts.ScriptTarget.ESNext } },
        },
    );
});
