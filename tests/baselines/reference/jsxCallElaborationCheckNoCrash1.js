//// [jsxCallElaborationCheckNoCrash1.tsx]
/// <reference path="/.lib/react16.d.ts" />

import * as React from "react";

type Tags = "span" | "div";

export const Hoc = <Tag extends Tags>(
   TagElement: Tag,
): React.SFC => {
   const Component = () => <TagElement />;
   return Component;
};


//// [jsxCallElaborationCheckNoCrash1.js]
"use strict";
/// <reference path="react16.d.ts" />
exports.__esModule = true;
exports.Hoc = void 0;
var React = require("react");
var Hoc = function (TagElement) {
    var Component = function () { return React.createElement(TagElement, null); };
    return Component;
};
exports.Hoc = Hoc;
