// @ts-check
const cp = require("child_process");
const log = require("fancy-log"); // was `require("gulp-util").log (see https://github.com/gulpjs/gulp-util)
const isWin = /^win/.test(process.platform);
const chalk = require("./chalk");
const { CancellationToken, CancelError } = require("prex");

module.exports = exec;

/**
 * Executes the provided command once with the supplied arguments.
 * @param {string} cmd
 * @param {string[]} args
 * @param {ExecOptions} [options]
 *
 * @typedef ExecOptions
 * @property {boolean} [ignoreExitCode]
 * @property {import("prex").CancellationToken} [cancelToken]
 */
function exec(cmd, args, options = {}) {
    return /**@type {Promise<{exitCode: number}>}*/(new Promise((resolve, reject) => {
        const { ignoreExitCode, cancelToken = CancellationToken.none } = options;
        cancelToken.throwIfCancellationRequested();

        // TODO (weswig): Update child_process types to add windowsVerbatimArguments to the type definition
        const subshellFlag = isWin ? "/c" : "-c";
        const command = isWin ? [possiblyQuote(cmd), ...args] : [`${cmd} ${args.join(" ")}`];
        
        log(`> ${chalk.green(cmd)} ${args.join(" ")}`);
        const proc = cp.spawn(isWin ? "cmd" : "/bin/sh", [subshellFlag, ...command], { stdio: "inherit", windowsVerbatimArguments: true });
        const registration = cancelToken.register(() => {
            log(`${chalk.red("killing")} '${chalk.green(cmd)} ${args.join(" ")}'...`);
            proc.kill("SIGINT");
            proc.kill("SIGTERM");
            reject(new CancelError());
        });
        proc.on("exit", exitCode => {
            registration.unregister();
            if (exitCode === 0 || ignoreExitCode) {
                resolve({ exitCode });
            }
            else {
                reject(new Error(`Process exited with code: ${exitCode}`));
            }
        });
        proc.on("error", error => {
            registration.unregister();
            reject(error);
        });
    }));
}

/**
 * @param {string} cmd
 */
function possiblyQuote(cmd) {
    return cmd.indexOf(" ") >= 0 ? `"${cmd}"` : cmd;
}
