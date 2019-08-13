namespace evaluator {
    declare var Symbol: SymbolConstructor;

    const sourceFile = vpath.combine(vfs.srcFolder, "source.ts");

    function compile(sourceText: string, options?: ts.CompilerOptions) {
        const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false);
        fs.writeFileSync(sourceFile, sourceText);
        const compilerOptions: ts.CompilerOptions = {
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS,
            lib: ["lib.esnext.d.ts", "lib.dom.d.ts"],
            ...options
        };
        const host = new fakes.CompilerHost(fs, compilerOptions);
        return compiler.compileFiles(host, [sourceFile], compilerOptions);
    }

    function noRequire(id: string) {
        throw new Error(`Module '${id}' could not be found.`);
    }

    // Define a custom "Symbol" constructor to attach missing built-in symbols without
    // modifying the global "Symbol" constructor
    // tslint:disable-next-line:variable-name
    const FakeSymbol: SymbolConstructor = ((description?: string) => Symbol(description)) as any;
    (<any>FakeSymbol).prototype = Symbol.prototype;
    for (const key of Object.getOwnPropertyNames(Symbol)) {
        Object.defineProperty(FakeSymbol, key, Object.getOwnPropertyDescriptor(Symbol, key)!);
    }

    // Add "asyncIterator" if missing
    if (!ts.hasProperty(FakeSymbol, "asyncIterator")) Object.defineProperty(FakeSymbol, "asyncIterator", { value: Symbol.for("Symbol.asyncIterator"), configurable: true });

    function evaluate(result: compiler.CompilationResult, globals?: Record<string, any>) {
        globals = { Symbol: FakeSymbol, ...globals };

        if (ts.some(result.diagnostics)) {
            assert.ok(/*value*/ false, "Syntax error in evaluation source text:\n" + ts.formatDiagnostics(result.diagnostics, {
                getCanonicalFileName: file => file,
                getCurrentDirectory: () => "",
                getNewLine: () => "\n"
            }));
        }

        const output = result.getOutput(sourceFile, "js")!;
        assert.isDefined(output);

        const globalNames: string[] = [];
        const globalArgs: any[] = [];
        for (const name in globals) {
            if (ts.hasProperty(globals, name)) {
                globalNames.push(name);
                globalArgs.push(globals[name]);
            }
        }

        const evaluateText = `(function (module, exports, require, __dirname, __filename, ${globalNames.join(", ")}) { ${output.text} })`;
        // tslint:disable-next-line:no-eval
        const evaluateThunk = eval(evaluateText) as (module: any, exports: any, require: (id: string) => any, dirname: string, filename: string, ...globalArgs: any[]) => void;
        const module: { exports: any; } = { exports: {} };
        evaluateThunk.call(globals, module, module.exports, noRequire, vpath.dirname(output.file), output.file, FakeSymbol, ...globalArgs);
        return module.exports;
    }

    export function evaluateTypeScript(sourceText: string, options?: ts.CompilerOptions, globals?: Record<string, any>) {
        return evaluate(compile(sourceText, options), globals);
    }
}