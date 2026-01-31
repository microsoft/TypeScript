// @target: es2017
// @jsx: react
// @moduleResolution: bundler
// @skipLibCheck: true

// @filename: declaration.d.ts
declare module "classnames";

// @filename: 0.tsx
/// <reference path="/.lib/react.d.ts" />
///<reference path="declaration.d.ts" />
import * as cx from 'classnames';
import * as React from "react";

let buttonProps : {[attributeName: string]: ''}
let k = <button {...buttonProps}>
            <span className={cx('class1', { class2: true })} />
        </button>;
