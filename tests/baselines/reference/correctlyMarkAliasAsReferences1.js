//// [tests/cases/conformance/jsx/correctlyMarkAliasAsReferences1.tsx] ////

//// [declaration.d.ts]
declare module "classnames";

//// [0.tsx]
///<reference path="declaration.d.ts" />
import * as cx from 'classnames';
import * as React from "react";

let buttonProps; // any
let k = <button {...buttonProps}>
            <span className={cx('class1', { class2: true })} />
        </button>;


//// [0.js]
///<reference path="declaration.d.ts" />
import * as cx from 'classnames';
import * as React from "react";
let buttonProps; // any
let k = React.createElement("button", Object.assign({}, buttonProps),
    React.createElement("span", { className: cx('class1', { class2: true }) }));
