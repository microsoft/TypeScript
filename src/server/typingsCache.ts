import {
    ApplyCodeActionCommandResult,
    arrayIsEqualTo,
    CompilerOptions,
    getAllowJSCompilerOption,
    InstallPackageOptions,
    noop,
    notImplemented,
    Path,
    returnFalse,
    sort,
    SortedReadonlyArray,
    TypeAcquisition,
} from "./_namespaces/ts";
import {
    emptyArray,
    Project,
    ProjectService,
} from "./_namespaces/ts.server";

export interface InstallPackageOptionsWithProject extends InstallPackageOptions {
    projectName: string;
    projectRootPath: Path;
}

// for backwards-compatibility
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ITypingsInstaller {
    isKnownTypesPackageName(name: string): boolean;
    installPackage(options: InstallPackageOptionsWithProject): Promise<ApplyCodeActionCommandResult>;
    enqueueInstallTypingsRequest(p: Project, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string> | undefined): void;
    attach(projectService: ProjectService): void;
    onProjectClosed(p: Project): void;
    readonly globalTypingsCacheLocation: string | undefined;
}

export const nullTypingsInstaller: ITypingsInstaller = {
    isKnownTypesPackageName: returnFalse,
    // Should never be called because we never provide a types registry.
    installPackage: notImplemented,
    enqueueInstallTypingsRequest: noop,
    attach: noop,
    onProjectClosed: noop,
    globalTypingsCacheLocation: undefined!, // TODO: GH#18217
};

interface TypingsCacheEntry {
    readonly typeAcquisition: TypeAcquisition;
    readonly compilerOptions: CompilerOptions;
    readonly typings: SortedReadonlyArray<string>;
    readonly unresolvedImports: SortedReadonlyArray<string> | undefined;
    /* mainly useful for debugging */
    poisoned: boolean;
}

function setIsEqualTo(arr1: string[] | undefined, arr2: string[] | undefined): boolean {
    if (arr1 === arr2) {
        return true;
    }
    if ((arr1 || emptyArray).length === 0 && (arr2 || emptyArray).length === 0) {
        return true;
    }
    const set = new Map<string, boolean>();
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

function typeAcquisitionChanged(opt1: TypeAcquisition, opt2: TypeAcquisition): boolean {
    return opt1.enable !== opt2.enable ||
        !setIsEqualTo(opt1.include, opt2.include) ||
        !setIsEqualTo(opt1.exclude, opt2.exclude);
}

function compilerOptionsChanged(opt1: CompilerOptions, opt2: CompilerOptions): boolean {
    // TODO: add more relevant properties
    return getAllowJSCompilerOption(opt1) !== getAllowJSCompilerOption(opt2);
}

function unresolvedImportsChanged(imports1: SortedReadonlyArray<string> | undefined, imports2: SortedReadonlyArray<string> | undefined): boolean {
    if (imports1 === imports2) {
        return false;
    }
    return !arrayIsEqualTo(imports1, imports2);
}

/** @internal */
export class TypingsCache {
    private readonly perProjectCache = new Map<string, TypingsCacheEntry>();

    constructor(private readonly installer: ITypingsInstaller) {
    }

    isKnownTypesPackageName(name: string): boolean {
        return this.installer.isKnownTypesPackageName(name);
    }

    installPackage(options: InstallPackageOptionsWithProject): Promise<ApplyCodeActionCommandResult> {
        return this.installer.installPackage(options);
    }

    enqueueInstallTypingsForProject(project: Project, unresolvedImports: SortedReadonlyArray<string> | undefined, forceRefresh: boolean) {
        const typeAcquisition = project.getTypeAcquisition();

        if (!typeAcquisition || !typeAcquisition.enable) {
            return;
        }

        const entry = this.perProjectCache.get(project.getProjectName());
        if (
            forceRefresh ||
            !entry ||
            typeAcquisitionChanged(typeAcquisition, entry.typeAcquisition) ||
            compilerOptionsChanged(project.getCompilationSettings(), entry.compilerOptions) ||
            unresolvedImportsChanged(unresolvedImports, entry.unresolvedImports)
        ) {
            // Note: entry is now poisoned since it does not really contain typings for a given combination of compiler options\typings options.
            // instead it acts as a placeholder to prevent issuing multiple requests
            this.perProjectCache.set(project.getProjectName(), {
                compilerOptions: project.getCompilationSettings(),
                typeAcquisition,
                typings: entry ? entry.typings : emptyArray,
                unresolvedImports,
                poisoned: true,
            });
            // something has been changed, issue a request to update typings
            this.installer.enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
        }
    }

    updateTypingsForProject(projectName: string, compilerOptions: CompilerOptions, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>, newTypings: string[]) {
        const typings = sort(newTypings);
        this.perProjectCache.set(projectName, {
            compilerOptions,
            typeAcquisition,
            typings,
            unresolvedImports,
            poisoned: false,
        });
        return !typeAcquisition || !typeAcquisition.enable ? emptyArray : typings;
    }

    onProjectClosed(project: Project) {
        if (this.perProjectCache.delete(project.getProjectName())) {
            this.installer.onProjectClosed(project);
        }
    }
}
