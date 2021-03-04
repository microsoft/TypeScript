namespace evaluator {
    declare let Symbol: SymbolConstructor;

    const sourceFile = vpath.combine(vfs.srcFolder, "source.ts");
    const sourceFileJs = vpath.combine(vfs.srcFolder, "source.js");

    // Define a custom "Symbol" constructor to attach missing built-in symbols without
    // modifying the global "Symbol" constructor
    const FakeSymbol: SymbolConstructor = ((description?: string) => Symbol(description)) as any;
    (<any>FakeSymbol).prototype = Symbol.prototype;
    for (const key of Object.getOwnPropertyNames(Symbol)) {
        Object.defineProperty(FakeSymbol, key, Object.getOwnPropertyDescriptor(Symbol, key)!);
    }

    // Add "asyncIterator" if missing
    if (!ts.hasProperty(FakeSymbol, "asyncIterator")) Object.defineProperty(FakeSymbol, "asyncIterator", { value: Symbol.for("Symbol.asyncIterator"), configurable: true });

    export function evaluateTypeScript(source: string | { files: vfs.FileSet, rootFiles: string[], main: string }, options?: ts.CompilerOptions, globals?: Record<string, any>) {
        if (typeof source === "string") source = { files: { [sourceFile]: source }, rootFiles: [sourceFile], main: sourceFile };
        const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, { files: source.files });
        const compilerOptions: ts.CompilerOptions = {
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS,
            lib: ["lib.esnext.d.ts", "lib.dom.d.ts"],
            ...options
        };
        const host = new fakes.CompilerHost(fs, compilerOptions);
        const result = compiler.compileFiles(host, source.rootFiles, compilerOptions);
        if (ts.some(result.diagnostics)) {
            assert.ok(/*value*/ false, "Syntax error in evaluation source text:\n" + ts.formatDiagnostics(result.diagnostics, {
                getCanonicalFileName: file => file,
                getCurrentDirectory: () => "",
                getNewLine: () => "\n"
            }));
        }

        const output = result.getOutput(source.main, "js")!;
        assert.isDefined(output);

        globals = { Symbol: FakeSymbol, ...globals };
        return createLoader(fs, globals)(output.file);
    }

    function createLoader(fs: vfs.FileSystem, globals: Record<string, any>) {
        interface Module {
            exports: any;
        }

        const moduleCache = new ts.Map<string, Module>();
        return load;

        function evaluate(text: string, file: string, module: Module) {
            const globalNames: string[] = [];
            const globalArgs: any[] = [];
            for (const name in globals) {
                if (ts.hasProperty(globals, name)) {
                    globalNames.push(name);
                    globalArgs.push(globals[name]);
                }
            }
            const base = vpath.dirname(file);
            const localRequire = (id: string) => requireModule(id, base);
            const evaluateText = `(function (module, exports, require, __dirname, __filename, ${globalNames.join(", ")}) { ${text} })`;
            // eslint-disable-next-line no-eval
            const evaluateThunk = (void 0, eval)(evaluateText) as (module: any, exports: any, require: (id: string) => any, dirname: string, filename: string, ...globalArgs: any[]) => void;
            evaluateThunk.call(globals, module, module.exports, localRequire, vpath.dirname(file), file, FakeSymbol, ...globalArgs);
        }

        function loadModule(file: string): Module {
            if (!ts.isExternalModuleNameRelative(file)) throw new Error(`Module '${file}' could not be found.`);
            let module = moduleCache.get(file);
            if (module) return module;
            moduleCache.set(file, module = { exports: {} });
            try {
                const sourceText = fs.readFileSync(file, "utf8");
                evaluate(sourceText, file, module);
                return module;
            }
            catch (e) {
                moduleCache.delete(file);
                throw e;
            }
        }

        function isFile(file: string) {
            return fs.existsSync(file) && fs.statSync(file).isFile();
        }

        function loadAsFile(file: string): Module | undefined {
            if (isFile(file)) return loadModule(file);
            if (isFile(file + ".js")) return loadModule(file + ".js");
            return undefined;
        }

        function loadIndex(dir: string): Module | undefined {
            const indexFile = vpath.resolve(dir, "index.js");
            if (isFile(indexFile)) return loadModule(indexFile);
            return undefined;
        }

        function loadAsDirectory(dir: string): Module | undefined {
            const packageFile = vpath.resolve(dir, "package.json");
            if (isFile(packageFile)) {
                const text = fs.readFileSync(packageFile, "utf8");
                const json = JSON.parse(text);
                if (json.main) {
                    const main = vpath.resolve(dir, json.main);
                    const result = loadAsFile(main) || loadIndex(main);
                    if (result === undefined) throw new Error("Module not found");
                }
            }
            return loadIndex(dir);
        }

        function requireModule(id: string, base: string) {
            if (!ts.isExternalModuleNameRelative(id)) throw new Error(`Module '${id}' could not be found.`);
            const file = vpath.resolve(base, id);
            const module = loadAsFile(file) || loadAsDirectory(file);
            if (!module) throw new Error(`Module '${id}' could not be found.`);
            return module.exports;
        }

        function load(file: string) {
            return requireModule(file, fs.cwd());
        }
    }

    export function evaluateJavaScript(sourceText: string, globals?: Record<string, any>, sourceFile = sourceFileJs) {
        globals = { Symbol: FakeSymbol, ...globals };
        const fs = new vfs.FileSystem(/*ignoreCase*/ false, { files: { [sourceFile]: sourceText } });
        return createLoader(fs, globals)(sourceFile);
    }
}
