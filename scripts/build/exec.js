// @ts-check
const cp = require("child_process");
const log = require("fancy-log"); // was `require("gulp-util").log (see https://github.com/gulpjs/gulp-util)
const isWin = /^win/.test(process.platform);
const { addColor, color } = require("./colors");

module.exports = exec;

/**
 * Executes the provided command once with the supplied arguments.
 * @param {string} cmd
 * @param {string[]} args
 * @param {object} [options]
 * @param {boolean} [options.ignoreExitCode]
 */
function exec(cmd, args, options = {}) {
    return /**@type {Promise<{exitCode: number}>}*/(new Promise((resolve, reject) => {
        log(addColor(`${cmd} ${args.join(" ")}`, color.gray));
        // TODO (weswig): Update child_process types to add windowsVerbatimArguments to the type definition
        const subshellFlag = isWin ? "/c" : "-c";
        const command = isWin ? [possiblyQuote(cmd), ...args] : [`${cmd} ${args.join(" ")}`];
        const ex = cp.spawn(isWin ? "cmd" : "/bin/sh", [subshellFlag, ...command], { stdio: "inherit", windowsVerbatimArguments: true });
        ex.on("exit", exitCode => {
            if (exitCode === 0 || options.ignoreExitCode) {
                resolve({ exitCode });
            }
            else {
                reject(new Error(`Process exited with code: ${exitCode}`));
            }
        });
        ex.on("error", reject);
    }));
}

/**
 * @param {string} cmd
 */
function possiblyQuote(cmd) {
    return cmd.indexOf(" ") >= 0 ? `"${cmd}"` : cmd;
}
