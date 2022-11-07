namespace ts {
export function preProcessFile(sourceText: string, readImportFiles = true, detectJavaScriptImports = false): ts.PreProcessedFileInfo {
    const pragmaContext: ts.PragmaContext = {
        languageVersion: ts.ScriptTarget.ES5, // controls whether the token scanner considers unicode identifiers or not - shouldn't matter, since we're only using it for trivia
        pragmas: undefined,
        checkJsDirective: undefined,
        referencedFiles: [],
        typeReferenceDirectives: [],
        libReferenceDirectives: [],
        amdDependencies: [],
        hasNoDefaultLib: undefined,
        moduleName: undefined
    };
    const importedFiles: ts.FileReference[] = [];
    let ambientExternalModules: { ref: ts.FileReference, depth: number }[] | undefined;
    let lastToken: ts.SyntaxKind;
    let currentToken: ts.SyntaxKind;
    let braceNesting = 0;
    // assume that text represent an external module if it contains at least one top level import/export
    // ambient modules that are found inside external modules are interpreted as module augmentations
    let externalModule = false;

    function nextToken() {
        lastToken = currentToken;
        currentToken = ts.scanner.scan();
        if (currentToken === ts.SyntaxKind.OpenBraceToken) {
            braceNesting++;
        }
        else if (currentToken === ts.SyntaxKind.CloseBraceToken) {
            braceNesting--;
        }
        return currentToken;
    }

    function getFileReference() {
        const fileName = ts.scanner.getTokenValue();
        const pos = ts.scanner.getTokenPos();
        return { fileName, pos, end: pos + fileName.length };
    }

    function recordAmbientExternalModule(): void {
        if (!ambientExternalModules) {
            ambientExternalModules = [];
        }
        ambientExternalModules.push({ ref: getFileReference(), depth: braceNesting });
    }

    function recordModuleName() {
        importedFiles.push(getFileReference());

        markAsExternalModuleIfTopLevel();
    }

    function markAsExternalModuleIfTopLevel() {
        if (braceNesting === 0) {
            externalModule = true;
        }
    }

    /**
     * Returns true if at least one token was consumed from the stream
     */
    function tryConsumeDeclare(): boolean {
        let token = ts.scanner.getToken();
        if (token === ts.SyntaxKind.DeclareKeyword) {
            // declare module "mod"
            token = nextToken();
            if (token === ts.SyntaxKind.ModuleKeyword) {
                token = nextToken();
                if (token === ts.SyntaxKind.StringLiteral) {
                    recordAmbientExternalModule();
                }
            }
            return true;
        }

        return false;
    }

    /**
     * Returns true if at least one token was consumed from the stream
     */
    function tryConsumeImport(): boolean {
        if (lastToken === ts.SyntaxKind.DotToken) {
            return false;
        }
        let token = ts.scanner.getToken();
        if (token === ts.SyntaxKind.ImportKeyword) {
            token = nextToken();
            if (token === ts.SyntaxKind.OpenParenToken) {
                token = nextToken();
                if (token === ts.SyntaxKind.StringLiteral || token === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
                    // import("mod");
                    recordModuleName();
                    return true;
                }
            }
            else if (token === ts.SyntaxKind.StringLiteral) {
                // import "mod";
                recordModuleName();
                return true;
            }
            else {
                if (token === ts.SyntaxKind.TypeKeyword) {
                    const skipTypeKeyword = ts.scanner.lookAhead(() => {
                        const token = ts.scanner.scan();
                        return token !== ts.SyntaxKind.FromKeyword && (
                            token === ts.SyntaxKind.AsteriskToken ||
                            token === ts.SyntaxKind.OpenBraceToken ||
                            token === ts.SyntaxKind.Identifier ||
                            ts.isKeyword(token)
                        );
                    });
                    if (skipTypeKeyword) {
                        token = nextToken();
                    }
                }

                if (token === ts.SyntaxKind.Identifier || ts.isKeyword(token)) {
                    token = nextToken();
                    if (token === ts.SyntaxKind.FromKeyword) {
                        token = nextToken();
                        if (token === ts.SyntaxKind.StringLiteral) {
                            // import d from "mod";
                            recordModuleName();
                            return true;
                        }
                    }
                    else if (token === ts.SyntaxKind.EqualsToken) {
                        if (tryConsumeRequireCall(/*skipCurrentToken*/ true)) {
                            return true;
                        }
                    }
                    else if (token === ts.SyntaxKind.CommaToken) {
                        // consume comma and keep going
                        token = nextToken();
                    }
                    else {
                        // unknown syntax
                        return true;
                    }
                }

                if (token === ts.SyntaxKind.OpenBraceToken) {
                    token = nextToken();
                    // consume "{ a as B, c, d as D}" clauses
                    // make sure that it stops on EOF
                    while (token !== ts.SyntaxKind.CloseBraceToken && token !== ts.SyntaxKind.EndOfFileToken) {
                        token = nextToken();
                    }

                    if (token === ts.SyntaxKind.CloseBraceToken) {
                        token = nextToken();
                        if (token === ts.SyntaxKind.FromKeyword) {
                            token = nextToken();
                            if (token === ts.SyntaxKind.StringLiteral) {
                                // import {a as A} from "mod";
                                // import d, {a, b as B} from "mod"
                                recordModuleName();
                            }
                        }
                    }
                }
                else if (token === ts.SyntaxKind.AsteriskToken) {
                    token = nextToken();
                    if (token === ts.SyntaxKind.AsKeyword) {
                        token = nextToken();
                        if (token === ts.SyntaxKind.Identifier || ts.isKeyword(token)) {
                            token = nextToken();
                            if (token === ts.SyntaxKind.FromKeyword) {
                                token = nextToken();
                                if (token === ts.SyntaxKind.StringLiteral) {
                                    // import * as NS from "mod"
                                    // import d, * as NS from "mod"
                                    recordModuleName();
                                }
                            }
                        }
                    }
                }
            }

            return true;
        }

        return false;
    }

    function tryConsumeExport(): boolean {
        let token = ts.scanner.getToken();
        if (token === ts.SyntaxKind.ExportKeyword) {
            markAsExternalModuleIfTopLevel();
            token = nextToken();
            if (token === ts.SyntaxKind.TypeKeyword) {
                const skipTypeKeyword = ts.scanner.lookAhead(() => {
                    const token = ts.scanner.scan();
                    return token === ts.SyntaxKind.AsteriskToken ||
                        token === ts.SyntaxKind.OpenBraceToken;
                });
                if (skipTypeKeyword) {
                    token = nextToken();
                }
            }
            if (token === ts.SyntaxKind.OpenBraceToken) {
                token = nextToken();
                // consume "{ a as B, c, d as D}" clauses
                // make sure it stops on EOF
                while (token !== ts.SyntaxKind.CloseBraceToken && token !== ts.SyntaxKind.EndOfFileToken) {
                    token = nextToken();
                }

                if (token === ts.SyntaxKind.CloseBraceToken) {
                    token = nextToken();
                    if (token === ts.SyntaxKind.FromKeyword) {
                        token = nextToken();
                        if (token === ts.SyntaxKind.StringLiteral) {
                            // export {a as A} from "mod";
                            // export {a, b as B} from "mod"
                            recordModuleName();
                        }
                    }
                }
            }
            else if (token === ts.SyntaxKind.AsteriskToken) {
                token = nextToken();
                if (token === ts.SyntaxKind.FromKeyword) {
                    token = nextToken();
                    if (token === ts.SyntaxKind.StringLiteral) {
                        // export * from "mod"
                        recordModuleName();
                    }
                }
            }
            else if (token === ts.SyntaxKind.ImportKeyword) {
                token = nextToken();
                if (token === ts.SyntaxKind.TypeKeyword) {
                    const skipTypeKeyword = ts.scanner.lookAhead(() => {
                        const token = ts.scanner.scan();
                        return token === ts.SyntaxKind.Identifier ||
                            ts.isKeyword(token);
                    });
                    if (skipTypeKeyword) {
                        token = nextToken();
                    }
                }
                if (token === ts.SyntaxKind.Identifier || ts.isKeyword(token)) {
                    token = nextToken();
                    if (token === ts.SyntaxKind.EqualsToken) {
                        if (tryConsumeRequireCall(/*skipCurrentToken*/ true)) {
                            return true;
                        }
                    }
                }
            }

            return true;
        }

        return false;
    }

    function tryConsumeRequireCall(skipCurrentToken: boolean, allowTemplateLiterals = false): boolean {
        let token = skipCurrentToken ? nextToken() : ts.scanner.getToken();
        if (token === ts.SyntaxKind.RequireKeyword) {
            token = nextToken();
            if (token === ts.SyntaxKind.OpenParenToken) {
                token = nextToken();
                if (token === ts.SyntaxKind.StringLiteral ||
                    allowTemplateLiterals && token === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
                    //  require("mod");
                    recordModuleName();
                }
            }
            return true;
        }
        return false;
    }

    function tryConsumeDefine(): boolean {
        let token = ts.scanner.getToken();
        if (token === ts.SyntaxKind.Identifier && ts.scanner.getTokenValue() === "define") {
            token = nextToken();
            if (token !== ts.SyntaxKind.OpenParenToken) {
                return true;
            }

            token = nextToken();
            if (token === ts.SyntaxKind.StringLiteral || token === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
                // looks like define ("modname", ... - skip string literal and comma
                token = nextToken();
                if (token === ts.SyntaxKind.CommaToken) {
                    token = nextToken();
                }
                else {
                    // unexpected token
                    return true;
                }
            }

            // should be start of dependency list
            if (token !== ts.SyntaxKind.OpenBracketToken) {
                return true;
            }

            // skip open bracket
            token = nextToken();
            // scan until ']' or EOF
            while (token !== ts.SyntaxKind.CloseBracketToken && token !== ts.SyntaxKind.EndOfFileToken) {
                // record string literals as module names
                if (token === ts.SyntaxKind.StringLiteral || token === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
                    recordModuleName();
                }

                token = nextToken();
            }
            return true;

        }
        return false;
    }

    function processImports(): void {
        ts.scanner.setText(sourceText);
        nextToken();
        // Look for:
        //    import "mod";
        //    import d from "mod"
        //    import {a as A } from "mod";
        //    import * as NS from "mod"
        //    import d, {a, b as B} from "mod"
        //    import i = require("mod");
        //    import("mod");

        //    export * from "mod"
        //    export {a as b} from "mod"
        //    export import i = require("mod")
        //    (for JavaScript files) require("mod")

        // Do not look for:
        //    AnySymbol.import("mod")
        //    AnySymbol.nested.import("mod")

        while (true) {
            if (ts.scanner.getToken() === ts.SyntaxKind.EndOfFileToken) {
                break;
            }

            if (ts.scanner.getToken() === ts.SyntaxKind.TemplateHead) {
                const stack = [ts.scanner.getToken()];
                loop: while (ts.length(stack)) {
                    const token = ts.scanner.scan();
                    switch (token) {
                        case ts.SyntaxKind.EndOfFileToken:
                            break loop;
                        case ts.SyntaxKind.ImportKeyword:
                            tryConsumeImport();
                            break;
                        case ts.SyntaxKind.TemplateHead:
                            stack.push(token);
                            break;
                        case ts.SyntaxKind.OpenBraceToken:
                            if (ts.length(stack)) {
                                stack.push(token);
                            }
                            break;
                        case ts.SyntaxKind.CloseBraceToken:
                            if (ts.length(stack)) {
                                if (ts.lastOrUndefined(stack) === ts.SyntaxKind.TemplateHead) {
                                    if (ts.scanner.reScanTemplateToken(/* isTaggedTemplate */ false) === ts.SyntaxKind.TemplateTail) {
                                        stack.pop();
                                    }
                                }
                                else {
                                    stack.pop();
                                }
                            }
                            break;
                    }
                }
                nextToken();
            }

            // check if at least one of alternative have moved scanner forward
            if (tryConsumeDeclare() ||
                tryConsumeImport() ||
                tryConsumeExport() ||
                (detectJavaScriptImports && (
                    tryConsumeRequireCall(/*skipCurrentToken*/ false, /*allowTemplateLiterals*/ true) ||
                    tryConsumeDefine()
                ))) {
                continue;
            }
            else {
                nextToken();
            }
        }

        ts.scanner.setText(undefined);
    }

    if (readImportFiles) {
        processImports();
    }
    ts.processCommentPragmas(pragmaContext, sourceText);
    ts.processPragmasIntoFields(pragmaContext, ts.noop);
    if (externalModule) {
        // for external modules module all nested ambient modules are augmentations
        if (ambientExternalModules) {
            // move all detected ambient modules to imported files since they need to be resolved
            for (const decl of ambientExternalModules) {
                importedFiles.push(decl.ref);
            }
        }
        return { referencedFiles: pragmaContext.referencedFiles, typeReferenceDirectives: pragmaContext.typeReferenceDirectives, libReferenceDirectives: pragmaContext.libReferenceDirectives, importedFiles, isLibFile: !!pragmaContext.hasNoDefaultLib, ambientExternalModules: undefined };
    }
    else {
        // for global scripts ambient modules still can have augmentations - look for ambient modules with depth > 0
        let ambientModuleNames: string[] | undefined;
        if (ambientExternalModules) {
            for (const decl of ambientExternalModules) {
                if (decl.depth === 0) {
                    if (!ambientModuleNames) {
                        ambientModuleNames = [];
                    }
                    ambientModuleNames.push(decl.ref.fileName);
                }
                else {
                    importedFiles.push(decl.ref);
                }
            }
        }
        return { referencedFiles: pragmaContext.referencedFiles, typeReferenceDirectives: pragmaContext.typeReferenceDirectives, libReferenceDirectives: pragmaContext.libReferenceDirectives, importedFiles, isLibFile: !!pragmaContext.hasNoDefaultLib, ambientExternalModules: ambientModuleNames };
    }
}
}
