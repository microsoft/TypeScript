// Fixes #16245 -- always suggest the exact match, even when
// other options are very close
enum U8 {
    BIT_0 = 1 << 0,
    BIT_1 = 1 << 1,
    BIT_2 = 1 << 2
}

U8.bit_2
