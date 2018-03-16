(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({"/var/www/loopring/assets/js/global.js":[function(require,module,exports){
"use strict";

var _binder = require("./libs/binder");

var _binder2 = _interopRequireDefault(_binder);

var _module = require("./modules/module");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = [{
    "html": [_module.constants, _module.staticFunctions],
    "body": [_module.commonFunction, _module.anotherCommonFunction],
    ".header": _module.navFunction
}];

_binder2.default.apply(undefined, args);

},{"./libs/binder":"/var/www/loopring/assets/js/libs/binder.js","./modules/module":"/var/www/loopring/assets/js/modules/module.js"}],"/var/www/loopring/assets/js/libs/binder.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

exports.default = binder;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// v.2.1

function binder(selectorsAndFunctionsBounds) {
    var runTests = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var t0 = void 0,
        t1 = void 0;
    if (runTests) t0 = performance.now();
    // polyfill for ".matches()" method
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector;
    }
    // gather all selectors in array
    var selectorsToFind = (0, _keys2.default)(selectorsAndFunctionsBounds);
    // find selectors in document
    var foundElements = [].concat((0, _toConsumableArray3.default)(document.querySelectorAll(selectorsToFind.join(","))));
    // filter bounds for not founded selectors
    var filteredBounds = {};

    var _loop = function _loop(key) {
        if (foundElements.some(function (element) {
            return element.matches(key);
        })) {
            filteredBounds[key] = selectorsAndFunctionsBounds[key];
        } else {
            if (runTests) console.log("- " + key + " was not found");
        }
    };

    for (var key in selectorsAndFunctionsBounds) {
        _loop(key);
    }
    // gather all modules in one object
    var mergedModules = {};
    for (var bound in filteredBounds) {
        var module = filteredBounds[bound];
        var nature = Object.prototype.toString.call(module);
        if (nature === "[object Array]") {
            module.forEach(function (script) {
                if (Object.prototype.toString.call(script) === "[object Function]") {
                    mergedModules[script.name] = script;
                    mergedModules[script.name]();
                } else {
                    mergedModules = (0, _assign2.default)(mergedModules, script);
                }
            });
        } else if (nature === "[object Object]") {
            mergedModules = (0, _assign2.default)(mergedModules, module);
        } else if (nature === "[object Function]") {
            mergedModules[module.name] = module;
            mergedModules[module.name]();
        } else {
            console.log("! unsupported format: ", module);
        }
    }
    if (runTests) console.log("binderResultObject: ", mergedModules);
    if (runTests) t1 = performance.now();
    if (runTests) console.log("Binder html parsing took " + (t1 - t0) + " milliseconds.");
}

},{"babel-runtime/core-js/object/assign":"/var/www/loopring/node_modules/babel-runtime/core-js/object/assign.js","babel-runtime/core-js/object/keys":"/var/www/loopring/node_modules/babel-runtime/core-js/object/keys.js","babel-runtime/helpers/toConsumableArray":"/var/www/loopring/node_modules/babel-runtime/helpers/toConsumableArray.js"}],"/var/www/loopring/assets/js/modules/module.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.commonFunction = commonFunction;
exports.anotherCommonFunction = anotherCommonFunction;
exports.navFunction = navFunction;

// these properies are available from anywhere via this.propery
var constants = exports.constants = {
    isTouch: "ontouchstart" in window ? function () {
        document.body.classList.add("touch");return true;
    }() : false,
    body: $("body")

    // these functions won't run at once, but can be executed by demand from anywhere via this.functionName
};var staticFunctions = exports.staticFunctions = {
    sparedFunction: function sparedFunction() {
        console.log("spareFunction executed");
    },
    anotherSparedFunction: function anotherSparedFunction(arg) {
        console.log("anotherSpareFunction executed with args: " + arg);
    }
};

// runs at once. runs on all pages because of bound with 'body' selector
function commonFunction() {
    console.log("window was loaded");
    // isTouch is available from anywhere via this.isTouch
    console.log("is touch: " + this.isTouch);
}

// runs at once. runs on all pages because of bound with 'body' selector
function anotherCommonFunction() {
    window.addEventListener("resize", function () {
        setTimeout(function () {
            console.log("window was resized");
        }, 500);
    });
}

// runs at once. runs anywhere, where .header selector can be found
function navFunction() {
    console.log("navFunction executed");
    // body is available from anywhere via this.body
    console.log('body height:', this.body.height());
    // static function is available from anywhere via this.functionName
    this.anotherSparedFunction('myArg');
}

},{}],"/var/www/loopring/node_modules/babel-runtime/core-js/array/from.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":"/var/www/loopring/node_modules/core-js/library/fn/array/from.js"}],"/var/www/loopring/node_modules/babel-runtime/core-js/object/assign.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":"/var/www/loopring/node_modules/core-js/library/fn/object/assign.js"}],"/var/www/loopring/node_modules/babel-runtime/core-js/object/keys.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":"/var/www/loopring/node_modules/core-js/library/fn/object/keys.js"}],"/var/www/loopring/node_modules/babel-runtime/helpers/toConsumableArray.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
},{"../core-js/array/from":"/var/www/loopring/node_modules/babel-runtime/core-js/array/from.js"}],"/var/www/loopring/node_modules/core-js/library/fn/array/from.js":[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":"/var/www/loopring/node_modules/core-js/library/modules/_core.js","../../modules/es6.array.from":"/var/www/loopring/node_modules/core-js/library/modules/es6.array.from.js","../../modules/es6.string.iterator":"/var/www/loopring/node_modules/core-js/library/modules/es6.string.iterator.js"}],"/var/www/loopring/node_modules/core-js/library/fn/object/assign.js":[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":"/var/www/loopring/node_modules/core-js/library/modules/_core.js","../../modules/es6.object.assign":"/var/www/loopring/node_modules/core-js/library/modules/es6.object.assign.js"}],"/var/www/loopring/node_modules/core-js/library/fn/object/keys.js":[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/_core":"/var/www/loopring/node_modules/core-js/library/modules/_core.js","../../modules/es6.object.keys":"/var/www/loopring/node_modules/core-js/library/modules/es6.object.keys.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_a-function.js":[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_an-object.js":[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"/var/www/loopring/node_modules/core-js/library/modules/_is-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_array-includes.js":[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":"/var/www/loopring/node_modules/core-js/library/modules/_to-absolute-index.js","./_to-iobject":"/var/www/loopring/node_modules/core-js/library/modules/_to-iobject.js","./_to-length":"/var/www/loopring/node_modules/core-js/library/modules/_to-length.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_classof.js":[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"/var/www/loopring/node_modules/core-js/library/modules/_cof.js","./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_cof.js":[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_core.js":[function(require,module,exports){
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_create-property.js":[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"/var/www/loopring/node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"/var/www/loopring/node_modules/core-js/library/modules/_property-desc.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_ctx.js":[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"/var/www/loopring/node_modules/core-js/library/modules/_a-function.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_defined.js":[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_descriptors.js":[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"/var/www/loopring/node_modules/core-js/library/modules/_fails.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_dom-create.js":[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":"/var/www/loopring/node_modules/core-js/library/modules/_global.js","./_is-object":"/var/www/loopring/node_modules/core-js/library/modules/_is-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_enum-bug-keys.js":[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_export.js":[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":"/var/www/loopring/node_modules/core-js/library/modules/_core.js","./_ctx":"/var/www/loopring/node_modules/core-js/library/modules/_ctx.js","./_global":"/var/www/loopring/node_modules/core-js/library/modules/_global.js","./_hide":"/var/www/loopring/node_modules/core-js/library/modules/_hide.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_fails.js":[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_global.js":[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_has.js":[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_hide.js":[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":"/var/www/loopring/node_modules/core-js/library/modules/_descriptors.js","./_object-dp":"/var/www/loopring/node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"/var/www/loopring/node_modules/core-js/library/modules/_property-desc.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_html.js":[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"/var/www/loopring/node_modules/core-js/library/modules/_global.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_ie8-dom-define.js":[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"/var/www/loopring/node_modules/core-js/library/modules/_descriptors.js","./_dom-create":"/var/www/loopring/node_modules/core-js/library/modules/_dom-create.js","./_fails":"/var/www/loopring/node_modules/core-js/library/modules/_fails.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_iobject.js":[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"/var/www/loopring/node_modules/core-js/library/modules/_cof.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_is-array-iter.js":[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"/var/www/loopring/node_modules/core-js/library/modules/_iterators.js","./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_is-object.js":[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_iter-call.js":[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"/var/www/loopring/node_modules/core-js/library/modules/_an-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_iter-create.js":[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":"/var/www/loopring/node_modules/core-js/library/modules/_hide.js","./_object-create":"/var/www/loopring/node_modules/core-js/library/modules/_object-create.js","./_property-desc":"/var/www/loopring/node_modules/core-js/library/modules/_property-desc.js","./_set-to-string-tag":"/var/www/loopring/node_modules/core-js/library/modules/_set-to-string-tag.js","./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_iter-define.js":[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var has = require('./_has');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":"/var/www/loopring/node_modules/core-js/library/modules/_export.js","./_has":"/var/www/loopring/node_modules/core-js/library/modules/_has.js","./_hide":"/var/www/loopring/node_modules/core-js/library/modules/_hide.js","./_iter-create":"/var/www/loopring/node_modules/core-js/library/modules/_iter-create.js","./_iterators":"/var/www/loopring/node_modules/core-js/library/modules/_iterators.js","./_library":"/var/www/loopring/node_modules/core-js/library/modules/_library.js","./_object-gpo":"/var/www/loopring/node_modules/core-js/library/modules/_object-gpo.js","./_redefine":"/var/www/loopring/node_modules/core-js/library/modules/_redefine.js","./_set-to-string-tag":"/var/www/loopring/node_modules/core-js/library/modules/_set-to-string-tag.js","./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_iter-detect.js":[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_iterators.js":[function(require,module,exports){
module.exports = {};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_library.js":[function(require,module,exports){
module.exports = true;

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_object-assign.js":[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":"/var/www/loopring/node_modules/core-js/library/modules/_fails.js","./_iobject":"/var/www/loopring/node_modules/core-js/library/modules/_iobject.js","./_object-gops":"/var/www/loopring/node_modules/core-js/library/modules/_object-gops.js","./_object-keys":"/var/www/loopring/node_modules/core-js/library/modules/_object-keys.js","./_object-pie":"/var/www/loopring/node_modules/core-js/library/modules/_object-pie.js","./_to-object":"/var/www/loopring/node_modules/core-js/library/modules/_to-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-create.js":[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"/var/www/loopring/node_modules/core-js/library/modules/_an-object.js","./_dom-create":"/var/www/loopring/node_modules/core-js/library/modules/_dom-create.js","./_enum-bug-keys":"/var/www/loopring/node_modules/core-js/library/modules/_enum-bug-keys.js","./_html":"/var/www/loopring/node_modules/core-js/library/modules/_html.js","./_object-dps":"/var/www/loopring/node_modules/core-js/library/modules/_object-dps.js","./_shared-key":"/var/www/loopring/node_modules/core-js/library/modules/_shared-key.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-dp.js":[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"/var/www/loopring/node_modules/core-js/library/modules/_an-object.js","./_descriptors":"/var/www/loopring/node_modules/core-js/library/modules/_descriptors.js","./_ie8-dom-define":"/var/www/loopring/node_modules/core-js/library/modules/_ie8-dom-define.js","./_to-primitive":"/var/www/loopring/node_modules/core-js/library/modules/_to-primitive.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-dps.js":[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":"/var/www/loopring/node_modules/core-js/library/modules/_an-object.js","./_descriptors":"/var/www/loopring/node_modules/core-js/library/modules/_descriptors.js","./_object-dp":"/var/www/loopring/node_modules/core-js/library/modules/_object-dp.js","./_object-keys":"/var/www/loopring/node_modules/core-js/library/modules/_object-keys.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-gops.js":[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_object-gpo.js":[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"/var/www/loopring/node_modules/core-js/library/modules/_has.js","./_shared-key":"/var/www/loopring/node_modules/core-js/library/modules/_shared-key.js","./_to-object":"/var/www/loopring/node_modules/core-js/library/modules/_to-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-keys-internal.js":[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":"/var/www/loopring/node_modules/core-js/library/modules/_array-includes.js","./_has":"/var/www/loopring/node_modules/core-js/library/modules/_has.js","./_shared-key":"/var/www/loopring/node_modules/core-js/library/modules/_shared-key.js","./_to-iobject":"/var/www/loopring/node_modules/core-js/library/modules/_to-iobject.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-keys.js":[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":"/var/www/loopring/node_modules/core-js/library/modules/_enum-bug-keys.js","./_object-keys-internal":"/var/www/loopring/node_modules/core-js/library/modules/_object-keys-internal.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-pie.js":[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_object-sap.js":[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":"/var/www/loopring/node_modules/core-js/library/modules/_core.js","./_export":"/var/www/loopring/node_modules/core-js/library/modules/_export.js","./_fails":"/var/www/loopring/node_modules/core-js/library/modules/_fails.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_property-desc.js":[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_redefine.js":[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":"/var/www/loopring/node_modules/core-js/library/modules/_hide.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_set-to-string-tag.js":[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":"/var/www/loopring/node_modules/core-js/library/modules/_has.js","./_object-dp":"/var/www/loopring/node_modules/core-js/library/modules/_object-dp.js","./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_shared-key.js":[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"/var/www/loopring/node_modules/core-js/library/modules/_shared.js","./_uid":"/var/www/loopring/node_modules/core-js/library/modules/_uid.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_shared.js":[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":"/var/www/loopring/node_modules/core-js/library/modules/_global.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_string-at.js":[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":"/var/www/loopring/node_modules/core-js/library/modules/_defined.js","./_to-integer":"/var/www/loopring/node_modules/core-js/library/modules/_to-integer.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_to-absolute-index.js":[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"/var/www/loopring/node_modules/core-js/library/modules/_to-integer.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_to-integer.js":[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_to-iobject.js":[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":"/var/www/loopring/node_modules/core-js/library/modules/_defined.js","./_iobject":"/var/www/loopring/node_modules/core-js/library/modules/_iobject.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_to-length.js":[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"/var/www/loopring/node_modules/core-js/library/modules/_to-integer.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_to-object.js":[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"/var/www/loopring/node_modules/core-js/library/modules/_defined.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_to-primitive.js":[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"/var/www/loopring/node_modules/core-js/library/modules/_is-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_uid.js":[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_wks.js":[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":"/var/www/loopring/node_modules/core-js/library/modules/_global.js","./_shared":"/var/www/loopring/node_modules/core-js/library/modules/_shared.js","./_uid":"/var/www/loopring/node_modules/core-js/library/modules/_uid.js"}],"/var/www/loopring/node_modules/core-js/library/modules/core.get-iterator-method.js":[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"/var/www/loopring/node_modules/core-js/library/modules/_classof.js","./_core":"/var/www/loopring/node_modules/core-js/library/modules/_core.js","./_iterators":"/var/www/loopring/node_modules/core-js/library/modules/_iterators.js","./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/es6.array.from.js":[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":"/var/www/loopring/node_modules/core-js/library/modules/_create-property.js","./_ctx":"/var/www/loopring/node_modules/core-js/library/modules/_ctx.js","./_export":"/var/www/loopring/node_modules/core-js/library/modules/_export.js","./_is-array-iter":"/var/www/loopring/node_modules/core-js/library/modules/_is-array-iter.js","./_iter-call":"/var/www/loopring/node_modules/core-js/library/modules/_iter-call.js","./_iter-detect":"/var/www/loopring/node_modules/core-js/library/modules/_iter-detect.js","./_to-length":"/var/www/loopring/node_modules/core-js/library/modules/_to-length.js","./_to-object":"/var/www/loopring/node_modules/core-js/library/modules/_to-object.js","./core.get-iterator-method":"/var/www/loopring/node_modules/core-js/library/modules/core.get-iterator-method.js"}],"/var/www/loopring/node_modules/core-js/library/modules/es6.object.assign.js":[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"/var/www/loopring/node_modules/core-js/library/modules/_export.js","./_object-assign":"/var/www/loopring/node_modules/core-js/library/modules/_object-assign.js"}],"/var/www/loopring/node_modules/core-js/library/modules/es6.object.keys.js":[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":"/var/www/loopring/node_modules/core-js/library/modules/_object-keys.js","./_object-sap":"/var/www/loopring/node_modules/core-js/library/modules/_object-sap.js","./_to-object":"/var/www/loopring/node_modules/core-js/library/modules/_to-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/es6.string.iterator.js":[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":"/var/www/loopring/node_modules/core-js/library/modules/_iter-define.js","./_string-at":"/var/www/loopring/node_modules/core-js/library/modules/_string-at.js"}]},{},["/var/www/loopring/assets/js/global.js"])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvZ2xvYmFsLmpzIiwiYXNzZXRzL2pzL2xpYnMvYmluZGVyLmpzIiwiYXNzZXRzL2pzL21vZHVsZXMvbW9kdWxlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFJLE9BQU8sQ0FDUDtBQUNJLFlBQVEsNENBRFo7QUFFSSxZQUFRLHVEQUZaO0FBR0k7QUFISixDQURPLENBQVg7O0FBU0Esa0NBQVUsSUFBVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ1h3QixNOzs7O0FBRnhCOztBQUVlLFNBQVMsTUFBVCxDQUFnQiwyQkFBaEIsRUFBK0Q7QUFBQSxRQUFsQixRQUFrQix1RUFBUCxLQUFPOztBQUMxRSxRQUFJLFdBQUo7QUFBQSxRQUFRLFdBQVI7QUFDQSxRQUFJLFFBQUosRUFBYyxLQUFLLFlBQVksR0FBWixFQUFMO0FBQ2Q7QUFDQSxRQUFJLENBQUMsUUFBUSxTQUFSLENBQWtCLE9BQXZCLEVBQWdDO0FBQzVCLGdCQUFRLFNBQVIsQ0FBa0IsT0FBbEIsR0FBNEIsUUFBUSxTQUFSLENBQWtCLGlCQUE5QztBQUNIO0FBQ0Q7QUFDQSxRQUFNLGtCQUFrQixvQkFBWSwyQkFBWixDQUF4QjtBQUNBO0FBQ0EsUUFBTSwyREFBb0IsU0FBUyxnQkFBVCxDQUEwQixnQkFBZ0IsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBMUIsQ0FBcEIsRUFBTjtBQUNBO0FBQ0EsUUFBSSxpQkFBaUIsRUFBckI7O0FBWjBFLCtCQWFqRSxHQWJpRTtBQWN0RSxZQUFJLGNBQWMsSUFBZCxDQUFtQjtBQUFBLG1CQUFXLFFBQVEsT0FBUixDQUFnQixHQUFoQixDQUFYO0FBQUEsU0FBbkIsQ0FBSixFQUF5RDtBQUNyRCwyQkFBZSxHQUFmLElBQXNCLDRCQUE0QixHQUE1QixDQUF0QjtBQUNILFNBRkQsTUFFTztBQUNILGdCQUFJLFFBQUosRUFBYyxRQUFRLEdBQVIsUUFBaUIsR0FBakI7QUFDakI7QUFsQnFFOztBQWExRSxTQUFLLElBQUksR0FBVCxJQUFnQiwyQkFBaEIsRUFBNkM7QUFBQSxjQUFwQyxHQUFvQztBQU01QztBQUNEO0FBQ0EsUUFBSSxnQkFBZ0IsRUFBcEI7QUFDQSxTQUFLLElBQUksS0FBVCxJQUFrQixjQUFsQixFQUFrQztBQUM5QixZQUFJLFNBQVMsZUFBZSxLQUFmLENBQWI7QUFDQSxZQUFJLFNBQVMsT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLE1BQS9CLENBQWI7QUFDQSxZQUFJLFdBQVcsZ0JBQWYsRUFBaUM7QUFDN0IsbUJBQU8sT0FBUCxDQUFlLGtCQUFVO0FBQ3JCLG9CQUFJLE9BQU8sU0FBUCxDQUFpQixRQUFqQixDQUEwQixJQUExQixDQUErQixNQUEvQixNQUEyQyxtQkFBL0MsRUFBb0U7QUFDaEUsa0NBQWMsT0FBTyxJQUFyQixJQUE2QixNQUE3QjtBQUNBLGtDQUFjLE9BQU8sSUFBckI7QUFDSCxpQkFIRCxNQUdPO0FBQ0gsb0NBQWdCLHNCQUFjLGFBQWQsRUFBNkIsTUFBN0IsQ0FBaEI7QUFDSDtBQUNKLGFBUEQ7QUFRSCxTQVRELE1BU08sSUFBSSxXQUFXLGlCQUFmLEVBQWtDO0FBQ3JDLDRCQUFnQixzQkFBYyxhQUFkLEVBQTZCLE1BQTdCLENBQWhCO0FBQ0gsU0FGTSxNQUVBLElBQUksV0FBVyxtQkFBZixFQUFvQztBQUN2QywwQkFBYyxPQUFPLElBQXJCLElBQTZCLE1BQTdCO0FBQ0EsMEJBQWMsT0FBTyxJQUFyQjtBQUNILFNBSE0sTUFHQTtBQUNILG9CQUFRLEdBQVIsQ0FBWSx3QkFBWixFQUFzQyxNQUF0QztBQUNIO0FBQ0o7QUFDRCxRQUFJLFFBQUosRUFBYyxRQUFRLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxhQUFwQztBQUNkLFFBQUksUUFBSixFQUFjLEtBQUssWUFBWSxHQUFaLEVBQUw7QUFDZCxRQUFJLFFBQUosRUFBYyxRQUFRLEdBQVIsQ0FBWSwrQkFBK0IsS0FBSyxFQUFwQyxJQUEwQyxnQkFBdEQ7QUFDakI7Ozs7Ozs7O1FDOUJlLGMsR0FBQSxjO1FBT0EscUIsR0FBQSxxQjtRQVNBLFcsR0FBQSxXOztBQWpDaEI7QUFDTyxJQUFNLGdDQUFZO0FBQ3JCLGFBQVMsa0JBQWtCLE1BQWxCLEdBQTJCLFlBQVc7QUFBQyxpQkFBUyxJQUFULENBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0QixPQUE1QixFQUFzQyxPQUFPLElBQVA7QUFBYSxLQUEvRCxFQUEzQixHQUErRixLQURuRjtBQUVyQixVQUFNLEVBQUUsTUFBRjs7QUFHVjtBQUx5QixDQUFsQixDQU1BLElBQU0sNENBQWtCO0FBQzNCLGtCQUQyQiw0QkFDVjtBQUNiLGdCQUFRLEdBQVIsQ0FBWSx3QkFBWjtBQUNILEtBSDBCO0FBSTNCLHlCQUoyQixpQ0FJTCxHQUpLLEVBSUE7QUFDdkIsZ0JBQVEsR0FBUiwrQ0FBd0QsR0FBeEQ7QUFDSDtBQU4wQixDQUF4Qjs7QUFTUDtBQUNPLFNBQVMsY0FBVCxHQUEwQjtBQUM3QixZQUFRLEdBQVIsQ0FBWSxtQkFBWjtBQUNBO0FBQ0EsWUFBUSxHQUFSLGdCQUF5QixLQUFLLE9BQTlCO0FBQ0g7O0FBRUQ7QUFDTyxTQUFTLHFCQUFULEdBQWlDO0FBQ3BDLFdBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBTTtBQUNwQyxtQkFBVyxZQUFNO0FBQ2Isb0JBQVEsR0FBUixDQUFZLG9CQUFaO0FBQ0gsU0FGRCxFQUVFLEdBRkY7QUFHSCxLQUpEO0FBS0g7O0FBRUQ7QUFDTyxTQUFTLFdBQVQsR0FBdUI7QUFDMUIsWUFBUSxHQUFSLENBQVksc0JBQVo7QUFDQTtBQUNBLFlBQVEsR0FBUixDQUFZLGNBQVosRUFBNEIsS0FBSyxJQUFMLENBQVUsTUFBVixFQUE1QjtBQUNBO0FBQ0EsU0FBSyxxQkFBTCxDQUEyQixPQUEzQjtBQUNIOzs7QUN4Q0Q7O0FDQUE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiXG5pbXBvcnQgYmluZGVyIGZyb20gXCIuL2xpYnMvYmluZGVyXCI7XG5pbXBvcnQgeyBzdGF0aWNGdW5jdGlvbnMsIGNvbnN0YW50cywgY29tbW9uRnVuY3Rpb24sIGFub3RoZXJDb21tb25GdW5jdGlvbiwgbmF2RnVuY3Rpb24gfSBmcm9tIFwiLi9tb2R1bGVzL21vZHVsZVwiO1xuXG5sZXQgYXJncyA9IFtcbiAgICB7XG4gICAgICAgIFwiaHRtbFwiOiBbY29uc3RhbnRzLCBzdGF0aWNGdW5jdGlvbnNdLFxuICAgICAgICBcImJvZHlcIjogW2NvbW1vbkZ1bmN0aW9uLCBhbm90aGVyQ29tbW9uRnVuY3Rpb25dLFxuICAgICAgICBcIi5oZWFkZXJcIjogbmF2RnVuY3Rpb25cbiAgICB9LFxuICAgIC8vIHRydWVcbl07XG5cbmJpbmRlciguLi5hcmdzKTtcbiIsIi8vIHYuMi4xXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRlcihzZWxlY3RvcnNBbmRGdW5jdGlvbnNCb3VuZHMsIHJ1blRlc3RzID0gZmFsc2UpIHtcbiAgICBsZXQgdDAsIHQxO1xuICAgIGlmIChydW5UZXN0cykgdDAgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAvLyBwb2x5ZmlsbCBmb3IgXCIubWF0Y2hlcygpXCIgbWV0aG9kXG4gICAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XG4gICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvcjtcbiAgICB9XG4gICAgLy8gZ2F0aGVyIGFsbCBzZWxlY3RvcnMgaW4gYXJyYXlcbiAgICBjb25zdCBzZWxlY3RvcnNUb0ZpbmQgPSBPYmplY3Qua2V5cyhzZWxlY3RvcnNBbmRGdW5jdGlvbnNCb3VuZHMpO1xuICAgIC8vIGZpbmQgc2VsZWN0b3JzIGluIGRvY3VtZW50XG4gICAgY29uc3QgZm91bmRFbGVtZW50cyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yc1RvRmluZC5qb2luKFwiLFwiKSldO1xuICAgIC8vIGZpbHRlciBib3VuZHMgZm9yIG5vdCBmb3VuZGVkIHNlbGVjdG9yc1xuICAgIGxldCBmaWx0ZXJlZEJvdW5kcyA9IHt9O1xuICAgIGZvciAobGV0IGtleSBpbiBzZWxlY3RvcnNBbmRGdW5jdGlvbnNCb3VuZHMpIHtcbiAgICAgICAgaWYgKGZvdW5kRWxlbWVudHMuc29tZShlbGVtZW50ID0+IGVsZW1lbnQubWF0Y2hlcyhrZXkpKSkge1xuICAgICAgICAgICAgZmlsdGVyZWRCb3VuZHNba2V5XSA9IHNlbGVjdG9yc0FuZEZ1bmN0aW9uc0JvdW5kc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHJ1blRlc3RzKSBjb25zb2xlLmxvZyhgLSAke2tleX0gd2FzIG5vdCBmb3VuZGApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGdhdGhlciBhbGwgbW9kdWxlcyBpbiBvbmUgb2JqZWN0XG4gICAgbGV0IG1lcmdlZE1vZHVsZXMgPSB7fTtcbiAgICBmb3IgKGxldCBib3VuZCBpbiBmaWx0ZXJlZEJvdW5kcykge1xuICAgICAgICBsZXQgbW9kdWxlID0gZmlsdGVyZWRCb3VuZHNbYm91bmRdO1xuICAgICAgICBsZXQgbmF0dXJlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1vZHVsZSk7XG4gICAgICAgIGlmIChuYXR1cmUgPT09IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgICAgICAgICAgbW9kdWxlLmZvckVhY2goc2NyaXB0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNjcmlwdCkgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgICAgICAgICAgICAgICBtZXJnZWRNb2R1bGVzW3NjcmlwdC5uYW1lXSA9IHNjcmlwdDtcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VkTW9kdWxlc1tzY3JpcHQubmFtZV0oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZXJnZWRNb2R1bGVzID0gT2JqZWN0LmFzc2lnbihtZXJnZWRNb2R1bGVzLCBzY3JpcHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5hdHVyZSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIikge1xuICAgICAgICAgICAgbWVyZ2VkTW9kdWxlcyA9IE9iamVjdC5hc3NpZ24obWVyZ2VkTW9kdWxlcywgbW9kdWxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChuYXR1cmUgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgICAgICAgbWVyZ2VkTW9kdWxlc1ttb2R1bGUubmFtZV0gPSBtb2R1bGU7XG4gICAgICAgICAgICBtZXJnZWRNb2R1bGVzW21vZHVsZS5uYW1lXSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIhIHVuc3VwcG9ydGVkIGZvcm1hdDogXCIsIG1vZHVsZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJ1blRlc3RzKSBjb25zb2xlLmxvZyhcImJpbmRlclJlc3VsdE9iamVjdDogXCIsIG1lcmdlZE1vZHVsZXMpO1xuICAgIGlmIChydW5UZXN0cykgdDEgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBpZiAocnVuVGVzdHMpIGNvbnNvbGUubG9nKFwiQmluZGVyIGh0bWwgcGFyc2luZyB0b29rIFwiICsgKHQxIC0gdDApICsgXCIgbWlsbGlzZWNvbmRzLlwiKTtcbn1cbiIsIlxuLy8gdGhlc2UgcHJvcGVyaWVzIGFyZSBhdmFpbGFibGUgZnJvbSBhbnl3aGVyZSB2aWEgdGhpcy5wcm9wZXJ5XG5leHBvcnQgY29uc3QgY29uc3RhbnRzID0ge1xuICAgIGlzVG91Y2g6IFwib250b3VjaHN0YXJ0XCIgaW4gd2luZG93ID8gZnVuY3Rpb24oKSB7ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwidG91Y2hcIik7IHJldHVybiB0cnVlO30oKSA6IGZhbHNlLFxuICAgIGJvZHk6ICQoXCJib2R5XCIpXG59XG5cbi8vIHRoZXNlIGZ1bmN0aW9ucyB3b24ndCBydW4gYXQgb25jZSwgYnV0IGNhbiBiZSBleGVjdXRlZCBieSBkZW1hbmQgZnJvbSBhbnl3aGVyZSB2aWEgdGhpcy5mdW5jdGlvbk5hbWVcbmV4cG9ydCBjb25zdCBzdGF0aWNGdW5jdGlvbnMgPSB7XG4gICAgc3BhcmVkRnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3BhcmVGdW5jdGlvbiBleGVjdXRlZFwiKTtcbiAgICB9LFxuICAgIGFub3RoZXJTcGFyZWRGdW5jdGlvbihhcmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coYGFub3RoZXJTcGFyZUZ1bmN0aW9uIGV4ZWN1dGVkIHdpdGggYXJnczogJHthcmd9YCk7XG4gICAgfVxufVxuXG4vLyBydW5zIGF0IG9uY2UuIHJ1bnMgb24gYWxsIHBhZ2VzIGJlY2F1c2Ugb2YgYm91bmQgd2l0aCAnYm9keScgc2VsZWN0b3JcbmV4cG9ydCBmdW5jdGlvbiBjb21tb25GdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIndpbmRvdyB3YXMgbG9hZGVkXCIpO1xuICAgIC8vIGlzVG91Y2ggaXMgYXZhaWxhYmxlIGZyb20gYW55d2hlcmUgdmlhIHRoaXMuaXNUb3VjaFxuICAgIGNvbnNvbGUubG9nKGBpcyB0b3VjaDogJHt0aGlzLmlzVG91Y2h9YCk7XG59XG5cbi8vIHJ1bnMgYXQgb25jZS4gcnVucyBvbiBhbGwgcGFnZXMgYmVjYXVzZSBvZiBib3VuZCB3aXRoICdib2R5JyBzZWxlY3RvclxuZXhwb3J0IGZ1bmN0aW9uIGFub3RoZXJDb21tb25GdW5jdGlvbigpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3aW5kb3cgd2FzIHJlc2l6ZWRcIik7XG4gICAgICAgIH0sNTAwKTtcbiAgICB9KTtcbn1cblxuLy8gcnVucyBhdCBvbmNlLiBydW5zIGFueXdoZXJlLCB3aGVyZSAuaGVhZGVyIHNlbGVjdG9yIGNhbiBiZSBmb3VuZFxuZXhwb3J0IGZ1bmN0aW9uIG5hdkZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwibmF2RnVuY3Rpb24gZXhlY3V0ZWRcIik7XG4gICAgLy8gYm9keSBpcyBhdmFpbGFibGUgZnJvbSBhbnl3aGVyZSB2aWEgdGhpcy5ib2R5XG4gICAgY29uc29sZS5sb2coJ2JvZHkgaGVpZ2h0OicsIHRoaXMuYm9keS5oZWlnaHQoKSk7XG4gICAgLy8gc3RhdGljIGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSBmcm9tIGFueXdoZXJlIHZpYSB0aGlzLmZ1bmN0aW9uTmFtZVxuICAgIHRoaXMuYW5vdGhlclNwYXJlZEZ1bmN0aW9uKCdteUFyZycpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb21cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Zyb20gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9hcnJheS9mcm9tXCIpO1xuXG52YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICgwLCBfZnJvbTIuZGVmYXVsdCkoYXJyKTtcbiAgfVxufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5rZXlzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjMnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGlmIChpbmRleCBpbiBvYmplY3QpICRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBrZXkgaW4gZXhwb3J0cykgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyICRpdGVyQ3JlYXRlID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAoIUJVR0dZICYmICRuYXRpdmUpIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsInZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uICgpIHsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24gKCkgeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBza2lwQ2xvc2luZykge1xuICBpZiAoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gWzddO1xuICAgIHZhciBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHsgZG9uZTogc2FmZSA9IHRydWUgfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG4iLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBQO1xuICB3aGlsZSAobGVuZ3RoID4gaSkgZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGV4ZWMpIHtcbiAgdmFyIGZuID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldO1xuICB2YXIgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24gKCkgeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbiIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgdGFnLCBzdGF0KSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKSBkZWYoaXQsIFRBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWcgfSk7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UgLyogLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCAqLykge1xuICAgIHZhciBPID0gdG9PYmplY3QoYXJyYXlMaWtlKTtcbiAgICB2YXIgQyA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXk7XG4gICAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBtYXBmbiA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICAgIHZhciBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBpdGVyRm4gPSBnZXRJdGVyRm4oTyk7XG4gICAgdmFyIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZiAobWFwcGluZykgbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZiAoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpIHtcbiAgICAgIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEMoKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yIChyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0JywgeyBhc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKSB9KTtcbiIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KSB7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbiAoaXRlcmF0ZWQpIHtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBpbmRleCA9IHRoaXMuX2k7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IE8ubGVuZ3RoKSByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7IHZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2UgfTtcbn0pO1xuIl0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpY205M2MyVnlMWEJoWTJzdlgzQnlaV3gxWkdVdWFuTWlMQ0poYzNObGRITXZhbk12WjJ4dlltRnNMbXB6SWl3aVlYTnpaWFJ6TDJwekwyeHBZbk12WW1sdVpHVnlMbXB6SWl3aVlYTnpaWFJ6TDJwekwyMXZaSFZzWlhNdmJXOWtkV3hsTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJKaFltVnNMWEoxYm5ScGJXVXZZMjl5WlMxcWN5OWhjbkpoZVM5bWNtOXRMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMkpoWW1Wc0xYSjFiblJwYldVdlkyOXlaUzFxY3k5dlltcGxZM1F2WVhOemFXZHVMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMkpoWW1Wc0xYSjFiblJwYldVdlkyOXlaUzFxY3k5dlltcGxZM1F2YTJWNWN5NXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWlZV0psYkMxeWRXNTBhVzFsTDJobGJIQmxjbk12ZEc5RGIyNXpkVzFoWW14bFFYSnlZWGt1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMlp1TDJGeWNtRjVMMlp5YjIwdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDJadUwyOWlhbVZqZEM5aGMzTnBaMjR1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMlp1TDI5aWFtVmpkQzlyWlhsekxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5aExXWjFibU4wYVc5dUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5aGJpMXZZbXBsWTNRdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJGeWNtRjVMV2x1WTJ4MVpHVnpMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOWpiR0Z6YzI5bUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5amIyWXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgyTnZjbVV1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMk55WldGMFpTMXdjbTl3WlhKMGVTNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZlkzUjRMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOWtaV1pwYm1Wa0xtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5a1pYTmpjbWx3ZEc5eWN5NXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZlpHOXRMV055WldGMFpTNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZlpXNTFiUzFpZFdjdGEyVjVjeTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZaWGh3YjNKMExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5bVlXbHNjeTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZaMnh2WW1Gc0xtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5b1lYTXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgyaHBaR1V1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMmgwYld3dWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJsbE9DMWtiMjB0WkdWbWFXNWxMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXBiMkpxWldOMExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5cGN5MWhjbkpoZVMxcGRHVnlMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXBjeTF2WW1wbFkzUXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgybDBaWEl0WTJGc2JDNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZmFYUmxjaTFqY21WaGRHVXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgybDBaWEl0WkdWbWFXNWxMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXBkR1Z5TFdSbGRHVmpkQzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZhWFJsY21GMGIzSnpMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXNhV0p5WVhKNUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5dlltcGxZM1F0WVhOemFXZHVMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXZZbXBsWTNRdFkzSmxZWFJsTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTl2WW1wbFkzUXRaSEF1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMjlpYW1WamRDMWtjSE11YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMjlpYW1WamRDMW5iM0J6TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTl2WW1wbFkzUXRaM0J2TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTl2WW1wbFkzUXRhMlY1Y3kxcGJuUmxjbTVoYkM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYjJKcVpXTjBMV3RsZVhNdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDI5aWFtVmpkQzF3YVdVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDI5aWFtVmpkQzF6WVhBdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDNCeWIzQmxjblI1TFdSbGMyTXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgzSmxaR1ZtYVc1bExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5elpYUXRkRzh0YzNSeWFXNW5MWFJoWnk1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYzJoaGNtVmtMV3RsZVM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYzJoaGNtVmtMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXpkSEpwYm1jdFlYUXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgzUnZMV0ZpYzI5c2RYUmxMV2x1WkdWNExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5MGJ5MXBiblJsWjJWeUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5MGJ5MXBiMkpxWldOMExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5MGJ5MXNaVzVuZEdndWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDNSdkxXOWlhbVZqZEM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmZEc4dGNISnBiV2wwYVhabExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5MWFXUXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgzZHJjeTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWpiM0psTG1kbGRDMXBkR1Z5WVhSdmNpMXRaWFJvYjJRdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WlhNMkxtRnljbUY1TG1aeWIyMHVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlpYTTJMbTlpYW1WamRDNWhjM05wWjI0dWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WlhNMkxtOWlhbVZqZEM1clpYbHpMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwyVnpOaTV6ZEhKcGJtY3VhWFJsY21GMGIzSXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN096dEJRME5CT3pzN08wRkJRMEU3T3pzN1FVRkZRU3hKUVVGSkxFOUJRVThzUTBGRFVEdEJRVU5KTEZsQlFWRXNORU5CUkZvN1FVRkZTU3haUVVGUkxIVkVRVVphTzBGQlIwazdRVUZJU2l4RFFVUlBMRU5CUVZnN08wRkJVMEVzYTBOQlFWVXNTVUZCVmpzN096czdPenM3T3pzN096czdPenM3T3pzN08ydENRMWgzUWl4Tk96czdPMEZCUm5oQ096dEJRVVZsTEZOQlFWTXNUVUZCVkN4RFFVRm5RaXd5UWtGQmFFSXNSVUZCSzBRN1FVRkJRU3hSUVVGc1FpeFJRVUZyUWl4MVJVRkJVQ3hMUVVGUE96dEJRVU14UlN4UlFVRkpMRmRCUVVvN1FVRkJRU3hSUVVGUkxGZEJRVkk3UVVGRFFTeFJRVUZKTEZGQlFVb3NSVUZCWXl4TFFVRkxMRmxCUVZrc1IwRkJXaXhGUVVGTU8wRkJRMlE3UVVGRFFTeFJRVUZKTEVOQlFVTXNVVUZCVVN4VFFVRlNMRU5CUVd0Q0xFOUJRWFpDTEVWQlFXZERPMEZCUXpWQ0xHZENRVUZSTEZOQlFWSXNRMEZCYTBJc1QwRkJiRUlzUjBGQk5FSXNVVUZCVVN4VFFVRlNMRU5CUVd0Q0xHbENRVUU1UXp0QlFVTklPMEZCUTBRN1FVRkRRU3hSUVVGTkxHdENRVUZyUWl4dlFrRkJXU3d5UWtGQldpeERRVUY0UWp0QlFVTkJPMEZCUTBFc1VVRkJUU3d5UkVGQmIwSXNVMEZCVXl4blFrRkJWQ3hEUVVFd1FpeG5Ra0ZCWjBJc1NVRkJhRUlzUTBGQmNVSXNSMEZCY2tJc1EwRkJNVUlzUTBGQmNFSXNSVUZCVGp0QlFVTkJPMEZCUTBFc1VVRkJTU3hwUWtGQmFVSXNSVUZCY2tJN08wRkJXakJGTEN0Q1FXRnFSU3hIUVdKcFJUdEJRV04wUlN4WlFVRkpMR05CUVdNc1NVRkJaQ3hEUVVGdFFqdEJRVUZCTEcxQ1FVRlhMRkZCUVZFc1QwRkJVaXhEUVVGblFpeEhRVUZvUWl4RFFVRllPMEZCUVVFc1UwRkJia0lzUTBGQlNpeEZRVUY1UkR0QlFVTnlSQ3d5UWtGQlpTeEhRVUZtTEVsQlFYTkNMRFJDUVVFMFFpeEhRVUUxUWl4RFFVRjBRanRCUVVOSUxGTkJSa1FzVFVGRlR6dEJRVU5JTEdkQ1FVRkpMRkZCUVVvc1JVRkJZeXhSUVVGUkxFZEJRVklzVVVGQmFVSXNSMEZCYWtJN1FVRkRha0k3UVVGc1FuRkZPenRCUVdFeFJTeFRRVUZMTEVsQlFVa3NSMEZCVkN4SlFVRm5RaXd5UWtGQmFFSXNSVUZCTmtNN1FVRkJRU3hqUVVGd1F5eEhRVUZ2UXp0QlFVMDFRenRCUVVORU8wRkJRMEVzVVVGQlNTeG5Ra0ZCWjBJc1JVRkJjRUk3UVVGRFFTeFRRVUZMTEVsQlFVa3NTMEZCVkN4SlFVRnJRaXhqUVVGc1FpeEZRVUZyUXp0QlFVTTVRaXhaUVVGSkxGTkJRVk1zWlVGQlpTeExRVUZtTEVOQlFXSTdRVUZEUVN4WlFVRkpMRk5CUVZNc1QwRkJUeXhUUVVGUUxFTkJRV2xDTEZGQlFXcENMRU5CUVRCQ0xFbEJRVEZDTEVOQlFTdENMRTFCUVM5Q0xFTkJRV0k3UVVGRFFTeFpRVUZKTEZkQlFWY3NaMEpCUVdZc1JVRkJhVU03UVVGRE4wSXNiVUpCUVU4c1QwRkJVQ3hEUVVGbExHdENRVUZWTzBGQlEzSkNMRzlDUVVGSkxFOUJRVThzVTBGQlVDeERRVUZwUWl4UlFVRnFRaXhEUVVFd1FpeEpRVUV4UWl4RFFVRXJRaXhOUVVFdlFpeE5RVUV5UXl4dFFrRkJMME1zUlVGQmIwVTdRVUZEYUVVc2EwTkJRV01zVDBGQlR5eEpRVUZ5UWl4SlFVRTJRaXhOUVVFM1FqdEJRVU5CTEd0RFFVRmpMRTlCUVU4c1NVRkJja0k3UVVGRFNDeHBRa0ZJUkN4TlFVZFBPMEZCUTBnc2IwTkJRV2RDTEhOQ1FVRmpMR0ZCUVdRc1JVRkJOa0lzVFVGQk4wSXNRMEZCYUVJN1FVRkRTRHRCUVVOS0xHRkJVRVE3UVVGUlNDeFRRVlJFTEUxQlUwOHNTVUZCU1N4WFFVRlhMR2xDUVVGbUxFVkJRV3RETzBGQlEzSkRMRFJDUVVGblFpeHpRa0ZCWXl4aFFVRmtMRVZCUVRaQ0xFMUJRVGRDTEVOQlFXaENPMEZCUTBnc1UwRkdUU3hOUVVWQkxFbEJRVWtzVjBGQlZ5eHRRa0ZCWml4RlFVRnZRenRCUVVOMlF5d3dRa0ZCWXl4UFFVRlBMRWxCUVhKQ0xFbEJRVFpDTEUxQlFUZENPMEZCUTBFc01FSkJRV01zVDBGQlR5eEpRVUZ5UWp0QlFVTklMRk5CU0Uwc1RVRkhRVHRCUVVOSUxHOUNRVUZSTEVkQlFWSXNRMEZCV1N4M1FrRkJXaXhGUVVGelF5eE5RVUYwUXp0QlFVTklPMEZCUTBvN1FVRkRSQ3hSUVVGSkxGRkJRVW9zUlVGQll5eFJRVUZSTEVkQlFWSXNRMEZCV1N4elFrRkJXaXhGUVVGdlF5eGhRVUZ3UXp0QlFVTmtMRkZCUVVrc1VVRkJTaXhGUVVGakxFdEJRVXNzV1VGQldTeEhRVUZhTEVWQlFVdzdRVUZEWkN4UlFVRkpMRkZCUVVvc1JVRkJZeXhSUVVGUkxFZEJRVklzUTBGQldTd3JRa0ZCSzBJc1MwRkJTeXhGUVVGd1F5eEpRVUV3UXl4blFrRkJkRVE3UVVGRGFrSTdPenM3T3pzN08xRkRPVUpsTEdNc1IwRkJRU3hqTzFGQlQwRXNjVUlzUjBGQlFTeHhRanRSUVZOQkxGY3NSMEZCUVN4WE96dEJRV3BEYUVJN1FVRkRUeXhKUVVGTkxHZERRVUZaTzBGQlEzSkNMR0ZCUVZNc2EwSkJRV3RDTEUxQlFXeENMRWRCUVRKQ0xGbEJRVmM3UVVGQlF5eHBRa0ZCVXl4SlFVRlVMRU5CUVdNc1UwRkJaQ3hEUVVGM1FpeEhRVUY0UWl4RFFVRTBRaXhQUVVFMVFpeEZRVUZ6UXl4UFFVRlBMRWxCUVZBN1FVRkJZU3hMUVVFdlJDeEZRVUV6UWl4SFFVRXJSaXhMUVVSdVJqdEJRVVZ5UWl4VlFVRk5MRVZCUVVVc1RVRkJSanM3UVVGSFZqdEJRVXg1UWl4RFFVRnNRaXhEUVUxQkxFbEJRVTBzTkVOQlFXdENPMEZCUXpOQ0xHdENRVVF5UWl3MFFrRkRWanRCUVVOaUxHZENRVUZSTEVkQlFWSXNRMEZCV1N4M1FrRkJXanRCUVVOSUxFdEJTREJDTzBGQlNUTkNMSGxDUVVveVFpeHBRMEZKVEN4SFFVcExMRVZCU1VFN1FVRkRka0lzWjBKQlFWRXNSMEZCVWl3clEwRkJkMFFzUjBGQmVFUTdRVUZEU0R0QlFVNHdRaXhEUVVGNFFqczdRVUZUVUR0QlFVTlBMRk5CUVZNc1kwRkJWQ3hIUVVFd1FqdEJRVU0zUWl4WlFVRlJMRWRCUVZJc1EwRkJXU3h0UWtGQldqdEJRVU5CTzBGQlEwRXNXVUZCVVN4SFFVRlNMR2RDUVVGNVFpeExRVUZMTEU5QlFUbENPMEZCUTBnN08wRkJSVVE3UVVGRFR5eFRRVUZUTEhGQ1FVRlVMRWRCUVdsRE8wRkJRM0JETEZkQlFVOHNaMEpCUVZBc1EwRkJkMElzVVVGQmVFSXNSVUZCYTBNc1dVRkJUVHRCUVVOd1F5eHRRa0ZCVnl4WlFVRk5PMEZCUTJJc2IwSkJRVkVzUjBGQlVpeERRVUZaTEc5Q1FVRmFPMEZCUTBnc1UwRkdSQ3hGUVVWRkxFZEJSa1k3UVVGSFNDeExRVXBFTzBGQlMwZzdPMEZCUlVRN1FVRkRUeXhUUVVGVExGZEJRVlFzUjBGQmRVSTdRVUZETVVJc1dVRkJVU3hIUVVGU0xFTkJRVmtzYzBKQlFWbzdRVUZEUVR0QlFVTkJMRmxCUVZFc1IwRkJVaXhEUVVGWkxHTkJRVm9zUlVGQk5FSXNTMEZCU3l4SlFVRk1MRU5CUVZVc1RVRkJWaXhGUVVFMVFqdEJRVU5CTzBGQlEwRXNVMEZCU3l4eFFrRkJUQ3hEUVVFeVFpeFBRVUV6UWp0QlFVTklPenM3UVVONFEwUTdPMEZEUVVFN08wRkRRVUU3TzBGRFFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTNCQ1FUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTklRVHRCUVVOQk8wRkJRMEU3TzBGRFJrRTdRVUZEUVR0QlFVTkJPenRCUTBaQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEU2tFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEweEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU4yUWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEzWkNRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVEVFN1FVRkRRVHRCUVVOQk96dEJRMFpCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5TUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRjRUpCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOTVFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTBwQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRVRUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTktRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUXpkRVFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMUJCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMDVCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRTa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMUpCTzBGQlEwRTdRVUZEUVRzN1FVTkdRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5JUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5PUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFNFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRXa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTmlRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTNSRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTNSQ1FUdEJRVU5CT3p0QlEwUkJPMEZCUTBFN08wRkRSRUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOc1EwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRM3BEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEyaENRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEySkJPMEZCUTBFN08wRkRSRUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTmlRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRha0pCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFVFRTdRVUZEUVRzN1FVTkVRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMVpCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5TUVR0QlFVTkJPenRCUTBSQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRVRUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTB4Qk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTA1Qk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOcVFrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5RUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5PUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5PUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5PUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFRFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRXa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTB4Qk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5ZUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOeVEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOS1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5VUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRWlMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlobWRXNWpkR2x2YmlncGUyWjFibU4wYVc5dUlHVW9kQ3h1TEhJcGUyWjFibU4wYVc5dUlITW9ieXgxS1h0cFppZ2hibHR2WFNsN2FXWW9JWFJiYjEwcGUzWmhjaUJoUFhSNWNHVnZaaUJ5WlhGMWFYSmxQVDFjSW1aMWJtTjBhVzl1WENJbUpuSmxjWFZwY21VN2FXWW9JWFVtSm1FcGNtVjBkWEp1SUdFb2J5d2hNQ2s3YVdZb2FTbHlaWFIxY200Z2FTaHZMQ0V3S1R0MllYSWdaajF1WlhjZ1JYSnliM0lvWENKRFlXNXViM1FnWm1sdVpDQnRiMlIxYkdVZ0oxd2lLMjhyWENJblhDSXBPM1JvY205M0lHWXVZMjlrWlQxY0lrMVBSRlZNUlY5T1QxUmZSazlWVGtSY0lpeG1mWFpoY2lCc1BXNWJiMTA5ZTJWNGNHOXlkSE02ZTMxOU8zUmJiMTFiTUYwdVkyRnNiQ2hzTG1WNGNHOXlkSE1zWm5WdVkzUnBiMjRvWlNsN2RtRnlJRzQ5ZEZ0dlhWc3hYVnRsWFR0eVpYUjFjbTRnY3lodVAyNDZaU2w5TEd3c2JDNWxlSEJ2Y25SekxHVXNkQ3h1TEhJcGZYSmxkSFZ5YmlCdVcyOWRMbVY0Y0c5eWRITjlkbUZ5SUdrOWRIbHdaVzltSUhKbGNYVnBjbVU5UFZ3aVpuVnVZM1JwYjI1Y0lpWW1jbVZ4ZFdseVpUdG1iM0lvZG1GeUlHODlNRHR2UEhJdWJHVnVaM1JvTzI4ckt5bHpLSEpiYjEwcE8zSmxkSFZ5YmlCemZYSmxkSFZ5YmlCbGZTa29LU0lzSWx4dWFXMXdiM0owSUdKcGJtUmxjaUJtY205dElGd2lMaTlzYVdKekwySnBibVJsY2x3aU8xeHVhVzF3YjNKMElIc2djM1JoZEdsalJuVnVZM1JwYjI1ekxDQmpiMjV6ZEdGdWRITXNJR052YlcxdmJrWjFibU4wYVc5dUxDQmhibTkwYUdWeVEyOXRiVzl1Um5WdVkzUnBiMjRzSUc1aGRrWjFibU4wYVc5dUlIMGdabkp2YlNCY0lpNHZiVzlrZFd4bGN5OXRiMlIxYkdWY0lqdGNibHh1YkdWMElHRnlaM01nUFNCYlhHNGdJQ0FnZTF4dUlDQWdJQ0FnSUNCY0ltaDBiV3hjSWpvZ1cyTnZibk4wWVc1MGN5d2djM1JoZEdsalJuVnVZM1JwYjI1elhTeGNiaUFnSUNBZ0lDQWdYQ0ppYjJSNVhDSTZJRnRqYjIxdGIyNUdkVzVqZEdsdmJpd2dZVzV2ZEdobGNrTnZiVzF2YmtaMWJtTjBhVzl1WFN4Y2JpQWdJQ0FnSUNBZ1hDSXVhR1ZoWkdWeVhDSTZJRzVoZGtaMWJtTjBhVzl1WEc0Z0lDQWdmU3hjYmlBZ0lDQXZMeUIwY25WbFhHNWRPMXh1WEc1aWFXNWtaWElvTGk0dVlYSm5jeWs3WEc0aUxDSXZMeUIyTGpJdU1WeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpQmlhVzVrWlhJb2MyVnNaV04wYjNKelFXNWtSblZ1WTNScGIyNXpRbTkxYm1SekxDQnlkVzVVWlhOMGN5QTlJR1poYkhObEtTQjdYRzRnSUNBZ2JHVjBJSFF3TENCME1UdGNiaUFnSUNCcFppQW9jblZ1VkdWemRITXBJSFF3SUQwZ2NHVnlabTl5YldGdVkyVXVibTkzS0NrN1hHNGdJQ0FnTHk4Z2NHOXNlV1pwYkd3Z1ptOXlJRndpTG0xaGRHTm9aWE1vS1Z3aUlHMWxkR2h2WkZ4dUlDQWdJR2xtSUNnaFJXeGxiV1Z1ZEM1d2NtOTBiM1I1Y0dVdWJXRjBZMmhsY3lrZ2UxeHVJQ0FnSUNBZ0lDQkZiR1Z0Wlc1MExuQnliM1J2ZEhsd1pTNXRZWFJqYUdWeklEMGdSV3hsYldWdWRDNXdjbTkwYjNSNWNHVXViWE5OWVhSamFHVnpVMlZzWldOMGIzSTdYRzRnSUNBZ2ZWeHVJQ0FnSUM4dklHZGhkR2hsY2lCaGJHd2djMlZzWldOMGIzSnpJR2x1SUdGeWNtRjVYRzRnSUNBZ1kyOXVjM1FnYzJWc1pXTjBiM0p6Vkc5R2FXNWtJRDBnVDJKcVpXTjBMbXRsZVhNb2MyVnNaV04wYjNKelFXNWtSblZ1WTNScGIyNXpRbTkxYm1SektUdGNiaUFnSUNBdkx5Qm1hVzVrSUhObGJHVmpkRzl5Y3lCcGJpQmtiMk4xYldWdWRGeHVJQ0FnSUdOdmJuTjBJR1p2ZFc1a1JXeGxiV1Z1ZEhNZ1BTQmJMaTR1Wkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNrRnNiQ2h6Wld4bFkzUnZjbk5VYjBacGJtUXVhbTlwYmloY0lpeGNJaWtwWFR0Y2JpQWdJQ0F2THlCbWFXeDBaWElnWW05MWJtUnpJR1p2Y2lCdWIzUWdabTkxYm1SbFpDQnpaV3hsWTNSdmNuTmNiaUFnSUNCc1pYUWdabWxzZEdWeVpXUkNiM1Z1WkhNZ1BTQjdmVHRjYmlBZ0lDQm1iM0lnS0d4bGRDQnJaWGtnYVc0Z2MyVnNaV04wYjNKelFXNWtSblZ1WTNScGIyNXpRbTkxYm1SektTQjdYRzRnSUNBZ0lDQWdJR2xtSUNobWIzVnVaRVZzWlcxbGJuUnpMbk52YldVb1pXeGxiV1Z1ZENBOVBpQmxiR1Z0Wlc1MExtMWhkR05vWlhNb2EyVjVLU2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR1pwYkhSbGNtVmtRbTkxYm1SelcydGxlVjBnUFNCelpXeGxZM1J2Y25OQmJtUkdkVzVqZEdsdmJuTkNiM1Z1WkhOYmEyVjVYVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2h5ZFc1VVpYTjBjeWtnWTI5dWMyOXNaUzVzYjJjb1lDMGdKSHRyWlhsOUlIZGhjeUJ1YjNRZ1ptOTFibVJnS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdJQ0F2THlCbllYUm9aWElnWVd4c0lHMXZaSFZzWlhNZ2FXNGdiMjVsSUc5aWFtVmpkRnh1SUNBZ0lHeGxkQ0J0WlhKblpXUk5iMlIxYkdWeklEMGdlMzA3WEc0Z0lDQWdabTl5SUNoc1pYUWdZbTkxYm1RZ2FXNGdabWxzZEdWeVpXUkNiM1Z1WkhNcElIdGNiaUFnSUNBZ0lDQWdiR1YwSUcxdlpIVnNaU0E5SUdacGJIUmxjbVZrUW05MWJtUnpXMkp2ZFc1a1hUdGNiaUFnSUNBZ0lDQWdiR1YwSUc1aGRIVnlaU0E5SUU5aWFtVmpkQzV3Y205MGIzUjVjR1V1ZEc5VGRISnBibWN1WTJGc2JDaHRiMlIxYkdVcE8xeHVJQ0FnSUNBZ0lDQnBaaUFvYm1GMGRYSmxJRDA5UFNCY0lsdHZZbXBsWTNRZ1FYSnlZWGxkWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUcxdlpIVnNaUzVtYjNKRllXTm9LSE5qY21sd2RDQTlQaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWRHOVRkSEpwYm1jdVkyRnNiQ2h6WTNKcGNIUXBJRDA5UFNCY0lsdHZZbXBsWTNRZ1JuVnVZM1JwYjI1ZFhDSXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JXVnlaMlZrVFc5a2RXeGxjMXR6WTNKcGNIUXVibUZ0WlYwZ1BTQnpZM0pwY0hRN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRzFsY21kbFpFMXZaSFZzWlhOYmMyTnlhWEIwTG01aGJXVmRLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JXVnlaMlZrVFc5a2RXeGxjeUE5SUU5aWFtVmpkQzVoYzNOcFoyNG9iV1Z5WjJWa1RXOWtkV3hsY3l3Z2MyTnlhWEIwS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaHVZWFIxY21VZ1BUMDlJRndpVzI5aWFtVmpkQ0JQWW1wbFkzUmRYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJRzFsY21kbFpFMXZaSFZzWlhNZ1BTQlBZbXBsWTNRdVlYTnphV2R1S0cxbGNtZGxaRTF2WkhWc1pYTXNJRzF2WkhWc1pTazdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvYm1GMGRYSmxJRDA5UFNCY0lsdHZZbXBsWTNRZ1JuVnVZM1JwYjI1ZFhDSXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHMWxjbWRsWkUxdlpIVnNaWE5iYlc5a2RXeGxMbTVoYldWZElEMGdiVzlrZFd4bE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYldWeVoyVmtUVzlrZFd4bGMxdHRiMlIxYkdVdWJtRnRaVjBvS1R0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OdmJHVXViRzluS0Z3aUlTQjFibk4xY0hCdmNuUmxaQ0JtYjNKdFlYUTZJRndpTENCdGIyUjFiR1VwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNoeWRXNVVaWE4wY3lrZ1kyOXVjMjlzWlM1c2IyY29YQ0ppYVc1a1pYSlNaWE4xYkhSUFltcGxZM1E2SUZ3aUxDQnRaWEpuWldSTmIyUjFiR1Z6S1R0Y2JpQWdJQ0JwWmlBb2NuVnVWR1Z6ZEhNcElIUXhJRDBnY0dWeVptOXliV0Z1WTJVdWJtOTNLQ2s3WEc0Z0lDQWdhV1lnS0hKMWJsUmxjM1J6S1NCamIyNXpiMnhsTG14dlp5aGNJa0pwYm1SbGNpQm9kRzFzSUhCaGNuTnBibWNnZEc5dmF5QmNJaUFySUNoME1TQXRJSFF3S1NBcklGd2lJRzFwYkd4cGMyVmpiMjVrY3k1Y0lpazdYRzU5WEc0aUxDSmNiaTh2SUhSb1pYTmxJSEJ5YjNCbGNtbGxjeUJoY21VZ1lYWmhhV3hoWW14bElHWnliMjBnWVc1NWQyaGxjbVVnZG1saElIUm9hWE11Y0hKdmNHVnllVnh1Wlhod2IzSjBJR052Ym5OMElHTnZibk4wWVc1MGN5QTlJSHRjYmlBZ0lDQnBjMVJ2ZFdOb09pQmNJbTl1ZEc5MVkyaHpkR0Z5ZEZ3aUlHbHVJSGRwYm1SdmR5QS9JR1oxYm1OMGFXOXVLQ2tnZTJSdlkzVnRaVzUwTG1KdlpIa3VZMnhoYzNOTWFYTjBMbUZrWkNoY0luUnZkV05vWENJcE95QnlaWFIxY200Z2RISjFaVHQ5S0NrZ09pQm1ZV3h6WlN4Y2JpQWdJQ0JpYjJSNU9pQWtLRndpWW05a2VWd2lLVnh1ZlZ4dVhHNHZMeUIwYUdWelpTQm1kVzVqZEdsdmJuTWdkMjl1SjNRZ2NuVnVJR0YwSUc5dVkyVXNJR0oxZENCallXNGdZbVVnWlhobFkzVjBaV1FnWW5rZ1pHVnRZVzVrSUdaeWIyMGdZVzU1ZDJobGNtVWdkbWxoSUhSb2FYTXVablZ1WTNScGIyNU9ZVzFsWEc1bGVIQnZjblFnWTI5dWMzUWdjM1JoZEdsalJuVnVZM1JwYjI1eklEMGdlMXh1SUNBZ0lITndZWEpsWkVaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ0lDQmpiMjV6YjJ4bExteHZaeWhjSW5Od1lYSmxSblZ1WTNScGIyNGdaWGhsWTNWMFpXUmNJaWs3WEc0Z0lDQWdmU3hjYmlBZ0lDQmhibTkwYUdWeVUzQmhjbVZrUm5WdVkzUnBiMjRvWVhKbktTQjdYRzRnSUNBZ0lDQWdJR052Ym5OdmJHVXViRzluS0dCaGJtOTBhR1Z5VTNCaGNtVkdkVzVqZEdsdmJpQmxlR1ZqZFhSbFpDQjNhWFJvSUdGeVozTTZJQ1I3WVhKbmZXQXBPMXh1SUNBZ0lIMWNibjFjYmx4dUx5OGdjblZ1Y3lCaGRDQnZibU5sTGlCeWRXNXpJRzl1SUdGc2JDQndZV2RsY3lCaVpXTmhkWE5sSUc5bUlHSnZkVzVrSUhkcGRHZ2dKMkp2WkhrbklITmxiR1ZqZEc5eVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z1kyOXRiVzl1Um5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnWTI5dWMyOXNaUzVzYjJjb1hDSjNhVzVrYjNjZ2QyRnpJR3h2WVdSbFpGd2lLVHRjYmlBZ0lDQXZMeUJwYzFSdmRXTm9JR2x6SUdGMllXbHNZV0pzWlNCbWNtOXRJR0Z1ZVhkb1pYSmxJSFpwWVNCMGFHbHpMbWx6Vkc5MVkyaGNiaUFnSUNCamIyNXpiMnhsTG14dlp5aGdhWE1nZEc5MVkyZzZJQ1I3ZEdocGN5NXBjMVJ2ZFdOb2ZXQXBPMXh1ZlZ4dVhHNHZMeUJ5ZFc1eklHRjBJRzl1WTJVdUlISjFibk1nYjI0Z1lXeHNJSEJoWjJWeklHSmxZMkYxYzJVZ2IyWWdZbTkxYm1RZ2QybDBhQ0FuWW05a2VTY2djMlZzWldOMGIzSmNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQmhibTkwYUdWeVEyOXRiVzl1Um5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9YQ0p5WlhOcGVtVmNJaXdnS0NrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0J6WlhSVWFXMWxiM1YwS0NncElEMCtJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LRndpZDJsdVpHOTNJSGRoY3lCeVpYTnBlbVZrWENJcE8xeHVJQ0FnSUNBZ0lDQjlMRFV3TUNrN1hHNGdJQ0FnZlNrN1hHNTlYRzVjYmk4dklISjFibk1nWVhRZ2IyNWpaUzRnY25WdWN5QmhibmwzYUdWeVpTd2dkMmhsY21VZ0xtaGxZV1JsY2lCelpXeGxZM1J2Y2lCallXNGdZbVVnWm05MWJtUmNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQnVZWFpHZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0JqYjI1emIyeGxMbXh2WnloY0ltNWhka1oxYm1OMGFXOXVJR1Y0WldOMWRHVmtYQ0lwTzF4dUlDQWdJQzh2SUdKdlpIa2dhWE1nWVhaaGFXeGhZbXhsSUdaeWIyMGdZVzU1ZDJobGNtVWdkbWxoSUhSb2FYTXVZbTlrZVZ4dUlDQWdJR052Ym5OdmJHVXViRzluS0NkaWIyUjVJR2hsYVdkb2REb25MQ0IwYUdsekxtSnZaSGt1YUdWcFoyaDBLQ2twTzF4dUlDQWdJQzh2SUhOMFlYUnBZeUJtZFc1amRHbHZiaUJwY3lCaGRtRnBiR0ZpYkdVZ1puSnZiU0JoYm5sM2FHVnlaU0IyYVdFZ2RHaHBjeTVtZFc1amRHbHZiazVoYldWY2JpQWdJQ0IwYUdsekxtRnViM1JvWlhKVGNHRnlaV1JHZFc1amRHbHZiaWduYlhsQmNtY25LVHRjYm4xY2JpSXNJbTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdleUJjSW1SbFptRjFiSFJjSWpvZ2NtVnhkV2x5WlNoY0ltTnZjbVV0YW5NdmJHbGljbUZ5ZVM5bWJpOWhjbkpoZVM5bWNtOXRYQ0lwTENCZlgyVnpUVzlrZFd4bE9pQjBjblZsSUgwN0lpd2liVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQjdJRndpWkdWbVlYVnNkRndpT2lCeVpYRjFhWEpsS0Z3aVkyOXlaUzFxY3k5c2FXSnlZWEo1TDJadUwyOWlhbVZqZEM5aGMzTnBaMjVjSWlrc0lGOWZaWE5OYjJSMWJHVTZJSFJ5ZFdVZ2ZUc2lMQ0p0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHNnWENKa1pXWmhkV3gwWENJNklISmxjWFZwY21Vb1hDSmpiM0psTFdwekwyeHBZbkpoY25rdlptNHZiMkpxWldOMEwydGxlWE5jSWlrc0lGOWZaWE5OYjJSMWJHVTZJSFJ5ZFdVZ2ZUc2lMQ0pjSW5WelpTQnpkSEpwWTNSY0lqdGNibHh1Wlhod2IzSjBjeTVmWDJWelRXOWtkV3hsSUQwZ2RISjFaVHRjYmx4dWRtRnlJRjltY205dElEMGdjbVZ4ZFdseVpTaGNJaTR1TDJOdmNtVXRhbk12WVhKeVlYa3Zabkp2YlZ3aUtUdGNibHh1ZG1GeUlGOW1jbTl0TWlBOUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvWDJaeWIyMHBPMXh1WEc1bWRXNWpkR2x2YmlCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRzlpYWlrZ2V5QnlaWFIxY200Z2IySnFJQ1ltSUc5aWFpNWZYMlZ6VFc5a2RXeGxJRDhnYjJKcUlEb2dleUJrWldaaGRXeDBPaUJ2WW1vZ2ZUc2dmVnh1WEc1bGVIQnZjblJ6TG1SbFptRjFiSFFnUFNCbWRXNWpkR2x2YmlBb1lYSnlLU0I3WEc0Z0lHbG1JQ2hCY25KaGVTNXBjMEZ5Y21GNUtHRnljaWtwSUh0Y2JpQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Dd2dZWEp5TWlBOUlFRnljbUY1S0dGeWNpNXNaVzVuZEdncE95QnBJRHdnWVhKeUxteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0JoY25JeVcybGRJRDBnWVhKeVcybGRPMXh1SUNBZ0lIMWNibHh1SUNBZ0lISmxkSFZ5YmlCaGNuSXlPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSEpsZEhWeWJpQW9NQ3dnWDJaeWIyMHlMbVJsWm1GMWJIUXBLR0Z5Y2lrN1hHNGdJSDFjYm4wN0lpd2ljbVZ4ZFdseVpTZ25MaTR2TGk0dmJXOWtkV3hsY3k5bGN6WXVjM1J5YVc1bkxtbDBaWEpoZEc5eUp5azdYRzV5WlhGMWFYSmxLQ2N1TGk4dUxpOXRiMlIxYkdWekwyVnpOaTVoY25KaGVTNW1jbTl0SnlrN1hHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlISmxjWFZwY21Vb0p5NHVMeTR1TDIxdlpIVnNaWE12WDJOdmNtVW5LUzVCY25KaGVTNW1jbTl0TzF4dUlpd2ljbVZ4ZFdseVpTZ25MaTR2TGk0dmJXOWtkV3hsY3k5bGN6WXViMkpxWldOMExtRnpjMmxuYmljcE8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQnlaWEYxYVhKbEtDY3VMaTh1TGk5dGIyUjFiR1Z6TDE5amIzSmxKeWt1VDJKcVpXTjBMbUZ6YzJsbmJqdGNiaUlzSW5KbGNYVnBjbVVvSnk0dUx5NHVMMjF2WkhWc1pYTXZaWE0yTG05aWFtVmpkQzVyWlhsekp5azdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSEpsY1hWcGNtVW9KeTR1THk0dUwyMXZaSFZzWlhNdlgyTnZjbVVuS1M1UFltcGxZM1F1YTJWNWN6dGNiaUlzSW0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dsMEtTQjdYRzRnSUdsbUlDaDBlWEJsYjJZZ2FYUWdJVDBnSjJaMWJtTjBhVzl1SnlrZ2RHaHliM2NnVkhsd1pVVnljbTl5S0dsMElDc2dKeUJwY3lCdWIzUWdZU0JtZFc1amRHbHZiaUVuS1R0Y2JpQWdjbVYwZFhKdUlHbDBPMXh1ZlR0Y2JpSXNJblpoY2lCcGMwOWlhbVZqZENBOUlISmxjWFZwY21Vb0p5NHZYMmx6TFc5aWFtVmpkQ2NwTzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUXBJSHRjYmlBZ2FXWWdLQ0ZwYzA5aWFtVmpkQ2hwZENrcElIUm9jbTkzSUZSNWNHVkZjbkp2Y2locGRDQXJJQ2NnYVhNZ2JtOTBJR0Z1SUc5aWFtVmpkQ0VuS1R0Y2JpQWdjbVYwZFhKdUlHbDBPMXh1ZlR0Y2JpSXNJaTh2SUdaaGJITmxJQzArSUVGeWNtRjVJMmx1WkdWNFQyWmNiaTh2SUhSeWRXVWdJQzArSUVGeWNtRjVJMmx1WTJ4MVpHVnpYRzUyWVhJZ2RHOUpUMkpxWldOMElEMGdjbVZ4ZFdseVpTZ25MaTlmZEc4dGFXOWlhbVZqZENjcE8xeHVkbUZ5SUhSdlRHVnVaM1JvSUQwZ2NtVnhkV2x5WlNnbkxpOWZkRzh0YkdWdVozUm9KeWs3WEc1MllYSWdkRzlCWW5OdmJIVjBaVWx1WkdWNElEMGdjbVZ4ZFdseVpTZ25MaTlmZEc4dFlXSnpiMngxZEdVdGFXNWtaWGduS1R0Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z0tFbFRYMGxPUTB4VlJFVlRLU0I3WEc0Z0lISmxkSFZ5YmlCbWRXNWpkR2x2YmlBb0pIUm9hWE1zSUdWc0xDQm1jbTl0U1c1a1pYZ3BJSHRjYmlBZ0lDQjJZWElnVHlBOUlIUnZTVTlpYW1WamRDZ2tkR2hwY3lrN1hHNGdJQ0FnZG1GeUlHeGxibWQwYUNBOUlIUnZUR1Z1WjNSb0tFOHViR1Z1WjNSb0tUdGNiaUFnSUNCMllYSWdhVzVrWlhnZ1BTQjBiMEZpYzI5c2RYUmxTVzVrWlhnb1puSnZiVWx1WkdWNExDQnNaVzVuZEdncE8xeHVJQ0FnSUhaaGNpQjJZV3gxWlR0Y2JpQWdJQ0F2THlCQmNuSmhlU05wYm1Oc2RXUmxjeUIxYzJWeklGTmhiV1ZXWVd4MVpWcGxjbThnWlhGMVlXeHBkSGtnWVd4bmIzSnBkR2h0WEc0Z0lDQWdMeThnWlhOc2FXNTBMV1JwYzJGaWJHVXRibVY0ZEMxc2FXNWxJRzV2TFhObGJHWXRZMjl0Y0dGeVpWeHVJQ0FnSUdsbUlDaEpVMTlKVGtOTVZVUkZVeUFtSmlCbGJDQWhQU0JsYkNrZ2QyaHBiR1VnS0d4bGJtZDBhQ0ErSUdsdVpHVjRLU0I3WEc0Z0lDQWdJQ0IyWVd4MVpTQTlJRTliYVc1a1pYZ3JLMTA3WEc0Z0lDQWdJQ0F2THlCbGMyeHBiblF0WkdsellXSnNaUzF1WlhoMExXeHBibVVnYm04dGMyVnNaaTFqYjIxd1lYSmxYRzRnSUNBZ0lDQnBaaUFvZG1Gc2RXVWdJVDBnZG1Gc2RXVXBJSEpsZEhWeWJpQjBjblZsTzF4dUlDQWdJQzh2SUVGeWNtRjVJMmx1WkdWNFQyWWdhV2R1YjNKbGN5Qm9iMnhsY3l3Z1FYSnlZWGtqYVc1amJIVmtaWE1nTFNCdWIzUmNiaUFnSUNCOUlHVnNjMlVnWm05eUlDZzdiR1Z1WjNSb0lENGdhVzVrWlhnN0lHbHVaR1Y0S3lzcElHbG1JQ2hKVTE5SlRrTk1WVVJGVXlCOGZDQnBibVJsZUNCcGJpQlBLU0I3WEc0Z0lDQWdJQ0JwWmlBb1QxdHBibVJsZUYwZ1BUMDlJR1ZzS1NCeVpYUjFjbTRnU1ZOZlNVNURURlZFUlZNZ2ZId2dhVzVrWlhnZ2ZId2dNRHRjYmlBZ0lDQjlJSEpsZEhWeWJpQWhTVk5mU1U1RFRGVkVSVk1nSmlZZ0xURTdYRzRnSUgwN1hHNTlPMXh1SWl3aUx5OGdaMlYwZEdsdVp5QjBZV2NnWm5KdmJTQXhPUzR4TGpNdU5pQlBZbXBsWTNRdWNISnZkRzkwZVhCbExuUnZVM1J5YVc1bktDbGNiblpoY2lCamIyWWdQU0J5WlhGMWFYSmxLQ2N1TDE5amIyWW5LVHRjYm5aaGNpQlVRVWNnUFNCeVpYRjFhWEpsS0NjdUwxOTNhM01uS1NnbmRHOVRkSEpwYm1kVVlXY25LVHRjYmk4dklFVlRNeUIzY205dVp5Qm9aWEpsWEc1MllYSWdRVkpISUQwZ1kyOW1LR1oxYm1OMGFXOXVJQ2dwSUhzZ2NtVjBkWEp1SUdGeVozVnRaVzUwY3pzZ2ZTZ3BLU0E5UFNBblFYSm5kVzFsYm5Sekp6dGNibHh1THk4Z1ptRnNiR0poWTJzZ1ptOXlJRWxGTVRFZ1UyTnlhWEIwSUVGalkyVnpjeUJFWlc1cFpXUWdaWEp5YjNKY2JuWmhjaUIwY25sSFpYUWdQU0JtZFc1amRHbHZiaUFvYVhRc0lHdGxlU2tnZTF4dUlDQjBjbmtnZTF4dUlDQWdJSEpsZEhWeWJpQnBkRnRyWlhsZE8xeHVJQ0I5SUdOaGRHTm9JQ2hsS1NCN0lDOHFJR1Z0Y0hSNUlDb3ZJSDFjYm4wN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLR2wwS1NCN1hHNGdJSFpoY2lCUExDQlVMQ0JDTzF4dUlDQnlaWFIxY200Z2FYUWdQVDA5SUhWdVpHVm1hVzVsWkNBL0lDZFZibVJsWm1sdVpXUW5JRG9nYVhRZ1BUMDlJRzUxYkd3Z1B5QW5UblZzYkNkY2JpQWdJQ0F2THlCQVFIUnZVM1J5YVc1blZHRm5JR05oYzJWY2JpQWdJQ0E2SUhSNWNHVnZaaUFvVkNBOUlIUnllVWRsZENoUElEMGdUMkpxWldOMEtHbDBLU3dnVkVGSEtTa2dQVDBnSjNOMGNtbHVaeWNnUHlCVVhHNGdJQ0FnTHk4Z1luVnBiSFJwYmxSaFp5QmpZWE5sWEc0Z0lDQWdPaUJCVWtjZ1B5QmpiMllvVHlsY2JpQWdJQ0F2THlCRlV6TWdZWEpuZFcxbGJuUnpJR1poYkd4aVlXTnJYRzRnSUNBZ09pQW9RaUE5SUdOdlppaFBLU2tnUFQwZ0owOWlhbVZqZENjZ0ppWWdkSGx3Wlc5bUlFOHVZMkZzYkdWbElEMDlJQ2RtZFc1amRHbHZiaWNnUHlBblFYSm5kVzFsYm5Sekp5QTZJRUk3WEc1OU8xeHVJaXdpZG1GeUlIUnZVM1J5YVc1bklEMGdlMzB1ZEc5VGRISnBibWM3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z0tHbDBLU0I3WEc0Z0lISmxkSFZ5YmlCMGIxTjBjbWx1Wnk1allXeHNLR2wwS1M1emJHbGpaU2c0TENBdE1TazdYRzU5TzF4dUlpd2lkbUZ5SUdOdmNtVWdQU0J0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHNnZG1WeWMybHZiam9nSnpJdU5TNHpKeUI5TzF4dWFXWWdLSFI1Y0dWdlppQmZYMlVnUFQwZ0oyNTFiV0psY2ljcElGOWZaU0E5SUdOdmNtVTdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMV3hwYm1VZ2JtOHRkVzVrWldaY2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JuWmhjaUFrWkdWbWFXNWxVSEp2Y0dWeWRIa2dQU0J5WlhGMWFYSmxLQ2N1TDE5dlltcGxZM1F0WkhBbktUdGNiblpoY2lCamNtVmhkR1ZFWlhOaklEMGdjbVZ4ZFdseVpTZ25MaTlmY0hKdmNHVnlkSGt0WkdWell5Y3BPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNodlltcGxZM1FzSUdsdVpHVjRMQ0IyWVd4MVpTa2dlMXh1SUNCcFppQW9hVzVrWlhnZ2FXNGdiMkpxWldOMEtTQWtaR1ZtYVc1bFVISnZjR1Z5ZEhrdVppaHZZbXBsWTNRc0lHbHVaR1Y0TENCamNtVmhkR1ZFWlhOaktEQXNJSFpoYkhWbEtTazdYRzRnSUdWc2MyVWdiMkpxWldOMFcybHVaR1Y0WFNBOUlIWmhiSFZsTzF4dWZUdGNiaUlzSWk4dklHOXdkR2x2Ym1Gc0lDOGdjMmx0Y0d4bElHTnZiblJsZUhRZ1ltbHVaR2x1WjF4dWRtRnlJR0ZHZFc1amRHbHZiaUE5SUhKbGNYVnBjbVVvSnk0dlgyRXRablZ1WTNScGIyNG5LVHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dadUxDQjBhR0YwTENCc1pXNW5kR2dwSUh0Y2JpQWdZVVoxYm1OMGFXOXVLR1p1S1R0Y2JpQWdhV1lnS0hSb1lYUWdQVDA5SUhWdVpHVm1hVzVsWkNrZ2NtVjBkWEp1SUdadU8xeHVJQ0J6ZDJsMFkyZ2dLR3hsYm1kMGFDa2dlMXh1SUNBZ0lHTmhjMlVnTVRvZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUNoaEtTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z1ptNHVZMkZzYkNoMGFHRjBMQ0JoS1R0Y2JpQWdJQ0I5TzF4dUlDQWdJR05oYzJVZ01qb2djbVYwZFhKdUlHWjFibU4wYVc5dUlDaGhMQ0JpS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnWm00dVkyRnNiQ2gwYUdGMExDQmhMQ0JpS1R0Y2JpQWdJQ0I5TzF4dUlDQWdJR05oYzJVZ016b2djbVYwZFhKdUlHWjFibU4wYVc5dUlDaGhMQ0JpTENCaktTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z1ptNHVZMkZzYkNoMGFHRjBMQ0JoTENCaUxDQmpLVHRjYmlBZ0lDQjlPMXh1SUNCOVhHNGdJSEpsZEhWeWJpQm1kVzVqZEdsdmJpQW9MeW9nTGk0dVlYSm5jeUFxTHlrZ2UxeHVJQ0FnSUhKbGRIVnliaUJtYmk1aGNIQnNlU2gwYUdGMExDQmhjbWQxYldWdWRITXBPMXh1SUNCOU8xeHVmVHRjYmlJc0lpOHZJRGN1TWk0eElGSmxjWFZwY21WUFltcGxZM1JEYjJWeVkybGliR1VvWVhKbmRXMWxiblFwWEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNocGRDa2dlMXh1SUNCcFppQW9hWFFnUFQwZ2RXNWtaV1pwYm1Wa0tTQjBhSEp2ZHlCVWVYQmxSWEp5YjNJb1hDSkRZVzRuZENCallXeHNJRzFsZEdodlpDQnZiaUFnWENJZ0t5QnBkQ2s3WEc0Z0lISmxkSFZ5YmlCcGREdGNibjA3WEc0aUxDSXZMeUJVYUdGdWF5ZHpJRWxGT0NCbWIzSWdhR2x6SUdaMWJtNTVJR1JsWm1sdVpWQnliM0JsY25SNVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlDRnlaWEYxYVhKbEtDY3VMMTltWVdsc2N5Y3BLR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdjbVYwZFhKdUlFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2g3ZlN3Z0oyRW5MQ0I3SUdkbGREb2dablZ1WTNScGIyNGdLQ2tnZXlCeVpYUjFjbTRnTnpzZ2ZTQjlLUzVoSUNFOUlEYzdYRzU5S1R0Y2JpSXNJblpoY2lCcGMwOWlhbVZqZENBOUlISmxjWFZwY21Vb0p5NHZYMmx6TFc5aWFtVmpkQ2NwTzF4dWRtRnlJR1J2WTNWdFpXNTBJRDBnY21WeGRXbHlaU2duTGk5ZloyeHZZbUZzSnlrdVpHOWpkVzFsYm5RN1hHNHZMeUIwZVhCbGIyWWdaRzlqZFcxbGJuUXVZM0psWVhSbFJXeGxiV1Z1ZENCcGN5QW5iMkpxWldOMEp5QnBiaUJ2YkdRZ1NVVmNiblpoY2lCcGN5QTlJR2x6VDJKcVpXTjBLR1J2WTNWdFpXNTBLU0FtSmlCcGMwOWlhbVZqZENoa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLVHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dsMEtTQjdYRzRnSUhKbGRIVnliaUJwY3lBL0lHUnZZM1Z0Wlc1MExtTnlaV0YwWlVWc1pXMWxiblFvYVhRcElEb2dlMzA3WEc1OU8xeHVJaXdpTHk4Z1NVVWdPQzBnWkc5dUozUWdaVzUxYlNCaWRXY2dhMlY1YzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNBb1hHNGdJQ2RqYjI1emRISjFZM1J2Y2l4b1lYTlBkMjVRY205d1pYSjBlU3hwYzFCeWIzUnZkSGx3WlU5bUxIQnliM0JsY25SNVNYTkZiblZ0WlhKaFlteGxMSFJ2VEc5allXeGxVM1J5YVc1bkxIUnZVM1J5YVc1bkxIWmhiSFZsVDJZblhHNHBMbk53YkdsMEtDY3NKeWs3WEc0aUxDSjJZWElnWjJ4dlltRnNJRDBnY21WeGRXbHlaU2duTGk5ZloyeHZZbUZzSnlrN1hHNTJZWElnWTI5eVpTQTlJSEpsY1hWcGNtVW9KeTR2WDJOdmNtVW5LVHRjYm5aaGNpQmpkSGdnUFNCeVpYRjFhWEpsS0NjdUwxOWpkSGduS1R0Y2JuWmhjaUJvYVdSbElEMGdjbVZ4ZFdseVpTZ25MaTlmYUdsa1pTY3BPMXh1ZG1GeUlGQlNUMVJQVkZsUVJTQTlJQ2R3Y205MGIzUjVjR1VuTzF4dVhHNTJZWElnSkdWNGNHOXlkQ0E5SUdaMWJtTjBhVzl1SUNoMGVYQmxMQ0J1WVcxbExDQnpiM1Z5WTJVcElIdGNiaUFnZG1GeUlFbFRYMFpQVWtORlJDQTlJSFI1Y0dVZ0ppQWtaWGh3YjNKMExrWTdYRzRnSUhaaGNpQkpVMTlIVEU5Q1FVd2dQU0IwZVhCbElDWWdKR1Y0Y0c5eWRDNUhPMXh1SUNCMllYSWdTVk5mVTFSQlZFbERJRDBnZEhsd1pTQW1JQ1JsZUhCdmNuUXVVenRjYmlBZ2RtRnlJRWxUWDFCU1QxUlBJRDBnZEhsd1pTQW1JQ1JsZUhCdmNuUXVVRHRjYmlBZ2RtRnlJRWxUWDBKSlRrUWdQU0IwZVhCbElDWWdKR1Y0Y0c5eWRDNUNPMXh1SUNCMllYSWdTVk5mVjFKQlVDQTlJSFI1Y0dVZ0ppQWtaWGh3YjNKMExsYzdYRzRnSUhaaGNpQmxlSEJ2Y25SeklEMGdTVk5mUjB4UFFrRk1JRDhnWTI5eVpTQTZJR052Y21WYmJtRnRaVjBnZkh3Z0tHTnZjbVZiYm1GdFpWMGdQU0I3ZlNrN1hHNGdJSFpoY2lCbGVIQlFjbTkwYnlBOUlHVjRjRzl5ZEhOYlVGSlBWRTlVV1ZCRlhUdGNiaUFnZG1GeUlIUmhjbWRsZENBOUlFbFRYMGRNVDBKQlRDQS9JR2RzYjJKaGJDQTZJRWxUWDFOVVFWUkpReUEvSUdkc2IySmhiRnR1WVcxbFhTQTZJQ2huYkc5aVlXeGJibUZ0WlYwZ2ZId2dlMzBwVzFCU1QxUlBWRmxRUlYwN1hHNGdJSFpoY2lCclpYa3NJRzkzYml3Z2IzVjBPMXh1SUNCcFppQW9TVk5mUjB4UFFrRk1LU0J6YjNWeVkyVWdQU0J1WVcxbE8xeHVJQ0JtYjNJZ0tHdGxlU0JwYmlCemIzVnlZMlVwSUh0Y2JpQWdJQ0F2THlCamIyNTBZV2x1Y3lCcGJpQnVZWFJwZG1WY2JpQWdJQ0J2ZDI0Z1BTQWhTVk5mUms5U1EwVkVJQ1ltSUhSaGNtZGxkQ0FtSmlCMFlYSm5aWFJiYTJWNVhTQWhQVDBnZFc1a1pXWnBibVZrTzF4dUlDQWdJR2xtSUNodmQyNGdKaVlnYTJWNUlHbHVJR1Y0Y0c5eWRITXBJR052Ym5ScGJuVmxPMXh1SUNBZ0lDOHZJR1Y0Y0c5eWRDQnVZWFJwZG1VZ2IzSWdjR0Z6YzJWa1hHNGdJQ0FnYjNWMElEMGdiM2R1SUQ4Z2RHRnlaMlYwVzJ0bGVWMGdPaUJ6YjNWeVkyVmJhMlY1WFR0Y2JpQWdJQ0F2THlCd2NtVjJaVzUwSUdkc2IySmhiQ0J3YjJ4c2RYUnBiMjRnWm05eUlHNWhiV1Z6Y0dGalpYTmNiaUFnSUNCbGVIQnZjblJ6VzJ0bGVWMGdQU0JKVTE5SFRFOUNRVXdnSmlZZ2RIbHdaVzltSUhSaGNtZGxkRnRyWlhsZElDRTlJQ2RtZFc1amRHbHZiaWNnUHlCemIzVnlZMlZiYTJWNVhWeHVJQ0FnSUM4dklHSnBibVFnZEdsdFpYSnpJSFJ2SUdkc2IySmhiQ0JtYjNJZ1kyRnNiQ0JtY205dElHVjRjRzl5ZENCamIyNTBaWGgwWEc0Z0lDQWdPaUJKVTE5Q1NVNUVJQ1ltSUc5M2JpQS9JR04wZUNodmRYUXNJR2RzYjJKaGJDbGNiaUFnSUNBdkx5QjNjbUZ3SUdkc2IySmhiQ0JqYjI1emRISjFZM1J2Y25NZ1ptOXlJSEJ5WlhabGJuUWdZMmhoYm1kbElIUm9aVzBnYVc0Z2JHbGljbUZ5ZVZ4dUlDQWdJRG9nU1ZOZlYxSkJVQ0FtSmlCMFlYSm5aWFJiYTJWNVhTQTlQU0J2ZFhRZ1B5QW9ablZ1WTNScGIyNGdLRU1wSUh0Y2JpQWdJQ0FnSUhaaGNpQkdJRDBnWm5WdVkzUnBiMjRnS0dFc0lHSXNJR01wSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFJvYVhNZ2FXNXpkR0Z1WTJWdlppQkRLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2MzZHBkR05vSUNoaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqWVhObElEQTZJSEpsZEhWeWJpQnVaWGNnUXlncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWTJGelpTQXhPaUJ5WlhSMWNtNGdibVYzSUVNb1lTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCallYTmxJREk2SUhKbGRIVnliaUJ1WlhjZ1F5aGhMQ0JpS1R0Y2JpQWdJQ0FnSUNBZ0lDQjlJSEpsZEhWeWJpQnVaWGNnUXloaExDQmlMQ0JqS1R0Y2JpQWdJQ0FnSUNBZ2ZTQnlaWFIxY200Z1F5NWhjSEJzZVNoMGFHbHpMQ0JoY21kMWJXVnVkSE1wTzF4dUlDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUVaYlVGSlBWRTlVV1ZCRlhTQTlJRU5iVUZKUFZFOVVXVkJGWFR0Y2JpQWdJQ0FnSUhKbGRIVnliaUJHTzF4dUlDQWdJQzh2SUcxaGEyVWdjM1JoZEdsaklIWmxjbk5wYjI1eklHWnZjaUJ3Y205MGIzUjVjR1VnYldWMGFHOWtjMXh1SUNBZ0lIMHBLRzkxZENrZ09pQkpVMTlRVWs5VVR5QW1KaUIwZVhCbGIyWWdiM1YwSUQwOUlDZG1kVzVqZEdsdmJpY2dQeUJqZEhnb1JuVnVZM1JwYjI0dVkyRnNiQ3dnYjNWMEtTQTZJRzkxZER0Y2JpQWdJQ0F2THlCbGVIQnZjblFnY0hKdmRHOGdiV1YwYUc5a2N5QjBieUJqYjNKbExpVkRUMDVUVkZKVlExUlBVaVV1YldWMGFHOWtjeTRsVGtGTlJTVmNiaUFnSUNCcFppQW9TVk5mVUZKUFZFOHBJSHRjYmlBZ0lDQWdJQ2hsZUhCdmNuUnpMblpwY25SMVlXd2dmSHdnS0dWNGNHOXlkSE11ZG1seWRIVmhiQ0E5SUh0OUtTbGJhMlY1WFNBOUlHOTFkRHRjYmlBZ0lDQWdJQzh2SUdWNGNHOXlkQ0J3Y205MGJ5QnRaWFJvYjJSeklIUnZJR052Y21VdUpVTlBUbE5VVWxWRFZFOVNKUzV3Y205MGIzUjVjR1V1SlU1QlRVVWxYRzRnSUNBZ0lDQnBaaUFvZEhsd1pTQW1JQ1JsZUhCdmNuUXVVaUFtSmlCbGVIQlFjbTkwYnlBbUppQWhaWGh3VUhKdmRHOWJhMlY1WFNrZ2FHbGtaU2hsZUhCUWNtOTBieXdnYTJWNUxDQnZkWFFwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVmVHRjYmk4dklIUjVjR1VnWW1sMGJXRndYRzRrWlhod2IzSjBMa1lnUFNBeE95QWdJQzh2SUdadmNtTmxaRnh1SkdWNGNHOXlkQzVISUQwZ01qc2dJQ0F2THlCbmJHOWlZV3hjYmlSbGVIQnZjblF1VXlBOUlEUTdJQ0FnTHk4Z2MzUmhkR2xqWEc0a1pYaHdiM0owTGxBZ1BTQTRPeUFnSUM4dklIQnliM1J2WEc0a1pYaHdiM0owTGtJZ1BTQXhOanNnSUM4dklHSnBibVJjYmlSbGVIQnZjblF1VnlBOUlETXlPeUFnTHk4Z2QzSmhjRnh1SkdWNGNHOXlkQzVWSUQwZ05qUTdJQ0F2THlCellXWmxYRzRrWlhod2IzSjBMbElnUFNBeE1qZzdJQzh2SUhKbFlXd2djSEp2ZEc4Z2JXVjBhRzlrSUdadmNpQmdiR2xpY21GeWVXQmNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdKR1Y0Y0c5eWREdGNiaUlzSW0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dWNFpXTXBJSHRjYmlBZ2RISjVJSHRjYmlBZ0lDQnlaWFIxY200Z0lTRmxlR1ZqS0NrN1hHNGdJSDBnWTJGMFkyZ2dLR1VwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdkSEoxWlR0Y2JpQWdmVnh1ZlR0Y2JpSXNJaTh2SUdoMGRIQnpPaTh2WjJsMGFIVmlMbU52YlM5NmJHOXBjbTlqYXk5amIzSmxMV3B6TDJsemMzVmxjeTg0TmlOcGMzTjFaV052YlcxbGJuUXRNVEUxTnpVNU1ESTRYRzUyWVhJZ1oyeHZZbUZzSUQwZ2JXOWtkV3hsTG1WNGNHOXlkSE1nUFNCMGVYQmxiMllnZDJsdVpHOTNJQ0U5SUNkMWJtUmxabWx1WldRbklDWW1JSGRwYm1SdmR5NU5ZWFJvSUQwOUlFMWhkR2hjYmlBZ1B5QjNhVzVrYjNjZ09pQjBlWEJsYjJZZ2MyVnNaaUFoUFNBbmRXNWtaV1pwYm1Wa0p5QW1KaUJ6Wld4bUxrMWhkR2dnUFQwZ1RXRjBhQ0EvSUhObGJHWmNiaUFnTHk4Z1pYTnNhVzUwTFdScGMyRmliR1V0Ym1WNGRDMXNhVzVsSUc1dkxXNWxkeTFtZFc1alhHNGdJRG9nUm5WdVkzUnBiMjRvSjNKbGRIVnliaUIwYUdsekp5a29LVHRjYm1sbUlDaDBlWEJsYjJZZ1gxOW5JRDA5SUNkdWRXMWlaWEluS1NCZlgyY2dQU0JuYkc5aVlXdzdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMV3hwYm1VZ2JtOHRkVzVrWldaY2JpSXNJblpoY2lCb1lYTlBkMjVRY205d1pYSjBlU0E5SUh0OUxtaGhjMDkzYmxCeWIzQmxjblI1TzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUXNJR3RsZVNrZ2UxeHVJQ0J5WlhSMWNtNGdhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2hwZEN3Z2EyVjVLVHRjYm4wN1hHNGlMQ0oyWVhJZ1pGQWdQU0J5WlhGMWFYSmxLQ2N1TDE5dlltcGxZM1F0WkhBbktUdGNiblpoY2lCamNtVmhkR1ZFWlhOaklEMGdjbVZ4ZFdseVpTZ25MaTlmY0hKdmNHVnlkSGt0WkdWell5Y3BPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0J5WlhGMWFYSmxLQ2N1TDE5a1pYTmpjbWx3ZEc5eWN5Y3BJRDhnWm5WdVkzUnBiMjRnS0c5aWFtVmpkQ3dnYTJWNUxDQjJZV3gxWlNrZ2UxeHVJQ0J5WlhSMWNtNGdaRkF1WmlodlltcGxZM1FzSUd0bGVTd2dZM0psWVhSbFJHVnpZeWd4TENCMllXeDFaU2twTzF4dWZTQTZJR1oxYm1OMGFXOXVJQ2h2WW1wbFkzUXNJR3RsZVN3Z2RtRnNkV1VwSUh0Y2JpQWdiMkpxWldOMFcydGxlVjBnUFNCMllXeDFaVHRjYmlBZ2NtVjBkWEp1SUc5aWFtVmpkRHRjYm4wN1hHNGlMQ0oyWVhJZ1pHOWpkVzFsYm5RZ1BTQnlaWEYxYVhKbEtDY3VMMTluYkc5aVlXd25LUzVrYjJOMWJXVnVkRHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWkc5amRXMWxiblFnSmlZZ1pHOWpkVzFsYm5RdVpHOWpkVzFsYm5SRmJHVnRaVzUwTzF4dUlpd2liVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQWhjbVZ4ZFdseVpTZ25MaTlmWkdWelkzSnBjSFJ2Y25NbktTQW1KaUFoY21WeGRXbHlaU2duTGk5ZlptRnBiSE1uS1NobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUhKbGRIVnliaUJQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb2NtVnhkV2x5WlNnbkxpOWZaRzl0TFdOeVpXRjBaU2NwS0Nka2FYWW5LU3dnSjJFbkxDQjdJR2RsZERvZ1puVnVZM1JwYjI0Z0tDa2dleUJ5WlhSMWNtNGdOenNnZlNCOUtTNWhJQ0U5SURjN1hHNTlLVHRjYmlJc0lpOHZJR1poYkd4aVlXTnJJR1p2Y2lCdWIyNHRZWEp5WVhrdGJHbHJaU0JGVXpNZ1lXNWtJRzV2YmkxbGJuVnRaWEpoWW14bElHOXNaQ0JXT0NCemRISnBibWR6WEc1MllYSWdZMjltSUQwZ2NtVnhkV2x5WlNnbkxpOWZZMjltSnlrN1hHNHZMeUJsYzJ4cGJuUXRaR2x6WVdKc1pTMXVaWGgwTFd4cGJtVWdibTh0Y0hKdmRHOTBlWEJsTFdKMWFXeDBhVzV6WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUU5aWFtVmpkQ2duZWljcExuQnliM0JsY25SNVNYTkZiblZ0WlhKaFlteGxLREFwSUQ4Z1QySnFaV04wSURvZ1puVnVZM1JwYjI0Z0tHbDBLU0I3WEc0Z0lISmxkSFZ5YmlCamIyWW9hWFFwSUQwOUlDZFRkSEpwYm1jbklEOGdhWFF1YzNCc2FYUW9KeWNwSURvZ1QySnFaV04wS0dsMEtUdGNibjA3WEc0aUxDSXZMeUJqYUdWamF5QnZiaUJrWldaaGRXeDBJRUZ5Y21GNUlHbDBaWEpoZEc5eVhHNTJZWElnU1hSbGNtRjBiM0p6SUQwZ2NtVnhkV2x5WlNnbkxpOWZhWFJsY21GMGIzSnpKeWs3WEc1MllYSWdTVlJGVWtGVVQxSWdQU0J5WlhGMWFYSmxLQ2N1TDE5M2EzTW5LU2duYVhSbGNtRjBiM0luS1R0Y2JuWmhjaUJCY25KaGVWQnliM1J2SUQwZ1FYSnlZWGt1Y0hKdmRHOTBlWEJsTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaHBkQ2tnZTF4dUlDQnlaWFIxY200Z2FYUWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQW9TWFJsY21GMGIzSnpMa0Z5Y21GNUlEMDlQU0JwZENCOGZDQkJjbkpoZVZCeWIzUnZXMGxVUlZKQlZFOVNYU0E5UFQwZ2FYUXBPMXh1ZlR0Y2JpSXNJbTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLR2wwS1NCN1hHNGdJSEpsZEhWeWJpQjBlWEJsYjJZZ2FYUWdQVDA5SUNkdlltcGxZM1FuSUQ4Z2FYUWdJVDA5SUc1MWJHd2dPaUIwZVhCbGIyWWdhWFFnUFQwOUlDZG1kVzVqZEdsdmJpYzdYRzU5TzF4dUlpd2lMeThnWTJGc2JDQnpiMjFsZEdocGJtY2diMjRnYVhSbGNtRjBiM0lnYzNSbGNDQjNhWFJvSUhOaFptVWdZMnh2YzJsdVp5QnZiaUJsY25KdmNseHVkbUZ5SUdGdVQySnFaV04wSUQwZ2NtVnhkV2x5WlNnbkxpOWZZVzR0YjJKcVpXTjBKeWs3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNocGRHVnlZWFJ2Y2l3Z1ptNHNJSFpoYkhWbExDQmxiblJ5YVdWektTQjdYRzRnSUhSeWVTQjdYRzRnSUNBZ2NtVjBkWEp1SUdWdWRISnBaWE1nUHlCbWJpaGhiazlpYW1WamRDaDJZV3gxWlNsYk1GMHNJSFpoYkhWbFd6RmRLU0E2SUdadUtIWmhiSFZsS1R0Y2JpQWdMeThnTnk0MExqWWdTWFJsY21GMGIzSkRiRzl6WlNocGRHVnlZWFJ2Y2l3Z1kyOXRjR3hsZEdsdmJpbGNiaUFnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0FnSUhaaGNpQnlaWFFnUFNCcGRHVnlZWFJ2Y2xzbmNtVjBkWEp1SjEwN1hHNGdJQ0FnYVdZZ0tISmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0tTQmhiazlpYW1WamRDaHlaWFF1WTJGc2JDaHBkR1Z5WVhSdmNpa3BPMXh1SUNBZ0lIUm9jbTkzSUdVN1hHNGdJSDFjYm4wN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNTJZWElnWTNKbFlYUmxJRDBnY21WeGRXbHlaU2duTGk5ZmIySnFaV04wTFdOeVpXRjBaU2NwTzF4dWRtRnlJR1JsYzJOeWFYQjBiM0lnUFNCeVpYRjFhWEpsS0NjdUwxOXdjbTl3WlhKMGVTMWtaWE5qSnlrN1hHNTJZWElnYzJWMFZHOVRkSEpwYm1kVVlXY2dQU0J5WlhGMWFYSmxLQ2N1TDE5elpYUXRkRzh0YzNSeWFXNW5MWFJoWnljcE8xeHVkbUZ5SUVsMFpYSmhkRzl5VUhKdmRHOTBlWEJsSUQwZ2UzMDdYRzVjYmk4dklESTFMakV1TWk0eExqRWdKVWwwWlhKaGRHOXlVSEp2ZEc5MGVYQmxKVnRBUUdsMFpYSmhkRzl5WFNncFhHNXlaWEYxYVhKbEtDY3VMMTlvYVdSbEp5a29TWFJsY21GMGIzSlFjbTkwYjNSNWNHVXNJSEpsY1hWcGNtVW9KeTR2WDNkcmN5Y3BLQ2RwZEdWeVlYUnZjaWNwTENCbWRXNWpkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQjBhR2x6T3lCOUtUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvUTI5dWMzUnlkV04wYjNJc0lFNUJUVVVzSUc1bGVIUXBJSHRjYmlBZ1EyOXVjM1J5ZFdOMGIzSXVjSEp2ZEc5MGVYQmxJRDBnWTNKbFlYUmxLRWwwWlhKaGRHOXlVSEp2ZEc5MGVYQmxMQ0I3SUc1bGVIUTZJR1JsYzJOeWFYQjBiM0lvTVN3Z2JtVjRkQ2tnZlNrN1hHNGdJSE5sZEZSdlUzUnlhVzVuVkdGbktFTnZibk4wY25WamRHOXlMQ0JPUVUxRklDc2dKeUJKZEdWeVlYUnZjaWNwTzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNiblpoY2lCTVNVSlNRVkpaSUQwZ2NtVnhkV2x5WlNnbkxpOWZiR2xpY21GeWVTY3BPMXh1ZG1GeUlDUmxlSEJ2Y25RZ1BTQnlaWEYxYVhKbEtDY3VMMTlsZUhCdmNuUW5LVHRjYm5aaGNpQnlaV1JsWm1sdVpTQTlJSEpsY1hWcGNtVW9KeTR2WDNKbFpHVm1hVzVsSnlrN1hHNTJZWElnYUdsa1pTQTlJSEpsY1hWcGNtVW9KeTR2WDJocFpHVW5LVHRjYm5aaGNpQm9ZWE1nUFNCeVpYRjFhWEpsS0NjdUwxOW9ZWE1uS1R0Y2JuWmhjaUJKZEdWeVlYUnZjbk1nUFNCeVpYRjFhWEpsS0NjdUwxOXBkR1Z5WVhSdmNuTW5LVHRjYm5aaGNpQWthWFJsY2tOeVpXRjBaU0E5SUhKbGNYVnBjbVVvSnk0dlgybDBaWEl0WTNKbFlYUmxKeWs3WEc1MllYSWdjMlYwVkc5VGRISnBibWRVWVdjZ1BTQnlaWEYxYVhKbEtDY3VMMTl6WlhRdGRHOHRjM1J5YVc1bkxYUmhaeWNwTzF4dWRtRnlJR2RsZEZCeWIzUnZkSGx3WlU5bUlEMGdjbVZ4ZFdseVpTZ25MaTlmYjJKcVpXTjBMV2R3YnljcE8xeHVkbUZ5SUVsVVJWSkJWRTlTSUQwZ2NtVnhkV2x5WlNnbkxpOWZkMnR6Snlrb0oybDBaWEpoZEc5eUp5azdYRzUyWVhJZ1FsVkhSMWtnUFNBaEtGdGRMbXRsZVhNZ0ppWWdKMjVsZUhRbklHbHVJRnRkTG10bGVYTW9LU2s3SUM4dklGTmhabUZ5YVNCb1lYTWdZblZuWjNrZ2FYUmxjbUYwYjNKeklIY3ZieUJnYm1WNGRHQmNiblpoY2lCR1JsOUpWRVZTUVZSUFVpQTlJQ2RBUUdsMFpYSmhkRzl5Snp0Y2JuWmhjaUJMUlZsVElEMGdKMnRsZVhNbk8xeHVkbUZ5SUZaQlRGVkZVeUE5SUNkMllXeDFaWE1uTzF4dVhHNTJZWElnY21WMGRYSnVWR2hwY3lBOUlHWjFibU4wYVc5dUlDZ3BJSHNnY21WMGRYSnVJSFJvYVhNN0lIMDdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0VKaGMyVXNJRTVCVFVVc0lFTnZibk4wY25WamRHOXlMQ0J1WlhoMExDQkVSVVpCVlV4VUxDQkpVMTlUUlZRc0lFWlBVa05GUkNrZ2UxeHVJQ0FrYVhSbGNrTnlaV0YwWlNoRGIyNXpkSEoxWTNSdmNpd2dUa0ZOUlN3Z2JtVjRkQ2s3WEc0Z0lIWmhjaUJuWlhSTlpYUm9iMlFnUFNCbWRXNWpkR2x2YmlBb2EybHVaQ2tnZTF4dUlDQWdJR2xtSUNnaFFsVkhSMWtnSmlZZ2EybHVaQ0JwYmlCd2NtOTBieWtnY21WMGRYSnVJSEJ5YjNSdlcydHBibVJkTzF4dUlDQWdJSE4zYVhSamFDQW9hMmx1WkNrZ2UxeHVJQ0FnSUNBZ1kyRnpaU0JMUlZsVE9pQnlaWFIxY200Z1puVnVZM1JwYjI0Z2EyVjVjeWdwSUhzZ2NtVjBkWEp1SUc1bGR5QkRiMjV6ZEhKMVkzUnZjaWgwYUdsekxDQnJhVzVrS1RzZ2ZUdGNiaUFnSUNBZ0lHTmhjMlVnVmtGTVZVVlRPaUJ5WlhSMWNtNGdablZ1WTNScGIyNGdkbUZzZFdWektDa2dleUJ5WlhSMWNtNGdibVYzSUVOdmJuTjBjblZqZEc5eUtIUm9hWE1zSUd0cGJtUXBPeUI5TzF4dUlDQWdJSDBnY21WMGRYSnVJR1oxYm1OMGFXOXVJR1Z1ZEhKcFpYTW9LU0I3SUhKbGRIVnliaUJ1WlhjZ1EyOXVjM1J5ZFdOMGIzSW9kR2hwY3l3Z2EybHVaQ2s3SUgwN1hHNGdJSDA3WEc0Z0lIWmhjaUJVUVVjZ1BTQk9RVTFGSUNzZ0p5QkpkR1Z5WVhSdmNpYzdYRzRnSUhaaGNpQkVSVVpmVmtGTVZVVlRJRDBnUkVWR1FWVk1WQ0E5UFNCV1FVeFZSVk03WEc0Z0lIWmhjaUJXUVV4VlJWTmZRbFZISUQwZ1ptRnNjMlU3WEc0Z0lIWmhjaUJ3Y205MGJ5QTlJRUpoYzJVdWNISnZkRzkwZVhCbE8xeHVJQ0IyWVhJZ0pHNWhkR2wyWlNBOUlIQnliM1J2VzBsVVJWSkJWRTlTWFNCOGZDQndjbTkwYjF0R1JsOUpWRVZTUVZSUFVsMGdmSHdnUkVWR1FWVk1WQ0FtSmlCd2NtOTBiMXRFUlVaQlZVeFVYVHRjYmlBZ2RtRnlJQ1JrWldaaGRXeDBJRDBnS0NGQ1ZVZEhXU0FtSmlBa2JtRjBhWFpsS1NCOGZDQm5aWFJOWlhSb2IyUW9SRVZHUVZWTVZDazdYRzRnSUhaaGNpQWtaVzUwY21sbGN5QTlJRVJGUmtGVlRGUWdQeUFoUkVWR1gxWkJURlZGVXlBL0lDUmtaV1poZFd4MElEb2daMlYwVFdWMGFHOWtLQ2RsYm5SeWFXVnpKeWtnT2lCMWJtUmxabWx1WldRN1hHNGdJSFpoY2lBa1lXNTVUbUYwYVhabElEMGdUa0ZOUlNBOVBTQW5RWEp5WVhrbklEOGdjSEp2ZEc4dVpXNTBjbWxsY3lCOGZDQWtibUYwYVhabElEb2dKRzVoZEdsMlpUdGNiaUFnZG1GeUlHMWxkR2h2WkhNc0lHdGxlU3dnU1hSbGNtRjBiM0pRY205MGIzUjVjR1U3WEc0Z0lDOHZJRVpwZUNCdVlYUnBkbVZjYmlBZ2FXWWdLQ1JoYm5sT1lYUnBkbVVwSUh0Y2JpQWdJQ0JKZEdWeVlYUnZjbEJ5YjNSdmRIbHdaU0E5SUdkbGRGQnliM1J2ZEhsd1pVOW1LQ1JoYm5sT1lYUnBkbVV1WTJGc2JDaHVaWGNnUW1GelpTZ3BLU2s3WEc0Z0lDQWdhV1lnS0VsMFpYSmhkRzl5VUhKdmRHOTBlWEJsSUNFOVBTQlBZbXBsWTNRdWNISnZkRzkwZVhCbElDWW1JRWwwWlhKaGRHOXlVSEp2ZEc5MGVYQmxMbTVsZUhRcElIdGNiaUFnSUNBZ0lDOHZJRk5sZENCQVFIUnZVM1J5YVc1blZHRm5JSFJ2SUc1aGRHbDJaU0JwZEdWeVlYUnZjbk5jYmlBZ0lDQWdJSE5sZEZSdlUzUnlhVzVuVkdGbktFbDBaWEpoZEc5eVVISnZkRzkwZVhCbExDQlVRVWNzSUhSeWRXVXBPMXh1SUNBZ0lDQWdMeThnWm1sNElHWnZjaUJ6YjIxbElHOXNaQ0JsYm1kcGJtVnpYRzRnSUNBZ0lDQnBaaUFvSVV4SlFsSkJVbGtnSmlZZ0lXaGhjeWhKZEdWeVlYUnZjbEJ5YjNSdmRIbHdaU3dnU1ZSRlVrRlVUMUlwS1NCb2FXUmxLRWwwWlhKaGRHOXlVSEp2ZEc5MGVYQmxMQ0JKVkVWU1FWUlBVaXdnY21WMGRYSnVWR2hwY3lrN1hHNGdJQ0FnZlZ4dUlDQjlYRzRnSUM4dklHWnBlQ0JCY25KaGVTTjdkbUZzZFdWekxDQkFRR2wwWlhKaGRHOXlmUzV1WVcxbElHbHVJRlk0SUM4Z1JrWmNiaUFnYVdZZ0tFUkZSbDlXUVV4VlJWTWdKaVlnSkc1aGRHbDJaU0FtSmlBa2JtRjBhWFpsTG01aGJXVWdJVDA5SUZaQlRGVkZVeWtnZTF4dUlDQWdJRlpCVEZWRlUxOUNWVWNnUFNCMGNuVmxPMXh1SUNBZ0lDUmtaV1poZFd4MElEMGdablZ1WTNScGIyNGdkbUZzZFdWektDa2dleUJ5WlhSMWNtNGdKRzVoZEdsMlpTNWpZV3hzS0hSb2FYTXBPeUI5TzF4dUlDQjlYRzRnSUM4dklFUmxabWx1WlNCcGRHVnlZWFJ2Y2x4dUlDQnBaaUFvS0NGTVNVSlNRVkpaSUh4OElFWlBVa05GUkNrZ0ppWWdLRUpWUjBkWklIeDhJRlpCVEZWRlUxOUNWVWNnZkh3Z0lYQnliM1J2VzBsVVJWSkJWRTlTWFNrcElIdGNiaUFnSUNCb2FXUmxLSEJ5YjNSdkxDQkpWRVZTUVZSUFVpd2dKR1JsWm1GMWJIUXBPMXh1SUNCOVhHNGdJQzh2SUZCc2RXY2dabTl5SUd4cFluSmhjbmxjYmlBZ1NYUmxjbUYwYjNKelcwNUJUVVZkSUQwZ0pHUmxabUYxYkhRN1hHNGdJRWwwWlhKaGRHOXljMXRVUVVkZElEMGdjbVYwZFhKdVZHaHBjenRjYmlBZ2FXWWdLRVJGUmtGVlRGUXBJSHRjYmlBZ0lDQnRaWFJvYjJSeklEMGdlMXh1SUNBZ0lDQWdkbUZzZFdWek9pQkVSVVpmVmtGTVZVVlRJRDhnSkdSbFptRjFiSFFnT2lCblpYUk5aWFJvYjJRb1ZrRk1WVVZUS1N4Y2JpQWdJQ0FnSUd0bGVYTTZJRWxUWDFORlZDQS9JQ1JrWldaaGRXeDBJRG9nWjJWMFRXVjBhRzlrS0V0RldWTXBMRnh1SUNBZ0lDQWdaVzUwY21sbGN6b2dKR1Z1ZEhKcFpYTmNiaUFnSUNCOU8xeHVJQ0FnSUdsbUlDaEdUMUpEUlVRcElHWnZjaUFvYTJWNUlHbHVJRzFsZEdodlpITXBJSHRjYmlBZ0lDQWdJR2xtSUNnaEtHdGxlU0JwYmlCd2NtOTBieWtwSUhKbFpHVm1hVzVsS0hCeWIzUnZMQ0JyWlhrc0lHMWxkR2h2WkhOYmEyVjVYU2s3WEc0Z0lDQWdmU0JsYkhObElDUmxlSEJ2Y25Rb0pHVjRjRzl5ZEM1UUlDc2dKR1Y0Y0c5eWRDNUdJQ29nS0VKVlIwZFpJSHg4SUZaQlRGVkZVMTlDVlVjcExDQk9RVTFGTENCdFpYUm9iMlJ6S1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnYldWMGFHOWtjenRjYm4wN1hHNGlMQ0oyWVhJZ1NWUkZVa0ZVVDFJZ1BTQnlaWEYxYVhKbEtDY3VMMTkzYTNNbktTZ25hWFJsY21GMGIzSW5LVHRjYm5aaGNpQlRRVVpGWDBOTVQxTkpUa2NnUFNCbVlXeHpaVHRjYmx4dWRISjVJSHRjYmlBZ2RtRnlJSEpwZEdWeUlEMGdXemRkVzBsVVJWSkJWRTlTWFNncE8xeHVJQ0J5YVhSbGNsc25jbVYwZFhKdUoxMGdQU0JtZFc1amRHbHZiaUFvS1NCN0lGTkJSa1ZmUTB4UFUwbE9SeUE5SUhSeWRXVTdJSDA3WEc0Z0lDOHZJR1Z6YkdsdWRDMWthWE5oWW14bExXNWxlSFF0YkdsdVpTQnVieTEwYUhKdmR5MXNhWFJsY21Gc1hHNGdJRUZ5Y21GNUxtWnliMjBvY21sMFpYSXNJR1oxYm1OMGFXOXVJQ2dwSUhzZ2RHaHliM2NnTWpzZ2ZTazdYRzU5SUdOaGRHTm9JQ2hsS1NCN0lDOHFJR1Z0Y0hSNUlDb3ZJSDFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb1pYaGxZeXdnYzJ0cGNFTnNiM05wYm1jcElIdGNiaUFnYVdZZ0tDRnphMmx3UTJ4dmMybHVaeUFtSmlBaFUwRkdSVjlEVEU5VFNVNUhLU0J5WlhSMWNtNGdabUZzYzJVN1hHNGdJSFpoY2lCellXWmxJRDBnWm1Gc2MyVTdYRzRnSUhSeWVTQjdYRzRnSUNBZ2RtRnlJR0Z5Y2lBOUlGczNYVHRjYmlBZ0lDQjJZWElnYVhSbGNpQTlJR0Z5Y2x0SlZFVlNRVlJQVWwwb0tUdGNiaUFnSUNCcGRHVnlMbTVsZUhRZ1BTQm1kVzVqZEdsdmJpQW9LU0I3SUhKbGRIVnliaUI3SUdSdmJtVTZJSE5oWm1VZ1BTQjBjblZsSUgwN0lIMDdYRzRnSUNBZ1lYSnlXMGxVUlZKQlZFOVNYU0E5SUdaMWJtTjBhVzl1SUNncElIc2djbVYwZFhKdUlHbDBaWEk3SUgwN1hHNGdJQ0FnWlhobFl5aGhjbklwTzF4dUlDQjlJR05oZEdOb0lDaGxLU0I3SUM4cUlHVnRjSFI1SUNvdklIMWNiaUFnY21WMGRYSnVJSE5oWm1VN1hHNTlPMXh1SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCN2ZUdGNiaUlzSW0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnZEhKMVpUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNiaTh2SURFNUxqRXVNaTR4SUU5aWFtVmpkQzVoYzNOcFoyNG9kR0Z5WjJWMExDQnpiM1Z5WTJVc0lDNHVMaWxjYm5aaGNpQm5aWFJMWlhseklEMGdjbVZ4ZFdseVpTZ25MaTlmYjJKcVpXTjBMV3RsZVhNbktUdGNiblpoY2lCblQxQlRJRDBnY21WeGRXbHlaU2duTGk5ZmIySnFaV04wTFdkdmNITW5LVHRjYm5aaGNpQndTVVVnUFNCeVpYRjFhWEpsS0NjdUwxOXZZbXBsWTNRdGNHbGxKeWs3WEc1MllYSWdkRzlQWW1wbFkzUWdQU0J5WlhGMWFYSmxLQ2N1TDE5MGJ5MXZZbXBsWTNRbktUdGNiblpoY2lCSlQySnFaV04wSUQwZ2NtVnhkV2x5WlNnbkxpOWZhVzlpYW1WamRDY3BPMXh1ZG1GeUlDUmhjM05wWjI0Z1BTQlBZbXBsWTNRdVlYTnphV2R1TzF4dVhHNHZMeUJ6YUc5MWJHUWdkMjl5YXlCM2FYUm9JSE41YldKdmJITWdZVzVrSUhOb2IzVnNaQ0JvWVhabElHUmxkR1Z5YldsdWFYTjBhV01nY0hKdmNHVnlkSGtnYjNKa1pYSWdLRlk0SUdKMVp5bGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdJU1JoYzNOcFoyNGdmSHdnY21WeGRXbHlaU2duTGk5ZlptRnBiSE1uS1NobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUhaaGNpQkJJRDBnZTMwN1hHNGdJSFpoY2lCQ0lEMGdlMzA3WEc0Z0lDOHZJR1Z6YkdsdWRDMWthWE5oWW14bExXNWxlSFF0YkdsdVpTQnVieTExYm1SbFpseHVJQ0IyWVhJZ1V5QTlJRk41YldKdmJDZ3BPMXh1SUNCMllYSWdTeUE5SUNkaFltTmtaV1puYUdscWEyeHRibTl3Y1hKemRDYzdYRzRnSUVGYlUxMGdQU0EzTzF4dUlDQkxMbk53YkdsMEtDY25LUzVtYjNKRllXTm9LR1oxYm1OMGFXOXVJQ2hyS1NCN0lFSmJhMTBnUFNCck95QjlLVHRjYmlBZ2NtVjBkWEp1SUNSaGMzTnBaMjRvZTMwc0lFRXBXMU5kSUNFOUlEY2dmSHdnVDJKcVpXTjBMbXRsZVhNb0pHRnpjMmxuYmloN2ZTd2dRaWtwTG1wdmFXNG9KeWNwSUNFOUlFczdYRzU5S1NBL0lHWjFibU4wYVc5dUlHRnpjMmxuYmloMFlYSm5aWFFzSUhOdmRYSmpaU2tnZXlBdkx5QmxjMnhwYm5RdFpHbHpZV0pzWlMxc2FXNWxJRzV2TFhWdWRYTmxaQzEyWVhKelhHNGdJSFpoY2lCVUlEMGdkRzlQWW1wbFkzUW9kR0Z5WjJWMEtUdGNiaUFnZG1GeUlHRk1aVzRnUFNCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvTzF4dUlDQjJZWElnYVc1a1pYZ2dQU0F4TzF4dUlDQjJZWElnWjJWMFUzbHRZbTlzY3lBOUlHZFBVRk11Wmp0Y2JpQWdkbUZ5SUdselJXNTFiU0E5SUhCSlJTNW1PMXh1SUNCM2FHbHNaU0FvWVV4bGJpQStJR2x1WkdWNEtTQjdYRzRnSUNBZ2RtRnlJRk1nUFNCSlQySnFaV04wS0dGeVozVnRaVzUwYzF0cGJtUmxlQ3NyWFNrN1hHNGdJQ0FnZG1GeUlHdGxlWE1nUFNCblpYUlRlVzFpYjJ4eklEOGdaMlYwUzJWNWN5aFRLUzVqYjI1allYUW9aMlYwVTNsdFltOXNjeWhUS1NrZ09pQm5aWFJMWlhsektGTXBPMXh1SUNBZ0lIWmhjaUJzWlc1bmRHZ2dQU0JyWlhsekxteGxibWQwYUR0Y2JpQWdJQ0IyWVhJZ2FpQTlJREE3WEc0Z0lDQWdkbUZ5SUd0bGVUdGNiaUFnSUNCM2FHbHNaU0FvYkdWdVozUm9JRDRnYWlrZ2FXWWdLR2x6Ulc1MWJTNWpZV3hzS0ZNc0lHdGxlU0E5SUd0bGVYTmJhaXNyWFNrcElGUmJhMlY1WFNBOUlGTmJhMlY1WFR0Y2JpQWdmU0J5WlhSMWNtNGdWRHRjYm4wZ09pQWtZWE56YVdkdU8xeHVJaXdpTHk4Z01Ua3VNUzR5TGpJZ0x5QXhOUzR5TGpNdU5TQlBZbXBsWTNRdVkzSmxZWFJsS0U4Z1d5d2dVSEp2Y0dWeWRHbGxjMTBwWEc1MllYSWdZVzVQWW1wbFkzUWdQU0J5WlhGMWFYSmxLQ2N1TDE5aGJpMXZZbXBsWTNRbktUdGNiblpoY2lCa1VITWdQU0J5WlhGMWFYSmxLQ2N1TDE5dlltcGxZM1F0WkhCekp5azdYRzUyWVhJZ1pXNTFiVUoxWjB0bGVYTWdQU0J5WlhGMWFYSmxLQ2N1TDE5bGJuVnRMV0oxWnkxclpYbHpKeWs3WEc1MllYSWdTVVZmVUZKUFZFOGdQU0J5WlhGMWFYSmxLQ2N1TDE5emFHRnlaV1F0YTJWNUp5a29KMGxGWDFCU1QxUlBKeWs3WEc1MllYSWdSVzF3ZEhrZ1BTQm1kVzVqZEdsdmJpQW9LU0I3SUM4cUlHVnRjSFI1SUNvdklIMDdYRzUyWVhJZ1VGSlBWRTlVV1ZCRklEMGdKM0J5YjNSdmRIbHdaU2M3WEc1Y2JpOHZJRU55WldGMFpTQnZZbXBsWTNRZ2QybDBhQ0JtWVd0bElHQnVkV3hzWUNCd2NtOTBiM1I1Y0dVNklIVnpaU0JwWm5KaGJXVWdUMkpxWldOMElIZHBkR2dnWTJ4bFlYSmxaQ0J3Y205MGIzUjVjR1ZjYm5aaGNpQmpjbVZoZEdWRWFXTjBJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0F2THlCVWFISmhjMmdzSUhkaGMzUmxJR0Z1WkNCemIyUnZiWGs2SUVsRklFZERJR0oxWjF4dUlDQjJZWElnYVdaeVlXMWxJRDBnY21WeGRXbHlaU2duTGk5ZlpHOXRMV055WldGMFpTY3BLQ2RwWm5KaGJXVW5LVHRjYmlBZ2RtRnlJR2tnUFNCbGJuVnRRblZuUzJWNWN5NXNaVzVuZEdnN1hHNGdJSFpoY2lCc2RDQTlJQ2M4Snp0Y2JpQWdkbUZ5SUdkMElEMGdKejRuTzF4dUlDQjJZWElnYVdaeVlXMWxSRzlqZFcxbGJuUTdYRzRnSUdsbWNtRnRaUzV6ZEhsc1pTNWthWE53YkdGNUlEMGdKMjV2Ym1Vbk8xeHVJQ0J5WlhGMWFYSmxLQ2N1TDE5b2RHMXNKeWt1WVhCd1pXNWtRMmhwYkdRb2FXWnlZVzFsS1R0Y2JpQWdhV1p5WVcxbExuTnlZeUE5SUNkcVlYWmhjMk55YVhCME9pYzdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMV3hwYm1VZ2JtOHRjMk55YVhCMExYVnliRnh1SUNBdkx5QmpjbVZoZEdWRWFXTjBJRDBnYVdaeVlXMWxMbU52Ym5SbGJuUlhhVzVrYjNjdVQySnFaV04wTzF4dUlDQXZMeUJvZEcxc0xuSmxiVzkyWlVOb2FXeGtLR2xtY21GdFpTazdYRzRnSUdsbWNtRnRaVVJ2WTNWdFpXNTBJRDBnYVdaeVlXMWxMbU52Ym5SbGJuUlhhVzVrYjNjdVpHOWpkVzFsYm5RN1hHNGdJR2xtY21GdFpVUnZZM1Z0Wlc1MExtOXdaVzRvS1R0Y2JpQWdhV1p5WVcxbFJHOWpkVzFsYm5RdWQzSnBkR1VvYkhRZ0t5QW5jMk55YVhCMEp5QXJJR2QwSUNzZ0oyUnZZM1Z0Wlc1MExrWTlUMkpxWldOMEp5QXJJR3gwSUNzZ0p5OXpZM0pwY0hRbklDc2daM1FwTzF4dUlDQnBabkpoYldWRWIyTjFiV1Z1ZEM1amJHOXpaU2dwTzF4dUlDQmpjbVZoZEdWRWFXTjBJRDBnYVdaeVlXMWxSRzlqZFcxbGJuUXVSanRjYmlBZ2QyaHBiR1VnS0drdExTa2daR1ZzWlhSbElHTnlaV0YwWlVScFkzUmJVRkpQVkU5VVdWQkZYVnRsYm5WdFFuVm5TMlY1YzF0cFhWMDdYRzRnSUhKbGRIVnliaUJqY21WaGRHVkVhV04wS0NrN1hHNTlPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUU5aWFtVmpkQzVqY21WaGRHVWdmSHdnWm5WdVkzUnBiMjRnWTNKbFlYUmxLRThzSUZCeWIzQmxjblJwWlhNcElIdGNiaUFnZG1GeUlISmxjM1ZzZER0Y2JpQWdhV1lnS0U4Z0lUMDlJRzUxYkd3cElIdGNiaUFnSUNCRmJYQjBlVnRRVWs5VVQxUlpVRVZkSUQwZ1lXNVBZbXBsWTNRb1R5azdYRzRnSUNBZ2NtVnpkV3gwSUQwZ2JtVjNJRVZ0Y0hSNUtDazdYRzRnSUNBZ1JXMXdkSGxiVUZKUFZFOVVXVkJGWFNBOUlHNTFiR3c3WEc0Z0lDQWdMeThnWVdSa0lGd2lYMTl3Y205MGIxOWZYQ0lnWm05eUlFOWlhbVZqZEM1blpYUlFjbTkwYjNSNWNHVlBaaUJ3YjJ4NVptbHNiRnh1SUNBZ0lISmxjM1ZzZEZ0SlJWOVFVazlVVDEwZ1BTQlBPMXh1SUNCOUlHVnNjMlVnY21WemRXeDBJRDBnWTNKbFlYUmxSR2xqZENncE8xeHVJQ0J5WlhSMWNtNGdVSEp2Y0dWeWRHbGxjeUE5UFQwZ2RXNWtaV1pwYm1Wa0lEOGdjbVZ6ZFd4MElEb2daRkJ6S0hKbGMzVnNkQ3dnVUhKdmNHVnlkR2xsY3lrN1hHNTlPMXh1SWl3aWRtRnlJR0Z1VDJKcVpXTjBJRDBnY21WeGRXbHlaU2duTGk5ZllXNHRiMkpxWldOMEp5azdYRzUyWVhJZ1NVVTRYMFJQVFY5RVJVWkpUa1VnUFNCeVpYRjFhWEpsS0NjdUwxOXBaVGd0Wkc5dExXUmxabWx1WlNjcE8xeHVkbUZ5SUhSdlVISnBiV2wwYVhabElEMGdjbVZ4ZFdseVpTZ25MaTlmZEc4dGNISnBiV2wwYVhabEp5azdYRzUyWVhJZ1pGQWdQU0JQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrN1hHNWNibVY0Y0c5eWRITXVaaUE5SUhKbGNYVnBjbVVvSnk0dlgyUmxjMk55YVhCMGIzSnpKeWtnUHlCUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa2dPaUJtZFc1amRHbHZiaUJrWldacGJtVlFjbTl3WlhKMGVTaFBMQ0JRTENCQmRIUnlhV0oxZEdWektTQjdYRzRnSUdGdVQySnFaV04wS0U4cE8xeHVJQ0JRSUQwZ2RHOVFjbWx0YVhScGRtVW9VQ3dnZEhKMVpTazdYRzRnSUdGdVQySnFaV04wS0VGMGRISnBZblYwWlhNcE8xeHVJQ0JwWmlBb1NVVTRYMFJQVFY5RVJVWkpUa1VwSUhSeWVTQjdYRzRnSUNBZ2NtVjBkWEp1SUdSUUtFOHNJRkFzSUVGMGRISnBZblYwWlhNcE8xeHVJQ0I5SUdOaGRHTm9JQ2hsS1NCN0lDOHFJR1Z0Y0hSNUlDb3ZJSDFjYmlBZ2FXWWdLQ2RuWlhRbklHbHVJRUYwZEhKcFluVjBaWE1nZkh3Z0ozTmxkQ2NnYVc0Z1FYUjBjbWxpZFhSbGN5a2dkR2h5YjNjZ1ZIbHdaVVZ5Y205eUtDZEJZMk5sYzNOdmNuTWdibTkwSUhOMWNIQnZjblJsWkNFbktUdGNiaUFnYVdZZ0tDZDJZV3gxWlNjZ2FXNGdRWFIwY21saWRYUmxjeWtnVDF0UVhTQTlJRUYwZEhKcFluVjBaWE11ZG1Gc2RXVTdYRzRnSUhKbGRIVnliaUJQTzF4dWZUdGNiaUlzSW5aaGNpQmtVQ0E5SUhKbGNYVnBjbVVvSnk0dlgyOWlhbVZqZEMxa2NDY3BPMXh1ZG1GeUlHRnVUMkpxWldOMElEMGdjbVZ4ZFdseVpTZ25MaTlmWVc0dGIySnFaV04wSnlrN1hHNTJZWElnWjJWMFMyVjVjeUE5SUhKbGNYVnBjbVVvSnk0dlgyOWlhbVZqZEMxclpYbHpKeWs3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2NtVnhkV2x5WlNnbkxpOWZaR1Z6WTNKcGNIUnZjbk1uS1NBL0lFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBhV1Z6SURvZ1puVnVZM1JwYjI0Z1pHVm1hVzVsVUhKdmNHVnlkR2xsY3loUExDQlFjbTl3WlhKMGFXVnpLU0I3WEc0Z0lHRnVUMkpxWldOMEtFOHBPMXh1SUNCMllYSWdhMlY1Y3lBOUlHZGxkRXRsZVhNb1VISnZjR1Z5ZEdsbGN5azdYRzRnSUhaaGNpQnNaVzVuZEdnZ1BTQnJaWGx6TG14bGJtZDBhRHRjYmlBZ2RtRnlJR2tnUFNBd08xeHVJQ0IyWVhJZ1VEdGNiaUFnZDJocGJHVWdLR3hsYm1kMGFDQStJR2twSUdSUUxtWW9UeXdnVUNBOUlHdGxlWE5iYVNzclhTd2dVSEp2Y0dWeWRHbGxjMXRRWFNrN1hHNGdJSEpsZEhWeWJpQlBPMXh1ZlR0Y2JpSXNJbVY0Y0c5eWRITXVaaUE5SUU5aWFtVmpkQzVuWlhSUGQyNVFjbTl3WlhKMGVWTjViV0p2YkhNN1hHNGlMQ0l2THlBeE9TNHhMakl1T1NBdklERTFMakl1TXk0eUlFOWlhbVZqZEM1blpYUlFjbTkwYjNSNWNHVlBaaWhQS1Z4dWRtRnlJR2hoY3lBOUlISmxjWFZwY21Vb0p5NHZYMmhoY3ljcE8xeHVkbUZ5SUhSdlQySnFaV04wSUQwZ2NtVnhkV2x5WlNnbkxpOWZkRzh0YjJKcVpXTjBKeWs3WEc1MllYSWdTVVZmVUZKUFZFOGdQU0J5WlhGMWFYSmxLQ2N1TDE5emFHRnlaV1F0YTJWNUp5a29KMGxGWDFCU1QxUlBKeWs3WEc1MllYSWdUMkpxWldOMFVISnZkRzhnUFNCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlFOWlhbVZqZEM1blpYUlFjbTkwYjNSNWNHVlBaaUI4ZkNCbWRXNWpkR2x2YmlBb1R5a2dlMXh1SUNCUElEMGdkRzlQWW1wbFkzUW9UeWs3WEc0Z0lHbG1JQ2hvWVhNb1R5d2dTVVZmVUZKUFZFOHBLU0J5WlhSMWNtNGdUMXRKUlY5UVVrOVVUMTA3WEc0Z0lHbG1JQ2gwZVhCbGIyWWdUeTVqYjI1emRISjFZM1J2Y2lBOVBTQW5ablZ1WTNScGIyNG5JQ1ltSUU4Z2FXNXpkR0Z1WTJWdlppQlBMbU52Ym5OMGNuVmpkRzl5S1NCN1hHNGdJQ0FnY21WMGRYSnVJRTh1WTI5dWMzUnlkV04wYjNJdWNISnZkRzkwZVhCbE8xeHVJQ0I5SUhKbGRIVnliaUJQSUdsdWMzUmhibU5sYjJZZ1QySnFaV04wSUQ4Z1QySnFaV04wVUhKdmRHOGdPaUJ1ZFd4c08xeHVmVHRjYmlJc0luWmhjaUJvWVhNZ1BTQnlaWEYxYVhKbEtDY3VMMTlvWVhNbktUdGNiblpoY2lCMGIwbFBZbXBsWTNRZ1BTQnlaWEYxYVhKbEtDY3VMMTkwYnkxcGIySnFaV04wSnlrN1hHNTJZWElnWVhKeVlYbEpibVJsZUU5bUlEMGdjbVZ4ZFdseVpTZ25MaTlmWVhKeVlYa3RhVzVqYkhWa1pYTW5LU2htWVd4elpTazdYRzUyWVhJZ1NVVmZVRkpQVkU4Z1BTQnlaWEYxYVhKbEtDY3VMMTl6YUdGeVpXUXRhMlY1Snlrb0owbEZYMUJTVDFSUEp5azdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0c5aWFtVmpkQ3dnYm1GdFpYTXBJSHRjYmlBZ2RtRnlJRThnUFNCMGIwbFBZbXBsWTNRb2IySnFaV04wS1R0Y2JpQWdkbUZ5SUdrZ1BTQXdPMXh1SUNCMllYSWdjbVZ6ZFd4MElEMGdXMTA3WEc0Z0lIWmhjaUJyWlhrN1hHNGdJR1p2Y2lBb2EyVjVJR2x1SUU4cElHbG1JQ2hyWlhrZ0lUMGdTVVZmVUZKUFZFOHBJR2hoY3loUExDQnJaWGtwSUNZbUlISmxjM1ZzZEM1d2RYTm9LR3RsZVNrN1hHNGdJQzh2SUVSdmJpZDBJR1Z1ZFcwZ1luVm5JQ1lnYUdsa1pHVnVJR3RsZVhOY2JpQWdkMmhwYkdVZ0tHNWhiV1Z6TG14bGJtZDBhQ0ErSUdrcElHbG1JQ2hvWVhNb1R5d2dhMlY1SUQwZ2JtRnRaWE5iYVNzclhTa3BJSHRjYmlBZ0lDQitZWEp5WVhsSmJtUmxlRTltS0hKbGMzVnNkQ3dnYTJWNUtTQjhmQ0J5WlhOMWJIUXVjSFZ6YUNoclpYa3BPMXh1SUNCOVhHNGdJSEpsZEhWeWJpQnlaWE4xYkhRN1hHNTlPMXh1SWl3aUx5OGdNVGt1TVM0eUxqRTBJQzhnTVRVdU1pNHpMakUwSUU5aWFtVmpkQzVyWlhsektFOHBYRzUyWVhJZ0pHdGxlWE1nUFNCeVpYRjFhWEpsS0NjdUwxOXZZbXBsWTNRdGEyVjVjeTFwYm5SbGNtNWhiQ2NwTzF4dWRtRnlJR1Z1ZFcxQ2RXZExaWGx6SUQwZ2NtVnhkV2x5WlNnbkxpOWZaVzUxYlMxaWRXY3RhMlY1Y3ljcE8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJRTlpYW1WamRDNXJaWGx6SUh4OElHWjFibU4wYVc5dUlHdGxlWE1vVHlrZ2UxeHVJQ0J5WlhSMWNtNGdKR3RsZVhNb1R5d2daVzUxYlVKMVowdGxlWE1wTzF4dWZUdGNiaUlzSW1WNGNHOXlkSE11WmlBOUlIdDlMbkJ5YjNCbGNuUjVTWE5GYm5WdFpYSmhZbXhsTzF4dUlpd2lMeThnYlc5emRDQlBZbXBsWTNRZ2JXVjBhRzlrY3lCaWVTQkZVellnYzJodmRXeGtJR0ZqWTJWd2RDQndjbWx0YVhScGRtVnpYRzUyWVhJZ0pHVjRjRzl5ZENBOUlISmxjWFZwY21Vb0p5NHZYMlY0Y0c5eWRDY3BPMXh1ZG1GeUlHTnZjbVVnUFNCeVpYRjFhWEpsS0NjdUwxOWpiM0psSnlrN1hHNTJZWElnWm1GcGJITWdQU0J5WlhGMWFYSmxLQ2N1TDE5bVlXbHNjeWNwTzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb1MwVlpMQ0JsZUdWaktTQjdYRzRnSUhaaGNpQm1iaUE5SUNoamIzSmxMazlpYW1WamRDQjhmQ0I3ZlNsYlMwVlpYU0I4ZkNCUFltcGxZM1JiUzBWWlhUdGNiaUFnZG1GeUlHVjRjQ0E5SUh0OU8xeHVJQ0JsZUhCYlMwVlpYU0E5SUdWNFpXTW9abTRwTzF4dUlDQWtaWGh3YjNKMEtDUmxlSEJ2Y25RdVV5QXJJQ1JsZUhCdmNuUXVSaUFxSUdaaGFXeHpLR1oxYm1OMGFXOXVJQ2dwSUhzZ1ptNG9NU2s3SUgwcExDQW5UMkpxWldOMEp5d2daWGh3S1R0Y2JuMDdYRzRpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNoaWFYUnRZWEFzSUhaaGJIVmxLU0I3WEc0Z0lISmxkSFZ5YmlCN1hHNGdJQ0FnWlc1MWJXVnlZV0pzWlRvZ0lTaGlhWFJ0WVhBZ0ppQXhLU3hjYmlBZ0lDQmpiMjVtYVdkMWNtRmliR1U2SUNFb1ltbDBiV0Z3SUNZZ01pa3NYRzRnSUNBZ2QzSnBkR0ZpYkdVNklDRW9ZbWwwYldGd0lDWWdOQ2tzWEc0Z0lDQWdkbUZzZFdVNklIWmhiSFZsWEc0Z0lIMDdYRzU5TzF4dUlpd2liVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQnlaWEYxYVhKbEtDY3VMMTlvYVdSbEp5azdYRzRpTENKMllYSWdaR1ZtSUQwZ2NtVnhkV2x5WlNnbkxpOWZiMkpxWldOMExXUndKeWt1Wmp0Y2JuWmhjaUJvWVhNZ1BTQnlaWEYxYVhKbEtDY3VMMTlvWVhNbktUdGNiblpoY2lCVVFVY2dQU0J5WlhGMWFYSmxLQ2N1TDE5M2EzTW5LU2duZEc5VGRISnBibWRVWVdjbktUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvYVhRc0lIUmhaeXdnYzNSaGRDa2dlMXh1SUNCcFppQW9hWFFnSmlZZ0lXaGhjeWhwZENBOUlITjBZWFFnUHlCcGRDQTZJR2wwTG5CeWIzUnZkSGx3WlN3Z1ZFRkhLU2tnWkdWbUtHbDBMQ0JVUVVjc0lIc2dZMjl1Wm1sbmRYSmhZbXhsT2lCMGNuVmxMQ0IyWVd4MVpUb2dkR0ZuSUgwcE8xeHVmVHRjYmlJc0luWmhjaUJ6YUdGeVpXUWdQU0J5WlhGMWFYSmxLQ2N1TDE5emFHRnlaV1FuS1NnbmEyVjVjeWNwTzF4dWRtRnlJSFZwWkNBOUlISmxjWFZwY21Vb0p5NHZYM1ZwWkNjcE8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9hMlY1S1NCN1hHNGdJSEpsZEhWeWJpQnphR0Z5WldSYmEyVjVYU0I4ZkNBb2MyaGhjbVZrVzJ0bGVWMGdQU0IxYVdRb2EyVjVLU2s3WEc1OU8xeHVJaXdpZG1GeUlHZHNiMkpoYkNBOUlISmxjWFZwY21Vb0p5NHZYMmRzYjJKaGJDY3BPMXh1ZG1GeUlGTklRVkpGUkNBOUlDZGZYMk52Y21VdGFuTmZjMmhoY21Wa1gxOG5PMXh1ZG1GeUlITjBiM0psSUQwZ1oyeHZZbUZzVzFOSVFWSkZSRjBnZkh3Z0tHZHNiMkpoYkZ0VFNFRlNSVVJkSUQwZ2UzMHBPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvYTJWNUtTQjdYRzRnSUhKbGRIVnliaUJ6ZEc5eVpWdHJaWGxkSUh4OElDaHpkRzl5WlZ0clpYbGRJRDBnZTMwcE8xeHVmVHRjYmlJc0luWmhjaUIwYjBsdWRHVm5aWElnUFNCeVpYRjFhWEpsS0NjdUwxOTBieTFwYm5SbFoyVnlKeWs3WEc1MllYSWdaR1ZtYVc1bFpDQTlJSEpsY1hWcGNtVW9KeTR2WDJSbFptbHVaV1FuS1R0Y2JpOHZJSFJ5ZFdVZ0lDMCtJRk4wY21sdVp5TmhkRnh1THk4Z1ptRnNjMlVnTFQ0Z1UzUnlhVzVuSTJOdlpHVlFiMmx1ZEVGMFhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaFVUMTlUVkZKSlRrY3BJSHRjYmlBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUNoMGFHRjBMQ0J3YjNNcElIdGNiaUFnSUNCMllYSWdjeUE5SUZOMGNtbHVaeWhrWldacGJtVmtLSFJvWVhRcEtUdGNiaUFnSUNCMllYSWdhU0E5SUhSdlNXNTBaV2RsY2lod2IzTXBPMXh1SUNBZ0lIWmhjaUJzSUQwZ2N5NXNaVzVuZEdnN1hHNGdJQ0FnZG1GeUlHRXNJR0k3WEc0Z0lDQWdhV1lnS0drZ1BDQXdJSHg4SUdrZ1BqMGdiQ2tnY21WMGRYSnVJRlJQWDFOVVVrbE9SeUEvSUNjbklEb2dkVzVrWldacGJtVmtPMXh1SUNBZ0lHRWdQU0J6TG1Ob1lYSkRiMlJsUVhRb2FTazdYRzRnSUNBZ2NtVjBkWEp1SUdFZ1BDQXdlR1E0TURBZ2ZId2dZU0ErSURCNFpHSm1aaUI4ZkNCcElDc2dNU0E5UFQwZ2JDQjhmQ0FvWWlBOUlITXVZMmhoY2tOdlpHVkJkQ2hwSUNzZ01Ta3BJRHdnTUhoa1l6QXdJSHg4SUdJZ1BpQXdlR1JtWm1aY2JpQWdJQ0FnSUQ4Z1ZFOWZVMVJTU1U1SElEOGdjeTVqYUdGeVFYUW9hU2tnT2lCaFhHNGdJQ0FnSUNBNklGUlBYMU5VVWtsT1J5QS9JSE11YzJ4cFkyVW9hU3dnYVNBcklESXBJRG9nS0dFZ0xTQXdlR1E0TURBZ1BEd2dNVEFwSUNzZ0tHSWdMU0F3ZUdSak1EQXBJQ3NnTUhneE1EQXdNRHRjYmlBZ2ZUdGNibjA3WEc0aUxDSjJZWElnZEc5SmJuUmxaMlZ5SUQwZ2NtVnhkV2x5WlNnbkxpOWZkRzh0YVc1MFpXZGxjaWNwTzF4dWRtRnlJRzFoZUNBOUlFMWhkR2d1YldGNE8xeHVkbUZ5SUcxcGJpQTlJRTFoZEdndWJXbHVPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvYVc1a1pYZ3NJR3hsYm1kMGFDa2dlMXh1SUNCcGJtUmxlQ0E5SUhSdlNXNTBaV2RsY2locGJtUmxlQ2s3WEc0Z0lISmxkSFZ5YmlCcGJtUmxlQ0E4SURBZ1B5QnRZWGdvYVc1a1pYZ2dLeUJzWlc1bmRHZ3NJREFwSURvZ2JXbHVLR2x1WkdWNExDQnNaVzVuZEdncE8xeHVmVHRjYmlJc0lpOHZJRGN1TVM0MElGUnZTVzUwWldkbGNseHVkbUZ5SUdObGFXd2dQU0JOWVhSb0xtTmxhV3c3WEc1MllYSWdabXh2YjNJZ1BTQk5ZWFJvTG1ac2IyOXlPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvYVhRcElIdGNiaUFnY21WMGRYSnVJR2x6VG1GT0tHbDBJRDBnSzJsMEtTQS9JREFnT2lBb2FYUWdQaUF3SUQ4Z1pteHZiM0lnT2lCalpXbHNLU2hwZENrN1hHNTlPMXh1SWl3aUx5OGdkRzhnYVc1a1pYaGxaQ0J2WW1wbFkzUXNJSFJ2VDJKcVpXTjBJSGRwZEdnZ1ptRnNiR0poWTJzZ1ptOXlJRzV2YmkxaGNuSmhlUzFzYVd0bElFVlRNeUJ6ZEhKcGJtZHpYRzUyWVhJZ1NVOWlhbVZqZENBOUlISmxjWFZwY21Vb0p5NHZYMmx2WW1wbFkzUW5LVHRjYm5aaGNpQmtaV1pwYm1Wa0lEMGdjbVZ4ZFdseVpTZ25MaTlmWkdWbWFXNWxaQ2NwTzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUXBJSHRjYmlBZ2NtVjBkWEp1SUVsUFltcGxZM1FvWkdWbWFXNWxaQ2hwZENrcE8xeHVmVHRjYmlJc0lpOHZJRGN1TVM0eE5TQlViMHhsYm1kMGFGeHVkbUZ5SUhSdlNXNTBaV2RsY2lBOUlISmxjWFZwY21Vb0p5NHZYM1J2TFdsdWRHVm5aWEluS1R0Y2JuWmhjaUJ0YVc0Z1BTQk5ZWFJvTG0xcGJqdGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLR2wwS1NCN1hHNGdJSEpsZEhWeWJpQnBkQ0ErSURBZ1B5QnRhVzRvZEc5SmJuUmxaMlZ5S0dsMEtTd2dNSGd4Wm1abVptWm1abVptWm1abVppa2dPaUF3T3lBdkx5QndiM2NvTWl3Z05UTXBJQzBnTVNBOVBTQTVNREEzTVRrNU1qVTBOelF3T1RreFhHNTlPMXh1SWl3aUx5OGdOeTR4TGpFeklGUnZUMkpxWldOMEtHRnlaM1Z0Wlc1MEtWeHVkbUZ5SUdSbFptbHVaV1FnUFNCeVpYRjFhWEpsS0NjdUwxOWtaV1pwYm1Wa0p5azdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hwZENrZ2UxeHVJQ0J5WlhSMWNtNGdUMkpxWldOMEtHUmxabWx1WldRb2FYUXBLVHRjYm4wN1hHNGlMQ0l2THlBM0xqRXVNU0JVYjFCeWFXMXBkR2wyWlNocGJuQjFkQ0JiTENCUWNtVm1aWEp5WldSVWVYQmxYU2xjYm5aaGNpQnBjMDlpYW1WamRDQTlJSEpsY1hWcGNtVW9KeTR2WDJsekxXOWlhbVZqZENjcE8xeHVMeThnYVc1emRHVmhaQ0J2WmlCMGFHVWdSVk0ySUhOd1pXTWdkbVZ5YzJsdmJpd2dkMlVnWkdsa2JpZDBJR2x0Y0d4bGJXVnVkQ0JBUUhSdlVISnBiV2wwYVhabElHTmhjMlZjYmk4dklHRnVaQ0IwYUdVZ2MyVmpiMjVrSUdGeVozVnRaVzUwSUMwZ1pteGhaeUF0SUhCeVpXWmxjbkpsWkNCMGVYQmxJR2x6SUdFZ2MzUnlhVzVuWEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNocGRDd2dVeWtnZTF4dUlDQnBaaUFvSVdselQySnFaV04wS0dsMEtTa2djbVYwZFhKdUlHbDBPMXh1SUNCMllYSWdabTRzSUhaaGJEdGNiaUFnYVdZZ0tGTWdKaVlnZEhsd1pXOW1JQ2htYmlBOUlHbDBMblJ2VTNSeWFXNW5LU0E5UFNBblpuVnVZM1JwYjI0bklDWW1JQ0ZwYzA5aWFtVmpkQ2gyWVd3Z1BTQm1iaTVqWVd4c0tHbDBLU2twSUhKbGRIVnliaUIyWVd3N1hHNGdJR2xtSUNoMGVYQmxiMllnS0dadUlEMGdhWFF1ZG1Gc2RXVlBaaWtnUFQwZ0oyWjFibU4wYVc5dUp5QW1KaUFoYVhOUFltcGxZM1FvZG1Gc0lEMGdabTR1WTJGc2JDaHBkQ2twS1NCeVpYUjFjbTRnZG1Gc08xeHVJQ0JwWmlBb0lWTWdKaVlnZEhsd1pXOW1JQ2htYmlBOUlHbDBMblJ2VTNSeWFXNW5LU0E5UFNBblpuVnVZM1JwYjI0bklDWW1JQ0ZwYzA5aWFtVmpkQ2gyWVd3Z1BTQm1iaTVqWVd4c0tHbDBLU2twSUhKbGRIVnliaUIyWVd3N1hHNGdJSFJvY205M0lGUjVjR1ZGY25KdmNpaGNJa05oYmlkMElHTnZiblpsY25RZ2IySnFaV04wSUhSdklIQnlhVzFwZEdsMlpTQjJZV3gxWlZ3aUtUdGNibjA3WEc0aUxDSjJZWElnYVdRZ1BTQXdPMXh1ZG1GeUlIQjRJRDBnVFdGMGFDNXlZVzVrYjIwb0tUdGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLR3RsZVNrZ2UxeHVJQ0J5WlhSMWNtNGdKMU41YldKdmJDZ25MbU52Ym1OaGRDaHJaWGtnUFQwOUlIVnVaR1ZtYVc1bFpDQS9JQ2NuSURvZ2EyVjVMQ0FuS1Y4bkxDQW9LeXRwWkNBcklIQjRLUzUwYjFOMGNtbHVaeWd6TmlrcE8xeHVmVHRjYmlJc0luWmhjaUJ6ZEc5eVpTQTlJSEpsY1hWcGNtVW9KeTR2WDNOb1lYSmxaQ2NwS0NkM2EzTW5LVHRjYm5aaGNpQjFhV1FnUFNCeVpYRjFhWEpsS0NjdUwxOTFhV1FuS1R0Y2JuWmhjaUJUZVcxaWIyd2dQU0J5WlhGMWFYSmxLQ2N1TDE5bmJHOWlZV3duS1M1VGVXMWliMnc3WEc1MllYSWdWVk5GWDFOWlRVSlBUQ0E5SUhSNWNHVnZaaUJUZVcxaWIyd2dQVDBnSjJaMWJtTjBhVzl1Snp0Y2JseHVkbUZ5SUNSbGVIQnZjblJ6SUQwZ2JXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2JtRnRaU2tnZTF4dUlDQnlaWFIxY200Z2MzUnZjbVZiYm1GdFpWMGdmSHdnS0hOMGIzSmxXMjVoYldWZElEMWNiaUFnSUNCVlUwVmZVMWxOUWs5TUlDWW1JRk41YldKdmJGdHVZVzFsWFNCOGZDQW9WVk5GWDFOWlRVSlBUQ0EvSUZONWJXSnZiQ0E2SUhWcFpDa29KMU41YldKdmJDNG5JQ3NnYm1GdFpTa3BPMXh1ZlR0Y2JseHVKR1Y0Y0c5eWRITXVjM1J2Y21VZ1BTQnpkRzl5WlR0Y2JpSXNJblpoY2lCamJHRnpjMjltSUQwZ2NtVnhkV2x5WlNnbkxpOWZZMnhoYzNOdlppY3BPMXh1ZG1GeUlFbFVSVkpCVkU5U0lEMGdjbVZ4ZFdseVpTZ25MaTlmZDJ0ekp5a29KMmwwWlhKaGRHOXlKeWs3WEc1MllYSWdTWFJsY21GMGIzSnpJRDBnY21WeGRXbHlaU2duTGk5ZmFYUmxjbUYwYjNKekp5azdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSEpsY1hWcGNtVW9KeTR2WDJOdmNtVW5LUzVuWlhSSmRHVnlZWFJ2Y2sxbGRHaHZaQ0E5SUdaMWJtTjBhVzl1SUNocGRDa2dlMXh1SUNCcFppQW9hWFFnSVQwZ2RXNWtaV1pwYm1Wa0tTQnlaWFIxY200Z2FYUmJTVlJGVWtGVVQxSmRYRzRnSUNBZ2ZId2dhWFJiSjBCQWFYUmxjbUYwYjNJblhWeHVJQ0FnSUh4OElFbDBaWEpoZEc5eWMxdGpiR0Z6YzI5bUtHbDBLVjA3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVkbUZ5SUdOMGVDQTlJSEpsY1hWcGNtVW9KeTR2WDJOMGVDY3BPMXh1ZG1GeUlDUmxlSEJ2Y25RZ1BTQnlaWEYxYVhKbEtDY3VMMTlsZUhCdmNuUW5LVHRjYm5aaGNpQjBiMDlpYW1WamRDQTlJSEpsY1hWcGNtVW9KeTR2WDNSdkxXOWlhbVZqZENjcE8xeHVkbUZ5SUdOaGJHd2dQU0J5WlhGMWFYSmxLQ2N1TDE5cGRHVnlMV05oYkd3bktUdGNiblpoY2lCcGMwRnljbUY1U1hSbGNpQTlJSEpsY1hWcGNtVW9KeTR2WDJsekxXRnljbUY1TFdsMFpYSW5LVHRjYm5aaGNpQjBiMHhsYm1kMGFDQTlJSEpsY1hWcGNtVW9KeTR2WDNSdkxXeGxibWQwYUNjcE8xeHVkbUZ5SUdOeVpXRjBaVkJ5YjNCbGNuUjVJRDBnY21WeGRXbHlaU2duTGk5ZlkzSmxZWFJsTFhCeWIzQmxjblI1SnlrN1hHNTJZWElnWjJWMFNYUmxja1p1SUQwZ2NtVnhkV2x5WlNnbkxpOWpiM0psTG1kbGRDMXBkR1Z5WVhSdmNpMXRaWFJvYjJRbktUdGNibHh1SkdWNGNHOXlkQ2drWlhod2IzSjBMbE1nS3lBa1pYaHdiM0owTGtZZ0tpQWhjbVZ4ZFdseVpTZ25MaTlmYVhSbGNpMWtaWFJsWTNRbktTaG1kVzVqZEdsdmJpQW9hWFJsY2lrZ2V5QkJjbkpoZVM1bWNtOXRLR2wwWlhJcE95QjlLU3dnSjBGeWNtRjVKeXdnZTF4dUlDQXZMeUF5TWk0eExqSXVNU0JCY25KaGVTNW1jbTl0S0dGeWNtRjVUR2xyWlN3Z2JXRndabTRnUFNCMWJtUmxabWx1WldRc0lIUm9hWE5CY21jZ1BTQjFibVJsWm1sdVpXUXBYRzRnSUdaeWIyMDZJR1oxYm1OMGFXOXVJR1p5YjIwb1lYSnlZWGxNYVd0bElDOHFJQ3dnYldGd1ptNGdQU0IxYm1SbFptbHVaV1FzSUhSb2FYTkJjbWNnUFNCMWJtUmxabWx1WldRZ0tpOHBJSHRjYmlBZ0lDQjJZWElnVHlBOUlIUnZUMkpxWldOMEtHRnljbUY1VEdsclpTazdYRzRnSUNBZ2RtRnlJRU1nUFNCMGVYQmxiMllnZEdocGN5QTlQU0FuWm5WdVkzUnBiMjRuSUQ4Z2RHaHBjeUE2SUVGeWNtRjVPMXh1SUNBZ0lIWmhjaUJoVEdWdUlEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFEdGNiaUFnSUNCMllYSWdiV0Z3Wm00Z1BTQmhUR1Z1SUQ0Z01TQS9JR0Z5WjNWdFpXNTBjMXN4WFNBNklIVnVaR1ZtYVc1bFpEdGNiaUFnSUNCMllYSWdiV0Z3Y0dsdVp5QTlJRzFoY0dadUlDRTlQU0IxYm1SbFptbHVaV1E3WEc0Z0lDQWdkbUZ5SUdsdVpHVjRJRDBnTUR0Y2JpQWdJQ0IyWVhJZ2FYUmxja1p1SUQwZ1oyVjBTWFJsY2tadUtFOHBPMXh1SUNBZ0lIWmhjaUJzWlc1bmRHZ3NJSEpsYzNWc2RDd2djM1JsY0N3Z2FYUmxjbUYwYjNJN1hHNGdJQ0FnYVdZZ0tHMWhjSEJwYm1jcElHMWhjR1p1SUQwZ1kzUjRLRzFoY0dadUxDQmhUR1Z1SUQ0Z01pQS9JR0Z5WjNWdFpXNTBjMXN5WFNBNklIVnVaR1ZtYVc1bFpDd2dNaWs3WEc0Z0lDQWdMeThnYVdZZ2IySnFaV04wSUdsemJpZDBJR2wwWlhKaFlteGxJRzl5SUdsMEozTWdZWEp5WVhrZ2QybDBhQ0JrWldaaGRXeDBJR2wwWlhKaGRHOXlJQzBnZFhObElITnBiWEJzWlNCallYTmxYRzRnSUNBZ2FXWWdLR2wwWlhKR2JpQWhQU0IxYm1SbFptbHVaV1FnSmlZZ0lTaERJRDA5SUVGeWNtRjVJQ1ltSUdselFYSnlZWGxKZEdWeUtHbDBaWEpHYmlrcEtTQjdYRzRnSUNBZ0lDQm1iM0lnS0dsMFpYSmhkRzl5SUQwZ2FYUmxja1p1TG1OaGJHd29UeWtzSUhKbGMzVnNkQ0E5SUc1bGR5QkRLQ2s3SUNFb2MzUmxjQ0E5SUdsMFpYSmhkRzl5TG01bGVIUW9LU2t1Wkc5dVpUc2dhVzVrWlhnckt5a2dlMXh1SUNBZ0lDQWdJQ0JqY21WaGRHVlFjbTl3WlhKMGVTaHlaWE4xYkhRc0lHbHVaR1Y0TENCdFlYQndhVzVuSUQ4Z1kyRnNiQ2hwZEdWeVlYUnZjaXdnYldGd1ptNHNJRnR6ZEdWd0xuWmhiSFZsTENCcGJtUmxlRjBzSUhSeWRXVXBJRG9nYzNSbGNDNTJZV3gxWlNrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJR3hsYm1kMGFDQTlJSFJ2VEdWdVozUm9LRTh1YkdWdVozUm9LVHRjYmlBZ0lDQWdJR1p2Y2lBb2NtVnpkV3gwSUQwZ2JtVjNJRU1vYkdWdVozUm9LVHNnYkdWdVozUm9JRDRnYVc1a1pYZzdJR2x1WkdWNEt5c3BJSHRjYmlBZ0lDQWdJQ0FnWTNKbFlYUmxVSEp2Y0dWeWRIa29jbVZ6ZFd4MExDQnBibVJsZUN3Z2JXRndjR2x1WnlBL0lHMWhjR1p1S0U5YmFXNWtaWGhkTENCcGJtUmxlQ2tnT2lCUFcybHVaR1Y0WFNrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQWdJSEpsYzNWc2RDNXNaVzVuZEdnZ1BTQnBibVJsZUR0Y2JpQWdJQ0J5WlhSMWNtNGdjbVZ6ZFd4ME8xeHVJQ0I5WEc1OUtUdGNiaUlzSWk4dklERTVMakV1TXk0eElFOWlhbVZqZEM1aGMzTnBaMjRvZEdGeVoyVjBMQ0J6YjNWeVkyVXBYRzUyWVhJZ0pHVjRjRzl5ZENBOUlISmxjWFZwY21Vb0p5NHZYMlY0Y0c5eWRDY3BPMXh1WEc0a1pYaHdiM0owS0NSbGVIQnZjblF1VXlBcklDUmxlSEJ2Y25RdVJpd2dKMDlpYW1WamRDY3NJSHNnWVhOemFXZHVPaUJ5WlhGMWFYSmxLQ2N1TDE5dlltcGxZM1F0WVhOemFXZHVKeWtnZlNrN1hHNGlMQ0l2THlBeE9TNHhMakl1TVRRZ1QySnFaV04wTG10bGVYTW9UeWxjYm5aaGNpQjBiMDlpYW1WamRDQTlJSEpsY1hWcGNtVW9KeTR2WDNSdkxXOWlhbVZqZENjcE8xeHVkbUZ5SUNSclpYbHpJRDBnY21WeGRXbHlaU2duTGk5ZmIySnFaV04wTFd0bGVYTW5LVHRjYmx4dWNtVnhkV2x5WlNnbkxpOWZiMkpxWldOMExYTmhjQ2NwS0NkclpYbHpKeXdnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdhMlY1Y3locGRDa2dlMXh1SUNBZ0lISmxkSFZ5YmlBa2EyVjVjeWgwYjA5aWFtVmpkQ2hwZENrcE8xeHVJQ0I5TzF4dWZTazdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzUyWVhJZ0pHRjBJRDBnY21WeGRXbHlaU2duTGk5ZmMzUnlhVzVuTFdGMEp5a29kSEoxWlNrN1hHNWNiaTh2SURJeExqRXVNeTR5TnlCVGRISnBibWN1Y0hKdmRHOTBlWEJsVzBCQWFYUmxjbUYwYjNKZEtDbGNibkpsY1hWcGNtVW9KeTR2WDJsMFpYSXRaR1ZtYVc1bEp5a29VM1J5YVc1bkxDQW5VM1J5YVc1bkp5d2dablZ1WTNScGIyNGdLR2wwWlhKaGRHVmtLU0I3WEc0Z0lIUm9hWE11WDNRZ1BTQlRkSEpwYm1jb2FYUmxjbUYwWldRcE95QXZMeUIwWVhKblpYUmNiaUFnZEdocGN5NWZhU0E5SURBN0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dklHNWxlSFFnYVc1a1pYaGNiaTh2SURJeExqRXVOUzR5TGpFZ0pWTjBjbWx1WjBsMFpYSmhkRzl5VUhKdmRHOTBlWEJsSlM1dVpYaDBLQ2xjYm4wc0lHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ2RtRnlJRThnUFNCMGFHbHpMbDkwTzF4dUlDQjJZWElnYVc1a1pYZ2dQU0IwYUdsekxsOXBPMXh1SUNCMllYSWdjRzlwYm5RN1hHNGdJR2xtSUNocGJtUmxlQ0ErUFNCUExteGxibWQwYUNrZ2NtVjBkWEp1SUhzZ2RtRnNkV1U2SUhWdVpHVm1hVzVsWkN3Z1pHOXVaVG9nZEhKMVpTQjlPMXh1SUNCd2IybHVkQ0E5SUNSaGRDaFBMQ0JwYm1SbGVDazdYRzRnSUhSb2FYTXVYMmtnS3owZ2NHOXBiblF1YkdWdVozUm9PMXh1SUNCeVpYUjFjbTRnZXlCMllXeDFaVG9nY0c5cGJuUXNJR1J2Ym1VNklHWmhiSE5sSUgwN1hHNTlLVHRjYmlKZGZRPT0ifQ==
