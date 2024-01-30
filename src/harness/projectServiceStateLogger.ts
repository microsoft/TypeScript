import {
    arrayFrom,
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

    function sendLogsToLogger(title: string, logs: string[][] | undefined) {
        if (!logs) return;
        logger.log(title);
        logs.forEach(l => l.forEach(s => logger.log(s)));
        logger.log("");
    }

    function baselineProjects() {
        const autoImportProviderProjects = [] as AutoImportProviderProject[];
        const auxiliaryProjects = [] as AuxiliaryProject[];
        return baselineState(
            [service.externalProjects, service.configuredProjects, service.inferredProjects, autoImportProviderProjects, auxiliaryProjects],
            projects,
            printProjectWorker,
            project => ({
                projectStateVersion: project.projectStateVersion,
                projectProgramVersion: project.projectProgramVersion,
                autoImportProviderHost: project.autoImportProviderHost,
                noDtsResolutionProject: project.noDtsResolutionProject,
            }),
            printProject,
        );

        function printProject(logs: string[][], project: Project, data: ProjectData | undefined) {
            if (project.autoImportProviderHost) autoImportProviderProjects.push(project.autoImportProviderHost);
            if (project.noDtsResolutionProject) auxiliaryProjects.push(project.noDtsResolutionProject);
            return printProjectWorker(logs, project, data);
        }

        function printProjectWorker(logs: string[][], project: Project, data: ProjectData | undefined) {
            let projectDiff = newOrDeleted(project, projects, data);
            const projectPropertyLogs = [] as string[];
            allPropertiesOfProjectData.forEach(key => {
                let value: Project[typeof key] | string = project[key];
                if (key === "autoImportProviderHost" || key === "noDtsResolutionProject") {
                    if (project[key]) value = (project[key] as Project).projectName;
                    else if (project[key] === undefined && data?.[key] === undefined) return;
                }
                projectDiff = printProperty(projectDiff, projectPropertyLogs, data, key, project[key], value, PrintPropertyWhen.Always);
            });
            logs.push([`${project.projectName} (${ProjectKind[project.projectKind]})${projectDiff}`], projectPropertyLogs);
            return projectDiff;
        }
    }

    function baselineScriptInfos() {
        return baselineState(
            [service.filenameToScriptInfo],
            scriptInfos,
            printScriptInfoWorker,
            info => ({
                open: info.isScriptOpen(),
                version: info.textStorage.getVersion(),
                pendingReloadFromDisk: info.textStorage.pendingReloadFromDisk,
                containingProjects: new Set(info.containingProjects),
            }),
        );

        function printScriptInfoWorker(logs: string[][], info: ScriptInfo, data: ScriptInfoData | undefined) {
            let infoDiff = newOrDeleted(info, scriptInfos, data);
            const infoPropertyLogs = [] as string[];

            infoDiff = printInfoProperty("open", info.isScriptOpen(), PrintPropertyWhen.Changed);
            infoDiff = printInfoProperty("version", info.textStorage.getVersion(), PrintPropertyWhen.Always);
            infoDiff = printInfoProperty("pendingReloadFromDisk", info.textStorage.pendingReloadFromDisk, PrintPropertyWhen.TruthyOrChangedOrNew);
            const containingProjectsLogs = [] as string[];
            let containingProjectsDiff = Diff.None;
            info.containingProjects.forEach(project =>
                containingProjectsDiff = printPropertyWorker(
                    containingProjectsDiff,
                    containingProjectsLogs,
                    !!data && !data.containingProjects.has(project),
                    Diff.New,
                    project,
                    `    ${project.projectName}`,
                    PrintPropertyWhen.Always,
                )
            );
            const infoProjects = new Set(info.containingProjects);
            data?.containingProjects.forEach(project => {
                if (infoProjects.has(project)) return;
                containingProjectsDiff = Diff.Change;
                containingProjectsLogs.push(`        ${project.projectName}${Diff.Deleted}`);
            });
            infoDiff = printPropertyWorker(
                infoDiff,
                infoPropertyLogs,
                !!containingProjectsDiff,
                Diff.Change,
                info.containingProjects,
                `containingProjects: ${info.containingProjects.length}`,
                PrintPropertyWhen.Always,
            );
            logs.push(
                [`${info.fileName}${info.isScriptOpen() ? " (Open)" : ""}${infoDiff}`],
                infoPropertyLogs,
                containingProjectsLogs,
            );
            return infoDiff;

            function printInfoProperty<Key extends keyof ScriptInfoData>(
                key: Key,
                value: ScriptInfoData[Key],
                printWhen: PrintPropertyWhen,
            ) {
                return printProperty(
                    infoDiff,
                    infoPropertyLogs,
                    data,
                    key,
                    value,
                    value,
                    printWhen,
                );
            }
        }
    }

    function baselineState<T, Data>(
        currentCaches: (T[] | Map<any, T>)[],
        dataMap: Map<T, Data>,
        printWorker: (logs: string[][], current: T, data: Data | undefined) => Diff,
        toData: (current: T) => Data,
        printCurrentWorker?: (logs: string[][], current: T, data: Data | undefined) => Diff,
    ) {
        const logs = [] as string[][];
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
            if ((printCurrentWorker || printWorker)(logs, current, dataMap.get(current))) {
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
        dataDiff: Diff,
        propertyLogs: string[],
        data: Data | undefined,
        key: Key,
        value: Data[Key],
        stringValue: Data[Key] | string,
        printWhen: PrintPropertyWhen,
    ) {
        return printPropertyWorker(
            dataDiff,
            propertyLogs,
            !!data && data[key] !== value,
            Diff.Change,
            value,
            `${key}: ${stringValue}`,
            printWhen,
        );
    }

    function printPropertyWorker(
        dataDiff: Diff,
        propertyLogs: string[],
        propertyChanged: boolean,
        propertyChangeDiff: Diff.Change | Diff.New,
        value: any,
        stringValue: string,
        printWhen: PrintPropertyWhen,
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
