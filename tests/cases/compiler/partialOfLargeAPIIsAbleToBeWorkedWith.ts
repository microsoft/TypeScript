// @strict: true
interface MyAPI {
    0: (x: 0) => string;
    1: (x: 1) => string;
    2: (x: 2) => string;
    3: (x: 3) => string;
    4: (x: 4) => string;
    5: (x: 5) => string;
    6: (x: 6) => string;
    7: (x: 7) => string;
    8: (x: 8) => string;
    9: (x: 9) => string;
    10: (x: 10) => string;
    11: (x: 11) => string;
    12: (x: 12) => string;
    13: (x: 13) => string;
    14: (x: 14) => string;
    15: (x: 15) => string;
    16: (x: 16) => string;
    17: (x: 17) => string;
    18: (x: 18) => string;
    19: (x: 19) => string;
    20: (x: 20) => string;
    21: (x: 21) => string;
    22: (x: 22) => string;
    23: (x: 23) => string;
    24: (x: 24) => string;
    25: (x: 25) => string;
    26: (x: 26) => string;
    27: (x: 27) => string;
    28: (x: 28) => string;
    29: (x: 29) => string;
    30: (x: 30) => string;
    31: (x: 31) => string;
    32: (x: 32) => string;
    33: (x: 33) => string;
    34: (x: 34) => string;
    35: (x: 35) => string;
    36: (x: 36) => string;
    37: (x: 37) => string;
    38: (x: 38) => string;
    39: (x: 39) => string;
    40: (x: 40) => string;
    41: (x: 41) => string;
    42: (x: 42) => string;
    43: (x: 43) => string;
    44: (x: 44) => string;
    45: (x: 45) => string;
    46: (x: 46) => string;
    47: (x: 47) => string;
    48: (x: 48) => string;
    49: (x: 49) => string;
    50: (x: 50) => string;
    51: (x: 51) => string;
}

const obj: Partial<MyAPI> = {};

declare var keys: (keyof MyAPI)[];

for (const k of keys) {
    obj[k] = () => "12"; // shouldn't cause a complexity error
}

type PartialNull<T> = {[K in keyof T]?: T[K] | null};

const obj2: PartialNull<MyAPI> = {};

for (const k of keys) {
    obj2[k] = () => "12"; // shouldn't cause a complexity error
}
