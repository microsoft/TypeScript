/// <reference lib="esnext.asynciterable" />
// Must reference esnext.asynciterable lib, since octokit uses AsyncIterable internally
/// <reference types="node" />

import Octokit = require("@octokit/rest");
const {runSequence} = require("./run-sequence");
import fs = require("fs");
import path = require("path");

const userName = process.env.GH_USERNAME;
const reviewers = process.env.REQUESTING_USER ? [process.env.REQUESTING_USER] : ["weswigham", "RyanCavanaugh"];
const branchName = `pick/${process.env.SOURCE_ISSUE}/${process.env.TARGET_BRANCH}`;
const remoteUrl = `https://${process.argv[2]}@github.com/${userName}/TypeScript.git`;

async function main() {
    if (!process.env.TARGET_BRANCH) {
        throw new Error("Target branch not specified");
    }
    if (!process.env.SOURCE_ISSUE) {
        throw new Error("Source issue not specified");
    }
    const currentSha = runSequence([
        ["git", ["rev-parse", "HEAD"]]
    ]);
    const currentAuthor = runSequence([
        ["git", ["log", "-1", `--pretty="%aN <%aE>"`]]
    ]);
    runSequence([
        ["git", ["fetch", "origin", "master"]]
    ]);
    let logText = runSequence([
        ["git", ["log", `origin/master..${currentSha.trim()}`, `--pretty="%h %s%n%b"`, "--reverse"]]
    ]);
    logText = `Cherry-pick PR #${process.env.SOURCE_ISSUE} into ${process.env.TARGET_BRANCH}

Component commits:
${logText.trim()}`
    const logpath = path.join(__dirname, "../", "logmessage.txt");
    const mergebase = runSequence([["git", ["merge-base", "origin/master", currentSha]]]).trim();
    runSequence([
        ["git", ["checkout", "-b", "temp-branch"]],
        ["git", ["reset", mergebase, "--soft"]]
    ]);
    fs.writeFileSync(logpath, logText);
    runSequence([
        ["git", ["commit", "-F", logpath, `--author="${currentAuthor.trim()}"`]]
    ]);
    fs.unlinkSync(logpath);
    const squashSha = runSequence([
        ["git", ["rev-parse", "HEAD"]]
    ]);
    runSequence([
        ["git", ["checkout", process.env.TARGET_BRANCH]], // checkout the target branch
        ["git", ["checkout", "-b", branchName]], // create a new branch
        ["git", ["cherry-pick", squashSha.trim()]], // 
        ["git", ["remote", "add", "fork", remoteUrl]], // Add the remote fork
        ["git", ["push", "--set-upstream", "fork", branchName, "-f"]] // push the branch
    ]);

    const gh = new Octokit();
    gh.authenticate({
        type: "token",
        token: process.argv[2]
    });
    const r = await gh.pulls.create({
        owner: "Microsoft",
        repo: "TypeScript",
        maintainer_can_modify: true,
        title: `🤖 Cherry-pick PR #${process.env.SOURCE_ISSUE} into ${process.env.TARGET_BRANCH}`,
        head: `${userName}:${branchName}`,
        base: process.env.TARGET_BRANCH,
        body:
    `This cherry-pick was triggerd by a request on https://github.com/Microsoft/TypeScript/pull/${process.env.SOURCE_ISSUE}
Please review the diff and merge if no changes are unexpected.
You can view the cherry-pick log [here](https://typescript.visualstudio.com/TypeScript/_build/index?buildId=${process.env.BUILD_BUILDID}&_a=summary).

cc ${reviewers.map(r => "@" + r).join(" ")}`,
    });
    const num = r.data.number;
    console.log(`Pull request ${num} created.`);

    await gh.issues.createComment({
        number: +process.env.SOURCE_ISSUE,
        owner: "Microsoft",
        repo: "TypeScript",
        body: `Hey @${process.env.REQUESTING_USER}, I've opened #${num} for you.`
    });
}

main().catch(async e => {
    console.error(e);
    process.exitCode = 1;
    if (process.env.SOURCE_ISSUE) {
        const gh = new Octokit();
        gh.authenticate({
            type: "token",
            token: process.argv[2]
        });
        await gh.issues.createComment({
            number: +process.env.SOURCE_ISSUE,
            owner: "Microsoft",
            repo: "TypeScript",
            body: `Hey @${process.env.REQUESTING_USER}, I couldn't open a PR with the cherry-pick. ([You can check the log here](https://typescript.visualstudio.com/TypeScript/_build/index?buildId=${process.env.BUILD_BUILDID}&_a=summary)). You may need to squash and pick this PR into ${process.env.TARGET_BRANCH} manually.`
        });
    }
});