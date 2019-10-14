/**
 * Create a NodeTypingsInstaller for use in ATA.
 *
 * This file creates an instance of NodeTypingsInstaller *upon evaluation*,
 * so is not suitable for inclusion in other compilations.
 * See ../typingsInstallerCore/nodeTypingsInstallerCore.ts for the class definition,
 * and ../testRunner/unittests/tsserver/typingsInstaller.ts for the tests.
 */
namespace ts.server.typingsInstaller {
    const fs: {
        appendFileSync(file: string, content: string): void
    } = require("fs");

    class FileLog implements Log {
        constructor(private logFile: string | undefined) {
        }

        isEnabled = () => {
            return typeof this.logFile === "string";
        };
        writeLine = (text: string) => {
            if (typeof this.logFile !== "string") return;

            try {
                fs.appendFileSync(this.logFile, `[${nowString()}] ${text}${sys.newLine}`);
            }
            catch (e) {
                this.logFile = undefined;
            }
        };
    }

    const logFilePath = findArgument(Arguments.LogFile);
    const globalTypingsCacheLocation = findArgument(Arguments.GlobalCacheLocation);
    const typingSafeListLocation = findArgument(Arguments.TypingSafeListLocation);
    const typesMapLocation = findArgument(Arguments.TypesMapLocation);
    const npmLocation = findArgument(Arguments.NpmLocation);
    const validateDefaultNpmLocation = hasArgument(Arguments.ValidateDefaultNpmLocation);

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

    const nodeHost: NodeInstallTypingHost = {
        useCaseSensitiveFileNames: sys.useCaseSensitiveFileNames,
        writeFile: sys.writeFile,
        createDirectory: sys.createDirectory,
        directoryExists: sys.directoryExists,
        fileExists: sys.fileExists,
        readFile: sys.readFile,
        readDirectory: sys.readDirectory,
        watchFile: sys.watchFile,

        /** Returns false on error */
        execSyncAndLog(command: string, options: string, log: Log): boolean {
            if (log.isEnabled()) {
                log.writeLine(`Exec: ${command}`);
            }
            try {
                const stdout = require("child_process").execSync(command, { cwd: options, encoding: "utf-8" });
                if (log.isEnabled()) {
                    log.writeLine(`    Succeeded. stdout:${indent(sys.newLine, stdout)}`);
                }
                return true;
            }
            catch (error) {
                const { stdout, stderr } = error;
                log.writeLine(`    Failed. stdout:${indent(sys.newLine, stdout)}${sys.newLine}    stderr:${indent(sys.newLine, stderr)}`);
                return false;
            }
        }
    }
    const installer = new NodeTypingsInstaller(nodeHost, globalTypingsCacheLocation, typingSafeListLocation!, typesMapLocation!, npmLocation, validateDefaultNpmLocation, /*throttleLimit*/5, log); // TODO: GH#18217
    installer.listen();

    function indent(newline: string, str: string): string {
        return `${newline}    ` + str.replace(/\r?\n/, `${newline}    `);
    }
}
