// @ts-check
/// <reference lib="esnext.asynciterable" />
const { Octokit } = require("@octokit/rest");
const { runSequence } = require("./run-sequence");

// The first is used by bot-based kickoffs, the second by automatic triggers
const triggeredPR = process.env.SOURCE_ISSUE || process.env.SYSTEM_PULLREQUEST_PULLREQUESTNUMBER;

/**
 * This program should be invoked as `node ./scripts/update-experimental-branches <GithubAccessToken>`
 * TODO: the following is racey - if two experiment-enlisted PRs trigger simultaneously and witness one another in an unupdated state, they'll both produce
 * a new experimental branch, but each will be missing a change from the other. There's no _great_ way to fix this beyond setting the maximum concurrency
 * of this task to 1 (so only one job is allowed to update experiments at a time).
 */
async function main() {
    const gh = new Octokit({
        auth: process.argv[2]
    });
    const prnums = (await gh.issues.listForRepo({
        labels: "typescript@experimental",
        sort: "created",
        state: "open",
        owner: "Microsoft",
        repo: "TypeScript",
    })).data.filter(i => !!i.pull_request).map(i => i.number);
    if (triggeredPR && !prnums.some(n => n === +triggeredPR)) {
        return; // Only have work to do for enlisted PRs
    }
    console.log(`Performing experimental branch updating and merging for pull requests ${prnums.join(", ")}`);

    const userName = process.env.GH_USERNAME;
    const remoteUrl = `https://${process.argv[2]}@github.com/${userName}/TypeScript.git`;

    // Forcibly cleanup workspace
    runSequence([
        ["git", ["checkout", "."]],
        ["git", ["fetch", "-fu", "origin", "main:main"]],
        ["git", ["checkout", "main"]],
        ["git", ["remote", "add", "fork", remoteUrl]], // Add the remote fork
    ]);

    for (const numRaw of prnums) {
        const num = +numRaw;
        if (num) {
            // PR number rather than branch name - lookup info
            const inputPR = await gh.pulls.get({ owner: "Microsoft", repo: "TypeScript", pull_number: num });
            // GH calculates the rebaseable-ness of a PR into its target, so we can just use that here
            if (!inputPR.data.rebaseable) {
                if (+triggeredPR === num) {
                    await gh.issues.createComment({
                        owner: "Microsoft",
                        repo: "TypeScript",
                        issue_number: num,
                        body: `This PR is configured as an experiment, and currently has rebase conflicts with main - please rebase onto main and fix the conflicts.`
                    });
                }
                throw new Error(`Rebase conflict detected in PR ${num} with main`); // A PR is currently in conflict, give up
            }
            runSequence([
                ["git", ["fetch", "origin", `pull/${num}/head:${num}`]],
                ["git", ["checkout", `${num}`]],
                ["git", ["rebase", "main"]],
                ["git", ["push", "-f", "-u", "fork", `${num}`]], // Keep a rebased copy of this branch in our fork
            ]);

        }
        else {
            throw new Error(`Invalid PR number: ${numRaw}`);
        }
    }

    // Return to `master` and make a new `experimental` branch
    runSequence([
        ["git", ["checkout", "main"]],
        ["git", ["checkout", "-b", "experimental"]],
    ]);

    // Merge each branch into `experimental` (which, if there is a conflict, we now know is from inter-experiment conflict)
    for (const branchnum of prnums) {
        const branch = "" + branchnum;
        // Find the merge base
        const mergeBase = runSequence([
            ["git", ["merge-base", branch, "experimental"]],
        ]);
        // Simulate the merge and abort if there are conflicts
        const mergeTree = runSequence([
            ["git", ["merge-tree", mergeBase.trim(), branch, "experimental"]]
        ]);
        if (mergeTree.indexOf(`===${"="}===`) >= 0) { // 7 equals is the center of the merge conflict marker
            throw new Error(`Merge conflict detected involving PR ${branch} with other experiment`);
        }
        // Merge (always producing a merge commit)
        runSequence([
            ["git", ["merge", branch, "--no-ff"]],
        ]);
    }
    // Every branch merged OK, force push the replacement `experimental` branch
    runSequence([
        ["git", ["push", "-f", "-u", "fork", "experimental"]],
    ]);
}

main().catch(e => (console.error(e), process.exitCode = 2));
