//// [tests/cases/conformance/jsx/correctlyMarkAliasAsReferences4.tsx] ////

//// [declaration.d.ts]
declare module "classnames";

//// [0.tsx]
///<reference path="declaration.d.ts" />
import * as cx from 'classnames';
import * as React from "react";

let buttonProps : {[attributeName: string]: ''}
let k = <button {...buttonProps} className={cx('class1', { class2: true })} />;

//// [0.js]
///<reference path="declaration.d.ts" />
import * as cx from 'classnames';
import * as React from "react";
let buttonProps;
let k = React.createElement("button", Object.assign({}, buttonProps, { className: cx('class1', { class2: true }) }));
