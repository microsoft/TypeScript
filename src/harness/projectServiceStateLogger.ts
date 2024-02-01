import {
    arrayFrom,
    compareStringsCaseSensitive,
    Debug,
    noop,
} from "./_namespaces/ts";
import {
    AutoImportProviderProject,
    AuxiliaryProject,
    LogLevel,
    Project,
    ProjectKind,
    ProjectService,
    ScriptInfo,
} from "./_namespaces/ts.server";
import {
    LoggerWithInMemoryLogs,
} from "./tsserverLogger";

interface ProjectData {
    projectStateVersion: Project["projectStateVersion"];
    projectProgramVersion: Project["projectProgramVersion"];
    autoImportProviderHost: Project["autoImportProviderHost"];
    noDtsResolutionProject: Project["noDtsResolutionProject"];
}

interface ScriptInfoData {
    open: boolean;
    version: string;
    pendingReloadFromDisk: boolean;
    containingProjects: Set<Project>;
}

enum Diff {
    None = "",
    New = " *new*",
    Change = " *changed*",
    Deleted = " *deleted*",
}

type StateItemLog = [string, string[], string[]?];

export function patchServiceForStateBaseline(service: ProjectService) {
    if (!service.logger.isTestLogger || !service.logger.hasLevel(LogLevel.verbose)) return;
    if (service.baseline !== noop) return; // Already patched

    const projects = new Map<Project, ProjectData>();
    const scriptInfos = new Map<ScriptInfo, ScriptInfoData>();
    const allPropertiesOfProjectData: (keyof ProjectData & keyof Project)[] = [
        "projectStateVersion",
        "projectProgramVersion",
        "autoImportProviderHost",
        "noDtsResolutionProject",
    ];
    const logger = service.logger as LoggerWithInMemoryLogs;
    service.baseline = title => {
        const projectLogs = baselineProjects();
        const infoLogs = baselineScriptInfos();
        if (projectLogs?.length || infoLogs?.length) {
            if (title) logger.log(title);
            sendLogsToLogger("Projects::", projectLogs);
            sendLogsToLogger("ScriptInfos::", infoLogs);
        }
    };

    function sendLogsToLogger(title: string, logs: StateItemLog[] | undefined) {
        if (!logs) return;
        logger.log(title);
        logs.sort((a, b) => compareStringsCaseSensitive(a[0], b[0]))
            .forEach(([title, propertyLogs, additionalPropertyLogs]) => {
                logger.log(title);
                propertyLogs.forEach(s => logger.log(s));
                additionalPropertyLogs?.forEach(s => logger.log(s));
            });
        logger.log("");
    }

    function baselineProjects() {
        const autoImportProviderProjects = [] as AutoImportProviderProject[];
        const auxiliaryProjects = [] as AuxiliaryProject[];
        return baselineState(
            [service.externalProjects, service.configuredProjects, service.inferredProjects, autoImportProviderProjects, auxiliaryProjects],
            projects,
            (logs, project, data) => {
                if (project.autoImportProviderHost) autoImportProviderProjects.push(project.autoImportProviderHost);
                if (project.noDtsResolutionProject) auxiliaryProjects.push(project.noDtsResolutionProject);
                let projectDiff = newOrDeleted(project, projects, data);
                const projectPropertyLogs = [] as string[];
                allPropertiesOfProjectData.forEach(key => {
                    let value: Project[typeof key] | string = project[key];
                    if (key === "autoImportProviderHost" || key === "noDtsResolutionProject") {
                        if (project[key]) value = (project[key] as Project).projectName;
                        else if (project[key] === undefined && data?.[key] === undefined) return;
                    }
                    projectDiff = printProperty(PrintPropertyWhen.Always, data, key, project[key], projectDiff, projectPropertyLogs, value);
                });
                logs.push([`${project.projectName} (${ProjectKind[project.projectKind]})${projectDiff}`, projectPropertyLogs]);
                return projectDiff;
            },
            project => ({
                projectStateVersion: project.projectStateVersion,
                projectProgramVersion: project.projectProgramVersion,
                autoImportProviderHost: project.autoImportProviderHost,
                noDtsResolutionProject: project.noDtsResolutionProject,
            }),
        );
    }

    function baselineScriptInfos() {
        return baselineState(
            [service.filenameToScriptInfo],
            scriptInfos,
            (logs, info, data) => {
                let infoDiff = newOrDeleted(info, scriptInfos, data);
                const infoPropertyLogs = [] as string[];
                const isOpen = info.isScriptOpen();
                infoDiff = printProperty(PrintPropertyWhen.Changed, data, "open", isOpen, infoDiff, infoPropertyLogs);
                infoDiff = printProperty(PrintPropertyWhen.Always, data, "version", info.textStorage.getVersion(), infoDiff, infoPropertyLogs);
                infoDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "pendingReloadFromDisk", info.textStorage.pendingReloadFromDisk, infoDiff, infoPropertyLogs);
                const containingProjectsLogs = [] as string[];
                let containingProjectsDiff = Diff.None;
                const defaultProject = isOpen && info.containingProjects.length ? info.getDefaultProject() : undefined;
                info.containingProjects.forEach(project =>
                    containingProjectsDiff = printPropertyWorker(
                        PrintPropertyWhen.Always,
                        `    ${project.projectName}${defaultProject === project ? " *default*" : ""}`,
                        containingProjectsLogs,
                        containingProjectsDiff,
                        !!data && !data.containingProjects.has(project),
                        Diff.New,
                        project,
                    )
                );
                const infoProjects = new Set(info.containingProjects);
                data?.containingProjects.forEach(project => {
                    if (infoProjects.has(project)) return;
                    containingProjectsDiff = Diff.Change;
                    containingProjectsLogs.push(`        ${project.projectName}${Diff.Deleted}`);
                });
                infoDiff = printPropertyWorker(
                    PrintPropertyWhen.Always,
                    `containingProjects: ${info.containingProjects.length}`,
                    infoPropertyLogs,
                    infoDiff,
                    !!containingProjectsDiff,
                    Diff.Change,
                    info.containingProjects,
                );
                logs.push([
                    `${info.fileName}${isOpen ? " (Open)" : ""}${infoDiff}`,
                    infoPropertyLogs,
                    containingProjectsLogs,
                ]);
                return infoDiff;
            },
            info => ({
                open: info.isScriptOpen(),
                version: info.textStorage.getVersion(),
                pendingReloadFromDisk: info.textStorage.pendingReloadFromDisk,
                containingProjects: new Set(info.containingProjects),
            }),
        );
    }

    function baselineState<T, Data>(
        currentCaches: (T[] | Map<any, T>)[],
        dataMap: Map<T, Data>,
        printWorker: (logs: StateItemLog[], current: T, data: Data | undefined) => Diff,
        toData: (current: T) => Data,
    ) {
        const logs = [] as StateItemLog[];
        let hasChange = false;
        const currentSet = new Set<T>();
        currentCaches.forEach(currentCache => currentCache.forEach(printCurrent));
        if (currentSet.size !== dataMap.size) {
            for (const [key, data] of arrayFrom(dataMap.entries())) {
                if (!currentSet.has(key)) {
                    dataMap.delete(key);
                    printWorker(logs, key, data);
                }
            }
            hasChange = true;
        }
        return hasChange ? logs : undefined;

        function printCurrent(current: T) {
            if (!current) return;
            currentSet.add(current);
            if (printWorker(logs, current, dataMap.get(current))) {
                hasChange = true;
                dataMap.set(current, toData(current));
            }
        }
    }

    function newOrDeleted<T, Data>(current: T, dataMap: Map<T, Data>, data: Data | undefined) {
        return !data ? Diff.New : !dataMap.has(current) ? Diff.Deleted : Diff.None;
    }

    enum PrintPropertyWhen {
        Always,
        TruthyOrChangedOrNew,
        Changed,
    }
    function printProperty<Data, Key extends keyof Data & string>(
        printWhen: PrintPropertyWhen,
        data: Data | undefined,
        key: Key,
        value: Data[Key],
        dataDiff: Diff,
        propertyLogs: string[],
        stringValue?: Data[Key] | string,
    ) {
        return printPropertyWorker(
            printWhen,
            `${key}: ${stringValue === undefined ? value : stringValue}`,
            propertyLogs,
            dataDiff,
            !!data && data[key] !== value,
            Diff.Change,
            value,
        );
    }

    function printPropertyWorker(
        printWhen: PrintPropertyWhen,
        stringValue: string,
        propertyLogs: string[],
        dataDiff: Diff,
        propertyChanged: boolean,
        propertyChangeDiff: Diff.Change | Diff.New,
        value: any,
    ) {
        const propertyDiff = propertyChanged ? propertyChangeDiff : Diff.None;
        const result = !dataDiff && propertyDiff ? propertyChangeDiff : dataDiff;
        switch (printWhen) {
            case PrintPropertyWhen.Changed:
                if (!propertyDiff) return result;
                break;
            case PrintPropertyWhen.TruthyOrChangedOrNew:
                if (!value && !propertyDiff) return result;
                break;
            case PrintPropertyWhen.Always:
                break;
            default:
                Debug.assertNever(printWhen);
        }
        propertyLogs.push(`    ${stringValue}${propertyDiff}`);
        return result;
    }
}
