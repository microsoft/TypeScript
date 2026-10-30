// @strict: true

function shouldRetry(retryCount: number, currentCount: number) {
    return retryCount === -1 || (retryCount !== -1 && currentCount <= retryCount);
}
