// @jsx: react
/// <reference path="/.lib/react16.d.ts" />

import * as React from "react";

type Tags = "span" | "div";

export const Hoc = <Tag extends Tags>(
   TagElement: Tag,
): React.SFC => {
   const Component = () => <TagElement />;
   return Component;
};
