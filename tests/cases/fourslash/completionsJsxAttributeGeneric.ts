/// <reference path="fourslash.ts" />

// @Filename: /a.tsx
////declare const React: any;
////declare function CustomComponent<T>(props: { name: string }): JSX.Element;
////const element1 = <CustomComponent<string> /*1*/></CustomComponent>;
////const element2 = <CustomComponent<string> /*2*/ />;

['1', '2'].forEach(marker => 
  verify.completions({
    marker,
    exact: [{
      name: 'name',
      kind: 'property',
      kindModifiers: 'declare'
    }]
  })
);
