//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsReactComponents.ts] ////

//// [jsDeclarationsReactComponents1.jsx]
/// <reference path="/.lib/react16.d.ts" preserve="true" />
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
/// <reference path="/.lib/react16.d.ts" preserve="true" />
import React from "react";
import PropTypes from "prop-types";
const TabbedShowLayout = ({}) => {
    return (React.createElement("div", null));
};
TabbedShowLayout.propTypes = {
    version: PropTypes.number,
};
TabbedShowLayout.defaultProps = {
    tabs: undefined
};
export default TabbedShowLayout;
//// [jsDeclarationsReactComponents2.js]
import React from "react";
/**
 * @type {React.SFC}
 */
const TabbedShowLayout = () => {
    return (React.createElement("div", { className: "", key: "" }, "ok"));
};
TabbedShowLayout.defaultProps = {
    tabs: "default value"
};
export default TabbedShowLayout;
//// [jsDeclarationsReactComponents3.js]
import React from "react";
/**
 * @type {{defaultProps: {tabs: string}} & ((props?: {elem: string}) => JSX.Element)}
 */
const TabbedShowLayout = () => {
    return (React.createElement("div", { className: "", key: "" }, "ok"));
};
TabbedShowLayout.defaultProps = {
    tabs: "default value"
};
export default TabbedShowLayout;
//// [jsDeclarationsReactComponents4.js]
import React from "react";
const TabbedShowLayout = (/** @type {{className: string}}*/ prop) => {
    return (React.createElement("div", { className: prop.className, key: "" }, "ok"));
};
TabbedShowLayout.defaultProps = {
    tabs: "default value"
};
export default TabbedShowLayout;
//// [jsDeclarationsReactComponents5.js]
import React from 'react';
import PropTypes from 'prop-types';
function Tree({ allowDropOnRoot }) {
    return React.createElement("div", null);
}
Tree.propTypes = {
    classes: PropTypes.object,
};
Tree.defaultProps = {
    classes: {},
    parentSource: 'parent_id',
};
export default Tree;


//// [jsDeclarationsReactComponents1.d.ts]
/// <reference path="../../.lib/react16.d.ts" preserve="true" />
export default TabbedShowLayout;
declare function TabbedShowLayout({}: {}): JSX.Element;
declare namespace TabbedShowLayout {
    namespace propTypes {
        let version: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        let tabs: undefined;
    }
}
import PropTypes from "prop-types";
//// [jsDeclarationsReactComponents2.d.ts]
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
}) => JSX.Element);
//// [jsDeclarationsReactComponents4.d.ts]
export default TabbedShowLayout;
declare function TabbedShowLayout(prop: {
    className: string;
}): JSX.Element;
declare namespace TabbedShowLayout {
    namespace defaultProps {
        let tabs: string;
    }
}
//// [jsDeclarationsReactComponents5.d.ts]
export default Tree;
declare function Tree({ allowDropOnRoot }: {
    allowDropOnRoot: any;
}): JSX.Element;
declare namespace Tree {
    namespace propTypes {
        let classes: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        let classes_1: {};
        export { classes_1 as classes };
        export let parentSource: string;
    }
}
import PropTypes from 'prop-types';
