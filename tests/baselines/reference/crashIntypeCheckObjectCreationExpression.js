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
    exports.__esModule = true;
    exports.BuildWorkspaceService = void 0;
    var BuildWorkspaceService = /** @class */ (function () {
        function BuildWorkspaceService() {
        }
        var BuildWorkspaceService_prototype = BuildWorkspaceService.prototype;
        BuildWorkspaceService_prototype.injectRequestService = function (service) {
            this.injectBuildService(new X(service));
        };
        BuildWorkspaceService_prototype.injectBuildService = function (service) {
        };
        return BuildWorkspaceService;
    }());
    exports.BuildWorkspaceService = BuildWorkspaceService;
});
