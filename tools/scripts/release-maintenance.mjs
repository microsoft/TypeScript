import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const owner = "microsoft";
const repo = "TypeScript";
const botEmail = "290192711+typescript-automation[bot]@users.noreply.github.com";
const botName = "typescript-automation[bot]";
const releaseConfigFiles = ["Herebyfile.mjs", "tsc/internal/core/version.go"];

/**
 * @typedef {object} Operation
 * @property {() => void} validate
 * @property {() => boolean} prepare Returns whether the release configuration changed.
 * @property {() => void} commit
 * @property {() => Promise<void>} publish
 * @property {() => string | undefined} successMessage
 * @property {() => string} failureMessage
 */

/** @type {Record<string, Operation>} */
const operations = {
    "cherry-pick": {
        validate() {
            if (!/^[1-9][0-9]*$/.test(process.env.PR ?? "")) {
                throw new Error("pr must be a PR number.");
            }
            mustGetEnv("TARGET_BRANCH");
        },
        prepare() {
            run("git", "switch", "--detach", `origin/${mustGetEnv("TARGET_BRANCH")}`);
            return false;
        },
        commit() {},
        publish: cherryPick,
        successMessage: () => process.env.CHERRYPICKRESULT,
        failureMessage: () => "I was unable to cherry-pick this PR.",
    },
    "new-release-branch": {
        validate: () => validateReleaseInputs({ requireVersion: true }),
        prepare() {
            const branchName = mustGetEnv("BRANCH_NAME");
            if (tryRun("git", "show-ref", "--verify", "--quiet", `refs/remotes/origin/${branchName}`)) {
                throw new Error(`Branch ${branchName} already exists.`);
            }
            run("git", "switch", "-c", branchName);
            configureRelease(mustGetEnv("PACKAGE_VERSION"), mustGetEnv("CORE_MAJOR_MINOR"));
            checkChangedFiles("Unexpected files in release configuration", { exact: true });
            return true;
        },
        commit: () => commitVersionBump({ exact: true }),
        publish: pushReleaseBranch,
        successMessage: () => `I've created ${process.env.BRANCH_NAME} with version ${process.env.PACKAGE_VERSION} for you.`,
        failureMessage: () => "I was unable to create the new release branch.",
    },
    "set-version": {
        validate: () => validateReleaseInputs({ requireVersion: true }),
        prepare() {
            switchToReleaseBranch();
            const packageVersion = mustGetEnv("PACKAGE_VERSION");
            configureRelease(packageVersion, mustGetEnv("CORE_MAJOR_MINOR"));
            if (changedFiles().length === 0) {
                console.log(`Version is already ${packageVersion}.`);
                return false;
            }
            checkChangedFiles("Unexpected files in release configuration", { exact: false });
            return true;
        },
        commit: () => commitVersionBump({ exact: false }),
        publish: pushReleaseBranch,
        successMessage: () => `I've set the version of ${process.env.BRANCH_NAME} to ${process.env.PACKAGE_VERSION} for you.`,
        failureMessage: () => "I was unable to set the version.",
    },
    "sync-branch": {
        validate: () => validateReleaseInputs({ requireVersion: false }),
        prepare: mergeMain,
        commit() {
            if (changedFiles().length || hasStagedChanges()) {
                run("git", "status", "--short");
                throw new Error("Validation modified the worktree; refusing to push the merge.");
            }
        },
        publish: pushReleaseBranch,
        successMessage: () => `I've pulled main into ${process.env.BRANCH_NAME} for you.`,
        failureMessage: () => `I was unable to merge main into ${process.env.BRANCH_NAME}.`,
    },
};

const operation = getOperation();

const [command] = process.argv.slice(2);
switch (command) {
    case "prepare":
        prepare();
        break;
    case "commit":
        operation.commit();
        break;
    case "publish":
        await publish();
        break;
    case "post-result":
        await postResult();
        break;
    default:
        throw new Error("Usage: node release-maintenance.mjs <prepare|commit|publish|post-result>");
}

function getOperation() {
    const name = mustGetEnv("OPERATION");
    if (!Object.hasOwn(operations, name)) {
        throw new Error(`Unknown operation: ${name}`);
    }
    return operations[name];
}

function prepare() {
    operation.validate();

    run("git", "fetch", "--no-tags", "origin", "+refs/heads/*:refs/remotes/origin/*");
    run("git", "config", "user.email", botEmail);
    run("git", "config", "user.name", botName);
    run("git", "config", "core.hooksPath", "/dev/null");

    const changed = operation.prepare();
    console.log(`##vso[task.setvariable variable=ReleaseConfigChanged]${changed}`);
}

async function publish() {
    const basicAuth = Buffer.from(`x-access-token:${mustGetEnv("GH_TOKEN")}`).toString("base64");
    console.log(`##vso[task.setsecret]${basicAuth}`);
    run("git", "remote", "set-url", "origin", `https://github.com/${owner}/${repo}.git`);
    run("git", "config", "--local", "http.https://github.com/.extraheader", `AUTHORIZATION: basic ${basicAuth}`);

    await operation.publish();
}

/**
 * @param {{ requireVersion: boolean }} options
 */
function validateReleaseInputs({ requireVersion }) {
    if (!/^(release-.+|ts[0-9]+-release)$/.test(process.env.BRANCH_NAME ?? "")) {
        throw new Error("Release branch name must start with 'release-' or match 'ts<number>-release'.");
    }
    if (requireVersion) {
        mustGetEnv("PACKAGE_VERSION");
        mustGetEnv("CORE_MAJOR_MINOR");
    }
}

function switchToReleaseBranch() {
    const branchName = mustGetEnv("BRANCH_NAME");
    run("git", "switch", "-C", branchName, `origin/${branchName}`);
}

function mergeMain() {
    switchToReleaseBranch();

    const versionSource = fs.readFileSync("tsc/internal/core/version.go", "utf8");
    const releaseVersion = /var version = "([^"]+)"/.exec(versionSource)?.[1];
    if (!releaseVersion) {
        throw new Error("Unable to read the release version");
    }

    if (!tryRun("git", "merge", "origin/main", "--no-ff", "--no-commit")) {
        const conflictedFiles = lines(output("git", "diff", "--name-only", "--diff-filter=U"));
        if (conflictedFiles.length === 0) {
            throw new Error("Merge failed without reporting conflicted files.");
        }
        const unexpected = conflictedFiles.filter(file => !releaseConfigFiles.includes(file));
        if (unexpected.length) {
            throw new Error(`Merge conflict requires manual resolution:\n${unexpected.join("\n")}`);
        }
        run("git", "checkout", "--theirs", "--", ...conflictedFiles);
    }

    configureRelease(releaseVersion);
    run("git", "add", ...releaseConfigFiles);
    if (tryRun("git", "rev-parse", "--verify", "--quiet", "MERGE_HEAD")) {
        run("git", "commit", "--no-edit");
    }
    else if (hasStagedChanges()) {
        run("git", "commit", "-m", "Restore release configuration after syncing main");
    }
    return true;
}

/**
 * @param {{ exact: boolean }} options
 */
function commitVersionBump({ exact }) {
    checkChangedFiles("Validation produced unexpected changes", { exact });
    run("git", "add", ...releaseConfigFiles);
    run("git", "commit", "-m", `Bump version to ${mustGetEnv("PACKAGE_VERSION")}`);
}

async function pushReleaseBranch() {
    if (process.env.RELEASECONFIGCHANGED !== "true") {
        console.log("Release configuration unchanged; nothing to push.");
        return;
    }
    run("git", "push", "origin", `HEAD:refs/heads/${mustGetEnv("BRANCH_NAME")}`);
}

/**
 * @param {string} version
 * @param {string} [expectedMajorMinor]
 */
function configureRelease(version, expectedMajorMinor) {
    const script = path.join(mustGetEnv("AGENT_TEMPDIRECTORY"), "configure-release.mjs");
    run("node", script, version, ...(expectedMajorMinor ? [expectedMajorMinor] : []));
}

function changedFiles() {
    return lines(output("git", "diff", "--name-only"));
}

function hasStagedChanges() {
    return !tryRun("git", "diff", "--cached", "--quiet");
}

/**
 * @param {string} message
 * @param {{ exact: boolean }} options
 */
function checkChangedFiles(message, { exact }) {
    const changed = changedFiles();
    const ok = exact
        ? changed.length === releaseConfigFiles.length && releaseConfigFiles.every(file => changed.includes(file))
        : changed.every(file => releaseConfigFiles.includes(file));
    if (!ok) {
        throw new Error(`${message}: ${changed.join(" ")}`);
    }
}

async function cherryPick() {
    const pr = mustGetEnv("PR");
    const targetBranch = mustGetEnv("TARGET_BRANCH");
    const requestingUser = process.env.REQUESTING_USER;

    const pull = await github("GET", `/repos/${owner}/${repo}/pulls/${+pr}`);
    if (!pull.merged || !pull.merge_commit_sha) {
        throw new Error(`PR #${pr} has not been merged`);
    }

    const pickBranch = `cherry-pick/${pr}/${targetBranch}`;
    const title = `🤖 Pick PR #${pr} (${pull.title.substring(0, 35)}${pull.title.length > 35 ? "..." : ""}) into ${targetBranch}`;

    run("git", "switch", "-c", pickBranch);

    let updatedBaselinesMessage = "";
    try {
        run("git", "cherry-pick", "-m", "1", pull.merge_commit_sha);
    }
    catch (e) {
        console.log(e);

        // The cherry-pick failed. If all conflicts are compiler baselines,
        // try to run the tests and accept the new baselines.

        const conflictedFiles = lines(output("git", "diff", "--name-only", "--diff-filter=U"));
        const baselineDirs = ["tsc/testdata/baselines", "tests/baselines"];
        if (!conflictedFiles.length || conflictedFiles.some(file => !baselineDirs.some(dir => file.startsWith(`${dir}/`)))) {
            throw new Error(`Cherry-pick has non-baseline conflicts:\n${conflictedFiles.join("\n")}`);
        }

        run("git", "add", "--all", "--", ...conflictedFiles);
        run("git", "-c", "core.editor=true", "cherry-pick", "--continue");

        try {
            run("npx", "hereby", "test");
        }
        catch {
            // Expected to fail.
        }

        run("npx", "hereby", "baseline-accept");
        run("npx", "hereby", "test");
        const existingBaselineDirs = baselineDirs.filter(dir => conflictedFiles.some(file => file.startsWith(`${dir}/`)));
        run("git", "add", "--all", "--", ...existingBaselineDirs);
        if (hasStagedChanges()) {
            run("git", "commit", "-m", "Update baselines");
        }

        updatedBaselinesMessage = " This involved updating baselines; please check the diff.";
    }

    run("git", "push", "--force-with-lease", "--set-upstream", "origin", pickBranch);

    const existingPulls = await github("GET", `/repos/${owner}/${repo}/pulls?head=${encodeURIComponent(`${owner}:${pickBranch}`)}`);

    let commentBody;
    if (existingPulls.length === 0) {
        console.log(`No existing PRs found for ${pickBranch}`);

        const body = `This cherry-pick was triggered by a request on #${pr}.\n\nPlease review the diff and merge if no changes are unexpected.${updatedBaselinesMessage}`;
        const newPr = await github("POST", `/repos/${owner}/${repo}/pulls`, {
            base: targetBranch,
            head: pickBranch,
            title,
            body,
        });

        await github("POST", `/repos/${owner}/${repo}/issues/${newPr.number}/assignees`, {
            assignees: ["DanielRosenwasser"],
        });

        const reviewers = ["DanielRosenwasser", requestingUser].filter(Boolean);
        await github("POST", `/repos/${owner}/${repo}/pulls/${newPr.number}/requested_reviewers`, { reviewers });

        commentBody = `I've created #${newPr.number} for you.${updatedBaselinesMessage}`;
    }
    else {
        const existing = existingPulls[0];
        console.log(`Found existing PR #${existing.number} for ${pickBranch}`);

        await github("PATCH", `/repos/${owner}/${repo}/pulls/${existing.number}`, { title });

        commentBody = `I've updated #${existing.number} for you.${updatedBaselinesMessage}`;
    }

    console.log(`##vso[task.setvariable variable=CherryPickResult]${commentBody}`);
}

async function postResult() {
    const distinctId = mustGetEnv("DISTINCT_ID");
    const sourceIssue = +mustGetEnv("SOURCE_ISSUE");
    const requestingUser = mustGetEnv("REQUESTING_USER");
    const statusComment = +mustGetEnv("STATUS_COMMENT");
    const jobStatus = mustGetEnv("AGENT_JOBSTATUS");

    const success = jobStatus === "Succeeded" || jobStatus === "SucceededWithIssues";

    let commentBody = `Hey, @${requestingUser}! `;
    commentBody += success ? operation.successMessage() : operation.failureMessage();
    if (!success) {
        const logsUrl = `${mustGetEnv("SYSTEM_COLLECTIONURI")}${mustGetEnv("SYSTEM_TEAMPROJECT")}/_build/results?buildId=${mustGetEnv("BUILD_BUILDID")}`;
        commentBody += `\n\nCheck the logs at: ${logsUrl}`;
    }

    const resultsComment = await github("POST", `/repos/${owner}/${repo}/issues/${sourceIssue}/comments`, { body: commentBody });

    const emoji = success ? "✅" : "❌";
    const toReplace = `<!--result-${distinctId}-->`;
    let posted = false;
    for (let i = 0; i < 5; i++) {
        const oldComment = (await github("GET", `/repos/${owner}/${repo}/issues/comments/${statusComment}`)).body;
        if (!oldComment?.includes(toReplace)) {
            posted = true;
            break;
        }

        const newComment = oldComment.replace(toReplace, `[${emoji} Results](${resultsComment.html_url})`);
        await github("PATCH", `/repos/${owner}/${repo}/issues/comments/${statusComment}`, { body: newComment });

        // Repeat; someone may have edited the comment at the same time.
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (!posted) {
        throw new Error("Failed to update status comment");
    }
}

/**
 * @param {string} method
 * @param {string} path
 * @param {unknown} [body]
 * @returns {Promise<any>}
 */
async function github(method, path, body) {
    const token = mustGetEnv("GH_TOKEN");
    for (let attempt = 0;; attempt++) {
        let response;
        try {
            response = await fetch(`https://api.github.com${path}`, {
                method,
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `Bearer ${token}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                    ...(body === undefined ? {} : { "Content-Type": "application/json" }),
                },
                body: body === undefined ? undefined : JSON.stringify(body),
            });
        }
        catch (e) {
            if (attempt < 3) {
                await new Promise(resolve => setTimeout(resolve, 2 ** attempt * 1000));
                continue;
            }
            throw e;
        }
        if (response.status >= 500 && attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, 2 ** attempt * 1000));
            continue;
        }
        if (!response.ok) {
            throw new Error(`${method} ${path} failed: ${response.status} ${response.statusText}: ${await response.text()}`);
        }
        return response.status === 204 ? undefined : response.json();
    }
}

/**
 * @param {string} name
 */
function mustGetEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} must be set`);
    }
    return value;
}

/**
 * @param {string} file
 * @param {string[]} args
 */
function run(file, ...args) {
    execFileSync(file, args, { stdio: "inherit" });
}

/**
 * @param {string} file
 * @param {string[]} args
 */
function output(file, ...args) {
    return execFileSync(file, args, { encoding: "utf8" }).trim();
}

/**
 * @param {string} file
 * @param {string[]} args
 */
function tryRun(file, ...args) {
    try {
        execFileSync(file, args, { stdio: "inherit" });
        return true;
    }
    catch {
        return false;
    }
}

/**
 * @param {string} text
 */
function lines(text) {
    return text.split("\n").filter(Boolean);
}
