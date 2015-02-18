/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="node.d.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="editorServices.ts" />

module ts.server {
    var spaceCache = [" ", "  ", "   ", "    "];

    interface StackTraceError extends Error {
        stack?: string;
    }

    function generateSpaces(n: number): string {
        if (!spaceCache[n]) {
            var strBuilder = "";
            for (var i = 0; i < n; i++) {
                strBuilder += " ";
            }
            spaceCache[n] = strBuilder;
        }  
        return spaceCache[n];
    }

    interface FileStart {
        file: string;
        start: ILineInfo;
    }

    function compareNumber(a: number, b: number) {
        if (a < b) {
            return -1;
        }
        else if (a == b) {
            return 0;
        }
        else return 1;
    }

    function compareFileStart(a: FileStart, b: FileStart) {
        if (a.file < b.file) {
            return -1;
        }
        else if (a.file == b.file) {
            var n = compareNumber(a.start.line, b.start.line);
            if (n == 0) {
                return compareNumber(a.start.col, b.start.col);
            }
            else return n;
        }
        else {
            return 1;
        }
    }

    function sortNavItems(items: ts.NavigateToItem[]) {
        
        return items.sort((a, b) => {
            if (a.matchKind < b.matchKind) {
                return -1;
            }
            else if (a.matchKind == b.matchKind) {
                var lowa = a.name.toLowerCase();
                var lowb = b.name.toLowerCase();
                if (lowa < lowb) {
                    return -1;
                }
                else if (lowa == lowb) {
                    return 0;
                }
                else {
                    return 1;
                }
            }
            else {
                return 1;
            }
        })
    }
       
    function formatDiag(fileName: string, project: Project, diag: ts.Diagnostic) {
        return {
            start: project.compilerService.host.positionToLineCol(fileName, diag.start),
            end: project.compilerService.host.positionToLineCol(fileName, diag.start+diag.length),
            text: ts.flattenDiagnosticMessageText(diag.messageText, "\n")
        };
    }

    interface PendingErrorCheck {
        fileName: string;
        project: Project;
    }

    function allEditsBeforePos(edits: ts.TextChange[], pos: number) {
        for (var i = 0, len = edits.length; i < len; i++) {
            if (ts.textSpanEnd(edits[i].span) >= pos) {
                return false;
            }
        }
        return true;
    }

    export module CommandNames {
        export var Change = "change";
        export var Close = "close";
        export var Completions = "completions";
        export var Definition = "definition";
        export var Format = "format";
        export var Formatonkey = "formatonkey";
        export var Geterr = "geterr";
        export var NavBar = "navbar";
        export var Navto = "navto";
        export var Open = "open";
        export var Quickinfo = "quickinfo";
        export var References = "references";
        export var Reload = "reload";
        export var Rename = "rename";
        export var Saveto = "saveto";
        export var Brace = "brace";
        export var Unknown = "unknown";
    }

    module Errors { 
        export var NoProject = new Error("No Project.");
        export var NoContent = new Error("No Content.");
    }

    export interface ServerHost extends ts.System {
    }

    export class Session {
        projectService: ProjectService;
        pendingOperation = false;
        fileHash: ts.Map<number> = {};
        nextFileId = 1;
        errorTimer: NodeJS.Timer;
        immediateId: any;
        changeSeq = 0;

        constructor(private host: ServerHost, private logger: Logger) {
            this.projectService = new ProjectService(host, logger);
        }

        logError(err: Error, cmd: string) {
            var typedErr = <StackTraceError>err;
            var msg = "Exception on executing command " + cmd;
            if (typedErr.message) {
                msg += ":\n" + typedErr.message;
                if (typedErr.stack) {
                    msg += "\n" + typedErr.stack;
                }
            }
            this.projectService.log(msg);
        }

        sendLineToClient(line: string) {
            this.host.write(line + this.host.newLine);
        }

        send(msg: NodeJS._debugger.Message) {
            var json = JSON.stringify(msg);
            this.sendLineToClient('Content-Length: ' + (1 + Buffer.byteLength(json, 'utf8')) +
                '\r\n\r\n' + json);
        }

        event(info: any, eventName: string) {
            var ev: NodeJS._debugger.Event = {
                seq: 0,
                type: "event",
                event: eventName,
                body: info,
            };
            this.send(ev);
        }

        response(info: any, cmdName: string, reqSeq = 0, errorMsg?: string) {
            var res: protocol.Response = {
                seq: 0,
                type: "response",
                command: cmdName,
                request_seq: reqSeq,
                success: !errorMsg,
            }
            if (!errorMsg) {
                res.body = info;
            }
            else {
                res.message = errorMsg;
            }
            this.send(res);
        }

        output(body: any, commandName: string, requestSequence = 0, errorMessage?: string) {
            this.response(body, commandName, requestSequence, errorMessage);
        }

        semanticCheck(file: string, project: Project) {
            var diags = project.compilerService.languageService.getSemanticDiagnostics(file);
            if (diags) {
                var bakedDiags = diags.map((diag) => formatDiag(file, project, diag));
                this.event({ file: file, diagnostics: bakedDiags }, "semanticDiag");
            }
        }

        syntacticCheck(file: string, project: Project) {
            var diags = project.compilerService.languageService.getSyntacticDiagnostics(file);
            if (diags) {
                var bakedDiags = diags.map((diag) => formatDiag(file, project, diag));
                this.event({ file: file, diagnostics: bakedDiags }, "syntaxDiag");
            }
        }

        errorCheck(file: string, project: Project) {
            this.syntacticCheck(file, project);
            this.semanticCheck(file, project);
        }

        updateErrorCheck(checkList: PendingErrorCheck[], seq: number,
            matchSeq: (seq: number) => boolean, ms = 1500, followMs = 200) {
            if (followMs > ms) {
                followMs = ms;
            }
            if (this.errorTimer) {
                clearTimeout(this.errorTimer);
            }
            if (this.immediateId) {
                clearImmediate(this.immediateId);
                this.immediateId = undefined;
            }
            var index = 0;
            var checkOne = () => {
                if (matchSeq(seq)) {
                    var checkSpec = checkList[index++];
                    if (checkSpec.project.getSourceFileFromName(checkSpec.fileName)) {
                        this.syntacticCheck(checkSpec.fileName, checkSpec.project);
                        this.immediateId = setImmediate(() => {
                            this.semanticCheck(checkSpec.fileName, checkSpec.project);
                            this.immediateId = undefined;
                            if (checkList.length > index) {
                                this.errorTimer = setTimeout(checkOne, followMs);
                            }
                            else {
                                this.errorTimer = undefined;
                            }
                        });
                    }
                }
            }
            if ((checkList.length > index) && (matchSeq(seq))) {
                this.errorTimer = setTimeout(checkOne, ms);
            }
        }

        getDefinition(line: number, col: number, fileName: string): protocol.FileSpan[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineColToPosition(file, line, col);

            var definitions = compilerService.languageService.getDefinitionAtPosition(file, position);
            if (!definitions) {
                throw Errors.NoContent;
            }

            return definitions.map(def => ({
                file: def.fileName,
                start: compilerService.host.positionToLineCol(def.fileName, def.textSpan.start),
                end: compilerService.host.positionToLineCol(def.fileName, ts.textSpanEnd(def.textSpan))
            }));
        }

        getRenameLocations(line: number, col: number, fileName: string,findInComments: boolean, findInStrings: boolean): protocol.RenameResponseBody {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineColToPosition(file, line, col);
            var renameInfo = compilerService.languageService.getRenameInfo(file, position);
            if (!renameInfo) {
                throw Errors.NoContent;
            }

            if (!renameInfo.canRename) {
                return {
                    info: renameInfo,
                    locs: []
                };
            }

            var renameLocations = compilerService.languageService.findRenameLocations(file, position, findInStrings, findInComments);
            if (!renameLocations) {
                throw Errors.NoContent;
            }

            var bakedRenameLocs = renameLocations.map(location => (<protocol.FileSpan>{
                file: location.fileName,
                start: compilerService.host.positionToLineCol(location.fileName, location.textSpan.start),
                end: compilerService.host.positionToLineCol(location.fileName, ts.textSpanEnd(location.textSpan)),
            })).sort((a, b) => {
                if (a.file < b.file) {
                    return -1;
                }
                else if (a.file > b.file) {
                    return 1;
                }
                else {
                    // reverse sort assuming no overlap
                    if (a.start.line < b.start.line) {
                        return 1;
                    }
                    else if (a.start.line > b.start.line) {
                        return -1;
                    }
                    else {
                        return b.start.col - a.start.col;
                    }
                }
            }).reduce<protocol.SpanGroup[]>((accum: protocol.SpanGroup[], cur: protocol.FileSpan) => {
                var curFileAccum: protocol.SpanGroup;
                if (accum.length > 0) {
                    curFileAccum = accum[accum.length - 1];
                    if (curFileAccum.file != cur.file) {
                        curFileAccum = undefined;
                    }
                }
                if (!curFileAccum) {
                    curFileAccum = { file: cur.file, locs: [] };
                    accum.push(curFileAccum);
                }
                curFileAccum.locs.push({ start: cur.start, end: cur.end });
                return accum;
            }, []);

            return { info: renameInfo, locs: bakedRenameLocs };
        }

        getReferences(line: number, col: number, fileName: string): protocol.ReferencesResponseBody {
            // TODO: get all projects for this file; report refs for all projects deleting duplicates
            // can avoid duplicates by eliminating same ref file from subsequent projects
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineColToPosition(file, line, col);

            var references = compilerService.languageService.getReferencesAtPosition(file, position);
            if (!references) {
                throw Errors.NoContent;
            }

            var nameInfo = compilerService.languageService.getQuickInfoAtPosition(file, position);
            if (!nameInfo) {
                throw Errors.NoContent;
            }

            var displayString = ts.displayPartsToString(nameInfo.displayParts);
            var nameSpan = nameInfo.textSpan;
            var nameColStart = compilerService.host.positionToLineCol(file, nameSpan.start).col;
            var nameText = compilerService.host.getScriptSnapshot(file).getText(nameSpan.start, ts.textSpanEnd(nameSpan));
            var bakedRefs: protocol.ReferencesResponseItem[] = references.map((ref) => {
                var start = compilerService.host.positionToLineCol(ref.fileName, ref.textSpan.start);
                var refLineSpan = compilerService.host.lineToTextSpan(ref.fileName, start.line - 1);
                var snap = compilerService.host.getScriptSnapshot(ref.fileName);
                var lineText = snap.getText(refLineSpan.start, ts.textSpanEnd(refLineSpan)).replace(/\r|\n/g, "");
                return {
                    file: ref.fileName,
                    start: start,
                    lineText: lineText,
                    end: compilerService.host.positionToLineCol(ref.fileName, ts.textSpanEnd(ref.textSpan)),
                    isWriteAccess: ref.isWriteAccess
                };
            }).sort(compareFileStart);
            return {
                refs: bakedRefs,
                symbolName: nameText,
                symbolStartCol: nameColStart,
                symbolDisplayString: displayString
            };
        }

        openClientFile(fileName: string) {
            var file = ts.normalizePath(fileName);
            this.projectService.openClientFile(file);
        }

        getQuickInfo(line: number, col: number, fileName: string): protocol.QuickInfoResponseBody {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineColToPosition(file, line, col);
            var quickInfo = compilerService.languageService.getQuickInfoAtPosition(file, position);
            if (!quickInfo) {
                throw Errors.NoContent;
            }

            var displayString = ts.displayPartsToString(quickInfo.displayParts);
            var docString = ts.displayPartsToString(quickInfo.documentation);
            return {
                kind: quickInfo.kind,
                kindModifiers: quickInfo.kindModifiers,
                start: compilerService.host.positionToLineCol(file, quickInfo.textSpan.start),
                end: compilerService.host.positionToLineCol(file, ts.textSpanEnd(quickInfo.textSpan)),
                displayString: displayString,
                documentation: docString,
            };
        }

        getFormattingEditsForRange(line: number, col: number, endLine: number, endCol: number, fileName: string): protocol.CodeEdit[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var startPosition = compilerService.host.lineColToPosition(file, line, col);
            var endPosition = compilerService.host.lineColToPosition(file, endLine, endCol);
            
            // TODO: avoid duplicate code (with formatonkey)
            var edits = compilerService.languageService.getFormattingEditsForRange(file, startPosition, endPosition, compilerService.formatCodeOptions);
            if (!edits) {
                throw Errors.NoContent;
            }

            return edits.map((edit) => {
                return {
                    start: compilerService.host.positionToLineCol(file, edit.span.start),
                    end: compilerService.host.positionToLineCol(file, ts.textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        getFormattingEditsAfterKeystroke(line: number, col: number, key: string, fileName: string): protocol.CodeEdit[] {
            var file = ts.normalizePath(fileName);

            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineColToPosition(file, line, col);
            var edits = compilerService.languageService.getFormattingEditsAfterKeystroke(file, position, key,
                compilerService.formatCodeOptions); 
            if ((key == "\n") && ((!edits) || (edits.length == 0) || allEditsBeforePos(edits, position))) {
                // TODO: get these options from host
                var editorOptions: ts.EditorOptions = {
                    IndentSize: 4,
                    TabSize: 4,
                    NewLineCharacter: "\n",
                    ConvertTabsToSpaces: true,
                };
                var indentPosition = compilerService.languageService.getIndentationAtPosition(file, position, editorOptions);
                var spaces = generateSpaces(indentPosition);
                if (indentPosition > 0) {
                    edits.push({ span: ts.createTextSpanFromBounds(position, position), newText: spaces });
                }
            }

            if (!edits) {
                throw Errors.NoContent;
            }

            return edits.map((edit) => {
                return {
                    start: compilerService.host.positionToLineCol(file,
                        edit.span.start),
                    end: compilerService.host.positionToLineCol(file,
                        ts.textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        getCompletions(line: number, col: number, prefix: string, fileName: string): protocol.CompletionItem[] {
            if (!prefix) {
                prefix = "";
            }
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineColToPosition(file, line, col);

            var completions = compilerService.languageService.getCompletionsAtPosition(file, position);
            if (!completions) {
                throw Errors.NoContent;
            }

            return completions.entries.reduce((result: ts.CompletionEntryDetails[], entry: ts.CompletionEntry) => {
                if (completions.isMemberCompletion || entry.name.indexOf(prefix) == 0) {
                    var protoEntry = <ts.CompletionEntryDetails>{};
                    protoEntry.name = entry.name;
                    protoEntry.kind = entry.kind;
                    if (entry.kindModifiers && (entry.kindModifiers.length > 0)) {
                        protoEntry.kindModifiers = entry.kindModifiers;
                    }
                    var details = compilerService.languageService.getCompletionEntryDetails(file, position, entry.name);
                    if (details && (details.documentation) && (details.documentation.length > 0)) {
                        protoEntry.documentation = details.documentation;
                    }
                    if (details && (details.displayParts) && (details.displayParts.length > 0)) {
                        protoEntry.displayParts = details.displayParts;
                    }
                    result.push(protoEntry);
                }
                return result;
            }, []);
        }

        getDiagnostics(delay: number, fileNames: string[]) {
            var checkList = fileNames.reduce((accum: PendingErrorCheck[], fileName: string) => {
                fileName = ts.normalizePath(fileName);
                var project = this.projectService.getProjectForFile(fileName);
                if (project) {
                    accum.push({ fileName, project });
                }
                return accum;
            }, []);

            if (checkList.length > 0) {
                this.updateErrorCheck(checkList, this.changeSeq,(n) => n == this.changeSeq, delay)
            }
        }

        change(line: number, col: number, endLine: number, endCol: number, insertString: string, fileName: string) {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (project) {
                var compilerService = project.compilerService;
                var start = compilerService.host.lineColToPosition(file, line, col);
                var end = compilerService.host.lineColToPosition(file, endLine, endCol);
                if (start >= 0) {
                    compilerService.host.editScript(file, start, end, insertString);
                    this.changeSeq++;
                }
            }
        }

        reload(fileName: string, tempFileName: string, reqSeq = 0) {
            var file = ts.normalizePath(fileName);
            var tmpfile = ts.normalizePath(tempFileName);
            var project = this.projectService.getProjectForFile(file);
            if (project) {
                this.changeSeq++;
                // make sure no changes happen before this one is finished
                project.compilerService.host.reloadScript(file, tmpfile,() => {
                    this.output(undefined, CommandNames.Reload, reqSeq);
                });
            }
        }

        saveToTmp(fileName: string, tempFileName: string) {
            var file = ts.normalizePath(fileName);
            var tmpfile = ts.normalizePath(tempFileName);

            var project = this.projectService.getProjectForFile(file);
            if (project) {
                project.compilerService.host.saveTo(file, tmpfile);
            }
        }

        closeClientFile(fileName: string) {
            var file = ts.normalizePath(fileName);
            this.projectService.closeClientFile(file);
        }

        decorateNavigationBarItem(project: Project, fileName: string, items: ts.NavigationBarItem[]): protocol.NavigationBarItem[] {
            if (!items) {
                return undefined;
            }

            var compilerService = project.compilerService;

            return items.map(item => ({
                text: item.text,
                kind: item.kind,
                kindModifiers: item.kindModifiers,
                spans: item.spans.map(span => ({
                    start: compilerService.host.positionToLineCol(fileName, span.start),
                    end: compilerService.host.positionToLineCol(fileName, ts.textSpanEnd(span))
                })),
                childItems: this.decorateNavigationBarItem(project, fileName, item.childItems)
            }));
        }

        getNavigationBarItems(fileName: string): protocol.NavigationBarItem[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var items = compilerService.languageService.getNavigationBarItems(file);
            if (!items) {
                throw Errors.NoContent;
            }

            return this.decorateNavigationBarItem(project, fileName, items);
        }

        getNavigateToItems(searchTerm: string, fileName: string): protocol.NavtoItem[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var navItems = sortNavItems(compilerService.languageService.getNavigateToItems(searchTerm));
            if (!navItems) {
                throw Errors.NoContent;
            }

            return navItems.map((navItem) => {
                var start = compilerService.host.positionToLineCol(navItem.fileName, navItem.textSpan.start);
                var end = compilerService.host.positionToLineCol(navItem.fileName, ts.textSpanEnd(navItem.textSpan));
                var bakedItem: protocol.NavtoItem = {
                    name: navItem.name,
                    kind: navItem.kind,
                    file: navItem.fileName,
                    start: start,
                    end: end,
                };
                if (navItem.kindModifiers && (navItem.kindModifiers != "")) {
                    bakedItem.kindModifiers = navItem.kindModifiers;
                }
                if (navItem.matchKind != 'none') {
                    bakedItem.matchKind = navItem.matchKind;
                }
                if (navItem.containerName && (navItem.containerName.length > 0)) {
                    bakedItem.containerName = navItem.containerName;
                }
                if (navItem.containerKind && (navItem.containerKind.length > 0)) {
                    bakedItem.containerKind = navItem.containerKind;
                }
                return bakedItem;
            });
        }

        getBraceMatching(line: number, col: number, fileName: string): protocol.TextSpan[] {
            var file = ts.normalizePath(fileName);
            
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }
            
            var compilerService = project.compilerService;
            var position = compilerService.host.lineColToPosition(file, line, col);
            
            var spans = compilerService.languageService.getBraceMatchingAtPosition(file, position);
            if (!spans) {
                throw Errors.NoContent;
            }
            
            return spans.map(span => ({
                start: compilerService.host.positionToLineCol(file, span.start),
                end: compilerService.host.positionToLineCol(file, span.start + span.length)
            }));
        }

        onMessage(message: string) {
            try {
                var request = <protocol.Request>JSON.parse(message);
                var response: any;
                switch (request.command) {
                    case CommandNames.Definition: { 
                        var defArgs = <protocol.FileLocationRequestArgs>request.arguments;
                        response = this.getDefinition(defArgs.line, defArgs.col, defArgs.file);
                        break;
                    }
                    case CommandNames.References: { 
                        var refArgs = <protocol.FileLocationRequestArgs>request.arguments;
                        response = this.getReferences(refArgs.line, refArgs.col, refArgs.file);
                        break;
                    }
                    case CommandNames.Rename: {
                        var renameArgs = <protocol.RenameRequestArgs>request.arguments;
                        response = this.getRenameLocations(renameArgs.line, renameArgs.col, renameArgs.file, renameArgs.findInComments, renameArgs.findInStrings);
                        break;
                    }
                    case CommandNames.Open: {
                        var openArgs = <protocol.FileRequestArgs>request.arguments;
                        this.openClientFile(openArgs.file);
                        break;
                    }
                    case CommandNames.Quickinfo: {
                        var quickinfoArgs = <protocol.FileLocationRequestArgs>request.arguments;
                        response = this.getQuickInfo(quickinfoArgs.line, quickinfoArgs.col, quickinfoArgs.file);
                        break;
                    }
                    case CommandNames.Format: {
                        var formatArgs = <protocol.FormatRequestArgs>request.arguments;
                        response = this.getFormattingEditsForRange(formatArgs.line, formatArgs.col, formatArgs.endLine, formatArgs.endCol, formatArgs.file);
                        break;
                    }
                    case CommandNames.Formatonkey: {
                        var formatOnKeyArgs = <protocol.FormatOnKeyRequestArgs>request.arguments;
                        response = this.getFormattingEditsAfterKeystroke(formatOnKeyArgs.line, formatOnKeyArgs.col, formatOnKeyArgs.key, formatOnKeyArgs.file);
                        break;
                    }
                    case CommandNames.Completions: {
                        var completionsArgs = <protocol.CompletionsRequestArgs>request.arguments;
                        response = this.getCompletions(request.arguments.line, request.arguments.col, completionsArgs.prefix, request.arguments.file);
                        break;
                    }
                    case CommandNames.Geterr: {
                        var geterrArgs = <protocol.GeterrRequestArgs>request.arguments;
                        response = this.getDiagnostics(geterrArgs.delay, geterrArgs.files);
                        break;
                    }
                    case CommandNames.Change: {
                        var changeArgs = <protocol.ChangeRequestArgs>request.arguments;
                        this.change(changeArgs.line, changeArgs.col, changeArgs.endLine, changeArgs.endCol,
                                    changeArgs.insertString, changeArgs.file);
                        break;
                    }
                    case CommandNames.Reload: {
                        var reloadArgs = <protocol.ReloadRequestArgs>request.arguments;
                        this.reload(reloadArgs.file, reloadArgs.tmpfile, request.seq);
                        break;
                    }
                    case CommandNames.Saveto: {
                        var savetoArgs = <protocol.SavetoRequestArgs>request.arguments;
                        this.saveToTmp(savetoArgs.file, savetoArgs.tmpfile);
                        break;
                    }
                    case CommandNames.Close: {
                        var closeArgs = <protocol.FileRequestArgs>request.arguments;
                        this.closeClientFile(closeArgs.file);
                        break;
                    }
                    case CommandNames.Navto: {
                        var navtoArgs = <protocol.NavtoRequestArgs>request.arguments;
                        response = this.getNavigateToItems(navtoArgs.searchTerm, navtoArgs.file);
                        break;
                    }
                    case CommandNames.Brace: {
                        var braceArguments = <protocol.FileLocationRequestArgs>request.arguments;
                        response = this.getBraceMatching(braceArguments.line, braceArguments.col, braceArguments.file);
                        break;
                    }
                    case CommandNames.NavBar: {
                        var navBarArgs = <protocol.FileRequestArgs>request.arguments;
                        response = this.getNavigationBarItems(navBarArgs.file);
                        break;
                    }
                    default: {
                        this.projectService.log("Unrecognized JSON command: " + message);
                        this.output(undefined, CommandNames.Unknown, request.seq, "Unrecognized JSON command: " + request.command);
                        break;
                    }
                }

                if (response) {
                    this.output(response, request.command, request.seq);
                }

            } catch (err) {
                if (err instanceof OperationCanceledException) {
                    // Handle cancellation exceptions
                }
                this.logError(err, message);
                this.output(undefined, request ? request.command : CommandNames.Unknown, request ? request.seq : 0, "Error processing request. " + err.message);
            }
        }
    }
}
