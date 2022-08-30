"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const mailMapPath = path.resolve(__dirname, "../.mailmap");
const authorsPath = path.resolve(__dirname, "../AUTHORS.md");
function getKnownAuthors() {
    const segmentRegExp = /\s?([^<]+)\s+<([^>]+)>/g;
    const preferredNameRegeExp = /\s?#\s?([^#]+)$/;
    const knownAuthors = [];
    if (!fs.existsSync(mailMapPath)) {
        throw new Error(`Could not load known users form .mailmap file at: ${mailMapPath}`);
    }
    const mailMap = fs.readFileSync(mailMapPath).toString();
    for (const line of mailMap.split("\r\n")) {
        const author = { displayNames: [], emails: [] };
        let match;
        while (match = segmentRegExp.exec(line)) {
            author.displayNames.push(match[1]);
            author.emails.push(match[2]);
        }
        if (match = preferredNameRegeExp.exec(line)) {
            author.preferredName = match[1];
        }
        if (!author.emails)
            continue;
        knownAuthors.push(author);
        if (line.indexOf("#") > 0 && !author.preferredName) {
            throw new Error("Could not match preferred name for: " + line);
        }
        // console.log("===> line: " + line);
        // console.log(JSON.stringify(author, undefined, 2));
    }
    return knownAuthors;
}
function getAuthorName(author) {
    return author.preferredName || author.displayNames[0];
}
function getKnownAuthorMaps() {
    const knownAuthors = getKnownAuthors();
    const authorsByName = {};
    const authorsByEmail = {};
    knownAuthors.forEach(author => {
        author.displayNames.forEach(n => authorsByName[n] = author);
        author.emails.forEach(e => authorsByEmail[e.toLocaleLowerCase()] = author);
    });
    return {
        knownAuthors,
        authorsByName,
        authorsByEmail
    };
}
function deduplicate(array) {
    const result = [];
    if (array) {
        for (const item of array) {
            if (result.indexOf(item) < 0) {
                result.push(item);
            }
        }
    }
    return result;
}
function log(s) {
    console.log(`   ${s}`);
}
function sortAuthors(a, b) {
    if (a.charAt(0) === "@")
        a = a.substr(1);
    if (b.charAt(0) === "@")
        b = b.substr(1);
    if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) {
        return -1;
    }
    else {
        return 1;
    }
}
var Commands;
(function (Commands) {
    Commands.writeAuthors = () => {
        const output = deduplicate(getKnownAuthors().map(getAuthorName).filter(a => !!a)).sort(sortAuthors).join("\r\n* ");
        fs.writeFileSync(authorsPath, "TypeScript is authored by:\r\n* " + output);
    };
    Commands.writeAuthors.description = "Write known authors to AUTHORS.md file.";
    Commands.listKnownAuthors = () => {
        deduplicate(getKnownAuthors().map(getAuthorName)).filter(a => !!a).sort(sortAuthors).forEach(log);
    };
    Commands.listKnownAuthors.description = "List known authors as listed in .mailmap file.";
    Commands.listAuthors = (...specs) => {
        const cmd = "git shortlog -se " + specs.join(" ");
        console.log(cmd);
        const outputRegExp = /\d+\s+([^<]+)<([^>]+)>/;
        const authors = [];
        const { output: [error, stdout, stderr] } = childProcess.spawnSync(`git`, ["shortlog", "-se", ...specs], { cwd: path.resolve(__dirname, "../") });
        if (error) {
            console.log(stderr.toString());
        }
        else {
            const output = stdout.toString();
            const lines = output.split("\n");
            lines.forEach(line => {
                if (line) {
                    let match;
                    if (match = outputRegExp.exec(line)) {
                        authors.push({ name: match[1], email: match[2] });
                    }
                    else {
                        throw new Error("Could not parse output: " + line);
                    }
                }
            });
            const maps = getKnownAuthorMaps();
            const lookupAuthor = ({ name, email }) => {
                return maps.authorsByEmail[email.toLocaleLowerCase()] || maps.authorsByName[name];
            };
            const knownAuthors = authors
                .map(lookupAuthor)
                .filter(a => !!a)
                .map(getAuthorName);
            const unknownAuthors = authors
                .filter(a => !lookupAuthor(a))
                .map(a => `${a.name} <${a.email}>`);
            if (knownAuthors.length) {
                console.log("\r\n");
                console.log("Found known authors: ");
                console.log("=====================");
                deduplicate(knownAuthors).sort(sortAuthors).forEach(log);
            }
            if (unknownAuthors.length) {
                console.log("\r\n");
                console.log("Found unknown authors: ");
                console.log("=====================");
                deduplicate(unknownAuthors).sort(sortAuthors).forEach(log);
            }
            const allAuthors = deduplicate([...knownAuthors, ...unknownAuthors].map(a => a.split("<")[0].trim())).sort(sortAuthors);
            if (allAuthors.length) {
                console.log("\r\n");
                console.log("Revised Authors.md: ");
                console.log("=====================");
                allAuthors.forEach(name => console.log(" - " + name));
            }
        }
    };
    Commands.listAuthors.description = "List known and unknown authors for a given spec, e.g. 'node authors.js listAuthors origin/release-2.6..origin/release-2.7'";
})(Commands || (Commands = {}));
const args = process.argv.slice(2);
if (args.length < 1) {
    console.log("Usage: node authors.js [command]");
    console.log("List of commands: ");
    Object.keys(Commands).forEach(k => console.log(`     ${k}: ${Commands[k].description}`));
}
else {
    const cmd = Commands[args[0]];
    if (cmd === undefined) {
        console.log("Unknown command " + args[1]);
    }
    else {
        cmd.apply(undefined, args.slice(1));
    }
}
//# sourceMappingURL=authors.js.map