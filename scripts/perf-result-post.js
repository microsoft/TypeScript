// @ts-check
/// <reference lib="esnext.asynciterable" />
// Must reference esnext.asynciterable lib, since octokit uses AsyncIterable internally
const Octokit = require("@octokit/rest");
const fs = require("fs");

const requester = process.env.requesting_user;
const source = process.env.source_issue;
const postedComment = process.env.status_comment;
console.log(`Loading fragment from ${process.argv[3]}...`);
const outputTableText = fs.readFileSync(process.argv[3], { encoding: "utf8" });
console.log(`Fragment contents:
${outputTableText}`);

const gh = new Octokit();
gh.authenticate({
    type: "token",
    token: process.argv[2]
});
gh.issues.createComment({
    number: +source,
    owner: "Microsoft",
    repo: "TypeScript",
    body: `@${requester}
The results of the perf run you requested are in!
<details><summary> Here they are:</summary><p>
${outputTableText}
</p></details>`
}).then(async data => {
    console.log(`Results posted!`);
    const newCommentUrl = data.data.html_url;
    const comment = await gh.issues.getComment({
        owner: "Microsoft",
        repo: "TypeScript",
        comment_id: +postedComment
    });
    const newBody = `${comment.data.body}

Update: [The results are in!](${newCommentUrl})`;
    return await gh.issues.updateComment({
        owner: "Microsoft",
        repo: "TypeScript",
        comment_id: +postedComment,
        body: newBody
    });
}).catch(e => {
    console.error(e);
    process.exit(1);
});
