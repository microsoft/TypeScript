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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildWorkspaceService = void 0;
class BuildWorkspaceService {
    injectRequestService(service) {
        this.injectBuildService(new X(service));
    }
    injectBuildService(service) {
    }
}
exports.BuildWorkspaceService = BuildWorkspaceService;
