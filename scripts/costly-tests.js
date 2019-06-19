// @ts-check
const fs = require("fs");
const git = require('simple-git/promise')('.')
const readline = require('readline')

/** @typedef {{ [s: string]: number}} Histogram */

async function main() {
    /** @type {Histogram} */
    const edits = Object.create(null)
    /** @type {Histogram} */
    const perf = JSON.parse(fs.readFileSync('.parallelperf.json', 'utf8'))

    await collectCommits(git, "release-2.3", "master", /*author*/ undefined, files => fillMap(files, edits))

    const totalTime = Object.values(perf).reduce((n,m) => n + m, 0)
    const untouched = Object.values(perf).length - Object.values(edits).length
    const totalEdits = Object.values(edits).reduce((n,m) => n + m, 0) + untouched + Object.values(edits).length

    let i = 0
    /** @type {{ name: string, time: number, edits: number, cost: number }[]} */
    let data = []
    for (const k in perf) {
        const otherk = k.replace(/tsrunner-[a-z-]+?:\/\//, '')
        const percentTime = perf[k] / totalTime
        const percentHits = (1 + (edits[otherk] || 0)) / totalEdits
        const cost = 5 + Math.log(percentTime / percentHits)
        data.push({ name: otherk, time: perf[k], edits: 1 + (edits[otherk] || 0), cost})
        if (edits[otherk])
            i++
    }
    const output = {
        totalTime,
        totalEdits,
        data: data.sort((x,y) => y.cost - x.cost).map(x => ({ ...x, cost: x.cost.toFixed(2) }))
    }

    fs.writeFileSync('tests/.test-cost.json', JSON.stringify(output), 'utf8')
}

main().catch(e => {
    console.log(e);
    process.exit(1);
})

/**
 * @param {string[]} files
 * @param {Histogram} histogram
 */
function fillMap(files, histogram) {
    // keep edits to test cases (but not /users), and not file moves
    const tests = files.filter(f => f.startsWith('tests/cases/') && !f.startsWith('tests/cases/user') && !/=>/.test(f))
    for (const test of tests) {
        histogram[test] = (histogram[test] || 0) + 1
    }
}

/**
 * @param {string} s
 */
function isSquashMergeMessage(s) {
    return /\(#[0-9]+\)$/.test(s)
}

/**
 * @param {string} s
 */
function isMergeCommit(s) {
    return /Merge pull request #[0-9]+/.test(s)
}

/**
 * @param {string} s
 */
function parseFiles(s) {
    const lines = s.split('\n')
    // Note that slice(2) only works for merge commits, which have an empty newline after the title
    return lines.slice(2, lines.length - 2).map(line => line.split("|")[0].trim())
}

/**
 * @param {import('simple-git/promise').SimpleGit} git
 * @param {string} from
 * @param {string} to
 * @param {string | undefined} author - only include commits from this author
 * @param {(files: string[]) => void} update
 */
 async function collectCommits(git, from, to, author, update) {
    let i = 0
    for (const commit of (await git.log({ from, to })).all) {
        i++
        if ((!author || commit.author_name === author) && isMergeCommit(commit.message) || isSquashMergeMessage(commit.message)) {
            readline.clearLine(process.stdout, /*left*/ -1)
            readline.cursorTo(process.stdout, 0)
            process.stdout.write(i + ": " + commit.date)
            const files = parseFiles(await git.show([commit.hash, "--stat=1000,960,40", "--pretty=oneline"]))
            update(files)
        }
    }
}



