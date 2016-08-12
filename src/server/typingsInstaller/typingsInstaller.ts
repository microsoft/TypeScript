/// <reference path="../../services/services.ts"/>
/// <reference path="../utilities.ts"/>



namespace ts.server.typingsInstaller {
    
    const DefaultTsdSettings = JSON.stringify({
        version: "v4",
        repo: "DefinitelyTyped/DefinitelyTyped",
        ref: "master",
        path: "typings"
    }, /*replacer*/undefined, /*space*/4);

    export abstract class TypingsInstaller {
        
        private isTsdInstalled: boolean;
        private missingTypings: Map<string> = {};

        init() {
            this.isTsdInstalled = this.isPackageInstalled("tsd");
            if (!this.isTsdInstalled) {
                this.isTsdInstalled = this.installPackage("tsd");
            }
        }

        install(req: InstallTypingsRequest) {
            if (!this.isTsdInstalled) {
                return;
            }

            const discoverTypingsResult = JsTyping.discoverTypings(
                this.getInstallTypingHost(),
                req.fileNames,
                req.projectRootPath,
                req.safeListPath,
                req.packageNameToTypingLocation,
                req.typingOptions,
                req.compilerOptions);

            // respond with whatever cached typings we have now
            this.sendResponse(this.createResponse(req, discoverTypingsResult.cachedTypingPaths));
            this.watchFiles(discoverTypingsResult.filesToWatch);
            this.installTypings(req, discoverTypingsResult.newTypingNames);
        }

        private installTypings(req: InstallTypingsRequest, typingsToInstall: string[]) {
            // TODO: install typings and send response when they are ready
            const existingTypings = typingsToInstall.fi
            const host = this.getInstallTypingHost();
            const tsdPath = combinePaths(req.cachePath, "tsd.json");
            if (!host.fileExists(tsdPath)) {
                host.writeFile(tsdPath, DefaultTsdSettings);
            }
        }

        private watchFiles(files: string[]) {
            // TODO: start watching files
        }

        private createResponse(request: InstallTypingsRequest, typings: string[]) {
            return {
                projectName: request.projectName,
                typingOptions: request.typingOptions,
                compilerOptions: request.compilerOptions,
                typings
            };
        }

        protected abstract isPackageInstalled(packageName: string): boolean;
        protected abstract installPackage(packageName: string): boolean;
        protected abstract getInstallTypingHost(): InstallTypingHost;
        protected abstract sendResponse(response: InstallTypingsResponse): void;
    }
}