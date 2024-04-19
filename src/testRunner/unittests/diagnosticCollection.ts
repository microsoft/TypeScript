import * as ts from "../_namespaces/ts";

describe("unittests:: internalApi:: diagnosticCollection", () => {
    describe("add", () => {
        it("correctly inserts equivalent diagnostic with more elaboration", () => {
            const collection = ts.createDiagnosticCollection();
            const file = ts.createSourceFile("index.ts", "const x = 1", ts.ScriptTarget.ESNext, true);
            const node = file.statements[0];

            const dy = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "y");
            const da = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "a");
            collection.add(dy);
            collection.add(da);

            const chain = ts.chainDiagnosticMessages(
                ts.chainDiagnosticMessages(/*details*/ undefined, ts.Diagnostics.Did_you_mean_0, "x"),
                ts.Diagnostics.Cannot_find_name_0, "y");
            const dyBetter = ts.createDiagnosticForNodeFromMessageChain(file, node, chain);
            
            collection.add(dyBetter);
            const result = collection.getDiagnostics();
            assert.deepEqual(result, [da, dyBetter]);
        });

        it("correctly inserts equivalent diagnostic with less elaboration", () => {
            const collection = ts.createDiagnosticCollection();
            const file = ts.createSourceFile("index.ts", "const x = 1", ts.ScriptTarget.ESNext, true);
            const node = file.statements[0];

            const chain = ts.chainDiagnosticMessages(
                ts.chainDiagnosticMessages(/*details*/ undefined, ts.Diagnostics.Did_you_mean_0, "x"),
                ts.Diagnostics.Cannot_find_name_0, "y");
            const dyBetter = ts.createDiagnosticForNodeFromMessageChain(file, node, chain);
            const da = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "a");
            collection.add(da);
            collection.add(dyBetter);

            
            const dy = ts.createDiagnosticForNode(node, ts.Diagnostics.Cannot_find_name_0, "y");
            collection.add(dy);
            const result = collection.getDiagnostics();
            assert.deepEqual(result, [da, dyBetter]);
        })
    });

    describe("lookup", () => {
        // TODO
        assert.ok(false, "TODO");
    })
});
