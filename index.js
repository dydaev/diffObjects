'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function diffObjects(obA, obB) {
  var result = {
    saved: {},
    added: {},
    updated: {},
    deleted: {}
  };

  var arrCoupleObjects2object = function arrCoupleObjects2object(arrayObects) {
    return arrayObects.reduceRight(function (acc, object) {
      var objectKey = Object.keys(object)[0];
      return _extends({}, acc, _defineProperty({}, objectKey, object[objectKey]));
    }, {});
  };

  var object2arrCoupleObjects = function object2arrCoupleObjects(incomingObject) {
    return Object.keys(incomingObject).reduce(function (acc, outKey) {
      return _extends({}, acc, _defineProperty({}, outKey, Object.keys(incomingObject[outKey]).reduce(function (objectsArray, inKey) {
        return [].concat(_toConsumableArray(objectsArray), [_defineProperty({}, inKey, incomingObject[outKey][inKey])]);
      }, [])));
    }, {});
  };

  var primeObjectA = Array.isArray(obA) ? arrCoupleObjects2object(obA) : obA;

  var primeObjectB = Array.isArray(obB) ? arrCoupleObjects2object(obB) : obB;

  (function walker(oA, oB) {
    var objectPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var oAB = Object.assign({}, oA, oB);

    var path = function path(arrayKeys) {
      var deepObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return arrayKeys.reduceRight(function (acc, key) {
        return _defineProperty({}, key, _extends({}, acc));
      }, deepObject);
    };

    Object.keys(oAB).forEach(function (subAB) {
      var saved = void 0;
      var added = void 0;
      var updated = void 0;
      var deleted = void 0;

      if (_typeof(oA[subAB]) === 'object' && _typeof(oB[subAB]) === 'object') {
        walker(oA[subAB], oB[subAB], [].concat(_toConsumableArray(objectPath), [subAB]));
      } else {
        if (!(subAB in oA) && subAB in oB) added = oAB[subAB];

        if (subAB in oA && subAB in oB && oA[subAB] === oB[subAB]) saved = oAB[subAB];

        if (subAB in oA && subAB in oB && oA[subAB] !== oB[subAB]) updated = oAB[subAB];

        if (subAB in oA && !(subAB in oB)) deleted = oAB[subAB];

        result = {
          added: Object.assign({}, _extends({}, result.added), added !== undefined ? path(objectPath, _defineProperty({}, subAB, added)) : {}),
          saved: Object.assign({}, _extends({}, result.saved), saved !== undefined ? path(objectPath, _defineProperty({}, subAB, saved)) : {}),
          updated: Object.assign({}, _extends({}, result.updated), updated !== undefined ? path(objectPath, _defineProperty({}, subAB, updated)) : {}),
          deleted: Object.assign({}, _extends({}, result.deleted), deleted !== undefined ? path(objectPath, _defineProperty({}, subAB, deleted)) : {})
        };
      }
    });
  })(primeObjectA, primeObjectB);
  return Array.isArray(obA) && Array.isArray(obB) ? object2arrCoupleObjects(result) : result;
};