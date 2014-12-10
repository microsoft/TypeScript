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
    });
}