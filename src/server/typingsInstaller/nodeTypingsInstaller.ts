/// <reference path="typingsInstaller.ts"/>

namespace ts.server.typingsInstaller {
    export class NodeTypingsInstaller extends TypingsInstaller {
        private execSync: { (command: string, options: { stdio: "ignore" }): any };
        constructor() {
            super();
            this.execSync = require("child_process").execSync;
        }

        init() {
            super.init();
            process.on("install", (req: InstallTypingsRequest) => {
                this.install(req);
            })
        }

        protected isPackageInstalled(packageName: string) {
            try {
                this.execSync(`npm list --global --depth=1 ${name}`, { stdio: "ignore" });
                return true;
            }
            catch (e) {
                return false;
            }
        }

        protected installPackage(packageName: string) {
            try {
                this.execSync(`npm install --global ${name}`, { stdio: "ignore" });
                return true;
            }
            catch (e) {
                return false;
            }
        }

        protected getTypingResolutionHost() {
            return sys;
        }

        protected sendResponse(response: InstallTypingsResponse) {
            process.send(response);
        }
    }

    const installer = new NodeTypingsInstaller();
    installer.init();
}