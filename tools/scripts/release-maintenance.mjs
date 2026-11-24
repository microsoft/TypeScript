import { execFileSync } from "node:child_process";

const owner = "microsoft";
const repo = "TypeScript";
const botEmail = "290192711+typescript-automation[bot]@users.noreply.github.com";
const botName = "typescript-automation[bot]";

const [command] = process.argv.slice(2);
switch (command) {
    case "cherry-pick":
        await cherryPick();
        break;
    case "post-result":
        await postResult();
        break;
    default:
        throw new Error("Usage: node release-maintenance.mjs <cherry-pick|post-result>");
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

    run("git", "config", "user.email", botEmail);
    run("git", "config", "user.name", botName);
    run("git", "switch", "-c", pickBranch);

    let updatedBaselinesMessage = "";
    try {
        run("git", "cherry-pick", "-m", "1", pull.merge_commit_sha);
    }
    catch (e) {
        console.log(e);

        // The cherry-pick failed. If all conflicts are compiler baselines,
        // try to run the tests and accept the new baselines.

        const conflictedFiles = output("git", "diff", "--name-only", "--diff-filter=U").split("\n").filter(Boolean);
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
        try {
            run("git", "diff", "--cached", "--quiet");
        }
        catch {
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
    const operation = mustGetEnv("OPERATION");
    const branchName = process.env.BRANCH_NAME;
    const packageVersion = process.env.PACKAGE_VERSION;
    const distinctId = mustGetEnv("DISTINCT_ID");
    const sourceIssue = +mustGetEnv("SOURCE_ISSUE");
    const requestingUser = mustGetEnv("REQUESTING_USER");
    const statusComment = +mustGetEnv("STATUS_COMMENT");
    const jobStatus = mustGetEnv("AGENT_JOBSTATUS");

    const success = jobStatus === "Succeeded" || jobStatus === "SucceededWithIssues";

    /** @type {Record<string, [success: string | undefined, failure: string]>} */
    const comments = {
        "cherry-pick": [process.env.CHERRY_PICK_RESULT, "I was unable to cherry-pick this PR."],
        "new-release-branch": [`I've created ${branchName} with version ${packageVersion} for you.`, "I was unable to create the new release branch."],
        "set-version": [`I've set the version of ${branchName} to ${packageVersion} for you.`, "I was unable to set the version."],
        "sync-branch": [`I've pulled main into ${branchName} for you.`, `I was unable to merge main into ${branchName}.`],
    };
    const [successComment, failureComment] = comments[operation];

    let commentBody = `Hey, @${requestingUser}! `;
    commentBody += success ? successComment : failureComment;
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
