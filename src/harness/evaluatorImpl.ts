import { combine, dirname } from "./vpath";
import { srcFolder, createFromFileSystem } from "./vfs";
import { CompilerOptions, ScriptTarget, ModuleKind, hasProperty, some, formatDiagnostics } from "./ts";
import { IO } from "./Harness";
import { CompilerHost } from "./fakes";
import { compileFiles } from "./compiler";
declare let Symbol: SymbolConstructor;
const sourceFile = combine(srcFolder, "source.ts");
const sourceFileJs = combine(srcFolder, "source.js");
function compile(sourceText: string, options?: CompilerOptions) {
    const fs = createFromFileSystem(IO, /*ignoreCase*/ false);
    fs.writeFileSync(sourceFile, sourceText);
    const compilerOptions: CompilerOptions = {
        target: ScriptTarget.ES5,
        module: ModuleKind.CommonJS,
        lib: ["lib.esnext.d.ts", "lib.dom.d.ts"],
        ...options
    };
    const host = new CompilerHost(fs, compilerOptions);
    return compileFiles(host, [sourceFile], compilerOptions);
}
function noRequire(id: string) {
    throw new Error(`Module '${id}' could not be found.`);
}
// Define a custom "Symbol" constructor to attach missing built-in symbols without
// modifying the global "Symbol" constructor
const FakeSymbol: SymbolConstructor = ((description?: string) => Symbol(description)) as any;
(<any>FakeSymbol).prototype = Symbol.prototype;
for (const key of Object.getOwnPropertyNames(Symbol)) {
    Object.defineProperty(FakeSymbol, key, Object.getOwnPropertyDescriptor(Symbol, key)!);
}
// Add "asyncIterator" if missing
if (!hasProperty(FakeSymbol, "asyncIterator"))
    Object.defineProperty(FakeSymbol, "asyncIterator", { value: Symbol.for("Symbol.asyncIterator"), configurable: true });
export function evaluateTypeScript(sourceText: string, options?: CompilerOptions, globals?: Record<string, any>) {
    const result = compile(sourceText, options);
    if (some(result.diagnostics)) {
        assert.ok(/*value*/ false, "Syntax error in evaluation source text:\n" + formatDiagnostics(result.diagnostics, {
            getCanonicalFileName: file => file,
            getCurrentDirectory: () => "",
            getNewLine: () => "\n"
        }));
    }
    const output = result.getOutput(sourceFile, "js")!;
    assert.isDefined(output);
    return evaluateJavaScript(output.text, globals, output.file);
}
export function evaluateJavaScript(sourceText: string, globals?: Record<string, any>, sourceFile = sourceFileJs) {
    globals = { Symbol: FakeSymbol, ...globals };
    const globalNames: string[] = [];
    const globalArgs: any[] = [];
    for (const name in globals) {
        if (hasProperty(globals, name)) {
            globalNames.push(name);
            globalArgs.push(globals[name]);
        }
    }
    const evaluateText = `(function (module, exports, require, __dirname, __filename, ${globalNames.join(", ")}) { ${sourceText} })`;
    // eslint-disable-next-line no-eval
    const evaluateThunk = (void 0, eval)(evaluateText) as (module: any, exports: any, require: (id: string) => any, dirname: string, filename: string, ...globalArgs: any[]) => void;
    const module: {
        exports: any;
    } = { exports: {} };
    evaluateThunk.call(globals, module, module.exports, noRequire, dirname(sourceFile), sourceFile, FakeSymbol, ...globalArgs);
    return module.exports;
}
