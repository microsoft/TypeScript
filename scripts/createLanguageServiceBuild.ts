/// <reference types="node"/>
import { join } from "path";
import { readFileSync, unlinkSync } from "fs";
import { tmpdir } from "os";
import { execSync, ExecSyncOptions } from "child_process";
import chalk from "chalk";

interface PackageJson {
    name: string;
    version: string
}

const exec = (cmd: string, opts?: ExecSyncOptions) => {
    console.log(chalk.gray(`> ${cmd} ${opts ? JSON.stringify(opts) : ""}`));
    execSync(cmd, opts);
};

const step = (msg: string) => {
    console.log("\n\n" + chalk.bold("- ") + msg);
};

function main(): void {
    console.log(chalk.bold("## Creating the language services build of TypeScript"));
    process.stdout.write(chalk.grey("> node /scripts/createLanguageServiceBuild.ts"));

    // Create a tarball of the current version
    step("Packing the current TypeScript via npm.");
    exec("npm pack");

    const packageJsonValue: PackageJson = JSON.parse(readFileSync("package.json", "utf8"));
    const tarballFileName = `${packageJsonValue.name}-${packageJsonValue.version}.tgz`;

    const unzipDir = tmpdir();
    step(`Extracting the built version into a temporary folder. ${unzipDir}/package`);
    exec(`tar -xvzf ${tarballFileName} -C ${unzipDir}`);
    unlinkSync(tarballFileName);

    step(`Updating the build metadata`);
    const packagePath = join(unzipDir, "package");
    exec(`node scripts/configureLanguageServiceBuild.js ${join(packagePath, "package.json")}`);

    step(`Deploying the language service`);
    exec("npm publish --access public", { cwd: packagePath });
}

main();
