/// <reference path='fourslash.ts' />

////function _uniteVertices<p extends string, a>(
////    minority: Pinned<p, Vertex<a>>,
////    majorityCounter: number,
////    majority: Pinned<p, Vertex<a>>
////): {
////   /*start*/
////        majorityCounter: number;
////        vertecis: Pinned<p, {
////            oldVertexId: VertexId;
////            vertex: Vertex<a>;
////        }>;
////    /*end*/
////    } {
////}

format.document();
verify.currentFileContentIs(`function _uniteVertices<p extends string, a>(
    minority: Pinned<p, Vertex<a>>,
    majorityCounter: number,
    majority: Pinned<p, Vertex<a>>
): {

    majorityCounter: number;
    vertecis: Pinned<p, {
        oldVertexId: VertexId;
        vertex: Vertex<a>;
    }>;

} {
}`);

goTo.marker("start");
verify.indentationIs(4);
goTo.marker("end");
verify.indentationIs(4);