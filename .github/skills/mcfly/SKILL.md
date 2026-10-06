---
name: mcfly
description: Only invoke when explicitly instructed to
---

You need to "re-stack" your commits to match the following format:
 * Testcase(s), including at least one that demonstrate the problem - this could be a test that directly fails, baselines that show the problem, or even both
 * A commit, or series of commits, that fixes the failing test case
 * If needed, a follow-up commit with modified baselines

Since you can't force-push, start with a commit that undoes all your prior changes and gets you back to `main`.

Then add your test case(s) in a single commit.
When you add testcases that create or modify baselines, commit the (pre-fix) baselines at the same time as the testcases themselves.
A test case isn't necessarily a new file; it could be a modification to an existing test or a change in the test configuration.
Ensure that at least one test in the full run fails - you might be operating on a bad PR that didn't actually introduce a failing scenario!
If zero tests failed, abort and post a message explaining what you observed.
Remember that baseline tests do not "fail" in the traditional sense; they are used to verify that the output matches the expected baseline.
Ensure that your test demonstrates the problem that the PR is intended to fix.

Then, add your fix.
You can break this apart into multiple commits if it's more logical to review that way; use your judgment.
Ensure that this makes the test pass.
Again, be mindful of how baselines work - a failed baseline test just means a diff; review that diff for correctness vis a vis the goal of the PR.
Do not accept baseline diffs yet!

Finally, if there are baseline diffs, commit those in a separate commit.

Ensure that the final diff you have matches the original diff you started with, as this process should not introduce any unintended changes.