///<reference path="fourslash.ts" />
///<reference path="harness.ts"/>
///<reference path="runnerbase.ts" />
/* tslint:disable:no-null */

const enum FourSlashTestType {
    Native,
    Shims,
    ShimsWithPreprocess,
    Server
}

class FourSlashRunner extends RunnerBase {
    protected basePath: string;
    protected testSuiteName: string;

    constructor(private testType: FourSlashTestType) {
        super();
        switch (testType) {
            case FourSlashTestType.Native:
                this.basePath = "tests/cases/fourslash";
                this.testSuiteName = "fourslash";
                break;
            case FourSlashTestType.Shims:
                this.basePath = "tests/cases/fourslash/shims";
                this.testSuiteName = "fourslash-shims";
                break;
            case FourSlashTestType.ShimsWithPreprocess:
                this.basePath = "tests/cases/fourslash/shims-pp";
                this.testSuiteName = "fourslash-shims-pp";
                break;
            case FourSlashTestType.Server:
                this.basePath = "tests/cases/fourslash/server";
                this.testSuiteName = "fourslash-server";
                break;
        }
    }

    public initializeTests() {
        if (this.tests.length === 0) {
            this.tests = this.enumerateFiles(this.basePath, /\.ts/i, { recursive: false });
        }

        describe(this.testSuiteName + " tests", () => {
            this.tests.forEach((fn: string) => {
                 describe(fn, () => {
                       fn = ts.normalizeSlashes(fn);
                        const justName = fn.replace(/^.*[\\\/]/, "");

                        // Convert to relative path
                        const testIndex = fn.indexOf("tests/");
                        if (testIndex >= 0) fn = fn.substr(testIndex);

                        if (justName && !justName.match(/fourslash\.ts$/i) && !justName.match(/\.d\.ts$/i)) {
                            it(this.testSuiteName + " test " + justName + " runs correctly", () => {
                                FourSlash.runFourSlashTest(this.basePath, this.testType, fn);
                        });
                    }
                });
            });

            describe("Generate Tao XML", () => {
                const invalidReasons: any = {};
                FourSlash.xmlData.forEach(xml => {
                    if (xml.invalidReason !== null) {
                        invalidReasons[xml.invalidReason] = (invalidReasons[xml.invalidReason] || 0) + 1;
                    }
                });
                const invalidReport: { reason: string; count: number }[] = [];
                for (const reason in invalidReasons) {
                    if (invalidReasons.hasOwnProperty(reason)) {
                        invalidReport.push({ reason: reason, count: invalidReasons[reason] });
                    }
                }
                invalidReport.sort((lhs, rhs) => lhs.count > rhs.count ? -1 : lhs.count === rhs.count ? 0 : 1);

                const lines: string[] = [];
                lines.push("<!-- Blocked Test Report");
                invalidReport.forEach((reasonAndCount) => {
                    lines.push(reasonAndCount.count + " tests blocked by " + reasonAndCount.reason);
                });
                lines.push("-->");
                lines.push("<TaoTest xmlns=\"http://microsoft.com/schemas/VSLanguages/TAO\">");
                lines.push("    <InitTest>");
                lines.push("        <StartTarget />");
                lines.push("    </InitTest>");
                lines.push("    <ScenarioList>");
                FourSlash.xmlData.forEach(xml => {
                    if (xml.invalidReason !== null) {
                        lines.push("<!-- Skipped " + xml.originalName + ", reason: " + xml.invalidReason + " -->");
                    }
                    else {
                        lines.push("        <Scenario Name=\"" + xml.originalName + "\">");
                        xml.actions.forEach(action => {
                            lines.push("            " + action);
                        });
                        lines.push("        </Scenario>");
                    }
                });
                lines.push("    </ScenarioList>");
                lines.push("    <CleanupScenario>");
                lines.push("        <CloseAllDocuments />");
                lines.push("        <CleanupCreatedFiles />");
                lines.push("    </CleanupScenario>");
                lines.push("    <CleanupTest>");
                lines.push("        <CloseTarget />");
                lines.push("    </CleanupTest>");
                lines.push("</TaoTest>");
                Harness.IO.writeFile("built/local/fourslash.xml", lines.join("\r\n"));
            });
        });
    }
}

class GeneratedFourslashRunner extends FourSlashRunner {
    constructor(testType: FourSlashTestType) {
        super(testType);
        this.basePath += "/generated/";
    }
}
