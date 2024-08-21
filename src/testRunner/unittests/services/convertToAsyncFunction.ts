import * as Harness from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import {
    File,
    libFile as vfsWatch_LibFile,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";
import {
    extractTest,
    newLineCharacter,
    notImplementedHost,
    TestProjectService,
} from "./extract/helpers.js";

const libFile: File = {
    path: vfsWatch_LibFile.path,
    content: `/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
declare function fetch(input?, init?): Promise<Response>;
interface Response extends Body {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly trailer: Promise<Headers>;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}
interface Body {
    readonly body: ReadableStream | null;
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}
declare type PromiseConstructorLike = new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) => PromiseLike<T>;
interface PromiseLike<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseLike<TResult1 | TResult2>;
}
interface Promise<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>
}
interface PromiseConstructor {
    /**
     * A reference to the prototype.
     */
    readonly prototype: Promise<any>;

    /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<[T1, T2, T3, T4, T5, T6]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>]): Promise<[T1, T2, T3, T4, T5]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>]): Promise<[T1, T2, T3, T4]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[T1, T2, T3]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[T1, T2]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T>(values: (T | PromiseLike<T>)[]): Promise<T[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<T1 | T2 | T3 | T4 | T5 | T6>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<T1 | T2 | T3 | T4 | T5>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<T1 | T2 | T3 | T4>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<T1 | T2 | T3>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<T1 | T2>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T>(values: (T | PromiseLike<T>)[]): Promise<T>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject<T = never>(reason?: any): Promise<T>;

    /**
     * Creates a new resolved promise for the provided value.
     * @param value A promise.
     * @returns A promise whose internal state matches the provided promise.
     */
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;

    /**
     * Creates a new resolved promise .
     * @returns A resolved promise.
     */
    resolve(): Promise<void>;
}

declare var Promise: PromiseConstructor;
interface RegExp {}
interface String { charAt: any; }
interface Array<T> {}`,
};

const moduleFile: File = {
    path: "/home/src/workspaces/project/module.ts",
    content: `export function fn(res: any): any {
    return res;
}`,
};

type WithSkipAndOnly<T extends any[]> = ((...args: T) => void) & {
    skip: (...args: T) => void;
    only: (...args: T) => void;
};

function createTestWrapper<T extends any[]>(fn: (it: Mocha.PendingTestFunction, ...args: T) => void): WithSkipAndOnly<T> {
    wrapped.skip = (...args: T) => fn(it.skip, ...args);
    wrapped.only = (...args: T) => fn(it.only, ...args);
    return wrapped;
    function wrapped(...args: T) {
        return fn(it, ...args);
    }
}

const enum ConvertToAsyncTestFlags {
    None,
    IncludeLib = 1 << 0,
    IncludeModule = 1 << 1,
    ExpectSuggestionDiagnostic = 1 << 2,
    ExpectNoSuggestionDiagnostic = 1 << 3,
    ExpectAction = 1 << 4,
    ExpectNoAction = 1 << 5,

    ExpectSuccess = ExpectSuggestionDiagnostic | ExpectAction,
    ExpectFailed = ExpectNoSuggestionDiagnostic | ExpectNoAction,
}

function testConvertToAsyncFunction(it: Mocha.PendingTestFunction, caption: string, text: string, baselineFolder: string, flags: ConvertToAsyncTestFlags) {
    const includeLib = !!(flags & ConvertToAsyncTestFlags.IncludeLib);
    const includeModule = !!(flags & ConvertToAsyncTestFlags.IncludeModule);
    const expectSuggestionDiagnostic = !!(flags & ConvertToAsyncTestFlags.ExpectSuggestionDiagnostic);
    const expectNoSuggestionDiagnostic = !!(flags & ConvertToAsyncTestFlags.ExpectNoSuggestionDiagnostic);
    const expectAction = !!(flags & ConvertToAsyncTestFlags.ExpectAction);
    const expectNoAction = !!(flags & ConvertToAsyncTestFlags.ExpectNoAction);
    const expectFailure = expectNoSuggestionDiagnostic || expectNoAction;
    ts.Debug.assert(!(expectSuggestionDiagnostic && expectNoSuggestionDiagnostic), "Cannot combine both 'ExpectSuggestionDiagnostic' and 'ExpectNoSuggestionDiagnostic'");
    ts.Debug.assert(!(expectAction && expectNoAction), "Cannot combine both 'ExpectAction' and 'ExpectNoAction'");

    const t = extractTest(text);
    const selectionRange = t.ranges.get("selection")!;
    if (!selectionRange) {
        throw new Error(`Test ${caption} does not specify selection range`);
    }

    const extensions = expectFailure ? [ts.Extension.Ts] : [ts.Extension.Ts, ts.Extension.Js];

    extensions.forEach(extension => it(`${caption} [${extension}]`, () => runBaseline(extension)));

    function runBaseline(extension: ts.Extension) {
        const path = "/home/src/workspaces/project/a" + extension;
        const languageService = makeLanguageService({ path, content: t.source }, includeLib, includeModule);
        const program = languageService.getProgram()!;

        if (hasSyntacticDiagnostics(program)) {
            // Don't bother generating JS baselines for inputs that aren't valid JS.
            assert.equal(ts.Extension.Js, extension, "Syntactic diagnostics found in non-JS file");
            return;
        }

        const f = {
            path,
            content: t.source,
        };

        const sourceFile = program.getSourceFile(path)!;
        const context: ts.CodeFixContext = {
            errorCode: 80006,
            span: { start: selectionRange.pos, length: selectionRange.end - selectionRange.pos },
            sourceFile,
            program,
            cancellationToken: { throwIfCancellationRequested: ts.noop, isCancellationRequested: ts.returnFalse },
            preferences: ts.emptyOptions,
            host: notImplementedHost,
            formatContext: ts.formatting.getFormatContext(ts.testFormatSettings, notImplementedHost),
        };

        const diagnostics = languageService.getSuggestionDiagnostics(f.path);
        const diagnostic = ts.find(diagnostics, diagnostic =>
            diagnostic.messageText === ts.Diagnostics.This_may_be_converted_to_an_async_function.message &&
            diagnostic.start === context.span.start && diagnostic.length === context.span.length);
        const actions = ts.codefix.getFixes(context);
        const action = ts.find(actions, action => action.description === ts.Diagnostics.Convert_to_async_function.message);

        let outputText: string | null; // eslint-disable-line no-restricted-syntax
        if (action?.changes.length) {
            const data: string[] = [];
            data.push(`// ==ORIGINAL==`);
            data.push(text.replace("[#|", "/*[#|*/").replace("|]", "/*|]*/"));
            const changes = action.changes;
            assert.lengthOf(changes, 1);

            data.push(`// ==ASYNC FUNCTION::${action.description}==`);
            const newText = ts.textChanges.applyChanges(sourceFile.text, changes[0].textChanges);
            data.push(newText);

            const diagProgram = makeLanguageService({ path, content: newText }, includeLib, includeModule).getProgram()!;
            assert.isFalse(hasSyntacticDiagnostics(diagProgram));
            outputText = data.join(newLineCharacter);
        }
        else {
            // eslint-disable-next-line no-restricted-syntax
            outputText = null;
        }

        Harness.Baseline.runBaseline(`${baselineFolder}/${caption}${extension}`, outputText);

        if (expectNoSuggestionDiagnostic) {
            assert.isUndefined(diagnostic, "Expected code fix to not provide a suggestion diagnostic");
        }
        else if (expectSuggestionDiagnostic) {
            assert.exists(diagnostic, "Expected code fix to provide a suggestion diagnostic");
        }

        if (expectNoAction) {
            assert.isNotTrue(!!action?.changes.length, "Expected code fix to not provide an action");
            assert.isNotTrue(typeof outputText === "string", "Expected code fix to not apply changes");
        }
        else if (expectAction) {
            assert.isTrue(!!action?.changes.length, "Expected code fix to provide an action");
            assert.isTrue(typeof outputText === "string", "Expected code fix to apply changes");
        }
    }

    function makeLanguageService(file: File, includeLib?: boolean, includeModule?: boolean) {
        const files = [file];
        if (includeLib) {
            files.push(libFile); // libFile is expensive to parse repeatedly - only test when required
        }
        if (includeModule) {
            files.push(moduleFile);
        }
        const host = TestServerHost.createServerHost(files);
        const projectService = new TestProjectService(host);
        projectService.openClientFile(file.path);
        return ts.first(projectService.inferredProjects).getLanguageService();
    }

    function hasSyntacticDiagnostics(program: ts.Program) {
        const diags = program.getSyntacticDiagnostics();
        return ts.length(diags) > 0;
    }
}

const _testConvertToAsyncFunction = createTestWrapper((it, caption: string, text: string) => {
    testConvertToAsyncFunction(it, caption, text, "convertToAsyncFunction", ConvertToAsyncTestFlags.IncludeLib | ConvertToAsyncTestFlags.ExpectSuccess);
});

const _testConvertToAsyncFunctionFailed = createTestWrapper((it, caption: string, text: string) => {
    testConvertToAsyncFunction(it, caption, text, "convertToAsyncFunction", ConvertToAsyncTestFlags.IncludeLib | ConvertToAsyncTestFlags.ExpectFailed);
});

const _testConvertToAsyncFunctionFailedSuggestion = createTestWrapper((it, caption: string, text: string) => {
    testConvertToAsyncFunction(it, caption, text, "convertToAsyncFunction", ConvertToAsyncTestFlags.IncludeLib | ConvertToAsyncTestFlags.ExpectNoSuggestionDiagnostic | ConvertToAsyncTestFlags.ExpectAction);
});

const _testConvertToAsyncFunctionFailedAction = createTestWrapper((it, caption: string, text: string) => {
    testConvertToAsyncFunction(it, caption, text, "convertToAsyncFunction", ConvertToAsyncTestFlags.IncludeLib | ConvertToAsyncTestFlags.ExpectSuggestionDiagnostic | ConvertToAsyncTestFlags.ExpectNoAction);
});

const _testConvertToAsyncFunctionWithModule = createTestWrapper((it, caption: string, text: string) => {
    testConvertToAsyncFunction(it, caption, text, "convertToAsyncFunction", ConvertToAsyncTestFlags.IncludeLib | ConvertToAsyncTestFlags.IncludeModule | ConvertToAsyncTestFlags.ExpectSuccess);
});

describe("unittests:: services:: convertToAsyncFunction::", () => {
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_basic",
        `
function [#|f|](): Promise<void>{
    return fetch('https://typescriptlang.org').then(result => { console.log(result) });
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_arrayBindingPattern",
        `
function [#|f|](): Promise<void>{
    return fetch('https://typescriptlang.org').then(([result]) => { console.log(result) });
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_objectBindingPattern",
        `
function [#|f|](): Promise<void>{
    return fetch('https://typescriptlang.org').then(({ result }) => { console.log(result) });
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_arrayBindingPatternRename",
        `
function [#|f|](): Promise<void>{
    const result = getResult();
    return fetch('https://typescriptlang.org').then(([result]) => { console.log(result) });
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_objectBindingPatternRename",
        `
function [#|f|](): Promise<void>{
    const result = getResult();
    return fetch('https://typescriptlang.org').then(({ result }) => { console.log(result) });
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_basicNoReturnTypeAnnotation",
        `
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(result => { console.log(result) });
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_basicWithComments",
        `
function [#|f|](): Promise<void>{
    /* Note - some of these comments are removed during the refactor. This is not ideal. */

    // a
    /*b*/ return /*c*/ fetch( /*d*/ 'https://typescriptlang.org' /*e*/).then( /*f*/ result /*g*/ => { /*h*/ console.log(/*i*/ result /*j*/) /*k*/}/*l*/);
    // m
}`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_ArrowFunction",
        `
[#|():Promise<void> => {|]
    return fetch('https://typescriptlang.org').then(result => console.log(result));
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_ArrowFunctionNoAnnotation",
        `
[#|() => {|]
    return fetch('https://typescriptlang.org').then(result => console.log(result));
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_Catch",
        `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => { console.log(result); }).catch(err => { console.log(err); });
}`,
    );
    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_CatchAndRej",
        `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => { console.log(result); }, rejection => { console.log("rejected:", rejection); }).catch(err => { console.log(err) });
}`,
    );
    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_CatchAndRejRef",
        `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res, rej).catch(catch_err)
}
function res(result){
    console.log(result);
}
function rej(rejection){
    return rejection.ok;
}
function catch_err(err){
    console.log(err);
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_CatchRef",
        `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res).catch(catch_err)
}
function res(result){
    console.log(result);
}
function catch_err(err){
    console.log(err);
}
`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_CatchNoBrackets",
        `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => console.log(result)).catch(err => console.log(err));
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_IgnoreArgs1",
        `
function [#|f|](): Promise<void> {
    return fetch('https://typescriptlang.org').then( _ => { console.log("done"); });
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_IgnoreArgs2",
        `
function [#|f|](): Promise<void> {
    return fetch('https://typescriptlang.org').then( () => console.log("done") );
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_IgnoreArgs3",
        `
function [#|f|](): Promise<void> {
    return fetch('https://typescriptlang.org').then( () => console.log("almost done") ).then( () => console.log("done") );
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_IgnoreArgs4",
        `
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(res);
}
function res(){
    console.log("done");
}`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_Method",
        `
class Parser {
    [#|f|]():Promise<void> {
        return fetch('https://typescriptlang.org').then(result => console.log(result));
    }
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_MultipleCatches",
        `
function [#|f|](): Promise<void> {
    return fetch('https://typescriptlang.org').then(res => console.log(res)).catch(err => console.log("err", err)).catch(err2 => console.log("err2", err2));
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_MultipleThens",
        `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res).then(res2);
}
function res(result){
    return result.ok;
}
function res2(result2){
    console.log(result2);
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_MultipleThensSameVarName",
        `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res).then(res2);
}
function res(result){
    return result.ok;
}
function res2(result){
    return result.bodyUsed;
}
`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_NoRes",
        `
function [#|f|]():Promise<void | Response> {
    return fetch('https://typescriptlang.org').then(null, rejection => console.log("rejected:", rejection));
}
`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_NoRes2",
        `
function [#|f|]():Promise<void | Response> {
    return fetch('https://typescriptlang.org').then(undefined).catch(rej => console.log(rej));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_NoRes3",
        `
function [#|f|]():Promise<void | Response> {
    return fetch('https://typescriptlang.org').catch(rej => console.log(rej));
}
`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_NoRes4",
        `
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(undefined, rejection => console.log("rejected:", rejection));
}
`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_NoCatchHandler",
        `
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(x => x.statusText).catch(undefined);
}
`,
    );
    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_NoSuggestion",
        `
function [#|f|]():Promise<Response> {
    return fetch('https://typescriptlang.org');
}
`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_PromiseDotAll",
        `
function [#|f|]():Promise<void>{
    return Promise.all([fetch('https://typescriptlang.org'), fetch('https://microsoft.com'), fetch('https://youtube.com')]).then(function(vals){
        vals.forEach(console.log);
    });
}
`,
    );
    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_NoSuggestionNoPromise",
        `
function [#|f|]():void{
}
`,
    );
    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_Rej",
        `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => { console.log(result); }, rejection => { console.log("rejected:", rejection); });
}
`,
    );
    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_RejRef",
        `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res, rej);
}
function res(result){
    console.log(result);
}
function rej(err){
    console.log(err);
}
`,
    );
    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_RejNoBrackets",
        `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => console.log(result), rejection => console.log("rejected:", rejection));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_ResRef",
        `
function [#|f|]():Promise<boolean> {
    return fetch('https://typescriptlang.org').then(res);
}
function res(result){
    return result.ok;
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_ResRef1",
        `
class Foo {
    public [#|method|](): Promise<boolean> {
        return fetch('a').then(this.foo);
    }

    private foo(res) {
        return res.ok;
    }
}
        `,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_ResRef2",
        `
class Foo {
    public [#|method|](): Promise<Response> {
        return fetch('a').then(this.foo);
    }

    private foo = res => res;
}
        `,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_ResRef3",
        `
const res = (result) => {
    return result.ok;
}
function [#|f|](): Promise<boolean> {
    return fetch('https://typescriptlang.org').then(res);
}
        `,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_NoSuggestionResRef1",
        `
const res = 1;
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(res);
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_NoSuggestionResRef2",
        `
class Foo {
    private foo = 1;
    public [#|method|](): Promise<boolean> {
        return fetch('a').then(this.foo);
    }
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_NoSuggestionResRef3",
        `
const res = undefined;
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(res);
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_NoSuggestionResRef4",
        `
class Foo {
    private foo = undefined;
    public [#|method|](): Promise<boolean> {
        return fetch('a').then(this.foo);
    }
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_ResRefNoReturnVal",
        `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res);
}
function res(result){
    console.log(result);
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_ResRefNoReturnVal1",
        `
class Foo {
    public [#|method|](): Promise<void> {
        return fetch('a').then(this.foo);
    }

    private foo(res) {
        console.log(res);
    }
}
        `,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_NoBrackets",
        `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => console.log(result));
}
`,
    );
    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_Finally1",
        `
function [#|finallyTest|](): Promise<void> {
    return fetch("https://typescriptlang.org").then(res => console.log(res)).catch(rej => console.log("error", rej)).finally(console.log("finally!"));
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_Finally2",
        `
function [#|finallyTest|](): Promise<void> {
    return fetch("https://typescriptlang.org").then(res => console.log(res)).finally(console.log("finally!"));
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_Finally3",
        `
function [#|finallyTest|](): Promise<void> {
    return fetch("https://typescriptlang.org").finally(console.log("finally!"));
}
`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_InnerPromise",
        `
function [#|innerPromise|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        var blob2 = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
        return blob2;
    }).then(blob => {
        return blob.toString();
    });
}
`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_InnerPromiseRet",
        `
function [#|innerPromise|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    }).then(blob => {
        return blob.toString();
    });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_InnerPromiseRetBinding1",
        `
function [#|innerPromise|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(({ blob }) => blob.byteOffset).catch(({ message }) => 'Error ' + message);
    }).then(blob => {
        return blob.toString();
    });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_InnerPromiseRetBinding2",
        `
function [#|innerPromise|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    }).then(({ x }) => {
        return x.toString();
    });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_InnerPromiseRetBinding3",
        `
function [#|innerPromise|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(({ blob }) => blob.byteOffset).catch(({ message }) => 'Error ' + message);
    }).then(([x, y]) => {
        return (x || y).toString();
    });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_InnerPromiseRetBinding4",
        `
function [#|innerPromise|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(({ blob }: { blob: { byteOffset: number } }) => [0, blob.byteOffset]).catch(({ message }: Error) => ['Error ', message]);
    }).then(([x, y]) => {
        return (x || y).toString();
    });
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_VarReturn01",
        `
function [#|f|]() {
    let blob = fetch("https://typescriptlang.org").then(resp => console.log(resp));
    return blob;
}
`,
    );
    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_VarReturn02",
        `
function [#|f|]() {
    let blob = fetch("https://typescriptlang.org");
    blob.then(resp => console.log(resp));
    return blob;
}
`,
    );
    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_VarReturn03",
        `
function [#|f|]() {
    let blob = fetch("https://typescriptlang.org")
    let blob2 = blob.then(resp => console.log(resp));
    blob2.catch(err);
    return blob;
}

function err (rej) {
    console.log(rej)
}
`,
    );
    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_VarReturn04",
        `
function [#|f|]() {
    var blob = fetch("https://typescriptlang.org").then(res => console.log(res)), blob2 = fetch("https://microsoft.com").then(res => res.ok).catch(err);
    return blob;
}
function err (rej) {
    console.log(rej)
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_VarReturn05",
        `
function [#|f|]() {
    var blob = fetch("https://typescriptlang.org").then(res => console.log(res));
    blob.then(x => x);
    return blob;
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_VarReturn06",
        `
function [#|f|]() {
    var blob = fetch("https://typescriptlang.org");
    return blob;
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_VarReturn07",
        `
function [#|f|]() {
    let blob = fetch("https://typescriptlang.org");
    let blob2 = fetch("https://microsoft.com");
    blob2.then(res => console.log("res:", res));
    blob.then(resp => console.log(resp));
    return blob;
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_VarReturn08",
        `
function [#|f|]() {
    let blob = fetch("https://typescriptlang.org");
    if (!blob.ok){
        return blob;
    }
    blob.then(resp => console.log(resp));
    return blob;
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_VarReturn09",
        `
function [#|f|]() {
    let blob3;
    let blob = fetch("https://typescriptlang.org");
    let blob2 = fetch("https://microsoft.com");
    blob2.then(res => console.log("res:", res));
    blob.then(resp => console.log(resp));
    blob3 = blob2.catch(rej => rej.ok);
    return blob;
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_VarReturn10",
        `
function [#|f|]() {
    let blob3;
    let blob = fetch("https://typescriptlang.org");
    let blob2 = fetch("https://microsoft.com");
    blob2.then(res => console.log("res:", res));
    blob.then(resp => console.log(resp));
    blob3 = fetch("test.com");
    blob3 = blob2;
    return blob;
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_VarReturn11",
        `
function [#|f|]() {
    let blob;
    return blob;
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_Param1",
        `
function [#|f|]() {
    return my_print(fetch("https://typescriptlang.org").then(res => console.log(res)));
}
function my_print (resp) {
    if (resp.ok) {
        console.log(resp.buffer);
    }
    return resp;
}

`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_Param2",
        `
function [#|f|]() {
    return my_print(fetch("https://typescriptlang.org").then(res => console.log(res))).catch(err => console.log("Error!", err));
}
function my_print (resp): Promise<void> {
    if (resp.ok) {
        console.log(resp.buffer);
    }
    return resp;
}


`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_MultipleReturns1",
        `
function [#|f|](): Promise<void> {
    let x = fetch("https://microsoft.com").then(res => console.log("Microsoft:", res));
    if (x.ok) {
        return fetch("https://typescriptlang.org").then(res => console.log(res));
    }
    return x.then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_MultipleReturns2",
        `
function [#|f|](): Promise<void> {
    let x = fetch("https://microsoft.com").then(res => console.log("Microsoft:", res));
    if (x.ok) {
        return fetch("https://typescriptlang.org").then(res => console.log(res));
    }
    return x.then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
        return fetch("https://microsoft.com").then(res => console.log("Another one!"));
    });
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_SeperateLines",
        `
function [#|f|](): Promise<string> {
    var blob = fetch("https://typescriptlang.org")
    blob.then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    });
    blob.then(blob => {
        return blob.toString();
    });

    return blob;
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_InnerVarNameConflict",
        `
function [#|f|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    }).then(blob => {
        return blob.toString();
    });
}
`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_InnerPromiseSimple",
        `
function [#|f|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(blob => blob.byteOffset);
    }).then(blob => {
        return blob.toString();
    });
}
`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_PromiseAllAndThen1",
        `
function [#|f|]() {
    return Promise.resolve().then(function () {
        return Promise.all([fetch("https://typescriptlang.org"), fetch("https://microsoft.com"), Promise.resolve().then(function () {
                return fetch("https://github.com");
              }).then(res => res.toString())]);
    });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_PromiseAllAndThen2",
        `
function [#|f|]() {
    return Promise.resolve().then(function () {
        return Promise.all([fetch("https://typescriptlang.org"), fetch("https://microsoft.com"), Promise.resolve().then(function () {
                return fetch("https://github.com");
              })]).then(res => res.toString());
    });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_PromiseAllAndThen3",
        `
function [#|f|]() {
    return Promise.resolve().then(() =>
        Promise.all([fetch("https://typescriptlang.org"), fetch("https://microsoft.com"), Promise.resolve().then(function () {
            return fetch("https://github.com");
        }).then(res => res.toString())]));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_PromiseAllAndThen4",
        `
function [#|f|]() {
    return Promise.resolve().then(() =>
        Promise.all([fetch("https://typescriptlang.org"), fetch("https://microsoft.com"), Promise.resolve().then(function () {
            return fetch("https://github.com");
        })]).then(res => res.toString()));
}
`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_Scope1",
        `
function [#|f|]() {
    var var1: Response, var2;
    return fetch('https://typescriptlang.org').then( _ =>
      Promise.resolve().then( res => {
        var2 = "test";
        return fetch("https://microsoft.com");
      }).then(res =>
         var1 === res
      )
    ).then(res);
  }
  function res(response){
      console.log(response);
  }
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_Conditionals",
        `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res => {
      if (res.ok) {
        return fetch("https://microsoft.com");
      }
      else {
        if (res.buffer.length > 5) {
          return res;
        }
        else {
            return fetch("https://github.com");
        }
      }
    });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_CatchFollowedByThen",
        `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return result;
}

function rej(reject){
    return reject;
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_CatchFollowedByThenMatchingTypes01",
        `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result): number {
    return 5;
}

function rej(reject): number {
    return 3;
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_CatchFollowedByThenMatchingTypes01NoAnnotations",
        `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return 5;
}

function rej(reject){
    return 3;
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_CatchFollowedByThenMatchingTypes02",
        `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res => 0).catch(rej => 1).then(res);
}

function res(result): number {
    return 5;
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_CatchFollowedByThenMatchingTypes02NoAnnotations",
        `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res => 0).catch(rej => 1).then(res);
}

function res(result){
    return 5;
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_CatchFollowedByThenMismatchTypes01",
        `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return 5;
}

function rej(reject){
    return "Error";
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_CatchFollowedByThenMismatchTypes02",
        `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return 5;
}

function rej(reject): Response{
    return reject;
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_CatchFollowedByThenMismatchTypes02NoAnnotations",
        `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return 5;
}

function rej(reject){
    return reject;
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_CatchFollowedByThenMismatchTypes03",
        `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return 5;
}

function rej(reject){
    return Promise.resolve(1);
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_CatchFollowedByThenMismatchTypes04",
        `
interface a {
    name: string;
    age: number;
}

interface b extends a {
    color: string;
}


function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result): b{
    return {name: "myName", age: 22, color: "red"};
}

function rej(reject): a{
    return {name: "myName", age: 27};
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_ParameterNameCollision",
        `
async function foo<T>(x: T): Promise<T> {
    return x;
}

function [#|bar|]<T>(x: T): Promise<T> {
    return foo(x).then(foo)
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_Return1",
        `
function [#|f|](p: Promise<unknown>) {
    return p.catch((error: Error) => {
        return Promise.reject(error);
    });
}`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_Return2",
        `
function [#|f|](p: Promise<unknown>) {
    return p.catch((error: Error) => Promise.reject(error));
}`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_Return3",
        `
function [#|f|](p: Promise<unknown>) {
    return p.catch(function (error: Error) {
        return Promise.reject(error);
    });
}`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_LocalReturn",
        `
function [#|f|]() {
    let x = fetch("https://typescriptlang.org").then(res => console.log(res));
    return x.catch(err => console.log("Error!", err));
}

`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_PromiseCallInner",
        `
function [#|f|]() {
    return fetch(Promise.resolve(1).then(res => "https://typescriptlang.org")).catch(err => console.log(err));
}

`,
    );
    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_CatchFollowedByCall",
        `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).toString();
}

function res(result){
    return result;
}

function rej(reject){
    return reject;
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_Scope2",
        `
function [#|f|](){
    var i:number;
    return fetch("https://typescriptlang.org").then(i => i.ok).then(res => i+1).catch(err => i-1)
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_Loop",
        `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res => { for(let i=0; i<10; i++){
        console.log(res);
    }})
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_Conditional2",
        `
function [#|f|](){
    var res = 100;
    if (res > 50) {
        return fetch("https://typescriptlang.org").then(res => console.log(res));
    }
    else {
        return fetch("https://typescriptlang.org").then(res_func);
    }
}

function res_func(result){
    console.log(result);
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_Scope3",
        `
function [#|f|]() {
  var obj;
  return fetch("https://typescriptlang.org").then(function (res) {
    obj = {
      func: function f() {
        console.log(res);
      }
    };
  });
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_NestedFunctionWrongLocation",
        `
function [#|f|]() {
    function fn2(){
        function fn3(){
            return fetch("https://typescriptlang.org").then(res => console.log(res));
        }
        return fn3();
    }
    return fn2();
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_NestedFunctionRightLocation",
        `
function f() {
    function fn2(){
        function [#|fn3|](){
            return fetch("https://typescriptlang.org").then(res => console.log(res));
        }
        return fn3();
    }
    return fn2();
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_UntypedFunction",
        `
function [#|f|]() {
    return Promise.resolve().then(res => console.log(res));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_TernaryConditional",
        `
function [#|f|]() {
    let i;
    return Promise.resolve().then(res => res ? i = res : i = 100);
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_ResRejNoArgsArrow",
        `
    function [#|f|]() {
        return Promise.resolve().then(() => 1, () => "a");
    }
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_simpleFunctionExpression",
        `
const [#|foo|] = function () {
    return fetch('https://typescriptlang.org').then(result => { console.log(result) });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_simpleFunctionExpressionWithName",
        `
const foo = function [#|f|]() {
    return fetch('https://typescriptlang.org').then(result => { console.log(result) });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_simpleFunctionExpressionAssignedToBindingPattern",
        `
const { length } = [#|function|] () {
    return fetch('https://typescriptlang.org').then(result => { console.log(result) });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_catchBlockUniqueParams",
        `
function [#|f|]() {
    return Promise.resolve().then(x => 1).catch(x => "a").then(x => !!x);
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_catchBlockUniqueParamsBindingPattern",
        `
function [#|f|]() {
    return Promise.resolve().then(() => ({ x: 3 })).catch(() => ({ x: "a" })).then(({ x }) => !!x);
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_bindingPattern",
        `
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(res);
}
function res({ status, trailer }){
    console.log(status);
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_bindingPatternNameCollision",
        `
function [#|f|]() {
    const result = 'https://typescriptlang.org';
    return fetch(result).then(res);
}
function res({ status, trailer }){
    console.log(status);
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_thenArgumentNotFunction",
        `
function [#|f|]() {
    return Promise.resolve().then(f ? (x => x) : (y => y));
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_thenArgumentNotFunctionNotLastInChain",
        `
function [#|f|]() {
    return Promise.resolve().then(f ? (x => x) : (y => y)).then(q => q);
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_runEffectfulContinuation",
        `
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(res).then(_ => console.log("done"));
}
function res(result) {
    return Promise.resolve().then(x => console.log(result));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_callbackReturnsPromise",
        `
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(s => Promise.resolve(s.statusText.length)).then(x => console.log(x + 5));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_callbackReturnsPromiseInBlock",
        `
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(s => { return Promise.resolve(s.statusText.length) }).then(x => x + 5);
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_callbackReturnsFixablePromise",
        `
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(s => Promise.resolve(s.statusText).then(st => st.length)).then(x => console.log(x + 5));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_callbackReturnsPromiseLastInChain",
        `
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(s => Promise.resolve(s.statusText.length));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_callbackReturnsRejectedPromiseInTryBlock",
        `
function [#|f|]() {
    return Promise.resolve(1)
        .then(x => Promise.reject(x))
        .catch(err => console.log(err));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_nestedPromises",
        `
function [#|f|]() {
    return fetch('https://typescriptlang.org').then(x => Promise.resolve(3).then(y => Promise.resolve(x.statusText.length + y)));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_noArgs1",
        `
function delay(millis: number): Promise<void> {
    throw "no"
}

function [#|main2|]() {
    console.log("Please wait. Loading.");
    return delay(500)
        .then(() => { console.log("."); return delay(500); })
        .then(() => { console.log("."); return delay(500); })
        .then(() => { console.log("."); return delay(500); })
}
        `,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_noArgs2",
        `
function delay(millis: number): Promise<void> {
    throw "no"
}

function [#|main2|]() {
    console.log("Please wait. Loading.");
    return delay(500)
        .then(() => delay(500))
        .then(() => delay(500))
        .then(() => delay(500))
}
        `,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_exportModifier",
        `
export function [#|foo|]() {
    return fetch('https://typescriptlang.org').then(s => console.log(s));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_OutermostOnlySuccess",
        `
function [#|foo|]() {
    return fetch('a').then(() => {
        return fetch('b').then(() => 'c');
    })
}
`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_decoratedMethod",
        `
function decorator() {
    return (target: any, key: any, descriptor: PropertyDescriptor) => descriptor;
}
class Foo {
    @decorator()
    [#|method|]() {
        return fetch('a').then(x => x);
    }
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_decoratedMethodWithSingleLineComment",
        `
function decorator() {
    return (target: any, key: any, descriptor: PropertyDescriptor) => descriptor;
}
class Foo {
    @decorator()
    // comment
    [#|method|]() {
        return fetch('a').then(x => x);
    }
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_decoratedMethodWithMultipleLineComment",
        `
function decorator() {
    return (target: any, key: any, descriptor: PropertyDescriptor) => descriptor;
}
class Foo {
    @decorator()
    /**
     * comment
     */
    [#|method|]() {
        return fetch('a').then(x => x);
    }
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_decoratedMethodWithModifier",
        `
function decorator() {
    return (target: any, key: any, descriptor: PropertyDescriptor) => descriptor;
}
class Foo {
    @decorator()
    public [#|method|]() {
        return fetch('a').then(x => x);
    }
}
`,
    );

    _testConvertToAsyncFunctionFailedSuggestion(
        "convertToAsyncFunction_OutermostOnlyFailure",
        `
function foo() {
    return fetch('a').then([#|() => {|]
        return fetch('b').then(() => 'c');
    })
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_thenTypeArgument1",
        `
type APIResponse<T> = { success: true, data: T } | { success: false };

function wrapResponse<T>(response: T): APIResponse<T> {
    return { success: true, data: response };
}

function [#|get|]() {
    return Promise.resolve(undefined!).then<APIResponse<{ email: string }>>(wrapResponse);
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_thenTypeArgument2",
        `
type APIResponse<T> = { success: true, data: T } | { success: false };

function wrapResponse<T>(response: T): APIResponse<T> {
    return { success: true, data: response };
}

function [#|get|]() {
    return Promise.resolve(undefined!).then<APIResponse<{ email: string }>>(d => wrapResponse(d));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_thenTypeArgument3",
        `
type APIResponse<T> = { success: true, data: T } | { success: false };

function wrapResponse<T>(response: T): APIResponse<T> {
    return { success: true, data: response };
}

function [#|get|]() {
    return Promise.resolve(undefined!).then<APIResponse<{ email: string }>>(d => {
        console.log(d);
        return wrapResponse(d);
    });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_catchTypeArgument1",
        `
type APIResponse<T> = { success: true, data: T } | { success: false };

function [#|get|]() {
    return Promise
        .resolve<APIResponse<{ email: string }>>({ success: true, data: { email: "" } })
        .catch<APIResponse<{ email: string }>>(() => ({ success: false }));
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction_threeArguments",
        `
function [#|f|]() {
    return Promise.resolve().then(undefined, undefined, () => 1);
}`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_callbackArgument",
        `
function foo(props: any): void {
    return props;
}

const fn = (): Promise<(message: string) => void> =>
    new Promise(resolve => resolve((message: string) => foo(message)));

function [#|f|]() {
    return fn().then(res => res("test"));
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_emptyCatch1",
        `
function [#|f|]() {
    return Promise.resolve().catch();
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_emptyCatch2",
        `
function [#|f|]() {
    return Promise.resolve(0).then(x => x).catch();
}
`,
    );

    _testConvertToAsyncFunctionWithModule(
        "convertToAsyncFunction_importedFunction",
        `
import { fn } from "./module";
function [#|f|]() {
    return Promise.resolve(0).then(fn);
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction__NoSuggestionInFunctionsWithNonFixableReturnStatements1",
        `
function f(x: number): Promise<void>;
function f(): void;
function [#|f|](x?: number): Promise<void> | void {
    if (!x) return;
    return fetch('').then(() => {});
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction__NoSuggestionInFunctionsWithNonFixableReturnStatements2",
        `
function f(x: number): Promise<void>;
function f(): number;
function [#|f|](x?: number): Promise<void> | number {
    if (x) return x;
    return fetch('').then(() => {});
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction__NoSuggestionInGetters",
        `
class Foo {
    get [#|m|](): Promise<number> {
        return Promise.resolve(1).then(n => n);
    }
}
`,
    );

    _testConvertToAsyncFunctionFailed(
        "convertToAsyncFunction__NoSuggestionForGeneratorCallbacks",
        `
function [#|foo|](p: Promise<string[]>) {
    return p.then(function* (strings) {
        for (const s of strings) {
            yield s.toUpperCase();
        }
    });
}
`,
    );

    _testConvertToAsyncFunction(
        "convertToAsyncFunction_thenNoArguments",
        `
declare function foo(): Promise<number>;
function [#|f|](): Promise<number> {
    return foo().then();
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_catchNoArguments",
        `
declare function foo(): Promise<number>;
function [#|f|](): Promise<number> {
    return foo().catch();
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_chainedThenCatchThen",
        `
declare function foo(): Promise<number>;
function [#|f|](): Promise<number> {
    return foo().then(x => Promise.resolve(x + 1)).catch(() => 1).then(y => y + 2);
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_finally",
        `
declare function foo(): Promise<number>;
function [#|f|](): Promise<number> {
    return foo().finally(() => console.log("done"));
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_finallyNoArguments",
        `
declare function foo(): Promise<number>;
function [#|f|](): Promise<number> {
    return foo().finally();
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_finallyNull",
        `
declare function foo(): Promise<number>;
function [#|f|](): Promise<number> {
    return foo().finally(null);
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_finallyUndefined",
        `
declare function foo(): Promise<number>;
function [#|f|](): Promise<number> {
    return foo().finally(undefined);
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_thenFinally",
        `
declare function foo(): Promise<number>;
function [#|f|](): Promise<number> {
    return foo().then(x => x + 1).finally(() => console.log("done"));
}`,
    );
    _testConvertToAsyncFunction(
        "convertToAsyncFunction_thenFinallyThen",
        `
declare function foo(): Promise<number>;
function [#|f|](): Promise<number> {
    return foo().then(x => Promise.resolve(x + 1)).finally(() => console.log("done")).then(y => y + 2);
}`,
    );
    _testConvertToAsyncFunctionFailedAction(
        "convertToAsyncFunction_returnInBranch",
        `
declare function foo(): Promise<number>;
function [#|f|](): Promise<number> {
    return foo().then(() => {
        if (Math.random()) {
            return 1;
        }
        return 2;
    }).then(a => {
        return a + 1;
    });
}
`,
    );
    _testConvertToAsyncFunctionFailedAction(
        "convertToAsyncFunction_partialReturnInBranch",
        `
declare function foo(): Promise<number>;
function [#|f|](): Promise<number> {
    return foo().then(() => {
        if (Math.random()) {
            return 1;
        }
        console.log("foo");
    }).then(a => {
        return a + 1;
    });
}
`,
    );
});
