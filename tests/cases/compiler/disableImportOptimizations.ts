// @disableImportOptimizations: true

// @fileName: disableImportOptimizations1.ts
export class ClassWithSideEffect {
  static someValue = ClassWithSideEffect.initValue();

  static initValue(): string {
    console.log("We have a side-effect here!");
    return "something";
  }
}

// @fileName: disableImportOptimizations2.ts
import { ClassWithSideEffect } from "./disableImportOptimizations1"; //Import gets removed without disableImportOptimizations

export class OtherClass {
}