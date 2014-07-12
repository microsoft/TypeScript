///<reference path='..\..\..\src\Compiler\Syntax\References.ts' />
///<reference path='..\..\..\src\Compiler\Core\Environment.ts' />
///<reference path='..\..\..\src\Compiler\SyntaxTreeToAstVisitor.ts' />

module TypeScript {
    export class SyntaxElementsCollector extends SyntaxWalker {
        private elements: ISyntaxElement[] = [];

        public visitNode(node: SyntaxNode) {
            this.elements.push(node);
            super.visitNode(node);
        }

        public visitToken(token: ISyntaxToken) {
            this.elements.push(token);
        }

        public static collectElements(node: SourceUnitSyntax): ISyntaxElement[] {
            var collector = new SyntaxElementsCollector();
            node.accept(collector);
            return collector.elements;
        }
    }

    function withChange(text: IText, start: number, length: number, newText: string): { text: IText; textChangeRange: TextChangeRange; } {
        var contents = text.toString();
        var newContents = contents.substr(0, start) + newText + contents.substring(start + length);

        return { text: TextFactory.createText(newContents), textChangeRange: new TextChangeRange(new TextSpan(start, length), newText.length) }
    }

    function withInsert(text: IText, start: number, newText: string): { text: IText; textChangeRange: TextChangeRange; } {
        return withChange(text, start, 0, newText);
    }

    function withDelete(text: IText, start: number, length: number): { text: IText; textChangeRange: TextChangeRange; } {
        return withChange(text, start, length, "");
    }

    // NOTE: 'reusedElements' is the expected count of elements reused from the old tree to the new
    // tree.  It may change as we tweak the parser.  If the count increases then that should always
    // be a good thing.  If it decreases, that's not great (less reusability), but that may be 
    // unavoidable.  If it does decrease an investigation 
    function compareTrees(oldText: IText, newText: IText, textChangeRange: TextChangeRange, reusedElements: number = -1): void {
        var oldTree = Parser.parse("", oldText, false, new ParseOptions(LanguageVersion.EcmaScript5, true));
        var settings = ImmutableCompilationSettings.defaultSettings();
        var oldAST = SyntaxTreeToAstVisitor.visit(oldTree, "", settings, /*incrementalAST:*/ true);

        var newTree = Parser.parse("", newText, false, new ParseOptions(LanguageVersion.EcmaScript5, true));
        var newAST = SyntaxTreeToAstVisitor.visit(newTree, "", settings, /*incrementalAST:*/ true);

        var incrementalNewTree = Parser.incrementalParse(oldTree, textChangeRange, newText);
        var incrementalNewAST = SyntaxTreeToAstVisitor.visit(incrementalNewTree, "", settings, /*incrementalAST:*/ true);

        // We should get the same tree when doign a full or incremental parse.
        Debug.assert(newTree.structuralEquals(incrementalNewTree));

        // There should be no reused nodes between two trees that are fully parsed.
        Debug.assert(IncrementalParserTests.reusedElements(oldTree.sourceUnit(), newTree.sourceUnit()) === 0);

        if (reusedElements !== -1) {
            var actualReusedCount = IncrementalParserTests.reusedElements(oldTree.sourceUnit(), incrementalNewTree.sourceUnit());
            Debug.assert(actualReusedCount === reusedElements, actualReusedCount + " !== " + reusedElements);
        }

        Debug.assert(newAST.structuralEquals(incrementalNewAST, true));
    }

    export class IncrementalParserTests {
        public static runAllTests() {
            for (var name in IncrementalParserTests) {
                if (IncrementalParserTests.hasOwnProperty(name) && StringUtilities.startsWith(name, "test")) {
                    var o: TypeScript.IIndexable<any> = <any>IncrementalParserTests;
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

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, " + 1");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 31);
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

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withDelete(oldText, index, 3);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 31);
        }

        public static testIncrementalRegex1() {
            var source = "class C { public foo1() { /; } public foo2() { return 1;} public foo3() { } }";

            var semicolonIndex = source.indexOf(";}");

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 21);
        }

        public static testIncrementalComment1() {
            var source = "class C { public foo1() { /; } public foo2() { return 1; } public foo3() { } }";

            var semicolonIndex = source.indexOf(";");

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 7);
        }

        public static testIncrementalComment2() {
            var source = "class C { public foo1() { /; } public foo2() { return 1; } public foo3() { } }";

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withInsert(oldText, 0, "//");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        }

        public static testIncrementalComment3() {
            var source = "//class C { public foo1() { /; } public foo2() { return 1; } public foo3() { } }";

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withDelete(oldText, 0, 2);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        }

        public static testIncrementalComment4() {
            var source = "class C { public foo1() { /; } public foo2() { */ return 1; } public foo3() { } }";

            var index = source.indexOf(";");
            var oldText = TextFactory.createText(source);
            var newTextAndChange = withInsert(oldText, index, "*");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 22);
        }

        public static testParameter1() {
            // Should be able to reuse all the parameters.
            var source = "class C {\r\n";
            source += "    public foo2(a, b, c, d) {\r\n";
            source += "        return 1;\r\n";
            source += "    }\r\n";
            source += "}"

            var semicolonIndex = source.indexOf(";");

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, " + 1");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 22);
        }

        public static testTypeMember1() {
            // Should be able to reuse most of the type members.
            var source = "interface I { a: number; b: string; (c): d; new (e): f; g(): h }";

            var index = source.indexOf(": string");

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withInsert(oldText, index, "?");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 43);
        }

        public static testEnumElement1() {
            // Should be able to reuse most of the enum elements.
            var source = "enum E { a = 1, b = 1 << 1, c = 3, e = 4, f = 5, g = 7, h = 8, i = 9, j = 10 }";

            var index = source.indexOf("<<");

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withChange(oldText, index, 2, "+");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 54);
        }

        //public static testEnumElement1() {
        //    // Should be able to reuse most of the enum elements.
        //    var source = "enum E { a: 1, b: 1 << 1, c: 3, e: 4, f: 5, g: 7, h: 8, i: 9, j: 10 }";

        //    var index = source.indexOf("<<");

        //    var oldText = TextFactory.createText(source);
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

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withInsert(oldText, 0, "'strict';\r\n");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 21);
        }

        public static testStrictMode2() {
            // In non-strict mode 'yield' means nothing and can be reused.  In strict mode though
            // we'll have to reparse the nodes (and generate an error for 'yield();'
            var source = "foo1();\r\nfoo1();\r\nfoo1();\r\yield();";

            var oldText = TextFactory.createText(source);
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

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withDelete(oldText, 0, index);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 20);
        }

        public static testStrictMode4() {
            // In non-strict mode 'yield' means nothing and can be reused.  In strict mode though
            // we'll have to reparse the nodes (and generate an error for 'static();'
            var source = "'use strict';\r\nfoo1();\r\nfoo1();\r\nfoo1();\r\nyield();";

            var index = source.indexOf('f');

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withDelete(oldText, 0, index);

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 12);
        }

        public static testIncremental5() {
            var source = "'use blahhh';\r\nfoo1();\r\nfoo2();\r\nfoo3();\r\nfoo4();\r\nfoo4();\r\nfoo6();\r\nfoo7();\r\nfoo8();\r\nfoo9();\r\n";

            var index = source.indexOf('b');

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withChange(oldText, index, 6, "strict");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 37);
        }

        public static testIncremental6() {
            var source = "'use strict';\r\nfoo1();\r\nfoo2();\r\nfoo3();\r\nfoo4();\r\nfoo4();\r\nfoo6();\r\nfoo7();\r\nfoo8();\r\nfoo9();\r\n";

            var index = source.indexOf('s');

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withChange(oldText, index, 6, "blahhh");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 37);
        }

        public static testDelete1() {
            var source = "'use blahhh';\r\nfoo1();\r\nfoo2();\r\nfoo3();\r\nfoo4();\r\nfoo4();\r\nfoo6();\r\nfoo7();\r\nfoo8();\r\nfoo9();\r\n";

            var index = source.indexOf('f');

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withDelete(oldText, 0, index);

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 59);
        }

        public static testGenerics1() {
            var source = "var v = <T>(a);";

            var index = source.indexOf(';');

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withInsert(oldText, index, " => 1");

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 4);
        }

        public static testGenerics2() {
            var source = "var v = <T>(a) => 1;";

            var index = source.indexOf(' =>');

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withDelete(oldText, index, " => 1".length);

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 6);
        }

        public static testGenerics3() {
            var source = "var v = 1 >> = 2";

            var index = source.indexOf('>> =');

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withDelete(oldText, index + 2, 1);

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 3);
        }

        public static testGenerics4() {
            var source = "var v = 1 >>= 2";

            var index = source.indexOf('>>=');

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withInsert(oldText, index + 2, " ");

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 3);
        }

        public static testGenerics5() {
            var source = "var v = T>>(2)";

            var index = source.indexOf('T');

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withInsert(oldText, index, "Foo<Bar<");

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 4);
        }

        public static testGenerics6() {
            var source = "var v = Foo<Bar<T>>(2)";

            var index = source.indexOf('Foo<Bar<');

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withDelete(oldText, index, "Foo<Bar<".length);

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 5);
        }

        public static testGenerics7() {
            var source = "var v = T>>=2;";

            var index = source.indexOf('=');

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withChange(oldText, index, "= ".length, ": Foo<Bar<");

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 3);
        }

        public static testGenerics8() {
            var source = "var v : Foo<Bar<T>>=2;";

            var index = source.indexOf(':');

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withChange(oldText, index, ": Foo<Bar<".length, "= ");

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 3);
        }

        public static testParenthesizedExpressionToLambda() {
            var source = "var v = (a, b) = c";

            var index = source.indexOf("= c") + 1;

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withInsert(oldText, index, ">");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testLambdaToParenthesizedExpression() {
            var source = "var v = (a, b) => c";

            var index = source.indexOf(">");

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withDelete(oldText, index, 1);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testGenericToArithmetic() {
            var source = "var v = new Dictionary<A, B>()";

            var index = source.indexOf("()");

            var oldText = TextFactory.createText(source);
            var newTextAndChange = withDelete(oldText, index, 2);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testArithmeticToGeneric() {
            var source = "var v = new Dictionary<A, B>";

            var index = source.length;

            var oldText = TextFactory.createText(source);
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

            var text1 = TextFactory.createText(source);
            var textAndChange1 = withChange(text1, index, "|| typeParameterSymbol.isResolving()".length, "/*|| typeParameterSymbol.isResolving()*/");

            var text2 = textAndChange1.text;
            var start = text2.toString().indexOf("else");
            var end = text2.toString().lastIndexOf("}") + 1;

            var textAndChange2 = withDelete(text2, start, end - start);
            var text3 = textAndChange2.text;

            compareTrees(text1, text2, textAndChange1.textChangeRange, -1);
            compareTrees(text2, text3, textAndChange2.textChangeRange, -1);
            compareTrees(text1, text3, TextChangeRange.collapseChangesAcrossMultipleVersions([textAndChange1.textChangeRange, textAndChange2.textChangeRange]), -1);
        }

        public static testSemicolonDelete1() {
            var source = "export class Foo {\r\n}\r\n\r\nexport var foo = new Foo();\r\n\r\n    export function test(foo: Foo) {\r\n        return true;\r\n    }\r\n";

            var oldText = TextFactory.createText(source);
            var index = source.lastIndexOf(";");
            var newTextAndChange = withDelete(oldText, index, 1);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 33);
        }

        public static testGenericError1() {
            var source = "class Dictionary<> { }\r\nvar y;\r\n";

            var oldText = TextFactory.createText(source);
            var index = source.length;
            var newTextAndChange = withInsert(oldText, index, "var x;");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testParameterDeleteAfterComment1() {
            var source = "function fn(/* comment! */ a: number, c) { }";

            var oldText = TextFactory.createText(source);
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

            var oldText = TextFactory.createText(source);
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

            var oldText = TextFactory.createText(source);
            var index = source.indexOf("100");
            var newTextAndChange = withInsert(oldText, index, "'1', ");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testInsertAboveComment() {
            var source =
"\
// foo\
1;";

            var oldText = TextFactory.createText(source);
            var index = 0;
            var newTextAndChange = withInsert(oldText, index, "var x;\r\n");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        public static testInsertDeclareAboveModule() {
            var source =
"module mAmbient {\
module m3 { }\
}";

            var oldText = TextFactory.createText(source);
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

            var oldText = TextFactory.createText(source);
            var index = 0;
            var newTextAndChange = withInsert(oldText, index, "function Foo() { }");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        }

        //public static testComplexEdits1() {
        //    var source = Environment.readFile(Environment.currentDirectory() + "\\tests\\Fidelity\\incremental\\resources\\pullTypeChecker.ts");
            
        //    var index = source.indexOf("if (isGetter && !hasReturn) {");
        //    index += "if (isGetter ".length;

        //    var text1 = TextFactory.createText(source);
        //    var newTextAndChange1 = withChange(text1, index, "&& !hasReturn".length, "/*&& !hasReturn*/");
        //    var text2 = newTextAndChange1.text;

        //    compareTrees(text1, text2, newTextAndChange1.textChangeRange);

        //    // index = 
        //}
    }
}