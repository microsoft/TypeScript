/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="session.ts" />
/// <reference types="node" />

namespace ts.server {

    const crypto: any = require("crypto");

    /**
     * An abstract file info that maintains a shape signature.
     */
    export class BuilderFileInfo {

        public lastCheckedShapeSignature: string;
        scriptInfo: ScriptInfo;

        constructor(public fileName: string) {
            this.lastCheckedShapeSignature = undefined;
        }

        public isExternalModule(builder: Builder) {
            const sourceFile = this.getSourceFile(builder);
            if (!!sourceFile.externalModuleIndicator) {
                return true;
            }
            if (sourceFile.isDeclarationFile) {
                for (const statement of sourceFile.statements) {
                    if (statement.kind !== SyntaxKind.ModuleDeclaration || (<ModuleDeclaration>statement).name.kind !== SyntaxKind.StringLiteral) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }

        public computeHash(text: string): string {
            return crypto.createHash("md5")
                .update(text)
                .digest("base64");
        }

        public getSourceFile(builder: Builder): SourceFile {
            return builder.project.getSourceFile(this.fileName);
        }

        public getScriptInfo(builder: Builder): ScriptInfo {
            if (!this.scriptInfo) {
                this.scriptInfo = builder.project.getScriptInfo(this.fileName);
            }
            return this.scriptInfo;
        }

        /**
         * Update the state of the file info object. This is usually called
         * after a file has been checked for syntax and semantic problems.
         *
         * @return true if the public visible shape of this file has changed.
         *  This usually requires a recheck of all dependent files. Returns
         *  false otherwise.
         */
        public updateAndCheckIfShapeSignatureChanged(builder: Builder, contentSignature?: string): boolean {
            const sourceFile = builder.project.getSourceFile(this.fileName);
            if (!sourceFile) {
                return false;
            }

            const lastSignature: string = this.lastCheckedShapeSignature;
            this.lastCheckedShapeSignature = undefined;
            if (sourceFile.isDeclarationFile) {
                this.lastCheckedShapeSignature =  contentSignature ? contentSignature : this.computeHash(sourceFile.text);
            }
            else {
                const emitOutput = builder.project.getLanguageService(/*ensureSynchronized*/true).getEmitOutput(this.fileName, /*emitDeclarationsOnly*/ true);
                let dtsFound = false;
                for (const file of emitOutput.outputFiles) {
                    if (/\.d\.ts$/.test(file.name)) {
                        this.lastCheckedShapeSignature = this.computeHash(file.text);
                        dtsFound = true;
                    }
                }
                if (!dtsFound && contentSignature) {
                    this.lastCheckedShapeSignature = contentSignature;
                }
            }
            return !this.lastCheckedShapeSignature || lastSignature !== this.lastCheckedShapeSignature;
        }
    }


    export interface Builder {
        readonly project: Project;
        getFilesAffectedBy(fileName: string): string[];
        onProjectUpdateGraph(): void;
    }

    class NullBuilder implements Builder {
        constructor(readonly project: Project) {
        }

        getFilesAffectedBy(fileName: string): string[] {
            return undefined;
        }

        onProjectUpdateGraph() {
        }
    }

    abstract class AbstractBuilder<T extends BuilderFileInfo> implements Builder {

        protected fileInfos: Map<T> = {};

        constructor(public readonly project: Project) {
        }

        protected getFileInfo(fileName: string): T {
            return this.fileInfos[fileName];
        }
        abstract getFilesAffectedBy(fileName: string): string[];
        abstract onProjectUpdateGraph(): void;
    }

    class NonModuleBuilder extends AbstractBuilder<BuilderFileInfo> {

        onProjectUpdateGraph() {
        }

        getFileInfo(fileName: string) {
            return this.fileInfos[fileName];
        }

        getOrCreateFileInfo(fileName: string) {
            if (!this.getFileInfo(fileName)) {
                this.fileInfos[fileName] = new BuilderFileInfo(fileName);
            }
            return this.fileInfos[fileName];
        }

        getFilesAffectedBy(fileName: string): string[] {
            const info = this.getOrCreateFileInfo(fileName);
            if(info.updateAndCheckIfShapeSignatureChanged(this)) {
                return this.project.getFileNames();
            }
            return [fileName];
        }
    }


    class ModuleBuilderFileInfo extends BuilderFileInfo {
        references: ModuleBuilderFileInfo[] = [];
        referencedBy: ModuleBuilderFileInfo[] = [];
        scriptVersionForReferences: string;

        private finalized = false;

        updateReferences(builder: ModuleBuilder) {
            // Only need to update if the content of the file changed.
            if (this.scriptVersionForReferences === this.getScriptInfo(builder).getLatestVersion()) {
                return;
            }

            const newReferences = builder.getReferecedFileInfos(this.fileName);
            const oldReferences = this.references;

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
                    oldReference.removeReferencedBy(this);
                    oldIndex++;
                }
                else if (compare > 0) {
                    // A new reference info. Add it.
                    newReference.addReferencedBy(this);
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
                oldReferences[i].removeReferencedBy(this);
            }
            // Update new references
            for (let i = newIndex; i < newReferences.length; i++) {
                newReferences[i].addReferencedBy(this);
            }

            this.references = newReferences;
            this.scriptVersionForReferences = this.getScriptInfo(builder).getLatestVersion();
        }

        removeAllReferences(builder: ModuleBuilder) {
            for (const reference of this.references) {
                reference.removeReferencedBy(this);
            }
            this.references = [];
        }

        getReferencedByFileNames() {
            return map(this.referencedBy, info => info.fileName);
        }

        static compareFileInfos(lf: ModuleBuilderFileInfo, rf: ModuleBuilderFileInfo): number {
            const l = lf.fileName;
            const r = rf.fileName;
            return (l < r ? -1 : (l > r ? 1 : 0));
        };

        static addToReferenceList(array: ModuleBuilderFileInfo[], fileInfo: ModuleBuilderFileInfo, afterFinalized: boolean) {
            if (!afterFinalized) {
                array.push(fileInfo);
            }
            else {
                const insertIndex = binarySearch(array, fileInfo, ModuleBuilderFileInfo.compareFileInfos);
                if (insertIndex > 0) {
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

        getReferecedFileInfos(fileName: string): ModuleBuilderFileInfo[] {
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

            const fileNames = this.project.getRootFiles();
            const fileInfos: ModuleBuilderFileInfo[] = []; 
            for (const fileName of fileNames) {
                const sourceFile = this.project.getSourceFile(fileName);
                if (sourceFile) {
                    const fileInfo = new ModuleBuilderFileInfo(fileName);
                    fileInfo.updateReferences(this);
                    this.fileInfos[fileName] = fileInfo;
                }
            }
            fileInfos.forEach(info => info.finalize());
            this.isDependencyGraphBuilt = true;
        }

        onProjectUpdateGraph() {
            this.updateDependencyGraph();
        }

        updateDependencyGraph() {
            this.ensureDependencyGraph();

            const fileNames = this.project.getRootFiles();
            for (const fileName of fileNames) {
                if (!this.fileInfos[fileName]) {
                    const sourceFile = this.project.getSourceFile(fileName);
                    if (sourceFile) {
                        const fileInfo = new ModuleBuilderFileInfo(fileName);
                        fileInfo.updateReferences(this);
                        this.fileInfos[fileName] = fileInfo;
                    }
                }
            }

            for (const key of getKeys(this.fileInfos)) {
                if (fileNames.indexOf(<NormalizedPath>key) < 0) {
                    // This file was deleted from this project
                    this.fileInfos[key].removeAllReferences(this);
                    delete this.fileInfos[key];
                }
                else {
                    this.fileInfos[key].updateReferences(this);
                }
            }
        }

        getFilesAffectedBy(fileName: string): string[] {
            this.ensureDependencyGraph();

            const info = this.getFileInfo(fileName);
            if(info && info.updateAndCheckIfShapeSignatureChanged(this)) {
                if (!info.isExternalModule(this)) {
                    return this.project.getRootFiles();
                }
                else {
                    const result = info.getReferencedByFileNames();
                    // Needs to count the trigger file itself
                    result.push(fileName);
                    return result;
                }
            }
            return [fileName];
        }
    }

    export function createBuilder(project: Project): Builder {
        if (!project.getCompilerOptions().compileOnSave) {
            return new NullBuilder(project);
        }

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