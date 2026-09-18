import path from "node:path";
import { GeneratedFile } from "./generatedFile.mts";
import {
    formatFiles,
    globInputs,
    goInputs,
    parseGeneratorArgs,
    repoRoot,
    runGo,
} from "./utils.mts";

export default async function generateAPI(force = false) {
    const inputs = globInputs([
        "tsc/internal/api/*.go",
        "tsc/internal/api/requestfilesystem/*.go",
        "tsc/internal/core/*.go",
        "tsc/internal/checker/types.go",
        "tsc/internal/diagnostics/diagnostics.go",
        "tsc/internal/tspath/path.go",
        "tools/gen-proto/*.go",
    ], ["**/*_test.go", "**/*_generated.go"]);
    const generated = new GeneratedFile(path.join(repoRoot, "packages/typescript/src/api/proto.generated.ts"), [import.meta.filename, ...goInputs(), ...inputs]);
    if (generated.isCurrent(force)) {
        console.log("API protocol is up to date.");
        return;
    }

    generated.invalidate();
    console.log("Generating API protocol...");
    await runGo(["-C", "./tools", "run", "./gen-proto", "../tsc/internal/api/proto.go", generated.fileName]);
    await formatFiles([generated.fileName]);
    generated.markCurrent();
    console.log("Generated API protocol.");
}

if (process.argv[1] === import.meta.filename) {
    await generateAPI(parseGeneratorArgs({}).force);
}
