// ///<reference path='..\..\..\src\compiler\syntax\references.ts' />
// ///<reference path='..\..\..\src\compiler\core\environment.ts' />
// ///<reference path='..\..\..\src\compiler\references.ts' />
// ///<reference path='..\..\..\src\services\references.ts' />
///<reference path='..\Program.ts' />

module TypeScript {
    export class SyntaxElementsCollector {
        public static collectElements(node: SourceUnitSyntax): ISyntaxElement[] {
            var result: ISyntaxElement[] = [];

            this.collect(node, result);

            return result;
        }

        private static collect(element: ISyntaxElement, result: ISyntaxElement[]) {
            if (element) {
                var kind = element.kind();
                result.push(element);

                for (var i = 0, n = childCount(element); i < n; i++) {
                    this.collect(childAt(element, i), result);
                }
            }
        }
    }

    function withChange(text: ISimpleText, start: number, length: number, newText: string): { text: ISimpleText; textChangeRange: TextChangeRange; } {
        var contents = text.substr(0, text.length());
        var newContents = contents.substr(0, start) + newText + contents.substring(start + length);

        return { text: SimpleText.fromString(newContents), textChangeRange: new TextChangeRange(new TextSpan(start, length), newText.length) }
    }

    function withInsert(text: ISimpleText, start: number, newText: string): { text: ISimpleText; textChangeRange: TextChangeRange; } {
        return withChange(text, start, 0, newText);
    }

    function withDelete(text: ISimpleText, start: number, length: number): { text: ISimpleText; textChangeRange: TextChangeRange; } {
        return withChange(text, start, length, "");
    }

    // NOTE: 'reusedElements' is the expected count of elements reused from the old tree to the new
    // tree.  It may change as we tweak the parser.  If the count increases then that should always
    // be a good thing.  If it decreases, that's not great (less reusability), but that may be 
    // unavoidable.  If it does decrease an investigation 
    function compareTrees(oldText: ISimpleText, newText: ISimpleText, textChangeRange: TextChangeRange, reusedElements: number = -1): void {
        var oldTree = Parser.parse("", oldText, ts.ScriptTarget.ES5, false);
        TypeScript.visitNodeOrToken(new PositionValidatingWalker(), oldTree.sourceUnit());

        var newTree = Parser.parse("", newText, ts.ScriptTarget.ES5, false);
        TypeScript.visitNodeOrToken(new PositionValidatingWalker(), newTree.sourceUnit());

        var incrementalNewTree = IncrementalParser.parse(oldTree, textChangeRange, newText);
        TypeScript.visitNodeOrToken(new PositionValidatingWalker(), incrementalNewTree.sourceUnit());

        // We should get the same tree when doign a full or incremental parse.
        Debug.assert(treeStructuralEquals(newTree, incrementalNewTree, /*checkParents:*/ true));

        // There should be no reused nodes between two trees that are fully parsed.
        Debug.assert(IncrementalParserTests.reusedElements(oldTree.sourceUnit(), newTree.sourceUnit()) === 0);

        if (reusedElements !== -1) {
            var actualReusedCount = IncrementalParserTests.reusedElements(oldTree.sourceUnit(), incrementalNewTree.sourceUnit());
            Debug.assert(actualReusedCount === reusedElements, actualReusedCount + " !== " + reusedElements);
        }
    }

    export class IncrementalParserTests {
        public static runAllTests() {
            for (var name in IncrementalParserTests) {
                if (IncrementalParserTests.hasOwnProperty(name) && StringUtilities.startsWith(name, "test")) {
                    var o: ts.Map<any> = <any>IncrementalParserTests;
                    o[name]();
                }
            }
        }

        public static reusedElements(oldNode: SourceUnitSyntax, newNode: SourceUnitSyntax): number {
            var allOldElements = SyntaxElementsCollector.collectElements(oldNode);
            var allNewElements = SyntaxElementsCollector.collectElements(newNode);

            return ArrayUtilities.where(allOldElements,
                v => ArrayUtilities.contains(allNewElements, v)).length;
        }

        public static testIncremental1() {
            var source = "class C {\r\n";
            source += "    public foo1() { }\r\n";
            source += "    public foo2() {\r\n";
            source += "        return 1;\r\n";
            source += "    }\r\n";
            source += "    public foo3() { }\r\n";
            source += "}"

            var semicolonIndex = source.indexOf(";");

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, " + 1");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 37);
        }

        public static testIncremental2() {
            var source = "class C {\r\n";
            source += "    public foo1() { }\r\n";
            source += "    public foo2() {\r\n";
            source += "        return 1 + 1;\r\n";
            source += "    }\r\n";
            source += "    public foo3() { }\r\n";
            source += "}"

            var index = source.indexOf("+ 1");

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withDelete(oldText, index, 3);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 37);
        }

        public static testIncrementalRegex1() {
            var source = "class C { public foo1() { /; } public foo2() { return 1;} public foo3() { } }";

            var semicolonIndex = source.indexOf(";}");

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 24);
        }

        public static testIncrementalRegex2() {
            var source = "class C { public foo1() { ; } public foo2() { return 1/;} public foo3() { } }";

            var semicolonIndex = source.indexOf(";");

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 22);
        }

        public static testIncrementalComment1() {
            var source = "class C { public foo1() { /; } public foo2() { return 1; } public foo3() { } }";

            var semicolonIndex = source.indexOf(";");

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 7);
        }

        public static testIncrementalComment2() {
            var source = "class C { public foo1() { /; } public foo2() { return 1; } public foo3() { } }";

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, 0, "//");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        }

        public static testIncrementalComment3() {
            var source = "//class C { public foo1() { /; } public foo2() { return 1; } public foo3() { } }";

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withDelete(oldText, 0, 2);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        }

        public static testIncrementalComment4() {
            var source = "class C { public foo1() { /; } public foo2() { */ return 1; } public foo3() { } }";

            var index = source.indexOf(";");
            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, index, "*");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 25);
        }

        public static testParameter1() {
            // Should be able to reuse all the parameters.
            var source = "class C {\r\n";
            source += "    public foo2(a, b, c, d) {\r\n";
            source += "        return 1;\r\n";
            source += "    }\r\n";
            source += "}"

            var semicolonIndex = source.indexOf(";");

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, " + 1");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 26);
        }

        public static testTypeMember1() {
            // Should be able to reuse most of the type members.
            var source = "interface I { a: number; b: string; (c): d; new (e): f; g(): h }";

            var index = source.indexOf(": string");

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, index, "?");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 48);
        }

        public static testEnumElement1() {
            // Should be able to reuse most of the enum elements.
            var source = "enum E { a = 1, b = 1 << 1, c = 3, e = 4, f = 5, g = 7, h = 8, i = 9, j = 10 }";

            var index = source.indexOf("<<");

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withChange(oldText, index, 2, "+");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 54);
        }

        //public static testEnumElement1() {
        //    // Should be able to reuse most of the enum elements.
        //    var source = "enum E { a: 1, b: 1 << 1, c: 3, e: 4, f: 5, g: 7, h: 8, i: 9, j: 10 }";

        //    var index = source.indexOf("<<");

        //    var oldText = SimpleText.fromString(source);
        //    var newTextAndChange = IncrementalParserTests.withChange(oldText, index, 2, "+");

        //    compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 54);
        //}

        public static testStrictMode1() {
            // In non-strict mode 'yield' means nothing and can be reused.  In strict mode though
            // we'll have to reparse the nodes (and generate an error for 'static();'
            //
            // Note: in this test we don't actually add 'use strict'.  This is so we can compare 
            // reuse with/without a strict mode change.
            var source = "foo1();\r\nfoo1();\r\nfoo1();\r\yield();";

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, 0, "'strict';\r\n");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 28);
        }

        public static testStrictMode2() {
            // In non-strict mode 'yield' means nothing and can be reused.  In strict mode though
            // we'll have to reparse the nodes (and generate an error for 'yield();'
            var source = "foo1();\r\nfoo1();\r\nfoo1();\r\yield();";

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, 0, "'use strict';\r\n");

            // Note the decreased reuse of nodes compared to testStrictMode1
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 14);
        }

        public static testStrictMode3() {
            // In non-strict mode 'yield' means nothing and can be reused.  In strict mode though
            // we'll have to reparse the nodes (and generate an error for 'static();'
            //
            // Note: in this test we don't actually remove 'use strict'.  This is so we can compare 
            // reuse with/without a strict mode change.
            var source = "'strict';\r\nfoo1();\r\nfoo1();\r\nfoo1();\r\nyield();";

            var index = source.indexOf('f');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withDelete(oldText, 0, index);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 27);
        }

        public static testStrictMode4() {
            // In non-strict mode 'yield' means nothing and can be reused.  In strict mode though
            // we'll have to reparse the nodes (and generate an error for 'static();'
            var source = "'use strict';\r\nfoo1();\r\nfoo1();\r\nfoo1();\r\nyield();";

            var index = source.indexOf('f');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withDelete(oldText, 0, index);

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 12);
        }

        public static testIncremental5() {
            var source = "'use blahhh';\r\nfoo1();\r\nfoo2();\r\nfoo3();\r\nfoo4();\r\nfoo4();\r\nfoo6();\r\nfoo7();\r\nfoo8();\r\nfoo9();\r\n";

            var index = source.indexOf('b');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withChange(oldText, index, 6, "strict");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 37);
        }

        public static testIncremental6() {
            var source = "'use strict';\r\nfoo1();\r\nfoo2();\r\nfoo3();\r\nfoo4();\r\nfoo4();\r\nfoo6();\r\nfoo7();\r\nfoo8();\r\nfoo9();\r\n";

            var index = source.indexOf('s');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withChange(oldText, index, 6, "blahhh");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 37);
        }

        public static testDelete1() {
            var source = "'use blahhh';\r\nfoo1();\r\nfoo2();\r\nfoo3();\r\nfoo4();\r\nfoo4();\r\nfoo6();\r\nfoo7();\r\nfoo8();\r\nfoo9();\r\n";

            var index = source.indexOf('f');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withDelete(oldText, 0, index);

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 67);
        }

        public static testIncremental3() {
            var source = "var v = (a, b, c, d, e)";

            var index = source.indexOf('a');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, index + 1, ":");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testIncremental4() {
            var source = "var v = (a:, b, c, d, e)";

            var index = source.indexOf(':');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withDelete(oldText, index, 1);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testIncremental7() {
            var source = "var v = F<b>e";

            var index = source.indexOf('b');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, index + 1, ",x");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testIncremental8() {
            var source = "var v = F<a,b>e";

            var index = source.indexOf('b');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, index + 1, ",x");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testIncremental9() {
            var source = "var v = F<a,b,c>e";

            var index = source.indexOf('b');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, index + 1, ",x");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testIncremental10() {
            var source = "var v = F<a,b,c,d>e";

            var index = source.indexOf('b');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, index + 1, ",x");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testIncremental11() {
            var source = "interface IFoo<T> { }\r\ninterface Array<T> extends IFoo<T> { }";

            var index = source.indexOf('extends');
            var repeat = "extends IFoo<T>".length;

            for (var i = 0; i < repeat; i++) {
                var oldText = SimpleText.fromString(source);
                var newTextAndChange = withDelete(oldText, index, 1);
                compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);

                source = newTextAndChange.text.substr(0, newTextAndChange.text.length());
            }
        }

        public static testGenerics1() {
            var source = "var v = <T>(a);";

            var index = source.indexOf(';');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, index, " => 1");

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 4);
        }

        public static testGenerics2() {
            var source = "var v = <T>(a) => 1;";

            var index = source.indexOf(' =>');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withDelete(oldText, index, " => 1".length);

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 6);
        }

        public static testGenerics3() {
            var source = "var v = 1 >> = 2";

            var index = source.indexOf('>> =');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withDelete(oldText, index + 2, 1);

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testGenerics4() {
            var source = "var v = 1 >>= 2";

            var index = source.indexOf('>>=');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, index + 2, " ");

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 3);
        }

        public static testGenerics5() {
            var source = "var v = T>>(2)";

            var index = source.indexOf('T');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, index, "Foo<Bar<");

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 4);
        }

        public static testGenerics6() {
            var source = "var v = Foo<Bar<T>>(2)";

            var index = source.indexOf('Foo<Bar<');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withDelete(oldText, index, "Foo<Bar<".length);

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 5);
        }

        public static testGenerics7() {
            var source = "var v = T>>=2;";

            var index = source.indexOf('=');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withChange(oldText, index, "= ".length, ": Foo<Bar<");

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 3);
        }

        public static testGenerics8() {
            var source = "var v : Foo<Bar<T>>=2;";

            var index = source.indexOf(':');

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withChange(oldText, index, ": Foo<Bar<".length, "= ");

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 3);
        }

        public static testParenthesizedExpressionToLambda() {
            var source = "var v = (a, b) = c";

            var index = source.indexOf("= c") + 1;

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, index, ">");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testLambdaToParenthesizedExpression() {
            var source = "var v = (a, b) => c";

            var index = source.indexOf(">");

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withDelete(oldText, index, 1);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testGenericToArithmetic() {
            var source = "var v = new Dictionary<A, B>()";

            var index = source.indexOf("()");

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withDelete(oldText, index, 2);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testArithmeticToGeneric() {
            var source = "var v = new Dictionary<A, B>";

            var index = source.length;

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, index, "()");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static textComplexEdits1() {
            var source =
"if (typeParameterSymbol.isResolved() || typeParameterSymbol.isResolving()) {\
    return typeParameterSymbol;\
}\
else {\
    return null;\
}";

            var index = source.indexOf("||");

            var text1 = SimpleText.fromString(source);
            var textAndChange1 = withChange(text1, index, "|| typeParameterSymbol.isResolving()".length, "/*|| typeParameterSymbol.isResolving()*/");

            var text2 = textAndChange1.text;
            var start = text2.substr(0, text2.length()).indexOf("else");
            var end = text2.substr(0, text2.length()).lastIndexOf("}") + 1;

            var textAndChange2 = withDelete(text2, start, end - start);
            var text3 = textAndChange2.text;

            compareTrees(text1, text2, textAndChange1.textChangeRange, -1);
            compareTrees(text2, text3, textAndChange2.textChangeRange, -1);
            compareTrees(text1, text3, TextChangeRange.collapseChangesAcrossMultipleVersions([textAndChange1.textChangeRange, textAndChange2.textChangeRange]), -1);
        }

        public static testSemicolonDelete1() {
            var source = "export class Foo {\r\n}\r\n\r\nexport var foo = new Foo();\r\n\r\n    export function test(foo: Foo) {\r\n        return true;\r\n    }\r\n";

            var oldText = SimpleText.fromString(source);
            var index = source.lastIndexOf(";");
            var newTextAndChange = withDelete(oldText, index, 1);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 40);
        }

        public static testGenericError1() {
            var source = "class Dictionary<> { }\r\nvar y;\r\n";

            var oldText = SimpleText.fromString(source);
            var index = source.length;
            var newTextAndChange = withInsert(oldText, index, "var x;");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testParameterDeleteAfterComment1() {
            var source = "function fn(/* comment! */ a: number, c) { }";

            var oldText = SimpleText.fromString(source);
            var index = source.indexOf("a:");
            var newTextAndChange = withDelete(oldText, index, "a: number,".length);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testInsertModifierBeforeSetter1() {
            var source =
"class C {\
    set Bar(bar:string) {}\
}\
var o2 = { set Foo(val:number) { } };";

            var oldText = SimpleText.fromString(source);
            var index = source.indexOf("set");
            var newTextAndChange = withInsert(oldText, index, "public ");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testParameter2() {
            var source =
"alert(100);\
\
class OverloadedMonster {\
constructor();\
constructor(name) { }\
}";

            var oldText = SimpleText.fromString(source);
            var index = source.indexOf("100");
            var newTextAndChange = withInsert(oldText, index, "'1', ");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testInsertAboveComment() {
            var source =
"\
// foo\
1;";

            var oldText = SimpleText.fromString(source);
            var index = 0;
            var newTextAndChange = withInsert(oldText, index, "var x;\r\n");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testInsertDeclareAboveModule() {
            var source =
"module mAmbient {\
module m3 { }\
}";

            var oldText = SimpleText.fromString(source);
            var index = 0;
            var newTextAndChange = withInsert(oldText, index, "declare ");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testInsertFunctionAboveLambdaWithComment() {
            var source =
"\
() =>\
   // do something\
0;";

            var oldText = SimpleText.fromString(source);
            var index = 0;
            var newTextAndChange = withInsert(oldText, index, "function Foo() { }");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testSlashToRegex1() {
            var source = "while (true) /3; return;"

            var oldText = SimpleText.fromString(source);
            var index = source.length - 1;
            var newTextAndChange = withInsert(oldText, index, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testRegex1() {
            // Regex should become arithmetic expression
            var source = "return;\r\nwhile (true) /3/g;"

            var oldText = SimpleText.fromString(source);
            var index = source.indexOf("while");
            var newTextAndChange = withDelete(oldText, index, "while ".length);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testRegex2() {
            // Arithmetic expressoin should become regex
            var source = "return;\r\n(true) /3/g;"

            var oldText = SimpleText.fromString(source);
            var index = source.indexOf("(");
            var newTextAndChange = withInsert(oldText, index, "while ");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testKeywordAsIdentifier1() {
            // 'public' as a keyword should be incrementally unusable (because it has an 
            // unterminated comment).  When we convert it to an identifier, that shouldn't
            // change anything, and we should still get the same errors.
            var source = "return; a.public /*"

            var oldText = SimpleText.fromString(source);
            var newTextAndChange = withInsert(oldText, 0, "");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testSkippedToken1() {
            // 'public' as a keyword should be incrementally unusable (because it has an 
            // unterminated comment).  When we convert it to an identifier, that shouldn't
            // change anything, and we should still get the same errors.
            var source = "function foo() {\r\n" +
                "            function getOccurrencesAtPosition() {\r\n" + 
                "            switch (node) {\r\n" +
                "                enum \r\n" +
                "            }\r\n" +
                "                \r\n" + 
                "                return undefined;\r\n" +
                "                \r\n" + 
                "                function keywordToReferenceEntry() {\r\n" +
                "                }\r\n" +
                "            }\r\n" +
                "                \r\n" +
                "            return {\r\n" +
                "                getEmitOutput: (filename): Bar => null,\r\n" +
                "            };\r\n" + 
                "        }";

            var text1 = SimpleText.fromString(source);
            var tree1 = Parser.parse("", text1, ts.ScriptTarget.ES5, false);

            var index = source.indexOf("enum ") + "enum ".length;
            var textAndChange1 = withInsert(text1, index, "F");

            var incrementalTree1 = IncrementalParser.parse(tree1, textAndChange1.textChangeRange, textAndChange1.text);

            var textAndChange2 = withInsert(textAndChange1.text, index + 1, "o");

            var incrementalTree2 = IncrementalParser.parse(incrementalTree1, textAndChange2.textChangeRange, textAndChange2.text);
        }
    }
}