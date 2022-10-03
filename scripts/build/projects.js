// @ts-check
const { exec, Debouncer } = require("./utils");
const { resolve } = require("path");
const { findUpRoot } = require("./findUpDir");
const cmdLineOptions = require("./options");

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

const projectBuilder = new ProjectQueue((projects) => execTsc(...projects));

/**
 * @param {string} project
 */
exports.buildProject = (project) => projectBuilder.enqueue(project);

const projectCleaner = new ProjectQueue((projects) => execTsc("--clean", ...projects));

/**
 * @param {string} project
 */
exports.cleanProject = (project) => projectCleaner.enqueue(project);

const projectWatcher = new ProjectQueue((projects) => execTsc("--watch", ...projects));

/**
 * @param {string} project
 */
exports.watchProject = (project) => projectWatcher.enqueue(project);
