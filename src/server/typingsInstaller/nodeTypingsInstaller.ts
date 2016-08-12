/// <reference path="typingsInstaller.ts"/>

namespace ts.server.typingsInstaller {
    export class NodeTypingsInstaller extends TypingsInstaller {
        private execSync: { (command: string, options: { stdio: "ignore" }): any };
        private exec: { (command: string, options: {}, callback?: (error: Error, stdout: string, stderr: string) => void): any };
        constructor() {
            super();
            this.execSync = require("child_process").execSync;
            this.exec = require("child_process").exec;
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

        protected getInstallTypingHost() {
            return sys;
        }

        protected sendResponse(response: InstallTypingsResponse) {
            process.send(response);
        }

        protected runTsd(cachePath: string, typingsToInstall: string[], postInstallAction: (installedTypings: string[]) => void): void {
            this.exec(`tsd install ${typingsToInstall.join(" ")} -ros`, {}, (err, stdout, stderr) => {
                const i = stdout.indexOf("running install");
                if (i < 0) {
                    return;
                }
                const installedTypings: string[] = [];

                const expr = /^\s*-\s*(\S+)\s*$/gm;
                expr.lastIndex = i;
                let match: RegExpExecArray;
                while (match = expr.exec(stdout)) {
                    installedTypings.push(match[1]);
                }
                postInstallAction(installedTypings);
            })
        }
    }

    const installer = new NodeTypingsInstaller();
    installer.init();
}