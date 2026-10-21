// @strict: false

type Result = { error: string; details?: never } | { details: { link: string }; error?: never };
function read(result: Result) {
    if (result.error || !result.details) return;
    return result.details.link;
}
