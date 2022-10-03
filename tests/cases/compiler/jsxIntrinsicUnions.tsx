// @jsx: react
/// <reference path="/.lib/react16.d.ts" />

import * as React from "react";

const El = Math.random() ? 'h1' : 'h2';

const tag = <El className="ok" key="key">{"Title"}</El>;
