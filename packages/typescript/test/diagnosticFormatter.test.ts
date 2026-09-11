import {
    API,
    flattenDiagnosticMessageText,
    formatDiagnostic,
    formatDiagnostics,
    formatDiagnosticsWithColorAndContext,
} from "@typescript/typescript/unstable/async";
import { createVirtualFileSystem } from "@typescript/typescript/unstable/fs";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";

describe("diagnosticFormatter", () => {
    test("formats diagnostics with a configured program host", async () => {
        const source = `const x: number = "oops";\n`;
        const api = spawnAPI({
            "/project/tsconfig.json": `{ "compilerOptions": { "strict": true, "newLine": "crlf" } }`,
            "/project/index.ts": source,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/project/tsconfig.json" });
            const program = snapshot.getProject("/project/tsconfig.json")!.program;
            const diagnostics = await program.getSemanticDiagnostics("/project/index.ts");
            assert.equal(diagnostics.length, 1);
            assert.equal(api.getCurrentDirectory(), "/workspace");
            assert.equal(api.getNewLine(), "\n");
            assert.equal(program.getCurrentDirectory(), "/project");
            assert.equal(program.getNewLine(), "\r\n");

            const plain = formatDiagnostics(diagnostics, program);
            assert.equal(
                plain,
                "index.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.\r\n",
            );

            const color = formatDiagnosticsWithColorAndContext(diagnostics, program);
            assert.ok(color.includes("TS2322: "), color);
            assert.ok(color.includes(source.trim()), color);
            assert.ok(color.includes("~"), color);
            assert.ok(color.includes("\x1b["), color);
            assert.ok(color.endsWith("\r\n"), color);
            const doubled = formatDiagnosticsWithColorAndContext([diagnostics[0], diagnostics[0]], program);
            assert.equal(doubled, color + "\r\n" + color);

            const zeroWidth = {
                ...diagnostics[0],
                end: diagnostics[0].pos,
                endPosition: diagnostics[0].startPosition!,
            };
            const zeroWidthColor = formatDiagnosticsWithColorAndContext([zeroWidth], program);
            assert.match(zeroWidthColor, /\x1b\[91m +~\x1b\[0m/);

            const relatedText = "Related information";
            const withRelated = {
                ...diagnostics[0],
                relatedInformation: [{ ...diagnostics[0], text: relatedText }],
            };
            const relatedColor = formatDiagnosticsWithColorAndContext([withRelated], program);
            const relatedMessage = relatedColor.indexOf(` - ${relatedText}`);
            assert.notEqual(relatedMessage, -1, relatedColor);
            assert.ok(relatedColor.indexOf(source.trim(), relatedMessage) > relatedMessage, relatedColor);

            const multiline = {
                ...diagnostics[0],
                startPosition: { line: 0, character: 0 },
                endPosition: { line: 6, character: 5 },
                sourceLines: [
                    { line: 0, text: "one\n" },
                    { line: 1, text: "two\n" },
                    { line: 5, text: "six\n" },
                    { line: 6, text: "seven" },
                ],
            };
            const multilineColor = formatDiagnosticsWithColorAndContext([multiline], program);
            assert.ok(multilineColor.includes("..."), multilineColor);
            assert.ok(multilineColor.includes("seven"), multilineColor);
        }
        finally {
            await api.close();
        }
    });

    test("uses the API host for standalone diagnostics", async () => {
        const configText = `{ "compilerOptions": { "target": "invalid" } }`;
        const api = spawnAPI({
            "/workspace/tsconfig.json": configText,
            "/workspace/index.ts": `const x: number = "oops";`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/workspace/tsconfig.json" });
            const program = snapshot.getProject("/workspace/tsconfig.json")!.program;
            const diagnostics = await program.getSemanticDiagnostics("/workspace/index.ts");
            const configDiagnostics = (await api.parseConfigFile("/workspace/tsconfig.json")).errors;
            const clonedDiagnostics = [
                [{ ...diagnostics[0] }],
                structuredClone(diagnostics),
                JSON.parse(JSON.stringify(diagnostics)),
            ];

            for (const cloned of clonedDiagnostics) {
                assert.ok(formatDiagnostics(cloned, api).includes("TS2322"));
            }
            assert.ok(formatDiagnostics(configDiagnostics, api).includes("tsconfig.json(1,34): error TS6046: "));
            assert.ok(formatDiagnosticsWithColorAndContext(configDiagnostics, api).includes(configText));
        }
        finally {
            await api.close();
        }
    });

    test("formatDiagnostic formats a single diagnostic and composes formatDiagnostics", async () => {
        const api = spawnAPI({
            "/workspace/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
            "/workspace/index.ts": `const x: number = "oops";\nconst y: string = 1;\n`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/workspace/tsconfig.json" });
            const program = snapshot.getProject("/workspace/tsconfig.json")!.program;
            const diagnostics = await program.getSemanticDiagnostics("/workspace/index.ts");
            assert.equal(diagnostics.length, 2);

            const first = formatDiagnostic(diagnostics[0], program);
            assert.equal(first, "index.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.\n");
            assert.equal(first + formatDiagnostic(diagnostics[1], program), formatDiagnostics(diagnostics, program));

            const { fileName: _, ...fileless } = diagnostics[0];
            assert.equal(formatDiagnostic(fileless, program), "error TS2322: Type 'string' is not assignable to type 'number'.\n");
        }
        finally {
            await api.close();
        }
    });

    test("flattenDiagnosticMessageText flattens a message chain with indentation", async () => {
        const api = spawnAPI({
            "/workspace/index.ts": `const x: number = "oops";`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openFiles: ["/workspace/index.ts"] });
            const project = await snapshot.getDefaultProjectForFile("/workspace/index.ts");
            const [diagnostic] = await project!.program.getSemanticDiagnostics("/workspace/index.ts");

            const chained = {
                ...diagnostic,
                text: "Top",
                messageChain: [
                    { ...diagnostic, text: "Mid", messageChain: [{ ...diagnostic, text: "Leaf", messageChain: [] }] },
                ],
            };
            assert.equal(flattenDiagnosticMessageText(chained, "\n"), "Top\n  Mid\n    Leaf");
            assert.equal(flattenDiagnosticMessageText(chained, "\r\n"), "Top\r\n  Mid\r\n    Leaf");
            assert.equal(flattenDiagnosticMessageText({ ...diagnostic, text: "Solo", messageChain: [] }, "\n", 1), "\n  Solo");

            const [formatted] = formatDiagnostics([chained], project!.program).split("\n").slice(0, 3);
            assert.ok(formatted.includes("Top"), formatted);
        }
        finally {
            await api.close();
        }
    });

    test("uses the API directory and LF defaults for inferred projects", async () => {
        const api = spawnAPI({
            "/workspace/index.ts": `const x: number = "oops";`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openFiles: ["/workspace/index.ts"] });
            const project = await snapshot.getDefaultProjectForFile("/workspace/index.ts");
            assert.ok(project);
            assert.equal(project.program.getCurrentDirectory(), api.getCurrentDirectory());
            assert.equal(project.program.getNewLine(), "\n");
        }
        finally {
            await api.close();
        }
    });
});

function spawnAPI(files: Record<string, string>): API {
    return new API({
        cwd: "/workspace",
        fs: createVirtualFileSystem(files),
    });
}
