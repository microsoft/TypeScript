import fs from "node:fs";
import module from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

// NOTE: Keep VS Code extension's resolveTsdkPathToExe in sync with this function.
export default function getExePath() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const normalizedDirname = __dirname.replace(/\\/g, "/");

    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));
    const pkgName = pkg.name;
    const baseName = pkgName.startsWith("@") ? pkgName.split("/")[1] : pkgName;
    const expectedBinName = baseName === "typescript" ? "tsc" : "tsgo";
    const binNames = pkg.bin && typeof pkg.bin === "object" ? Object.keys(pkg.bin) : [];
    if (binNames.length !== 1 || binNames[0] !== expectedBinName) {
        throw new Error(`Expected ${pkgName} to declare exactly one bin entry named ${expectedBinName}.`);
    }
    let binName = expectedBinName;
    let exeDir;

    const expectedPackage = baseName + "-" + process.platform + "-" + process.arch;

    if (normalizedDirname.endsWith("/_packages/" + baseName + "/lib")) {
        // We're running directly from source in the repo.
        // The local repo build (`hereby build`) always produces `tsgo`, regardless
        // of the published `bin` name, so don't use binName here.
        exeDir = path.resolve(__dirname, "..", "..", "..", "built", "local");
        binName = "tsgo";
    }
    else if (normalizedDirname.endsWith("/built/npm/" + baseName + "/lib")) {
        // We're running from the built output.
        exeDir = path.resolve(__dirname, "..", "..", expectedPackage, "lib");
    }
    else {
        // We're actually running from an installed package.
        const platformPackageName = "@typescript/" + expectedPackage;
        try {
            if (typeof import.meta.resolve === "undefined") {
                // v16.20.1
                const require = module.createRequire(import.meta.url);
                const packageJson = require.resolve(platformPackageName + "/package.json");
                exeDir = path.join(path.dirname(packageJson), "lib");
            }
            else {
                // v20.6.0, v18.19.0
                const packageJson = import.meta.resolve(platformPackageName + "/package.json");
                const packageJsonPath = fileURLToPath(packageJson);
                exeDir = path.join(path.dirname(packageJsonPath), "lib");
            }
        }
        catch (e) {
            throw new Error("Unable to resolve " + platformPackageName + ". Either your platform is unsupported, or you are missing the package on disk.");
        }
    }

    let exe = path.join(exeDir, binName);
    if (process.platform === "win32") {
        exe += ".exe";
        if (exe.length >= 248) {
            exe = "\\\\?\\" + exe;
        }
    }

    if (!fs.existsSync(exe)) {
        throw new Error("Executable not found: " + exe);
    }

    return exe;
}
