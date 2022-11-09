import { exec, Debouncer } from "./utils.mjs";
import { resolve } from "path";
import { findUpRoot } from "./findUpDir.mjs";
import assert from "assert";

class ProjectQueue {
    /**
     * @param {(projects: string[], lkg: boolean, force: boolean) => Promise<any>} action
     */
    constructor(action) {
        /** @type {{ lkg: boolean, force: boolean, projects?: string[], debouncer: Debouncer }[]} */
        this._debouncers = [];
        this._action = action;
    }

    /**
     * @param {string} project
     * @param {{ lkg?: boolean; force?: boolean; }} options
     */
    enqueue(project, { lkg = true, force = false } = {}) {
        let entry = this._debouncers.find(entry => entry.lkg === lkg && entry.force === force);
        if (!entry) {
            const debouncer = new Debouncer(100, async () => {
                assert(entry);
                const projects = entry.projects;
                if (projects) {
                    entry.projects = undefined;
                    await this._action(projects, lkg, force);
                }
            });
            this._debouncers.push(entry = { lkg, force, debouncer });
        }
        if (!entry.projects) entry.projects = [];
        entry.projects.push(project);
        return entry.debouncer.enqueue();
    }
}

const execTsc = (/** @type {boolean} */ lkg, /** @type {string[]} */ ...args) =>
    exec(process.execPath,
         [resolve(findUpRoot(), lkg ? "./lib/tsc" : "./built/local/tsc"),
          "-b", ...args],
         { hidePrompt: true });

const projectBuilder = new ProjectQueue((projects, lkg, force) => execTsc(lkg, ...(force ? ["--force"] : []), ...projects));

/**
 * @param {string} project
 * @param {object} options
 * @param {boolean} [options.lkg=true]
 * @param {boolean} [options.force=false]
 */
export const buildProject = (project, { lkg, force } = {}) => projectBuilder.enqueue(project, { lkg, force });

const projectCleaner = new ProjectQueue((projects, lkg) => execTsc(lkg, "--clean", ...projects));

/**
 * @param {string} project
 */
 export const cleanProject = (project) => projectCleaner.enqueue(project);

const projectWatcher = new ProjectQueue((projects) => execTsc(/*lkg*/ true, "--watch", ...projects));

/**
 * @param {string} project
 * @param {object} options
 * @param {boolean} [options.lkg=true]
 */
export const watchProject = (project, { lkg } = {}) => projectWatcher.enqueue(project, { lkg });
