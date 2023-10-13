import ts, {
    DocumentRegistry,
    Path,
    SourceFile,
} from "typescript";

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

export interface ExternalDocumentCache {
    setDocument(key: string, path: Path, sourceFile: SourceFile): void;
    getDocument(key: string, path: Path): SourceFile | undefined;
}
const cache = new Map<string, Map<string, SourceFile>>();
const isCashablePath = (path: string) => path.startsWith("/.ts") || path.startsWith("/.lib");
const registry: ExternalDocumentCache = {
    getDocument(key, path) {
        if (!isCashablePath(path)) return;
        const sourceFile = cache.get(key)?.get(path);
        return sourceFile;
    },
    setDocument(key, path, sourceFile) {
        if (!isCashablePath(path)) return;
        let byKey = cache.get(key);
        if (!byKey) {
            cache.set(key, byKey = new Map());
        }
        byKey.set(path, sourceFile);
    },
};
const createDocumentRegistryInternal: (...a: [...a: Parameters<typeof ts.createDocumentRegistry>, externalCache?: ExternalDocumentCache]) => DocumentRegistry = (ts as any).createDocumentRegistryInternal;

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
        createDocumentRegistryInternal(
            host.useCaseSensitiveFileNames(),
            host.getCurrentDirectory(),
            /*jsDocParsingMode*/ undefined,
            registry,
        ),
        snapShotRegistry,
        isolatedDeclarationsErrors,
        { includeRelativeTypeFixes: false, includeInlineTypeFixes: false },
        () => 0,
    );

    return toBeCompiled.map(unit => ({
        ...unit,
        content: fs.readFileSync(unit.unitName, "utf-8"),
    }));
}
