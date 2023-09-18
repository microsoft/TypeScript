// @strict: true
// @noEmit: true

// based on https://github.com/microsoft/TypeScript/issues/55762

declare class Decoder<T> {
  decode(arrayBuffer: ArrayBuffer): T;
}

type ValueTypeOf<T extends Decoder<any>> = T extends Decoder<infer R>
  ? R
  : never;

type StructDescriptor = ReadonlyArray<
  readonly [key: string, type: Decoder<any>]
>;

type StructTypeFor<Descriptor extends StructDescriptor> = {
  [K in keyof Descriptor as Descriptor[K][0]]: ValueTypeOf<Descriptor[K][1]>;
};

class StructDecoder<const Descriptor extends StructDescriptor> extends Decoder<
  StructTypeFor<Descriptor>
> {
  constructor(descriptor: Descriptor) {
    super();
  }
}

declare const i32Decoder: Decoder<number>;
declare const i64Decoder: Decoder<bigint>;

const structDecoder = new StructDecoder([
  ["a", i32Decoder],
  ["b", i64Decoder],
]);

const struct = structDecoder.decode(new ArrayBuffer(100));

const v: number = struct.a;
const v2: bigint = struct.b;
