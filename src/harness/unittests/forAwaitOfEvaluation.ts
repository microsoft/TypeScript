/// <reference path="..\harness.ts" />

namespace ts {
    declare var Symbol: SymbolConstructor;

    describe("forAwaitOfEvaluation", () => {
        const sourceFile = vpath.combine(vfs.srcFolder, "source.ts");

        function compile(sourceText: string, options?: CompilerOptions) {
            const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false);
            fs.writeFileSync(sourceFile, sourceText);
            const compilerOptions: CompilerOptions = { target: ScriptTarget.ES5, module: ModuleKind.CommonJS, lib: ["lib.esnext.d.ts"], ...options };
            const host = new fakes.CompilerHost(fs, compilerOptions);
            return compiler.compileFiles(host, [sourceFile], compilerOptions);
        }

        function noRequire(id: string) {
            throw new Error(`Module '${id}' could not be found.`);
        }

        // tslint:disable-next-line:variable-name
        const FakeSymbol: SymbolConstructor = ((description?: string) => Symbol(description)) as any;
        (<any>FakeSymbol).prototype = Symbol.prototype;
        for (const key of Object.getOwnPropertyNames(Symbol)) {
            Object.defineProperty(FakeSymbol, key, Object.getOwnPropertyDescriptor(Symbol, key)!);
        }
        (<any>FakeSymbol).asyncIterator = (<any>FakeSymbol).asyncIterator || Symbol.for("Symbol.asyncIterator");

        function evaluate(result: compiler.CompilationResult) {
            const output = result.getOutput(sourceFile, "js")!;
            assert.isDefined(output);

            const evaluateText = `(function (module, exports, require, __dirname, __filename, Symbol) { ${output.text} })`;
            const evaluateThunk = eval(evaluateText) as (module: any, exports: any, require: (id: string) => any, dirname: string, filename: string, symbolConstructor: SymbolConstructor) => void;
            const module: { exports: any; } = { exports: {} };
            evaluateThunk(module, module.exports, noRequire, vpath.dirname(output.file), output.file, FakeSymbol);
            return module;
        }

        it("sync (es5)", async () => {
            const module = evaluate(compile(`
            let i = 0;
            const iterator = {
                [Symbol.iterator]() { return this; },
                next() {
                    switch (i++) {
                        case 0: return { value: 1, done: false };
                        case 1: return { value: Promise.resolve(2), done: false };
                        case 2: return { value: new Promise<number>(resolve => setTimeout(resolve, 100, 3)), done: false };
                        default: return { value: undefined: done: true };
                    }
                }
            };
            export const output: any[] = [];
            export async function main() {
                for await (const item of iterator) {
                    output.push(item);
                }
            }`));
            await module.exports.main();
            assert.strictEqual(module.exports.output[0], 1);
            assert.strictEqual(module.exports.output[1], 2);
            assert.strictEqual(module.exports.output[2], 3);
        });

        it("sync (es2015)", async () => {
            const module = evaluate(compile(`
            let i = 0;
            const iterator = {
                [Symbol.iterator]() { return this; },
                next() {
                    switch (i++) {
                        case 0: return { value: 1, done: false };
                        case 1: return { value: Promise.resolve(2), done: false };
                        case 2: return { value: new Promise<number>(resolve => setTimeout(resolve, 100, 3)), done: false };
                        default: return { value: undefined: done: true };
                    }
                }
            };
            export const output: any[] = [];
            export async function main() {
                for await (const item of iterator) {
                    output.push(item);
                }
            }`, { target: ScriptTarget.ES2015 }));
            await module.exports.main();
            assert.strictEqual(module.exports.output[0], 1);
            assert.strictEqual(module.exports.output[1], 2);
            assert.strictEqual(module.exports.output[2], 3);
        });

        it("async (es5)", async () => {
            const module = evaluate(compile(`
            let i = 0;
            const iterator = {
                [Symbol.asyncIterator]() { return this; },
                async next() {
                    switch (i++) {
                        case 0: return { value: 1, done: false };
                        case 1: return { value: Promise.resolve(2), done: false };
                        case 2: return { value: new Promise<number>(resolve => setTimeout(resolve, 100, 3)), done: false };
                        default: return { value: undefined: done: true };
                    }
                }
            };
            export const output: any[] = [];
            export async function main() {
                for await (const item of iterator) {
                    output.push(item);
                }
            }`));
            await module.exports.main();
            assert.strictEqual(module.exports.output[0], 1);
            assert.instanceOf(module.exports.output[1], Promise);
            assert.instanceOf(module.exports.output[2], Promise);
        });

        it("async (es2015)", async () => {
            const module = evaluate(compile(`
            let i = 0;
            const iterator = {
                [Symbol.asyncIterator]() { return this; },
                async next() {
                    switch (i++) {
                        case 0: return { value: 1, done: false };
                        case 1: return { value: Promise.resolve(2), done: false };
                        case 2: return { value: new Promise<number>(resolve => setTimeout(resolve, 100, 3)), done: false };
                        default: return { value: undefined: done: true };
                    }
                }
            };
            export const output: any[] = [];
            export async function main() {
                for await (const item of iterator) {
                    output.push(item);
                }
            }`, { target: ScriptTarget.ES2015 }));
            await module.exports.main();
            assert.strictEqual(module.exports.output[0], 1);
            assert.instanceOf(module.exports.output[1], Promise);
            assert.instanceOf(module.exports.output[2], Promise);
        });
    });
}