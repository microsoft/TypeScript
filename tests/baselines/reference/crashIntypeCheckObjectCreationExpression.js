//// [crashIntypeCheckObjectCreationExpression.js]
define(["require", "exports"], function(require, exports) {
    var BuildWorkspaceService = (function () {
        function BuildWorkspaceService() {
        }
        BuildWorkspaceService.prototype.injectRequestService = function (service) {
            this.injectBuildService(new X(service));
        };
        BuildWorkspaceService.prototype.injectBuildService = function (service) {
        };
        return BuildWorkspaceService;
    })();
    exports.BuildWorkspaceService = BuildWorkspaceService;
});
