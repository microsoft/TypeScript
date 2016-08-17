/// <reference path="typingsInstaller.ts"/>
/// <reference types="node" />

namespace ts.server.typingsInstaller {

    const os: {
        homedir(): string
    } = require("os");

    const fs: {
        appendFileSync(file: string, content: string): void
    } = require("fs");

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

    class FileLog implements Log {
        constructor(private readonly logFile?: string) {
        }
        
        isEnabled() {
            return this.logFile !== undefined;
        }
        writeLine(text: string) {
            fs.appendFileSync(this.logFile, text + sys.newLine);
        }
    }

    export class NodeTypingsInstaller extends TypingsInstaller {
        private execSync: { (command: string, options: { stdio: "ignore" | "pipe" }): Buffer | string };
        private exec: { (command: string, options: { cwd: string }, callback?: (error: Error, stdout: string, stderr: string) => void): any };
        
        private npmBinPath: string;
        
        private tsdRunCount = 1;
        readonly installTypingHost: InstallTypingHost = sys;

        constructor(log?: Log) {
            super(getGlobalCacheLocation(), toPath("typingSafeList.json", __dirname, createGetCanonicalFileName(sys.useCaseSensitiveFileNames)), log);
            if (this.log.isEnabled()) {
                this.log.writeLine(`Process id: ${process.pid}`);
            }
            const { exec, execSync } = require("child_process"); 
            this.execSync = execSync;
            this.exec = exec;
        }

        init() {
            super.init();
            try {
                this.npmBinPath = this.execSync("npm -g bin", { stdio: "pipe" }).toString().trim();
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Global npm bin path '${this.npmBinPath}'`);
                }
            }
            catch(e) {
                this.npmBinPath = "";
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Error when getting npm bin path: ${e}. Set bin path to ""`);
                }
            }
            process.on("message", (req: DiscoverTypings | CloseProject) => {
                switch (req.kind) {
                    case "discover":
                        this.install(req);
                        break;
                    case "closeProject":
                        this.closeProject(req);
                }
            })
        }

        protected isPackageInstalled(packageName: string) {
            try {
                const output = this.execSync(`npm list --global --depth=1 ${packageName}`, { stdio: "pipe" }).toString();
                if (this.log.isEnabled()) {
                    this.log.writeLine(`IsPackageInstalled::stdout '${output}'`);
                }
                return true;
            }
            catch (e) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`IsPackageInstalled::err::stdout '${e.stdout && e.stdout.toString()}'`);
                    this.log.writeLine(`IsPackageInstalled::err::stderr '${e.stdout && e.stderr.toString()}'`);
                }
                return false;
            }
        }

        protected installPackage(packageName: string) {
            try {
                const output = this.execSync(`npm install --global ${packageName}`, { stdio: "pipe" }).toString();
                if (this.log.isEnabled()) {
                    this.log.writeLine(`installPackage::stdout '${output}'`);
                }
                return true;
            }
            catch (e) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`installPackage::err::stdout '${e.stdout && e.stdout.toString()}'`);
                    this.log.writeLine(`installPackage::err::stderr '${e.stdout && e.stderr.toString()}'`);
                }
                return false;
            }
        }

        protected sendResponse(response: SetTypings | InvalidateCachedTypings) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Sending response: ${JSON.stringify(response)}`)
            }
            process.send(response);
            if (this.log.isEnabled()) {
                this.log.writeLine(`Response has been sent.`)
            }
        }

        protected runTsd(cachePath: string, typingsToInstall: string[], postInstallAction: (installedTypings: string[]) => void): void {
            const id = this.tsdRunCount;
            this.tsdRunCount++;
            const tsdPath = combinePaths(this.npmBinPath, "tsd");
            if (this.log.isEnabled()) {
                this.log.writeLine(`Running tsd ${id}, tsd path '${tsdPath}, typings to install: ${JSON.stringify(typingsToInstall)}. cache path '${cachePath}'`) 
            }
            this.exec(`${tsdPath} install ${typingsToInstall.join(" ")} -ros`, { cwd: cachePath  }, (err, stdout, stderr) => {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`TSD ${id} stdout: ${stdout}`);
                    this.log.writeLine(`TSD ${id} stderr: ${stderr}`)
                }
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

    const log = new FileLog(process.env.TI_LOG_FILE);
    if (log.isEnabled()) {
        process.on("uncaughtException", (e: Error) => {
            log.writeLine(`Unhandled exception: ${e} at ${e.stack}`);
        });
        process.on("disconnect", () => {
            log.writeLine(`Parent process has exited, shutting down...`);
            process.exit(0);
        });
    }
    const installer = new NodeTypingsInstaller(log);
    installer.init();
}