/// <reference path="project.ts"/>

namespace ts.server {
    export interface ITypingsInstaller {
        enqueueInstallTypingsRequest(p: Project): void;
    }

    class TypingsCacheEntry {
        readonly typingOptions: TypingOptions;
        readonly compilerOptions: CompilerOptions;
        readonly typings: Path[];
    }

    const emptyArray: any[] = [];
    const jsOrDts = [".js", ".d.ts"];

    function getTypingOptionsForProjects(proj: Project): TypingOptions {
        if (proj.projectKind === ProjectKind.Configured) {
            return (<ConfiguredProject>proj).getTypingOptions();
        }

        const enableAutoDiscovery = 
            proj.projectKind === ProjectKind.Inferred && 
            proj.getCompilerOptions().allowJs &&
            proj.getFileNames().every(f => fileExtensionIsAny(f, jsOrDts));

        // TODO: add .d.ts files to excludes 
        return { enableAutoDiscovery, include: emptyArray, exclude: emptyArray };
    }

    function setIsEqualTo(arr1: string[], arr2: string[]): boolean {
        if (arr1 === arr2) {
            return true;
        }
        if ((arr1 || emptyArray).length === 0 && (arr2 || emptyArray).length === 0) {
            return true;
        }
        const set: Map<boolean> = Object.create(null);
        let unique = 0;

        for (const v of arr1) {
            if (set[v] !== true) {
                set[v] = true;
                unique++;
            }
        }
        for (const v of arr2) {
            if (!hasProperty(set, v)) {
                return false;
            }
            if (set[v] === true) {
                set[v] = false;
                unique--;
            }
        }
        return unique === 0;
    }

    function typingOptionsChanged(opt1: TypingOptions, opt2: TypingOptions): boolean {
        return opt1.enableAutoDiscovery !== opt2.enableAutoDiscovery ||
            !setIsEqualTo(opt1.include, opt2.include) ||
            !setIsEqualTo(opt1.exclude, opt2.exclude); 
    }

    function compilerOptionsChanged(opt1: CompilerOptions, opt2: CompilerOptions): boolean {
        // TODO: add more relevant properties
        return opt1.allowJs != opt2.allowJs;
    }

    export class TypingsCache {
        private readonly perProjectCache: Map<TypingsCacheEntry> = {};

        constructor(private readonly installer: ITypingsInstaller) {
        }

        getTypingsForProject(project: Project): Path[] {
            const typingOptions = getTypingOptionsForProjects(project);

            if(!typingOptions.enableAutoDiscovery) {
                return emptyArray;
            }

            const entry = this.perProjectCache[project.getProjectName()];
            if (!entry || typingOptionsChanged(typingOptions, entry.typingOptions) || compilerOptionsChanged(project.getCompilerOptions(), entry.compilerOptions)) {
                this.installer.enqueueInstallTypingsRequest(project);
            }
            return entry? entry.typings : emptyArray;
        }

        deleteTypingsForProject(project: Project) {
            delete this.perProjectCache[project.getProjectName()];
        }
    }
}