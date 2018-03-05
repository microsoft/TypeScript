/// <reference path="scriptVersionCache.ts"/>

namespace ts.server {

    /* @internal */
    export class TextStorage {
        /**
         * Generated only on demand (based on edits, or information requested)
         * The property text is set to undefined when edits happen on the cache
         */
        private svc: ScriptVersionCache | undefined;
        private svcVersion = 0;

        /**
         * Stores the text when there are no changes to the script version cache
         * The script version cache is generated on demand and text is still retained.
         * Only on edits to the script version cache, the text will be set to undefined
         */
        private text: string;
        /**
         * Line map for the text when there is no script version cache present
         */
        private lineMap: number[];
        private textVersion = 0;

        /**
         * True if the text is for the file thats open in the editor
         */
        public isOpen: boolean;
        /**
         * True if the text present is the text from the file on the disk
         */
        private ownFileText: boolean;
        /**
         * True when reloading contents of file from the disk is pending
         */
        private pendingReloadFromDisk: boolean;

        constructor(private readonly host: ServerHost, private readonly fileName: NormalizedPath) {
        }

        public getVersion() {
            return this.svc
                ? `SVC-${this.svcVersion}-${this.svc.getSnapshotVersion()}`
                : `Text-${this.textVersion}`;
        }

        public hasScriptVersionCache_TestOnly() {
            return this.svc !== undefined;
        }

        public useScriptVersionCache_TestOnly() {
            this.switchToScriptVersionCache();
        }

        public useText(newText?: string) {
            this.svc = undefined;
            this.text = newText;
            this.lineMap = undefined;
            this.textVersion++;
        }

        public edit(start: number, end: number, newText: string) {
            this.switchToScriptVersionCache().edit(start, end - start, newText);
            this.ownFileText = false;
            this.text = undefined;
            this.lineMap = undefined;
        }

        /**
         * Set the contents as newText
         * returns true if text changed
         */
        public reload(newText: string) {
            Debug.assert(newText !== undefined);

            // Reload always has fresh content
            this.pendingReloadFromDisk = false;

            // If text changed set the text
            // This also ensures that if we had switched to version cache,
            // we are switching back to text.
            // The change to version cache will happen when needed
            // Thus avoiding the computation if there are no changes
            if (this.text !== newText) {
                this.useText(newText);
                // We cant guarantee new text is own file text
                this.ownFileText = false;
                return true;
            }
        }

        /**
         * Reads the contents from tempFile(if supplied) or own file and sets it as contents
         * returns true if text changed
         */
        public reloadWithFileText(tempFileName?: string) {
            const reloaded = this.reload(this.getFileText(tempFileName));
            this.ownFileText = !tempFileName || tempFileName === this.fileName;
            return reloaded;
        }

        /**
         * Reloads the contents from the file if there is no pending reload from disk or the contents of file are same as file text
         * returns true if text changed
         */
        public reloadFromDisk() {
            if (!this.pendingReloadFromDisk && !this.ownFileText) {
                return this.reloadWithFileText();
            }
            return false;
        }

        public delayReloadFromFileIntoText() {
            this.pendingReloadFromDisk = true;
        }

        public getSnapshot(): IScriptSnapshot {
            return this.useScriptVersionCacheIfValidOrOpen()
                ? this.svc.getSnapshot()
                : ScriptSnapshot.fromString(this.getOrLoadText());
        }

        public getLineInfo(line: number): AbsolutePositionAndLineText {
            return this.switchToScriptVersionCache().getLineInfo(line);
        }
        /**
         *  @param line 0 based index
         */
        lineToTextSpan(line: number): TextSpan {
            if (!this.useScriptVersionCacheIfValidOrOpen()) {
                const lineMap = this.getLineMap();
                const start = lineMap[line]; // -1 since line is 1-based
                const end = line + 1 < lineMap.length ? lineMap[line + 1] : this.text.length;
                return createTextSpanFromBounds(start, end);
            }
            return this.svc.lineToTextSpan(line);
        }

        /**
         * @param line 1 based index
         * @param offset 1 based index
         */
        lineOffsetToPosition(line: number, offset: number): number {
            if (!this.useScriptVersionCacheIfValidOrOpen()) {
                return computePositionOfLineAndCharacter(this.getLineMap(), line - 1, offset - 1, this.text);
            }

            // TODO: assert this offset is actually on the line
            return this.svc.lineOffsetToPosition(line, offset);
        }

        positionToLineOffset(position: number): protocol.Location {
            if (!this.useScriptVersionCacheIfValidOrOpen()) {
                const { line, character } = computeLineAndCharacterOfPosition(this.getLineMap(), position);
                return { line: line + 1, offset: character + 1 };
            }
            return this.svc.positionToLineOffset(position);
        }

        private getFileText(tempFileName?: string) {
            return this.host.readFile(tempFileName || this.fileName) || "";
        }

        private switchToScriptVersionCache(): ScriptVersionCache {
            if (!this.svc || this.pendingReloadFromDisk) {
                this.svc = ScriptVersionCache.fromString(this.getOrLoadText());
                this.svcVersion++;
            }
            return this.svc;
        }

        private useScriptVersionCacheIfValidOrOpen(): ScriptVersionCache | undefined {
            // If this is open script, use the cache
            if (this.isOpen) {
                return this.switchToScriptVersionCache();
            }

            // If there is pending reload from the disk then, reload the text
            if (this.pendingReloadFromDisk) {
                this.reloadWithFileText();
            }

            // At this point if svc is present its valid
            return this.svc;
        }

        private getOrLoadText() {
            if (this.text === undefined || this.pendingReloadFromDisk) {
                Debug.assert(!this.svc || this.pendingReloadFromDisk, "ScriptVersionCache should not be set when reloading from disk");
                this.reloadWithFileText();
            }
            return this.text;
        }

        private getLineMap() {
            Debug.assert(!this.svc, "ScriptVersionCache should not be set");
            return this.lineMap || (this.lineMap = computeLineStarts(this.getOrLoadText()));
        }
    }

    /*@internal*/
    export function isDynamicFileName(fileName: NormalizedPath) {
        return fileName[0] === "^" || getBaseFileName(fileName)[0] === "^";
    }

    export class ScriptInfo {
        /**
         * All projects that include this file
         */
        readonly containingProjects: Project[] = [];
        private formatCodeSettings: FormatCodeSettings;

        /* @internal */
        fileWatcher: FileWatcher;
        private textStorage: TextStorage;

        /*@internal*/
        readonly isDynamic: boolean;

        /*@internal*/
        /** Set to real path if path is different from info.path */
        private realpath: Path | undefined;

        constructor(
            private readonly host: ServerHost,
            readonly fileName: NormalizedPath,
            readonly scriptKind: ScriptKind,
            public readonly hasMixedContent: boolean,
            readonly path: Path) {
            this.isDynamic = isDynamicFileName(fileName);

            this.textStorage = new TextStorage(host, fileName);
            if (hasMixedContent || this.isDynamic) {
                this.textStorage.reload("");
                this.realpath = this.path;
            }
            this.scriptKind = scriptKind
                ? scriptKind
                : getScriptKindFromFileName(fileName);
        }

        /*@internal*/
        public isDynamicOrHasMixedContent() {
            return this.hasMixedContent || this.isDynamic;
        }

        public isScriptOpen() {
            return this.textStorage.isOpen;
        }

        public open(newText: string) {
            this.textStorage.isOpen = true;
            if (newText !== undefined &&
                this.textStorage.reload(newText)) {
                // reload new contents only if the existing contents changed
                this.markContainingProjectsAsDirty();
            }
        }

        public close(fileExists = true) {
            this.textStorage.isOpen = false;
            if (this.isDynamicOrHasMixedContent() || !fileExists) {
                if (this.textStorage.reload("")) {
                    this.markContainingProjectsAsDirty();
                }
            }
            else if (this.textStorage.reloadFromDisk()) {
                this.markContainingProjectsAsDirty();
            }
        }

        public getSnapshot() {
            return this.textStorage.getSnapshot();
        }

        private ensureRealPath() {
            if (this.realpath === undefined) {
                // Default is just the path
                this.realpath = this.path;
                if (this.host.realpath) {
                    Debug.assert(!!this.containingProjects.length);
                    const project = this.containingProjects[0];
                    const realpath = this.host.realpath(this.path);
                    if (realpath) {
                        this.realpath = project.toPath(realpath);
                        // If it is different from this.path, add to the map
                        if (this.realpath !== this.path) {
                            project.projectService.realpathToScriptInfos.add(this.realpath, this);
                        }
                    }
                }
            }
        }

        /*@internal*/
        getRealpathIfDifferent(): Path | undefined {
            return this.realpath && this.realpath !== this.path ? this.realpath : undefined;
        }

        getFormatCodeSettings() {
            return this.formatCodeSettings;
        }

        attachToProject(project: Project): boolean {
            const isNew = !this.isAttached(project);
            if (isNew) {
                this.containingProjects.push(project);
                if (!project.getCompilerOptions().preserveSymlinks) {
                    this.ensureRealPath();
                }
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
                if (p.projectKind === ProjectKind.Configured) {
                    p.getCachedDirectoryStructureHost().addOrDeleteFile(this.fileName, this.path, FileWatcherEventKind.Deleted);
                }
                const isInfoRoot = p.isRoot(this);
                // detach is unnecessary since we'll clean the list of containing projects anyways
                p.removeFile(this, /*fileExists*/ false, /*detachFromProjects*/ false);
                // If the info was for the external or configured project's root,
                // add missing file as the root
                if (isInfoRoot && p.projectKind !== ProjectKind.Inferred) {
                    p.addMissingFileRoot(this.fileName);
                }
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

        getLatestVersion() {
            return this.textStorage.getVersion();
        }

        saveTo(fileName: string) {
            this.host.writeFile(fileName, getSnapshotText(this.textStorage.getSnapshot()));
        }

        /*@internal*/
        delayReloadNonMixedContentFile() {
            Debug.assert(!this.isDynamicOrHasMixedContent());
            this.textStorage.delayReloadFromFileIntoText();
            this.markContainingProjectsAsDirty();
        }

        reloadFromFile(tempFileName?: NormalizedPath) {
            if (this.isDynamicOrHasMixedContent()) {
                this.textStorage.reload("");
                this.markContainingProjectsAsDirty();
            }
            else {
                if (this.textStorage.reloadWithFileText(tempFileName)) {
                    this.markContainingProjectsAsDirty();
                }
            }
        }

        /*@internal*/
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

        isOrphan() {
            return this.containingProjects.length === 0;
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
