//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='..\compiler\optionsParser.ts' />
///<reference path='..\compiler\io.ts'/>
///<reference path='..\compiler\typescript.ts'/>
///<reference path='harness.ts'/>
///<reference path='exec.ts'/>
///<reference path='diff.ts'/>
///<reference path='..\..\tests\runners\runnerfactory.ts' />
///<reference path='..\..\tests\runners\compiler\compilerRunner.ts' />
///<reference path='..\..\tests\runners\fourslash\fourslashRunner.ts' />
///<reference path='..\..\tests\runners\projects\projectsRunner.ts' />
///<reference path='..\..\tests\runners\unittest\unittestRunner.ts' />

declare var _inheritsFrom: any; // reference base inheritsFrom in child contexts.

class ConsoleLogger extends Harness.Logger {
    private descriptionStack: string[] = [];
    private errorString: string = '';
    private passCounts = { Scenario: 0, Testcase: 0 };
    private failCounts = { Scenario: 0, Testcase: 0 };
    private blockedScenarioCount = 0;

    // Adds the specified indentation to each line in the string
    private fixIndent(str: string, indent: string) {
        var lines = str.split('\n');

        for (var i = 0; i < lines.length; i++) {
            lines[i] = indent + lines[i];
        }

        return lines.join('\n');
    }

    private addError(error: Error) {
        var tab = '  ';
        var indent = (new Array(this.descriptionStack.length + 1)).join(tab);

        for (var i = 0; i < this.descriptionStack.length; i++) {
            this.errorString += (new Array(i + 1)).join(tab) + this.descriptionStack[i] + '\n';
        }

        var stack = (<any>error).stack;
        if (stack) {
            this.errorString += this.fixIndent(stack, indent) + '\n';
        } else {
            this.errorString += indent + error.message + '\n';
        }
    }

    public start() {
        TypeScript.IO.printLine("Running tests" + (iterations > 1 ? " " + iterations + " times" : "") + (reverse ? " in reverse." : "."));
    }

    public end() {
        // Test execution is complete
        TypeScript.IO.printLine('');
        TypeScript.IO.printLine('');
        TypeScript.IO.printLine(this.errorString);
        TypeScript.IO.printLine('');

        TypeScript.IO.printLine('Scenarios: ' + (this.passCounts['Scenario'] || 0) + ' passed, ' + (this.failCounts['Scenario'] || 0) + ' failed.');
        TypeScript.IO.printLine('Testcases: ' + (this.passCounts['Testcase'] || 0) + ' passed, ' + (this.failCounts['Testcase'] || 0) + ' failed.');
        TypeScript.IO.printLine('  Blocked: ' + this.blockedScenarioCount);
        return;
    }

    public testStart(test: Harness.ITestMetadata) {
        this.descriptionStack.push(test.desc);
    }

    public pass(test: Harness.ITestMetadata) {
        if (test.perfResults) {
            TypeScript.IO.printLine(test.desc + ": " + test.perfResults.trials.length + " trials");
            TypeScript.IO.printLine('    mean: ' + test.perfResults.mean.toFixed(1) + "ms");
            TypeScript.IO.printLine('     min: ' + test.perfResults.min.toFixed(1) + "ms");
            TypeScript.IO.printLine('     max: ' + test.perfResults.max.toFixed(1) + "ms");
            TypeScript.IO.printLine('  stdDev: ' + test.perfResults.stdDev.toFixed(1) + "ms");
            TypeScript.IO.printLine('');
            this.descriptionStack.pop();
        } else {
            TypeScript.IO.print(".");
            this.passCounts.Testcase++;
            this.descriptionStack.pop();
        }
    }

    public bug(test: Harness.ITestMetadata) {
        TypeScript.IO.print('*');
    }

    public fail(test: Harness.ITestMetadata) {
        TypeScript.IO.print("F");
        this.failCounts.Testcase++;
        this.descriptionStack.pop();
    }

    public error(test: Harness.ITestMetadata, error: Error) {
        TypeScript.IO.print("F");
        this.failCounts.Testcase++;
        this.addError(error);
        this.descriptionStack.pop();
    }

    public scenarioStart(scenario: Harness.IScenarioMetadata) {
        this.descriptionStack.push(scenario.desc);
        //TypeScript.IO.printLine(scenario.id);
        //TypeScript.IO.printLine(scenario.desc);
    }

    public scenarioEnd(scenario: Harness.IScenarioMetadata, error?: Error) {
        if (scenario.pass) {
            this.passCounts.Scenario++;
        } else {
            this.failCounts.Scenario++;
        }

        if (scenario.bugs && scenario.bugs.length > 0) {
            this.blockedScenarioCount++;
        }

        if (error) {
            this.addError(error);
        }
        this.descriptionStack.pop();
    }
}

class JSONLogger extends Harness.Logger {
    private root: any[] = [];
    private scenarioStack: Harness.IScenarioMetadata[] = [];

    constructor(public path: string) {
        super();
    }

    private addTestResult(test: Harness.ITestMetadata) {
        if (this.scenarioStack.length === 0) {
            this.root.push(test);
        } else {
            (<any>this.scenarioStack[this.scenarioStack.length - 1]).children.push(test);
        }
    }

    public pass(test: Harness.ITestMetadata) {
        this.addTestResult(test);
    }

    public fail(test: Harness.ITestMetadata) {
        this.addTestResult(test);
    }

    public error(test: Harness.ITestMetadata, error: Error) {
        (<any>test).errorString = error.message;
        this.addTestResult(test);
    }

    public scenarioStart(scenario: Harness.IScenarioMetadata) {
        (<any>scenario).children = [];

        if (this.scenarioStack.length === 0) {
            this.root.push(scenario);
        } else {
            (<any>this.scenarioStack[this.scenarioStack.length - 1]).children.push(scenario);
        }

        this.scenarioStack.push(scenario);
    }

    public scenarioEnd() {
        this.scenarioStack.pop();
    }

    public end() {
        TypeScript.IO.writeFile(this.path, JSON.stringify(this.root), /*writeByteOrderMark:*/ false);
    }
}

function runTests(tests: RunnerBase[]) {
    if (reverse) {
        tests = tests.reverse();
    }

    for (var i = iterations; i > 0; i--) {
        for (var j = 0; j < tests.length; j++) {
            tests[j].initializeTests();
        }
    }

    run();
}

var runners: RunnerBase[] = [];
global.runners = runners;
var reverse: boolean = false;
var iterations: number = 1;

var opts = new TypeScript.OptionsParser(TypeScript.IO, "testCompiler");

opts.flag('compiler', {
    set: function () {
        runners.push(new CompilerBaselineRunner(CompilerTestType.Conformance));
        runners.push(new CompilerBaselineRunner(CompilerTestType.Regressions));
        runners.push(new UnitTestRunner(UnittestTestType.Compiler));
        runners.push(new ProjectRunner());
    }
});

opts.flag('conformance', {
    set: function () {
        runners.push(new CompilerBaselineRunner(CompilerTestType.Conformance));
    }
});

opts.flag('project', {
    set: function () {
        runners.push(new ProjectRunner());
    }
});

opts.flag('fourslash', {
    set: function () {
        runners.push(new FourslashRunner());
    }
});

opts.flag('fourslash-generated', {
    set: function () {
        runners.push(new GeneratedFourslashRunner());
    }
});

opts.flag('unittests', {
    set: function () {
        runners.push(new UnitTestRunner(UnittestTestType.Compiler));
        runners.push(new UnitTestRunner(UnittestTestType.Samples));
    }
});

opts.flag('samples', {
    set: function () {
        runners.push(new UnitTestRunner(UnittestTestType.Samples));
    }
});

opts.flag('rwc', {
    set: function () {
        runners.push(new RWCRunner());
    }
});

opts.flag('ls', {
    set: function () {
        runners.push(new UnitTestRunner(UnittestTestType.LanguageService));
    }
});

opts.flag('services', {
    set: function () {
        runners.push(new UnitTestRunner(UnittestTestType.Services));
    }
});

opts.flag('harness', {
    set: function () {
        runners.push(new UnitTestRunner(UnittestTestType.Harness));
    }
});

opts.option('dump', {
    set: function (file) { Harness.registerLogger(new JSONLogger(file)); }
});

opts.option('root', {
    usage: {
        locCode: 'Sets the root for the tests")',
        args: null
    },
    experimental: true,
    set: function (str) {
        Harness.userSpecifiedroot = str;
    }
});

opts.flag('reverse', {
    experimental: true,
    set: function () {
        reverse = true;
    }
});

opts.option('iterations', {
    experimental: true,
    set: function (str) {
        var val = parseInt(str);
        iterations = val < 1 ? 1 : val;
    }
});

// For running only compiler baselines with specific options like emit, decl files, etc
opts.flag('compiler-baselines', {
    set: function (str) {
        var conformanceRunner = new CompilerBaselineRunner(CompilerTestType.Conformance);
        conformanceRunner.options = str;
        runners.push(conformanceRunner);

        var regressionRunner = new CompilerBaselineRunner(CompilerTestType.Regressions);
        regressionRunner.options = str;
        runners.push(regressionRunner);
    }
});

opts.parse(TypeScript.IO.arguments)

if (runners.length === 0) {
    if (opts.unnamed.length === 0) {
        // compiler
        runners.push(new CompilerBaselineRunner(CompilerTestType.Conformance));
        runners.push(new CompilerBaselineRunner(CompilerTestType.Regressions));
        runners.push(new UnitTestRunner(UnittestTestType.Compiler));
        runners.push(new ProjectRunner());

        // language services
        runners.push(new FourslashRunner());
        runners.push(new GeneratedFourslashRunner());

        // samples
        runners.push(new UnitTestRunner(UnittestTestType.Samples));
    } else {
        var runnerFactory = new RunnerFactory();
        var tests = opts.unnamed[0].split(' ');
        for (var i = 0; i < tests.length; i++) {
            runnerFactory.addTest(tests[i]);
        }
        runners = runnerFactory.getRunners();
    }
}

var c = new ConsoleLogger();
Harness.registerLogger(c);
runTests(runners);

