namespace ts {
    interface Range {
        pos: number;
        end: number;
        name: string;
    }

    interface Test {
        source: string;
        ranges: Map<Range>;
    }

    function getTest(source: string): Test {
        const activeRanges: Range[] = [];
        let text = "";
        let lastPos = 0;
        let pos = 0;
        const ranges = createMap<Range>();

        while (pos < source.length) {
            if (source.charCodeAt(pos) === CharacterCodes.openBracket &&
                (source.charCodeAt(pos + 1) === CharacterCodes.hash || source.charCodeAt(pos + 1) === CharacterCodes.$)) {
                const saved = pos;
                pos += 2;
                const s = pos;
                consumeIdentifier();
                const e = pos;
                if (source.charCodeAt(pos) === CharacterCodes.bar) {
                    pos++;
                    text += source.substring(lastPos, saved);
                    const name = s === e
                        ? source.charCodeAt(saved + 1) === CharacterCodes.hash ? "selection" : "extracted"
                        : source.substring(s, e);
                    activeRanges.push({ name, pos: text.length, end: undefined! });
                    lastPos = pos;
                    continue;
                }
                else {
                    pos = saved;
                }
            }
            else if (source.charCodeAt(pos) === CharacterCodes.bar && source.charCodeAt(pos + 1) === CharacterCodes.closeBracket) {
                text += source.substring(lastPos, pos);
                activeRanges[activeRanges.length - 1].end = text.length;
                const range = activeRanges.pop()!;
                if (range.name in ranges) {
                    throw new Error(`Duplicate name of range ${range.name}`);
                }
                ranges.set(range.name, range);
                pos += 2;
                lastPos = pos;
                continue;
            }
            pos++;
        }
        text += source.substring(lastPos, pos);

        function consumeIdentifier() {
            while (isIdentifierPart(source.charCodeAt(pos), ScriptTarget.Latest)) {
                pos++;
            }
        }
        return { source: text, ranges };
    }


    const newLineCharacter = "\n";
    const formatOptions: FormatCodeSettings = {
        indentSize: 4,
        tabSize: 4,
        newLineCharacter,
        convertTabsToSpaces: true,
        indentStyle: IndentStyle.Smart,
        insertSpaceAfterConstructor: false,
        insertSpaceAfterCommaDelimiter: true,
        insertSpaceAfterSemicolonInForStatements: true,
        insertSpaceBeforeAndAfterBinaryOperators: true,
        insertSpaceAfterKeywordsInControlFlowStatements: true,
        insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
        insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
        insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
        insertSpaceBeforeFunctionParenthesis: false,
        placeOpenBraceOnNewLineForFunctions: false,
        placeOpenBraceOnNewLineForControlBlocks: false,
    };

    const notImplementedHost: LanguageServiceHost = {
        getCompilationSettings: notImplemented,
        getScriptFileNames: notImplemented,
        getScriptVersion: notImplemented,
        getScriptSnapshot: notImplemented,
        getDefaultLibFileName: notImplemented,
        getCurrentDirectory: notImplemented,
    };

    function testConvertToAsyncFunction(caption: string, text: string, baselineFolder: string, description: DiagnosticMessage, includeLib?: boolean) {
        const t = getTest(text);
        const selectionRange = t.ranges.get("selection")!;
        if (!selectionRange) {
            throw new Error(`Test ${caption} does not specify selection range`);
        }

        [Extension.Ts, Extension.Js].forEach(extension =>
            it(`${caption} [${extension}]`, () => runBaseline(extension)));

        function runBaseline(extension: Extension) {
            const path = "/a" + extension;
            const program = makeProgram({ path, content: t.source }, includeLib)!;

            if (hasSyntacticDiagnostics(program)) {
                // Don't bother generating JS baselines for inputs that aren't valid JS.
                assert.equal(Extension.Js, extension, "Syntactic diagnostics found in non-JS file");
                return;
            }

            const f = {
                path,
                content: t.source
            };

            const sourceFile = program.getSourceFile(path)!;
            const host = projectSystem.createServerHost([f, projectSystem.libFile]);
            const projectService = projectSystem.createProjectService(host);
            projectService.openClientFile(f.path);
            const languageService = projectService.inferredProjects[0].getLanguageService();
            const context: CodeFixContext = {
                errorCode: 80006,
                span: { start: selectionRange.pos, length: selectionRange.end - selectionRange.pos },
                sourceFile,
                program,
                cancellationToken: { throwIfCancellationRequested: noop, isCancellationRequested: returnFalse },
                preferences: defaultPreferences,
                host: notImplementedHost,
                formatContext: formatting.getFormatContext(formatOptions)
            };

            const diagnostics = languageService.getSuggestionDiagnostics(f.path);
            const diagnostic = find(diagnostics, diagnostic => diagnostic.messageText === description.message);
            assert.isNotNull(diagnostic);

            const actions = codefix.getFixes(context)
            const action = find(actions, action => action.description === description.message)!;
            assert.isNotNull(action);

            Harness.Baseline.runBaseline(`${baselineFolder}/${caption}${extension}`, () => {
                const data: string[] = [];
                data.push(`// ==ORIGINAL==`);
                data.push(text.replace("[#|", "/*[#|*/").replace("|]", "/*|]*/"));
                const changes = action.changes;
                assert.lengthOf(changes, 1);

                data.push(`// ==ASYNC FUNCTION::${action.description}==`);
                const newText = textChanges.applyChanges(sourceFile.text, changes[0].textChanges);
                data.push(newText);

                const diagProgram = makeProgram({ path, content: newText }, includeLib)!;
                assert.isFalse(hasSyntacticDiagnostics(diagProgram));
                return data.join(newLineCharacter);
            });
        }

        function makeProgram(f: { path: string, content: string }, includeLib?: boolean) {
            const host = projectSystem.createServerHost(includeLib ? [f, projectSystem.libFile] : [f]); // libFile is expensive to parse repeatedly - only test when required
            const projectService = projectSystem.createProjectService(host);
            projectService.openClientFile(f.path);
            const program = projectService.inferredProjects[0].getLanguageService().getProgram();
            return program;
        }

        function hasSyntacticDiagnostics(program: Program) {
            const diags = program.getSyntacticDiagnostics();
            return length(diags) > 0;
        }
    }

    function testConvertToAsyncFunctionFailed(caption: string, text: string, description: DiagnosticMessage) {
        it(caption, () => {
            const t = extractTest(text);
            const selectionRange = t.ranges.get("selection");
            if (!selectionRange) {
                throw new Error(`Test ${caption} does not specify selection range`);
            }
            const f = {
                path: "/a.ts",
                content: t.source
            };
            const host = projectSystem.createServerHost([f, projectSystem.libFile]);
            const projectService = projectSystem.createProjectService(host);
            projectService.openClientFile(f.path);
            const languageService = projectService.inferredProjects[0].getLanguageService();

            const actions = languageService.getSuggestionDiagnostics(f.path);
            assert.isUndefined(find(actions, action => action.messageText === description.message));
        });
    }

    describe("convertToAsyncFunctions", () => {
        _testConvertToAsyncFunction("convertToAsyncFunction_basic", `
function [#|f|](): Promise<void>{
    return fetch('https://typescriptlang.org').then(result => { console.log(result) });
}`);
        _testConvertToAsyncFunction("convertToAsyncFunction_ArrowFunction", `
[#|():Promise<void> => {|]
    return fetch('https://typescriptlang.org').then(result => console.log(result));
}`);
        _testConvertToAsyncFunction("convertToAsyncFunction_Catch", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => { console.log(result); }).catch(err => { console.log(err); });
}`);
        _testConvertToAsyncFunction("convertToAsyncFunction_CatchAndRej", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => { console.log(result); }, rejection => { console.log("rejected:", rejection); }).catch(err => { console.log(err) });
}`);
        _testConvertToAsyncFunction("convertToAsyncFunction_CatchAndRejRef", `
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
}`);
        _testConvertToAsyncFunction("convertToAsyncFunction_CatchRef", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res).catch(catch_err)
}
function res(result){
    console.log(result);
}
function catch_err(err){
    console.log(err);
}
`);
        _testConvertToAsyncFunction("convertToAsyncFunction_CatchNoBrackets", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => console.log(result)).catch(err => console.log(err));
}`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_IgnoreArgs1", `
function [#|f|](): Promise<void> {
    return fetch('https://typescriptlang.org').then( _ => { console.log("done"); });
}`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_IgnoreArgs2", `
function [#|f|](): Promise<void> {
    return fetch('https://typescriptlang.org').then( () => console.log("done") );
}`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_Method", `
class Parser {
    [#|f|]():Promise<void> {
        return fetch('https://typescriptlang.org').then(result => console.log(result));
    }
}`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_MultipleCatches", `
function [#|f|](): Promise<void> {
    return fetch('https://typescriptlang.org').then(res => console.log(res)).catch(err => console.log("err", err)).catch(err2 => console.log("err2", err2));
}`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_MultipleThens", `
function [#|f|]():Promise<boolean> {
    return fetch('https://typescriptlang.org').then(res).then(res2);
}
function res(result){
    return result.ok;
}
function res2(result2){
    console.log(result2);
}`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_MultipleThensSameVarName", `
function [#|f|]():Promise<boolean> {
    return fetch('https://typescriptlang.org').then(res).then(res2);
}
function res(result){
    return result.ok;
}
function res2(result){
    return result.bodyUsed;
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_NoRes", `
function [#|f|]():Promise<void | Response> {
    return fetch('https://typescriptlang.org').then(null, rejection => console.log("rejected:", rejection));
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_NoRes2", `
function [#|f|]():Promise<void | Response> {
    return fetch('https://typescriptlang.org').then(undefined).catch(rej => console.log(rej));
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_NoRes3", `
function [#|f|]():Promise<void | Response> {
    return fetch('https://typescriptlang.org').catch(rej => console.log(rej));
}
`
        );
        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_NoSuggestion", `
function [#|f|]():Promise<Response> {
    return fetch('https://typescriptlang.org');
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_PromiseDotAll", `
function [#|f|]():Promise<void>{
    return Promise.all([fetch('https://typescriptlang.org'), fetch('https://microsoft.com'), fetch('https://youtube.com')]).then(function(vals){
        vals.forEach(console.log); 
    });
}
`
        );
        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_NoSuggestionNoPromise", `
function [#|f|]():void{
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_Rej", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => { console.log(result); }, rejection => { console.log("rejected:", rejection); });
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_RejRef", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res, rej);
}
function res(result){
    console.log(result);
}
function rej(err){
    console.log(err);
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_RejNoBrackets", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => console.log(result), rejection => console.log("rejected:", rejection));
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_ResRef", `
function [#|f|]():Promise<boolean> {
    return fetch('https://typescriptlang.org').then(res);
}
function res(result){
    return result.ok;
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_ResRefNoReturnVal", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res);
}
function res(result){
    console.log(result);
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_NoBrackets", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => console.log(result));
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_Finally1", `
function [#|finallyTest|](): Promise<void> {
    return fetch("https://typescriptlang.org").then(res => console.log(res)).catch(rej => console.log("error", rej)).finally(console.log("finally!"));
}
`
        );

        _testConvertToAsyncFunction("convertToAsyncFunction_Finally2", `
function [#|finallyTest|](): Promise<void> {
    return fetch("https://typescriptlang.org").then(res => console.log(res)).finally(console.log("finally!"));
}
`
        );

        _testConvertToAsyncFunction("convertToAsyncFunction_Finally3", `
function [#|finallyTest|](): Promise<void> {
    return fetch("https://typescriptlang.org").finally(console.log("finally!"));
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_InnerPromise", `
function [#|innerPromise|](): Promise<string> {
    var blob = fetch("https://typescriptlang.org").then(resp => {
        var blob2 = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
        retrun blob2;
    }).then(blob => {
        return blob.toString();   
    });

    return blob;
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_InnerVarNameConflict", `
function [#|f|](): Promise<string> {
    var blob = fetch("https://typescriptlang.org").then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    }).then(blob => {
        return blob.toString();
    });

    return blob;
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_InnerPromiseSimple", `
function [#|f|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(blob => blob.byteOffset);
    }).then(blob => {
        return blob.toString();
    });
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_PromiseAllAndThen", `
function [#|f|]() {
    return Promise.resolve().then(function () {
        return Promise.all([fetch("https://typescriptlang.org"), fetch("https://microsoft.com"), Promise.resolve().then(function () {
                return fetch("https://github.com");
              }).then(res => res.toString())]);
            });
          }
    );
}
`
);
    _testConvertToAsyncFunction("convertToAsyncFunction_Scope", `
function [#|f|]() {
    var var1:Response, var2;
    return fetch('https://typescriptlang.org').then( _ => 
      Promise.resolve().then( res => {
        var2 = "test";
        return fetch("https://microsoft.com");
      }).then(res =>
         var1 === res
      )
    ).then(res);
  }
` );

_testConvertToAsyncFunction("convertToAsyncFunction_Conditionals", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res => {
      if (res.ok) {
        return fetch("https://microsoft.com");
      } else {
        if (res.buffer.length > 5) {
          return res;
        } else {
            return fetch("https://github.com");
        }
      }
    });
}
`
);

_testConvertToAsyncFunction("convertToAsyncFunction_CatchFollowedByThen", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return result;
}

function rej(reject){
    return reject;
}
`
);

_testConvertToAsyncFunction("convertToAsyncFunction_Scope2", `
function [#|f|](){
    var i:number;
    return fetch("https://typescriptlang.org").then(i => i.ok).then(res => i+1).catch(err => i-1)
}
`
);

_testConvertToAsyncFunction("convertToAsyncFunction_Loop", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res => { for(let i=0; i<10; i++){
        console.log(res);
    }})
}
`
);

_testConvertToAsyncFunction("convertToAsyncFunction_Conditional2", `
function [#|f|](){
    var res = 100;
    if (res > 50) {
        return fetch("https://typescriptlang.org").then(res => console.log(res));
    }
    else {
        return fetch("https://typescriptlang.org").then(res_func);
    }
}
`
);

});

    function _testConvertToAsyncFunction(caption: string, text: string, includeLib?: boolean) {
        testConvertToAsyncFunction(caption, text, "convertToAsyncFunction", Diagnostics.Convert_to_async_function, includeLib);
    }

    function _testConvertToAsyncFunctionFailed(caption: string, text: string) {
        testConvertToAsyncFunctionFailed(caption, text, Diagnostics.Convert_to_async_function);
    }
}