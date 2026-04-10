export const PROTOCOL_VERSION = 5;

export const HEADER_OFFSET_METADATA = 0;
export const HEADER_OFFSET_HASH_LO0 = 4;
export const HEADER_OFFSET_HASH_LO1 = 8;
export const HEADER_OFFSET_HASH_HI0 = 12;
export const HEADER_OFFSET_HASH_HI1 = 16;
export const HEADER_OFFSET_PARSE_OPTIONS = 20;
export const HEADER_OFFSET_STRING_TABLE_OFFSETS = 24;
export const HEADER_OFFSET_STRING_TABLE = 28;
export const HEADER_OFFSET_EXTENDED_DATA = 32;
export const HEADER_OFFSET_STRUCTURED_DATA = 36;
export const HEADER_OFFSET_NODES = 40;
export const HEADER_SIZE = 44;

export const NODE_LEN = 28;

export const NODE_OFFSET_KIND = 0;
export const NODE_OFFSET_POS = 4;
export const NODE_OFFSET_END = 8;
export const NODE_OFFSET_NEXT = 12;
export const NODE_OFFSET_PARENT = 16;
export const NODE_OFFSET_DATA = 20;
export const NODE_OFFSET_FLAGS = 24;

export const KIND_NODE_LIST = 0xFFFFFFFF;

export const NODE_DATA_TYPE_CHILDREN = 0x00000000;
export const NODE_DATA_TYPE_STRING = 0x40000000;
export const NODE_DATA_TYPE_EXTENDED = 0x80000000;

export const NODE_STRING_INDEX_MASK = 0x00FFFFFF;
export const NODE_EXTENDED_DATA_MASK = 0x00FFFFFF;

// Re-export generated child properties
export { childProperties, singleChildNodePropertyNames } from "./protocol.generated.ts";
