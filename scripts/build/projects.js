// @ts-check
const { exec, Debouncer } = require("./utils");

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
     * @param {object} options
     */
    enqueue(project, { lkg = true, force = false } = {}) {
        let entry = this._debouncers.find(entry => entry.lkg === lkg && entry.force === force);
        if (!entry) {
            const debouncer = new Debouncer(100, async () => {
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

const projectBuilder = new ProjectQueue((projects, lkg, force) => exec(process.execPath, [lkg ? "./lib/tsc" : "./built/local/tsc", "-b", ...(force ? ["--force"] : []), ...projects], { hidePrompt: true }));

/**
 * @param {string} project
 * @param {object} [options]
 * @param {boolean} [options.lkg=true]
 * @param {boolean} [options.force=false]
 */
exports.buildProject = (project, { lkg, force } = {}) => projectBuilder.enqueue(project, { lkg, force });

const projectCleaner = new ProjectQueue((projects, lkg) => exec(process.execPath, [lkg ? "./lib/tsc" : "./built/local/tsc", "-b", "--clean", ...projects], { hidePrompt: true }));

/**
 * @param {string} project
 */
exports.cleanProject = (project) => projectCleaner.enqueue(project);

const projectWatcher = new ProjectQueue((projects) => exec(process.execPath, ["./lib/tsc", "-b", "--watch", ...projects], { hidePrompt: true }));

/**
 * @param {string} project
 * @param {object} [options]
 * @param {boolean} [options.lkg=true]
 */
exports.watchProject = (project, { lkg } = {}) => projectWatcher.enqueue(project, { lkg });
