namespace ts {
    function withChange(text: IScriptSnapshot, start: number, length: number, newText: string): { text: IScriptSnapshot; textChangeRange: TextChangeRange; } {
        const contents = getSnapshotText(text);
        const newContents = contents.substr(0, start) + newText + contents.substring(start + length);

        return { text: ScriptSnapshot.fromString(newContents), textChangeRange: createTextChangeRange(createTextSpan(start, length), newText.length) };
    }

    function withInsert(text: IScriptSnapshot, start: number, newText: string): { text: IScriptSnapshot; textChangeRange: TextChangeRange; } {
        return withChange(text, start, 0, newText);
    }

    function withDelete(text: IScriptSnapshot, start: number, length: number): { text: IScriptSnapshot; textChangeRange: TextChangeRange; } {
        return withChange(text, start, length, "");
    }

    function createTree(text: IScriptSnapshot, version: string) {
        return createLanguageServiceSourceFile(/*fileName:*/ "", text, ScriptTarget.Latest, version, /*setNodeParents:*/ true);
    }

    function assertSameDiagnostics(file1: SourceFile, file2: SourceFile) {
        const diagnostics1 = file1.parseDiagnostics;
        const diagnostics2 = file2.parseDiagnostics;

        assert.equal(diagnostics1.length, diagnostics2.length, "diagnostics1.length !== diagnostics2.length");
        for (let i = 0; i < diagnostics1.length; i++) {
            const d1 = diagnostics1[i];
            const d2 = diagnostics2[i];

            assert.equal(d1.file, file1, "d1.file !== file1");
            assert.equal(d2.file, file2, "d2.file !== file2");
            assert.equal(d1.start, d2.start, "d1.start !== d2.start");
            assert.equal(d1.length, d2.length, "d1.length !== d2.length");
            assert.equal(d1.messageText, d2.messageText, "d1.messageText !== d2.messageText");
            assert.equal(d1.category, d2.category, "d1.category !== d2.category");
            assert.equal(d1.code, d2.code, "d1.code !== d2.code");
        }
    }

    // NOTE: 'reusedElements' is the expected count of elements reused from the old tree to the new
    // tree.  It may change as we tweak the parser.  If the count increases then that should always
    // be a good thing.  If it decreases, that's not great (less reusability), but that may be
    // unavoidable.  If it does decrease an investigation should be done to make sure that things
    // are still ok and we're still appropriately reusing most of the tree.
    function compareTrees(oldText: IScriptSnapshot, newText: IScriptSnapshot, textChangeRange: TextChangeRange, expectedReusedElements: number, oldTree?: SourceFile) {
        oldTree = oldTree || createTree(oldText, /*version:*/ ".");
        Utils.assertInvariants(oldTree, /*parent:*/ undefined);

        // Create a tree for the new text, in a non-incremental fashion.
        const newTree = createTree(newText, oldTree.version + ".");
        Utils.assertInvariants(newTree, /*parent:*/ undefined);

        // Create a tree for the new text, in an incremental fashion.
        const incrementalNewTree = updateLanguageServiceSourceFile(oldTree, newText, oldTree.version + ".", textChangeRange);
        Utils.assertInvariants(incrementalNewTree, /*parent:*/ undefined);

        // We should get the same tree when doign a full or incremental parse.
        Utils.assertStructuralEquals(newTree, incrementalNewTree);

        // We should also get the exact same set of diagnostics.
        assertSameDiagnostics(newTree, incrementalNewTree);

        // There should be no reused nodes between two trees that are fully parsed.
        assert.isTrue(reusedElements(oldTree, newTree) === 0);

        assert.equal(newTree.fileName, incrementalNewTree.fileName, "newTree.fileName !== incrementalNewTree.fileName");
        assert.equal(newTree.text, incrementalNewTree.text, "newTree.text !== incrementalNewTree.text");

        if (expectedReusedElements !== -1) {
            const actualReusedCount = reusedElements(oldTree, incrementalNewTree);
            assert.equal(actualReusedCount, expectedReusedElements, actualReusedCount + " !== " + expectedReusedElements);
        }

        return { oldTree, newTree, incrementalNewTree };
    }

    function reusedElements(oldNode: SourceFile, newNode: SourceFile): number {
        const allOldElements = collectElements(oldNode);
        const allNewElements = collectElements(newNode);

        return filter(allOldElements, v => contains(allNewElements, v)).length;
    }

    function collectElements(node: Node) {
        const result: Node[] = [];
        visit(node);
        return result;

        function visit(node: Node) {
            result.push(node);
            forEachChild(node, visit);
        }
    }

    function deleteCode(source: string, index: number, toDelete: string) {
        const repeat = toDelete.length;
        let oldTree = createTree(ScriptSnapshot.fromString(source), /*version:*/ ".");
        for (let i = 0; i < repeat; i++) {
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, index, 1);
            const newTree = compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1, oldTree).incrementalNewTree;

            source = getSnapshotText(newTextAndChange.text);
            oldTree = newTree;
        }
    }

    function insertCode(source: string, index: number, toInsert: string) {
        const repeat = toInsert.length;
        let oldTree = createTree(ScriptSnapshot.fromString(source), /*version:*/ ".");
        for (let i = 0; i < repeat; i++) {
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, index + i, toInsert.charAt(i));
            const newTree = compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1, oldTree).incrementalNewTree;

            source = getSnapshotText(newTextAndChange.text);
            oldTree = newTree;
        }
    }

    describe("unittests:: Incremental Parser", () => {
        it("Inserting into method", () => {
            const source = "class C {\r\n" +
                "    public foo1() { }\r\n" +
                "    public foo2() {\r\n" +
                "        return 1;\r\n" +
                "    }\r\n" +
                "    public foo3() { }\r\n" +
                "}";

            const oldText = ScriptSnapshot.fromString(source);
            const semicolonIndex = source.indexOf(";");
            const newTextAndChange = withInsert(oldText, semicolonIndex, " + 1");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 8);
        });

        it("Deleting from method", () => {
            const source = "class C {\r\n" +
                "    public foo1() { }\r\n" +
                "    public foo2() {\r\n" +
                "        return 1 + 1;\r\n" +
                "    }\r\n" +
                "    public foo3() { }\r\n" +
                "}";

            const index = source.indexOf("+ 1");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, index, "+ 1".length);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 8);
        });

        it("Regular expression 1", () => {
            const source = "class C { public foo1() { /; } public foo2() { return 1;} public foo3() { } }";

            const semicolonIndex = source.indexOf(";}");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, semicolonIndex, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Regular expression 2", () => {
            const source = "class C { public foo1() { ; } public foo2() { return 1/;} public foo3() { } }";

            const semicolonIndex = source.indexOf(";");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, semicolonIndex, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 4);
        });

        it("Comment 1", () => {
            const source = "class C { public foo1() { /; } public foo2() { return 1; } public foo3() { } }";

            const semicolonIndex = source.indexOf(";");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, semicolonIndex, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Comment 2", () => {
            const source = "class C { public foo1() { /; } public foo2() { return 1; } public foo3() { } }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, 0, "//");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Comment 3", () => {
            const source = "//class C { public foo1() { /; } public foo2() { return 1; } public foo3() { } }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, 0, 2);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Comment 4", () => {
            const source = "class C { public foo1() { /; } public foo2() { */ return 1; } public foo3() { } }";

            const index = source.indexOf(";");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, index, "*");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 4);
        });

        it("Parameter 1", () => {
            // Should be able to reuse all the parameters.
            const source = "class C {\r\n" +
                "    public foo2(a, b, c, d) {\r\n" +
                "        return 1;\r\n" +
                "    }\r\n" +
                "}";

            const semicolonIndex = source.indexOf(";");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, semicolonIndex, " + 1");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 8);
        });

        it("Type member 1", () => {
            // Should be able to reuse most of the type members.
            const source = "interface I { a: number; b: string; (c): d; new (e): f; g(): h }";

            const index = source.indexOf(": string");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, index, "?");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 14);
        });

        it("Enum element 1", () => {
            // Should be able to reuse most of the enum elements.
            const source = "enum E { a = 1, b = 1 << 1, c = 3, e = 4, f = 5, g = 7, h = 8, i = 9, j = 10 }";

            const index = source.indexOf("<<");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, index, 2, "+");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 24);
        });

        it("Strict mode 1", () => {
            const source = "foo1();\r\nfoo1();\r\nfoo1();\r\package();";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, 0, "'strict';\r\n");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 9);
        });

        it("Strict mode 2", () => {
            const source = "foo1();\r\nfoo1();\r\nfoo1();\r\package();";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, 0, "'use strict';\r\n");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 9);
        });

        it("Strict mode 3", () => {
            const source = "'strict';\r\nfoo1();\r\nfoo1();\r\nfoo1();\r\npackage();";

            const index = source.indexOf("f");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, 0, index);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 9);
        });

        it("Strict mode 4", () => {
            const source = "'use strict';\r\nfoo1();\r\nfoo1();\r\nfoo1();\r\npackage();";

            const index = source.indexOf("f");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, 0, index);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 9);
        });

        it("Strict mode 5", () => {
            const source = "'use blahhh';\r\nfoo1();\r\nfoo2();\r\nfoo3();\r\nfoo4();\r\nfoo4();\r\nfoo6();\r\nfoo7();\r\nfoo8();\r\nfoo9();\r\n";

            const index = source.indexOf("b");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, index, 6, "strict");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 27);
        });

        it("Strict mode 6", () => {
            const source = "'use strict';\r\nfoo1();\r\nfoo2();\r\nfoo3();\r\nfoo4();\r\nfoo4();\r\nfoo6();\r\nfoo7();\r\nfoo8();\r\nfoo9();\r\n";

            const index = source.indexOf("s");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, index, 6, "blahhh");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 27);
        });

        it("Strict mode 7", () => {
            const source = "'use blahhh';\r\nfoo1();\r\nfoo2();\r\nfoo3();\r\nfoo4();\r\nfoo4();\r\nfoo6();\r\nfoo7();\r\nfoo8();\r\nfoo9();\r\n";

            const index = source.indexOf("f");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, 0, index);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 24);
        });

        it("Parenthesized expression to arrow function 1", () => {
            const source = "var v = (a, b, c, d, e)";

            const index = source.indexOf("a");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, index + 1, ":");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Parenthesized expression to arrow function 2", () => {
            const source = "var v = (a, b) = c";

            const index = source.indexOf("= c") + 1;
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, index, ">");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Arrow function to parenthesized expression 1", () => {
            const source = "var v = (a:, b, c, d, e)";

            const index = source.indexOf(":");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, index, 1);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Arrow function to parenthesized expression 2", () => {
            const source = "var v = (a, b) => c";

            const index = source.indexOf(">");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, index, 1);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Speculative generic lookahead 1", () => {
            const source = "var v = F<b>e";

            const index = source.indexOf("b");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, index + 1, ",x");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        });

        it("Speculative generic lookahead 2", () => {
            const source = "var v = F<a,b>e";

            const index = source.indexOf("b");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, index + 1, ",x");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        });

        it("Speculative generic lookahead 3", () => {
            const source = "var v = F<a,b,c>e";

            const index = source.indexOf("b");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, index + 1, ",x");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        });

        it("Speculative generic lookahead 4", () => {
            const source = "var v = F<a,b,c,d>e";

            const index = source.indexOf("b");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, index + 1, ",x");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        });

        it("Assertion to arrow function", () => {
            const source = "var v = <T>(a);";

            const index = source.indexOf(";");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, index, " => 1");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Arrow function to assertion", () => {
            const source = "var v = <T>(a) => 1;";

            const index = source.indexOf(" =>");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, index, " => 1".length);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Contextual shift to shift-equals", () => {
            const source = "var v = 1 >> = 2";

            const index = source.indexOf(">> =");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, index + 2, 1);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Contextual shift-equals to shift", () => {
            const source = "var v = 1 >>= 2";

            const index = source.indexOf(">>=");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, index + 2, " ");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Contextual shift to generic invocation", () => {
            const source = "var v = T>>(2)";

            const index = source.indexOf("T");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, index, "Foo<Bar<");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Test generic invocation to contextual shift", () => {
            const source = "var v = Foo<Bar<T>>(2)";

            const index = source.indexOf("Foo<Bar<");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, index, "Foo<Bar<".length);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Contextual shift to generic type and initializer", () => {
            const source = "var v = T>>=2;";

            const index = source.indexOf("=");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, index, "= ".length, ": Foo<Bar<");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Generic type and initializer to contextual shift", () => {
            const source = "var v : Foo<Bar<T>>=2;";

            const index = source.indexOf(":");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, index, ": Foo<Bar<".length, "= ");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Arithmetic operator to type argument list", () => {
            const source = "var v = new Dictionary<A, B>0";

            const index = source.indexOf("0");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, index, 1, "()");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Type argument list to arithmetic operator", () => {
            const source = "var v = new Dictionary<A, B>()";

            const index = source.indexOf("()");
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, index, 2);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Yield context 1", () => {
            // We're changing from a non-generator to a genarator.  We can't reuse statement nodes.
            const source = "function foo() {\r\nyield(foo1);\r\n}";

            const oldText = ScriptSnapshot.fromString(source);
            const index = source.indexOf("foo");
            const newTextAndChange = withInsert(oldText, index, "*");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Yield context 2", () => {
            // We're changing from a generator to a non-genarator.  We can't reuse statement nodes.
            const source = "function *foo() {\r\nyield(foo1);\r\n}";

            const oldText = ScriptSnapshot.fromString(source);
            const index = source.indexOf("*");
            const newTextAndChange = withDelete(oldText, index, "*".length);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Delete semicolon", () => {
            const source = "export class Foo {\r\n}\r\n\r\nexport var foo = new Foo();\r\n\r\n    export function test(foo: Foo) {\r\n        return true;\r\n    }\r\n";

            const oldText = ScriptSnapshot.fromString(source);
            const index = source.lastIndexOf(";");
            const newTextAndChange = withDelete(oldText, index, 1);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 14);
        });

        it("Edit after empty type parameter list", () => {
            const source = "class Dictionary<> { }\r\nvar y;\r\n";

            const oldText = ScriptSnapshot.fromString(source);
            const index = source.length;
            const newTextAndChange = withInsert(oldText, index, "var x;");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 2);
        });

        it("Delete parameter after comment", () => {
            const source = "function fn(/* comment! */ a: number, c) { }";

            const oldText = ScriptSnapshot.fromString(source);
            const index = source.indexOf("a:");
            const newTextAndChange = withDelete(oldText, index, "a: number,".length);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Modifier added to accessor", () => {
            const source =
                "class C {\
    set Bar(bar:string) {}\
}\
var o2 = { set Foo(val:number) { } };";

            const oldText = ScriptSnapshot.fromString(source);
            const index = source.indexOf("set");
            const newTextAndChange = withInsert(oldText, index, "public ");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 14);
        });

        it("Insert parameter ahead of parameter", () => {
            const source =
                "alert(100);\
\
class OverloadedMonster {\
constructor();\
constructor(name) { }\
}";

            const oldText = ScriptSnapshot.fromString(source);
            const index = source.indexOf("100");
            const newTextAndChange = withInsert(oldText, index, "'1', ");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 7);
        });

        it("Insert declare modifier before module", () => {
            const source =
                "module mAmbient {\
module m3 { }\
}";

            const oldText = ScriptSnapshot.fromString(source);
            const index = 0;
            const newTextAndChange = withInsert(oldText, index, "declare ");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Insert function above arrow function with comment", () => {
            const source =
                "\
() =>\
   // do something\
0;";

            const oldText = ScriptSnapshot.fromString(source);
            const index = 0;
            const newTextAndChange = withInsert(oldText, index, "function Foo() { }");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Finish incomplete regular expression", () => {
            const source = "while (true) /3; return;";

            const oldText = ScriptSnapshot.fromString(source);
            const index = source.length - 1;
            const newTextAndChange = withInsert(oldText, index, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Regular expression to divide operation", () => {
            const source = "return;\r\nwhile (true) /3/g;";

            const oldText = ScriptSnapshot.fromString(source);
            const index = source.indexOf("while");
            const newTextAndChange = withDelete(oldText, index, "while ".length);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Divide operation to regular expression", () => {
            const source = "return;\r\n(true) /3/g;";

            const oldText = ScriptSnapshot.fromString(source);
            const index = source.indexOf("(");
            const newTextAndChange = withInsert(oldText, index, "while ");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Unterminated comment after keyword converted to identifier", () => {
            // 'public' as a keyword should be incrementally unusable (because it has an
            // unterminated comment).  When we convert it to an identifier, that shouldn't
            // change anything, and we should still get the same errors.
            const source = "return; a.public /*";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, 0, "");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 7);
        });

        it("Class to interface", () => {
            const source = "class A { public M1() { } public M2() { } public M3() { } p1 = 0; p2 = 0; p3 = 0 }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 0, "class".length, "interface");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Interface to class", () => {
            const source = "interface A { M1?(); M2?(); M3?(); p1?; p2?; p3? }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 0, "interface".length, "class");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Surrounding function declarations with block", () => {
            const source = "declare function F1() { } export function F2() { } declare export function F3() { }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withInsert(oldText, 0, "{");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 9);
        });

        it("Removing block around function declarations", () => {
            const source = "{ declare function F1() { } export function F2() { } declare export function F3() { }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withDelete(oldText, 0, "{".length);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 9);
        });

        it("Moving methods from class to object literal", () => {
            const source = "class C { public A() { } public B() { } public C() { } }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 0, "class C".length, "var v =");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Moving methods from object literal to class", () => {
            const source = "var v = { public A() { } public B() { } public C() { } }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 0, "var v =".length, "class C");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 4);
        });

        it("Moving methods from object literal to class in strict mode", () => {
            const source = "\"use strict\"; var v = { public A() { } public B() { } public C() { } }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 14, "var v =".length, "class C");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 4);
        });

        it("Do not move constructors from class to object-literal.", () => {
            const source = "class C { public constructor() { } public constructor() { } public constructor() { } }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 0, "class C".length, "var v =");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Do not move methods called \"constructor\" from object literal to class", () => {
            const source = "var v = { public constructor() { } public constructor() { } public constructor() { } }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 0, "var v =".length, "class C");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Moving index signatures from class to interface", () => {
            const source = "class C { public [a: number]: string; public [a: number]: string; public [a: number]: string }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 0, "class".length, "interface");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 18);
        });

        it("Moving index signatures from class to interface in strict mode", () => {
            const source = "\"use strict\"; class C { public [a: number]: string; public [a: number]: string; public [a: number]: string }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 14, "class".length, "interface");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 18);
        });

        it("Moving index signatures from interface to class", () => {
            const source = "interface C { public [a: number]: string; public [a: number]: string; public [a: number]: string }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 0, "interface".length, "class");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 18);
        });


        it("Moving index signatures from interface to class in strict mode", () => {
            const source = "\"use strict\"; interface C { public [a: number]: string; public [a: number]: string; public [a: number]: string }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 14, "interface".length, "class");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 18);
        });

        it("Moving accessors from class to object literal", () => {
            const source = "class C { public get A() { } public get B() { } public get C() { } }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 0, "class C".length, "var v =");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it("Moving accessors from object literal to class", () => {
            const source = "var v = { public get A() { } public get B() { } public get C() { } }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 0, "var v =".length, "class C");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 4);
        });


        it("Moving accessors from object literal to class in strict mode", () => {
            const source = "\"use strict\"; var v = { public get A() { } public get B() { } public get C() { } }";

            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 14, "var v =".length, "class C");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 4);
        });

        it("Reuse transformFlags of subtree during bind", () => {
            const source = `class Greeter { constructor(element: HTMLElement) { } }`;
            const oldText = ScriptSnapshot.fromString(source);
            const newTextAndChange = withChange(oldText, 15, 0, "\n");
            const { oldTree, incrementalNewTree } = compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
            bindSourceFile(oldTree, {});
            bindSourceFile(incrementalNewTree, {});
            assert.equal(oldTree.transformFlags, incrementalNewTree.transformFlags);
        });

        // Simulated typing tests.

        it("Type extends clause 1", () => {
            const source = "interface IFoo<T> { }\r\ninterface Array<T> extends IFoo<T> { }";

            const index = source.indexOf("extends");
            deleteCode(source, index, "extends IFoo<T>");
        });

        it("Type after incomplete enum 1", () => {
            const source = "function foo() {\r\n" +
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
                "                getEmitOutput: (fileName): Bar => null,\r\n" +
                "            };\r\n" +
                "        }";

            const index = source.indexOf("enum ") + "enum ".length;
            insertCode(source, index, "Fo");
        });

        for (const tsIgnoreComment of [
            "// @ts-ignore",
            "/* @ts-ignore */",
            "/*\n  @ts-ignore */"
        ]) {
            describe(`${tsIgnoreComment} comment directives`, () => {
                const textWithIgnoreComment = `const x = 10;
    function foo() {
        ${tsIgnoreComment}
        let y: string = x;
        return y;
    }
    function bar() {
        ${tsIgnoreComment}
        let z : string = x;
        return z;
    }
    function bar3() {
        ${tsIgnoreComment}
        let z : string = x;
        return z;
    }
    foo();
    bar();
    bar3();`;
                verifyScenario("when deleting ts-ignore comment", verifyDelete);
                verifyScenario("when inserting ts-ignore comment", verifyInsert);
                verifyScenario("when changing ts-ignore comment to blah", verifyChangeToBlah);
                verifyScenario("when changing blah comment to ts-ignore", verifyChangeBackToDirective);
                verifyScenario("when deleting blah comment", verifyDeletingBlah);
                verifyScenario("when changing text that adds another comment", verifyChangeDirectiveType);
                verifyScenario("when changing text that keeps the comment but adds more nodes", verifyReuseChange);

                function verifyCommentDirectives(oldText: IScriptSnapshot, newTextAndChange: { text: IScriptSnapshot; textChangeRange: TextChangeRange; }) {
                    const { incrementalNewTree, newTree } = compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
                    assert.deepEqual(incrementalNewTree.commentDirectives, newTree.commentDirectives);
                }

                function verifyScenario(scenario: string, verifyChange: (atIndex: number, singleIgnore?: true) => void) {
                    it(`${scenario} - 0`, () => {
                        verifyChange(0);
                    });
                    it(`${scenario} - 1`, () => {
                        verifyChange(1);
                    });
                    it(`${scenario} - 2`, () => {
                        verifyChange(2);
                    });
                    it(`${scenario} - with single ts-ignore`, () => {
                        verifyChange(0, /*singleIgnore*/ true);
                    });
                }

                function getIndexOfTsIgnoreComment(atIndex: number) {
                    let index = 0;
                    for (let i = 0; i <= atIndex; i++) {
                        index = textWithIgnoreComment.indexOf(tsIgnoreComment, index);
                    }
                    return index;
                }

                function textWithIgnoreCommentFrom(text: string, singleIgnore: true | undefined) {
                    if (!singleIgnore) return text;
                    const splits = text.split(tsIgnoreComment);
                    if (splits.length > 2) {
                        const tail = splits[splits.length - 2] + splits[splits.length - 1];
                        splits.length = splits.length - 2;
                        return splits.join(tsIgnoreComment) + tail;
                    }
                    else {
                        return splits.join(tsIgnoreComment);
                    }
                }

                function verifyDelete(atIndex: number, singleIgnore?: true) {
                    const index = getIndexOfTsIgnoreComment(atIndex);
                    const oldText = ScriptSnapshot.fromString(textWithIgnoreCommentFrom(textWithIgnoreComment, singleIgnore));
                    const newTextAndChange = withDelete(oldText, index, tsIgnoreComment.length);
                    verifyCommentDirectives(oldText, newTextAndChange);
                }

                function verifyInsert(atIndex: number, singleIgnore?: true) {
                    const index = getIndexOfTsIgnoreComment(atIndex);
                    const source = textWithIgnoreCommentFrom(textWithIgnoreComment.slice(0, index) + textWithIgnoreComment.slice(index + tsIgnoreComment.length), singleIgnore);
                    const oldText = ScriptSnapshot.fromString(source);
                    const newTextAndChange = withInsert(oldText, index, tsIgnoreComment);
                    verifyCommentDirectives(oldText, newTextAndChange);
                }

                function verifyChangeToBlah(atIndex: number, singleIgnore?: true) {
                    const index = getIndexOfTsIgnoreComment(atIndex) + tsIgnoreComment.indexOf("@");
                    const oldText = ScriptSnapshot.fromString(textWithIgnoreCommentFrom(textWithIgnoreComment, singleIgnore));
                    const newTextAndChange = withChange(oldText, index, 1, "blah ");
                    verifyCommentDirectives(oldText, newTextAndChange);
                }

                function verifyChangeBackToDirective(atIndex: number, singleIgnore?: true) {
                    const index = getIndexOfTsIgnoreComment(atIndex) + tsIgnoreComment.indexOf("@");
                    const source = textWithIgnoreCommentFrom(textWithIgnoreComment.slice(0, index) + "blah " + textWithIgnoreComment.slice(index + 1), singleIgnore);
                    const oldText = ScriptSnapshot.fromString(source);
                    const newTextAndChange = withChange(oldText, index, "blah ".length, "@");
                    verifyCommentDirectives(oldText, newTextAndChange);
                }

                function verifyDeletingBlah(atIndex: number, singleIgnore?: true) {
                    const tsIgnoreIndex = getIndexOfTsIgnoreComment(atIndex);
                    const index = tsIgnoreIndex + tsIgnoreComment.indexOf("@");
                    const source = textWithIgnoreCommentFrom(textWithIgnoreComment.slice(0, index) + "blah " + textWithIgnoreComment.slice(index + 1), singleIgnore);
                    const oldText = ScriptSnapshot.fromString(source);
                    const newTextAndChange = withDelete(oldText, tsIgnoreIndex, tsIgnoreComment.length + "blah".length);
                    verifyCommentDirectives(oldText, newTextAndChange);
                }

                function verifyChangeDirectiveType(atIndex: number, singleIgnore?: true) {
                    const index = getIndexOfTsIgnoreComment(atIndex) + tsIgnoreComment.indexOf("ignore");
                    const oldText = ScriptSnapshot.fromString(textWithIgnoreCommentFrom(textWithIgnoreComment, singleIgnore));
                    const newTextAndChange = withChange(oldText, index, "ignore".length, "expect-error");
                    verifyCommentDirectives(oldText, newTextAndChange);
                }

                function verifyReuseChange(atIndex: number, singleIgnore?: true) {
                    const source = `const x = 10;
    function foo1() {
        const x1 = 10;
        ${tsIgnoreComment}
        let y0: string = x;
        let y1: string = x;
        return y1;
    }
    function foo2() {
        const x2 = 10;
        ${tsIgnoreComment}
        let y0: string = x;
        let y2: string = x;
        return y2;
    }
    function foo3() {
        const x3 = 10;
        ${tsIgnoreComment}
        let y0: string = x;
        let y3: string = x;
        return y3;
    }
    foo1();
    foo2();
    foo3();`;
                    const oldText = ScriptSnapshot.fromString(textWithIgnoreCommentFrom(source, singleIgnore));
                    const start = source.indexOf(`const x${atIndex + 1}`);
                    const letStr = `let y${atIndex + 1}: string = x;`;
                    const end = source.indexOf(letStr) + letStr.length;
                    const oldSubStr = source.slice(start, end);
                    const newText = oldSubStr.replace(letStr, `let yn : string = x;`);
                    const newTextAndChange = withChange(oldText, start, end - start, newText);
                    verifyCommentDirectives(oldText, newTextAndChange);
                }
            });
        }
    });
}
