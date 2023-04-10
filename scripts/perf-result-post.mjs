import { Octokit } from "@octokit/rest";
import fs from "fs";
import ado from "azure-devops-node-api";
import fetch from "node-fetch";
import assert from "assert";


async function main() {
    const source = process.env.SOURCE_ISSUE;
    if (!source) throw new Error("SOURCE_ISSUE environment variable not set.");

    const requester = process.env.REQUESTING_USER;
    if (!requester) throw new Error("REQUESTING_USER environment variable not set.");

    const buildId = process.env.BUILD_BUILDID;
    if (!buildId) throw new Error("BUILD_BUILDID environment variable not set.");

    const postedComment = process.env.STATUS_COMMENT;
    if (!postedComment) throw new Error("STATUS_COMMENT environment variable not set.");

    const [auth, fragment, includeArtifact] = process.argv.slice(2);
    if (!auth) throw new Error("First argument must be a GitHub auth token.");
    if (!fragment) throw new Error("Second argument must be a path to an HTML fragment.");

    const gh = new Octokit({ auth });
    try {
        console.log(`Loading fragment from ${fragment}...`);
        const outputTableText = fs.readFileSync(fragment, { encoding: "utf8" });
        console.log(`Fragment contents:\n${outputTableText}`);

        let benchmarkText = "";
        if (includeArtifact === "--include-artifact") {
            // post a link to the benchmark file
            const cli = new ado.WebApi("https://typescript.visualstudio.com/defaultcollection", ado.getHandlerFromToken("")); // Empty token, anon auth
            const build = await cli.getBuildApi();
            const artifact = await build.getArtifact("typescript", +buildId, "benchmark");
            assert(artifact.resource?.url);
            const updatedUrl = new URL(artifact.resource.url);
            updatedUrl.search = `artifactName=benchmark&fileId=${artifact.resource.data}&fileName=manifest`;
            const resp = await (await fetch(`${updatedUrl}`)).json();
            for (const file of /** @type {any} */ (resp).items) {
                if (/[\\/]linux\.benchmark$/.test(file.path)) {
                    const benchmarkUrl = new URL(artifact.resource.url);
                    benchmarkUrl.search = `artifactName=benchmark&fileId=${file.blob.id}&fileName=linux.benchmark`;
                    benchmarkText = `\n<details><summary>Developer Information:</summary><p><a href="${benchmarkUrl.href}">Download Benchmark</a></p></details>\n`;
                    break;
                }
            }
        }

        const data = await gh.issues.createComment({
            issue_number: +source,
            owner: "Microsoft",
            repo: "TypeScript",
            body: `@${requester}\nThe results of the perf run you requested are in!\n<details><summary> Here they are:</summary><p>\n${outputTableText}\n</p>${benchmarkText}</details>`
        });

        console.log(`Results posted!`);
        const newCommentUrl = data.data.html_url;
        const comment = await gh.issues.getComment({
            owner: "Microsoft",
            repo: "TypeScript",
            comment_id: +postedComment
        });
        const newBody = `${comment.data.body}\n\nUpdate: [The results are in!](${newCommentUrl})`;
        await gh.issues.updateComment({
            owner: "Microsoft",
            repo: "TypeScript",
            comment_id: +postedComment,
            body: newBody
        });
    }
    catch (e) {
        const gh = new Octokit({ auth });
        await gh.issues.createComment({
            issue_number: +source,
            owner: "Microsoft",
            repo: "TypeScript",
            body: `Hey @${requester}, something went wrong when publishing results. ([You can check the log here](https://typescript.visualstudio.com/TypeScript/_build/index?buildId=${buildId}&_a=summary)).`
        });
    }
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
