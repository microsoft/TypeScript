namespace ts.server {
export interface InstallPackageOptionsWithProject extends ts.InstallPackageOptions {
    projectName: string;
    projectRootPath: ts.Path;
}

// for backwards-compatibility
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ITypingsInstaller {
    isKnownTypesPackageName(name: string): boolean;
    installPackage(options: InstallPackageOptionsWithProject): Promise<ts.ApplyCodeActionCommandResult>;
    enqueueInstallTypingsRequest(p: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string> | undefined): void;
    attach(projectService: ts.server.ProjectService): void;
    onProjectClosed(p: ts.server.Project): void;
    readonly globalTypingsCacheLocation: string | undefined;
}

export const nullTypingsInstaller: ITypingsInstaller = {
    isKnownTypesPackageName: ts.returnFalse,
    // Should never be called because we never provide a types registry.
    installPackage: ts.notImplemented,
    enqueueInstallTypingsRequest: ts.noop,
    attach: ts.noop,
    onProjectClosed: ts.noop,
    globalTypingsCacheLocation: undefined! // TODO: GH#18217
};

interface TypingsCacheEntry {
    readonly typeAcquisition: ts.TypeAcquisition;
    readonly compilerOptions: ts.CompilerOptions;
    readonly typings: ts.SortedReadonlyArray<string>;
    readonly unresolvedImports: ts.SortedReadonlyArray<string> | undefined;
    /* mainly useful for debugging */
    poisoned: boolean;
}

function setIsEqualTo(arr1: string[] | undefined, arr2: string[] | undefined): boolean {
    if (arr1 === arr2) {
        return true;
    }
    if ((arr1 || ts.server.emptyArray).length === 0 && (arr2 || ts.server.emptyArray).length === 0) {
        return true;
    }
    const set = new ts.Map<string, boolean>();
    let unique = 0;

    for (const v of arr1!) {
        if (set.get(v) !== true) {
            set.set(v, true);
            unique++;
        }
    }
    for (const v of arr2!) {
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

function typeAcquisitionChanged(opt1: ts.TypeAcquisition, opt2: ts.TypeAcquisition): boolean {
    return opt1.enable !== opt2.enable ||
        !setIsEqualTo(opt1.include, opt2.include) ||
        !setIsEqualTo(opt1.exclude, opt2.exclude);
}

function compilerOptionsChanged(opt1: ts.CompilerOptions, opt2: ts.CompilerOptions): boolean {
    // TODO: add more relevant properties
    return ts.getAllowJSCompilerOption(opt1) !== ts.getAllowJSCompilerOption(opt2);
}

function unresolvedImportsChanged(imports1: ts.SortedReadonlyArray<string> | undefined, imports2: ts.SortedReadonlyArray<string> | undefined): boolean {
    if (imports1 === imports2) {
        return false;
    }
    return !ts.arrayIsEqualTo(imports1, imports2);
}

/*@internal*/
export class TypingsCache {
    private readonly perProjectCache = new ts.Map<string, TypingsCacheEntry>();

    constructor(private readonly installer: ITypingsInstaller) {
    }

    isKnownTypesPackageName(name: string): boolean {
        return this.installer.isKnownTypesPackageName(name);
    }

    installPackage(options: InstallPackageOptionsWithProject): Promise<ts.ApplyCodeActionCommandResult> {
        return this.installer.installPackage(options);
    }

    enqueueInstallTypingsForProject(project: ts.server.Project, unresolvedImports: ts.SortedReadonlyArray<string> | undefined, forceRefresh: boolean) {
        const typeAcquisition = project.getTypeAcquisition();

        if (!typeAcquisition || !typeAcquisition.enable) {
            return;
        }

        const entry = this.perProjectCache.get(project.getProjectName());
        if (forceRefresh ||
            !entry ||
            typeAcquisitionChanged(typeAcquisition, entry.typeAcquisition) ||
            compilerOptionsChanged(project.getCompilationSettings(), entry.compilerOptions) ||
            unresolvedImportsChanged(unresolvedImports, entry.unresolvedImports)) {
            // Note: entry is now poisoned since it does not really contain typings for a given combination of compiler options\typings options.
            // instead it acts as a placeholder to prevent issuing multiple requests
            this.perProjectCache.set(project.getProjectName(), {
                compilerOptions: project.getCompilationSettings(),
                typeAcquisition,
                typings: entry ? entry.typings : ts.server.emptyArray,
                unresolvedImports,
                poisoned: true
            });
            // something has been changed, issue a request to update typings
            this.installer.enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
        }
    }

    updateTypingsForProject(projectName: string, compilerOptions: ts.CompilerOptions, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>, newTypings: string[]) {
        const typings = ts.sort(newTypings);
        this.perProjectCache.set(projectName, {
            compilerOptions,
            typeAcquisition,
            typings,
            unresolvedImports,
            poisoned: false
        });
        return !typeAcquisition || !typeAcquisition.enable ? ts.server.emptyArray : typings;
    }

    onProjectClosed(project: ts.server.Project) {
        this.perProjectCache.delete(project.getProjectName());
        this.installer.onProjectClosed(project);
    }
}
}
