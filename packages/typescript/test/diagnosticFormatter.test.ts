import {
    API,
    formatDiagnostics,
    type FormatDiagnosticsHost,
    formatDiagnosticsWithColorAndContext,
} from "@typescript/typescript/async";
import { toRootedFilePath } from "@typescript/typescript/path";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import {
    areTestsFiltered,
    createVirtualFileSystem,
} from "./testUtils.ts";

describe("diagnosticFormatter", { concurrency: areTestsFiltered() }, () => {
    test("formats diagnostics with a configured program host", async () => {
        const source = `const x: number = "oops";\n`;
        const api = spawnAPI({
            "/project/tsconfig.json": `{ "compilerOptions": { "strict": true, "newLine": "crlf" } }`,
            "/project/index.ts": source,
        });
        try {
            const snapshot = await api.createSnapshot({ openProjects: ["/project/tsconfig.json"] });
            const program = snapshot.getConfiguredProject("/project/tsconfig.json")!.program;
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
            for (const directory of ["/project", "/project/src/..", "\\project\\src\\.."]) {
                const stringHost: FormatDiagnosticsHost = {
                    getCurrentDirectory: () => directory,
                    getCanonicalFileName: fileName => fileName,
                    getNewLine: () => "\r\n",
                };
                assert.equal(formatDiagnostics(diagnostics, stringHost), plain);
                assert.equal(formatDiagnosticsWithColorAndContext(diagnostics, stringHost), color);
            }
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
            const snapshot = await api.createSnapshot({ openProjects: ["/workspace/tsconfig.json"] });
            const program = snapshot.getConfiguredProject("/workspace/tsconfig.json")!.program;
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

    test("formats related information with or without source locations", () => {
        const host: FormatDiagnosticsHost = {
            getCurrentDirectory: () => "/project",
            getCanonicalFileName: fileName => fileName,
            getNewLine: () => "\r\n",
        };
        const diagnostic = {
            category: 1,
            code: 2322,
            pos: 0,
            end: 1,
            text: "Primary error.",
        };
        const located = {
            category: 3,
            code: 9998,
            pos: 0,
            end: 1,
            fileName: toRootedFilePath("/project/related.ts", undefined),
            startPosition: { line: 0, character: 0 },
            endPosition: { line: 0, character: 1 },
            sourceLines: [{ line: 0, text: "x" }],
            text: "Located explanation.",
        };
        const locationless = {
            category: 3,
            code: 9999,
            pos: 0,
            end: 0,
            text: "This related explanation must remain visible.",
            messageChain: [{
                category: 3,
                code: 9999,
                pos: 0,
                end: 0,
                text: "Nested explanation.",
                messageChain: [{
                    category: 3,
                    code: 9999,
                    pos: 0,
                    end: 0,
                    text: "Most specific explanation.",
                }],
            }],
        };
        const stripColors = (text: string) => text.replace(/\x1b\[[0-9;]*m/g, "");

        const output = stripColors(formatDiagnosticsWithColorAndContext([{
            ...diagnostic,
            relatedInformation: [located, locationless],
        }], host));
        assert.ok(output.includes(" - Located explanation."), output);
        assert.ok(output.includes("related.ts:1:1"), output);
        assert.ok(output.includes("1 x\r\n      ~"), output);
        assert.ok(output.includes("  This related explanation must remain visible.\r\n    Nested explanation.\r\n      Most specific explanation."), output);

        const locationlessOnly = stripColors(formatDiagnosticsWithColorAndContext([{
            ...diagnostic,
            relatedInformation: [locationless],
        }], host));
        assert.ok(locationlessOnly.includes("Primary error."), locationlessOnly);
        assert.ok(locationlessOnly.includes("This related explanation must remain visible."), locationlessOnly);
        assert.ok(locationlessOnly.includes("\r\n    Nested explanation.\r\n      Most specific explanation."), locationlessOnly);
        const lfHost = { ...host, getNewLine: () => "\n" };
        const lfOutput = stripColors(formatDiagnosticsWithColorAndContext([{
            ...diagnostic,
            relatedInformation: [locationless],
        }], lfHost));
        assert.ok(lfOutput.includes("\n    Nested explanation.\n      Most specific explanation."), lfOutput);

        const partialLocations = stripColors(formatDiagnosticsWithColorAndContext([{
            ...diagnostic,
            relatedInformation: [
                { ...locationless, fileName: toRootedFilePath("/project/related.ts", undefined) },
                { ...locationless, startPosition: { line: 0, character: 0 } },
                {
                    ...locationless,
                    startPosition: { line: 0, character: 0 },
                    endPosition: { line: 0, character: 1 },
                    sourceLines: [{ line: 0, text: "x" }],
                },
            ],
        }], host));
        assert.equal((partialLocations.match(/This related explanation must remain visible\./g) ?? []).length, 3, partialLocations);
        assert.ok(!partialLocations.includes("related.ts:1:1"), partialLocations);
        assert.ok(partialLocations.includes("1 x\r\n      ~"), partialLocations);

        for (const relatedInformation of [undefined, []]) {
            const withoutRelated = stripColors(formatDiagnosticsWithColorAndContext([{
                ...diagnostic,
                relatedInformation,
            }], host));
            assert.equal(withoutRelated, "error TS2322: Primary error.");
        }
    });

    test("uses the API directory and LF defaults for inferred projects", async () => {
        const api = spawnAPI({
            "/workspace/index.ts": `const x: number = "oops";`,
        });
        try {
            const snapshot = await api.createSnapshot({ openFiles: ["/workspace/index.ts"] });
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
