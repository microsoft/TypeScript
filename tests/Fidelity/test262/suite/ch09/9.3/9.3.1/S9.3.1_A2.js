// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of StringNumericLiteral ::: StrWhiteSpace is 0
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A2.js
 * @description Strings with various WhiteSpaces convert to Number by explicit transformation
 */

// CHECK#1
if (Number("\u0009\u000C\u0020\u00A0\u000B\u000A\u000D\u2028\u2029\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000") !== 0) {
  $ERROR('#1.1: Number("\\u0009\\u000C\\u0020\\u00A0\\u000B\\u000A\\u000D\\u2028\\u2029\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000") === 0. Actual: ' + (Number("\u0009\u000C\u0020\u00A0\u000B\u000A\u000D\u2028\u2029\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000")));
} else {
  if (1/Number("\u0009\u000C\u0020\u00A0\u000B\u000A\u000D\u2028\u2029\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000") !== Number.POSITIVE_INFINITY) {
    $ERROR('#1.2: Number("\\u0009\\u000C\\u0020\\u00A0\\u000B\\u000A\\u000D\\u2028\\u2029\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000") === +0. Actual: -0');
  }	
}

// CHECK#2
if (Number(" ") !== 0) {
  $ERROR('#2.1: Number(" ") === 0. Actual: ' + (Number(" ")));
} else {
  if (1/Number(" ") !== Number.POSITIVE_INFINITY) {
    $ERROR('#2.2: Number(" ") === +0. Actual: -0');
  }	
}

// CHECK#3
if (Number("\t") !== 0) {
  $ERROR('#3.1: Number("\\t") === 0. Actual: ' + (Number("\t")));
} else {
  if (1/Number("\t") !== Number.POSITIVE_INFINITY) {
    $ERROR('#3.2: Number("\\t") === +0. Actual: -0');
  }	
}

// CHECK#4
if (Number("\r") !== 0) {
  $ERROR('#4.1: Number("\\r") === 0. Actual: ' + (Number("\r")));
} else {
  if (1/Number("\r") !== Number.POSITIVE_INFINITY) {
    $ERROR('#4.2: Number("\\r") === +0. Actual: -0');
  }	
}

// CHECK#5
if (Number("\n") !== 0) {
  $ERROR('#5.1: Number("\\n") === 0. Actual: ' + (Number("\n")));
} else {
  if (1/Number("\n") !== Number.POSITIVE_INFINITY) {
    $ERROR('#5.2: Number("\\n") === +0. Actual: -0');
  }	
}

// CHECK#6
if (Number("\f") !== 0) {
  $ERROR('#6.1: Number("\\f") === 0. Actual: ' + (Number("\f")));
} else {
  if (1/Number("\f") !== Number.POSITIVE_INFINITY) {
    $ERROR('#6.2: Number("\\f") === +0. Actual: -0');
  }	
}

// CHECK#7
if (Number("\u0009") !== 0) {
  $ERROR('#7.1: Number("\\u0009") === 0. Actual: ' + (Number("\u0009")));
} else {
  if (1/Number("\u0009") !== Number.POSITIVE_INFINITY) {
    $ERROR('#7.2: Number("\\u0009") === +0. Actual: -0');
  }	
}

// CHECK#8
if (Number("\u000A") !== 0) {
  $ERROR('#8.1: Number("\\u000A") === 0. Actual: ' + (Number("\u000A")));
} else {
  if (1/Number("\u000A") !== Number.POSITIVE_INFINITY) {
    $ERROR('#8.2: Number("\\u000A") === +0. Actual: -0');
  }	
}

// CHECK#9
if (Number("\u000B") !== 0) {
  $ERROR('#9.1: Number("\\u000B") === 0. Actual: ' + (Number("\u000B")));
} else {
  if (1/Number("\u000B") !== Number.POSITIVE_INFINITY) {
    $ERROR('#9.1.2: Number("\\u000B") === +0. Actual: -0');
  }	
}

// CHECK#10
if (Number("\u000C") !== 0) {
  $ERROR('#10.1: Number("\\u000C") === 0. Actual: ' + (Number("\u000C")));
} else {
  if (1/Number("\u000C") !== Number.POSITIVE_INFINITY) {
    $ERROR('#10.2: Number("\\u000C") === +0. Actual: -0');
  }	
}

// CHECK#11
if (Number("\u000D") !== 0) {
  $ERROR('#11.1: Number("\\u000D") === 0. Actual: ' + (Number("\u000D")));
} else {
  if (1/Number("\u000D") !== Number.POSITIVE_INFINITY) {
    $ERROR('#11.2: Number("\\u000D") === +0. Actual: -0');
  }	
}

// CHECK#12
if (Number("\u00A0") !== 0) {
  $ERROR('#12.1: Number("\\u00A0") === 0. Actual: ' + (Number("\u00A0")));
} else {
  if (1/Number("\u00A0") !== Number.POSITIVE_INFINITY) {
    $ERROR('#12.2: Number("\\u00A0") === +0. Actual: -0');
  }	
}

// CHECK#13
if (Number("\u0020") !== 0) {
  $ERROR('#13.1: Number("\\u0020") === 0. Actual: ' + (Number("\u0020")));
} else {
  if (1/Number("\u0020") !== Number.POSITIVE_INFINITY) {
    $ERROR('#13.2: Number("\\u0020") === +0. Actual: -0');
  }	
}

// CHECK#14
if (Number("\u2028") !== 0) {
  $ERROR('#14.1: Number("\\u2028") === 0. Actual: ' + (Number("\u2028")));
} else {
  if (1/Number("\u2028") !== Number.POSITIVE_INFINITY) {
    $ERROR('#14.2: Number("\\u2028") === +0. Actual: -0');
  }	
}

// CHECK#15
if (Number("\u2029") !== 0) {
  $ERROR('#15.1: Number("\\u2029") === 0. Actual: ' + (Number("\u2029")));
} else {
  if (1/Number("\u2029") !== Number.POSITIVE_INFINITY) {
    $ERROR('#15.2: Number("\\u2029") === +0. Actual: -0');
  }	
}

// CHECK#16
if (Number("\u1680") !== 0) {
  $ERROR('#16.1: Number("\\u1680") === 0. Actual: ' + (Number("\u1680")));
} else {
  if (1/Number("\u1680") !== Number.POSITIVE_INFINITY) {
    $ERROR('#16.2: Number("\\u1680") === +0. Actual: -0');
  }	
}

// CHECK#17
if (Number("\u180E") !== 0) {
  $ERROR('#17.1: Number("\\u180E") === 0. Actual: ' + (Number("\u180E")));
} else {
  if (1/Number("\u180E") !== Number.POSITIVE_INFINITY) {
    $ERROR('#17.2: Number("\\u180E") === +0. Actual: -0');
  }	
}

// CHECK#18
if (Number("\u2000") !== 0) {
  $ERROR('#18.1: Number("\\u2000") === 0. Actual: ' + (Number("\u2000")));
} else {
  if (1/Number("\u2000") !== Number.POSITIVE_INFINITY) {
    $ERROR('#18.2: Number("\\u2000") === +0. Actual: -0');
  }	
}

// CHECK#19
if (Number("\u2001") !== 0) {
  $ERROR('#19.1: Number("\\u2001") === 0. Actual: ' + (Number("\u2001")));
} else {
  if (1/Number("\u2001") !== Number.POSITIVE_INFINITY) {
    $ERROR('#19.2: Number("\\u2001") === +0. Actual: -0');
  }	
}

// CHECK#20
if (Number("\u2002") !== 0) {
  $ERROR('#20.1: Number("\\u2002") === 0. Actual: ' + (Number("\u2002")));
} else {
  if (1/Number("\u2002") !== Number.POSITIVE_INFINITY) {
    $ERROR('#20.2: Number("\\u2002") === +0. Actual: -0');
  }	
}

// CHECK#21
if (Number("\u2003") !== 0) {
  $ERROR('#21.1: Number("\\u2003") === 0. Actual: ' + (Number("\u2003")));
} else {
  if (1/Number("\u2003") !== Number.POSITIVE_INFINITY) {
    $ERROR('#21.2: Number("\\u2003") === +0. Actual: -0');
  }	
}

// CHECK#22
if (Number("\u2004") !== 0) {
  $ERROR('#22.1: Number("\\u2004") === 0. Actual: ' + (Number("\u2004")));
} else {
  if (1/Number("\u2004") !== Number.POSITIVE_INFINITY) {
    $ERROR('#22.2: Number("\\u2004") === +0. Actual: -0');
  }	
}

// CHECK#23
if (Number("\u2005") !== 0) {
  $ERROR('#23.1: Number("\\u2005") === 0. Actual: ' + (Number("\u2005")));
} else {
  if (1/Number("\u2005") !== Number.POSITIVE_INFINITY) {
    $ERROR('#23.2: Number("\\u2005") === +0. Actual: -0');
  }	
}

// CHECK#24
if (Number("\u2006") !== 0) {
  $ERROR('#24.1: Number("\\u2006") === 0. Actual: ' + (Number("\u2006")));
} else {
  if (1/Number("\u2006") !== Number.POSITIVE_INFINITY) {
    $ERROR('#24.2: Number("\\u2006") === +0. Actual: -0');
  }	
}

// CHECK#25
if (Number("\u2007") !== 0) {
  $ERROR('#25.1: Number("\\u2007") === 0. Actual: ' + (Number("\u2007")));
} else {
  if (1/Number("\u2007") !== Number.POSITIVE_INFINITY) {
    $ERROR('#25.2: Number("\\u2007") === +0. Actual: -0');
  }	
}

// CHECK#26
if (Number("\u2008") !== 0) {
  $ERROR('#26.1: Number("\\u2008") === 0. Actual: ' + (Number("\u2008")));
} else {
  if (1/Number("\u2008") !== Number.POSITIVE_INFINITY) {
    $ERROR('#26.2: Number("\\u2008") === +0. Actual: -0');
  }	
}

// CHECK#27
if (Number("\u2009") !== 0) {
  $ERROR('#27.1: Number("\\u2009") === 0. Actual: ' + (Number("\u2009")));
} else {
  if (1/Number("\u2009") !== Number.POSITIVE_INFINITY) {
    $ERROR('#27.2: Number("\\u2009") === +0. Actual: -0');
  }	
}

// CHECK#28
if (Number("\u200A") !== 0) {
  $ERROR('#28.1: Number("\\u200A") === 0. Actual: ' + (Number("\u200A")));
} else {
  if (1/Number("\u200A") !== Number.POSITIVE_INFINITY) {
    $ERROR('#28.2: Number("\\u200A") === +0. Actual: -0');
  }	
}

// CHECK#29
if (Number("\u202F") !== 0) {
  $ERROR('#29.1: Number("\\u202F") === 0. Actual: ' + (Number("\u202F")));
} else {
  if (1/Number("\u202F") !== Number.POSITIVE_INFINITY) {
    $ERROR('#29.2: Number("\\u202F") === +0. Actual: -0');
  }	
}

// CHECK#30
if (Number("\u205F") !== 0) {
  $ERROR('#30.1: Number("\\u205F") === 0. Actual: ' + (Number("\u205F")));
} else {
  if (1/Number("\u205F") !== Number.POSITIVE_INFINITY) {
    $ERROR('#30.2: Number("\\u205F") === +0. Actual: -0');
  }	
}

// CHECK#31
if (Number("\u3000") !== 0) {
  $ERROR('#31.1: Number("\\u3000") === 0. Actual: ' + (Number("\u3000")));
} else {
  if (1/Number("\u3000") !== Number.POSITIVE_INFINITY) {
    $ERROR('#31.2: Number("\\u3000") === +0. Actual: -0');
  }	
}

