"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RM = void 0;
class RM {
    getName() {
        return 'rm';
    }
    getDescription() {
        return "\t\t\tDelete file";
    }
    run(configuration) {
        var absoluteWorkspacePath = configuration.workspace.toAbsolutePath(configuration.server);
    }
}
exports.RM = RM;
