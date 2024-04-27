const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/compiler-options-consistency.cjs");
const ts = require("typescript");
const path = require("path");

const ruleTester = new RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});

const parserFilename = path.normalize("src/compiler/commandLineParser.ts");
const typesFilename = path.normalize("src/compiler/types.ts");
/**
 * @param {string} parserText
 * @param {string} typesText
 * @returns {ts.Program}
 */
const getProgram = (parserText, typesText) => {
    const parserFile = ts.createSourceFile(parserFilename, parserText, ts.ScriptTarget.Latest);
    const typesFile = ts.createSourceFile(typesFilename, typesText, ts.ScriptTarget.Latest);
    const program = ts.createProgram({
        options: {},
        rootNames: [parserFilename, typesFilename],
        host: {
            fileExists: filename => (filename = path.normalize(filename), filename === parserFilename || filename === typesFilename),
            getCanonicalFileName: n => n,
            getCurrentDirectory: () => path.join(__dirname, "../../../"),
            getDefaultLibFileName: () => "lib.d.ts",
            getNewLine: () => "\n",
            getSourceFile: filename => (filename = path.normalize(filename), filename === parserFilename ? parserFile : filename === typesFilename ? typesFile : undefined),
            getSourceFileByPath: name => void console.log(name),
            readFile: () => void 0,
            useCaseSensitiveFileNames: () => true,
            writeFile: () => void 0,
        },
    });
    return program;
};

/**
 * @param {string} parserText
 * @param {string} typesText
 */
const valid = (parserText, typesText) => {
    return {
        filename: typesFilename, // any file in the program will do
        code: typesText,
        parserOptions: { programs: [getProgram(parserText, typesText)] },
    };
};

/**
 * @param {string} parserText
 * @param {string} typesText
 * @param {readonly import("@typescript-eslint/utils/ts-eslint").TestCaseError<MessageIds>[]} errors
 * @param {(typeof typesFilename | typeof parserFilename)=} outputFile
 * @param {string=} output
 * @template {string} MessageIds
 */
const invalid = (parserText, typesText, errors, outputFile, output) => {
    const partial = valid(parserText, typesText);
    return !outputFile ? {
        ...partial,
        errors,
    } : {
        ...partial,
        filename: outputFile,
        code: outputFile === typesFilename ? typesText : parserText, // code must be set to get fixer results
        errors,
        output: output || (outputFile === typesFilename ? typesText : parserText),
    };
};

ruleTester.run("compiler-options-consistency", rule, {
    valid: [
        valid(
            `
            const commandOptionsWithoutBuild: CommandLineOption[] = [
                {
                    name: "allowJs",
                    type: "boolean",
                },
            ];`,
            `
            export interface CompilerOptions {
                allowJs?: boolean;
            }`,
        ),
        valid(
            `
            const commandOptionsWithoutBuild: CommandLineOption[] = [
                {
                    name: "allowJs",
                    type: "boolean",
                    internal: true,
                },
            ];`,
            `
            export interface CompilerOptions {
                /** @internal */ allowJs?: boolean;
            }`,
        ),
        valid(
            `
            const commandOptionsWithoutBuild: CommandLineOption[] = [
                {
                    name: "allowJs",
                    type: "boolean",
                    internal: true,
                },
            ];
            const doesntMatterOptions: CommandLineOption[] = [
                {
                    name: "include",
                    type: "list",
                    element {
                        name: "glob",
                        type: "string",
                    }
                },
            ];`,
            `
            export interface CompilerOptions {
                /** @internal */ allowJs?: boolean;
                /** @internal */ configFile?: JsonSourceFile;
                /** @internal */ configFilePath?: string;
                /** @internal */ pathsBasePath?: string;
            }`,
        ),
    ],
    invalid: [
        invalid(
            `
            const commandOptionsWithoutBuild: CommandLineOption[] = [
                {
                    name: "allowJs",
                    type: "boolean",
                    internal: true,
                },
            ];`,
            `
            export interface CompilerOptions {
                allowJs?: boolean;
            }`,
            [{ messageId: "missingAtInternal" }],
            typesFilename,
            `
            export interface CompilerOptions {
                /** @internal */ allowJs?: boolean;
            }`,
        ),
        invalid(
            `
            const commandOptionsWithoutBuild: CommandLineOption[] = [
                {
                    name: "allowJs",
                    type: "boolean",
                },
            ];`,
            `
            export interface CompilerOptions {
                /** @internal */ allowJs?: boolean;
            }`,
            [{ messageId: "missingInternalSetting" }],
            parserFilename,
            `
            const commandOptionsWithoutBuild: CommandLineOption[] = [
                {
                    name: "allowJs", internal: true,
                    type: "boolean",
                },
            ];`,
        ),
        invalid(
            `
            const commandOptionsWithoutBuild: CommandLineOption[] = [
                {
                    name: "checkJs",
                    type: "boolean",
                },
            ];`,
            `
            export interface CompilerOptions {
                allowJs?: boolean;
                checkJs?: boolean;
            }`,
            [{ messageId: "notInOptionsParser" }],
        ),
        invalid(
            `
            const commandOptionsWithoutBuild: CommandLineOption[] = [
                {
                    name: "allowJs",
                    type: "boolean",
                },
                {
                    name: "checkJs",
                    type: "boolean",
                },
            ];`,
            `
            export interface CompilerOptions {
                allowJs?: boolean;
            }`,
            [{ messageId: "notInOptionsType" }],
            parserFilename,
        ),
    ],
});
