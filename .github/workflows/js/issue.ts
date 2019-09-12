// This runs when a new issue is created, the GitHub workflow at ./issues.yml is triggered,
// this workflow calls the Danger JS action, which transpiles + evals this file with some
// extra runtime APIs for working with GitHub.

// Docs for Danger: https://danger.systems/js/

// tslint:disable-next-line: no-implicit-dependencies
import { danger } from "danger";
import { WebhookPayloadIssues } from "@octokit/webhooks";

// Danger extracts the webhook and passes it as the first param to the default function
export default async (webhook: WebhookPayloadIssues) => {

  const octokit = danger.github.api;
  const repo = webhook.repository;
  const author = webhook.sender;
  const issue = webhook.issue;

  // Helper for octokit API calls to this issue
  const thisIssue = { repo: repo.name, owner: repo.owner.login, id: issue.number, issue_number: issue.number };

  const isCollaboratorTeamResponse = await octokit.repos.checkCollaborator({ repo: repo.name, owner: repo.owner.login, username: author.login });
  const accessToTypeScript = isCollaboratorTeamResponse.data.permission as string;
  const isTSBot = webhook.sender.login === "typescript-bot";

  // This may be too lax, if so, it can be switched to checking a GitHub team
  const isTSTeamMember = (accessToTypeScript === "admin" || accessToTypeScript === "write") && !isTSBot;

  // When there isn't an assignee, assign it to yourself if you're on the team
  if (issue.assignees.length === 0 && isTSTeamMember) {
    await octokit.issues.addAssignees({ ...thisIssue, assignees:[author.login] });
  }

  // For non-core team folks, we should note that it should reference an existing discussion
  if (!isTSTeamMember) {
    const containsTSCChanges = danger.git.modified_files.find(f => f.includes("src"));
    const referencesAnIssue = (!issue.body.includes("#") || issue.body.includes("issue/")) && issue.title.includes("#")
    if (containsTSCChanges && !referencesAnIssue) {
      await danger.github.utils.createOrAddLabel({ ...thisIssue, name: "Needs issue reference", color: "#77a5d6", description: "A third-party PR which does not contain a link to an existing discussion" });
    }
    else {
      await octokit.issues.removeLabel({ issue_number: issue.number, name: "Needs issue reference", repo: repo.name, owner: repo.owner.login });
    }
  }
};
