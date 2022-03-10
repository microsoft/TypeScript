//// [parserharness.ts]
//﻿
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

///<reference path='..\compiler\io.ts'/>
///<reference path='..\compiler\typescript.ts'/>
///<reference path='..\services\typescriptServices.ts' />
///<reference path='diff.ts'/>

declare var assert: Harness.Assert;
declare var it;
declare var describe;
declare var run;
declare var IO: IIO;
declare var __dirname; // Node-specific

function switchToForwardSlashes(path: string) {
    return path.replace(/\\/g, "/");
}

function filePath(fullPath: string) {
    fullPath = switchToForwardSlashes(fullPath);
    var components = fullPath.split("/");
    var path: string[] = components.slice(0, components.length - 1);
    return path.join("/") + "/";
}

var typescriptServiceFileName = filePath(IO.getExecutingFilePath()) + "typescriptServices.js";
var typescriptServiceFile = IO.readFile(typescriptServiceFileName);
if (typeof ActiveXObject === "function") {
    eval(typescriptServiceFile);
} else if (typeof require === "function") {
    var vm = require('vm');
    vm.runInThisContext(typescriptServiceFile, 'typescriptServices.js');
} else {
    throw new Error('Unknown context');
}

declare module process {
    export function nextTick(callback: () => any): void;
    export function on(event: string, listener: Function);
}

module Harness {
    // Settings 
    export var userSpecifiedroot = "";
    var global = <any>Function("return this").call(null);
    export var usePull = false;

    export interface ITestMetadata {
        id: string;
        desc: string;
        pass: boolean;
        perfResults: {
            mean: number;
            min: number;
            max: number;
            stdDev: number;
            trials: number[];
        };
    }
    export interface IScenarioMetadata {
        id: string;
        desc: string;
        pass: boolean;
        bugs: string[];
    }

    // Assert functions
    export module Assert {
        export var bugIds: string[] = [];
        export var throwAssertError = (error: Error) => {
            throw error;
        };

        // Marks that the current scenario is impacted by a bug
        export function bug(id: string) {
            if (bugIds.indexOf(id) < 0) {
                bugIds.push(id);
            }
        }

        // If there are any bugs in the test code, mark the scenario as impacted appropriately
        export function bugs(content: string) {
            var bugs = content.match(/\bbug (\d+)/i);
            if (bugs) {
                bugs.forEach(bug => assert.bug(bug));
            }
        }

        export function is(result: boolean, msg?: string) {
            if (!result) {
                throwAssertError(new Error(msg || "Expected true, got false."));
            }
        }

        export function arrayLengthIs(arr: any[], length: number) {
            if (arr.length != length) {
                var actual = '';
                arr.forEach(n => actual = actual + '\n      ' + n.toString());
                throwAssertError(new Error('Expected array to have ' + length + ' elements. Actual elements were:' + actual));
            }
        }

        export function equal(actual, expected) {
            if (actual !== expected) {
                throwAssertError(new Error("Expected " + actual + " to equal " + expected));
            }
        }

        export function notEqual(actual, expected) {
            if (actual === expected) {
                throwAssertError(new Error("Expected " + actual + " to *not* equal " + expected));
            }
        }

        export function notNull(result) {
            if (result === null) {
                throwAssertError(new Error("Expected " + result + " to *not* be null"));
            }
        }

        export function compilerWarning(result: Compiler.CompilerResult, line: number, column: number, desc: string) {
            if (!result.isErrorAt(line, column, desc)) {
                var actual = '';
                result.errors.forEach(err => {
                    actual = actual + '\n     ' + err.toString();
                });

                throwAssertError(new Error("Expected compiler warning at (" + line + ", " + column + "): " + desc + "\nActual errors follow: " + actual));
            }
        }

        export function noDiff(text1, text2) {
            text1 = text1.replace(/^\s+|\s+$/g, "").replace(/\r\n?/g, "\n");
            text2 = text2.replace(/^\s+|\s+$/g, "").replace(/\r\n?/g, "\n");

            if (text1 !== text2) {
                var errorString = "";
                var text1Lines = text1.split(/\n/);
                var text2Lines = text2.split(/\n/);
                for (var i = 0; i < text1Lines.length; i++) {
                    if (text1Lines[i] !== text2Lines[i]) {
                        errorString += "Difference at line " + (i + 1) + ":\n";
                        errorString += "                  Left File: " + text1Lines[i] + "\n";
                        errorString += "                 Right File: " + text2Lines[i] + "\n\n";
                    }
                }
                throwAssertError(new Error(errorString));
            }
        }

        export function arrayContains(arr: any[], contains: any[]) {
            var found;

            for (var i = 0; i < contains.length; i++) {
                found = false;

                for (var j = 0; j < arr.length; j++) {
                    if (arr[j] === contains[i]) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    throwAssertError(new Error("Expected array to contain \"" + contains[i] + "\""));
                }
            }
        }

        export function arrayContainsOnce(arr: any[], filter: (item: any) => boolean) {
            var foundCount = 0;

            for (var i = 0; i < arr.length; i++) {
                if (filter(arr[i])) {
                    foundCount++;
                }
            }

            if (foundCount !== 1) {
                throwAssertError(new Error("Expected array to match element only once (instead of " + foundCount + " times)"));
            }
        }
    }

    /** Splits the given string on \r\n or on only \n if that fails */
    export function splitContentByNewlines(content: string) {
        // Split up the input file by line
        // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
        // we have to string-based splitting instead and try to figure out the delimiting chars
        var lines = content.split('\r\n');
        if (lines.length === 1) {
            lines = content.split('\n');
        }
        return lines;
    }

    /** Reads a file under /tests */
    export function readFile(path: string) {

        if (path.indexOf('tests') < 0) {
            path = "tests/" + path;
        }

        var content = IO.readFile(Harness.userSpecifiedroot + path);
        if (content == null) {
            throw new Error("failed to read file at: '" + Harness.userSpecifiedroot + path + "'");
        }

        return content;
    }

    // Logger
    export interface ILogger {
        start: (fileName?: string, priority?: number) => void;
        end: (fileName?: string) => void;
        scenarioStart: (scenario: IScenarioMetadata) => void;
        scenarioEnd: (scenario: IScenarioMetadata, error?: Error) => void;
        testStart: (test: ITestMetadata) => void;
        pass: (test: ITestMetadata) => void;
        bug: (test: ITestMetadata) => void;
        fail: (test: ITestMetadata) => void;
        error: (test: ITestMetadata, error: Error) => void;
        comment: (comment: string) => void;
        verify: (test: ITestMetadata, passed: boolean, actual: any, expected: any, message: string) => void;
    }

    export class Logger implements ILogger {
        public start(fileName?: string, priority?: number) { }
        public end(fileName?: string) { }
        public scenarioStart(scenario: IScenarioMetadata) { }
        public scenarioEnd(scenario: IScenarioMetadata, error?: Error) { }
        public testStart(test: ITestMetadata) { }
        public pass(test: ITestMetadata) { }
        public bug(test: ITestMetadata) { }
        public fail(test: ITestMetadata) { }
        public error(test: ITestMetadata, error: Error) { }
        public comment(comment: string) { }
        public verify(test: ITestMetadata, passed: boolean, actual: any, expected: any, message: string) { }
    }

    // Logger-related functions
    var loggers: ILogger[] = [];
    export function registerLogger(logger: ILogger) {
        loggers.push(logger);
    }
    export function emitLog(field: string, ...params: any[]) {
        for (var i = 0; i < loggers.length; i++) {
            if (typeof loggers[i][field] === 'function') {
                loggers[i][field].apply(loggers[i], params);
            }
        }
    }

    // BDD Framework
    export interface IDone {
        (e?: Error): void;
    }
    export class Runnable {
        constructor(public description: string, public block: any) { }

        // The current stack of Runnable objects
        static currentStack: Runnable[] = [];

        // The error, if any, that occurred when running 'block'
        public error: Error = null;

        // Whether or not this object has any failures (including in its descendants)
        public passed = null;

        // A list of bugs impacting this object
        public bugs: string[] = [];

        // A list of all our child Runnables
        public children: Runnable[] = [];

        public addChild(child: Runnable): void {
            this.children.push(child);
        }

        /** Call function fn, which may take a done function and may possibly execute
         *  asynchronously, calling done when finished. Returns true or false depending
         *  on whether the function was asynchronous or not.
         */
        public call(fn: (done?: IDone) => void , done: IDone) {
            var isAsync = true;

            try {
                if (fn.length === 0) {
                    // No async.
                    fn();
                    done();

                    return false;
                } else {
                    // Possibly async

                    Runnable.pushGlobalErrorHandler(done);

                    fn(function () {
                        isAsync = false; // If we execute synchronously, this will get called before the return below.
                        Runnable.popGlobalErrorHandler();
                        done();
                    });

                    return isAsync;
                }

            } catch (e) {
                done(e);

                return false;
            }
        }

        public run(done: IDone) { }

        public runBlock(done: IDone) {
            return this.call(this.block, done);
        }

        public runChild(index: number, done: IDone) {
            return this.call(<any>((done) => this.children[index].run(done)), done);
        }

        static errorHandlerStack: { (e: Error): void; }[] = [];

        static pushGlobalErrorHandler(done: IDone) {
            errorHandlerStack.push(function (e) {
                done(e);
            });
        }

        static popGlobalErrorHandler() {
            errorHandlerStack.pop();
        }

        static handleError(e: Error) {
            if (errorHandlerStack.length === 0) {
                IO.printLine('Global error: ' + e);
            } else {
                errorHandlerStack[errorHandlerStack.length - 1](e);
            }
        }
    }
    export class TestCase extends Runnable {
        public description: string;
        public block;

        constructor(description: string, block: any) {
            super(description, block);
            this.description = description;
            this.block = block;
        }

        public addChild(child: Runnable): void {
            throw new Error("Testcases may not be nested inside other testcases");
        }

        /** Run the test case block and fail the test if it raised an error. If no error is raised, the test passes. */
        public run(done: IDone) {
            var that = this;

            Runnable.currentStack.push(this);

            emitLog('testStart', { desc: this.description });

            if (this.block) {
                var async = this.runBlock(<any>function (e) {
                    if (e) {
                        that.passed = false;
                        that.error = e;
                        emitLog('error', { desc: this.description, pass: false }, e);
                    } else {
                        that.passed = true;

                        emitLog('pass', { desc: this.description, pass: true });
                    }

                    Runnable.currentStack.pop();

                    done()
                });
            }

        }
    }

    export class Scenario extends Runnable {
        public description: string;
        public block;

        constructor(description: string, block: any) {
            super(description, block);
            this.description = description;
            this.block = block;
        }

        /** Run the block, and if the block doesn't raise an error, run the children. */
        public run(done: IDone) {
            var that = this;

            Runnable.currentStack.push(this);

            emitLog('scenarioStart', { desc: this.description });

            var async = this.runBlock(<any>function (e) {
                Runnable.currentStack.pop();
                if (e) {
                    that.passed = false;
                    that.error = e;
                    var metadata: IScenarioMetadata = { id: undefined, desc: this.description, pass: false, bugs: assert.bugIds };
                    // Report all bugs affecting this scenario
                    assert.bugIds.forEach(desc => emitLog('bug', metadata, desc));
                    emitLog('scenarioEnd', metadata, e);
                    done();
                } else {
                    that.passed = true; // so far so good.
                    that.runChildren(done);
                }
            });
        }

        /** Run the children of the scenario (other scenarios and test cases). If any fail,
         *  set this scenario to failed. Synchronous tests will run synchronously without
         *  adding stack frames.
         */
        public runChildren(done: IDone, index = 0) {
            var that = this;
            var async = false;

            for (; index < this.children.length; index++) {
                async = this.runChild(index, <any>function (e) {
                    that.passed = that.passed && that.children[index].passed;

                    if (async)
                        that.runChildren(done, index + 1);
                });

                if (async)
                    return;
            }

            var metadata: IScenarioMetadata = { id: undefined, desc: this.description, pass: this.passed, bugs: assert.bugIds };
            // Report all bugs affecting this scenario
            assert.bugIds.forEach(desc => emitLog('bug', metadata, desc));
            emitLog('scenarioEnd', metadata);

            done();
        }
    }
    export class Run extends Runnable {
        constructor() {
            super('Test Run', null);
        }

        public run() {
            emitLog('start');
            this.runChildren();
        }

        public runChildren(index = 0) {
            var async = false;
            var that = this;

            for (; index < this.children.length; index++) {
                // Clear out bug descriptions
                assert.bugIds = [];

                async = this.runChild(index, <any>function (e) {
                    if (async) {
                        that.runChildren(index + 1);
                    }
                });

                if (async) {
                    return;
                }
            }

            Perf.runBenchmarks();
            emitLog('end');
        }
    }

    // Performance test
    export module Perf {
        export module Clock {
            export var now: () => number;
            export var resolution: number;

            declare module WScript {
                export function InitializeProjection();
            }

            declare module TestUtilities {
                export function QueryPerformanceCounter(): number;
                export function QueryPerformanceFrequency(): number;
            }

            if (typeof WScript !== "undefined" && typeof global['WScript'].InitializeProjection !== "undefined") {
                // Running in JSHost.
                global['WScript'].InitializeProjection();

                now = function () {
                    return TestUtilities.QueryPerformanceCounter();
                }

                resolution = TestUtilities.QueryPerformanceFrequency();
            } else {
                now = function () {
                    return Date.now();
                }

                resolution = 1000;
            }
        }

        export class Timer {
            public startTime;
            public time = 0;

            public start() {
                this.time = 0;
                this.startTime = Clock.now();
            }

            public end() {
                // Set time to MS.
                this.time = (Clock.now() - this.startTime) / Clock.resolution * 1000;
            }
        }

        export class Dataset {
            public data: number[] = [];

            public add(value: number) {
                this.data.push(value);
            }

            public mean() {
                var sum = 0;
                for (var i = 0; i < this.data.length; i++) {
                    sum += this.data[i];
                }

                return sum / this.data.length;
            }

            public min() {
                var min = this.data[0];

                for (var i = 1; i < this.data.length; i++) {
                    if (this.data[i] < min) {
                        min = this.data[i];
                    }
                }

                return min;
            }

            public max() {
                var max = this.data[0];

                for (var i = 1; i < this.data.length; i++) {
                    if (this.data[i] > max) {
                        max = this.data[i];
                    }
                }

                return max;
            }

            public stdDev() {
                var sampleMean = this.mean();
                var sumOfSquares = 0;
                for (var i = 0; i < this.data.length; i++) {
                    sumOfSquares += Math.pow(this.data[i] - sampleMean, 2);
                }

                return Math.sqrt(sumOfSquares / this.data.length);
            }
        }

        // Base benchmark class with some defaults.
        export class Benchmark {
            public iterations = 10;
            public description = "";
            public bench(subBench?: () => void ) { }
            public before() { }
            public beforeEach() { }
            public after() { }
            public afterEach() { }
            public results: { [x: string]: Dataset; } = <{ [x: string]: Dataset; }>{};

            public addTimingFor(name: string, timing: number) {
                this.results[name] = this.results[name] || new Dataset();
                this.results[name].add(timing);
            }
        }

        export var benchmarks: { new (): Benchmark; }[] = [];

        var timeFunction: (
            benchmark: Benchmark,
            description?: string,
            name?: string,
            f?: (bench?: { (): void; }) => void
        ) => void;

        timeFunction = function (
            benchmark: Benchmark,
            description: string = benchmark.description,
            name: string = '',
            f = benchmark.bench
        ): void {

            var t = new Timer();
            t.start();

            var subBenchmark = function (name, f): void {
                timeFunction(benchmark, description, name, f);
            }

            f.call(benchmark, subBenchmark);

            t.end();

            benchmark.addTimingFor(name, t.time);
        }

        export function runBenchmarks() {
            for (var i = 0; i < benchmarks.length; i++) {
                var b = new benchmarks[i]();


                var t = new Timer();
                b.before();
                for (var j = 0; j < b.iterations; j++) {
                    b.beforeEach();
                    timeFunction(b);
                    b.afterEach();
                }
                b.after();

                for (var prop in b.results) {
                    var description = b.description + (prop ? ": " + prop : '');

                    emitLog('testStart', { desc: description });

                    emitLog('pass', {
                        desc: description, pass: true, perfResults: {
                            mean: b.results[prop].mean(),
                            min: b.results[prop].min(),
                            max: b.results[prop].max(),
                            stdDev: b.results[prop].stdDev(),
                            trials: b.results[prop].data
                        }
                    });
                }

            }
        }

        // Replace with better type when classes are assignment compatible with
        // the below type.
        // export function addBenchmark(BenchmarkClass: {new(): Benchmark;}) {
        export function addBenchmark(BenchmarkClass: any) {
            benchmarks.push(BenchmarkClass);
        }

    }

    /** Functionality for compiling TypeScript code */
    export module Compiler {
        /** Aggregate various writes into a single array of lines. Useful for passing to the
         *  TypeScript compiler to fill with source code or errors.
         */
        export class WriterAggregator implements ITextWriter {
            public lines: string[] = [];
            public currentLine = "";

            public Write(str) {
                this.currentLine += str;
            }

            public WriteLine(str) {
                this.lines.push(this.currentLine + str);
                this.currentLine = "";
            }

            public Close() {
                if (this.currentLine.length > 0) { this.lines.push(this.currentLine); }
                this.currentLine = "";
            }

            public reset() {
                this.lines = [];
                this.currentLine = "";
            }
        }

        /** Mimics having multiple files, later concatenated to a single file. */
        export class EmitterIOHost implements TypeScript.EmitterIOHost {

            private fileCollection = {};

            /** create file gets the whole path to create, so this works as expected with the --out parameter */
            public createFile(s: string, useUTF8?: boolean): ITextWriter {

                if (this.fileCollection[s]) {
                    return <ITextWriter>this.fileCollection[s];
                }

                var writer = new Harness.Compiler.WriterAggregator();
                this.fileCollection[s] = writer;
                return writer;
            }

            public directoryExists(s: string) { return false; }
            public fileExists(s: string) { return typeof this.fileCollection[s] !== 'undefined'; }
            public resolvePath(s: string) { return s; }

            public reset() { this.fileCollection = {}; }

            public toArray(): { filename: string; file: WriterAggregator; }[] {
                var result: { filename: string; file: WriterAggregator; }[] = [];

                for (var p in this.fileCollection) {
                    if (this.fileCollection.hasOwnProperty(p)) {
                        var current = <Harness.Compiler.WriterAggregator>this.fileCollection[p];
                        if (current.lines.length > 0) {
                            if (p !== '0.js') { current.lines.unshift('////[' + p + ']'); }
                            result.push({ filename: p, file: this.fileCollection[p] });
                        }
                    }
                }
                return result;
            }
        }

        var libFolder: string = global['WScript'] ? TypeScript.filePath(global['WScript'].ScriptFullName) : (__dirname + '/');
        export var libText = IO ? IO.readFile(libFolder + "lib.d.ts") : '';

        var stdout = new EmitterIOHost();
        var stderr = new WriterAggregator();

        export function isDeclareFile(filename: string) {
            return /\.d\.ts$/.test(filename);
        }

        export function makeDefaultCompilerForTest(c?: TypeScript.TypeScriptCompiler) {
            var compiler = c || new TypeScript.TypeScriptCompiler(stderr);
            compiler.parser.errorRecovery = true;
            compiler.settings.codeGenTarget = TypeScript.CodeGenTarget.ES5;
            compiler.settings.controlFlow = true;
            compiler.settings.controlFlowUseDef = true;
            if (Harness.usePull) {
                compiler.settings.usePull = true;
                compiler.settings.useFidelity = true;
            }

            compiler.parseEmitOption(stdout);
            TypeScript.moduleGenTarget = TypeScript.ModuleGenTarget.Synchronous;
            compiler.addUnit(Harness.Compiler.libText, "lib.d.ts", true);
            return compiler;
        }

        var compiler: TypeScript.TypeScriptCompiler;
        recreate();

        // pullUpdateUnit is sufficient if an existing unit is updated, if a new unit is added we need to do a full typecheck
        var needsFullTypeCheck = true;
        export function compile(code?: string, filename?: string) {
            if (usePull) {
                if (needsFullTypeCheck) {
                    compiler.pullTypeCheck(true);
                    needsFullTypeCheck = false;
                }
                else {
                    // requires unit to already exist in the compiler
                    compiler.pullUpdateUnit(new TypeScript.StringSourceText(""), filename, true);
                    compiler.pullUpdateUnit(new TypeScript.StringSourceText(code), filename, true);
                }
            }
            else {
                compiler.reTypeCheck();
            }
        }

        // Types
        export class Type {
            constructor(public type, public code, public identifier) { }

            public normalizeToArray(arg: any) {
                if ((Array.isArray && Array.isArray(arg)) || arg instanceof Array)
                    return arg;

                return [arg];
            }

            public compilesOk(testCode): boolean {
                var errors = null;
                compileString(testCode, 'test.ts', function (compilerResult) {
                    errors = compilerResult.errors;
                })

                return errors.length === 0;
            }

            public isSubtypeOf(other: Type) {
                var testCode = 'class __test1__ {\n';
                testCode += '    public test() {\n';
                testCode += '        ' + other.code + ';\n';
                testCode += '        return ' + other.identifier + ';\n';
                testCode += '    }\n';
                testCode += '}\n';
                testCode += 'class __test2__ extends __test1__ {\n';
                testCode += '    public test() {\n';
                testCode += '        ' + this.code + ';\n';
                testCode += '        return ' + other.identifier + ';\n';
                testCode += '    }\n';
                testCode += '}\n';

                return this.compilesOk(testCode);
            }

            // TODO: Find an implementation of isIdenticalTo that works.
            //public isIdenticalTo(other: Type) {
            //    var testCode = 'module __test1__ {\n';
            //    testCode += '    ' + this.code + ';\n';
            //    testCode += '    export var __val__ = ' + this.identifier + ';\n';
            //    testCode += '}\n';
            //    testCode += 'var __test1__val__ = __test1__.__val__;\n';

            //    testCode += 'module __test2__ {\n';
            //    testCode += '    ' + other.code + ';\n';
            //    testCode += '    export var __val__ = ' + other.identifier + ';\n';
            //    testCode += '}\n';
            //    testCode += 'var __test2__val__ = __test2__.__val__;\n';

            //    testCode += 'function __test__function__() { if(true) { return __test1__val__ }; return __test2__val__; }';

            //    return this.compilesOk(testCode);
            //}

            public assertSubtypeOf(others: any) {
                others = this.normalizeToArray(others);

                for (var i = 0; i < others.length; i++) {
                    if (!this.isSubtypeOf(others[i])) {
                        throw new Error("Expected " + this.type + " to be a subtype of " + others[i].type);
                    }
                }
            }

            public assertNotSubtypeOf(others: any) {
                others = this.normalizeToArray(others);

                for (var i = 0; i < others.length; i++) {
                    if (this.isSubtypeOf(others[i])) {
                        throw new Error("Expected " + this.type + " to be a subtype of " + others[i].type);
                    }
                }
            }

            //public assertIdenticalTo(other: Type) {
            //    if (!this.isIdenticalTo(other)) {
            //        throw new Error("Expected " + this.type + " to be identical to " + other.type);
            //    }
            //}

            //public assertNotIdenticalTo(other: Type) {
            //    if (!this.isIdenticalTo(other)) {
            //        throw new Error("Expected " + this.type + " to not be identical to " + other.type);
            //    }
            //}

            public isAssignmentCompatibleWith(other: Type) {
                var testCode = 'module __test1__ {\n';
                testCode += '    ' + this.code + ';\n';
                testCode += '    export var __val__ = ' + this.identifier + ';\n';
                testCode += '}\n';
                testCode += 'var __test1__val__ = __test1__.__val__;\n';

                testCode += 'module __test2__ {\n';
                testCode += '    export ' + other.code + ';\n';
                testCode += '    export var __val__ = ' + other.identifier + ';\n';
                testCode += '}\n';
                testCode += 'var __test2__val__ = __test2__.__val__;\n';

                testCode += '__test2__val__ = __test1__val__;';

                return this.compilesOk(testCode);
            }

            public assertAssignmentCompatibleWith(others: any) {
                others = this.normalizeToArray(others);

                for (var i = 0; i < others.length; i++) {
                    var other = others[i];

                    if (!this.isAssignmentCompatibleWith(other)) {
                        throw new Error("Expected " + this.type + " to be assignment compatible with " + other.type);
                    }
                }
            }

            public assertNotAssignmentCompatibleWith(others: any) {
                others = this.normalizeToArray(others);

                for (var i = 0; i < others.length; i++) {
                    var other = others[i];

                    if (this.isAssignmentCompatibleWith(other)) {
                        throw new Error("Expected " + this.type + " to not be assignment compatible with " + other.type);
                    }
                }
            }

            public assertThisCanBeAssignedTo(desc: string, these: any[], notThese: any[]) {
                it(desc + " is assignable to ", () => {
                    this.assertAssignmentCompatibleWith(these);
                });
        
                it(desc + " not assignable to ", () => {
                    this.assertNotAssignmentCompatibleWith(notThese);
                });
            }

        }

        export class TypeFactory {
            public any: Type;
            public number: Type;
            public string: Type;
            public boolean: Type;

            constructor() {
                this.any = this.get('var x : any', 'x');
                this.number = this.get('var x : number', 'x');
                this.string = this.get('var x : string', 'x');
                this.boolean = this.get('var x : boolean', 'x');
            }

            public get (code: string, target: any) {
                var targetIdentifier = '';
                var targetPosition = -1;
                if (typeof target === "string") {
                    targetIdentifier = target;
                }
                else if (typeof target === "number") {
                    targetPosition = target;
                }
                else {
                    throw new Error("Expected string or number not " + (typeof target));
                }

                var errors = null;
                compileString(code, 'test.ts', function (compilerResult) {
                    errors = compilerResult.errors;
                })

                if (errors.length > 0)
                    throw new Error("Type definition contains errors: " + errors.join(","));

                var matchingIdentifiers: Type[] = [];

                if (!usePull) {
                    // This will find the requested identifier in the first script where it's present, a naive search of each member in each script,
                    // which means this won't play nicely if the same identifier is used in multiple units, but it will enable this to work on multi-file tests.
                    // m = 1 because the first script will always be lib.d.ts which we don't want to search.                                
                    for (var m = 1; m < compiler.scripts.members.length; m++) {
                        var script = compiler.scripts.members[m];
                        var enclosingScopeContext = TypeScript.findEnclosingScopeAt(new TypeScript.NullLogger(), <TypeScript.Script>script, new TypeScript.StringSourceText(code), 0, false);
                        var entries = new TypeScript.ScopeTraversal(compiler).getScopeEntries(enclosingScopeContext);

                        for (var i = 0; i < entries.length; i++) {
                            if (entries[i].name === targetIdentifier) {
                                matchingIdentifiers.push(new Type(entries[i].type, code, targetIdentifier));
                            }
                        }
                    }
                }
                else {
                    for (var m = 0; m < compiler.scripts.members.length; m++) {
                        var script2 = <TypeScript.Script>compiler.scripts.members[m];
                        if (script2.locationInfo.filename !== 'lib.d.ts') {
                            if (targetPosition > -1) {
                                var tyInfo = compiler.pullGetTypeInfoAtPosition(targetPosition, script2);
                                var name = this.getTypeInfoName(tyInfo.ast);
                                var foundValue = new Type(tyInfo.typeInfo, code, name);
                                if (!matchingIdentifiers.some(value => (value.identifier === foundValue.identifier) && (value.code === foundValue.code) && (value.type === foundValue.type))) {
                                    matchingIdentifiers.push(foundValue);
                                }
                            }
                            else {
                                for (var pos = 0; pos < code.length; pos++) {
                                    var tyInfo = compiler.pullGetTypeInfoAtPosition(pos, script2);
                                    var name = this.getTypeInfoName(tyInfo.ast);
                                    if (name === targetIdentifier) {
                                        var foundValue = new Type(tyInfo.typeInfo, code, targetIdentifier);
                                        if (!matchingIdentifiers.some(value => (value.identifier === foundValue.identifier) && (value.code === foundValue.code) && (value.type === foundValue.type))) {
                                            matchingIdentifiers.push(foundValue);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (matchingIdentifiers.length === 0) {
                    if (targetPosition > -1) {
                        throw new Error("Could not find an identifier at position " + targetPosition);
                    }
                    else {
                        throw new Error("Could not find an identifier " + targetIdentifier + " in any known scopes");
                    }
                }
                else if (matchingIdentifiers.length > 1) {
                    throw new Error("Found multiple matching identifiers for " + target);
                }
                else {
                    return matchingIdentifiers[0];
                }
            }

            private getTypeInfoName(ast : TypeScript.AST) {
                var name = '';
                switch (ast.nodeType) {
                    case TypeScript.NodeType.Name: // Type Name?
                    case TypeScript.NodeType.Null:
                    case TypeScript.NodeType.List:
                    case TypeScript.NodeType.Empty:
                    case TypeScript.NodeType.EmptyExpr:
                    case TypeScript.NodeType.Asg:
                    case TypeScript.NodeType.True:
                    case TypeScript.NodeType.False:
                    case TypeScript.NodeType.ArrayLit:
                    case TypeScript.NodeType.TypeRef:
                        break;
                    case TypeScript.NodeType.Super:
                        name = (<any>ast).text;
                        break;
                    case TypeScript.NodeType.Regex:
                        name = (<TypeScript.RegexLiteral>ast).text;
                        break;
                    case TypeScript.NodeType.QString:
                        name = (<any>ast).text;
                        break;
                    case TypeScript.NodeType.NumberLit:
                        name = (<TypeScript.NumberLiteral>ast).text;
                        break;
                    case TypeScript.NodeType.Return:
                        //name = (<TypeScript.ReturnStatement>tyInfo.ast).returnExpression.actualText; // why is this complaining?
                        break;
                    case TypeScript.NodeType.InterfaceDeclaration:
                        name = (<TypeScript.InterfaceDeclaration>ast).name.actualText;
                        break;
                    case TypeScript.NodeType.ModuleDeclaration:
                        name = (<TypeScript.ModuleDeclaration>ast).name.actualText;
                        break;
                    case TypeScript.NodeType.ClassDeclaration:
                        name = (<TypeScript.ClassDeclaration>ast).name.actualText;
                        break;
                    case TypeScript.NodeType.FuncDecl:
                        name = !(<TypeScript.FuncDecl>ast).name ? "" : (<TypeScript.FuncDecl>ast).name.actualText; // name == null for lambdas
                        break;
                    default:
                        // TODO: is there a reason to mess with all the special cases above and not just do this (ie take whatever property is there and works?)
                        var a = <any>ast;
                        name = (a.id) ? (a.id.actualText) : (a.name) ? a.name.actualText : (a.text) ? a.text : '';
                        break;
                }

                return name;
            }

            public isOfType(expr: string, expectedType: string) {
                var actualType = this.get('var _v_a_r_ = ' + expr, '_v_a_r_');

                it('Expression "' + expr + '" is of type "' + expectedType + '"', function () {
                    assert.equal(actualType.type, expectedType);
                });
            }
        }

        /** Generates a .d.ts file for the given code
          * @param verifyNoDeclFile pass true when the given code should generate no decl file, false otherwise
          * @param unitName add the given code under thie name, else use '0.ts'
          * @param compilationContext a set of functions to be run before and after compiling this code for doing things like adding dependencies first
          * @param references the set of referenced files used by the given code
          */
        export function generateDeclFile(code: string, verifyNoDeclFile: boolean, unitName?: string, compilationContext?: Harness.Compiler.CompilationContext, references?: TypeScript.IFileReference[]): string {
            reset();

            compiler.settings.generateDeclarationFiles = true;
            var oldOutputOption = compiler.settings.outputOption;
            var oldEmitterIOHost = compiler.emitSettings.ioHost;
            try {
                if (compilationContext && compilationContext.preCompile) {
                    compilationContext.preCompile();
                }

                addUnit(code, unitName, false, false, references);
                compiler.reTypeCheck();

                var outputs = {};

                compiler.settings.outputOption = "";
                compiler.parseEmitOption(
                    {
                        createFile: (fn: string) => {
                            outputs[fn] = new Harness.Compiler.WriterAggregator();
                            return outputs[fn];
                        },
                        directoryExists: (path: string) => true,
                        fileExists: (path: string) => true,
                        resolvePath: (path: string) => path
                    });
                compiler.emitDeclarations();

                var results: string = null;
                for (var fn in outputs) {
                    if (fn.indexOf('.d.ts') >= 0) {
                        var writer = <Harness.Compiler.WriterAggregator>outputs[fn];
                        writer.Close();
                        results = writer.lines.join('\n');
                        if (verifyNoDeclFile && results != "") {
                            throw new Error('Compilation should not produce ' + fn);
                        }
                    }
                }

                if (results) {
                    return results;
                }

                if (!verifyNoDeclFile) {
                    throw new Error('Compilation did not produce .d.ts files');
                }
            } finally {
                compiler.settings.generateDeclarationFiles = false;
                compiler.settings.outputOption = oldOutputOption;
                compiler.parseEmitOption(oldEmitterIOHost);
                if (compilationContext && compilationContext.postCompile) {
                    compilationContext.postCompile();
                }

                var uName = unitName || '0.ts';
                updateUnit('', uName);
            }

            return '';
        }

        /** Contains the code and errors of a compilation and some helper methods to check its status. */
        export class CompilerResult {
            public code: string;
            public errors: CompilerError[];

            /** @param fileResults an array of strings for the filename and an ITextWriter with its code */
            constructor(public fileResults: { filename: string; file: WriterAggregator; }[], errorLines: string[], public scripts: TypeScript.Script[]) {
                var lines = [];
                fileResults.forEach(v => lines = lines.concat(v.file.lines));
                this.code = lines.join("\n")

                this.errors = [];

                for (var i = 0; i < errorLines.length; i++) {
                    if (Harness.usePull) {
                        var err = <any>errorLines[i]; // TypeScript.PullError
                        this.errors.push(new CompilerError(err.filename, 0, 0, err.message));
                    } else {
                        var match = errorLines[i].match(/([^\(]*)\((\d+),(\d+)\):\s+((.*[\s\r\n]*.*)+)\s*$/);
                        if (match) {
                            this.errors.push(new CompilerError(match[1], parseFloat(match[2]), parseFloat(match[3]), match[4]));
                        }
                        else {
                            WScript.Echo("non-match on: " + errorLines[i]);
                        }
                    }
                }
            }

            public isErrorAt(line: number, column: number, message: string) {
                for (var i = 0; i < this.errors.length; i++) {
                    if (this.errors[i].line === line && this.errors[i].column === column && this.errors[i].message === message)
                        return true;
                }

                return false;
            }
        }

        // Compiler Error.
        export class CompilerError {
            constructor(public file: string,
                    public line: number,
                    public column: number,
                    public message: string) { }

            public toString() {
                return this.file + "(" + this.line + "," + this.column + "): " + this.message;
            }
        }

        /** Create a new instance of the compiler with default settings and lib.d.ts, then typecheck */
        export function recreate() {
            compiler = makeDefaultCompilerForTest();
            if (usePull) {
                compiler.pullTypeCheck(true);
            }
            else {
                compiler.typeCheck();
            }
        }

        export function reset() {
            stdout.reset();
            stderr.reset();

            var files = compiler.units.map((value) => value.filename);

            for (var i = 0; i < files.length; i++) {
                var fname = files[i];
                if(fname !== 'lib.d.ts') {
                    updateUnit('', fname);
                    }
            }

            compiler.errorReporter.hasErrors = false;
        }

        // Defines functions to invoke before compiling a piece of code and a post compile action intended to clean up the
        // effects of preCompile, preferably with something lighter weight than a full recreate()
        export interface CompilationContext {
            filename: string;
            preCompile: () => void;
            postCompile: () => void;
        }

        export function addUnit(code: string, unitName?: string, isResident?: boolean, isDeclareFile?: boolean, references?: TypeScript.IFileReference[]) {
            var script: TypeScript.Script = null;
            var uName = unitName || '0' + (isDeclareFile ? '.d.ts' : '.ts');

            for (var i = 0; i < compiler.units.length; i++) {
                if (compiler.units[i].filename === uName) {
                    updateUnit(code, uName);
                    script = <TypeScript.Script>compiler.scripts.members[i];
                }
            }
            if (!script) {
                // TODO: make this toggleable, shouldn't be necessary once typecheck bugs are cleaned up
                // but without it subsequent tests are treated as edits, making for somewhat useful stress testing
                // of persistent typecheck state
                //compiler.addUnit("", uName, isResident, references); // equivalent to compiler.deleteUnit(...)
                script = compiler.addUnit(code, uName, isResident, references);
                needsFullTypeCheck = true;
            }

            return script;
        }

        export function updateUnit(code: string, unitName: string, setRecovery?: boolean) {
            if (Harness.usePull) {
                compiler.pullUpdateUnit(new TypeScript.StringSourceText(code), unitName, setRecovery);
            } else {
                compiler.updateUnit(code, unitName, setRecovery);
            }
        }

        export function compileFile(path: string, callback: (res: CompilerResult) => void , settingsCallback?: (settings?: TypeScript.CompilationSettings) => void , context?: CompilationContext, references?: TypeScript.IFileReference[]) {
            path = switchToForwardSlashes(path);
            var filename = path.match(/[^\/]*$/)[0];
            var code = readFile(path);

            compileUnit(code, filename, callback, settingsCallback, context, references);
        }

        export function compileUnit(code: string, filename: string, callback: (res: CompilerResult) => void , settingsCallback?: (settings?: TypeScript.CompilationSettings) => void , context?: CompilationContext, references?: TypeScript.IFileReference[]) {
            // not recursive
            function clone/* <T> */(source: any, target: any) {
                for (var prop in source) {
                    target[prop] = source[prop];
                }
            }

            var oldCompilerSettings = new TypeScript.CompilationSettings();
            clone(compiler.settings, oldCompilerSettings);
            var oldEmitSettings = new TypeScript.EmitOptions(compiler.settings);
            clone(compiler.emitSettings, oldEmitSettings);

            var oldModuleGenTarget = TypeScript.moduleGenTarget;

            if (settingsCallback) {
                settingsCallback(compiler.settings);
                compiler.emitSettings = new TypeScript.EmitOptions(compiler.settings);
            }
            try {
                compileString(code, filename, callback, context, references);
            } finally {
                // If settingsCallback exists, assume that it modified the global compiler instance's settings in some way.
                // So that a test doesn't have side effects for tests run after it, restore the compiler settings to their previous state.
                if (settingsCallback) {
                    compiler.settings = oldCompilerSettings;
                    compiler.emitSettings = oldEmitSettings;
                    TypeScript.moduleGenTarget = oldModuleGenTarget;
                }
            }
        }

        export function compileUnits(units: TestCaseParser.TestUnitData[], callback: (res: Compiler.CompilerResult) => void , settingsCallback?: () => void ) {
            var lastUnit = units[units.length - 1];
            var unitName = switchToForwardSlashes(lastUnit.name).match(/[^\/]*$/)[0];

            var dependencies = units.slice(0, units.length - 1);
            var compilationContext = Harness.Compiler.defineCompilationContextForTest(unitName, dependencies);

            compileUnit(lastUnit.content, unitName, callback, settingsCallback, compilationContext, lastUnit.references);
        }

        export function emitToOutfile(outfile: WriterAggregator) {
            compiler.emitToOutfile(outfile);
        }

        export function emit(ioHost: TypeScript.EmitterIOHost, usePullEmitter?: boolean) {
            compiler.emit(ioHost, usePullEmitter);
        }

        export function compileString(code: string, unitName: string, callback: (res: Compiler.CompilerResult) => void , context?: CompilationContext, references?: TypeScript.IFileReference[]) {
            var scripts: TypeScript.Script[] = [];

            reset();

            if (context) {
                context.preCompile();
            }

            var isDeclareFile = Harness.Compiler.isDeclareFile(unitName);
            // for single file tests just add them as using the old '0.ts' naming scheme
            var uName = context ? unitName : ((isDeclareFile) ? '0.d.ts' : '0.ts');
            scripts.push(addUnit(code, uName, false, isDeclareFile, references));
            compile(code, uName);

            var errors;
            if (usePull) {
                // TODO: no emit support with pull yet
                errors = compiler.pullGetErrorsForFile(uName);
                emit(stdout, true);
            }
            else {
                errors = stderr.lines;
                emit(stdout, false);
                //output decl file
                compiler.emitDeclarations();
            }

            if (context) {
                context.postCompile();
            }

            callback(new CompilerResult(stdout.toArray(), errors, scripts));
        }

        /** Returns a set of functions which can be later executed to add and remove given dependencies to the compiler so that
         *  a file can be successfully compiled. These functions will add/remove named units and code to the compiler for each dependency. 
         */
        export function defineCompilationContextForTest(filename: string, dependencies: TestCaseParser.TestUnitData[]): CompilationContext {
            // if the given file has no dependencies, there is no context to return, it can be compiled without additional work
            if (dependencies.length == 0) {
                return null;
            } else {
                var addedFiles = [];
                var precompile = () => {
                    // REVIEW: if any dependency has a triple slash reference then does postCompile potentially have to do a recreate since we can't update references with updateUnit?
                    // easy enough to do if so, prefer to avoid the recreate cost until it proves to be an issue
                    dependencies.forEach(dep => {
                        addUnit(dep.content, dep.name, false, Harness.Compiler.isDeclareFile(dep.name));
                        addedFiles.push(dep.name);
                    });
                };
                var postcompile = () => {
                    addedFiles.forEach(file => {
                        updateUnit('', file);
                    });
                };
                var context = {
                    filename: filename,
                    preCompile: precompile,
                    postCompile: postcompile
                };
                return context;
            }
        }
    }

    /** Parses the test cases files 
     *  extracts options and individual files in a multifile test
     */
    export module TestCaseParser {
        /** all the necesarry information to set the right compiler settings */
        export interface CompilerSetting {
            flag: string;
            value: string;
        }

        /** All the necessary information to turn a multi file test into useful units for later compilation */
        export interface TestUnitData {
            content: string;
            name: string;
            originalFilePath: string;
            references: TypeScript.IFileReference[];
        }

        // Regex for parsing options in the format "@Alpha: Value of any sort"
        private optionRegex = /^[\/]{2}\s*@(\w+):\s*(\S*)/gm;  // multiple matches on multiple lines

        // List of allowed metadata names
        var fileMetadataNames = ["filename", "comments", "declaration", "module", "nolib", "sourcemap", "target", "out"];

        function extractCompilerSettings(content: string): CompilerSetting[] {

            var opts = [];

            var match;
            while ((match = optionRegex.exec(content)) != null) {
                opts.push({ flag: match[1], value: match[2] });
            }

            return opts;
        }

        /** Given a test file containing // @Filename directives, return an array of named units of code to be added to an existing compiler instance */
        export function makeUnitsFromTest(code: string, filename: string): { settings: CompilerSetting[]; testUnitData: TestUnitData[]; } {

            var settings = extractCompilerSettings(code);

            // List of all the subfiles we've parsed out
            var files: TestUnitData[] = [];

            var lines = splitContentByNewlines(code);

            // Stuff related to the subfile we're parsing
            var currentFileContent: string = null;
            var currentFileOptions = {};
            var currentFileName = null;
            var refs: TypeScript.IFileReference[] = [];

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var isTripleSlashReference = /[\/]{3}\s*<reference path/.test(line);
                var testMetaData = optionRegex.exec(line);
                // Triple slash references need to be tracked as they are added to the compiler as an additional parameter to addUnit
                if (isTripleSlashReference) {
                    var isRef = line.match(/reference\spath='(\w*_?\w*\.?d?\.ts)'/);
                    if (isRef) {
                        var ref = {
                            minChar: 0,
                            limChar: 0,
                            startLine:0,
                            startCol:0,
                            path: isRef[1],
                            isResident: false
                        };

                        refs.push(ref);
                    }
                } else if (testMetaData) {
                    // Comment line, check for global/file @options and record them
                    optionRegex.lastIndex = 0;
                    var fileNameIndex = fileMetadataNames.indexOf(testMetaData[1].toLowerCase());
                    if (fileNameIndex == -1) {
                        throw new Error('Unrecognized metadata name "' + testMetaData[1] + '". Available file metadata names are: ' + fileMetadataNames.join(', '));
                    } else if (fileNameIndex == 0) {
                        currentFileOptions[testMetaData[1]] = testMetaData[2];
                    } else {
                        continue;
                    }

                    // New metadata statement after having collected some code to go with the previous metadata
                    if (currentFileName) {
                        // Store result file
                        var newTestFile =
                            {
                                content: currentFileContent,
                                name: currentFileName,
                                fileOptions: currentFileOptions,
                                originalFilePath: filename,
                                references: refs
                            };
                        files.push(newTestFile);

                        // Reset local data
                        currentFileContent = null;
                        currentFileOptions = {};
                        currentFileName = testMetaData[2];
                        refs = [];
                    } else {
                        // First metadata marker in the file
                        currentFileName = testMetaData[2];
                    }
                } else {
                    // Subfile content line
                    // Append to the current subfile content, inserting a newline needed
                    if (currentFileContent === null) {
                        currentFileContent = '';
                    } else {
                        // End-of-line
                        currentFileContent = currentFileContent + '\n';
                    }
                    currentFileContent = currentFileContent + line;
                }
            }

            // normalize the filename for the single file case
            currentFileName = files.length > 0 ? currentFileName : '0.ts';

            // EOF, push whatever remains
            var newTestFile = {
                content: currentFileContent || '',
                name: currentFileName,
                fileOptions: currentFileOptions,
                originalFilePath: filename,
                references: refs
            };
            files.push(newTestFile);

            return { settings: settings, testUnitData: files };
        }
    }

    export class ScriptInfo {
        public version: number;
        public editRanges: { length: number; editRange: TypeScript.ScriptEditRange; }[] = [];

        constructor(public name: string, public content: string, public isResident: boolean, public maxScriptVersions: number) {
            this.version = 1;
        }

        public updateContent(content: string, isResident: boolean) {
            this.editRanges = [];
            this.content = content;
            this.isResident = isResident;
            this.version++;
        }

        public editContent(minChar: number, limChar: number, newText: string) {
            // Apply edits
            var prefix = this.content.substring(0, minChar);
            var middle = newText;
            var suffix = this.content.substring(limChar);
            this.content = prefix + middle + suffix;

            // Store edit range + new length of script
            this.editRanges.push({
                length: this.content.length,
                editRange: new TypeScript.ScriptEditRange(minChar, limChar, (limChar - minChar) + newText.length)
            });

            if (this.editRanges.length > this.maxScriptVersions) {
                this.editRanges.splice(0, this.maxScriptVersions - this.editRanges.length);
            }

            // Update version #
            this.version++;
        }

        public getEditRangeSinceVersion(version: number): TypeScript.ScriptEditRange {
            if (this.version == version) {
                // No edits!
                return null;
            }

            var initialEditRangeIndex = this.editRanges.length - (this.version - version);
            if (initialEditRangeIndex < 0 || initialEditRangeIndex >= this.editRanges.length) {
                // Too far away from what we know
                return TypeScript.ScriptEditRange.unknown();
            }

            var entries = this.editRanges.slice(initialEditRangeIndex);

            var minDistFromStart = entries.map(x => x.editRange.minChar).reduce((prev, current) => Math.min(prev, current));
            var minDistFromEnd = entries.map(x => x.length - x.editRange.limChar).reduce((prev, current) => Math.min(prev, current));
            var aggDelta = entries.map(x => x.editRange.delta).reduce((prev, current) => prev + current);

            return new TypeScript.ScriptEditRange(minDistFromStart, entries[0].length - minDistFromEnd, aggDelta);
        }
    }

    export class TypeScriptLS implements Services.ILanguageServiceShimHost {
        private ls: Services.ILanguageServiceShim = null;

        public scripts: ScriptInfo[] = [];
        public maxScriptVersions = 100;

        public addDefaultLibrary() {
            this.addScript("lib.d.ts", Harness.Compiler.libText, true);
        }

        public addFile(name: string, isResident = false) {
            var code: string = readFile(name);
            this.addScript(name, code, isResident);
        }

        public addScript(name: string, content: string, isResident = false) {
            var script = new ScriptInfo(name, content, isResident, this.maxScriptVersions);
            this.scripts.push(script);
        }

        public updateScript(name: string, content: string, isResident = false) {
            for (var i = 0; i < this.scripts.length; i++) {
                if (this.scripts[i].name == name) {
                    this.scripts[i].updateContent(content, isResident);
                    return;
                }
            }

            this.addScript(name, content, isResident);
        }

        public editScript(name: string, minChar: number, limChar: number, newText: string) {
            for (var i = 0; i < this.scripts.length; i++) {
                if (this.scripts[i].name == name) {
                    this.scripts[i].editContent(minChar, limChar, newText);
                    return;
                }
            }

            throw new Error("No script with name '" + name + "'");
        }

        public getScriptContent(scriptIndex: number): string {
            return this.scripts[scriptIndex].content;
        }

        //////////////////////////////////////////////////////////////////////
        // ILogger implementation
        //
        public information(): boolean { return false; }
        public debug(): boolean { return true; }
        public warning(): boolean { return true; }
        public error(): boolean { return true; }
        public fatal(): boolean { return true; }

        public log(s: string): void {
            // For debugging...
            //IO.printLine("TypeScriptLS:" + s);
        }

        //////////////////////////////////////////////////////////////////////
        // ILanguageServiceShimHost implementation
        //

        public getCompilationSettings(): string/*json for Tools.CompilationSettings*/ {
            return ""; // i.e. default settings
        }

        public getScriptCount(): number {
            return this.scripts.length;
        }

        public getScriptSourceText(scriptIndex: number, start: number, end: number): string {
            return this.scripts[scriptIndex].content.substring(start, end);
        }

        public getScriptSourceLength(scriptIndex: number): number {
            return this.scripts[scriptIndex].content.length;
        }

        public getScriptId(scriptIndex: number): string {
            return this.scripts[scriptIndex].name;
        }

        public getScriptIsResident(scriptIndex: number): boolean {
            return this.scripts[scriptIndex].isResident;
        }

        public getScriptVersion(scriptIndex: number): number {
            return this.scripts[scriptIndex].version;
        }

        public getScriptEditRangeSinceVersion(scriptIndex: number, scriptVersion: number): string {
            var range = this.scripts[scriptIndex].getEditRangeSinceVersion(scriptVersion);
            var result = (range.minChar + "," + range.limChar + "," + range.delta);
            return result;
        }

        /** Return a new instance of the language service shim, up-to-date wrt to typecheck.
         *  To access the non-shim (i.e. actual) language service, use the "ls.languageService" property.
         */
        public getLanguageService(): Services.ILanguageServiceShim {
            var ls = new Services.TypeScriptServicesFactory().createLanguageServiceShim(this);
            ls.refresh(true);
            this.ls = ls;
            return ls;
        }

        /** Parse file given its source text */
        public parseSourceText(fileName: string, sourceText: TypeScript.ISourceText): TypeScript.Script {
            var parser = new TypeScript.Parser();
            parser.setErrorRecovery(null);
            parser.errorCallback = (a, b, c, d) => { };

            var script = parser.parse(sourceText, fileName, 0);
            return script;
        }

        /** Parse a file on disk given its filename */
        public parseFile(fileName: string) {
            var sourceText = new TypeScript.StringSourceText(IO.readFile(fileName))
            return this.parseSourceText(fileName, sourceText);
        }
        
        /**
         * @param line 1 based index
         * @param col 1 based index
        */
        public lineColToPosition(fileName: string, line: number, col: number): number {
            var script = this.ls.languageService.getScriptAST(fileName);
            assert.notNull(script);
            assert.is(line >= 1);
            assert.is(col >= 1);
            assert.is(line <= script.locationInfo.lineMap.length);

            return TypeScript.getPositionFromZeroBasedLineColumn(script, line - 1, col - 1);
        }

        /**
         * @param line 0 based index
         * @param col 0 based index
        */
        public positionToZeroBasedLineCol(fileName: string, position: number): TypeScript.ILineCol {
            var script = this.ls.languageService.getScriptAST(fileName);
            assert.notNull(script);

            var result = TypeScript.getZeroBasedLineColumnFromPosition(script, position);

            assert.is(result.line >= 0);
            assert.is(result.col >= 0);
            return result;
        }

        /** Verify that applying edits to sourceFileName result in the content of the file baselineFileName */
        public checkEdits(sourceFileName: string, baselineFileName: string, edits: Services.TextEdit[]) {
            var script = readFile(sourceFileName);
            var formattedScript = this.applyEdits(script, edits);
            var baseline = readFile(baselineFileName);

            assert.noDiff(formattedScript, baseline);
            assert.equal(formattedScript, baseline);
        }


        /** Apply an array of text edits to a string, and return the resulting string. */
        public applyEdits(content: string, edits: Services.TextEdit[]): string {
            var result = content;
            edits = this.normalizeEdits(edits);

            for (var i = edits.length - 1; i >= 0; i--) {
                var edit = edits[i];
                var prefix = result.substring(0, edit.minChar);
                var middle = edit.text;
                var suffix = result.substring(edit.limChar);
                result = prefix + middle + suffix;
            }
            return result;
        }

        /** Normalize an array of edits by removing overlapping entries and sorting entries on the minChar position. */
        private normalizeEdits(edits: Services.TextEdit[]): Services.TextEdit[] {
            var result: Services.TextEdit[] = [];

            function mapEdits(edits: Services.TextEdit[]): { edit: Services.TextEdit; index: number; }[] {
                var result = [];
                for (var i = 0; i < edits.length; i++) {
                    result.push({ edit: edits[i], index: i });
                }
                return result;
            }

            var temp = mapEdits(edits).sort(function (a, b) {
                var result = a.edit.minChar - b.edit.minChar;
                if (result == 0)
                    result = a.index - b.index;
                return result;
            });

            var current = 0;
            var next = 1;
            while (current < temp.length) {
                var currentEdit = temp[current].edit;

                // Last edit
                if (next >= temp.length) {
                    result.push(currentEdit);
                    current++;
                    continue;
                }
                var nextEdit = temp[next].edit;

                var gap = nextEdit.minChar - currentEdit.limChar;

                // non-overlapping edits
                if (gap >= 0) {
                    result.push(currentEdit);
                    current = next;
                    next++;
                    continue;
                }

                // overlapping edits: for now, we only support ignoring an next edit 
                // entirely contained in the current edit.
                if (currentEdit.limChar >= nextEdit.limChar) {
                    next++;
                    continue;
                }
                else {
                    throw new Error("Trying to apply overlapping edits");
                }
            }

            return result;
        }

        public getHostSettings(): string {
            return JSON.stringify({ usePullLanguageService: usePull });
        }
    }

    // Describe/it definitions
    export function describe(description: string, block: () => any) {
        var newScenario = new Scenario(description, block);

        if (Runnable.currentStack.length === 0) {
            Runnable.currentStack.push(currentRun);
        }

        Runnable.currentStack[Runnable.currentStack.length - 1].addChild(newScenario);
    }
    export function it(description: string, block: () => void ) {
        var testCase = new TestCase(description, block);
        Runnable.currentStack[Runnable.currentStack.length - 1].addChild(testCase);
    }

    export function run() {
        if (typeof process !== "undefined") {
            process.on('uncaughtException', Runnable.handleError);
        }

        Baseline.reset();
        currentRun.run();
    }

    /** Runs TypeScript or Javascript code. */
    export module Runner {
        export function runCollateral(path: string, callback: (error: Error, result: any) => void ) {
            path = switchToForwardSlashes(path);
            runString(readFile(path), path.match(/[^\/]*$/)[0], callback);
        }

        export function runJSString(code: string, callback: (error: Error, result: any) => void ) {
            // List of names that get overriden by various test code we eval
            var dangerNames: any = ['Array'];

            var globalBackup: any = {};
            var n: string = null;
            for (n in dangerNames) {
                globalBackup[dangerNames[n]] = global[dangerNames[n]];
            }

            try {
                var res = eval(code);

                for (n in dangerNames) {
                    global[dangerNames[n]] = globalBackup[dangerNames[n]];
                }

                callback(null, res);
            } catch (e) {
                for (n in dangerNames) {
                    global[dangerNames[n]] = globalBackup[dangerNames[n]];
                }

                callback(e, null);
            }
        }

        export function runString(code: string, unitName: string, callback: (error: Error, result: any) => void ) {
            Compiler.compileString(code, unitName, function (res) {
                runJSString(res.code, callback);
            });
        }
    }

    /** Support class for baseline files */
    export module Baseline {
        var reportFilename = 'baseline-report.html';

        var firstRun = true;
        var htmlTrailer = '</body></html>';
        var htmlLeader = '<html><head><title>Baseline Report</title>';
        htmlLeader += ("<style>");
        htmlLeader += '\r\n' + (".code { font: 9pt 'Courier New'; }");
        htmlLeader += '\r\n' + (".old { background-color: #EE1111; }");
        htmlLeader += '\r\n' + (".new { background-color: #FFFF11; }");
        htmlLeader += '\r\n' + (".from { background-color: #EE1111; color: #1111EE; }");
        htmlLeader += '\r\n' + (".to { background-color: #EEEE11; color: #1111EE; }");
        htmlLeader += '\r\n' + ("h2 { margin-bottom: 0px; }");
        htmlLeader += '\r\n' + ("h2 { padding-bottom: 0px; }");
        htmlLeader += '\r\n' + ("h4 { font-weight: normal; }");
        htmlLeader += '\r\n' + ("</style>");

        export interface BaselineOptions {
            LineEndingSensitive?: boolean;
        }

        function localPath(filename: string) {
            if (global.runners[0].testType === 'prototyping') {
                return Harness.userSpecifiedroot + 'tests/baselines/prototyping/local/' + filename;
            }
            else {
                return Harness.userSpecifiedroot + 'tests/baselines/local/' + filename;
            }
        }

        function referencePath(filename: string) {
            if (global.runners[0].testType === 'prototyping') {
                return Harness.userSpecifiedroot + 'tests/baselines/prototyping/reference/' + filename;
            }
            else {
                return Harness.userSpecifiedroot + 'tests/baselines/reference/' + filename;
            }
        }

        export function reset() {
            if (IO.fileExists(reportFilename)) {
                IO.deleteFile(reportFilename);
            }
        }

        function prepareBaselineReport(): string {
            var reportContent = htmlLeader;
            // Delete the baseline-report.html file if needed
            if (IO.fileExists(reportFilename)) {
                reportContent = IO.readFile(reportFilename);
                reportContent = reportContent.replace(htmlTrailer, '');
            } else {
                reportContent = htmlLeader;
            }
            return reportContent;
        }

        function generateActual(actualFilename: string, generateContent: () => string): string {
            // Create folders if needed
            IO.createDirectory(IO.dirName(IO.dirName(actualFilename)));
            IO.createDirectory(IO.dirName(actualFilename));

            // Delete the actual file in case it fails
            if (IO.fileExists(actualFilename)) {
                IO.deleteFile(actualFilename);
            }

            var actual = generateContent();

            if (actual === undefined) {
                throw new Error('The generated content was "undefined". Return "null" if no baselining is required."');
            }

            // Store the content in the 'local' folder so we
            // can accept it later (manually)
            if (actual !== null) {
                IO.writeFile(actualFilename, actual);
            }

            return actual;
        }

        function compareToBaseline(actual: string, relativeFilename: string, opts: BaselineOptions) {
            // actual is now either undefined (the generator had an error), null (no file requested),
            // or some real output of the function
            if (actual === undefined) {
                // Nothing to do
                return;
            }

            var refFilename = referencePath(relativeFilename);

            if (actual === null) {
                actual = '<no content>';
            }

            var expected = '<no content>';
            if (IO.fileExists(refFilename)) {
                expected = IO.readFile(refFilename);
            }

            var lineEndingSensitive = opts && opts.LineEndingSensitive;

            if (!lineEndingSensitive) {
                expected = expected.replace(/\r\n?/g, '\n')
                actual = actual.replace(/\r\n?/g, '\n')
            }

            return { expected: expected, actual: actual };
        }

        function writeComparison(expected: string, actual: string, relativeFilename: string, actualFilename: string, descriptionForDescribe: string) {
            if (expected != actual) {
                // Overwrite & issue error
                var errMsg = 'The baseline file ' + relativeFilename + ' has changed. Please refer to baseline-report.html and ';
                errMsg += 'either fix the regression (if unintended) or run nmake baseline-accept (if intended).'

                var refFilename = referencePath(relativeFilename);

                // Append diff to the report
                var diff = new Diff.StringDiff(expected, actual);
                var header = '<h2>' + descriptionForDescribe + '</h2>';
                header += '<h4>Left file: ' + actualFilename + '; Right file: ' + refFilename + '</h4>';
                var trailer = '<hr>';

                var reportContentSoFar = prepareBaselineReport();
                reportContentSoFar = reportContentSoFar + header + '<div class="code">' + diff.mergedHtml + '</div>' + trailer + htmlTrailer;
                IO.writeFile(reportFilename, reportContentSoFar);

                throw new Error(errMsg);
            }
        }

        export function runBaseline(
            descriptionForDescribe: string,
            relativeFilename: string,
            generateContent: () => string,
            runImmediately? = false,
            opts?: BaselineOptions) {

            var actual = <string>undefined;
            var actualFilename = localPath(relativeFilename);

            if (runImmediately) {
                var actual = generateActual(actualFilename, generateContent);
                var comparison = compareToBaseline(actual, relativeFilename, opts);
                writeComparison(comparison.expected, comparison.actual, relativeFilename, actualFilename, descriptionForDescribe);
            } else {
                describe(descriptionForDescribe, () => {
                    var actual: string;

                    it('Can generate the content without error', () => {
                        actual = generateActual(actualFilename, generateContent);
                    });

                    it('Matches the baseline file', () => {
                        var comparison = compareToBaseline(actual, relativeFilename, opts);
                        writeComparison(comparison.expected, comparison.actual, relativeFilename, actualFilename, descriptionForDescribe);
                    });
                });
            }
        }
    }

    var currentRun = new Run();

    global.describe = describe;
    global.run = run;
    global.it = it;
    global.assert = Harness.Assert;
}


//// [parserharness.js]
//﻿
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<reference path='..\compiler\io.ts'/>
///<reference path='..\compiler\typescript.ts'/>
///<reference path='..\services\typescriptServices.ts' />
///<reference path='diff.ts'/>
function switchToForwardSlashes(path) {
    return path.replace(/\\/g, "/");
}
function filePath(fullPath) {
    fullPath = switchToForwardSlashes(fullPath);
    var components = fullPath.split("/");
    var path = components.slice(0, components.length - 1);
    return path.join("/") + "/";
}
var typescriptServiceFileName = filePath(IO.getExecutingFilePath()) + "typescriptServices.js";
var typescriptServiceFile = IO.readFile(typescriptServiceFileName);
if (typeof ActiveXObject === "function") {
    eval(typescriptServiceFile);
}
else if (typeof require === "function") {
    var vm = require('vm');
    vm.runInThisContext(typescriptServiceFile, 'typescriptServices.js');
}
else {
    throw new Error('Unknown context');
}
var Harness;
(function (Harness) {
    // Settings 
    Harness.userSpecifiedroot = "";
    var global = Function("return this").call(null);
    Harness.usePull = false;
    // Assert functions
    var Assert;
    (function (Assert) {
        Assert.bugIds = [];
        Assert.throwAssertError = function (error) {
            throw error;
        };
        // Marks that the current scenario is impacted by a bug
        function bug(id) {
            if (Assert.bugIds.indexOf(id) < 0) {
                Assert.bugIds.push(id);
            }
        }
        Assert.bug = bug;
        // If there are any bugs in the test code, mark the scenario as impacted appropriately
        function bugs(content) {
            var bugs = content.match(/\bbug (\d+)/i);
            if (bugs) {
                bugs.forEach(function (bug) { return assert.bug(bug); });
            }
        }
        Assert.bugs = bugs;
        function is(result, msg) {
            if (!result) {
                Assert.throwAssertError(new Error(msg || "Expected true, got false."));
            }
        }
        Assert.is = is;
        function arrayLengthIs(arr, length) {
            if (arr.length != length) {
                var actual = '';
                arr.forEach(function (n) { return actual = actual + '\n      ' + n.toString(); });
                Assert.throwAssertError(new Error('Expected array to have ' + length + ' elements. Actual elements were:' + actual));
            }
        }
        Assert.arrayLengthIs = arrayLengthIs;
        function equal(actual, expected) {
            if (actual !== expected) {
                Assert.throwAssertError(new Error("Expected " + actual + " to equal " + expected));
            }
        }
        Assert.equal = equal;
        function notEqual(actual, expected) {
            if (actual === expected) {
                Assert.throwAssertError(new Error("Expected " + actual + " to *not* equal " + expected));
            }
        }
        Assert.notEqual = notEqual;
        function notNull(result) {
            if (result === null) {
                Assert.throwAssertError(new Error("Expected " + result + " to *not* be null"));
            }
        }
        Assert.notNull = notNull;
        function compilerWarning(result, line, column, desc) {
            if (!result.isErrorAt(line, column, desc)) {
                var actual = '';
                result.errors.forEach(function (err) {
                    actual = actual + '\n     ' + err.toString();
                });
                Assert.throwAssertError(new Error("Expected compiler warning at (" + line + ", " + column + "): " + desc + "\nActual errors follow: " + actual));
            }
        }
        Assert.compilerWarning = compilerWarning;
        function noDiff(text1, text2) {
            text1 = text1.replace(/^\s+|\s+$/g, "").replace(/\r\n?/g, "\n");
            text2 = text2.replace(/^\s+|\s+$/g, "").replace(/\r\n?/g, "\n");
            if (text1 !== text2) {
                var errorString = "";
                var text1Lines = text1.split(/\n/);
                var text2Lines = text2.split(/\n/);
                for (var i = 0; i < text1Lines.length; i++) {
                    if (text1Lines[i] !== text2Lines[i]) {
                        errorString += "Difference at line " + (i + 1) + ":\n";
                        errorString += "                  Left File: " + text1Lines[i] + "\n";
                        errorString += "                 Right File: " + text2Lines[i] + "\n\n";
                    }
                }
                Assert.throwAssertError(new Error(errorString));
            }
        }
        Assert.noDiff = noDiff;
        function arrayContains(arr, contains) {
            var found;
            for (var i = 0; i < contains.length; i++) {
                found = false;
                for (var j = 0; j < arr.length; j++) {
                    if (arr[j] === contains[i]) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    Assert.throwAssertError(new Error("Expected array to contain \"" + contains[i] + "\""));
                }
            }
        }
        Assert.arrayContains = arrayContains;
        function arrayContainsOnce(arr, filter) {
            var foundCount = 0;
            for (var i = 0; i < arr.length; i++) {
                if (filter(arr[i])) {
                    foundCount++;
                }
            }
            if (foundCount !== 1) {
                Assert.throwAssertError(new Error("Expected array to match element only once (instead of " + foundCount + " times)"));
            }
        }
        Assert.arrayContainsOnce = arrayContainsOnce;
    })(Assert = Harness.Assert || (Harness.Assert = {}));
    /** Splits the given string on \r\n or on only \n if that fails */
    function splitContentByNewlines(content) {
        // Split up the input file by line
        // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
        // we have to string-based splitting instead and try to figure out the delimiting chars
        var lines = content.split('\r\n');
        if (lines.length === 1) {
            lines = content.split('\n');
        }
        return lines;
    }
    Harness.splitContentByNewlines = splitContentByNewlines;
    /** Reads a file under /tests */
    function readFile(path) {
        if (path.indexOf('tests') < 0) {
            path = "tests/" + path;
        }
        var content = IO.readFile(Harness.userSpecifiedroot + path);
        if (content == null) {
            throw new Error("failed to read file at: '" + Harness.userSpecifiedroot + path + "'");
        }
        return content;
    }
    Harness.readFile = readFile;
    var Logger = /** @class */ (function () {
        function Logger() {
        }
        Logger.prototype.start = function (fileName, priority) { };
        Logger.prototype.end = function (fileName) { };
        Logger.prototype.scenarioStart = function (scenario) { };
        Logger.prototype.scenarioEnd = function (scenario, error) { };
        Logger.prototype.testStart = function (test) { };
        Logger.prototype.pass = function (test) { };
        Logger.prototype.bug = function (test) { };
        Logger.prototype.fail = function (test) { };
        Logger.prototype.error = function (test, error) { };
        Logger.prototype.comment = function (comment) { };
        Logger.prototype.verify = function (test, passed, actual, expected, message) { };
        return Logger;
    }());
    Harness.Logger = Logger;
    // Logger-related functions
    var loggers = [];
    function registerLogger(logger) {
        loggers.push(logger);
    }
    Harness.registerLogger = registerLogger;
    function emitLog(field) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < loggers.length; i++) {
            if (typeof loggers[i][field] === 'function') {
                loggers[i][field].apply(loggers[i], params);
            }
        }
    }
    Harness.emitLog = emitLog;
    var Runnable = /** @class */ (function () {
        function Runnable(description, block) {
            this.description = description;
            this.block = block;
            // The error, if any, that occurred when running 'block'
            this.error = null;
            // Whether or not this object has any failures (including in its descendants)
            this.passed = null;
            // A list of bugs impacting this object
            this.bugs = [];
            // A list of all our child Runnables
            this.children = [];
        }
        Runnable.prototype.addChild = function (child) {
            this.children.push(child);
        };
        /** Call function fn, which may take a done function and may possibly execute
         *  asynchronously, calling done when finished. Returns true or false depending
         *  on whether the function was asynchronous or not.
         */
        Runnable.prototype.call = function (fn, done) {
            var isAsync = true;
            try {
                if (fn.length === 0) {
                    // No async.
                    fn();
                    done();
                    return false;
                }
                else {
                    // Possibly async
                    Runnable.pushGlobalErrorHandler(done);
                    fn(function () {
                        isAsync = false; // If we execute synchronously, this will get called before the return below.
                        Runnable.popGlobalErrorHandler();
                        done();
                    });
                    return isAsync;
                }
            }
            catch (e) {
                done(e);
                return false;
            }
        };
        Runnable.prototype.run = function (done) { };
        Runnable.prototype.runBlock = function (done) {
            return this.call(this.block, done);
        };
        Runnable.prototype.runChild = function (index, done) {
            var _this = this;
            return this.call((function (done) { return _this.children[index].run(done); }), done);
        };
        Runnable.pushGlobalErrorHandler = function (done) {
            errorHandlerStack.push(function (e) {
                done(e);
            });
        };
        Runnable.popGlobalErrorHandler = function () {
            errorHandlerStack.pop();
        };
        Runnable.handleError = function (e) {
            if (errorHandlerStack.length === 0) {
                IO.printLine('Global error: ' + e);
            }
            else {
                errorHandlerStack[errorHandlerStack.length - 1](e);
            }
        };
        // The current stack of Runnable objects
        Runnable.currentStack = [];
        Runnable.errorHandlerStack = [];
        return Runnable;
    }());
    Harness.Runnable = Runnable;
    var TestCase = /** @class */ (function (_super) {
        __extends(TestCase, _super);
        function TestCase(description, block) {
            var _this = _super.call(this, description, block) || this;
            _this.description = description;
            _this.block = block;
            return _this;
        }
        TestCase.prototype.addChild = function (child) {
            throw new Error("Testcases may not be nested inside other testcases");
        };
        /** Run the test case block and fail the test if it raised an error. If no error is raised, the test passes. */
        TestCase.prototype.run = function (done) {
            var that = this;
            Runnable.currentStack.push(this);
            emitLog('testStart', { desc: this.description });
            if (this.block) {
                var async = this.runBlock(function (e) {
                    if (e) {
                        that.passed = false;
                        that.error = e;
                        emitLog('error', { desc: this.description, pass: false }, e);
                    }
                    else {
                        that.passed = true;
                        emitLog('pass', { desc: this.description, pass: true });
                    }
                    Runnable.currentStack.pop();
                    done();
                });
            }
        };
        return TestCase;
    }(Runnable));
    Harness.TestCase = TestCase;
    var Scenario = /** @class */ (function (_super) {
        __extends(Scenario, _super);
        function Scenario(description, block) {
            var _this = _super.call(this, description, block) || this;
            _this.description = description;
            _this.block = block;
            return _this;
        }
        /** Run the block, and if the block doesn't raise an error, run the children. */
        Scenario.prototype.run = function (done) {
            var that = this;
            Runnable.currentStack.push(this);
            emitLog('scenarioStart', { desc: this.description });
            var async = this.runBlock(function (e) {
                Runnable.currentStack.pop();
                if (e) {
                    that.passed = false;
                    that.error = e;
                    var metadata = { id: undefined, desc: this.description, pass: false, bugs: assert.bugIds };
                    // Report all bugs affecting this scenario
                    assert.bugIds.forEach(function (desc) { return emitLog('bug', metadata, desc); });
                    emitLog('scenarioEnd', metadata, e);
                    done();
                }
                else {
                    that.passed = true; // so far so good.
                    that.runChildren(done);
                }
            });
        };
        /** Run the children of the scenario (other scenarios and test cases). If any fail,
         *  set this scenario to failed. Synchronous tests will run synchronously without
         *  adding stack frames.
         */
        Scenario.prototype.runChildren = function (done, index) {
            if (index === void 0) { index = 0; }
            var that = this;
            var async = false;
            for (; index < this.children.length; index++) {
                async = this.runChild(index, function (e) {
                    that.passed = that.passed && that.children[index].passed;
                    if (async)
                        that.runChildren(done, index + 1);
                });
                if (async)
                    return;
            }
            var metadata = { id: undefined, desc: this.description, pass: this.passed, bugs: assert.bugIds };
            // Report all bugs affecting this scenario
            assert.bugIds.forEach(function (desc) { return emitLog('bug', metadata, desc); });
            emitLog('scenarioEnd', metadata);
            done();
        };
        return Scenario;
    }(Runnable));
    Harness.Scenario = Scenario;
    var Run = /** @class */ (function (_super) {
        __extends(Run, _super);
        function Run() {
            return _super.call(this, 'Test Run', null) || this;
        }
        Run.prototype.run = function () {
            emitLog('start');
            this.runChildren();
        };
        Run.prototype.runChildren = function (index) {
            if (index === void 0) { index = 0; }
            var async = false;
            var that = this;
            for (; index < this.children.length; index++) {
                // Clear out bug descriptions
                assert.bugIds = [];
                async = this.runChild(index, function (e) {
                    if (async) {
                        that.runChildren(index + 1);
                    }
                });
                if (async) {
                    return;
                }
            }
            Perf.runBenchmarks();
            emitLog('end');
        };
        return Run;
    }(Runnable));
    Harness.Run = Run;
    // Performance test
    var Perf;
    (function (Perf) {
        var Clock;
        (function (Clock) {
            if (typeof WScript !== "undefined" && typeof global['WScript'].InitializeProjection !== "undefined") {
                // Running in JSHost.
                global['WScript'].InitializeProjection();
                Clock.now = function () {
                    return TestUtilities.QueryPerformanceCounter();
                };
                Clock.resolution = TestUtilities.QueryPerformanceFrequency();
            }
            else {
                Clock.now = function () {
                    return Date.now();
                };
                Clock.resolution = 1000;
            }
        })(Clock = Perf.Clock || (Perf.Clock = {}));
        var Timer = /** @class */ (function () {
            function Timer() {
                this.time = 0;
            }
            Timer.prototype.start = function () {
                this.time = 0;
                this.startTime = Clock.now();
            };
            Timer.prototype.end = function () {
                // Set time to MS.
                this.time = (Clock.now() - this.startTime) / Clock.resolution * 1000;
            };
            return Timer;
        }());
        Perf.Timer = Timer;
        var Dataset = /** @class */ (function () {
            function Dataset() {
                this.data = [];
            }
            Dataset.prototype.add = function (value) {
                this.data.push(value);
            };
            Dataset.prototype.mean = function () {
                var sum = 0;
                for (var i = 0; i < this.data.length; i++) {
                    sum += this.data[i];
                }
                return sum / this.data.length;
            };
            Dataset.prototype.min = function () {
                var min = this.data[0];
                for (var i = 1; i < this.data.length; i++) {
                    if (this.data[i] < min) {
                        min = this.data[i];
                    }
                }
                return min;
            };
            Dataset.prototype.max = function () {
                var max = this.data[0];
                for (var i = 1; i < this.data.length; i++) {
                    if (this.data[i] > max) {
                        max = this.data[i];
                    }
                }
                return max;
            };
            Dataset.prototype.stdDev = function () {
                var sampleMean = this.mean();
                var sumOfSquares = 0;
                for (var i = 0; i < this.data.length; i++) {
                    sumOfSquares += Math.pow(this.data[i] - sampleMean, 2);
                }
                return Math.sqrt(sumOfSquares / this.data.length);
            };
            return Dataset;
        }());
        Perf.Dataset = Dataset;
        // Base benchmark class with some defaults.
        var Benchmark = /** @class */ (function () {
            function Benchmark() {
                this.iterations = 10;
                this.description = "";
                this.results = {};
            }
            Benchmark.prototype.bench = function (subBench) { };
            Benchmark.prototype.before = function () { };
            Benchmark.prototype.beforeEach = function () { };
            Benchmark.prototype.after = function () { };
            Benchmark.prototype.afterEach = function () { };
            Benchmark.prototype.addTimingFor = function (name, timing) {
                this.results[name] = this.results[name] || new Dataset();
                this.results[name].add(timing);
            };
            return Benchmark;
        }());
        Perf.Benchmark = Benchmark;
        Perf.benchmarks = [];
        var timeFunction;
        timeFunction = function (benchmark, description, name, f) {
            if (description === void 0) { description = benchmark.description; }
            if (name === void 0) { name = ''; }
            if (f === void 0) { f = benchmark.bench; }
            var t = new Timer();
            t.start();
            var subBenchmark = function (name, f) {
                timeFunction(benchmark, description, name, f);
            };
            f.call(benchmark, subBenchmark);
            t.end();
            benchmark.addTimingFor(name, t.time);
        };
        function runBenchmarks() {
            for (var i = 0; i < Perf.benchmarks.length; i++) {
                var b = new Perf.benchmarks[i]();
                var t = new Timer();
                b.before();
                for (var j = 0; j < b.iterations; j++) {
                    b.beforeEach();
                    timeFunction(b);
                    b.afterEach();
                }
                b.after();
                for (var prop in b.results) {
                    var description = b.description + (prop ? ": " + prop : '');
                    emitLog('testStart', { desc: description });
                    emitLog('pass', {
                        desc: description, pass: true, perfResults: {
                            mean: b.results[prop].mean(),
                            min: b.results[prop].min(),
                            max: b.results[prop].max(),
                            stdDev: b.results[prop].stdDev(),
                            trials: b.results[prop].data
                        }
                    });
                }
            }
        }
        Perf.runBenchmarks = runBenchmarks;
        // Replace with better type when classes are assignment compatible with
        // the below type.
        // export function addBenchmark(BenchmarkClass: {new(): Benchmark;}) {
        function addBenchmark(BenchmarkClass) {
            Perf.benchmarks.push(BenchmarkClass);
        }
        Perf.addBenchmark = addBenchmark;
    })(Perf = Harness.Perf || (Harness.Perf = {}));
    /** Functionality for compiling TypeScript code */
    var Compiler;
    (function (Compiler) {
        /** Aggregate various writes into a single array of lines. Useful for passing to the
         *  TypeScript compiler to fill with source code or errors.
         */
        var WriterAggregator = /** @class */ (function () {
            function WriterAggregator() {
                this.lines = [];
                this.currentLine = "";
            }
            WriterAggregator.prototype.Write = function (str) {
                this.currentLine += str;
            };
            WriterAggregator.prototype.WriteLine = function (str) {
                this.lines.push(this.currentLine + str);
                this.currentLine = "";
            };
            WriterAggregator.prototype.Close = function () {
                if (this.currentLine.length > 0) {
                    this.lines.push(this.currentLine);
                }
                this.currentLine = "";
            };
            WriterAggregator.prototype.reset = function () {
                this.lines = [];
                this.currentLine = "";
            };
            return WriterAggregator;
        }());
        Compiler.WriterAggregator = WriterAggregator;
        /** Mimics having multiple files, later concatenated to a single file. */
        var EmitterIOHost = /** @class */ (function () {
            function EmitterIOHost() {
                this.fileCollection = {};
            }
            /** create file gets the whole path to create, so this works as expected with the --out parameter */
            EmitterIOHost.prototype.createFile = function (s, useUTF8) {
                if (this.fileCollection[s]) {
                    return this.fileCollection[s];
                }
                var writer = new Harness.Compiler.WriterAggregator();
                this.fileCollection[s] = writer;
                return writer;
            };
            EmitterIOHost.prototype.directoryExists = function (s) { return false; };
            EmitterIOHost.prototype.fileExists = function (s) { return typeof this.fileCollection[s] !== 'undefined'; };
            EmitterIOHost.prototype.resolvePath = function (s) { return s; };
            EmitterIOHost.prototype.reset = function () { this.fileCollection = {}; };
            EmitterIOHost.prototype.toArray = function () {
                var result = [];
                for (var p in this.fileCollection) {
                    if (this.fileCollection.hasOwnProperty(p)) {
                        var current = this.fileCollection[p];
                        if (current.lines.length > 0) {
                            if (p !== '0.js') {
                                current.lines.unshift('////[' + p + ']');
                            }
                            result.push({ filename: p, file: this.fileCollection[p] });
                        }
                    }
                }
                return result;
            };
            return EmitterIOHost;
        }());
        Compiler.EmitterIOHost = EmitterIOHost;
        var libFolder = global['WScript'] ? TypeScript.filePath(global['WScript'].ScriptFullName) : (__dirname + '/');
        Compiler.libText = IO ? IO.readFile(libFolder + "lib.d.ts") : '';
        var stdout = new EmitterIOHost();
        var stderr = new WriterAggregator();
        function isDeclareFile(filename) {
            return /\.d\.ts$/.test(filename);
        }
        Compiler.isDeclareFile = isDeclareFile;
        function makeDefaultCompilerForTest(c) {
            var compiler = c || new TypeScript.TypeScriptCompiler(stderr);
            compiler.parser.errorRecovery = true;
            compiler.settings.codeGenTarget = TypeScript.CodeGenTarget.ES5;
            compiler.settings.controlFlow = true;
            compiler.settings.controlFlowUseDef = true;
            if (Harness.usePull) {
                compiler.settings.usePull = true;
                compiler.settings.useFidelity = true;
            }
            compiler.parseEmitOption(stdout);
            TypeScript.moduleGenTarget = TypeScript.ModuleGenTarget.Synchronous;
            compiler.addUnit(Harness.Compiler.libText, "lib.d.ts", true);
            return compiler;
        }
        Compiler.makeDefaultCompilerForTest = makeDefaultCompilerForTest;
        var compiler;
        recreate();
        // pullUpdateUnit is sufficient if an existing unit is updated, if a new unit is added we need to do a full typecheck
        var needsFullTypeCheck = true;
        function compile(code, filename) {
            if (Harness.usePull) {
                if (needsFullTypeCheck) {
                    compiler.pullTypeCheck(true);
                    needsFullTypeCheck = false;
                }
                else {
                    // requires unit to already exist in the compiler
                    compiler.pullUpdateUnit(new TypeScript.StringSourceText(""), filename, true);
                    compiler.pullUpdateUnit(new TypeScript.StringSourceText(code), filename, true);
                }
            }
            else {
                compiler.reTypeCheck();
            }
        }
        Compiler.compile = compile;
        // Types
        var Type = /** @class */ (function () {
            function Type(type, code, identifier) {
                this.type = type;
                this.code = code;
                this.identifier = identifier;
            }
            Type.prototype.normalizeToArray = function (arg) {
                if ((Array.isArray && Array.isArray(arg)) || arg instanceof Array)
                    return arg;
                return [arg];
            };
            Type.prototype.compilesOk = function (testCode) {
                var errors = null;
                compileString(testCode, 'test.ts', function (compilerResult) {
                    errors = compilerResult.errors;
                });
                return errors.length === 0;
            };
            Type.prototype.isSubtypeOf = function (other) {
                var testCode = 'class __test1__ {\n';
                testCode += '    public test() {\n';
                testCode += '        ' + other.code + ';\n';
                testCode += '        return ' + other.identifier + ';\n';
                testCode += '    }\n';
                testCode += '}\n';
                testCode += 'class __test2__ extends __test1__ {\n';
                testCode += '    public test() {\n';
                testCode += '        ' + this.code + ';\n';
                testCode += '        return ' + other.identifier + ';\n';
                testCode += '    }\n';
                testCode += '}\n';
                return this.compilesOk(testCode);
            };
            // TODO: Find an implementation of isIdenticalTo that works.
            //public isIdenticalTo(other: Type) {
            //    var testCode = 'module __test1__ {\n';
            //    testCode += '    ' + this.code + ';\n';
            //    testCode += '    export var __val__ = ' + this.identifier + ';\n';
            //    testCode += '}\n';
            //    testCode += 'var __test1__val__ = __test1__.__val__;\n';
            //    testCode += 'module __test2__ {\n';
            //    testCode += '    ' + other.code + ';\n';
            //    testCode += '    export var __val__ = ' + other.identifier + ';\n';
            //    testCode += '}\n';
            //    testCode += 'var __test2__val__ = __test2__.__val__;\n';
            //    testCode += 'function __test__function__() { if(true) { return __test1__val__ }; return __test2__val__; }';
            //    return this.compilesOk(testCode);
            //}
            Type.prototype.assertSubtypeOf = function (others) {
                others = this.normalizeToArray(others);
                for (var i = 0; i < others.length; i++) {
                    if (!this.isSubtypeOf(others[i])) {
                        throw new Error("Expected " + this.type + " to be a subtype of " + others[i].type);
                    }
                }
            };
            Type.prototype.assertNotSubtypeOf = function (others) {
                others = this.normalizeToArray(others);
                for (var i = 0; i < others.length; i++) {
                    if (this.isSubtypeOf(others[i])) {
                        throw new Error("Expected " + this.type + " to be a subtype of " + others[i].type);
                    }
                }
            };
            //public assertIdenticalTo(other: Type) {
            //    if (!this.isIdenticalTo(other)) {
            //        throw new Error("Expected " + this.type + " to be identical to " + other.type);
            //    }
            //}
            //public assertNotIdenticalTo(other: Type) {
            //    if (!this.isIdenticalTo(other)) {
            //        throw new Error("Expected " + this.type + " to not be identical to " + other.type);
            //    }
            //}
            Type.prototype.isAssignmentCompatibleWith = function (other) {
                var testCode = 'module __test1__ {\n';
                testCode += '    ' + this.code + ';\n';
                testCode += '    export var __val__ = ' + this.identifier + ';\n';
                testCode += '}\n';
                testCode += 'var __test1__val__ = __test1__.__val__;\n';
                testCode += 'module __test2__ {\n';
                testCode += '    export ' + other.code + ';\n';
                testCode += '    export var __val__ = ' + other.identifier + ';\n';
                testCode += '}\n';
                testCode += 'var __test2__val__ = __test2__.__val__;\n';
                testCode += '__test2__val__ = __test1__val__;';
                return this.compilesOk(testCode);
            };
            Type.prototype.assertAssignmentCompatibleWith = function (others) {
                others = this.normalizeToArray(others);
                for (var i = 0; i < others.length; i++) {
                    var other = others[i];
                    if (!this.isAssignmentCompatibleWith(other)) {
                        throw new Error("Expected " + this.type + " to be assignment compatible with " + other.type);
                    }
                }
            };
            Type.prototype.assertNotAssignmentCompatibleWith = function (others) {
                others = this.normalizeToArray(others);
                for (var i = 0; i < others.length; i++) {
                    var other = others[i];
                    if (this.isAssignmentCompatibleWith(other)) {
                        throw new Error("Expected " + this.type + " to not be assignment compatible with " + other.type);
                    }
                }
            };
            Type.prototype.assertThisCanBeAssignedTo = function (desc, these, notThese) {
                var _this = this;
                it(desc + " is assignable to ", function () {
                    _this.assertAssignmentCompatibleWith(these);
                });
                it(desc + " not assignable to ", function () {
                    _this.assertNotAssignmentCompatibleWith(notThese);
                });
            };
            return Type;
        }());
        Compiler.Type = Type;
        var TypeFactory = /** @class */ (function () {
            function TypeFactory() {
                this.any = this.get('var x : any', 'x');
                this.number = this.get('var x : number', 'x');
                this.string = this.get('var x : string', 'x');
                this.boolean = this.get('var x : boolean', 'x');
            }
            TypeFactory.prototype.get = function (code, target) {
                var targetIdentifier = '';
                var targetPosition = -1;
                if (typeof target === "string") {
                    targetIdentifier = target;
                }
                else if (typeof target === "number") {
                    targetPosition = target;
                }
                else {
                    throw new Error("Expected string or number not " + (typeof target));
                }
                var errors = null;
                compileString(code, 'test.ts', function (compilerResult) {
                    errors = compilerResult.errors;
                });
                if (errors.length > 0)
                    throw new Error("Type definition contains errors: " + errors.join(","));
                var matchingIdentifiers = [];
                if (!Harness.usePull) {
                    // This will find the requested identifier in the first script where it's present, a naive search of each member in each script,
                    // which means this won't play nicely if the same identifier is used in multiple units, but it will enable this to work on multi-file tests.
                    // m = 1 because the first script will always be lib.d.ts which we don't want to search.                                
                    for (var m = 1; m < compiler.scripts.members.length; m++) {
                        var script = compiler.scripts.members[m];
                        var enclosingScopeContext = TypeScript.findEnclosingScopeAt(new TypeScript.NullLogger(), script, new TypeScript.StringSourceText(code), 0, false);
                        var entries = new TypeScript.ScopeTraversal(compiler).getScopeEntries(enclosingScopeContext);
                        for (var i = 0; i < entries.length; i++) {
                            if (entries[i].name === targetIdentifier) {
                                matchingIdentifiers.push(new Type(entries[i].type, code, targetIdentifier));
                            }
                        }
                    }
                }
                else {
                    for (var m = 0; m < compiler.scripts.members.length; m++) {
                        var script2 = compiler.scripts.members[m];
                        if (script2.locationInfo.filename !== 'lib.d.ts') {
                            if (targetPosition > -1) {
                                var tyInfo = compiler.pullGetTypeInfoAtPosition(targetPosition, script2);
                                var name = this.getTypeInfoName(tyInfo.ast);
                                var foundValue = new Type(tyInfo.typeInfo, code, name);
                                if (!matchingIdentifiers.some(function (value) { return (value.identifier === foundValue.identifier) && (value.code === foundValue.code) && (value.type === foundValue.type); })) {
                                    matchingIdentifiers.push(foundValue);
                                }
                            }
                            else {
                                for (var pos = 0; pos < code.length; pos++) {
                                    var tyInfo = compiler.pullGetTypeInfoAtPosition(pos, script2);
                                    var name = this.getTypeInfoName(tyInfo.ast);
                                    if (name === targetIdentifier) {
                                        var foundValue = new Type(tyInfo.typeInfo, code, targetIdentifier);
                                        if (!matchingIdentifiers.some(function (value) { return (value.identifier === foundValue.identifier) && (value.code === foundValue.code) && (value.type === foundValue.type); })) {
                                            matchingIdentifiers.push(foundValue);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (matchingIdentifiers.length === 0) {
                    if (targetPosition > -1) {
                        throw new Error("Could not find an identifier at position " + targetPosition);
                    }
                    else {
                        throw new Error("Could not find an identifier " + targetIdentifier + " in any known scopes");
                    }
                }
                else if (matchingIdentifiers.length > 1) {
                    throw new Error("Found multiple matching identifiers for " + target);
                }
                else {
                    return matchingIdentifiers[0];
                }
            };
            TypeFactory.prototype.getTypeInfoName = function (ast) {
                var name = '';
                switch (ast.nodeType) {
                    case TypeScript.NodeType.Name: // Type Name?
                    case TypeScript.NodeType.Null:
                    case TypeScript.NodeType.List:
                    case TypeScript.NodeType.Empty:
                    case TypeScript.NodeType.EmptyExpr:
                    case TypeScript.NodeType.Asg:
                    case TypeScript.NodeType.True:
                    case TypeScript.NodeType.False:
                    case TypeScript.NodeType.ArrayLit:
                    case TypeScript.NodeType.TypeRef:
                        break;
                    case TypeScript.NodeType.Super:
                        name = ast.text;
                        break;
                    case TypeScript.NodeType.Regex:
                        name = ast.text;
                        break;
                    case TypeScript.NodeType.QString:
                        name = ast.text;
                        break;
                    case TypeScript.NodeType.NumberLit:
                        name = ast.text;
                        break;
                    case TypeScript.NodeType.Return:
                        //name = (<TypeScript.ReturnStatement>tyInfo.ast).returnExpression.actualText; // why is this complaining?
                        break;
                    case TypeScript.NodeType.InterfaceDeclaration:
                        name = ast.name.actualText;
                        break;
                    case TypeScript.NodeType.ModuleDeclaration:
                        name = ast.name.actualText;
                        break;
                    case TypeScript.NodeType.ClassDeclaration:
                        name = ast.name.actualText;
                        break;
                    case TypeScript.NodeType.FuncDecl:
                        name = !ast.name ? "" : ast.name.actualText; // name == null for lambdas
                        break;
                    default:
                        // TODO: is there a reason to mess with all the special cases above and not just do this (ie take whatever property is there and works?)
                        var a = ast;
                        name = (a.id) ? (a.id.actualText) : (a.name) ? a.name.actualText : (a.text) ? a.text : '';
                        break;
                }
                return name;
            };
            TypeFactory.prototype.isOfType = function (expr, expectedType) {
                var actualType = this.get('var _v_a_r_ = ' + expr, '_v_a_r_');
                it('Expression "' + expr + '" is of type "' + expectedType + '"', function () {
                    assert.equal(actualType.type, expectedType);
                });
            };
            return TypeFactory;
        }());
        Compiler.TypeFactory = TypeFactory;
        /** Generates a .d.ts file for the given code
          * @param verifyNoDeclFile pass true when the given code should generate no decl file, false otherwise
          * @param unitName add the given code under thie name, else use '0.ts'
          * @param compilationContext a set of functions to be run before and after compiling this code for doing things like adding dependencies first
          * @param references the set of referenced files used by the given code
          */
        function generateDeclFile(code, verifyNoDeclFile, unitName, compilationContext, references) {
            reset();
            compiler.settings.generateDeclarationFiles = true;
            var oldOutputOption = compiler.settings.outputOption;
            var oldEmitterIOHost = compiler.emitSettings.ioHost;
            try {
                if (compilationContext && compilationContext.preCompile) {
                    compilationContext.preCompile();
                }
                addUnit(code, unitName, false, false, references);
                compiler.reTypeCheck();
                var outputs = {};
                compiler.settings.outputOption = "";
                compiler.parseEmitOption({
                    createFile: function (fn) {
                        outputs[fn] = new Harness.Compiler.WriterAggregator();
                        return outputs[fn];
                    },
                    directoryExists: function (path) { return true; },
                    fileExists: function (path) { return true; },
                    resolvePath: function (path) { return path; }
                });
                compiler.emitDeclarations();
                var results = null;
                for (var fn in outputs) {
                    if (fn.indexOf('.d.ts') >= 0) {
                        var writer = outputs[fn];
                        writer.Close();
                        results = writer.lines.join('\n');
                        if (verifyNoDeclFile && results != "") {
                            throw new Error('Compilation should not produce ' + fn);
                        }
                    }
                }
                if (results) {
                    return results;
                }
                if (!verifyNoDeclFile) {
                    throw new Error('Compilation did not produce .d.ts files');
                }
            }
            finally {
                compiler.settings.generateDeclarationFiles = false;
                compiler.settings.outputOption = oldOutputOption;
                compiler.parseEmitOption(oldEmitterIOHost);
                if (compilationContext && compilationContext.postCompile) {
                    compilationContext.postCompile();
                }
                var uName = unitName || '0.ts';
                updateUnit('', uName);
            }
            return '';
        }
        Compiler.generateDeclFile = generateDeclFile;
        /** Contains the code and errors of a compilation and some helper methods to check its status. */
        var CompilerResult = /** @class */ (function () {
            /** @param fileResults an array of strings for the filename and an ITextWriter with its code */
            function CompilerResult(fileResults, errorLines, scripts) {
                this.fileResults = fileResults;
                this.scripts = scripts;
                var lines = [];
                fileResults.forEach(function (v) { return lines = lines.concat(v.file.lines); });
                this.code = lines.join("\n");
                this.errors = [];
                for (var i = 0; i < errorLines.length; i++) {
                    if (Harness.usePull) {
                        var err = errorLines[i]; // TypeScript.PullError
                        this.errors.push(new CompilerError(err.filename, 0, 0, err.message));
                    }
                    else {
                        var match = errorLines[i].match(/([^\(]*)\((\d+),(\d+)\):\s+((.*[\s\r\n]*.*)+)\s*$/);
                        if (match) {
                            this.errors.push(new CompilerError(match[1], parseFloat(match[2]), parseFloat(match[3]), match[4]));
                        }
                        else {
                            WScript.Echo("non-match on: " + errorLines[i]);
                        }
                    }
                }
            }
            CompilerResult.prototype.isErrorAt = function (line, column, message) {
                for (var i = 0; i < this.errors.length; i++) {
                    if (this.errors[i].line === line && this.errors[i].column === column && this.errors[i].message === message)
                        return true;
                }
                return false;
            };
            return CompilerResult;
        }());
        Compiler.CompilerResult = CompilerResult;
        // Compiler Error.
        var CompilerError = /** @class */ (function () {
            function CompilerError(file, line, column, message) {
                this.file = file;
                this.line = line;
                this.column = column;
                this.message = message;
            }
            CompilerError.prototype.toString = function () {
                return this.file + "(" + this.line + "," + this.column + "): " + this.message;
            };
            return CompilerError;
        }());
        Compiler.CompilerError = CompilerError;
        /** Create a new instance of the compiler with default settings and lib.d.ts, then typecheck */
        function recreate() {
            compiler = makeDefaultCompilerForTest();
            if (Harness.usePull) {
                compiler.pullTypeCheck(true);
            }
            else {
                compiler.typeCheck();
            }
        }
        Compiler.recreate = recreate;
        function reset() {
            stdout.reset();
            stderr.reset();
            var files = compiler.units.map(function (value) { return value.filename; });
            for (var i = 0; i < files.length; i++) {
                var fname = files[i];
                if (fname !== 'lib.d.ts') {
                    updateUnit('', fname);
                }
            }
            compiler.errorReporter.hasErrors = false;
        }
        Compiler.reset = reset;
        function addUnit(code, unitName, isResident, isDeclareFile, references) {
            var script = null;
            var uName = unitName || '0' + (isDeclareFile ? '.d.ts' : '.ts');
            for (var i = 0; i < compiler.units.length; i++) {
                if (compiler.units[i].filename === uName) {
                    updateUnit(code, uName);
                    script = compiler.scripts.members[i];
                }
            }
            if (!script) {
                // TODO: make this toggleable, shouldn't be necessary once typecheck bugs are cleaned up
                // but without it subsequent tests are treated as edits, making for somewhat useful stress testing
                // of persistent typecheck state
                //compiler.addUnit("", uName, isResident, references); // equivalent to compiler.deleteUnit(...)
                script = compiler.addUnit(code, uName, isResident, references);
                needsFullTypeCheck = true;
            }
            return script;
        }
        Compiler.addUnit = addUnit;
        function updateUnit(code, unitName, setRecovery) {
            if (Harness.usePull) {
                compiler.pullUpdateUnit(new TypeScript.StringSourceText(code), unitName, setRecovery);
            }
            else {
                compiler.updateUnit(code, unitName, setRecovery);
            }
        }
        Compiler.updateUnit = updateUnit;
        function compileFile(path, callback, settingsCallback, context, references) {
            path = switchToForwardSlashes(path);
            var filename = path.match(/[^\/]*$/)[0];
            var code = readFile(path);
            compileUnit(code, filename, callback, settingsCallback, context, references);
        }
        Compiler.compileFile = compileFile;
        function compileUnit(code, filename, callback, settingsCallback, context, references) {
            // not recursive
            function clone /* <T> */(source, target) {
                for (var prop in source) {
                    target[prop] = source[prop];
                }
            }
            var oldCompilerSettings = new TypeScript.CompilationSettings();
            clone(compiler.settings, oldCompilerSettings);
            var oldEmitSettings = new TypeScript.EmitOptions(compiler.settings);
            clone(compiler.emitSettings, oldEmitSettings);
            var oldModuleGenTarget = TypeScript.moduleGenTarget;
            if (settingsCallback) {
                settingsCallback(compiler.settings);
                compiler.emitSettings = new TypeScript.EmitOptions(compiler.settings);
            }
            try {
                compileString(code, filename, callback, context, references);
            }
            finally {
                // If settingsCallback exists, assume that it modified the global compiler instance's settings in some way.
                // So that a test doesn't have side effects for tests run after it, restore the compiler settings to their previous state.
                if (settingsCallback) {
                    compiler.settings = oldCompilerSettings;
                    compiler.emitSettings = oldEmitSettings;
                    TypeScript.moduleGenTarget = oldModuleGenTarget;
                }
            }
        }
        Compiler.compileUnit = compileUnit;
        function compileUnits(units, callback, settingsCallback) {
            var lastUnit = units[units.length - 1];
            var unitName = switchToForwardSlashes(lastUnit.name).match(/[^\/]*$/)[0];
            var dependencies = units.slice(0, units.length - 1);
            var compilationContext = Harness.Compiler.defineCompilationContextForTest(unitName, dependencies);
            compileUnit(lastUnit.content, unitName, callback, settingsCallback, compilationContext, lastUnit.references);
        }
        Compiler.compileUnits = compileUnits;
        function emitToOutfile(outfile) {
            compiler.emitToOutfile(outfile);
        }
        Compiler.emitToOutfile = emitToOutfile;
        function emit(ioHost, usePullEmitter) {
            compiler.emit(ioHost, usePullEmitter);
        }
        Compiler.emit = emit;
        function compileString(code, unitName, callback, context, references) {
            var scripts = [];
            reset();
            if (context) {
                context.preCompile();
            }
            var isDeclareFile = Harness.Compiler.isDeclareFile(unitName);
            // for single file tests just add them as using the old '0.ts' naming scheme
            var uName = context ? unitName : ((isDeclareFile) ? '0.d.ts' : '0.ts');
            scripts.push(addUnit(code, uName, false, isDeclareFile, references));
            compile(code, uName);
            var errors;
            if (Harness.usePull) {
                // TODO: no emit support with pull yet
                errors = compiler.pullGetErrorsForFile(uName);
                emit(stdout, true);
            }
            else {
                errors = stderr.lines;
                emit(stdout, false);
                //output decl file
                compiler.emitDeclarations();
            }
            if (context) {
                context.postCompile();
            }
            callback(new CompilerResult(stdout.toArray(), errors, scripts));
        }
        Compiler.compileString = compileString;
        /** Returns a set of functions which can be later executed to add and remove given dependencies to the compiler so that
         *  a file can be successfully compiled. These functions will add/remove named units and code to the compiler for each dependency.
         */
        function defineCompilationContextForTest(filename, dependencies) {
            // if the given file has no dependencies, there is no context to return, it can be compiled without additional work
            if (dependencies.length == 0) {
                return null;
            }
            else {
                var addedFiles = [];
                var precompile = function () {
                    // REVIEW: if any dependency has a triple slash reference then does postCompile potentially have to do a recreate since we can't update references with updateUnit?
                    // easy enough to do if so, prefer to avoid the recreate cost until it proves to be an issue
                    dependencies.forEach(function (dep) {
                        addUnit(dep.content, dep.name, false, Harness.Compiler.isDeclareFile(dep.name));
                        addedFiles.push(dep.name);
                    });
                };
                var postcompile = function () {
                    addedFiles.forEach(function (file) {
                        updateUnit('', file);
                    });
                };
                var context = {
                    filename: filename,
                    preCompile: precompile,
                    postCompile: postcompile
                };
                return context;
            }
        }
        Compiler.defineCompilationContextForTest = defineCompilationContextForTest;
    })(Compiler = Harness.Compiler || (Harness.Compiler = {}));
    /** Parses the test cases files
     *  extracts options and individual files in a multifile test
     */
    var TestCaseParser;
    (function (TestCaseParser) {
        optionRegex = /^[\/]{2}\s*@(\w+):\s*(\S*)/gm; // multiple matches on multiple lines
        // List of allowed metadata names
        var fileMetadataNames = ["filename", "comments", "declaration", "module", "nolib", "sourcemap", "target", "out"];
        function extractCompilerSettings(content) {
            var opts = [];
            var match;
            while ((match = optionRegex.exec(content)) != null) {
                opts.push({ flag: match[1], value: match[2] });
            }
            return opts;
        }
        /** Given a test file containing // @Filename directives, return an array of named units of code to be added to an existing compiler instance */
        function makeUnitsFromTest(code, filename) {
            var settings = extractCompilerSettings(code);
            // List of all the subfiles we've parsed out
            var files = [];
            var lines = splitContentByNewlines(code);
            // Stuff related to the subfile we're parsing
            var currentFileContent = null;
            var currentFileOptions = {};
            var currentFileName = null;
            var refs = [];
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var isTripleSlashReference = /[\/]{3}\s*<reference path/.test(line);
                var testMetaData = optionRegex.exec(line);
                // Triple slash references need to be tracked as they are added to the compiler as an additional parameter to addUnit
                if (isTripleSlashReference) {
                    var isRef = line.match(/reference\spath='(\w*_?\w*\.?d?\.ts)'/);
                    if (isRef) {
                        var ref = {
                            minChar: 0,
                            limChar: 0,
                            startLine: 0,
                            startCol: 0,
                            path: isRef[1],
                            isResident: false
                        };
                        refs.push(ref);
                    }
                }
                else if (testMetaData) {
                    // Comment line, check for global/file @options and record them
                    optionRegex.lastIndex = 0;
                    var fileNameIndex = fileMetadataNames.indexOf(testMetaData[1].toLowerCase());
                    if (fileNameIndex == -1) {
                        throw new Error('Unrecognized metadata name "' + testMetaData[1] + '". Available file metadata names are: ' + fileMetadataNames.join(', '));
                    }
                    else if (fileNameIndex == 0) {
                        currentFileOptions[testMetaData[1]] = testMetaData[2];
                    }
                    else {
                        continue;
                    }
                    // New metadata statement after having collected some code to go with the previous metadata
                    if (currentFileName) {
                        // Store result file
                        var newTestFile = {
                            content: currentFileContent,
                            name: currentFileName,
                            fileOptions: currentFileOptions,
                            originalFilePath: filename,
                            references: refs
                        };
                        files.push(newTestFile);
                        // Reset local data
                        currentFileContent = null;
                        currentFileOptions = {};
                        currentFileName = testMetaData[2];
                        refs = [];
                    }
                    else {
                        // First metadata marker in the file
                        currentFileName = testMetaData[2];
                    }
                }
                else {
                    // Subfile content line
                    // Append to the current subfile content, inserting a newline needed
                    if (currentFileContent === null) {
                        currentFileContent = '';
                    }
                    else {
                        // End-of-line
                        currentFileContent = currentFileContent + '\n';
                    }
                    currentFileContent = currentFileContent + line;
                }
            }
            // normalize the filename for the single file case
            currentFileName = files.length > 0 ? currentFileName : '0.ts';
            // EOF, push whatever remains
            var newTestFile = {
                content: currentFileContent || '',
                name: currentFileName,
                fileOptions: currentFileOptions,
                originalFilePath: filename,
                references: refs
            };
            files.push(newTestFile);
            return { settings: settings, testUnitData: files };
        }
        TestCaseParser.makeUnitsFromTest = makeUnitsFromTest;
    })(TestCaseParser = Harness.TestCaseParser || (Harness.TestCaseParser = {}));
    var ScriptInfo = /** @class */ (function () {
        function ScriptInfo(name, content, isResident, maxScriptVersions) {
            this.name = name;
            this.content = content;
            this.isResident = isResident;
            this.maxScriptVersions = maxScriptVersions;
            this.editRanges = [];
            this.version = 1;
        }
        ScriptInfo.prototype.updateContent = function (content, isResident) {
            this.editRanges = [];
            this.content = content;
            this.isResident = isResident;
            this.version++;
        };
        ScriptInfo.prototype.editContent = function (minChar, limChar, newText) {
            // Apply edits
            var prefix = this.content.substring(0, minChar);
            var middle = newText;
            var suffix = this.content.substring(limChar);
            this.content = prefix + middle + suffix;
            // Store edit range + new length of script
            this.editRanges.push({
                length: this.content.length,
                editRange: new TypeScript.ScriptEditRange(minChar, limChar, (limChar - minChar) + newText.length)
            });
            if (this.editRanges.length > this.maxScriptVersions) {
                this.editRanges.splice(0, this.maxScriptVersions - this.editRanges.length);
            }
            // Update version #
            this.version++;
        };
        ScriptInfo.prototype.getEditRangeSinceVersion = function (version) {
            if (this.version == version) {
                // No edits!
                return null;
            }
            var initialEditRangeIndex = this.editRanges.length - (this.version - version);
            if (initialEditRangeIndex < 0 || initialEditRangeIndex >= this.editRanges.length) {
                // Too far away from what we know
                return TypeScript.ScriptEditRange.unknown();
            }
            var entries = this.editRanges.slice(initialEditRangeIndex);
            var minDistFromStart = entries.map(function (x) { return x.editRange.minChar; }).reduce(function (prev, current) { return Math.min(prev, current); });
            var minDistFromEnd = entries.map(function (x) { return x.length - x.editRange.limChar; }).reduce(function (prev, current) { return Math.min(prev, current); });
            var aggDelta = entries.map(function (x) { return x.editRange.delta; }).reduce(function (prev, current) { return prev + current; });
            return new TypeScript.ScriptEditRange(minDistFromStart, entries[0].length - minDistFromEnd, aggDelta);
        };
        return ScriptInfo;
    }());
    Harness.ScriptInfo = ScriptInfo;
    var TypeScriptLS = /** @class */ (function () {
        function TypeScriptLS() {
            this.ls = null;
            this.scripts = [];
            this.maxScriptVersions = 100;
        }
        TypeScriptLS.prototype.addDefaultLibrary = function () {
            this.addScript("lib.d.ts", Harness.Compiler.libText, true);
        };
        TypeScriptLS.prototype.addFile = function (name, isResident) {
            if (isResident === void 0) { isResident = false; }
            var code = readFile(name);
            this.addScript(name, code, isResident);
        };
        TypeScriptLS.prototype.addScript = function (name, content, isResident) {
            if (isResident === void 0) { isResident = false; }
            var script = new ScriptInfo(name, content, isResident, this.maxScriptVersions);
            this.scripts.push(script);
        };
        TypeScriptLS.prototype.updateScript = function (name, content, isResident) {
            if (isResident === void 0) { isResident = false; }
            for (var i = 0; i < this.scripts.length; i++) {
                if (this.scripts[i].name == name) {
                    this.scripts[i].updateContent(content, isResident);
                    return;
                }
            }
            this.addScript(name, content, isResident);
        };
        TypeScriptLS.prototype.editScript = function (name, minChar, limChar, newText) {
            for (var i = 0; i < this.scripts.length; i++) {
                if (this.scripts[i].name == name) {
                    this.scripts[i].editContent(minChar, limChar, newText);
                    return;
                }
            }
            throw new Error("No script with name '" + name + "'");
        };
        TypeScriptLS.prototype.getScriptContent = function (scriptIndex) {
            return this.scripts[scriptIndex].content;
        };
        //////////////////////////////////////////////////////////////////////
        // ILogger implementation
        //
        TypeScriptLS.prototype.information = function () { return false; };
        TypeScriptLS.prototype.debug = function () { return true; };
        TypeScriptLS.prototype.warning = function () { return true; };
        TypeScriptLS.prototype.error = function () { return true; };
        TypeScriptLS.prototype.fatal = function () { return true; };
        TypeScriptLS.prototype.log = function (s) {
            // For debugging...
            //IO.printLine("TypeScriptLS:" + s);
        };
        //////////////////////////////////////////////////////////////////////
        // ILanguageServiceShimHost implementation
        //
        TypeScriptLS.prototype.getCompilationSettings = function () {
            return ""; // i.e. default settings
        };
        TypeScriptLS.prototype.getScriptCount = function () {
            return this.scripts.length;
        };
        TypeScriptLS.prototype.getScriptSourceText = function (scriptIndex, start, end) {
            return this.scripts[scriptIndex].content.substring(start, end);
        };
        TypeScriptLS.prototype.getScriptSourceLength = function (scriptIndex) {
            return this.scripts[scriptIndex].content.length;
        };
        TypeScriptLS.prototype.getScriptId = function (scriptIndex) {
            return this.scripts[scriptIndex].name;
        };
        TypeScriptLS.prototype.getScriptIsResident = function (scriptIndex) {
            return this.scripts[scriptIndex].isResident;
        };
        TypeScriptLS.prototype.getScriptVersion = function (scriptIndex) {
            return this.scripts[scriptIndex].version;
        };
        TypeScriptLS.prototype.getScriptEditRangeSinceVersion = function (scriptIndex, scriptVersion) {
            var range = this.scripts[scriptIndex].getEditRangeSinceVersion(scriptVersion);
            var result = (range.minChar + "," + range.limChar + "," + range.delta);
            return result;
        };
        /** Return a new instance of the language service shim, up-to-date wrt to typecheck.
         *  To access the non-shim (i.e. actual) language service, use the "ls.languageService" property.
         */
        TypeScriptLS.prototype.getLanguageService = function () {
            var ls = new Services.TypeScriptServicesFactory().createLanguageServiceShim(this);
            ls.refresh(true);
            this.ls = ls;
            return ls;
        };
        /** Parse file given its source text */
        TypeScriptLS.prototype.parseSourceText = function (fileName, sourceText) {
            var parser = new TypeScript.Parser();
            parser.setErrorRecovery(null);
            parser.errorCallback = function (a, b, c, d) { };
            var script = parser.parse(sourceText, fileName, 0);
            return script;
        };
        /** Parse a file on disk given its filename */
        TypeScriptLS.prototype.parseFile = function (fileName) {
            var sourceText = new TypeScript.StringSourceText(IO.readFile(fileName));
            return this.parseSourceText(fileName, sourceText);
        };
        /**
         * @param line 1 based index
         * @param col 1 based index
        */
        TypeScriptLS.prototype.lineColToPosition = function (fileName, line, col) {
            var script = this.ls.languageService.getScriptAST(fileName);
            assert.notNull(script);
            assert.is(line >= 1);
            assert.is(col >= 1);
            assert.is(line <= script.locationInfo.lineMap.length);
            return TypeScript.getPositionFromZeroBasedLineColumn(script, line - 1, col - 1);
        };
        /**
         * @param line 0 based index
         * @param col 0 based index
        */
        TypeScriptLS.prototype.positionToZeroBasedLineCol = function (fileName, position) {
            var script = this.ls.languageService.getScriptAST(fileName);
            assert.notNull(script);
            var result = TypeScript.getZeroBasedLineColumnFromPosition(script, position);
            assert.is(result.line >= 0);
            assert.is(result.col >= 0);
            return result;
        };
        /** Verify that applying edits to sourceFileName result in the content of the file baselineFileName */
        TypeScriptLS.prototype.checkEdits = function (sourceFileName, baselineFileName, edits) {
            var script = readFile(sourceFileName);
            var formattedScript = this.applyEdits(script, edits);
            var baseline = readFile(baselineFileName);
            assert.noDiff(formattedScript, baseline);
            assert.equal(formattedScript, baseline);
        };
        /** Apply an array of text edits to a string, and return the resulting string. */
        TypeScriptLS.prototype.applyEdits = function (content, edits) {
            var result = content;
            edits = this.normalizeEdits(edits);
            for (var i = edits.length - 1; i >= 0; i--) {
                var edit = edits[i];
                var prefix = result.substring(0, edit.minChar);
                var middle = edit.text;
                var suffix = result.substring(edit.limChar);
                result = prefix + middle + suffix;
            }
            return result;
        };
        /** Normalize an array of edits by removing overlapping entries and sorting entries on the minChar position. */
        TypeScriptLS.prototype.normalizeEdits = function (edits) {
            var result = [];
            function mapEdits(edits) {
                var result = [];
                for (var i = 0; i < edits.length; i++) {
                    result.push({ edit: edits[i], index: i });
                }
                return result;
            }
            var temp = mapEdits(edits).sort(function (a, b) {
                var result = a.edit.minChar - b.edit.minChar;
                if (result == 0)
                    result = a.index - b.index;
                return result;
            });
            var current = 0;
            var next = 1;
            while (current < temp.length) {
                var currentEdit = temp[current].edit;
                // Last edit
                if (next >= temp.length) {
                    result.push(currentEdit);
                    current++;
                    continue;
                }
                var nextEdit = temp[next].edit;
                var gap = nextEdit.minChar - currentEdit.limChar;
                // non-overlapping edits
                if (gap >= 0) {
                    result.push(currentEdit);
                    current = next;
                    next++;
                    continue;
                }
                // overlapping edits: for now, we only support ignoring an next edit 
                // entirely contained in the current edit.
                if (currentEdit.limChar >= nextEdit.limChar) {
                    next++;
                    continue;
                }
                else {
                    throw new Error("Trying to apply overlapping edits");
                }
            }
            return result;
        };
        TypeScriptLS.prototype.getHostSettings = function () {
            return JSON.stringify({ usePullLanguageService: Harness.usePull });
        };
        return TypeScriptLS;
    }());
    Harness.TypeScriptLS = TypeScriptLS;
    // Describe/it definitions
    function describe(description, block) {
        var newScenario = new Scenario(description, block);
        if (Runnable.currentStack.length === 0) {
            Runnable.currentStack.push(currentRun);
        }
        Runnable.currentStack[Runnable.currentStack.length - 1].addChild(newScenario);
    }
    Harness.describe = describe;
    function it(description, block) {
        var testCase = new TestCase(description, block);
        Runnable.currentStack[Runnable.currentStack.length - 1].addChild(testCase);
    }
    Harness.it = it;
    function run() {
        if (typeof process !== "undefined") {
            process.on('uncaughtException', Runnable.handleError);
        }
        Baseline.reset();
        currentRun.run();
    }
    Harness.run = run;
    /** Runs TypeScript or Javascript code. */
    var Runner;
    (function (Runner) {
        function runCollateral(path, callback) {
            path = switchToForwardSlashes(path);
            runString(readFile(path), path.match(/[^\/]*$/)[0], callback);
        }
        Runner.runCollateral = runCollateral;
        function runJSString(code, callback) {
            // List of names that get overriden by various test code we eval
            var dangerNames = ['Array'];
            var globalBackup = {};
            var n = null;
            for (n in dangerNames) {
                globalBackup[dangerNames[n]] = global[dangerNames[n]];
            }
            try {
                var res = eval(code);
                for (n in dangerNames) {
                    global[dangerNames[n]] = globalBackup[dangerNames[n]];
                }
                callback(null, res);
            }
            catch (e) {
                for (n in dangerNames) {
                    global[dangerNames[n]] = globalBackup[dangerNames[n]];
                }
                callback(e, null);
            }
        }
        Runner.runJSString = runJSString;
        function runString(code, unitName, callback) {
            Compiler.compileString(code, unitName, function (res) {
                runJSString(res.code, callback);
            });
        }
        Runner.runString = runString;
    })(Runner = Harness.Runner || (Harness.Runner = {}));
    /** Support class for baseline files */
    var Baseline;
    (function (Baseline) {
        var reportFilename = 'baseline-report.html';
        var firstRun = true;
        var htmlTrailer = '</body></html>';
        var htmlLeader = '<html><head><title>Baseline Report</title>';
        htmlLeader += ("<style>");
        htmlLeader += '\r\n' + (".code { font: 9pt 'Courier New'; }");
        htmlLeader += '\r\n' + (".old { background-color: #EE1111; }");
        htmlLeader += '\r\n' + (".new { background-color: #FFFF11; }");
        htmlLeader += '\r\n' + (".from { background-color: #EE1111; color: #1111EE; }");
        htmlLeader += '\r\n' + (".to { background-color: #EEEE11; color: #1111EE; }");
        htmlLeader += '\r\n' + ("h2 { margin-bottom: 0px; }");
        htmlLeader += '\r\n' + ("h2 { padding-bottom: 0px; }");
        htmlLeader += '\r\n' + ("h4 { font-weight: normal; }");
        htmlLeader += '\r\n' + ("</style>");
        function localPath(filename) {
            if (global.runners[0].testType === 'prototyping') {
                return Harness.userSpecifiedroot + 'tests/baselines/prototyping/local/' + filename;
            }
            else {
                return Harness.userSpecifiedroot + 'tests/baselines/local/' + filename;
            }
        }
        function referencePath(filename) {
            if (global.runners[0].testType === 'prototyping') {
                return Harness.userSpecifiedroot + 'tests/baselines/prototyping/reference/' + filename;
            }
            else {
                return Harness.userSpecifiedroot + 'tests/baselines/reference/' + filename;
            }
        }
        function reset() {
            if (IO.fileExists(reportFilename)) {
                IO.deleteFile(reportFilename);
            }
        }
        Baseline.reset = reset;
        function prepareBaselineReport() {
            var reportContent = htmlLeader;
            // Delete the baseline-report.html file if needed
            if (IO.fileExists(reportFilename)) {
                reportContent = IO.readFile(reportFilename);
                reportContent = reportContent.replace(htmlTrailer, '');
            }
            else {
                reportContent = htmlLeader;
            }
            return reportContent;
        }
        function generateActual(actualFilename, generateContent) {
            // Create folders if needed
            IO.createDirectory(IO.dirName(IO.dirName(actualFilename)));
            IO.createDirectory(IO.dirName(actualFilename));
            // Delete the actual file in case it fails
            if (IO.fileExists(actualFilename)) {
                IO.deleteFile(actualFilename);
            }
            var actual = generateContent();
            if (actual === undefined) {
                throw new Error('The generated content was "undefined". Return "null" if no baselining is required."');
            }
            // Store the content in the 'local' folder so we
            // can accept it later (manually)
            if (actual !== null) {
                IO.writeFile(actualFilename, actual);
            }
            return actual;
        }
        function compareToBaseline(actual, relativeFilename, opts) {
            // actual is now either undefined (the generator had an error), null (no file requested),
            // or some real output of the function
            if (actual === undefined) {
                // Nothing to do
                return;
            }
            var refFilename = referencePath(relativeFilename);
            if (actual === null) {
                actual = '<no content>';
            }
            var expected = '<no content>';
            if (IO.fileExists(refFilename)) {
                expected = IO.readFile(refFilename);
            }
            var lineEndingSensitive = opts && opts.LineEndingSensitive;
            if (!lineEndingSensitive) {
                expected = expected.replace(/\r\n?/g, '\n');
                actual = actual.replace(/\r\n?/g, '\n');
            }
            return { expected: expected, actual: actual };
        }
        function writeComparison(expected, actual, relativeFilename, actualFilename, descriptionForDescribe) {
            if (expected != actual) {
                // Overwrite & issue error
                var errMsg = 'The baseline file ' + relativeFilename + ' has changed. Please refer to baseline-report.html and ';
                errMsg += 'either fix the regression (if unintended) or run nmake baseline-accept (if intended).';
                var refFilename = referencePath(relativeFilename);
                // Append diff to the report
                var diff = new Diff.StringDiff(expected, actual);
                var header = '<h2>' + descriptionForDescribe + '</h2>';
                header += '<h4>Left file: ' + actualFilename + '; Right file: ' + refFilename + '</h4>';
                var trailer = '<hr>';
                var reportContentSoFar = prepareBaselineReport();
                reportContentSoFar = reportContentSoFar + header + '<div class="code">' + diff.mergedHtml + '</div>' + trailer + htmlTrailer;
                IO.writeFile(reportFilename, reportContentSoFar);
                throw new Error(errMsg);
            }
        }
        function runBaseline(descriptionForDescribe, relativeFilename, generateContent, runImmediately, opts) {
            if (runImmediately === void 0) { runImmediately = false; }
            var actual = undefined;
            var actualFilename = localPath(relativeFilename);
            if (runImmediately) {
                var actual = generateActual(actualFilename, generateContent);
                var comparison = compareToBaseline(actual, relativeFilename, opts);
                writeComparison(comparison.expected, comparison.actual, relativeFilename, actualFilename, descriptionForDescribe);
            }
            else {
                describe(descriptionForDescribe, function () {
                    var actual;
                    it('Can generate the content without error', function () {
                        actual = generateActual(actualFilename, generateContent);
                    });
                    it('Matches the baseline file', function () {
                        var comparison = compareToBaseline(actual, relativeFilename, opts);
                        writeComparison(comparison.expected, comparison.actual, relativeFilename, actualFilename, descriptionForDescribe);
                    });
                });
            }
        }
        Baseline.runBaseline = runBaseline;
    })(Baseline = Harness.Baseline || (Harness.Baseline = {}));
    var currentRun = new Run();
    global.describe = describe;
    global.run = run;
    global.it = it;
    global.assert = Harness.Assert;
})(Harness || (Harness = {}));
