/// <reference path="../../dynamicRunner.ts"/>
const projectDir = "/a/b/projects/project";
const configFileLocation = `${projectDir}/src`;
const f1 = {
    path: `${configFileLocation}/file1.ts`,
    content: ""
};
const configFile = {
    path: `${configFileLocation}/tsconfig.json`,
    content: "{}"
};
const configFile2 = {
    path: "/a/b/projects/tsconfig.json",
    content: "{}"
};
const host = ts.projectSystem.createServerHost([f1, ts.projectSystem.libFile, configFile, configFile2]);
const service = ts.projectSystem.createProjectService(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
service.openClientFile(f1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectDir);

// Delete config file - should create inferred project and not configured project
host.deleteFile(configFile.path);
host.runQueuedTimeoutCallbacks();
ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
ts.projectSystem.baselineTsserverLogs("configFileSearch", "should use projectRootPath when searching for inferred project again", service);