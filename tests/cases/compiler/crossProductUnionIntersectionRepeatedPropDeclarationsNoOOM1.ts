// @strict: true
// @noEmit: true

type JsonPrimitive = boolean | null | number | string;
type JsonArray = JsonValue[];
type JsonValue = JsonArray | JsonObject | JsonPrimitive;
interface JsonObject {
  [key: string]: JsonValue | undefined;
}
type IndexKey = string & {
  __brand: "indexKey";
};

interface TLBaseAsset<Type extends string, Props>
  extends BaseRecord<"asset", TLAssetId> {
  type: Type;
  props: Props;
  meta: JsonObject;
}
type TLAssetId = RecordId<TLBaseAsset<any, any>>;

interface VecModel {
  x: number;
  y: number;
  z?: number;
}

interface TLShapeCrop {
  topLeft: VecModel;
  bottomRight: VecModel;
  isCircle?: boolean;
}

type TLRichText = {
  attrs?: any;
  content: unknown[];
  type: string;
};

type TLDefaultColorStyle =
  | "black"
  | "blue"
  | "green"
  | "grey"
  | "light-blue"
  | "light-green"
  | "light-red"
  | "light-violet"
  | "orange"
  | "red"
  | "violet"
  | "white"
  | "yellow";
type TLDefaultFillStyle =
  | "fill"
  | "lined-fill"
  | "none"
  | "pattern"
  | "semi"
  | "solid";
type TLDefaultDashStyle = "solid" | "draw" | "dashed" | "dotted";
type TLDefaultSizeStyle = "l" | "m" | "s" | "xl";
type TLLineShapeSplineStyle = "line" | "cubic";
type TLDefaultFontStyle = "draw" | "mono" | "sans" | "serif";
type TLDefaultHorizontalAlignStyle =
  | "end-legacy"
  | "end"
  | "middle-legacy"
  | "middle"
  | "start-legacy"
  | "start";
type TLDefaultVerticalAlignStyle = "end" | "middle" | "start";
type TLDefaultTextAlignStyle = "end" | "middle" | "start";
type TLArrowShapeKind = "arc" | "elbow";
type TLArrowShapeArrowheadStyle =
  | "arrow"
  | "bar"
  | "diamond"
  | "dot"
  | "inverted"
  | "none"
  | "pipe"
  | "square"
  | "triangle";
type TLGeoShapeGeoStyle =
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "arrow-up"
  | "check-box"
  | "cloud"
  | "diamond"
  | "ellipse"
  | "heart"
  | "hexagon"
  | "octagon"
  | "oval"
  | "pentagon"
  | "rectangle"
  | "rhombus"
  | "rhombus-2"
  | "star"
  | "trapezoid"
  | "triangle"
  | "x-box";
type TLOpacityType = number;
type TLPageId = RecordId<TLPage>;
type TLParentId = TLPageId | TLShapeId;
interface TLPage extends BaseRecord<"page", TLPageId> {
  name: string;
  index: IndexKey;
  meta: JsonObject;
}

interface TLLineShapePoint {
  id: string;
  index: IndexKey;
  x: number;
  y: number;
}

interface TLGlobalShapePropsMap {}

interface TLBaseShape<Type extends string, Props extends object> {
  readonly id: TLShapeId;
  readonly typeName: "shape";
  type: Type;
  x: number;
  y: number;
  rotation: number;
  index: IndexKey;
  parentId: TLParentId;
  isLocked: boolean;
  opacity: TLOpacityType;
  props: Props;
  meta: JsonObject;
}

interface TLArrowShapeProps {
  kind: TLArrowShapeKind;
  labelColor: TLDefaultColorStyle;
  color: TLDefaultColorStyle;
  fill: TLDefaultFillStyle;
  dash: TLDefaultDashStyle;
  size: TLDefaultSizeStyle;
  arrowheadStart: TLArrowShapeArrowheadStyle;
  arrowheadEnd: TLArrowShapeArrowheadStyle;
  font: TLDefaultFontStyle;
  start: VecModel;
  end: VecModel;
  bend: number;
  richText: TLRichText;
  labelPosition: number;
  scale: number;
  elbowMidPoint: number;
}
type TLArrowShape = TLBaseShape<"arrow", TLArrowShapeProps>;

interface TLBookmarkShapeProps {
  w: number;
  h: number;
  assetId: TLAssetId | null;
  url: string;
}

type TLBookmarkShape = TLBaseShape<"bookmark", TLBookmarkShapeProps>;

export interface TLDrawShapeProps {
  color: TLDefaultColorStyle;
  fill: TLDefaultFillStyle;
  dash: TLDefaultDashStyle;
  size: TLDefaultSizeStyle;
  segments: TLDrawShapeSegment[];
  isComplete: boolean;
  isClosed: boolean;
  isPen: boolean;
  scale: number;
  scaleX: number;
  scaleY: number;
}

type TLDrawShape = TLBaseShape<"draw", TLDrawShapeProps>;

interface TLEmbedShapeProps {
  w: number;
  h: number;
  url: string;
}

type TLEmbedShape = TLBaseShape<"embed", TLEmbedShapeProps>;

interface TLFrameShapeProps {
  w: number;
  h: number;
  name: string;
  color: TLDefaultColorStyle;
}

type TLFrameShape = TLBaseShape<"frame", TLFrameShapeProps>;

interface TLGeoShapeProps {
  geo: TLGeoShapeGeoStyle;
  dash: TLDefaultDashStyle;
  url: string;
  w: number;
  h: number;
  growY: number;
  scale: number;
  labelColor: TLDefaultColorStyle;
  color: TLDefaultColorStyle;
  fill: TLDefaultFillStyle;
  size: TLDefaultSizeStyle;
  font: TLDefaultFontStyle;
  align: TLDefaultHorizontalAlignStyle;
  verticalAlign: TLDefaultVerticalAlignStyle;
  richText: TLRichText;
}

type TLGeoShape = TLBaseShape<"geo", TLGeoShapeProps>;

interface TLGroupShapeProps {}

type TLGroupShape = TLBaseShape<"group", TLGroupShapeProps>;

interface TLDrawShapeSegment {
  type: "free" | "straight";
  path: string;
}

interface TLHighlightShapeProps {
  color: TLDefaultColorStyle;
  size: TLDefaultSizeStyle;
  segments: TLDrawShapeSegment[];
  isComplete: boolean;
  isPen: boolean;
  scale: number;
  scaleX: number;
  scaleY: number;
}

type TLHighlightShape = TLBaseShape<"highlight", TLHighlightShapeProps>;

interface TLImageShapeProps {
  w: number;

  h: number;

  playing: boolean;

  url: string;

  assetId: null | TLAssetId;

  crop: null | TLShapeCrop;

  flipX: boolean;

  flipY: boolean;

  altText: string;
}

type TLImageShape = TLBaseShape<"image", TLImageShapeProps>;

interface TLLineShapeProps {
  color: TLDefaultColorStyle;
  dash: TLDefaultDashStyle;
  size: TLDefaultSizeStyle;
  spline: TLLineShapeSplineStyle;
  points: Record<string, TLLineShapePoint>;
  scale: number;
}

type TLLineShape = TLBaseShape<"line", TLLineShapeProps>;

interface TLNoteShapeProps {
  color: TLDefaultColorStyle;
  labelColor: TLDefaultColorStyle;
  size: TLDefaultSizeStyle;
  font: TLDefaultFontStyle;
  fontSizeAdjustment: number;
  align: TLDefaultHorizontalAlignStyle;
  verticalAlign: TLDefaultVerticalAlignStyle;
  growY: number;
  url: string;
  richText: TLRichText;
  scale: number;
}

type TLNoteShape = TLBaseShape<"note", TLNoteShapeProps>;

interface TLTextShapeProps {
  color: TLDefaultColorStyle;
  size: TLDefaultSizeStyle;
  font: TLDefaultFontStyle;
  textAlign: TLDefaultTextAlignStyle;
  w: number;
  richText: TLRichText;
  scale: number;
  autoSize: boolean;
}

type TLTextShape = TLBaseShape<"text", TLTextShapeProps>;

interface TLVideoShapeProps {
  w: number;
  h: number;
  time: number;
  playing: boolean;
  autoplay: boolean;
  url: string;
  assetId: null | TLAssetId;
  altText: string;
}

type TLVideoShape = TLBaseShape<"video", TLVideoShapeProps>;

type TLDefaultShape =
  | TLArrowShape
  | TLBookmarkShape
  | TLDrawShape
  | TLEmbedShape
  | TLFrameShape
  | TLGeoShape
  | TLGroupShape
  | TLHighlightShape
  | TLImageShape
  | TLLineShape
  | TLNoteShape
  | TLTextShape
  | TLVideoShape;

type TLIndexedShapes = {
  [K in
    | keyof TLGlobalShapePropsMap
    | TLDefaultShape["type"] as K extends TLDefaultShape["type"]
    ? K extends "group"
      ? K
      : K extends keyof TLGlobalShapePropsMap
      ? TLGlobalShapePropsMap[K] extends null | undefined
        ? never
        : K
      : K
    : K]: K extends "group"
    ? Extract<
        TLDefaultShape,
        {
          type: K;
        }
      >
    : K extends TLDefaultShape["type"]
    ? K extends keyof TLGlobalShapePropsMap
      ? TLBaseShape<K, TLGlobalShapePropsMap[K]>
      : Extract<
          TLDefaultShape,
          {
            type: K;
          }
        >
    : TLBaseShape<K, TLGlobalShapePropsMap[K & keyof TLGlobalShapePropsMap]>;
};

type TLShape<K extends keyof TLIndexedShapes = keyof TLIndexedShapes> =
  TLIndexedShapes[K];

interface BaseRecord<
  TypeName extends string,
  Id extends RecordId<UnknownRecord>,
> {
  readonly id: Id;
  readonly typeName: TypeName;
}

type UnknownRecord = BaseRecord<string, RecordId<UnknownRecord>>;

type RecordId<R extends UnknownRecord> = string & {
  __type__: R;
};

type TLShapeId = RecordId<TLShape>;

type TLShapePartial<T extends TLShape = TLShape> = T extends T
  ? {
      id: TLShapeId;
      meta?: Partial<T["meta"]>;
      props?: Partial<T["props"]>;
      type: T["type"];
    } & Partial<Omit<T, "id" | "meta" | "props" | "type">>
  : never;

interface TLGlobalShapePropsMap {
  html: {
    w: number;
    h: number;
  };
  container_section: {
    w: number;
    h: number;
  };
  container: {
    w: number;
    h: number;
  };
}

type Dimensions = {
  w: number;
  h: number;
};

export type ShapeWithDimensions<T extends TLShape> = T & {
  props: T["props"] & Dimensions;
};

export type ShapePartialWithDimensions<T extends TLShape> = TLShapePartial<
  ShapeWithDimensions<T>
> & {
  props: TLShapePartial<ShapeWithDimensions<T>>["props"] & Dimensions;
};

export function createShapeAtNearestAdjacentEmptyPosition<
  N extends ShapeWithDimensions<TLShape>,
>({
  newShape: newShapePartial,
}: {
  newShape: ShapePartialWithDimensions<N>;
}): {
  newShape: N;
} {
  newShapePartial.props?.w;
}
