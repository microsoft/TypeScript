namespace ts.server {
    export interface ScriptInfoVersion {
        svc: number;
        text: number;
    }

    /* @internal */
    export class TextStorage {
        version: ScriptInfoVersion;

        /**
         * Generated only on demand (based on edits, or information requested)
         * The property text is set to undefined when edits happen on the cache
         */
        private svc: ScriptVersionCache | undefined;

        /**
         * Stores the text when there are no changes to the script version cache
         * The script version cache is generated on demand and text is still retained.
         * Only on edits to the script version cache, the text will be set to undefined
         */
        private text: string | undefined;
        /**
         * Line map for the text when there is no script version cache present
         */
        private lineMap: number[] | undefined;

        /**
         * When a large file is loaded, text will artificially be set to "".
         * In order to be able to report correct telemetry, we store the actual
         * file size in this case.  (In other cases where text === "", e.g.
         * for mixed content or dynamic files, fileSize will be undefined.)
         */
        private fileSize: number | undefined;

        /**
         * True if the text is for the file thats open in the editor
         */
        public isOpen = false;
        /**
         * True if the text present is the text from the file on the disk
         */
        private ownFileText = false;
        /**
         * True when reloading contents of file from the disk is pending
         */
        private pendingReloadFromDisk = false;

        constructor(private readonly host: ServerHost, private readonly info: ScriptInfo, initialVersion?: ScriptInfoVersion) {
            this.version = initialVersion || { svc: 0, text: 0 };
        }

        public getVersion() {
            return this.svc
                ? `SVC-${this.version.svc}-${this.svc.getSnapshotVersion()}`
                : `Text-${this.version.text}`;
        }

        public hasScriptVersionCache_TestOnly() {
            return this.svc !== undefined;
        }

        public useScriptVersionCache_TestOnly() {
            this.switchToScriptVersionCache();
        }

        private resetSourceMapInfo() {
            this.info.sourceFileLike = undefined;
            this.info.closeSourceMapFileWatcher();
            this.info.sourceMapFilePath = undefined;
            this.info.declarationInfoPath = undefined;
            this.info.sourceInfos = undefined;
            this.info.documentPositionMapper = undefined;
        }

        /** Public for testing */
        public useText(newText?: string) {
            this.svc = undefined;
            this.text = newText;
            this.lineMap = undefined;
            this.fileSize = undefined;
            this.resetSourceMapInfo();
            this.version.text++;
        }

        public edit(start: number, end: number, newText: string) {
            this.switchToScriptVersionCache().edit(start, end - start, newText);
            this.ownFileText = false;
            this.text = undefined;
            this.lineMap = undefined;
            this.fileSize = undefined;
            this.resetSourceMapInfo();
        }

        /**
         * Set the contents as newText
         * returns true if text changed
         */
        public reload(newText: string): boolean {
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

            return false;
        }

        /**
         * Reads the contents from tempFile(if supplied) or own file and sets it as contents
         * returns true if text changed
         */
        public reloadWithFileText(tempFileName?: string) {
            const { text: newText, fileSize } = this.getFileTextAndSize(tempFileName);
            const reloaded = this.reload(newText);
            this.fileSize = fileSize; // NB: after reload since reload clears it
            this.ownFileText = !tempFileName || tempFileName === this.info.fileName;
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

        /**
         * For telemetry purposes, we would like to be able to report the size of the file.
         * However, we do not want telemetry to require extra file I/O so we report a size
         * that may be stale (e.g. may not reflect change made on disk since the last reload).
         * NB: Will read from disk if the file contents have never been loaded because
         * telemetry falsely indicating size 0 would be counter-productive.
         */
        public getTelemetryFileSize(): number {
            return !!this.fileSize
                ? this.fileSize
                : !!this.text // Check text before svc because its length is cheaper
                    ? this.text.length // Could be wrong if this.pendingReloadFromDisk
                    : !!this.svc
                        ? this.svc.getSnapshot().getLength() // Could be wrong if this.pendingReloadFromDisk
                        : this.getSnapshot().getLength(); // Should be strictly correct
        }

        public getSnapshot(): IScriptSnapshot {
            return this.useScriptVersionCacheIfValidOrOpen()
                ? this.svc!.getSnapshot()
                : ScriptSnapshot.fromString(this.getOrLoadText());
        }

        public getAbsolutePositionAndLineText(line: number): AbsolutePositionAndLineText {
            return this.switchToScriptVersionCache().getAbsolutePositionAndLineText(line);
        }
        /**
         *  @param line 0 based index
         */
        lineToTextSpan(line: number): TextSpan {
            if (!this.useScriptVersionCacheIfValidOrOpen()) {
                const lineMap = this.getLineMap();
                const start = lineMap[line]; // -1 since line is 1-based
                const end = line + 1 < lineMap.length ? lineMap[line + 1] : this.text!.length;
                return createTextSpanFromBounds(start, end);
            }
            return this.svc!.lineToTextSpan(line);
        }

        /**
         * @param line 1 based index
         * @param offset 1 based index
         */
        lineOffsetToPosition(line: number, offset: number, allowEdits?: true): number {
            if (!this.useScriptVersionCacheIfValidOrOpen()) {
                return computePositionOfLineAndCharacter(this.getLineMap(), line - 1, offset - 1, this.text, allowEdits);
            }

            // TODO: assert this offset is actually on the line
            return this.svc!.lineOffsetToPosition(line, offset);
        }

        positionToLineOffset(position: number): protocol.Location {
            if (!this.useScriptVersionCacheIfValidOrOpen()) {
                const { line, character } = computeLineAndCharacterOfPosition(this.getLineMap(), position);
                return { line: line + 1, offset: character + 1 };
            }
            return this.svc!.positionToLineOffset(position);
        }

        private getFileTextAndSize(tempFileName?: string): { text: string, fileSize?: number } {
            let text: string;
            const fileName = tempFileName || this.info.fileName;
            const getText = () => text === undefined ? (text = this.host.readFile(fileName) || "") : text;
            // Only non typescript files have size limitation
            if (!hasTSFileExtension(this.info.fileName)) {
                const fileSize = this.host.getFileSize ? this.host.getFileSize(fileName) : getText().length;
                if (fileSize > maxFileSize) {
                    Debug.assert(!!this.info.containingProjects.length);
                    const service = this.info.containingProjects[0].projectService;
                    service.logger.info(`Skipped loading contents of large file ${fileName} for info ${this.info.fileName}: fileSize: ${fileSize}`);
                    this.info.containingProjects[0].projectService.sendLargeFileReferencedEvent(fileName, fileSize);
                    return { text: "", fileSize };
                }
            }
            return { text: getText() };
        }

        private switchToScriptVersionCache(): ScriptVersionCache {
            if (!this.svc || this.pendingReloadFromDisk) {
                this.svc = ScriptVersionCache.fromString(this.getOrLoadText());
                this.version.svc++;
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
            return this.text!;
        }

        private getLineMap() {
            Debug.assert(!this.svc, "ScriptVersionCache should not be set");
            return this.lineMap || (this.lineMap = computeLineStarts(this.getOrLoadText()));
        }

        getLineInfo(): LineInfo {
            if (this.svc) {
                return {
                    getLineCount: () => this.svc!.getLineCount(),
                    getLineText: line => this.svc!.getAbsolutePositionAndLineText(line + 1).lineText!
                };
            }
            const lineMap = this.getLineMap();
            return getLineInfo(this.text!, lineMap);
        }
    }

    export function isDynamicFileName(fileName: NormalizedPath) {
        return fileName[0] === "^" ||
            ((stringContains(fileName, "walkThroughSnippet:/") || stringContains(fileName, "untitled:/")) &&
                getBaseFileName(fileName)[0] === "^") ||
            (stringContains(fileName, ":^") && !stringContains(fileName, directorySeparator));
    }

    /*@internal*/
    export interface DocumentRegistrySourceFileCache {
        key: DocumentRegistryBucketKey;
        sourceFile: SourceFile;
    }

    /*@internal*/
    export interface SourceMapFileWatcher {
        watcher: FileWatcher;
        sourceInfos?: Map<true>;
    }

    export class ScriptInfo {
        /**
         * All projects that include this file
         */
        readonly containingProjects: Project[] = [];
        private formatSettings: FormatCodeSettings | undefined;
        private preferences: protocol.UserPreferences | undefined;

        /* @internal */
        fileWatcher: FileWatcher | undefined;
        private textStorage: TextStorage;

        /*@internal*/
        readonly isDynamic: boolean;

        /*@internal*/
        /** Set to real path if path is different from info.path */
        private realpath: Path | undefined;

        /*@internal*/
        cacheSourceFile: DocumentRegistrySourceFileCache | undefined;

        /*@internal*/
        mTime?: number;

        /*@internal*/
        sourceFileLike?: SourceFileLike;

        /*@internal*/
        sourceMapFilePath?: Path | SourceMapFileWatcher | false;

        // Present on sourceMapFile info
        /*@internal*/
        declarationInfoPath?: Path;
        /*@internal*/
        sourceInfos?: Map<true>;
        /*@internal*/
        documentPositionMapper?: DocumentPositionMapper | false;

        constructor(
            private readonly host: ServerHost,
            readonly fileName: NormalizedPath,
            readonly scriptKind: ScriptKind,
            public readonly hasMixedContent: boolean,
            readonly path: Path,
            initialVersion?: ScriptInfoVersion) {
            this.isDynamic = isDynamicFileName(fileName);

            this.textStorage = new TextStorage(host, this, initialVersion);
            if (hasMixedContent || this.isDynamic) {
                this.textStorage.reload("");
                this.realpath = this.path;
            }
            this.scriptKind = scriptKind
                ? scriptKind
                : getScriptKindFromFileName(fileName);
        }

        /*@internal*/
        getVersion() {
            return this.textStorage.version;
        }

        /*@internal*/
        getTelemetryFileSize() {
            return this.textStorage.getTelemetryFileSize();
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
                            project.projectService.realpathToScriptInfos!.add(this.realpath, this); // TODO: GH#18217
                        }
                    }
                }
            }
        }

        /*@internal*/
        getRealpathIfDifferent(): Path | undefined {
            return this.realpath && this.realpath !== this.path ? this.realpath : undefined;
        }

        getFormatCodeSettings(): FormatCodeSettings | undefined { return this.formatSettings; }
        getPreferences(): protocol.UserPreferences | undefined { return this.preferences; }

        attachToProject(project: Project): boolean {
            const isNew = !this.isAttached(project);
            if (isNew) {
                this.containingProjects.push(project);
                project.onFileAddedOrRemoved();
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
                        project.onFileAddedOrRemoved();
                        this.containingProjects.pop();
                    }
                    break;
                case 2:
                    if (this.containingProjects[0] === project) {
                        project.onFileAddedOrRemoved();
                        this.containingProjects[0] = this.containingProjects.pop()!;
                    }
                    else if (this.containingProjects[1] === project) {
                        project.onFileAddedOrRemoved();
                        this.containingProjects.pop();
                    }
                    break;
                default:
                    if (unorderedRemoveItem(this.containingProjects, project)) {
                        project.onFileAddedOrRemoved();
                    }
                    break;
            }
        }

        detachAllProjects() {
            for (const p of this.containingProjects) {
                if (isConfiguredProject(p)) {
                    p.getCachedDirectoryStructureHost().addOrDeleteFile(this.fileName, this.path, FileWatcherEventKind.Deleted);
                }
                const existingRoot = p.getRootFilesMap().get(this.path);
                // detach is unnecessary since we'll clean the list of containing projects anyways
                p.removeFile(this, /*fileExists*/ false, /*detachFromProjects*/ false);
                // If the info was for the external or configured project's root,
                // add missing file as the root
                if (existingRoot && !isInferredProject(p)) {
                    p.addMissingFileRoot(existingRoot.fileName);
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
                    // If this file belongs to multiple projects, below is the order in which default project is used
                    // - for open script info, its default configured project during opening is default if info is part of it
                    // - first configured project of which script info is not a source of project reference redirect
                    // - first configured project
                    // - first external project
                    // - first inferred project
                    let firstExternalProject: ExternalProject | undefined;
                    let firstConfiguredProject: ConfiguredProject | undefined;
                    let firstNonSourceOfProjectReferenceRedirect: ConfiguredProject | undefined;
                    let defaultConfiguredProject: ConfiguredProject | false | undefined;
                    for (let index = 0; index < this.containingProjects.length; index++) {
                        const project = this.containingProjects[index];
                        if (isConfiguredProject(project)) {
                            if (!project.isSourceOfProjectReferenceRedirect(this.fileName)) {
                                // If we havent found default configuredProject and
                                // its not the last one, find it and use that one if there
                                if (defaultConfiguredProject === undefined &&
                                    index !== this.containingProjects.length - 1) {
                                    defaultConfiguredProject = project.projectService.findDefaultConfiguredProject(this) || false;
                                }
                                if (defaultConfiguredProject === project) return project;
                                if (!firstNonSourceOfProjectReferenceRedirect) firstNonSourceOfProjectReferenceRedirect = project;
                            }
                            if (!firstConfiguredProject) firstConfiguredProject = project;
                        }
                        else if (!firstExternalProject && isExternalProject(project)) {
                            firstExternalProject = project;
                        }
                    }
                    return defaultConfiguredProject ||
                        firstNonSourceOfProjectReferenceRedirect ||
                        firstConfiguredProject ||
                        firstExternalProject ||
                        this.containingProjects[0];
            }
        }

        registerFileUpdate(): void {
            for (const p of this.containingProjects) {
                p.registerFileUpdate(this.path);
            }
        }

        setOptions(formatSettings: FormatCodeSettings, preferences: protocol.UserPreferences | undefined): void {
            if (formatSettings) {
                if (!this.formatSettings) {
                    this.formatSettings = getDefaultFormatCodeSettings(this.host.newLine);
                    assign(this.formatSettings, formatSettings);
                }
                else {
                    this.formatSettings = { ...this.formatSettings, ...formatSettings };
                }
            }

            if (preferences) {
                if (!this.preferences) {
                    this.preferences = emptyOptions;
                }
                this.preferences = { ...this.preferences, ...preferences };
            }
        }

        getLatestVersion() {
            // Ensure we have updated snapshot to give back latest version
            this.textStorage.getSnapshot();
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
                return true;
            }
            else {
                if (this.textStorage.reloadWithFileText(tempFileName)) {
                    this.markContainingProjectsAsDirty();
                    return true;
                }
            }
            return false;
        }

        /*@internal*/
        getAbsolutePositionAndLineText(line: number): AbsolutePositionAndLineText {
            return this.textStorage.getAbsolutePositionAndLineText(line);
        }

        editContent(start: number, end: number, newText: string): void {
            this.textStorage.edit(start, end, newText);
            this.markContainingProjectsAsDirty();
        }

        markContainingProjectsAsDirty() {
            for (const p of this.containingProjects) {
                p.markFileAsDirty(this.path);
            }
        }

        isOrphan() {
            return !forEach(this.containingProjects, p => !p.isOrphan());
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
        lineOffsetToPosition(line: number, offset: number): number;
        /*@internal*/
        lineOffsetToPosition(line: number, offset: number, allowEdits?: true): number; // eslint-disable-line @typescript-eslint/unified-signatures
        lineOffsetToPosition(line: number, offset: number, allowEdits?: true): number {
            return this.textStorage.lineOffsetToPosition(line, offset, allowEdits);
        }

        positionToLineOffset(position: number): protocol.Location {
            failIfInvalidPosition(position);
            const location = this.textStorage.positionToLineOffset(position);
            failIfInvalidLocation(location);
            return location;
        }

        public isJavaScript() {
            return this.scriptKind === ScriptKind.JS || this.scriptKind === ScriptKind.JSX;
        }

        /*@internal*/
        getLineInfo(): LineInfo {
            return this.textStorage.getLineInfo();
        }

        /*@internal*/
        closeSourceMapFileWatcher() {
            if (this.sourceMapFilePath && !isString(this.sourceMapFilePath)) {
                closeFileWatcherOf(this.sourceMapFilePath);
                this.sourceMapFilePath = undefined;
            }
        }
    }

    function failIfInvalidPosition(position: number) {
        Debug.assert(typeof position === "number", `Expected position ${position} to be a number.`);
        Debug.assert(position >= 0, `Expected position to be non-negative.`);
    }

    function failIfInvalidLocation(location: protocol.Location) {
        Debug.assert(typeof location.line === "number", `Expected line ${location.line} to be a number.`);
        Debug.assert(typeof location.offset === "number", `Expected offset ${location.offset} to be a number.`);

        Debug.assert(location.line > 0, `Expected line to be non-${location.line === 0 ? "zero" : "negative"}`);
        Debug.assert(location.offset > 0, `Expected offset to be non-${location.offset === 0 ? "zero" : "negative"}`);
    }
}
