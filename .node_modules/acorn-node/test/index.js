var test = require('tape')
var acorn = require('../')
var baseAcorn = require('acorn')

test('parses object spread syntax', function (t) {
  var ast = acorn.parse('var a = { ...b }')
  t.equal(ast.body[0].declarations[0].init.type, 'ObjectExpression')
  t.equal(ast.body[0].declarations[0].init.properties[0].type, 'SpreadElement')

  ast = acorn.parse('function a ({ ...b }) {}')
  t.equal(ast.body[0].params[0].type, 'ObjectPattern')
  t.equal(ast.body[0].params[0].properties[0].type, 'RestElement')

  t.end()
})

test('does not change main acorn module', function (t) {
  t.throws(function () {
    baseAcorn.parse('var a = { ...b }')
  })
  t.end()
})

test('tokenizes object spread syntax', function (t) {
  var tokenizer = acorn.tokenizer('var a = { ...b }')

  t.doesNotThrow(function (t) {
    while (tokenizer.getToken().type !== acorn.tokTypes.eof) {}
  })
  t.end()
})

test('allows hashbangs by default', function (t) {
  t.doesNotThrow(function () {
    acorn.parse('#!/usr/bin/env node\nconsole.log("ok")')
  })
  t.end()
})

test('allows top level return by default', function (t) {
  t.doesNotThrow(function () {
    acorn.parse('console.log("ok"); return; console.log("not ok")')
  })
  t.end()
})
