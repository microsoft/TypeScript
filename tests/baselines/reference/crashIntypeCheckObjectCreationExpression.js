//// [tests/cases/compiler/crashIntypeCheckObjectCreationExpression.ts] ////

//// [crashIntypeCheckObjectCreationExpression.ts]
export class BuildWorkspaceService {
    public injectRequestService<P0, P1, P2>(service: P0) {
        this.injectBuildService<number>(new X(service));
    }
    public injectBuildService<P0>(service: P0) {
    }
}


//// [crashIntypeCheckObjectCreationExpression.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BuildWorkspaceService = void 0;
    var BuildWorkspaceService = /** @class */ (function () {
        function BuildWorkspaceService() {
        }
        BuildWorkspaceService.prototype.injectRequestService = function (service) {
            this.injectBuildService(new X(service));
        };
        BuildWorkspaceService.prototype.injectBuildService = function (service) {
        };
        return BuildWorkspaceService;
    }());
    exports.BuildWorkspaceService = BuildWorkspaceService;
});
