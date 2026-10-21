import {
    execFileSync,
    spawnSync,
} from "node:child_process";

const [previous] = process.argv.slice(2);
if (!previous || process.argv.length !== 3) {
    throw new Error("Usage: node tools/scripts/preserve-localization-base.mjs <previous-localization-commit>");
}

console.log(prepareUpdate());

function prepareUpdate() {
    const generated = git("rev-parse", "HEAD");
    const main = git("rev-parse", `${generated}^`);
    const previousHead = git("rev-parse", "--verify", `${previous}^{commit}`);
    const base = git("merge-base", main, previousHead);
    if (base === main) return generated;

    // Apply only the generated delta to the old base, without changing the checkout.
    const tree = mergeTree(`--merge-base=${main}`, base, generated);
    if (!tree) {
        console.error("Localization changes conflict with the existing PR base; using current main.");
        return generated;
    }

    const candidate = git("commit-tree", tree, "-p", base, "-m", "Update localization files");
    if (mergeTree(main, candidate) !== git("rev-parse", `${generated}^{tree}`)) {
        console.error("Preserving the PR base would conflict or change the generated merge result; using current main.");
        return generated;
    }

    return tree === git("rev-parse", `${previousHead}^{tree}`) ? previousHead : candidate;
}

function git(...args) {
    return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function mergeTree(...args) {
    const result = spawnSync("git", ["merge-tree", "--write-tree", ...args], { encoding: "utf8" });
    if (result.error) throw result.error;
    if (result.status === 1) return undefined;
    if (result.status !== 0) {
        throw new Error(`git merge-tree failed (${result.status}): ${result.stderr}`);
    }
    return result.stdout.trim().split(/\r?\n/, 1)[0];
}
