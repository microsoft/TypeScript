///<reference path='..\..\..\harness\dumpAST-baselining.ts'/>

describe('dumpAST-create-baselines', function() {
    describe("create test baseline files for AST source locations", function() {
        it("create baseline files", function() {
            DumpAST.generateBaselineFiles();
        });
    });
});
