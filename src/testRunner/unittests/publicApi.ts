import * as documents from "../_namespaces/documents";
import * as fakes from "../_namespaces/fakes";
import * as Harness from "../_namespaces/Harness";
import * as ts from "../_namespaces/ts";
import * as vfs from "../_namespaces/vfs";

describe("unittests:: Public APIs", () => {
    function verifyApi(fileName: string) {
        const builtFile = `built/local/${fileName}`;
        const api = `api/${fileName}`;
        let fileContent: string;
        before(() => {
            fileContent = Harness.IO.readFile(builtFile)!;
            if (!fileContent) throw new Error(`File ${fileName} was not present in built/local`);
            fileContent = fileContent.replace(/\r\n/g, "\n");
        });

        it("should be acknowledged when they change", () => {
            Harness.Baseline.runBaseline(api, fileContent, { PrintDiff: true });
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
    function assertDefinedTokenToString(initial: ts.SyntaxKind, last: ts.SyntaxKind) {
        for (let t = initial; t <= last; t++) {
            assert.isDefined(ts.tokenToString(t), `Expected tokenToString defined for ${ts.Debug.formatSyntaxKind(t)}`);
        }
    }

    it("for punctuations", () => {
        assertDefinedTokenToString(ts.SyntaxKind.FirstPunctuation, ts.SyntaxKind.LastPunctuation);
    });
    it("for keywords", () => {
        assertDefinedTokenToString(ts.SyntaxKind.FirstKeyword, ts.SyntaxKind.LastKeyword);
    });
});

describe("unittests:: Public APIs:: createPrivateIdentifier", () => {
    it("throws when name doesn't start with #", () => {
        assert.throw(() => ts.factory.createPrivateIdentifier("not"), "Debug Failure. First character of private identifier must be #: not");
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

        const testSourceFile = ts.createSourceFile(testFilePath, testFileText, ts.ScriptTarget.Latest, /*setParentNodes*/ true);
        const funcDec = testSourceFile.statements.find(ts.isFunctionDeclaration)!;
        const tags = ts.getJSDocTags(funcDec);
        assert.isDefined(tags[0].comment);
        assert.isDefined(tags[0].comment![0]);
        assert.isString(tags[0].comment);
        assert.equal(tags[0].comment as string, "Some\n text\r\n with newlines.");
    });
});

describe("unittests:: Public APIs:: isPropertyName", () => {
    it("checks if a PrivateIdentifier is a valid property name", () => {
        const prop = ts.factory.createPrivateIdentifier("#foo");
        assert.isTrue(ts.isPropertyName(prop), "PrivateIdentifier must be a valid property name.");
    });
});

describe("unittests:: Public APIs:: getTypeAtLocation", () => {
    it("works on PropertyAccessExpression in implements clause", () => {
        const content = `namespace Test {
            export interface Test {}
        }
        class Foo implements Test.Test {}`;

        const host = new fakes.CompilerHost(vfs.createFromFileSystem(
            Harness.IO,
            /*ignoreCase*/ true,
            { documents: [new documents.TextDocument("/file.ts", content)], cwd: "/" },
        ));

        const program = ts.createProgram({
            host,
            rootNames: ["/file.ts"],
            options: { noLib: true },
        });

        const checker = program.getTypeChecker();
        const file = program.getSourceFile("/file.ts")!;
        const classDeclaration = file.statements.find(ts.isClassDeclaration)!;
        const propertyAccess = classDeclaration.heritageClauses![0].types[0].expression as ts.PropertyAccessExpression;
        const type = checker.getTypeAtLocation(propertyAccess);
        assert.ok(!(type.flags & ts.TypeFlags.Any));
        assert.equal(type, checker.getTypeAtLocation(propertyAccess.name));
    });

    it("works on SourceFile", () => {
        const content = `const foo = 1;`;
        const host = new fakes.CompilerHost(vfs.createFromFileSystem(
            Harness.IO,
            /*ignoreCase*/ true,
            { documents: [new documents.TextDocument("/file.ts", content)], cwd: "/" },
        ));

        const program = ts.createProgram({
            host,
            rootNames: ["/file.ts"],
            options: { noLib: true },
        });

        const checker = program.getTypeChecker();
        const file = program.getSourceFile("/file.ts")!;
        const type = checker.getTypeAtLocation(file);
        assert.equal(type.flags, ts.TypeFlags.Any);
    });

    it("works on ExpressionWithTypeArguments", () => {
        const content = `
            function fn<T>(value: T) {
                return { value };
            }
            const foo = fn<string>;
        `;
        const host = new fakes.CompilerHost(vfs.createFromFileSystem(
            Harness.IO,
            /*ignoreCase*/ true,
            { documents: [new documents.TextDocument("/file.ts", content)], cwd: "/" },
        ));

        const program = ts.createProgram({
            host,
            rootNames: ["/file.ts"],
            options: { noLib: true },
        });

        const checker = program.getTypeChecker();
        const file = program.getSourceFile("/file.ts")!;
        const [declaration] = (ts.findLast(file.statements, ts.isVariableStatement) as ts.VariableStatement).declarationList.declarations;
        assert.equal(checker.getTypeAtLocation(declaration.initializer!).flags, ts.TypeFlags.Object);
    });

    it("returns an errorType for VariableDeclaration with BindingPattern name", () => {
        const content = "const foo = [1];\n" + "const [a] = foo;";

        const host = new fakes.CompilerHost(vfs.createFromFileSystem(
            Harness.IO,
            /*ignoreCase*/ true,
            { documents: [new documents.TextDocument("/file.ts", content)], cwd: "/" },
        ));

        const program = ts.createProgram({
            host,
            rootNames: ["/file.ts"],
            options: { noLib: true },
        });

        const checker = program.getTypeChecker();
        const file = program.getSourceFile("/file.ts")!;
        const [declaration] = (ts.findLast(file.statements, ts.isVariableStatement) as ts.VariableStatement).declarationList.declarations;
        assert.equal(checker.getTypeAtLocation(declaration).flags, ts.TypeFlags.Any);
    });
});

describe("unittests:: Public APIs:: validateLocaleAndSetLanguage", () => {
    let savedUILocale: string | undefined;
    beforeEach(() => savedUILocale = ts.getUILocale());
    afterEach(() => ts.setUILocale(savedUILocale));

    function verifyValidateLocale(locale: string, expectedToReadFile: boolean) {
        it(`Verifying ${locale} ${expectedToReadFile ? "reads" : "does not read"} file`, () => {
            const errors: ts.Diagnostic[] = [];
            ts.validateLocaleAndSetLanguage(locale, {
                getExecutingFilePath: () => "/tsc.js",
                resolvePath: ts.identity,
                fileExists: fileName => {
                    assert.isTrue(expectedToReadFile, `Locale : ${locale} ${expectedToReadFile ? "should" : "should not"} check if ${fileName} exists.`);
                    return expectedToReadFile;
                },
                readFile: fileName => {
                    assert.isTrue(expectedToReadFile, `Locale : ${locale} ${expectedToReadFile ? "should" : "should not"} read ${fileName}.`);
                    // Throw error here so that actual change to localized diagnostics messages doesnt take place
                    throw new Error("cannot read file");
                },
            }, errors);
        });
    }
    ts.supportedLocaleDirectories.forEach(locale => verifyValidateLocale(locale, /*expectedToReadFile*/ true));
    ["en", "en-us"].forEach(locale => verifyValidateLocale(locale, /*expectedToReadFile*/ false));
});

describe("unittests:: Public APIs :: forEachChild of @param comments in JSDoc", () => {
    it("finds correct children", () => {
        const content = `
/**
 * @param The {@link TypeReferencesInAedoc}.
 */
var x
`;
        const sourceFile = ts.createSourceFile("/file.ts", content, ts.ScriptTarget.ESNext, /*setParentNodes*/ true);
        const paramTag = sourceFile.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0];
        const kids = paramTag.getChildren();
        const seen = new Set<ts.Node>();
        ts.forEachChild(paramTag, n => {
            assert.strictEqual(/*actual*/ false, seen.has(n), "Found a duplicate-added child");
            seen.add(n);
        });
        assert.equal(5, kids.length);
    });
});

describe("unittests:: Public APIs:: getChild* methods on EndOfFileToken with JSDoc", () => {
    it("finds correct children", () => {
        const content = `
/** jsdoc comment attached to EndOfFileToken */
`;
        const sourceFile = ts.createSourceFile("/file.ts", content, ts.ScriptTarget.ESNext, /*setParentNodes*/ true);
        const endOfFileToken = sourceFile.getChildren()[1];
        assert.equal(endOfFileToken.getChildren().length, 1);
        assert.equal(endOfFileToken.getChildCount(), 1);
        assert.notEqual(endOfFileToken.getChildAt(0), /*expected*/ undefined);
    });
});

describe("unittests:: Public APIs:: get syntactic and effective modifiers", () => {
    it("caches and reports correct flags in TS file", () => {
        // https://github.com/microsoft/TypeScript/issues/42189
        const content = `
class C {
    /** @private */
    prop = 1;
}`;
        const sourceFile = ts.createSourceFile("/file.ts", content, ts.ScriptTarget.ESNext, /*setParentNodes*/ true);
        const classNode = sourceFile.statements[0] as ts.ClassDeclaration;
        const propNode = classNode.members[0] as ts.PropertyDeclaration;
        assert.equal(ts.ModifierFlags.None, ts.getSyntacticModifierFlags(propNode));
        assert.equal(ts.ModifierFlags.None, ts.getEffectiveModifierFlags(propNode));
        assert.equal(ts.ModifierFlags.None, ts.getSyntacticModifierFlags(propNode));
    });
    it("caches and reports correct flags in JS file", () => {
        // https://github.com/microsoft/TypeScript/issues/42189
        const content = `
class C {
    /** @private */
    prop = 1;
}`;
        const sourceFile = ts.createSourceFile("/file.js", content, ts.ScriptTarget.ESNext, /*setParentNodes*/ true);
        const classNode = sourceFile.statements[0] as ts.ClassDeclaration;
        const propNode = classNode.members[0] as ts.PropertyDeclaration;
        assert.equal(ts.ModifierFlags.None, ts.getSyntacticModifierFlags(propNode));
        assert.equal(ts.ModifierFlags.Private, ts.getEffectiveModifierFlags(propNode));
        assert.equal(ts.ModifierFlags.None, ts.getSyntacticModifierFlags(propNode));
    });
});
