/// <reference path="..\..\compiler\commandLineParser.ts" />
/// <reference path="..\..\services\services.ts" />
/// <reference path="..\protocol.d.ts" />
/// <reference path="..\session.ts" />
/// <reference path="..\node.d.ts" />
namespace ts.server {

    const path: typeof NodeJS.path = require("path");
    const crypto: any = require("crypto");
    const fs: any = require("fs");

    /**
     * The host interface for the builder. Gives access
     * to some environments.
     */
    export interface BuilderHost {
        logError(err: Error, cmd: string): void;
    }

    export interface Builder {
        getProject(): Project;
        getFilesAffectedBy(fileName: string): NormalizedPath[];
    }

    export class NullBuilder implements Builder  {
        constructor(private project: Project, host: BuilderHost) {
        }
        public getProject(): Project {
            return undefined;
        }
        public getFilesAffectedBy(file: string): NormalizedPath[] {
            return undefined;
        }
    }

    /**
     * A file info object that represents a file to be compiled /
     * managed in a builder. It conforms to a source file in a
     * program. However in contrast to source files, file infos
     * are not shared between builders.
     */

    /**
     * An abstract file info that maintains a shape signature.
     */
    export abstract class AbstractBuilderFileInfo {

        public shapeSignature: string;

        constructor(public fileName: string) {
            this.shapeSignature = undefined;
        }

        public computeHash(text: string): string {
            return crypto.createHash("md5")
                .update(text)
                .digest("base64");
        }

        public getSourceFile(builder: Builder): SourceFile {
            return builder.getProject().getSourceFile(this.fileName);
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
            const sourceFile = builder.getProject().getSourceFile(this.fileName);
            if (!sourceFile) {
                return false;
            }

            const lastSignature: string = this.shapeSignature;
            this.shapeSignature = undefined;
            if (sourceFile.isDeclarationFile) {
                this.shapeSignature =  contentSignature ? contentSignature : this.computeHash(sourceFile.text);
            }
            else {
                // ToDo@dirkb for now we can only get the declaration file if we emit all files.
                // We need to get better here since we can't emit JS files on type. Or ???
                const emitOutput = builder.getProject().languageService.getEmitOutput(this.fileName, /*emitDeclarationsOnly*/ true);
                let dtsFound = false;
                for (const file of emitOutput.outputFiles) {
                    if (/\.d\.ts$/.test(file.name)) {
                        this.shapeSignature = this.computeHash(file.text);
                        dtsFound = true;
                    }
                }
                if (!dtsFound && contentSignature) {
                    this.shapeSignature = contentSignature;
                }
            }
            return !this.shapeSignature || lastSignature !== this.shapeSignature;
        }
    }

    export abstract class AbstractBuilder<T extends AbstractBuilderFileInfo> implements Builder {
        constructor(protected project: Project) { }

        public getProject(): Project {
            return this.project;
        }

        public abstract getFileInfo(fileName: string): T;
        public abstract getFilesAffectedBy(fileName: string): NormalizedPath[]; 
    }

    /**
     * A simple file info object that doesn't maintain any dependencies. It
     * is usaully used for internal or virtual projects where no dependency
     * tree can be computed.
     */
    class SimpleBuilderFileInfo extends AbstractBuilderFileInfo {
        constructor(fileName: string) {
            super(fileName);
        }
    }

    /**
     * A builder that checks the files opened in a project. The builder rechecks all files
     * if the file that triggered the build has a shape change. Otherwise only the changed
     * file is checked. Rechecks all files if a file gets deleted.
     */
    class NonModuleFilesBuilder extends AbstractBuilder<SimpleBuilderFileInfo> {

        private openFileInfos: Map<SimpleBuilderFileInfo>;

        constructor(project: Project, host: BuilderHost) {
            super(project);
            this.openFileInfos = createMap<SimpleBuilderFileInfo>();
        }

        public getFileInfo(fileName: string) {
            return this.openFileInfos[fileName];
        }

        public getOrCreateFileInfo(fileName: string) {
            if (!this.getFileInfo(fileName)) {
                this.openFileInfos[fileName] = new SimpleBuilderFileInfo(fileName);
            }
            return this.openFileInfos[fileName];
        }

        public getFilesAffectedBy(fileName: string): NormalizedPath[] {
            const info = this.getOrCreateFileInfo(fileName);
            if(info.updateAndCheckIfShapeSignatureChanged(this)) {
                return this.project.getRootFiles();
            }
            return [toNormalizedPath(fileName)];
        }
    }

    export function createBuilder(project: Project, builderHost: BuilderHost): Builder {
        if (project.projectKind === ProjectKind.Inferred) {
            return new NonModuleFilesBuilder(project, builderHost);
        }

        if (project.projectKind === ProjectKind.Configured) {
            const options = project.getCompilerOptions();
            if (options && options.module) {
            const moduleKind = options.module;
                switch (moduleKind) {
                    case ModuleKind.AMD:
                    case ModuleKind.CommonJS:
                    case ModuleKind.UMD:
                    case ModuleKind.System:
                        return new NonModuleFilesBuilder(project, builderHost);
                    default:
                        return new NonModuleFilesBuilder(project, builderHost);
                }
            }
            else {
                // What is the default module system in TS?
                return new NonModuleFilesBuilder(project, builderHost);
            }
        }
    }
}