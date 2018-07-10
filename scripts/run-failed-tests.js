const spawn = require('child_process').spawn;
const os = require("os");
const fs = require("fs");
const path = require("path");

let grep;
try {
    const failedTests = fs.readFileSync(".failed-tests", "utf8");
    grep = failedTests
        .split(/\r?\n/g)
        .map(test => test.trim())
        .filter(test => test.length > 0)
        .map(escapeRegExp);
}
catch (e) {
    grep = [];
}

let args = [];
let waitForGrepValue = false;
let grepIndex = -1;
process.argv.slice(2).forEach((arg, index) => {
    const [flag, value] = arg.split('=');
    if (flag === "g" || flag === "grep") {
        grepIndex = index - 1;
        waitForGrepValue = arg !== flag;
        if (!waitForGrepValue) grep.push(value.replace(/^"|"$/g, ""));
        return;
    }
    if (waitForGrepValue) {
        grep.push(arg.replace(/^"|"$/g, ""));
        waitForGrepValue = false;
        return;
    }
    args.push(arg);
});

let mocha = "./node_modules/mocha/bin/mocha";
let grepOption;
let grepOptionValue;
let grepFile;
if (grep.length) {
    grepOption = "--grep";
    grepOptionValue = grep.join("|");
    if (grepOptionValue.length > 20) {
        grepFile = path.resolve(os.tmpdir(), ".failed-tests.opts");
        fs.writeFileSync(grepFile, `--grep ${grepOptionValue}`, "utf8");
        grepOption = "--opts";
        grepOptionValue = grepFile;
        mocha = "./node_modules/mocha/bin/_mocha";
    }
}

if (grepOption) {
    if (grepIndex >= 0) {
        args.splice(grepIndex, 0, grepOption, grepOptionValue);
    }
    else {
        args.push(grepOption, grepOptionValue);
    }
}

args.unshift(path.resolve(mocha));

console.log(args.join(" "));
const proc = spawn(process.execPath, args, {
    stdio: 'inherit'
});
proc.on('exit', (code, signal) => {
    process.on('exit', () => {
        if (grepFile) {
            try {
                fs.unlinkSync(grepFile);
            }
            catch (e) {
                if (e.code !== "ENOENT") throw e;
            }
        }

        if (signal) {
            process.kill(process.pid, signal);
        } else {
            process.exit(code);
        }
    });
});

process.on('SIGINT', () => {
    proc.kill('SIGINT');
    proc.kill('SIGTERM');
});

function escapeRegExp(pattern) {
    return pattern
        .replace(/[^-\w\d\s]/g, match => "\\" + match)
        .replace(/\s/g, "\\s");
}