/// <reference path="typingsInstaller.ts"/>
/// <reference types="node" />

namespace ts.server.typingsInstaller {

    const fs: {
        appendFileSync(file: string, content: string): void
    } = require("fs");

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
        private execSync: { (command: string, options: { stdio: "ignore" | "pipe", cwd?: string }): Buffer | string };
        private exec: { (command: string, options: { cwd: string }, callback?: (error: Error, stdout: string, stderr: string) => void): any };
        private npmBinPath: string;

        private installRunCount = 1;
        readonly installTypingHost: InstallTypingHost = sys;

        constructor(globalTypingsCacheLocation: string, log: Log) {
            super(globalTypingsCacheLocation, toPath("typingSafeList.json", __dirname, createGetCanonicalFileName(sys.useCaseSensitiveFileNames)), log);
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
            catch (e) {
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
            });
        }

        protected isPackageInstalled(packageName: string) {
            try {
                const output = this.execSync(`npm list --silent --global --depth=1 ${packageName}`, { stdio: "pipe" }).toString();
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

        protected sendResponse(response: SetTypings | InvalidateCachedTypings) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Sending response: ${JSON.stringify(response)}`);
            }
            process.send(response);
            if (this.log.isEnabled()) {
                this.log.writeLine(`Response has been sent.`);
            }
        }

        protected runInstall(cachePath: string, typingsToInstall: string[], postInstallAction: (installedTypings: string[]) => void): void {
            const id = this.installRunCount;
            this.installRunCount++;
            let execInstallCmdCount = 0;
            let filteredTypings: string[] = [];
            for (const typing of typingsToInstall) {
                const command = `npm view @types/${typing} --silent name`;
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Running npm view @types ${id}, command '${command}'.`);
                }
                this.exec(command, { cwd: cachePath }, (err, stdout, stderr) => {
                    execInstallCmdCount++;
                    if (this.log.isEnabled()) {
                        this.log.writeLine(`npm install @types ${id} stdout: ${stdout}`);
                        this.log.writeLine(`npm install @types ${id} stderr: ${stderr}`);
                    }
                    if (stdout !== "") {
                        filteredTypings.push(typing);
                    }
                    if (execInstallCmdCount >= typingsToInstall.length) {
                        const command = `npm install ${filteredTypings.map(t => "@types/" + t).join(" ")} --save-dev -json`;
                        if (this.log.isEnabled()) {
                            this.log.writeLine(`Running npm install @types ${id}, command '${command}'. cache path '${cachePath}'`);
                        }
                        this.exec(command, { cwd: cachePath }, (err, stdout, stderr) => {
                            if (this.log.isEnabled()) {
                                this.log.writeLine(`npm install @types ${id} stdout: ${stdout}`);
                                this.log.writeLine(`npm install @types ${id} stderr: ${stderr}`);
                            }
                            const installedTypings: string[] = [];
                            try {
                                const response = JSON.parse(stdout);
                                if (response.dependencies) {
                                    for (const typing in response.dependencies) {
                                        installedTypings.push(typing);
                                    }
                                }
                            }
                            catch (e) {
                                this.log.writeLine(`Error parsing installed @types dependencies. Error details: ${e.message}`);
                            }
                            postInstallAction(installedTypings);
                        });
                    }
                });
            }
        }
    }

    function findArgument(argumentName: string) {
        const index = sys.args.indexOf(argumentName);
        return index >= 0 && index < sys.args.length - 1
            ? sys.args[index + 1]
            : undefined;
    }

    const logFilePath = findArgument("--logFile");
    const globalTypingsCacheLocation = findArgument("--globalTypingsCacheLocation");
    const log = new FileLog(logFilePath);
    if (log.isEnabled()) {
        process.on("uncaughtException", (e: Error) => {
            log.writeLine(`Unhandled exception: ${e} at ${e.stack}`);
        });
    }
    process.on("disconnect", () => {
        if (log.isEnabled()) {
            log.writeLine(`Parent process has exited, shutting down...`);
        }
        process.exit(0);
    });
    const installer = new NodeTypingsInstaller(globalTypingsCacheLocation, log);
    installer.init();
}