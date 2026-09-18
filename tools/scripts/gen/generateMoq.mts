import path from "node:path";
import { GeneratedFile } from "./generatedFile.mts";
import {
    formatFiles,
    goEnvironment,
    goInputs,
    parseGeneratorArgs,
    runGo,
} from "./utils.mts";

export default async function generateMoq(args: string[], cwd = process.cwd()) {
    const { values, positionals, toolArgs: moqArgs, force } = parseGeneratorArgs(
        {
            out: { type: "string" },
            pkg: { type: "string" },
            fmt: { type: "string" },
            stub: { type: "boolean" },
            input: { type: "string", multiple: true },
        },
        args,
        true,
    );
    if (!values.out || !values.input?.length || positionals.length < 2) {
        throw new Error("Usage: generateMoq.mts --input=source.go -out=mock.go [moq options] [--force] <source directory> <interfaces...>");
    }
    const inputs = [
        import.meta.filename,
        ...goInputs(),
        ...values.input.map(file => path.resolve(cwd, file)),
        ...(process.env.GOFILE ? [path.resolve(cwd, process.env.GOFILE)] : []),
    ];
    const generated = new GeneratedFile(path.resolve(cwd, values.out), inputs, undefined, [moqArgs, goEnvironment()]);
    if (generated.isCurrent(force)) {
        console.log("Moq output is up to date.");
        return;
    }

    generated.invalidate();
    await runGo(["tool", "github.com/matryer/moq", ...moqArgs], cwd);
    await formatFiles([generated.fileName]);
    generated.markCurrent();
    console.log("Generated moq output.");
}

if (process.argv[1] === import.meta.filename) {
    await generateMoq(process.argv.slice(2));
}
