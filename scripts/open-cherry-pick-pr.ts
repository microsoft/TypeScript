/// <reference lib="esnext.asynciterable" />
// Must reference esnext.asynciterable lib, since octokit uses AsyncIterable internally
/// <reference types="node" />

import { Octokit } from "@octokit/rest";
import { runSequence } from "./run-sequence";
import * as fs from "fs";
import * as path from "path";

const userName = process.env.GH_USERNAME;
const reviewers = process.env.REQUESTING_USER ? [process.env.REQUESTING_USER] : ["weswigham", "RyanCavanaugh"];
const branchName = `pick/${process.env.SOURCE_ISSUE}/${process.env.TARGET_BRANCH}`;
const remoteUrl = `https://${process.argv[2]}@github.com/${userName}/TypeScript.git`;
const produceLKG = !!process.env.PRODUCE_LKG;

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

    const gh = new Octokit({
        auth: process.argv[2]
    });

    const inputPR = (await gh.pulls.get({ pull_number: +process.env.SOURCE_ISSUE, owner: "microsoft", repo: "TypeScript" })).data;
    let remoteName = "origin";
    if (inputPR.base.repo.git_url !== `git:github.com/microsoft/TypeScript` && inputPR.base.repo.git_url !== `git://github.com/microsoft/TypeScript`) {
        runSequence([
            ["git", ["remote", "add", "nonlocal", inputPR.base.repo.git_url.replace(/^git:(?:\/\/)?/, "https://")]]
        ]);
        remoteName = "nonlocal";
    }
    const baseBranchName = inputPR.base.ref;
    runSequence([
        ["git", ["fetch", remoteName, baseBranchName]]
    ]);
    let logText = runSequence([
        ["git", ["log", `${remoteName}/${baseBranchName}..${currentSha.trim()}`, `--pretty="%h %s%n%b"`, "--reverse"]]
    ]);
    logText = `Cherry-pick PR #${process.env.SOURCE_ISSUE} into ${process.env.TARGET_BRANCH}

Component commits:
${logText.trim()}`;
    const logpath = path.join(__dirname, "../", "logmessage.txt");
    const mergebase = runSequence([["git", ["merge-base", `${remoteName}/${baseBranchName}`, currentSha]]]).trim();
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
        ["git", ["cherry-pick", squashSha.trim()]],
    ]);
    if (produceLKG) {
        runSequence([
            ["gulp", ["LKG"]],
            ["git", ["add", "lib"]],
            ["git", ["commit", "-m", `"Update LKG"`]]
        ]);
    }
    runSequence([
        ["git", ["remote", "add", "fork", remoteUrl]], // Add the remote fork
        ["git", ["push", "--set-upstream", "fork", branchName, "-f"]] // push the branch
    ]);

    const r = await gh.pulls.create({
        owner: "Microsoft",
        repo: "TypeScript",
        maintainer_can_modify: true,
        title: `🤖 Pick PR #${process.env.SOURCE_ISSUE} (${inputPR.title.substring(0, 35)}${inputPR.title.length > 35 ? "..." : ""}) into ${process.env.TARGET_BRANCH}`,
        head: `${userName}:${branchName}`,
        base: process.env.TARGET_BRANCH,
        body:
    `This cherry-pick was triggered by a request on https://github.com/Microsoft/TypeScript/pull/${process.env.SOURCE_ISSUE}
Please review the diff and merge if no changes are unexpected.${produceLKG ? ` An LKG update commit is included separately from the base change.` : ""}
You can view the cherry-pick log [here](https://typescript.visualstudio.com/TypeScript/_build/index?buildId=${process.env.BUILD_BUILDID}&_a=summary).

cc ${reviewers.map(r => "@" + r).join(" ")}`,
    });
    const num = r.data.number;
    console.log(`Pull request ${num} created.`);

    await gh.issues.createComment({
        issue_number: +process.env.SOURCE_ISSUE,
        owner: "Microsoft",
        repo: "TypeScript",
        body: `Hey @${process.env.REQUESTING_USER}, I've opened #${num} for you.`
    });
}

main().catch(async e => {
    console.error(e);
    process.exitCode = 1;
    if (process.env.SOURCE_ISSUE) {
        const gh = new Octokit({
            auth: process.argv[2]
        });
        await gh.issues.createComment({
            issue_number: +process.env.SOURCE_ISSUE,
            owner: "Microsoft",
            repo: "TypeScript",
            body: `Hey @${process.env.REQUESTING_USER}, I couldn't open a PR with the cherry-pick. ([You can check the log here](https://typescript.visualstudio.com/TypeScript/_build/index?buildId=${process.env.BUILD_BUILDID}&_a=summary)). You may need to squash and pick this PR into ${process.env.TARGET_BRANCH} manually.`
        });
    }
});
