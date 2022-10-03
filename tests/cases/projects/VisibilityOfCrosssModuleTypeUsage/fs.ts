import commands = require('./commands');

export class RM {

    public getName() {
        return 'rm';
    }

    public getDescription() {
        return "\t\t\tDelete file";
    }

    private run(configuration: commands.IConfiguration) {
        var absoluteWorkspacePath = configuration.workspace.toAbsolutePath(configuration.server);
    }
}