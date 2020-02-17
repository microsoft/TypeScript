/// <reference lib="esnext.asynciterable" />
/// <reference lib="es2015.promise" />
import octokit = require("@octokit/rest");
import Octokit = octokit.Octokit;
import minimist = require("minimist");

const options = minimist(process.argv.slice(2), {
    string: ["token", "pull", "reviewer", "owner", "repo"],
    alias: {
        "pr": "pull",
    },
    default: {
        token: process.env.GH_TOKEN,
        pull: process.env.GH_PULL_NUMBER,
        reviewer: process.env.REQUESTED_REVIEWER,
        owner: "microsoft",
        repo: "TypeScript"
    }
});

if (!options.token || !options.pull || !options.reviewer || !options.owner || !options.repo) {
    console.error("Invalid arguments");
    process.exit();
}

const pull_number = +options.pull;
if (!isFinite(pull_number)) {
    console.error("Invalid arguments");
    process.exit();
}

const reviewers = Array.isArray(options.reviewer) ? options.reviewer : [options.reviewer];

async function main() {
    const gh = new Octokit({ auth: options.token });
    const response = await gh.pulls.createReviewRequest({
        owner: options.owner,
        repo: options.repo,
        pull_number,
        reviewers,
    });
    if (response.status === 201) {
        console.log(`Added ${reviewers.join(", ")} to ${response.data.url}`);
    }
    else {
        console.log(`Failed to add ${reviewers.join(", ")} to the pull request.`);
    }
}

main().catch(console.error);