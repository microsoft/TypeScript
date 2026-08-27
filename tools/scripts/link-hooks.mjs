import fs from "fs";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const hooks = [
    "post-checkout",
    "pre-commit",
];

hooks.forEach(hook => {
    const hookInSourceControl = path.resolve(__dirname, "..", "hooks", hook);

    if (fs.existsSync(hookInSourceControl)) {
        const hookInHiddenDirectory = path.resolve(__dirname, "..", "..", ".git", "hooks", hook);

        if (fs.existsSync(hookInHiddenDirectory)) {
            fs.unlinkSync(hookInHiddenDirectory);
        }

        fs.linkSync(hookInSourceControl, hookInHiddenDirectory);
    }
});
