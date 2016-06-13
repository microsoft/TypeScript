/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="session.ts" />
/// <reference path="node.d.ts" />


namespace ts.server {

    // Todo@dirk ask why the node.d.ts is so minimal. The tsserver run in node only anyways.
    const path: typeof NodeJS.path = require("path");
    var crypto = require('crypto');

    export interface BuilderHost {
        logError(err: Error, cmd: string): void;
        event(info: any, eventName: string): void;
        useCaseSensitiveFileNames(): boolean;
    }

    export interface Builder {
        computeDiagnostics(changedFile?: string, delay?: number): void;
    }

    class NullBuilder implements Builder  {
        computeDiagnostics(changedFile?: string, delay?: number): void {
        }
    }

    abstract class AbstractBuilder {
        constructor(protected project: Project, protected host: BuilderHost) {
        }

        getCanonicalFileName(file: string) {
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

        public semanticCheck(file: string) {
            try {
                const diagnostics = this.project.compilerService.languageService.getSemanticDiagnostics(file);

                if (diagnostics) {
                    this.host.event({ 
                        file: file, 
                        diagnostics: diagnostics.map(diagnostic => this.formatDiagnostics(file, diagnostic)) 
                    }, "semanticDiag");
                }
            } catch (err) {
                this.host.logError(err, "semantic check");
            }
        }

        public syntacticCheck(file: string) {
            try {
                const diagnostics = this.project.compilerService.languageService.getSyntacticDiagnostics(file);
                if (diagnostics) {
                    this.host.event({
                        file: file,
                        diagnostics: diagnostics.map(diagnostic => this.formatDiagnostics(file, diagnostic))
                    }, "syntaxDiag");
                }
            } catch (err) {
                this.host.logError(err, "syntactic check");
            }
        }
    }

    abstract class NaiveBuilder extends AbstractBuilder {

        private diagnosticImmediate: any;
        private diagnosticTimer: NodeJS.Timer;
        
        protected checkMany(files: string[], changeSequence: number, delay: number): void {
            if (this.diagnosticImmediate) {
                clearImmediate(this.diagnosticImmediate);
                this.diagnosticImmediate = null;
            }
            if (this.diagnosticTimer) {
                clearTimeout(this.diagnosticTimer);
                this.diagnosticTimer = null;
            }
            let index = 0;
            const checkOne = () => {
                if (this.project.changeSequence !== changeSequence) {
                    return;
                }
                const toCheck = files[index++];
                let sourceFile = this.project.getSourceFileFromName(toCheck, false);
                if (sourceFile) {
                    this.syntacticCheck(toCheck);
                    setImmediate(() => {
                        this.semanticCheck(toCheck);
                        if (files.length > index) {
                            if (delay === -1) {
                                this.diagnosticImmediate= setImmediate(checkOne);
                            } else {
                                this.diagnosticTimer = setTimeout(checkOne, delay);
                            }
                        }
                    });
                }
            }
            if (files.length > index && this.project.changeSequence === changeSequence) {
                if (delay === -1) {
                    this.diagnosticImmediate = setImmediate(checkOne);
                } else {
                    this.diagnosticTimer = setTimeout(checkOne, delay);
                }
            }
        }

    }

    class AllFilesBuilder extends NaiveBuilder implements Builder {

        constructor(project: Project, channel: BuilderHost, private delay: number = -1, private limit: number = 100) {
            super(project, channel);
        }

        public computeDiagnostics(changedFile?: string, delay?: number): void {
            const fileNames = this.project.getFileNames();
            // No need to analyze lib.d.ts
            let fileNamesInProject = fileNames.filter((value, index, array) => path.basename(value) !== 'lib.d.ts');

            // Sort the file name list to make the recently touched files come first
            const highPriorityFiles: string[] = [];
            const mediumPriorityFiles: string[] = [];
            const lowPriorityFiles: string[] = [];
            const veryLowPriorityFiles: string[] = [];
            for (const fileNameInProject of fileNamesInProject) {
                if (changedFile && this.getCanonicalFileName(fileNameInProject) == this.getCanonicalFileName(changedFile))
                    highPriorityFiles.push(fileNameInProject);
                else {
                    const info = this.project.projectService.getScriptInfo(fileNameInProject);
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
                this.checkMany(fileNamesInProject, this.project.changeSequence, delay ? delay : this.delay);
            }
        }
    }

    class OpenFilesBuilder extends NaiveBuilder implements Builder {
        constructor(project: Project, channel: BuilderHost, private delay: number = -1, private limit: number = 100) {
            super(project, channel);
        }

        public computeDiagnostics(changedFile?: string, delay?: number): void {
            const fileNames = this.project.getFileNames();
            let toCheck = fileNames.reduce<string[]>((memo, file) => {
                const info = this.project.projectService.getScriptInfo(file);
                if (info.isOpen && file !== changedFile && path.basename(file) !== 'lib.d.ts') {
                    memo.push(file);
                }
                return memo;
            }, changedFile ? [changedFile] : []);
            if (toCheck.length > 0) {
                this.checkMany(toCheck, this.project.changeSequence, delay ? delay : this.delay);
            }
        }
    }

    interface FileInfoProvider {
        get(fileName: string): FileInfo;
    }

    class FileInfo {

        private finalized: boolean;
        private references: FileInfo[];
        private referencedBy: FileInfo[]
        private signature: string;

        constructor(private sourceFile: SourceFile) {
            this.finalized = false;
            this.references = null;
            this.referencedBy = null;
            this.signature = null;
        }

        private static binarySearch(array: FileInfo[], value: string): number {
            if (!array) {
                return -1;
            }
            let low = 0;
            let high = array.length - 1;

            while (low <= high) {
                const middle = ((low + high) / 2) | 0;
                const midValue = array[middle].sourceFile.fileName;
                if (midValue === value) {
                    return middle;
                } else if (midValue > value) {
                    high = middle - 1;
                } else {
                    low = middle + 1;
                }
            }
            return ~low;
        }

        private static compareStrings(l: string, r: string): number {
            return (l < r ? -1 : (l > r ? 1 : 0));
        };

        private static compareFileInfos(lf: FileInfo, rf: FileInfo): number {
            let l = lf.sourceFile.fileName;
            let r = rf.sourceFile.fileName;
            return (l < r ? -1 : (l > r ? 1 : 0));
        };

        private static addElement(array: FileInfo[], finalized: boolean, file: FileInfo): void {
            if (finalized) {
                let insertIndex = FileInfo.binarySearch(array, file.sourceFile.fileName);
                if (insertIndex < 0) {
                    array.splice(~insertIndex, 0, file);
                }
            } else {
                array.push(file);
            }
        }

        private static removeElement(array: FileInfo[], finalized: boolean, file: FileInfo): void {
            if (!array) {
                return;
            }
            if (finalized) {
                let index = FileInfo.binarySearch(array, file.sourceFile.fileName);
                if (index >= 0) {
                    array.splice(index, 1);
                }
            } else {
                const fileName = file.sourceFile.fileName;
                for (let i = 0; i < array.length; i++) {
                    if (fileName === array[i].sourceFile.fileName) {
                        array.splice(i, 1);
                        break;
                    }
                }
            }
        }

        public fileName(): string {
            return this.sourceFile.fileName;
        }

        public buildDependencies(provider: FileInfoProvider): void {
            let modules = this.sourceFile.resolvedModules;
            if (modules) {
                Object.keys(modules).forEach((key) => {
                    let module = modules[key];
                    let fileInfo = provider.get(module.resolvedFileName);
                    if (fileInfo) {
                        fileInfo.addReferencedBy(this);
                        this.addReferences(fileInfo);
                    }
                });
            }
        }

        public finalize(): void {
            if (this.references) {
                this.references.sort(FileInfo.compareFileInfos);
            }
            if (this.referencedBy) {
                this.referencedBy.sort(FileInfo.compareFileInfos);
            }
            this.finalized = true;
        }

        public update(project: Project, provider: FileInfoProvider): boolean {
            let modules = this.sourceFile.resolvedModules;
            let newReferences: FileInfo[] = null;
            if (modules) {
                newReferences = Object.keys(modules).map((key) => modules[key].resolvedFileName).reduce<FileInfo[]>((memo, fileName) => {
                    let fileInfo = provider.get(fileName);
                    if (fileInfo) {
                        memo.push(fileInfo);
                    }
                    return memo;
                }, []);
                newReferences.sort(FileInfo.compareFileInfos);
            } else {
                newReferences = [];
            }
            

            let currentReferences = this.references || [];
            let end = Math.max(currentReferences.length, newReferences.length);
            let currentIndex = 0;
            let newIndex = 0;
            while(currentIndex < end && newIndex < end) {
                let currentInfo = currentReferences[currentIndex];
                let newInfo = newReferences[newIndex];
                let compare = FileInfo.compareFileInfos(currentInfo, newInfo);
                if (compare < 0) {
                    // New reference is greater then current reference. That means
                    // the current reference doesn't exist anymore after parsing. So delete
                    // references.
                    currentInfo.removeReferencedBy(this);
                    currentIndex++
                } else if (compare > 0) {
                    // new new info. Add dependy
                    newInfo.addReferencedBy(this);
                    newIndex++;
                } else {
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
            this.references = newReferences.length > 0 ? newReferences : null;


            let fileName = this.sourceFile.fileName;
            let lastSignature: string = this.signature;
            this.signature = null;
            if (this.sourceFile.isDeclarationFile) {
                this.signature = crypto.createHash('md5')
                    .update(this.sourceFile.text)
                    .digest('base64');
            } else {
                // ToDo@dirkb for now we can only get the declaration file if we emit all files.
                // We need to get better here since we can't emit JS files on type. Or ???
                let emitOutput = project.compilerService.languageService.getEmitOutput(fileName);
                for (let file of emitOutput.outputFiles) {
                    if (/\.d\.ts$/.test(file.name)) {
                        this.signature = crypto.createHash('md5')
                            .update(file.text)
                            .digest('base64');
                    }
                }
            }
            return !this.signature || lastSignature !== this.signature;
        }

        public addReferencedBy(file: FileInfo): void {
            if (!this.referencedBy) {
                this.referencedBy = [];
                this.referencedBy.push(file);
                return;
            }
            FileInfo.addElement(this.referencedBy, this.finalized, file);
        }

        public removeReferencedBy(file: FileInfo): void {
            FileInfo.removeElement(this.referencedBy, this.finalized, file);
        }

        public queueReferencedBy(queue: FileInfo[]): void {
            if (this.referencedBy) {
                this.referencedBy.forEach((fileInfo) => queue.push(fileInfo));
            }
        }

        private addReferences(file: FileInfo): void {
            if (!this.references) {
                this.references = [];
                this.references.push(file);
                return;
            }
            FileInfo.addElement(this.references, this.finalized, file);
        }

        public removeReferences(file: FileInfo): void {
            FileInfo.removeElement(this.references, this.finalized, file);
        }
    }

    class ModuleBuilder extends AbstractBuilder implements Builder {

        private fileInfos: Map<FileInfo>;
        private provider: FileInfoProvider;

        private queue: FileInfo[];

        constructor(project: Project, host: BuilderHost) {
            super(project, host);
            this.provider = {
                get: (fileName: string): FileInfo => {
                    if (!this.fileInfos) {
                        return undefined;
                    }
                    return this.fileInfos[fileName];
                }
            };
            this.queue = [];
        }

        public computeDiagnostics(changedFile: string, delay: number): void {
            this.ensureDependencyGraph();
            if (changedFile) {
                let fileInfo = this.fileInfos[changedFile];
                if (fileInfo) {
                    this.queue.push(fileInfo);
                    this.processQueue();
                }
            }
        }

        private processQueue(): void {
            setImmediate(() => {
                if (this.queue.length === 0) {
                    return;
                }
                let fileInfo = this.queue.shift();
                this.syntacticCheck(fileInfo.fileName());
                setImmediate(() => {
                    this.semanticCheck(fileInfo.fileName());
                    if (fileInfo.update(this.project, this.provider)) {
                        fileInfo.queueReferencedBy(this.queue);
                        this.processQueue();
                    }
                });
            });
        }

        private ensureDependencyGraph(): void {
            if (this.fileInfos) {
                return;
            }
            this.fileInfos = Object.create(null);
            const fileNames = this.project.getFileNames();
            let fileInfos = fileNames.reduce<FileInfo[]>((memo, file) => {
                let basename = path.basename(file);
                if (basename === 'lib.d.ts') {
                    return memo;
                }
                let sourceFile = this.project.compilerService.languageService.getProgram().getSourceFile(file);
                let fileInfo = new FileInfo(sourceFile);
                this.fileInfos[fileInfo.fileName()] = fileInfo;
                memo.push(fileInfo);
                return memo;
            }, []);
            fileInfos.forEach((fileInfo) => fileInfo.buildDependencies(this.provider));
            fileInfos.forEach((fileInfo) => fileInfo.finalize());
        }
    }

    class VirtualProjectBuilder extends AbstractBuilder implements Builder {
        constructor(project: Project, host: BuilderHost) {
            super(project, host);
        }

        public computeDiagnostics(changedFile: string, delay: number): void {
            
        }
    }

    export function createBuilder(project: Project, builderHost: BuilderHost): Builder {
        if (!project.projectService.enableAutoDiagnostics) {
            return new NullBuilder();
        }
        if (!project.isConfiguredProject()) {
            return new VirtualProjectBuilder(project, builderHost);
        }
        let options = project.projectOptions;
        if (!options || !options.autoDiagnostics) {
            return new OpenFilesBuilder(project, builderHost);
        }

        if (options.compilerOptions && options.compilerOptions.module) {
            let moduleKind = options.compilerOptions.module;
            switch (moduleKind) {
                case ModuleKind.AMD:
                case ModuleKind.CommonJS:
                case ModuleKind.UMD:
                case ModuleKind.System:
                    return new ModuleBuilder(project, builderHost);
                default:
                    return new AllFilesBuilder(project, builderHost);
            }
        } else {
            // What is the default module system in TS?
        }
    }
}