import chalk from "chalk";
import inquirer from "inquirer";
import * as os from "os";
import type {
    ClassificationType,
    CodeFixAction,
    Diagnostic,
    LanguageService,
} from "typescript";
import ts from "typescript";

import {
    BasicAbortSignal,
} from "./code-fixer-applier";
import {
    isolatedDeclarationsErrors,
} from "./isolated-declarations-errors";
import {
    VersionedFileRegistry,
} from "./snapshots";
import {
    printDiagnostics,
} from "./utils";

const cachedSpans: Record<string, Record<number, string | undefined>> = {};
function getString(s: string, length: number) {
    return ((cachedSpans[s] ??= {})[length] ??= s.repeat(length));
}

export async function interactiveFixSelector(service: LanguageService, diag: Diagnostic, fixes: readonly CodeFixAction[], docs: VersionedFileRegistry, signal: BasicAbortSignal) {
    clearScreen();
    await printCode(service, diag);
    printDiagnostics(diag);
    const allDiags = service.getProgram()?.getDeclarationDiagnostics();
    console.log(`Remaining errors ${allDiags?.length}`);

    const updateFile = docs.updateFromDisk;
    docs.updateFromDisk = fileName => {
        const existingVersion = docs.getSnapshot(fileName);
        const newSnapShot = updateFile.call(docs, fileName);
        if (newSnapShot?.version !== existingVersion?.version) {
            signal.isAborted = true;
        }
        return newSnapShot;
    };
    try {
        const result = inquirer.prompt([
            {
                type: "list",
                name: "fix",
                message: "Select fix:",
                default: -1,
                choices: [
                    ...fixes.map((f, index) => ({
                        value: index,
                        name: f.description.replaceAll("\n", " "),
                    })),
                    { name: "Skip", value: -1 },
                ],
            },
        ]);
        await waitOrAbortPrompt(result, signal);
        if (signal.isAborted) {
            return undefined;
        }
        const selectedFix: number = (await result).fix;
        return selectedFix;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        docs.updateFromDisk = updateFile;
    }

    async function waitOrAbortPrompt(prompt: ReturnType<typeof inquirer.prompt>, signal: BasicAbortSignal): Promise<any> {
        while (!signal.isAborted) {
            const result = await Promise.race([delay(500), prompt]);
            if (signal.isAborted) {
                // Undocumented API
                (prompt as any).ui.rl.emit("line");
                return prompt;
            }
            if (result !== undefined) {
                return result;
            }
        }
    }
}

const clearScreen = () => {
    console.log("\x1b[2J");
};

function delay(ms: number): Promise<void> {
    // eslint-disable-next-line no-restricted-globals
    return new Promise(r => setTimeout(r, ms));
}

function printCode(service: LanguageService, diag: Diagnostic) {
    const text = diag.file?.text!;
    const endDiag = diag.start! + diag.length!;
    const startDiag = diag.start!;
    const { start, length } = computePrintStartSpan();
    const classifications = service.getEncodedSyntacticClassifications(diag.file?.fileName!, { start, length });
    printSpans(start, length, text, classifications.spans);

    function computePrintStartSpan() {
        const [, maxLines] = process.stdout.getWindowSize();
        const usableLines = maxLines - 6;
        const lineSpan = Math.round(usableLines / 3);
        const [start, startLineCount] = skipLines(diag.start ?? 0, lineSpan, "up", 0);

        const suggestedEnd = diag.start ?? 0;
        const [end] = skipLines(suggestedEnd, usableLines - startLineCount, "down", text.length);
        return { start, length: end - start };
    }
    function skipLines(pos: number, count: number, dir: "up" | "down", defaultPos: number) {
        let skippedLines = 0;
        while (count >= skippedLines) {
            // Lines with errors take 2 screen lines
            skippedLines += (startDiag <= pos && pos <= endDiag) ? 2 : 1;
            pos = dir === "up" ?
                text.lastIndexOf("\n", pos - 1) :
                text.indexOf("\n", pos + 1);
            if (pos === -1) {
                return [defaultPos, skippedLines] as const;
            }
        }
        return [dir === "up" ? pos + 1 : pos - 1, skippedLines] as const;
    }
    function printSpans(start: number, length: number, text: string, spans: number[]) {
        let pos = start;
        const printEnd = start + length;
        let lineStart = pos;
        function areSpansOverlapping(span1: { start: number; end: number; }, span2: typeof span1) {
            return span1.start <= span2.end && span2.start <= span1.end;
        }
        function writeCode(start: number, end: number, formatter: (text: string) => string = s => s) {
            const spanText = text.substring(start, end);
            const lineEndChar = spanText.indexOf("\n");
            const lineEnd = pos + lineEndChar;
            if (lineEndChar !== -1) {
                process.stdout.write(formatter(text.substring(pos, lineEnd)));
            }
            else {
                process.stdout.write(formatter(text.substring(pos, end)));
            }
            if (lineEndChar !== -1) {
                if (areSpansOverlapping({ start: lineStart, end: lineEnd }, { start: startDiag, end: endDiag! })) {
                    process.stdout.write(os.EOL);
                    process.stdout.write(getString(" ", Math.max(startDiag - lineStart, 0)));
                    process.stdout.write(chalk.redBright(getString("~", Math.min(endDiag, lineEnd) - Math.max(startDiag, lineStart))));
                }
                lineStart = lineEnd + 1;
                process.stdout.write(formatter(text.substring(lineEnd, end)));
            }
        }
        for (const span of iterateSpans(spans)) {
            if (pos > span.start + span.length) continue;
            if (pos !== span.start) {
                writeCode(pos, span.start);
            }
            pos = span.start;
            const end = span.start + span.length;
            const formatter = chalk[colorScheme[span.type]] as (...text: string[]) => string;

            writeCode(pos, end, formatter);

            pos += span.length;
            if (pos >= printEnd) break;
        }
        writeCode(pos, pos + 2); // add new line to flush any error ~
    }
    console.log("");
}

const colorScheme: Record<ClassificationType, keyof typeof chalk> = {
    [ts.ClassificationType.numericLiteral]: "red",
    [ts.ClassificationType.comment]: "gray",
    [ts.ClassificationType.identifier]: "white",
    [ts.ClassificationType.keyword]: "blueBright",
    [ts.ClassificationType.operator]: "white",
    [ts.ClassificationType.stringLiteral]: "red",
    [ts.ClassificationType.regularExpressionLiteral]: "red",
    [ts.ClassificationType.whiteSpace]: "white",
    [ts.ClassificationType.text]: "white",
    [ts.ClassificationType.punctuation]: "yellow",
    [ts.ClassificationType.className]: "blue",
    [ts.ClassificationType.enumName]: "blue",
    [ts.ClassificationType.interfaceName]: "blue",
    [ts.ClassificationType.moduleName]: "blue",
    [ts.ClassificationType.typeParameterName]: "blue",
    [ts.ClassificationType.typeAliasName]: "blue",
    [ts.ClassificationType.parameterName]: "blue",
    [ts.ClassificationType.docCommentTagName]: "green",
    [ts.ClassificationType.jsxOpenTagName]: "magenta",
    [ts.ClassificationType.jsxCloseTagName]: "magenta",
    [ts.ClassificationType.jsxSelfClosingTagName]: "magenta",
    [ts.ClassificationType.jsxAttribute]: "blue",
    [ts.ClassificationType.jsxText]: "white",
    [ts.ClassificationType.jsxAttributeStringLiteralValue]: "red",
    [ts.ClassificationType.bigintLiteral]: "white",
};
function* iterateSpans(encodedSpans: number[]) {
    for (let i = 0; i < encodedSpans.length; i += 3) {
        yield {
            start: encodedSpans[i],
            length: encodedSpans[i + 1],
            type: encodedSpans[i + 2] as ClassificationType,
        };
    }
}
export async function interactiveFixValidator(service: LanguageService) {
    const diagnostics = service.getProgram()?.getSemanticDiagnostics();
    const nonIsolatedErrors = diagnostics?.filter(d => !isolatedDeclarationsErrors.has(d.code));
    if (nonIsolatedErrors && nonIsolatedErrors.length !== 0) {
        console.log(chalk.red("Fix caused new errors: "));
        nonIsolatedErrors.forEach(printDiagnostics);
        const result = await inquirer.prompt([
            {
                type: "confirm",
                name: "fix",
                message: "Revert fix:",
            },
        ]);
        if (result.fix) {
            return false;
        }
    }
    return true;
}
