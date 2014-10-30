// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClassEscape :: D evaluates by returning the set of all characters not
 * included in the set returned by CharacterClassEscape :: d
 *
 * @path ch15/15.10/15.10.2/15.10.2.12/S15.10.2.12_A6_T1.js
 * @description 0 - 9
 */

var i0 = "";
for (var j = 0; j < 1024; j++)
  i0 += String.fromCharCode(j);
var o0 = "\u0030\u0031\u0032\u0033\u0034\u0035\u0036\u0037\u0038\u0039";
if (i0.replace(/\D+/g, "") !== o0) {
  $ERROR("#0: Error matching character class \D between character 0 and 3ff");
}

var i1 = "";
for (var j = 1024; j < 2048; j++)
  i1 += String.fromCharCode(j);
var o1 = "";
if (i1.replace(/\D+/g, "") !== o1) {
  $ERROR("#1: Error matching character class \D between character 400 and 7ff");
}

var i2 = "";
for (var j = 2048; j < 3072; j++)
  i2 += String.fromCharCode(j);
var o2 = "";
if (i2.replace(/\D+/g, "") !== o2) {
  $ERROR("#2: Error matching character class \D between character 800 and bff");
}

var i3 = "";
for (var j = 3072; j < 4096; j++)
  i3 += String.fromCharCode(j);
var o3 = "";
if (i3.replace(/\D+/g, "") !== o3) {
  $ERROR("#3: Error matching character class \D between character c00 and fff");
}

var i4 = "";
for (var j = 4096; j < 5120; j++)
  i4 += String.fromCharCode(j);
var o4 = "";
if (i4.replace(/\D+/g, "") !== o4) {
  $ERROR("#4: Error matching character class \D between character 1000 and 13ff");
}

var i5 = "";
for (var j = 5120; j < 6144; j++)
  i5 += String.fromCharCode(j);
var o5 = "";
if (i5.replace(/\D+/g, "") !== o5) {
  $ERROR("#5: Error matching character class \D between character 1400 and 17ff");
}

var i6 = "";
for (var j = 6144; j < 7168; j++)
  i6 += String.fromCharCode(j);
var o6 = "";
if (i6.replace(/\D+/g, "") !== o6) {
  $ERROR("#6: Error matching character class \D between character 1800 and 1bff");
}

var i7 = "";
for (var j = 7168; j < 8192; j++)
  i7 += String.fromCharCode(j);
var o7 = "";
if (i7.replace(/\D+/g, "") !== o7) {
  $ERROR("#7: Error matching character class \D between character 1c00 and 1fff");
}

var i8 = "";
for (var j = 8192; j < 9216; j++)
  i8 += String.fromCharCode(j);
var o8 = "";
if (i8.replace(/\D+/g, "") !== o8) {
  $ERROR("#8: Error matching character class \D between character 2000 and 23ff");
}

var i9 = "";
for (var j = 9216; j < 10240; j++)
  i9 += String.fromCharCode(j);
var o9 = "";
if (i9.replace(/\D+/g, "") !== o9) {
  $ERROR("#9: Error matching character class \D between character 2400 and 27ff");
}

var i10 = "";
for (var j = 10240; j < 11264; j++)
  i10 += String.fromCharCode(j);
var o10 = "";
if (i10.replace(/\D+/g, "") !== o10) {
  $ERROR("#10: Error matching character class \D between character 2800 and 2bff");
}

var i11 = "";
for (var j = 11264; j < 12288; j++)
  i11 += String.fromCharCode(j);
var o11 = "";
if (i11.replace(/\D+/g, "") !== o11) {
  $ERROR("#11: Error matching character class \D between character 2c00 and 2fff");
}

var i12 = "";
for (var j = 12288; j < 13312; j++)
  i12 += String.fromCharCode(j);
var o12 = "";
if (i12.replace(/\D+/g, "") !== o12) {
  $ERROR("#12: Error matching character class \D between character 3000 and 33ff");
}

var i13 = "";
for (var j = 13312; j < 14336; j++)
  i13 += String.fromCharCode(j);
var o13 = "";
if (i13.replace(/\D+/g, "") !== o13) {
  $ERROR("#13: Error matching character class \D between character 3400 and 37ff");
}

var i14 = "";
for (var j = 14336; j < 15360; j++)
  i14 += String.fromCharCode(j);
var o14 = "";
if (i14.replace(/\D+/g, "") !== o14) {
  $ERROR("#14: Error matching character class \D between character 3800 and 3bff");
}

var i15 = "";
for (var j = 15360; j < 16384; j++)
  i15 += String.fromCharCode(j);
var o15 = "";
if (i15.replace(/\D+/g, "") !== o15) {
  $ERROR("#15: Error matching character class \D between character 3c00 and 3fff");
}

var i16 = "";
for (var j = 16384; j < 17408; j++)
  i16 += String.fromCharCode(j);
var o16 = "";
if (i16.replace(/\D+/g, "") !== o16) {
  $ERROR("#16: Error matching character class \D between character 4000 and 43ff");
}

var i17 = "";
for (var j = 17408; j < 18432; j++)
  i17 += String.fromCharCode(j);
var o17 = "";
if (i17.replace(/\D+/g, "") !== o17) {
  $ERROR("#17: Error matching character class \D between character 4400 and 47ff");
}

var i18 = "";
for (var j = 18432; j < 19456; j++)
  i18 += String.fromCharCode(j);
var o18 = "";
if (i18.replace(/\D+/g, "") !== o18) {
  $ERROR("#18: Error matching character class \D between character 4800 and 4bff");
}

var i19 = "";
for (var j = 19456; j < 20480; j++)
  i19 += String.fromCharCode(j);
var o19 = "";
if (i19.replace(/\D+/g, "") !== o19) {
  $ERROR("#19: Error matching character class \D between character 4c00 and 4fff");
}

var i20 = "";
for (var j = 20480; j < 21504; j++)
  i20 += String.fromCharCode(j);
var o20 = "";
if (i20.replace(/\D+/g, "") !== o20) {
  $ERROR("#20: Error matching character class \D between character 5000 and 53ff");
}

var i21 = "";
for (var j = 21504; j < 22528; j++)
  i21 += String.fromCharCode(j);
var o21 = "";
if (i21.replace(/\D+/g, "") !== o21) {
  $ERROR("#21: Error matching character class \D between character 5400 and 57ff");
}

var i22 = "";
for (var j = 22528; j < 23552; j++)
  i22 += String.fromCharCode(j);
var o22 = "";
if (i22.replace(/\D+/g, "") !== o22) {
  $ERROR("#22: Error matching character class \D between character 5800 and 5bff");
}

var i23 = "";
for (var j = 23552; j < 24576; j++)
  i23 += String.fromCharCode(j);
var o23 = "";
if (i23.replace(/\D+/g, "") !== o23) {
  $ERROR("#23: Error matching character class \D between character 5c00 and 5fff");
}

var i24 = "";
for (var j = 24576; j < 25600; j++)
  i24 += String.fromCharCode(j);
var o24 = "";
if (i24.replace(/\D+/g, "") !== o24) {
  $ERROR("#24: Error matching character class \D between character 6000 and 63ff");
}

var i25 = "";
for (var j = 25600; j < 26624; j++)
  i25 += String.fromCharCode(j);
var o25 = "";
if (i25.replace(/\D+/g, "") !== o25) {
  $ERROR("#25: Error matching character class \D between character 6400 and 67ff");
}

var i26 = "";
for (var j = 26624; j < 27648; j++)
  i26 += String.fromCharCode(j);
var o26 = "";
if (i26.replace(/\D+/g, "") !== o26) {
  $ERROR("#26: Error matching character class \D between character 6800 and 6bff");
}

var i27 = "";
for (var j = 27648; j < 28672; j++)
  i27 += String.fromCharCode(j);
var o27 = "";
if (i27.replace(/\D+/g, "") !== o27) {
  $ERROR("#27: Error matching character class \D between character 6c00 and 6fff");
}

var i28 = "";
for (var j = 28672; j < 29696; j++)
  i28 += String.fromCharCode(j);
var o28 = "";
if (i28.replace(/\D+/g, "") !== o28) {
  $ERROR("#28: Error matching character class \D between character 7000 and 73ff");
}

var i29 = "";
for (var j = 29696; j < 30720; j++)
  i29 += String.fromCharCode(j);
var o29 = "";
if (i29.replace(/\D+/g, "") !== o29) {
  $ERROR("#29: Error matching character class \D between character 7400 and 77ff");
}

var i30 = "";
for (var j = 30720; j < 31744; j++)
  i30 += String.fromCharCode(j);
var o30 = "";
if (i30.replace(/\D+/g, "") !== o30) {
  $ERROR("#30: Error matching character class \D between character 7800 and 7bff");
}

var i31 = "";
for (var j = 31744; j < 32768; j++)
  i31 += String.fromCharCode(j);
var o31 = "";
if (i31.replace(/\D+/g, "") !== o31) {
  $ERROR("#31: Error matching character class \D between character 7c00 and 7fff");
}

var i32 = "";
for (var j = 32768; j < 33792; j++)
  i32 += String.fromCharCode(j);
var o32 = "";
if (i32.replace(/\D+/g, "") !== o32) {
  $ERROR("#32: Error matching character class \D between character 8000 and 83ff");
}

var i33 = "";
for (var j = 33792; j < 34816; j++)
  i33 += String.fromCharCode(j);
var o33 = "";
if (i33.replace(/\D+/g, "") !== o33) {
  $ERROR("#33: Error matching character class \D between character 8400 and 87ff");
}

var i34 = "";
for (var j = 34816; j < 35840; j++)
  i34 += String.fromCharCode(j);
var o34 = "";
if (i34.replace(/\D+/g, "") !== o34) {
  $ERROR("#34: Error matching character class \D between character 8800 and 8bff");
}

var i35 = "";
for (var j = 35840; j < 36864; j++)
  i35 += String.fromCharCode(j);
var o35 = "";
if (i35.replace(/\D+/g, "") !== o35) {
  $ERROR("#35: Error matching character class \D between character 8c00 and 8fff");
}

var i36 = "";
for (var j = 36864; j < 37888; j++)
  i36 += String.fromCharCode(j);
var o36 = "";
if (i36.replace(/\D+/g, "") !== o36) {
  $ERROR("#36: Error matching character class \D between character 9000 and 93ff");
}

var i37 = "";
for (var j = 37888; j < 38912; j++)
  i37 += String.fromCharCode(j);
var o37 = "";
if (i37.replace(/\D+/g, "") !== o37) {
  $ERROR("#37: Error matching character class \D between character 9400 and 97ff");
}

var i38 = "";
for (var j = 38912; j < 39936; j++)
  i38 += String.fromCharCode(j);
var o38 = "";
if (i38.replace(/\D+/g, "") !== o38) {
  $ERROR("#38: Error matching character class \D between character 9800 and 9bff");
}

var i39 = "";
for (var j = 39936; j < 40960; j++)
  i39 += String.fromCharCode(j);
var o39 = "";
if (i39.replace(/\D+/g, "") !== o39) {
  $ERROR("#39: Error matching character class \D between character 9c00 and 9fff");
}

var i40 = "";
for (var j = 40960; j < 41984; j++)
  i40 += String.fromCharCode(j);
var o40 = "";
if (i40.replace(/\D+/g, "") !== o40) {
  $ERROR("#40: Error matching character class \D between character a000 and a3ff");
}

var i41 = "";
for (var j = 41984; j < 43008; j++)
  i41 += String.fromCharCode(j);
var o41 = "";
if (i41.replace(/\D+/g, "") !== o41) {
  $ERROR("#41: Error matching character class \D between character a400 and a7ff");
}

var i42 = "";
for (var j = 43008; j < 44032; j++)
  i42 += String.fromCharCode(j);
var o42 = "";
if (i42.replace(/\D+/g, "") !== o42) {
  $ERROR("#42: Error matching character class \D between character a800 and abff");
}

var i43 = "";
for (var j = 44032; j < 45056; j++)
  i43 += String.fromCharCode(j);
var o43 = "";
if (i43.replace(/\D+/g, "") !== o43) {
  $ERROR("#43: Error matching character class \D between character ac00 and afff");
}

var i44 = "";
for (var j = 45056; j < 46080; j++)
  i44 += String.fromCharCode(j);
var o44 = "";
if (i44.replace(/\D+/g, "") !== o44) {
  $ERROR("#44: Error matching character class \D between character b000 and b3ff");
}

var i45 = "";
for (var j = 46080; j < 47104; j++)
  i45 += String.fromCharCode(j);
var o45 = "";
if (i45.replace(/\D+/g, "") !== o45) {
  $ERROR("#45: Error matching character class \D between character b400 and b7ff");
}

var i46 = "";
for (var j = 47104; j < 48128; j++)
  i46 += String.fromCharCode(j);
var o46 = "";
if (i46.replace(/\D+/g, "") !== o46) {
  $ERROR("#46: Error matching character class \D between character b800 and bbff");
}

var i47 = "";
for (var j = 48128; j < 49152; j++)
  i47 += String.fromCharCode(j);
var o47 = "";
if (i47.replace(/\D+/g, "") !== o47) {
  $ERROR("#47: Error matching character class \D between character bc00 and bfff");
}

var i48 = "";
for (var j = 49152; j < 50176; j++)
  i48 += String.fromCharCode(j);
var o48 = "";
if (i48.replace(/\D+/g, "") !== o48) {
  $ERROR("#48: Error matching character class \D between character c000 and c3ff");
}

var i49 = "";
for (var j = 50176; j < 51200; j++)
  i49 += String.fromCharCode(j);
var o49 = "";
if (i49.replace(/\D+/g, "") !== o49) {
  $ERROR("#49: Error matching character class \D between character c400 and c7ff");
}

var i50 = "";
for (var j = 51200; j < 52224; j++)
  i50 += String.fromCharCode(j);
var o50 = "";
if (i50.replace(/\D+/g, "") !== o50) {
  $ERROR("#50: Error matching character class \D between character c800 and cbff");
}

var i51 = "";
for (var j = 52224; j < 53248; j++)
  i51 += String.fromCharCode(j);
var o51 = "";
if (i51.replace(/\D+/g, "") !== o51) {
  $ERROR("#51: Error matching character class \D between character cc00 and cfff");
}

var i52 = "";
for (var j = 53248; j < 54272; j++)
  i52 += String.fromCharCode(j);
var o52 = "";
if (i52.replace(/\D+/g, "") !== o52) {
  $ERROR("#52: Error matching character class \D between character d000 and d3ff");
}

var i53 = "";
for (var j = 54272; j < 55296; j++)
  i53 += String.fromCharCode(j);
var o53 = "";
if (i53.replace(/\D+/g, "") !== o53) {
  $ERROR("#53: Error matching character class \D between character d400 and d7ff");
}

var i54 = "";
for (var j = 55296; j < 56320; j++)
  i54 += String.fromCharCode(j);
var o54 = "";
if (i54.replace(/\D+/g, "") !== o54) {
  $ERROR("#54: Error matching character class \D between character d800 and dbff");
}

var i55 = "";
for (var j = 56320; j < 57344; j++)
  i55 += String.fromCharCode(j);
var o55 = "";
if (i55.replace(/\D+/g, "") !== o55) {
  $ERROR("#55: Error matching character class \D between character dc00 and dfff");
}

var i56 = "";
for (var j = 57344; j < 58368; j++)
  i56 += String.fromCharCode(j);
var o56 = "";
if (i56.replace(/\D+/g, "") !== o56) {
  $ERROR("#56: Error matching character class \D between character e000 and e3ff");
}

var i57 = "";
for (var j = 58368; j < 59392; j++)
  i57 += String.fromCharCode(j);
var o57 = "";
if (i57.replace(/\D+/g, "") !== o57) {
  $ERROR("#57: Error matching character class \D between character e400 and e7ff");
}

var i58 = "";
for (var j = 59392; j < 60416; j++)
  i58 += String.fromCharCode(j);
var o58 = "";
if (i58.replace(/\D+/g, "") !== o58) {
  $ERROR("#58: Error matching character class \D between character e800 and ebff");
}

var i59 = "";
for (var j = 60416; j < 61440; j++)
  i59 += String.fromCharCode(j);
var o59 = "";
if (i59.replace(/\D+/g, "") !== o59) {
  $ERROR("#59: Error matching character class \D between character ec00 and efff");
}

var i60 = "";
for (var j = 61440; j < 62464; j++)
  i60 += String.fromCharCode(j);
var o60 = "";
if (i60.replace(/\D+/g, "") !== o60) {
  $ERROR("#60: Error matching character class \D between character f000 and f3ff");
}

var i61 = "";
for (var j = 62464; j < 63488; j++)
  i61 += String.fromCharCode(j);
var o61 = "";
if (i61.replace(/\D+/g, "") !== o61) {
  $ERROR("#61: Error matching character class \D between character f400 and f7ff");
}

var i62 = "";
for (var j = 63488; j < 64512; j++)
  i62 += String.fromCharCode(j);
var o62 = "";
if (i62.replace(/\D+/g, "") !== o62) {
  $ERROR("#62: Error matching character class \D between character f800 and fbff");
}

var i63 = "";
for (var j = 64512; j < 65536; j++)
  i63 += String.fromCharCode(j);
var o63 = "";
if (i63.replace(/\D+/g, "") !== o63) {
  $ERROR("#63: Error matching character class \D between character fc00 and ffff");
}

