// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClassEscape :: d evaluates by returning the ten-element set of characters containing the characters 0 through 9 inclusive
 *
 * @path ch15/15.10/15.10.2/15.10.2.12/S15.10.2.12_A5_T1.js
 * @description 0 - 9
 */

var i0 = "";
for (var j = 0; j < 1024; j++)
  i0 += String.fromCharCode(j);
var o0 = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u0009\u000A\u000B\u000C\u000D\u000E\u000F\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001A\u001B\u001C\u001D\u001E\u001F\u0020\u0021\u0022\u0023\u0024\u0025\u0026\u0027\u0028\u0029\u002A\u002B\u002C\u002D\u002E\u002F\u003A\u003B\u003C\u003D\u003E\u003F\u0040\u0041\u0042\u0043\u0044\u0045\u0046\u0047\u0048\u0049\u004A\u004B\u004C\u004D\u004E\u004F\u0050\u0051\u0052\u0053\u0054\u0055\u0056\u0057\u0058\u0059\u005A\u005B\u005C\u005D\u005E\u005F\u0060\u0061\u0062\u0063\u0064\u0065\u0066\u0067\u0068\u0069\u006A\u006B\u006C\u006D\u006E\u006F\u0070\u0071\u0072\u0073\u0074\u0075\u0076\u0077\u0078\u0079\u007A\u007B\u007C\u007D\u007E\u007F\u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008A\u008B\u008C\u008D\u008E\u008F\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009A\u009B\u009C\u009D\u009E\u009F\u00A0\u00A1\u00A2\u00A3\u00A4\u00A5\u00A6\u00A7\u00A8\u00A9\u00AA\u00AB\u00AC\u00AD\u00AE\u00AF\u00B0\u00B1\u00B2\u00B3\u00B4\u00B5\u00B6\u00B7\u00B8\u00B9\u00BA\u00BB\u00BC\u00BD\u00BE\u00BF\u00C0\u00C1\u00C2\u00C3\u00C4\u00C5\u00C6\u00C7\u00C8\u00C9\u00CA\u00CB\u00CC\u00CD\u00CE\u00CF\u00D0\u00D1\u00D2\u00D3\u00D4\u00D5\u00D6\u00D7\u00D8\u00D9\u00DA\u00DB\u00DC\u00DD\u00DE\u00DF\u00E0\u00E1\u00E2\u00E3\u00E4\u00E5\u00E6\u00E7\u00E8\u00E9\u00EA\u00EB\u00EC\u00ED\u00EE\u00EF\u00F0\u00F1\u00F2\u00F3\u00F4\u00F5\u00F6\u00F7\u00F8\u00F9\u00FA\u00FB\u00FC\u00FD\u00FE\u00FF\u0100\u0101\u0102\u0103\u0104\u0105\u0106\u0107\u0108\u0109\u010A\u010B\u010C\u010D\u010E\u010F\u0110\u0111\u0112\u0113\u0114\u0115\u0116\u0117\u0118\u0119\u011A\u011B\u011C\u011D\u011E\u011F\u0120\u0121\u0122\u0123\u0124\u0125\u0126\u0127\u0128\u0129\u012A\u012B\u012C\u012D\u012E\u012F\u0130\u0131\u0132\u0133\u0134\u0135\u0136\u0137\u0138\u0139\u013A\u013B\u013C\u013D\u013E\u013F\u0140\u0141\u0142\u0143\u0144\u0145\u0146\u0147\u0148\u0149\u014A\u014B\u014C\u014D\u014E\u014F\u0150\u0151\u0152\u0153\u0154\u0155\u0156\u0157\u0158\u0159\u015A\u015B\u015C\u015D\u015E\u015F\u0160\u0161\u0162\u0163\u0164\u0165\u0166\u0167\u0168\u0169\u016A\u016B\u016C\u016D\u016E\u016F\u0170\u0171\u0172\u0173\u0174\u0175\u0176\u0177\u0178\u0179\u017A\u017B\u017C\u017D\u017E\u017F\u0180\u0181\u0182\u0183\u0184\u0185\u0186\u0187\u0188\u0189\u018A\u018B\u018C\u018D\u018E\u018F\u0190\u0191\u0192\u0193\u0194\u0195\u0196\u0197\u0198\u0199\u019A\u019B\u019C\u019D\u019E\u019F\u01A0\u01A1\u01A2\u01A3\u01A4\u01A5\u01A6\u01A7\u01A8\u01A9\u01AA\u01AB\u01AC\u01AD\u01AE\u01AF\u01B0\u01B1\u01B2\u01B3\u01B4\u01B5\u01B6\u01B7\u01B8\u01B9\u01BA\u01BB\u01BC\u01BD\u01BE\u01BF\u01C0\u01C1\u01C2\u01C3\u01C4\u01C5\u01C6\u01C7\u01C8\u01C9\u01CA\u01CB\u01CC\u01CD\u01CE\u01CF\u01D0\u01D1\u01D2\u01D3\u01D4\u01D5\u01D6\u01D7\u01D8\u01D9\u01DA\u01DB\u01DC\u01DD\u01DE\u01DF\u01E0\u01E1\u01E2\u01E3\u01E4\u01E5\u01E6\u01E7\u01E8\u01E9\u01EA\u01EB\u01EC\u01ED\u01EE\u01EF\u01F0\u01F1\u01F2\u01F3\u01F4\u01F5\u01F6\u01F7\u01F8\u01F9\u01FA\u01FB\u01FC\u01FD\u01FE\u01FF\u0200\u0201\u0202\u0203\u0204\u0205\u0206\u0207\u0208\u0209\u020A\u020B\u020C\u020D\u020E\u020F\u0210\u0211\u0212\u0213\u0214\u0215\u0216\u0217\u0218\u0219\u021A\u021B\u021C\u021D\u021E\u021F\u0220\u0221\u0222\u0223\u0224\u0225\u0226\u0227\u0228\u0229\u022A\u022B\u022C\u022D\u022E\u022F\u0230\u0231\u0232\u0233\u0234\u0235\u0236\u0237\u0238\u0239\u023A\u023B\u023C\u023D\u023E\u023F\u0240\u0241\u0242\u0243\u0244\u0245\u0246\u0247\u0248\u0249\u024A\u024B\u024C\u024D\u024E\u024F\u0250\u0251\u0252\u0253\u0254\u0255\u0256\u0257\u0258\u0259\u025A\u025B\u025C\u025D\u025E\u025F\u0260\u0261\u0262\u0263\u0264\u0265\u0266\u0267\u0268\u0269\u026A\u026B\u026C\u026D\u026E\u026F\u0270\u0271\u0272\u0273\u0274\u0275\u0276\u0277\u0278\u0279\u027A\u027B\u027C\u027D\u027E\u027F\u0280\u0281\u0282\u0283\u0284\u0285\u0286\u0287\u0288\u0289\u028A\u028B\u028C\u028D\u028E\u028F\u0290\u0291\u0292\u0293\u0294\u0295\u0296\u0297\u0298\u0299\u029A\u029B\u029C\u029D\u029E\u029F\u02A0\u02A1\u02A2\u02A3\u02A4\u02A5\u02A6\u02A7\u02A8\u02A9\u02AA\u02AB\u02AC\u02AD\u02AE\u02AF\u02B0\u02B1\u02B2\u02B3\u02B4\u02B5\u02B6\u02B7\u02B8\u02B9\u02BA\u02BB\u02BC\u02BD\u02BE\u02BF\u02C0\u02C1\u02C2\u02C3\u02C4\u02C5\u02C6\u02C7\u02C8\u02C9\u02CA\u02CB\u02CC\u02CD\u02CE\u02CF\u02D0\u02D1\u02D2\u02D3\u02D4\u02D5\u02D6\u02D7\u02D8\u02D9\u02DA\u02DB\u02DC\u02DD\u02DE\u02DF\u02E0\u02E1\u02E2\u02E3\u02E4\u02E5\u02E6\u02E7\u02E8\u02E9\u02EA\u02EB\u02EC\u02ED\u02EE\u02EF\u02F0\u02F1\u02F2\u02F3\u02F4\u02F5\u02F6\u02F7\u02F8\u02F9\u02FA\u02FB\u02FC\u02FD\u02FE\u02FF\u0300\u0301\u0302\u0303\u0304\u0305\u0306\u0307\u0308\u0309\u030A\u030B\u030C\u030D\u030E\u030F\u0310\u0311\u0312\u0313\u0314\u0315\u0316\u0317\u0318\u0319\u031A\u031B\u031C\u031D\u031E\u031F\u0320\u0321\u0322\u0323\u0324\u0325\u0326\u0327\u0328\u0329\u032A\u032B\u032C\u032D\u032E\u032F\u0330\u0331\u0332\u0333\u0334\u0335\u0336\u0337\u0338\u0339\u033A\u033B\u033C\u033D\u033E\u033F\u0340\u0341\u0342\u0343\u0344\u0345\u0346\u0347\u0348\u0349\u034A\u034B\u034C\u034D\u034E\u034F\u0350\u0351\u0352\u0353\u0354\u0355\u0356\u0357\u0358\u0359\u035A\u035B\u035C\u035D\u035E\u035F\u0360\u0361\u0362\u0363\u0364\u0365\u0366\u0367\u0368\u0369\u036A\u036B\u036C\u036D\u036E\u036F\u0370\u0371\u0372\u0373\u0374\u0375\u0376\u0377\u0378\u0379\u037A\u037B\u037C\u037D\u037E\u037F\u0380\u0381\u0382\u0383\u0384\u0385\u0386\u0387\u0388\u0389\u038A\u038B\u038C\u038D\u038E\u038F\u0390\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E\u039F\u03A0\u03A1\u03A2\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9\u03AA\u03AB\u03AC\u03AD\u03AE\u03AF\u03B0\u03B1\u03B2\u03B3\u03B4\u03B5\u03B6\u03B7\u03B8\u03B9\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF\u03C0\u03C1\u03C2\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9\u03CA\u03CB\u03CC\u03CD\u03CE\u03CF\u03D0\u03D1\u03D2\u03D3\u03D4\u03D5\u03D6\u03D7\u03D8\u03D9\u03DA\u03DB\u03DC\u03DD\u03DE\u03DF\u03E0\u03E1\u03E2\u03E3\u03E4\u03E5\u03E6\u03E7\u03E8\u03E9\u03EA\u03EB\u03EC\u03ED\u03EE\u03EF\u03F0\u03F1\u03F2\u03F3\u03F4\u03F5\u03F6\u03F7\u03F8\u03F9\u03FA\u03FB\u03FC\u03FD\u03FE\u03FF";
if (i0.replace(/\d+/g, "") !== o0) {
  $ERROR("#0: Error matching character class \d between character 0 and 3ff");
}

var i1 = "";
for (var j = 1024; j < 2048; j++)
  i1 += String.fromCharCode(j);
var o1 = i1;
if (i1.replace(/\d+/g, "") !== o1) {
  $ERROR("#1: Error matching character class \d between character 400 and 7ff");
}

var i2 = "";
for (var j = 2048; j < 3072; j++)
  i2 += String.fromCharCode(j);
var o2 = i2;
if (i2.replace(/\d+/g, "") !== o2) {
  $ERROR("#2: Error matching character class \d between character 800 and bff");
}

var i3 = "";
for (var j = 3072; j < 4096; j++)
  i3 += String.fromCharCode(j);
var o3 = i3;
if (i3.replace(/\d+/g, "") !== o3) {
  $ERROR("#3: Error matching character class \d between character c00 and fff");
}

var i4 = "";
for (var j = 4096; j < 5120; j++)
  i4 += String.fromCharCode(j);
var o4 = i4;
if (i4.replace(/\d+/g, "") !== o4) {
  $ERROR("#4: Error matching character class \d between character 1000 and 13ff");
}

var i5 = "";
for (var j = 5120; j < 6144; j++)
  i5 += String.fromCharCode(j);
var o5 = i5;
if (i5.replace(/\d+/g, "") !== o5) {
  $ERROR("#5: Error matching character class \d between character 1400 and 17ff");
}

var i6 = "";
for (var j = 6144; j < 7168; j++)
  i6 += String.fromCharCode(j);
var o6 = i6;
if (i6.replace(/\d+/g, "") !== o6) {
  $ERROR("#6: Error matching character class \d between character 1800 and 1bff");
}

var i7 = "";
for (var j = 7168; j < 8192; j++)
  i7 += String.fromCharCode(j);
var o7 = i7;
if (i7.replace(/\d+/g, "") !== o7) {
  $ERROR("#7: Error matching character class \d between character 1c00 and 1fff");
}

var i8 = "";
for (var j = 8192; j < 9216; j++)
  i8 += String.fromCharCode(j);
var o8 = i8;
if (i8.replace(/\d+/g, "") !== o8) {
  $ERROR("#8: Error matching character class \d between character 2000 and 23ff");
}

var i9 = "";
for (var j = 9216; j < 10240; j++)
  i9 += String.fromCharCode(j);
var o9 = i9;
if (i9.replace(/\d+/g, "") !== o9) {
  $ERROR("#9: Error matching character class \d between character 2400 and 27ff");
}

var i10 = "";
for (var j = 10240; j < 11264; j++)
  i10 += String.fromCharCode(j);
var o10 = i10;
if (i10.replace(/\d+/g, "") !== o10) {
  $ERROR("#10: Error matching character class \d between character 2800 and 2bff");
}

var i11 = "";
for (var j = 11264; j < 12288; j++)
  i11 += String.fromCharCode(j);
var o11 = i11;
if (i11.replace(/\d+/g, "") !== o11) {
  $ERROR("#11: Error matching character class \d between character 2c00 and 2fff");
}

var i12 = "";
for (var j = 12288; j < 13312; j++)
  i12 += String.fromCharCode(j);
var o12 = i12;
if (i12.replace(/\d+/g, "") !== o12) {
  $ERROR("#12: Error matching character class \d between character 3000 and 33ff");
}

var i13 = "";
for (var j = 13312; j < 14336; j++)
  i13 += String.fromCharCode(j);
var o13 = i13;
if (i13.replace(/\d+/g, "") !== o13) {
  $ERROR("#13: Error matching character class \d between character 3400 and 37ff");
}

var i14 = "";
for (var j = 14336; j < 15360; j++)
  i14 += String.fromCharCode(j);
var o14 = i14;
if (i14.replace(/\d+/g, "") !== o14) {
  $ERROR("#14: Error matching character class \d between character 3800 and 3bff");
}

var i15 = "";
for (var j = 15360; j < 16384; j++)
  i15 += String.fromCharCode(j);
var o15 = i15;
if (i15.replace(/\d+/g, "") !== o15) {
  $ERROR("#15: Error matching character class \d between character 3c00 and 3fff");
}

var i16 = "";
for (var j = 16384; j < 17408; j++)
  i16 += String.fromCharCode(j);
var o16 = i16;
if (i16.replace(/\d+/g, "") !== o16) {
  $ERROR("#16: Error matching character class \d between character 4000 and 43ff");
}

var i17 = "";
for (var j = 17408; j < 18432; j++)
  i17 += String.fromCharCode(j);
var o17 = i17;
if (i17.replace(/\d+/g, "") !== o17) {
  $ERROR("#17: Error matching character class \d between character 4400 and 47ff");
}

var i18 = "";
for (var j = 18432; j < 19456; j++)
  i18 += String.fromCharCode(j);
var o18 = i18;
if (i18.replace(/\d+/g, "") !== o18) {
  $ERROR("#18: Error matching character class \d between character 4800 and 4bff");
}

var i19 = "";
for (var j = 19456; j < 20480; j++)
  i19 += String.fromCharCode(j);
var o19 = i19;
if (i19.replace(/\d+/g, "") !== o19) {
  $ERROR("#19: Error matching character class \d between character 4c00 and 4fff");
}

var i20 = "";
for (var j = 20480; j < 21504; j++)
  i20 += String.fromCharCode(j);
var o20 = i20;
if (i20.replace(/\d+/g, "") !== o20) {
  $ERROR("#20: Error matching character class \d between character 5000 and 53ff");
}

var i21 = "";
for (var j = 21504; j < 22528; j++)
  i21 += String.fromCharCode(j);
var o21 = i21;
if (i21.replace(/\d+/g, "") !== o21) {
  $ERROR("#21: Error matching character class \d between character 5400 and 57ff");
}

var i22 = "";
for (var j = 22528; j < 23552; j++)
  i22 += String.fromCharCode(j);
var o22 = i22;
if (i22.replace(/\d+/g, "") !== o22) {
  $ERROR("#22: Error matching character class \d between character 5800 and 5bff");
}

var i23 = "";
for (var j = 23552; j < 24576; j++)
  i23 += String.fromCharCode(j);
var o23 = i23;
if (i23.replace(/\d+/g, "") !== o23) {
  $ERROR("#23: Error matching character class \d between character 5c00 and 5fff");
}

var i24 = "";
for (var j = 24576; j < 25600; j++)
  i24 += String.fromCharCode(j);
var o24 = i24;
if (i24.replace(/\d+/g, "") !== o24) {
  $ERROR("#24: Error matching character class \d between character 6000 and 63ff");
}

var i25 = "";
for (var j = 25600; j < 26624; j++)
  i25 += String.fromCharCode(j);
var o25 = i25;
if (i25.replace(/\d+/g, "") !== o25) {
  $ERROR("#25: Error matching character class \d between character 6400 and 67ff");
}

var i26 = "";
for (var j = 26624; j < 27648; j++)
  i26 += String.fromCharCode(j);
var o26 = i26;
if (i26.replace(/\d+/g, "") !== o26) {
  $ERROR("#26: Error matching character class \d between character 6800 and 6bff");
}

var i27 = "";
for (var j = 27648; j < 28672; j++)
  i27 += String.fromCharCode(j);
var o27 = i27;
if (i27.replace(/\d+/g, "") !== o27) {
  $ERROR("#27: Error matching character class \d between character 6c00 and 6fff");
}

var i28 = "";
for (var j = 28672; j < 29696; j++)
  i28 += String.fromCharCode(j);
var o28 = i28;
if (i28.replace(/\d+/g, "") !== o28) {
  $ERROR("#28: Error matching character class \d between character 7000 and 73ff");
}

var i29 = "";
for (var j = 29696; j < 30720; j++)
  i29 += String.fromCharCode(j);
var o29 = i29;
if (i29.replace(/\d+/g, "") !== o29) {
  $ERROR("#29: Error matching character class \d between character 7400 and 77ff");
}

var i30 = "";
for (var j = 30720; j < 31744; j++)
  i30 += String.fromCharCode(j);
var o30 = i30;
if (i30.replace(/\d+/g, "") !== o30) {
  $ERROR("#30: Error matching character class \d between character 7800 and 7bff");
}

var i31 = "";
for (var j = 31744; j < 32768; j++)
  i31 += String.fromCharCode(j);
var o31 = i31;
if (i31.replace(/\d+/g, "") !== o31) {
  $ERROR("#31: Error matching character class \d between character 7c00 and 7fff");
}

var i32 = "";
for (var j = 32768; j < 33792; j++)
  i32 += String.fromCharCode(j);
var o32 = i32;
if (i32.replace(/\d+/g, "") !== o32) {
  $ERROR("#32: Error matching character class \d between character 8000 and 83ff");
}

var i33 = "";
for (var j = 33792; j < 34816; j++)
  i33 += String.fromCharCode(j);
var o33 = i33;
if (i33.replace(/\d+/g, "") !== o33) {
  $ERROR("#33: Error matching character class \d between character 8400 and 87ff");
}

var i34 = "";
for (var j = 34816; j < 35840; j++)
  i34 += String.fromCharCode(j);
var o34 = i34;
if (i34.replace(/\d+/g, "") !== o34) {
  $ERROR("#34: Error matching character class \d between character 8800 and 8bff");
}

var i35 = "";
for (var j = 35840; j < 36864; j++)
  i35 += String.fromCharCode(j);
var o35 = i35;
if (i35.replace(/\d+/g, "") !== o35) {
  $ERROR("#35: Error matching character class \d between character 8c00 and 8fff");
}

var i36 = "";
for (var j = 36864; j < 37888; j++)
  i36 += String.fromCharCode(j);
var o36 = i36;
if (i36.replace(/\d+/g, "") !== o36) {
  $ERROR("#36: Error matching character class \d between character 9000 and 93ff");
}

var i37 = "";
for (var j = 37888; j < 38912; j++)
  i37 += String.fromCharCode(j);
var o37 = i37;
if (i37.replace(/\d+/g, "") !== o37) {
  $ERROR("#37: Error matching character class \d between character 9400 and 97ff");
}

var i38 = "";
for (var j = 38912; j < 39936; j++)
  i38 += String.fromCharCode(j);
var o38 = i38;
if (i38.replace(/\d+/g, "") !== o38) {
  $ERROR("#38: Error matching character class \d between character 9800 and 9bff");
}

var i39 = "";
for (var j = 39936; j < 40960; j++)
  i39 += String.fromCharCode(j);
var o39 = i39;
if (i39.replace(/\d+/g, "") !== o39) {
  $ERROR("#39: Error matching character class \d between character 9c00 and 9fff");
}

var i40 = "";
for (var j = 40960; j < 41984; j++)
  i40 += String.fromCharCode(j);
var o40 = i40;
if (i40.replace(/\d+/g, "") !== o40) {
  $ERROR("#40: Error matching character class \d between character a000 and a3ff");
}

var i41 = "";
for (var j = 41984; j < 43008; j++)
  i41 += String.fromCharCode(j);
var o41 = i41;
if (i41.replace(/\d+/g, "") !== o41) {
  $ERROR("#41: Error matching character class \d between character a400 and a7ff");
}

var i42 = "";
for (var j = 43008; j < 44032; j++)
  i42 += String.fromCharCode(j);
var o42 = i42;
if (i42.replace(/\d+/g, "") !== o42) {
  $ERROR("#42: Error matching character class \d between character a800 and abff");
}

var i43 = "";
for (var j = 44032; j < 45056; j++)
  i43 += String.fromCharCode(j);
var o43 = i43;
if (i43.replace(/\d+/g, "") !== o43) {
  $ERROR("#43: Error matching character class \d between character ac00 and afff");
}

var i44 = "";
for (var j = 45056; j < 46080; j++)
  i44 += String.fromCharCode(j);
var o44 = i44;
if (i44.replace(/\d+/g, "") !== o44) {
  $ERROR("#44: Error matching character class \d between character b000 and b3ff");
}

var i45 = "";
for (var j = 46080; j < 47104; j++)
  i45 += String.fromCharCode(j);
var o45 = i45;
if (i45.replace(/\d+/g, "") !== o45) {
  $ERROR("#45: Error matching character class \d between character b400 and b7ff");
}

var i46 = "";
for (var j = 47104; j < 48128; j++)
  i46 += String.fromCharCode(j);
var o46 = i46;
if (i46.replace(/\d+/g, "") !== o46) {
  $ERROR("#46: Error matching character class \d between character b800 and bbff");
}

var i47 = "";
for (var j = 48128; j < 49152; j++)
  i47 += String.fromCharCode(j);
var o47 = i47;
if (i47.replace(/\d+/g, "") !== o47) {
  $ERROR("#47: Error matching character class \d between character bc00 and bfff");
}

var i48 = "";
for (var j = 49152; j < 50176; j++)
  i48 += String.fromCharCode(j);
var o48 = i48;
if (i48.replace(/\d+/g, "") !== o48) {
  $ERROR("#48: Error matching character class \d between character c000 and c3ff");
}

var i49 = "";
for (var j = 50176; j < 51200; j++)
  i49 += String.fromCharCode(j);
var o49 = i49;
if (i49.replace(/\d+/g, "") !== o49) {
  $ERROR("#49: Error matching character class \d between character c400 and c7ff");
}

var i50 = "";
for (var j = 51200; j < 52224; j++)
  i50 += String.fromCharCode(j);
var o50 = i50;
if (i50.replace(/\d+/g, "") !== o50) {
  $ERROR("#50: Error matching character class \d between character c800 and cbff");
}

var i51 = "";
for (var j = 52224; j < 53248; j++)
  i51 += String.fromCharCode(j);
var o51 = i51;
if (i51.replace(/\d+/g, "") !== o51) {
  $ERROR("#51: Error matching character class \d between character cc00 and cfff");
}

var i52 = "";
for (var j = 53248; j < 54272; j++)
  i52 += String.fromCharCode(j);
var o52 = i52;
if (i52.replace(/\d+/g, "") !== o52) {
  $ERROR("#52: Error matching character class \d between character d000 and d3ff");
}

var i53 = "";
for (var j = 54272; j < 55296; j++)
  i53 += String.fromCharCode(j);
var o53 = i53;
if (i53.replace(/\d+/g, "") !== o53) {
  $ERROR("#53: Error matching character class \d between character d400 and d7ff");
}

var i54 = "";
for (var j = 55296; j < 56320; j++)
  i54 += String.fromCharCode(j);
var o54 = i54;
if (i54.replace(/\d+/g, "") !== o54) {
  $ERROR("#54: Error matching character class \d between character d800 and dbff");
}

var i55 = "";
for (var j = 56320; j < 57344; j++)
  i55 += String.fromCharCode(j);
var o55 = i55;
if (i55.replace(/\d+/g, "") !== o55) {
  $ERROR("#55: Error matching character class \d between character dc00 and dfff");
}

var i56 = "";
for (var j = 57344; j < 58368; j++)
  i56 += String.fromCharCode(j);
var o56 = i56;
if (i56.replace(/\d+/g, "") !== o56) {
  $ERROR("#56: Error matching character class \d between character e000 and e3ff");
}

var i57 = "";
for (var j = 58368; j < 59392; j++)
  i57 += String.fromCharCode(j);
var o57 = i57;
if (i57.replace(/\d+/g, "") !== o57) {
  $ERROR("#57: Error matching character class \d between character e400 and e7ff");
}

var i58 = "";
for (var j = 59392; j < 60416; j++)
  i58 += String.fromCharCode(j);
var o58 = i58;
if (i58.replace(/\d+/g, "") !== o58) {
  $ERROR("#58: Error matching character class \d between character e800 and ebff");
}

var i59 = "";
for (var j = 60416; j < 61440; j++)
  i59 += String.fromCharCode(j);
var o59 = i59;
if (i59.replace(/\d+/g, "") !== o59) {
  $ERROR("#59: Error matching character class \d between character ec00 and efff");
}

var i60 = "";
for (var j = 61440; j < 62464; j++)
  i60 += String.fromCharCode(j);
var o60 = i60;
if (i60.replace(/\d+/g, "") !== o60) {
  $ERROR("#60: Error matching character class \d between character f000 and f3ff");
}

var i61 = "";
for (var j = 62464; j < 63488; j++)
  i61 += String.fromCharCode(j);
var o61 = i61;
if (i61.replace(/\d+/g, "") !== o61) {
  $ERROR("#61: Error matching character class \d between character f400 and f7ff");
}

var i62 = "";
for (var j = 63488; j < 64512; j++)
  i62 += String.fromCharCode(j);
var o62 = i62;
if (i62.replace(/\d+/g, "") !== o62) {
  $ERROR("#62: Error matching character class \d between character f800 and fbff");
}

var i63 = "";
for (var j = 64512; j < 65536; j++)
  i63 += String.fromCharCode(j);
var o63 = i63;
if (i63.replace(/\d+/g, "") !== o63) {
  $ERROR("#63: Error matching character class \d between character fc00 and ffff");
}

