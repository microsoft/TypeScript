 * Read the contents of CONTRIBUTING.md, it has instructions on how to run a single test, handling baselines, etc
 * Run `hereby lint` and `hereby format` before you're done
 * Only add testcases in `tests/cases/compiler` or `tests/cases/fourslash`. Do not write direct unit tests.
 * Running a set of tests may take up to 4 minutes
 * A full test run may take up to 15 minutes
 * Maintainer comments in the issue should generally take priority over OP's comments
 * Maintainers might give you hints on where to start. They are not always right, but a good place to start

Your workflow should be:
 * Make a testcase that demonstrates the behavior. Run it (by itself) and review the baselines it generates to ensure it demonstrates the bug. Add the test and its baselines in one commit
 * Fix the bug by changing code as appropriate. Put this fix in another commit
 * Run the test you wrote again and ensure the baselines change in a way that demonstrates that the bug is fixed. Put this baseline diff in its own commit
 * Run all other tests to ensure you didn't break anything. Some collateral baseline changes are normal, put these diffs in another commit
