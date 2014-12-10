/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\src\compiler\parser.ts" />

module ts {
    function withChange(text: IScriptSnapshot, start: number, length: number, newText: string): { text: IScriptSnapshot; textChangeRange: TextChangeRange; } {
        var contents = text.getText(0, text.getLength());
        var newContents = contents.substr(0, start) + newText + contents.substring(start + length);

        return { text: ScriptSnapshot.fromString(newContents), textChangeRange: new TextChangeRange(new TextSpan(start, length), newText.length) }
    }

    function withInsert(text: IScriptSnapshot, start: number, newText: string): { text: IScriptSnapshot; textChangeRange: TextChangeRange; } {
        return withChange(text, start, 0, newText);
    }

    function withDelete(text: IScriptSnapshot, start: number, length: number): { text: IScriptSnapshot; textChangeRange: TextChangeRange; } {
        return withChange(text, start, length, "");
    }

    // NOTE: 'reusedElements' is the expected count of elements reused from the old tree to the new
    // tree.  It may change as we tweak the parser.  If the count increases then that should always
    // be a good thing.  If it decreases, that's not great (less reusability), but that may be 
    // unavoidable.  If it does decrease an investigation should be done to make sure that things 
    // are still ok and we're still appropriately reusing most of the tree.
    function compareTrees(oldText: IScriptSnapshot, newText: IScriptSnapshot, textChangeRange: TextChangeRange, expectedReusedElements: number = -1): void {
        // Create a tree for the new text, in a non-incremental fashion.
        var options: CompilerOptions = {};
        options.target = ScriptTarget.ES5;

        var newTree = createLanguageServiceSourceFile(/*fileName:*/ "", newText, options, /*version:*/ "0", /*isOpen:*/ true);
        Utils.checkInvariants(newTree, /*parent:*/ undefined);

        // Create a tree for the new text, in an incremental fashion.
        var oldTree = createLanguageServiceSourceFile(/*fileName:*/ "", oldText, options, /*version:*/ "0", /*isOpen:*/ true);
        Utils.checkInvariants(oldTree, /*parent:*/ undefined);

        var incrementalNewTree = oldTree.update(newText, "1", /*isOpen:*/ true, textChangeRange);
        Utils.checkInvariants(incrementalNewTree, /*parent:*/ undefined);

        // We should get the same tree when doign a full or incremental parse.
        assertStructuralEquals(newTree, incrementalNewTree);

        // There should be no reused nodes between two trees that are fully parsed.
        Debug.assert(reusedElements(oldTree, newTree) === 0);

        if (expectedReusedElements !== -1) {
            var actualReusedCount = reusedElements(oldTree, incrementalNewTree);
            Debug.assert(actualReusedCount === expectedReusedElements, actualReusedCount + " !== " + expectedReusedElements);
        }
    }

    function assertStructuralEquals(node1: Node, node2: Node) {
        if (node1 === node2) {
            return;
        }

        if (!node1 || !node2) {
            throw new Error("!node1 || !node2");
        }

        if (node1.pos !== node2.pos) {
            throw new Error("node1.pos !== node2.pos");
        }

        if (node1.end !== node2.end) {
            throw new Error("node1.end !== node2.end");
        }

        if (node1.kind !== node2.kind) {
            throw new Error("node1.kind !== node2.kind");
        }

        if (node1.flags !== node2.flags) {
            throw new Error("node1.flags !== node2.flags");
        }

        if (node1.parserContextFlags !== node2.parserContextFlags) {
            throw new Error("node1.parserContextFlags !== node2.parserContextFlags");
        }

        forEachChild(node1,
            child1 => {
                var childName = findChildName(node1, child1);
                var child2: Node = (<any>node2)[childName];

                assertStructuralEquals(child1, child2);
            },
            (array1: NodeArray<Node>) => {
                var childName = findChildName(node1, array1);
                var array2: NodeArray<Node> = (<any>node2)[childName];

                assertArrayStructuralEquals(array1, array2);
            });
    }

    function assertArrayStructuralEquals(array1: NodeArray<Node>, array2: NodeArray<Node>) {
        if (array1 === array2) {
            return;
        }

        if (!array1 || !array2) {
            throw new Error("!array1 || !array2");
        }

        if (array1.pos !== array2.pos) {
            throw new Error("array1.pos !== array2.pos");
        }

        if (array1.end !== array2.end) {
            throw new Error("array1.end !== array2.end");
        }

        if (array1.length !== array2.length) {
            throw new Error("array1.length !== array2.length");
        }

        for (var i = 0, n = array1.length; i < n; i++) {
            assertStructuralEquals(array1[i], array2[i]);
        }
    }

    function findChildName(parent: any, child: any) {
        for (var name in parent) {
            if (parent.hasOwnProperty(name) && parent[name] === child) {
                return name;
            }
        }

        throw new Error("Could not find child in parent");
    }

    function reusedElements(oldNode: SourceFile, newNode: SourceFile): number {
        var allOldElements = collectElements(oldNode);
        var allNewElements = collectElements(newNode);

        return filter(allOldElements, v => contains(allNewElements, v)).length;
    }

    function collectElements(node: Node) {
        var result: Node[] = [];
        visit(node);
        return result;

        function visit(node: Node) {
            result.push(node);
            forEachChild(node, visit);
        }
    }

    function deleteCode(source: string, index: number, toDelete: string) {
        var repeat = toDelete.length;

        for (var i = 0; i < repeat; i++) {
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withDelete(oldText, index, 1);
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);

            source = newTextAndChange.text.getText(0, newTextAndChange.text.getLength());
        }
    }

    describe('Incremental',() => {
        it('Inserting into method',() => {
            var source = "class C {\r\n" +
                "    public foo1() { }\r\n" +
                "    public foo2() {\r\n" +
                "        return 1;\r\n" +
                "    }\r\n" +
                "    public foo3() { }\r\n" +
                "}";

            var oldText = ScriptSnapshot.fromString(source);
            var semicolonIndex = source.indexOf(";");
            var newTextAndChange = withInsert(oldText, semicolonIndex, " + 1");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Deleting from method',() => {
            var source = "class C {\r\n" +
                "    public foo1() { }\r\n" +
                "    public foo2() {\r\n" +
                "        return 1 + 1;\r\n" +
                "    }\r\n" +
                "    public foo3() { }\r\n" +
                "}";

            var index = source.indexOf("+ 1");
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withDelete(oldText, index, "+ 1".length);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Regular expression 1', () => {
            var source = "class C { public foo1() { /; } public foo2() { return 1;} public foo3() { } }";

            var semicolonIndex = source.indexOf(";}");
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Regular expression 2',() => {
            var source = "class C { public foo1() { ; } public foo2() { return 1/;} public foo3() { } }";

            var semicolonIndex = source.indexOf(";");
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Comment 1',() => {
            var source = "class C { public foo1() { /; } public foo2() { return 1; } public foo3() { } }";

            var semicolonIndex = source.indexOf(";");
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, "/");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Comment 2',() => {
            var source = "class C { public foo1() { /; } public foo2() { return 1; } public foo3() { } }";

            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, 0, "//");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Comment 3',() => {
            var source = "//class C { public foo1() { /; } public foo2() { return 1; } public foo3() { } }";

            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withDelete(oldText, 0, 2);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Comment 4',() => {
            var source = "class C { public foo1() { /; } public foo2() { */ return 1; } public foo3() { } }";

            var index = source.indexOf(";");
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, index, "*");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Parameter 1',() => {
            // Should be able to reuse all the parameters.
            var source = "class C {\r\n" +
                "    public foo2(a, b, c, d) {\r\n" +
                "        return 1;\r\n" +
                "    }\r\n" +
                "}";

            var semicolonIndex = source.indexOf(";");
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, semicolonIndex, " + 1");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Type member 1',() => {
            // Should be able to reuse most of the type members.
            var source = "interface I { a: number; b: string; (c): d; new (e): f; g(): h }";

            var index = source.indexOf(": string");
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, index, "?");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Enum element 1',() => {
            // Should be able to reuse most of the enum elements.
            var source = "enum E { a = 1, b = 1 << 1, c = 3, e = 4, f = 5, g = 7, h = 8, i = 9, j = 10 }";

            var index = source.indexOf("<<");
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withChange(oldText, index, 2, "+");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Strict mode 1',() => {
            // In non-strict mode 'package' means nothing and can be reused.  In strict mode though
            // we'll have to reparse the nodes (and generate an error for 'package();'
            //
            // Note: in this test we don't actually add 'use strict'.  This is so we can compare 
            // reuse with/without a strict mode change.
            var source = "foo1();\r\nfoo1();\r\nfoo1();\r\package();";

            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, 0, "'strict';\r\n");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Strict mode 2',() => {
            // In non-strict mode 'package' means nothing and can be reused.  In strict mode though
            // we'll have to reparse the nodes (and generate an error for 'package();'
            var source = "foo1();\r\nfoo1();\r\nfoo1();\r\package();";

            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, 0, "'use strict';\r\n");

            // Note the decreased reuse of nodes compared to 'Strict mode 1'
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Strict mode 3',() => {
            // In non-strict mode 'package' means nothing and can be reused.  In strict mode though
            // we'll have to reparse the nodes (and generate an error for 'package();'
            //
            // Note: in this test we don't actually remove 'use strict'.  This is so we can compare 
            // reuse with/without a strict mode change.
            var source = "'strict';\r\nfoo1();\r\nfoo1();\r\nfoo1();\r\npackage();";

            var index = source.indexOf('f');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withDelete(oldText, 0, index);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Strict mode 4',() => {
            // In non-strict mode 'package' means nothing and can be reused.  In strict mode though
            // we'll have to reparse the nodes (and generate an error for 'package();'
            var source = "'use strict';\r\nfoo1();\r\nfoo1();\r\nfoo1();\r\npackage();";

            var index = source.indexOf('f');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withDelete(oldText, 0, index);

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Strict mode 5',() => {
            var source = "'use blahhh';\r\nfoo1();\r\nfoo2();\r\nfoo3();\r\nfoo4();\r\nfoo4();\r\nfoo6();\r\nfoo7();\r\nfoo8();\r\nfoo9();\r\n";

            var index = source.indexOf('b');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withChange(oldText, index, 6, "strict");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Strict mode 6',() => {
            var source = "'use strict';\r\nfoo1();\r\nfoo2();\r\nfoo3();\r\nfoo4();\r\nfoo4();\r\nfoo6();\r\nfoo7();\r\nfoo8();\r\nfoo9();\r\n";

            var index = source.indexOf('s');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withChange(oldText, index, 6, "blahhh");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Strict mode 7',() => {
            var source = "'use blahhh';\r\nfoo1();\r\nfoo2();\r\nfoo3();\r\nfoo4();\r\nfoo4();\r\nfoo6();\r\nfoo7();\r\nfoo8();\r\nfoo9();\r\n";

            var index = source.indexOf('f');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withDelete(oldText, 0, index);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Parenthesized expression to arrow function 1',() => {
            var source = "var v = (a, b, c, d, e)";

            var index = source.indexOf('a');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, index + 1, ":");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Parenthesized expression to arrow function 2',() => {
            var source = "var v = (a, b) = c";

            var index = source.indexOf("= c") + 1;
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, index, ">");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Arrow function to parenthesized expression 1',() => {
            var source = "var v = (a:, b, c, d, e)";

            var index = source.indexOf(':');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withDelete(oldText, index, 1);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Arrow function to parenthesized expression 2',() => {
            var source = "var v = (a, b) => c";

            var index = source.indexOf(">");
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withDelete(oldText, index, 1);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Speculative generic lookahead 1',() => {
            var source = "var v = F<b>e";

            var index = source.indexOf('b');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, index + 1, ",x");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        });

        it('Speculative generic lookahead 2',() => {
            var source = "var v = F<a,b>e";

            var index = source.indexOf('b');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, index + 1, ",x");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        });

        it('Speculative generic lookahead 3',() => {
            var source = "var v = F<a,b,c>e";

            var index = source.indexOf('b');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, index + 1, ",x");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        });

        it('Speculative generic lookahead 4',() => {
            var source = "var v = F<a,b,c,d>e";

            var index = source.indexOf('b');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, index + 1, ",x");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, -1);
        });

        it('Assertion to arrow function',() => {
            var source = "var v = <T>(a);";

            var index = source.indexOf(';');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, index, " => 1");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Arrow function to assertion',() => {
            var source = "var v = <T>(a) => 1;";

            var index = source.indexOf(' =>');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withDelete(oldText, index, " => 1".length);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Contextual shift to shift-equals',() => {
            var source = "var v = 1 >> = 2";

            var index = source.indexOf('>> =');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withDelete(oldText, index + 2, 1);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Contextual shift-equals to shift',() => {
            var source = "var v = 1 >>= 2";

            var index = source.indexOf('>>=');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, index + 2, " ");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Contextual shift to generic invocation',() => {
            var source = "var v = T>>(2)";

            var index = source.indexOf('T');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withInsert(oldText, index, "Foo<Bar<");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Test generic invocation to contextual shift',() => {
            var source = "var v = Foo<Bar<T>>(2)";

            var index = source.indexOf('Foo<Bar<');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withDelete(oldText, index, "Foo<Bar<".length);

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Contextual shift to generic type and initializer',() => {
            var source = "var v = T>>=2;";

            var index = source.indexOf('=');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withChange(oldText, index, "= ".length, ": Foo<Bar<");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Generic type and initializer to contextual shift',() => {
            var source = "var v : Foo<Bar<T>>=2;";

            var index = source.indexOf(':');
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withChange(oldText, index, ": Foo<Bar<".length, "= ");

            // Note the decreased reuse of nodes compared to testStrictMode3
            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        it('Arithmetic operator to type argument list',() => {
            var source = "var v = new Dictionary<A, B>0";

            var index = source.indexOf("0");
            var oldText = ScriptSnapshot.fromString(source);
            var newTextAndChange = withChange(oldText, index, 1, "()");

            compareTrees(oldText, newTextAndChange.text, newTextAndChange.textChangeRange, 0);
        });

        // Simulated typing tests.

        it('Type extends clause 1',() => {
            var source = "interface IFoo<T> { }\r\ninterface Array<T> extends IFoo<T> { }";

            var index = source.indexOf('extends');
            deleteCode(source, index, "extends IFoo<T>");
        });
    });
}