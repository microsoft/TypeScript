/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="session.ts" />
/// <reference path="node.d.ts" />

namespace ts.server {

    const path: typeof NodeJS.path = require("path");
    const crypto: any = require("crypto");
    const fs: any = require("fs");


    /* tslint:disable */
    function createMap<T>(): Map<T> {
        return Object.create(null);
    }
    /* tslint:enable */

    export interface BuilderHost {
        logError(err: Error, cmd: string): void;
        event(info: any, eventName: string): void;
        useCaseSensitiveFileNames(): boolean;
    }

    export interface Builder {
        fileCreated(file: string): void;
        fileOpened(file: string): void;
        fileChanged(file: string): void;
        fileClosed(file: string): void;
        fileDeleted(file: string): void;
    }

    class NullBuilder implements Builder  {
        constructor(private project: Project, host: BuilderHost) {
        }
        public fileCreated(file: string): void {
        }
        public fileOpened(file: string): void {
        }
        public fileChanged(file: string): void {
        }
        public fileClosed(file: string): void {
        }
        public fileDeleted(file: string): void {
        }
    }

    interface Item<T> {
        previous: Item<T>;
        next: Item<T>;
        key: string;
        value: T;
    }

    class CompileQueue<T> {

        private map: Map<Item<T>>;
        private head: Item<T>;
        private tail: Item<T>;

        constructor() {
            this.map = createMap<Item<T>>();
            this.head = undefined;
            this.tail = undefined;
        }

        public isEmpty(): boolean {
            return !this.head && !this.tail;
        }

        public get(key: string): T {
            const item = this.map[key];
            if (!item) {
                return undefined;
            }
            return item.value;
        }

        public add(key: string, value: T, touch = false): void {
            let item = this.map[key];
            if (item) {
                item.value = value;
                if (touch) {
                    this.touch(item);
                }
            }
            else {
                item = { key, value, next: undefined, previous: undefined };
                if (touch) {
                    this.addItemFirst(item);
                }
                else {
                    this.addItemLast(item);
                }
                this.map[key] = item;
            }
        }

        public remove(key: string): T {
            const item = this.map[key];
            if (!item) {
                return undefined;
            }
            delete this.map[key];
            this.removeItem(item);
            return item.value;
        }

        public shift(): T {
            if (!this.head && !this.tail) {
                return undefined;
            }
            const item = this.head;
            delete this.map[item.key];
            this.removeItem(item);
            return item.value;
        }

        private addItemFirst(item: Item<T>): void {
            // First time Insert
            if (!this.head && !this.tail) {
                this.tail = item;
            }
            else {
                item.next = this.head;
                this.head.previous = item;
            }
            this.head = item;
        }

        private addItemLast(item: Item<T>): void {
            // First time Insert
            if (!this.head && !this.tail) {
                this.head = item;
            }
            else {
                item.previous = this.tail;
                this.tail.next = item;
            }
            this.tail = item;
        }

        private removeItem(item: Item<T>): void {
            if (item === this.head && item === this.tail) {
                this.head = undefined;
                this.tail = undefined;
            }
            else if (item === this.head) {
                this.head = item.next;
            }
            else if (item === this.tail) {
                this.tail = item.previous;
            }
            else {
                const next = item.next;
                const previous = item.previous;
                next.previous = previous;
                previous.next = next;
            }
        }

        private touch(item: Item<T>): void {
            if (item === this.head)
                return;

            const next = item.next;
            const previous = item.previous;

            // Unlink the item
            if (item === this.tail) {
                this.tail = previous;
            }
            else {
                // Both next and previous are not null since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }

            // Insert the node at head
            item.previous = undefined;
            item.next = this.head;
            this.head.previous = item;
            this.head = item;
        }
    }

    interface BuilderAccessor<T extends FileInfo> {
        getProject(): Project;
        getFileInfo(fileName: string): T;
    }

    interface FileInfo {
        fileName(): string;
        update(builder: BuilderAccessor<FileInfo>): boolean;
    }

    abstract class AbstractFileInfo {

        protected _shapeSignature: string;

        constructor(protected _fileName: string) {
            this._shapeSignature = undefined;
        }

        public fileName(): string {
            return this._fileName;
        }

        public shapeSignature(): string {
            return this._shapeSignature;
        }

        protected getSourceFile(builder: BuilderAccessor<FileInfo>): SourceFile {
            return builder.getProject().compilerService.languageService.getProgram().getSourceFile(this._fileName);
        }

        protected updateShapeSignature(builder: BuilderAccessor<FileInfo>): boolean {
            const lastSignature: string = this._shapeSignature;
            this._shapeSignature = undefined;
            const sourceFile = this.getSourceFile(builder);
            if (sourceFile.isDeclarationFile) {
                this._shapeSignature = crypto.createHash("md5")
                    .update(sourceFile.text)
                    .digest("base64");
            }
            else {
                // ToDo@dirkb for now we can only get the declaration file if we emit all files.
                // We need to get better here since we can't emit JS files on type. Or ???
                const emitOutput = builder.getProject().compilerService.languageService.getEmitOutput(this._fileName);
                for (const file of emitOutput.outputFiles) {
                    if (/\.d\.ts$/.test(file.name)) {
                        this._shapeSignature = crypto.createHash("md5")
                            .update(file.text)
                            .digest("base64");
                    }
                }
            }
            return !this._shapeSignature || lastSignature !== this._shapeSignature;
        }
    }

    abstract class AbstractBuilder<T extends FileInfo> {

        protected compileQueue: CompileQueue<T>;

        constructor(protected project: Project, protected host: BuilderHost, private delay: number) {
            this.compileQueue = new CompileQueue<T>();
        }

        public getProject(): Project {
            return this.project;
        }

        public getCanonicalFileName(file: string) {
            const name = this.host.useCaseSensitiveFileNames() ? file : file.toLowerCase();
            return ts.normalizePath(name);
        }

        private formatDiagnostics(file: string, diagnostic: ts.Diagnostic): protocol.Diagnostic {
            return {
                start: this.project.compilerService.host.positionToLineOffset(file, diagnostic.start),
                end: this.project.compilerService.host.positionToLineOffset(file, diagnostic.start + diagnostic.length),
                text: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
            };
        }

        protected semanticCheck(file: string) {
            try {
                const diagnostics = this.project.compilerService.languageService.getSemanticDiagnostics(file);

                if (diagnostics) {
                    this.host.event({
                        file: file,
                        diagnostics: diagnostics.map(diagnostic => this.formatDiagnostics(file, diagnostic))
                    }, "semanticDiag");
                }
            }
            catch (err) {
                this.host.logError(err, "semantic check");
            }
        }

        protected syntacticCheck(file: string) {
            try {
                const diagnostics = this.project.compilerService.languageService.getSyntacticDiagnostics(file);
                if (diagnostics) {
                    this.host.event({
                        file: file,
                        diagnostics: diagnostics.map(diagnostic => this.formatDiagnostics(file, diagnostic))
                    }, "syntaxDiag");
                }
            }
            catch (err) {
                this.host.logError(err, "syntactic check");
            }
        }

        public fileCreated(file: string): void {
        }

        public fileOpened(file: string): void {
        }

        public fileChanged(file: string): void {
        }

        public fileClosed(file: string): void {
        }

        public fileDeleted(file: string): void {
        }

        protected processCompileQueue() {
            if (this.compileQueue.isEmpty()) {
                this.compileQueueIsEmpty();
                return;
            }
            setImmediate(() => {
                if (this.compileQueue.isEmpty()) {
                    this.compileQueueIsEmpty();
                    return;
                }
                const fileInfo = this.compileQueue.shift();
                this.syntacticCheck(fileInfo.fileName());
                setImmediate(() => {
                    this.semanticCheck(fileInfo.fileName());
                    this.updateCompileQueue(fileInfo);
                    this.processCompileQueue();
                });
            });
        }

        protected abstract updateCompileQueue(fileInfo: T): void;

        protected abstract compileQueueIsEmpty(): void;
    }

    class SimpleFileInfo extends AbstractFileInfo implements FileInfo {

        constructor(fileName: string) {
            super(fileName);
        }

        public update(builder: BuilderAccessor<FileInfo>): boolean {
            return this.updateShapeSignature(builder);
        }
    }

    class SingleFileInfo implements FileInfo {

        constructor(private info: FileInfo) {
        }

        public fileName(): string {
            return this.info.fileName();
        }

        public update(builder: BuilderAccessor<FileInfo>): boolean {
            return false;
        }
    }

    class OpenFilesBuilder extends AbstractBuilder<FileInfo> implements Builder, BuilderAccessor<FileInfo> {

        private openFiles: Map<SimpleFileInfo>;

        constructor(project: Project, channel: BuilderHost, delay = -1, private limit = -1) {
            super(project, channel, delay);
            this.openFiles = createMap<SimpleFileInfo>();
        }

        public getFileInfo(file: string): SimpleFileInfo {
            return this.openFiles[file];
        }

        public fileOpened(file: string): void {
            this.fileChanged(file);
        }

        public fileChanged(file: string): void {
            if (path.basename(file) === "lib.d.ts") {
                return;
            }
            let fileInfo = this.openFiles[file];
            if (!fileInfo) {
                const sourceFile = this.project.compilerService.languageService.getProgram().getSourceFile(file);
                if (sourceFile) {
                    fileInfo = new SimpleFileInfo(file);
                }
            }
            if (!fileInfo) {
                return;
            }
            this.openFiles[file] = fileInfo;
        }

        public fileClosed(file: string): void {
            delete this.openFiles[file];
            this.compileQueue.remove(file);
        }

        protected updateCompileQueue(fileInfo: SimpleFileInfo): void {
            if (!fileInfo.update(this)) {
                return;
            }
            Object.keys(this.openFiles).forEach((key) => {
                if (key === fileInfo.fileName()) {
                    return;
                }
                this.compileQueue.add(key, new SingleFileInfo(this.openFiles[key]));
            });
        }

        protected compileQueueIsEmpty(): void {
        }
    }

    class ModuleFileInfo extends AbstractFileInfo implements FileInfo {

        private finalized: boolean;
        private references: ModuleFileInfo[];
        private referencedBy: ModuleFileInfo[];

        constructor(filename: string, private version: string, private _contentSignature: string) {
            super(filename);
            this.finalized = false;
            this.references = undefined;
            this.referencedBy = undefined;
        }

        private static binarySearch(array: ModuleFileInfo[], value: string): number {
            if (!array) {
                return -1;
            }
            let low = 0;
            let high = array.length - 1;

            while (low <= high) {
                const middle = ((low + high) / 2) | 0;
                const midValue = array[middle].fileName();
                if (midValue === value) {
                    return middle;
                }
                else if (midValue > value) {
                    high = middle - 1;
                }
                else {
                    low = middle + 1;
                }
            }
            return ~low;
        }

        private static compareFileInfos(lf: ModuleFileInfo, rf: ModuleFileInfo): number {
            const l = lf.fileName();
            const r = rf.fileName();
            return (l < r ? -1 : (l > r ? 1 : 0));
        };

        private static addElement(array: ModuleFileInfo[], finalized: boolean, file: ModuleFileInfo): void {
            if (finalized) {
                const insertIndex = ModuleFileInfo.binarySearch(array, file.fileName());
                if (insertIndex < 0) {
                    array.splice(~insertIndex, 0, file);
                }
            }
            else {
                array.push(file);
            }
        }

        private static removeElement(array: ModuleFileInfo[], finalized: boolean, file: ModuleFileInfo): void {
            if (!array) {
                return;
            }
            if (finalized) {
                const index = ModuleFileInfo.binarySearch(array, file.fileName());
                if (index >= 0) {
                    array.splice(index, 1);
                }
            }
            else {
                const fileName = file.fileName();
                for (let i = 0; i < array.length; i++) {
                    if (fileName === array[i].fileName()) {
                        array.splice(i, 1);
                        break;
                    }
                }
            }
        }

        public contentSignature(): string {
            return this._contentSignature;
        }

        public initializeShapeSignature(lastSeenContentSignature: string, shapeSignature: string): void {
            if (lastSeenContentSignature === this._contentSignature) {
                this._shapeSignature = shapeSignature;
            }
        }

        public buildDependencies(builder: BuilderAccessor<ModuleFileInfo>, program: Program): void {
            this.getReferencedFileInfos(builder, program).forEach((fileInfo) => {
                fileInfo.addReferencedBy(this);
                this.addReferences(fileInfo);
            });
        }

        private getReferencedFileInfos(builder: BuilderAccessor<ModuleFileInfo>, program: Program): ModuleFileInfo[] {
            const modules = program.getSourceFile(this.fileName()).resolvedModules;
            const result: ModuleFileInfo[] = [];
            if (modules) {
                // We need to use a set here since the code can contain the same import twice,
                // but that will only be one dependency.
                const referencedModules = createMap<boolean>();
                for (const key of Object.keys(modules)) {
                    const module = modules[key];
                    // ToDo@dirkb the resolved modules contain keys with undefined values for 
                    // modules declared as declare module "fs" { .... }. Ignore for now.
                    if (!module || !module.resolvedFileName) {
                        continue;
                    }
                    referencedModules[module.resolvedFileName] = true;
                }
                for (const key of Object.keys(referencedModules)) {
                    const fileInfo = builder.getFileInfo(key);
                    if (fileInfo) {
                        result.push(fileInfo);
                    }
                }
            }
            return result;
        }

        public finalize(): void {
            if (this.references) {
                this.references.sort(ModuleFileInfo.compareFileInfos);
            }
            if (this.referencedBy) {
                this.referencedBy.sort(ModuleFileInfo.compareFileInfos);
            }
            this.finalized = true;
        }

        public update(builder: BuilderAccessor<ModuleFileInfo>): boolean {
            const program = builder.getProject().compilerService.languageService.getProgram();
            const newReferences: ModuleFileInfo[] = this.getReferencedFileInfos(builder, program);
            newReferences.sort(ModuleFileInfo.compareFileInfos);

            const currentReferences = this.references || [];
            const end = Math.max(currentReferences.length, newReferences.length);
            let currentIndex = 0;
            let newIndex = 0;
            while (currentIndex < end && newIndex < end) {
                const currentInfo = currentReferences[currentIndex];
                const newInfo = newReferences[newIndex];
                const compare = ModuleFileInfo.compareFileInfos(currentInfo, newInfo);
                if (compare < 0) {
                    // New reference is greater then current reference. That means
                    // the current reference doesn't exist anymore after parsing. So delete
                    // references.
                    currentInfo.removeReferencedBy(this);
                    currentIndex++;
                }
                else if (compare > 0) {
                    // A new reference info. Add it.
                    newInfo.addReferencedBy(this);
                    newIndex++;
                }
                else {
                    // Equal. Go to next
                    currentIndex++;
                    newIndex++;
                }
            }
            // Clean old references
            for (let i = currentIndex; i < currentReferences.length; i++) {
                currentReferences[i].removeReferencedBy(this);
            }
            // Update new references
            for (let i = newIndex; i < newReferences.length; i++) {
                newReferences[i].addReferencedBy(this);
            }
            this.references = newReferences.length > 0 ? newReferences : undefined;

            return this.updateShapeSignature(builder);
        }

        protected addReferencedBy(file: ModuleFileInfo): void {
            if (!this.referencedBy) {
                this.referencedBy = [];
                this.referencedBy.push(file);
                return;
            }
            ModuleFileInfo.addElement(this.referencedBy, this.finalized, file);
        }

        protected removeReferencedBy(file: ModuleFileInfo): void {
            ModuleFileInfo.removeElement(this.referencedBy, this.finalized, file);
        }

        public queueReferencedBy(queue: CompileQueue<ModuleFileInfo>): void {
            if (this.referencedBy) {
                this.referencedBy.forEach((fileInfo) => queue.add(fileInfo.fileName(), fileInfo));
            }
        }

        public hasReferences(): boolean {
            return this.references ? this.references.length > 0 : false;
        }

        protected addReferences(file: ModuleFileInfo): void {
            if (!this.references) {
                this.references = [];
                this.references.push(file);
                return;
            }
            ModuleFileInfo.addElement(this.references, this.finalized, file);
        }

        protected removeReferences(file: ModuleFileInfo): void {
            ModuleFileInfo.removeElement(this.references, this.finalized, file);
        }
    }

    class ModuleBuilder extends AbstractBuilder<ModuleFileInfo> implements Builder, BuilderAccessor<ModuleFileInfo> {

        private fileInfos: Map<ModuleFileInfo>;
        private compileRuns: number;

        constructor(project: Project, host: BuilderHost) {
            super(project, host, -1);
            this.compileRuns = 0;
        }

        public getFileInfo(file: string): ModuleFileInfo {
            if (!this.fileInfos) {
                return undefined;
            }
            return this.fileInfos[file];
        }

        public fileOpened(file: string): void {
            this.computeDiagnostics(file);
        }

        public fileChanged(file: string): void {
            this.computeDiagnostics(file);
        }

        protected updateCompileQueue(fileInfo: ModuleFileInfo): void {
            if (fileInfo.update(this)) {
                fileInfo.queueReferencedBy(this.compileQueue);
            }
        }

        protected compileQueueIsEmpty(): void {
            this.compileRuns++;
            if (this.compileRuns === 1) {
                this.saveState();
            }
        }

        private computeDiagnostics(changedFile: string): void {
            this.ensureDependencyGraph();
            if (changedFile) {
                const fileInfo = this.fileInfos[changedFile];
                if (fileInfo) {
                    this.compileQueue.add(fileInfo.fileName(), fileInfo, /*touch*/ true);
                    this.processCompileQueue();
                }
            }
        }

        private ensureDependencyGraph(): void {
            if (this.fileInfos) {
                return;
            }
            this.fileInfos = createMap<ModuleFileInfo>();
            const fileNames = this.project.getFileNames();
            const program = this.project.compilerService.languageService.getProgram();
            const fileInfos = fileNames.reduce<ModuleFileInfo[]>((memo, file) => {
                const basename = path.basename(file);
                if (basename === "lib.d.ts") {
                    return memo;
                }
                const sourceFile = program.getSourceFile(file);
                if (sourceFile) {
                    const fileInfo = new ModuleFileInfo(file, sourceFile.version, crypto.createHash("md5")
                        .update(sourceFile.text)
                        .digest("base64"));
                    this.fileInfos[fileInfo.fileName()] = fileInfo;
                    memo.push(fileInfo);
                }
                return memo;
            }, []);
            const [needsCompile] = this.readState();
            const roots: ModuleFileInfo[] = [];
            fileInfos.forEach((fileInfo) => {
                fileInfo.buildDependencies(this, program);
                if (!fileInfo.hasReferences()) {
                    roots.push(fileInfo);
                }
            });
            fileInfos.forEach((fileInfo) => fileInfo.finalize());
            if (!needsCompile) {
                roots.forEach(fileInfo => this.compileQueue.add(fileInfo.fileName(), fileInfo));
            }
            else {
                needsCompile.forEach(fileInfo => this.compileQueue.add(fileInfo.fileName(), fileInfo));
            }
        }

        private saveState(): void {
            const metaDataDirectory = this.project.projectService.metaDataDirectory;
            const projectFilename = this.project.projectFilename;
            if (!metaDataDirectory || !projectFilename) {
                return;
            }
            const fileNameHash = crypto.createHash("md5").update(projectFilename).digest("hex");
            const stateDirectory = path.join(this.project.projectService.metaDataDirectory, fileNameHash);
            try {
                fs.mkdirSync(stateDirectory);
            }
            catch (err) {
            }
            const stateFileName = `c-${Date.now().toString()}`;
            const content: string[] = [];
            Object.keys(this.fileInfos).forEach((key) => {
                const fileInfo = this.fileInfos[key];
                content.push(JSON.stringify([fileInfo.fileName(), fileInfo.contentSignature(), fileInfo.shapeSignature(), false]));
            });
            function write(fd: any, index: number) {
                if (index < content.length) {
                    fs.write(fd, content[index] + "\n", undefined, "utf8", (err: Error, written: any, str: any) => {
                        if (err) {
                            return;
                        }
                        write(fd, index + 1);
                    });
                }
                else {
                    fs.close(fd, (err: Error) => {

                    });
                }
            }
            if (content.length > 0) {
                fs.open(path.join(stateDirectory, stateFileName), "w", (err: Error, fd: any) => {
                    if (err) {
                        return;
                    }
                    write(fd, 0);
                });
            }
        }

        private readState(): [ModuleFileInfo[], string[]] {
            const metaDataDirectory = this.project.projectService.metaDataDirectory;
            const projectFilename = this.project.projectFilename;
            if (!metaDataDirectory || !projectFilename) {
                return [undefined, undefined];
            }
            const needsCompile: ModuleFileInfo[] = [];
            const deleted: string[] = [];
            const fileNameHash = crypto.createHash("md5").update(projectFilename).digest("hex");
            const stateDirectory = path.join(this.project.projectService.metaDataDirectory, fileNameHash);
            try {
                if (!fs.existsSync(stateDirectory)) {
                    return [undefined, undefined];
                }
                const files: string[] = fs.readdirSync(stateDirectory);
                const toDelete: string[] = [];
                let latestCompleteStateFile: string;
                let latestCompleteStateTime: number;
                let latestDeltaStateFile: string;
                let latestDeltaStateTime: number;
                for (const file of files) {
                    if (file === "." || file === "..") {
                        continue;
                    }
                    if (file.length > 1 && file.charAt(1) === "-") {
                        if (file.charAt(0) === "c") {
                            const stateTime = Number(file.substr(2));
                            if (!latestCompleteStateFile) {
                                latestCompleteStateFile = file;
                                latestCompleteStateTime = stateTime;
                            }
                            else {
                                if (stateTime > latestCompleteStateTime) {
                                    toDelete.push(latestCompleteStateFile);
                                    latestCompleteStateFile = file;
                                    latestCompleteStateTime = stateTime;
                                }
                            }
                        }
                        else if (file.charAt(0) === "d") {
                            const stateTime = Number(file.substr(2));
                            if (!latestDeltaStateFile) {
                                latestDeltaStateFile = file;
                                latestDeltaStateTime = stateTime;
                            }
                            else {
                                if (stateTime > latestDeltaStateTime) {
                                    toDelete.push(latestDeltaStateFile);
                                    latestDeltaStateFile = file;
                                    latestDeltaStateTime = stateTime;
                                }
                            }
                        }
                    }
                }
                if (latestCompleteStateFile && latestDeltaStateFile && latestCompleteStateTime > latestDeltaStateTime) {
                    toDelete.push(latestDeltaStateFile);
                    latestDeltaStateFile = undefined;
                    latestDeltaStateTime = undefined;
                }
                if (!latestCompleteStateFile) {
                    return [undefined, undefined];
                }
                const parseContent = (content: string) => {
                    let start = 0;
                    for (let index = 0; index < content.length; index++) {
                        if (content.charAt(index) === "\n") {
                            try {
                                // A line in a state file has the follwing structure
                                // filename, contentHash, shapeHash, hadErrors
                                const values: [string, string, string, boolean] = JSON.parse(content.substring(start, index));
                                start = index + 1;
                                const fileInfo = this.fileInfos[values[0]];
                                if (fileInfo) {
                                    fileInfo.initializeShapeSignature(values[1], values[2]);
                                    if (fileInfo.contentSignature() !== values[1] || values[3]) {
                                        needsCompile.push(fileInfo);
                                    }
                                }
                                else {
                                    deleted.push(values[0]);
                                }
                            }
                            catch (err) {
                            }
                        }
                    }
                };
                if (latestCompleteStateFile) {
                    parseContent(fs.readFileSync(path.join(stateDirectory, latestCompleteStateFile), { encoding: "utf8" }));
                }
                if (latestDeltaStateFile) {
                    parseContent(fs.readFileSync(path.join(stateDirectory, latestDeltaStateFile), { encoding: "utf8" }));
                }
                // Cleanup unneeded files.
                toDelete.forEach(file => {
                    // Can be done async. If an unlink fails we clean it up the next round.
                    fs.unlink(path.join(stateDirectory, file), (err: Error) => {});
                });
            }
            catch (err) {
                // We couldn't read the state directory. Start with a fresh state.
                return [undefined, undefined];
            }
            return [needsCompile, deleted];
        }
    }

    export function createBuilder(project: Project, builderHost: BuilderHost): Builder {
        if (!project.projectService.autoBuild) {
            return new NullBuilder(project, builderHost);
        }
        if (!project.isConfiguredProject()) {
            return new OpenFilesBuilder(project, builderHost);
        }
        const options = project.projectOptions;
        if (!options || !options.autoDiagnostics) {
            return new OpenFilesBuilder(project, builderHost);
        }

        if (options.compilerOptions && options.compilerOptions.module) {
            const moduleKind = options.compilerOptions.module;
            switch (moduleKind) {
                case ModuleKind.AMD:
                case ModuleKind.CommonJS:
                case ModuleKind.UMD:
                case ModuleKind.System:
                    return new ModuleBuilder(project, builderHost);
                default:
                    return new OpenFilesBuilder(project, builderHost);
            }
        }
        else {
            // What is the default module system in TS?
        }
    }
}