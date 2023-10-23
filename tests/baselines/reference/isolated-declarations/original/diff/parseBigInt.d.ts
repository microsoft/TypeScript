// [[Reason: ]] ////

//// [tests/cases/compiler/parseBigInt.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -1,19 +1,19 @@
 
 
 //// [/.src/parseBigInt.d.ts]
-declare const bin = 0b101, binBig = 5n;
-declare const oct = 0o567, octBig = 375n;
-declare const hex = 0xC0B, hexBig = 0xc0bn;
+declare const bin = 5, binBig = 5n;
+declare const oct = 375, octBig = 375n;
+declare const hex = 3083, hexBig = 3083n;
 declare const dec = 123, decBig = 123n;
 declare const largeBin = 384307168202282325n;
 declare const largeOct = 1505852261029722487n;
 declare const largeDec = 12345678091234567890n;
-declare const largeHex = 0x1234567890abcdefn;
+declare const largeHex = 1311768467294899695n;
 declare const separatedBin = 21n;
 declare const separatedOct = 342391n;
 declare const separatedDec = 123456789n;
-declare const separatedHex = 0x0abcdefn;
+declare const separatedHex = 11259375n;
 declare const zero = 0n;
 declare const oneBit = 1n;
 declare const twoBit = 3n;
 declare const threeBit = 7n;
@@ -39,9 +39,9 @@
 declare const unaryPlus: number;
 declare const unaryPlusHex: number;
 declare const emptyBinary = 0n;
 declare const emptyOct = 0n;
-declare const emptyHex = 0x0n;
+declare const emptyHex = 0n;
 declare const leadingSeparator: invalid;
 declare const trailingSeparator = 123n;
 declare const doubleSeparator = 123456789n;
 declare const oneTwoOrThree: (x: 1n | 2n | 3n) => bigint;
