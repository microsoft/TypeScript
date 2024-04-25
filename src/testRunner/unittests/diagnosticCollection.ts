import * as ts from "../_namespaces/ts";

describe("unittests:: internalApi:: diagnosticCollection", () => {
    describe("add", () => {
        it("keeps equivalent diagnostic with elaboration", () => {
            const collection = ts.createDiagnosticCollection();
            const file = ts.createSourceFile("index.ts", "const x = 1", ts.ScriptTarget.ESNext, /*setParentNodes*/ true);
            const node = file.statements[0];

            const dy = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "y");
            const da = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "a");
            collection.add(dy);
            collection.add(da);

            const chain = ts.chainDiagnosticMessages(
                ts.chainDiagnosticMessages(/*details*/ undefined, ts.Diagnostics.Did_you_mean_0, "x"),
                ts.Diagnostics.Cannot_find_name_0,
                "y",
            );
            const dyBetter = ts.createDiagnosticForNodeFromMessageChain(file, node, chain);

            collection.add(dyBetter);
            const result = collection.getDiagnostics();
            assert.deepEqual(result, [da, dyBetter]);
        });

        it("keeps equivalent diagnostic with deeper elaboration", () => {
            const collection = ts.createDiagnosticCollection();
            const file = ts.createSourceFile("index.ts", "const x = 1", ts.ScriptTarget.ESNext, /*setParentNodes*/ true);
            const node = file.statements[0];

            const da = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "a");
            collection.add(da);

            const chain = ts.chainDiagnosticMessages(
                ts.chainDiagnosticMessages(/*details*/ undefined, ts.Diagnostics.Did_you_mean_0, "a"),
                ts.Diagnostics.Cannot_find_name_0,
                "y",
            );
            const dy = ts.createDiagnosticForNodeFromMessageChain(file, node, chain);
            collection.add(dy);

            const chainBetter = ts.chainDiagnosticMessages(
                ts.chainDiagnosticMessages(
                    ts.chainDiagnosticMessages(/*details*/ undefined, ts.Diagnostics.Did_you_mean_0, "x"),
                    ts.Diagnostics.Did_you_mean_0,
                    "b",
                ),
                ts.Diagnostics.Cannot_find_name_0,
                "y",
            );
            const dyBetter = ts.createDiagnosticForNodeFromMessageChain(file, node, chainBetter);

            collection.add(dyBetter);
            const result = collection.getDiagnostics();
            assert.deepEqual(result, [da, dyBetter]);
        });

        it("doesn't keep equivalent diagnostic with no elaboration", () => {
            const collection = ts.createDiagnosticCollection();
            const file = ts.createSourceFile("index.ts", "const x = 1", ts.ScriptTarget.ESNext, /*setParentNodes*/ true);
            const node = file.statements[0];

            const chain = ts.chainDiagnosticMessages(
                ts.chainDiagnosticMessages(/*details*/ undefined, ts.Diagnostics.Did_you_mean_0, "x"),
                ts.Diagnostics.Cannot_find_name_0,
                "y",
            );
            const dyBetter = ts.createDiagnosticForNodeFromMessageChain(file, node, chain);
            const da = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "a");
            collection.add(da);
            collection.add(dyBetter);

            const dy = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "y");
            collection.add(dy);
            const result = collection.getDiagnostics();
            assert.deepEqual(result, [da, dyBetter]);
        });

        it("considers canonical diagnostics in equivalence", () => {
            const collection = ts.createDiagnosticCollection();
            const file = ts.createSourceFile("index.ts", "const x = 1", ts.ScriptTarget.ESNext, /*setParentNodes*/ true);
            const node = file.statements[0];

            const withoutSuggestion = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "x");
            const withSuggestion = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0_Did_you_mean_1, "x", "y");
            withSuggestion.canonicalHead = ts.getCanonicalDiagnostic(ts.Diagnostics.Cannot_find_name_0, "x");

            collection.add(withoutSuggestion);
            collection.add(withSuggestion);

            const result = collection.getDiagnostics();
            assert.deepEqual(result, [withSuggestion]);
        });
    });

    describe("lookup", () => {
        it("returns an equivalent diagnostic with more elaboration", () => {
            const collection = ts.createDiagnosticCollection();
            const file = ts.createSourceFile("index.ts", "const x = 1", ts.ScriptTarget.ESNext, /*setParentNodes*/ true);
            const node = file.statements[0];

            const da = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "a");
            collection.add(da);

            const chain = ts.chainDiagnosticMessages(
                ts.chainDiagnosticMessages(/*details*/ undefined, ts.Diagnostics.Did_you_mean_0, "x"),
                ts.Diagnostics.Cannot_find_name_0,
                "y",
            );
            const dyBetter = ts.createDiagnosticForNodeFromMessageChain(file, node, chain);
            collection.add(dyBetter);

            const dy = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "y");
            assert.equal(collection.lookup(dy), dyBetter);
        });
        it("doesn't return an equivalent diagnostic with less elaboration", () => {
            const collection = ts.createDiagnosticCollection();
            const file = ts.createSourceFile("index.ts", "const x = 1", ts.ScriptTarget.ESNext, /*setParentNodes*/ true);
            const node = file.statements[0];

            const da = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "a");
            collection.add(da);
            const dy = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "y");
            collection.add(dy);

            const chain = ts.chainDiagnosticMessages(
                ts.chainDiagnosticMessages(/*details*/ undefined, ts.Diagnostics.Did_you_mean_0, "x"),
                ts.Diagnostics.Cannot_find_name_0,
                "y",
            );
            const dyBetter = ts.createDiagnosticForNodeFromMessageChain(file, node, chain);
            assert.equal(collection.lookup(dyBetter), undefined);
        });
    });
});
