//// [visibilityOfCrossModuleTypeUsage_fs.ts]
import commands = require('visibilityOfCrossModuleTypeUsage_commands');
function run(configuration: commands.IConfiguration) {
    var absoluteWorkspacePath = configuration.workspace.toAbsolutePath(configuration.server);
}

//// [visibilityOfCrossModuleTypeUsage_server.js]
//// [visibilityOfCrossModuleTypeUsage_commands.js]
//visibilityOfCrossModuleTypeUsage
//// [visibilityOfCrossModuleTypeUsage_fs.js]
function run(configuration) {
    var absoluteWorkspacePath = configuration.workspace.toAbsolutePath(configuration.server);
}
