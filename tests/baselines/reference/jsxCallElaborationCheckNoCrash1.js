//// [tests/cases/compiler/jsxCallElaborationCheckNoCrash1.tsx] ////

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
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";
export const Hoc = (TagElement) => {
    const Component = () => React.createElement(TagElement, null);
    return Component;
};
