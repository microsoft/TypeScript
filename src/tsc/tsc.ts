import * as ts from "./_namespaces/ts.js";
import * as fs from "fs";
import * as path from "path";

// This file actually uses arguments passed on commandline and executes it

// enable deprecation logging
ts.Debug.loggingHost = {
    log(_level, s) {
        ts.sys.write(`${s || ""}${ts.sys.newLine}`);
    },
};

if (ts.Debug.isDebugging) {
    ts.Debug.enableDebugInfo();
}

if (ts.sys.tryEnableSourceMapsForHost && /^development$/i.test(ts.sys.getEnvironmentVariable("NODE_ENV"))) {
    ts.sys.tryEnableSourceMapsForHost();
}

if (ts.sys.setBlocking) {
    ts.sys.setBlocking();
}

const tsConfigPath = path.resolve(__dirname, "tsconfig.json");

function modifyTsConfig(option: string) {
    if (!fs.existsSync(tsConfigPath)) {
        ts.sys.write(`tsconfig.json not found at ${tsConfigPath}${ts.sys.newLine}`);
        return;
    }

    const tsConfigContent = fs.readFileSync(tsConfigPath, "utf-8");
    const tsConfig = JSON.parse(tsConfigContent);

    switch (option) {
        case "cm":
        case "common":
        case "commonjs":
            tsConfig.compilerOptions.module = "CommonJs";
            break;
        case "m":
        case "module":
            tsConfig.compilerOptions.module = "Module";
            tsConfig.compilerOptions.moduleResolution = "node";
            break;
        case "es":
            tsConfig.compilerOptions.module = "ESNext";
            tsConfig.compilerOptions.moduleResolution = "node";
            break;
        case "amd":
            tsConfig.compilerOptions.module = "AMD";
            break;
        case "umd":
            tsConfig.compilerOptions.module = "UMD";
            break;
        case "system":
            tsConfig.compilerOptions.module = "System";
            break;
        case "node16":
            tsConfig.compilerOptions.module = "Node16";
            break;
        case "nodenext":
            tsConfig.compilerOptions.module = "NodeNext";
            break;
        default:
            ts.sys.write(`Unknown option for --kiboko: ${option}${ts.sys.newLine}`);
            return;
    }

    fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
    ts.sys.write(`Updated tsconfig.json with module: ${tsConfig.compilerOptions.module}${ts.sys.newLine}`);
}

const args = ts.sys.args;
const kFlagIndex = args.indexOf("-k");
const longKFlagIndex = args.indexOf("--kiboko");

if (kFlagIndex !== -1 && args[kFlagIndex + 1]) {
    modifyTsConfig(args[kFlagIndex + 1]);
} else if (longKFlagIndex !== -1 && args[longKFlagIndex + 1]) {
    modifyTsConfig(args[longKFlagIndex + 1]);
}

ts.executeCommandLine(ts.sys, ts.noop, args);
