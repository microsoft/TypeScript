import cp = require("child_process");
import Octokit = require("@octokit/rest");

const opts = { timeout: 100_000, shell: true, stdio: "inherit" }
function runSequence(tasks: [string, string[]][]) {
    for (const task of tasks) {
        console.log(`${task[0]} ${task[1].join(" ")}`);
        const result = cp.spawnSync(task[0], task[1], opts);
        if (result.status !== 0) throw new Error(`${task[0]} ${task[1].join(" ")} failed: ${result.stderr && result.stderr.toString()}`);
    }
}

function padNum(number: number) {
    const str = "" + number;
    return str.length >= 2 ? str : "0" + str;
}

const userName = process.env.GH_USERNAME;
const reviewers = ["weswigham", "sandersn", "mhegazy"]
const now = new Date();
const branchName = `user-update-${now.getFullYear()}${padNum(now.getMonth())}${padNum(now.getDay())}`;
const remoteUrl = `https://${process.argv[2]}@github.com/${userName}/TypeScript.git`;
runSequence([
    ["git", ["checkout", "."]], // reset any changes
    ["node", ["./node_modules/jake/bin/cli.js", "baseline-accept"]], // accept baselines
    ["git", ["checkout", "-b", branchName]], // create a branch
    ["git", ["add", "."]], // Add all changes
    ["git", ["commit", "-m", `"Update user baselines"`]], // Commit all changes
    ["git", ["remote", "add", "fork", remoteUrl]], // Add the remote fork
    ["git", ["push", "--set-upstream", "fork", branchName]] // push the branch
]);

const gh = new Octokit();
gh.authenticate({
    type: "token",
    token: process.argv[2]
});
gh.pullRequests.create({
    owner: process.env.TARGET_FORK,
    repo: "TypeScript",
    maintainer_can_modify: true,
    title: `🤖 User test baselines have changed`,
    head: `${userName}:${branchName}`,
    base: "master",
    body:
`Please review the diff and merge if no changes are unexpected.

cc ${reviewers.map(r => "@" + r).join(" ")}`,
}).then(r => {
    const num = r.data.number;
    console.log(`Pull request ${num} created.`);
    return gh.pullRequests.createReviewRequest({
        owner: process.env.TARGET_FORK,
        repo: "TypeScript",
        number: num,
        reviewers,
    });
}).then(() => {
    console.log(`Reviewers requested, done.`);
}).catch(e => {
    console.error(e);
    process.exit(1);
});
