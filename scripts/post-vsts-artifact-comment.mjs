import { Octokit } from "@octokit/rest";
import assert from "assert";
import ado from "azure-devops-node-api";
import fetch from "node-fetch";

async function main() {
    if (!process.env.SOURCE_ISSUE) {
        throw new Error("No source issue specified");
    }
    if (!process.env.BUILD_BUILDID) {
        throw new Error("No build ID specified");
    }
    // The pipelines API does _not_ make getting the direct URL to a specific file _within_ an artifact trivial
    const cli = new ado.WebApi("https://typescript.visualstudio.com/defaultcollection", ado.getHandlerFromToken("")); // Empty token, anon auth
    const build = await cli.getBuildApi();
    const artifact = await build.getArtifact("typescript", +process.env.BUILD_BUILDID, "tgz");
    assert(artifact.resource?.url);
    const updatedUrl = new URL(artifact.resource.url);
    updatedUrl.search = `artifactName=tgz&fileId=${artifact.resource.data}&fileName=manifest`;
    const resp = await (await fetch(`${updatedUrl}`)).json();
    const file = /** @type {any} */ (resp).items[0];
    const tgzUrl = new URL(artifact.resource.url);
    tgzUrl.search = `artifactName=tgz&fileId=${file.blob.id}&fileName=${file.path}`;
    const link = "" + tgzUrl;
    const gh = new Octokit({
        auth: process.argv[2]
    });

    // Please keep the strings "an installable tgz" and "packed" in this message, as well as the devDependencies section,
    // so that the playgrounds deployment process can find these comments.

    await gh.issues.createComment({
        issue_number: +process.env.SOURCE_ISSUE,
        owner: "Microsoft",
        repo: "TypeScript",
        body: `Hey @${process.env.REQUESTING_USER}, I've packed this into [an installable tgz](${link}). You can install it for testing by referencing it in your \`package.json\` like so:
\`\`\`
{
    "devDependencies": {
        "typescript": "${link}"
    }
}
\`\`\`
and then running \`npm install\`.
`
    });

    // Temporarily disable until we get access controls set up right
    // Send a ping to https://github.com/microsoft/typescript-make-monaco-builds#pull-request-builds
    await gh.request("POST /repos/microsoft/typescript-make-monaco-builds/dispatches", { event_type: process.env.SOURCE_ISSUE, headers: { Accept: "application/vnd.github.everest-preview+json" } });
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
            body: `Hey @${process.env.REQUESTING_USER}, something went wrong when looking for the build artifact. ([You can check the log here](https://typescript.visualstudio.com/TypeScript/_build/index?buildId=${process.env.BUILD_BUILDID}&_a=summary)).`
        });
    }
});
