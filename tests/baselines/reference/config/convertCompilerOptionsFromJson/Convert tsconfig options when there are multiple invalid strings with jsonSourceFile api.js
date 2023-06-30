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
[91m● [0m[96mtsconfig.json[0m:[93m1[0m:[93m1[0m  [91mError[0m TS5092
| {
  [91m▔[0m
|   "compilerOptions": {
  [91m▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔[0m
[7m...[0m 
|   }
  [91m▔▔▔[0m
| }
  [91m▔[0m
The root value of a 'tsconfig.json' file must be an object.
[91m● [0m[96mtsconfig.json[0m:[93m3[0m:[93m15[0m  [91mError[0m TS6046
| "target": "<%- options.useTsWithBabel ? 'esnext' : 'es5' %>",
  [91m          ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔[0m
Argument for '--target' option must be: 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext'.
[91m● [0m[96mtsconfig.json[0m:[93m5[0m:[93m7[0m  [91mError[0m TS1136
| <%_ if (options.classComponent) { _%>
  [91m  ▔[0m
Property assignment expected.
[91m● [0m[96mtsconfig.json[0m:[93m5[0m:[93m9[0m  [91mError[0m TS1136
| <%_ if (options.classComponent) { _%>
  [91m    ▔▔[0m
Property assignment expected.
[91m● [0m[96mtsconfig.json[0m:[93m5[0m:[93m20[0m  [91mError[0m TS1327
| <%_ if (options.classComponent) { _%>
  [91m               [0m
String literal with double quotes expected.
[91m● [0m[96mtsconfig.json[0m:[93m5[0m:[93m20[0m  [91mError[0m TS1328
| <%_ if (options.classComponent) { _%>
  [91m               ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔[0m
Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.
[91m● [0m[96mtsconfig.json[0m:[93m5[0m:[93m39[0m  [91mError[0m TS1136
| <%_ if (options.classComponent) { _%>
  [91m                                  ▔[0m
Property assignment expected.
[91m● [0m[96mtsconfig.json[0m:[93m7[0m:[93m7[0m  [91mError[0m TS1136
| <%_ } _%>
  [91m  ▔[0m
Property assignment expected.
[91m● [0m[96mtsconfig.json[0m:[93m7[0m:[93m11[0m  [91mError[0m TS1136
| <%_ } _%>
  [91m      ▔[0m
Property assignment expected.
[91m● [0m[96mtsconfig.json[0m:[93m10[0m:[93m7[0m  [91mError[0m TS1328
| "webpack-env"<% if (hasMocha || hasJest) { %>,<% } %>
  [91m▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔[0m
Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.
[91m● [0m[96mtsconfig.json[0m:[93m10[0m:[93m23[0m  [91mError[0m TS1136
| "webpack-env"<% if (hasMocha || hasJest) { %>,<% } %>
  [91m                ▔▔[0m
Property assignment expected.
[91m● [0m[96mtsconfig.json[0m:[93m11[0m:[93m9[0m  [91mError[0m TS1136
| <%_ if (hasMocha) { _%>
  [91m  ▔[0m
Property assignment expected.
[91m● [0m[96mtsconfig.json[0m:[93m11[0m:[93m11[0m  [91mError[0m TS1136
| <%_ if (hasMocha) { _%>
  [91m    ▔▔[0m
Property assignment expected.
[91m● [0m[96mtsconfig.json[0m:[93m14[0m:[93m13[0m  [91mError[0m TS1327
| <%_ } else if (hasJest) { _%>
  [91m      ▔▔▔▔[0m
String literal with double quotes expected.
[91m● [0m[96mtsconfig.json[0m:[93m14[0m:[93m17[0m  [91mError[0m TS1328
| <%_ } else if (hasJest) { _%>
  [91m          [0m
Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.
[91m● [0m[96mtsconfig.json[0m:[93m14[0m:[93m18[0m  [91mError[0m TS1136
| <%_ } else if (hasJest) { _%>
  [91m           ▔▔[0m
Property assignment expected.
[91m● [0m[96mtsconfig.json[0m:[93m16[0m:[93m13[0m  [91mError[0m TS1136
| <%_ } _%>
  [91m      ▔[0m
Property assignment expected.

