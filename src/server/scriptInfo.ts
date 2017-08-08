/// <reference path="scriptVersionCache.ts"/>

namespace ts.server {

    /* @internal */
    export class TextStorage {
        private svc: ScriptVersionCache | undefined;
        private svcVersion = 0;

        private text: string;
        private lineMap: number[];
        private textVersion = 0;

        constructor(private readonly host: ServerHost, private readonly fileName: NormalizedPath) {
        }

        public getVersion() {
            return this.svc
                ? `SVC-${this.svcVersion}-${this.svc.getSnapshot().version}`
                : `Text-${this.textVersion}`;
        }

        public hasScriptVersionCache() {
            return this.svc !== undefined;
        }

        public useScriptVersionCache(newText?: string) {
            this.switchToScriptVersionCache(newText);
        }

        public useText(newText?: string) {
            this.svc = undefined;
            this.setText(newText);
        }

        public edit(start: number, end: number, newText: string) {
            this.switchToScriptVersionCache().edit(start, end - start, newText);
        }

        public reload(text: string) {
            if (this.svc) {
                this.svc.reload(text);
            }
            else {
                this.setText(text);
            }
        }

        public reloadFromFile(tempFileName?: string) {
            if (this.svc || (tempFileName !== this.fileName)) {
                this.reload(this.getFileText(tempFileName));
            }
            else {
                this.setText(undefined);
            }
        }

        public getSnapshot(): IScriptSnapshot {
            return this.svc
                ? this.svc.getSnapshot()
                : ScriptSnapshot.fromString(this.getOrLoadText());
        }

        public getLineInfo(line: number): AbsolutePositionAndLineText {
            return this.switchToScriptVersionCache().getSnapshot().index.lineNumberToInfo(line);
        }
        /**
         *  @param line 0 based index
         */
        lineToTextSpan(line: number) {
            if (!this.svc) {
                const lineMap = this.getLineMap();
                const start = lineMap[line]; // -1 since line is 1-based
                const end = line + 1 < lineMap.length ? lineMap[line + 1] : this.text.length;
                return createTextSpanFromBounds(start, end);
            }
            const index = this.svc.getSnapshot().index;
            const { lineText, absolutePosition } = index.lineNumberToInfo(line + 1);
            const len = lineText !== undefined ? lineText.length : index.absolutePositionOfStartOfLine(line + 2) - absolutePosition;
            return createTextSpan(absolutePosition, len);
        }

        /**
         * @param line 1 based index
         * @param offset 1 based index
         */
        lineOffsetToPosition(line: number, offset: number): number {
            if (!this.svc) {
                return computePositionOfLineAndCharacter(this.getLineMap(), line - 1, offset - 1, this.text);
            }

            // TODO: assert this offset is actually on the line
            return this.svc.getSnapshot().index.absolutePositionOfStartOfLine(line) + (offset - 1);
        }

        positionToLineOffset(position: number): protocol.Location {
            if (!this.svc) {
                const { line, character } = computeLineAndCharacterOfPosition(this.getLineMap(), position);
                return { line: line + 1, offset: character + 1 };
            }
            return this.svc.getSnapshot().index.positionToLineOffset(position);
        }

        private getFileText(tempFileName?: string) {
            return this.host.readFile(tempFileName || this.fileName) || "";
        }

        private ensureNoScriptVersionCache() {
            Debug.assert(!this.svc, "ScriptVersionCache should not be set");
        }

        private switchToScriptVersionCache(newText?: string): ScriptVersionCache {
            if (!this.svc) {
                this.svc = ScriptVersionCache.fromString(newText !== undefined ? newText : this.getOrLoadText());
                this.svcVersion++;
                this.text = undefined;
            }
            return this.svc;
        }

        private getOrLoadText() {
            this.ensureNoScriptVersionCache();
            if (this.text === undefined) {
                this.setText(this.getFileText());
            }
            return this.text;
        }

        private getLineMap() {
            this.ensureNoScriptVersionCache();
            return this.lineMap || (this.lineMap = computeLineStarts(this.getOrLoadText()));
        }

        private setText(newText: string) {
            this.ensureNoScriptVersionCache();
            if (newText === undefined || this.text !== newText) {
                this.text = newText;
                this.lineMap = undefined;
                this.textVersion++;
            }
        }
    }


    export class ScriptInfo {
        /**
         * All projects that include this file
         */
        readonly containingProjects: Project[] = [];
        private formatCodeSettings: FormatCodeSettings;
        readonly path: Path;

        private fileWatcher: FileWatcher;
        private textStorage: TextStorage;

        private isOpen: boolean;

        constructor(
            private readonly host: ServerHost,
            readonly fileName: NormalizedPath,
            readonly scriptKind: ScriptKind,
            public hasMixedContent = false) {

            this.path = toPath(fileName, host.getCurrentDirectory(), createGetCanonicalFileName(host.useCaseSensitiveFileNames));
            this.textStorage = new TextStorage(host, fileName);
            if (hasMixedContent) {
                this.textStorage.reload("");
            }
            this.scriptKind = scriptKind
                ? scriptKind
                : getScriptKindFromFileName(fileName);
        }

        public isScriptOpen() {
            return this.isOpen;
        }

        public open(newText: string) {
            this.isOpen = true;
            this.textStorage.useScriptVersionCache(newText);
            this.markContainingProjectsAsDirty();
        }

        public close() {
            this.isOpen = false;
            this.textStorage.useText(this.hasMixedContent ? "" : undefined);
            this.markContainingProjectsAsDirty();
        }

        public getSnapshot() {
            return this.textStorage.getSnapshot();
        }

        getFormatCodeSettings() {
            return this.formatCodeSettings;
        }

        attachToProject(project: Project): boolean {
            const isNew = !this.isAttached(project);
            if (isNew) {
                this.containingProjects.push(project);
            }
            return isNew;
        }

        isAttached(project: Project) {
            // unrolled for common cases
            switch (this.containingProjects.length) {
                case 0: return false;
                case 1: return this.containingProjects[0] === project;
                case 2: return this.containingProjects[0] === project || this.containingProjects[1] === project;
                default: return contains(this.containingProjects, project);
            }
        }

        detachFromProject(project: Project) {
            // unrolled for common cases
            switch (this.containingProjects.length) {
                case 0:
                    return;
                case 1:
                    if (this.containingProjects[0] === project) {
                        this.containingProjects.pop();
                    }
                    break;
                case 2:
                    if (this.containingProjects[0] === project) {
                        this.containingProjects[0] = this.containingProjects.pop();
                    }
                    else if (this.containingProjects[1] === project) {
                        this.containingProjects.pop();
                    }
                    break;
                default:
                    unorderedRemoveItem(this.containingProjects, project);
                    break;
            }
        }

        detachAllProjects() {
            for (const p of this.containingProjects) {
                // detach is unnecessary since we'll clean the list of containing projects anyways
                p.removeFile(this, /*detachFromProjects*/ false);
            }
            clear(this.containingProjects);
        }

        getDefaultProject() {
            switch (this.containingProjects.length) {
                case 0:
                    return Errors.ThrowNoProject();
                case 1:
                    return this.containingProjects[0];
                default:
                    // if this file belongs to multiple projects, the first configured project should be
                    // the default project; if no configured projects, the first external project should
                    // be the default project; otherwise the first inferred project should be the default.
                    let firstExternalProject;
                    for (const project of this.containingProjects) {
                        if (project.projectKind === ProjectKind.Configured) {
                            return project;
                        }
                        else if (project.projectKind === ProjectKind.External && !firstExternalProject) {
                            firstExternalProject = project;
                        }
                    }
                    return firstExternalProject || this.containingProjects[0];
            }
        }

        registerFileUpdate(): void {
            for (const p of this.containingProjects) {
                p.registerFileUpdate(this.path);
            }
        }

        setFormatOptions(formatSettings: FormatCodeSettings): void {
            if (formatSettings) {
                if (!this.formatCodeSettings) {
                    this.formatCodeSettings = getDefaultFormatCodeSettings(this.host);
                }
                mergeMapLikes(this.formatCodeSettings, formatSettings);
            }
        }

        setWatcher(watcher: FileWatcher): void {
            this.stopWatcher();
            this.fileWatcher = watcher;
        }

        stopWatcher() {
            if (this.fileWatcher) {
                this.fileWatcher.close();
                this.fileWatcher = undefined;
            }
        }

        getLatestVersion() {
            return this.textStorage.getVersion();
        }

        reload(script: string) {
            this.textStorage.reload(script);
            this.markContainingProjectsAsDirty();
        }

        saveTo(fileName: string) {
            const snap = this.textStorage.getSnapshot();
            this.host.writeFile(fileName, snap.getText(0, snap.getLength()));
        }

        reloadFromFile(tempFileName?: NormalizedPath) {
            if (this.hasMixedContent) {
                this.reload("");
            }
            else {
                this.textStorage.reloadFromFile(tempFileName);
                this.markContainingProjectsAsDirty();
            }
        }

        getLineInfo(line: number): AbsolutePositionAndLineText {
            return this.textStorage.getLineInfo(line);
        }

        editContent(start: number, end: number, newText: string): void {
            this.textStorage.edit(start, end, newText);
            this.markContainingProjectsAsDirty();
        }

        markContainingProjectsAsDirty() {
            for (const p of this.containingProjects) {
                p.markAsDirty();
            }
        }

        /**
         *  @param line 1 based index
         */
        lineToTextSpan(line: number) {
            return this.textStorage.lineToTextSpan(line);
        }

        /**
         * @param line 1 based index
         * @param offset 1 based index
         */
        lineOffsetToPosition(line: number, offset: number): number {
            return this.textStorage.lineOffsetToPosition(line, offset);
        }

        positionToLineOffset(position: number): protocol.Location {
            return this.textStorage.positionToLineOffset(position);
        }

        public isJavaScript() {
            return this.scriptKind === ScriptKind.JS || this.scriptKind === ScriptKind.JSX;
        }
    }
}