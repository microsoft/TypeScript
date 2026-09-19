// @strict: true
// @noEmit: true
// @target: esnext
// @checkJs: true
// @filename: file.js

// Adapted from ts-error-deltas repos

/**
 * @template T
 * @template A
 * @template R1
 * @template B
 * @template R2
 * @typedef {T extends A ? R1 : T extends B ? R2 : never} HelperCond
 */

/**
 * @typedef IMessage
 * @property {string} [html]
 * @property {Object[]} [tokens]
 */

class NewKatex {
    /**
     * @param {string} s
     * @returns {string}
     */
    render(s) {
        return "";
    }

    /**
     * @template {string | IMessage} T
     * @param {T} message
     * @returns {T extends string ? string : T extends IMessage ? IMessage : never}
     */
    renderMessage(message) {
        if (typeof message === 'string') {
            return this.render(message); // Ok
        }

        if (!message.html?.trim()) {
            return message; // Ok
        }

        if (!message.tokens) {
            message.tokens = [];
        }

        message.html = this.render(message.html);
        return message; // Ok
    }
}

/**
 * @template {true | false} T
 * @param {{ dollarSyntax: boolean; parenthesisSyntax: boolean; }} options
 * @param {T} _isMessage
 * @returns {T extends true ? (message: IMessage) => IMessage : T extends false ? (message: string) => string : never}
 */
function createKatexMessageRendering(options, _isMessage) {
    const instance = new NewKatex();
    if (_isMessage) {
        return (/** @type {IMessage} */ message) => instance.renderMessage(message); // Ok
    }
    return (/** @type {string} */ message) => instance.renderMessage(message); // Ok
}

// File: Rocket.Chat/apps/meteor/app/settings/lib/settings.ts

/**
 * @typedef {Record<any, any>} MyObj
 */


/**
 * @typedef {MyObj} SettingValue
 */
 
/**
 * @template {SettingValue} T
 * @typedef {Object} SettingComposedValue
 * @property {string} key
 * @property {SettingValue} value
 */

/**
 * @callback SettingCallback
 * @param {string} key
 * @param {SettingValue} value
 * @param {boolean} [initialLoad]
 * @returns {void}
 */

/** @type {{ settings: { [s: string]: any } }} */
const Meteor = /** @type {any} */ (undefined);
/** @type {{ isRegExp(x: unknown): x is RegExp; }} */
const _ = /** @type {any} */ (undefined);

/**
 * @param {RegExp} x
 * @returns {void}
 */
function takesRegExp(x) {
    return /** @type {any} */ undefined;
}
/**
 * @param {string} x
 * @returns {void}
 */
function takesString(x) {
    return /** @type {any} */ undefined;
}

/**
 * @class NewSettingsBase
 */
class NewSettingsBase {
    /**
     * @template {SettingCallback | undefined} C
     * @template {string | RegExp} I
     * @template {SettingValue} T
     * @param {I} _id
     * @param {C} [callback]
     * @returns {HelperCond<C, SettingCallback, void, undefined, HelperCond<I, string, T | undefined, RegExp, SettingComposedValue<T>[]>>}
     */
    newGet(_id, callback) {
        if (callback !== undefined) {
            if (!Meteor.settings) {
                return; // Ok
            }
            if (_id === '*') {
                return Object.keys(Meteor.settings).forEach((key) => {
                    const value = Meteor.settings[key];
                    callback(key, value);
                });
            }
            if (_.isRegExp(_id) && Meteor.settings) {
                return Object.keys(Meteor.settings).forEach((key) => {
                    if (!_id.test(key)) {
                        return;
                    }
                    const value = Meteor.settings[key];
                    callback(key, value);
                });
            }

            if (typeof _id === 'string') {
                const value = Meteor.settings[_id];
                if (value != null) {
                    callback(_id, Meteor.settings[_id]);
                }
                return; // Ok
            }

            return; // Ok, needed for exhaustiveness check
        }

        if (!Meteor.settings) {
            return undefined; // Error
        }

        if (_.isRegExp(_id)) {
            return Object.keys(Meteor.settings).reduce((/** @type {SettingComposedValue<T>[]} */ items, key) => {
                const value = Meteor.settings[key];
                if (_id.test(key)) {
                    items.push({ key, value });
                }
                return items;
            }, []); // Ok
        }

        return Meteor.settings?.[_id]; // Error
    }
}

// File: Rocket.Chat/apps/meteor/app/ui-utils/client/lib/messageBox.ts

/**
 * @typedef {MyObj} MessageBoxAction
 */

/**
 * @template {string | undefined} T
 * @param {T} group
 * @returns {HelperCond<T, string, MessageBoxAction[], undefined, Record<string, MessageBoxAction[]>>}
 */
function getWithBug(group) {
    if (!group) {
        return /** @type {Record<string, MessageBoxAction[]>} */({}); // Error
    }
    return /** @type {MessageBoxAction[]} */([]); // Ok
}

/**
 * @template {string | undefined} T
 * @param {T} group
 * @returns {HelperCond<T, string, MessageBoxAction[], undefined, Record<string, MessageBoxAction[]>>}
 */
function getWithoutBug(group) {
    if (group === undefined) {
        return /** @type {Record<string, MessageBoxAction[]>} */({}); // Ok
    }
    return /** @type {MessageBoxAction[]} */([]); // Ok
}

// File: Rocket.Chat/apps/meteor/ee/server/lib/engagementDashboard/date.ts

/**
 * @param {string} x
 * @returns {Date}
 */
function mapDateForAPI(x) {
    return /** @type {any} */ (undefined);
}

/**
 * @template {string | undefined} T
 * @param {string} start
 * @param {T} [end]
 * @returns {HelperCond<T, string, { start: Date, end: Date }, undefined, { start: Date, end: undefined }>}
 */
function transformDatesForAPI(start, end) {
    return end !== undefined ?
        {
            start: mapDateForAPI(start),
            end: mapDateForAPI(end),
        } :
        {
            start: mapDateForAPI(start),
            end: undefined
        };
}

// File: Rocket.Chat/packages/agenda/src/Agenda.ts

/**
 * @typedef {MyObj} RepeatOptions
 */

/**
 * @typedef {MyObj} Job
 */

/**
 * @typedef {Object} IJob
 * @property {MyObj} data
 */
class NewAgenda {
    /**
     * @param {string | number} interval
     * @param {string} name
     * @param {IJob['data']} data
     * @param {RepeatOptions} options
     * @returns {Promise<Job>}
     */
    async _createIntervalJob(interval, name, data, options) {
        return /** @type {any} */ (undefined);
    }

    /**
     * @param {string | number} interval
     * @param {string[]} names
     * @param {IJob['data']} data
     * @param {RepeatOptions} options
     * @returns {Promise<Job[]> | undefined}
     */
    _createIntervalJobs(interval, names, data, options) {
        return undefined;
    }

    /**
     * @template {string | string[]} T
     * @param {string | number} interval
     * @param {T} name
     * @param {IJob['data']} data
     * @param {RepeatOptions} options
     * @returns {Promise<HelperCond<T, string, Job, string[], Job[] | undefined>>}
     */
    async newEvery(interval, name, data, options) {
        if (typeof name === 'string') {
            return this._createIntervalJob(interval, name, data, options); // Ok
        }

        if (Array.isArray(name)) {
            return this._createIntervalJobs(interval, name, data, options); // Ok
        }

        throw new Error('Unexpected error: Invalid job name(s)');
    }
}

// File: angular/packages/common/src/pipes/case_conversion_pipes.ts

/**
 * @template {string | null | undefined} T
 * @param {T} value
 * @returns {HelperCond<T, string, string, null | undefined, null>}
 */
function transform1(value) {
    if (value == null) return null; // Ok
    if (typeof value !== 'string') {
        throw new Error();
    }
    return value.toLowerCase(); // Ok
}
