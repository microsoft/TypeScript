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

const structDecoder1 = new StructDecoder([
  ["a", i32Decoder],
  ["b", i64Decoder],
]);

const struct1 = structDecoder1.decode(new ArrayBuffer(100));

const v1_1: number = struct1.a;
const v1_2: bigint = struct1.b;

declare const descriptor2: [["a", Decoder<number>], ["b", Decoder<string>], ...["c", Decoder<bigint>][]]
const structDecoder2 = new StructDecoder(descriptor2);

const struct2 = structDecoder2.decode(new ArrayBuffer(100));

const v2_1: number = struct2.a;
const v2_2: string = struct2.b;
const v2_3: bigint = struct2.c;
