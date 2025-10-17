---
name: '[TypeScript Team Use] Copilot PR porting'
about: Instructions for Copilot to port a PR from microsoft/TypeScript
title: 'Port TypeScript PR #[NNNNN]'
labels: Porting PR
assignees: ''

---

This repository is a port of microsoft/TypeScript from TypeScript to Go. Since the port began, the following pull request was applied to microsoft/TypeScript. An equivalent change now needs to be applied here.

## PR to port

- PR link: <!-- https://github.com/microsoft/TypeScript/pull/NNNNN -->
- Squash commit diff: <!-- Copy the squash commit link and append ".patch", e.g. https://github.com/microsoft/TypeScript/commit/a271797c1a95494e5f7aa8075c01941ad25cad08.patch -->

## Instructions

1. Use `playwright` to view the PR listed above
2. Apply the edits made in that PR to this codebase, translating them from TypeScript to Go.
   - The change may or may not be applicable. It may have already been ported. Do not make any significant changes outside the scope of the diff. If the change cannot be applied without significant out-of-scope changes, explain why and stop working.
   - Tip: search for functions and identifiers from the diff to find the right location to apply edits. Some files in microsoft/TypeScript have been split into multiple.
   - Tip: some changes have already been ported, like changes to diagnostic message text. Tests do not need to be ported as they are imported from the submodule.
3. Refer to your copilot_instructions.md for guidance on how to build and test your change. Note the following differences to the typical development workflow:
   - Since you are porting the implementation for a behavior that already has tests in the submodule, you don't need to add new tests. Instead, your change should change existing baselines.
   - If done correctly, you should see removals in `.diff` baselines. These `.diff` removals are your ultimate source of truth: your change is not correct unless diffs are reduced.
