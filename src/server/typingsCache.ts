/// <reference path="project.ts"/>

namespace ts.server {
    export interface ITypingsInstaller {
        enqueueInstallTypingsRequest(p: Project, typingOptions: TypingOptions): void;
        attach(projectService: ProjectService): void;
        onProjectClosed(p: Project): void;
        readonly globalTypingsCacheLocation: string;
    }

    export const nullTypingsInstaller: ITypingsInstaller = {
        enqueueInstallTypingsRequest: () => {},
        attach: (projectService: ProjectService) => {},
        onProjectClosed: (p: Project) => {},
        globalTypingsCacheLocation: undefined
    };

    class TypingsCacheEntry {
        readonly typingOptions: TypingOptions;
        readonly compilerOptions: CompilerOptions;
        readonly typings: TypingsArray;
        poisoned: boolean;
    }

    function setIsEqualTo(arr1: string[], arr2: string[]): boolean {
        if (arr1 === arr2) {
            return true;
        }
        if ((arr1 || emptyArray).length === 0 && (arr2 || emptyArray).length === 0) {
            return true;
        }
        const set = new StringMap<boolean>();
        let unique = 0;

        for (const v of arr1) {
            if (set.get(v) !== true) {
                set.set(v, true);
                unique++;
            }
        }
        for (const v of arr2) {
            const isSet = set.get(v);
            if (isSet === undefined) {
                return false;
            }
            if (isSet === true) {
                set.set(v, false);
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

    export interface TypingsArray extends ReadonlyArray<string> {
        " __typingsArrayBrand": any;
    }

    function toTypingsArray(arr: string[]): TypingsArray {
        arr.sort();
        return <any>arr;
    }

    export class TypingsCache {
        private readonly perProjectCache = new StringMap<TypingsCacheEntry>();

        constructor(private readonly installer: ITypingsInstaller) {
        }

        getTypingsForProject(project: Project, forceRefresh: boolean): TypingsArray {
            const typingOptions = project.getTypingOptions();

            if (!typingOptions || !typingOptions.enableAutoDiscovery) {
                return <any>emptyArray;
            }

            const entry = this.perProjectCache.get(project.getProjectName());
            const result: TypingsArray = entry ? entry.typings : <any>emptyArray;
            if (forceRefresh || !entry || typingOptionsChanged(typingOptions, entry.typingOptions) || compilerOptionsChanged(project.getCompilerOptions(), entry.compilerOptions)) {
                // Note: entry is now poisoned since it does not really contain typings for a given combination of compiler options\typings options.
                // instead it acts as a placeholder to prevent issuing multiple requests
                this.perProjectCache.set(project.getProjectName(), {
                    compilerOptions: project.getCompilerOptions(),
                    typingOptions,
                    typings: result,
                    poisoned: true
                });
                // something has been changed, issue a request to update typings
                this.installer.enqueueInstallTypingsRequest(project, typingOptions);
            }
            return result;
        }

        invalidateCachedTypingsForProject(project: Project) {
            const typingOptions = project.getTypingOptions();
            if (!typingOptions.enableAutoDiscovery) {
                return;
            }
            this.installer.enqueueInstallTypingsRequest(project, typingOptions);
        }

        updateTypingsForProject(projectName: string, compilerOptions: CompilerOptions, typingOptions: TypingOptions, newTypings: string[]) {
            this.perProjectCache.set(projectName, {
                compilerOptions,
                typingOptions,
                typings: toTypingsArray(newTypings),
                poisoned: false
            });
        }

        onProjectClosed(project: Project) {
            this.perProjectCache.delete(project.getProjectName());
            this.installer.onProjectClosed(project);
        }
    }
}