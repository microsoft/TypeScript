// @ts-check
/// <reference lib="esnext.asynciterable" />
// Must reference esnext.asynciterable lib, since octokit uses AsyncIterable internally
const Octokit = require("@octokit/rest");
const ado = require("azure-devops-node-api");
const { default: fetch } = require("node-fetch");

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
    const updatedUrl = new URL(artifact.resource.url);
    updatedUrl.search = `artifactName=tgz&fileId=${artifact.resource.data}&fileName=manifest`;
    const resp = await (await fetch(`${updatedUrl}`)).json();
    const file = resp.items[0];
    const tgzUrl = new URL(artifact.resource.url);
    tgzUrl.search = `artifactName=tgz&fileId=${file.blob.id}&fileName=${file.path}`;
    const link = "" + tgzUrl;
    const gh = new Octokit();
    gh.authenticate({
        type: "token",
        token: process.argv[2]
    });
    await gh.issues.createComment({
        number: +process.env.SOURCE_ISSUE,
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
            body: `Hey @${process.env.REQUESTING_USER}, something went wrong when looking for the build artifact. ([You can check the log here](https://typescript.visualstudio.com/TypeScript/_build/index?buildId=${process.env.BUILD_BUILDID}&_a=summary)).`
        });
    }
});