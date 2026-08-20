import { Octokit } from "@octokit/rest";
import assert from "assert";
import ado from "azure-devops-node-api";

/**
 * @param {string} name
 */
function mustGetEnv(name) {
    const value = process.env[name];
    assert(value, `No ${name} specified`);
    return value;
}

const REQUESTING_USER = mustGetEnv("REQUESTING_USER");
const SOURCE_ISSUE = +mustGetEnv("SOURCE_ISSUE");
const BUILD_BUILDID = +mustGetEnv("BUILD_BUILDID");
const DISTINCT_ID = mustGetEnv("DISTINCT_ID");
const STATUS_COMMENT = +mustGetEnv("STATUS_COMMENT");

const gh = new Octokit({
    auth: process.argv[2],
});

async function main() {
    // The pipelines API does _not_ make getting the direct URL to a specific file _within_ an artifact trivial
    const cli = new ado.WebApi("https://typescript.visualstudio.com/defaultcollection", ado.getHandlerFromToken("")); // Empty token, anon auth
    const build = await cli.getBuildApi();
    const artifact = await build.getArtifact("typescript", BUILD_BUILDID, "tgz");
    assert(artifact.resource?.url);
    const updatedUrl = new URL(artifact.resource.url);
    updatedUrl.search = `artifactName=tgz&fileId=${artifact.resource.data}&fileName=manifest`;
    const resp = await (await fetch(`${updatedUrl}`)).json();
    const file = /** @type {any} */ (resp).items[0];
    const tgzUrl = new URL(artifact.resource.url);
    tgzUrl.search = `artifactName=tgz&fileId=${file.blob.id}&fileName=${file.path}`;
    const link = "" + tgzUrl;

    // Please keep the strings "an installable tgz" and "packed" in this message, as well as the devDependencies section,
    // so that the playgrounds deployment process can find these comments.

    const comment = `Hey @${REQUESTING_USER}, I've packed this into [an installable tgz](${link}). You can install it for testing by referencing it in your \`package.json\` like so:
\`\`\`
{
    "devDependencies": {
        "typescript": "${link}"
    }
}
\`\`\`
and then running \`npm install\`.
`;

    // Temporarily disable until we get access controls set up right
    // Send a ping to https://github.com/microsoft/typescript-make-monaco-builds#pull-request-builds
    await gh.request("POST /repos/microsoft/typescript-make-monaco-builds/dispatches", { event_type: `${SOURCE_ISSUE}`, headers: { Accept: "application/vnd.github.everest-preview+json" } });

    return comment;
}

let newComment;
let emoji;

try {
    newComment = await main();
    emoji = "✅";
}
catch (e) {
    console.error(e);
    newComment = `Hey @${REQUESTING_USER}, something went wrong when looking for the build artifact. ([You can check the log here](https://typescript.visualstudio.com/TypeScript/_build/index?buildId=${BUILD_BUILDID}&_a=summary)).`;
    emoji = "❌";
}

const resultsComment = await gh.issues.createComment({
    issue_number: SOURCE_ISSUE,
    owner: "microsoft",
    repo: "TypeScript",
    body: newComment,
});

const toReplace = `<!--result-${DISTINCT_ID}-->`;
let posted = false;
for (let i = 0; i < 5; i++) {
    // Get status comment contents
    const statusComment = await gh.rest.issues.getComment({
        comment_id: STATUS_COMMENT,
        owner: "microsoft",
        repo: "TypeScript",
    });

    const oldComment = statusComment.data.body;
    if (!oldComment?.includes(toReplace)) {
        posted = true;
        break;
    }

    const newComment = oldComment.replace(toReplace, `[${emoji} Results](${resultsComment.data.html_url})`);

    // Update status comment
    await gh.rest.issues.updateComment({
        comment_id: STATUS_COMMENT,
        owner: "microsoft",
        repo: "TypeScript",
        body: newComment,
    });

    // Repeat; someone may have edited the comment at the same time.
    await new Promise(resolve => setTimeout(resolve, 1000));
}

if (!posted) {
    throw new Error("Failed to update status comment");
}
