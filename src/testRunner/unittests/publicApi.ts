import { IO, Baseline, Compiler } from "../Harness";
import { createFromFileSystem, builtFolder, srcFolder } from "../vfs";
import { System, CompilerHost } from "../fakes";
import { compileFiles } from "../compiler";
import { SyntaxKind, tokenToString, Debug, factory, createSourceFile, ScriptTarget, isFunctionDeclaration, getJSDocTags, isPropertyName, createProgram, isClassDeclaration, PropertyAccessExpression, TypeFlags, getUILocale, setUILocale, Diagnostic, validateLocaleAndSetLanguage, identity, supportedLocaleDirectories, Node, forEachChild } from "../ts";
import { TextDocument } from "../documents";
describe("unittests:: Public APIs", () => {
    function verifyApi(fileName: string) {
        const builtFile = `built/local/${fileName}`;
        const api = `api/${fileName}`;
        let fileContent: string;
        before(() => {
            fileContent = IO.readFile(builtFile)!;
            if (!fileContent)
                throw new Error(`File ${fileName} was not present in built/local`);
            fileContent = fileContent.replace(/\r\n/g, "\n");
        });

        it("should be acknowledged when they change", () => {
            Baseline.runBaseline(api, fileContent, { PrintDiff: true });
        });

        it("should compile", () => {
            const fs = createFromFileSystem(IO, /*ignoreCase*/ false);
            fs.linkSync(`${builtFolder}/${fileName}`, `${srcFolder}/${fileName}`);
            const sys = new System(fs);
            const host = new CompilerHost(sys);
            const result = compileFiles(host, [`${srcFolder}/${fileName}`], {});
            assert(!result.diagnostics || !result.diagnostics.length, Compiler.minimalDiagnosticsToString(result.diagnostics, /*pretty*/ true));
        });
    }

    describe("for the language service and compiler", () => {
        verifyApi("typescript.d.ts");
    });

    describe("for the language server", () => {
        verifyApi("tsserverlibrary.d.ts");
    });
});

describe("unittests:: Public APIs:: token to string", () => {
    function assertDefinedTokenToString(initial: SyntaxKind, last: SyntaxKind) {
        for (let t = initial; t <= last; t++) {
            assert.isDefined(tokenToString(t), `Expected tokenToString defined for ${Debug.formatSyntaxKind(t)}`);
        }
    }

    it("for punctuations", () => {
        assertDefinedTokenToString(SyntaxKind.FirstPunctuation, SyntaxKind.LastPunctuation);
    });
    it("for keywords", () => {
        assertDefinedTokenToString(SyntaxKind.FirstKeyword, SyntaxKind.LastKeyword);
    });
});

describe("unittests:: Public APIs:: createPrivateIdentifier", () => {
    it("throws when name doesn't start with #", () => {
        assert.throw(() => factory.createPrivateIdentifier("not"), "Debug Failure. First character of private identifier must be #: not");
    });
});

describe("unittests:: Public APIs:: JSDoc newlines", () => {
    it("are preserved verbatim", () => {
        const testFilePath = "/file.ts";
        const testFileText = `
/**
* @example
* Some\n * text\r\n * with newlines.
*/
function test() {}`;

        const testSourceFile = createSourceFile(testFilePath, testFileText, ScriptTarget.Latest, /*setParentNodes*/ true);
        const funcDec = testSourceFile.statements.find(isFunctionDeclaration)!;
        const tags = getJSDocTags(funcDec);
        assert.isDefined(tags[0].comment);
        assert.isDefined(tags[0].comment![0]);
        assert.isString(tags[0].comment);
        assert.equal(tags[0].comment as string, "Some\n text\r\n with newlines.");
    });
});

describe("unittests:: Public APIs:: isPropertyName", () => {
    it("checks if a PrivateIdentifier is a valid property name", () => {
        const prop = factory.createPrivateIdentifier("#foo");
        assert.isTrue(isPropertyName(prop), "PrivateIdentifier must be a valid property name.");
    });
});

describe("unittests:: Public APIs:: getTypeAtLocation", () => {
    it("works on PropertyAccessExpression in implements clause", () => {
        const content = `namespace Test {
            export interface Test {}
        }
        class Foo implements Test.Test {}`;

        const host = new CompilerHost(createFromFileSystem(IO, 
        /*ignoreCase*/ true, { documents: [new TextDocument("/file.ts", content)], cwd: "/" }));
        const program = createProgram({
            host,
            rootNames: ["/file.ts"],
            options: { noLib: true }
        });

        const checker = program.getTypeChecker();
        const file = program.getSourceFile("/file.ts")!;
        const classDeclaration = file.statements.find(isClassDeclaration)!;
        const propertyAccess = classDeclaration.heritageClauses![0].types[0].expression as PropertyAccessExpression;
        const type = checker.getTypeAtLocation(propertyAccess);
        assert.ok(!(type.flags & TypeFlags.Any));
        assert.equal(type, checker.getTypeAtLocation(propertyAccess.name));
    });

    it("works on SourceFile", () => {
        const content = `const foo = 1;`;
        const host = new CompilerHost(createFromFileSystem(IO, 
        /*ignoreCase*/ true, { documents: [new TextDocument("/file.ts", content)], cwd: "/" }));
        const program = createProgram({
            host,
            rootNames: ["/file.ts"],
            options: { noLib: true }
        });

        const checker = program.getTypeChecker();
        const file = program.getSourceFile("/file.ts")!;
        const type = checker.getTypeAtLocation(file);
        assert.equal(type.flags, TypeFlags.Any);
    });
});

describe("unittests:: Public APIs:: validateLocaleAndSetLanguage", () => {
    let savedUILocale: string | undefined;
    beforeEach(() => savedUILocale = getUILocale());
    afterEach(() => setUILocale(savedUILocale));

    function verifyValidateLocale(locale: string, expectedToReadFile: boolean) {
        it(`Verifying ${locale} ${expectedToReadFile ? "reads" : "does not read"} file`, () => {
            const errors: Diagnostic[] = [];
            validateLocaleAndSetLanguage(locale, {
                getExecutingFilePath: () => "/tsc.js",
                resolvePath: identity,
                fileExists: fileName => {
                    assert.isTrue(expectedToReadFile, `Locale : ${locale} ${expectedToReadFile ? "should" : "should not"} check if ${fileName} exists.`);
                    return expectedToReadFile;
                },
                readFile: fileName => {
                    assert.isTrue(expectedToReadFile, `Locale : ${locale} ${expectedToReadFile ? "should" : "should not"} read ${fileName}.`);
                    // Throw error here so that actual change to localized diagnostics messages doesnt take place
                    throw new Error("cannot read file");
                }
            }, errors);
        });
    }
    supportedLocaleDirectories.forEach(locale => verifyValidateLocale(locale, /*expectedToReadFile*/ true));
    ["en", "en-us"].forEach(locale => verifyValidateLocale(locale, /*expectedToReadFile*/ false));
});

describe("unittests:: Public APIs :: forEachChild of @param comments in JSDoc", () => {
    const content = `
/**
 * @param The {@link TypeReferencesInAedoc}.
 */
var x
`;
    const sourceFile = createSourceFile("/file.ts", content, ScriptTarget.ESNext, /*setParentNodes*/ true);
    const paramTag = sourceFile.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0];
    const kids = paramTag.getChildren();
    const seen: Set<Node> = new Set();
    forEachChild(paramTag, n => {
        assert.strictEqual(/*actual*/ false, seen.has(n), "Found a duplicate-added child");
        seen.add(n);
    });
    assert.equal(5, kids.length);
});

describe("unittests:: Public APIs:: getChild* methods on EndOfFileToken with JSDoc", () => {
    const content = `
/** jsdoc comment attached to EndOfFileToken */
`;
    const sourceFile = createSourceFile("/file.ts", content, ScriptTarget.ESNext, /*setParentNodes*/ true);
    const endOfFileToken = sourceFile.getChildren()[1];
    assert.equal(endOfFileToken.getChildren().length, 1);
    assert.equal(endOfFileToken.getChildCount(), 1);
    assert.notEqual(endOfFileToken.getChildAt(0), /*expected*/ undefined);
});
