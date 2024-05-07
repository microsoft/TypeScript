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
var taskGroups = {
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
var taskNameToGroup = {};
module.exports = {
    taskGroups: taskGroups,
    taskNameToGroup: taskNameToGroup,
};
//// [index.js]
var _a = require('./module.js'), taskGroups = _a.taskGroups, taskNameToGroup = _a.taskNameToGroup;
/** @typedef {import('./module.js').TaskGroup} TaskGroup */
/**
 * @typedef TaskNode
 * @prop {TaskNode[]} children
 * @prop {TaskNode|undefined} parent
 * @prop {TaskGroup} group
 */
/** @typedef {{timers: Map<string, TaskNode>}} PriorTaskData */
var MainThreadTasks = /** @class */ (function () {
    /**
     * @param {TaskGroup} x
     * @param {TaskNode} y
     */
    function MainThreadTasks(x, y) {
    }
    return MainThreadTasks;
}());
module.exports = MainThreadTasks;


//// [module.d.ts]
export type TaskGroupIds = "parseHTML" | "styleLayout";
export type TaskGroup = {
    id: TaskGroupIds;
    label: string;
    traceEventNames: string[];
};
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
export const taskGroups: { [P in TaskGroupIds]: {
    id: P;
    label: string;
}; };
/** @type {Object<string, TaskGroup>} */
export const taskNameToGroup: {
    [x: string]: TaskGroup;
};
//// [index.d.ts]
export = MainThreadTasks;
/** @typedef {import('./module.js').TaskGroup} TaskGroup */
/**
 * @typedef TaskNode
 * @prop {TaskNode[]} children
 * @prop {TaskNode|undefined} parent
 * @prop {TaskGroup} group
 */
/** @typedef {{timers: Map<string, TaskNode>}} PriorTaskData */
declare class MainThreadTasks {
    /**
     * @param {TaskGroup} x
     * @param {TaskNode} y
     */
    constructor(x: TaskGroup, y: TaskNode);
}
declare namespace MainThreadTasks {
    export { TaskGroup, TaskNode, PriorTaskData };
}
type TaskGroup = import("./module.js").TaskGroup;
type TaskNode = {
    children: TaskNode[];
    parent: TaskNode | undefined;
    group: TaskGroup;
};
type PriorTaskData = {
    timers: Map<string, TaskNode>;
};
