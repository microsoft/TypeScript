// @target: esnext

// @Filename: framework-hooks.ts
export const onInit = Symbol("onInit");

// @Filename: component.ts
import type { onInit } from "./framework-hooks";

interface Component {
  [onInit]?(): void;
}
