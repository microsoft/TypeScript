import path from "node:path";
import { GeneratedFile } from "./generatedFile.mts";
import {
    formatFiles,
    goEnvironment,
    goInputs,
    parseGeneratorArgs,
    runGo,
} from "./utils.mts";

export default async function generateStringer(args: string[], cwd = process.cwd()) {
    const { values, positionals, toolArgs: stringerArgs, force } = parseGeneratorArgs(
        {
            type: { type: "string" },
            output: { type: "string" },
            trimprefix: { type: "string" },
            linecomment: { type: "boolean" },
            tags: { type: "string" },
            input: { type: "string" },
        },
        args,
        true,
    );
    const input = values.input ?? process.env.GOFILE;
    if (!values.type || !values.output || !input || positionals.length) {
        throw new Error("Usage: generateStringer.mts -type=Type -output=file.go [--input=source.go] [--force] (input defaults to GOFILE)");
    }
    const output = path.resolve(cwd, values.output);
    const inputs = [
        import.meta.filename,
        ...goInputs(),
        path.resolve(cwd, input),
    ];
    const generated = new GeneratedFile(output, inputs, undefined, [stringerArgs, goEnvironment()]);
    if (generated.isCurrent(force)) {
        console.log("Stringer output is up to date.");
        return;
    }

    generated.invalidate();
    await runGo(["tool", "golang.org/x/tools/cmd/stringer", ...stringerArgs], cwd);
    await formatFiles([output]);
    generated.markCurrent();
    console.log("Generated stringer output.");
}

if (process.argv[1] === import.meta.filename) {
    await generateStringer(process.argv.slice(2));
}
