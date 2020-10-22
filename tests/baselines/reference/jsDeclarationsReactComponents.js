//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsReactComponents.ts] ////

//// [jsDeclarationsReactComponents1.jsx]
/// <reference path="/.lib/react16.d.ts" />
import React from "react";
import PropTypes from "prop-types"

const TabbedShowLayout = ({
}) => {
    return (
        <div />
    );
};

TabbedShowLayout.propTypes = {
    version: PropTypes.number,

};

TabbedShowLayout.defaultProps = {
    tabs: undefined
};

export default TabbedShowLayout;

//// [jsDeclarationsReactComponents2.jsx]
import React from "react";
/**
 * @type {React.SFC}
 */
const TabbedShowLayout = () => {
    return (
        <div className="" key="">
            ok
        </div>
    );
};

TabbedShowLayout.defaultProps = {
    tabs: "default value"
};

export default TabbedShowLayout;

//// [jsDeclarationsReactComponents3.jsx]
import React from "react";
/**
 * @type {{defaultProps: {tabs: string}} & ((props?: {elem: string}) => JSX.Element)}
 */
const TabbedShowLayout = () => {
    return (
        <div className="" key="">
            ok
        </div>
    );
};

TabbedShowLayout.defaultProps = {
    tabs: "default value"
};

export default TabbedShowLayout;

//// [jsDeclarationsReactComponents4.jsx]
import React from "react";
const TabbedShowLayout = (/** @type {{className: string}}*/prop) => {
    return (
        <div className={prop.className} key="">
            ok
        </div>
    );
};

TabbedShowLayout.defaultProps = {
    tabs: "default value"
};

export default TabbedShowLayout;
//// [jsDeclarationsReactComponents5.jsx]
import React from 'react';
import PropTypes from 'prop-types';

function Tree({ allowDropOnRoot }) {
  return <div />
}

Tree.propTypes = {
    classes: PropTypes.object,
};

Tree.defaultProps = {
    classes: {},
    parentSource: 'parent_id',
};

export default Tree;

//// [jsDeclarationsReactComponents1.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var TabbedShowLayout = function (_a) {
    return (react_1.default.createElement("div", null));
};
TabbedShowLayout.propTypes = {
    version: prop_types_1.default.number,
};
TabbedShowLayout.defaultProps = {
    tabs: undefined
};
exports.default = TabbedShowLayout;
//// [jsDeclarationsReactComponents2.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
/**
 * @type {React.SFC}
 */
var TabbedShowLayout = function () {
    return (react_1.default.createElement("div", { className: "", key: "" }, "ok"));
};
TabbedShowLayout.defaultProps = {
    tabs: "default value"
};
exports.default = TabbedShowLayout;
//// [jsDeclarationsReactComponents3.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
/**
 * @type {{defaultProps: {tabs: string}} & ((props?: {elem: string}) => JSX.Element)}
 */
var TabbedShowLayout = function () {
    return (react_1.default.createElement("div", { className: "", key: "" }, "ok"));
};
TabbedShowLayout.defaultProps = {
    tabs: "default value"
};
exports.default = TabbedShowLayout;
//// [jsDeclarationsReactComponents4.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var TabbedShowLayout = function (/** @type {{className: string}}*/ prop) {
    return (react_1.default.createElement("div", { className: prop.className, key: "" }, "ok"));
};
TabbedShowLayout.defaultProps = {
    tabs: "default value"
};
exports.default = TabbedShowLayout;
//// [jsDeclarationsReactComponents5.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
function Tree(_a) {
    var allowDropOnRoot = _a.allowDropOnRoot;
    return react_1.default.createElement("div", null);
}
Tree.propTypes = {
    classes: prop_types_1.default.object,
};
Tree.defaultProps = {
    classes: {},
    parentSource: 'parent_id',
};
exports.default = Tree;


//// [jsDeclarationsReactComponents1.d.ts]
/// <reference path="../..react16.d.ts" />
export default TabbedShowLayout;
declare function TabbedShowLayout({}: {}): JSX.Element;
declare namespace TabbedShowLayout {
    namespace propTypes {
        const version: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        const tabs: undefined;
    }
}
import PropTypes from "prop-types";
//// [jsDeclarationsReactComponents2.d.ts]
/// <reference path="../..react16.d.ts" />
export default TabbedShowLayout;
/**
 * @type {React.SFC}
 */
declare const TabbedShowLayout: React.SFC;
import React from "react";
//// [jsDeclarationsReactComponents3.d.ts]
export default TabbedShowLayout;
/**
 * @type {{defaultProps: {tabs: string}} & ((props?: {elem: string}) => JSX.Element)}
 */
declare const TabbedShowLayout: {
    defaultProps: {
        tabs: string;
    };
} & ((props?: {
    elem: string;
} | undefined) => JSX.Element);
//// [jsDeclarationsReactComponents4.d.ts]
export default TabbedShowLayout;
declare function TabbedShowLayout(prop: {
    className: string;
}): JSX.Element;
declare namespace TabbedShowLayout {
    namespace defaultProps {
        const tabs: string;
    }
}
//// [jsDeclarationsReactComponents5.d.ts]
/// <reference path="../..react16.d.ts" />
export default Tree;
declare function Tree({ allowDropOnRoot }: {
    allowDropOnRoot: any;
}): JSX.Element;
declare namespace Tree {
    namespace propTypes {
        const classes: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        const classes_1: {};
        export { classes_1 as classes };
        export const parentSource: string;
    }
}
import PropTypes from "prop-types";
