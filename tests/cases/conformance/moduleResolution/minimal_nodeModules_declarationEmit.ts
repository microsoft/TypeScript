// @moduleResolution: minimal
// @declaration: true

// @Filename: /node_modules/foo/module.d.ts
export declare class SomeExportedClass {
  private foo: any;
}

declare global {
  function returnsPrivateClassOhNo(): SomeExportedClass;
}

// @Filename: /main.ts
export const boom = returnsPrivateClassOhNo();
