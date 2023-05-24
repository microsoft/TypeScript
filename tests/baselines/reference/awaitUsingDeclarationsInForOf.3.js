//// [awaitUsingDeclarationsInForOf.3.ts]
async function main() {
    for (await using {} of []) {
    }
}


//// [awaitUsingDeclarationsInForOf.3.js]
async function main() {
    for (await using {} of []) {
    }
}
