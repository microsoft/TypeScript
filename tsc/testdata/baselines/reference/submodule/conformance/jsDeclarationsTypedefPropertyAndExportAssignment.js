//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsTypedefPropertyAndExportAssignment.ts] ////

//// [module.js]
/** @typedef {'parseHTML'|'styleLayout'} TaskGroupIds */

/**
 * @typedef TaskGroup
 * @property {TaskGroupIds} id
 * @property {string} label
 * @property {string[]} traceEventNames
 */

/**
 * @type {{[P in TaskGroupIds]: {id: P, label: string}}}
 */
const taskGroups = {
    parseHTML: {
        id: 'parseHTML',
        label: 'Parse HTML & CSS'
    },
    styleLayout: {
        id: 'styleLayout',
        label: 'Style & Layout'
    },
}

/** @type {Object<string, TaskGroup>} */
const taskNameToGroup = {};

module.exports = {
    taskGroups,
    taskNameToGroup,
};
//// [index.js]
const {taskGroups, taskNameToGroup} = require('./module.js');

/** @typedef {import('./module.js').TaskGroup} TaskGroup */

/**
 * @typedef TaskNode
 * @prop {TaskNode[]} children
 * @prop {TaskNode|undefined} parent
 * @prop {TaskGroup} group
 */

/** @typedef {{timers: Map<string, TaskNode>}} PriorTaskData */
class MainThreadTasks {
    /**
     * @param {TaskGroup} x
     * @param {TaskNode} y
     */
    constructor(x, y){}
}

module.exports = MainThreadTasks;

//// [module.js]
"use strict";
/** @typedef {'parseHTML'|'styleLayout'} TaskGroupIds */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef TaskGroup
 * @property {TaskGroupIds} id
 * @property {string} label
 * @property {string[]} traceEventNames
 */
/**
 * @type {{[P in TaskGroupIds]: {id: P, label: string}}}
 */
const taskGroups = {
    parseHTML: {
        id: 'parseHTML',
        label: 'Parse HTML & CSS'
    },
    styleLayout: {
        id: 'styleLayout',
        label: 'Style & Layout'
    },
};
/** @type {Object<string, TaskGroup>} */
const taskNameToGroup = {};
module.exports = {
    taskGroups,
    taskNameToGroup,
};
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { taskGroups, taskNameToGroup } = require('./module.js');
/** @typedef {import('./module.js').TaskGroup} TaskGroup */
/**
 * @typedef TaskNode
 * @prop {TaskNode[]} children
 * @prop {TaskNode|undefined} parent
 * @prop {TaskGroup} group
 */
/** @typedef {{timers: Map<string, TaskNode>}} PriorTaskData */
class MainThreadTasks {
    /**
     * @param {TaskGroup} x
     * @param {TaskNode} y
     */
    constructor(x, y) { }
}
export = MainThreadTasks;
module.exports = MainThreadTasks;


//// [module.d.ts]
/** @typedef {'parseHTML'|'styleLayout'} TaskGroupIds */
export type TaskGroupIds = 'parseHTML' | 'styleLayout';
export type TaskGroup = {
    id: TaskGroupIds;
    label: string;
    traceEventNames: string[];
};
declare const _default: {
    taskGroups: {
        parseHTML: {
            id: "parseHTML";
            label: string;
        };
        styleLayout: {
            id: "styleLayout";
            label: string;
        };
    };
    taskNameToGroup: any;
};
export = _default;
//// [index.d.ts]
export type TaskGroup = import('./module.js').TaskGroup;
export type TaskNode = {
    children: TaskNode[];
    parent: TaskNode | undefined;
    group: TaskGroup;
};
export type PriorTaskData = {
    timers: Map<string, TaskNode>;
};
export = MainThreadTasks;
