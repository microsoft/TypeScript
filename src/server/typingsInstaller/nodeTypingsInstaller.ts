/// <reference path="typingsInstaller.ts"/>
/// <reference types="node" />

namespace ts.server.typingsInstaller {
    export class NodeTypingsInstaller extends TypingsInstaller {
        private execSync: { (command: string, options: { stdio: "ignore" }): any };
        private exec: { (command: string, options: { cwd: string }, callback?: (error: Error, stdout: string, stderr: string) => void): any };
        constructor() {
            super();
            this.execSync = require("child_process").execSync;
            this.exec = require("child_process").exec;
        }

        init() {
            super.init();
            process.on("message", (req: InstallTypingsRequest) => {
                this.install(req);
            })
        }

        protected isPackageInstalled(packageName: string) {
            try {
                this.execSync(`npm list --global --depth=1 ${packageName}`, { stdio: "ignore" });
                return true;
            }
            catch (e) {
                return false;
            }
        }

        protected installPackage(packageName: string) {
            try {
                this.execSync(`npm install --global ${packageName}`, { stdio: "ignore" });
                return true;
            }
            catch (e) {
                return false;
            }
        }

        protected getInstallTypingHost() {
            return sys;
        }

        C = 1;

        protected sendResponse(response: InstallTypingsResponse) {
            (<any>response).___id = [this.C];
            this.C++;
            log("sendResponse::" + JSON.stringify(response));
            process.send(response);
        }

        protected runTsd(cachePath: string, typingsToInstall: string[], postInstallAction: (installedTypings: string[]) => void): void {
            this.exec(`tsd install ${typingsToInstall.join(" ")} -ros`, { cwd: cachePath  }, (err, stdout, stderr) => {
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