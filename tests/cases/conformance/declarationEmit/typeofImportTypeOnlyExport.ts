// @declaration: true
// @isolatedDeclarationFixedDiffReason: Sourcemap is more detailed

// @Filename: button.ts
import {classMap} from './lit.js';
export const c = classMap();

// @Filename: lit.ts
class ClassMapDirective {}

export type {ClassMapDirective};

export const directive =
  <C>(class_: C) =>
  () => ({
    directive: class_,
  });

export const classMap = directive(ClassMapDirective);
