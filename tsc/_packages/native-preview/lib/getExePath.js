import fs from "node:fs";
import module from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default function getExePath() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const normalizedDirname = __dirname.replace(/\\/g, "/");

    let exeDir;

    const expectedPackage = "native-preview-" + process.platform + "-" + process.arch;

    if (normalizedDirname.endsWith("/_packages/native-preview/lib")) {
        // We're running directly from source in the repo.
        exeDir = path.resolve(__dirname, "..", "..", "..", "built", "local");
    }
    else if (normalizedDirname.endsWith("/built/npm/native-preview/lib")) {
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

    let exe = path.join(exeDir, "tsgo");
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
