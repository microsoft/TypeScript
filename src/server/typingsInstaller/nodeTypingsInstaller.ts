/// <reference path="typingsInstaller.ts"/>
/// <reference types="node" />

namespace ts.server.typingsInstaller {

    const os: {
        homedir(): string
    } = require("os");

    function getGlobalCacheLocation() {
        let basePath: string;
        switch (process.platform) {
            case "win32":
                basePath = process.env.LOCALAPPDATA || process.env.APPDATA || os.homedir();
                break;
            case "linux":
                basePath = os.homedir();
                break;
            case "darwin":
                basePath = combinePaths(os.homedir(), "Library/Application Support/")
                break;
        }

        Debug.assert(basePath !== undefined);
        return combinePaths(normalizeSlashes(basePath), "Microsoft/TypeScript");
    }

    export class NodeTypingsInstaller extends TypingsInstaller {
        private execSync: { (command: string, options: { stdio: "ignore" }): any };
        private exec: { (command: string, options: { cwd: string }, callback?: (error: Error, stdout: string, stderr: string) => void): any };
        readonly installTypingHost: InstallTypingHost = sys;

        constructor() {
            super(getGlobalCacheLocation(), toPath("typingSafeList.json", __dirname, createGetCanonicalFileName(sys.useCaseSensitiveFileNames)));
            const { exec, execSync } = require("child_process"); 
            this.execSync = execSync;
            this.exec = exec;
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

        protected sendResponse(response: InstallTypingsResponse) {
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