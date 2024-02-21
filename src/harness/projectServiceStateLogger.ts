import {
    arrayFrom,
    compareStringsCaseSensitive,
    Debug,
    identity,
    isString,
    noop,
} from "./_namespaces/ts";
import {
    AutoImportProviderProject,
    AuxiliaryProject,
    isBackgroundProject,
    isConfiguredProject,
    LogLevel,
    Project,
    ProjectKind,
    ProjectService,
    ScriptInfo,
    SourceMapFileWatcher,
    TextStorage,
} from "./_namespaces/ts.server";
import {
    LoggerWithInMemoryLogs,
} from "./tsserverLogger";

interface ProjectData {
    projectStateVersion: Project["projectStateVersion"];
    projectProgramVersion: Project["projectProgramVersion"];
    dirty: Project["dirty"];
    isClosed: ReturnType<Project["isClosed"]>;
    isOrphan: ReturnType<Project["isOrphan"]>;
    noOpenRef: boolean;
    autoImportProviderHost: Project["autoImportProviderHost"];
    noDtsResolutionProject: Project["noDtsResolutionProject"];
    originalConfiguredProjects: Project["originalConfiguredProjects"];
}

interface SourceMapFileWatcherData {
    sourceInfos: SourceMapFileWatcher["sourceInfos"];
}

interface ScriptInfoData {
    open: ReturnType<ScriptInfo["isScriptOpen"]>;
    version: ReturnType<TextStorage["getVersion"]>;
    pendingReloadFromDisk: TextStorage["pendingReloadFromDisk"];
    sourceMapFilePath: Exclude<ScriptInfo["sourceMapFilePath"], SourceMapFileWatcher> | SourceMapFileWatcherData | undefined;
    declarationInfoPath: ScriptInfo["declarationInfoPath"];
    sourceInfos: ScriptInfo["sourceInfos"];
    documentPositionMapper: ScriptInfo["documentPositionMapper"];
    containingProjects: Set<Project>;
}

enum Diff {
    None = "",
    New = " *new*",
    Change = " *changed*",
    Deleted = " *deleted*",
}

type StatePropertyLog = string | string[];
type StateItemLog = [string, StatePropertyLog[]];

export function patchServiceForStateBaseline(service: ProjectService) {
    if (!service.logger.isTestLogger || !service.logger.hasLevel(LogLevel.verbose)) return;
    if (service.baseline !== noop) return; // Already patched

    const projects = new Map<Project, ProjectData>();
    const scriptInfos = new Map<ScriptInfo, ScriptInfoData>();
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
            .forEach(([title, propertyLogs]) => {
                logger.log(title);
                propertyLogs.forEach(p => isString(p) ? logger.log(p) : p.forEach(s => logger.log(s)));
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
                projectDiff = printProperty(PrintPropertyWhen.Always, data, "projectStateVersion", project.projectStateVersion, projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.Always, data, "projectProgramVersion", project.projectProgramVersion, projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "dirty", project.dirty, projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "isClosed", project.isClosed(), projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "isOrphan", !isBackgroundProject(project) && project.isOrphan(), projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "noOpenRef", isConfiguredProject(project) && !project.hasOpenRef(), projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.DefinedOrChangedOrNew, data, "autoImportProviderHost", project.autoImportProviderHost, projectDiff, projectPropertyLogs, project.autoImportProviderHost ? project.autoImportProviderHost.projectName : project.autoImportProviderHost);
                projectDiff = printProperty(PrintPropertyWhen.DefinedOrChangedOrNew, data, "noDtsResolutionProject", project.noDtsResolutionProject, projectDiff, projectPropertyLogs, project.noDtsResolutionProject ? project.noDtsResolutionProject.projectName : project.noDtsResolutionProject);
                return printSetPropertyAndCreateStatementLog(
                    logs,
                    `${project.projectName} (${ProjectKind[project.projectKind]})`,
                    PrintPropertyWhen.DefinedOrChangedOrNew,
                    data?.originalConfiguredProjects,
                    "originalConfiguredProjects",
                    project.originalConfiguredProjects,
                    projectDiff,
                    projectPropertyLogs,
                    identity,
                );
            },
            project => ({
                projectStateVersion: project.projectStateVersion,
                projectProgramVersion: project.projectProgramVersion,
                dirty: project.dirty,
                isClosed: project.isClosed(),
                isOrphan: !isBackgroundProject(project) && project.isOrphan(),
                noOpenRef: isConfiguredProject(project) && !project.hasOpenRef(),
                autoImportProviderHost: project.autoImportProviderHost,
                noDtsResolutionProject: project.noDtsResolutionProject,
                originalConfiguredProjects: project.originalConfiguredProjects && new Set(project.originalConfiguredProjects),
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
                infoDiff = printScriptInfoSourceMapFilePath(data, info, infoDiff, infoPropertyLogs);
                infoDiff = printProperty(PrintPropertyWhen.DefinedOrChangedOrNew, data, "declarationInfoPath", info.declarationInfoPath, infoDiff, infoPropertyLogs);
                infoDiff = printSetPropertyValueWorker(PrintPropertyWhen.DefinedOrChangedOrNew, data?.sourceInfos, "sourceInfos", info.sourceInfos, infoDiff, infoPropertyLogs, identity);
                infoDiff = printProperty(PrintPropertyWhen.DefinedOrChangedOrNew, data, "documentPositionMapper", info.documentPositionMapper, infoDiff, infoPropertyLogs, info.documentPositionMapper ? "DocumentPositionMapper" : undefined);
                let defaultProject: Project | undefined;
                try {
                    if (isOpen) defaultProject = info.getDefaultProject();
                }
                catch (e) {
                    Debug.assert(e.message === "No Project.");
                }
                return printSetPropertyAndCreateStatementLog(
                    logs,
                    `${info.fileName}${info.isDynamic ? " (Dynamic)" : ""}${isOpen ? " (Open)" : ""}`,
                    PrintPropertyWhen.Always,
                    data?.containingProjects,
                    "containingProjects",
                    new Set(info.containingProjects),
                    infoDiff,
                    infoPropertyLogs,
                    project => `${project.projectName}${defaultProject === project ? " *default*" : ""}`,
                );
            },
            info => ({
                open: info.isScriptOpen(),
                version: info.textStorage.getVersion(),
                pendingReloadFromDisk: info.textStorage.pendingReloadFromDisk,
                sourceMapFilePath: info.sourceMapFilePath && !isString(info.sourceMapFilePath) ?
                    { original: info.sourceMapFilePath, sourceInfos: new Set(info.sourceMapFilePath.sourceInfos) } :
                    info.sourceMapFilePath,
                declarationInfoPath: info.declarationInfoPath,
                sourceInfos: info.sourceInfos && new Set(info.sourceInfos),
                documentPositionMapper: info.documentPositionMapper,
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
        DefinedOrChangedOrNew,
    }
    function printProperty<Data, Key extends keyof Data & string>(
        printWhen: PrintPropertyWhen,
        data: Data | undefined,
        key: Key,
        value: Data[Key],
        dataDiff: Diff,
        propertyLogs: StatePropertyLog[],
        stringValue?: Data[Key] | string,
    ) {
        return printPropertyWorker(
            printWhen,
            value,
            !!data && data[key] !== value,
            Diff.Change,
            dataDiff,
            propertyLogs,
            `${key}: ${stringValue === undefined ? value : stringValue}`,
        );
    }

    function printSetPropertyValueWorker<T>(
        printWhen: PrintPropertyWhen.Always | PrintPropertyWhen.DefinedOrChangedOrNew,
        dataValue: Set<T> | undefined,
        propertyName: string,
        propertyValue: Set<T> | undefined,
        dataDiff: Diff,
        propertyLogs: StatePropertyLog[],
        toStringPropertyValue: (v: T) => string,
    ) {
        const setPropertyLogs = [] as string[];
        let setPropertyDiff = Diff.None;
        propertyValue?.forEach(p =>
            setPropertyDiff = printPropertyWorker(
                PrintPropertyWhen.Always,
                p,
                dataDiff !== Diff.New && !dataValue?.has(p),
                Diff.New,
                setPropertyDiff,
                setPropertyLogs,
                `    ${toStringPropertyValue(p)}`,
            )
        );
        dataValue?.forEach(p => {
            if (propertyValue?.has(p)) return;
            setPropertyDiff = Diff.Change;
            setPropertyLogs.push(`        ${toStringPropertyValue(p)}${Diff.Deleted}`);
        });
        dataDiff = printPropertyWorker(
            printWhen,
            propertyValue,
            !!setPropertyDiff,
            Diff.Change,
            dataDiff,
            propertyLogs,
            `${propertyName}: ${propertyValue?.size || 0}`,
        );
        propertyLogs.push(setPropertyLogs);
        return dataDiff;
    }

    function printPropertyWorker(
        printWhen: PrintPropertyWhen,
        value: any,
        propertyChanged: boolean,
        propertyChangeDiff: Diff.Change | Diff.New,
        dataDiff: Diff,
        propertyLogs: StatePropertyLog[],
        stringValue: string,
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
            case PrintPropertyWhen.DefinedOrChangedOrNew:
                if (value === undefined && !propertyDiff) return result;
                break;
            default:
                Debug.assertNever(printWhen);
        }
        propertyLogs.push(`    ${stringValue}${propertyDiff}`);
        return result;
    }

    function printSetPropertyAndCreateStatementLog<T>(
        logs: StateItemLog[],
        header: string,
        printWhen: PrintPropertyWhen.Always | PrintPropertyWhen.DefinedOrChangedOrNew,
        dataValue: Set<T> | undefined,
        propertyName: string,
        propertyValue: Set<T> | undefined,
        dataDiff: Diff,
        propertyLogs: StatePropertyLog[],
        toStringPropertyValue: (v: T) => string,
    ) {
        dataDiff = printSetPropertyValueWorker(
            printWhen,
            dataValue,
            propertyName,
            propertyValue,
            dataDiff,
            propertyLogs,
            toStringPropertyValue,
        );
        logs.push([
            `${header}${dataDiff}`,
            propertyLogs,
        ]);
        return dataDiff;
    }

    function printScriptInfoSourceMapFilePath(
        data: ScriptInfoData | undefined,
        info: ScriptInfo,
        infoDiff: Diff,
        infoPropertyLogs: StatePropertyLog[],
    ) {
        return !info.sourceMapFilePath || isString(info.sourceMapFilePath) ?
            printProperty(
                PrintPropertyWhen.DefinedOrChangedOrNew,
                data,
                "sourceMapFilePath",
                info.sourceMapFilePath,
                infoDiff,
                infoPropertyLogs,
            ) :
            printSetPropertyValueWorker(
                PrintPropertyWhen.DefinedOrChangedOrNew,
                data?.sourceMapFilePath && !isString(data?.sourceMapFilePath) ? data.sourceMapFilePath.sourceInfos : undefined,
                "sourceMapFilePath sourceInfos",
                info.sourceMapFilePath.sourceInfos,
                infoDiff,
                infoPropertyLogs,
                identity,
            );
    }
}
