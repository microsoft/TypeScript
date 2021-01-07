// ==ORIGINAL==
/** @jsx h */
/** @jsxFrag frag */
import { h, frag } from "@foo/core";

const elem = <><div>Foo</div></>;

// ==ORGANIZED==
/** @jsx h */
/** @jsxFrag frag */
import { frag, h } from "@foo/core";

const elem = <><div>Foo</div></>;
