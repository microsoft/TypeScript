// @module: commonjs
//visibilityOfCrossModuleTypeUsage

// @Filename: visibilityOfCrossModuleTypeUsage_commands.ts
import fs = require('./visibilityOfCrossModuleTypeUsage_fs');
import server = require('./visibilityOfCrossModuleTypeUsage_server');

export interface IConfiguration {
    workspace: server.IWorkspace;
    server?: server.IServer;
}

// @Filename: visibilityOfCrossModuleTypeUsage_server.ts
export interface IServer {
}

export interface IWorkspace {
    toAbsolutePath(server: IServer, workspaceRelativePath?: string): string;
}

// @Filename: visibilityOfCrossModuleTypeUsage_fs.ts
import commands = require('./visibilityOfCrossModuleTypeUsage_commands');
function run(configuration: commands.IConfiguration) {
    var absoluteWorkspacePath = configuration.workspace.toAbsolutePath(configuration.server);
}