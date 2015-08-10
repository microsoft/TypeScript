/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="editorServices.ts" />

namespace ts.server {
    var spaceCache:string[] = [];

    interface StackTraceError extends Error {
        stack?: string;
    }

    export function generateSpaces(n: number): string {
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
        else if (a === b) {
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
            if (n === 0) {
                return compareNumber(a.start.offset, b.start.offset);
            }
            else return n;
        }
        else {
            return 1;
        }
    }
       
    function formatDiag(fileName: string, project: Project, diag: ts.Diagnostic) {
        return {
            start: project.compilerService.host.positionToLineOffset(fileName, diag.start),
            end: project.compilerService.host.positionToLineOffset(fileName, diag.start + diag.length),
            text: ts.flattenDiagnosticMessageText(diag.messageText, "\n")
        };
    }

    export interface PendingErrorCheck {
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
        export const Brace = "brace";
        export const Change = "change";
        export const Close = "close";
        export const Completions = "completions";
        export const CompletionDetails = "completionEntryDetails";
        export const Configure = "configure";
        export const Definition = "definition";
        export const Exit = "exit";
        export const Format = "format";
        export const Formatonkey = "formatonkey";
        export const Geterr = "geterr";
        export const GeterrForProject = "geterrForProject";
        export const NavBar = "navbar";
        export const Navto = "navto";
        export const Occurrences = "occurrences";
        export const DocumentHighlights = "documentHighlights";
        export const Open = "open";
        export const Quickinfo = "quickinfo";
        export const References = "references";
        export const Reload = "reload";
        export const Rename = "rename";
        export const Saveto = "saveto";
        export const SignatureHelp = "signatureHelp";
        export const TypeDefinition = "typeDefinition";
        export const ProjectInfo = "projectInfo";
        export const Unknown = "unknown";
    }

    module Errors { 
        export var NoProject = new Error("No Project.");
    }

    export interface ServerHost extends ts.System {
    }

    export class Session {
        protected projectService: ProjectService;
        private pendingOperation = false;
        private fileHash: ts.Map<number> = {};
        private nextFileId = 1;
        private errorTimer: any; /*NodeJS.Timer | number*/
        private immediateId: any;
        private changeSeq = 0;

        constructor(
            private host: ServerHost, 
            private byteLength: (buf: string, encoding?: string) => number, 
            private hrtime: (start?: number[]) => number[], 
            private logger: Logger
        ) {
            this.projectService =
                new ProjectService(host, logger, (eventName,project,fileName) => {
                this.handleEvent(eventName, project, fileName);
            });
        }

        private handleEvent(eventName: string, project: Project, fileName: string) {
            if (eventName == "context") {
                this.projectService.log("got context event, updating diagnostics for" + fileName, "Info");
                this.updateErrorCheck([{ fileName, project }], this.changeSeq,
                    (n) => n === this.changeSeq, 100);
            }
        }

        public logError(err: Error, cmd: string) {
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

        private sendLineToClient(line: string) {
            this.host.write(line + this.host.newLine);
        }

        public send(msg: protocol.Message) {
            var json = JSON.stringify(msg);
            if (this.logger.isVerbose()) {
                this.logger.info(msg.type + ": " + json);
            }
            this.sendLineToClient('Content-Length: ' + (1 + this.byteLength(json, 'utf8')) +
                '\r\n\r\n' + json);
        }

        public event(info: any, eventName: string) {
            var ev: protocol.Event = {
                seq: 0,
                type: "event",
                event: eventName,
                body: info,
            };
            this.send(ev);
        }

        private response(info: any, cmdName: string, reqSeq = 0, errorMsg?: string) {
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

        public output(body: any, commandName: string, requestSequence = 0, errorMessage?: string) {
            this.response(body, commandName, requestSequence, errorMessage);
        }

        private semanticCheck(file: string, project: Project) {
            try {
                var diags = project.compilerService.languageService.getSemanticDiagnostics(file);

                if (diags) {
                    var bakedDiags = diags.map((diag) => formatDiag(file, project, diag));
                    this.event({ file: file, diagnostics: bakedDiags }, "semanticDiag");
                }
            }
            catch (err) {
                this.logError(err, "semantic check");
            }
        }

        private syntacticCheck(file: string, project: Project) {
            try {
                var diags = project.compilerService.languageService.getSyntacticDiagnostics(file);
                if (diags) {
                    var bakedDiags = diags.map((diag) => formatDiag(file, project, diag));
                    this.event({ file: file, diagnostics: bakedDiags }, "syntaxDiag");
                }
            }
            catch (err) {
                this.logError(err, "syntactic check");
            }
        }

        private errorCheck(file: string, project: Project) {
            this.syntacticCheck(file, project);
            this.semanticCheck(file, project);
        }

        private updateProjectStructure(seq: number, matchSeq: (seq: number) => boolean, ms = 1500) {
            setTimeout(() => {
                if (matchSeq(seq)) {
                    this.projectService.updateProjectStructure();
                }
            }, ms);
        }

        private updateErrorCheck(checkList: PendingErrorCheck[], seq: number,
            matchSeq: (seq: number) => boolean, ms = 1500, followMs = 200, requireOpen = true) {
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
                    if (checkSpec.project.getSourceFileFromName(checkSpec.fileName, requireOpen)) {
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

        private getDefinition(line: number, offset: number, fileName: string): protocol.FileSpan[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);

            var definitions = compilerService.languageService.getDefinitionAtPosition(file, position);
            if (!definitions) {
                return undefined;
            }

            return definitions.map(def => ({
                file: def.fileName,
                start: compilerService.host.positionToLineOffset(def.fileName, def.textSpan.start),
                end: compilerService.host.positionToLineOffset(def.fileName, ts.textSpanEnd(def.textSpan))
            }));
        }

        private getTypeDefinition(line: number, offset: number, fileName: string): protocol.FileSpan[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);

            var definitions = compilerService.languageService.getTypeDefinitionAtPosition(file, position);
            if (!definitions) {
                return undefined;
            }

            return definitions.map(def => ({
                file: def.fileName,
                start: compilerService.host.positionToLineOffset(def.fileName, def.textSpan.start),
                end: compilerService.host.positionToLineOffset(def.fileName, ts.textSpanEnd(def.textSpan))
            }));
        }

        private getOccurrences(line: number, offset: number, fileName: string): protocol.OccurrencesResponseItem[] {
            fileName = ts.normalizePath(fileName);
            let project = this.projectService.getProjectForFile(fileName);

            if (!project) {
                throw Errors.NoProject;
            }

            let { compilerService } = project;
            let position = compilerService.host.lineOffsetToPosition(fileName, line, offset);

            let occurrences = compilerService.languageService.getOccurrencesAtPosition(fileName, position);

            if (!occurrences) {
                return undefined;
            }

            return occurrences.map(occurrence => {
                let { fileName, isWriteAccess, textSpan } = occurrence;
                let start = compilerService.host.positionToLineOffset(fileName, textSpan.start);
                let end = compilerService.host.positionToLineOffset(fileName, ts.textSpanEnd(textSpan));
                return {
                    start,
                    end,
                    file: fileName,
                    isWriteAccess
                }
            });
        }

        private getDocumentHighlights(line: number, offset: number, fileName: string, filesToSearch: string[]): protocol.DocumentHighlightsItem[] {
            fileName = ts.normalizePath(fileName);
            let project = this.projectService.getProjectForFile(fileName);

            if (!project) {
                throw Errors.NoProject;
            }

            let { compilerService } = project;
            let position = compilerService.host.lineOffsetToPosition(fileName, line, offset);
            
            let documentHighlights = compilerService.languageService.getDocumentHighlights(fileName, position, filesToSearch);
            
            if (!documentHighlights) {
                return undefined;
            }

            return documentHighlights.map(convertToDocumentHighlightsItem);

            function convertToDocumentHighlightsItem(documentHighlights: ts.DocumentHighlights): ts.server.protocol.DocumentHighlightsItem {
                let { fileName, highlightSpans } = documentHighlights;

                return {
                    file: fileName,
                    highlightSpans: highlightSpans.map(convertHighlightSpan)
                };

                function convertHighlightSpan(highlightSpan: ts.HighlightSpan): ts.server.protocol.HighlightSpan {
                    let { textSpan, kind } = highlightSpan;
                    let start = compilerService.host.positionToLineOffset(fileName, textSpan.start);
                    let end = compilerService.host.positionToLineOffset(fileName, ts.textSpanEnd(textSpan));
                    return { start, end, kind };
                }
            }
        }

        private getProjectInfo(fileName: string, needFileNameList: boolean): protocol.ProjectInfo {
            fileName = ts.normalizePath(fileName)
            let project = this.projectService.getProjectForFile(fileName)

            let projectInfo: protocol.ProjectInfo = {
                configFileName: project.projectFilename
            }

            if (needFileNameList) {
                projectInfo.fileNames = project.getFileNames();
            }

            return projectInfo;
        }

        private getRenameLocations(line: number, offset: number, fileName: string,findInComments: boolean, findInStrings: boolean): protocol.RenameResponseBody {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);
            var renameInfo = compilerService.languageService.getRenameInfo(file, position);
            if (!renameInfo) {
                return undefined;
            }

            if (!renameInfo.canRename) {
                return {
                    info: renameInfo,
                    locs: []
                };
            }

            var renameLocations = compilerService.languageService.findRenameLocations(file, position, findInStrings, findInComments);
            if (!renameLocations) {
                return undefined;
            }

            var bakedRenameLocs = renameLocations.map(location => (<protocol.FileSpan>{
                file: location.fileName,
                start: compilerService.host.positionToLineOffset(location.fileName, location.textSpan.start),
                end: compilerService.host.positionToLineOffset(location.fileName, ts.textSpanEnd(location.textSpan)),
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
                        return b.start.offset - a.start.offset;
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

        private getReferences(line: number, offset: number, fileName: string): protocol.ReferencesResponseBody {
            // TODO: get all projects for this file; report refs for all projects deleting duplicates
            // can avoid duplicates by eliminating same ref file from subsequent projects
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);

            var references = compilerService.languageService.getReferencesAtPosition(file, position);
            if (!references) {
                return undefined;
            }

            var nameInfo = compilerService.languageService.getQuickInfoAtPosition(file, position);
            if (!nameInfo) {
                return undefined;
            }

            var displayString = ts.displayPartsToString(nameInfo.displayParts);
            var nameSpan = nameInfo.textSpan;
            var nameColStart = compilerService.host.positionToLineOffset(file, nameSpan.start).offset;
            var nameText = compilerService.host.getScriptSnapshot(file).getText(nameSpan.start, ts.textSpanEnd(nameSpan));
            var bakedRefs: protocol.ReferencesResponseItem[] = references.map(ref => {
                var start = compilerService.host.positionToLineOffset(ref.fileName, ref.textSpan.start);
                var refLineSpan = compilerService.host.lineToTextSpan(ref.fileName, start.line - 1);
                var snap = compilerService.host.getScriptSnapshot(ref.fileName);
                var lineText = snap.getText(refLineSpan.start, ts.textSpanEnd(refLineSpan)).replace(/\r|\n/g, "");
                return {
                    file: ref.fileName,
                    start: start,
                    lineText: lineText,
                    end: compilerService.host.positionToLineOffset(ref.fileName, ts.textSpanEnd(ref.textSpan)),
                    isWriteAccess: ref.isWriteAccess
                };
            }).sort(compareFileStart);
            return {
                refs: bakedRefs,
                symbolName: nameText,
                symbolStartOffset: nameColStart,
                symbolDisplayString: displayString
            };
        }

        private openClientFile(fileName: string) {
            var file = ts.normalizePath(fileName);
            this.projectService.openClientFile(file);
        }

        private getQuickInfo(line: number, offset: number, fileName: string): protocol.QuickInfoResponseBody {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);
            var quickInfo = compilerService.languageService.getQuickInfoAtPosition(file, position);
            if (!quickInfo) {
                return undefined;
            }

            var displayString = ts.displayPartsToString(quickInfo.displayParts);
            var docString = ts.displayPartsToString(quickInfo.documentation);
            return {
                kind: quickInfo.kind,
                kindModifiers: quickInfo.kindModifiers,
                start: compilerService.host.positionToLineOffset(file, quickInfo.textSpan.start),
                end: compilerService.host.positionToLineOffset(file, ts.textSpanEnd(quickInfo.textSpan)),
                displayString: displayString,
                documentation: docString,
            };
        }

        private getFormattingEditsForRange(line: number, offset: number, endLine: number, endOffset: number, fileName: string): protocol.CodeEdit[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var startPosition = compilerService.host.lineOffsetToPosition(file, line, offset);
            var endPosition = compilerService.host.lineOffsetToPosition(file, endLine, endOffset);
            
            // TODO: avoid duplicate code (with formatonkey)
            var edits = compilerService.languageService.getFormattingEditsForRange(file, startPosition, endPosition,
                this.projectService.getFormatCodeOptions(file));
            if (!edits) {
                return undefined;
            }

            return edits.map((edit) => {
                return {
                    start: compilerService.host.positionToLineOffset(file, edit.span.start),
                    end: compilerService.host.positionToLineOffset(file, ts.textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        private getFormattingEditsAfterKeystroke(line: number, offset: number, key: string, fileName: string): protocol.CodeEdit[] {
            var file = ts.normalizePath(fileName);

            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);
            var formatOptions = this.projectService.getFormatCodeOptions(file);
            var edits = compilerService.languageService.getFormattingEditsAfterKeystroke(file, position, key,
                formatOptions);
            // Check whether we should auto-indent. This will be when
            // the position is on a line containing only whitespace.
            // This should leave the edits returned from
            // getFormattingEditsAfterKeytroke either empty or pertaining
            // only to the previous line.  If all this is true, then
            // add edits necessary to properly indent the current line.
            if ((key == "\n") && ((!edits) || (edits.length === 0) || allEditsBeforePos(edits, position))) {
                var scriptInfo = compilerService.host.getScriptInfo(file);
                if (scriptInfo) {
                    var lineInfo = scriptInfo.getLineInfo(line);
                    if (lineInfo && (lineInfo.leaf) && (lineInfo.leaf.text)) {
                        var lineText = lineInfo.leaf.text;
                        if (lineText.search("\\S") < 0) {
                            // TODO: get these options from host
                            var editorOptions: ts.EditorOptions = {
                                IndentSize: formatOptions.IndentSize,
                                TabSize: formatOptions.TabSize,
                                NewLineCharacter: "\n",
                                ConvertTabsToSpaces: formatOptions.ConvertTabsToSpaces,
                            };
                            var indentPosition =
                                compilerService.languageService.getIndentationAtPosition(file, position, editorOptions);
                            for (var i = 0, len = lineText.length; i < len; i++) {
                                if (lineText.charAt(i) == " ") {
                                    indentPosition--;
                                }
                                else if (lineText.charAt(i) == "\t") {
                                    indentPosition -= editorOptions.IndentSize;
                                }
                                else {
                                    break;
                                }
                            }
                            if (indentPosition > 0) {
                                var spaces = generateSpaces(indentPosition);
                                edits.push({ span: ts.createTextSpanFromBounds(position, position), newText: spaces });
                            }
                            else if (indentPosition < 0) {
                                edits.push({
                                    span: ts.createTextSpanFromBounds(position, position - indentPosition),
                                    newText: ""
                                });
                            }
                        }
                    }
                }
            }

            if (!edits) {
                return undefined;
            }

            return edits.map((edit) => {
                return {
                    start: compilerService.host.positionToLineOffset(file,
                        edit.span.start),
                    end: compilerService.host.positionToLineOffset(file,
                        ts.textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        private getCompletions(line: number, offset: number, prefix: string, fileName: string): protocol.CompletionEntry[] {
            if (!prefix) {
                prefix = "";
            }
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);

            var completions = compilerService.languageService.getCompletionsAtPosition(file, position);
            if (!completions) {
                return undefined;
            }

            return completions.entries.reduce((result: protocol.CompletionEntry[], entry: ts.CompletionEntry) => {
                if (completions.isMemberCompletion || (entry.name.toLowerCase().indexOf(prefix.toLowerCase()) === 0)) {
                    result.push(entry);
                }
                return result;
            }, []).sort((a, b) => a.name.localeCompare(b.name));
        }

        private getCompletionEntryDetails(line: number, offset: number,
            entryNames: string[], fileName: string): protocol.CompletionEntryDetails[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);

            return entryNames.reduce((accum: protocol.CompletionEntryDetails[], entryName: string) => {
                var details = compilerService.languageService.getCompletionEntryDetails(file, position, entryName);
                if (details) {
                    accum.push(details);
                }
                return accum;
            }, []);
        }

        private getSignatureHelpItems(line: number, offset: number, fileName: string): protocol.SignatureHelpItems {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }
            
            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);
            var helpItems = compilerService.languageService.getSignatureHelpItems(file, position);
            if (!helpItems) {
                return undefined;
            }
            
            var span = helpItems.applicableSpan;
            var result: protocol.SignatureHelpItems = {
                items: helpItems.items,
                applicableSpan: {
                    start: compilerService.host.positionToLineOffset(file, span.start),
                    end: compilerService.host.positionToLineOffset(file, span.start + span.length)
                },
                selectedItemIndex: helpItems.selectedItemIndex,
                argumentIndex: helpItems.argumentIndex,
                argumentCount: helpItems.argumentCount,
            }
            
            return result;
        }
                
        private getDiagnostics(delay: number, fileNames: string[]) {
            var checkList = fileNames.reduce((accum: PendingErrorCheck[], fileName: string) => {
                fileName = ts.normalizePath(fileName);
                var project = this.projectService.getProjectForFile(fileName);
                if (project) {
                    accum.push({ fileName, project });
                }
                return accum;
            }, []);

            if (checkList.length > 0) {
                this.updateErrorCheck(checkList, this.changeSeq,(n) => n === this.changeSeq, delay)
            }
        }

        private change(line: number, offset: number, endLine: number, endOffset: number, insertString: string, fileName: string) {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (project) {
                var compilerService = project.compilerService;
                var start = compilerService.host.lineOffsetToPosition(file, line, offset);
                var end = compilerService.host.lineOffsetToPosition(file, endLine, endOffset);
                if (start >= 0) {
                    compilerService.host.editScript(file, start, end, insertString);
                    this.changeSeq++;
                }
                this.updateProjectStructure(this.changeSeq, (n) => n === this.changeSeq);
            }
        }

        private reload(fileName: string, tempFileName: string, reqSeq = 0) {
            var file = ts.normalizePath(fileName);
            var tmpfile = ts.normalizePath(tempFileName);
            var project = this.projectService.getProjectForFile(file);
            if (project) {
                this.changeSeq++;
                // make sure no changes happen before this one is finished
                project.compilerService.host.reloadScript(file, tmpfile, () => {
                    this.output(undefined, CommandNames.Reload, reqSeq);
                });
            }
        }

        private saveToTmp(fileName: string, tempFileName: string) {
            var file = ts.normalizePath(fileName);
            var tmpfile = ts.normalizePath(tempFileName);

            var project = this.projectService.getProjectForFile(file);
            if (project) {
                project.compilerService.host.saveTo(file, tmpfile);
            }
        }

        private closeClientFile(fileName: string) {
            var file = ts.normalizePath(fileName);
            this.projectService.closeClientFile(file);
        }

        private decorateNavigationBarItem(project: Project, fileName: string, items: ts.NavigationBarItem[]): protocol.NavigationBarItem[] {
            if (!items) {
                return undefined;
            }

            var compilerService = project.compilerService;

            return items.map(item => ({
                text: item.text,
                kind: item.kind,
                kindModifiers: item.kindModifiers,
                spans: item.spans.map(span => ({
                    start: compilerService.host.positionToLineOffset(fileName, span.start),
                    end: compilerService.host.positionToLineOffset(fileName, ts.textSpanEnd(span))
                })),
                childItems: this.decorateNavigationBarItem(project, fileName, item.childItems)
            }));
        }

        private getNavigationBarItems(fileName: string): protocol.NavigationBarItem[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var items = compilerService.languageService.getNavigationBarItems(file);
            if (!items) {
                return undefined;
            }

            return this.decorateNavigationBarItem(project, fileName, items);
        }

        private getNavigateToItems(searchValue: string, fileName: string, maxResultCount?: number): protocol.NavtoItem[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var navItems = compilerService.languageService.getNavigateToItems(searchValue, maxResultCount);
            if (!navItems) {
                return undefined;
            }

            return navItems.map((navItem) => {
                var start = compilerService.host.positionToLineOffset(navItem.fileName, navItem.textSpan.start);
                var end = compilerService.host.positionToLineOffset(navItem.fileName, ts.textSpanEnd(navItem.textSpan));
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

        private getBraceMatching(line: number, offset: number, fileName: string): protocol.TextSpan[] {
            var file = ts.normalizePath(fileName);
            
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }
            
            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);
            
            var spans = compilerService.languageService.getBraceMatchingAtPosition(file, position);
            if (!spans) {
                return undefined;
            }
            
            return spans.map(span => ({
                start: compilerService.host.positionToLineOffset(file, span.start),
                end: compilerService.host.positionToLineOffset(file, span.start + span.length)
            }));
        }

        getDiagnosticsForProject(delay: number, fileName: string) {
            let { configFileName, fileNames: fileNamesInProject } = this.getProjectInfo(fileName, true);
            // No need to analyze lib.d.ts
            fileNamesInProject = fileNamesInProject.filter((value, index, array) => value.indexOf("lib.d.ts") < 0);

            // Sort the file name list to make the recently touched files come first
            let highPriorityFiles: string[] = [];
            let mediumPriorityFiles: string[] = [];
            let lowPriorityFiles: string[] = [];
            let veryLowPriorityFiles: string[] = [];
            let normalizedFileName = ts.normalizePath(fileName);
            let project = this.projectService.getProjectForFile(normalizedFileName);
            for (let fileNameInProject of fileNamesInProject) {
                if (this.getCanonicalFileName(fileNameInProject) == this.getCanonicalFileName(fileName))
                    highPriorityFiles.push(fileNameInProject);
                else {
                    let info = this.projectService.getScriptInfo(fileNameInProject);
                    if (!info.isOpen) {
                        if (fileNameInProject.indexOf(".d.ts") > 0)
                            veryLowPriorityFiles.push(fileNameInProject);
                        else
                            lowPriorityFiles.push(fileNameInProject);
                    }
                    else
                        mediumPriorityFiles.push(fileNameInProject);
                }
            }

            fileNamesInProject = highPriorityFiles.concat(mediumPriorityFiles).concat(lowPriorityFiles).concat(veryLowPriorityFiles);

            if (fileNamesInProject.length > 0) {
                let checkList = fileNamesInProject.map<PendingErrorCheck>((fileName: string) => {
                    let normalizedFileName = ts.normalizePath(fileName);
                    return { fileName: normalizedFileName, project };
                });
                // Project level error analysis runs on background files too, therefore
                // doesn't require the file to be opened
                this.updateErrorCheck(checkList, this.changeSeq, (n) => n == this.changeSeq, delay, 200, /*requireOpen*/ false);
            }
        }

        getCanonicalFileName(fileName: string) {
            let name = this.host.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
            return ts.normalizePath(name);
        }

        exit() {
        }

        private handlers : Map<(request: protocol.Request) => {response?: any, responseRequired?: boolean}> = {
            [CommandNames.Exit]: () => {
                this.exit();
                return { responseRequired: false};
            },
            [CommandNames.Definition]: (request: protocol.Request) => {
                var defArgs = <protocol.FileLocationRequestArgs>request.arguments;
                return {response: this.getDefinition(defArgs.line, defArgs.offset, defArgs.file), responseRequired: true};
            },
            [CommandNames.TypeDefinition]: (request: protocol.Request) => {
                var defArgs = <protocol.FileLocationRequestArgs>request.arguments;
                return {response: this.getTypeDefinition(defArgs.line, defArgs.offset, defArgs.file), responseRequired: true};
            },
            [CommandNames.References]: (request: protocol.Request) => {
                var defArgs = <protocol.FileLocationRequestArgs>request.arguments;
                return {response: this.getReferences(defArgs.line, defArgs.offset, defArgs.file), responseRequired: true};
            },
            [CommandNames.Rename]: (request: protocol.Request) => {
                var renameArgs = <protocol.RenameRequestArgs>request.arguments;
                return {response: this.getRenameLocations(renameArgs.line, renameArgs.offset, renameArgs.file, renameArgs.findInComments, renameArgs.findInStrings), responseRequired: true}
            },
            [CommandNames.Open]: (request: protocol.Request) => {
                var openArgs = <protocol.OpenRequestArgs>request.arguments;
                this.openClientFile(openArgs.file);
                return {responseRequired: false}
            },
            [CommandNames.Quickinfo]: (request: protocol.Request) => {
                var quickinfoArgs = <protocol.FileLocationRequestArgs>request.arguments;
                return {response: this.getQuickInfo(quickinfoArgs.line, quickinfoArgs.offset, quickinfoArgs.file), responseRequired: true};
            },
            [CommandNames.Format]: (request: protocol.Request) => {
                var formatArgs = <protocol.FormatRequestArgs>request.arguments;
                return {response: this.getFormattingEditsForRange(formatArgs.line, formatArgs.offset, formatArgs.endLine, formatArgs.endOffset, formatArgs.file), responseRequired: true};
            },
            [CommandNames.Formatonkey]: (request: protocol.Request) => {
                var formatOnKeyArgs = <protocol.FormatOnKeyRequestArgs>request.arguments;
                return {response: this.getFormattingEditsAfterKeystroke(formatOnKeyArgs.line, formatOnKeyArgs.offset, formatOnKeyArgs.key, formatOnKeyArgs.file), responseRequired: true};
            },
            [CommandNames.Completions]: (request: protocol.Request) => {
                var completionsArgs = <protocol.CompletionsRequestArgs>request.arguments;
                return {response: this.getCompletions(completionsArgs.line, completionsArgs.offset, completionsArgs.prefix, completionsArgs.file), responseRequired: true}
            },
            [CommandNames.CompletionDetails]: (request: protocol.Request) => {
                var completionDetailsArgs = <protocol.CompletionDetailsRequestArgs>request.arguments;
                return {response: this.getCompletionEntryDetails(completionDetailsArgs.line,completionDetailsArgs.offset,
                                                                  completionDetailsArgs.entryNames,completionDetailsArgs.file), responseRequired: true}
            },
            [CommandNames.SignatureHelp]: (request: protocol.Request) => {
                var signatureHelpArgs = <protocol.SignatureHelpRequestArgs>request.arguments;
                return {response: this.getSignatureHelpItems(signatureHelpArgs.line, signatureHelpArgs.offset, signatureHelpArgs.file), responseRequired: true}
            },
            [CommandNames.Geterr]: (request: protocol.Request) => {
                var geterrArgs = <protocol.GeterrRequestArgs>request.arguments;
                return {response: this.getDiagnostics(geterrArgs.delay, geterrArgs.files), responseRequired: false};
            },
            [CommandNames.GeterrForProject]: (request: protocol.Request) => {
                let { file, delay } = <protocol.GeterrForProjectRequestArgs>request.arguments;
                return {response: this.getDiagnosticsForProject(delay, file), responseRequired: false};
            },
            [CommandNames.Change]: (request: protocol.Request) => {
                var changeArgs = <protocol.ChangeRequestArgs>request.arguments;
                this.change(changeArgs.line, changeArgs.offset, changeArgs.endLine, changeArgs.endOffset,
                            changeArgs.insertString, changeArgs.file);
                return {responseRequired: false}
            },
            [CommandNames.Configure]: (request: protocol.Request) => {
                var configureArgs = <protocol.ConfigureRequestArguments>request.arguments;
                this.projectService.setHostConfiguration(configureArgs);
                this.output(undefined, CommandNames.Configure, request.seq);
                return {responseRequired: false}
            },
            [CommandNames.Reload]: (request: protocol.Request) => {
                var reloadArgs = <protocol.ReloadRequestArgs>request.arguments;
                this.reload(reloadArgs.file, reloadArgs.tmpfile, request.seq);
                return {responseRequired: false}
            },
            [CommandNames.Saveto]: (request: protocol.Request) => {
                var savetoArgs = <protocol.SavetoRequestArgs>request.arguments;
                this.saveToTmp(savetoArgs.file, savetoArgs.tmpfile);
                return {responseRequired: false}
            },
            [CommandNames.Close]: (request: protocol.Request) => {
                var closeArgs = <protocol.FileRequestArgs>request.arguments;
                this.closeClientFile(closeArgs.file);
                return {responseRequired: false};
            },
            [CommandNames.Navto]: (request: protocol.Request) => {
                var navtoArgs = <protocol.NavtoRequestArgs>request.arguments;
                return {response: this.getNavigateToItems(navtoArgs.searchValue, navtoArgs.file, navtoArgs.maxResultCount), responseRequired: true};
            },
            [CommandNames.Brace]: (request: protocol.Request) => {
                var braceArguments = <protocol.FileLocationRequestArgs>request.arguments;
                return {response: this.getBraceMatching(braceArguments.line, braceArguments.offset, braceArguments.file), responseRequired: true};
            },
            [CommandNames.NavBar]: (request: protocol.Request) => {
                var navBarArgs = <protocol.FileRequestArgs>request.arguments;
                return {response: this.getNavigationBarItems(navBarArgs.file), responseRequired: true};
            },
            [CommandNames.Occurrences]: (request: protocol.Request) => {
                var { line, offset, file: fileName } = <protocol.FileLocationRequestArgs>request.arguments;
                return {response: this.getOccurrences(line, offset, fileName), responseRequired: true};
            },
            [CommandNames.DocumentHighlights]: (request: protocol.Request) => {
                var { line, offset, file: fileName, filesToSearch } = <protocol.DocumentHighlightsRequestArgs>request.arguments;
                return {response: this.getDocumentHighlights(line, offset, fileName, filesToSearch), responseRequired: true};
            },
            [CommandNames.ProjectInfo]: (request: protocol.Request) => {
                var { file, needFileNameList } = <protocol.ProjectInfoRequestArgs>request.arguments;
                return {response: this.getProjectInfo(file, needFileNameList), responseRequired: true};
            },
        };
        public addProtocolHandler(command: string, handler: (request: protocol.Request) => {response?: any, responseRequired: boolean}) {
            if (this.handlers[command]) {
                throw new Error(`Protocol handler already exists for command "${command}"`);
            }
            this.handlers[command] = handler;
        }

        public executeCommand(request: protocol.Request) : {response?: any, responseRequired?: boolean} {
            var handler = this.handlers[request.command];
            if (handler) {
                return handler(request);
            } else {
                this.projectService.log("Unrecognized JSON command: " + JSON.stringify(request));
                this.output(undefined, CommandNames.Unknown, request.seq, "Unrecognized JSON command: " + request.command);
                return {responseRequired: false};
            }
        }

        public onMessage(message: string) {
            if (this.logger.isVerbose()) {
                this.logger.info("request: " + message);
                var start = this.hrtime();                
            }
            try {
                var request = <protocol.Request>JSON.parse(message);
                var {response, responseRequired} = this.executeCommand(request);

                if (this.logger.isVerbose()) {
                    var elapsed = this.hrtime(start);
                    var seconds = elapsed[0]
                    var nanoseconds = elapsed[1];
                    var elapsedMs = ((1e9 * seconds) + nanoseconds)/1000000.0;
                    var leader = "Elapsed time (in milliseconds)";
                    if (!responseRequired) {
                        leader = "Async elapsed time (in milliseconds)";
                    }
                    this.logger.msg(leader + ": " + elapsedMs.toFixed(4).toString(), "Perf");
                }
                if (response) {
                    this.output(response, request.command, request.seq);
                }
                else if (responseRequired) {
                    this.output(undefined, request.command, request.seq, "No content available.");
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
