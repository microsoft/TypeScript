import { Octokit } from "@octokit/rest";
import { runSequence } from "./run-sequence.mjs";

const userName = process.env.GH_USERNAME || "typescript-bot";
const reviewers = process.env.REQUESTING_USER ? [process.env.REQUESTING_USER] : ["weswigham", "sandersn", "RyanCavanaugh"];
const masterBranchname = `user-baseline-updates`;
const targetBranch = process.env.TARGET_BRANCH || "main";
const branchName = process.env.TARGET_FORK?.toLowerCase() === "microsoft" && (targetBranch === "main" || targetBranch === "refs/heads/main")
    ? masterBranchname
    : `user-update-${process.env.TARGET_FORK}-${process.env.TARGET_BRANCH ? "-" + process.env.TARGET_BRANCH : ""}`;
const remoteUrl = `https://${process.argv[2]}@github.com/${userName}/TypeScript.git`;
const baseRef = branchName === masterBranchname ? "main" : masterBranchname;
runSequence([
    ["git", ["remote", "add", "fork", remoteUrl]], // Add the remote fork
    ["git", ["checkout", "."]], // reset any changes
    ["git", ["fetch", baseRef === "main" ? "origin" : "fork", baseRef]], // fetch target ref in case it's not present locally
    ["git", ["checkout", baseRef]], // move head to target
    ["node", ["./node_modules/hereby/dist/cli.js", "baseline-accept"]], // accept baselines
    ["git", ["checkout", "-b", branchName]], // create a branch
    ["git", ["add", "."]], // Add all changes
    ["git", ["commit", "-m", `"Update user baselines${+(process.env.SOURCE_ISSUE ?? 0) === 33716 ? " +cc @sandersn" : ""}"`]], // Commit all changes (ping nathan if we would post to CI thread)
    ["git", ["push", "--set-upstream", "fork", branchName, "-f"]] // push the branch
]);

const gh = new Octokit({
    auth: process.argv[2]
});
const prOwner = branchName === masterBranchname ? "microsoft" : userName;
gh.pulls.create({
    owner: prOwner,
    repo: "TypeScript",
    maintainer_can_modify: true,
    title: `🤖 User test baselines have changed` + (process.env.TARGET_BRANCH ? ` for ${process.env.TARGET_BRANCH}` : ""),
    head: `${userName}:${branchName}`,
    base: branchName === masterBranchname ? "main" : masterBranchname,
    body:
`${process.env.SOURCE_ISSUE ? `This test run was triggerd by a request on https://github.com/Microsoft/TypeScript/pull/${process.env.SOURCE_ISSUE} `+"\n" : ""}Please review the diff and merge if no changes are unexpected.
You can view the build log [here](https://typescript.visualstudio.com/TypeScript/_build/index?buildId=${process.env.BUILD_BUILDID}&_a=summary).

cc ${reviewers.map(r => "@" + r).join(" ")}`,
}).then(async r => {
    const num = r.data.number;
    console.log(`Pull request ${num} created.`);
    if (!process.env.SOURCE_ISSUE) {
        await gh.pulls.requestReviewers({
            owner: prOwner,
            repo: "TypeScript",
            pull_number: num,
            reviewers,
        });
    }
    else {
        await gh.issues.createComment({
            issue_number: +process.env.SOURCE_ISSUE,
            owner: "microsoft",
            repo: "TypeScript",
            body: `The user suite test run you requested has finished and _failed_. I've opened a [PR with the baseline diff from master](${r.data.html_url}).`
        });
    }
}).then(() => {
    console.log(`Reviewers requested, done.`);
}).catch(e => {
    console.error(e);
    process.exit(1);
});
