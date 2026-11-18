import {
    API,
    type Diagnostic,
    flattenDiagnosticMessage,
    formatDiagnostics,
    type FormatDiagnosticsHost,
    formatDiagnosticsWithColorAndContext,
    sortAndDeduplicateDiagnostics,
} from "@typescript/typescript/async";
import {
    flattenDiagnosticMessage as flattenDiagnosticMessageSync,
    sortAndDeduplicateDiagnostics as sortAndDeduplicateDiagnosticsSync,
} from "@typescript/typescript/sync";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import { toRootedFilePath } from "../src/api/path.ts";
import {
    areTestsFiltered,
    createVirtualFileSystem,
} from "./testUtils.ts";

describe("sortAndDeduplicateDiagnostics", () => {
    const diagnostic: Diagnostic = { pos: -1, end: -1, code: 1, category: 1, text: "Error" };

    test("sorts by file, location, code, category, source, and text without mutating input", () => {
        const firstFile = { ...diagnostic, fileName: toRootedFilePath("/A.ts", undefined), pos: 0, end: 1 };
        const expected = [
            diagnostic,
            firstFile,
            { ...firstFile, text: "Other error" },
            { ...firstFile, source: "plugin" },
            { ...firstFile, category: 2 },
            { ...firstFile, code: 2 },
            { ...firstFile, end: 2 },
            { ...firstFile, pos: 1, end: 2 },
            { ...firstFile, fileName: toRootedFilePath("/a.ts", undefined) },
        ].map((item, index) => ({ ...item, index }));
        const input = Object.freeze([...expected].reverse());
        for (const sort of [sortAndDeduplicateDiagnostics, sortAndDeduplicateDiagnosticsSync]) {
            const result = sort(input);
            assert.deepEqual(result.map(item => item.index), expected.map(item => item.index));
            assert.ok(result.every((item, index) => item === expected[index]));
            assert.deepEqual(input, [...expected].reverse());
            assert.deepEqual(sort([]), []);
            assert.deepEqual(sort([diagnostic, structuredClone(diagnostic)]), [diagnostic]);
        }
    });

    test("orders message chains by shape before content without dropping distinct chains", () => {
        const child = { ...diagnostic, text: "Child" };
        const shallow = { ...diagnostic, messageChain: [child] };
        const deep = { ...diagnostic, messageChain: [{ ...child, text: "Z", messageChain: [child] }] };
        const wide = { ...diagnostic, messageChain: [child, child] };
        for (const sort of [sortAndDeduplicateDiagnostics, sortAndDeduplicateDiagnosticsSync]) {
            assert.deepEqual(sort([diagnostic, shallow, deep]), [deep, shallow, diagnostic]);
            assert.deepEqual(sort([deep, wide]), [wide, deep]);
            const earlierText = { ...shallow, messageChain: [{ ...child, text: "A" }] };
            assert.deepEqual(sort([shallow, earlierText]), [earlierText, shallow]);
            const deeperSecondChild = {
                ...wide,
                messageChain: [child, { ...child, messageChain: [child] }],
            };
            assert.deepEqual(sort([wide, deeperSecondChild]), [deeperSecondChild, wide]);
            assert.deepEqual(sort([deep, structuredClone(deep)]), [deep]);
            assert.deepEqual(sort([diagnostic, { ...diagnostic, messageChain: [] }]), [diagnostic]);
            const differentCode = { ...shallow, messageChain: [{ ...child, code: 2 }] };
            assert.equal(sort([shallow, differentCode]).length, 2);
        }
    });

    test("orders related information without dropping distinct details and stably deduplicates", () => {
        const related = { ...diagnostic, text: "Related" };
        const detailed = { ...diagnostic, relatedInformation: [related] };
        const moreDetailed = { ...diagnostic, relatedInformation: [related, related] };
        const earlierRelated = { ...detailed, relatedInformation: [{ ...related, text: "Earlier" }] };
        for (const sort of [sortAndDeduplicateDiagnostics, sortAndDeduplicateDiagnosticsSync]) {
            assert.deepEqual(sort([diagnostic, detailed, moreDetailed]), [moreDetailed, detailed, diagnostic]);
            assert.deepEqual(sort([detailed, earlierRelated]), [earlierRelated, detailed]);
            const duplicate = structuredClone(detailed);
            assert.equal(sort([detailed, duplicate])[0], detailed);
            assert.equal(sort([duplicate, detailed])[0], duplicate);
        }
    });
});

describe("diagnosticFormatter", { concurrency: areTestsFiltered() }, () => {
    test("flattens diagnostic message chains with configurable newlines and indentation", () => {
        const diagnostic: Diagnostic = {
            pos: -1,
            end: -1,
            code: 1,
            category: 1,
            text: "Root",
        };
        const child = { ...diagnostic, text: "Child", messageChain: [{ ...diagnostic, text: "Grandchild" }] };
        const chained = { ...diagnostic, messageChain: [child, { ...diagnostic, text: "Sibling" }] };
        for (const flatten of [flattenDiagnosticMessage, flattenDiagnosticMessageSync]) {
            assert.equal(flatten(diagnostic, "\n"), "Root");
            assert.equal(flatten(chained, "\r\n"), "Root\r\n  Child\r\n    Grandchild\r\n  Sibling");
            assert.equal(flatten(chained, "\n", 1), "\n  Root\n    Child\n      Grandchild\n    Sibling");
        }
    });

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
