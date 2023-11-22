Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
  "compilerOptions": {
    "target": "<%- options.useTsWithBabel ? 'esnext' : 'es5' %>",
    "module": "esnext",
    <%_ if (options.classComponent) { _%>
    "experimentalDecorators": true,
    <%_ } _%>
    "sourceMap": true,
    "types": [
      "webpack-env"<% if (hasMocha || hasJest) { %>,<% } %>
      <%_ if (hasMocha) { _%>
      "mocha",
      "chai"
      <%_ } else if (hasJest) { _%>
      "jest"
      <%_ } _%>
    ]
  }
}



configFileName:: tsconfig.json
CompilerOptions::
{
  "module": 99,
  "experimentalDecorators": true,
  "configFilePath": "tsconfig.json"
}
Errors::
[96mtsconfig.json[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS5092: [0mThe root value of a 'tsconfig.json' file must be an object.

[7m  1[0m {
[7m   [0m [91m~[0m
[7m  2[0m   "compilerOptions": {
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m 18[0m   }
[7m   [0m [91m~~~[0m
[7m 19[0m }
[7m   [0m [91m~[0m
[96mtsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS6046: [0mArgument for '--target' option must be: 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext'.

[7m3[0m     "target": "<%- options.useTsWithBabel ? 'esnext' : 'es5' %>",
[7m [0m [91m              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtsconfig.json[0m:[93m5[0m:[93m7[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m5[0m     <%_ if (options.classComponent) { _%>
[7m [0m [91m      ~[0m
[96mtsconfig.json[0m:[93m5[0m:[93m9[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m5[0m     <%_ if (options.classComponent) { _%>
[7m [0m [91m        ~~[0m
[96mtsconfig.json[0m:[93m5[0m:[93m20[0m - [91merror[0m[90m TS1327: [0mString literal with double quotes expected.

[7m5[0m     <%_ if (options.classComponent) { _%>
[7m [0m [91m                   [0m
[96mtsconfig.json[0m:[93m5[0m:[93m20[0m - [91merror[0m[90m TS1328: [0mProperty value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.

[7m5[0m     <%_ if (options.classComponent) { _%>
[7m [0m [91m                   ~~~~~~~~~~~~~~~[0m
[96mtsconfig.json[0m:[93m5[0m:[93m39[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m5[0m     <%_ if (options.classComponent) { _%>
[7m [0m [91m                                      ~[0m
[96mtsconfig.json[0m:[93m7[0m:[93m7[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m7[0m     <%_ } _%>
[7m [0m [91m      ~[0m
[96mtsconfig.json[0m:[93m7[0m:[93m11[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m7[0m     <%_ } _%>
[7m [0m [91m          ~[0m
[96mtsconfig.json[0m:[93m10[0m:[93m7[0m - [91merror[0m[90m TS1328: [0mProperty value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.

[7m10[0m       "webpack-env"<% if (hasMocha || hasJest) { %>,<% } %>
[7m  [0m [91m      ~~~~~~~~~~~~~~~[0m
[96mtsconfig.json[0m:[93m10[0m:[93m23[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m10[0m       "webpack-env"<% if (hasMocha || hasJest) { %>,<% } %>
[7m  [0m [91m                      ~~[0m
[96mtsconfig.json[0m:[93m11[0m:[93m9[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m11[0m       <%_ if (hasMocha) { _%>
[7m  [0m [91m        ~[0m
[96mtsconfig.json[0m:[93m11[0m:[93m11[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m11[0m       <%_ if (hasMocha) { _%>
[7m  [0m [91m          ~~[0m
[96mtsconfig.json[0m:[93m14[0m:[93m13[0m - [91merror[0m[90m TS1327: [0mString literal with double quotes expected.

[7m14[0m       <%_ } else if (hasJest) { _%>
[7m  [0m [91m            ~~~~[0m
[96mtsconfig.json[0m:[93m14[0m:[93m17[0m - [91merror[0m[90m TS1328: [0mProperty value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.

[7m14[0m       <%_ } else if (hasJest) { _%>
[7m  [0m [91m                [0m
[96mtsconfig.json[0m:[93m14[0m:[93m18[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m14[0m       <%_ } else if (hasJest) { _%>
[7m  [0m [91m                 ~~[0m
[96mtsconfig.json[0m:[93m16[0m:[93m13[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m16[0m       <%_ } _%>
[7m  [0m [91m            ~[0m

