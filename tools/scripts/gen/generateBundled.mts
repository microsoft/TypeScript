import * as fs from "node:fs";
import path from "node:path";
import { GeneratedFile } from "./generatedFile.mts";
import {
    goEnvironment,
    goInputs,
    parseGeneratorArgs,
    repoRoot,
    runGo,
} from "./utils.mts";

const sourceDirectory = path.join(repoRoot, "tsc/internal/bundled");

export default async function generateBundled(force = false, directory = sourceDirectory) {
    directory = path.resolve(directory);
    const entries = fs.readdirSync(path.join(directory, "libs"), { withFileTypes: true }).sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0);
    const inputs = [
        import.meta.filename,
        path.join(sourceDirectory, "generate.go"),
        path.join(directory, "CopyrightNotice.txt"),
        ...entries.filter(entry => !entry.isDirectory()).map(entry => path.join(directory, "libs", entry.name)),
        ...goInputs(),
    ];
    const key = [goEnvironment(), entries.map(entry => [entry.name, entry.isDirectory()])];
    const generatedFiles = ["libs_generated.go", "embed_generated.go"].map(file => new GeneratedFile(path.join(directory, file), inputs, undefined, key));
    if (generatedFiles.every(file => file.isCurrent(force))) {
        console.log("Bundled libraries are up to date.");
        return;
    }

    for (const file of generatedFiles) file.invalidate();
    await runGo(["run", path.join(sourceDirectory, "generate.go")], directory);
    for (const file of generatedFiles) file.markCurrent();
    console.log("Generated bundled libraries.");
}

if (process.argv[1] === import.meta.filename) {
    const { values, force } = parseGeneratorArgs({ directory: { type: "string" } });
    await generateBundled(force, values.directory);
}
