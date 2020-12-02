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
        var proto_1 = BuildWorkspaceService.prototype;
        proto_1.injectRequestService = function (service) {
            this.injectBuildService(new X(service));
        };
        proto_1.injectBuildService = function (service) {
        };
        return BuildWorkspaceService;
    }());
    exports.BuildWorkspaceService = BuildWorkspaceService;
});
