///<reference path="harness.ts" />
///<reference path="runnerbase.ts" />

class UnitTestRunner extends RunnerBase {
    constructor() {
        super();
    }

    public initializeTests() {
        this.tests = this.enumerateFiles('tests/cases/unittests/services', /\.ts/i);

        var outfile = new Harness.Compiler.WriterAggregator()
        var outerr = new Harness.Compiler.WriterAggregator();
        // note this is running immediately to generate tests to be run later inside describe/it
        // need a fresh instance so that the previous runner's last test is not hanging around
        var harnessCompiler = Harness.Compiler.getCompiler({ useExistingInstance: false });

        var toBeAdded = this.tests.map(test => {
            return { unitName: test, content: Harness.IO.readFile(test) }
        });
        harnessCompiler.addInputFiles(toBeAdded);
        harnessCompiler.setCompilerOptions({ noResolve: true });

        var stdout = new Harness.Compiler.EmitterIOHost();
        var emitDiagnostics = harnessCompiler.emitAll(stdout);
        var results = stdout.toArray();
        var lines: string[] = [];
        results.forEach(v => lines = lines.concat(v.file.lines));
        var code = lines.join("\n")

        var nodeContext: any = undefined;
        if (Utils.getExecutionEnvironment() === Utils.ExecutionEnvironment.Node) {
            nodeContext = {
                require: require,
                process: process,
                describe: describe,
                it: it,
                assert: assert,
                beforeEach: beforeEach,
                afterEach: afterEach,
                before: before,
                after: after,
                Harness: Harness,
                IO: Harness.IO,
                ts: ts,
                TypeScript: TypeScript
                // FourSlash: FourSlash
            };
        }

        describe("Setup compiler for compiler unittests", () => {
            // ensures a clean compiler instance when tests are eventually executed following this describe block
            harnessCompiler = Harness.Compiler.getCompiler({
                useExistingInstance: false,
                optionsForFreshInstance: { useMinimalDefaultLib: true, noImplicitAny: false }
            });
        });

        // this generated code is a series of top level describe/it blocks that will run in between the setup and cleanup blocks in this file
        Utils.evalFile(code, "generated_test_code.js", nodeContext);

        describe("Cleanup after unittests", () => {
            var harnessCompiler = Harness.Compiler.getCompiler({
                useExistingInstance: false,
                optionsForFreshInstance: { useMinimalDefaultLib: true, noImplicitAny: false }
            });
        });

        // note this runs immediately (ie before this same code in the describe block above)
        // to make sure the next runner doesn't include the previous one's stuff
        harnessCompiler = Harness.Compiler.getCompiler({ useExistingInstance: false });
    }
}