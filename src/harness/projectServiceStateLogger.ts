import {
    arrayFrom,
    compareStringsCaseSensitive,
    Debug,
    DocumentPositionMapper,
    emptyArray,
    identity,
    identitySourceMapConsumer,
    isString,
    noop,
    SourceMapper,
    toSorted,
} from "./_namespaces/ts.js";
import {
    AutoImportProviderProject,
    AuxiliaryProject,
    ConfiguredProject,
    isBackgroundProject,
    isConfiguredProject,
    LogLevel,
    Project,
    ProjectKind,
    ProjectService,
    ScriptInfo,
    SourceMapFileWatcher,
    TextStorage,
} from "./_namespaces/ts.server.js";
import { LoggerWithInMemoryLogs } from "./tsserverLogger.js";

interface ProjectData {
    projectStateVersion: Project["projectStateVersion"];
    projectProgramVersion: Project["projectProgramVersion"];
    dirty: Project["dirty"];
    initialLoadPending: Project["initialLoadPending"];
    isClosed: ReturnType<Project["isClosed"]>;
    isOrphan: ReturnType<Project["isOrphan"]>;
    noOpenRef: boolean;
    deferredClose: ConfiguredProject["deferredClose"];
    documentPositionMappers: SourceMapper["documentPositionMappers"];
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
    deferredDelete: ScriptInfo["deferredDelete"];
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

export function patchServiceForStateBaseline(service: ProjectService): void {
    if (!service.logger.isTestLogger || !service.logger.hasLevel(LogLevel.verbose)) return;
    if (service.baseline !== noop) return; // Already patched

    const projects = new Map<Project, ProjectData>();
    const scriptInfos = new Map<ScriptInfo, ScriptInfoData>();
    const documentPositionMappers = new Map<DocumentPositionMapper, DocumentPositionMapper>();
    let nextDocumentPositionMapperId = 1;
    const mapperToId = new Map<DocumentPositionMapper, number>();
    const logger = service.logger as LoggerWithInMemoryLogs;
    service.baseline = title => {
        const currentMappers = new Set<DocumentPositionMapper>();
        const projectLogs = baselineProjects(currentMappers);
        const infoLogs = baselineScriptInfos(currentMappers);
        currentMappers.delete(identitySourceMapConsumer);
        const mapperLogs = baselineDocumentPositionMappers(currentMappers);
        if (projectLogs?.length || infoLogs?.length || mapperLogs?.length) {
            if (title) logger.log(title);
            sendLogsToLogger("Projects::", projectLogs);
            sendLogsToLogger("ScriptInfos::", infoLogs);
            sendLogsToLogger("DocumentPositionMappers::", mapperLogs);
        }
    };

    function sendLogsToLogger(title: string, logs: StateItemLog[] | undefined) {
        if (!logs) return;
        logger.log(title);
        toSorted(logs, (a, b) => compareStringsCaseSensitive(a[0], b[0]))
            .forEach(([title, propertyLogs]) => {
                logger.log(title);
                propertyLogs.forEach(p => isString(p) ? logger.log(p) : p.forEach(s => logger.log(s)));
            });
        logger.log("");
    }

    function baselineProjects(currentMappers: Set<DocumentPositionMapper>) {
        const autoImportProviderProjects = [] as AutoImportProviderProject[];
        const auxiliaryProjects = [] as AuxiliaryProject[];
        const orphanConfiguredProjects = service.getOrphanConfiguredProjects(
            /*toRetainConfiguredProjects*/ undefined,
            /*openFilesWithRetainedConfiguredProject*/ undefined,
            /*externalProjectsRetainingConfiguredProjects*/ undefined,
        );
        const noOpenRef = (project: Project) => isConfiguredProject(project) && (project.isClosed() || orphanConfiguredProjects.has(project));
        return baselineState(
            [service.externalProjects, service.configuredProjects, service.inferredProjects, autoImportProviderProjects, auxiliaryProjects],
            projects,
            (logs, project, data) => {
                if (project.autoImportProviderHost) autoImportProviderProjects.push(project.autoImportProviderHost);
                if (project.noDtsResolutionProject) auxiliaryProjects.push(project.noDtsResolutionProject);
                let projectDiff = newOrDeleted(project, projects, data);
                if (projectDiff !== Diff.Deleted) getSourceMapper(project)?.documentPositionMappers.forEach(mapper => currentMappers.add(mapper));
                const projectPropertyLogs = [] as string[];
                projectDiff = printProperty(PrintPropertyWhen.Always, data, "projectStateVersion", project.projectStateVersion, projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.Always, data, "projectProgramVersion", project.projectProgramVersion, projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "dirty", project.dirty, projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "initialLoadPending", project.initialLoadPending, projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "isClosed", project.isClosed(), projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "isOrphan", !isBackgroundProject(project) && project.isOrphan(), projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "noOpenRef", noOpenRef(project), projectDiff, projectPropertyLogs);
                projectDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "deferredClose", isConfiguredProject(project) && project.deferredClose, projectDiff, projectPropertyLogs);
                projectDiff = printMapPropertyValue(
                    PrintPropertyWhen.Changed,
                    data?.documentPositionMappers,
                    "documentPositionMappers",
                    getSourceMapper(project)?.documentPositionMappers,
                    projectDiff,
                    projectPropertyLogs,
                    toStringDocumentPostionMapper,
                );
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
                initialLoadPending: project.initialLoadPending,
                isClosed: project.isClosed(),
                isOrphan: !isBackgroundProject(project) && project.isOrphan(),
                noOpenRef: noOpenRef(project),
                deferredClose: isConfiguredProject(project) && project.deferredClose,
                autoImportProviderHost: project.autoImportProviderHost,
                noDtsResolutionProject: project.noDtsResolutionProject,
                originalConfiguredProjects: project.originalConfiguredProjects && new Set(project.originalConfiguredProjects),
                documentPositionMappers: new Map(getSourceMapper(project)?.documentPositionMappers),
            }),
        );
    }

    function baselineScriptInfos(currentMappers: Set<DocumentPositionMapper>) {
        return baselineState(
            [service.filenameToScriptInfo],
            scriptInfos,
            (logs, info, data) => {
                let infoDiff = newOrDeleted(info, scriptInfos, data);
                if (infoDiff !== Diff.Deleted && info.documentPositionMapper) currentMappers.add(info.documentPositionMapper);
                const infoPropertyLogs = [] as string[];
                const isOpen = info.isScriptOpen();
                infoDiff = printProperty(PrintPropertyWhen.Changed, data, "open", isOpen, infoDiff, infoPropertyLogs);
                infoDiff = printProperty(PrintPropertyWhen.Always, data, "version", info.textStorage.getVersion(), infoDiff, infoPropertyLogs);
                infoDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "pendingReloadFromDisk", info.textStorage.pendingReloadFromDisk, infoDiff, infoPropertyLogs);
                infoDiff = printProperty(PrintPropertyWhen.TruthyOrChangedOrNew, data, "deferredDelete", info.deferredDelete, infoDiff, infoPropertyLogs);
                infoDiff = printScriptInfoSourceMapFilePath(data, info, infoDiff, infoPropertyLogs);
                infoDiff = printProperty(PrintPropertyWhen.DefinedOrChangedOrNew, data, "declarationInfoPath", info.declarationInfoPath, infoDiff, infoPropertyLogs);
                infoDiff = printSetPropertyValueWorker(PrintPropertyWhen.DefinedOrChangedOrNew, data?.sourceInfos, "sourceInfos", info.sourceInfos, infoDiff, infoPropertyLogs, identity);
                infoDiff = printProperty(PrintPropertyWhen.DefinedOrChangedOrNew, data, "documentPositionMapper", info.documentPositionMapper, infoDiff, infoPropertyLogs, info.documentPositionMapper ? toStringDocumentPostionMapper(info.documentPositionMapper) : undefined);
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
                deferredDelete: info.deferredDelete,
            }),
        );
    }

    function baselineDocumentPositionMappers(currentMappers: Set<DocumentPositionMapper>) {
        const result = baselineState(
            [currentMappers],
            documentPositionMappers,
            (logs, mapper, data) => {
                const mapperDiff = newOrDeleted(mapper, documentPositionMappers, data);
                logs.push([
                    `${toStringDocumentPostionMapper(mapper)}${mapperDiff}`,
                    emptyArray,
                ]);
                return mapperDiff;
            },
            identity,
        );
        mapperToId.forEach((_id, mapper) => {
            if (!documentPositionMappers.has(mapper)) mapperToId.delete(mapper);
        });
        return result;
    }

    function baselineState<T, Data>(
        currentCaches: (T[] | Map<any, T> | Set<T>)[],
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
            !!data && data[key] !== value ? Diff.Change : Diff.None,
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
        return printMapOrSetPropertyValueWorker(
            printWhen,
            dataValue,
            propertyName,
            propertyValue,
            dataDiff,
            propertyLogs,
            value => dataDiff !== Diff.New && !dataValue?.has(value) ? Diff.New : Diff.None,
            toStringPropertyValue,
        );
    }

    function printMapPropertyValue<T>(
        printWhen: PrintPropertyWhen.Changed,
        dataValue: Map<string, T> | undefined,
        propertyName: string,
        propertyValue: Map<string, T> | undefined,
        dataDiff: Diff,
        propertyLogs: StatePropertyLog[],
        toStringPropertyValue: (v: T) => string,
    ) {
        return printMapOrSetPropertyValueWorker(
            printWhen,
            dataValue,
            propertyName,
            propertyValue,
            dataDiff,
            propertyLogs,
            (value, key) =>
                dataDiff !== Diff.New && dataValue?.get(key) !== value ?
                    !dataValue?.has(key) ? Diff.New : Diff.Change : Diff.None,
            (value, key) => `${key}: ${toStringPropertyValue(value)}`,
        );
    }

    type MapOrSetPropertyKey<T> = T extends Map<infer U, any> ? U : T extends Set<infer U> ? U : never;
    type MapOrSetPropertyValue<T> = T extends Map<any, infer U> ? U : T extends Set<infer U> ? U : never;
    function printMapOrSetPropertyValueWorker<T extends Map<string, any> | Set<any>>(
        printWhen: PrintPropertyWhen.Always | PrintPropertyWhen.DefinedOrChangedOrNew | PrintPropertyWhen.Changed,
        dataValue: T | undefined,
        propertyName: string,
        propertyValue: T | undefined,
        dataDiff: Diff,
        propertyLogs: StatePropertyLog[],
        getPropertyDiff: (value: MapOrSetPropertyValue<T>, key: MapOrSetPropertyKey<T>) => Diff,
        toStringPropertyValue: (value: MapOrSetPropertyValue<T>, key: MapOrSetPropertyKey<T>) => string,
    ) {
        // Print changes
        const mapPropertyLogs = [] as string[];
        let mapPropertyDiff = Diff.None;
        propertyValue?.forEach((p, key) =>
            mapPropertyDiff = printPropertyWorker(
                PrintPropertyWhen.Always,
                p,
                getPropertyDiff(p, key),
                mapPropertyDiff,
                mapPropertyLogs,
                `    ${toStringPropertyValue(p, key)}`,
            )
        );
        dataValue?.forEach((p, key) => {
            if (propertyValue?.has(key)) return;
            mapPropertyDiff = Diff.Change;
            mapPropertyLogs.push(`        ${toStringPropertyValue(p, key)}${Diff.Deleted}`);
        });
        dataDiff = printPropertyWorker(
            printWhen,
            propertyValue,
            !!mapPropertyDiff ? Diff.Change : Diff.None,
            dataDiff,
            propertyLogs,
            `${propertyName}: ${propertyValue?.size || 0}`,
        );
        if (printWhen !== PrintPropertyWhen.Changed || mapPropertyDiff) propertyLogs.push(mapPropertyLogs);
        return dataDiff;
    }

    function printPropertyWorker(
        printWhen: PrintPropertyWhen,
        value: any,
        propertyDiff: Diff,
        dataDiff: Diff,
        propertyLogs: StatePropertyLog[],
        stringValue: string,
    ) {
        const result = !dataDiff && propertyDiff ? Diff.Change : dataDiff;
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

    function toStringDocumentPostionMapper(documentPositionMapper: DocumentPositionMapper) {
        if (documentPositionMapper === identitySourceMapConsumer) return "identitySourceMapConsumer";
        let id = mapperToId.get(documentPositionMapper);
        if (!id) mapperToId.set(documentPositionMapper, id = nextDocumentPositionMapperId++);
        return `DocumentPositionMapper${id}`;
    }

    function getSourceMapper(project: Project) {
        return project.projectKind !== ProjectKind.AutoImportProvider ?
            project.getLanguageService(/*ensureSynchronized*/ false)?.getSourceMapper() :
            undefined;
    }
}
