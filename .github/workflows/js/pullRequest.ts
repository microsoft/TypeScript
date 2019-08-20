// We don't have to use Danger via npm when using GH actions so this reference
// ensures that the types are available when editing this file.
/// <reference path="types.d.ts" />

// tslint:disable-next-line: no-implicit-dependencies
import { danger, warn } from "danger";

const octokit = danger.github.api;
const pr = danger.github.pr;
const repo = pr.base.repo;

// Danger will automatically run a default function to make it easy to write async code
export default async () => {

  const isCollaboratorTeamResponse = await octokit.repos.checkCollaborator({ repo: repo.name, owner: repo.owner.login, username: pr.user.login });
  const accessToTypeScript = isCollaboratorTeamResponse.data.permission as string;
  // This may be too lax, if so, it can be switched to checking a GitHub team
  const isTSTeamMember = (accessToTypeScript === "admin" || accessToTypeScript === "write");

  // When there isn't an assignee, assign it to yourself if you're on the team
  if (pr.assignees.length === 0 && isTSTeamMember) {
    await octokit.issues.addAssignees({ ...danger.github.thisPR, assignees:[pr.user.login] });
  }

  // For non-core team folks, we should note that it should reference an existing discussion
  if (!isTSTeamMember) {
    const containsTSCChanges = danger.git.modified_files.find(f => f.includes("src"));
    const referencesAnIssue = (!pr.body.includes("#") || pr.body.includes("issue/")) && pr.title.includes("#")
    if (containsTSCChanges && !referencesAnIssue) {
      warn("This PR does not reference an existing issue");
      await danger.github.utils.createOrAddLabel({ name: "Needs issue reference", color: "#77a5d6", description: "A third-party PR which does not contain a link to an existing discussion" });
    }
    else {
      await octokit.issues.removeLabel({ issue_number: pr.number, name: "Needs issue reference", repo: repo.name, owner: repo.owner.login });
    }
  }
};
