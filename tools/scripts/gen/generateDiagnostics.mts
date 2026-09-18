import * as fs from "node:fs";
import path from "node:path";
import { GeneratedFile } from "./generatedFile.mts";
import {
    formatFiles,
    globInputs,
    goEnvironment,
    goInputs,
    parseGeneratorArgs,
    repoRoot,
    runGo,
} from "./utils.mts";

const sourceDirectory = path.join(repoRoot, "tsc/internal/diagnostics");

export default async function generateDiagnostics(force = false, outDir = sourceDirectory) {
    outDir = path.resolve(outDir);
    const inputs = [
        import.meta.filename,
        path.join(sourceDirectory, "generate.go"),
        path.join(sourceDirectory, "diagnosticMessages.json"),
        path.join(sourceDirectory, "extraDiagnosticMessages.json"),
        ...goInputs(),
        ...globInputs([
            "tsc/internal/{collections,json}/*.go",
            "tsc/internal/locale/lcl/*/diagnosticMessages/diagnosticMessages.generated.json.lcl",
        ], ["**/*_test.go"]),
    ];
    const environment = goEnvironment();
    const generated = new GeneratedFile(path.join(outDir, "diagnostics_generated.go"), inputs, undefined, environment);
    const localized = new GeneratedFile(path.join(outDir, "loc_generated.go"), inputs, undefined, environment);
    const goFiles = [generated, localized];
    const localeFiles = () =>
        [...fs.readFileSync(localized.fileName, "utf8").matchAll(/^\/\/go:embed (loc\/[^\r\n]+\.json\.gz)\r?$/gm)]
            .map(match => new GeneratedFile(path.join(outDir, match[1]), inputs, undefined, environment));
    if (goFiles.every(file => file.isCurrent(force))) {
        const locales = localeFiles();
        if (locales.length === fs.globSync("loc/*.json.gz", { cwd: outDir }).length && locales.every(file => file.isCurrent())) {
            console.log("Diagnostics are up to date.");
            return;
        }
    }

    for (const file of goFiles) file.invalidate();
    fs.mkdirSync(outDir, { recursive: true });
    await runGo(["run", "generate.go", "-diagnostics", generated.fileName, "-loc", localized.fileName, "-locdir", path.join(outDir, "loc")], sourceDirectory);
    await formatFiles(goFiles.map(file => file.fileName));
    for (const file of [...localeFiles(), ...goFiles]) file.markCurrent();
    console.log("Generated diagnostics.");
}

if (process.argv[1] === import.meta.filename) {
    const { values, force } = parseGeneratorArgs({ outDir: { type: "string" } });
    await generateDiagnostics(force, values.outDir);
}
