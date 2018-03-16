(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({"/var/www/loopring/assets/js/global.js":[function(require,module,exports){
"use strict";

var _binder = require("./libs/binder");

var _binder2 = _interopRequireDefault(_binder);

var _global = require("./modules/global");

var _introWrapper = require("./modules/introWrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = [{
    "html": [_global.constants, _global.afteLoads],
    ".btn": [_global.btnDecorate],
    ".intro-wrapper": [_introWrapper.introWrapper],
    ".header": [_global.headerActivities]
}];

_binder2.default.apply(undefined, args);

},{"./libs/binder":"/var/www/loopring/assets/js/libs/binder.js","./modules/global":"/var/www/loopring/assets/js/modules/global.js","./modules/introWrapper":"/var/www/loopring/assets/js/modules/introWrapper.js"}],"/var/www/loopring/assets/js/libs/binder.js":[function(require,module,exports){
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

},{"babel-runtime/core-js/object/assign":"/var/www/loopring/node_modules/babel-runtime/core-js/object/assign.js","babel-runtime/core-js/object/keys":"/var/www/loopring/node_modules/babel-runtime/core-js/object/keys.js","babel-runtime/helpers/toConsumableArray":"/var/www/loopring/node_modules/babel-runtime/helpers/toConsumableArray.js"}],"/var/www/loopring/assets/js/modules/global.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.afteLoads = afteLoads;
exports.btnDecorate = btnDecorate;
exports.headerActivities = headerActivities;
var constants = exports.constants = {
    isTouch: "ontouchstart" in window ? function () {
        document.body.classList.add("touch");return true;
    }() : false,
    body: $("body")
};
function afteLoads() {
    var _this = this;

    window.addEventListener("load", function () {
        _this.body.addClass('load');
    });
}
function btnDecorate() {
    $('.btn, input[type="submit"], button').append('<span class="decor-top"></span><span class="decor-bot"></span>');
}
function headerActivities() {
    $('.btn-menu').on('click', function () {
        $(this).closest('.header').toggleClass('opened');
    });
}

},{}],"/var/www/loopring/assets/js/modules/introWrapper.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.introWrapper = introWrapper;
function introWrapper() {
    $(document).on("mousemove", function (e) {
        var cx1 = (e.pageX - $(window).innerWidth() / 2) / 80;
        var cy1 = (e.pageY - $(window).scrollTop() - $(window).innerHeight() / 2) / 80;
        var cx2 = (e.pageX - $(window).innerWidth() / 2) / 40;
        var cy2 = (e.pageY - $(window).scrollTop() - $(window).innerHeight() / 2) / 40;
        var cx3 = (e.pageX - $(window).innerWidth() / 2) / 20;
        var cy3 = (e.pageY - $(window).scrollTop() - $(window).innerHeight() / 2) / 20;
        if ($(window).width() >= 1024) {
            $('.parall.one').css({
                'margin-top': cy1 + 'px',
                'margin-left': cx1 + 'px'
            });
            $('.parall.two').css({
                'margin-top': cy2 + 'px',
                'margin-left': cx2 + 'px'
            });
            $('.parall.three').css({
                'margin-top': cy3 + 'px',
                'margin-left': cx3 + 'px'
            });
        }
    });
}
// todo

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvZ2xvYmFsLmpzIiwiYXNzZXRzL2pzL2xpYnMvYmluZGVyLmpzIiwiYXNzZXRzL2pzL21vZHVsZXMvZ2xvYmFsLmpzIiwiYXNzZXRzL2pzL21vZHVsZXMvaW50cm9XcmFwcGVyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJLE9BQU8sQ0FDUDtBQUNJLFlBQVEsc0NBRFo7QUFFSSxZQUFRLHFCQUZaO0FBR0ksc0JBQWtCLDRCQUh0QjtBQUlJLGVBQVc7QUFKZixDQURPLENBQVg7O0FBU0Esa0NBQVUsSUFBVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ1p3QixNOzs7O0FBRnhCOztBQUVlLFNBQVMsTUFBVCxDQUFnQiwyQkFBaEIsRUFBK0Q7QUFBQSxRQUFsQixRQUFrQix1RUFBUCxLQUFPOztBQUMxRSxRQUFJLFdBQUo7QUFBQSxRQUFRLFdBQVI7QUFDQSxRQUFJLFFBQUosRUFBYyxLQUFLLFlBQVksR0FBWixFQUFMO0FBQ2Q7QUFDQSxRQUFJLENBQUMsUUFBUSxTQUFSLENBQWtCLE9BQXZCLEVBQWdDO0FBQzVCLGdCQUFRLFNBQVIsQ0FBa0IsT0FBbEIsR0FBNEIsUUFBUSxTQUFSLENBQWtCLGlCQUE5QztBQUNIO0FBQ0Q7QUFDQSxRQUFNLGtCQUFrQixvQkFBWSwyQkFBWixDQUF4QjtBQUNBO0FBQ0EsUUFBTSwyREFBb0IsU0FBUyxnQkFBVCxDQUEwQixnQkFBZ0IsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBMUIsQ0FBcEIsRUFBTjtBQUNBO0FBQ0EsUUFBSSxpQkFBaUIsRUFBckI7O0FBWjBFLCtCQWFqRSxHQWJpRTtBQWN0RSxZQUFJLGNBQWMsSUFBZCxDQUFtQjtBQUFBLG1CQUFXLFFBQVEsT0FBUixDQUFnQixHQUFoQixDQUFYO0FBQUEsU0FBbkIsQ0FBSixFQUF5RDtBQUNyRCwyQkFBZSxHQUFmLElBQXNCLDRCQUE0QixHQUE1QixDQUF0QjtBQUNILFNBRkQsTUFFTztBQUNILGdCQUFJLFFBQUosRUFBYyxRQUFRLEdBQVIsUUFBaUIsR0FBakI7QUFDakI7QUFsQnFFOztBQWExRSxTQUFLLElBQUksR0FBVCxJQUFnQiwyQkFBaEIsRUFBNkM7QUFBQSxjQUFwQyxHQUFvQztBQU01QztBQUNEO0FBQ0EsUUFBSSxnQkFBZ0IsRUFBcEI7QUFDQSxTQUFLLElBQUksS0FBVCxJQUFrQixjQUFsQixFQUFrQztBQUM5QixZQUFJLFNBQVMsZUFBZSxLQUFmLENBQWI7QUFDQSxZQUFJLFNBQVMsT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLE1BQS9CLENBQWI7QUFDQSxZQUFJLFdBQVcsZ0JBQWYsRUFBaUM7QUFDN0IsbUJBQU8sT0FBUCxDQUFlLGtCQUFVO0FBQ3JCLG9CQUFJLE9BQU8sU0FBUCxDQUFpQixRQUFqQixDQUEwQixJQUExQixDQUErQixNQUEvQixNQUEyQyxtQkFBL0MsRUFBb0U7QUFDaEUsa0NBQWMsT0FBTyxJQUFyQixJQUE2QixNQUE3QjtBQUNBLGtDQUFjLE9BQU8sSUFBckI7QUFDSCxpQkFIRCxNQUdPO0FBQ0gsb0NBQWdCLHNCQUFjLGFBQWQsRUFBNkIsTUFBN0IsQ0FBaEI7QUFDSDtBQUNKLGFBUEQ7QUFRSCxTQVRELE1BU08sSUFBSSxXQUFXLGlCQUFmLEVBQWtDO0FBQ3JDLDRCQUFnQixzQkFBYyxhQUFkLEVBQTZCLE1BQTdCLENBQWhCO0FBQ0gsU0FGTSxNQUVBLElBQUksV0FBVyxtQkFBZixFQUFvQztBQUN2QywwQkFBYyxPQUFPLElBQXJCLElBQTZCLE1BQTdCO0FBQ0EsMEJBQWMsT0FBTyxJQUFyQjtBQUNILFNBSE0sTUFHQTtBQUNILG9CQUFRLEdBQVIsQ0FBWSx3QkFBWixFQUFzQyxNQUF0QztBQUNIO0FBQ0o7QUFDRCxRQUFJLFFBQUosRUFBYyxRQUFRLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxhQUFwQztBQUNkLFFBQUksUUFBSixFQUFjLEtBQUssWUFBWSxHQUFaLEVBQUw7QUFDZCxRQUFJLFFBQUosRUFBYyxRQUFRLEdBQVIsQ0FBWSwrQkFBK0IsS0FBSyxFQUFwQyxJQUEwQyxnQkFBdEQ7QUFDakI7Ozs7Ozs7O1FDNUNlLFMsR0FBQSxTO1FBS0EsVyxHQUFBLFc7UUFHQSxnQixHQUFBLGdCO0FBWlQsSUFBTSxnQ0FBWTtBQUNyQixhQUFTLGtCQUFrQixNQUFsQixHQUEyQixZQUFXO0FBQUMsaUJBQVMsSUFBVCxDQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsT0FBNUIsRUFBc0MsT0FBTyxJQUFQO0FBQWEsS0FBL0QsRUFBM0IsR0FBK0YsS0FEbkY7QUFFckIsVUFBTSxFQUFFLE1BQUY7QUFGZSxDQUFsQjtBQUlBLFNBQVMsU0FBVCxHQUFxQjtBQUFBOztBQUN4QixXQUFPLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQU07QUFDbEMsY0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQixNQUFuQjtBQUNILEtBRkQ7QUFHSDtBQUNNLFNBQVMsV0FBVCxHQUF1QjtBQUMxQixNQUFFLG9DQUFGLEVBQXdDLE1BQXhDLENBQStDLGdFQUEvQztBQUNIO0FBQ00sU0FBUyxnQkFBVCxHQUE0QjtBQUMvQixNQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFlBQVk7QUFDbkMsVUFBRSxJQUFGLEVBQVEsT0FBUixDQUFnQixTQUFoQixFQUEyQixXQUEzQixDQUF1QyxRQUF2QztBQUNILEtBRkQ7QUFHSDs7Ozs7Ozs7UUNoQmUsWSxHQUFBLFk7QUFBVCxTQUFTLFlBQVQsR0FBd0I7QUFDM0IsTUFBRSxRQUFGLEVBQVksRUFBWixDQUFlLFdBQWYsRUFBNEIsVUFBVSxDQUFWLEVBQWE7QUFDckMsWUFBSSxNQUFNLENBQUMsRUFBRSxLQUFGLEdBQVUsRUFBRSxNQUFGLEVBQVUsVUFBVixLQUF1QixDQUFsQyxJQUF1QyxFQUFqRDtBQUNBLFlBQUksTUFBTSxDQUFFLEVBQUUsS0FBRixHQUFVLEVBQUUsTUFBRixFQUFVLFNBQVYsRUFBWCxHQUFvQyxFQUFFLE1BQUYsRUFBVSxXQUFWLEtBQXdCLENBQTdELElBQWtFLEVBQTVFO0FBQ0EsWUFBSSxNQUFNLENBQUMsRUFBRSxLQUFGLEdBQVUsRUFBRSxNQUFGLEVBQVUsVUFBVixLQUF1QixDQUFsQyxJQUF1QyxFQUFqRDtBQUNBLFlBQUksTUFBTSxDQUFFLEVBQUUsS0FBRixHQUFVLEVBQUUsTUFBRixFQUFVLFNBQVYsRUFBWCxHQUFvQyxFQUFFLE1BQUYsRUFBVSxXQUFWLEtBQXdCLENBQTdELElBQWtFLEVBQTVFO0FBQ0EsWUFBSSxNQUFNLENBQUMsRUFBRSxLQUFGLEdBQVUsRUFBRSxNQUFGLEVBQVUsVUFBVixLQUF1QixDQUFsQyxJQUF1QyxFQUFqRDtBQUNBLFlBQUksTUFBTSxDQUFFLEVBQUUsS0FBRixHQUFVLEVBQUUsTUFBRixFQUFVLFNBQVYsRUFBWCxHQUFvQyxFQUFFLE1BQUYsRUFBVSxXQUFWLEtBQXdCLENBQTdELElBQWtFLEVBQTVFO0FBQ0EsWUFBRyxFQUFFLE1BQUYsRUFBVSxLQUFWLE1BQXFCLElBQXhCLEVBQTZCO0FBQ3pCLGNBQUUsYUFBRixFQUFpQixHQUFqQixDQUFxQjtBQUNqQiw4QkFBYyxNQUFJLElBREQ7QUFFakIsK0JBQWUsTUFBSTtBQUZGLGFBQXJCO0FBSUEsY0FBRSxhQUFGLEVBQWlCLEdBQWpCLENBQXFCO0FBQ2pCLDhCQUFjLE1BQUksSUFERDtBQUVqQiwrQkFBZSxNQUFJO0FBRkYsYUFBckI7QUFJQSxjQUFFLGVBQUYsRUFBbUIsR0FBbkIsQ0FBdUI7QUFDbkIsOEJBQWMsTUFBSSxJQURDO0FBRW5CLCtCQUFlLE1BQUk7QUFGQSxhQUF2QjtBQUlIO0FBQ0osS0FyQkQ7QUF1Qkg7QUFDRDs7O0FDekJBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Imdsb2JhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIlxuaW1wb3J0IGJpbmRlciBmcm9tIFwiLi9saWJzL2JpbmRlclwiO1xuaW1wb3J0IHsgY29uc3RhbnRzLCBhZnRlTG9hZHMsIGJ0bkRlY29yYXRlLCBoZWFkZXJBY3Rpdml0aWVzfSBmcm9tIFwiLi9tb2R1bGVzL2dsb2JhbFwiO1xuaW1wb3J0IHtpbnRyb1dyYXBwZXJ9IGZyb20gXCIuL21vZHVsZXMvaW50cm9XcmFwcGVyXCI7XG5cbmxldCBhcmdzID0gW1xuICAgIHtcbiAgICAgICAgXCJodG1sXCI6IFtjb25zdGFudHMsIGFmdGVMb2Fkc10sXG4gICAgICAgIFwiLmJ0blwiOiBbYnRuRGVjb3JhdGVdLFxuICAgICAgICBcIi5pbnRyby13cmFwcGVyXCI6IFtpbnRyb1dyYXBwZXJdLFxuICAgICAgICBcIi5oZWFkZXJcIjogW2hlYWRlckFjdGl2aXRpZXNdXG4gICAgfSxcbl07XG5cbmJpbmRlciguLi5hcmdzKTtcbiIsIi8vIHYuMi4xXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRlcihzZWxlY3RvcnNBbmRGdW5jdGlvbnNCb3VuZHMsIHJ1blRlc3RzID0gZmFsc2UpIHtcbiAgICBsZXQgdDAsIHQxO1xuICAgIGlmIChydW5UZXN0cykgdDAgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAvLyBwb2x5ZmlsbCBmb3IgXCIubWF0Y2hlcygpXCIgbWV0aG9kXG4gICAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XG4gICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvcjtcbiAgICB9XG4gICAgLy8gZ2F0aGVyIGFsbCBzZWxlY3RvcnMgaW4gYXJyYXlcbiAgICBjb25zdCBzZWxlY3RvcnNUb0ZpbmQgPSBPYmplY3Qua2V5cyhzZWxlY3RvcnNBbmRGdW5jdGlvbnNCb3VuZHMpO1xuICAgIC8vIGZpbmQgc2VsZWN0b3JzIGluIGRvY3VtZW50XG4gICAgY29uc3QgZm91bmRFbGVtZW50cyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yc1RvRmluZC5qb2luKFwiLFwiKSldO1xuICAgIC8vIGZpbHRlciBib3VuZHMgZm9yIG5vdCBmb3VuZGVkIHNlbGVjdG9yc1xuICAgIGxldCBmaWx0ZXJlZEJvdW5kcyA9IHt9O1xuICAgIGZvciAobGV0IGtleSBpbiBzZWxlY3RvcnNBbmRGdW5jdGlvbnNCb3VuZHMpIHtcbiAgICAgICAgaWYgKGZvdW5kRWxlbWVudHMuc29tZShlbGVtZW50ID0+IGVsZW1lbnQubWF0Y2hlcyhrZXkpKSkge1xuICAgICAgICAgICAgZmlsdGVyZWRCb3VuZHNba2V5XSA9IHNlbGVjdG9yc0FuZEZ1bmN0aW9uc0JvdW5kc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHJ1blRlc3RzKSBjb25zb2xlLmxvZyhgLSAke2tleX0gd2FzIG5vdCBmb3VuZGApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGdhdGhlciBhbGwgbW9kdWxlcyBpbiBvbmUgb2JqZWN0XG4gICAgbGV0IG1lcmdlZE1vZHVsZXMgPSB7fTtcbiAgICBmb3IgKGxldCBib3VuZCBpbiBmaWx0ZXJlZEJvdW5kcykge1xuICAgICAgICBsZXQgbW9kdWxlID0gZmlsdGVyZWRCb3VuZHNbYm91bmRdO1xuICAgICAgICBsZXQgbmF0dXJlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1vZHVsZSk7XG4gICAgICAgIGlmIChuYXR1cmUgPT09IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgICAgICAgICAgbW9kdWxlLmZvckVhY2goc2NyaXB0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNjcmlwdCkgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgICAgICAgICAgICAgICBtZXJnZWRNb2R1bGVzW3NjcmlwdC5uYW1lXSA9IHNjcmlwdDtcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VkTW9kdWxlc1tzY3JpcHQubmFtZV0oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZXJnZWRNb2R1bGVzID0gT2JqZWN0LmFzc2lnbihtZXJnZWRNb2R1bGVzLCBzY3JpcHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5hdHVyZSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIikge1xuICAgICAgICAgICAgbWVyZ2VkTW9kdWxlcyA9IE9iamVjdC5hc3NpZ24obWVyZ2VkTW9kdWxlcywgbW9kdWxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChuYXR1cmUgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgICAgICAgbWVyZ2VkTW9kdWxlc1ttb2R1bGUubmFtZV0gPSBtb2R1bGU7XG4gICAgICAgICAgICBtZXJnZWRNb2R1bGVzW21vZHVsZS5uYW1lXSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIhIHVuc3VwcG9ydGVkIGZvcm1hdDogXCIsIG1vZHVsZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJ1blRlc3RzKSBjb25zb2xlLmxvZyhcImJpbmRlclJlc3VsdE9iamVjdDogXCIsIG1lcmdlZE1vZHVsZXMpO1xuICAgIGlmIChydW5UZXN0cykgdDEgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBpZiAocnVuVGVzdHMpIGNvbnNvbGUubG9nKFwiQmluZGVyIGh0bWwgcGFyc2luZyB0b29rIFwiICsgKHQxIC0gdDApICsgXCIgbWlsbGlzZWNvbmRzLlwiKTtcbn1cbiIsImV4cG9ydCBjb25zdCBjb25zdGFudHMgPSB7XG4gICAgaXNUb3VjaDogXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3cgPyBmdW5jdGlvbigpIHtkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJ0b3VjaFwiKTsgcmV0dXJuIHRydWU7fSgpIDogZmFsc2UsXG4gICAgYm9keTogJChcImJvZHlcIilcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZnRlTG9hZHMoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5ib2R5LmFkZENsYXNzKCdsb2FkJylcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBidG5EZWNvcmF0ZSgpIHtcbiAgICAkKCcuYnRuLCBpbnB1dFt0eXBlPVwic3VibWl0XCJdLCBidXR0b24nKS5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiZGVjb3ItdG9wXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwiZGVjb3ItYm90XCI+PC9zcGFuPicpXG59XG5leHBvcnQgZnVuY3Rpb24gaGVhZGVyQWN0aXZpdGllcygpIHtcbiAgICAkKCcuYnRuLW1lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLmhlYWRlcicpLnRvZ2dsZUNsYXNzKCdvcGVuZWQnKVxuICAgIH0pXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaW50cm9XcmFwcGVyKCkge1xuICAgICQoZG9jdW1lbnQpLm9uKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBjeDEgPSAoZS5wYWdlWCAtICQod2luZG93KS5pbm5lcldpZHRoKCkvMikgLyA4MDtcbiAgICAgICAgdmFyIGN5MSA9ICgoZS5wYWdlWSAtICQod2luZG93KS5zY3JvbGxUb3AoKSkgLSAkKHdpbmRvdykuaW5uZXJIZWlnaHQoKS8yKSAvIDgwO1xuICAgICAgICB2YXIgY3gyID0gKGUucGFnZVggLSAkKHdpbmRvdykuaW5uZXJXaWR0aCgpLzIpIC8gNDA7XG4gICAgICAgIHZhciBjeTIgPSAoKGUucGFnZVkgLSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkpIC0gJCh3aW5kb3cpLmlubmVySGVpZ2h0KCkvMikgLyA0MDtcbiAgICAgICAgdmFyIGN4MyA9IChlLnBhZ2VYIC0gJCh3aW5kb3cpLmlubmVyV2lkdGgoKS8yKSAvIDIwO1xuICAgICAgICB2YXIgY3kzID0gKChlLnBhZ2VZIC0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpKSAtICQod2luZG93KS5pbm5lckhlaWdodCgpLzIpIC8gMjA7XG4gICAgICAgIGlmKCQod2luZG93KS53aWR0aCgpID49IDEwMjQpe1xuICAgICAgICAgICAgJCgnLnBhcmFsbC5vbmUnKS5jc3Moe1xuICAgICAgICAgICAgICAgICdtYXJnaW4tdG9wJzogY3kxKydweCcsXG4gICAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JzogY3gxKydweCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCgnLnBhcmFsbC50d28nKS5jc3Moe1xuICAgICAgICAgICAgICAgICdtYXJnaW4tdG9wJzogY3kyKydweCcsXG4gICAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JzogY3gyKydweCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCgnLnBhcmFsbC50aHJlZScpLmNzcyh7XG4gICAgICAgICAgICAgICAgJ21hcmdpbi10b3AnOiBjeTMrJ3B4JyxcbiAgICAgICAgICAgICAgICAnbWFyZ2luLWxlZnQnOiBjeDMrJ3B4J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufVxuLy8gdG9kbyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9mcm9tID0gcmVxdWlyZShcIi4uL2NvcmUtanMvYXJyYXkvZnJvbVwiKTtcblxudmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoMCwgX2Zyb20yLmRlZmF1bHQpKGFycik7XG4gIH1cbn07IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5BcnJheS5mcm9tO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQVJHID0gY29mKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4zJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGluZGV4LCB2YWx1ZSkge1xuICBpZiAoaW5kZXggaW4gb2JqZWN0KSAkZGVmaW5lUHJvcGVydHkuZihvYmplY3QsIGluZGV4LCBjcmVhdGVEZXNjKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W2luZGV4XSA9IHZhbHVlO1xufTtcbiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYga2V5IGluIGV4cG9ydHMpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaCAoZSkge1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSBhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gKCFCVUdHWSAmJiAkbmF0aXZlKSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCJ2YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbiAoKSB7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYywgc2tpcENsb3NpbmcpIHtcbiAgaWYgKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IFs3XTtcbiAgICB2YXIgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGRvbmU6IHNhZmUgPSB0cnVlIH07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG4iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGF0LCBwb3MpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbiAgICB2YXIgaSA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBsID0gcy5sZW5ndGg7XG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gbCkgcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcbiIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgIT0gdW5kZWZpbmVkKSByZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikgeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbWFwZm4gPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKE8pO1xuICAgIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYgKG1hcHBpbmcpIG1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYgKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKSB7XG4gICAgICBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDKCk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvciAocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG4iLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCkge1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWNtOTNjMlZ5TFhCaFkyc3ZYM0J5Wld4MVpHVXVhbk1pTENKaGMzTmxkSE12YW5NdloyeHZZbUZzTG1weklpd2lZWE56WlhSekwycHpMMnhwWW5NdlltbHVaR1Z5TG1weklpd2lZWE56WlhSekwycHpMMjF2WkhWc1pYTXZaMnh2WW1Gc0xtcHpJaXdpWVhOelpYUnpMMnB6TDIxdlpIVnNaWE12YVc1MGNtOVhjbUZ3Y0dWeUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwySmhZbVZzTFhKMWJuUnBiV1V2WTI5eVpTMXFjeTloY25KaGVTOW1jbTl0TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJKaFltVnNMWEoxYm5ScGJXVXZZMjl5WlMxcWN5OXZZbXBsWTNRdllYTnphV2R1TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJKaFltVnNMWEoxYm5ScGJXVXZZMjl5WlMxcWN5OXZZbXBsWTNRdmEyVjVjeTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlpWVdKbGJDMXlkVzUwYVcxbEwyaGxiSEJsY25NdmRHOURiMjV6ZFcxaFlteGxRWEp5WVhrdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDJadUwyRnljbUY1TDJaeWIyMHVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyWnVMMjlpYW1WamRDOWhjM05wWjI0dWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDJadUwyOWlhbVZqZEM5clpYbHpMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOWhMV1oxYm1OMGFXOXVMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOWhiaTF2WW1wbFkzUXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgyRnljbUY1TFdsdVkyeDFaR1Z6TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlqYkdGemMyOW1MbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOWpiMll1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMk52Y21VdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJOeVpXRjBaUzF3Y205d1pYSjBlUzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZZM1I0TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlrWldacGJtVmtMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOWtaWE5qY21sd2RHOXljeTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZaRzl0TFdOeVpXRjBaUzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZaVzUxYlMxaWRXY3RhMlY1Y3k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmWlhod2IzSjBMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOW1ZV2xzY3k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmWjJ4dlltRnNMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOW9ZWE11YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMmhwWkdVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJoMGJXd3Vhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgybGxPQzFrYjIwdFpHVm1hVzVsTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlwYjJKcVpXTjBMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXBjeTFoY25KaGVTMXBkR1Z5TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlwY3kxdlltcGxZM1F1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMmwwWlhJdFkyRnNiQzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZhWFJsY2kxamNtVmhkR1V1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMmwwWlhJdFpHVm1hVzVsTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlwZEdWeUxXUmxkR1ZqZEM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYVhSbGNtRjBiM0p6TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlzYVdKeVlYSjVMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXZZbXBsWTNRdFlYTnphV2R1TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTl2WW1wbFkzUXRZM0psWVhSbExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5dlltcGxZM1F0WkhBdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDI5aWFtVmpkQzFrY0hNdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDI5aWFtVmpkQzFuYjNCekxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5dlltcGxZM1F0WjNCdkxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5dlltcGxZM1F0YTJWNWN5MXBiblJsY201aGJDNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZmIySnFaV04wTFd0bGVYTXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgyOWlhbVZqZEMxd2FXVXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgyOWlhbVZqZEMxellYQXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgzQnliM0JsY25SNUxXUmxjMk11YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYM0psWkdWbWFXNWxMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXpaWFF0ZEc4dGMzUnlhVzVuTFhSaFp5NXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZmMyaGhjbVZrTFd0bGVTNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZmMyaGhjbVZrTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTl6ZEhKcGJtY3RZWFF1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYM1J2TFdGaWMyOXNkWFJsTFdsdVpHVjRMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOTBieTFwYm5SbFoyVnlMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOTBieTFwYjJKcVpXTjBMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOTBieTFzWlc1bmRHZ3Vhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgzUnZMVzlpYW1WamRDNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZmRHOHRjSEpwYldsMGFYWmxMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOTFhV1F1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYM2RyY3k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlqYjNKbExtZGxkQzFwZEdWeVlYUnZjaTF0WlhSb2IyUXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlpYTTJMbUZ5Y21GNUxtWnliMjB1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZaWE0yTG05aWFtVmpkQzVoYzNOcFoyNHVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlpYTTJMbTlpYW1WamRDNXJaWGx6TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMlZ6Tmk1emRISnBibWN1YVhSbGNtRjBiM0l1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenRCUTBOQk96czdPMEZCUTBFN08wRkJRMEU3T3pzN1FVRkZRU3hKUVVGSkxFOUJRVThzUTBGRFVEdEJRVU5KTEZsQlFWRXNjME5CUkZvN1FVRkZTU3haUVVGUkxIRkNRVVphTzBGQlIwa3NjMEpCUVd0Q0xEUkNRVWgwUWp0QlFVbEpMR1ZCUVZjN1FVRktaaXhEUVVSUExFTkJRVmc3TzBGQlUwRXNhME5CUVZVc1NVRkJWanM3T3pzN096czdPenM3T3pzN096czdPenM3TzJ0Q1ExcDNRaXhOT3pzN08wRkJSbmhDT3p0QlFVVmxMRk5CUVZNc1RVRkJWQ3hEUVVGblFpd3lRa0ZCYUVJc1JVRkJLMFE3UVVGQlFTeFJRVUZzUWl4UlFVRnJRaXgxUlVGQlVDeExRVUZQT3p0QlFVTXhSU3hSUVVGSkxGZEJRVW83UVVGQlFTeFJRVUZSTEZkQlFWSTdRVUZEUVN4UlFVRkpMRkZCUVVvc1JVRkJZeXhMUVVGTExGbEJRVmtzUjBGQldpeEZRVUZNTzBGQlEyUTdRVUZEUVN4UlFVRkpMRU5CUVVNc1VVRkJVU3hUUVVGU0xFTkJRV3RDTEU5QlFYWkNMRVZCUVdkRE8wRkJRelZDTEdkQ1FVRlJMRk5CUVZJc1EwRkJhMElzVDBGQmJFSXNSMEZCTkVJc1VVRkJVU3hUUVVGU0xFTkJRV3RDTEdsQ1FVRTVRenRCUVVOSU8wRkJRMFE3UVVGRFFTeFJRVUZOTEd0Q1FVRnJRaXh2UWtGQldTd3lRa0ZCV2l4RFFVRjRRanRCUVVOQk8wRkJRMEVzVVVGQlRTd3lSRUZCYjBJc1UwRkJVeXhuUWtGQlZDeERRVUV3UWl4blFrRkJaMElzU1VGQmFFSXNRMEZCY1VJc1IwRkJja0lzUTBGQk1VSXNRMEZCY0VJc1JVRkJUanRCUVVOQk8wRkJRMEVzVVVGQlNTeHBRa0ZCYVVJc1JVRkJja0k3TzBGQldqQkZMQ3RDUVdGcVJTeEhRV0pwUlR0QlFXTjBSU3haUVVGSkxHTkJRV01zU1VGQlpDeERRVUZ0UWp0QlFVRkJMRzFDUVVGWExGRkJRVkVzVDBGQlVpeERRVUZuUWl4SFFVRm9RaXhEUVVGWU8wRkJRVUVzVTBGQmJrSXNRMEZCU2l4RlFVRjVSRHRCUVVOeVJDd3lRa0ZCWlN4SFFVRm1MRWxCUVhOQ0xEUkNRVUUwUWl4SFFVRTFRaXhEUVVGMFFqdEJRVU5JTEZOQlJrUXNUVUZGVHp0QlFVTklMR2RDUVVGSkxGRkJRVW9zUlVGQll5eFJRVUZSTEVkQlFWSXNVVUZCYVVJc1IwRkJha0k3UVVGRGFrSTdRVUZzUW5GRk96dEJRV0V4UlN4VFFVRkxMRWxCUVVrc1IwRkJWQ3hKUVVGblFpd3lRa0ZCYUVJc1JVRkJOa003UVVGQlFTeGpRVUZ3UXl4SFFVRnZRenRCUVUwMVF6dEJRVU5FTzBGQlEwRXNVVUZCU1N4blFrRkJaMElzUlVGQmNFSTdRVUZEUVN4VFFVRkxMRWxCUVVrc1MwRkJWQ3hKUVVGclFpeGpRVUZzUWl4RlFVRnJRenRCUVVNNVFpeFpRVUZKTEZOQlFWTXNaVUZCWlN4TFFVRm1MRU5CUVdJN1FVRkRRU3haUVVGSkxGTkJRVk1zVDBGQlR5eFRRVUZRTEVOQlFXbENMRkZCUVdwQ0xFTkJRVEJDTEVsQlFURkNMRU5CUVN0Q0xFMUJRUzlDTEVOQlFXSTdRVUZEUVN4WlFVRkpMRmRCUVZjc1owSkJRV1lzUlVGQmFVTTdRVUZETjBJc2JVSkJRVThzVDBGQlVDeERRVUZsTEd0Q1FVRlZPMEZCUTNKQ0xHOUNRVUZKTEU5QlFVOHNVMEZCVUN4RFFVRnBRaXhSUVVGcVFpeERRVUV3UWl4SlFVRXhRaXhEUVVFclFpeE5RVUV2UWl4TlFVRXlReXh0UWtGQkwwTXNSVUZCYjBVN1FVRkRhRVVzYTBOQlFXTXNUMEZCVHl4SlFVRnlRaXhKUVVFMlFpeE5RVUUzUWp0QlFVTkJMR3REUVVGakxFOUJRVThzU1VGQmNrSTdRVUZEU0N4cFFrRklSQ3hOUVVkUE8wRkJRMGdzYjBOQlFXZENMSE5DUVVGakxHRkJRV1FzUlVGQk5rSXNUVUZCTjBJc1EwRkJhRUk3UVVGRFNEdEJRVU5LTEdGQlVFUTdRVUZSU0N4VFFWUkVMRTFCVTA4c1NVRkJTU3hYUVVGWExHbENRVUZtTEVWQlFXdERPMEZCUTNKRExEUkNRVUZuUWl4elFrRkJZeXhoUVVGa0xFVkJRVFpDTEUxQlFUZENMRU5CUVdoQ08wRkJRMGdzVTBGR1RTeE5RVVZCTEVsQlFVa3NWMEZCVnl4dFFrRkJaaXhGUVVGdlF6dEJRVU4yUXl3d1FrRkJZeXhQUVVGUExFbEJRWEpDTEVsQlFUWkNMRTFCUVRkQ08wRkJRMEVzTUVKQlFXTXNUMEZCVHl4SlFVRnlRanRCUVVOSUxGTkJTRTBzVFVGSFFUdEJRVU5JTEc5Q1FVRlJMRWRCUVZJc1EwRkJXU3gzUWtGQldpeEZRVUZ6UXl4TlFVRjBRenRCUVVOSU8wRkJRMG83UVVGRFJDeFJRVUZKTEZGQlFVb3NSVUZCWXl4UlFVRlJMRWRCUVZJc1EwRkJXU3h6UWtGQldpeEZRVUZ2UXl4aFFVRndRenRCUVVOa0xGRkJRVWtzVVVGQlNpeEZRVUZqTEV0QlFVc3NXVUZCV1N4SFFVRmFMRVZCUVV3N1FVRkRaQ3hSUVVGSkxGRkJRVW9zUlVGQll5eFJRVUZSTEVkQlFWSXNRMEZCV1N3clFrRkJLMElzUzBGQlN5eEZRVUZ3UXl4SlFVRXdReXhuUWtGQmRFUTdRVUZEYWtJN096czdPenM3TzFGRE5VTmxMRk1zUjBGQlFTeFRPMUZCUzBFc1Z5eEhRVUZCTEZjN1VVRkhRU3huUWl4SFFVRkJMR2RDTzBGQldsUXNTVUZCVFN4blEwRkJXVHRCUVVOeVFpeGhRVUZUTEd0Q1FVRnJRaXhOUVVGc1FpeEhRVUV5UWl4WlFVRlhPMEZCUVVNc2FVSkJRVk1zU1VGQlZDeERRVUZqTEZOQlFXUXNRMEZCZDBJc1IwRkJlRUlzUTBGQk5FSXNUMEZCTlVJc1JVRkJjME1zVDBGQlR5eEpRVUZRTzBGQlFXRXNTMEZCTDBRc1JVRkJNMElzUjBGQkswWXNTMEZFYmtZN1FVRkZja0lzVlVGQlRTeEZRVUZGTEUxQlFVWTdRVUZHWlN4RFFVRnNRanRCUVVsQkxGTkJRVk1zVTBGQlZDeEhRVUZ4UWp0QlFVRkJPenRCUVVONFFpeFhRVUZQTEdkQ1FVRlFMRU5CUVhkQ0xFMUJRWGhDTEVWQlFXZERMRmxCUVUwN1FVRkRiRU1zWTBGQlN5eEpRVUZNTEVOQlFWVXNVVUZCVml4RFFVRnRRaXhOUVVGdVFqdEJRVU5JTEV0QlJrUTdRVUZIU0R0QlFVTk5MRk5CUVZNc1YwRkJWQ3hIUVVGMVFqdEJRVU14UWl4TlFVRkZMRzlEUVVGR0xFVkJRWGRETEUxQlFYaERMRU5CUVN0RExHZEZRVUV2UXp0QlFVTklPMEZCUTAwc1UwRkJVeXhuUWtGQlZDeEhRVUUwUWp0QlFVTXZRaXhOUVVGRkxGZEJRVVlzUlVGQlpTeEZRVUZtTEVOQlFXdENMRTlCUVd4Q0xFVkJRVEpDTEZsQlFWazdRVUZEYmtNc1ZVRkJSU3hKUVVGR0xFVkJRVkVzVDBGQlVpeERRVUZuUWl4VFFVRm9RaXhGUVVFeVFpeFhRVUV6UWl4RFFVRjFReXhSUVVGMlF6dEJRVU5JTEV0QlJrUTdRVUZIU0RzN096czdPenM3VVVOb1FtVXNXU3hIUVVGQkxGazdRVUZCVkN4VFFVRlRMRmxCUVZRc1IwRkJkMEk3UVVGRE0wSXNUVUZCUlN4UlFVRkdMRVZCUVZrc1JVRkJXaXhEUVVGbExGZEJRV1lzUlVGQk5FSXNWVUZCVlN4RFFVRldMRVZCUVdFN1FVRkRja01zV1VGQlNTeE5RVUZOTEVOQlFVTXNSVUZCUlN4TFFVRkdMRWRCUVZVc1JVRkJSU3hOUVVGR0xFVkJRVlVzVlVGQlZpeExRVUYxUWl4RFFVRnNReXhKUVVGMVF5eEZRVUZxUkR0QlFVTkJMRmxCUVVrc1RVRkJUU3hEUVVGRkxFVkJRVVVzUzBGQlJpeEhRVUZWTEVWQlFVVXNUVUZCUml4RlFVRlZMRk5CUVZZc1JVRkJXQ3hIUVVGdlF5eEZRVUZGTEUxQlFVWXNSVUZCVlN4WFFVRldMRXRCUVhkQ0xFTkJRVGRFTEVsQlFXdEZMRVZCUVRWRk8wRkJRMEVzV1VGQlNTeE5RVUZOTEVOQlFVTXNSVUZCUlN4TFFVRkdMRWRCUVZVc1JVRkJSU3hOUVVGR0xFVkJRVlVzVlVGQlZpeExRVUYxUWl4RFFVRnNReXhKUVVGMVF5eEZRVUZxUkR0QlFVTkJMRmxCUVVrc1RVRkJUU3hEUVVGRkxFVkJRVVVzUzBGQlJpeEhRVUZWTEVWQlFVVXNUVUZCUml4RlFVRlZMRk5CUVZZc1JVRkJXQ3hIUVVGdlF5eEZRVUZGTEUxQlFVWXNSVUZCVlN4WFFVRldMRXRCUVhkQ0xFTkJRVGRFTEVsQlFXdEZMRVZCUVRWRk8wRkJRMEVzV1VGQlNTeE5RVUZOTEVOQlFVTXNSVUZCUlN4TFFVRkdMRWRCUVZVc1JVRkJSU3hOUVVGR0xFVkJRVlVzVlVGQlZpeExRVUYxUWl4RFFVRnNReXhKUVVGMVF5eEZRVUZxUkR0QlFVTkJMRmxCUVVrc1RVRkJUU3hEUVVGRkxFVkJRVVVzUzBGQlJpeEhRVUZWTEVWQlFVVXNUVUZCUml4RlFVRlZMRk5CUVZZc1JVRkJXQ3hIUVVGdlF5eEZRVUZGTEUxQlFVWXNSVUZCVlN4WFFVRldMRXRCUVhkQ0xFTkJRVGRFTEVsQlFXdEZMRVZCUVRWRk8wRkJRMEVzV1VGQlJ5eEZRVUZGTEUxQlFVWXNSVUZCVlN4TFFVRldMRTFCUVhGQ0xFbEJRWGhDTEVWQlFUWkNPMEZCUTNwQ0xHTkJRVVVzWVVGQlJpeEZRVUZwUWl4SFFVRnFRaXhEUVVGeFFqdEJRVU5xUWl3NFFrRkJZeXhOUVVGSkxFbEJSRVE3UVVGRmFrSXNLMEpCUVdVc1RVRkJTVHRCUVVaR0xHRkJRWEpDTzBGQlNVRXNZMEZCUlN4aFFVRkdMRVZCUVdsQ0xFZEJRV3BDTEVOQlFYRkNPMEZCUTJwQ0xEaENRVUZqTEUxQlFVa3NTVUZFUkR0QlFVVnFRaXdyUWtGQlpTeE5RVUZKTzBGQlJrWXNZVUZCY2tJN1FVRkpRU3hqUVVGRkxHVkJRVVlzUlVGQmJVSXNSMEZCYmtJc1EwRkJkVUk3UVVGRGJrSXNPRUpCUVdNc1RVRkJTU3hKUVVSRE8wRkJSVzVDTEN0Q1FVRmxMRTFCUVVrN1FVRkdRU3hoUVVGMlFqdEJRVWxJTzBGQlEwb3NTMEZ5UWtRN1FVRjFRa2c3UVVGRFJEczdPMEZEZWtKQk96dEJRMEZCT3p0QlEwRkJPenRCUTBGQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU53UWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFNFRTdRVUZEUVR0QlFVTkJPenRCUTBaQk8wRkJRMEU3UVVGRFFUczdRVU5HUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMHBCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOTVFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRka0pCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOMlFrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMHhCTzBGQlEwRTdRVUZEUVRzN1FVTkdRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRVa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEzQkNRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVEVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5LUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlExQkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFNrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU0zUkVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTlFRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTk9RVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEwcEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTlNRVHRCUVVOQk8wRkJRMEU3TzBGRFJrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRTRUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRUa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMUpCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTBoQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlExcEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFlrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU4wUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU4wUWtFN1FVRkRRVHM3UVVORVFUdEJRVU5CT3p0QlEwUkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEYkVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTjZRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOb1FrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOaVFUdEJRVU5CT3p0QlEwUkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFlrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEycENRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTFCQk8wRkJRMEU3TzBGRFJFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTldRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRVa0U3UVVGRFFUczdRVU5FUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlExQkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5NUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5PUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEYWtKQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRVRUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRUa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRUa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRUa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTB4Qk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlExcEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5NUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRXRUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMUpCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEY2tOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEU2tFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRWRUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUlvWm5WdVkzUnBiMjRvS1h0bWRXNWpkR2x2YmlCbEtIUXNiaXh5S1h0bWRXNWpkR2x2YmlCektHOHNkU2w3YVdZb0lXNWJiMTBwZTJsbUtDRjBXMjlkS1h0MllYSWdZVDEwZVhCbGIyWWdjbVZ4ZFdseVpUMDlYQ0ptZFc1amRHbHZibHdpSmlaeVpYRjFhWEpsTzJsbUtDRjFKaVpoS1hKbGRIVnliaUJoS0c4c0lUQXBPMmxtS0drcGNtVjBkWEp1SUdrb2J5d2hNQ2s3ZG1GeUlHWTlibVYzSUVWeWNtOXlLRndpUTJGdWJtOTBJR1pwYm1RZ2JXOWtkV3hsSUNkY0lpdHZLMXdpSjF3aUtUdDBhSEp2ZHlCbUxtTnZaR1U5WENKTlQwUlZURVZmVGs5VVgwWlBWVTVFWENJc1puMTJZWElnYkQxdVcyOWRQWHRsZUhCdmNuUnpPbnQ5ZlR0MFcyOWRXekJkTG1OaGJHd29iQzVsZUhCdmNuUnpMR1oxYm1OMGFXOXVLR1VwZTNaaGNpQnVQWFJiYjExYk1WMWJaVjA3Y21WMGRYSnVJSE1vYmo5dU9tVXBmU3hzTEd3dVpYaHdiM0owY3l4bExIUXNiaXh5S1gxeVpYUjFjbTRnYmx0dlhTNWxlSEJ2Y25SemZYWmhjaUJwUFhSNWNHVnZaaUJ5WlhGMWFYSmxQVDFjSW1aMWJtTjBhVzl1WENJbUpuSmxjWFZwY21VN1ptOXlLSFpoY2lCdlBUQTdienh5TG14bGJtZDBhRHR2S3lzcGN5aHlXMjlkS1R0eVpYUjFjbTRnYzMxeVpYUjFjbTRnWlgwcEtDa2lMQ0pjYm1sdGNHOXlkQ0JpYVc1a1pYSWdabkp2YlNCY0lpNHZiR2xpY3k5aWFXNWtaWEpjSWp0Y2JtbHRjRzl5ZENCN0lHTnZibk4wWVc1MGN5d2dZV1owWlV4dllXUnpMQ0JpZEc1RVpXTnZjbUYwWlN3Z2FHVmhaR1Z5UVdOMGFYWnBkR2xsYzMwZ1puSnZiU0JjSWk0dmJXOWtkV3hsY3k5bmJHOWlZV3hjSWp0Y2JtbHRjRzl5ZENCN2FXNTBjbTlYY21Gd2NHVnlmU0JtY205dElGd2lMaTl0YjJSMWJHVnpMMmx1ZEhKdlYzSmhjSEJsY2x3aU8xeHVYRzVzWlhRZ1lYSm5jeUE5SUZ0Y2JpQWdJQ0I3WEc0Z0lDQWdJQ0FnSUZ3aWFIUnRiRndpT2lCYlkyOXVjM1JoYm5SekxDQmhablJsVEc5aFpITmRMRnh1SUNBZ0lDQWdJQ0JjSWk1aWRHNWNJam9nVzJKMGJrUmxZMjl5WVhSbFhTeGNiaUFnSUNBZ0lDQWdYQ0l1YVc1MGNtOHRkM0poY0hCbGNsd2lPaUJiYVc1MGNtOVhjbUZ3Y0dWeVhTeGNiaUFnSUNBZ0lDQWdYQ0l1YUdWaFpHVnlYQ0k2SUZ0b1pXRmtaWEpCWTNScGRtbDBhV1Z6WFZ4dUlDQWdJSDBzWEc1ZE8xeHVYRzVpYVc1a1pYSW9MaTR1WVhKbmN5azdYRzRpTENJdkx5QjJMakl1TVZ4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCbWRXNWpkR2x2YmlCaWFXNWtaWElvYzJWc1pXTjBiM0p6UVc1a1JuVnVZM1JwYjI1elFtOTFibVJ6TENCeWRXNVVaWE4wY3lBOUlHWmhiSE5sS1NCN1hHNGdJQ0FnYkdWMElIUXdMQ0IwTVR0Y2JpQWdJQ0JwWmlBb2NuVnVWR1Z6ZEhNcElIUXdJRDBnY0dWeVptOXliV0Z1WTJVdWJtOTNLQ2s3WEc0Z0lDQWdMeThnY0c5c2VXWnBiR3dnWm05eUlGd2lMbTFoZEdOb1pYTW9LVndpSUcxbGRHaHZaRnh1SUNBZ0lHbG1JQ2doUld4bGJXVnVkQzV3Y205MGIzUjVjR1V1YldGMFkyaGxjeWtnZTF4dUlDQWdJQ0FnSUNCRmJHVnRaVzUwTG5CeWIzUnZkSGx3WlM1dFlYUmphR1Z6SUQwZ1JXeGxiV1Z1ZEM1d2NtOTBiM1I1Y0dVdWJYTk5ZWFJqYUdWelUyVnNaV04wYjNJN1hHNGdJQ0FnZlZ4dUlDQWdJQzh2SUdkaGRHaGxjaUJoYkd3Z2MyVnNaV04wYjNKeklHbHVJR0Z5Y21GNVhHNGdJQ0FnWTI5dWMzUWdjMlZzWldOMGIzSnpWRzlHYVc1a0lEMGdUMkpxWldOMExtdGxlWE1vYzJWc1pXTjBiM0p6UVc1a1JuVnVZM1JwYjI1elFtOTFibVJ6S1R0Y2JpQWdJQ0F2THlCbWFXNWtJSE5sYkdWamRHOXljeUJwYmlCa2IyTjFiV1Z1ZEZ4dUlDQWdJR052Ym5OMElHWnZkVzVrUld4bGJXVnVkSE1nUFNCYkxpNHVaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2tGc2JDaHpaV3hsWTNSdmNuTlViMFpwYm1RdWFtOXBiaWhjSWl4Y0lpa3BYVHRjYmlBZ0lDQXZMeUJtYVd4MFpYSWdZbTkxYm1SeklHWnZjaUJ1YjNRZ1ptOTFibVJsWkNCelpXeGxZM1J2Y25OY2JpQWdJQ0JzWlhRZ1ptbHNkR1Z5WldSQ2IzVnVaSE1nUFNCN2ZUdGNiaUFnSUNCbWIzSWdLR3hsZENCclpYa2dhVzRnYzJWc1pXTjBiM0p6UVc1a1JuVnVZM1JwYjI1elFtOTFibVJ6S1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2htYjNWdVpFVnNaVzFsYm5SekxuTnZiV1VvWld4bGJXVnVkQ0E5UGlCbGJHVnRaVzUwTG0xaGRHTm9aWE1vYTJWNUtTa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHWnBiSFJsY21Wa1FtOTFibVJ6VzJ0bGVWMGdQU0J6Wld4bFkzUnZjbk5CYm1SR2RXNWpkR2x2Ym5OQ2IzVnVaSE5iYTJWNVhUdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHlkVzVVWlhOMGN5a2dZMjl1YzI5c1pTNXNiMmNvWUMwZ0pIdHJaWGw5SUhkaGN5QnViM1FnWm05MWJtUmdLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ0lDQXZMeUJuWVhSb1pYSWdZV3hzSUcxdlpIVnNaWE1nYVc0Z2IyNWxJRzlpYW1WamRGeHVJQ0FnSUd4bGRDQnRaWEpuWldSTmIyUjFiR1Z6SUQwZ2UzMDdYRzRnSUNBZ1ptOXlJQ2hzWlhRZ1ltOTFibVFnYVc0Z1ptbHNkR1Z5WldSQ2IzVnVaSE1wSUh0Y2JpQWdJQ0FnSUNBZ2JHVjBJRzF2WkhWc1pTQTlJR1pwYkhSbGNtVmtRbTkxYm1SelcySnZkVzVrWFR0Y2JpQWdJQ0FnSUNBZ2JHVjBJRzVoZEhWeVpTQTlJRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVkRzlUZEhKcGJtY3VZMkZzYkNodGIyUjFiR1VwTzF4dUlDQWdJQ0FnSUNCcFppQW9ibUYwZFhKbElEMDlQU0JjSWx0dlltcGxZM1FnUVhKeVlYbGRYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJRzF2WkhWc1pTNW1iM0pGWVdOb0tITmpjbWx3ZENBOVBpQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0U5aWFtVmpkQzV3Y205MGIzUjVjR1V1ZEc5VGRISnBibWN1WTJGc2JDaHpZM0pwY0hRcElEMDlQU0JjSWx0dlltcGxZM1FnUm5WdVkzUnBiMjVkWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYldWeVoyVmtUVzlrZFd4bGMxdHpZM0pwY0hRdWJtRnRaVjBnUFNCelkzSnBjSFE3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHMWxjbWRsWkUxdlpIVnNaWE5iYzJOeWFYQjBMbTVoYldWZEtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYldWeVoyVmtUVzlrZFd4bGN5QTlJRTlpYW1WamRDNWhjM05wWjI0b2JXVnlaMlZrVFc5a2RXeGxjeXdnYzJOeWFYQjBLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlLVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNodVlYUjFjbVVnUFQwOUlGd2lXMjlpYW1WamRDQlBZbXBsWTNSZFhDSXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHMWxjbWRsWkUxdlpIVnNaWE1nUFNCUFltcGxZM1F1WVhOemFXZHVLRzFsY21kbFpFMXZaSFZzWlhNc0lHMXZaSFZzWlNrN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9ibUYwZFhKbElEMDlQU0JjSWx0dlltcGxZM1FnUm5WdVkzUnBiMjVkWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUcxbGNtZGxaRTF2WkhWc1pYTmJiVzlrZFd4bExtNWhiV1ZkSUQwZ2JXOWtkV3hsTzF4dUlDQWdJQ0FnSUNBZ0lDQWdiV1Z5WjJWa1RXOWtkV3hsYzF0dGIyUjFiR1V1Ym1GdFpWMG9LVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LRndpSVNCMWJuTjFjSEJ2Y25SbFpDQm1iM0p0WVhRNklGd2lMQ0J0YjJSMWJHVXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVnh1SUNBZ0lHbG1JQ2h5ZFc1VVpYTjBjeWtnWTI5dWMyOXNaUzVzYjJjb1hDSmlhVzVrWlhKU1pYTjFiSFJQWW1wbFkzUTZJRndpTENCdFpYSm5aV1JOYjJSMWJHVnpLVHRjYmlBZ0lDQnBaaUFvY25WdVZHVnpkSE1wSUhReElEMGdjR1Z5Wm05eWJXRnVZMlV1Ym05M0tDazdYRzRnSUNBZ2FXWWdLSEoxYmxSbGMzUnpLU0JqYjI1emIyeGxMbXh2WnloY0lrSnBibVJsY2lCb2RHMXNJSEJoY25OcGJtY2dkRzl2YXlCY0lpQXJJQ2gwTVNBdElIUXdLU0FySUZ3aUlHMXBiR3hwYzJWamIyNWtjeTVjSWlrN1hHNTlYRzRpTENKbGVIQnZjblFnWTI5dWMzUWdZMjl1YzNSaGJuUnpJRDBnZTF4dUlDQWdJR2x6Vkc5MVkyZzZJRndpYjI1MGIzVmphSE4wWVhKMFhDSWdhVzRnZDJsdVpHOTNJRDhnWm5WdVkzUnBiMjRvS1NCN1pHOWpkVzFsYm5RdVltOWtlUzVqYkdGemMweHBjM1F1WVdSa0tGd2lkRzkxWTJoY0lpazdJSEpsZEhWeWJpQjBjblZsTzMwb0tTQTZJR1poYkhObExGeHVJQ0FnSUdKdlpIazZJQ1FvWENKaWIyUjVYQ0lwWEc1OVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z1lXWjBaVXh2WVdSektDa2dlMXh1SUNBZ0lIZHBibVJ2ZHk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0Z3aWJHOWhaRndpTENBb0tTQTlQaUI3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZbTlrZVM1aFpHUkRiR0Z6Y3lnbmJHOWhaQ2NwWEc0Z0lDQWdmU2s3WEc1OVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z1luUnVSR1ZqYjNKaGRHVW9LU0I3WEc0Z0lDQWdKQ2duTG1KMGJpd2dhVzV3ZFhSYmRIbHdaVDFjSW5OMVltMXBkRndpWFN3Z1luVjBkRzl1SnlrdVlYQndaVzVrS0NjOGMzQmhiaUJqYkdGemN6MWNJbVJsWTI5eUxYUnZjRndpUGp3dmMzQmhiajQ4YzNCaGJpQmpiR0Z6Y3oxY0ltUmxZMjl5TFdKdmRGd2lQand2YzNCaGJqNG5LVnh1ZlZ4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUdobFlXUmxja0ZqZEdsMmFYUnBaWE1vS1NCN1hHNGdJQ0FnSkNnbkxtSjBiaTF0Wlc1MUp5a3ViMjRvSjJOc2FXTnJKeXdnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUNBZ0lDQWtLSFJvYVhNcExtTnNiM05sYzNRb0p5NW9aV0ZrWlhJbktTNTBiMmRuYkdWRGJHRnpjeWduYjNCbGJtVmtKeWxjYmlBZ0lDQjlLVnh1ZlZ4dUlpd2laWGh3YjNKMElHWjFibU4wYVc5dUlHbHVkSEp2VjNKaGNIQmxjaWdwSUh0Y2JpQWdJQ0FrS0dSdlkzVnRaVzUwS1M1dmJpaGNJbTF2ZFhObGJXOTJaVndpTENCbWRXNWpkR2x2YmlBb1pTa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ1kzZ3hJRDBnS0dVdWNHRm5aVmdnTFNBa0tIZHBibVJ2ZHlrdWFXNXVaWEpYYVdSMGFDZ3BMeklwSUM4Z09EQTdYRzRnSUNBZ0lDQWdJSFpoY2lCamVURWdQU0FvS0dVdWNHRm5aVmtnTFNBa0tIZHBibVJ2ZHlrdWMyTnliMnhzVkc5d0tDa3BJQzBnSkNoM2FXNWtiM2NwTG1sdWJtVnlTR1ZwWjJoMEtDa3ZNaWtnTHlBNE1EdGNiaUFnSUNBZ0lDQWdkbUZ5SUdONE1pQTlJQ2hsTG5CaFoyVllJQzBnSkNoM2FXNWtiM2NwTG1sdWJtVnlWMmxrZEdnb0tTOHlLU0F2SURRd08xeHVJQ0FnSUNBZ0lDQjJZWElnWTNreUlEMGdLQ2hsTG5CaFoyVlpJQzBnSkNoM2FXNWtiM2NwTG5OamNtOXNiRlJ2Y0NncEtTQXRJQ1FvZDJsdVpHOTNLUzVwYm01bGNraGxhV2RvZENncEx6SXBJQzhnTkRBN1hHNGdJQ0FnSUNBZ0lIWmhjaUJqZURNZ1BTQW9aUzV3WVdkbFdDQXRJQ1FvZDJsdVpHOTNLUzVwYm01bGNsZHBaSFJvS0Nrdk1pa2dMeUF5TUR0Y2JpQWdJQ0FnSUNBZ2RtRnlJR041TXlBOUlDZ29aUzV3WVdkbFdTQXRJQ1FvZDJsdVpHOTNLUzV6WTNKdmJHeFViM0FvS1NrZ0xTQWtLSGRwYm1SdmR5a3VhVzV1WlhKSVpXbG5hSFFvS1M4eUtTQXZJREl3TzF4dUlDQWdJQ0FnSUNCcFppZ2tLSGRwYm1SdmR5a3VkMmxrZEdnb0tTQStQU0F4TURJMEtYdGNiaUFnSUNBZ0lDQWdJQ0FnSUNRb0p5NXdZWEpoYkd3dWIyNWxKeWt1WTNOektIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQW5iV0Z5WjJsdUxYUnZjQ2M2SUdONU1Tc25jSGduTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNkdFlYSm5hVzR0YkdWbWRDYzZJR040TVNzbmNIZ25YRzRnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNRb0p5NXdZWEpoYkd3dWRIZHZKeWt1WTNOektIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQW5iV0Z5WjJsdUxYUnZjQ2M2SUdONU1pc25jSGduTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNkdFlYSm5hVzR0YkdWbWRDYzZJR040TWlzbmNIZ25YRzRnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNRb0p5NXdZWEpoYkd3dWRHaHlaV1VuS1M1amMzTW9lMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ2R0WVhKbmFXNHRkRzl3SnpvZ1kza3pLeWR3ZUNjc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0oyMWhjbWRwYmkxc1pXWjBKem9nWTNnekt5ZHdlQ2RjYmlBZ0lDQWdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmU2s3WEc1Y2JuMWNiaTh2SUhSdlpHOGlMQ0p0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHNnWENKa1pXWmhkV3gwWENJNklISmxjWFZwY21Vb1hDSmpiM0psTFdwekwyeHBZbkpoY25rdlptNHZZWEp5WVhrdlpuSnZiVndpS1N3Z1gxOWxjMDF2WkhWc1pUb2dkSEoxWlNCOU95SXNJbTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdleUJjSW1SbFptRjFiSFJjSWpvZ2NtVnhkV2x5WlNoY0ltTnZjbVV0YW5NdmJHbGljbUZ5ZVM5bWJpOXZZbXBsWTNRdllYTnphV2R1WENJcExDQmZYMlZ6VFc5a2RXeGxPaUIwY25WbElIMDdJaXdpYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0I3SUZ3aVpHVm1ZWFZzZEZ3aU9pQnlaWEYxYVhKbEtGd2lZMjl5WlMxcWN5OXNhV0p5WVhKNUwyWnVMMjlpYW1WamRDOXJaWGx6WENJcExDQmZYMlZ6VFc5a2RXeGxPaUIwY25WbElIMDdJaXdpWENKMWMyVWdjM1J5YVdOMFhDSTdYRzVjYm1WNGNHOXlkSE11WDE5bGMwMXZaSFZzWlNBOUlIUnlkV1U3WEc1Y2JuWmhjaUJmWm5KdmJTQTlJSEpsY1hWcGNtVW9YQ0l1TGk5amIzSmxMV3B6TDJGeWNtRjVMMlp5YjIxY0lpazdYRzVjYm5aaGNpQmZabkp2YlRJZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0Y5bWNtOXRLVHRjYmx4dVpuVnVZM1JwYjI0Z1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2h2WW1vcElIc2djbVYwZFhKdUlHOWlhaUFtSmlCdlltb3VYMTlsYzAxdlpIVnNaU0EvSUc5aWFpQTZJSHNnWkdWbVlYVnNkRG9nYjJKcUlIMDdJSDFjYmx4dVpYaHdiM0owY3k1a1pXWmhkV3gwSUQwZ1puVnVZM1JwYjI0Z0tHRnljaWtnZTF4dUlDQnBaaUFvUVhKeVlYa3VhWE5CY25KaGVTaGhjbklwS1NCN1hHNGdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQXNJR0Z5Y2pJZ1BTQkJjbkpoZVNoaGNuSXViR1Z1WjNSb0tUc2dhU0E4SUdGeWNpNXNaVzVuZEdnN0lHa3JLeWtnZTF4dUlDQWdJQ0FnWVhKeU1sdHBYU0E5SUdGeWNsdHBYVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnlaWFIxY200Z1lYSnlNanRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0J5WlhSMWNtNGdLREFzSUY5bWNtOXRNaTVrWldaaGRXeDBLU2hoY25JcE8xeHVJQ0I5WEc1OU95SXNJbkpsY1hWcGNtVW9KeTR1THk0dUwyMXZaSFZzWlhNdlpYTTJMbk4wY21sdVp5NXBkR1Z5WVhSdmNpY3BPMXh1Y21WeGRXbHlaU2duTGk0dkxpNHZiVzlrZFd4bGN5OWxjell1WVhKeVlYa3Vabkp2YlNjcE8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQnlaWEYxYVhKbEtDY3VMaTh1TGk5dGIyUjFiR1Z6TDE5amIzSmxKeWt1UVhKeVlYa3Vabkp2YlR0Y2JpSXNJbkpsY1hWcGNtVW9KeTR1THk0dUwyMXZaSFZzWlhNdlpYTTJMbTlpYW1WamRDNWhjM05wWjI0bktUdGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdjbVZ4ZFdseVpTZ25MaTR2TGk0dmJXOWtkV3hsY3k5ZlkyOXlaU2NwTGs5aWFtVmpkQzVoYzNOcFoyNDdYRzRpTENKeVpYRjFhWEpsS0NjdUxpOHVMaTl0YjJSMWJHVnpMMlZ6Tmk1dlltcGxZM1F1YTJWNWN5Y3BPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0J5WlhGMWFYSmxLQ2N1TGk4dUxpOXRiMlIxYkdWekwxOWpiM0psSnlrdVQySnFaV04wTG10bGVYTTdYRzRpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNocGRDa2dlMXh1SUNCcFppQW9kSGx3Wlc5bUlHbDBJQ0U5SUNkbWRXNWpkR2x2YmljcElIUm9jbTkzSUZSNWNHVkZjbkp2Y2locGRDQXJJQ2NnYVhNZ2JtOTBJR0VnWm5WdVkzUnBiMjRoSnlrN1hHNGdJSEpsZEhWeWJpQnBkRHRjYm4wN1hHNGlMQ0oyWVhJZ2FYTlBZbXBsWTNRZ1BTQnlaWEYxYVhKbEtDY3VMMTlwY3kxdlltcGxZM1FuS1R0Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z0tHbDBLU0I3WEc0Z0lHbG1JQ2doYVhOUFltcGxZM1FvYVhRcEtTQjBhSEp2ZHlCVWVYQmxSWEp5YjNJb2FYUWdLeUFuSUdseklHNXZkQ0JoYmlCdlltcGxZM1FoSnlrN1hHNGdJSEpsZEhWeWJpQnBkRHRjYm4wN1hHNGlMQ0l2THlCbVlXeHpaU0F0UGlCQmNuSmhlU05wYm1SbGVFOW1YRzR2THlCMGNuVmxJQ0F0UGlCQmNuSmhlU05wYm1Oc2RXUmxjMXh1ZG1GeUlIUnZTVTlpYW1WamRDQTlJSEpsY1hWcGNtVW9KeTR2WDNSdkxXbHZZbXBsWTNRbktUdGNiblpoY2lCMGIweGxibWQwYUNBOUlISmxjWFZwY21Vb0p5NHZYM1J2TFd4bGJtZDBhQ2NwTzF4dWRtRnlJSFJ2UVdKemIyeDFkR1ZKYm1SbGVDQTlJSEpsY1hWcGNtVW9KeTR2WDNSdkxXRmljMjlzZFhSbExXbHVaR1Y0SnlrN1hHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaEpVMTlKVGtOTVZVUkZVeWtnZTF4dUlDQnlaWFIxY200Z1puVnVZM1JwYjI0Z0tDUjBhR2x6TENCbGJDd2dabkp2YlVsdVpHVjRLU0I3WEc0Z0lDQWdkbUZ5SUU4Z1BTQjBiMGxQWW1wbFkzUW9KSFJvYVhNcE8xeHVJQ0FnSUhaaGNpQnNaVzVuZEdnZ1BTQjBiMHhsYm1kMGFDaFBMbXhsYm1kMGFDazdYRzRnSUNBZ2RtRnlJR2x1WkdWNElEMGdkRzlCWW5OdmJIVjBaVWx1WkdWNEtHWnliMjFKYm1SbGVDd2diR1Z1WjNSb0tUdGNiaUFnSUNCMllYSWdkbUZzZFdVN1hHNGdJQ0FnTHk4Z1FYSnlZWGtqYVc1amJIVmtaWE1nZFhObGN5QlRZVzFsVm1Gc2RXVmFaWEp2SUdWeGRXRnNhWFI1SUdGc1oyOXlhWFJvYlZ4dUlDQWdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMVzVsZUhRdGJHbHVaU0J1YnkxelpXeG1MV052YlhCaGNtVmNiaUFnSUNCcFppQW9TVk5mU1U1RFRGVkVSVk1nSmlZZ1pXd2dJVDBnWld3cElIZG9hV3hsSUNoc1pXNW5kR2dnUGlCcGJtUmxlQ2tnZTF4dUlDQWdJQ0FnZG1Gc2RXVWdQU0JQVzJsdVpHVjRLeXRkTzF4dUlDQWdJQ0FnTHk4Z1pYTnNhVzUwTFdScGMyRmliR1V0Ym1WNGRDMXNhVzVsSUc1dkxYTmxiR1l0WTI5dGNHRnlaVnh1SUNBZ0lDQWdhV1lnS0haaGJIVmxJQ0U5SUhaaGJIVmxLU0J5WlhSMWNtNGdkSEoxWlR0Y2JpQWdJQ0F2THlCQmNuSmhlU05wYm1SbGVFOW1JR2xuYm05eVpYTWdhRzlzWlhNc0lFRnljbUY1STJsdVkyeDFaR1Z6SUMwZ2JtOTBYRzRnSUNBZ2ZTQmxiSE5sSUdadmNpQW9PMnhsYm1kMGFDQStJR2x1WkdWNE95QnBibVJsZUNzcktTQnBaaUFvU1ZOZlNVNURURlZFUlZNZ2ZId2dhVzVrWlhnZ2FXNGdUeWtnZTF4dUlDQWdJQ0FnYVdZZ0tFOWJhVzVrWlhoZElEMDlQU0JsYkNrZ2NtVjBkWEp1SUVsVFgwbE9RMHhWUkVWVElIeDhJR2x1WkdWNElIeDhJREE3WEc0Z0lDQWdmU0J5WlhSMWNtNGdJVWxUWDBsT1EweFZSRVZUSUNZbUlDMHhPMXh1SUNCOU8xeHVmVHRjYmlJc0lpOHZJR2RsZEhScGJtY2dkR0ZuSUdaeWIyMGdNVGt1TVM0ekxqWWdUMkpxWldOMExuQnliM1J2ZEhsd1pTNTBiMU4wY21sdVp5Z3BYRzUyWVhJZ1kyOW1JRDBnY21WeGRXbHlaU2duTGk5ZlkyOW1KeWs3WEc1MllYSWdWRUZISUQwZ2NtVnhkV2x5WlNnbkxpOWZkMnR6Snlrb0ozUnZVM1J5YVc1blZHRm5KeWs3WEc0dkx5QkZVek1nZDNKdmJtY2dhR1Z5WlZ4dWRtRnlJRUZTUnlBOUlHTnZaaWhtZFc1amRHbHZiaUFvS1NCN0lISmxkSFZ5YmlCaGNtZDFiV1Z1ZEhNN0lIMG9LU2tnUFQwZ0owRnlaM1Z0Wlc1MGN5YzdYRzVjYmk4dklHWmhiR3hpWVdOcklHWnZjaUJKUlRFeElGTmpjbWx3ZENCQlkyTmxjM01nUkdWdWFXVmtJR1Z5Y205eVhHNTJZWElnZEhKNVIyVjBJRDBnWm5WdVkzUnBiMjRnS0dsMExDQnJaWGtwSUh0Y2JpQWdkSEo1SUh0Y2JpQWdJQ0J5WlhSMWNtNGdhWFJiYTJWNVhUdGNiaUFnZlNCallYUmphQ0FvWlNrZ2V5QXZLaUJsYlhCMGVTQXFMeUI5WEc1OU8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hwZENrZ2UxeHVJQ0IyWVhJZ1R5d2dWQ3dnUWp0Y2JpQWdjbVYwZFhKdUlHbDBJRDA5UFNCMWJtUmxabWx1WldRZ1B5QW5WVzVrWldacGJtVmtKeUE2SUdsMElEMDlQU0J1ZFd4c0lEOGdKMDUxYkd3blhHNGdJQ0FnTHk4Z1FFQjBiMU4wY21sdVoxUmhaeUJqWVhObFhHNGdJQ0FnT2lCMGVYQmxiMllnS0ZRZ1BTQjBjbmxIWlhRb1R5QTlJRTlpYW1WamRDaHBkQ2tzSUZSQlJ5a3BJRDA5SUNkemRISnBibWNuSUQ4Z1ZGeHVJQ0FnSUM4dklHSjFhV3gwYVc1VVlXY2dZMkZ6WlZ4dUlDQWdJRG9nUVZKSElEOGdZMjltS0U4cFhHNGdJQ0FnTHk4Z1JWTXpJR0Z5WjNWdFpXNTBjeUJtWVd4c1ltRmphMXh1SUNBZ0lEb2dLRUlnUFNCamIyWW9UeWtwSUQwOUlDZFBZbXBsWTNRbklDWW1JSFI1Y0dWdlppQlBMbU5oYkd4bFpTQTlQU0FuWm5WdVkzUnBiMjRuSUQ4Z0owRnlaM1Z0Wlc1MGN5Y2dPaUJDTzF4dWZUdGNiaUlzSW5aaGNpQjBiMU4wY21sdVp5QTlJSHQ5TG5SdlUzUnlhVzVuTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaHBkQ2tnZTF4dUlDQnlaWFIxY200Z2RHOVRkSEpwYm1jdVkyRnNiQ2hwZENrdWMyeHBZMlVvT0N3Z0xURXBPMXh1ZlR0Y2JpSXNJblpoY2lCamIzSmxJRDBnYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0I3SUhabGNuTnBiMjQ2SUNjeUxqVXVNeWNnZlR0Y2JtbG1JQ2gwZVhCbGIyWWdYMTlsSUQwOUlDZHVkVzFpWlhJbktTQmZYMlVnUFNCamIzSmxPeUF2THlCbGMyeHBiblF0WkdsellXSnNaUzFzYVc1bElHNXZMWFZ1WkdWbVhHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNTJZWElnSkdSbFptbHVaVkJ5YjNCbGNuUjVJRDBnY21WeGRXbHlaU2duTGk5ZmIySnFaV04wTFdSd0p5azdYRzUyWVhJZ1kzSmxZWFJsUkdWell5QTlJSEpsY1hWcGNtVW9KeTR2WDNCeWIzQmxjblI1TFdSbGMyTW5LVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2IySnFaV04wTENCcGJtUmxlQ3dnZG1Gc2RXVXBJSHRjYmlBZ2FXWWdLR2x1WkdWNElHbHVJRzlpYW1WamRDa2dKR1JsWm1sdVpWQnliM0JsY25SNUxtWW9iMkpxWldOMExDQnBibVJsZUN3Z1kzSmxZWFJsUkdWell5Z3dMQ0IyWVd4MVpTa3BPMXh1SUNCbGJITmxJRzlpYW1WamRGdHBibVJsZUYwZ1BTQjJZV3gxWlR0Y2JuMDdYRzRpTENJdkx5QnZjSFJwYjI1aGJDQXZJSE5wYlhCc1pTQmpiMjUwWlhoMElHSnBibVJwYm1kY2JuWmhjaUJoUm5WdVkzUnBiMjRnUFNCeVpYRjFhWEpsS0NjdUwxOWhMV1oxYm1OMGFXOXVKeWs3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNobWJpd2dkR2hoZEN3Z2JHVnVaM1JvS1NCN1hHNGdJR0ZHZFc1amRHbHZiaWhtYmlrN1hHNGdJR2xtSUNoMGFHRjBJRDA5UFNCMWJtUmxabWx1WldRcElISmxkSFZ5YmlCbWJqdGNiaUFnYzNkcGRHTm9JQ2hzWlc1bmRHZ3BJSHRjYmlBZ0lDQmpZWE5sSURFNklISmxkSFZ5YmlCbWRXNWpkR2x2YmlBb1lTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHWnVMbU5oYkd3b2RHaGhkQ3dnWVNrN1hHNGdJQ0FnZlR0Y2JpQWdJQ0JqWVhObElESTZJSEpsZEhWeWJpQm1kVzVqZEdsdmJpQW9ZU3dnWWlrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdadUxtTmhiR3dvZEdoaGRDd2dZU3dnWWlrN1hHNGdJQ0FnZlR0Y2JpQWdJQ0JqWVhObElETTZJSEpsZEhWeWJpQm1kVzVqZEdsdmJpQW9ZU3dnWWl3Z1l5a2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHWnVMbU5oYkd3b2RHaGhkQ3dnWVN3Z1lpd2dZeWs3WEc0Z0lDQWdmVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdLQzhxSUM0dUxtRnlaM01nS2k4cElIdGNiaUFnSUNCeVpYUjFjbTRnWm00dVlYQndiSGtvZEdoaGRDd2dZWEpuZFcxbGJuUnpLVHRjYmlBZ2ZUdGNibjA3WEc0aUxDSXZMeUEzTGpJdU1TQlNaWEYxYVhKbFQySnFaV04wUTI5bGNtTnBZbXhsS0dGeVozVnRaVzUwS1Z4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUXBJSHRjYmlBZ2FXWWdLR2wwSUQwOUlIVnVaR1ZtYVc1bFpDa2dkR2h5YjNjZ1ZIbHdaVVZ5Y205eUtGd2lRMkZ1SjNRZ1kyRnNiQ0J0WlhSb2IyUWdiMjRnSUZ3aUlDc2dhWFFwTzF4dUlDQnlaWFIxY200Z2FYUTdYRzU5TzF4dUlpd2lMeThnVkdoaGJtc25jeUJKUlRnZ1ptOXlJR2hwY3lCbWRXNXVlU0JrWldacGJtVlFjbTl3WlhKMGVWeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQWhjbVZ4ZFdseVpTZ25MaTlmWm1GcGJITW5LU2htZFc1amRHbHZiaUFvS1NCN1hHNGdJSEpsZEhWeWJpQlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvZTMwc0lDZGhKeXdnZXlCblpYUTZJR1oxYm1OMGFXOXVJQ2dwSUhzZ2NtVjBkWEp1SURjN0lIMGdmU2t1WVNBaFBTQTNPMXh1ZlNrN1hHNGlMQ0oyWVhJZ2FYTlBZbXBsWTNRZ1BTQnlaWEYxYVhKbEtDY3VMMTlwY3kxdlltcGxZM1FuS1R0Y2JuWmhjaUJrYjJOMWJXVnVkQ0E5SUhKbGNYVnBjbVVvSnk0dlgyZHNiMkpoYkNjcExtUnZZM1Z0Wlc1ME8xeHVMeThnZEhsd1pXOW1JR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5RZ2FYTWdKMjlpYW1WamRDY2dhVzRnYjJ4a0lFbEZYRzUyWVhJZ2FYTWdQU0JwYzA5aWFtVmpkQ2hrYjJOMWJXVnVkQ2tnSmlZZ2FYTlBZbXBsWTNRb1pHOWpkVzFsYm5RdVkzSmxZWFJsUld4bGJXVnVkQ2s3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNocGRDa2dlMXh1SUNCeVpYUjFjbTRnYVhNZ1B5QmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0dsMEtTQTZJSHQ5TzF4dWZUdGNiaUlzSWk4dklFbEZJRGd0SUdSdmJpZDBJR1Z1ZFcwZ1luVm5JR3RsZVhOY2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ0tGeHVJQ0FuWTI5dWMzUnlkV04wYjNJc2FHRnpUM2R1VUhKdmNHVnlkSGtzYVhOUWNtOTBiM1I1Y0dWUFppeHdjbTl3WlhKMGVVbHpSVzUxYldWeVlXSnNaU3gwYjB4dlkyRnNaVk4wY21sdVp5eDBiMU4wY21sdVp5eDJZV3gxWlU5bUoxeHVLUzV6Y0d4cGRDZ25MQ2NwTzF4dUlpd2lkbUZ5SUdkc2IySmhiQ0E5SUhKbGNYVnBjbVVvSnk0dlgyZHNiMkpoYkNjcE8xeHVkbUZ5SUdOdmNtVWdQU0J5WlhGMWFYSmxLQ2N1TDE5amIzSmxKeWs3WEc1MllYSWdZM1I0SUQwZ2NtVnhkV2x5WlNnbkxpOWZZM1I0SnlrN1hHNTJZWElnYUdsa1pTQTlJSEpsY1hWcGNtVW9KeTR2WDJocFpHVW5LVHRjYm5aaGNpQlFVazlVVDFSWlVFVWdQU0FuY0hKdmRHOTBlWEJsSnp0Y2JseHVkbUZ5SUNSbGVIQnZjblFnUFNCbWRXNWpkR2x2YmlBb2RIbHdaU3dnYm1GdFpTd2djMjkxY21ObEtTQjdYRzRnSUhaaGNpQkpVMTlHVDFKRFJVUWdQU0IwZVhCbElDWWdKR1Y0Y0c5eWRDNUdPMXh1SUNCMllYSWdTVk5mUjB4UFFrRk1JRDBnZEhsd1pTQW1JQ1JsZUhCdmNuUXVSenRjYmlBZ2RtRnlJRWxUWDFOVVFWUkpReUE5SUhSNWNHVWdKaUFrWlhod2IzSjBMbE03WEc0Z0lIWmhjaUJKVTE5UVVrOVVUeUE5SUhSNWNHVWdKaUFrWlhod2IzSjBMbEE3WEc0Z0lIWmhjaUJKVTE5Q1NVNUVJRDBnZEhsd1pTQW1JQ1JsZUhCdmNuUXVRanRjYmlBZ2RtRnlJRWxUWDFkU1FWQWdQU0IwZVhCbElDWWdKR1Y0Y0c5eWRDNVhPMXh1SUNCMllYSWdaWGh3YjNKMGN5QTlJRWxUWDBkTVQwSkJUQ0EvSUdOdmNtVWdPaUJqYjNKbFcyNWhiV1ZkSUh4OElDaGpiM0psVzI1aGJXVmRJRDBnZTMwcE8xeHVJQ0IyWVhJZ1pYaHdVSEp2ZEc4Z1BTQmxlSEJ2Y25SelcxQlNUMVJQVkZsUVJWMDdYRzRnSUhaaGNpQjBZWEpuWlhRZ1BTQkpVMTlIVEU5Q1FVd2dQeUJuYkc5aVlXd2dPaUJKVTE5VFZFRlVTVU1nUHlCbmJHOWlZV3hiYm1GdFpWMGdPaUFvWjJ4dlltRnNXMjVoYldWZElIeDhJSHQ5S1Z0UVVrOVVUMVJaVUVWZE8xeHVJQ0IyWVhJZ2EyVjVMQ0J2ZDI0c0lHOTFkRHRjYmlBZ2FXWWdLRWxUWDBkTVQwSkJUQ2tnYzI5MWNtTmxJRDBnYm1GdFpUdGNiaUFnWm05eUlDaHJaWGtnYVc0Z2MyOTFjbU5sS1NCN1hHNGdJQ0FnTHk4Z1kyOXVkR0ZwYm5NZ2FXNGdibUYwYVhabFhHNGdJQ0FnYjNkdUlEMGdJVWxUWDBaUFVrTkZSQ0FtSmlCMFlYSm5aWFFnSmlZZ2RHRnlaMlYwVzJ0bGVWMGdJVDA5SUhWdVpHVm1hVzVsWkR0Y2JpQWdJQ0JwWmlBb2IzZHVJQ1ltSUd0bGVTQnBiaUJsZUhCdmNuUnpLU0JqYjI1MGFXNTFaVHRjYmlBZ0lDQXZMeUJsZUhCdmNuUWdibUYwYVhabElHOXlJSEJoYzNObFpGeHVJQ0FnSUc5MWRDQTlJRzkzYmlBL0lIUmhjbWRsZEZ0clpYbGRJRG9nYzI5MWNtTmxXMnRsZVYwN1hHNGdJQ0FnTHk4Z2NISmxkbVZ1ZENCbmJHOWlZV3dnY0c5c2JIVjBhVzl1SUdadmNpQnVZVzFsYzNCaFkyVnpYRzRnSUNBZ1pYaHdiM0owYzF0clpYbGRJRDBnU1ZOZlIweFBRa0ZNSUNZbUlIUjVjR1Z2WmlCMFlYSm5aWFJiYTJWNVhTQWhQU0FuWm5WdVkzUnBiMjRuSUQ4Z2MyOTFjbU5sVzJ0bGVWMWNiaUFnSUNBdkx5QmlhVzVrSUhScGJXVnljeUIwYnlCbmJHOWlZV3dnWm05eUlHTmhiR3dnWm5KdmJTQmxlSEJ2Y25RZ1kyOXVkR1Y0ZEZ4dUlDQWdJRG9nU1ZOZlFrbE9SQ0FtSmlCdmQyNGdQeUJqZEhnb2IzVjBMQ0JuYkc5aVlXd3BYRzRnSUNBZ0x5OGdkM0poY0NCbmJHOWlZV3dnWTI5dWMzUnlkV04wYjNKeklHWnZjaUJ3Y21WMlpXNTBJR05vWVc1blpTQjBhR1Z0SUdsdUlHeHBZbkpoY25sY2JpQWdJQ0E2SUVsVFgxZFNRVkFnSmlZZ2RHRnlaMlYwVzJ0bGVWMGdQVDBnYjNWMElEOGdLR1oxYm1OMGFXOXVJQ2hES1NCN1hHNGdJQ0FnSUNCMllYSWdSaUE5SUdaMWJtTjBhVzl1SUNoaExDQmlMQ0JqS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2gwYUdseklHbHVjM1JoYm1ObGIyWWdReWtnZTF4dUlDQWdJQ0FnSUNBZ0lITjNhWFJqYUNBb1lYSm5kVzFsYm5SekxteGxibWQwYUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWTJGelpTQXdPaUJ5WlhSMWNtNGdibVYzSUVNb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOaGMyVWdNVG9nY21WMGRYSnVJRzVsZHlCREtHRXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRnpaU0F5T2lCeVpYUjFjbTRnYm1WM0lFTW9ZU3dnWWlrN1hHNGdJQ0FnSUNBZ0lDQWdmU0J5WlhSMWNtNGdibVYzSUVNb1lTd2dZaXdnWXlrN1hHNGdJQ0FnSUNBZ0lIMGdjbVYwZFhKdUlFTXVZWEJ3Ykhrb2RHaHBjeXdnWVhKbmRXMWxiblJ6S1R0Y2JpQWdJQ0FnSUgwN1hHNGdJQ0FnSUNCR1cxQlNUMVJQVkZsUVJWMGdQU0JEVzFCU1QxUlBWRmxRUlYwN1hHNGdJQ0FnSUNCeVpYUjFjbTRnUmp0Y2JpQWdJQ0F2THlCdFlXdGxJSE4wWVhScFl5QjJaWEp6YVc5dWN5Qm1iM0lnY0hKdmRHOTBlWEJsSUcxbGRHaHZaSE5jYmlBZ0lDQjlLU2h2ZFhRcElEb2dTVk5mVUZKUFZFOGdKaVlnZEhsd1pXOW1JRzkxZENBOVBTQW5ablZ1WTNScGIyNG5JRDhnWTNSNEtFWjFibU4wYVc5dUxtTmhiR3dzSUc5MWRDa2dPaUJ2ZFhRN1hHNGdJQ0FnTHk4Z1pYaHdiM0owSUhCeWIzUnZJRzFsZEdodlpITWdkRzhnWTI5eVpTNGxRMDlPVTFSU1ZVTlVUMUlsTG0xbGRHaHZaSE11SlU1QlRVVWxYRzRnSUNBZ2FXWWdLRWxUWDFCU1QxUlBLU0I3WEc0Z0lDQWdJQ0FvWlhod2IzSjBjeTUyYVhKMGRXRnNJSHg4SUNobGVIQnZjblJ6TG5acGNuUjFZV3dnUFNCN2ZTa3BXMnRsZVYwZ1BTQnZkWFE3WEc0Z0lDQWdJQ0F2THlCbGVIQnZjblFnY0hKdmRHOGdiV1YwYUc5a2N5QjBieUJqYjNKbExpVkRUMDVUVkZKVlExUlBVaVV1Y0hKdmRHOTBlWEJsTGlWT1FVMUZKVnh1SUNBZ0lDQWdhV1lnS0hSNWNHVWdKaUFrWlhod2IzSjBMbElnSmlZZ1pYaHdVSEp2ZEc4Z0ppWWdJV1Y0Y0ZCeWIzUnZXMnRsZVYwcElHaHBaR1VvWlhod1VISnZkRzhzSUd0bGVTd2diM1YwS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibjA3WEc0dkx5QjBlWEJsSUdKcGRHMWhjRnh1SkdWNGNHOXlkQzVHSUQwZ01Uc2dJQ0F2THlCbWIzSmpaV1JjYmlSbGVIQnZjblF1UnlBOUlESTdJQ0FnTHk4Z1oyeHZZbUZzWEc0a1pYaHdiM0owTGxNZ1BTQTBPeUFnSUM4dklITjBZWFJwWTF4dUpHVjRjRzl5ZEM1UUlEMGdPRHNnSUNBdkx5QndjbTkwYjF4dUpHVjRjRzl5ZEM1Q0lEMGdNVFk3SUNBdkx5QmlhVzVrWEc0a1pYaHdiM0owTGxjZ1BTQXpNanNnSUM4dklIZHlZWEJjYmlSbGVIQnZjblF1VlNBOUlEWTBPeUFnTHk4Z2MyRm1aVnh1SkdWNGNHOXlkQzVTSUQwZ01USTRPeUF2THlCeVpXRnNJSEJ5YjNSdklHMWxkR2h2WkNCbWIzSWdZR3hwWW5KaGNubGdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJQ1JsZUhCdmNuUTdYRzRpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNobGVHVmpLU0I3WEc0Z0lIUnllU0I3WEc0Z0lDQWdjbVYwZFhKdUlDRWhaWGhsWXlncE8xeHVJQ0I5SUdOaGRHTm9JQ2hsS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJ5ZFdVN1hHNGdJSDFjYm4wN1hHNGlMQ0l2THlCb2RIUndjem92TDJkcGRHaDFZaTVqYjIwdmVteHZhWEp2WTJzdlkyOXlaUzFxY3k5cGMzTjFaWE12T0RZamFYTnpkV1ZqYjIxdFpXNTBMVEV4TlRjMU9UQXlPRnh1ZG1GeUlHZHNiMkpoYkNBOUlHMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2RIbHdaVzltSUhkcGJtUnZkeUFoUFNBbmRXNWtaV1pwYm1Wa0p5QW1KaUIzYVc1a2IzY3VUV0YwYUNBOVBTQk5ZWFJvWEc0Z0lEOGdkMmx1Wkc5M0lEb2dkSGx3Wlc5bUlITmxiR1lnSVQwZ0ozVnVaR1ZtYVc1bFpDY2dKaVlnYzJWc1ppNU5ZWFJvSUQwOUlFMWhkR2dnUHlCelpXeG1YRzRnSUM4dklHVnpiR2x1ZEMxa2FYTmhZbXhsTFc1bGVIUXRiR2x1WlNCdWJ5MXVaWGN0Wm5WdVkxeHVJQ0E2SUVaMWJtTjBhVzl1S0NkeVpYUjFjbTRnZEdocGN5Y3BLQ2s3WEc1cFppQW9kSGx3Wlc5bUlGOWZaeUE5UFNBbmJuVnRZbVZ5SnlrZ1gxOW5JRDBnWjJ4dlltRnNPeUF2THlCbGMyeHBiblF0WkdsellXSnNaUzFzYVc1bElHNXZMWFZ1WkdWbVhHNGlMQ0oyWVhJZ2FHRnpUM2R1VUhKdmNHVnlkSGtnUFNCN2ZTNW9ZWE5QZDI1UWNtOXdaWEowZVR0Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z0tHbDBMQ0JyWlhrcElIdGNiaUFnY21WMGRYSnVJR2hoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYVhRc0lHdGxlU2s3WEc1OU8xeHVJaXdpZG1GeUlHUlFJRDBnY21WeGRXbHlaU2duTGk5ZmIySnFaV04wTFdSd0p5azdYRzUyWVhJZ1kzSmxZWFJsUkdWell5QTlJSEpsY1hWcGNtVW9KeTR2WDNCeWIzQmxjblI1TFdSbGMyTW5LVHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21WeGRXbHlaU2duTGk5ZlpHVnpZM0pwY0hSdmNuTW5LU0EvSUdaMWJtTjBhVzl1SUNodlltcGxZM1FzSUd0bGVTd2dkbUZzZFdVcElIdGNiaUFnY21WMGRYSnVJR1JRTG1Zb2IySnFaV04wTENCclpYa3NJR055WldGMFpVUmxjMk1vTVN3Z2RtRnNkV1VwS1R0Y2JuMGdPaUJtZFc1amRHbHZiaUFvYjJKcVpXTjBMQ0JyWlhrc0lIWmhiSFZsS1NCN1hHNGdJRzlpYW1WamRGdHJaWGxkSUQwZ2RtRnNkV1U3WEc0Z0lISmxkSFZ5YmlCdlltcGxZM1E3WEc1OU8xeHVJaXdpZG1GeUlHUnZZM1Z0Wlc1MElEMGdjbVZ4ZFdseVpTZ25MaTlmWjJ4dlltRnNKeWt1Wkc5amRXMWxiblE3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdSdlkzVnRaVzUwSUNZbUlHUnZZM1Z0Wlc1MExtUnZZM1Z0Wlc1MFJXeGxiV1Z1ZER0Y2JpSXNJbTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdJWEpsY1hWcGNtVW9KeTR2WDJSbGMyTnlhWEIwYjNKekp5a2dKaVlnSVhKbGNYVnBjbVVvSnk0dlgyWmhhV3h6Snlrb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCeVpYUjFjbTRnVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtISmxjWFZwY21Vb0p5NHZYMlJ2YlMxamNtVmhkR1VuS1NnblpHbDJKeWtzSUNkaEp5d2dleUJuWlhRNklHWjFibU4wYVc5dUlDZ3BJSHNnY21WMGRYSnVJRGM3SUgwZ2ZTa3VZU0FoUFNBM08xeHVmU2s3WEc0aUxDSXZMeUJtWVd4c1ltRmpheUJtYjNJZ2JtOXVMV0Z5Y21GNUxXeHBhMlVnUlZNeklHRnVaQ0J1YjI0dFpXNTFiV1Z5WVdKc1pTQnZiR1FnVmpnZ2MzUnlhVzVuYzF4dWRtRnlJR052WmlBOUlISmxjWFZwY21Vb0p5NHZYMk52WmljcE8xeHVMeThnWlhOc2FXNTBMV1JwYzJGaWJHVXRibVY0ZEMxc2FXNWxJRzV2TFhCeWIzUnZkSGx3WlMxaWRXbHNkR2x1YzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCUFltcGxZM1FvSjNvbktTNXdjbTl3WlhKMGVVbHpSVzUxYldWeVlXSnNaU2d3S1NBL0lFOWlhbVZqZENBNklHWjFibU4wYVc5dUlDaHBkQ2tnZTF4dUlDQnlaWFIxY200Z1kyOW1LR2wwS1NBOVBTQW5VM1J5YVc1bkp5QS9JR2wwTG5Od2JHbDBLQ2NuS1NBNklFOWlhbVZqZENocGRDazdYRzU5TzF4dUlpd2lMeThnWTJobFkyc2diMjRnWkdWbVlYVnNkQ0JCY25KaGVTQnBkR1Z5WVhSdmNseHVkbUZ5SUVsMFpYSmhkRzl5Y3lBOUlISmxjWFZwY21Vb0p5NHZYMmwwWlhKaGRHOXljeWNwTzF4dWRtRnlJRWxVUlZKQlZFOVNJRDBnY21WeGRXbHlaU2duTGk5ZmQydHpKeWtvSjJsMFpYSmhkRzl5SnlrN1hHNTJZWElnUVhKeVlYbFFjbTkwYnlBOUlFRnljbUY1TG5CeWIzUnZkSGx3WlR0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9hWFFwSUh0Y2JpQWdjbVYwZFhKdUlHbDBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdLRWwwWlhKaGRHOXljeTVCY25KaGVTQTlQVDBnYVhRZ2ZId2dRWEp5WVhsUWNtOTBiMXRKVkVWU1FWUlBVbDBnUFQwOUlHbDBLVHRjYm4wN1hHNGlMQ0p0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hwZENrZ2UxeHVJQ0J5WlhSMWNtNGdkSGx3Wlc5bUlHbDBJRDA5UFNBbmIySnFaV04wSnlBL0lHbDBJQ0U5UFNCdWRXeHNJRG9nZEhsd1pXOW1JR2wwSUQwOVBTQW5ablZ1WTNScGIyNG5PMXh1ZlR0Y2JpSXNJaTh2SUdOaGJHd2djMjl0WlhSb2FXNW5JRzl1SUdsMFpYSmhkRzl5SUhOMFpYQWdkMmwwYUNCellXWmxJR05zYjNOcGJtY2diMjRnWlhKeWIzSmNiblpoY2lCaGJrOWlhbVZqZENBOUlISmxjWFZwY21Vb0p5NHZYMkZ1TFc5aWFtVmpkQ2NwTzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUmxjbUYwYjNJc0lHWnVMQ0IyWVd4MVpTd2daVzUwY21sbGN5a2dlMXh1SUNCMGNua2dlMXh1SUNBZ0lISmxkSFZ5YmlCbGJuUnlhV1Z6SUQ4Z1ptNG9ZVzVQWW1wbFkzUW9kbUZzZFdVcFd6QmRMQ0IyWVd4MVpWc3hYU2tnT2lCbWJpaDJZV3gxWlNrN1hHNGdJQzh2SURjdU5DNDJJRWwwWlhKaGRHOXlRMnh2YzJVb2FYUmxjbUYwYjNJc0lHTnZiWEJzWlhScGIyNHBYRzRnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNCMllYSWdjbVYwSUQwZ2FYUmxjbUYwYjNKYkozSmxkSFZ5YmlkZE8xeHVJQ0FnSUdsbUlDaHlaWFFnSVQwOUlIVnVaR1ZtYVc1bFpDa2dZVzVQWW1wbFkzUW9jbVYwTG1OaGJHd29hWFJsY21GMGIzSXBLVHRjYmlBZ0lDQjBhSEp2ZHlCbE8xeHVJQ0I5WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVkbUZ5SUdOeVpXRjBaU0E5SUhKbGNYVnBjbVVvSnk0dlgyOWlhbVZqZEMxamNtVmhkR1VuS1R0Y2JuWmhjaUJrWlhOamNtbHdkRzl5SUQwZ2NtVnhkV2x5WlNnbkxpOWZjSEp2Y0dWeWRIa3RaR1Z6WXljcE8xeHVkbUZ5SUhObGRGUnZVM1J5YVc1blZHRm5JRDBnY21WeGRXbHlaU2duTGk5ZmMyVjBMWFJ2TFhOMGNtbHVaeTEwWVdjbktUdGNiblpoY2lCSmRHVnlZWFJ2Y2xCeWIzUnZkSGx3WlNBOUlIdDlPMXh1WEc0dkx5QXlOUzR4TGpJdU1TNHhJQ1ZKZEdWeVlYUnZjbEJ5YjNSdmRIbHdaU1ZiUUVCcGRHVnlZWFJ2Y2wwb0tWeHVjbVZ4ZFdseVpTZ25MaTlmYUdsa1pTY3BLRWwwWlhKaGRHOXlVSEp2ZEc5MGVYQmxMQ0J5WlhGMWFYSmxLQ2N1TDE5M2EzTW5LU2duYVhSbGNtRjBiM0luS1N3Z1puVnVZM1JwYjI0Z0tDa2dleUJ5WlhSMWNtNGdkR2hwY3pzZ2ZTazdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0VOdmJuTjBjblZqZEc5eUxDQk9RVTFGTENCdVpYaDBLU0I3WEc0Z0lFTnZibk4wY25WamRHOXlMbkJ5YjNSdmRIbHdaU0E5SUdOeVpXRjBaU2hKZEdWeVlYUnZjbEJ5YjNSdmRIbHdaU3dnZXlCdVpYaDBPaUJrWlhOamNtbHdkRzl5S0RFc0lHNWxlSFFwSUgwcE8xeHVJQ0J6WlhSVWIxTjBjbWx1WjFSaFp5aERiMjV6ZEhKMVkzUnZjaXdnVGtGTlJTQXJJQ2NnU1hSbGNtRjBiM0luS1R0Y2JuMDdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzUyWVhJZ1RFbENVa0ZTV1NBOUlISmxjWFZwY21Vb0p5NHZYMnhwWW5KaGNua25LVHRjYm5aaGNpQWtaWGh3YjNKMElEMGdjbVZ4ZFdseVpTZ25MaTlmWlhod2IzSjBKeWs3WEc1MllYSWdjbVZrWldacGJtVWdQU0J5WlhGMWFYSmxLQ2N1TDE5eVpXUmxabWx1WlNjcE8xeHVkbUZ5SUdocFpHVWdQU0J5WlhGMWFYSmxLQ2N1TDE5b2FXUmxKeWs3WEc1MllYSWdhR0Z6SUQwZ2NtVnhkV2x5WlNnbkxpOWZhR0Z6SnlrN1hHNTJZWElnU1hSbGNtRjBiM0p6SUQwZ2NtVnhkV2x5WlNnbkxpOWZhWFJsY21GMGIzSnpKeWs3WEc1MllYSWdKR2wwWlhKRGNtVmhkR1VnUFNCeVpYRjFhWEpsS0NjdUwxOXBkR1Z5TFdOeVpXRjBaU2NwTzF4dWRtRnlJSE5sZEZSdlUzUnlhVzVuVkdGbklEMGdjbVZ4ZFdseVpTZ25MaTlmYzJWMExYUnZMWE4wY21sdVp5MTBZV2NuS1R0Y2JuWmhjaUJuWlhSUWNtOTBiM1I1Y0dWUFppQTlJSEpsY1hWcGNtVW9KeTR2WDI5aWFtVmpkQzFuY0c4bktUdGNiblpoY2lCSlZFVlNRVlJQVWlBOUlISmxjWFZwY21Vb0p5NHZYM2RyY3ljcEtDZHBkR1Z5WVhSdmNpY3BPMXh1ZG1GeUlFSlZSMGRaSUQwZ0lTaGJYUzVyWlhseklDWW1JQ2R1WlhoMEp5QnBiaUJiWFM1clpYbHpLQ2twT3lBdkx5QlRZV1poY21rZ2FHRnpJR0oxWjJkNUlHbDBaWEpoZEc5eWN5QjNMMjhnWUc1bGVIUmdYRzUyWVhJZ1JrWmZTVlJGVWtGVVQxSWdQU0FuUUVCcGRHVnlZWFJ2Y2ljN1hHNTJZWElnUzBWWlV5QTlJQ2RyWlhsekp6dGNiblpoY2lCV1FVeFZSVk1nUFNBbmRtRnNkV1Z6Snp0Y2JseHVkbUZ5SUhKbGRIVnlibFJvYVhNZ1BTQm1kVzVqZEdsdmJpQW9LU0I3SUhKbGRIVnliaUIwYUdsek95QjlPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNoQ1lYTmxMQ0JPUVUxRkxDQkRiMjV6ZEhKMVkzUnZjaXdnYm1WNGRDd2dSRVZHUVZWTVZDd2dTVk5mVTBWVUxDQkdUMUpEUlVRcElIdGNiaUFnSkdsMFpYSkRjbVZoZEdVb1EyOXVjM1J5ZFdOMGIzSXNJRTVCVFVVc0lHNWxlSFFwTzF4dUlDQjJZWElnWjJWMFRXVjBhRzlrSUQwZ1puVnVZM1JwYjI0Z0tHdHBibVFwSUh0Y2JpQWdJQ0JwWmlBb0lVSlZSMGRaSUNZbUlHdHBibVFnYVc0Z2NISnZkRzhwSUhKbGRIVnliaUJ3Y205MGIxdHJhVzVrWFR0Y2JpQWdJQ0J6ZDJsMFkyZ2dLR3RwYm1RcElIdGNiaUFnSUNBZ0lHTmhjMlVnUzBWWlV6b2djbVYwZFhKdUlHWjFibU4wYVc5dUlHdGxlWE1vS1NCN0lISmxkSFZ5YmlCdVpYY2dRMjl1YzNSeWRXTjBiM0lvZEdocGN5d2dhMmx1WkNrN0lIMDdYRzRnSUNBZ0lDQmpZWE5sSUZaQlRGVkZVem9nY21WMGRYSnVJR1oxYm1OMGFXOXVJSFpoYkhWbGN5Z3BJSHNnY21WMGRYSnVJRzVsZHlCRGIyNXpkSEoxWTNSdmNpaDBhR2x6TENCcmFXNWtLVHNnZlR0Y2JpQWdJQ0I5SUhKbGRIVnliaUJtZFc1amRHbHZiaUJsYm5SeWFXVnpLQ2tnZXlCeVpYUjFjbTRnYm1WM0lFTnZibk4wY25WamRHOXlLSFJvYVhNc0lHdHBibVFwT3lCOU8xeHVJQ0I5TzF4dUlDQjJZWElnVkVGSElEMGdUa0ZOUlNBcklDY2dTWFJsY21GMGIzSW5PMXh1SUNCMllYSWdSRVZHWDFaQlRGVkZVeUE5SUVSRlJrRlZURlFnUFQwZ1ZrRk1WVVZUTzF4dUlDQjJZWElnVmtGTVZVVlRYMEpWUnlBOUlHWmhiSE5sTzF4dUlDQjJZWElnY0hKdmRHOGdQU0JDWVhObExuQnliM1J2ZEhsd1pUdGNiaUFnZG1GeUlDUnVZWFJwZG1VZ1BTQndjbTkwYjF0SlZFVlNRVlJQVWwwZ2ZId2djSEp2ZEc5YlJrWmZTVlJGVWtGVVQxSmRJSHg4SUVSRlJrRlZURlFnSmlZZ2NISnZkRzliUkVWR1FWVk1WRjA3WEc0Z0lIWmhjaUFrWkdWbVlYVnNkQ0E5SUNnaFFsVkhSMWtnSmlZZ0pHNWhkR2wyWlNrZ2ZId2daMlYwVFdWMGFHOWtLRVJGUmtGVlRGUXBPMXh1SUNCMllYSWdKR1Z1ZEhKcFpYTWdQU0JFUlVaQlZVeFVJRDhnSVVSRlJsOVdRVXhWUlZNZ1B5QWtaR1ZtWVhWc2RDQTZJR2RsZEUxbGRHaHZaQ2duWlc1MGNtbGxjeWNwSURvZ2RXNWtaV1pwYm1Wa08xeHVJQ0IyWVhJZ0pHRnVlVTVoZEdsMlpTQTlJRTVCVFVVZ1BUMGdKMEZ5Y21GNUp5QS9JSEJ5YjNSdkxtVnVkSEpwWlhNZ2ZId2dKRzVoZEdsMlpTQTZJQ1J1WVhScGRtVTdYRzRnSUhaaGNpQnRaWFJvYjJSekxDQnJaWGtzSUVsMFpYSmhkRzl5VUhKdmRHOTBlWEJsTzF4dUlDQXZMeUJHYVhnZ2JtRjBhWFpsWEc0Z0lHbG1JQ2drWVc1NVRtRjBhWFpsS1NCN1hHNGdJQ0FnU1hSbGNtRjBiM0pRY205MGIzUjVjR1VnUFNCblpYUlFjbTkwYjNSNWNHVlBaaWdrWVc1NVRtRjBhWFpsTG1OaGJHd29ibVYzSUVKaGMyVW9LU2twTzF4dUlDQWdJR2xtSUNoSmRHVnlZWFJ2Y2xCeWIzUnZkSGx3WlNBaFBUMGdUMkpxWldOMExuQnliM1J2ZEhsd1pTQW1KaUJKZEdWeVlYUnZjbEJ5YjNSdmRIbHdaUzV1WlhoMEtTQjdYRzRnSUNBZ0lDQXZMeUJUWlhRZ1FFQjBiMU4wY21sdVoxUmhaeUIwYnlCdVlYUnBkbVVnYVhSbGNtRjBiM0p6WEc0Z0lDQWdJQ0J6WlhSVWIxTjBjbWx1WjFSaFp5aEpkR1Z5WVhSdmNsQnliM1J2ZEhsd1pTd2dWRUZITENCMGNuVmxLVHRjYmlBZ0lDQWdJQzh2SUdacGVDQm1iM0lnYzI5dFpTQnZiR1FnWlc1bmFXNWxjMXh1SUNBZ0lDQWdhV1lnS0NGTVNVSlNRVkpaSUNZbUlDRm9ZWE1vU1hSbGNtRjBiM0pRY205MGIzUjVjR1VzSUVsVVJWSkJWRTlTS1NrZ2FHbGtaU2hKZEdWeVlYUnZjbEJ5YjNSdmRIbHdaU3dnU1ZSRlVrRlVUMUlzSUhKbGRIVnlibFJvYVhNcE8xeHVJQ0FnSUgxY2JpQWdmVnh1SUNBdkx5Qm1hWGdnUVhKeVlYa2plM1poYkhWbGN5d2dRRUJwZEdWeVlYUnZjbjB1Ym1GdFpTQnBiaUJXT0NBdklFWkdYRzRnSUdsbUlDaEVSVVpmVmtGTVZVVlRJQ1ltSUNSdVlYUnBkbVVnSmlZZ0pHNWhkR2wyWlM1dVlXMWxJQ0U5UFNCV1FVeFZSVk1wSUh0Y2JpQWdJQ0JXUVV4VlJWTmZRbFZISUQwZ2RISjFaVHRjYmlBZ0lDQWtaR1ZtWVhWc2RDQTlJR1oxYm1OMGFXOXVJSFpoYkhWbGN5Z3BJSHNnY21WMGRYSnVJQ1J1WVhScGRtVXVZMkZzYkNoMGFHbHpLVHNnZlR0Y2JpQWdmVnh1SUNBdkx5QkVaV1pwYm1VZ2FYUmxjbUYwYjNKY2JpQWdhV1lnS0NnaFRFbENVa0ZTV1NCOGZDQkdUMUpEUlVRcElDWW1JQ2hDVlVkSFdTQjhmQ0JXUVV4VlJWTmZRbFZISUh4OElDRndjbTkwYjF0SlZFVlNRVlJQVWwwcEtTQjdYRzRnSUNBZ2FHbGtaU2h3Y205MGJ5d2dTVlJGVWtGVVQxSXNJQ1JrWldaaGRXeDBLVHRjYmlBZ2ZWeHVJQ0F2THlCUWJIVm5JR1p2Y2lCc2FXSnlZWEo1WEc0Z0lFbDBaWEpoZEc5eWMxdE9RVTFGWFNBOUlDUmtaV1poZFd4ME8xeHVJQ0JKZEdWeVlYUnZjbk5iVkVGSFhTQTlJSEpsZEhWeWJsUm9hWE03WEc0Z0lHbG1JQ2hFUlVaQlZVeFVLU0I3WEc0Z0lDQWdiV1YwYUc5a2N5QTlJSHRjYmlBZ0lDQWdJSFpoYkhWbGN6b2dSRVZHWDFaQlRGVkZVeUEvSUNSa1pXWmhkV3gwSURvZ1oyVjBUV1YwYUc5a0tGWkJURlZGVXlrc1hHNGdJQ0FnSUNCclpYbHpPaUJKVTE5VFJWUWdQeUFrWkdWbVlYVnNkQ0E2SUdkbGRFMWxkR2h2WkNoTFJWbFRLU3hjYmlBZ0lDQWdJR1Z1ZEhKcFpYTTZJQ1JsYm5SeWFXVnpYRzRnSUNBZ2ZUdGNiaUFnSUNCcFppQW9SazlTUTBWRUtTQm1iM0lnS0d0bGVTQnBiaUJ0WlhSb2IyUnpLU0I3WEc0Z0lDQWdJQ0JwWmlBb0lTaHJaWGtnYVc0Z2NISnZkRzhwS1NCeVpXUmxabWx1WlNod2NtOTBieXdnYTJWNUxDQnRaWFJvYjJSelcydGxlVjBwTzF4dUlDQWdJSDBnWld4elpTQWtaWGh3YjNKMEtDUmxlSEJ2Y25RdVVDQXJJQ1JsZUhCdmNuUXVSaUFxSUNoQ1ZVZEhXU0I4ZkNCV1FVeFZSVk5mUWxWSEtTd2dUa0ZOUlN3Z2JXVjBhRzlrY3lrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUcxbGRHaHZaSE03WEc1OU8xeHVJaXdpZG1GeUlFbFVSVkpCVkU5U0lEMGdjbVZ4ZFdseVpTZ25MaTlmZDJ0ekp5a29KMmwwWlhKaGRHOXlKeWs3WEc1MllYSWdVMEZHUlY5RFRFOVRTVTVISUQwZ1ptRnNjMlU3WEc1Y2JuUnllU0I3WEc0Z0lIWmhjaUJ5YVhSbGNpQTlJRnMzWFZ0SlZFVlNRVlJQVWwwb0tUdGNiaUFnY21sMFpYSmJKM0psZEhWeWJpZGRJRDBnWm5WdVkzUnBiMjRnS0NrZ2V5QlRRVVpGWDBOTVQxTkpUa2NnUFNCMGNuVmxPeUI5TzF4dUlDQXZMeUJsYzJ4cGJuUXRaR2x6WVdKc1pTMXVaWGgwTFd4cGJtVWdibTh0ZEdoeWIzY3RiR2wwWlhKaGJGeHVJQ0JCY25KaGVTNW1jbTl0S0hKcGRHVnlMQ0JtZFc1amRHbHZiaUFvS1NCN0lIUm9jbTkzSURJN0lIMHBPMXh1ZlNCallYUmphQ0FvWlNrZ2V5QXZLaUJsYlhCMGVTQXFMeUI5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z0tHVjRaV01zSUhOcmFYQkRiRzl6YVc1bktTQjdYRzRnSUdsbUlDZ2hjMnRwY0VOc2IzTnBibWNnSmlZZ0lWTkJSa1ZmUTB4UFUwbE9SeWtnY21WMGRYSnVJR1poYkhObE8xeHVJQ0IyWVhJZ2MyRm1aU0E5SUdaaGJITmxPMXh1SUNCMGNua2dlMXh1SUNBZ0lIWmhjaUJoY25JZ1BTQmJOMTA3WEc0Z0lDQWdkbUZ5SUdsMFpYSWdQU0JoY25KYlNWUkZVa0ZVVDFKZEtDazdYRzRnSUNBZ2FYUmxjaTV1WlhoMElEMGdablZ1WTNScGIyNGdLQ2tnZXlCeVpYUjFjbTRnZXlCa2IyNWxPaUJ6WVdabElEMGdkSEoxWlNCOU95QjlPMXh1SUNBZ0lHRnljbHRKVkVWU1FWUlBVbDBnUFNCbWRXNWpkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQnBkR1Z5T3lCOU8xeHVJQ0FnSUdWNFpXTW9ZWEp5S1R0Y2JpQWdmU0JqWVhSamFDQW9aU2tnZXlBdktpQmxiWEIwZVNBcUx5QjlYRzRnSUhKbGRIVnliaUJ6WVdabE8xeHVmVHRjYmlJc0ltMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2UzMDdYRzRpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhSeWRXVTdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzR2THlBeE9TNHhMakl1TVNCUFltcGxZM1F1WVhOemFXZHVLSFJoY21kbGRDd2djMjkxY21ObExDQXVMaTRwWEc1MllYSWdaMlYwUzJWNWN5QTlJSEpsY1hWcGNtVW9KeTR2WDI5aWFtVmpkQzFyWlhsekp5azdYRzUyWVhJZ1owOVFVeUE5SUhKbGNYVnBjbVVvSnk0dlgyOWlhbVZqZEMxbmIzQnpKeWs3WEc1MllYSWdjRWxGSUQwZ2NtVnhkV2x5WlNnbkxpOWZiMkpxWldOMExYQnBaU2NwTzF4dWRtRnlJSFJ2VDJKcVpXTjBJRDBnY21WeGRXbHlaU2duTGk5ZmRHOHRiMkpxWldOMEp5azdYRzUyWVhJZ1NVOWlhbVZqZENBOUlISmxjWFZwY21Vb0p5NHZYMmx2WW1wbFkzUW5LVHRjYm5aaGNpQWtZWE56YVdkdUlEMGdUMkpxWldOMExtRnpjMmxuYmp0Y2JseHVMeThnYzJodmRXeGtJSGR2Y21zZ2QybDBhQ0J6ZVcxaWIyeHpJR0Z1WkNCemFHOTFiR1FnYUdGMlpTQmtaWFJsY20xcGJtbHpkR2xqSUhCeWIzQmxjblI1SUc5eVpHVnlJQ2hXT0NCaWRXY3BYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJQ0VrWVhOemFXZHVJSHg4SUhKbGNYVnBjbVVvSnk0dlgyWmhhV3h6Snlrb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCMllYSWdRU0E5SUh0OU8xeHVJQ0IyWVhJZ1FpQTlJSHQ5TzF4dUlDQXZMeUJsYzJ4cGJuUXRaR2x6WVdKc1pTMXVaWGgwTFd4cGJtVWdibTh0ZFc1a1pXWmNiaUFnZG1GeUlGTWdQU0JUZVcxaWIyd29LVHRjYmlBZ2RtRnlJRXNnUFNBbllXSmpaR1ZtWjJocGFtdHNiVzV2Y0hGeWMzUW5PMXh1SUNCQlcxTmRJRDBnTnp0Y2JpQWdTeTV6Y0d4cGRDZ25KeWt1Wm05eVJXRmphQ2htZFc1amRHbHZiaUFvYXlrZ2V5QkNXMnRkSUQwZ2F6c2dmU2s3WEc0Z0lISmxkSFZ5YmlBa1lYTnphV2R1S0h0OUxDQkJLVnRUWFNBaFBTQTNJSHg4SUU5aWFtVmpkQzVyWlhsektDUmhjM05wWjI0b2UzMHNJRUlwS1M1cWIybHVLQ2NuS1NBaFBTQkxPMXh1ZlNrZ1B5Qm1kVzVqZEdsdmJpQmhjM05wWjI0b2RHRnlaMlYwTENCemIzVnlZMlVwSUhzZ0x5OGdaWE5zYVc1MExXUnBjMkZpYkdVdGJHbHVaU0J1YnkxMWJuVnpaV1F0ZG1GeWMxeHVJQ0IyWVhJZ1ZDQTlJSFJ2VDJKcVpXTjBLSFJoY21kbGRDazdYRzRnSUhaaGNpQmhUR1Z1SUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYUR0Y2JpQWdkbUZ5SUdsdVpHVjRJRDBnTVR0Y2JpQWdkbUZ5SUdkbGRGTjViV0p2YkhNZ1BTQm5UMUJUTG1ZN1hHNGdJSFpoY2lCcGMwVnVkVzBnUFNCd1NVVXVaanRjYmlBZ2QyaHBiR1VnS0dGTVpXNGdQaUJwYm1SbGVDa2dlMXh1SUNBZ0lIWmhjaUJUSUQwZ1NVOWlhbVZqZENoaGNtZDFiV1Z1ZEhOYmFXNWtaWGdySzEwcE8xeHVJQ0FnSUhaaGNpQnJaWGx6SUQwZ1oyVjBVM2x0WW05c2N5QS9JR2RsZEV0bGVYTW9VeWt1WTI5dVkyRjBLR2RsZEZONWJXSnZiSE1vVXlrcElEb2daMlYwUzJWNWN5aFRLVHRjYmlBZ0lDQjJZWElnYkdWdVozUm9JRDBnYTJWNWN5NXNaVzVuZEdnN1hHNGdJQ0FnZG1GeUlHb2dQU0F3TzF4dUlDQWdJSFpoY2lCclpYazdYRzRnSUNBZ2QyaHBiR1VnS0d4bGJtZDBhQ0ErSUdvcElHbG1JQ2hwYzBWdWRXMHVZMkZzYkNoVExDQnJaWGtnUFNCclpYbHpXMm9ySzEwcEtTQlVXMnRsZVYwZ1BTQlRXMnRsZVYwN1hHNGdJSDBnY21WMGRYSnVJRlE3WEc1OUlEb2dKR0Z6YzJsbmJqdGNiaUlzSWk4dklERTVMakV1TWk0eUlDOGdNVFV1TWk0ekxqVWdUMkpxWldOMExtTnlaV0YwWlNoUElGc3NJRkJ5YjNCbGNuUnBaWE5kS1Z4dWRtRnlJR0Z1VDJKcVpXTjBJRDBnY21WeGRXbHlaU2duTGk5ZllXNHRiMkpxWldOMEp5azdYRzUyWVhJZ1pGQnpJRDBnY21WeGRXbHlaU2duTGk5ZmIySnFaV04wTFdSd2N5Y3BPMXh1ZG1GeUlHVnVkVzFDZFdkTFpYbHpJRDBnY21WeGRXbHlaU2duTGk5ZlpXNTFiUzFpZFdjdGEyVjVjeWNwTzF4dWRtRnlJRWxGWDFCU1QxUlBJRDBnY21WeGRXbHlaU2duTGk5ZmMyaGhjbVZrTFd0bGVTY3BLQ2RKUlY5UVVrOVVUeWNwTzF4dWRtRnlJRVZ0Y0hSNUlEMGdablZ1WTNScGIyNGdLQ2tnZXlBdktpQmxiWEIwZVNBcUx5QjlPMXh1ZG1GeUlGQlNUMVJQVkZsUVJTQTlJQ2R3Y205MGIzUjVjR1VuTzF4dVhHNHZMeUJEY21WaGRHVWdiMkpxWldOMElIZHBkR2dnWm1GclpTQmdiblZzYkdBZ2NISnZkRzkwZVhCbE9pQjFjMlVnYVdaeVlXMWxJRTlpYW1WamRDQjNhWFJvSUdOc1pXRnlaV1FnY0hKdmRHOTBlWEJsWEc1MllYSWdZM0psWVhSbFJHbGpkQ0E5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnTHk4Z1ZHaHlZWE5vTENCM1lYTjBaU0JoYm1RZ2MyOWtiMjE1T2lCSlJTQkhReUJpZFdkY2JpQWdkbUZ5SUdsbWNtRnRaU0E5SUhKbGNYVnBjbVVvSnk0dlgyUnZiUzFqY21WaGRHVW5LU2duYVdaeVlXMWxKeWs3WEc0Z0lIWmhjaUJwSUQwZ1pXNTFiVUoxWjB0bGVYTXViR1Z1WjNSb08xeHVJQ0IyWVhJZ2JIUWdQU0FuUENjN1hHNGdJSFpoY2lCbmRDQTlJQ2MrSnp0Y2JpQWdkbUZ5SUdsbWNtRnRaVVJ2WTNWdFpXNTBPMXh1SUNCcFpuSmhiV1V1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJQ2R1YjI1bEp6dGNiaUFnY21WeGRXbHlaU2duTGk5ZmFIUnRiQ2NwTG1Gd2NHVnVaRU5vYVd4a0tHbG1jbUZ0WlNrN1hHNGdJR2xtY21GdFpTNXpjbU1nUFNBbmFtRjJZWE5qY21sd2REb25PeUF2THlCbGMyeHBiblF0WkdsellXSnNaUzFzYVc1bElHNXZMWE5qY21sd2RDMTFjbXhjYmlBZ0x5OGdZM0psWVhSbFJHbGpkQ0E5SUdsbWNtRnRaUzVqYjI1MFpXNTBWMmx1Wkc5M0xrOWlhbVZqZER0Y2JpQWdMeThnYUhSdGJDNXlaVzF2ZG1WRGFHbHNaQ2hwWm5KaGJXVXBPMXh1SUNCcFpuSmhiV1ZFYjJOMWJXVnVkQ0E5SUdsbWNtRnRaUzVqYjI1MFpXNTBWMmx1Wkc5M0xtUnZZM1Z0Wlc1ME8xeHVJQ0JwWm5KaGJXVkViMk4xYldWdWRDNXZjR1Z1S0NrN1hHNGdJR2xtY21GdFpVUnZZM1Z0Wlc1MExuZHlhWFJsS0d4MElDc2dKM05qY21sd2RDY2dLeUJuZENBcklDZGtiMk4xYldWdWRDNUdQVTlpYW1WamRDY2dLeUJzZENBcklDY3ZjMk55YVhCMEp5QXJJR2QwS1R0Y2JpQWdhV1p5WVcxbFJHOWpkVzFsYm5RdVkyeHZjMlVvS1R0Y2JpQWdZM0psWVhSbFJHbGpkQ0E5SUdsbWNtRnRaVVJ2WTNWdFpXNTBMa1k3WEc0Z0lIZG9hV3hsSUNocExTMHBJR1JsYkdWMFpTQmpjbVZoZEdWRWFXTjBXMUJTVDFSUFZGbFFSVjFiWlc1MWJVSjFaMHRsZVhOYmFWMWRPMXh1SUNCeVpYUjFjbTRnWTNKbFlYUmxSR2xqZENncE8xeHVmVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCUFltcGxZM1F1WTNKbFlYUmxJSHg4SUdaMWJtTjBhVzl1SUdOeVpXRjBaU2hQTENCUWNtOXdaWEowYVdWektTQjdYRzRnSUhaaGNpQnlaWE4xYkhRN1hHNGdJR2xtSUNoUElDRTlQU0J1ZFd4c0tTQjdYRzRnSUNBZ1JXMXdkSGxiVUZKUFZFOVVXVkJGWFNBOUlHRnVUMkpxWldOMEtFOHBPMXh1SUNBZ0lISmxjM1ZzZENBOUlHNWxkeUJGYlhCMGVTZ3BPMXh1SUNBZ0lFVnRjSFI1VzFCU1QxUlBWRmxRUlYwZ1BTQnVkV3hzTzF4dUlDQWdJQzh2SUdGa1pDQmNJbDlmY0hKdmRHOWZYMXdpSUdadmNpQlBZbXBsWTNRdVoyVjBVSEp2ZEc5MGVYQmxUMllnY0c5c2VXWnBiR3hjYmlBZ0lDQnlaWE4xYkhSYlNVVmZVRkpQVkU5ZElEMGdUenRjYmlBZ2ZTQmxiSE5sSUhKbGMzVnNkQ0E5SUdOeVpXRjBaVVJwWTNRb0tUdGNiaUFnY21WMGRYSnVJRkJ5YjNCbGNuUnBaWE1nUFQwOUlIVnVaR1ZtYVc1bFpDQS9JSEpsYzNWc2RDQTZJR1JRY3loeVpYTjFiSFFzSUZCeWIzQmxjblJwWlhNcE8xeHVmVHRjYmlJc0luWmhjaUJoYms5aWFtVmpkQ0E5SUhKbGNYVnBjbVVvSnk0dlgyRnVMVzlpYW1WamRDY3BPMXh1ZG1GeUlFbEZPRjlFVDAxZlJFVkdTVTVGSUQwZ2NtVnhkV2x5WlNnbkxpOWZhV1U0TFdSdmJTMWtaV1pwYm1VbktUdGNiblpoY2lCMGIxQnlhVzFwZEdsMlpTQTlJSEpsY1hWcGNtVW9KeTR2WDNSdkxYQnlhVzFwZEdsMlpTY3BPMXh1ZG1GeUlHUlFJRDBnVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNU8xeHVYRzVsZUhCdmNuUnpMbVlnUFNCeVpYRjFhWEpsS0NjdUwxOWtaWE5qY21sd2RHOXljeWNwSUQ4Z1QySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVJRG9nWm5WdVkzUnBiMjRnWkdWbWFXNWxVSEp2Y0dWeWRIa29UeXdnVUN3Z1FYUjBjbWxpZFhSbGN5a2dlMXh1SUNCaGJrOWlhbVZqZENoUEtUdGNiaUFnVUNBOUlIUnZVSEpwYldsMGFYWmxLRkFzSUhSeWRXVXBPMXh1SUNCaGJrOWlhbVZqZENoQmRIUnlhV0oxZEdWektUdGNiaUFnYVdZZ0tFbEZPRjlFVDAxZlJFVkdTVTVGS1NCMGNua2dlMXh1SUNBZ0lISmxkSFZ5YmlCa1VDaFBMQ0JRTENCQmRIUnlhV0oxZEdWektUdGNiaUFnZlNCallYUmphQ0FvWlNrZ2V5QXZLaUJsYlhCMGVTQXFMeUI5WEc0Z0lHbG1JQ2duWjJWMEp5QnBiaUJCZEhSeWFXSjFkR1Z6SUh4OElDZHpaWFFuSUdsdUlFRjBkSEpwWW5WMFpYTXBJSFJvY205M0lGUjVjR1ZGY25KdmNpZ25RV05qWlhOemIzSnpJRzV2ZENCemRYQndiM0owWldRaEp5azdYRzRnSUdsbUlDZ25kbUZzZFdVbklHbHVJRUYwZEhKcFluVjBaWE1wSUU5YlVGMGdQU0JCZEhSeWFXSjFkR1Z6TG5aaGJIVmxPMXh1SUNCeVpYUjFjbTRnVHp0Y2JuMDdYRzRpTENKMllYSWdaRkFnUFNCeVpYRjFhWEpsS0NjdUwxOXZZbXBsWTNRdFpIQW5LVHRjYm5aaGNpQmhiazlpYW1WamRDQTlJSEpsY1hWcGNtVW9KeTR2WDJGdUxXOWlhbVZqZENjcE8xeHVkbUZ5SUdkbGRFdGxlWE1nUFNCeVpYRjFhWEpsS0NjdUwxOXZZbXBsWTNRdGEyVjVjeWNwTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlISmxjWFZwY21Vb0p5NHZYMlJsYzJOeWFYQjBiM0p6SnlrZ1B5QlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkR2xsY3lBNklHWjFibU4wYVc5dUlHUmxabWx1WlZCeWIzQmxjblJwWlhNb1R5d2dVSEp2Y0dWeWRHbGxjeWtnZTF4dUlDQmhiazlpYW1WamRDaFBLVHRjYmlBZ2RtRnlJR3RsZVhNZ1BTQm5aWFJMWlhsektGQnliM0JsY25ScFpYTXBPMXh1SUNCMllYSWdiR1Z1WjNSb0lEMGdhMlY1Y3k1c1pXNW5kR2c3WEc0Z0lIWmhjaUJwSUQwZ01EdGNiaUFnZG1GeUlGQTdYRzRnSUhkb2FXeGxJQ2hzWlc1bmRHZ2dQaUJwS1NCa1VDNW1LRThzSUZBZ1BTQnJaWGx6VzJrcksxMHNJRkJ5YjNCbGNuUnBaWE5iVUYwcE8xeHVJQ0J5WlhSMWNtNGdUenRjYm4wN1hHNGlMQ0psZUhCdmNuUnpMbVlnUFNCUFltcGxZM1F1WjJWMFQzZHVVSEp2Y0dWeWRIbFRlVzFpYjJ4ek8xeHVJaXdpTHk4Z01Ua3VNUzR5TGprZ0x5QXhOUzR5TGpNdU1pQlBZbXBsWTNRdVoyVjBVSEp2ZEc5MGVYQmxUMllvVHlsY2JuWmhjaUJvWVhNZ1BTQnlaWEYxYVhKbEtDY3VMMTlvWVhNbktUdGNiblpoY2lCMGIwOWlhbVZqZENBOUlISmxjWFZwY21Vb0p5NHZYM1J2TFc5aWFtVmpkQ2NwTzF4dWRtRnlJRWxGWDFCU1QxUlBJRDBnY21WeGRXbHlaU2duTGk5ZmMyaGhjbVZrTFd0bGVTY3BLQ2RKUlY5UVVrOVVUeWNwTzF4dWRtRnlJRTlpYW1WamRGQnliM1J2SUQwZ1QySnFaV04wTG5CeWIzUnZkSGx3WlR0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQlBZbXBsWTNRdVoyVjBVSEp2ZEc5MGVYQmxUMllnZkh3Z1puVnVZM1JwYjI0Z0tFOHBJSHRjYmlBZ1R5QTlJSFJ2VDJKcVpXTjBLRThwTzF4dUlDQnBaaUFvYUdGektFOHNJRWxGWDFCU1QxUlBLU2tnY21WMGRYSnVJRTliU1VWZlVGSlBWRTlkTzF4dUlDQnBaaUFvZEhsd1pXOW1JRTh1WTI5dWMzUnlkV04wYjNJZ1BUMGdKMloxYm1OMGFXOXVKeUFtSmlCUElHbHVjM1JoYm1ObGIyWWdUeTVqYjI1emRISjFZM1J2Y2lrZ2UxeHVJQ0FnSUhKbGRIVnliaUJQTG1OdmJuTjBjblZqZEc5eUxuQnliM1J2ZEhsd1pUdGNiaUFnZlNCeVpYUjFjbTRnVHlCcGJuTjBZVzVqWlc5bUlFOWlhbVZqZENBL0lFOWlhbVZqZEZCeWIzUnZJRG9nYm5Wc2JEdGNibjA3WEc0aUxDSjJZWElnYUdGeklEMGdjbVZ4ZFdseVpTZ25MaTlmYUdGekp5azdYRzUyWVhJZ2RHOUpUMkpxWldOMElEMGdjbVZ4ZFdseVpTZ25MaTlmZEc4dGFXOWlhbVZqZENjcE8xeHVkbUZ5SUdGeWNtRjVTVzVrWlhoUFppQTlJSEpsY1hWcGNtVW9KeTR2WDJGeWNtRjVMV2x1WTJ4MVpHVnpKeWtvWm1Gc2MyVXBPMXh1ZG1GeUlFbEZYMUJTVDFSUElEMGdjbVZ4ZFdseVpTZ25MaTlmYzJoaGNtVmtMV3RsZVNjcEtDZEpSVjlRVWs5VVR5Y3BPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNodlltcGxZM1FzSUc1aGJXVnpLU0I3WEc0Z0lIWmhjaUJQSUQwZ2RHOUpUMkpxWldOMEtHOWlhbVZqZENrN1hHNGdJSFpoY2lCcElEMGdNRHRjYmlBZ2RtRnlJSEpsYzNWc2RDQTlJRnRkTzF4dUlDQjJZWElnYTJWNU8xeHVJQ0JtYjNJZ0tHdGxlU0JwYmlCUEtTQnBaaUFvYTJWNUlDRTlJRWxGWDFCU1QxUlBLU0JvWVhNb1R5d2dhMlY1S1NBbUppQnlaWE4xYkhRdWNIVnphQ2hyWlhrcE8xeHVJQ0F2THlCRWIyNG5kQ0JsYm5WdElHSjFaeUFtSUdocFpHUmxiaUJyWlhselhHNGdJSGRvYVd4bElDaHVZVzFsY3k1c1pXNW5kR2dnUGlCcEtTQnBaaUFvYUdGektFOHNJR3RsZVNBOUlHNWhiV1Z6VzJrcksxMHBLU0I3WEc0Z0lDQWdmbUZ5Y21GNVNXNWtaWGhQWmloeVpYTjFiSFFzSUd0bGVTa2dmSHdnY21WemRXeDBMbkIxYzJnb2EyVjVLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjbVZ6ZFd4ME8xeHVmVHRjYmlJc0lpOHZJREU1TGpFdU1pNHhOQ0F2SURFMUxqSXVNeTR4TkNCUFltcGxZM1F1YTJWNWN5aFBLVnh1ZG1GeUlDUnJaWGx6SUQwZ2NtVnhkV2x5WlNnbkxpOWZiMkpxWldOMExXdGxlWE10YVc1MFpYSnVZV3duS1R0Y2JuWmhjaUJsYm5WdFFuVm5TMlY1Y3lBOUlISmxjWFZwY21Vb0p5NHZYMlZ1ZFcwdFluVm5MV3RsZVhNbktUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JQWW1wbFkzUXVhMlY1Y3lCOGZDQm1kVzVqZEdsdmJpQnJaWGx6S0U4cElIdGNiaUFnY21WMGRYSnVJQ1JyWlhsektFOHNJR1Z1ZFcxQ2RXZExaWGx6S1R0Y2JuMDdYRzRpTENKbGVIQnZjblJ6TG1ZZ1BTQjdmUzV3Y205d1pYSjBlVWx6Ulc1MWJXVnlZV0pzWlR0Y2JpSXNJaTh2SUcxdmMzUWdUMkpxWldOMElHMWxkR2h2WkhNZ1lua2dSVk0ySUhOb2IzVnNaQ0JoWTJObGNIUWdjSEpwYldsMGFYWmxjMXh1ZG1GeUlDUmxlSEJ2Y25RZ1BTQnlaWEYxYVhKbEtDY3VMMTlsZUhCdmNuUW5LVHRjYm5aaGNpQmpiM0psSUQwZ2NtVnhkV2x5WlNnbkxpOWZZMjl5WlNjcE8xeHVkbUZ5SUdaaGFXeHpJRDBnY21WeGRXbHlaU2duTGk5ZlptRnBiSE1uS1R0Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z0tFdEZXU3dnWlhobFl5a2dlMXh1SUNCMllYSWdabTRnUFNBb1kyOXlaUzVQWW1wbFkzUWdmSHdnZTMwcFcwdEZXVjBnZkh3Z1QySnFaV04wVzB0RldWMDdYRzRnSUhaaGNpQmxlSEFnUFNCN2ZUdGNiaUFnWlhod1cwdEZXVjBnUFNCbGVHVmpLR1p1S1R0Y2JpQWdKR1Y0Y0c5eWRDZ2taWGh3YjNKMExsTWdLeUFrWlhod2IzSjBMa1lnS2lCbVlXbHNjeWhtZFc1amRHbHZiaUFvS1NCN0lHWnVLREVwT3lCOUtTd2dKMDlpYW1WamRDY3NJR1Y0Y0NrN1hHNTlPMXh1SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb1ltbDBiV0Z3TENCMllXeDFaU2tnZTF4dUlDQnlaWFIxY200Z2UxeHVJQ0FnSUdWdWRXMWxjbUZpYkdVNklDRW9ZbWwwYldGd0lDWWdNU2tzWEc0Z0lDQWdZMjl1Wm1sbmRYSmhZbXhsT2lBaEtHSnBkRzFoY0NBbUlESXBMRnh1SUNBZ0lIZHlhWFJoWW14bE9pQWhLR0pwZEcxaGNDQW1JRFFwTEZ4dUlDQWdJSFpoYkhWbE9pQjJZV3gxWlZ4dUlDQjlPMXh1ZlR0Y2JpSXNJbTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdjbVZ4ZFdseVpTZ25MaTlmYUdsa1pTY3BPMXh1SWl3aWRtRnlJR1JsWmlBOUlISmxjWFZwY21Vb0p5NHZYMjlpYW1WamRDMWtjQ2NwTG1ZN1hHNTJZWElnYUdGeklEMGdjbVZ4ZFdseVpTZ25MaTlmYUdGekp5azdYRzUyWVhJZ1ZFRkhJRDBnY21WeGRXbHlaU2duTGk5ZmQydHpKeWtvSjNSdlUzUnlhVzVuVkdGbkp5azdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dsMExDQjBZV2NzSUhOMFlYUXBJSHRjYmlBZ2FXWWdLR2wwSUNZbUlDRm9ZWE1vYVhRZ1BTQnpkR0YwSUQ4Z2FYUWdPaUJwZEM1d2NtOTBiM1I1Y0dVc0lGUkJSeWtwSUdSbFppaHBkQ3dnVkVGSExDQjdJR052Ym1acFozVnlZV0pzWlRvZ2RISjFaU3dnZG1Gc2RXVTZJSFJoWnlCOUtUdGNibjA3WEc0aUxDSjJZWElnYzJoaGNtVmtJRDBnY21WeGRXbHlaU2duTGk5ZmMyaGhjbVZrSnlrb0oydGxlWE1uS1R0Y2JuWmhjaUIxYVdRZ1BTQnlaWEYxYVhKbEtDY3VMMTkxYVdRbktUdGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLR3RsZVNrZ2UxeHVJQ0J5WlhSMWNtNGdjMmhoY21Wa1cydGxlVjBnZkh3Z0tITm9ZWEpsWkZ0clpYbGRJRDBnZFdsa0tHdGxlU2twTzF4dWZUdGNiaUlzSW5aaGNpQm5iRzlpWVd3Z1BTQnlaWEYxYVhKbEtDY3VMMTluYkc5aVlXd25LVHRjYm5aaGNpQlRTRUZTUlVRZ1BTQW5YMTlqYjNKbExXcHpYM05vWVhKbFpGOWZKenRjYm5aaGNpQnpkRzl5WlNBOUlHZHNiMkpoYkZ0VFNFRlNSVVJkSUh4OElDaG5iRzlpWVd4YlUwaEJVa1ZFWFNBOUlIdDlLVHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0d0bGVTa2dlMXh1SUNCeVpYUjFjbTRnYzNSdmNtVmJhMlY1WFNCOGZDQW9jM1J2Y21WYmEyVjVYU0E5SUh0OUtUdGNibjA3WEc0aUxDSjJZWElnZEc5SmJuUmxaMlZ5SUQwZ2NtVnhkV2x5WlNnbkxpOWZkRzh0YVc1MFpXZGxjaWNwTzF4dWRtRnlJR1JsWm1sdVpXUWdQU0J5WlhGMWFYSmxLQ2N1TDE5a1pXWnBibVZrSnlrN1hHNHZMeUIwY25WbElDQXRQaUJUZEhKcGJtY2pZWFJjYmk4dklHWmhiSE5sSUMwK0lGTjBjbWx1WnlOamIyUmxVRzlwYm5SQmRGeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9WRTlmVTFSU1NVNUhLU0I3WEc0Z0lISmxkSFZ5YmlCbWRXNWpkR2x2YmlBb2RHaGhkQ3dnY0c5ektTQjdYRzRnSUNBZ2RtRnlJSE1nUFNCVGRISnBibWNvWkdWbWFXNWxaQ2gwYUdGMEtTazdYRzRnSUNBZ2RtRnlJR2tnUFNCMGIwbHVkR1ZuWlhJb2NHOXpLVHRjYmlBZ0lDQjJZWElnYkNBOUlITXViR1Z1WjNSb08xeHVJQ0FnSUhaaGNpQmhMQ0JpTzF4dUlDQWdJR2xtSUNocElEd2dNQ0I4ZkNCcElENDlJR3dwSUhKbGRIVnliaUJVVDE5VFZGSkpUa2NnUHlBbkp5QTZJSFZ1WkdWbWFXNWxaRHRjYmlBZ0lDQmhJRDBnY3k1amFHRnlRMjlrWlVGMEtHa3BPMXh1SUNBZ0lISmxkSFZ5YmlCaElEd2dNSGhrT0RBd0lIeDhJR0VnUGlBd2VHUmlabVlnZkh3Z2FTQXJJREVnUFQwOUlHd2dmSHdnS0dJZ1BTQnpMbU5vWVhKRGIyUmxRWFFvYVNBcklERXBLU0E4SURCNFpHTXdNQ0I4ZkNCaUlENGdNSGhrWm1abVhHNGdJQ0FnSUNBL0lGUlBYMU5VVWtsT1J5QS9JSE11WTJoaGNrRjBLR2twSURvZ1lWeHVJQ0FnSUNBZ09pQlVUMTlUVkZKSlRrY2dQeUJ6TG5Oc2FXTmxLR2tzSUdrZ0t5QXlLU0E2SUNoaElDMGdNSGhrT0RBd0lEdzhJREV3S1NBcklDaGlJQzBnTUhoa1l6QXdLU0FySURCNE1UQXdNREE3WEc0Z0lIMDdYRzU5TzF4dUlpd2lkbUZ5SUhSdlNXNTBaV2RsY2lBOUlISmxjWFZwY21Vb0p5NHZYM1J2TFdsdWRHVm5aWEluS1R0Y2JuWmhjaUJ0WVhnZ1BTQk5ZWFJvTG0xaGVEdGNiblpoY2lCdGFXNGdQU0JOWVhSb0xtMXBianRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dsdVpHVjRMQ0JzWlc1bmRHZ3BJSHRjYmlBZ2FXNWtaWGdnUFNCMGIwbHVkR1ZuWlhJb2FXNWtaWGdwTzF4dUlDQnlaWFIxY200Z2FXNWtaWGdnUENBd0lEOGdiV0Y0S0dsdVpHVjRJQ3NnYkdWdVozUm9MQ0F3S1NBNklHMXBiaWhwYm1SbGVDd2diR1Z1WjNSb0tUdGNibjA3WEc0aUxDSXZMeUEzTGpFdU5DQlViMGx1ZEdWblpYSmNiblpoY2lCalpXbHNJRDBnVFdGMGFDNWpaV2xzTzF4dWRtRnlJR1pzYjI5eUlEMGdUV0YwYUM1bWJHOXZjanRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dsMEtTQjdYRzRnSUhKbGRIVnliaUJwYzA1aFRpaHBkQ0E5SUN0cGRDa2dQeUF3SURvZ0tHbDBJRDRnTUNBL0lHWnNiMjl5SURvZ1kyVnBiQ2tvYVhRcE8xeHVmVHRjYmlJc0lpOHZJSFJ2SUdsdVpHVjRaV1FnYjJKcVpXTjBMQ0IwYjA5aWFtVmpkQ0IzYVhSb0lHWmhiR3hpWVdOcklHWnZjaUJ1YjI0dFlYSnlZWGt0YkdsclpTQkZVek1nYzNSeWFXNW5jMXh1ZG1GeUlFbFBZbXBsWTNRZ1BTQnlaWEYxYVhKbEtDY3VMMTlwYjJKcVpXTjBKeWs3WEc1MllYSWdaR1ZtYVc1bFpDQTlJSEpsY1hWcGNtVW9KeTR2WDJSbFptbHVaV1FuS1R0Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z0tHbDBLU0I3WEc0Z0lISmxkSFZ5YmlCSlQySnFaV04wS0dSbFptbHVaV1FvYVhRcEtUdGNibjA3WEc0aUxDSXZMeUEzTGpFdU1UVWdWRzlNWlc1bmRHaGNiblpoY2lCMGIwbHVkR1ZuWlhJZ1BTQnlaWEYxYVhKbEtDY3VMMTkwYnkxcGJuUmxaMlZ5SnlrN1hHNTJZWElnYldsdUlEMGdUV0YwYUM1dGFXNDdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hwZENrZ2UxeHVJQ0J5WlhSMWNtNGdhWFFnUGlBd0lEOGdiV2x1S0hSdlNXNTBaV2RsY2locGRDa3NJREI0TVdabVptWm1abVptWm1abVptWXBJRG9nTURzZ0x5OGdjRzkzS0RJc0lEVXpLU0F0SURFZ1BUMGdPVEF3TnpFNU9USTFORGMwTURrNU1WeHVmVHRjYmlJc0lpOHZJRGN1TVM0eE15QlViMDlpYW1WamRDaGhjbWQxYldWdWRDbGNiblpoY2lCa1pXWnBibVZrSUQwZ2NtVnhkV2x5WlNnbkxpOWZaR1ZtYVc1bFpDY3BPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvYVhRcElIdGNiaUFnY21WMGRYSnVJRTlpYW1WamRDaGtaV1pwYm1Wa0tHbDBLU2s3WEc1OU8xeHVJaXdpTHk4Z055NHhMakVnVkc5UWNtbHRhWFJwZG1Vb2FXNXdkWFFnV3l3Z1VISmxabVZ5Y21Wa1ZIbHdaVjBwWEc1MllYSWdhWE5QWW1wbFkzUWdQU0J5WlhGMWFYSmxLQ2N1TDE5cGN5MXZZbXBsWTNRbktUdGNiaTh2SUdsdWMzUmxZV1FnYjJZZ2RHaGxJRVZUTmlCemNHVmpJSFpsY25OcGIyNHNJSGRsSUdScFpHNG5kQ0JwYlhCc1pXMWxiblFnUUVCMGIxQnlhVzFwZEdsMlpTQmpZWE5sWEc0dkx5QmhibVFnZEdobElITmxZMjl1WkNCaGNtZDFiV1Z1ZENBdElHWnNZV2NnTFNCd2NtVm1aWEp5WldRZ2RIbHdaU0JwY3lCaElITjBjbWx1WjF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUXNJRk1wSUh0Y2JpQWdhV1lnS0NGcGMwOWlhbVZqZENocGRDa3BJSEpsZEhWeWJpQnBkRHRjYmlBZ2RtRnlJR1p1TENCMllXdzdYRzRnSUdsbUlDaFRJQ1ltSUhSNWNHVnZaaUFvWm00Z1BTQnBkQzUwYjFOMGNtbHVaeWtnUFQwZ0oyWjFibU4wYVc5dUp5QW1KaUFoYVhOUFltcGxZM1FvZG1Gc0lEMGdabTR1WTJGc2JDaHBkQ2twS1NCeVpYUjFjbTRnZG1Gc08xeHVJQ0JwWmlBb2RIbHdaVzltSUNobWJpQTlJR2wwTG5aaGJIVmxUMllwSUQwOUlDZG1kVzVqZEdsdmJpY2dKaVlnSVdselQySnFaV04wS0haaGJDQTlJR1p1TG1OaGJHd29hWFFwS1NrZ2NtVjBkWEp1SUhaaGJEdGNiaUFnYVdZZ0tDRlRJQ1ltSUhSNWNHVnZaaUFvWm00Z1BTQnBkQzUwYjFOMGNtbHVaeWtnUFQwZ0oyWjFibU4wYVc5dUp5QW1KaUFoYVhOUFltcGxZM1FvZG1Gc0lEMGdabTR1WTJGc2JDaHBkQ2twS1NCeVpYUjFjbTRnZG1Gc08xeHVJQ0IwYUhKdmR5QlVlWEJsUlhKeWIzSW9YQ0pEWVc0bmRDQmpiMjUyWlhKMElHOWlhbVZqZENCMGJ5QndjbWx0YVhScGRtVWdkbUZzZFdWY0lpazdYRzU5TzF4dUlpd2lkbUZ5SUdsa0lEMGdNRHRjYm5aaGNpQndlQ0E5SUUxaGRHZ3VjbUZ1Wkc5dEtDazdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hyWlhrcElIdGNiaUFnY21WMGRYSnVJQ2RUZVcxaWIyd29KeTVqYjI1allYUW9hMlY1SUQwOVBTQjFibVJsWm1sdVpXUWdQeUFuSnlBNklHdGxlU3dnSnlsZkp5d2dLQ3NyYVdRZ0t5QndlQ2t1ZEc5VGRISnBibWNvTXpZcEtUdGNibjA3WEc0aUxDSjJZWElnYzNSdmNtVWdQU0J5WlhGMWFYSmxLQ2N1TDE5emFHRnlaV1FuS1NnbmQydHpKeWs3WEc1MllYSWdkV2xrSUQwZ2NtVnhkV2x5WlNnbkxpOWZkV2xrSnlrN1hHNTJZWElnVTNsdFltOXNJRDBnY21WeGRXbHlaU2duTGk5ZloyeHZZbUZzSnlrdVUzbHRZbTlzTzF4dWRtRnlJRlZUUlY5VFdVMUNUMHdnUFNCMGVYQmxiMllnVTNsdFltOXNJRDA5SUNkbWRXNWpkR2x2YmljN1hHNWNiblpoY2lBa1pYaHdiM0owY3lBOUlHMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z0tHNWhiV1VwSUh0Y2JpQWdjbVYwZFhKdUlITjBiM0psVzI1aGJXVmRJSHg4SUNoemRHOXlaVnR1WVcxbFhTQTlYRzRnSUNBZ1ZWTkZYMU5aVFVKUFRDQW1KaUJUZVcxaWIyeGJibUZ0WlYwZ2ZId2dLRlZUUlY5VFdVMUNUMHdnUHlCVGVXMWliMndnT2lCMWFXUXBLQ2RUZVcxaWIyd3VKeUFySUc1aGJXVXBLVHRjYm4wN1hHNWNiaVJsZUhCdmNuUnpMbk4wYjNKbElEMGdjM1J2Y21VN1hHNGlMQ0oyWVhJZ1kyeGhjM052WmlBOUlISmxjWFZwY21Vb0p5NHZYMk5zWVhOemIyWW5LVHRjYm5aaGNpQkpWRVZTUVZSUFVpQTlJSEpsY1hWcGNtVW9KeTR2WDNkcmN5Y3BLQ2RwZEdWeVlYUnZjaWNwTzF4dWRtRnlJRWwwWlhKaGRHOXljeUE5SUhKbGNYVnBjbVVvSnk0dlgybDBaWEpoZEc5eWN5Y3BPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0J5WlhGMWFYSmxLQ2N1TDE5amIzSmxKeWt1WjJWMFNYUmxjbUYwYjNKTlpYUm9iMlFnUFNCbWRXNWpkR2x2YmlBb2FYUXBJSHRjYmlBZ2FXWWdLR2wwSUNFOUlIVnVaR1ZtYVc1bFpDa2djbVYwZFhKdUlHbDBXMGxVUlZKQlZFOVNYVnh1SUNBZ0lIeDhJR2wwV3lkQVFHbDBaWEpoZEc5eUoxMWNiaUFnSUNCOGZDQkpkR1Z5WVhSdmNuTmJZMnhoYzNOdlppaHBkQ2xkTzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNiblpoY2lCamRIZ2dQU0J5WlhGMWFYSmxLQ2N1TDE5amRIZ25LVHRjYm5aaGNpQWtaWGh3YjNKMElEMGdjbVZ4ZFdseVpTZ25MaTlmWlhod2IzSjBKeWs3WEc1MllYSWdkRzlQWW1wbFkzUWdQU0J5WlhGMWFYSmxLQ2N1TDE5MGJ5MXZZbXBsWTNRbktUdGNiblpoY2lCallXeHNJRDBnY21WeGRXbHlaU2duTGk5ZmFYUmxjaTFqWVd4c0p5azdYRzUyWVhJZ2FYTkJjbkpoZVVsMFpYSWdQU0J5WlhGMWFYSmxLQ2N1TDE5cGN5MWhjbkpoZVMxcGRHVnlKeWs3WEc1MllYSWdkRzlNWlc1bmRHZ2dQU0J5WlhGMWFYSmxLQ2N1TDE5MGJ5MXNaVzVuZEdnbktUdGNiblpoY2lCamNtVmhkR1ZRY205d1pYSjBlU0E5SUhKbGNYVnBjbVVvSnk0dlgyTnlaV0YwWlMxd2NtOXdaWEowZVNjcE8xeHVkbUZ5SUdkbGRFbDBaWEpHYmlBOUlISmxjWFZwY21Vb0p5NHZZMjl5WlM1blpYUXRhWFJsY21GMGIzSXRiV1YwYUc5a0p5azdYRzVjYmlSbGVIQnZjblFvSkdWNGNHOXlkQzVUSUNzZ0pHVjRjRzl5ZEM1R0lDb2dJWEpsY1hWcGNtVW9KeTR2WDJsMFpYSXRaR1YwWldOMEp5a29ablZ1WTNScGIyNGdLR2wwWlhJcElIc2dRWEp5WVhrdVpuSnZiU2hwZEdWeUtUc2dmU2tzSUNkQmNuSmhlU2NzSUh0Y2JpQWdMeThnTWpJdU1TNHlMakVnUVhKeVlYa3Vabkp2YlNoaGNuSmhlVXhwYTJVc0lHMWhjR1p1SUQwZ2RXNWtaV1pwYm1Wa0xDQjBhR2x6UVhKbklEMGdkVzVrWldacGJtVmtLVnh1SUNCbWNtOXRPaUJtZFc1amRHbHZiaUJtY205dEtHRnljbUY1VEdsclpTQXZLaUFzSUcxaGNHWnVJRDBnZFc1a1pXWnBibVZrTENCMGFHbHpRWEpuSUQwZ2RXNWtaV1pwYm1Wa0lDb3ZLU0I3WEc0Z0lDQWdkbUZ5SUU4Z1BTQjBiMDlpYW1WamRDaGhjbkpoZVV4cGEyVXBPMXh1SUNBZ0lIWmhjaUJESUQwZ2RIbHdaVzltSUhSb2FYTWdQVDBnSjJaMWJtTjBhVzl1SnlBL0lIUm9hWE1nT2lCQmNuSmhlVHRjYmlBZ0lDQjJZWElnWVV4bGJpQTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZzdYRzRnSUNBZ2RtRnlJRzFoY0dadUlEMGdZVXhsYmlBK0lERWdQeUJoY21kMWJXVnVkSE5iTVYwZ09pQjFibVJsWm1sdVpXUTdYRzRnSUNBZ2RtRnlJRzFoY0hCcGJtY2dQU0J0WVhCbWJpQWhQVDBnZFc1a1pXWnBibVZrTzF4dUlDQWdJSFpoY2lCcGJtUmxlQ0E5SURBN1hHNGdJQ0FnZG1GeUlHbDBaWEpHYmlBOUlHZGxkRWwwWlhKR2JpaFBLVHRjYmlBZ0lDQjJZWElnYkdWdVozUm9MQ0J5WlhOMWJIUXNJSE4wWlhBc0lHbDBaWEpoZEc5eU8xeHVJQ0FnSUdsbUlDaHRZWEJ3YVc1bktTQnRZWEJtYmlBOUlHTjBlQ2h0WVhCbWJpd2dZVXhsYmlBK0lESWdQeUJoY21kMWJXVnVkSE5iTWwwZ09pQjFibVJsWm1sdVpXUXNJRElwTzF4dUlDQWdJQzh2SUdsbUlHOWlhbVZqZENCcGMyNG5kQ0JwZEdWeVlXSnNaU0J2Y2lCcGRDZHpJR0Z5Y21GNUlIZHBkR2dnWkdWbVlYVnNkQ0JwZEdWeVlYUnZjaUF0SUhWelpTQnphVzF3YkdVZ1kyRnpaVnh1SUNBZ0lHbG1JQ2hwZEdWeVJtNGdJVDBnZFc1a1pXWnBibVZrSUNZbUlDRW9ReUE5UFNCQmNuSmhlU0FtSmlCcGMwRnljbUY1U1hSbGNpaHBkR1Z5Um00cEtTa2dlMXh1SUNBZ0lDQWdabTl5SUNocGRHVnlZWFJ2Y2lBOUlHbDBaWEpHYmk1allXeHNLRThwTENCeVpYTjFiSFFnUFNCdVpYY2dReWdwT3lBaEtITjBaWEFnUFNCcGRHVnlZWFJ2Y2k1dVpYaDBLQ2twTG1SdmJtVTdJR2x1WkdWNEt5c3BJSHRjYmlBZ0lDQWdJQ0FnWTNKbFlYUmxVSEp2Y0dWeWRIa29jbVZ6ZFd4MExDQnBibVJsZUN3Z2JXRndjR2x1WnlBL0lHTmhiR3dvYVhSbGNtRjBiM0lzSUcxaGNHWnVMQ0JiYzNSbGNDNTJZV3gxWlN3Z2FXNWtaWGhkTENCMGNuVmxLU0E2SUhOMFpYQXVkbUZzZFdVcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0JzWlc1bmRHZ2dQU0IwYjB4bGJtZDBhQ2hQTG14bGJtZDBhQ2s3WEc0Z0lDQWdJQ0JtYjNJZ0tISmxjM1ZzZENBOUlHNWxkeUJES0d4bGJtZDBhQ2s3SUd4bGJtZDBhQ0ErSUdsdVpHVjRPeUJwYm1SbGVDc3JLU0I3WEc0Z0lDQWdJQ0FnSUdOeVpXRjBaVkJ5YjNCbGNuUjVLSEpsYzNWc2RDd2dhVzVrWlhnc0lHMWhjSEJwYm1jZ1B5QnRZWEJtYmloUFcybHVaR1Y0WFN3Z2FXNWtaWGdwSURvZ1QxdHBibVJsZUYwcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdJQ0J5WlhOMWJIUXViR1Z1WjNSb0lEMGdhVzVrWlhnN1hHNGdJQ0FnY21WMGRYSnVJSEpsYzNWc2REdGNiaUFnZlZ4dWZTazdYRzRpTENJdkx5QXhPUzR4TGpNdU1TQlBZbXBsWTNRdVlYTnphV2R1S0hSaGNtZGxkQ3dnYzI5MWNtTmxLVnh1ZG1GeUlDUmxlSEJ2Y25RZ1BTQnlaWEYxYVhKbEtDY3VMMTlsZUhCdmNuUW5LVHRjYmx4dUpHVjRjRzl5ZENna1pYaHdiM0owTGxNZ0t5QWtaWGh3YjNKMExrWXNJQ2RQWW1wbFkzUW5MQ0I3SUdGemMybG5iam9nY21WeGRXbHlaU2duTGk5ZmIySnFaV04wTFdGemMybG5iaWNwSUgwcE8xeHVJaXdpTHk4Z01Ua3VNUzR5TGpFMElFOWlhbVZqZEM1clpYbHpLRThwWEc1MllYSWdkRzlQWW1wbFkzUWdQU0J5WlhGMWFYSmxLQ2N1TDE5MGJ5MXZZbXBsWTNRbktUdGNiblpoY2lBa2EyVjVjeUE5SUhKbGNYVnBjbVVvSnk0dlgyOWlhbVZqZEMxclpYbHpKeWs3WEc1Y2JuSmxjWFZwY21Vb0p5NHZYMjlpYW1WamRDMXpZWEFuS1NnbmEyVjVjeWNzSUdaMWJtTjBhVzl1SUNncElIdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJR3RsZVhNb2FYUXBJSHRjYmlBZ0lDQnlaWFIxY200Z0pHdGxlWE1vZEc5UFltcGxZM1FvYVhRcEtUdGNiaUFnZlR0Y2JuMHBPMXh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1ZG1GeUlDUmhkQ0E5SUhKbGNYVnBjbVVvSnk0dlgzTjBjbWx1WnkxaGRDY3BLSFJ5ZFdVcE8xeHVYRzR2THlBeU1TNHhMak11TWpjZ1UzUnlhVzVuTG5CeWIzUnZkSGx3WlZ0QVFHbDBaWEpoZEc5eVhTZ3BYRzV5WlhGMWFYSmxLQ2N1TDE5cGRHVnlMV1JsWm1sdVpTY3BLRk4wY21sdVp5d2dKMU4wY21sdVp5Y3NJR1oxYm1OMGFXOXVJQ2hwZEdWeVlYUmxaQ2tnZTF4dUlDQjBhR2x6TGw5MElEMGdVM1J5YVc1bktHbDBaWEpoZEdWa0tUc2dMeThnZEdGeVoyVjBYRzRnSUhSb2FYTXVYMmtnUFNBd095QWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkx5QnVaWGgwSUdsdVpHVjRYRzR2THlBeU1TNHhMalV1TWk0eElDVlRkSEpwYm1kSmRHVnlZWFJ2Y2xCeWIzUnZkSGx3WlNVdWJtVjRkQ2dwWEc1OUxDQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lIWmhjaUJQSUQwZ2RHaHBjeTVmZER0Y2JpQWdkbUZ5SUdsdVpHVjRJRDBnZEdocGN5NWZhVHRjYmlBZ2RtRnlJSEJ2YVc1ME8xeHVJQ0JwWmlBb2FXNWtaWGdnUGowZ1R5NXNaVzVuZEdncElISmxkSFZ5YmlCN0lIWmhiSFZsT2lCMWJtUmxabWx1WldRc0lHUnZibVU2SUhSeWRXVWdmVHRjYmlBZ2NHOXBiblFnUFNBa1lYUW9UeXdnYVc1a1pYZ3BPMXh1SUNCMGFHbHpMbDlwSUNzOUlIQnZhVzUwTG14bGJtZDBhRHRjYmlBZ2NtVjBkWEp1SUhzZ2RtRnNkV1U2SUhCdmFXNTBMQ0JrYjI1bE9pQm1ZV3h6WlNCOU8xeHVmU2s3WEc0aVhYMD0ifQ==
