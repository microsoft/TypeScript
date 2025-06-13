import fs from "fs";
import path from "path";
import url from "url";

import { findUpRoot } from "./build/findUpDir.mjs";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const hooks = [
    "post-checkout",
    "pre-commit",
];

hooks.forEach(hook => {
    const hookInSourceControl = path.resolve(__dirname, "hooks", hook);

    if (fs.existsSync(hookInSourceControl)) {
        const hookInHiddenDirectory = path.resolve(findUpRoot(), ".git", "hooks", hook);

        if (fs.existsSync(hookInHiddenDirectory)) {
            fs.unlinkSync(hookInHiddenDirectory);
        }

        // Hard links are ideal to keep hooks in sync with the source-controlled
        // versions, but they are not always supported. In particular, they can
        // fail on Windows when the working copy resides on a FAT32 drive or
        // when the user lacks the required privileges, and they always fail
        // across device/volume boundaries (EXDEV). Gracefully fall back to a
        // normal file copy in those scenarios so that contributors on any
        // platform can still set up git hooks and contribute without friction.
        try {
            fs.linkSync(hookInSourceControl, hookInHiddenDirectory);
        }
        catch (err) {
            if (err && (err.code === "EXDEV" || err.code === "EPERM")) {
                fs.copyFileSync(hookInSourceControl, hookInHiddenDirectory);
            }
            else {
                throw err;
            }
        }
    }
});
