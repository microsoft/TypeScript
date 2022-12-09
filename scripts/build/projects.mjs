import { Debouncer, exec } from "./utils.mjs";
import { resolve } from "path";
import { findUpRoot } from "./findUpDir.mjs";
import cmdLineOptions from "./options.mjs";

class ProjectQueue {
    /**
     * @param {(projects: string[]) => Promise<any>} action
     */
    constructor(action) {
        /** @type {string[] | undefined} */
        this._projects = undefined;
        this._debouncer = new Debouncer(100, async () => {
            const projects = this._projects;
            if (projects) {
                this._projects = undefined;
                await action(projects);
            }
        });
    }

    /**
     * @param {string} project
     */
    enqueue(project) {
        if (!this._projects) this._projects = [];
        this._projects.push(project);
        return this._debouncer.enqueue();
    }
}

const execTsc = (/** @type {string[]} */ ...args) =>
    exec(process.execPath,
         [resolve(findUpRoot(), cmdLineOptions.lkg ? "./lib/tsc.js" : "./built/local/tsc.js"),
          "-b", ...args],
         { hidePrompt: true });

const projectBuilder = new ProjectQueue((projects) => execTsc(...(cmdLineOptions.bundle ? [] : ["--emitDeclarationOnly", "false"]), ...projects));

/**
 * @param {string} project
 */
export const buildProject = (project) => projectBuilder.enqueue(project);

const projectCleaner = new ProjectQueue((projects) => execTsc("--clean", ...projects));

/**
 * @param {string} project
 */
 export const cleanProject = (project) => projectCleaner.enqueue(project);

const projectWatcher = new ProjectQueue((projects) => execTsc("--watch", "--preserveWatchOutput", ...projects));

/**
 * @param {string} project
 */
export const watchProject = (project) => projectWatcher.enqueue(project);
