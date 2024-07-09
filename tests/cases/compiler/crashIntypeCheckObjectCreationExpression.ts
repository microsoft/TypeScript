//@module: amd
export class BuildWorkspaceService {
    public injectRequestService<P0, P1, P2>(service: P0) {
        this.injectBuildService<number>(new X(service));
    }
    public injectBuildService<P0>(service: P0) {
    }
}
