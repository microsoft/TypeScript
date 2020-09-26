"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference lib="esnext.asynciterable" />
/// <reference lib="es2015.promise" />
const octokit = require("@octokit/rest");
var Octokit = octokit.Octokit;
const minimist = require("minimist");
const options = minimist(process.argv.slice(2), {
    boolean: ["help"],
    string: ["token", "pull", "reviewer", "owner", "repo"],
    alias: {
        pr: "pull",
        h: "help",
        ["?"]: "help"
    },
    default: {
        token: process.env.GH_TOKEN,
        pull: process.env.GH_PULL_NUMBER,
        reviewer: process.env.REQUESTED_REVIEWER,
        owner: "microsoft",
        repo: "TypeScript"
    }
});
if (options.help) {
    printHelpAndExit(0);
}
if (!options.token || !options.pull || !options.reviewer || !options.owner || !options.repo) {
    console.error("Invalid arguments");
    printHelpAndExit(-1);
}
const pull_number = +options.pull;
if (!isFinite(pull_number)) {
    console.error("Invalid arguments");
    printHelpAndExit(-2);
}
const reviewers = Array.isArray(options.reviewer) ? options.reviewer : [options.reviewer];
main().catch(console.error);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const gh = new Octokit({ auth: options.token });
        const response = yield gh.pulls.requestReviewers({
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
    });
}
function printHelpAndExit(exitCode) {
    console.log(`
usage: request-pr-review.js [options]

options:
    --token    <token>     Your GitHub auth token. Uses %GH_TOKEN% if present.
    --owner    <owner>     The GH user or organization for the repo (default: 'microsoft').
    --repo     <repo>      The GH repo for the pull request (default: 'TypeScript').
    --pull     <pr_number> The pull request number. Uses %GH_PULL_NUMBER% if present.
    --reviewer <reviewer>  The GH username of reviewer to add. May be specified multiple times.
                           Uses %REQUESTED_REVIEWER% if present.
 -h --help                 Prints this help message.
`);
    return process.exit(exitCode);
}
//# sourceMappingURL=request-pr-review.js.map