// @ts-check
const cp = require("child_process");
const log = require("fancy-log"); // was `require("gulp-util").log (see https://github.com/gulpjs/gulp-util)
const isWin = /^win/.test(process.platform);
const chalk = require("./chalk");
const { CancelToken, CancelError } = require("./cancellation");

module.exports = exec;

/**
 * Executes the provided command once with the supplied arguments.
 * @param {string} cmd
 * @param {string[]} args
 * @param {ExecOptions} [options]
 *
 * @typedef ExecOptions
 * @property {boolean} [ignoreExitCode]
 * @property {CancelToken} [cancelToken]
 */
function exec(cmd, args, options = {}) {
    return /**@type {Promise<{exitCode: number}>}*/(new Promise((resolve, reject) => {
        log(`> ${chalk.green(cmd)} ${args.join(" ")}`);
        // TODO (weswig): Update child_process types to add windowsVerbatimArguments to the type definition
        const subshellFlag = isWin ? "/c" : "-c";
        const command = isWin ? [possiblyQuote(cmd), ...args] : [`${cmd} ${args.join(" ")}`];
        const ex = cp.spawn(isWin ? "cmd" : "/bin/sh", [subshellFlag, ...command], { stdio: "inherit", windowsVerbatimArguments: true });
        const subscription = options.cancelToken && options.cancelToken.subscribe(() => {
            log(`${chalk.red("killing")} '${chalk.green(cmd)} ${args.join(" ")}'...`);
            ex.kill("SIGINT");
            ex.kill("SIGTERM");
            ex.kill();
            reject(new CancelError());
        });
        ex.on("exit", exitCode => {
            subscription && subscription.unsubscribe();
            if (exitCode === 0 || options.ignoreExitCode) {
                resolve({ exitCode });
            }
            else {
                reject(new Error(`Process exited with code: ${exitCode}`));
            }
        });
        ex.on("error", error => {
            subscription && subscription.unsubscribe();
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
