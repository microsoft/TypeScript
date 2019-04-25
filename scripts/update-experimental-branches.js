// @ts-check
/// <reference lib="esnext.asynciterable" />
const Octokit = require("@octokit/rest");
const {runSequence} = require("./run-sequence");

/**
 * This program should be invoked as `node ./scripts/update-experimental-branches <GithubAccessToken> <Branch1> [Branch2] [...]`
 */
async function main() {
    const branchesRaw = process.argv[3];
    const branches = process.argv.slice(3);
    if (!branches.length) {
        throw new Error(`No experimental branches, aborting...`);
    }
    console.log(`Performing experimental branch updating and merging for branches ${branchesRaw}`);

    const gh = new Octokit();
    gh.authenticate({
        type: "token",
        token: process.argv[2]
    });
    
    // Fetch all relevant refs
    runSequence([
        ["git", ["fetch", "origin", "master:master", ...branches.map(b => `${b}:${b}`)]]
    ])
    
    // Forcibly cleanup workspace
    runSequence([
        ["git", ["clean", "-fdx"]],
        ["git", ["checkout", "."]],
        ["git", ["checkout", "master"]],
    ]);
    
    // Update branches
    for (const branch of branches) {
        // Checkout, then get the merge base
        const mergeBase = runSequence([
            ["git", ["checkout", branch]],
            ["git", ["merge-base", branch, "master"]],
        ]);
        // Simulate the merge and abort if there are conflicts
        const mergeTree = runSequence([
            ["git", ["merge-tree", mergeBase, branch, "master"]]
        ]);
        if (mergeTree.indexOf(`===${"="}===`)) { // 7 equals is the center of the merge conflict marker
            const res = await gh.pulls.list({owner: "Microsoft", repo: "TypeScript", base: branch});
            if (res && res.data && res.data[0]) {
                const pr = res.data[0];
                await gh.issues.createComment({
                    owner: "Microsoft",
                    repo: "TypeScript",
                    number: pr.number,
                    body: `This PR is configured as an experiment, and currently has merge conflicts with master - please rebase onto master and fix the conflicts.`
                });
            }
            throw new Error(`Merge conflict detected on branch ${branch} with master`);
        }
        // Merge is good - apply a rebase and (force) push
        runSequence([
            ["git", ["rebase", "master"]],
            ["git", ["push", "-f", "-u", "origin", branch]],
        ]);
    }

    // Return to `master` and make a new `experimental` branch
    runSequence([
        ["git", ["checkout", "master"]],
        ["git", ["branch", "-D", "experimental"]],
        ["git", ["checkout", "-b", "experimental"]],
    ]);

    // Merge each branch into `experimental` (which, if there is a conflict, we now know is from inter-experiment conflict)
    for (const branch of branches) {
        // Find the merge base
        const mergeBase = runSequence([
            ["git", ["merge-base", branch, "experimental"]],
        ]);
        // Simulate the merge and abort if there are conflicts
        const mergeTree = runSequence([
            ["git", ["merge-tree", mergeBase, branch, "experimental"]]
        ]);
        if (mergeTree.indexOf(`===${"="}===`)) { // 7 equals is the center of the merge conflict marker
            throw new Error(`Merge conflict detected on branch ${branch} with other experiment`);
        }
        // Merge (always producing a merge commit)
        runSequence([
            ["git", ["merge", branch, "--no-ff"]],
        ]);
    }
    // Every branch merged OK, force push the replacement `experimental` branch
    runSequence([
        ["git", ["push", "-f", "-u", "origin", "experimental"]],
    ]);
}

main().catch(e => (console.error(e), process.exitCode = 2));
