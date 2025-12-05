// @strict: true
// @noEmit: true

type TLArrowShape = {
  type: "arrow";
  id: string;
  x: number;
  y: number;
  props: {
    dir: 1 | -1;
  };
};

type NodeShape = {
  type: "node";
  id: string;
  x: number;
  y: number;
  props: {
    nodeType: string;
  };
};

type TLShape = TLArrowShape | NodeShape;

export type TLShapePartial<T extends TLShape = TLShape> = T extends T
  ? {
      id: string;
      type: T["type"];
      props?: Partial<T["props"]>;
    } & Partial<Omit<T, "type" | "id" | "props">>
  : never;

declare class Editor {
  updateShape<T extends TLShape = TLShape>(
    partial: TLShapePartial<T> | null | undefined,
  ): T;
}

declare const x: number;
declare const y: number;
declare const editor: Editor;

declare const node1: NodeShape;
const node2 = editor.updateShape({ ...node1, x, y });

declare const shape1: TLShape;
const shape2 = editor.updateShape({ ...shape1, x, y });
