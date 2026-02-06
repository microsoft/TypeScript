import {
    Baseline,
    Compiler,
    getFileBasedTestConfigurations,
    IO,
    RunnerBase,
    TestCaseParser,
    TestRunnerKind,
} from "./_namespaces/Harness.js";
import * as ts from "./_namespaces/ts.js";
import * as vpath from "./_namespaces/vpath.js";

export class TranspileRunner extends RunnerBase {
    protected basePath = "tests/cases/transpile";
    protected testSuiteName: TestRunnerKind = "transpile";

    public enumerateTestFiles(): string[] {
        // see also: `enumerateTestFiles` in tests/webTestServer.ts
        return this.enumerateFiles(this.basePath, /\.[cm]?[tj]sx?/i, { recursive: true });
    }

    public kind(): TestRunnerKind {
        return this.testSuiteName;
    }

    public initializeTests(): void {
        if (this.tests.length === 0) {
            this.tests = IO.enumerateTestFiles(this);
        }

        describe(this.testSuiteName + " tests", () => {
            this.tests.forEach(file => {
                file = vpath.normalizeSeparators(file);
                describe(file, () => {
                    const tests = TranspileTestCase.getConfigurations(file);
                    for (const test of tests) {
                        test.run();
                    }
                });
            });
        });
    }
}

enum TranspileKind {
    Module,
    Declaration,
}

class TranspileTestCase {
    static varyBy = [
        "declarationMap",
        "sourceMap",
        "inlineSourceMap",
    ];

    static getConfigurations(file: string): TranspileTestCase[] {
        const ext = vpath.extname(file);
        const baseName = vpath.basename(file);
        const justName = baseName.slice(0, baseName.length - ext.length);
        const content = IO.readFile(file)!;
        const settings = TestCaseParser.extractCompilerSettings(content);
        const settingConfigurations = getFileBasedTestConfigurations(settings, TranspileTestCase.varyBy);
        return settingConfigurations?.map(c => {
            const desc = Object.entries(c).map(([key, value]) => `${key}=${value}`).join(",");
            return new TranspileTestCase(`${justName}(${desc})`, ext, content, { ...settings, ...c });
        }) ?? [new TranspileTestCase(justName, ext, content, settings)];
    }

    private jsOutName;
    private dtsOutName;
    private units;
    constructor(
        private justName: string,
        private ext: string,
        private content: string,
        private settings: TestCaseParser.CompilerSettings,
    ) {
        this.jsOutName = justName + this.getJsOutputExtension(`${justName}${ext}`);
        this.dtsOutName = justName + ts.getDeclarationEmitExtensionForPath(`${justName}${ext}`);
        this.units = TestCaseParser.makeUnitsFromTest(content, `${justName}${ext}`, settings);
    }

    getJsOutputExtension(name: string) {
        return ts.getOutputExtension(name, { jsx: this.settings.jsx === "preserve" ? ts.JsxEmit.Preserve : undefined });
    }

    runKind(kind: TranspileKind) {
        it(`transpile test ${this.justName} has expected ${kind === TranspileKind.Module ? "js" : "declaration"} output`, () => {
            let baselineText = "";

            // include inputs in output so how the test is parsed and broken down is more obvious
            this.units.testUnitData.forEach(unit => {
                baselineText += `//// [${unit.name}] ////\r\n`;
                baselineText += unit.content;
                if (!unit.content.endsWith("\n")) {
                    baselineText += "\r\n";
                }
            });

            this.units.testUnitData.forEach(unit => {
                const opts: ts.CompilerOptions = {};
                Compiler.setCompilerOptionsFromHarnessSetting(this.settings, opts);
                const result = (kind === TranspileKind.Module ? ts.transpileModule : ts.transpileDeclaration)(unit.content, { compilerOptions: opts, fileName: unit.name, reportDiagnostics: this.settings.reportDiagnostics === "true" });

                baselineText += `//// [${ts.changeExtension(unit.name, kind === TranspileKind.Module ? this.getJsOutputExtension(unit.name) : ts.getDeclarationEmitExtensionForPath(unit.name))}] ////\r\n`;
                baselineText += result.outputText;
                if (!result.outputText.endsWith("\n")) {
                    baselineText += "\r\n";
                }
                if (result.sourceMapText) {
                    baselineText += `//// [${ts.changeExtension(unit.name, kind === TranspileKind.Module ? this.getJsOutputExtension(unit.name) : ts.getDeclarationEmitExtensionForPath(unit.name))}.map] ////\r\n`;
                    baselineText += result.sourceMapText;
                    if (!result.outputText.endsWith("\n")) {
                        baselineText += "\r\n";
                    }
                }
                if (result.diagnostics && result.diagnostics.length) {
                    baselineText += "\r\n\r\n//// [Diagnostics reported]\r\n";
                    baselineText += Compiler.getErrorBaseline([{ content: unit.content, unitName: unit.name }], result.diagnostics, !!opts.pretty);
                    if (!baselineText.endsWith("\n")) {
                        baselineText += "\r\n";
                    }
                }
            });

            Baseline.runBaseline(`transpile/${kind === TranspileKind.Module ? this.jsOutName : this.dtsOutName}`, baselineText);
        });
    }

    run() {
        if (!this.settings.emitDeclarationOnly) {
            this.runKind(TranspileKind.Module);
        }
        if (this.settings.declaration) {
            this.runKind(TranspileKind.Declaration);
        }
    }
}
