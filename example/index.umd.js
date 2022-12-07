/*
 * RollupTypescriptLibStarter.js v0.1.0
 * (c) 2022 shineshao <xiaoshaoqq@gmail.com>
 * Released under the MIT License.
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      (global.RollupTypescriptLibStarter = factory()))
})(this, function () {
  'use strict'

  var Person = /** @class */ (function () {
    function Person(name) {
      this.name = name
    }
    Person.prototype.getName = function () {
      return this.name
    }
    Person.prototype.setName = function (name) {
      this.name = name
      // _concat([1], 2, [3], [[4]])
    }
    return Person
  })()
  // import { fromEvent } from 'rxjs'
  // fromEvent(document, 'click').subscribe(e => console.log(e))

  return Person
})
