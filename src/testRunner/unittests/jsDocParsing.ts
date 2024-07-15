import * as Harness from "../_namespaces/Harness.js";
import * as ts from "../_namespaces/ts.js";
import * as Utils from "../_namespaces/Utils.js";

describe("unittests:: JSDocParsing", () => {
    describe("TypeExpressions", () => {
        function parsesCorrectly(name: string, content: string) {
            it(name, () => {
                const typeAndDiagnostics = ts.parseJSDocTypeExpressionForTests(content);
                assert.isTrue(typeAndDiagnostics && typeAndDiagnostics.diagnostics.length === 0, "no errors issued");

                Harness.Baseline.runBaseline("JSDocParsing/TypeExpressions.parsesCorrectly." + name + ".json", Utils.sourceFileToJSON(typeAndDiagnostics!.jsDocTypeExpression.type));
            });
        }

        function parsesIncorrectly(name: string, content: string) {
            it(name, () => {
                const type = ts.parseJSDocTypeExpressionForTests(content);
                assert.isTrue(!type || type.diagnostics.length > 0);
            });
        }

        describe("parseCorrectly", () => {
            parsesCorrectly("unknownType", "{?}");
            parsesCorrectly("allType", "{*}");
            parsesCorrectly("nullableType", "{?number}");
            parsesCorrectly("nullableType2", "{number?}");
            parsesCorrectly("nonNullableType", "{!number}");
            parsesCorrectly("nonNullableType2", "{number!}");
            parsesCorrectly("recordType1", "{{}}");
            parsesCorrectly("recordType2", "{{foo}}");
            parsesCorrectly("recordType3", "{{foo: number}}");
            parsesCorrectly("recordType4", "{{foo, bar}}");
            parsesCorrectly("recordType5", "{{foo: number, bar}}");
            parsesCorrectly("recordType6", "{{foo, bar: number}}");
            parsesCorrectly("recordType7", "{{foo: number, bar: number}}");
            parsesCorrectly("recordType8", "{{function}}");
            parsesCorrectly("trailingCommaInRecordType", "{{a,}}");
            parsesCorrectly("callSignatureInRecordType", "{{(): number}}");
            parsesCorrectly("methodInRecordType", "{{foo(): number}}");
            parsesCorrectly("unionType", "{(number|string)}");
            parsesCorrectly("unionTypeWithLeadingOperator", "{( | number | string )}");
            parsesCorrectly("unionTypeWithOneElementAndLeadingOperator", "{( | number )}");
            parsesCorrectly("topLevelNoParenUnionType", "{number|string}");
            parsesCorrectly("functionType1", "{function()}");
            parsesCorrectly("functionType2", "{function(string, boolean)}");
            parsesCorrectly("functionReturnType1", "{function(string, boolean)}");
            parsesCorrectly("thisType1", "{function(this:a.b)}");
            parsesCorrectly("newType1", "{function(new:a.b)}");
            parsesCorrectly("variadicType", "{...number}");
            parsesCorrectly("optionalType", "{number=}");
            parsesCorrectly("optionalNullable", "{?=}");
            parsesCorrectly("typeReference1", "{a.<number>}");
            parsesCorrectly("typeReference2", "{a.<number,string>}");
            parsesCorrectly("typeReference3", "{a.function}");
            parsesCorrectly("arrayType1", "{a[]}");
            parsesCorrectly("arrayType2", "{a[][]}");
            parsesCorrectly("arrayType3", "{(a[][])=}");
            parsesCorrectly("keyword1", "{var}");
            parsesCorrectly("keyword2", "{null}");
            parsesCorrectly("keyword3", "{undefined}");
            parsesCorrectly("tupleType0", "{[]}");
            parsesCorrectly("tupleType1", "{[number]}");
            parsesCorrectly("tupleType2", "{[number,string]}");
            parsesCorrectly("tupleType3", "{[number,string,boolean]}");
            parsesCorrectly("tupleTypeWithTrailingComma", "{[number,]}");
            parsesCorrectly("typeOfType", "{typeof M}");
            parsesCorrectly("tsConstructorType", "{new () => string}");
            parsesCorrectly("tsFunctionType", "{() => string}");
            parsesCorrectly("typeArgumentsNotFollowingDot", "{a<>}");
            parsesCorrectly("functionTypeWithTrailingComma", "{function(a,)}");
        });

        describe("parsesIncorrectly", () => {
            parsesIncorrectly("emptyType", "{}");
            parsesIncorrectly("unionTypeWithTrailingBar", "{(a|)}");
            parsesIncorrectly("unionTypeWithoutTypes", "{()}");
            parsesIncorrectly("nullableTypeWithoutType", "{!}");
            parsesIncorrectly("thisWithoutType", "{this:}");
            parsesIncorrectly("newWithoutType", "{new:}");
            parsesIncorrectly("variadicWithoutType", "{...}");
            parsesIncorrectly("optionalWithoutType", "{=}");
            parsesIncorrectly("allWithType", "{*foo}");
            parsesIncorrectly("namedParameter", "{function(a: number)}");
            parsesIncorrectly("tupleTypeWithComma", "{[,]}");
            parsesIncorrectly("tupleTypeWithLeadingComma", "{[,number]}");
        });
    });

    describe("DocComments", () => {
        function parsesCorrectly(name: string, content: string) {
            it(name, () => {
                const comment = ts.parseIsolatedJSDocComment(content)!;
                if (!comment) {
                    ts.Debug.fail("Comment failed to parse entirely");
                }
                if (comment.diagnostics.length > 0) {
                    ts.Debug.fail("Comment has at least one diagnostic: " + comment.diagnostics[0].messageText);
                }

                Harness.Baseline.runBaseline("JSDocParsing/DocComments.parsesCorrectly." + name + ".json", JSON.stringify(comment.jsDoc, (_, v) => v && v.pos !== undefined ? JSON.parse(Utils.sourceFileToJSON(v)) : v, 4));
            });
        }

        function parsesIncorrectly(name: string, content: string) {
            it(name, () => {
                const type = ts.parseIsolatedJSDocComment(content);
                assert.isTrue(!type || type.diagnostics.length > 0);
            });
        }

        describe("parsesIncorrectly", () => {
            parsesIncorrectly(
                "multipleTypes",
                `/**
  * @type {number}
  * @type {string}
  */`,
            );
            parsesIncorrectly(
                "multipleReturnTypes",
                `/**
  * @return {number}
  * @return {string}
  */`,
            );
            parsesIncorrectly(
                "noTypeParameters",
                `/**
  * @template
  */`,
            );
            parsesIncorrectly(
                "trailingTypeParameterComma",
                `/**
  * @template T,
  */`,
            );
            parsesIncorrectly(
                "paramWithoutName",
                `/**
  * @param {number}
  */`,
            );
            parsesIncorrectly(
                "paramWithoutTypeOrName",
                `/**
  * @param
  */`,
            );

            parsesIncorrectly(
                "noType",
                `/**
* @type
*/`,
            );

            parsesIncorrectly(
                "@augments with no type",
                `/**
 * @augments
 */`,
            );
        });

        describe("parsesCorrectly", () => {
            parsesCorrectly("threeAsterisks", "/*** */");
            parsesCorrectly("emptyComment", "/***/");
            parsesCorrectly(
                "noLeadingAsterisk",
                `/**
    @type {number}
  */`,
            );

            parsesCorrectly(
                "noReturnType",
                `/**
  * @return
  */`,
            );

            parsesCorrectly(
                "leadingAsterisk",
                `/**
  * @type {number}
  */`,
            );

            parsesCorrectly("asteriskAfterPreamble", "/** * @type {number} */");

            parsesCorrectly(
                "typeTag",
                `/**
  * @type {number}
  */`,
            );

            parsesCorrectly(
                "satisfiesTag",
                `/**
  * @satisfies {number}
  */`,
            );

            parsesCorrectly(
                "importTag1",
                `/**
  * @import foo from 'foo'
  */`,
            );

            parsesCorrectly(
                "importTag2",
                `/**
  * @import { foo } from 'foo'
  */`,
            );

            parsesCorrectly(
                "importTag3",
                `/**
  * @import * as types from 'foo'
  */`,
            );

            parsesCorrectly(
                "importTag4",
                `/**
  * @import * as types from 'foo' comment part
  */`,
            );

            parsesCorrectly(
                "returnTag1",
                `/**
  * @return {number}
  */`,
            );

            parsesCorrectly(
                "returnTag2",
                `/**
  * @return {number} Description text follows
  */`,
            );

            parsesCorrectly(
                "returnsTag1",
                `/**
  * @returns {number}
  */`,
            );

            parsesCorrectly(
                "oneParamTag",
                `/**
  * @param {number} name1
  */`,
            );

            parsesCorrectly(
                "twoParamTag2",
                `/**
  * @param {number} name1
  * @param {number} name2
  */`,
            );

            parsesCorrectly(
                "paramTag1",
                `/**
  * @param {number} name1 Description text follows
  */`,
            );

            parsesCorrectly(
                "paramTagBracketedName1",
                `/**
  * @param {number} [name1] Description text follows
  */`,
            );

            parsesCorrectly(
                "paramTagBracketedName2",
                `/**
  * @param {number} [ name1 = 1] Description text follows
  */`,
            );

            parsesCorrectly(
                "twoParamTagOnSameLine",
                `/**
  * @param {number} name1 @param {number} name2
  */`,
            );

            parsesCorrectly(
                "paramTagNameThenType1",
                `/**
  * @param name1 {number}
  */`,
            );

            parsesCorrectly(
                "paramTagNameThenType2",
                `/**
  * @param name1 {number} Description
  */`,
            );

            parsesCorrectly(
                "argSynonymForParamTag",
                `/**
  * @arg {number} name1 Description
  */`,
            );

            parsesCorrectly(
                "argumentSynonymForParamTag",
                `/**
  * @argument {number} name1 Description
  */`,
            );

            parsesCorrectly(
                "templateTag",
                `/**
  * @template T
  */`,
            );

            parsesCorrectly(
                "templateTag2",
                `/**
  * @template K,V
  */`,
            );

            parsesCorrectly(
                "templateTag3",
                `/**
  * @template K ,V
  */`,
            );

            parsesCorrectly(
                "templateTag4",
                `/**
  * @template K, V
  */`,
            );

            parsesCorrectly(
                "templateTag5",
                `/**
  * @template K , V
  */`,
            );

            parsesCorrectly(
                "templateTag6",
                `/**
  * @template K , V Description of type parameters.
  */`,
            );

            parsesCorrectly(
                "paramWithoutType",
                `/**
  * @param foo
  */`,
            );
            parsesCorrectly(
                "throwsTag1",
                `/**
  * @throws {Error}
  */`,
            );

            parsesCorrectly(
                "throwsTag2",
                `/**
  * @throws free-form description
  */`,
            );

            parsesCorrectly(
                "throwsTag3",
                `/**
  * @throws {Error} description
  */`,
            );

            parsesCorrectly(
                "exceptionTag1",
                `/**
  * @exception {Error}
  */`,
            );

            parsesCorrectly(
                "exceptionTag2",
                `/**
  * @exception free-form description
  */`,
            );

            parsesCorrectly(
                "exceptionTag3",
                `/**
  * @exception {Error} description
  */`,
            );
            parsesCorrectly(
                "typedefTagWithChildrenTags",
                `/**
  * @typedef People
  * @type {Object}
  * @property {number} age
  * @property {string} name
  */`,
            );
            parsesCorrectly(
                "less-than and greater-than characters",
                `/**
 * @param x hi
< > still part of the previous comment
 */`,
            );

            parsesCorrectly(
                "Nested @param tags",
                `/**
* @param {object} o Doc doc
* @param {string} o.f Doc for f
*/`,
            );
            parsesCorrectly(
                "@link tags",
                `/**
 * {@link first }
 * Inside {@link link text} thing
 * @param foo See also {@link A.Reference}
 * @param bar Or see {@link http://www.zombocom.com }
 * {@link Standalone.Complex }
 * This empty one: {@link} is OK.
 * This double-space one: {@link  doubled  } is OK too.
 * This should work, despite being badly formatted: {@link
oh.no
}
 * Forgot to close this one {@link https://typescriptlang.org
 * But it's still OK.
 * Although it skips the newline so parses the asterisks in the wrong state.
 * This shouldn't work: {@link
 * nope
 * }, because of the intermediate asterisks.
 * @author Alfa Romero <a@parsing.com> See my home page: {@link https://example.com}
 */`,
            );
            parsesCorrectly(
                "authorTag",
                `/**
 * @author John Doe <john.doe@example.com>
 * @author John Doe <john.doe@example.com> unexpected comment
 * @author 108 <108@actionbutton.net> Video Games Forever
 * @author Multiple Ats <email@quoting@how@does@it@work>
 * @author Multiple Open Carets <hi<there@<>
 * @author Multiple Close Carets <probably>invalid>but>who>cares>
 * @author Unclosed Carets <joe@sloppy.gov
 * @author Multiple @author On One <one@two.three> @author Line
 * @author @author @author Empty authors
 * @author
 * @author
 *   Comments
 * @author Early Close Caret > <a@b>
 * @author No Line Breaks:
 *   <the email @address> must be on the same line to parse
 * @author Long Comment <long@comment.org> I
 *  want to keep commenting down here, I dunno.
 */`,
            );

            parsesCorrectly(
                "consecutive newline tokens",
                `/**
 * @example
 * Some\n\n * text\r\n * with newlines.
 */`,
            );
            parsesCorrectly("Chained tags, no leading whitespace", `/**@a @b @c@d*/`);
            parsesCorrectly("Single trailing whitespace", `/** trailing whitespace */`);
            parsesCorrectly("Initial star is not a tag", `/***@a*/`);
            parsesCorrectly("Initial star space is not a tag", `/*** @a*/`);
            parsesCorrectly("Initial email address is not a tag", `/**bill@example.com*/`);
            parsesCorrectly(
                "no space before @ is not a new tag",
                `/**
 * @param this (@is@)
 * @param fine its@fine
@zerowidth
*@singlestar
**@doublestar
 */`,
            );
            parsesCorrectly(
                "@@ does not start a new tag",
                `/**
 * @param this is (@@fine@@and) is one comment
 */`,
            );
        });
    });
    describe("getFirstToken", () => {
        it("gets jsdoc", () => {
            const root = ts.createSourceFile("foo.ts", "/** comment */var a = true;", ts.ScriptTarget.ES5, /*setParentNodes*/ true);
            assert.isDefined(root);
            assert.equal(root.kind, ts.SyntaxKind.SourceFile);
            const first = root.getFirstToken();
            assert.isDefined(first);
            assert.equal(first.kind, ts.SyntaxKind.VarKeyword);
        });
    });
    describe("getLastToken", () => {
        it("gets jsdoc", () => {
            const root = ts.createSourceFile("foo.ts", "var a = true;/** comment */", ts.ScriptTarget.ES5, /*setParentNodes*/ true);
            assert.isDefined(root);
            const last = root.getLastToken();
            assert.isDefined(last);
            assert.equal(last.kind, ts.SyntaxKind.EndOfFileToken);
        });
    });
    describe("getStart", () => {
        it("runs when node with JSDoc but no parent pointers", () => {
            const root = ts.createSourceFile("foo.ts", "/** */var a = true;", ts.ScriptTarget.ES5, /*setParentNodes*/ false);
            root.statements[0].getStart(root, /*includeJsDocComment*/ true);
        });
    });
    describe("parseIsolatedJSDocComment", () => {
        it("doesn't create a 1-element array with missing type parameter in jsDoc", () => {
            const doc = ts.parseIsolatedJSDocComment("/**\n    @template\n*/");
            assert.equal((doc?.jsDoc.tags?.[0] as ts.JSDocTemplateTag).typeParameters.length, 0);
        });
    });
    describe("getTextOfJSDocComment", () => {
        it("should preserve hash in string representation of JsDocMemberName", () => {
            const sourceText = `
/**
 *
 * @see {@link foo#bar label}
 */
class Foo  {};
`;

            const root = ts.createSourceFile("foo.ts", sourceText, ts.ScriptTarget.ES5, /*setParentNodes*/ true);
            const [classDecl] = root.statements;
            const [seeTag] = ts.getJSDocTags(classDecl);

            assert.equal(ts.getTextOfJSDocComment(seeTag.comment), "{@link foo#bar label}");
        });
    });

    describe("getTextOfJSDocComment", () => {
        it("should preserve link without introducing space", () => {
            const sourceText = `
/**
 *
 * @see {@link foo}
 */
class Foo  {};
`;

            const root = ts.createSourceFile("foo.ts", sourceText, ts.ScriptTarget.ES5, /*setParentNodes*/ true);
            const [classDecl] = root.statements;
            const [seeTag] = ts.getJSDocTags(classDecl);

            assert.equal(ts.getTextOfJSDocComment(seeTag.comment), "{@link foo}");
        });
    });
});
