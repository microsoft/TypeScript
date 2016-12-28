/// <reference path="project.ts"/>

namespace ts.server {
    export interface ITypingsInstaller {
        enqueueInstallTypingsRequest(p: Project, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>): void;
        attach(projectService: ProjectService): void;
        onProjectClosed(p: Project): void;
        readonly globalTypingsCacheLocation: string;
    }

    export const nullTypingsInstaller: ITypingsInstaller = {
        enqueueInstallTypingsRequest: noop,
        attach: noop,
        onProjectClosed: noop,
        globalTypingsCacheLocation: undefined
    };

    class TypingsCacheEntry {
        readonly typeAcquisition: TypeAcquisition;
        readonly compilerOptions: CompilerOptions;
        readonly typings: SortedReadonlyArray<string>;
        readonly unresolvedImports: SortedReadonlyArray<string>;
        /* mainly useful for debugging */
        poisoned: boolean;
    }

    function setIsEqualTo(arr1: string[], arr2: string[]): boolean {
        if (arr1 === arr2) {
            return true;
        }
        if ((arr1 || emptyArray).length === 0 && (arr2 || emptyArray).length === 0) {
            return true;
        }
        const set: Map<boolean> = createMap<boolean>();
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

    function typeAcquisitionChanged(opt1: TypeAcquisition, opt2: TypeAcquisition): boolean {
        return opt1.enable !== opt2.enable ||
            !setIsEqualTo(opt1.include, opt2.include) ||
            !setIsEqualTo(opt1.exclude, opt2.exclude);
    }

    function compilerOptionsChanged(opt1: CompilerOptions, opt2: CompilerOptions): boolean {
        // TODO: add more relevant properties
        return opt1.allowJs != opt2.allowJs;
    }

    function unresolvedImportsChanged(imports1: SortedReadonlyArray<string>, imports2: SortedReadonlyArray<string>): boolean {
        if (imports1 === imports2) {
            return false;
        }
        return !arrayIsEqualTo(imports1, imports2);
    }

    export class TypingsCache {
        private readonly perProjectCache: Map<TypingsCacheEntry> = createMap<TypingsCacheEntry>();

        constructor(private readonly installer: ITypingsInstaller) {
        }

        getTypingsForProject(project: Project, unresolvedImports: SortedReadonlyArray<string>, forceRefresh: boolean): SortedReadonlyArray<string> {
            const typeAcquisition = project.getTypeAcquisition();

            if (!typeAcquisition || !typeAcquisition.enable) {
                return <any>emptyArray;
            }

            const entry = this.perProjectCache[project.getProjectName()];
            const result: SortedReadonlyArray<string> = entry ? entry.typings : <any>emptyArray;
            if (forceRefresh ||
                !entry ||
                typeAcquisitionChanged(typeAcquisition, entry.typeAcquisition) ||
                compilerOptionsChanged(project.getCompilerOptions(), entry.compilerOptions) ||
                unresolvedImportsChanged(unresolvedImports, entry.unresolvedImports)) {
                // Note: entry is now poisoned since it does not really contain typings for a given combination of compiler options\typings options.
                // instead it acts as a placeholder to prevent issuing multiple requests
                this.perProjectCache[project.getProjectName()] = {
                    compilerOptions: project.getCompilerOptions(),
                    typeAcquisition,
                    typings: result,
                    unresolvedImports,
                    poisoned: true
                };
                // something has been changed, issue a request to update typings
                this.installer.enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
            }
            return result;
        }

        updateTypingsForProject(projectName: string, compilerOptions: CompilerOptions, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>, newTypings: string[]) {
            this.perProjectCache[projectName] = {
                compilerOptions,
                typeAcquisition,
                typings: toSortedReadonlyArray(newTypings),
                unresolvedImports,
                poisoned: false
            };
        }

        deleteTypingsForProject(projectName: string) {
            delete this.perProjectCache[projectName];
        }

        onProjectClosed(project: Project) {
            delete this.perProjectCache[project.getProjectName()];
            this.installer.onProjectClosed(project);
        }
    }
}