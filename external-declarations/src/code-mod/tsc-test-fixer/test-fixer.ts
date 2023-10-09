import ts from "typescript";

import {
    prepareTestOptionsAndFs,
    setCompilerOptionsFromHarnessSetting,
    TestFile,
} from "../../test-runner/tsc-infrastructure/compiler-run";
import * as fake from "../../test-runner/tsc-infrastructure/fakesHosts";
import {
    TestUnitData,
} from "../../test-runner/tsc-infrastructure/test-file-parser";
import {
    TestCaseWithBOM,
} from "../../test-runner/utils";
import {
    createLanguageHost,
    fixProjectRaw,
} from "../fixer/code-fixer-applier";
import {
    isolatedDeclarationsErrors,
} from "../fixer/isolated-declarations-errors";
import {
    createSnapshotRegistry,
} from "../fixer/snapshots";

export async function fixTestCase(caseData: TestCaseWithBOM, settings: ts.CompilerOptions) {
    settings = { ...settings };
    setCompilerOptionsFromHarnessSetting(caseData.settings, settings);

    function createHarnessTestFile(lastUnit: TestUnitData): TestFile {
        return { unitName: lastUnit.name, content: lastUnit.content, fileOptions: lastUnit.fileOptions };
    }

    const toBeCompiled = caseData.testUnitData.map(unit => {
        return createHarnessTestFile(unit);
    });

    try {
        return await fixTestFiles(toBeCompiled, settings);
    }
    catch (e) {
        return e as Error;
    }
}

async function fixTestFiles(toBeCompiled: TestFile[], settings: ts.CompilerOptions) {
    const { fs, options, programFileNames } = prepareTestOptionsAndFs(
        toBeCompiled,
        [],
        {
            declaration: "true",
            isolatedDeclarations: "true",
            removeComments: "false",
        },
        settings,
        /**currentDirectory=*/ undefined,
    );
    const host = new fake.CompilerHost(fs, options);

    const snapShotRegistry = createSnapshotRegistry(host);
    const langHost = createLanguageHost(snapShotRegistry, {
        fileNames: programFileNames,
        options,
        errors: [],
    }, host);

    await fixProjectRaw(
        langHost,
        /*documentRegistry*/ undefined,
        snapShotRegistry,
        isolatedDeclarationsErrors,
        async () => 0,
    );

    return toBeCompiled.map(unit => ({
        ...unit,
        content: fs.readFileSync(unit.unitName, "utf-8"),
    }));
}
