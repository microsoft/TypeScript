//// [crashIntypeCheckObjectCreationExpression.ts]
export class BuildWorkspaceService {
    public injectRequestService<P0, P1, P2>(service: P0) {
        this.injectBuildService<number>(new X(service));
    }
    public injectBuildService<P0>(service: P0) {
    }
}


//// [crashIntypeCheckObjectCreationExpression.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var BuildWorkspaceService = (function () {
        function BuildWorkspaceService() {
        }
        BuildWorkspaceService.prototype.injectRequestService = function (service) {
            this.injectBuildService(new X(service));
        };
        BuildWorkspaceService.prototype.injectBuildService = function (service) {
        };
        __names(BuildWorkspaceService.prototype, ["injectRequestService", "injectBuildService"]);
        return BuildWorkspaceService;
    }());
    exports.BuildWorkspaceService = BuildWorkspaceService;
});
