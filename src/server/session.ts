/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="editorServices.ts" />

namespace ts.server {
    const spaceCache: string[] = [];

    interface StackTraceError extends Error {
        stack?: string;
    }

    export function generateSpaces(n: number): string {
        if (!spaceCache[n]) {
            let strBuilder = "";
            for (let i = 0; i < n; i++) {
                strBuilder += " ";
            }
            spaceCache[n] = strBuilder;
        }
        return spaceCache[n];
    }

    export function generateIndentString(n: number, editorOptions: EditorOptions): string {
        if (editorOptions.ConvertTabsToSpaces) {
            return generateSpaces(n);
        }
        else {
            let result = "";
            for (let i = 0; i < Math.floor(n / editorOptions.TabSize); i++) {
                result += "\t";
            }
            for (let i = 0; i < n % editorOptions.TabSize; i++) {
                result += " ";
            }
            return result;
        }
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
            const n = compareNumber(a.start.line, b.start.line);
            if (n === 0) {
                return compareNumber(a.start.offset, b.start.offset);
            }
            else return n;
        }
        else {
            return 1;
        }
    }

    function formatDiag(fileName: string, project: Project, diag: ts.Diagnostic): protocol.Diagnostic {
        const scriptInfo = project.getScriptInfo(fileName);
        return {
            start: scriptInfo.positionToLineOffset(diag.start),
            end: scriptInfo.positionToLineOffset(diag.start + diag.length),
            text: ts.flattenDiagnosticMessageText(diag.messageText, "\n")
        };
    }

    function formatConfigFileDiag(diag: ts.Diagnostic): protocol.Diagnostic {
        return {
            start: undefined,
            end: undefined,
            text: ts.flattenDiagnosticMessageText(diag.messageText, "\n")
        };
    }

    export interface PendingErrorCheck {
        fileName: NormalizedPath;
        project: Project;
    }

    function allEditsBeforePos(edits: ts.TextChange[], pos: number) {
        for (let i = 0, len = edits.length; i < len; i++) {
            if (ts.textSpanEnd(edits[i].span) >= pos) {
                return false;
            }
        }
        return true;
    }

    export namespace CommandNames {
        export const Brace = "brace";
        export const BraceFull = "brace-full";
        export const BraceCompletion = "braceCompletion";
        export const Change = "change";
        export const Close = "close";
        export const Completions = "completions";
        export const CompletionsFull = "completions-full";
        export const CompletionDetails = "completionEntryDetails";
        export const Configure = "configure";
        export const Definition = "definition";
        export const DefinitionFull = "definition-full";
        export const Exit = "exit";
        export const Format = "format";
        export const Formatonkey = "formatonkey";
        export const FormatFull = "format-full";
        export const FormatonkeyFull = "formatonkey-full";
        export const FormatRangeFull = "formatRange-full";
        export const Geterr = "geterr";
        export const GeterrForProject = "geterrForProject";
        export const SemanticDiagnosticsFull = "semanticDiagnostics-full";
        export const NavBar = "navbar";
        export const NavBarFull = "navbar-full";
        export const Navto = "navto";
        export const NavtoFull = "navto-full";
        export const Occurrences = "occurrences";
        export const DocumentHighlights = "documentHighlights";
        export const DocumentHighlightsFull = "documentHighlights-full";
        export const Open = "open";
        export const Quickinfo = "quickinfo";
        export const QuickinfoFull = "quickinfo-full";
        export const References = "references";
        export const ReferencesFull = "references-full";
        export const Reload = "reload";
        export const Rename = "rename";
        export const RenameInfoFull = "rename-full";
        export const RenameLocationsFull = "renameLocations-full";
        export const Saveto = "saveto";
        export const SignatureHelp = "signatureHelp";
        export const SignatureHelpFull = "signatureHelp-full";
        export const TypeDefinition = "typeDefinition";
        export const ProjectInfo = "projectInfo";
        export const ReloadProjects = "reloadProjects";
        export const Unknown = "unknown";
        export const OpenExternalProject = "openExternalProject";
        export const OpenExternalProjects = "openExternalProjects";
        export const CloseExternalProject = "closeExternalProject";
        export const SynchronizeProjectList = "synchronizeProjectList";
        export const ApplyChangedToOpenFiles = "applyChangedToOpenFiles";
        export const EncodedSemanticClassificationsFull = "encodedSemanticClassifications-full";
        export const Cleanup = "cleanup";
        export const OutliningSpans = "outliningSpans";
        export const TodoComments = "todoComments";
        export const Indentation = "indentation";
        export const DocCommentTemplate = "docCommentTemplate";
        export const SyntacticDiagnosticsFull = "syntacticDiagnostics-full";
        export const CompilerOptionsDiagnosticsFull = "compilerOptionsDiagnostics-full";
        export const NameOrDottedNameSpan = "nameOrDottedNameSpan";
        export const BreakpointStatement = "breakpointStatement";
    }

    namespace Errors {
        export const NoProject = new Error("No Project.");
    }

    export interface ServerHost extends ts.System {
        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout(timeoutId: any): void;
    }

    export class Session {
        protected projectService: ProjectService;
        private errorTimer: any; /*NodeJS.Timer | number*/
        private immediateId: any;
        private changeSeq = 0;

        constructor(
            private host: ServerHost,
            private cancellationToken: HostCancellationToken,
            private byteLength: (buf: string, encoding?: string) => number,
            private hrtime: (start?: number[]) => number[],
            private logger: Logger) {
            this.projectService =
                new ProjectService(host, logger, cancellationToken, (eventName, project, fileName) => {
                    this.handleEvent(eventName, project, fileName);
                });
        }

        private handleEvent(eventName: string, project: Project, fileName: NormalizedPath) {
            if (eventName == "context") {
                this.projectService.log("got context event, updating diagnostics for" + fileName, "Info");
                this.updateErrorCheck([{ fileName, project }], this.changeSeq,
                    (n) => n === this.changeSeq, 100);
            }
        }

        public logError(err: Error, cmd: string) {
            const typedErr = <StackTraceError>err;
            let msg = "Exception on executing command " + cmd;
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
            const json = JSON.stringify(msg);
            if (this.logger.isVerbose()) {
                this.logger.info(msg.type + ": " + json);
            }
            this.sendLineToClient("Content-Length: " + (1 + this.byteLength(json, "utf8")) +
                "\r\n\r\n" + json);
        }

        public configFileDiagnosticEvent(triggerFile: string, configFile: string, diagnostics: ts.Diagnostic[]) {
            const bakedDiags = ts.map(diagnostics, formatConfigFileDiag);
            const ev: protocol.ConfigFileDiagnosticEvent = {
                seq: 0,
                type: "event",
                event: "configFileDiag",
                body: {
                    triggerFile,
                    configFile,
                    diagnostics: bakedDiags
                }
            };
            this.send(ev);
        }

        public event(info: any, eventName: string) {
            const ev: protocol.Event = {
                seq: 0,
                type: "event",
                event: eventName,
                body: info,
            };
            this.send(ev);
        }

        private response(info: any, cmdName: string, reqSeq = 0, errorMsg?: string) {
            const res: protocol.Response = {
                seq: 0,
                type: "response",
                command: cmdName,
                request_seq: reqSeq,
                success: !errorMsg,
            };
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

        private getLocation(position: number, scriptInfo: ScriptInfo): protocol.Location {
            const { line, offset } = scriptInfo.positionToLineOffset(position);
            return { line, offset: offset + 1 };
        }

        private semanticCheck(file: string, project: Project) {
            try {
                const diags = project.languageService.getSemanticDiagnostics(file);

                if (diags) {
                    const bakedDiags = diags.map((diag) => formatDiag(file, project, diag));
                    this.event({ file: file, diagnostics: bakedDiags }, "semanticDiag");
                }
            }
            catch (err) {
                this.logError(err, "semantic check");
            }
        }

        private syntacticCheck(file: string, project: Project) {
            try {
                const diags = project.languageService.getSyntacticDiagnostics(file);
                if (diags) {
                    const bakedDiags = diags.map((diag) => formatDiag(file, project, diag));
                    this.event({ file: file, diagnostics: bakedDiags }, "syntaxDiag");
                }
            }
            catch (err) {
                this.logError(err, "syntactic check");
            }
        }

        private reloadProjects() {
            this.projectService.reloadProjects();
        }

        private updateProjectStructure(seq: number, matchSeq: (seq: number) => boolean, ms = 1500) {
            this.host.setTimeout(() => {
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
            let index = 0;
            const checkOne = () => {
                if (matchSeq(seq)) {
                    const checkSpec = checkList[index];
                    index++;
                    if (checkSpec.project.containsFile(checkSpec.fileName, requireOpen)) {
                        this.syntacticCheck(checkSpec.fileName, checkSpec.project);
                        this.immediateId = setImmediate(() => {
                            this.semanticCheck(checkSpec.fileName, checkSpec.project);
                            this.immediateId = undefined;
                            if (checkList.length > index) {
                                this.errorTimer = this.host.setTimeout(checkOne, followMs);
                            }
                            else {
                                this.errorTimer = undefined;
                            }
                        });
                    }
                }
            };
            if ((checkList.length > index) && (matchSeq(seq))) {
                this.errorTimer = this.host.setTimeout(checkOne, ms);
            }
        }

        private cleanProjects(caption: string, projects: Project[]) {
            if (!projects) {
                return;
            }
            this.projectService.log(`cleaning ${caption}`);
            for (const p of projects) {
                p.languageService.cleanupSemanticCache();
            }
        }

        private cleanup() {
            this.cleanProjects("inferred projects", this.projectService.inferredProjects);
            this.cleanProjects("configured projects", this.projectService.configuredProjects);
            this.cleanProjects("external projects", this.projectService.externalProjects);
            if (typeof global !== "undefined" && global.gc) {
                this.projectService.log(`global.gc()`);
                global.gc();
                global.gc();
                global.gc();
            }
        }

        private getEncodedSemanticClassifications(args: protocol.FileSpanRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            return project.languageService.getEncodedSemanticClassifications(file, args);
        }

        private getProject(projectFileName: string) {
            return projectFileName && this.projectService.findProject(projectFileName);
        }

        private getCompilerOptionsDiagnostics(args: protocol.ProjectRequestArgs) {
            const project = this.getProject(args.projectFileName);
            return this.convertDiagnostics(project.languageService.getCompilerOptionsDiagnostics(), /*scriptInfo*/ undefined);
        }

        private convertDiagnostics(diagnostics: Diagnostic[], scriptInfo: ScriptInfo) {
            return diagnostics.map(d => <protocol.DiagnosticWithLinePosition>{
                message: flattenDiagnosticMessageText(d.messageText, this.host.newLine),
                start: d.start,
                length: d.length,
                category: DiagnosticCategory[d.category].toLowerCase(),
                code: d.code,
                startLocation: scriptInfo && this.getLocation(d.start, scriptInfo),
                endLocation: scriptInfo && this.getLocation(d.start + d.length, scriptInfo)
            });
        }

        private getDiagnosticsWorker(args: protocol.FileRequestArgs, selector: (project: Project, file: string) => Diagnostic[]) {
            const { project, file } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfo(file);
            const diagnostics = selector(project, file);
            return this.convertDiagnostics(diagnostics, scriptInfo);
        }

        private getSyntacticDiagnostics(args: protocol.FileRequestArgs): protocol.DiagnosticWithLinePosition[] {
            return this.getDiagnosticsWorker(args, (project, file) => project.languageService.getSyntacticDiagnostics(file));
        }

        private getSemanticDiagnostics(args: protocol.FileRequestArgs): protocol.DiagnosticWithLinePosition[] {
            return this.getDiagnosticsWorker(args, (project, file) => project.languageService.getSemanticDiagnostics(file));
        }

        private getDefinition(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.FileSpan[] | DefinitionInfo[] {
            const { file, project } = this.getFileAndProject(args);

            const scriptInfo = project.getScriptInfo(file);
            const position = this.getPosition(args, scriptInfo);

            const definitions = project.languageService.getDefinitionAtPosition(file, position);
            if (!definitions) {
                return undefined;
            }

            if (simplifiedResult) {
                return definitions.map(def => {
                    const defScriptInfo = project.getScriptInfo(def.fileName);
                    return {
                        file: def.fileName,
                        start: defScriptInfo.positionToLineOffset(def.textSpan.start),
                        end: defScriptInfo.positionToLineOffset(ts.textSpanEnd(def.textSpan))
                    };
                });
            }
            else {
                return definitions;
            }
        }

        private getTypeDefinition(line: number, offset: number, fileName: string): protocol.FileSpan[] {
            const file = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            const scriptInfo = project.getScriptInfo(file);
            const position = scriptInfo.lineOffsetToPosition(line, offset);

            const definitions = project.languageService.getTypeDefinitionAtPosition(file, position);
            if (!definitions) {
                return undefined;
            }

            return definitions.map(def => {
                const defScriptInfo = project.getScriptInfo(def.fileName);
                return {
                    file: def.fileName,
                    start: defScriptInfo.positionToLineOffset(def.textSpan.start),
                    end: defScriptInfo.positionToLineOffset(ts.textSpanEnd(def.textSpan))
                };
            });
        }

        private getOccurrences(line: number, offset: number, fileName: string): protocol.OccurrencesResponseItem[] {
            fileName = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(fileName);

            if (!project) {
                throw Errors.NoProject;
            }

            const scriptInfo = project.getScriptInfo(fileName);
            const position = scriptInfo.lineOffsetToPosition(line, offset);

            const occurrences = project.languageService.getOccurrencesAtPosition(fileName, position);

            if (!occurrences) {
                return undefined;
            }

            return occurrences.map(occurrence => {
                const { fileName, isWriteAccess, textSpan } = occurrence;
                const scriptInfo = project.getScriptInfo(fileName);
                const start = scriptInfo.positionToLineOffset(textSpan.start);
                const end = scriptInfo.positionToLineOffset(ts.textSpanEnd(textSpan));
                return {
                    start,
                    end,
                    file: fileName,
                    isWriteAccess,
                };
            });
        }

        private getDocumentHighlights(args: protocol.DocumentHighlightsRequestArgs, simplifiedResult: boolean): protocol.DocumentHighlightsItem[] | DocumentHighlights[] {
            const fileName = ts.normalizePath(args.file);
            const project = this.projectService.getProjectForFile(fileName);

            if (!project) {
                throw Errors.NoProject;
            }

            const scriptInfo = project.getScriptInfo(fileName);
            const position = this.getPosition(args, scriptInfo);

            const documentHighlights = project.languageService.getDocumentHighlights(fileName, position, args.filesToSearch);

            if (!documentHighlights) {
                return undefined;
            }

            if (simplifiedResult) {
                return documentHighlights.map(convertToDocumentHighlightsItem);
            }
            else {
                return documentHighlights;
            }

            function convertToDocumentHighlightsItem(documentHighlights: ts.DocumentHighlights): ts.server.protocol.DocumentHighlightsItem {
                const { fileName, highlightSpans } = documentHighlights;

                const scriptInfo = project.getScriptInfo(fileName);
                return {
                    file: fileName,
                    highlightSpans: highlightSpans.map(convertHighlightSpan)
                };

                function convertHighlightSpan(highlightSpan: ts.HighlightSpan): ts.server.protocol.HighlightSpan {
                    const { textSpan, kind } = highlightSpan;
                    const start = scriptInfo.positionToLineOffset(textSpan.start);
                    const end = scriptInfo.positionToLineOffset(ts.textSpanEnd(textSpan));
                    return { start, end, kind };
                }
            }
        }

        private getProjectInfo(fileName: string, needFileNameList: boolean): protocol.ProjectInfo {
            fileName = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(fileName);
            if (!project) {
                throw Errors.NoProject;
            }

            const projectInfo: protocol.ProjectInfo = {
                configFileName: project.getProjectFileName(),
                languageServiceDisabled: !project.languageServiceEnabled
            };

            if (needFileNameList) {
                projectInfo.fileNames = project.getFileNames();
            }
            return projectInfo;
        }

        private getRenameInfo(args: protocol.FileLocationRequestArgs) {
            const { file, project } = this.getFileAndProject(args.file);
            const scriptInfo = project.getScriptInfo(file);
            const position = this.getPosition(args, scriptInfo);
            return project.languageService.getRenameInfo(file, position);
        }

        private getProjects(args: protocol.FileRequestArgs) {
            let projects: Project[];
            if (args.projectFileName) {
                const project = this.getProject(args.projectFileName);
                if (project) {
                    projects = [project];
                }
            }
            else {
                const file = normalizePath(args.file);
                const info = this.projectService.getScriptInfo(file);
                projects = this.projectService.findReferencingProjects(info);
            }
            projects = filter(projects, p => p.languageServiceEnabled);
            if (!projects || !projects.length) {
                throw Errors.NoProject;
            }
            return projects;
        }

        private getRenameLocations(args: protocol.RenameRequestArgs, simplifiedResult: boolean): protocol.RenameResponseBody | RenameLocation[] {
            const file = ts.normalizePath(args.file);
            const info = this.projectService.getScriptInfo(file);
            const position = this.getPosition(args, info);
            const projects = this.getProjects(args);
            if (simplifiedResult) {

                const defaultProject = projects[0];
                // The rename info should be the same for every project
                const renameInfo = defaultProject.languageService.getRenameInfo(file, position);
                if (!renameInfo) {
                    return undefined;
                }

                if (!renameInfo.canRename) {
                    return {
                        info: renameInfo,
                        locs: []
                    };
                }

                const fileSpans = combineProjectOutput(
                    projects,
                    (project: Project) => {
                        const renameLocations = project.languageService.findRenameLocations(file, position, args.findInStrings, args.findInComments);
                        if (!renameLocations) {
                            return [];
                        }

                        return renameLocations.map(location => {
                            const locationScriptInfo = project.getScriptInfo(location.fileName);
                            return <protocol.FileSpan>{
                                file: location.fileName,
                                start: locationScriptInfo.positionToLineOffset(location.textSpan.start),
                                end: locationScriptInfo.positionToLineOffset(ts.textSpanEnd(location.textSpan)),
                            };
                        });
                    },
                    compareRenameLocation,
                    (a, b) => a.file === b.file && a.start.line === b.start.line && a.start.offset === b.start.offset
                );
                const locs = fileSpans.reduce<protocol.SpanGroup[]>((accum, cur) => {
                    let curFileAccum: protocol.SpanGroup;
                    if (accum.length > 0) {
                        curFileAccum = accum[accum.length - 1];
                        if (curFileAccum.file !== cur.file) {
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

                return { info: renameInfo, locs };
            }
            else {
                return combineProjectOutput(
                    projects,
                    p => p.languageService.findRenameLocations(file, position, args.findInStrings, args.findInComments),
                    /*comparer*/ undefined,
                    renameLocationIsEqualTo
                );
            }

            function renameLocationIsEqualTo(a: RenameLocation, b: RenameLocation) {
                if (a === b) {
                    return true;
                }
                if (!a || !b) {
                    return false;
                }
                return a.fileName === b.fileName &&
                    a.textSpan.start === b.textSpan.start &&
                    a.textSpan.length === b.textSpan.length;
            }

            function compareRenameLocation(a: protocol.FileSpan, b: protocol.FileSpan) {
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
            }
        }

        private getReferences(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.ReferencesResponseBody | ReferencedSymbol[] {
            const file = ts.normalizePath(args.file);
            const projects = this.getProjects(args);

            const defaultProject = projects[0];
            const scriptInfo = defaultProject.getScriptInfo(file);
            const position = this.getPosition(args, scriptInfo);
            if (simplifiedResult) {
                const nameInfo = defaultProject.languageService.getQuickInfoAtPosition(file, position);
                if (!nameInfo) {
                    return undefined;
                }

                const displayString = ts.displayPartsToString(nameInfo.displayParts);
                const nameSpan = nameInfo.textSpan;
                const nameColStart = scriptInfo.positionToLineOffset(nameSpan.start).offset;
                const nameText = scriptInfo.snap().getText(nameSpan.start, ts.textSpanEnd(nameSpan));
                const refs = combineProjectOutput<protocol.ReferencesResponseItem>(
                    projects,
                    (project: Project) => {
                        const references = project.languageService.getReferencesAtPosition(file, position);
                        if (!references) {
                            return [];
                        }

                        return references.map(ref => {
                            const refScriptInfo = project.getScriptInfo(ref.fileName);
                            const start = refScriptInfo.positionToLineOffset(ref.textSpan.start);
                            const refLineSpan = refScriptInfo.lineToTextSpan(start.line - 1);
                            const lineText = refScriptInfo.snap().getText(refLineSpan.start, ts.textSpanEnd(refLineSpan)).replace(/\r|\n/g, "");
                            return {
                                file: ref.fileName,
                                start: start,
                                lineText: lineText,
                                end: refScriptInfo.positionToLineOffset(ts.textSpanEnd(ref.textSpan)),
                                isWriteAccess: ref.isWriteAccess,
                                isDefinition: ref.isDefinition
                            };
                        });
                    },
                    compareFileStart,
                    areReferencesResponseItemsForTheSameLocation
                );

                return {
                    refs,
                    symbolName: nameText,
                    symbolStartOffset: nameColStart,
                    symbolDisplayString: displayString
                };
            }
            else {
                return combineProjectOutput(
                    projects,
                    project => project.languageService.findReferences(file, position),
                    undefined,
                    // TODO: fixme
                    undefined
                );
            }

            function areReferencesResponseItemsForTheSameLocation(a: protocol.ReferencesResponseItem, b: protocol.ReferencesResponseItem) {
                if (a && b) {
                    return a.file === b.file &&
                        a.start === b.start &&
                        a.end === b.end;
                }
                return false;
            }
        }

        /**
         * @param fileName is the name of the file to be opened
         * @param fileContent is a version of the file content that is known to be more up to date than the one on disk
         */
        private openClientFile(fileName: string, fileContent?: string, scriptKind?: ScriptKind) {
            const file = ts.normalizePath(fileName);
            const { configFileName, configFileErrors } = this.projectService.openClientFile(file, fileContent, scriptKind);
            if (configFileErrors) {
                this.configFileDiagnosticEvent(fileName, configFileName, configFileErrors);
            }
        }

        private getPosition(args: protocol.FileLocationRequestArgs, scriptInfo: ScriptInfo): number {
            return args.position !== undefined ? args.position : scriptInfo.lineOffsetToPosition(args.line, args.offset);
        }

        private getFileAndProject(args: protocol.FileLocationRequestArgs) {
            const file = ts.normalizePath(args.file);
            const project: Project = this.getProject(args.projectFileName) || this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }
            return { file, project };
        }

        private getOutliningSpans(args: protocol.FileRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            return project.languageService.getOutliningSpans(file);
        }

        private getTodoComments(args: protocol.TodoCommentRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            return project.languageService.getTodoComments(file, args.descriptors);
        }

        private getDocCommentTemplate(args: protocol.FileLocationRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfo(file);
            const position = this.getPosition(args, scriptInfo);
            return project.languageService.getDocCommentTemplateAtPosition(file, position);
        }

        private getIndentation(args: protocol.IndentationRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            const position = this.getPosition(args, project.getScriptInfo(file));
            const indentation = project.languageService.getIndentationAtPosition(file, position, args.options);
            return { position, indentation };
        }

        private getBreakpointStatement(args: protocol.FileLocationRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            const position = this.getPosition(args, project.getScriptInfo(file));
            return project.languageService.getBreakpointStatementAtPosition(file, position);
        }

        private getNameOrDottedNameSpan(args: protocol.FileLocationRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            const position = this.getPosition(args, project.getScriptInfo(file));
            return project.languageService.getNameOrDottedNameSpan(file, position, position);
        }

        private isValidBraceCompletion(args: protocol.BraceCompletionRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            const position = this.getPosition(args, project.getScriptInfo(file));
            return project.languageService.isValidBraceCompletionAtPostion(file, position, args.openingBrace.charCodeAt(0));
        }

        private getQuickInfoWorker(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.QuickInfoResponseBody | QuickInfo {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfo(file);
            const quickInfo = project.languageService.getQuickInfoAtPosition(file, this.getPosition(args, scriptInfo));
            if (!quickInfo) {
                return undefined;
            }

            if (simplifiedResult) {
                const displayString = ts.displayPartsToString(quickInfo.displayParts);
                const docString = ts.displayPartsToString(quickInfo.documentation);
                return {
                    kind: quickInfo.kind,
                    kindModifiers: quickInfo.kindModifiers,
                    start: scriptInfo.positionToLineOffset(quickInfo.textSpan.start),
                    end: scriptInfo.positionToLineOffset(ts.textSpanEnd(quickInfo.textSpan)),
                    displayString: displayString,
                    documentation: docString,
                };
            }
            else {
                return quickInfo;
            }
        }

        private getFormattingEditsForRange(line: number, offset: number, endLine: number, endOffset: number, fileName: string): protocol.CodeEdit[] {
            const file = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            const scriptInfo = project.getScriptInfo(file);
            const startPosition = scriptInfo.lineOffsetToPosition(line, offset);
            const endPosition = scriptInfo.lineOffsetToPosition(endLine, endOffset);

            // TODO: avoid duplicate code (with formatonkey)
            const edits = project.languageService.getFormattingEditsForRange(file, startPosition, endPosition,
                this.projectService.getFormatCodeOptions(file));
            if (!edits) {
                return undefined;
            }

            return edits.map((edit) => {
                return {
                    start: scriptInfo.positionToLineOffset(edit.span.start),
                    end: scriptInfo.positionToLineOffset(ts.textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        private getFormattingEditsForRangeFull(args: protocol.FormatRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            return project.languageService.getFormattingEditsForRange(file, args.position, args.endPosition, args.options);
        }

        private getFormattingEditsForDocumentFull(args: protocol.FormatRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            return project.languageService.getFormattingEditsForDocument(file, args.options);
        }

        private getFormattingEditsAfterKeystrokeFull(args: protocol.FormatOnKeyRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            return project.languageService.getFormattingEditsAfterKeystroke(file, args.position, args.key, args.options);
        }

        private getFormattingEditsAfterKeystroke(line: number, offset: number, key: string, fileName: string): protocol.CodeEdit[] {
            const file = ts.normalizePath(fileName);

            const project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            const scriptInfo = project.getScriptInfo(file);
            const position = scriptInfo.lineOffsetToPosition(line, offset);
            const formatOptions = this.projectService.getFormatCodeOptions(file);
            const edits = project.languageService.getFormattingEditsAfterKeystroke(file, position, key,
                formatOptions);
            // Check whether we should auto-indent. This will be when
            // the position is on a line containing only whitespace.
            // This should leave the edits returned from
            // getFormattingEditsAfterKeystroke either empty or pertaining
            // only to the previous line.  If all this is true, then
            // add edits necessary to properly indent the current line.
            if ((key == "\n") && ((!edits) || (edits.length === 0) || allEditsBeforePos(edits, position))) {
                const lineInfo = scriptInfo.getLineInfo(line);
                if (lineInfo && (lineInfo.leaf) && (lineInfo.leaf.text)) {
                    const lineText = lineInfo.leaf.text;
                    if (lineText.search("\\S") < 0) {
                        // TODO: get these options from host
                        const editorOptions: ts.EditorOptions = {
                            IndentSize: formatOptions.indentSize,
                            TabSize: formatOptions.tabSize,
                            NewLineCharacter: formatOptions.newLineCharacter,
                            ConvertTabsToSpaces: formatOptions.convertTabsToSpaces,
                            IndentStyle: ts.IndentStyle.Smart,
                        };
                        const preferredIndent = project.languageService.getIndentationAtPosition(file, position, editorOptions);
                        let hasIndent = 0;
                        let i: number, len: number;
                        for (i = 0, len = lineText.length; i < len; i++) {
                            if (lineText.charAt(i) == " ") {
                                hasIndent++;
                            }
                            else if (lineText.charAt(i) == "\t") {
                                hasIndent += editorOptions.TabSize;
                            }
                            else {
                                break;
                            }
                        }
                        // i points to the first non whitespace character
                        if (preferredIndent !== hasIndent) {
                            const firstNoWhiteSpacePosition = lineInfo.offset + i;
                            edits.push({
                                span: ts.createTextSpanFromBounds(lineInfo.offset, firstNoWhiteSpacePosition),
                                newText: generateIndentString(preferredIndent, editorOptions)
                            });
                        }
                    }
                }
            }

            if (!edits) {
                return undefined;
            }

            return edits.map((edit) => {
                return {
                    start: scriptInfo.positionToLineOffset(edit.span.start),
                    end: scriptInfo.positionToLineOffset(ts.textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        private getCompletions(args: protocol.CompletionsRequestArgs, simplifiedResult: boolean): protocol.CompletionEntry[] | CompletionInfo {
            const prefix = args.prefix || "";
            const { file, project } = this.getFileAndProject(args);

            const scriptInfo = project.getScriptInfo(file);
            const position = this.getPosition(args, scriptInfo);

            const completions = project.languageService.getCompletionsAtPosition(file, position);
            if (!completions) {
                return undefined;
            }
            if (simplifiedResult) {
                return completions.entries.reduce((result: protocol.CompletionEntry[], entry: ts.CompletionEntry) => {
                    if (completions.isMemberCompletion || (entry.name.toLowerCase().indexOf(prefix.toLowerCase()) === 0)) {
                        result.push(entry);
                    }
                    return result;
                }, []).sort((a, b) => a.name.localeCompare(b.name));
            }
            else {
                return completions;
            }
        }

        private getCompletionEntryDetails(args: protocol.CompletionDetailsRequestArgs): protocol.CompletionEntryDetails[] {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfo(file);
            const position = this.getPosition(args, scriptInfo);

            return args.entryNames.reduce((accum: protocol.CompletionEntryDetails[], entryName: string) => {
                const details = project.languageService.getCompletionEntryDetails(file, position, entryName);
                if (details) {
                    accum.push(details);
                }
                return accum;
            }, []);
        }

        private getSignatureHelpItems(args: protocol.SignatureHelpRequestArgs, simplifiedResult: boolean): protocol.SignatureHelpItems | SignatureHelpItems {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfo(file);
            const position = this.getPosition(args, scriptInfo);
            const helpItems = project.languageService.getSignatureHelpItems(file, position);
            if (!helpItems) {
                return undefined;
            }

            if (simplifiedResult) {
                const span = helpItems.applicableSpan;
                return {
                    items: helpItems.items,
                    applicableSpan: {
                        start: scriptInfo.positionToLineOffset(span.start),
                        end: scriptInfo.positionToLineOffset(span.start + span.length)
                    },
                    selectedItemIndex: helpItems.selectedItemIndex,
                    argumentIndex: helpItems.argumentIndex,
                    argumentCount: helpItems.argumentCount,
                };
            }
            else {
                return helpItems;
            }
        }

        private getDiagnostics(delay: number, fileNames: string[]) {
            const checkList = fileNames.reduce((accum: PendingErrorCheck[], fileName: string) => {
                
                fileName = ts.normalizePath(fileName);
                const project = this.projectService.getProjectForFile(fileName);
                if (project) {
                    accum.push({ fileName, project });
                }
                return accum;
            }, []);

            if (checkList.length > 0) {
                this.updateErrorCheck(checkList, this.changeSeq, (n) => n === this.changeSeq, delay);
            }
        }

        private change(line: number, offset: number, endLine: number, endOffset: number, insertString: string, fileName: string) {
            const file = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(file);
            if (project) {
                const scriptInfo = project.getScriptInfo(file);
                const start = scriptInfo.lineOffsetToPosition(line, offset);
                const end = scriptInfo.lineOffsetToPosition(endLine, endOffset);
                if (start >= 0) {
                    scriptInfo.editContent(start, end, insertString);
                    this.changeSeq++;
                }
                this.updateProjectStructure(this.changeSeq, (n) => n === this.changeSeq);
            }
        }

        private reload(fileName: string, tempFileName: string, reqSeq = 0) {
            const file = ts.normalizePath(fileName);
            const tmpfile = ts.normalizePath(tempFileName);
            const project = this.projectService.getProjectForFile(file);
            if (project) {
                this.changeSeq++;
                // make sure no changes happen before this one is finished
                project.reloadScript(file, tmpfile, () => {
                    this.output(undefined, CommandNames.Reload, reqSeq);
                });
            }
        }

        private saveToTmp(fileName: string, tempFileName: string) {
            const file = ts.normalizePath(fileName);
            const tmpfile = ts.normalizePath(tempFileName);

            const project = this.projectService.getProjectForFile(file);
            if (project) {
                project.saveTo(file, tmpfile);
            }
        }

        private closeClientFile(fileName: string) {
            if (!fileName) {
                return;
            }
            const file = ts.normalizePath(fileName);
            this.projectService.closeClientFile(file);
        }

        private decorateNavigationBarItem(project: Project, fileName: string, items: ts.NavigationBarItem[]): protocol.NavigationBarItem[] {
            if (!items) {
                return undefined;
            }

            const scriptInfo = project.getScriptInfo(fileName);

            return items.map(item => ({
                text: item.text,
                kind: item.kind,
                kindModifiers: item.kindModifiers,
                spans: item.spans.map(span => ({
                    start: scriptInfo.positionToLineOffset(span.start),
                    end: scriptInfo.positionToLineOffset(ts.textSpanEnd(span))
                })),
                childItems: this.decorateNavigationBarItem(project, fileName, item.childItems),
                indent: item.indent
            }));
        }

        private getNavigationBarItems(fileName: string, simplifiedResult: boolean): protocol.NavigationBarItem[] | NavigationBarItem[] {
            const { file, project } = this.getFileAndProject(fileName);

            const items = project.languageService.getNavigationBarItems(file);
            if (!items) {
                return undefined;
            }

            return simplifiedResult
                ? this.decorateNavigationBarItem(project, fileName, items)
                : items;
        }

        private getNavigateToItems(args: protocol.NavtoRequestArgs, simplifiedResult: boolean): protocol.NavtoItem[] | NavigateToItem[] {
            const projects = this.getProjects(args);

            if (simplifiedResult) {
                return combineProjectOutput(
                    projects,
                    project => {
                        const navItems = project.languageService.getNavigateToItems(args.searchValue, args.maxResultCount);
                        if (!navItems) {
                            return [];
                        }

                        return navItems.map((navItem) => {
                            const scriptInfo = project.getScriptInfo(navItem.fileName);
                            const start = scriptInfo.positionToLineOffset(navItem.textSpan.start);
                            const end = scriptInfo.positionToLineOffset(ts.textSpanEnd(navItem.textSpan));
                            const bakedItem: protocol.NavtoItem = {
                                name: navItem.name,
                                kind: navItem.kind,
                                file: navItem.fileName,
                                start: start,
                                end: end,
                            };
                            if (navItem.kindModifiers && (navItem.kindModifiers !== "")) {
                                bakedItem.kindModifiers = navItem.kindModifiers;
                            }
                            if (navItem.matchKind !== "none") {
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
                    },
                    /*comparer*/ undefined,
                    areNavToItemsForTheSameLocation
                );
            }
            else {
                return combineProjectOutput(
                    projects,
                    project => project.languageService.getNavigateToItems(args.searchValue, args.maxResultCount),
                    /*comparer*/ undefined,
                    navigateToItemIsEqualTo);
            }

            function navigateToItemIsEqualTo(a: NavigateToItem, b: NavigateToItem): boolean {
                if (a === b) {
                    return true;
                }
                if (!a || !b) {
                    return false;
                }
                return a.containerKind === b.containerKind &&
                    a.containerName === b.containerName &&
                    a.fileName === b.fileName &&
                    a.isCaseSensitive === b.isCaseSensitive &&
                    a.kind === b.kind &&
                    a.kindModifiers === b.containerName &&
                    a.matchKind === b.matchKind &&
                    a.name === b.name &&
                    a.textSpan.start === b.textSpan.start &&
                    a.textSpan.length === b.textSpan.length;
            }

            function areNavToItemsForTheSameLocation(a: protocol.NavtoItem, b: protocol.NavtoItem) {
                if (a && b) {
                    return a.file === b.file &&
                        a.start === b.start &&
                        a.end === b.end;
                }
                return false;
            }
        }

        private getBraceMatching(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.TextSpan[] | TextSpan[] {
            const { file, project } = this.getFileAndProject(args.file);

            const scriptInfo = project.getScriptInfo(file);
            const position = this.getPosition(args, scriptInfo);

            const spans = project.languageService.getBraceMatchingAtPosition(file, position);
            if (!spans) {
                return undefined;
            }
            if (simplifiedResult) {

                return spans.map(span => ({
                    start: scriptInfo.positionToLineOffset(span.start),
                    end: scriptInfo.positionToLineOffset(span.start + span.length)
                }));
            }
            else {
                return spans;
            }
        }

        getDiagnosticsForProject(delay: number, fileName: string) {
            const { fileNames, languageServiceDisabled } = this.getProjectInfo(fileName, /*needFileNameList*/ true);
            if (languageServiceDisabled) {
                return;
            }

            // No need to analyze lib.d.ts
            let fileNamesInProject = fileNames.filter((value, index, array) => value.indexOf("lib.d.ts") < 0);

            // Sort the file name list to make the recently touched files come first
            const highPriorityFiles: string[] = [];
            const mediumPriorityFiles: string[] = [];
            const lowPriorityFiles: string[] = [];
            const veryLowPriorityFiles: string[] = [];
            const normalizedFileName = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(normalizedFileName);
            for (const fileNameInProject of fileNamesInProject) {
                if (this.getCanonicalFileName(fileNameInProject) == this.getCanonicalFileName(fileName))
                    highPriorityFiles.push(fileNameInProject);
                else {
                    const info = this.projectService.getScriptInfo(fileNameInProject);
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
                const checkList = fileNamesInProject.map<PendingErrorCheck>((fileName: string) => {
                    const normalizedFileName = ts.normalizePath(fileName);
                    return { fileName: normalizedFileName, project };
                });
                // Project level error analysis runs on background files too, therefore
                // doesn't require the file to be opened
                this.updateErrorCheck(checkList, this.changeSeq, (n) => n == this.changeSeq, delay, 200, /*requireOpen*/ false);
            }
        }

        getCanonicalFileName(fileName: string) {
            const name = this.host.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
            return ts.normalizePath(name);
        }

        exit() {
        }

        private notRequired() {
            return { responseRequired: false };
        }

        private requiredResponse(response: any) {
            return { response, responseRequired: true };
        }

        private handlers: Map<(request: protocol.Request) => { response?: any, responseRequired?: boolean }> = {
            [CommandNames.OpenExternalProject]: (request: protocol.OpenExternalProjectRequest) => {
                this.projectService.openExternalProject(request.arguments);
                // TODO: report errors
                return this.requiredResponse(true);
            },
            [CommandNames.OpenExternalProjects]: (request: protocol.OpenExternalProjectsRequest) => {
                for (const proj of request.arguments.projects) {
                    this.projectService.openExternalProject(proj);
                }
                // TODO: report errors
                return this.requiredResponse(true);
            },
            [CommandNames.CloseExternalProject]: (request: protocol.CloseExternalProjectRequest) => {
                this.projectService.closeExternalProject(request.arguments.projectFileName);
                // TODO: report errors
                return this.requiredResponse(true);
            },
            [CommandNames.SynchronizeProjectList]: (request: protocol.SynchronizeProjectListRequest) => {
                const result = this.projectService.synchronizeProjectList(request.arguments.knownProjects);
                return this.requiredResponse(result);
            },
            [CommandNames.ApplyChangedToOpenFiles]: (request: protocol.ApplyChangedToOpenFilesRequest) => {
                this.projectService.applyChangesInOpenFiles(request.arguments.openFiles, request.arguments.changedFiles, request.arguments.closedFiles);
                // TODO: report errors
                return this.requiredResponse(true);
            },
            [CommandNames.Exit]: () => {
                this.exit();
                return this.notRequired();
            },
            [CommandNames.Definition]: (request: protocol.DefinitionRequest) => {
                return this.requiredResponse(this.getDefinition(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.DefinitionFull]: (request: protocol.DefinitionRequest) => {
                return this.requiredResponse(this.getDefinition(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.TypeDefinition]: (request: protocol.Request) => {
                const defArgs = <protocol.FileLocationRequestArgs>request.arguments;
                return this.requiredResponse(this.getTypeDefinition(defArgs.line, defArgs.offset, defArgs.file));
            },
            [CommandNames.References]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getReferences(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.ReferencesFull]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getReferences(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.Rename]: (request: protocol.Request) => {
                return this.requiredResponse(this.getRenameLocations(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.RenameLocationsFull]: (request: protocol.RenameRequest) => {
                return this.requiredResponse(this.getRenameLocations(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.RenameInfoFull]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getRenameInfo(request.arguments));
            },
            [CommandNames.Open]: (request: protocol.Request) => {
                const openArgs = <protocol.OpenRequestArgs>request.arguments;
                let scriptKind: ScriptKind;
                switch (openArgs.scriptKindName) {
                    case "TS":
                        scriptKind = ScriptKind.TS;
                        break;
                    case "JS":
                        scriptKind = ScriptKind.JS;
                        break;
                    case "TSX":
                        scriptKind = ScriptKind.TSX;
                        break;
                    case "JSX":
                        scriptKind = ScriptKind.JSX;
                        break;
                }
                this.openClientFile(openArgs.file, openArgs.fileContent, scriptKind);
                return this.notRequired();
            },
            [CommandNames.Quickinfo]: (request: protocol.QuickInfoRequest) => {
                return this.requiredResponse(this.getQuickInfoWorker(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.QuickinfoFull]: (request: protocol.QuickInfoRequest) => {
                return this.requiredResponse(this.getQuickInfoWorker(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.OutliningSpans]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getOutliningSpans(request.arguments));
            },
            [CommandNames.TodoComments]: (request: protocol.TodoCommentRequest) => {
                return this.requiredResponse(this.getTodoComments(request.arguments));
            },
            [CommandNames.Indentation]: (request: protocol.IndentationRequest) => {
                return this.requiredResponse(this.getIndentation(request.arguments));
            },
            [CommandNames.NameOrDottedNameSpan]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getNameOrDottedNameSpan(request.arguments));
            },
            [CommandNames.BreakpointStatement]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getBreakpointStatement(request.arguments));
            },
            [CommandNames.BraceCompletion]: (request: protocol.BraceCompletionRequest) => {
                return this.requiredResponse(this.isValidBraceCompletion(request.arguments));
            },
            [CommandNames.DocCommentTemplate]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getDocCommentTemplate(request.arguments));
            },
            [CommandNames.Format]: (request: protocol.Request) => {
                const formatArgs = <protocol.FormatRequestArgs>request.arguments;
                return this.requiredResponse(this.getFormattingEditsForRange(formatArgs.line, formatArgs.offset, formatArgs.endLine, formatArgs.endOffset, formatArgs.file));
            },
            [CommandNames.Formatonkey]: (request: protocol.Request) => {
                const formatOnKeyArgs = <protocol.FormatOnKeyRequestArgs>request.arguments;
                return this.requiredResponse(this.getFormattingEditsAfterKeystroke(formatOnKeyArgs.line, formatOnKeyArgs.offset, formatOnKeyArgs.key, formatOnKeyArgs.file));
            },
            [CommandNames.FormatFull]: (request: protocol.FormatRequest) => {
                return this.requiredResponse(this.getFormattingEditsForDocumentFull(request.arguments));
            },
            [CommandNames.FormatonkeyFull]: (request: protocol.FormatOnKeyRequest) => {
                return this.requiredResponse(this.getFormattingEditsAfterKeystrokeFull(request.arguments));
            },
            [CommandNames.FormatRangeFull]: (request: protocol.FormatRequest) => {
                return this.requiredResponse(this.getFormattingEditsForRangeFull(request.arguments));
            },
            [CommandNames.Completions]: (request: protocol.CompletionDetailsRequest) => {
                return this.requiredResponse(this.getCompletions(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.CompletionsFull]: (request: protocol.CompletionDetailsRequest) => {
                return this.requiredResponse(this.getCompletions(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.CompletionDetails]: (request: protocol.CompletionDetailsRequest) => {
                return this.requiredResponse(this.getCompletionEntryDetails(request.arguments));
            },
            [CommandNames.SignatureHelp]: (request: protocol.SignatureHelpRequest) => {
                return this.requiredResponse(this.getSignatureHelpItems(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.SignatureHelpFull]: (request: protocol.SignatureHelpRequest) => {
                return this.requiredResponse(this.getSignatureHelpItems(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.SemanticDiagnosticsFull]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getSemanticDiagnostics(request.arguments));
            },
            [CommandNames.SyntacticDiagnosticsFull]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getSyntacticDiagnostics(request.arguments));
            },
            [CommandNames.CompilerOptionsDiagnosticsFull]: (request: protocol.ProjectRequest) => {
                return this.requiredResponse(this.getCompilerOptionsDiagnostics(request.arguments));
            },
            [CommandNames.EncodedSemanticClassificationsFull]: (request: protocol.FileSpanRequest) => {
                return this.requiredResponse(this.getEncodedSemanticClassifications(request.arguments));
            },
            [CommandNames.Cleanup]: (request: protocol.Request) => {
                this.cleanup();
                return this.requiredResponse(true);
            },
            [CommandNames.Geterr]: (request: protocol.Request) => {
                const geterrArgs = <protocol.GeterrRequestArgs>request.arguments;
                return { response: this.getDiagnostics(geterrArgs.delay, geterrArgs.files), responseRequired: false };
            },
            [CommandNames.GeterrForProject]: (request: protocol.Request) => {
                const { file, delay } = <protocol.GeterrForProjectRequestArgs>request.arguments;
                return { response: this.getDiagnosticsForProject(delay, file), responseRequired: false };
            },
            [CommandNames.Change]: (request: protocol.Request) => {
                const changeArgs = <protocol.ChangeRequestArgs>request.arguments;
                this.change(changeArgs.line, changeArgs.offset, changeArgs.endLine, changeArgs.endOffset,
                    changeArgs.insertString, changeArgs.file);
                return { responseRequired: false };
            },
            [CommandNames.Configure]: (request: protocol.Request) => {
                const configureArgs = <protocol.ConfigureRequestArguments>request.arguments;
                this.projectService.setHostConfiguration(configureArgs);
                this.output(undefined, CommandNames.Configure, request.seq);
                return { responseRequired: false };
            },
            [CommandNames.Reload]: (request: protocol.Request) => {
                const reloadArgs = <protocol.ReloadRequestArgs>request.arguments;
                this.reload(reloadArgs.file, reloadArgs.tmpfile, request.seq);
                return { response: { reloadFinished: true }, responseRequired: true };
            },
            [CommandNames.Saveto]: (request: protocol.Request) => {
                const savetoArgs = <protocol.SavetoRequestArgs>request.arguments;
                this.saveToTmp(savetoArgs.file, savetoArgs.tmpfile);
                return { responseRequired: false };
            },
            [CommandNames.Close]: (request: protocol.Request) => {
                const closeArgs = <protocol.FileRequestArgs>request.arguments;
                this.closeClientFile(closeArgs.file);
                return { responseRequired: false };
            },
            [CommandNames.Navto]: (request: protocol.NavtoRequest) => {
                return this.requiredResponse(this.getNavigateToItems(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.NavtoFull]: (request: protocol.NavtoRequest) => {
                return this.requiredResponse(this.getNavigateToItems(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.Brace]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getBraceMatching(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.BraceFull]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getBraceMatching(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.NavBar]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getNavigationBarItems(request.arguments.file, /*simplifiedResult*/ true));
            },
            [CommandNames.NavBarFull]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getNavigationBarItems(request.arguments.file, /*simplifiedResult*/ false));
            },
            [CommandNames.Occurrences]: (request: protocol.Request) => {
                const { line, offset, file: fileName } = <protocol.FileLocationRequestArgs>request.arguments;
                return { response: this.getOccurrences(line, offset, fileName), responseRequired: true };
            },
            [CommandNames.DocumentHighlights]: (request: protocol.DocumentHighlightsRequest) => {
                return this.requiredResponse(this.getDocumentHighlights(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.DocumentHighlightsFull]: (request: protocol.DocumentHighlightsRequest) => {
                return this.requiredResponse(this.getDocumentHighlights(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.ProjectInfo]: (request: protocol.Request) => {
                const { file, needFileNameList } = <protocol.ProjectInfoRequestArgs>request.arguments;
                return { response: this.getProjectInfo(file, needFileNameList), responseRequired: true };
            },
            [CommandNames.ReloadProjects]: (request: protocol.ReloadProjectsRequest) => {
                this.reloadProjects();
                return { responseRequired: false };
            }
        };
        public addProtocolHandler(command: string, handler: (request: protocol.Request) => { response?: any, responseRequired: boolean }) {
            if (this.handlers[command]) {
                throw new Error(`Protocol handler already exists for command "${command}"`);
            }
            this.handlers[command] = handler;
        }

        public executeCommand(request: protocol.Request): { response?: any, responseRequired?: boolean } {
            const handler = this.handlers[request.command];
            if (handler) {
                return handler(request);
            }
            else {
                this.projectService.log("Unrecognized JSON command: " + JSON.stringify(request));
                this.output(undefined, CommandNames.Unknown, request.seq, "Unrecognized JSON command: " + request.command);
                return { responseRequired: false };
            }
        }

        public onMessage(message: string) {
            let start: number[];
            if (this.logger.isVerbose()) {
                this.logger.info("request: " + message);
                start = this.hrtime();
            }
            let request: protocol.Request;
            try {
                request = <protocol.Request>JSON.parse(message);
                const {response, responseRequired} = this.executeCommand(request);

                if (this.logger.isVerbose()) {
                    const elapsed = this.hrtime(start);
                    const seconds = elapsed[0];
                    const nanoseconds = elapsed[1];
                    const elapsedMs = ((1e9 * seconds) + nanoseconds) / 1000000.0;
                    let leader = "Elapsed time (in milliseconds)";
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
            }
            catch (err) {
                if (err instanceof OperationCanceledException) {
                    // Handle cancellation exceptions
                    this.output({ canceled: true }, request.command, request.seq);
                    return;
                }
                this.logError(err, message);
                this.output(
                    undefined,
                    request ? request.command : CommandNames.Unknown,
                    request ? request.seq : 0,
                    "Error processing request. " + (<StackTraceError>err).message + "\n" + (<StackTraceError>err).stack);
            }
        }
    }
}
