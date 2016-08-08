/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="session.ts" />
/// <reference types="node" />

namespace ts.server {

    interface Hash {
        update(data: any, input_encoding?: string): Hash;
        digest(encoding: string): any;
    }

    const crypto: {
        createHash(algorithm: string): Hash
    } = require("crypto");

    /**
     * An abstract file info that maintains a shape signature.
     */
    export class BuilderFileInfo {

        private lastCheckedShapeSignature: string;
        private lastEmittedFileVersion: string;

        constructor(
            public readonly scriptInfo: ScriptInfo,
            public readonly project: Project
        ) {
        }

        public isExternalModule() {
            const sourceFile = this.getSourceFile();
            return isExternalModule(sourceFile) || this.containsPurelyAmbientModules(sourceFile);
        }

        private containsPurelyAmbientModules(sourceFile: SourceFile) {
            // ambient module declaration will not create externalModuleIndicator
            // and we only consider files containing purely ambient module declarations
            // as external module files
            for (const statement of sourceFile.statements) {
                if (statement.kind !== SyntaxKind.ModuleDeclaration || (<ModuleDeclaration>statement).name.kind !== SyntaxKind.StringLiteral) {
                    return false;
                }
            }
            return true;
        }

        public computeHash(text: string): string {
            return crypto.createHash("md5")
                .update(text)
                .digest("base64");
        }

        public getSourceFile(): SourceFile {
            return this.project.getSourceFile(this.scriptInfo.fileName);
        }

        /**
         * Thie method should only be called upon emitting
         */
        public updateLastEmittedContentSignature() {
            this.lastEmittedFileVersion = this.scriptInfo.getLatestVersion();
        }

        public checkIfShapeSignatureChanged() {
            const sourceFile = this.getSourceFile();
            if (!sourceFile) {
                return true;
            }

            const lastSignature = this.lastCheckedShapeSignature;
            if (sourceFile.isDeclarationFile) {
                this.lastCheckedShapeSignature = this.computeHash(sourceFile.text);
            }
            else {
                const emitOutput = this.project.getLanguageService(/*ensureSynchronized*/ true).getEmitOutput(this.scriptInfo.fileName, /*emitOnlyDtsFiles*/ true);
                if (emitOutput.outputFiles) {
                    this.lastCheckedShapeSignature = this.computeHash(emitOutput.outputFiles[0].text);
                }
            }
            return !lastSignature || this.lastCheckedShapeSignature !== lastSignature;
        }

        public isContentSignatureChangedSinceLastEmit(): boolean {
            return !this.lastEmittedFileVersion || this.scriptInfo.getLatestVersion() !== this.lastEmittedFileVersion;
        }
    }


    export interface Builder {
        readonly project: Project;
        getFilesAffectedBy(fileName: string): string[];
        onProjectUpdateGraph(): void;
        emitFile(fileName: string, writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => void, forced?: boolean): boolean;
    }

    class NullBuilder implements Builder {
        constructor(readonly project: Project) {
        }

        getFilesAffectedBy(fileName: string): string[] {
            return undefined;
        }

        onProjectUpdateGraph() {
        }

        emitFile(fileName: string, writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => void, forced?: boolean): boolean {
            return true;
        }
    }

    abstract class AbstractBuilder<T extends BuilderFileInfo> implements Builder {

        private fileInfos: Map<T> = {};

        constructor(public readonly project: Project) {
        }

        protected getFileInfo(fileName: string): T {
            return this.fileInfos[fileName];
        }

        protected getAllFiles(): string[] {
            return getKeys(this.fileInfos);
        }

        protected setFileInfo(fileName: string, info: T) {
            this.fileInfos[fileName] = info;
        }

        protected removeFileInfo(fileName: string) {
            if (hasProperty(this.fileInfos, fileName)) {
                delete this.fileInfos[fileName];
            }
        }

        protected forEachFileInfo(action: (fileInfo: T) => any) {
            forEachValue(this.fileInfos, action);
        }

        abstract getFilesAffectedBy(fileName: string): string[];
        abstract onProjectUpdateGraph(): void;

        emitFile(fileName: string, writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => void, forced?: boolean): boolean {
            const fileInfo = this.getFileInfo(fileName);
            const shouldEmit = fileInfo && (forced || fileInfo.isContentSignatureChangedSinceLastEmit());
            if (!shouldEmit) {
                return false;
            }

            const { emitSkipped, outputFiles } = this.project.getFileEmitOutput(fileInfo.scriptInfo);
            if (!emitSkipped) {
                fileInfo.updateLastEmittedContentSignature();
                for (const outputFile of outputFiles) {
                    writeFile(outputFile.name, outputFile.text, outputFile.writeByteOrderMark);
                }
            }
            return !emitSkipped;
        }
    }

    class NonModuleBuilder extends AbstractBuilder<BuilderFileInfo> {

        onProjectUpdateGraph() {
        }

        getOrCreateFileInfo(fileName: string) {
            if (!this.getFileInfo(fileName)) {
                const scriptInfo = this.project.getScriptInfo(fileName);
                this.setFileInfo(fileName, new BuilderFileInfo(scriptInfo, this.project));
            }
            return this.getFileInfo(fileName);
        }

        getFilesAffectedBy(fileName: string): string[] {
            const info = this.getOrCreateFileInfo(fileName);
            let result: string[];
            if (info.checkIfShapeSignatureChanged()) {
                result = this.project.getFileNamesWithoutDefaultLib();
            }
            else {
                result = info.isContentSignatureChangedSinceLastEmit() ? [fileName] : [];
            }
            return result;
        }
    }


    class ModuleBuilderFileInfo extends BuilderFileInfo {
        references: ModuleBuilderFileInfo[] = [];
        referencedBy: ModuleBuilderFileInfo[] = [];
        scriptVersionForReferences: string;

        private finalized = false;

        getReferencedByFileNames() {
            return map(this.referencedBy, info => info.scriptInfo.fileName);
        }

        static compareFileInfos(lf: ModuleBuilderFileInfo, rf: ModuleBuilderFileInfo): number {
            const l = lf.scriptInfo.fileName;
            const r = rf.scriptInfo.fileName;
            return (l < r ? -1 : (l > r ? 1 : 0));
        };

        static addToReferenceList(array: ModuleBuilderFileInfo[], fileInfo: ModuleBuilderFileInfo, afterFinalized: boolean) {
            if (!afterFinalized) {
                array.push(fileInfo);
            }
            else {
                const insertIndex = binarySearch(array, fileInfo, ModuleBuilderFileInfo.compareFileInfos);
                if (insertIndex < 0) {
                    array.splice(~insertIndex, 0, fileInfo);
                }
            }
        }

        static removeFromReferenceList(array: ModuleBuilderFileInfo[], fileInfo: ModuleBuilderFileInfo, afterFinalized?: boolean) {
            if (!array) {
                return;
            }

            if (!afterFinalized) {
                // Before finalized the reference lists are not sorted
                for (let i = 0; i < array.length; i++) {
                    if (ModuleBuilderFileInfo.compareFileInfos(array[i], fileInfo) === 0) {
                        array.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                const removeIndex = binarySearch(array, fileInfo, ModuleBuilderFileInfo.compareFileInfos);
                if (removeIndex >= 0) {
                    array.splice(removeIndex, 1);
                }
            }
        }

        addReferencedBy(fileInfo: ModuleBuilderFileInfo): void {
            if (this.referencedBy.length === 0) {
                this.referencedBy.push(fileInfo);
                return;
            }
            ModuleBuilderFileInfo.addToReferenceList(this.referencedBy, fileInfo, this.finalized);
        }

        removeReferencedBy(fileInfo: ModuleBuilderFileInfo): void {
            ModuleBuilderFileInfo.removeFromReferenceList(this.referencedBy, fileInfo, this.finalized);
        }

        finalize() {
            if (this.finalized) {
                return;
            }

            if (this.references.length > 0) {
                this.references.sort(ModuleBuilderFileInfo.compareFileInfos);
            }
            if (this.referencedBy.length > 0) {
                this.referencedBy.sort(ModuleBuilderFileInfo.compareFileInfos);
            }
            this.finalized = true;
        }
    }

    class ModuleBuilder extends AbstractBuilder<ModuleBuilderFileInfo> {

        private isDependencyGraphBuilt = false;
        private lastUpdateProjectVersion: string;

        getReferencedFileInfos(fileName: string): ModuleBuilderFileInfo[] {
            const referencedFileNames = this.project.getReferencedFiles(fileName);
            if (referencedFileNames && referencedFileNames.length > 0) {
                return map(referencedFileNames, f => this.getFileInfo(f)).sort(ModuleBuilderFileInfo.compareFileInfos);
            }
            return [];
        }

        ensureDependencyGraph() {
            if (this.isDependencyGraphBuilt) {
                return;
            }

            const fileNames = this.project.getFileNames();
            for (const fileName of fileNames) {
                const sourceFile = this.project.getSourceFile(fileName);
                if (sourceFile) {
                    const newFileInfo = new ModuleBuilderFileInfo(this.project.getScriptInfo(fileName), this.project);
                    this.setFileInfo(fileName, newFileInfo);
                    this.updateFileReferences(newFileInfo);
                }
            }
            this.forEachFileInfo(fileInfo => fileInfo.finalize());
            this.isDependencyGraphBuilt = true;
        }

        onProjectUpdateGraph() {
            this.updateProjectDependencyGraph();
        }

        updateProjectDependencyGraph() {
            this.ensureDependencyGraph();

            if (!this.lastUpdateProjectVersion || this.project.getProjectVersion() !== this.lastUpdateProjectVersion) {
                const currentFileNames = this.project.getFileNamesWithoutDefaultLib();
                for (const fileName of currentFileNames) {
                    const fileInfo = this.getFileInfo(fileName);
                    if (fileInfo) {
                        this.updateFileReferences(fileInfo);
                    }
                    else {
                        const sourceFile = this.project.getSourceFile(fileName);
                        if (sourceFile) {
                            const newFileInfo = new ModuleBuilderFileInfo(this.project.getScriptInfo(fileName), this.project);
                            this.setFileInfo(fileName, newFileInfo);
                            this.updateFileReferences(newFileInfo);
                        }
                    }
                }
                this.forEachFileInfo(fileInfo => {
                    if (currentFileNames.indexOf(fileInfo.scriptInfo.fileName) < 0) {
                        // This file was deleted from this project
                        this.removeFileReferences(fileInfo);
                        this.removeFileInfo(fileInfo.scriptInfo.fileName);
                    }
                });
                this.lastUpdateProjectVersion = this.project.getProjectVersion();
            }
            return;
        }

        updateFileReferences(fileInfo: ModuleBuilderFileInfo) {
            // Only need to update if the content of the file changed.
            if (fileInfo.scriptVersionForReferences === fileInfo.scriptInfo.getLatestVersion()) {
                return;
            }

            const fileName = fileInfo.scriptInfo.fileName;
            const newReferences = this.getReferencedFileInfos(fileName);
            const oldReferences = fileInfo.references;

            let oldIndex = 0;
            let newIndex = 0;
            while (oldIndex < oldReferences.length && newIndex < newReferences.length) {
                const oldReference = oldReferences[oldIndex];
                const newReference = newReferences[newIndex];
                const compare = ModuleBuilderFileInfo.compareFileInfos(oldReference, newReference);
                if (compare < 0) {
                    // New reference is greater then current reference. That means
                    // the current reference doesn't exist anymore after parsing. So delete
                    // references.
                    oldReference.removeReferencedBy(fileInfo);
                    oldIndex++;
                }
                else if (compare > 0) {
                    // A new reference info. Add it.
                    newReference.addReferencedBy(fileInfo);
                    newIndex++;
                }
                else {
                    // Equal. Go to next
                    oldIndex++;
                    newIndex++;
                }
            }
            // Clean old references
            for (let i = oldIndex; i < oldReferences.length; i++) {
                oldReferences[i].removeReferencedBy(fileInfo);
            }
            // Update new references
            for (let i = newIndex; i < newReferences.length; i++) {
                newReferences[i].addReferencedBy(fileInfo);
            }

            fileInfo.references = newReferences;
            fileInfo.scriptVersionForReferences = fileInfo.scriptInfo.getLatestVersion();
        }

        removeFileReferences(fileInfo: ModuleBuilderFileInfo) {
            for (const reference of fileInfo.references) {
                reference.removeReferencedBy(fileInfo);
            }
            fileInfo.references = [];
        }

        getFilesAffectedBy(fileName: string): string[] {
            this.ensureDependencyGraph();

            const fileInfo = this.getFileInfo(fileName);
            if(fileInfo && fileInfo.checkIfShapeSignatureChanged()) {
                let result: string[];
                if (!fileInfo.isExternalModule()) {
                    result = this.project.getFileNamesWithoutDefaultLib();
                }
                else {
                    result = fileInfo.getReferencedByFileNames();
                    // Needs to count the trigger file itself because it for sure has changed.
                    result.push(fileName);
                }
                return result;
            }
            // If it goes here, we know the shape of the file wasn't changed. So we only need to check if the
            // file content changed or not.
            return fileInfo.isContentSignatureChangedSinceLastEmit() ? [fileName] : [];
        }
    }

    export function createBuilder(project: Project): Builder {
        if (project.projectKind === ProjectKind.Configured) {
            const moduleKind = project.getCompilerOptions().module;
            switch (moduleKind) {
                case ModuleKind.None:
                    return new NonModuleBuilder(project);
                default:
                    return new ModuleBuilder(project);
            }
        }
        return new NonModuleBuilder(project);
    }
}