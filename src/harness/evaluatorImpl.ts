import * as compiler from "./_namespaces/compiler";
import * as fakes from "./_namespaces/fakes";
import * as Harness from "./_namespaces/Harness";
import * as ts from "./_namespaces/ts";
import * as vfs from "./_namespaces/vfs";
import * as vpath from "./_namespaces/vpath";

const sourceFile = vpath.combine(vfs.srcFolder, "source.ts");
const sourceFileJs = vpath.combine(vfs.srcFolder, "source.js");

// Define a custom "Symbol" constructor to attach missing built-in symbols without
// modifying the global "Symbol" constructor
const FakeSymbol: SymbolConstructor = ((description?: string) => Symbol(description)) as any;
(FakeSymbol as any).prototype = Symbol.prototype;
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
    const loader = getLoader(compilerOptions, fs, globals);
    return loader.import(output.file);
}

export function evaluateJavaScript(sourceText: string, globals?: Record<string, any>, sourceFile = sourceFileJs) {
    globals = { Symbol: FakeSymbol, ...globals };
    const fs = new vfs.FileSystem(/*ignoreCase*/ false, { files: { [sourceFile]: sourceText } });
    return new CommonJsLoader(fs, globals).import(sourceFile);
}

function getLoader(compilerOptions: ts.CompilerOptions, fs: vfs.FileSystem, globals: Record<string, any>): Loader<unknown> {
    const moduleKind = ts.getEmitModuleKind(compilerOptions);
    switch (moduleKind) {
        case ts.ModuleKind.UMD:
        case ts.ModuleKind.CommonJS:
            return new CommonJsLoader(fs, globals);
        case ts.ModuleKind.System:
            return new SystemLoader(fs, globals);
        case ts.ModuleKind.AMD:
        case ts.ModuleKind.None:
        default:
            throw new Error(`ModuleKind '${ts.ModuleKind[moduleKind]}' not supported by evaluator.`);
    }
}

abstract class Loader<TModule> {
    protected readonly fs: vfs.FileSystem;
    protected readonly globals: Record<string, any>;

    private moduleCache = new Map<string, TModule>();

    constructor(fs: vfs.FileSystem, globals: Record<string, any>) {
        this.fs = fs;
        this.globals = globals;
    }

    protected isFile(file: string) {
        return this.fs.existsSync(file) && this.fs.statSync(file).isFile();
    }

    protected abstract evaluate(text: string, file: string, module: TModule): void;
    protected abstract createModule(file: string): TModule;
    protected abstract getExports(module: TModule): any;

    protected load(file: string): TModule {
        if (!ts.isExternalModuleNameRelative(file)) throw new Error(`Module '${file}' could not be found.`);
        let module = this.moduleCache.get(file);
        if (module) return module;
        this.moduleCache.set(file, module = this.createModule(file));
        try {
            const sourceText = this.fs.readFileSync(file, "utf8");
            this.evaluate(sourceText, file, module);
            return module;
        }
        catch (e) {
            this.moduleCache.delete(file);
            throw e;
        }
    }

    protected resolve(id: string, base: string) {
        return vpath.resolve(base, id);
    }

    import(id: string, base = this.fs.cwd()) {
        if (!ts.isExternalModuleNameRelative(id)) throw new Error(`Module '${id}' could not be found.`);
        const file = this.resolve(id, base);
        const module = this.load(file);
        if (!module) throw new Error(`Module '${id}' could not be found.`);
        return this.getExports(module);
    }
}

interface CommonJSModule {
    exports: any;
}

class CommonJsLoader extends Loader<CommonJSModule> {
    private resolveAsFile(file: string) {
        if (this.isFile(file)) return file;
        if (this.isFile(file + ".js")) return file + ".js";
        return undefined;
    }

    private resolveIndex(dir: string) {
        const indexFile = vpath.resolve(dir, "index.js");
        if (this.isFile(indexFile)) return indexFile;
        return undefined;
    }

    private resolveAsDirectory(dir: string) {
        const packageFile = vpath.resolve(dir, "package.json");
        if (this.isFile(packageFile)) {
            const text = this.fs.readFileSync(packageFile, "utf8");
            const json = JSON.parse(text);
            if (json.main) {
                const main = vpath.resolve(dir, json.main);
                const result = this.resolveAsFile(main) || this.resolveIndex(main);
                if (result === undefined) throw new Error("Module not found");
            }
        }
        return this.resolveIndex(dir);
    }

    protected override resolve(id: string, base: string) {
        const file = vpath.resolve(base, id);
        const resolved = this.resolveAsFile(file) || this.resolveAsDirectory(file);
        if (!resolved) throw new Error(`Module '${id}' could not be found.`);
        return resolved;
    }

    protected createModule(): CommonJSModule {
        return { exports: {} };
    }

    protected getExports(module: CommonJSModule) {
        return module.exports;
    }

    protected evaluate(text: string, file: string, module: CommonJSModule): void {
        const globalNames: string[] = [];
        const globalArgs: any[] = [];
        for (const name in this.globals) {
            if (ts.hasProperty(this.globals, name)) {
                globalNames.push(name);
                globalArgs.push(this.globals[name]);
            }
        }
        const base = vpath.dirname(file);
        const localRequire = (id: string) => this.import(id, base);
        const evaluateText = `(function (module, exports, require, __dirname, __filename, ${globalNames.join(", ")}) { ${text} })`;
        // eslint-disable-next-line no-eval
        const evaluateThunk = (void 0, eval)(evaluateText) as (module: any, exports: any, require: (id: string) => any, dirname: string, filename: string, ...globalArgs: any[]) => void;
        evaluateThunk.call(this.globals, module, module.exports, localRequire, vpath.dirname(file), file, ...globalArgs);
    }
}

interface SystemModule {
    file: string;
    exports: any;
    hasExports: boolean;
    state: SystemModuleState;
    dependencies: SystemModule[];
    dependers: SystemModule[];
    setters: SystemModuleDependencySetter[];
    requestedDependencies?: string[];
    declaration?: SystemModuleDeclaration;
    hasError?: boolean;
    error?: any;
}

const enum SystemModuleState {
    // Instantiation phases:
    Uninstantiated,
    Instantiated,

    // Linker phases:
    AddingDependencies,
    AllDependenciesAdded,
    AllDependenciesInstantiated,
    WiringSetters,
    Linked,

    // Evaluation phases:
    Evaluating,
    Ready,
}

interface SystemModuleExporter {
    <T>(name: string, value: T): T;
    <T extends object>(values: T): T;
}

interface SystemModuleContext {
    import: (id: string) => Promise<any>;
    meta: any;
}

type SystemModuleRegisterCallback = (exporter: SystemModuleExporter, context: SystemModuleContext) => SystemModuleDeclaration;
type SystemModuleDependencySetter = (dependency: any) => void;

interface SystemModuleDeclaration {
    setters: SystemModuleDependencySetter[];
    execute: () => void;
}

interface SystemGlobal {
    register(dependencies: string[], declare: SystemModuleRegisterCallback): void;
}

class SystemLoader extends Loader<SystemModule> {
    protected createModule(file: string): SystemModule {
        return {
            file,
            // eslint-disable-next-line no-null/no-null
            exports: Object.create(/*o*/ null),
            dependencies: [],
            dependers: [],
            setters: [],
            hasExports: false,
            state: SystemModuleState.Uninstantiated
        };
    }

    protected getExports(module: SystemModule) {
        if (module.state < SystemModuleState.Ready) {
            this.resetDependers(module, []);
            this.evaluateModule(module, []);
            if (module.state < SystemModuleState.Ready) {
                const error = new Error("Module graph could not be loaded");
                this.handleError(module, error);
                throw error;
            }
        }
        if (module.hasError) {
            throw module.error;
        }
        return module.exports;
    }

    private handleError(module: SystemModule, error: any) {
        if (!module.hasError) {
            module.hasError = true;
            module.error = error;
            module.state = SystemModuleState.Ready;
        }
    }

    protected evaluate(text: string, _file: string, module: SystemModule): void {
        const globalNames: string[] = [];
        const globalArgs: any[] = [];
        for (const name in this.globals) {
            if (ts.hasProperty(this.globals, name)) {
                globalNames.push(name);
                globalArgs.push(this.globals[name]);
            }
        }
        const localSystem: SystemGlobal = {
            register: (dependencies, declare) => this.instantiateModule(module, dependencies, declare)
        };
        const evaluateText = `(function (System, ${globalNames.join(", ")}) { ${text} })`;
        try {
            // eslint-disable-next-line no-eval
            const evaluateThunk = (void 0, eval)(evaluateText) as (System: any, ...globalArgs: any[]) => void;
            evaluateThunk.call(this.globals, localSystem, ...globalArgs);
        }
        catch (e) {
            this.handleError(module, e);
            throw e;
        }
    }

    private instantiateModule(module: SystemModule, dependencies: string[], registration?: SystemModuleRegisterCallback) {
        function exporter<T>(name: string, value: T): T;
        function exporter<T>(value: T): T;
        function exporter<T>(...args: [string, T] | [T]) {
            module.hasExports = true;
            const name = args.length === 1 ? undefined : args[0];
            const value = args.length === 1 ? args[0] : args[1];
            if (name !== undefined) {
                module.exports[name] = value;
            }
            else {
                for (const name in value) {
                    module.exports[name] = value[name];
                }
            }
            for (const setter of module.setters) {
                setter(module.exports);
            }
            return value;
        }

        const context: SystemModuleContext = {
            import: (_id) => { throw new Error("Dynamic import not implemented."); },
            meta: {
                url: ts.isUrl(module.file) ? module.file : `file:///${ts.normalizeSlashes(module.file).replace(/^\//, "").split("/").map(encodeURIComponent).join("/")}`
            }
        };

        module.requestedDependencies = dependencies;

        try {
            module.declaration = registration?.(exporter, context);
            module.state = SystemModuleState.Instantiated;

            for (const depender of module.dependers) {
                this.linkModule(depender);
            }

            this.linkModule(module);
        }
        catch (e) {
            this.handleError(module, e);
            throw e;
        }
    }

    private linkModule(module: SystemModule) {
        try {
            for (;;) {
                switch (module.state) {
                    case SystemModuleState.Uninstantiated: {
                        throw new Error("Module not yet instantiated");
                    }
                    case SystemModuleState.Instantiated: {
                        // Module has been instantiated, start requesting dependencies.
                        // Set state so that re-entry while adding dependencies does nothing.
                        module.state = SystemModuleState.AddingDependencies;
                        const base = vpath.dirname(module.file);
                        const dependencies = module.requestedDependencies || [];

                        for (const dependencyId of dependencies) {
                            const dependency = this.load(this.resolve(dependencyId, base));
                            module.dependencies.push(dependency);
                            dependency.dependers.push(module);
                        }

                        // All dependencies have been added, switch state
                        // to check whether all dependencies are instantiated
                        module.state = SystemModuleState.AllDependenciesAdded;
                        continue;
                    }
                    case SystemModuleState.AddingDependencies: {
                        // in the middle of adding dependencies for this module, do nothing
                        return;
                    }
                    case SystemModuleState.AllDependenciesAdded: {
                        // all dependencies have been added, advance state if all dependencies are instantiated.
                        for (const dependency of module.dependencies) {
                            if (dependency.state === SystemModuleState.Uninstantiated) {
                                return;
                            }
                        }

                        // indicate all dependencies are instantiated for this module.
                        module.state = SystemModuleState.AllDependenciesInstantiated;

                        // trigger links for dependers of this module.
                        for (const depender of module.dependers) {
                            this.linkModule(depender);
                        }
                        continue;
                    }
                    case SystemModuleState.AllDependenciesInstantiated: {
                        // all dependencies have been instantiated, start wiring setters
                        module.state = SystemModuleState.WiringSetters;
                        for (let i = 0; i < module.dependencies.length; i++) {
                            const dependency = module.dependencies[i];
                            const setter = module.declaration?.setters[i];
                            if (setter) {
                                dependency.setters.push(setter);
                                if (dependency.hasExports || dependency.state === SystemModuleState.Ready) {
                                    // wire hoisted exports or ready dependencies.
                                    setter(dependency.exports);
                                }
                            }
                        }

                        module.state = SystemModuleState.Linked;

                        // ensure graph is fully linked
                        for (const depender of module.dependers) {
                            this.linkModule(depender);
                        }
                        continue;
                    }

                    case SystemModuleState.WiringSetters: // in the middle of wiring setters for this module, nothing to do
                    case SystemModuleState.Linked: // module has already been linked, nothing to do
                    case SystemModuleState.Evaluating: // module is currently evaluating, nothing to do
                    case SystemModuleState.Ready: // module is done evaluating, nothing to do
                        return;
                }
            }
        }
        catch (e) {
            this.handleError(module, e);
            throw e;
        }
    }

    private resetDependers(module: SystemModule, stack: SystemModule[]) {
        if (stack.lastIndexOf(module) !== -1) {
            return;
        }

        stack.push(module);
        module.dependers.length = 0;
        for (const dependency of module.dependencies) {
            this.resetDependers(dependency, stack);
        }
        stack.pop();
    }

    private evaluateModule(module: SystemModule, stack: SystemModule[]) {
        if (module.state < SystemModuleState.Linked) throw new Error("Invalid state for evaluation.");
        if (module.state !== SystemModuleState.Linked) return;

        if (stack.lastIndexOf(module) !== -1) {
            // we are already evaluating this module
            return;
        }

        stack.push(module);
        module.state = SystemModuleState.Evaluating;
        try {
            for (const dependency of module.dependencies) {
                this.evaluateModule(dependency, stack);
            }
            module.declaration?.execute?.();
            module.state = SystemModuleState.Ready;
        }
        catch (e) {
            this.handleError(module, e);
            throw e;
        }
    }
}
