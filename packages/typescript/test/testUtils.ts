export function areTestsFiltered(): boolean {
    return process.execArgv.some(arg => arg === "--test-name-pattern" || arg.startsWith("--test-name-pattern="));
}
