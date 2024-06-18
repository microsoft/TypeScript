/// <reference path='fourslash.ts' />

// @moduleResolution: node

// @Filename: node_modules/use-query/package.json
////{
////  "name": "use-query",
////  "types": "index.d.ts"
////}
// @Filename: node_modules/use-query/index.d.ts
////declare function useQuery(): {
////  data: string[];
////};

// @Filename: node_modules/use-query/package.json
////{
////  "name": "other",
////  "types": "index.d.ts"
////}
// @Filename: node_modules/other/index.d.ts
////interface BottomSheetModalProps {
////  /**
////   * A scrollable node or normal view.
////   * @type null | (({ data: any }?) => any)
////   */
////  children: null | (({ data: any }?) => any);
////}

// @Filename: src/index.ts
////import { useQuery } from "use-query";
////const { /*1*/data } = useQuery();

verify.baselineFindAllReferences('1');
