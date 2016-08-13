/// <reference path="../../services/JsTyping.ts"/>
/// <reference path="../types.d.ts"/>

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
            // start watching files
            this.watchFiles(discoverTypingsResult.filesToWatch);
            // install typings and 
            this.installTypings(req, discoverTypingsResult.cachedTypingPaths, discoverTypingsResult.newTypingNames);
        }

        private installTypings(req: InstallTypingsRequest, currentlyCachedTypings: string[], typingsToInstall: string[]) {
            typingsToInstall = filter(typingsToInstall, x => !hasProperty(this.missingTypings, x));
            if (typingsToInstall.length === 0) {
                return;
            }

            // TODO: install typings and send response when they are ready
            const host = this.getInstallTypingHost();
            const tsdPath = combinePaths(req.cachePath, "tsd.json");
            if (!host.fileExists(tsdPath)) {
                this.ensureDirectoryExists(req.cachePath, host);
                host.writeFile(tsdPath, DefaultTsdSettings);
            }

            this.runTsd(req.cachePath, typingsToInstall, installedTypings => {
                // TODO: record new missing package names
                // TODO: watch project directory
                installedTypings = installedTypings.map(x => getNormalizedAbsolutePath(x, req.cachePath));
                this.sendResponse(this.createResponse(req, currentlyCachedTypings.concat(installedTypings)));
            });
        }

        private ensureDirectoryExists(directory: string, host: InstallTypingHost): void {
            const directoryName = getDirectoryPath(directory);
            if (!host.directoryExists(directoryName)) {
                this.ensureDirectoryExists(directoryName, host);
            }
            if (!host.directoryExists(directory)) {
                host.createDirectory(directory);
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
        protected abstract runTsd(cachePath: string, typingsToInstall: string[], postInstallAction: (installedTypings: string[]) => void): void;
    }
}