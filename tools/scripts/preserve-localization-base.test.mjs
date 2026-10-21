import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
    mkdirSync,
    mkdtempSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const script = fileURLToPath(new URL("./preserve-localization-base.mjs", import.meta.url));
const locales = "tsc/internal/diagnostics/loc";
const generatedGo = "tsc/internal/diagnostics/loc_generated.go";

function repository(context) {
    const directory = mkdtempSync(path.join(tmpdir(), "localization-base-"));
    context.after(() => rmSync(directory, { recursive: true, force: true }));
    const git = (...args) => execFileSync("git", args, { cwd: directory, encoding: "utf8" }).trim();
    const write = (file, content) => {
        const destination = path.join(directory, file);
        mkdirSync(path.dirname(destination), { recursive: true });
        writeFileSync(destination, content);
    };
    const localize = text => {
        write(`${locales}/cs-CZ.generated.json`, JSON.stringify({ message: text }) + "\n");
        write(`${locales}/cs-CZ.json.gz`, gzipSync(text));
    };
    const commit = message => {
        git("add", "--all");
        git("commit", "--quiet", "-m", message);
        return git("rev-parse", "HEAD");
    };
    const prepare = previous => execFileSync(process.execPath, [script, previous], { cwd: directory, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

    git("init", "--quiet", "--initial-branch=main");
    git("config", "user.name", "Test");
    git("config", "user.email", "test@example.com");
    git("config", "commit.gpgsign", "false");
    git("config", "core.autocrlf", "false");
    git("config", "core.hooksPath", path.join(directory, "hooks"));
    write("source.txt", "original source\n");
    write(generatedGo, "original locales\n");
    write(`${locales}/fr-FR.generated.json`, "{}\n");
    localize("original translation");
    const base = commit("Initial files");
    git("switch", "--quiet", "-c", "localization-update");
    localize("previous translation");
    const previous = commit("Previous localization update");
    git("switch", "--quiet", "main");

    return { directory, git, write, localize, commit, prepare, base, previous };
}

test("main-only changes leave the existing localization commit unchanged", context => {
    const { git, write, localize, commit, prepare, previous } = repository(context);
    write("source.txt", "new source\n");
    commit("Advance main");
    localize("previous translation");
    const generated = commit("Generate localization");

    assert.equal(prepare(previous), previous);
    assert.equal(git("rev-parse", "HEAD"), generated);
    assert.equal(git("status", "--porcelain"), "");
});

test("new localization outputs retain the old base without bringing in main", context => {
    const { directory, git, write, localize, commit, prepare, base, previous } = repository(context);
    write(`${locales}/obsolete.generated.json`, "{}\n");
    commit("Add an obsolete locale on main");
    write("source.txt", "new source\n");
    commit("Advance main");
    localize("new translation");
    write(`${locales}/de-DE.generated.json`, '{"message":"new locale"}\n');
    write(`${locales}/de-DE.json.gz`, gzipSync("new locale"));
    write(generatedGo, "updated locales\n");
    rmSync(path.join(directory, locales, "fr-FR.generated.json"));
    const generated = commit("Generate localization");

    const selected = prepare(previous);
    assert.equal(git("rev-parse", `${selected}^`), base);
    assert.equal(git("show", `${selected}:source.txt`), "original source");
    assert.equal(git("show", `${selected}:${generatedGo}`), "updated locales");
    assert.equal(git("show", `${selected}:${locales}/de-DE.generated.json`), '{"message":"new locale"}');
    assert.equal(git("ls-tree", selected, "--", `${locales}/fr-FR.generated.json`), "");
    assert.equal(git("merge-tree", "--write-tree", `${generated}^`, selected), git("rev-parse", `${generated}^{tree}`));
    assert.equal(git("rev-parse", "HEAD"), generated);

    // Files unchanged by generation should come from main at merge time.
    assert.equal(git("ls-tree", selected, "--", `${locales}/obsolete.generated.json`), "");
});

test("conflicting localization changes fall back to the current main base", context => {
    const { git, localize, commit, prepare, previous } = repository(context);
    localize("translation changed on main");
    const main = commit("Change localization on main");
    localize("new translation");
    const generated = commit("Generate localization");

    assert.equal(prepare(previous), generated);
    assert.equal(git("rev-parse", `${generated}^`), main);
});

test("a clean merge with different generated output also refreshes the base", context => {
    const { directory, git, write, localize, commit, prepare, previous } = repository(context);
    write(`${locales}/obsolete.generated.json`, "{}\n");
    const main = commit("Add an obsolete locale on main");
    rmSync(path.join(directory, locales, "obsolete.generated.json"));
    localize("previous translation");
    const generated = commit("Generate localization");

    assert.notEqual(git("merge-tree", "--write-tree", main, previous), git("rev-parse", `${generated}^{tree}`));
    assert.equal(prepare(previous), generated);
});

test("Git errors are not treated as merge conflicts", context => {
    const { localize, commit, prepare } = repository(context);
    localize("new translation");
    commit("Generate localization");

    assert.throws(() => prepare("missing-localization-branch"), /missing-localization-branch/);
});
