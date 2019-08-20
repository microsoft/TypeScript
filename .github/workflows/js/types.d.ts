// Contains a GitHub-only subset of
// https://github.com/danger/danger-js/blob/master/source/danger.d.ts

declare module "danger" {
  import * as GitHub from "@octokit/rest"

  type MarkdownString = string
  
  /** A platform agnostic reference to a Git commit */
  interface GitCommit {
    /** The SHA for the commit */
    sha: string
    /** Who wrote the commit */
    author: GitCommitAuthor
    /** Who deployed the commit */
    committer: GitCommitAuthor
    /** The commit message */
    message: string
    /** Potential parent commits, and other assorted metadata */
    tree: any
    /** SHAs for the commit's parents */
    parents?: string[]
    /** Link to the commit */
    url: string
  }
  
  /** An author of a commit */
  interface GitCommitAuthor {
    /** The display name for the author */
    name: string
    /** The authors email */
    email: string
    /** ISO6801 date string */
    date: string
  }
  /**
   * The shape of the JSON passed between Danger and a subprocess. It's built
   * to be expanded in the future.
   */
  interface DangerJSON {
    danger: DangerDSLJSONType
  }
  
  /**
   * The available Peril interface, it is possible that this is not
   * always up to date with true DSL in Peril, but I'll be giving it
   * a good shot.
   */
  
  interface PerilDSL {
    /**
     * A set of key:value string based on ENV vars that have
     * been set to be exposed to your Peril config
     */
    env: any
  
    /**
     * Allows you to schedule a task exportd in your Peril config to run in a certain time-frame,
     * e.g `runTask("reminder_pr_merge", "in 2 days", { number: 2 })`. For more details on how this
     * works, see the Peril documentation.
     * @param taskName the name found in your Peril config
     * @param time the time interval (uses human-internal module)
     * @param data data which will be passed through to the script
     */
    runTask: (taskName: string, time: string, data: any) => void
  
    /**
     * When running a task, the data passed in when the task
     * was originally scheduled, you can also get this as the first
     * argument in a default function. Deprecated, use a default export
     * function. I'll remove this sometime.
     */
    data?: any
  }
  
  /**
   *  The root of the Danger JSON DSL.
   */
  
  interface DangerDSLJSONType {
    /** The data only version of Git DSL */
    git: GitJSONDSL
    /** The data only version of GitHub DSL */
    github?: GitHubDSL
    /** The data only version of BitBucket Server DSL */
    bitbucket_server?: any
    /** The data only version of BitBucket Cloud DSL */
    bitbucket_cloud?: any
    /** The data only version of GitLab DSL */
    gitlab?: any
    /**
     * Used in the Danger JSON DSL to pass metadata between
     * processes. It will be undefined when used inside the Danger DSL
     */
    settings: {
      /**
       * Saves each client re-implementing logic to grab these vars
       * for their API clients
       */
      github: {
        /** API token for the GitHub client to use */
        accessToken: string
        /** Optional URL for enterprise GitHub */
        baseURL: string | undefined
        /** Optional headers to add to a request */
        additionalHeaders: any
      }
      /**
       * This is still a bit of a WIP, but this should
       * pass args/opts from the original CLI call through
       * to the process.
       */
      cliArgs: CliArgs
    }
  }
  
  /**
   *  The Danger DSL provides the metadata for introspection
   *  in order to create your own rules.
   */
  interface DangerDSLType {
    /**
     *  Details specific to the git changes within the code changes.
     *  Currently, this is just the raw file paths that have been
     *  added, removed or modified.
     */
    readonly git: GitDSL
    /**
     *  The GitHub metadata. This covers things like PR info,
     *  comments and reviews on the PR, label metadata, commits with
     *  GitHub user identities and some useful utility functions
     *  for displaying links to files.
     *
     * Strictly speaking, `github` is a nullable type, if you are not using
     * GitHub then it will be undefined. For the DSL convenience sake though, it
     * is classed as non-nullable
     *
     *  Provides an authenticated API so you can work directly
     *  with the GitHub API. This is an instance of the "@octokit/rest" npm
     *  module.
     *
     *  Finally, if running through Peril on an event other than a PR
     *  this is the full JSON from the webhook. [github-webhook-event-types](https://github.com/orta/github-webhook-event-types) has the full
     *  typings for those webhooks.
     */
    readonly github: GitHubDSL
  
    /**
     *  The BitBucket Server metadata. This covers things like PR info,
     *  comments and reviews on the PR, related issues, commits, comments
     *  and activities.
     *
     *  Strictly speaking, `bitbucket_server` is a nullable type, if you are not using
     *  BitBucket Server then it will be undefined. For the DSL convenience sake though, it
     *  is classed as non-nullable
     */
    readonly bitbucket_server: any
  
    /**
     *  The BitBucket Cloud metadata. This covers things like PR info,
     *  comments and reviews on the PR, commits, comments, and activities.
     *
     *  Strictly speaking, `bitbucket_cloud` is a nullable type, if you are not using
     *  BitBucket Cloud then it will be undefined. For the DSL convenience sake though, it
     *  is classed as non-nullable
     */
    readonly bitbucket_cloud: any
    /**
     * The GitLab metadata. This covers things like PR info,
     * comments and reviews on the MR, commits, comments
     * and activities.
     *
     * Strictly speaking, `gitlab` is a nullable type, if you are not using
     * GitLab then it will be undefined. For the DSL convenience sake though, it
     * is classed as non-nullable
     */
    readonly gitlab: any
  
    /**
     * Functions which are globally useful in most Dangerfiles. Right
     * now, these functions are around making sentences of arrays, or
     * for making a like of href links easily.
     */
    readonly utils: DangerUtilsDSL
  }
  /**
   * The representation of what running a Dangerfile generates.
   * This needs to be passed between processes, so data only please.
   */
  interface DangerResults {
    /**
     * Failed messages
     */
    fails: Violation[]
  
    /**
     * Messages for info
     */
    warnings: Violation[]
  
    /**
     * A set of messages to show inline
     */
    messages: Violation[]
  
    /**
     * Markdown messages to attach at the bottom of the comment
     */
    markdowns: Violation[]
  
    /** Meta information about the runtime evaluation */
    meta?: {
      /** E.g. "dangerJS", or "Danger Swift" */
      runtimeName: string
      /** e.g. "https://danger.systems/js" */
      runtimeHref: string
    }
  }
  
  interface DangerRuntimeContainer extends DangerResults {
    /**
     * Asynchronous functions to be run after parsing
     */
    scheduled?: any[]
  }
  
  interface DangerInlineResults {
    /**
     * Path to the file
     */
    file: string
  
    /**
     * Line in the file
     */
    line: number
  
    /**
     * Failed messages
     */
    fails: string[]
  
    /**
     * Messages for info
     */
    warnings: string[]
  
    /**
     * A set of messages to show inline
     */
    messages: string[]
  
    /**
     * Markdown messages to attach at the bottom of the comment
     */
    markdowns: string[]
  }
  /**
   * The Danger Utils DSL contains utility functions
   * that are specific to universal Danger use-cases.
   */
  interface DangerUtilsDSL {
    /**
     * Creates a link using HTML.
     *
     * If `href` and `text` are falsy, null is returned.
     * If `href` is falsy and `text` is truthy, `text` is returned.
     * If `href` is truthy and `text` is falsy, an <a> tag is returned with `href` as its href and text value.
     * Otherwise, if `href` and `text` are truthy, an <a> tag is returned with the `href` and `text` inserted as expected.
     *
     * @param {string} href The HTML link's destination.
     * @param {string} text The HTML link's text.
     * @returns {string|null} The HTML <a> tag.
     */
    href(href: string, text: string): string | null
  
    /**
     * Converts an array of strings into a sentence.
     *
     * @param {string[]} array The array of strings.
     * @returns {string} The sentence.
     */
    sentence(array: string[]): string
  }
  /** All Text diff values will be this shape */
  interface TextDiff {
    /** The value before the PR's applied changes */
    before: string
    /** The value after the PR's applied changes */
    after: string
    /** A string containing the full set of changes */
    diff: string
    /** A string containing just the added lines */
    added: string
    /** A string containing just the removed lines */
    removed: string
  }
  
  /** Git diff sliced into chunks */
  interface StructuredDiff {
    /** Git diff chunks */
    chunks: any[]
  }
  
  /** The results of running a JSON patch */
  interface JSONPatch {
    /** The JSON in a file at the PR merge base */
    before: any
    /** The JSON in a file from the PR submitter */
    after: any
    /** The set of operations to go from one JSON to another JSON */
    diff: JSONPatchOperation[]
  }
  
  /** An individual operation inside an rfc6902 JSON Patch */
  interface JSONPatchOperation {
    /** An operation type */
    op: string
    /** The JSON keypath which the operation applies on */
    path: string
    /** The changes for applied */
    value: string
  }
  
  /** All JSON diff values will be this shape */
  interface JSONDiffValue {
    /** The value before the PR's applied changes */
    before: any
    /** The value after the PR's applied changes */
    after: any
    /** If both before & after are arrays, then you optionally get what is added. Empty if no additional objects. */
    added?: any[]
    /** If both before & after are arrays, then you optionally get what is removed. Empty if no removed objects. */
    removed?: any[]
  }
  
  /** A map of string keys to JSONDiffValue */
  interface JSONDiff {
    [name: string]: JSONDiffValue
  }
  
  // This is `danger.git`
  
  /**
   *
   * The Git Related Metadata which is available inside the Danger DSL JSON
   *
   * @namespace JSONDSL
   */
  
  interface GitJSONDSL {
    /**
     * Filepaths with changes relative to the git root
     */
    readonly modified_files: string[]
  
    /**
     * Newly created filepaths relative to the git root
     */
    readonly created_files: string[]
  
    /**
     * Removed filepaths relative to the git root
     */
    readonly deleted_files: string[]
  
    /** The Git commit metadata */
    readonly commits: GitCommit[]
  }
  
  /** The shape of the Chainsmoker response */
  type GitMatchResult = {
    /** Did any file paths match from the git modified list? */
    modified: any
    /** Did any file paths match from the git created list? */
    created: any
    /** Did any file paths match from the combination of the git modified and created list? */
    edited: any
    /** Did any file paths match from the git deleted list? */
    deleted: any
  }
  
  /** The git specific metadata for a PR */
  interface GitDSL extends GitJSONDSL {
    /**
     * A Chainsmoker object to help match paths as an elegant DSL. It
     * lets you write a globbed string and then get booleans on whether
     * there are matches within a certain part of the git DSL.
     *
     * Use this to create an object which has booleans set on 4 keys
     * `modified`, `created`, `edited` (created + modified) and `deleted`.
     *
     * @example
     * const packageJSON = danger.git.fileMatch("package.json")
     * const lockfile = danger.git.fileMatch("yarn.lock")
     *
     * if (packageJSON.modified && !lockfile.modified) {
     *    warn("You might have forgotten to run `yarn`.")
     * }
     *
     * @example
     * const needsSchemaChange = danger.git.fileMatch("src/app/analytics/*.ts")
     * const schema = danger.git.fileMatch("src/app/analytics/schema.ts")
     *
     * if (needsSchemaChange.edited && !schema.modified) {
     *    fail("Changes to the analytics files need to edit update the schema.")
     * }
     */
    fileMatch: Chainsmoker<GitMatchResult>
  
    /**
     * Offers the diff for a specific file
     *
     * @param {string} filename the path to the json file
     */
    diffForFile(filename: string): Promise<TextDiff | null>
  
    /**
     * Offers the structured diff for a specific file
     *
     * @param {string} filename the path to the json file
     */
    structuredDiffForFile(filename: string): Promise<StructuredDiff | null>
  
    /**
     * Provides a JSON patch (rfc6902) between the two versions of a JSON file,
     * returns null if you don't have any changes for the file in the diff.
     *
     * Note that if you are looking to just see changes like: before, after, added or removed - you
     * should use `JSONDiffForFile` instead, as this can be a bit unwieldy for a Dangerfile.
     *
     * @param {string} filename the path to the json file
     */
    JSONPatchForFile(filename: string): Promise<JSONPatch | null>
  
    /**
     * Provides a simplified JSON diff between the two versions of a JSON file. This will always
     * be an object whose keys represent what has changed inside a JSON file.
     *
     * Any changed values will be represented with the same path, but with a different object instead.
     * This object will always show a `before` and `after` for the changes. If both values are arrays or
     * objects the `before` and `after`, then there will also be `added` and `removed` inside the object.
     *
     * In the case of two objects, the `added` and `removed` will be an array of keys rather than the values.
     *
     * This object is represented as `JSONDiffValue` but I don't know how to make TypeScript force
     * export that kind of type structure.
     *
     * This should make it really easy to do work when specific keypaths have changed inside a JSON file.
     *
     * @param {string} filename the path to the json file
     */
    JSONDiffForFile(filename: string): Promise<JSONDiff>
  
    /**
     * Offers the overall lines of code added/removed in the diff
     */
    linesOfCode(): Promise<number | null>
  }
  // This is `danger.github` inside the JSON
  
  interface GitHubJSONDSL {
    /** The issue metadata for a code review session */
    issue: GitHubIssue
    /** The PR metadata for a code review session */
    pr: GitHubPRDSL
    /** The PR metadata specifically formatted for using with the GitHub API client */
    thisPR: GitHubAPIPR
    /** The github commit metadata for a code review session */
    commits: GitHubCommit[]
    /** The reviews left on this pull request */
    reviews: GitHubReview[]
    /** The people/teams requested to review this PR */
    requested_reviewers: GitHubReviewers
  }
  
  // This is `danger.github`
  
  /** The GitHub metadata for your PR */
  interface GitHubDSL extends GitHubJSONDSL {
    /**
     * An authenticated API so you can extend danger's behavior by using the [GitHub v3 API](https://developer.github.com/v3/).
     *
     * A set up instance of the "github" npm module. You can get the full [API here](https://octokit.github.io/node-github/).
     */
    api: GitHub
    /** A scope for useful functions related to GitHub */
    utils: GitHubUtilsDSL
  }
  
  /** Useful functions for GitHub related work */
  interface GitHubUtilsDSL {
    /**
     * Creates HTML for a sentence of clickable links for an array of paths.
     * This uses the source of the PR as the target, not the destination repo.
     * You can manually set the target repo and branch however, to make it work how you want.
     *
     * @param {string} paths A list of strings representing file paths
     * @param {string} useBasename Show either the file name, or the full path - defaults to just file name e.g. true.
     * @param {string} repoSlug An optional override for the repo slug, ex: "orta/ORStackView"
     * @param {string} branch An optional override for the branch, ex: "v3"
     * @returns {string} A HTML string of <a>'s built as a sentence.
     */
    fileLinks(paths: string[], useBasename?: boolean, repoSlug?: string, branch?: string): string
  
    /**
     * Downloads a file's contents via the GitHub API. You'll want to use
     * this instead of `fs.readFile` when aiming to support working with Peril.
     *
     * @param {string} path The path fo the file that exists
     * @param {string} repoSlug An optional reference to the repo's slug: e.g. danger/danger-js
     * @param {string} ref An optional reference to a branch/sha
     */
    fileContents(path: string, repoSlug?: string, ref?: string): Promise<string>
  
    /**
     * An API for creating, updating and closing an issue. Basically
     * this is really useful for reporting back via a separate
     * issue that you may want to keep up to date at all times.
     *
     * @param {string} id The unique ID for the message to create, close
     * @param {string} content the content of the message
     * @param {any} config settings for the issue
     * @returns {string} A HTML string of <a>'s built as a sentence.
     */
    createUpdatedIssueWithID: (
      id: string,
      content: string,
      config: { title: string; open: boolean; owner: string; repo: string }
    ) => Promise<string>
  
    /**
     * An API for creating, or setting a label to an issue. Usable from Peril
     * by adding an additional param for settings about a repo.
     *
     * @param {obj} labelConfig The config for the label
     * @param {obj | undefined} Optional: the config for the issue
     * @returns {Promise<undefined>} No return value.
     */
    createOrAddLabel: (
      labelConfig: { name: string; color: string; description: string },
      repoConfig?: { owner: string; repo: string; id: number }
    ) => Promise<void>
    createOrUpdatePR: (
      config: {
        /** PR title */
        title: string
        /** PR body */
        body: string
        /** The danger in danger/danger-js - defaults to the PR base name if undefined */
        owner?: string
        /** The danger-js in danger/danger-js - defaults to the PR base repo if undefined */
        repo?: string
        /** A message for the commit */
        commitMessage: string
        /** The name of the branch on the repo */
        newBranchName: string
        /** Base branch for the new branch e.g. what should Danger create the new branch from */
        baseBranch: string
      },
      fileMap: any
    ) => Promise<any>
  }
  
  /**
   * This is `danger.github.issue` It refers to the issue that makes up the Pull Request.
   * GitHub treats all pull requests as a special type of issue. This DSL contains only parts of the issue that are
   * not found in the PR DSL, however it does contain the full JSON structure.
   *
   * A GitHub Issue
   */
  interface GitHubIssue {
    /**
     * The labels associated with this issue
     */
    labels: GitHubIssueLabel[]
  }
  
  // Subtypes specific to issues
  
  interface GitHubIssueLabel {
    /** The identifying number of this label */
    id: number
  
    /** The URL that links to this label */
    url: string
  
    /** The name of the label */
    name: string
  
    /** The color associated with this label */
    color: string
  }
  
  interface GitHubIssueComment {
    /**
     *  UUID for the comment
     */
    id: string
  
    /**
     * The User who made the comment
     */
    user: GitHubUser
  
    /**
     * Textual representation of comment
     */
    body: string
  }
  
  // This is `danger.github.pr`
  
  /**
   * An exact copy of the PR's reference JSON. This interface has type'd the majority
   * of it for tooling's sake, but any extra metadata which GitHub send will still be
   * inside the JS object.
   */
  
  interface GitHubPRDSL {
    /**
     * The UUID for the PR
     */
    number: number
  
    /**
     * The state for the PR
     */
    state: "closed" | "open" | "locked" | "merged"
  
    /**
     * Has the PR been locked to contributors only?
     */
    locked: boolean
  
    /**
     * The title of the PR
     */
    title: string
  
    /**
     * The markdown body message of the PR
     */
    body: string
  
    /**
     * ISO6801 Date string for when PR was created
     */
    created_at: string
  
    /**
     * ISO6801 Date string for when PR was updated
     */
    updated_at: string
  
    /**
     * optional ISO6801 Date string for when PR was closed
     */
    closed_at: string | null
  
    /**
     * Optional ISO6801 Date string for when PR was merged.
     * Danger probably shouldn't be running in this state.
     */
    merged_at: string | null
  
    /**
     * Merge reference for the _other_ repo.
     */
    head: GitHubMergeRef
  
    /**
     * Merge reference for _this_ repo.
     */
    base: GitHubMergeRef
  
    /**
     * The User who submitted the PR
     */
    user: GitHubUser
  
    /**
     * The User who is assigned the PR
     */
    assignee: GitHubUser
  
    /**
     * The Users who are assigned to the PR
     */
    assignees: GitHubUser[]
  
    /**
     * Has the PR been merged yet?
     */
    merged: boolean
  
    /**
     * The number of comments on the PR
     */
    comments: number
  
    /**
     * The number of review-specific comments on the PR
     */
    review_comments: number
  
    /**
     * The number of commits in the PR
     */
    commits: number
  
    /**
     * The number of additional lines in the PR
     */
    additions: number
  
    /**
     * The number of deleted lines in the PR
     */
    deletions: number
  
    /**
     * The number of changed files in the PR
     */
    changed_files: number
  
    /**
     * The link back to this PR as user-facing
     */
    html_url: string
  
    /** How does the PR author relate to this repo/org? */
    author_association:
      | "COLLABORATOR"
      | "CONTRIBUTOR"
      | "FIRST_TIMER"
      | "FIRST_TIME_CONTRIBUTOR"
      | "MEMBER"
      | "NONE"
      | "OWNER"
  }
  
  // These are the individual subtypes of objects inside the larger DSL objects above.
  
  /** A GitHub specific implementation of a git commit, it has GitHub user names instead of an email. */
  interface GitHubCommit {
    /** The raw commit metadata */
    commit: GitCommit
    /** The SHA for the commit */
    sha: string
    /** the url for the commit on GitHub */
    url: string
    /** The GitHub user who wrote the code */
    author: GitHubUser
    /** The GitHub user who shipped the code */
    committer: GitHubUser
    /** An array of parent commit shas */
    parents: any[]
  }
  
  /**
   * A GitHub user account.
   */
  interface GitHubUser {
    /**
     * Generic UUID
     */
    id: number
    /**
     * The handle for the user/org
     */
    login: string
    /**
     * Whether the user is an org, or a user
     */
    type: "User" | "Organization" | "Bot"
    /**
     * The url for a users's image
     */
    avatar_url: string
    /**
     * The href for a users's page
     */
    href: string
  }
  
  /**
   * A GitHub Repo
   */
  interface GitHubRepo {
    /**
     * Generic UUID
     */
    id: number
  
    /**
     * The name of the repo, e.g. "Danger-JS"
     */
    name: string
  
    /**
     * The full name of the owner + repo, e.g. "Danger/Danger-JS"
     */
    full_name: string
  
    /**
     * The owner of the repo
     */
    owner: GitHubUser
  
    /**
     * Is the repo publicly accessible?
     */
    private: boolean
  
    /**
     * The textual description of the repo
     */
    description: string
  
    /**
     * Is the repo a fork?
     */
    fork: boolean
  
    /**
     * Is someone assigned to this PR?
     */
    assignee: GitHubUser
  
    /**
     * Are there people assigned to this PR?
     */
    assignees: GitHubUser[]
    /**
     * The root web URL for the repo, e.g. https://github.com/artsy/emission
     */
    html_url: string
  }
  
  interface GitHubMergeRef {
    /**
     * The human display name for the merge reference, e.g. "artsy:master"
     */
    label: string
  
    /**
     * The reference point for the merge, e.g. "master"
     */
    ref: string
  
    /**
     * The reference point for the merge, e.g. "704dc55988c6996f69b6873c2424be7d1de67bbe"
     */
    sha: string
  
    /**
     * The user that owns the merge reference e.g. "artsy"
     */
    user: GitHubUser
    /**
     * The repo from whch the reference comes from
     */
    repo: GitHubRepo
  }
  
  /**
   * GitHubReview
   * While a review is pending, it will only have a user.  Once a review is complete, the rest of
   * the review attributes will be present
   * @export
   * @interface GitHubReview
   */
  interface GitHubReview {
    /**
     * The user requested to review, or the user who has completed the review
     */
    user: GitHubUser
    /**
     * If there is a review, this provides the ID for it
     */
    id?: number
  
    /**
     * If there is a review, the body of the review
     */
    body?: string
  
    /**
     * If there is a review, the commit ID this review was made on
     */
    commit_id?: string
  
    /**
     * The state of the review
     * APPROVED, REQUEST_CHANGES, COMMENT or PENDING
     */
    state?: "APPROVED" | "REQUEST_CHANGES" | "COMMENT" | "PENDING"
  }
  
  /** Provides the current PR in an easily used way for params in `github.api` calls  */
  interface GitHubAPIPR {
    /** The repo owner */
    owner: string
    /** The repo name */
    repo: string
    /** The PR number */
    number: number
  }
  
  interface GitHubReviewers {
    /** Users that have been requested */
    users: GitHubUser[]
    /** Teams that have been requested */
    teams: any[]
  }
  // TODO: extract out from BitBucket specifically, or create our own type
  

  /**
   * The result of user doing warn, message or fail, built this way for
   * expansion later.
   */
  interface Violation {
    /** The string representation */
    message: string
  
    /** Optional path to the file */
    file?: string
  
    /** Optional line in the file */
    line?: number
  
    /** Optional icon for table (Only valid for messages) */
    icon?: string
  }
  /**
   * Describes the possible arguments that
   * could be used when calling the CLI
   */
  interface CliArgs {
    /** The base reference used by danger PR (e.g. not master) */
    base: string
    /** For debugging  */
    verbose: string
    /** Used by danger-js o allow having a custom CI */
    externalCiProvider: string
    /** Use SDTOUT instead of posting to the code review side */
    textOnly: string
    /** A custom path for the dangerfile (can also be a remote reference) */
    dangerfile: string
    /** So you can have many danger runs in one code review */
    id: string
  }
  
  // NOTE: if add something new here, you need to change dslGenerator.ts
  /** A function with a callback function, which Danger wraps in a Promise */
  type CallbackableFn = (callback: (done: any) => void) => void
  
  /**
   * Types of things which Danger will schedule for you, it's recommended that you
   * just throw in an `async () => { [...] }` function. Can also handle a function
   * that has a single 'done' arg.
   */
  type Scheduleable = Promise<any> | Promise<void> | CallbackableFn
  /**
   * A Dangerfile, in Peril, is evaluated as a script, and so async code does not work
   * out of the box. By using the `schedule` function you can now register a
   * section of code to evaluate across multiple tick cycles.
   *
   * `schedule` currently handles two types of arguments, either a promise or a function with a resolve arg.
   *
   * @param {Function} asyncFunction the function to run asynchronously
   */
  export function schedule(asyncFunction: Scheduleable): void
  
  /**
   * Fails a build, outputting a specific reason for failing into a HTML table.
   *
   * @param {MarkdownString} message the String to output
   * @param {string | undefined} file a file which this message should be attached to
   * @param {number | undefined} line the line which this message should be attached to
   */
  export function fail(message: MarkdownString, file?: string, line?: number): void
  
  /**
   * Highlights low-priority issues, but does not fail the build. Message
   * is shown inside a HTML table.
   *
   * @param {MarkdownString} message the String to output
   * @param {string | undefined} file a file which this message should be attached to
   * @param {number | undefined} line the line which this message should be attached to
   */
  export function warn(message: MarkdownString, file?: string, line?: number): void
  
  /**
   * Adds a message to the Danger table, the only difference between this
   * and warn is the emoji which shows in the table.
   *
   * @param {MarkdownString} message the String to output
   * @param {string | undefined} file a file which this message should be attached to
   * @param {number | undefined} line the line which this message should be attached to
   */
  function message(message: MarkdownString, file?: string, line?: number): void
  /**
   * Adds a message to the Danger table, the only difference between this
   * and warn is the default emoji which shows in the table.
   * You can also specifiy a custom emoji to show in the table for each message
   *
   * @param {MarkdownString} message the String to output
   * @param {{file?: string, line?: string, icon?: MarkdownString}} [opts]
   * @param opts.file a file which this message should be attached to
   * @param opts.line the line which this message should be attached to
   * @param opts.icon icon string or image to show in table, take care not to break table formatting
   */
  function message(message: MarkdownString, opts?: { file?: string; line?: number; icon?: MarkdownString }): void
  
  /**
   * Adds raw markdown into the Danger comment, under the table
   *
   * @param {MarkdownString} message the String to output
   * @param {string | undefined} file a file which this message should be attached to
   * @param {number | undefined} line the line which this message should be attached to
   */
  function markdown(message: MarkdownString, file?: string, line?: number): void
  
  /**
   * The root Danger object. This contains all of the metadata you
   * will be looking for in order to generate useful rules.
   */
  export const danger: DangerDSLType
  
  /**
   * When Peril is running your Dangerfile, the Danger DSL is
   * extended with additional options.
   */
  export const peril: PerilDSL
  
  /**
   * The current results of a Danger run, this can be useful if you
   * are wanting to introspect on whether a build has already failed.
   */
  export const results: DangerRuntimeContainer
  export type Pattern = string
  export type Path = string
  export type KeyedPatterns<T> = { readonly [K in keyof T]: Pattern[] }
  export type KeyedPaths<T> = { readonly [K in keyof T]: Path[] }
  export type _MatchResult<T> = { readonly [K in keyof T]: boolean }
  export type MatchResult<T> = _MatchResult<T> & {
    /** Returns an object containing arrays of matched files instead of the usual boolean values. */
    getKeyedPaths(): KeyedPaths<T>
  }
  /** A vendored copy of the  Chainsmoker module on NPM */
  export type Chainsmoker<T> = (...patterns: Pattern[]) => MatchResult<T>
}
