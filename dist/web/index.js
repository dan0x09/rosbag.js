(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rosbag"] = factory();
	else
		root["rosbag"] = factory();
})(typeof self !== 'undefined' ? self : this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
const ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ "./node_modules/heap/index.js":
/*!************************************!*\
  !*** ./node_modules/heap/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/heap */ "./node_modules/heap/lib/heap.js");


/***/ }),

/***/ "./node_modules/heap/lib/heap.js":
/*!***************************************!*\
  !*** ./node_modules/heap/lib/heap.js ***!
  \***************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.8.0
(function() {
  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

  floor = Math.floor, min = Math.min;


  /*
  Default comparison function to be used
   */

  defaultCmp = function(x, y) {
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };


  /*
  Insert item x in list a, and keep it sorted assuming a is sorted.
  
  If x is already in a, insert it to the right of the rightmost x.
  
  Optional args lo (default 0) and hi (default a.length) bound the slice
  of a to be searched.
   */

  insort = function(a, x, lo, hi, cmp) {
    var mid;
    if (lo == null) {
      lo = 0;
    }
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (lo < 0) {
      throw new Error('lo must be non-negative');
    }
    if (hi == null) {
      hi = a.length;
    }
    while (lo < hi) {
      mid = floor((lo + hi) / 2);
      if (cmp(x, a[mid]) < 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
  };


  /*
  Push item onto heap, maintaining the heap invariant.
   */

  heappush = function(array, item, cmp) {
    if (cmp == null) {
      cmp = defaultCmp;
    }
    array.push(item);
    return _siftdown(array, 0, array.length - 1, cmp);
  };


  /*
  Pop the smallest item off the heap, maintaining the heap invariant.
   */

  heappop = function(array, cmp) {
    var lastelt, returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    lastelt = array.pop();
    if (array.length) {
      returnitem = array[0];
      array[0] = lastelt;
      _siftup(array, 0, cmp);
    } else {
      returnitem = lastelt;
    }
    return returnitem;
  };


  /*
  Pop and return the current smallest value, and add the new item.
  
  This is more efficient than heappop() followed by heappush(), and can be
  more appropriate when using a fixed size heap. Note that the value
  returned may be larger than item! That constrains reasonable use of
  this routine unless written as part of a conditional replacement:
      if item > array[0]
        item = heapreplace(array, item)
   */

  heapreplace = function(array, item, cmp) {
    var returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    returnitem = array[0];
    array[0] = item;
    _siftup(array, 0, cmp);
    return returnitem;
  };


  /*
  Fast version of a heappush followed by a heappop.
   */

  heappushpop = function(array, item, cmp) {
    var _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (array.length && cmp(array[0], item) < 0) {
      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
      _siftup(array, 0, cmp);
    }
    return item;
  };


  /*
  Transform list into a heap, in-place, in O(array.length) time.
   */

  heapify = function(array, cmp) {
    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    _ref1 = (function() {
      _results1 = [];
      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this).reverse();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      i = _ref1[_i];
      _results.push(_siftup(array, i, cmp));
    }
    return _results;
  };


  /*
  Update the position of the given item in the heap.
  This function should be called every time the item is being modified.
   */

  updateItem = function(array, item, cmp) {
    var pos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    pos = array.indexOf(item);
    if (pos === -1) {
      return;
    }
    _siftdown(array, 0, pos, cmp);
    return _siftup(array, pos, cmp);
  };


  /*
  Find the n largest elements in a dataset.
   */

  nlargest = function(array, n, cmp) {
    var elem, result, _i, _len, _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    result = array.slice(0, n);
    if (!result.length) {
      return result;
    }
    heapify(result, cmp);
    _ref = array.slice(n);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elem = _ref[_i];
      heappushpop(result, elem, cmp);
    }
    return result.sort(cmp).reverse();
  };


  /*
  Find the n smallest elements in a dataset.
   */

  nsmallest = function(array, n, cmp) {
    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (n * 10 <= array.length) {
      result = array.slice(0, n).sort(cmp);
      if (!result.length) {
        return result;
      }
      los = result[result.length - 1];
      _ref = array.slice(n);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        if (cmp(elem, los) < 0) {
          insort(result, elem, 0, null, cmp);
          result.pop();
          los = result[result.length - 1];
        }
      }
      return result;
    }
    heapify(array, cmp);
    _results = [];
    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      _results.push(heappop(array, cmp));
    }
    return _results;
  };

  _siftdown = function(array, startpos, pos, cmp) {
    var newitem, parent, parentpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    newitem = array[pos];
    while (pos > startpos) {
      parentpos = (pos - 1) >> 1;
      parent = array[parentpos];
      if (cmp(newitem, parent) < 0) {
        array[pos] = parent;
        pos = parentpos;
        continue;
      }
      break;
    }
    return array[pos] = newitem;
  };

  _siftup = function(array, pos, cmp) {
    var childpos, endpos, newitem, rightpos, startpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    endpos = array.length;
    startpos = pos;
    newitem = array[pos];
    childpos = 2 * pos + 1;
    while (childpos < endpos) {
      rightpos = childpos + 1;
      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
        childpos = rightpos;
      }
      array[pos] = array[childpos];
      pos = childpos;
      childpos = 2 * pos + 1;
    }
    array[pos] = newitem;
    return _siftdown(array, startpos, pos, cmp);
  };

  Heap = (function() {
    Heap.push = heappush;

    Heap.pop = heappop;

    Heap.replace = heapreplace;

    Heap.pushpop = heappushpop;

    Heap.heapify = heapify;

    Heap.updateItem = updateItem;

    Heap.nlargest = nlargest;

    Heap.nsmallest = nsmallest;

    function Heap(cmp) {
      this.cmp = cmp != null ? cmp : defaultCmp;
      this.nodes = [];
    }

    Heap.prototype.push = function(x) {
      return heappush(this.nodes, x, this.cmp);
    };

    Heap.prototype.pop = function() {
      return heappop(this.nodes, this.cmp);
    };

    Heap.prototype.peek = function() {
      return this.nodes[0];
    };

    Heap.prototype.contains = function(x) {
      return this.nodes.indexOf(x) !== -1;
    };

    Heap.prototype.replace = function(x) {
      return heapreplace(this.nodes, x, this.cmp);
    };

    Heap.prototype.pushpop = function(x) {
      return heappushpop(this.nodes, x, this.cmp);
    };

    Heap.prototype.heapify = function() {
      return heapify(this.nodes, this.cmp);
    };

    Heap.prototype.updateItem = function(x) {
      return updateItem(this.nodes, x, this.cmp);
    };

    Heap.prototype.clear = function() {
      return this.nodes = [];
    };

    Heap.prototype.empty = function() {
      return this.nodes.length === 0;
    };

    Heap.prototype.size = function() {
      return this.nodes.length;
    };

    Heap.prototype.clone = function() {
      var heap;
      heap = new Heap();
      heap.nodes = this.nodes.slice(0);
      return heap;
    };

    Heap.prototype.toArray = function() {
      return this.nodes.slice(0);
    };

    Heap.prototype.insert = Heap.prototype.push;

    Heap.prototype.top = Heap.prototype.peek;

    Heap.prototype.front = Heap.prototype.peek;

    Heap.prototype.has = Heap.prototype.contains;

    Heap.prototype.copy = Heap.prototype.clone;

    return Heap;

  })();

  (function(root, factory) {
    if (true) {
      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(this, function() {
    return Heap;
  });

}).call(this);


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/int53/index.js":
/*!*************************************!*\
  !*** ./node_modules/int53/index.js ***!
  \*************************************/
/***/ ((module) => {

var int53 = {}

var MAX_UINT32 = 0x00000000FFFFFFFF
var MAX_INT53 =  0x001FFFFFFFFFFFFF

function assert (test, message) {
	if(!test) throw new Error(message)
}

function onesComplement(number) {
	number = ~number
	if (number < 0) {
		number = (number & 0x7FFFFFFF) + 0x80000000
	}
	return number
}

function uintHighLow(number) {
	assert(number > -1 && number <= MAX_INT53, "number out of range")
	assert(Math.floor(number) === number, "number must be an integer")
	var high = 0
	var signbit = number & 0xFFFFFFFF
	var low = signbit < 0 ? (number & 0x7FFFFFFF) + 0x80000000 : signbit
	if (number > MAX_UINT32) {
		high = (number - low) / (MAX_UINT32 + 1)
	}
	return [high, low]
}

function intHighLow(number) {
	if (number > -1) {
		return uintHighLow(number)
	}
	var hl = uintHighLow(-number)
	var high = onesComplement(hl[0])
	var low = onesComplement(hl[1])
	if (low === MAX_UINT32) {
		high += 1
		low = 0
	}
	else {
		low += 1
	}
	return [high, low]
}

function toDouble(high, low, signed) {
	if (signed && (high & 0x80000000) !== 0) {
		high = onesComplement(high)
		low = onesComplement(low)
		assert(high < 0x00200000, "number too small")
		return -((high * (MAX_UINT32 + 1)) + low + 1)
	}
	else { //positive
		assert(high < 0x00200000, "number too large")
		return (high * (MAX_UINT32 + 1)) + low
	}
}

int53.readInt64BE = function (buffer, offset) {
	offset = offset || 0
	var high = buffer.readUInt32BE(offset)
	var low = buffer.readUInt32BE(offset + 4)
	return toDouble(high, low, true)
}

int53.readInt64LE = function (buffer, offset) {
	offset = offset || 0
	var low = buffer.readUInt32LE(offset)
	var high = buffer.readUInt32LE(offset + 4)
	return toDouble(high, low, true)
}

int53.readUInt64BE = function (buffer, offset) {
	offset = offset || 0
	var high = buffer.readUInt32BE(offset)
	var low = buffer.readUInt32BE(offset + 4)
	return toDouble(high, low, false)
}

int53.readUInt64LE = function (buffer, offset) {
	offset = offset || 0
	var low = buffer.readUInt32LE(offset)
	var high = buffer.readUInt32LE(offset + 4)
	return toDouble(high, low, false)
}

int53.writeInt64BE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = intHighLow(number)
	buffer.writeUInt32BE(hl[0], offset)
	buffer.writeUInt32BE(hl[1], offset + 4)
}

int53.writeInt64LE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = intHighLow(number)
	buffer.writeUInt32LE(hl[1], offset)
	buffer.writeUInt32LE(hl[0], offset + 4)
}

int53.writeUInt64BE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = uintHighLow(number)
	buffer.writeUInt32BE(hl[0], offset)
	buffer.writeUInt32BE(hl[1], offset + 4)
}

int53.writeUInt64LE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = uintHighLow(number)
	buffer.writeUInt32LE(hl[1], offset)
	buffer.writeUInt32LE(hl[0], offset + 4)
}

module.exports = int53


/***/ }),

/***/ "./src/BagReader.ts":
/*!**************************!*\
  !*** ./src/BagReader.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BagReader)
/* harmony export */ });
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header */ "./src/header.ts");
/* harmony import */ var _nmerge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nmerge */ "./src/nmerge.ts");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./record */ "./src/record.ts");
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.ts");
// Copyright (c) 2018-present, Cruise LLC




const HEADER_READAHEAD = 4096;
const HEADER_OFFSET = 13;
/**
 * BagReader is a lower level interface for reading specific sections & chunks
 * from a rosbag file - generally it is consumed through the Bag class, but
 * can be useful to use directly for efficiently accessing raw pieces from
 * within the bag
 */
class BagReader {
    constructor(filelike) {
        this._file = filelike;
        this._lastChunkInfo = undefined;
    }
    verifyBagHeader(callback, next) {
        this._file.read(0, HEADER_OFFSET, (error, buffer) => {
            if (error || !buffer) {
                callback(error || new Error("Missing both error and buffer"));
                return;
            }
            if (this._file.size() < HEADER_OFFSET) {
                callback(new Error("Missing file header."));
                return;
            }
            if (buffer.toString() !== "#ROSBAG V2.0\n") {
                callback(new Error("Cannot identify bag format."));
                return;
            }
            next();
        });
    }
    /**
     * Reads the header block from the rosbag file.
     *
     * Generally you call this first because you need the header information to call readConnectionsAndChunkInfo
     */
    readHeader(callback) {
        this.verifyBagHeader(callback, () => {
            this._file.read(HEADER_OFFSET, HEADER_READAHEAD, (error, buffer) => {
                if (error || !buffer) {
                    callback(error || new Error("Missing both error and buffer"));
                    return;
                }
                const read = buffer.length;
                if (read < 8) {
                    callback(new Error(`Record at position ${HEADER_OFFSET} is truncated.`));
                    return;
                }
                const headerLength = buffer.readInt32LE(0);
                if (read < headerLength + 8) {
                    callback(new Error(`Record at position ${HEADER_OFFSET} header too large: ${headerLength}.`));
                    return;
                }
                try {
                    const header = this.readRecordFromBuffer(buffer, HEADER_OFFSET, _record__WEBPACK_IMPORTED_MODULE_2__.BagHeader);
                    callback(null, header);
                }
                catch (e) {
                    callback(new Error(`Could not read header from rosbag file buffer - ${e.message}`));
                }
            });
        });
    }
    // promisified version of readHeader
    readHeaderAsync() {
        return new Promise((resolve, reject) => this.readHeader((err, header) => (err || !header ? reject(err) : resolve(header))));
    }
    /**
     * Reads connection and chunk information from the bag.
     *
     * You'll generally call this after reading the header so you can get
     * connection metadata and chunkInfos which allow you to seek to individual
     * chunks & read them
     */
    readConnectionsAndChunkInfo(fileOffset, connectionCount, chunkCount, callback) {
        this._file.read(fileOffset, this._file.size() - fileOffset, (err, buffer) => {
            if (err || !buffer) {
                return callback(err || new Error("Missing both error and buffer"));
            }
            if (connectionCount === 0) {
                return callback(null, {
                    connections: [],
                    chunkInfos: [],
                });
            }
            const connections = this.readRecordsFromBuffer(buffer, connectionCount, fileOffset, _record__WEBPACK_IMPORTED_MODULE_2__.Connection);
            const connectionBlockLength = connections[connectionCount - 1].end - connections[0].offset;
            const chunkInfos = this.readRecordsFromBuffer(buffer.slice(connectionBlockLength), chunkCount, fileOffset + connectionBlockLength, _record__WEBPACK_IMPORTED_MODULE_2__.ChunkInfo);
            if (chunkCount > 0) {
                for (let i = 0; i < chunkCount - 1; i++) {
                    chunkInfos[i].nextChunk = chunkInfos[i + 1];
                }
                chunkInfos[chunkCount - 1].nextChunk = undefined;
            }
            return callback(null, {
                connections,
                chunkInfos,
            });
        });
    }
    // promisified version of readConnectionsAndChunkInfo
    readConnectionsAndChunkInfoAsync(fileOffset, connectionCount, chunkCount) {
        return new Promise((resolve, reject) => {
            this.readConnectionsAndChunkInfo(fileOffset, connectionCount, chunkCount, (err, result) => (err || !result ? reject(err) : resolve(result)));
        });
    }
    /**
     * Reads individual raw messages from the bag at a given chunk.
     *
     * Filters to a specific set of connection ids, start time, & end time.
     * Generally the records will be of type MessageData
     */
    readChunkMessages(chunkInfo, connections, startTime, endTime, decompress, callback) {
        const start = startTime || {
            sec: 0,
            nsec: 0,
        };
        const end = endTime || {
            sec: Number.MAX_VALUE,
            nsec: Number.MAX_VALUE,
        };
        const conns = connections || chunkInfo.connections.map((connection) => connection.conn);
        this.readChunk(chunkInfo, decompress, (error, result) => {
            if (error || !result) {
                return callback(error || new Error("Missing both error and result"));
            }
            const { chunk } = result;
            const indices = {};
            result.indices.forEach((index) => {
                indices[index.conn] = index;
            });
            const presentConnections = conns.filter((conn) => indices[conn] !== undefined);
            const iterables = presentConnections.map((conn) => indices[conn].indices[Symbol.iterator]());
            const iter = (0,_nmerge__WEBPACK_IMPORTED_MODULE_1__["default"])((a, b) => _TimeUtil__WEBPACK_IMPORTED_MODULE_3__.compare(a.time, b.time), ...iterables);
            const entries = [];
            let item = iter.next();
            while (!item.done) {
                const { value } = item;
                item = iter.next();
                if (!value || _TimeUtil__WEBPACK_IMPORTED_MODULE_3__.isGreaterThan(start, value.time)) {
                    // eslint-disable-next-line no-continue
                    continue;
                }
                if (_TimeUtil__WEBPACK_IMPORTED_MODULE_3__.isGreaterThan(value.time, end)) {
                    break;
                }
                entries.push(value);
            }
            const messages = entries.map((entry) => this.readRecordFromBuffer(chunk.data.slice(entry.offset), chunk.dataOffset, _record__WEBPACK_IMPORTED_MODULE_2__.MessageData));
            return callback(null, messages);
        });
    }
    // promisified version of readChunkMessages
    readChunkMessagesAsync(chunkInfo, connections, startTime, endTime, decompress) {
        return new Promise((resolve, reject) => {
            this.readChunkMessages(chunkInfo, connections, startTime, endTime, decompress, (err, messages) => (err || !messages ? reject(err) : resolve(messages)));
        });
    }
    /**
     * Reads a single chunk record && its index records given a chunkInfo.
     */
    readChunk(chunkInfo, decompress, callback) {
        // if we're reading the same chunk a second time return the cached version
        // to avoid doing decompression on the same chunk multiple times which is
        // expensive
        if (chunkInfo === this._lastChunkInfo && this._lastReadResult) {
            // always callback async, even if we have the result
            // https://oren.github.io/blog/zalgo.html
            const lastReadResult = this._lastReadResult;
            setTimeout(() => callback(null, lastReadResult), 0);
            return;
        }
        const { nextChunk } = chunkInfo;
        const readLength = nextChunk
            ? nextChunk.chunkPosition - chunkInfo.chunkPosition
            : this._file.size() - chunkInfo.chunkPosition;
        this._file.read(chunkInfo.chunkPosition, readLength, (err, buffer) => {
            if (err || !buffer) {
                return callback(err || new Error("Missing both error and buffer"));
            }
            const chunk = this.readRecordFromBuffer(buffer, chunkInfo.chunkPosition, _record__WEBPACK_IMPORTED_MODULE_2__.Chunk);
            const { compression } = chunk;
            if (compression !== "none") {
                const decompressFn = decompress[compression];
                if (!decompressFn) {
                    return callback(new Error(`Unsupported compression type ${chunk.compression}`));
                }
                const result = decompressFn(chunk.data, chunk.size);
                chunk.data = result;
            }
            const indices = this.readRecordsFromBuffer(buffer.slice(chunk.length), chunkInfo.count, chunkInfo.chunkPosition + chunk.length, _record__WEBPACK_IMPORTED_MODULE_2__.IndexData);
            this._lastChunkInfo = chunkInfo;
            this._lastReadResult = {
                chunk,
                indices,
            };
            return callback(null, this._lastReadResult);
        });
    }
    /**
     * Reads count records from a buffer starting at fileOffset.
     */
    readRecordsFromBuffer(buffer, count, fileOffset, Cls) {
        const records = [];
        let bufferOffset = 0;
        for (let i = 0; i < count; i++) {
            const record = this.readRecordFromBuffer(buffer.slice(bufferOffset), fileOffset + bufferOffset, Cls);
            bufferOffset += record.end - record.offset;
            records.push(record);
        }
        return records;
    }
    /**
     * Reads an individual record from a buffer.
     */
    // eslint-disable-next-line class-methods-use-this
    readRecordFromBuffer(buffer, fileOffset, Cls) {
        const headerLength = buffer.readInt32LE(0);
        const headerFields = (0,_header__WEBPACK_IMPORTED_MODULE_0__.parseHeader)(buffer.slice(4, 4 + headerLength), Cls);
        const dataOffset = 4 + headerLength + 4;
        const dataLength = buffer.readInt32LE(4 + headerLength);
        const data = buffer.slice(dataOffset, dataOffset + dataLength);
        const record = new Cls(fileOffset, dataOffset, dataLength, headerFields, data);
        return record;
    }
}


/***/ }),

/***/ "./src/MessageReader.ts":
/*!******************************!*\
  !*** ./src/MessageReader.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MessageReader: () => (/* binding */ MessageReader)
/* harmony export */ });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "./node_modules/int53/index.js");
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(int53__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fields */ "./src/fields.ts");
/* harmony import */ var _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parseMessageDefinition */ "./src/parseMessageDefinition.ts");
// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.



/**
 * This has hard-coded buffer reading functions for each
 * of the standard message types http://docs.ros.org/api/std_msgs/html/index-msg.html
 * eventually custom types decompose into these standard types
 */
class StandardTypeReader {
    constructor(buffer) {
        this._decoderStatus = "NOT_INITIALIZED";
        this.buffer = buffer;
        this.offset = 0;
        this.view = new DataView(buffer.buffer, buffer.byteOffset);
    }
    _intializeTextDecoder() {
        if (typeof __webpack_require__.g.TextDecoder === "undefined") {
            this._decoderStatus = "NOT_AVAILABLE";
            return;
        }
        try {
            this._decoder = new __webpack_require__.g.TextDecoder("ascii");
            this._decoderStatus = "INITIALIZED";
        }
        catch (e) {
            // Swallow the error if we don't support ascii encoding.
            this._decoderStatus = "NOT_AVAILABLE";
        }
    }
    json() {
        const resultString = this.string();
        try {
            return JSON.parse(resultString);
        }
        catch (_a) {
            return `Could not parse ${resultString}`;
        }
    }
    string() {
        const len = this.int32();
        const codePoints = new Uint8Array(this.buffer.buffer, this.buffer.byteOffset + this.offset, len);
        this.offset += len;
        // if the string is relatively short we can use apply, but longer strings can benefit from the speed of TextDecoder.
        if (codePoints.length < 1000) {
            // @ts-expect-error   Type 'Uint8Array' is missing the following properties from type 'number[]': pop, push, concat, shift, and 5 more.
            return String.fromCharCode.apply(null, codePoints);
        }
        // Use TextDecoder if it is available and supports the "ascii" encoding.
        if (this._decoderStatus === "NOT_INITIALIZED") {
            this._intializeTextDecoder();
        }
        if (this._decoder) {
            // TextDecoder does not support Uint8Arrays that are backed by SharedArrayBuffer, so copy the array here.
            // SharedArrayBuffer support has been added to the spec, but most browsers have not implemented this change.
            // See spec change: https://github.com/whatwg/encoding/pull/182
            // Track browser support here: https://github.com/whatwg/encoding/pull/182#issuecomment-539932294
            const input = codePoints.buffer instanceof __webpack_require__.g.SharedArrayBuffer ? new Uint8Array(codePoints) : codePoints;
            return this._decoder.decode(input);
        }
        // Otherwise, use string concatentation.
        let data = "";
        for (let i = 0; i < len; i++) {
            data += String.fromCharCode(codePoints[i]);
        }
        return data;
    }
    bool() {
        return this.uint8() !== 0;
    }
    int8() {
        return this.view.getInt8(this.offset++);
    }
    uint8() {
        return this.view.getUint8(this.offset++);
    }
    typedArray(len, ArrayType) {
        const arrayLength = len == null ? this.uint32() : len;
        const data = new ArrayType(this.view.buffer, this.offset + this.view.byteOffset, arrayLength);
        this.offset += arrayLength;
        return data;
    }
    int16() {
        const result = this.view.getInt16(this.offset, true);
        this.offset += 2;
        return result;
    }
    uint16() {
        const result = this.view.getUint16(this.offset, true);
        this.offset += 2;
        return result;
    }
    int32() {
        const result = this.view.getInt32(this.offset, true);
        this.offset += 4;
        return result;
    }
    uint32() {
        const result = this.view.getUint32(this.offset, true);
        this.offset += 4;
        return result;
    }
    float32() {
        const result = this.view.getFloat32(this.offset, true);
        this.offset += 4;
        return result;
    }
    float64() {
        const result = this.view.getFloat64(this.offset, true);
        this.offset += 8;
        return result;
    }
    int64() {
        const { offset } = this;
        this.offset += 8;
        return int53__WEBPACK_IMPORTED_MODULE_0___default().readInt64LE(this.buffer, offset);
    }
    uint64() {
        const { offset } = this;
        this.offset += 8;
        return int53__WEBPACK_IMPORTED_MODULE_0___default().readUInt64LE(this.buffer, offset);
    }
    time() {
        const { offset } = this;
        this.offset += 8;
        return (0,_fields__WEBPACK_IMPORTED_MODULE_1__.extractTime)(this.buffer, offset);
    }
    duration() {
        const { offset } = this;
        this.offset += 8;
        return (0,_fields__WEBPACK_IMPORTED_MODULE_1__.extractTime)(this.buffer, offset);
    }
}
const findTypeByName = (types, name) => {
    const matches = types.filter((type) => type.name === name);
    if (matches.length !== 1) {
        throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}.`);
    }
    return matches[0];
};
const friendlyName = (name) => name.replace(/\//g, "_");
const createParser = (types, typeName, freeze) => {
    const topLevelTypes = types.filter((type) => type.name === typeName);
    if (topLevelTypes.length !== 1) {
        throw new Error("multiple top-level types");
    }
    const [topLevelType] = topLevelTypes;
    const nestedTypes = types.filter((type) => type.name !== typeName);
    const constructorBody = (type) => {
        const readerLines = [];
        type.definitions.forEach((def) => {
            if (def.isConstant) {
                return;
            }
            if (def.isArray) {
                if (def.type === "uint8" || def.type === "int8") {
                    const arrayType = def.type === "uint8" ? "Uint8Array" : "Int8Array";
                    readerLines.push(`this.${def.name} = reader.typedArray(${String(def.arrayLength)}, ${arrayType});`);
                    return;
                }
                const lenField = `length_${def.name}`;
                // set a variable pointing to the parsed fixed array length
                // or read the byte indicating the dynamic length
                readerLines.push(`var ${lenField} = ${def.arrayLength ? def.arrayLength : "reader.uint32();"}`);
                // only allocate an array if there is a length - skips empty allocations
                const arrayName = `this.${def.name}`;
                // allocate the new array to a fixed length since we know it ahead of time
                readerLines.push(`${arrayName} = new Array(${lenField})`);
                // start the for-loop
                readerLines.push(`for (var i = 0; i < ${lenField}; i++) {`);
                // if the sub type is complex we need to allocate it and parse its values
                if (def.isComplex) {
                    const defType = findTypeByName(types, def.type);
                    // recursively call the constructor for the sub-type
                    readerLines.push(`  ${arrayName}[i] = new Record.${friendlyName(defType.name)}(reader);`);
                }
                else {
                    // if the subtype is not complex its a simple low-level reader operation
                    readerLines.push(`  ${arrayName}[i] = reader.${def.type}();`);
                }
                readerLines.push("}"); // close the for-loop
            }
            else if (def.isComplex) {
                const defType = findTypeByName(types, def.type);
                readerLines.push(`this.${def.name} = new Record.${friendlyName(defType.name)}(reader);`);
            }
            else {
                readerLines.push(`this.${def.name} = reader.${def.type}();`);
            }
        });
        if (freeze) {
            readerLines.push("Object.freeze(this);");
        }
        return readerLines.join("\n    ");
    };
    let js = `
  var Record = function (reader) {
    ${constructorBody(topLevelType)}
  };\n`;
    nestedTypes.forEach((t) => {
        js += `
  Record.${friendlyName(t.name)} = function(reader) {
    ${constructorBody(t)}
  };\n`;
    });
    js += `
  return function read(reader) {
    return new Record(reader);
  };`;
    let _read;
    try {
        // eslint-disable-next-line no-eval
        _read = eval(`(function buildReader() { ${js} })()`);
    }
    catch (e) {
        console.error("error building parser:", js); // eslint-disable-line no-console
        throw e;
    }
    return function parser(buffer) {
        const reader = new StandardTypeReader(buffer);
        return _read(reader);
    };
};
class MessageReader {
    // takes an object message definition and returns
    // a message reader which can be used to read messages based
    // on the message definition
    constructor(definitions, typeName, options = {}) {
        let parsedDefinitions = definitions;
        if (typeof parsedDefinitions === "string") {
            // eslint-disable-next-line no-console
            console.warn("Passing string message defintions to MessageReader is deprecated. Instead call `parseMessageDefinition` on it and pass in the resulting parsed message definition object.");
            parsedDefinitions = (0,_parseMessageDefinition__WEBPACK_IMPORTED_MODULE_2__.parseMessageDefinition)(parsedDefinitions, typeName);
        }
        this.reader = createParser(parsedDefinitions, typeName, !!options.freeze);
    }
    readMessage(buffer) {
        return this.reader(buffer);
    }
}


/***/ }),

/***/ "./src/MessageWriter.ts":
/*!******************************!*\
  !*** ./src/MessageWriter.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MessageWriter: () => (/* binding */ MessageWriter)
/* harmony export */ });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "./node_modules/int53/index.js");
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(int53__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.

// write a Time object to a buffer.
function writeTime(time, buffer, offset) {
    buffer.writeUInt32LE(time.sec, offset);
    buffer.writeUInt32LE(time.nsec, offset + 4);
}
class StandardTypeOffsetCalculator {
    constructor() {
        this.offset = 0;
    }
    // Returns the current offset and increments the next offset by `byteCount`.
    _incrementAndReturn(byteCount) {
        const { offset } = this;
        this.offset += byteCount;
        return offset;
    }
    // These are not actually used in the StandardTypeWriter, so they must be kept in sync with those implementations.
    json(value) {
        return this.string(JSON.stringify(value));
    }
    // The following are used in the StandardTypeWriter.
    string(value) {
        // int32 length
        const length = 4 + value.length;
        return this._incrementAndReturn(length);
    }
    bool() {
        return this.uint8();
    }
    int8() {
        return this._incrementAndReturn(1);
    }
    uint8() {
        return this._incrementAndReturn(1);
    }
    int16() {
        return this._incrementAndReturn(2);
    }
    uint16() {
        return this._incrementAndReturn(2);
    }
    int32() {
        return this._incrementAndReturn(4);
    }
    uint32() {
        return this._incrementAndReturn(4);
    }
    float32() {
        return this._incrementAndReturn(4);
    }
    float64() {
        return this._incrementAndReturn(8);
    }
    int64() {
        return this._incrementAndReturn(8);
    }
    uint64() {
        return this._incrementAndReturn(8);
    }
    time() {
        return this._incrementAndReturn(8);
    }
    duration() {
        return this._incrementAndReturn(8);
    }
}
// this has hard-coded buffer writing functions for each
// of the standard message types http://docs.ros.org/api/std_msgs/html/index-msg.html
// eventually custom types decompose into these standard types
class StandardTypeWriter {
    constructor(buffer) {
        this.buffer = buffer;
        this.view = new DataView(buffer.buffer, buffer.byteOffset);
        this.offsetCalculator = new StandardTypeOffsetCalculator();
    }
    json(value) {
        this.string(JSON.stringify(value));
    }
    string(value) {
        const stringOffset = this.offsetCalculator.string(value);
        this.view.setInt32(stringOffset, value.length, true);
        this.buffer.write(value, stringOffset + 4, value.length, "ascii");
    }
    bool(value) {
        this.uint8(value ? 1 : 0);
    }
    int8(value) {
        this.view.setInt8(this.offsetCalculator.int8(), value);
    }
    uint8(value) {
        this.view.setUint8(this.offsetCalculator.uint8(), value);
    }
    int16(value) {
        this.view.setInt16(this.offsetCalculator.int16(), value, true);
    }
    uint16(value) {
        this.view.setUint16(this.offsetCalculator.uint16(), value, true);
    }
    int32(value) {
        this.view.setInt32(this.offsetCalculator.int32(), value, true);
    }
    uint32(value) {
        this.view.setUint32(this.offsetCalculator.uint32(), value, true);
    }
    float32(value) {
        this.view.setFloat32(this.offsetCalculator.float32(), value, true);
    }
    float64(value) {
        this.view.setFloat64(this.offsetCalculator.float64(), value, true);
    }
    int64(value) {
        int53__WEBPACK_IMPORTED_MODULE_0___default().writeInt64LE(value, this.buffer, this.offsetCalculator.int64());
    }
    uint64(value) {
        int53__WEBPACK_IMPORTED_MODULE_0___default().writeUInt64LE(value, this.buffer, this.offsetCalculator.uint64());
    }
    time(time) {
        writeTime(time, this.buffer, this.offsetCalculator.time());
    }
    duration(time) {
        writeTime(time, this.buffer, this.offsetCalculator.time());
    }
}
const findTypeByName = (types, name) => {
    const ret = types.find((type) => type.name === name);
    if (ret == null) {
        throw new Error(`Type '${name}' but not found.`);
    }
    return ret;
};
const friendlyName = (name) => name.replace(/\//g, "_");
function createWriterAndSizeCalculator(types, typeName) {
    const topLevelType = findTypeByName(types, typeName);
    const nestedTypes = types.filter((type) => type.name !== typeName);
    const constructorBody = (type, argName) => {
        const lines = [];
        type.definitions.forEach((def) => {
            if (def.isConstant) {
                return;
            }
            // Accesses the field we are currently writing. Pulled out for easy reuse.
            const accessMessageField = `message["${def.name}"]`;
            if (def.isArray) {
                const lenField = `length_${def.name}`;
                // set a variable pointing to the parsed fixed array length
                // or write the byte indicating the dynamic length
                if (def.arrayLength) {
                    lines.push(`var ${lenField} = ${def.arrayLength};`);
                }
                else {
                    lines.push(`var ${lenField} = ${accessMessageField}.length;`);
                    lines.push(`${argName}.uint32(${lenField});`);
                }
                // start the for-loop
                lines.push(`for (var i = 0; i < ${lenField}; i++) {`);
                // if the sub type is complex we need to allocate it and parse its values
                if (def.isComplex) {
                    const defType = findTypeByName(types, def.type);
                    // recursively call the function for the sub-type
                    lines.push(`  ${friendlyName(defType.name)}(${argName}, ${accessMessageField}[i]);`);
                }
                else {
                    // if the subtype is not complex its a simple low-level operation
                    lines.push(`  ${argName}.${def.type}(${accessMessageField}[i]);`);
                }
                lines.push("}"); // close the for-loop
            }
            else if (def.isComplex) {
                const defType = findTypeByName(types, def.type);
                lines.push(`${friendlyName(defType.name)}(${argName}, ${accessMessageField});`);
            }
            else {
                // Call primitives directly.
                lines.push(`${argName}.${def.type}(${accessMessageField});`);
            }
        });
        return lines.join("\n    ");
    };
    let writerJs = "";
    let calculateSizeJs = "";
    nestedTypes.forEach((t) => {
        writerJs += `
  function ${friendlyName(t.name)}(writer, message) {
    ${constructorBody(t, "writer")}
  };\n`;
        calculateSizeJs += `
  function ${friendlyName(t.name)}(offsetCalculator, message) {
    ${constructorBody(t, "offsetCalculator")}
  };\n`;
    });
    writerJs += `
  return function write(writer, message) {
    ${constructorBody(topLevelType, "writer")}
    return writer.buffer;
  };`;
    calculateSizeJs += `
  return function calculateSize(offsetCalculator, message) {
    ${constructorBody(topLevelType, "offsetCalculator")}
    return offsetCalculator.offset;
  };`;
    let _write;
    let _calculateSize;
    try {
        // eslint-disable-next-line no-eval
        _write = eval(`(function buildWriter() { ${writerJs} })()`);
    }
    catch (e) {
        console.error("error building writer:", writerJs); // eslint-disable-line no-console
        throw e;
    }
    try {
        // eslint-disable-next-line no-eval
        _calculateSize = eval(`(function buildSizeCalculator() { ${calculateSizeJs} })()`);
    }
    catch (e) {
        console.error("error building size calculator:", calculateSizeJs); // eslint-disable-line no-console
        throw e;
    }
    return {
        writer(message, buffer) {
            const writer = new StandardTypeWriter(buffer);
            return _write(writer, message);
        },
        bufferSizeCalculator(message) {
            const offsetCalculator = new StandardTypeOffsetCalculator();
            return _calculateSize(offsetCalculator, message);
        },
    };
}
class MessageWriter {
    // takes an object string message definition and returns
    // a message writer which can be used to write messages based
    // on the message definition
    constructor(definitions, typeName) {
        const { writer, bufferSizeCalculator } = createWriterAndSizeCalculator(definitions, typeName);
        this.writer = writer;
        this.bufferSizeCalculator = bufferSizeCalculator;
    }
    // Calculates the buffer size needed to write this message in bytes.
    calculateBufferSize(message) {
        return this.bufferSizeCalculator(message);
    }
    // bufferToWrite is optional - if it is not provided, a buffer will be generated.
    writeMessage(message, bufferToWrite) {
        let buffer = bufferToWrite;
        if (!buffer) {
            const bufferSize = this.calculateBufferSize(message);
            buffer = Buffer.allocUnsafe(bufferSize);
        }
        return this.writer(message, buffer);
    }
}


/***/ }),

/***/ "./src/ReadResult.ts":
/*!***************************!*\
  !*** ./src/ReadResult.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReadResult)
/* harmony export */ });
// Copyright (c) 2018-present, Cruise LLC
/**
 * Represents a result passed to the callback from the high-level call:
 * `bag.readMessages({ opts: any }, callback: (ReadResult) => void) => Promise<void>`
 */
class ReadResult {
    constructor(topic, message, timestamp, data, chunkOffset, totalChunks, freeze) {
        // string: the topic the message was on
        this.topic = topic;
        // any: the parsed body of the message based on connection.messageDefinition
        this.message = message;
        // time: the timestamp of the message
        this.timestamp = timestamp;
        // buffer: raw buffer data of the message
        this.data = data;
        // the offset of the currently read chunk
        this.chunkOffset = chunkOffset;
        // the total number of chunks in the read operation
        this.totalChunks = totalChunks;
        if (freeze) {
            Object.freeze(timestamp);
            Object.freeze(this);
        }
    }
}


/***/ }),

/***/ "./src/TimeUtil.ts":
/*!*************************!*\
  !*** ./src/TimeUtil.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   areSame: () => (/* binding */ areSame),
/* harmony export */   compare: () => (/* binding */ compare),
/* harmony export */   fromDate: () => (/* binding */ fromDate),
/* harmony export */   isGreaterThan: () => (/* binding */ isGreaterThan),
/* harmony export */   isLessThan: () => (/* binding */ isLessThan),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
// Copyright (c) 2018-present, Cruise LLC
function fromDate(date) {
    const sec = Math.floor(date.getTime() / 1000);
    const nsec = date.getMilliseconds() * 1e6;
    return {
        sec,
        nsec,
    };
}
function toDate(time) {
    return new Date(time.sec * 1e3 + time.nsec / 1e6);
}
/**
 * Compare two times returning a negative value if the right is greater,
 * a positive value if the left is greater, or 0 if the times are equal.
 *
 * Useful to supply to `Array.prototype.sort`.
 */
function compare(left, right) {
    const secDiff = left.sec - right.sec;
    return secDiff || left.nsec - right.nsec;
}
/**
 * Returns true if the left time is less than the right time, otherwise false.
 */
function isLessThan(left, right) {
    return compare(left, right) < 0;
}
/**
 * Returns true if the left time is greater than the right time, otherwise false.
 */
function isGreaterThan(left, right) {
    return compare(left, right) > 0;
}
/**
 * Returns true if both times have the same number of seconds and nanoseconds.
 */
function areSame(left, right) {
    return left.sec === right.sec && left.nsec === right.nsec;
}
function toString(time) {
    return `{${time.sec}, ${time.nsec}}`;
}
/**
 * Computes the sum of two times or durations and returns a new time.
 *
 * Throws an exception if the resulting time is negative.
 */
function add(left, right) {
    const durationNanos = left.nsec + right.nsec;
    const secsFromNanos = Math.floor(durationNanos / 1e9);
    const newSecs = left.sec + right.sec + secsFromNanos;
    const remainingDurationNanos = durationNanos % 1e9;
    // use Math.abs here to prevent -0 when there is exactly 1 second of negative nanoseconds passed in
    const newNanos = Math.abs(Math.sign(remainingDurationNanos) === -1 ? 1e9 + remainingDurationNanos : remainingDurationNanos);
    const result = {
        sec: newSecs,
        nsec: newNanos,
    };
    if (result.sec < 0 || result.nsec < 0) {
        throw new Error(`Invalid time: ${toString(result)} produced from TimeUtil.add(${toString(left)}, ${toString(right)}})`);
    }
    return result;
}


/***/ }),

/***/ "./src/bag.ts":
/*!********************!*\
  !*** ./src/bag.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.ts");
/* harmony import */ var _ReadResult__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReadResult */ "./src/ReadResult.ts");
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.ts");
/* harmony import */ var _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parseMessageDefinition */ "./src/parseMessageDefinition.ts");
// Copyright (c) 2018-present, Cruise LLC




/**
 * The high level rosbag interface.
 *
 * Create a new bag by calling:
 * `const bag = await Bag.open('./path-to-file.bag')` in node or
 * `const bag = await Bag.open(files[0])` in the browser.
 *
 * After that you can consume messages by calling
 * `await bag.readMessages({ topics: ['/foo'] },
 *    (result) => console.log(result.topic, result.message))`
 */
class Bag {
    // you can optionally create a bag manually passing in a bagReader instance
    constructor(bagReader) {
        this.reader = bagReader;
    }
    // eslint-disable-next-line no-use-before-define
    assertOpen() {
        if (!this.header || !this.connections || !this.chunkInfos) {
            throw new Error("Bag needs to be opened");
        }
    }
    /**
     * If the bag is manually created with the constructor, you must call `await open()` on the bag.
     * Generally this is called for you if you're using `const bag = await Bag.open()`.
     *
     * Returns `this` with the type of `OpenBag`.
     */
    async open() {
        this.header = await this.reader.readHeaderAsync();
        const { connectionCount, chunkCount, indexPosition } = this.header;
        const result = await this.reader.readConnectionsAndChunkInfoAsync(indexPosition, connectionCount, chunkCount);
        this.connections = {};
        result.connections.forEach((connection) => {
            // Connections is definitly assigned above
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.connections[connection.conn] = connection;
        });
        this.chunkInfos = result.chunkInfos;
        if (chunkCount > 0) {
            // Get the earliest startTime among all chunks
            this.startTime = this.chunkInfos
                .map((x) => x.startTime)
                .reduce((prev, current) => (_TimeUtil__WEBPACK_IMPORTED_MODULE_2__.compare(prev, current) <= 0 ? prev : current));
            // Get the latest endTime among all chunks
            this.endTime = this.chunkInfos
                .map((x) => x.endTime)
                .reduce((prev, current) => (_TimeUtil__WEBPACK_IMPORTED_MODULE_2__.compare(prev, current) > 0 ? prev : current));
        }
        return this;
    }
    async readMessages(opts, callback) {
        this.assertOpen();
        const { connections } = this;
        const startTime = opts.startTime || {
            sec: 0,
            nsec: 0,
        };
        const endTime = opts.endTime || {
            sec: Number.MAX_VALUE,
            nsec: Number.MAX_VALUE,
        };
        const topics = opts.topics || Object.values(connections).map((connection) => connection.topic);
        const filteredConnections = Object.values(connections)
            .filter((connection) => topics.indexOf(connection.topic) !== -1)
            .map((connection) => +connection.conn);
        const { decompress = {} } = opts;
        // filter chunks to those which fall within the time range we're attempting to read
        const chunkInfos = this.chunkInfos.filter((info) => _TimeUtil__WEBPACK_IMPORTED_MODULE_2__.compare(info.startTime, endTime) <= 0 && _TimeUtil__WEBPACK_IMPORTED_MODULE_2__.compare(startTime, info.endTime) <= 0);
        function parseMsg(msg, chunkOffset) {
            const connection = connections[msg.conn];
            const { topic, type } = connection;
            const { data, time: timestamp } = msg;
            let message = null;
            if (!opts.noParse) {
                // lazily create a reader for this connection if it doesn't exist
                connection.reader =
                    connection.reader ||
                        new _MessageReader__WEBPACK_IMPORTED_MODULE_0__.MessageReader((0,_parseMessageDefinition__WEBPACK_IMPORTED_MODULE_3__.parseMessageDefinition)(connection.messageDefinition, type), type, {
                            freeze: opts.freeze,
                        });
                message = connection.reader.readMessage(data);
            }
            return new _ReadResult__WEBPACK_IMPORTED_MODULE_1__["default"](topic, message, timestamp, data, chunkOffset, chunkInfos.length, opts.freeze);
        }
        for (let i = 0; i < chunkInfos.length; i++) {
            const info = chunkInfos[i];
            // eslint-disable-next-line no-await-in-loop
            const messages = await this.reader.readChunkMessagesAsync(info, filteredConnections, startTime, endTime, decompress);
            messages.forEach((msg) => callback(parseMsg(msg, i)));
        }
    }
}
Bag.open = (_file) => Promise.reject(new Error("This method should have been overridden based on the environment. Make sure you are correctly importing the node or web version of Bag."));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bag);


/***/ }),

/***/ "./src/fields.ts":
/*!***********************!*\
  !*** ./src/fields.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractFields: () => (/* binding */ extractFields),
/* harmony export */   extractTime: () => (/* binding */ extractTime)
/* harmony export */ });
// Copyright (c) 2018-present, Cruise LLC
const EQUALS_CHARCODE = "=".charCodeAt(0);
/**
 * Reads through a buffer and extracts `{ [key: string]: value: string }`
 * pairs. The buffer is expected to have length prefixed utf8 strings
 * with a '=' separating the key and value
 */
function extractFields(buffer) {
    if (buffer.length < 4) {
        throw new Error("Header fields are truncated.");
    }
    let i = 0;
    const fields = {};
    while (i < buffer.length) {
        const length = buffer.readInt32LE(i);
        i += 4;
        if (i + length > buffer.length) {
            throw new Error("Header fields are corrupt.");
        }
        // Passing a number into "indexOf" explicitly to avoid Buffer polyfill
        // slow path. See issue #87.
        const field = buffer.slice(i, i + length);
        const index = field.indexOf(EQUALS_CHARCODE);
        if (index === -1) {
            throw new Error("Header field is missing equals sign.");
        }
        fields[field.slice(0, index).toString()] = field.slice(index + 1);
        i += length;
    }
    return fields;
}
/**
 * Reads a Time object out of a buffer at the given offset.
 */
function extractTime(buffer, offset) {
    const sec = buffer.readUInt32LE(offset);
    const nsec = buffer.readUInt32LE(offset + 4);
    return {
        sec,
        nsec,
    };
}


/***/ }),

/***/ "./src/header.ts":
/*!***********************!*\
  !*** ./src/header.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseHeader: () => (/* binding */ parseHeader)
/* harmony export */ });
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fields */ "./src/fields.ts");
// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.

/**
 * Given a buffer parses out the record within the buffer
 * based on the opcode type bit.
 */
function parseHeader(buffer, Cls) {
    const fields = (0,_fields__WEBPACK_IMPORTED_MODULE_0__.extractFields)(buffer);
    if (fields.op === undefined) {
        throw new Error("Header is missing 'op' field.");
    }
    const opcode = fields.op.readUInt8(0);
    if (opcode !== Cls.opcode) {
        throw new Error(`Expected ${Cls.name} (${Cls.opcode}) but found ${opcode}`);
    }
    return fields;
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bag: () => (/* reexport safe */ _bag__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   BagReader: () => (/* reexport safe */ _BagReader__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   MessageReader: () => (/* reexport safe */ _MessageReader__WEBPACK_IMPORTED_MODULE_1__.MessageReader),
/* harmony export */   MessageWriter: () => (/* reexport safe */ _MessageWriter__WEBPACK_IMPORTED_MODULE_2__.MessageWriter),
/* harmony export */   TimeUtil: () => (/* reexport module object */ _TimeUtil__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   extractFields: () => (/* reexport safe */ _fields__WEBPACK_IMPORTED_MODULE_5__.extractFields),
/* harmony export */   extractTime: () => (/* reexport safe */ _fields__WEBPACK_IMPORTED_MODULE_5__.extractTime),
/* harmony export */   open: () => (/* binding */ open),
/* harmony export */   parseMessageDefinition: () => (/* reexport safe */ _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_6__.parseMessageDefinition),
/* harmony export */   rosPrimitiveTypes: () => (/* reexport safe */ _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_6__.rosPrimitiveTypes)
/* harmony export */ });
/* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BagReader */ "./src/BagReader.ts");
/* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.ts");
/* harmony import */ var _MessageWriter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MessageWriter */ "./src/MessageWriter.ts");
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.ts");
/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bag */ "./src/bag.ts");
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fields */ "./src/fields.ts");
/* harmony import */ var _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./parseMessageDefinition */ "./src/parseMessageDefinition.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./types */ "./src/types.ts");
// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.







const { open } = _bag__WEBPACK_IMPORTED_MODULE_4__["default"];
// These exports must match node/index.ts and web/index.ts


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_bag__WEBPACK_IMPORTED_MODULE_4__["default"]);


/***/ }),

/***/ "./src/nmerge.ts":
/*!***********************!*\
  !*** ./src/nmerge.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! heap */ "./node_modules/heap/index.js");
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(heap__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.

function nmerge(key, ...iterables) {
    const heap = new (heap__WEBPACK_IMPORTED_MODULE_0___default())((a, b) => key(a.value, b.value));
    for (let i = 0; i < iterables.length; i++) {
        const { value, done } = iterables[i].next();
        if (!done) {
            heap.push({
                i,
                value,
            });
        }
    }
    return {
        next: () => {
            if (heap.empty()) {
                return {
                    done: true,
                };
            }
            const { i } = heap.front();
            const next = iterables[i].next();
            if (next.done) {
                return {
                    value: heap.pop().value,
                    done: false,
                };
            }
            return {
                value: heap.replace({
                    i,
                    value: next.value,
                }).value,
                done: false,
            };
        },
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nmerge);


/***/ }),

/***/ "./src/parseMessageDefinition.ts":
/*!***************************************!*\
  !*** ./src/parseMessageDefinition.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseMessageDefinition: () => (/* binding */ parseMessageDefinition),
/* harmony export */   rosPrimitiveTypes: () => (/* binding */ rosPrimitiveTypes)
/* harmony export */ });
// Copyright (c) 2018-present, Cruise LLC
// Set of built-in ros types. See http://wiki.ros.org/msg#Field_Types
const rosPrimitiveTypes = new Set([
    "string",
    "bool",
    "int8",
    "uint8",
    "int16",
    "uint16",
    "int32",
    "uint32",
    "float32",
    "float64",
    "int64",
    "uint64",
    "time",
    "duration",
    "json",
]);
function normalizeType(type) {
    // Normalize deprecated aliases.
    let normalizedType = type;
    if (type === "char") {
        normalizedType = "uint8";
    }
    if (type === "byte") {
        normalizedType = "int8";
    }
    return normalizedType;
}
// represents a single line in a message definition type
// e.g. 'string name' 'CustomType[] foo' 'string[3] names'
function newArrayDefinition(type, name, arrayLength) {
    const normalizedType = normalizeType(type);
    return {
        type: normalizedType,
        name,
        isArray: true,
        arrayLength: arrayLength === null ? undefined : arrayLength,
        isComplex: !rosPrimitiveTypes.has(normalizedType),
    };
}
function newDefinition(type, name) {
    const normalizedType = normalizeType(type);
    return {
        type: normalizedType,
        name,
        isArray: false,
        isComplex: !rosPrimitiveTypes.has(normalizedType),
    };
}
const tokenizeLine = (line) => line
    .replace(/#.*/gi, "")
    .split(" ")
    .filter((word) => word);
const buildNamedType = (lines, typeName) => {
    const definitions = [];
    lines.forEach(({ isJson, line }) => {
        // remove comments and extra whitespace from each line
        const splits = tokenizeLine(line);
        if (!splits[1]) {
            return;
        }
        // consume comments
        const type = splits[0].trim();
        const name = splits[1].trim();
        if (name.indexOf("=") > -1 || splits.indexOf("=") > -1) {
            // constant type parsing
            const matches = line.match(/(\S+)\s*=\s*(.*)\s*/);
            if (!matches) {
                throw new Error(`Malformed line: ${line}`);
            }
            let value = matches[2];
            if (type !== "string") {
                // handle special case of python bool values
                value = value.replace(/True/gi, "true");
                value = value.replace(/False/gi, "false");
                try {
                    value = JSON.parse(value.replace(/\s*#.*/g, ""));
                }
                catch (error) {
                    // eslint-disable-next-line no-console
                    console.warn(`Error in this constant definition: ${line}`);
                    throw error;
                }
                if (type === "bool") {
                    value = Boolean(value);
                }
            }
            if ((type.includes("int") && +value > Number.MAX_SAFE_INTEGER) || +value < Number.MIN_SAFE_INTEGER) {
                // eslint-disable-next-line no-console
                console.warn(`Found integer constant outside safe integer range: ${line}`);
            }
            definitions.push({
                type: normalizeType(type),
                name: matches[1],
                isConstant: true,
                value,
            });
        }
        else if (type.indexOf("]") === type.length - 1) {
            // array type parsing
            const typeSplits = type.split("[");
            const baseType = typeSplits[0];
            const len = typeSplits[1].replace("]", "");
            definitions.push(newArrayDefinition(baseType, name, len ? parseInt(len, 10) : undefined));
        }
        else {
            definitions.push(newDefinition(isJson ? "json" : type, name));
        }
    });
    return {
        name: typeName,
        definitions,
    };
};
const buildType = (lines) => {
    if (lines.length === 0) {
        throw new Error("Empty message definition.");
    }
    if (!lines[0].line.startsWith("MSG: ")) {
        throw new Error(`Malformed message definition name: ${lines[0].line}`);
    }
    const typeName = tokenizeLine(lines[0].line)[1].trim();
    return buildNamedType(lines.slice(1), typeName);
};
const findTypeByName = (types, name, rosPackage) => {
    // eslint-disable-next-line no-nested-ternary
    const fullName = name.includes("/") ? name : name === "Header" ? "std_msgs/Header" : `${rosPackage}/${name}`;
    const matches = types.filter((type) => type.name === fullName);
    if (matches.length !== 1) {
        throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}, ${JSON.stringify({
            fullName,
            k: types.map((type) => type.name),
        })}`);
    }
    return matches[0];
};
/**
 * Given a raw message definition string, parse it into an object representation.
 * Type names in all positions are always fully-qualified.
 *
 * Example return value:
 * [{
 *   name: "foo_msgs/Bar",
 *   definitions: [
 *     {
 *       arrayLength: undefined,
 *       isArray: false,
 *       isComplex: false,
 *       name: "name",
 *       type: "string",
 *     }, ...
 *   ],
 * }, ... ]
 *
 * See unit tests for more examples.
 */
function parseMessageDefinition(messageDefinition, typeName) {
    // read all the lines and remove empties
    const allLines = messageDefinition
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);
    let definitionLines = [];
    const types = [];
    let nextDefinitionIsJson = false;
    // group lines into individual definitions
    allLines.forEach((line) => {
        // ignore comment lines unless they start with #pragma rosbag_parse_json
        if (line.startsWith("#")) {
            if (line.startsWith("#pragma rosbag_parse_json")) {
                nextDefinitionIsJson = true;
            }
            return;
        }
        // definitions are split by equal signs
        if (line.startsWith("==")) {
            nextDefinitionIsJson = false;
            const definition = types.length === 0 ? buildNamedType(definitionLines, typeName) : buildType(definitionLines);
            types.push(definition);
            definitionLines = [];
        }
        else {
            definitionLines.push({
                isJson: nextDefinitionIsJson,
                line,
            });
            nextDefinitionIsJson = false;
        }
    });
    const typeDefinition = types.length === 0 ? buildNamedType(definitionLines, typeName) : buildType(definitionLines);
    types.push(typeDefinition);
    // Fix up complex type names
    types.forEach(({ name, definitions }) => {
        const typePackage = name.split("/")[0];
        definitions.forEach((definition) => {
            if (definition.isComplex) {
                const foundName = findTypeByName(types, definition.type, typePackage).name;
                if (foundName === undefined) {
                    throw new Error(`Missing type definition for ${definition.type}`);
                }
                definition.type = foundName;
            }
        });
    });
    return types;
}


/***/ }),

/***/ "./src/record.ts":
/*!***********************!*\
  !*** ./src/record.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BagHeader: () => (/* binding */ BagHeader),
/* harmony export */   Chunk: () => (/* binding */ Chunk),
/* harmony export */   ChunkInfo: () => (/* binding */ ChunkInfo),
/* harmony export */   Connection: () => (/* binding */ Connection),
/* harmony export */   IndexData: () => (/* binding */ IndexData),
/* harmony export */   MessageData: () => (/* binding */ MessageData),
/* harmony export */   RosbagRecord: () => (/* binding */ RosbagRecord)
/* harmony export */ });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "./node_modules/int53/index.js");
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(int53__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fields */ "./src/fields.ts");
// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.


const readUInt64LE = (buffer) => int53__WEBPACK_IMPORTED_MODULE_0___default().readUInt64LE(buffer, 0);
class RosbagRecord {
    constructor(offset, dataOffset, dataLength) {
        this.offset = offset;
        this.dataOffset = this.offset + dataOffset;
        this.end = this.dataOffset + dataLength;
        this.length = this.end - this.offset;
    }
}
class BagHeader extends RosbagRecord {
    constructor(offset, dataOffset, dataLength, fields, _buffer) {
        super(offset, dataOffset, dataLength);
        this.indexPosition = readUInt64LE(fields.index_pos);
        this.connectionCount = fields.conn_count.readInt32LE(0);
        this.chunkCount = fields.chunk_count.readInt32LE(0);
    }
}
BagHeader.opcode = 3;

class Chunk extends RosbagRecord {
    constructor(offset, dataOffset, dataLength, fields, buffer) {
        super(offset, dataOffset, dataLength);
        this.compression = fields.compression.toString();
        this.size = fields.size.readUInt32LE(0);
        this.data = buffer;
    }
}
Chunk.opcode = 5;

const getField = (fields, key) => {
    if (fields[key] === undefined) {
        throw new Error(`Connection header is missing ${key}.`);
    }
    return fields[key].toString();
};
class Connection extends RosbagRecord {
    constructor(offset, dataOffset, dataLength, fields, buffer) {
        super(offset, dataOffset, dataLength);
        this.conn = fields.conn.readUInt32LE(0);
        this.topic = fields.topic.toString();
        this.messageDefinition = "";
        const bufferFields = (0,_fields__WEBPACK_IMPORTED_MODULE_1__.extractFields)(buffer);
        this.type = getField(bufferFields, "type");
        this.md5sum = getField(bufferFields, "md5sum");
        this.messageDefinition = getField(bufferFields, "message_definition");
        if (bufferFields.callerid !== undefined) {
            this.callerid = bufferFields.callerid.toString();
        }
        if (bufferFields.latching !== undefined) {
            this.latching = bufferFields.latching.toString() === "1";
        }
    }
}
Connection.opcode = 7;

class MessageData extends RosbagRecord {
    constructor(offset, dataOffset, dataLength, fields, buffer) {
        super(offset, dataOffset, dataLength);
        this.conn = fields.conn.readUInt32LE(0);
        this.time = (0,_fields__WEBPACK_IMPORTED_MODULE_1__.extractTime)(fields.time, 0);
        this.data = buffer;
    }
}
MessageData.opcode = 2;

class IndexData extends RosbagRecord {
    constructor(offset, dataOffset, dataLength, fields, buffer) {
        super(offset, dataOffset, dataLength);
        this.ver = fields.ver.readUInt32LE(0);
        this.conn = fields.conn.readUInt32LE(0);
        this.count = fields.count.readUInt32LE(0);
        this.indices = [];
        for (let i = 0; i < this.count; i++) {
            this.indices.push({
                time: (0,_fields__WEBPACK_IMPORTED_MODULE_1__.extractTime)(buffer, i * 12),
                offset: buffer.readUInt32LE(i * 12 + 8),
            });
        }
    }
}
IndexData.opcode = 4;

class ChunkInfo extends RosbagRecord {
    constructor(offset, dataOffset, dataLength, fields, buffer) {
        super(offset, dataOffset, dataLength);
        this.ver = fields.ver.readUInt32LE(0);
        this.chunkPosition = readUInt64LE(fields.chunk_pos);
        this.startTime = (0,_fields__WEBPACK_IMPORTED_MODULE_1__.extractTime)(fields.start_time, 0);
        this.endTime = (0,_fields__WEBPACK_IMPORTED_MODULE_1__.extractTime)(fields.end_time, 0);
        this.count = fields.count.readUInt32LE(0);
        this.connections = [];
        for (let i = 0; i < this.count; i++) {
            this.connections.push({
                conn: buffer.readUInt32LE(i * 8),
                count: buffer.readUInt32LE(i * 8 + 4),
            });
        }
    }
}
ChunkInfo.opcode = 6;



/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Copyright (c) 2018-present, Cruise LLC



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/web/index.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bag: () => (/* reexport safe */ _bag__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   BagReader: () => (/* reexport safe */ _BagReader__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   MessageReader: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_1__.MessageReader),
/* harmony export */   MessageWriter: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_1__.MessageWriter),
/* harmony export */   Reader: () => (/* binding */ Reader),
/* harmony export */   TimeUtil: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_1__.TimeUtil),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   extractFields: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_1__.extractFields),
/* harmony export */   extractTime: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_1__.extractTime),
/* harmony export */   open: () => (/* binding */ open),
/* harmony export */   parseMessageDefinition: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_1__.parseMessageDefinition),
/* harmony export */   rosPrimitiveTypes: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_1__.rosPrimitiveTypes)
/* harmony export */ });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ "./src/index.ts");
/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bag */ "./src/bag.ts");
/* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../BagReader */ "./src/BagReader.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types */ "./src/types.ts");
// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




// browser reader for Blob|File objects
class Reader {
    constructor(blob) {
        this._blob = blob;
        this._size = blob.size;
    }
    // read length (bytes) starting from offset (bytes)
    // callback(err, buffer)
    read(offset, length, cb) {
        const reader = new FileReader();
        reader.onload = function onload() {
            reader.onload = null;
            reader.onerror = null;
            setTimeout(cb, 0, null, reader.result ? buffer__WEBPACK_IMPORTED_MODULE_0__.Buffer.from(reader.result) : undefined);
        };
        reader.onerror = function onerror() {
            reader.onload = null;
            reader.onerror = null;
            setTimeout(cb, 0, new Error(reader.error ? reader.error.message : "Unknown reader error."));
        };
        reader.readAsArrayBuffer(this._blob.slice(offset, offset + length));
    }
    // return the size of the file
    size() {
        return this._size;
    }
}
const open = async (file) => {
    if (!(file instanceof Blob)) {
        throw new Error("Expected file to be a File or Blob. Make sure you are correctly importing the node or web version of Bag.");
    }
    const bag = new _bag__WEBPACK_IMPORTED_MODULE_2__["default"](new _BagReader__WEBPACK_IMPORTED_MODULE_3__["default"](new Reader(file)));
    await bag.open();
    return bag;
};
_bag__WEBPACK_IMPORTED_MODULE_2__["default"].open = open;
// These exports must match ../index.ts


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_bag__WEBPACK_IMPORTED_MODULE_2__["default"]);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaURBQWlELEVBQUU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZUFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSx5QkFBeUIsUUFBUTtBQUNqQztBQUNBLHNCQUFzQixlQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLHFCQUFxQixXQUFXLEdBQUcsSUFBSTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLGdCQUFnQixXQUFXLEdBQUcsSUFBSSxLQUFLLGFBQWE7QUFDcEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSyxtREFBbUQsY0FBYztBQUN6RixHQUFHO0FBQ0g7QUFDQTtBQUNBLCtCQUErQixJQUFJO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsTUFBTSxhQUFhLFNBQVM7QUFDdEQ7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxnQkFBZ0I7QUFDekIsY0FBYyxvQkFBb0IsRUFBRSxJQUFJO0FBQ3hDO0FBQ0EsWUFBWSxnQkFBZ0IsRUFBRSxJQUFJO0FBQ2xDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixHQUFHLFNBQVMsR0FBRyxLQUFLLHFCQUFxQixFQUFFLEVBQUU7QUFDcEUsUUFBUTtBQUNSLHlCQUF5QixHQUFHLEtBQUsseUJBQXlCLEVBQUUsRUFBRTtBQUM5RCxtQkFBbUIseUJBQXlCLEVBQUUsRUFBRTtBQUNoRDtBQUNBLE1BQU07QUFDTixvQkFBb0IsSUFBSSxFQUFFLEdBQUcsU0FBUyxJQUFJLEVBQUUsRUFBRTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsY0FBYyxTQUFTLE9BQU87QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsWUFBWTtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6akVBLHlGQUFzQzs7Ozs7Ozs7Ozs7QUNBdEM7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsbUNBQW1DLDBCQUEwQjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBLHNDQUFzQyxXQUFXO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsV0FBVztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFdBQVc7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxzQ0FBc0M7QUFDekY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPO1lBQy9CLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7UUFDOUYsQ0FBQyxDQUFDO1FBRUYsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsOEJBQThCO0lBQzlCLElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztDQUNGO0FBRUQsTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQW1CLEVBQW9CLEVBQUU7SUFDM0QsSUFBSSxDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxFQUFFO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQ2IsMkdBQTJHLENBQzVHLENBQUM7S0FDSDtJQUVELE1BQU0sR0FBRyxHQUFHLElBQUksNENBQUcsQ0FBQyxJQUFJLGtEQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pCLE9BQU8sR0FBYyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVGLGlEQUFRLEdBQUcsSUFBSSxDQUFDO0FBRWhCLHVDQUF1QztBQUNkO0FBWXZCO0FBQ0YsaUVBQWUsNENBQUcsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Jvc2JhZy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9oZWFwL2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9oZWFwL2xpYi9oZWFwLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9pbnQ1My9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvQmFnUmVhZGVyLnRzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9NZXNzYWdlUmVhZGVyLnRzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9NZXNzYWdlV3JpdGVyLnRzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9SZWFkUmVzdWx0LnRzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9UaW1lVXRpbC50cyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvYmFnLnRzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9maWVsZHMudHMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL2hlYWRlci50cyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL25tZXJnZS50cyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvcGFyc2VNZXNzYWdlRGVmaW5pdGlvbi50cyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvcmVjb3JkLnRzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy90eXBlcy50cyIsIndlYnBhY2s6Ly9yb3NiYWcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcm9zYmFnL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Jvc2JhZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcm9zYmFnL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vcm9zYmFnL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcm9zYmFnL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL3dlYi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJyb3NiYWdcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wicm9zYmFnXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsICgpID0+IHtcbnJldHVybiAiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG5jb25zdCBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5jb25zdCBjdXN0b21JbnNwZWN0U3ltYm9sID1cbiAgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbFsnZm9yJ10gPT09ICdmdW5jdGlvbicpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgPyBTeW1ib2xbJ2ZvciddKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgOiBudWxsXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuY29uc3QgS19NQVhfTEVOR1RIID0gMHg3ZmZmZmZmZlxuZXhwb3J0cy5rTWF4TGVuZ3RoID0gS19NQVhfTEVOR1RIXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFByaW50IHdhcm5pbmcgYW5kIHJlY29tbWVuZCB1c2luZyBgYnVmZmVyYCB2NC54IHdoaWNoIGhhcyBhbiBPYmplY3RcbiAqICAgICAgICAgICAgICAgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIFdlIHJlcG9ydCB0aGF0IHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGlmIHRoZSBhcmUgbm90IHN1YmNsYXNzYWJsZVxuICogdXNpbmcgX19wcm90b19fLiBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YFxuICogKFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4KS4gSUUgMTAgbGFja3Mgc3VwcG9ydFxuICogZm9yIF9fcHJvdG9fXyBhbmQgaGFzIGEgYnVnZ3kgdHlwZWQgYXJyYXkgaW1wbGVtZW50YXRpb24uXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gdHlwZWRBcnJheVN1cHBvcnQoKVxuXG5pZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ1RoaXMgYnJvd3NlciBsYWNrcyB0eXBlZCBhcnJheSAoVWludDhBcnJheSkgc3VwcG9ydCB3aGljaCBpcyByZXF1aXJlZCBieSAnICtcbiAgICAnYGJ1ZmZlcmAgdjUueC4gVXNlIGBidWZmZXJgIHY0LnggaWYgeW91IHJlcXVpcmUgb2xkIGJyb3dzZXIgc3VwcG9ydC4nXG4gIClcbn1cblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICAvLyBDYW4gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWQ/XG4gIHRyeSB7XG4gICAgY29uc3QgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBjb25zdCBwcm90byA9IHsgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9IH1cbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvdG8sIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihhcnIsIHByb3RvKVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLnByb3RvdHlwZSwgJ3BhcmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGhpcykpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5idWZmZXJcbiAgfVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlci5wcm90b3R5cGUsICdvZmZzZXQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHRoaXMpKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMuYnl0ZU9mZnNldFxuICB9XG59KVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAobGVuZ3RoID4gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyBsZW5ndGggKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihidWYsIEJ1ZmZlci5wcm90b3R5cGUpXG4gIHJldHVybiBidWZcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZy4gUmVjZWl2ZWQgdHlwZSBudW1iZXInXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZShhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20oYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG5mdW5jdGlvbiBmcm9tICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlWaWV3KHZhbHVlKVxuICB9XG5cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksICcgK1xuICAgICAgJ29yIEFycmF5LWxpa2UgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHZhbHVlKVxuICAgIClcbiAgfVxuXG4gIGlmIChpc0luc3RhbmNlKHZhbHVlLCBBcnJheUJ1ZmZlcikgfHxcbiAgICAgICh2YWx1ZSAmJiBpc0luc3RhbmNlKHZhbHVlLmJ1ZmZlciwgQXJyYXlCdWZmZXIpKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAoaXNJbnN0YW5jZSh2YWx1ZSwgU2hhcmVkQXJyYXlCdWZmZXIpIHx8XG4gICAgICAodmFsdWUgJiYgaXNJbnN0YW5jZSh2YWx1ZS5idWZmZXIsIFNoYXJlZEFycmF5QnVmZmVyKSkpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgbnVtYmVyJ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IHZhbHVlT2YgPSB2YWx1ZS52YWx1ZU9mICYmIHZhbHVlLnZhbHVlT2YoKVxuICBpZiAodmFsdWVPZiAhPSBudWxsICYmIHZhbHVlT2YgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlT2YsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGNvbnN0IGIgPSBmcm9tT2JqZWN0KHZhbHVlKVxuICBpZiAoYikgcmV0dXJuIGJcblxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvUHJpbWl0aXZlICE9IG51bGwgJiZcbiAgICAgIHR5cGVvZiB2YWx1ZVtTeW1ib2wudG9QcmltaXRpdmVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlW1N5bWJvbC50b1ByaW1pdGl2ZV0oJ3N0cmluZycpLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAnb3IgQXJyYXktbGlrZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdmFsdWUpXG4gIClcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbSh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBOb3RlOiBDaGFuZ2UgcHJvdG90eXBlICphZnRlciogQnVmZmVyLmZyb20gaXMgZGVmaW5lZCB0byB3b3JrYXJvdW5kIENocm9tZSBidWc6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzE0OFxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlci5wcm90b3R5cGUsIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlciwgVWludDhBcnJheSlcblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIHNpemUgKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICB9XG5cbiAgY29uc3QgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgbGV0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG5cbiAgY29uc3QgYWN0dWFsID0gYnVmLndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICBidWYgPSBidWYuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlIChhcnJheSkge1xuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgY29uc3QgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGJ1ZltpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlWaWV3IChhcnJheVZpZXcpIHtcbiAgaWYgKGlzSW5zdGFuY2UoYXJyYXlWaWV3LCBVaW50OEFycmF5KSkge1xuICAgIGNvbnN0IGNvcHkgPSBuZXcgVWludDhBcnJheShhcnJheVZpZXcpXG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcihjb3B5LmJ1ZmZlciwgY29weS5ieXRlT2Zmc2V0LCBjb3B5LmJ5dGVMZW5ndGgpXG4gIH1cbiAgcmV0dXJuIGZyb21BcnJheUxpa2UoYXJyYXlWaWV3KVxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wib2Zmc2V0XCIgaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJsZW5ndGhcIiBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgbGV0IGJ1ZlxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1ZiwgQnVmZmVyLnByb3RvdHlwZSlcblxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICBjb25zdCBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIGNvbnN0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW4pXG5cbiAgICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJ1ZlxuICAgIH1cblxuICAgIG9iai5jb3B5KGJ1ZiwgMCwgMCwgbGVuKVxuICAgIHJldHVybiBidWZcbiAgfVxuXG4gIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IG51bWJlcklzTmFOKG9iai5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKDApXG4gICAgfVxuICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iailcbiAgfVxuXG4gIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgQXJyYXkuaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmouZGF0YSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwgS19NQVhfTEVOR1RIYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBLX01BWF9MRU5HVEgudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiBiICE9IG51bGwgJiYgYi5faXNCdWZmZXIgPT09IHRydWUgJiZcbiAgICBiICE9PSBCdWZmZXIucHJvdG90eXBlIC8vIHNvIEJ1ZmZlci5pc0J1ZmZlcihCdWZmZXIucHJvdG90eXBlKSB3aWxsIGJlIGZhbHNlXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoaXNJbnN0YW5jZShhLCBVaW50OEFycmF5KSkgYSA9IEJ1ZmZlci5mcm9tKGEsIGEub2Zmc2V0LCBhLmJ5dGVMZW5ndGgpXG4gIGlmIChpc0luc3RhbmNlKGIsIFVpbnQ4QXJyYXkpKSBiID0gQnVmZmVyLmZyb20oYiwgYi5vZmZzZXQsIGIuYnl0ZUxlbmd0aClcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwiYnVmMVwiLCBcImJ1ZjJcIiBhcmd1bWVudHMgbXVzdCBiZSBvbmUgb2YgdHlwZSBCdWZmZXIgb3IgVWludDhBcnJheSdcbiAgICApXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICBsZXQgeCA9IGEubGVuZ3RoXG4gIGxldCB5ID0gYi5sZW5ndGhcblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIGxldCBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgbGV0IHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgYnVmID0gbGlzdFtpXVxuICAgIGlmIChpc0luc3RhbmNlKGJ1ZiwgVWludDhBcnJheSkpIHtcbiAgICAgIGlmIChwb3MgKyBidWYubGVuZ3RoID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSBidWYgPSBCdWZmZXIuZnJvbShidWYpXG4gICAgICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgIGJ1ZixcbiAgICAgICAgICBwb3NcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH0gZWxzZSB7XG4gICAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICB9XG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgaXNJbnN0YW5jZShzdHJpbmcsIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgb3IgQXJyYXlCdWZmZXIuICcgK1xuICAgICAgJ1JlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBzdHJpbmdcbiAgICApXG4gIH1cblxuICBjb25zdCBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGNvbnN0IG11c3RNYXRjaCA9IChhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gPT09IHRydWUpXG4gIGlmICghbXVzdE1hdGNoICYmIGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkge1xuICAgICAgICAgIHJldHVybiBtdXN0TWF0Y2ggPyAtMSA6IHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIH1cbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2VyY2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgKGFuZCB0aGUgYGlzLWJ1ZmZlcmAgbnBtIHBhY2thZ2UpXG4vLyB0byBkZXRlY3QgYSBCdWZmZXIgaW5zdGFuY2UuIEl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBgaW5zdGFuY2VvZiBCdWZmZXJgXG4vLyByZWxpYWJseSBpbiBhIGJyb3dzZXJpZnkgY29udGV4dCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG11bHRpcGxlIGRpZmZlcmVudFxuLy8gY29waWVzIG9mIHRoZSAnYnVmZmVyJyBwYWNrYWdlIGluIHVzZS4gVGhpcyBtZXRob2Qgd29ya3MgZXZlbiBmb3IgQnVmZmVyXG4vLyBpbnN0YW5jZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgZnJvbSBhbm90aGVyIGNvcHkgb2YgdGhlIGBidWZmZXJgIHBhY2thZ2UuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNTRcbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIGNvbnN0IGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvTG9jYWxlU3RyaW5nID0gQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZ1xuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIGxldCBzdHIgPSAnJ1xuICBjb25zdCBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkucmVwbGFjZSgvKC57Mn0pL2csICckMSAnKS50cmltKClcbiAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuaWYgKGN1c3RvbUluc3BlY3RTeW1ib2wpIHtcbiAgQnVmZmVyLnByb3RvdHlwZVtjdXN0b21JbnNwZWN0U3ltYm9sXSA9IEJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoaXNJbnN0YW5jZSh0YXJnZXQsIFVpbnQ4QXJyYXkpKSB7XG4gICAgdGFyZ2V0ID0gQnVmZmVyLmZyb20odGFyZ2V0LCB0YXJnZXQub2Zmc2V0LCB0YXJnZXQuYnl0ZUxlbmd0aClcbiAgfVxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJ0YXJnZXRcIiBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIEJ1ZmZlciBvciBVaW50OEFycmF5LiAnICtcbiAgICAgICdSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHRhcmdldClcbiAgICApXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICBsZXQgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgbGV0IHkgPSBlbmQgLSBzdGFydFxuICBjb25zdCBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIGNvbnN0IHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIGNvbnN0IHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0IC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChudW1iZXJJc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFt2YWxdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICBsZXQgaW5kZXhTaXplID0gMVxuICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICBsZXQgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICBsZXQgaVxuICBpZiAoZGlyKSB7XG4gICAgbGV0IGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICBjb25zdCByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgbGV0IGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChudW1iZXJJc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoID4+PiAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgY29uc3QgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIGNvbnN0IHJlcyA9IFtdXG5cbiAgbGV0IGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIGNvbnN0IGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIGxldCBjb2RlUG9pbnQgPSBudWxsXG4gICAgbGV0IGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRilcbiAgICAgID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERilcbiAgICAgICAgICA/IDNcbiAgICAgICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKVxuICAgICAgICAgICAgICA/IDJcbiAgICAgICAgICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICBsZXQgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG5jb25zdCBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgY29uc3QgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICBsZXQgcmVzID0gJydcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGxldCByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBsZXQgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBjb25zdCBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgbGV0IG91dCA9ICcnXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IGhleFNsaWNlTG9va3VwVGFibGVbYnVmW2ldXVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgbGV0IHJlcyA9ICcnXG4gIC8vIElmIGJ5dGVzLmxlbmd0aCBpcyBvZGQsIHRoZSBsYXN0IDggYml0cyBtdXN0IGJlIGlnbm9yZWQgKHNhbWUgYXMgbm9kZS5qcylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGggLSAxOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIChieXRlc1tpICsgMV0gKiAyNTYpKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgY29uc3QgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YobmV3QnVmLCBCdWZmZXIucHJvdG90eXBlKVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnRMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldF1cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludEJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICBsZXQgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQ4ID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQxNkxFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MzJMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQzMkJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ1VJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdVSW50NjRMRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IGxvID0gZmlyc3QgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAyNFxuXG4gIGNvbnN0IGhpID0gdGhpc1srK29mZnNldF0gK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIGxhc3QgKiAyICoqIDI0XG5cbiAgcmV0dXJuIEJpZ0ludChsbykgKyAoQmlnSW50KGhpKSA8PCBCaWdJbnQoMzIpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnVUludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ1VJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgaGkgPSBmaXJzdCAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdXG5cbiAgY29uc3QgbG8gPSB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIGxhc3RcblxuICByZXR1cm4gKEJpZ0ludChoaSkgPDwgQmlnSW50KDMyKSkgKyBCaWdJbnQobG8pXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXRdXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoXG4gIGxldCBtdWwgPSAxXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ0ludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ0ludDY0TEUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldCArIDRdICtcbiAgICB0aGlzW29mZnNldCArIDVdICogMiAqKiA4ICtcbiAgICB0aGlzW29mZnNldCArIDZdICogMiAqKiAxNiArXG4gICAgKGxhc3QgPDwgMjQpIC8vIE92ZXJmbG93XG5cbiAgcmV0dXJuIChCaWdJbnQodmFsKSA8PCBCaWdJbnQoMzIpKSArXG4gICAgQmlnSW50KGZpcnN0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgdmFsID0gKGZpcnN0IDw8IDI0KSArIC8vIE92ZXJmbG93XG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF1cblxuICByZXR1cm4gKEJpZ0ludCh2YWwpIDw8IEJpZ0ludCgzMikpICtcbiAgICBCaWdJbnQodGhpc1srK29mZnNldF0gKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICBsYXN0KVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50TEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnRCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICBsZXQgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIGxldCBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDggPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MTZMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQzMkxFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MzJCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiB3cnRCaWdVSW50NjRMRSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBtaW4sIG1heCkge1xuICBjaGVja0ludEJJKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIDcpXG5cbiAgbGV0IGxvID0gTnVtYmVyKHZhbHVlICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbGV0IGhpID0gTnVtYmVyKHZhbHVlID4+IEJpZ0ludCgzMikgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICByZXR1cm4gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHdydEJpZ1VJbnQ2NEJFIChidWYsIHZhbHVlLCBvZmZzZXQsIG1pbiwgbWF4KSB7XG4gIGNoZWNrSW50QkkodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgNylcblxuICBsZXQgbG8gPSBOdW1iZXIodmFsdWUgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQgKyA3XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNl0gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDVdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA0XSA9IGxvXG4gIGxldCBoaSA9IE51bWJlcih2YWx1ZSA+PiBCaWdJbnQoMzIpICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0ICsgM10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCArIDJdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQgKyAxXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0XSA9IGhpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdVSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ1VJbnQ2NExFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0TEUodGhpcywgdmFsdWUsIG9mZnNldCwgQmlnSW50KDApLCBCaWdJbnQoJzB4ZmZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ1VJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnVUludDY0QkUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRCRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBCaWdJbnQoMCksIEJpZ0ludCgnMHhmZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gMFxuICBsZXQgbXVsID0gMVxuICBsZXQgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnSW50NjRMRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NExFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIC1CaWdJbnQoJzB4ODAwMDAwMDAwMDAwMDAwMCcpLCBCaWdJbnQoJzB4N2ZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ0ludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdJbnQ2NEJFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0QkUodGhpcywgdmFsdWUsIG9mZnNldCwgLUJpZ0ludCgnMHg4MDAwMDAwMDAwMDAwMDAwJyksIEJpZ0ludCgnMHg3ZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzaG91bGQgYmUgYSBCdWZmZXInKVxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgY29uc3QgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gVXNlIGJ1aWx0LWluIHdoZW4gYXZhaWxhYmxlLCBtaXNzaW5nIGZyb20gSUUxMVxuICAgIHRoaXMuY29weVdpdGhpbih0YXJnZXRTdGFydCwgc3RhcnQsIGVuZClcbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmICgoZW5jb2RpbmcgPT09ICd1dGY4JyAmJiBjb2RlIDwgMTI4KSB8fFxuICAgICAgICAgIGVuY29kaW5nID09PSAnbGF0aW4xJykge1xuICAgICAgICAvLyBGYXN0IHBhdGg6IElmIGB2YWxgIGZpdHMgaW50byBhIHNpbmdsZSBieXRlLCB1c2UgdGhhdCBudW1lcmljIHZhbHVlLlxuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgdmFsID0gTnVtYmVyKHZhbClcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICBsZXQgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gICAgY29uc3QgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHZhbHVlIFwiJyArIHZhbCArXG4gICAgICAgICdcIiBpcyBpbnZhbGlkIGZvciBhcmd1bWVudCBcInZhbHVlXCInKVxuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBDVVNUT00gRVJST1JTXG4vLyA9PT09PT09PT09PT09XG5cbi8vIFNpbXBsaWZpZWQgdmVyc2lvbnMgZnJvbSBOb2RlLCBjaGFuZ2VkIGZvciBCdWZmZXItb25seSB1c2FnZVxuY29uc3QgZXJyb3JzID0ge31cbmZ1bmN0aW9uIEUgKHN5bSwgZ2V0TWVzc2FnZSwgQmFzZSkge1xuICBlcnJvcnNbc3ltXSA9IGNsYXNzIE5vZGVFcnJvciBleHRlbmRzIEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIHN1cGVyKClcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuICAgICAgICB2YWx1ZTogZ2V0TWVzc2FnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGQgdGhlIGVycm9yIGNvZGUgdG8gdGhlIG5hbWUgdG8gaW5jbHVkZSBpdCBpbiB0aGUgc3RhY2sgdHJhY2UuXG4gICAgICB0aGlzLm5hbWUgPSBgJHt0aGlzLm5hbWV9IFske3N5bX1dYFxuICAgICAgLy8gQWNjZXNzIHRoZSBzdGFjayB0byBnZW5lcmF0ZSB0aGUgZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGVycm9yIGNvZGVcbiAgICAgIC8vIGZyb20gdGhlIG5hbWUuXG4gICAgICB0aGlzLnN0YWNrIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAvLyBSZXNldCB0aGUgbmFtZSB0byB0aGUgYWN0dWFsIG5hbWUuXG4gICAgICBkZWxldGUgdGhpcy5uYW1lXG4gICAgfVxuXG4gICAgZ2V0IGNvZGUgKCkge1xuICAgICAgcmV0dXJuIHN5bVxuICAgIH1cblxuICAgIHNldCBjb2RlICh2YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb2RlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHtzeW19XTogJHt0aGlzLm1lc3NhZ2V9YFxuICAgIH1cbiAgfVxufVxuXG5FKCdFUlJfQlVGRkVSX09VVF9PRl9CT1VORFMnLFxuICBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gYCR7bmFtZX0gaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzYFxuICAgIH1cblxuICAgIHJldHVybiAnQXR0ZW1wdCB0byBhY2Nlc3MgbWVtb3J5IG91dHNpZGUgYnVmZmVyIGJvdW5kcydcbiAgfSwgUmFuZ2VFcnJvcilcbkUoJ0VSUl9JTlZBTElEX0FSR19UWVBFJyxcbiAgZnVuY3Rpb24gKG5hbWUsIGFjdHVhbCkge1xuICAgIHJldHVybiBgVGhlIFwiJHtuYW1lfVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgJHt0eXBlb2YgYWN0dWFsfWBcbiAgfSwgVHlwZUVycm9yKVxuRSgnRVJSX09VVF9PRl9SQU5HRScsXG4gIGZ1bmN0aW9uIChzdHIsIHJhbmdlLCBpbnB1dCkge1xuICAgIGxldCBtc2cgPSBgVGhlIHZhbHVlIG9mIFwiJHtzdHJ9XCIgaXMgb3V0IG9mIHJhbmdlLmBcbiAgICBsZXQgcmVjZWl2ZWQgPSBpbnB1dFxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGlucHV0KSAmJiBNYXRoLmFicyhpbnB1dCkgPiAyICoqIDMyKSB7XG4gICAgICByZWNlaXZlZCA9IGFkZE51bWVyaWNhbFNlcGFyYXRvcihTdHJpbmcoaW5wdXQpKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnYmlnaW50Jykge1xuICAgICAgcmVjZWl2ZWQgPSBTdHJpbmcoaW5wdXQpXG4gICAgICBpZiAoaW5wdXQgPiBCaWdJbnQoMikgKiogQmlnSW50KDMyKSB8fCBpbnB1dCA8IC0oQmlnSW50KDIpICoqIEJpZ0ludCgzMikpKSB7XG4gICAgICAgIHJlY2VpdmVkID0gYWRkTnVtZXJpY2FsU2VwYXJhdG9yKHJlY2VpdmVkKVxuICAgICAgfVxuICAgICAgcmVjZWl2ZWQgKz0gJ24nXG4gICAgfVxuICAgIG1zZyArPSBgIEl0IG11c3QgYmUgJHtyYW5nZX0uIFJlY2VpdmVkICR7cmVjZWl2ZWR9YFxuICAgIHJldHVybiBtc2dcbiAgfSwgUmFuZ2VFcnJvcilcblxuZnVuY3Rpb24gYWRkTnVtZXJpY2FsU2VwYXJhdG9yICh2YWwpIHtcbiAgbGV0IHJlcyA9ICcnXG4gIGxldCBpID0gdmFsLmxlbmd0aFxuICBjb25zdCBzdGFydCA9IHZhbFswXSA9PT0gJy0nID8gMSA6IDBcbiAgZm9yICg7IGkgPj0gc3RhcnQgKyA0OyBpIC09IDMpIHtcbiAgICByZXMgPSBgXyR7dmFsLnNsaWNlKGkgLSAzLCBpKX0ke3Jlc31gXG4gIH1cbiAgcmV0dXJuIGAke3ZhbC5zbGljZSgwLCBpKX0ke3Jlc31gXG59XG5cbi8vIENIRUNLIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNoZWNrQm91bmRzIChidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBpZiAoYnVmW29mZnNldF0gPT09IHVuZGVmaW5lZCB8fCBidWZbb2Zmc2V0ICsgYnl0ZUxlbmd0aF0gPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgYnVmLmxlbmd0aCAtIChieXRlTGVuZ3RoICsgMSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tJbnRCSSAodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHtcbiAgICBjb25zdCBuID0gdHlwZW9mIG1pbiA9PT0gJ2JpZ2ludCcgPyAnbicgOiAnJ1xuICAgIGxldCByYW5nZVxuICAgIGlmIChieXRlTGVuZ3RoID4gMykge1xuICAgICAgaWYgKG1pbiA9PT0gMCB8fCBtaW4gPT09IEJpZ0ludCgwKSkge1xuICAgICAgICByYW5nZSA9IGA+PSAwJHtufSBhbmQgPCAyJHtufSAqKiAkeyhieXRlTGVuZ3RoICsgMSkgKiA4fSR7bn1gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYW5nZSA9IGA+PSAtKDIke259ICoqICR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn0pIGFuZCA8IDIgKiogYCArXG4gICAgICAgICAgICAgICAgYCR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn1gXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlID0gYD49ICR7bWlufSR7bn0gYW5kIDw9ICR7bWF4fSR7bn1gXG4gICAgfVxuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSgndmFsdWUnLCByYW5nZSwgdmFsdWUpXG4gIH1cbiAgY2hlY2tCb3VuZHMoYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTnVtYmVyICh2YWx1ZSwgbmFtZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX0lOVkFMSURfQVJHX1RZUEUobmFtZSwgJ251bWJlcicsIHZhbHVlKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJvdW5kc0Vycm9yICh2YWx1ZSwgbGVuZ3RoLCB0eXBlKSB7XG4gIGlmIChNYXRoLmZsb29yKHZhbHVlKSAhPT0gdmFsdWUpIHtcbiAgICB2YWxpZGF0ZU51bWJlcih2YWx1ZSwgdHlwZSlcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UodHlwZSB8fCAnb2Zmc2V0JywgJ2FuIGludGVnZXInLCB2YWx1ZSlcbiAgfVxuXG4gIGlmIChsZW5ndGggPCAwKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfQlVGRkVSX09VVF9PRl9CT1VORFMoKVxuICB9XG5cbiAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKHR5cGUgfHwgJ29mZnNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPj0gJHt0eXBlID8gMSA6IDB9IGFuZCA8PSAke2xlbmd0aH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUpXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuY29uc3QgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSB0YWtlcyBlcXVhbCBzaWducyBhcyBlbmQgb2YgdGhlIEJhc2U2NCBlbmNvZGluZ1xuICBzdHIgPSBzdHIuc3BsaXQoJz0nKVswXVxuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyLnRyaW0oKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIGxldCBjb2RlUG9pbnRcbiAgY29uc3QgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICBsZXQgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgY29uc3QgYnl0ZXMgPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICBjb25zdCBieXRlQXJyYXkgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIGxldCBjLCBoaSwgbG9cbiAgY29uc3QgYnl0ZUFycmF5ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBsZXQgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuLy8gQXJyYXlCdWZmZXIgb3IgVWludDhBcnJheSBvYmplY3RzIGZyb20gb3RoZXIgY29udGV4dHMgKGkuZS4gaWZyYW1lcykgZG8gbm90IHBhc3Ncbi8vIHRoZSBgaW5zdGFuY2VvZmAgY2hlY2sgYnV0IHRoZXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgb2YgdGhhdCB0eXBlLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMTY2XG5mdW5jdGlvbiBpc0luc3RhbmNlIChvYmosIHR5cGUpIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIHR5cGUgfHxcbiAgICAob2JqICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgIT0gbnVsbCAmJlxuICAgICAgb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09IHR5cGUubmFtZSlcbn1cbmZ1bmN0aW9uIG51bWJlcklzTmFOIChvYmopIHtcbiAgLy8gRm9yIElFMTEgc3VwcG9ydFxuICByZXR1cm4gb2JqICE9PSBvYmogLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuLy8gQ3JlYXRlIGxvb2t1cCB0YWJsZSBmb3IgYHRvU3RyaW5nKCdoZXgnKWBcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzIxOVxuY29uc3QgaGV4U2xpY2VMb29rdXBUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFscGhhYmV0ID0gJzAxMjM0NTY3ODlhYmNkZWYnXG4gIGNvbnN0IHRhYmxlID0gbmV3IEFycmF5KDI1NilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgY29uc3QgaTE2ID0gaSAqIDE2XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICB0YWJsZVtpMTYgKyBqXSA9IGFscGhhYmV0W2ldICsgYWxwaGFiZXRbal1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhYmxlXG59KSgpXG5cbi8vIFJldHVybiBub3QgZnVuY3Rpb24gd2l0aCBFcnJvciBpZiBCaWdJbnQgbm90IHN1cHBvcnRlZFxuZnVuY3Rpb24gZGVmaW5lQmlnSW50TWV0aG9kIChmbikge1xuICByZXR1cm4gdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyBCdWZmZXJCaWdJbnROb3REZWZpbmVkIDogZm5cbn1cblxuZnVuY3Rpb24gQnVmZmVyQmlnSW50Tm90RGVmaW5lZCAoKSB7XG4gIHRocm93IG5ldyBFcnJvcignQmlnSW50IG5vdCBzdXBwb3J0ZWQnKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9oZWFwJyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuOC4wXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBIZWFwLCBkZWZhdWx0Q21wLCBmbG9vciwgaGVhcGlmeSwgaGVhcHBvcCwgaGVhcHB1c2gsIGhlYXBwdXNocG9wLCBoZWFwcmVwbGFjZSwgaW5zb3J0LCBtaW4sIG5sYXJnZXN0LCBuc21hbGxlc3QsIHVwZGF0ZUl0ZW0sIF9zaWZ0ZG93biwgX3NpZnR1cDtcblxuICBmbG9vciA9IE1hdGguZmxvb3IsIG1pbiA9IE1hdGgubWluO1xuXG5cbiAgLypcbiAgRGVmYXVsdCBjb21wYXJpc29uIGZ1bmN0aW9uIHRvIGJlIHVzZWRcbiAgICovXG5cbiAgZGVmYXVsdENtcCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICBpZiAoeCA8IHkpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgaWYgKHggPiB5KSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH07XG5cblxuICAvKlxuICBJbnNlcnQgaXRlbSB4IGluIGxpc3QgYSwgYW5kIGtlZXAgaXQgc29ydGVkIGFzc3VtaW5nIGEgaXMgc29ydGVkLlxuICBcbiAgSWYgeCBpcyBhbHJlYWR5IGluIGEsIGluc2VydCBpdCB0byB0aGUgcmlnaHQgb2YgdGhlIHJpZ2h0bW9zdCB4LlxuICBcbiAgT3B0aW9uYWwgYXJncyBsbyAoZGVmYXVsdCAwKSBhbmQgaGkgKGRlZmF1bHQgYS5sZW5ndGgpIGJvdW5kIHRoZSBzbGljZVxuICBvZiBhIHRvIGJlIHNlYXJjaGVkLlxuICAgKi9cblxuICBpbnNvcnQgPSBmdW5jdGlvbihhLCB4LCBsbywgaGksIGNtcCkge1xuICAgIHZhciBtaWQ7XG4gICAgaWYgKGxvID09IG51bGwpIHtcbiAgICAgIGxvID0gMDtcbiAgICB9XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBpZiAobG8gPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvIG11c3QgYmUgbm9uLW5lZ2F0aXZlJyk7XG4gICAgfVxuICAgIGlmIChoaSA9PSBudWxsKSB7XG4gICAgICBoaSA9IGEubGVuZ3RoO1xuICAgIH1cbiAgICB3aGlsZSAobG8gPCBoaSkge1xuICAgICAgbWlkID0gZmxvb3IoKGxvICsgaGkpIC8gMik7XG4gICAgICBpZiAoY21wKHgsIGFbbWlkXSkgPCAwKSB7XG4gICAgICAgIGhpID0gbWlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG8gPSBtaWQgKyAxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFtdLnNwbGljZS5hcHBseShhLCBbbG8sIGxvIC0gbG9dLmNvbmNhdCh4KSksIHgpO1xuICB9O1xuXG5cbiAgLypcbiAgUHVzaCBpdGVtIG9udG8gaGVhcCwgbWFpbnRhaW5pbmcgdGhlIGhlYXAgaW52YXJpYW50LlxuICAgKi9cblxuICBoZWFwcHVzaCA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBjbXApIHtcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIGFycmF5LnB1c2goaXRlbSk7XG4gICAgcmV0dXJuIF9zaWZ0ZG93bihhcnJheSwgMCwgYXJyYXkubGVuZ3RoIC0gMSwgY21wKTtcbiAgfTtcblxuXG4gIC8qXG4gIFBvcCB0aGUgc21hbGxlc3QgaXRlbSBvZmYgdGhlIGhlYXAsIG1haW50YWluaW5nIHRoZSBoZWFwIGludmFyaWFudC5cbiAgICovXG5cbiAgaGVhcHBvcCA9IGZ1bmN0aW9uKGFycmF5LCBjbXApIHtcbiAgICB2YXIgbGFzdGVsdCwgcmV0dXJuaXRlbTtcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIGxhc3RlbHQgPSBhcnJheS5wb3AoKTtcbiAgICBpZiAoYXJyYXkubGVuZ3RoKSB7XG4gICAgICByZXR1cm5pdGVtID0gYXJyYXlbMF07XG4gICAgICBhcnJheVswXSA9IGxhc3RlbHQ7XG4gICAgICBfc2lmdHVwKGFycmF5LCAwLCBjbXApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm5pdGVtID0gbGFzdGVsdDtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybml0ZW07XG4gIH07XG5cblxuICAvKlxuICBQb3AgYW5kIHJldHVybiB0aGUgY3VycmVudCBzbWFsbGVzdCB2YWx1ZSwgYW5kIGFkZCB0aGUgbmV3IGl0ZW0uXG4gIFxuICBUaGlzIGlzIG1vcmUgZWZmaWNpZW50IHRoYW4gaGVhcHBvcCgpIGZvbGxvd2VkIGJ5IGhlYXBwdXNoKCksIGFuZCBjYW4gYmVcbiAgbW9yZSBhcHByb3ByaWF0ZSB3aGVuIHVzaW5nIGEgZml4ZWQgc2l6ZSBoZWFwLiBOb3RlIHRoYXQgdGhlIHZhbHVlXG4gIHJldHVybmVkIG1heSBiZSBsYXJnZXIgdGhhbiBpdGVtISBUaGF0IGNvbnN0cmFpbnMgcmVhc29uYWJsZSB1c2Ugb2ZcbiAgdGhpcyByb3V0aW5lIHVubGVzcyB3cml0dGVuIGFzIHBhcnQgb2YgYSBjb25kaXRpb25hbCByZXBsYWNlbWVudDpcbiAgICAgIGlmIGl0ZW0gPiBhcnJheVswXVxuICAgICAgICBpdGVtID0gaGVhcHJlcGxhY2UoYXJyYXksIGl0ZW0pXG4gICAqL1xuXG4gIGhlYXByZXBsYWNlID0gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGNtcCkge1xuICAgIHZhciByZXR1cm5pdGVtO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgcmV0dXJuaXRlbSA9IGFycmF5WzBdO1xuICAgIGFycmF5WzBdID0gaXRlbTtcbiAgICBfc2lmdHVwKGFycmF5LCAwLCBjbXApO1xuICAgIHJldHVybiByZXR1cm5pdGVtO1xuICB9O1xuXG5cbiAgLypcbiAgRmFzdCB2ZXJzaW9uIG9mIGEgaGVhcHB1c2ggZm9sbG93ZWQgYnkgYSBoZWFwcG9wLlxuICAgKi9cblxuICBoZWFwcHVzaHBvcCA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBjbXApIHtcbiAgICB2YXIgX3JlZjtcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIGlmIChhcnJheS5sZW5ndGggJiYgY21wKGFycmF5WzBdLCBpdGVtKSA8IDApIHtcbiAgICAgIF9yZWYgPSBbYXJyYXlbMF0sIGl0ZW1dLCBpdGVtID0gX3JlZlswXSwgYXJyYXlbMF0gPSBfcmVmWzFdO1xuICAgICAgX3NpZnR1cChhcnJheSwgMCwgY21wKTtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW07XG4gIH07XG5cblxuICAvKlxuICBUcmFuc2Zvcm0gbGlzdCBpbnRvIGEgaGVhcCwgaW4tcGxhY2UsIGluIE8oYXJyYXkubGVuZ3RoKSB0aW1lLlxuICAgKi9cblxuICBoZWFwaWZ5ID0gZnVuY3Rpb24oYXJyYXksIGNtcCkge1xuICAgIHZhciBpLCBfaSwgX2osIF9sZW4sIF9yZWYsIF9yZWYxLCBfcmVzdWx0cywgX3Jlc3VsdHMxO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgX3JlZjEgPSAoZnVuY3Rpb24oKSB7XG4gICAgICBfcmVzdWx0czEgPSBbXTtcbiAgICAgIGZvciAodmFyIF9qID0gMCwgX3JlZiA9IGZsb29yKGFycmF5Lmxlbmd0aCAvIDIpOyAwIDw9IF9yZWYgPyBfaiA8IF9yZWYgOiBfaiA+IF9yZWY7IDAgPD0gX3JlZiA/IF9qKysgOiBfai0tKXsgX3Jlc3VsdHMxLnB1c2goX2opOyB9XG4gICAgICByZXR1cm4gX3Jlc3VsdHMxO1xuICAgIH0pLmFwcGx5KHRoaXMpLnJldmVyc2UoKTtcbiAgICBfcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZjEubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgIGkgPSBfcmVmMVtfaV07XG4gICAgICBfcmVzdWx0cy5wdXNoKF9zaWZ0dXAoYXJyYXksIGksIGNtcCkpO1xuICAgIH1cbiAgICByZXR1cm4gX3Jlc3VsdHM7XG4gIH07XG5cblxuICAvKlxuICBVcGRhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBnaXZlbiBpdGVtIGluIHRoZSBoZWFwLlxuICBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgZXZlcnkgdGltZSB0aGUgaXRlbSBpcyBiZWluZyBtb2RpZmllZC5cbiAgICovXG5cbiAgdXBkYXRlSXRlbSA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBjbXApIHtcbiAgICB2YXIgcG9zO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgcG9zID0gYXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBfc2lmdGRvd24oYXJyYXksIDAsIHBvcywgY21wKTtcbiAgICByZXR1cm4gX3NpZnR1cChhcnJheSwgcG9zLCBjbXApO1xuICB9O1xuXG5cbiAgLypcbiAgRmluZCB0aGUgbiBsYXJnZXN0IGVsZW1lbnRzIGluIGEgZGF0YXNldC5cbiAgICovXG5cbiAgbmxhcmdlc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgY21wKSB7XG4gICAgdmFyIGVsZW0sIHJlc3VsdCwgX2ksIF9sZW4sIF9yZWY7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICByZXN1bHQgPSBhcnJheS5zbGljZSgwLCBuKTtcbiAgICBpZiAoIXJlc3VsdC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGhlYXBpZnkocmVzdWx0LCBjbXApO1xuICAgIF9yZWYgPSBhcnJheS5zbGljZShuKTtcbiAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgIGVsZW0gPSBfcmVmW19pXTtcbiAgICAgIGhlYXBwdXNocG9wKHJlc3VsdCwgZWxlbSwgY21wKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5zb3J0KGNtcCkucmV2ZXJzZSgpO1xuICB9O1xuXG5cbiAgLypcbiAgRmluZCB0aGUgbiBzbWFsbGVzdCBlbGVtZW50cyBpbiBhIGRhdGFzZXQuXG4gICAqL1xuXG4gIG5zbWFsbGVzdCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBjbXApIHtcbiAgICB2YXIgZWxlbSwgaSwgbG9zLCByZXN1bHQsIF9pLCBfaiwgX2xlbiwgX3JlZiwgX3JlZjEsIF9yZXN1bHRzO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgaWYgKG4gKiAxMCA8PSBhcnJheS5sZW5ndGgpIHtcbiAgICAgIHJlc3VsdCA9IGFycmF5LnNsaWNlKDAsIG4pLnNvcnQoY21wKTtcbiAgICAgIGlmICghcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgbG9zID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXTtcbiAgICAgIF9yZWYgPSBhcnJheS5zbGljZShuKTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBlbGVtID0gX3JlZltfaV07XG4gICAgICAgIGlmIChjbXAoZWxlbSwgbG9zKSA8IDApIHtcbiAgICAgICAgICBpbnNvcnQocmVzdWx0LCBlbGVtLCAwLCBudWxsLCBjbXApO1xuICAgICAgICAgIHJlc3VsdC5wb3AoKTtcbiAgICAgICAgICBsb3MgPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBoZWFwaWZ5KGFycmF5LCBjbXApO1xuICAgIF9yZXN1bHRzID0gW107XG4gICAgZm9yIChpID0gX2ogPSAwLCBfcmVmMSA9IG1pbihuLCBhcnJheS5sZW5ndGgpOyAwIDw9IF9yZWYxID8gX2ogPCBfcmVmMSA6IF9qID4gX3JlZjE7IGkgPSAwIDw9IF9yZWYxID8gKytfaiA6IC0tX2opIHtcbiAgICAgIF9yZXN1bHRzLnB1c2goaGVhcHBvcChhcnJheSwgY21wKSk7XG4gICAgfVxuICAgIHJldHVybiBfcmVzdWx0cztcbiAgfTtcblxuICBfc2lmdGRvd24gPSBmdW5jdGlvbihhcnJheSwgc3RhcnRwb3MsIHBvcywgY21wKSB7XG4gICAgdmFyIG5ld2l0ZW0sIHBhcmVudCwgcGFyZW50cG9zO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgbmV3aXRlbSA9IGFycmF5W3Bvc107XG4gICAgd2hpbGUgKHBvcyA+IHN0YXJ0cG9zKSB7XG4gICAgICBwYXJlbnRwb3MgPSAocG9zIC0gMSkgPj4gMTtcbiAgICAgIHBhcmVudCA9IGFycmF5W3BhcmVudHBvc107XG4gICAgICBpZiAoY21wKG5ld2l0ZW0sIHBhcmVudCkgPCAwKSB7XG4gICAgICAgIGFycmF5W3Bvc10gPSBwYXJlbnQ7XG4gICAgICAgIHBvcyA9IHBhcmVudHBvcztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5W3Bvc10gPSBuZXdpdGVtO1xuICB9O1xuXG4gIF9zaWZ0dXAgPSBmdW5jdGlvbihhcnJheSwgcG9zLCBjbXApIHtcbiAgICB2YXIgY2hpbGRwb3MsIGVuZHBvcywgbmV3aXRlbSwgcmlnaHRwb3MsIHN0YXJ0cG9zO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgZW5kcG9zID0gYXJyYXkubGVuZ3RoO1xuICAgIHN0YXJ0cG9zID0gcG9zO1xuICAgIG5ld2l0ZW0gPSBhcnJheVtwb3NdO1xuICAgIGNoaWxkcG9zID0gMiAqIHBvcyArIDE7XG4gICAgd2hpbGUgKGNoaWxkcG9zIDwgZW5kcG9zKSB7XG4gICAgICByaWdodHBvcyA9IGNoaWxkcG9zICsgMTtcbiAgICAgIGlmIChyaWdodHBvcyA8IGVuZHBvcyAmJiAhKGNtcChhcnJheVtjaGlsZHBvc10sIGFycmF5W3JpZ2h0cG9zXSkgPCAwKSkge1xuICAgICAgICBjaGlsZHBvcyA9IHJpZ2h0cG9zO1xuICAgICAgfVxuICAgICAgYXJyYXlbcG9zXSA9IGFycmF5W2NoaWxkcG9zXTtcbiAgICAgIHBvcyA9IGNoaWxkcG9zO1xuICAgICAgY2hpbGRwb3MgPSAyICogcG9zICsgMTtcbiAgICB9XG4gICAgYXJyYXlbcG9zXSA9IG5ld2l0ZW07XG4gICAgcmV0dXJuIF9zaWZ0ZG93bihhcnJheSwgc3RhcnRwb3MsIHBvcywgY21wKTtcbiAgfTtcblxuICBIZWFwID0gKGZ1bmN0aW9uKCkge1xuICAgIEhlYXAucHVzaCA9IGhlYXBwdXNoO1xuXG4gICAgSGVhcC5wb3AgPSBoZWFwcG9wO1xuXG4gICAgSGVhcC5yZXBsYWNlID0gaGVhcHJlcGxhY2U7XG5cbiAgICBIZWFwLnB1c2hwb3AgPSBoZWFwcHVzaHBvcDtcblxuICAgIEhlYXAuaGVhcGlmeSA9IGhlYXBpZnk7XG5cbiAgICBIZWFwLnVwZGF0ZUl0ZW0gPSB1cGRhdGVJdGVtO1xuXG4gICAgSGVhcC5ubGFyZ2VzdCA9IG5sYXJnZXN0O1xuXG4gICAgSGVhcC5uc21hbGxlc3QgPSBuc21hbGxlc3Q7XG5cbiAgICBmdW5jdGlvbiBIZWFwKGNtcCkge1xuICAgICAgdGhpcy5jbXAgPSBjbXAgIT0gbnVsbCA/IGNtcCA6IGRlZmF1bHRDbXA7XG4gICAgICB0aGlzLm5vZGVzID0gW107XG4gICAgfVxuXG4gICAgSGVhcC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBoZWFwcHVzaCh0aGlzLm5vZGVzLCB4LCB0aGlzLmNtcCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnBvcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGhlYXBwb3AodGhpcy5ub2RlcywgdGhpcy5jbXApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlc1swXTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlcy5pbmRleE9mKHgpICE9PSAtMTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBoZWFwcmVwbGFjZSh0aGlzLm5vZGVzLCB4LCB0aGlzLmNtcCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnB1c2hwb3AgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gaGVhcHB1c2hwb3AodGhpcy5ub2RlcywgeCwgdGhpcy5jbXApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5oZWFwaWZ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gaGVhcGlmeSh0aGlzLm5vZGVzLCB0aGlzLmNtcCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnVwZGF0ZUl0ZW0gPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdXBkYXRlSXRlbSh0aGlzLm5vZGVzLCB4LCB0aGlzLmNtcCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlcyA9IFtdO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXMubGVuZ3RoID09PSAwO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlcy5sZW5ndGg7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaGVhcDtcbiAgICAgIGhlYXAgPSBuZXcgSGVhcCgpO1xuICAgICAgaGVhcC5ub2RlcyA9IHRoaXMubm9kZXMuc2xpY2UoMCk7XG4gICAgICByZXR1cm4gaGVhcDtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXMuc2xpY2UoMCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLmluc2VydCA9IEhlYXAucHJvdG90eXBlLnB1c2g7XG5cbiAgICBIZWFwLnByb3RvdHlwZS50b3AgPSBIZWFwLnByb3RvdHlwZS5wZWVrO1xuXG4gICAgSGVhcC5wcm90b3R5cGUuZnJvbnQgPSBIZWFwLnByb3RvdHlwZS5wZWVrO1xuXG4gICAgSGVhcC5wcm90b3R5cGUuaGFzID0gSGVhcC5wcm90b3R5cGUuY29udGFpbnM7XG5cbiAgICBIZWFwLnByb3RvdHlwZS5jb3B5ID0gSGVhcC5wcm90b3R5cGUuY2xvbmU7XG5cbiAgICByZXR1cm4gSGVhcDtcblxuICB9KSgpO1xuXG4gIChmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgcmV0dXJuIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJvb3QuSGVhcCA9IGZhY3RvcnkoKTtcbiAgICB9XG4gIH0pKHRoaXMsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBIZWFwO1xuICB9KTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8qISBpZWVlNzU0LiBCU0QtMy1DbGF1c2UgTGljZW5zZS4gRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnL29wZW5zb3VyY2U+ICovXG5leHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IChlICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IChtICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKCh2YWx1ZSAqIGMpIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG4iLCJ2YXIgaW50NTMgPSB7fVxuXG52YXIgTUFYX1VJTlQzMiA9IDB4MDAwMDAwMDBGRkZGRkZGRlxudmFyIE1BWF9JTlQ1MyA9ICAweDAwMUZGRkZGRkZGRkZGRkZcblxuZnVuY3Rpb24gYXNzZXJ0ICh0ZXN0LCBtZXNzYWdlKSB7XG5cdGlmKCF0ZXN0KSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSlcbn1cblxuZnVuY3Rpb24gb25lc0NvbXBsZW1lbnQobnVtYmVyKSB7XG5cdG51bWJlciA9IH5udW1iZXJcblx0aWYgKG51bWJlciA8IDApIHtcblx0XHRudW1iZXIgPSAobnVtYmVyICYgMHg3RkZGRkZGRikgKyAweDgwMDAwMDAwXG5cdH1cblx0cmV0dXJuIG51bWJlclxufVxuXG5mdW5jdGlvbiB1aW50SGlnaExvdyhudW1iZXIpIHtcblx0YXNzZXJ0KG51bWJlciA+IC0xICYmIG51bWJlciA8PSBNQVhfSU5UNTMsIFwibnVtYmVyIG91dCBvZiByYW5nZVwiKVxuXHRhc3NlcnQoTWF0aC5mbG9vcihudW1iZXIpID09PSBudW1iZXIsIFwibnVtYmVyIG11c3QgYmUgYW4gaW50ZWdlclwiKVxuXHR2YXIgaGlnaCA9IDBcblx0dmFyIHNpZ25iaXQgPSBudW1iZXIgJiAweEZGRkZGRkZGXG5cdHZhciBsb3cgPSBzaWduYml0IDwgMCA/IChudW1iZXIgJiAweDdGRkZGRkZGKSArIDB4ODAwMDAwMDAgOiBzaWduYml0XG5cdGlmIChudW1iZXIgPiBNQVhfVUlOVDMyKSB7XG5cdFx0aGlnaCA9IChudW1iZXIgLSBsb3cpIC8gKE1BWF9VSU5UMzIgKyAxKVxuXHR9XG5cdHJldHVybiBbaGlnaCwgbG93XVxufVxuXG5mdW5jdGlvbiBpbnRIaWdoTG93KG51bWJlcikge1xuXHRpZiAobnVtYmVyID4gLTEpIHtcblx0XHRyZXR1cm4gdWludEhpZ2hMb3cobnVtYmVyKVxuXHR9XG5cdHZhciBobCA9IHVpbnRIaWdoTG93KC1udW1iZXIpXG5cdHZhciBoaWdoID0gb25lc0NvbXBsZW1lbnQoaGxbMF0pXG5cdHZhciBsb3cgPSBvbmVzQ29tcGxlbWVudChobFsxXSlcblx0aWYgKGxvdyA9PT0gTUFYX1VJTlQzMikge1xuXHRcdGhpZ2ggKz0gMVxuXHRcdGxvdyA9IDBcblx0fVxuXHRlbHNlIHtcblx0XHRsb3cgKz0gMVxuXHR9XG5cdHJldHVybiBbaGlnaCwgbG93XVxufVxuXG5mdW5jdGlvbiB0b0RvdWJsZShoaWdoLCBsb3csIHNpZ25lZCkge1xuXHRpZiAoc2lnbmVkICYmIChoaWdoICYgMHg4MDAwMDAwMCkgIT09IDApIHtcblx0XHRoaWdoID0gb25lc0NvbXBsZW1lbnQoaGlnaClcblx0XHRsb3cgPSBvbmVzQ29tcGxlbWVudChsb3cpXG5cdFx0YXNzZXJ0KGhpZ2ggPCAweDAwMjAwMDAwLCBcIm51bWJlciB0b28gc21hbGxcIilcblx0XHRyZXR1cm4gLSgoaGlnaCAqIChNQVhfVUlOVDMyICsgMSkpICsgbG93ICsgMSlcblx0fVxuXHRlbHNlIHsgLy9wb3NpdGl2ZVxuXHRcdGFzc2VydChoaWdoIDwgMHgwMDIwMDAwMCwgXCJudW1iZXIgdG9vIGxhcmdlXCIpXG5cdFx0cmV0dXJuIChoaWdoICogKE1BWF9VSU5UMzIgKyAxKSkgKyBsb3dcblx0fVxufVxuXG5pbnQ1My5yZWFkSW50NjRCRSA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgaGlnaCA9IGJ1ZmZlci5yZWFkVUludDMyQkUob2Zmc2V0KVxuXHR2YXIgbG93ID0gYnVmZmVyLnJlYWRVSW50MzJCRShvZmZzZXQgKyA0KVxuXHRyZXR1cm4gdG9Eb3VibGUoaGlnaCwgbG93LCB0cnVlKVxufVxuXG5pbnQ1My5yZWFkSW50NjRMRSA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgbG93ID0gYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQpXG5cdHZhciBoaWdoID0gYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQgKyA0KVxuXHRyZXR1cm4gdG9Eb3VibGUoaGlnaCwgbG93LCB0cnVlKVxufVxuXG5pbnQ1My5yZWFkVUludDY0QkUgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQpIHtcblx0b2Zmc2V0ID0gb2Zmc2V0IHx8IDBcblx0dmFyIGhpZ2ggPSBidWZmZXIucmVhZFVJbnQzMkJFKG9mZnNldClcblx0dmFyIGxvdyA9IGJ1ZmZlci5yZWFkVUludDMyQkUob2Zmc2V0ICsgNClcblx0cmV0dXJuIHRvRG91YmxlKGhpZ2gsIGxvdywgZmFsc2UpXG59XG5cbmludDUzLnJlYWRVSW50NjRMRSA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgbG93ID0gYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQpXG5cdHZhciBoaWdoID0gYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQgKyA0KVxuXHRyZXR1cm4gdG9Eb3VibGUoaGlnaCwgbG93LCBmYWxzZSlcbn1cblxuaW50NTMud3JpdGVJbnQ2NEJFID0gZnVuY3Rpb24gKG51bWJlciwgYnVmZmVyLCBvZmZzZXQpIHtcblx0b2Zmc2V0ID0gb2Zmc2V0IHx8IDBcblx0dmFyIGhsID0gaW50SGlnaExvdyhudW1iZXIpXG5cdGJ1ZmZlci53cml0ZVVJbnQzMkJFKGhsWzBdLCBvZmZzZXQpXG5cdGJ1ZmZlci53cml0ZVVJbnQzMkJFKGhsWzFdLCBvZmZzZXQgKyA0KVxufVxuXG5pbnQ1My53cml0ZUludDY0TEUgPSBmdW5jdGlvbiAobnVtYmVyLCBidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgaGwgPSBpbnRIaWdoTG93KG51bWJlcilcblx0YnVmZmVyLndyaXRlVUludDMyTEUoaGxbMV0sIG9mZnNldClcblx0YnVmZmVyLndyaXRlVUludDMyTEUoaGxbMF0sIG9mZnNldCArIDQpXG59XG5cbmludDUzLndyaXRlVUludDY0QkUgPSBmdW5jdGlvbiAobnVtYmVyLCBidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgaGwgPSB1aW50SGlnaExvdyhudW1iZXIpXG5cdGJ1ZmZlci53cml0ZVVJbnQzMkJFKGhsWzBdLCBvZmZzZXQpXG5cdGJ1ZmZlci53cml0ZVVJbnQzMkJFKGhsWzFdLCBvZmZzZXQgKyA0KVxufVxuXG5pbnQ1My53cml0ZVVJbnQ2NExFID0gZnVuY3Rpb24gKG51bWJlciwgYnVmZmVyLCBvZmZzZXQpIHtcblx0b2Zmc2V0ID0gb2Zmc2V0IHx8IDBcblx0dmFyIGhsID0gdWludEhpZ2hMb3cobnVtYmVyKVxuXHRidWZmZXIud3JpdGVVSW50MzJMRShobFsxXSwgb2Zmc2V0KVxuXHRidWZmZXIud3JpdGVVSW50MzJMRShobFswXSwgb2Zmc2V0ICsgNClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnQ1M1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcclxuXHJcbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcclxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHR5cGUgeyBUaW1lLCBDYWxsYmFjaywgRmlsZWxpa2UgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5pbXBvcnQgeyBwYXJzZUhlYWRlciB9IGZyb20gXCIuL2hlYWRlclwiO1xyXG5pbXBvcnQgbm1lcmdlIGZyb20gXCIuL25tZXJnZVwiO1xyXG5pbXBvcnQge1xyXG4gIFJvc2JhZ1JlY29yZCxcclxuICBSb3NiYWdSZWNvcmRDb25zdHJ1Y3RvcixcclxuICBCYWdIZWFkZXIsXHJcbiAgQ2h1bmssXHJcbiAgQ2h1bmtJbmZvLFxyXG4gIENvbm5lY3Rpb24sXHJcbiAgSW5kZXhEYXRhLFxyXG4gIE1lc3NhZ2VEYXRhLFxyXG59IGZyb20gXCIuL3JlY29yZFwiO1xyXG5pbXBvcnQgKiBhcyBUaW1lVXRpbCBmcm9tIFwiLi9UaW1lVXRpbFwiO1xyXG5cclxuaW50ZXJmYWNlIENodW5rUmVhZFJlc3VsdCB7XHJcbiAgY2h1bms6IENodW5rO1xyXG4gIGluZGljZXM6IEluZGV4RGF0YVtdO1xyXG59XHJcbmV4cG9ydCB0eXBlIERlY29tcHJlc3MgPSBSZWNvcmQ8c3RyaW5nLCAoYnVmZmVyOiBCdWZmZXIsIHNpemU6IG51bWJlcikgPT4gQnVmZmVyPjtcclxuY29uc3QgSEVBREVSX1JFQURBSEVBRCA9IDQwOTY7XHJcbmNvbnN0IEhFQURFUl9PRkZTRVQgPSAxMztcclxuXHJcbi8qKlxyXG4gKiBCYWdSZWFkZXIgaXMgYSBsb3dlciBsZXZlbCBpbnRlcmZhY2UgZm9yIHJlYWRpbmcgc3BlY2lmaWMgc2VjdGlvbnMgJiBjaHVua3NcclxuICogZnJvbSBhIHJvc2JhZyBmaWxlIC0gZ2VuZXJhbGx5IGl0IGlzIGNvbnN1bWVkIHRocm91Z2ggdGhlIEJhZyBjbGFzcywgYnV0XHJcbiAqIGNhbiBiZSB1c2VmdWwgdG8gdXNlIGRpcmVjdGx5IGZvciBlZmZpY2llbnRseSBhY2Nlc3NpbmcgcmF3IHBpZWNlcyBmcm9tXHJcbiAqIHdpdGhpbiB0aGUgYmFnXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWdSZWFkZXIge1xyXG4gIF9sYXN0UmVhZFJlc3VsdD86IENodW5rUmVhZFJlc3VsdDtcclxuICBfZmlsZTogRmlsZWxpa2U7XHJcbiAgX2xhc3RDaHVua0luZm8/OiBDaHVua0luZm87XHJcblxyXG4gIGNvbnN0cnVjdG9yKGZpbGVsaWtlOiBGaWxlbGlrZSkge1xyXG4gICAgdGhpcy5fZmlsZSA9IGZpbGVsaWtlO1xyXG4gICAgdGhpcy5fbGFzdENodW5rSW5mbyA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHZlcmlmeUJhZ0hlYWRlcihjYWxsYmFjazogQ2FsbGJhY2s8QmFnSGVhZGVyPiwgbmV4dDogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5fZmlsZS5yZWFkKDAsIEhFQURFUl9PRkZTRVQsIChlcnJvcjogRXJyb3IgfCBudWxsLCBidWZmZXI/OiBCdWZmZXIpID0+IHtcclxuICAgICAgaWYgKGVycm9yIHx8ICFidWZmZXIpIHtcclxuICAgICAgICBjYWxsYmFjayhlcnJvciB8fCBuZXcgRXJyb3IoXCJNaXNzaW5nIGJvdGggZXJyb3IgYW5kIGJ1ZmZlclwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5fZmlsZS5zaXplKCkgPCBIRUFERVJfT0ZGU0VUKSB7XHJcbiAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKFwiTWlzc2luZyBmaWxlIGhlYWRlci5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGJ1ZmZlci50b1N0cmluZygpICE9PSBcIiNST1NCQUcgVjIuMFxcblwiKSB7XHJcbiAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKFwiQ2Fubm90IGlkZW50aWZ5IGJhZyBmb3JtYXQuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5leHQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVhZHMgdGhlIGhlYWRlciBibG9jayBmcm9tIHRoZSByb3NiYWcgZmlsZS5cclxuICAgKlxyXG4gICAqIEdlbmVyYWxseSB5b3UgY2FsbCB0aGlzIGZpcnN0IGJlY2F1c2UgeW91IG5lZWQgdGhlIGhlYWRlciBpbmZvcm1hdGlvbiB0byBjYWxsIHJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mb1xyXG4gICAqL1xyXG4gIHJlYWRIZWFkZXIoY2FsbGJhY2s6IENhbGxiYWNrPEJhZ0hlYWRlcj4pIHtcclxuICAgIHRoaXMudmVyaWZ5QmFnSGVhZGVyKGNhbGxiYWNrLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2ZpbGUucmVhZChIRUFERVJfT0ZGU0VULCBIRUFERVJfUkVBREFIRUFELCAoZXJyb3I6IEVycm9yIHwgbnVsbCwgYnVmZmVyPzogQnVmZmVyKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycm9yIHx8ICFidWZmZXIpIHtcclxuICAgICAgICAgIGNhbGxiYWNrKGVycm9yIHx8IG5ldyBFcnJvcihcIk1pc3NpbmcgYm90aCBlcnJvciBhbmQgYnVmZmVyXCIpKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlYWQgPSBidWZmZXIubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAocmVhZCA8IDgpIHtcclxuICAgICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcihgUmVjb3JkIGF0IHBvc2l0aW9uICR7SEVBREVSX09GRlNFVH0gaXMgdHJ1bmNhdGVkLmApKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlckxlbmd0aCA9IGJ1ZmZlci5yZWFkSW50MzJMRSgwKTtcclxuXHJcbiAgICAgICAgaWYgKHJlYWQgPCBoZWFkZXJMZW5ndGggKyA4KSB7XHJcbiAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoYFJlY29yZCBhdCBwb3NpdGlvbiAke0hFQURFUl9PRkZTRVR9IGhlYWRlciB0b28gbGFyZ2U6ICR7aGVhZGVyTGVuZ3RofS5gKSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgaGVhZGVyID0gdGhpcy5yZWFkUmVjb3JkRnJvbUJ1ZmZlcihidWZmZXIsIEhFQURFUl9PRkZTRVQsIEJhZ0hlYWRlcik7XHJcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCBoZWFkZXIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcihgQ291bGQgbm90IHJlYWQgaGVhZGVyIGZyb20gcm9zYmFnIGZpbGUgYnVmZmVyIC0gJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gcHJvbWlzaWZpZWQgdmVyc2lvbiBvZiByZWFkSGVhZGVyXHJcbiAgcmVhZEhlYWRlckFzeW5jKCk6IFByb21pc2U8QmFnSGVhZGVyPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT5cclxuICAgICAgdGhpcy5yZWFkSGVhZGVyKChlcnI6IEVycm9yIHwgbnVsbCwgaGVhZGVyPzogQmFnSGVhZGVyKSA9PiAoZXJyIHx8ICFoZWFkZXIgPyByZWplY3QoZXJyKSA6IHJlc29sdmUoaGVhZGVyKSkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVhZHMgY29ubmVjdGlvbiBhbmQgY2h1bmsgaW5mb3JtYXRpb24gZnJvbSB0aGUgYmFnLlxyXG4gICAqXHJcbiAgICogWW91J2xsIGdlbmVyYWxseSBjYWxsIHRoaXMgYWZ0ZXIgcmVhZGluZyB0aGUgaGVhZGVyIHNvIHlvdSBjYW4gZ2V0XHJcbiAgICogY29ubmVjdGlvbiBtZXRhZGF0YSBhbmQgY2h1bmtJbmZvcyB3aGljaCBhbGxvdyB5b3UgdG8gc2VlayB0byBpbmRpdmlkdWFsXHJcbiAgICogY2h1bmtzICYgcmVhZCB0aGVtXHJcbiAgICovXHJcbiAgcmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvKFxyXG4gICAgZmlsZU9mZnNldDogbnVtYmVyLFxyXG4gICAgY29ubmVjdGlvbkNvdW50OiBudW1iZXIsXHJcbiAgICBjaHVua0NvdW50OiBudW1iZXIsXHJcbiAgICBjYWxsYmFjazogQ2FsbGJhY2s8e1xyXG4gICAgICBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdO1xyXG4gICAgICBjaHVua0luZm9zOiBDaHVua0luZm9bXTtcclxuICAgIH0+XHJcbiAgKSB7XHJcbiAgICB0aGlzLl9maWxlLnJlYWQoZmlsZU9mZnNldCwgdGhpcy5fZmlsZS5zaXplKCkgLSBmaWxlT2Zmc2V0LCAoZXJyOiBFcnJvciB8IG51bGwsIGJ1ZmZlcj86IEJ1ZmZlcikgPT4ge1xyXG4gICAgICBpZiAoZXJyIHx8ICFidWZmZXIpIHtcclxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyIHx8IG5ldyBFcnJvcihcIk1pc3NpbmcgYm90aCBlcnJvciBhbmQgYnVmZmVyXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNvbm5lY3Rpb25Db3VudCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB7XHJcbiAgICAgICAgICBjb25uZWN0aW9uczogW10sXHJcbiAgICAgICAgICBjaHVua0luZm9zOiBbXSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29ubmVjdGlvbnMgPSB0aGlzLnJlYWRSZWNvcmRzRnJvbUJ1ZmZlcihidWZmZXIsIGNvbm5lY3Rpb25Db3VudCwgZmlsZU9mZnNldCwgQ29ubmVjdGlvbik7XHJcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb25CbG9ja0xlbmd0aCA9IGNvbm5lY3Rpb25zW2Nvbm5lY3Rpb25Db3VudCAtIDFdLmVuZCAtIGNvbm5lY3Rpb25zWzBdLm9mZnNldDtcclxuICAgICAgY29uc3QgY2h1bmtJbmZvcyA9IHRoaXMucmVhZFJlY29yZHNGcm9tQnVmZmVyKFxyXG4gICAgICAgIGJ1ZmZlci5zbGljZShjb25uZWN0aW9uQmxvY2tMZW5ndGgpLFxyXG4gICAgICAgIGNodW5rQ291bnQsXHJcbiAgICAgICAgZmlsZU9mZnNldCArIGNvbm5lY3Rpb25CbG9ja0xlbmd0aCxcclxuICAgICAgICBDaHVua0luZm9cclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChjaHVua0NvdW50ID4gMCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtDb3VudCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgY2h1bmtJbmZvc1tpXS5uZXh0Q2h1bmsgPSBjaHVua0luZm9zW2kgKyAxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNodW5rSW5mb3NbY2h1bmtDb3VudCAtIDFdLm5leHRDaHVuayA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHtcclxuICAgICAgICBjb25uZWN0aW9ucyxcclxuICAgICAgICBjaHVua0luZm9zLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gcHJvbWlzaWZpZWQgdmVyc2lvbiBvZiByZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm9cclxuICByZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm9Bc3luYyhcclxuICAgIGZpbGVPZmZzZXQ6IG51bWJlcixcclxuICAgIGNvbm5lY3Rpb25Db3VudDogbnVtYmVyLFxyXG4gICAgY2h1bmtDb3VudDogbnVtYmVyXHJcbiAgKTogUHJvbWlzZTx7XHJcbiAgICBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdO1xyXG4gICAgY2h1bmtJbmZvczogQ2h1bmtJbmZvW107XHJcbiAgfT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5yZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm8oXHJcbiAgICAgICAgZmlsZU9mZnNldCxcclxuICAgICAgICBjb25uZWN0aW9uQ291bnQsXHJcbiAgICAgICAgY2h1bmtDb3VudCxcclxuICAgICAgICAoXHJcbiAgICAgICAgICBlcnI6IEVycm9yIHwgbnVsbCxcclxuICAgICAgICAgIHJlc3VsdD86IHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXTtcclxuICAgICAgICAgICAgY2h1bmtJbmZvczogQ2h1bmtJbmZvW107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKSA9PiAoZXJyIHx8ICFyZXN1bHQgPyByZWplY3QoZXJyKSA6IHJlc29sdmUocmVzdWx0KSlcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVhZHMgaW5kaXZpZHVhbCByYXcgbWVzc2FnZXMgZnJvbSB0aGUgYmFnIGF0IGEgZ2l2ZW4gY2h1bmsuXHJcbiAgICpcclxuICAgKiBGaWx0ZXJzIHRvIGEgc3BlY2lmaWMgc2V0IG9mIGNvbm5lY3Rpb24gaWRzLCBzdGFydCB0aW1lLCAmIGVuZCB0aW1lLlxyXG4gICAqIEdlbmVyYWxseSB0aGUgcmVjb3JkcyB3aWxsIGJlIG9mIHR5cGUgTWVzc2FnZURhdGFcclxuICAgKi9cclxuICByZWFkQ2h1bmtNZXNzYWdlcyhcclxuICAgIGNodW5rSW5mbzogQ2h1bmtJbmZvLFxyXG4gICAgY29ubmVjdGlvbnM6IG51bWJlcltdLFxyXG4gICAgc3RhcnRUaW1lOiBUaW1lIHwgbnVsbCxcclxuICAgIGVuZFRpbWU6IFRpbWUgfCBudWxsLFxyXG4gICAgZGVjb21wcmVzczogRGVjb21wcmVzcyxcclxuICAgIGNhbGxiYWNrOiBDYWxsYmFjazxNZXNzYWdlRGF0YVtdPlxyXG4gICkge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBzdGFydFRpbWUgfHwge1xyXG4gICAgICBzZWM6IDAsXHJcbiAgICAgIG5zZWM6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZW5kID0gZW5kVGltZSB8fCB7XHJcbiAgICAgIHNlYzogTnVtYmVyLk1BWF9WQUxVRSxcclxuICAgICAgbnNlYzogTnVtYmVyLk1BWF9WQUxVRSxcclxuICAgIH07XHJcbiAgICBjb25zdCBjb25ucyA9IGNvbm5lY3Rpb25zIHx8IGNodW5rSW5mby5jb25uZWN0aW9ucy5tYXAoKGNvbm5lY3Rpb24pID0+IGNvbm5lY3Rpb24uY29ubik7XHJcbiAgICB0aGlzLnJlYWRDaHVuayhjaHVua0luZm8sIGRlY29tcHJlc3MsIChlcnJvcjogRXJyb3IgfCBudWxsLCByZXN1bHQ/OiBDaHVua1JlYWRSZXN1bHQpID0+IHtcclxuICAgICAgaWYgKGVycm9yIHx8ICFyZXN1bHQpIHtcclxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IgfHwgbmV3IEVycm9yKFwiTWlzc2luZyBib3RoIGVycm9yIGFuZCByZXN1bHRcIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB7IGNodW5rIH0gPSByZXN1bHQ7XHJcbiAgICAgIGNvbnN0IGluZGljZXM6IFJlY29yZDxudW1iZXIsIEluZGV4RGF0YT4gPSB7fTtcclxuICAgICAgcmVzdWx0LmluZGljZXMuZm9yRWFjaCgoaW5kZXgpID0+IHtcclxuICAgICAgICBpbmRpY2VzW2luZGV4LmNvbm5dID0gaW5kZXg7XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBwcmVzZW50Q29ubmVjdGlvbnMgPSBjb25ucy5maWx0ZXIoKGNvbm4pID0+IGluZGljZXNbY29ubl0gIT09IHVuZGVmaW5lZCk7XHJcbiAgICAgIGNvbnN0IGl0ZXJhYmxlcyA9IHByZXNlbnRDb25uZWN0aW9ucy5tYXAoKGNvbm4pID0+IGluZGljZXNbY29ubl0uaW5kaWNlc1tTeW1ib2wuaXRlcmF0b3JdKCkpO1xyXG4gICAgICBjb25zdCBpdGVyID0gbm1lcmdlKChhLCBiKSA9PiBUaW1lVXRpbC5jb21wYXJlKGEudGltZSwgYi50aW1lKSwgLi4uaXRlcmFibGVzKTtcclxuXHJcbiAgICAgIGNvbnN0IGVudHJpZXM6IEluZGV4RGF0YVtcImluZGljZXNcIl0gPSBbXTtcclxuICAgICAgbGV0IGl0ZW0gPSBpdGVyLm5leHQoKTtcclxuXHJcbiAgICAgIHdoaWxlICghaXRlbS5kb25lKSB7XHJcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gaXRlbTtcclxuICAgICAgICBpdGVtID0gaXRlci5uZXh0KCk7XHJcblxyXG4gICAgICAgIGlmICghdmFsdWUgfHwgVGltZVV0aWwuaXNHcmVhdGVyVGhhbihzdGFydCwgdmFsdWUudGltZSkpIHtcclxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoVGltZVV0aWwuaXNHcmVhdGVyVGhhbih2YWx1ZS50aW1lLCBlbmQpKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVudHJpZXMucHVzaCh2YWx1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gZW50cmllcy5tYXAoKGVudHJ5KSA9PlxyXG4gICAgICAgIHRoaXMucmVhZFJlY29yZEZyb21CdWZmZXIoY2h1bmsuZGF0YS5zbGljZShlbnRyeS5vZmZzZXQpLCBjaHVuay5kYXRhT2Zmc2V0LCBNZXNzYWdlRGF0YSlcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBtZXNzYWdlcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIHByb21pc2lmaWVkIHZlcnNpb24gb2YgcmVhZENodW5rTWVzc2FnZXNcclxuICByZWFkQ2h1bmtNZXNzYWdlc0FzeW5jKFxyXG4gICAgY2h1bmtJbmZvOiBDaHVua0luZm8sXHJcbiAgICBjb25uZWN0aW9uczogbnVtYmVyW10sXHJcbiAgICBzdGFydFRpbWU6IFRpbWUsXHJcbiAgICBlbmRUaW1lOiBUaW1lLFxyXG4gICAgZGVjb21wcmVzczogRGVjb21wcmVzc1xyXG4gICk6IFByb21pc2U8TWVzc2FnZURhdGFbXT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5yZWFkQ2h1bmtNZXNzYWdlcyhcclxuICAgICAgICBjaHVua0luZm8sXHJcbiAgICAgICAgY29ubmVjdGlvbnMsXHJcbiAgICAgICAgc3RhcnRUaW1lLFxyXG4gICAgICAgIGVuZFRpbWUsXHJcbiAgICAgICAgZGVjb21wcmVzcyxcclxuICAgICAgICAoZXJyOiBFcnJvciB8IG51bGwsIG1lc3NhZ2VzPzogTWVzc2FnZURhdGFbXSkgPT4gKGVyciB8fCAhbWVzc2FnZXMgPyByZWplY3QoZXJyKSA6IHJlc29sdmUobWVzc2FnZXMpKVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWFkcyBhIHNpbmdsZSBjaHVuayByZWNvcmQgJiYgaXRzIGluZGV4IHJlY29yZHMgZ2l2ZW4gYSBjaHVua0luZm8uXHJcbiAgICovXHJcbiAgcmVhZENodW5rKGNodW5rSW5mbzogQ2h1bmtJbmZvLCBkZWNvbXByZXNzOiBEZWNvbXByZXNzLCBjYWxsYmFjazogQ2FsbGJhY2s8Q2h1bmtSZWFkUmVzdWx0Pikge1xyXG4gICAgLy8gaWYgd2UncmUgcmVhZGluZyB0aGUgc2FtZSBjaHVuayBhIHNlY29uZCB0aW1lIHJldHVybiB0aGUgY2FjaGVkIHZlcnNpb25cclxuICAgIC8vIHRvIGF2b2lkIGRvaW5nIGRlY29tcHJlc3Npb24gb24gdGhlIHNhbWUgY2h1bmsgbXVsdGlwbGUgdGltZXMgd2hpY2ggaXNcclxuICAgIC8vIGV4cGVuc2l2ZVxyXG4gICAgaWYgKGNodW5rSW5mbyA9PT0gdGhpcy5fbGFzdENodW5rSW5mbyAmJiB0aGlzLl9sYXN0UmVhZFJlc3VsdCkge1xyXG4gICAgICAvLyBhbHdheXMgY2FsbGJhY2sgYXN5bmMsIGV2ZW4gaWYgd2UgaGF2ZSB0aGUgcmVzdWx0XHJcbiAgICAgIC8vIGh0dHBzOi8vb3Jlbi5naXRodWIuaW8vYmxvZy96YWxnby5odG1sXHJcbiAgICAgIGNvbnN0IGxhc3RSZWFkUmVzdWx0ID0gdGhpcy5fbGFzdFJlYWRSZXN1bHQ7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2FsbGJhY2sobnVsbCwgbGFzdFJlYWRSZXN1bHQpLCAwKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgbmV4dENodW5rIH0gPSBjaHVua0luZm87XHJcblxyXG4gICAgY29uc3QgcmVhZExlbmd0aCA9IG5leHRDaHVua1xyXG4gICAgICA/IG5leHRDaHVuay5jaHVua1Bvc2l0aW9uIC0gY2h1bmtJbmZvLmNodW5rUG9zaXRpb25cclxuICAgICAgOiB0aGlzLl9maWxlLnNpemUoKSAtIGNodW5rSW5mby5jaHVua1Bvc2l0aW9uO1xyXG5cclxuICAgIHRoaXMuX2ZpbGUucmVhZChjaHVua0luZm8uY2h1bmtQb3NpdGlvbiwgcmVhZExlbmd0aCwgKGVycjogRXJyb3IgfCBudWxsLCBidWZmZXI/OiBCdWZmZXIpID0+IHtcclxuICAgICAgaWYgKGVyciB8fCAhYnVmZmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciB8fCBuZXcgRXJyb3IoXCJNaXNzaW5nIGJvdGggZXJyb3IgYW5kIGJ1ZmZlclwiKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5yZWFkUmVjb3JkRnJvbUJ1ZmZlcihidWZmZXIsIGNodW5rSW5mby5jaHVua1Bvc2l0aW9uLCBDaHVuayk7XHJcbiAgICAgIGNvbnN0IHsgY29tcHJlc3Npb24gfSA9IGNodW5rO1xyXG5cclxuICAgICAgaWYgKGNvbXByZXNzaW9uICE9PSBcIm5vbmVcIikge1xyXG4gICAgICAgIGNvbnN0IGRlY29tcHJlc3NGbiA9IGRlY29tcHJlc3NbY29tcHJlc3Npb25dO1xyXG5cclxuICAgICAgICBpZiAoIWRlY29tcHJlc3NGbikge1xyXG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgY29tcHJlc3Npb24gdHlwZSAke2NodW5rLmNvbXByZXNzaW9ufWApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGRlY29tcHJlc3NGbihjaHVuay5kYXRhLCBjaHVuay5zaXplKTtcclxuICAgICAgICBjaHVuay5kYXRhID0gcmVzdWx0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBpbmRpY2VzID0gdGhpcy5yZWFkUmVjb3Jkc0Zyb21CdWZmZXIoXHJcbiAgICAgICAgYnVmZmVyLnNsaWNlKGNodW5rLmxlbmd0aCksXHJcbiAgICAgICAgY2h1bmtJbmZvLmNvdW50LFxyXG4gICAgICAgIGNodW5rSW5mby5jaHVua1Bvc2l0aW9uICsgY2h1bmsubGVuZ3RoLFxyXG4gICAgICAgIEluZGV4RGF0YVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLl9sYXN0Q2h1bmtJbmZvID0gY2h1bmtJbmZvO1xyXG4gICAgICB0aGlzLl9sYXN0UmVhZFJlc3VsdCA9IHtcclxuICAgICAgICBjaHVuayxcclxuICAgICAgICBpbmRpY2VzLFxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgdGhpcy5fbGFzdFJlYWRSZXN1bHQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWFkcyBjb3VudCByZWNvcmRzIGZyb20gYSBidWZmZXIgc3RhcnRpbmcgYXQgZmlsZU9mZnNldC5cclxuICAgKi9cclxuICByZWFkUmVjb3Jkc0Zyb21CdWZmZXI8VCBleHRlbmRzIFJvc2JhZ1JlY29yZD4oXHJcbiAgICBidWZmZXI6IEJ1ZmZlcixcclxuICAgIGNvdW50OiBudW1iZXIsXHJcbiAgICBmaWxlT2Zmc2V0OiBudW1iZXIsXHJcbiAgICBDbHM6IFJvc2JhZ1JlY29yZENvbnN0cnVjdG9yPFQ+XHJcbiAgKTogVFtdIHtcclxuICAgIGNvbnN0IHJlY29yZHM6IFRbXSA9IFtdO1xyXG4gICAgbGV0IGJ1ZmZlck9mZnNldCA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXMucmVhZFJlY29yZEZyb21CdWZmZXIoYnVmZmVyLnNsaWNlKGJ1ZmZlck9mZnNldCksIGZpbGVPZmZzZXQgKyBidWZmZXJPZmZzZXQsIENscyk7XHJcbiAgICAgIGJ1ZmZlck9mZnNldCArPSByZWNvcmQuZW5kIC0gcmVjb3JkLm9mZnNldDtcclxuICAgICAgcmVjb3Jkcy5wdXNoKHJlY29yZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlY29yZHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWFkcyBhbiBpbmRpdmlkdWFsIHJlY29yZCBmcm9tIGEgYnVmZmVyLlxyXG4gICAqL1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXHJcbiAgcmVhZFJlY29yZEZyb21CdWZmZXI8VCBleHRlbmRzIFJvc2JhZ1JlY29yZD4oYnVmZmVyOiBCdWZmZXIsIGZpbGVPZmZzZXQ6IG51bWJlciwgQ2xzOiBSb3NiYWdSZWNvcmRDb25zdHJ1Y3RvcjxUPik6IFQge1xyXG4gICAgY29uc3QgaGVhZGVyTGVuZ3RoID0gYnVmZmVyLnJlYWRJbnQzMkxFKDApO1xyXG4gICAgY29uc3QgaGVhZGVyRmllbGRzID0gcGFyc2VIZWFkZXIoYnVmZmVyLnNsaWNlKDQsIDQgKyBoZWFkZXJMZW5ndGgpLCBDbHMpO1xyXG4gICAgY29uc3QgZGF0YU9mZnNldCA9IDQgKyBoZWFkZXJMZW5ndGggKyA0O1xyXG4gICAgY29uc3QgZGF0YUxlbmd0aCA9IGJ1ZmZlci5yZWFkSW50MzJMRSg0ICsgaGVhZGVyTGVuZ3RoKTtcclxuICAgIGNvbnN0IGRhdGEgPSBidWZmZXIuc2xpY2UoZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIGRhdGFMZW5ndGgpO1xyXG5cclxuICAgIGNvbnN0IHJlY29yZCA9IG5ldyBDbHMoZmlsZU9mZnNldCwgZGF0YU9mZnNldCwgZGF0YUxlbmd0aCwgaGVhZGVyRmllbGRzLCBkYXRhKTtcclxuXHJcbiAgICByZXR1cm4gcmVjb3JkO1xyXG4gIH1cclxufVxyXG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xyXG5cclxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxyXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgaW50NTMgZnJvbSBcImludDUzXCI7XHJcbmltcG9ydCB7IGV4dHJhY3RUaW1lIH0gZnJvbSBcIi4vZmllbGRzXCI7XHJcbmltcG9ydCB0eXBlIHsgUm9zTXNnRGVmaW5pdGlvbiB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IHBhcnNlTWVzc2FnZURlZmluaXRpb24gfSBmcm9tIFwiLi9wYXJzZU1lc3NhZ2VEZWZpbml0aW9uXCI7XHJcblxyXG50eXBlIFR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9XHJcbiAgfCBJbnQ4QXJyYXlDb25zdHJ1Y3RvclxyXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBJbnQxNkFycmF5Q29uc3RydWN0b3JcclxuICB8IFVpbnQxNkFycmF5Q29uc3RydWN0b3JcclxuICB8IEludDMyQXJyYXlDb25zdHJ1Y3RvclxyXG4gIHwgVWludDMyQXJyYXlDb25zdHJ1Y3RvclxyXG4gIHwgVWludDhDbGFtcGVkQXJyYXlDb25zdHJ1Y3RvclxyXG4gIHwgRmxvYXQzMkFycmF5Q29uc3RydWN0b3JcclxuICB8IEZsb2F0NjRBcnJheUNvbnN0cnVjdG9yO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaGFzIGhhcmQtY29kZWQgYnVmZmVyIHJlYWRpbmcgZnVuY3Rpb25zIGZvciBlYWNoXHJcbiAqIG9mIHRoZSBzdGFuZGFyZCBtZXNzYWdlIHR5cGVzIGh0dHA6Ly9kb2NzLnJvcy5vcmcvYXBpL3N0ZF9tc2dzL2h0bWwvaW5kZXgtbXNnLmh0bWxcclxuICogZXZlbnR1YWxseSBjdXN0b20gdHlwZXMgZGVjb21wb3NlIGludG8gdGhlc2Ugc3RhbmRhcmQgdHlwZXNcclxuICovXHJcbmNsYXNzIFN0YW5kYXJkVHlwZVJlYWRlciB7XHJcbiAgYnVmZmVyOiBCdWZmZXI7XHJcbiAgb2Zmc2V0OiBudW1iZXI7XHJcbiAgdmlldzogRGF0YVZpZXc7XHJcbiAgX2RlY29kZXI/OiBUZXh0RGVjb2RlcjtcclxuICBfZGVjb2RlclN0YXR1czogXCJOT1RfSU5JVElBTElaRURcIiB8IFwiSU5JVElBTElaRURcIiB8IFwiTk9UX0FWQUlMQUJMRVwiID0gXCJOT1RfSU5JVElBTElaRURcIjtcclxuXHJcbiAgY29uc3RydWN0b3IoYnVmZmVyOiBCdWZmZXIpIHtcclxuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgdGhpcy52aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlci5idWZmZXIsIGJ1ZmZlci5ieXRlT2Zmc2V0KTtcclxuICB9XHJcblxyXG4gIF9pbnRpYWxpemVUZXh0RGVjb2RlcigpIHtcclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsLlRleHREZWNvZGVyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgIHRoaXMuX2RlY29kZXJTdGF0dXMgPSBcIk5PVF9BVkFJTEFCTEVcIjtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMuX2RlY29kZXIgPSBuZXcgZ2xvYmFsLlRleHREZWNvZGVyKFwiYXNjaWlcIik7XHJcbiAgICAgIHRoaXMuX2RlY29kZXJTdGF0dXMgPSBcIklOSVRJQUxJWkVEXCI7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIFN3YWxsb3cgdGhlIGVycm9yIGlmIHdlIGRvbid0IHN1cHBvcnQgYXNjaWkgZW5jb2RpbmcuXHJcbiAgICAgIHRoaXMuX2RlY29kZXJTdGF0dXMgPSBcIk5PVF9BVkFJTEFCTEVcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGpzb24oKTogdW5rbm93biB7XHJcbiAgICBjb25zdCByZXN1bHRTdHJpbmcgPSB0aGlzLnN0cmluZygpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3VsdFN0cmluZyk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmV0dXJuIGBDb3VsZCBub3QgcGFyc2UgJHtyZXN1bHRTdHJpbmd9YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0cmluZygpIHtcclxuICAgIGNvbnN0IGxlbiA9IHRoaXMuaW50MzIoKTtcclxuICAgIGNvbnN0IGNvZGVQb2ludHMgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlci5idWZmZXIsIHRoaXMuYnVmZmVyLmJ5dGVPZmZzZXQgKyB0aGlzLm9mZnNldCwgbGVuKTtcclxuICAgIHRoaXMub2Zmc2V0ICs9IGxlbjtcclxuXHJcbiAgICAvLyBpZiB0aGUgc3RyaW5nIGlzIHJlbGF0aXZlbHkgc2hvcnQgd2UgY2FuIHVzZSBhcHBseSwgYnV0IGxvbmdlciBzdHJpbmdzIGNhbiBiZW5lZml0IGZyb20gdGhlIHNwZWVkIG9mIFRleHREZWNvZGVyLlxyXG4gICAgaWYgKGNvZGVQb2ludHMubGVuZ3RoIDwgMTAwMCkge1xyXG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yICAgVHlwZSAnVWludDhBcnJheScgaXMgbWlzc2luZyB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXMgZnJvbSB0eXBlICdudW1iZXJbXSc6IHBvcCwgcHVzaCwgY29uY2F0LCBzaGlmdCwgYW5kIDUgbW9yZS5cclxuICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgY29kZVBvaW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXNlIFRleHREZWNvZGVyIGlmIGl0IGlzIGF2YWlsYWJsZSBhbmQgc3VwcG9ydHMgdGhlIFwiYXNjaWlcIiBlbmNvZGluZy5cclxuICAgIGlmICh0aGlzLl9kZWNvZGVyU3RhdHVzID09PSBcIk5PVF9JTklUSUFMSVpFRFwiKSB7XHJcbiAgICAgIHRoaXMuX2ludGlhbGl6ZVRleHREZWNvZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlY29kZXIpIHtcclxuICAgICAgLy8gVGV4dERlY29kZXIgZG9lcyBub3Qgc3VwcG9ydCBVaW50OEFycmF5cyB0aGF0IGFyZSBiYWNrZWQgYnkgU2hhcmVkQXJyYXlCdWZmZXIsIHNvIGNvcHkgdGhlIGFycmF5IGhlcmUuXHJcbiAgICAgIC8vIFNoYXJlZEFycmF5QnVmZmVyIHN1cHBvcnQgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIHNwZWMsIGJ1dCBtb3N0IGJyb3dzZXJzIGhhdmUgbm90IGltcGxlbWVudGVkIHRoaXMgY2hhbmdlLlxyXG4gICAgICAvLyBTZWUgc3BlYyBjaGFuZ2U6IGh0dHBzOi8vZ2l0aHViLmNvbS93aGF0d2cvZW5jb2RpbmcvcHVsbC8xODJcclxuICAgICAgLy8gVHJhY2sgYnJvd3NlciBzdXBwb3J0IGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS93aGF0d2cvZW5jb2RpbmcvcHVsbC8xODIjaXNzdWVjb21tZW50LTUzOTkzMjI5NFxyXG4gICAgICBjb25zdCBpbnB1dCA9IGNvZGVQb2ludHMuYnVmZmVyIGluc3RhbmNlb2YgZ2xvYmFsLlNoYXJlZEFycmF5QnVmZmVyID8gbmV3IFVpbnQ4QXJyYXkoY29kZVBvaW50cykgOiBjb2RlUG9pbnRzO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuX2RlY29kZXIuZGVjb2RlKGlucHV0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdGhlcndpc2UsIHVzZSBzdHJpbmcgY29uY2F0ZW50YXRpb24uXHJcbiAgICBsZXQgZGF0YSA9IFwiXCI7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBkYXRhICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50c1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBib29sKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudWludDgoKSAhPT0gMDtcclxuICB9XHJcblxyXG4gIGludDgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEludDgodGhpcy5vZmZzZXQrKyk7XHJcbiAgfVxyXG5cclxuICB1aW50OCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0VWludDgodGhpcy5vZmZzZXQrKyk7XHJcbiAgfVxyXG5cclxuICB0eXBlZEFycmF5KGxlbjogbnVtYmVyIHwgbnVsbCwgQXJyYXlUeXBlOiBUeXBlZEFycmF5Q29uc3RydWN0b3IpIHtcclxuICAgIGNvbnN0IGFycmF5TGVuZ3RoID0gbGVuID09IG51bGwgPyB0aGlzLnVpbnQzMigpIDogbGVuO1xyXG4gICAgY29uc3QgZGF0YSA9IG5ldyBBcnJheVR5cGUodGhpcy52aWV3LmJ1ZmZlciwgdGhpcy5vZmZzZXQgKyB0aGlzLnZpZXcuYnl0ZU9mZnNldCwgYXJyYXlMZW5ndGgpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gYXJyYXlMZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBpbnQxNigpIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmlldy5nZXRJbnQxNih0aGlzLm9mZnNldCwgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSAyO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHVpbnQxNigpIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmlldy5nZXRVaW50MTYodGhpcy5vZmZzZXQsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gMjtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBpbnQzMigpIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmlldy5nZXRJbnQzMih0aGlzLm9mZnNldCwgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSA0O1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHVpbnQzMigpIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmlldy5nZXRVaW50MzIodGhpcy5vZmZzZXQsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gNDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBmbG9hdDMyKCkge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52aWV3LmdldEZsb2F0MzIodGhpcy5vZmZzZXQsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gNDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBmbG9hdDY0KCkge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52aWV3LmdldEZsb2F0NjQodGhpcy5vZmZzZXQsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gODtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBpbnQ2NCgpIHtcclxuICAgIGNvbnN0IHsgb2Zmc2V0IH0gPSB0aGlzO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gODtcclxuICAgIHJldHVybiBpbnQ1My5yZWFkSW50NjRMRSh0aGlzLmJ1ZmZlciwgb2Zmc2V0KTtcclxuICB9XHJcblxyXG4gIHVpbnQ2NCgpIHtcclxuICAgIGNvbnN0IHsgb2Zmc2V0IH0gPSB0aGlzO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gODtcclxuICAgIHJldHVybiBpbnQ1My5yZWFkVUludDY0TEUodGhpcy5idWZmZXIsIG9mZnNldCk7XHJcbiAgfVxyXG5cclxuICB0aW1lKCkge1xyXG4gICAgY29uc3QgeyBvZmZzZXQgfSA9IHRoaXM7XHJcbiAgICB0aGlzLm9mZnNldCArPSA4O1xyXG4gICAgcmV0dXJuIGV4dHJhY3RUaW1lKHRoaXMuYnVmZmVyLCBvZmZzZXQpO1xyXG4gIH1cclxuXHJcbiAgZHVyYXRpb24oKSB7XHJcbiAgICBjb25zdCB7IG9mZnNldCB9ID0gdGhpcztcclxuICAgIHRoaXMub2Zmc2V0ICs9IDg7XHJcbiAgICByZXR1cm4gZXh0cmFjdFRpbWUodGhpcy5idWZmZXIsIG9mZnNldCk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBmaW5kVHlwZUJ5TmFtZSA9ICh0eXBlczogUm9zTXNnRGVmaW5pdGlvbltdLCBuYW1lOiBzdHJpbmcpOiBSb3NNc2dEZWZpbml0aW9uID0+IHtcclxuICBjb25zdCBtYXRjaGVzID0gdHlwZXMuZmlsdGVyKCh0eXBlKSA9PiB0eXBlLm5hbWUgPT09IG5hbWUpO1xyXG5cclxuICBpZiAobWF0Y2hlcy5sZW5ndGggIT09IDEpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgMSB0b3AgbGV2ZWwgdHlwZSBkZWZpbml0aW9uIGZvciAnJHtuYW1lfScgYnV0IGZvdW5kICR7bWF0Y2hlcy5sZW5ndGh9LmApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1hdGNoZXNbMF07XHJcbn07XHJcblxyXG5jb25zdCBmcmllbmRseU5hbWUgPSAobmFtZTogc3RyaW5nKSA9PiBuYW1lLnJlcGxhY2UoL1xcLy9nLCBcIl9cIik7XHJcblxyXG5jb25zdCBjcmVhdGVQYXJzZXIgPSAodHlwZXM6IFJvc01zZ0RlZmluaXRpb25bXSwgdHlwZU5hbWU6IHN0cmluZywgZnJlZXplOiBib29sZWFuKSA9PiB7XHJcbiAgY29uc3QgdG9wTGV2ZWxUeXBlcyA9IHR5cGVzLmZpbHRlcigodHlwZSkgPT4gdHlwZS5uYW1lID09PSB0eXBlTmFtZSk7XHJcblxyXG4gIGlmICh0b3BMZXZlbFR5cGVzLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwibXVsdGlwbGUgdG9wLWxldmVsIHR5cGVzXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgW3RvcExldmVsVHlwZV0gPSB0b3BMZXZlbFR5cGVzO1xyXG5cclxuICBjb25zdCBuZXN0ZWRUeXBlczogUm9zTXNnRGVmaW5pdGlvbltdID0gdHlwZXMuZmlsdGVyKCh0eXBlKSA9PiB0eXBlLm5hbWUgIT09IHR5cGVOYW1lKTtcclxuXHJcbiAgY29uc3QgY29uc3RydWN0b3JCb2R5ID0gKHR5cGU6IFJvc01zZ0RlZmluaXRpb24pID0+IHtcclxuICAgIGNvbnN0IHJlYWRlckxpbmVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgdHlwZS5kZWZpbml0aW9ucy5mb3JFYWNoKChkZWYpID0+IHtcclxuICAgICAgaWYgKGRlZi5pc0NvbnN0YW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGVmLmlzQXJyYXkpIHtcclxuICAgICAgICBpZiAoZGVmLnR5cGUgPT09IFwidWludDhcIiB8fCBkZWYudHlwZSA9PT0gXCJpbnQ4XCIpIHtcclxuICAgICAgICAgIGNvbnN0IGFycmF5VHlwZSA9IGRlZi50eXBlID09PSBcInVpbnQ4XCIgPyBcIlVpbnQ4QXJyYXlcIiA6IFwiSW50OEFycmF5XCI7XHJcbiAgICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGB0aGlzLiR7ZGVmLm5hbWV9ID0gcmVhZGVyLnR5cGVkQXJyYXkoJHtTdHJpbmcoZGVmLmFycmF5TGVuZ3RoKX0sICR7YXJyYXlUeXBlfSk7YCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsZW5GaWVsZCA9IGBsZW5ndGhfJHtkZWYubmFtZX1gO1xyXG5cclxuICAgICAgICAvLyBzZXQgYSB2YXJpYWJsZSBwb2ludGluZyB0byB0aGUgcGFyc2VkIGZpeGVkIGFycmF5IGxlbmd0aFxyXG4gICAgICAgIC8vIG9yIHJlYWQgdGhlIGJ5dGUgaW5kaWNhdGluZyB0aGUgZHluYW1pYyBsZW5ndGhcclxuICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGB2YXIgJHtsZW5GaWVsZH0gPSAke2RlZi5hcnJheUxlbmd0aCA/IGRlZi5hcnJheUxlbmd0aCA6IFwicmVhZGVyLnVpbnQzMigpO1wifWApO1xyXG5cclxuICAgICAgICAvLyBvbmx5IGFsbG9jYXRlIGFuIGFycmF5IGlmIHRoZXJlIGlzIGEgbGVuZ3RoIC0gc2tpcHMgZW1wdHkgYWxsb2NhdGlvbnNcclxuICAgICAgICBjb25zdCBhcnJheU5hbWUgPSBgdGhpcy4ke2RlZi5uYW1lfWA7XHJcblxyXG4gICAgICAgIC8vIGFsbG9jYXRlIHRoZSBuZXcgYXJyYXkgdG8gYSBmaXhlZCBsZW5ndGggc2luY2Ugd2Uga25vdyBpdCBhaGVhZCBvZiB0aW1lXHJcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgJHthcnJheU5hbWV9ID0gbmV3IEFycmF5KCR7bGVuRmllbGR9KWApO1xyXG5cclxuICAgICAgICAvLyBzdGFydCB0aGUgZm9yLWxvb3BcclxuICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGBmb3IgKHZhciBpID0gMDsgaSA8ICR7bGVuRmllbGR9OyBpKyspIHtgKTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIHN1YiB0eXBlIGlzIGNvbXBsZXggd2UgbmVlZCB0byBhbGxvY2F0ZSBpdCBhbmQgcGFyc2UgaXRzIHZhbHVlc1xyXG4gICAgICAgIGlmIChkZWYuaXNDb21wbGV4KSB7XHJcbiAgICAgICAgICBjb25zdCBkZWZUeXBlID0gZmluZFR5cGVCeU5hbWUodHlwZXMsIGRlZi50eXBlKTtcclxuICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGNhbGwgdGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgc3ViLXR5cGVcclxuICAgICAgICAgIHJlYWRlckxpbmVzLnB1c2goYCAgJHthcnJheU5hbWV9W2ldID0gbmV3IFJlY29yZC4ke2ZyaWVuZGx5TmFtZShkZWZUeXBlLm5hbWUpfShyZWFkZXIpO2ApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBpZiB0aGUgc3VidHlwZSBpcyBub3QgY29tcGxleCBpdHMgYSBzaW1wbGUgbG93LWxldmVsIHJlYWRlciBvcGVyYXRpb25cclxuICAgICAgICAgIHJlYWRlckxpbmVzLnB1c2goYCAgJHthcnJheU5hbWV9W2ldID0gcmVhZGVyLiR7ZGVmLnR5cGV9KCk7YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZWFkZXJMaW5lcy5wdXNoKFwifVwiKTsgLy8gY2xvc2UgdGhlIGZvci1sb29wXHJcbiAgICAgIH0gZWxzZSBpZiAoZGVmLmlzQ29tcGxleCkge1xyXG4gICAgICAgIGNvbnN0IGRlZlR5cGUgPSBmaW5kVHlwZUJ5TmFtZSh0eXBlcywgZGVmLnR5cGUpO1xyXG4gICAgICAgIHJlYWRlckxpbmVzLnB1c2goYHRoaXMuJHtkZWYubmFtZX0gPSBuZXcgUmVjb3JkLiR7ZnJpZW5kbHlOYW1lKGRlZlR5cGUubmFtZSl9KHJlYWRlcik7YCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgdGhpcy4ke2RlZi5uYW1lfSA9IHJlYWRlci4ke2RlZi50eXBlfSgpO2ApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZnJlZXplKSB7XHJcbiAgICAgIHJlYWRlckxpbmVzLnB1c2goXCJPYmplY3QuZnJlZXplKHRoaXMpO1wiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVhZGVyTGluZXMuam9pbihcIlxcbiAgICBcIik7XHJcbiAgfTtcclxuXHJcbiAgbGV0IGpzID0gYFxyXG4gIHZhciBSZWNvcmQgPSBmdW5jdGlvbiAocmVhZGVyKSB7XHJcbiAgICAke2NvbnN0cnVjdG9yQm9keSh0b3BMZXZlbFR5cGUpfVxyXG4gIH07XFxuYDtcclxuXHJcbiAgbmVzdGVkVHlwZXMuZm9yRWFjaCgodCkgPT4ge1xyXG4gICAganMgKz0gYFxyXG4gIFJlY29yZC4ke2ZyaWVuZGx5TmFtZSh0Lm5hbWUpfSA9IGZ1bmN0aW9uKHJlYWRlcikge1xyXG4gICAgJHtjb25zdHJ1Y3RvckJvZHkodCl9XHJcbiAgfTtcXG5gO1xyXG4gIH0pO1xyXG5cclxuICBqcyArPSBgXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlYWQocmVhZGVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFJlY29yZChyZWFkZXIpO1xyXG4gIH07YDtcclxuXHJcbiAgbGV0IF9yZWFkOiAocmVhZGVyOiBTdGFuZGFyZFR5cGVSZWFkZXIpID0+IHVua25vd247XHJcblxyXG4gIHRyeSB7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXZhbFxyXG4gICAgX3JlYWQgPSBldmFsKGAoZnVuY3Rpb24gYnVpbGRSZWFkZXIoKSB7ICR7anN9IH0pKClgKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiZXJyb3IgYnVpbGRpbmcgcGFyc2VyOlwiLCBqcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxyXG5cclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gcGFyc2VyKGJ1ZmZlcjogQnVmZmVyKSB7XHJcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgU3RhbmRhcmRUeXBlUmVhZGVyKGJ1ZmZlcik7XHJcbiAgICByZXR1cm4gX3JlYWQocmVhZGVyKTtcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VSZWFkZXIge1xyXG4gIHJlYWRlcjogKGJ1ZmZlcjogQnVmZmVyKSA9PiB1bmtub3duO1xyXG5cclxuICAvLyB0YWtlcyBhbiBvYmplY3QgbWVzc2FnZSBkZWZpbml0aW9uIGFuZCByZXR1cm5zXHJcbiAgLy8gYSBtZXNzYWdlIHJlYWRlciB3aGljaCBjYW4gYmUgdXNlZCB0byByZWFkIG1lc3NhZ2VzIGJhc2VkXHJcbiAgLy8gb24gdGhlIG1lc3NhZ2UgZGVmaW5pdGlvblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgZGVmaW5pdGlvbnM6IFJvc01zZ0RlZmluaXRpb25bXSxcclxuICAgIHR5cGVOYW1lOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zOiB7XHJcbiAgICAgIGZyZWV6ZT86IGJvb2xlYW47XHJcbiAgICB9ID0ge31cclxuICApIHtcclxuICAgIGxldCBwYXJzZWREZWZpbml0aW9ucyA9IGRlZmluaXRpb25zO1xyXG5cclxuICAgIGlmICh0eXBlb2YgcGFyc2VkRGVmaW5pdGlvbnMgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgIFwiUGFzc2luZyBzdHJpbmcgbWVzc2FnZSBkZWZpbnRpb25zIHRvIE1lc3NhZ2VSZWFkZXIgaXMgZGVwcmVjYXRlZC4gSW5zdGVhZCBjYWxsIGBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uYCBvbiBpdCBhbmQgcGFzcyBpbiB0aGUgcmVzdWx0aW5nIHBhcnNlZCBtZXNzYWdlIGRlZmluaXRpb24gb2JqZWN0LlwiXHJcbiAgICAgICk7XHJcbiAgICAgIHBhcnNlZERlZmluaXRpb25zID0gcGFyc2VNZXNzYWdlRGVmaW5pdGlvbihwYXJzZWREZWZpbml0aW9ucywgdHlwZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVhZGVyID0gY3JlYXRlUGFyc2VyKHBhcnNlZERlZmluaXRpb25zLCB0eXBlTmFtZSwgISFvcHRpb25zLmZyZWV6ZSk7XHJcbiAgfVxyXG5cclxuICByZWFkTWVzc2FnZShidWZmZXI6IEJ1ZmZlcikge1xyXG4gICAgcmV0dXJuIHRoaXMucmVhZGVyKGJ1ZmZlcik7XHJcbiAgfVxyXG59XHJcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXHJcblxyXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXHJcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHJcbmltcG9ydCBpbnQ1MyBmcm9tIFwiaW50NTNcIjtcclxuaW1wb3J0IHR5cGUgeyBUaW1lLCBSb3NNc2dEZWZpbml0aW9uIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcbi8vIHdyaXRlIGEgVGltZSBvYmplY3QgdG8gYSBidWZmZXIuXHJcbmZ1bmN0aW9uIHdyaXRlVGltZSh0aW1lOiBUaW1lLCBidWZmZXI6IEJ1ZmZlciwgb2Zmc2V0OiBudW1iZXIpIHtcclxuICBidWZmZXIud3JpdGVVSW50MzJMRSh0aW1lLnNlYywgb2Zmc2V0KTtcclxuICBidWZmZXIud3JpdGVVSW50MzJMRSh0aW1lLm5zZWMsIG9mZnNldCArIDQpO1xyXG59XHJcblxyXG5jbGFzcyBTdGFuZGFyZFR5cGVPZmZzZXRDYWxjdWxhdG9yIHtcclxuICBvZmZzZXQgPSAwO1xyXG5cclxuICAvLyBSZXR1cm5zIHRoZSBjdXJyZW50IG9mZnNldCBhbmQgaW5jcmVtZW50cyB0aGUgbmV4dCBvZmZzZXQgYnkgYGJ5dGVDb3VudGAuXHJcbiAgX2luY3JlbWVudEFuZFJldHVybihieXRlQ291bnQ6IG51bWJlcikge1xyXG4gICAgY29uc3QgeyBvZmZzZXQgfSA9IHRoaXM7XHJcbiAgICB0aGlzLm9mZnNldCArPSBieXRlQ291bnQ7XHJcbiAgICByZXR1cm4gb2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgLy8gVGhlc2UgYXJlIG5vdCBhY3R1YWxseSB1c2VkIGluIHRoZSBTdGFuZGFyZFR5cGVXcml0ZXIsIHNvIHRoZXkgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aG9zZSBpbXBsZW1lbnRhdGlvbnMuXHJcbiAganNvbih2YWx1ZTogdW5rbm93bikge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RyaW5nKEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgfVxyXG5cclxuICAvLyBUaGUgZm9sbG93aW5nIGFyZSB1c2VkIGluIHRoZSBTdGFuZGFyZFR5cGVXcml0ZXIuXHJcbiAgc3RyaW5nKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIC8vIGludDMyIGxlbmd0aFxyXG4gICAgY29uc3QgbGVuZ3RoID0gNCArIHZhbHVlLmxlbmd0aDtcclxuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4obGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIGJvb2woKSB7XHJcbiAgICByZXR1cm4gdGhpcy51aW50OCgpO1xyXG4gIH1cclxuXHJcbiAgaW50OCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oMSk7XHJcbiAgfVxyXG5cclxuICB1aW50OCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oMSk7XHJcbiAgfVxyXG5cclxuICBpbnQxNigpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oMik7XHJcbiAgfVxyXG5cclxuICB1aW50MTYoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDIpO1xyXG4gIH1cclxuXHJcbiAgaW50MzIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDQpO1xyXG4gIH1cclxuXHJcbiAgdWludDMyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luY3JlbWVudEFuZFJldHVybig0KTtcclxuICB9XHJcblxyXG4gIGZsb2F0MzIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDQpO1xyXG4gIH1cclxuXHJcbiAgZmxvYXQ2NCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oOCk7XHJcbiAgfVxyXG5cclxuICBpbnQ2NCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oOCk7XHJcbiAgfVxyXG5cclxuICB1aW50NjQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDgpO1xyXG4gIH1cclxuXHJcbiAgdGltZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oOCk7XHJcbiAgfVxyXG5cclxuICBkdXJhdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oOCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyB0aGlzIGhhcyBoYXJkLWNvZGVkIGJ1ZmZlciB3cml0aW5nIGZ1bmN0aW9ucyBmb3IgZWFjaFxyXG4vLyBvZiB0aGUgc3RhbmRhcmQgbWVzc2FnZSB0eXBlcyBodHRwOi8vZG9jcy5yb3Mub3JnL2FwaS9zdGRfbXNncy9odG1sL2luZGV4LW1zZy5odG1sXHJcbi8vIGV2ZW50dWFsbHkgY3VzdG9tIHR5cGVzIGRlY29tcG9zZSBpbnRvIHRoZXNlIHN0YW5kYXJkIHR5cGVzXHJcbmNsYXNzIFN0YW5kYXJkVHlwZVdyaXRlciB7XHJcbiAgYnVmZmVyOiBCdWZmZXI7XHJcbiAgdmlldzogRGF0YVZpZXc7XHJcbiAgb2Zmc2V0Q2FsY3VsYXRvcjogU3RhbmRhcmRUeXBlT2Zmc2V0Q2FsY3VsYXRvcjtcclxuXHJcbiAgY29uc3RydWN0b3IoYnVmZmVyOiBCdWZmZXIpIHtcclxuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgdGhpcy52aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlci5idWZmZXIsIGJ1ZmZlci5ieXRlT2Zmc2V0KTtcclxuICAgIHRoaXMub2Zmc2V0Q2FsY3VsYXRvciA9IG5ldyBTdGFuZGFyZFR5cGVPZmZzZXRDYWxjdWxhdG9yKCk7XHJcbiAgfVxyXG5cclxuICBqc29uKHZhbHVlOiB1bmtub3duKSB7XHJcbiAgICB0aGlzLnN0cmluZyhKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xyXG4gIH1cclxuXHJcbiAgc3RyaW5nKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN0cmluZ09mZnNldCA9IHRoaXMub2Zmc2V0Q2FsY3VsYXRvci5zdHJpbmcodmFsdWUpO1xyXG4gICAgdGhpcy52aWV3LnNldEludDMyKHN0cmluZ09mZnNldCwgdmFsdWUubGVuZ3RoLCB0cnVlKTtcclxuICAgIHRoaXMuYnVmZmVyLndyaXRlKHZhbHVlLCBzdHJpbmdPZmZzZXQgKyA0LCB2YWx1ZS5sZW5ndGgsIFwiYXNjaWlcIik7XHJcbiAgfVxyXG5cclxuICBib29sKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnVpbnQ4KHZhbHVlID8gMSA6IDApO1xyXG4gIH1cclxuXHJcbiAgaW50OCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnZpZXcuc2V0SW50OCh0aGlzLm9mZnNldENhbGN1bGF0b3IuaW50OCgpLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICB1aW50OCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnZpZXcuc2V0VWludDgodGhpcy5vZmZzZXRDYWxjdWxhdG9yLnVpbnQ4KCksIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGludDE2KHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMudmlldy5zZXRJbnQxNih0aGlzLm9mZnNldENhbGN1bGF0b3IuaW50MTYoKSwgdmFsdWUsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgdWludDE2KHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMudmlldy5zZXRVaW50MTYodGhpcy5vZmZzZXRDYWxjdWxhdG9yLnVpbnQxNigpLCB2YWx1ZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBpbnQzMih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnZpZXcuc2V0SW50MzIodGhpcy5vZmZzZXRDYWxjdWxhdG9yLmludDMyKCksIHZhbHVlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIHVpbnQzMih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnZpZXcuc2V0VWludDMyKHRoaXMub2Zmc2V0Q2FsY3VsYXRvci51aW50MzIoKSwgdmFsdWUsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZmxvYXQzMih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnZpZXcuc2V0RmxvYXQzMih0aGlzLm9mZnNldENhbGN1bGF0b3IuZmxvYXQzMigpLCB2YWx1ZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBmbG9hdDY0KHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMudmlldy5zZXRGbG9hdDY0KHRoaXMub2Zmc2V0Q2FsY3VsYXRvci5mbG9hdDY0KCksIHZhbHVlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGludDY0KHZhbHVlOiBudW1iZXIpIHtcclxuICAgIGludDUzLndyaXRlSW50NjRMRSh2YWx1ZSwgdGhpcy5idWZmZXIsIHRoaXMub2Zmc2V0Q2FsY3VsYXRvci5pbnQ2NCgpKTtcclxuICB9XHJcblxyXG4gIHVpbnQ2NCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICBpbnQ1My53cml0ZVVJbnQ2NExFKHZhbHVlLCB0aGlzLmJ1ZmZlciwgdGhpcy5vZmZzZXRDYWxjdWxhdG9yLnVpbnQ2NCgpKTtcclxuICB9XHJcblxyXG4gIHRpbWUodGltZTogVGltZSkge1xyXG4gICAgd3JpdGVUaW1lKHRpbWUsIHRoaXMuYnVmZmVyLCB0aGlzLm9mZnNldENhbGN1bGF0b3IudGltZSgpKTtcclxuICB9XHJcblxyXG4gIGR1cmF0aW9uKHRpbWU6IFRpbWUpIHtcclxuICAgIHdyaXRlVGltZSh0aW1lLCB0aGlzLmJ1ZmZlciwgdGhpcy5vZmZzZXRDYWxjdWxhdG9yLnRpbWUoKSk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBmaW5kVHlwZUJ5TmFtZSA9ICh0eXBlczogUm9zTXNnRGVmaW5pdGlvbltdLCBuYW1lOiBzdHJpbmcpOiBSb3NNc2dEZWZpbml0aW9uID0+IHtcclxuICBjb25zdCByZXQgPSB0eXBlcy5maW5kKCh0eXBlKSA9PiB0eXBlLm5hbWUgPT09IG5hbWUpO1xyXG5cclxuICBpZiAocmV0ID09IG51bGwpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSAnJHtuYW1lfScgYnV0IG5vdCBmb3VuZC5gKTtcclxuICB9XHJcblxyXG4gIHJldHVybiByZXQ7XHJcbn07XHJcblxyXG5jb25zdCBmcmllbmRseU5hbWUgPSAobmFtZTogc3RyaW5nKSA9PiBuYW1lLnJlcGxhY2UoL1xcLy9nLCBcIl9cIik7XHJcblxyXG50eXBlIFdyaXRlckFuZFNpemVDYWxjdWxhdG9yID0ge1xyXG4gIHdyaXRlcjogKG1lc3NhZ2U6IHVua25vd24sIGJ1ZmZlclRvV3JpdGU6IEJ1ZmZlcikgPT4gQnVmZmVyO1xyXG4gIGJ1ZmZlclNpemVDYWxjdWxhdG9yOiAobWVzc2FnZTogdW5rbm93bikgPT4gbnVtYmVyO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlV3JpdGVyQW5kU2l6ZUNhbGN1bGF0b3IodHlwZXM6IFJvc01zZ0RlZmluaXRpb25bXSwgdHlwZU5hbWU6IHN0cmluZyk6IFdyaXRlckFuZFNpemVDYWxjdWxhdG9yIHtcclxuICBjb25zdCB0b3BMZXZlbFR5cGUgPSBmaW5kVHlwZUJ5TmFtZSh0eXBlcywgdHlwZU5hbWUpO1xyXG4gIGNvbnN0IG5lc3RlZFR5cGVzID0gdHlwZXMuZmlsdGVyKCh0eXBlKSA9PiB0eXBlLm5hbWUgIT09IHR5cGVOYW1lKTtcclxuXHJcbiAgY29uc3QgY29uc3RydWN0b3JCb2R5ID0gKHR5cGU6IFJvc01zZ0RlZmluaXRpb24sIGFyZ05hbWU6IFwib2Zmc2V0Q2FsY3VsYXRvclwiIHwgXCJ3cml0ZXJcIikgPT4ge1xyXG4gICAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICB0eXBlLmRlZmluaXRpb25zLmZvckVhY2goKGRlZikgPT4ge1xyXG4gICAgICBpZiAoZGVmLmlzQ29uc3RhbnQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFjY2Vzc2VzIHRoZSBmaWVsZCB3ZSBhcmUgY3VycmVudGx5IHdyaXRpbmcuIFB1bGxlZCBvdXQgZm9yIGVhc3kgcmV1c2UuXHJcbiAgICAgIGNvbnN0IGFjY2Vzc01lc3NhZ2VGaWVsZCA9IGBtZXNzYWdlW1wiJHtkZWYubmFtZX1cIl1gO1xyXG5cclxuICAgICAgaWYgKGRlZi5pc0FycmF5KSB7XHJcbiAgICAgICAgY29uc3QgbGVuRmllbGQgPSBgbGVuZ3RoXyR7ZGVmLm5hbWV9YDtcclxuXHJcbiAgICAgICAgLy8gc2V0IGEgdmFyaWFibGUgcG9pbnRpbmcgdG8gdGhlIHBhcnNlZCBmaXhlZCBhcnJheSBsZW5ndGhcclxuICAgICAgICAvLyBvciB3cml0ZSB0aGUgYnl0ZSBpbmRpY2F0aW5nIHRoZSBkeW5hbWljIGxlbmd0aFxyXG4gICAgICAgIGlmIChkZWYuYXJyYXlMZW5ndGgpIHtcclxuICAgICAgICAgIGxpbmVzLnB1c2goYHZhciAke2xlbkZpZWxkfSA9ICR7ZGVmLmFycmF5TGVuZ3RofTtgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGluZXMucHVzaChgdmFyICR7bGVuRmllbGR9ID0gJHthY2Nlc3NNZXNzYWdlRmllbGR9Lmxlbmd0aDtgKTtcclxuICAgICAgICAgIGxpbmVzLnB1c2goYCR7YXJnTmFtZX0udWludDMyKCR7bGVuRmllbGR9KTtgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHN0YXJ0IHRoZSBmb3ItbG9vcFxyXG4gICAgICAgIGxpbmVzLnB1c2goYGZvciAodmFyIGkgPSAwOyBpIDwgJHtsZW5GaWVsZH07IGkrKykge2ApO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGUgc3ViIHR5cGUgaXMgY29tcGxleCB3ZSBuZWVkIHRvIGFsbG9jYXRlIGl0IGFuZCBwYXJzZSBpdHMgdmFsdWVzXHJcbiAgICAgICAgaWYgKGRlZi5pc0NvbXBsZXgpIHtcclxuICAgICAgICAgIGNvbnN0IGRlZlR5cGUgPSBmaW5kVHlwZUJ5TmFtZSh0eXBlcywgZGVmLnR5cGUpO1xyXG4gICAgICAgICAgLy8gcmVjdXJzaXZlbHkgY2FsbCB0aGUgZnVuY3Rpb24gZm9yIHRoZSBzdWItdHlwZVxyXG4gICAgICAgICAgbGluZXMucHVzaChgICAke2ZyaWVuZGx5TmFtZShkZWZUeXBlLm5hbWUpfSgke2FyZ05hbWV9LCAke2FjY2Vzc01lc3NhZ2VGaWVsZH1baV0pO2ApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBpZiB0aGUgc3VidHlwZSBpcyBub3QgY29tcGxleCBpdHMgYSBzaW1wbGUgbG93LWxldmVsIG9wZXJhdGlvblxyXG4gICAgICAgICAgbGluZXMucHVzaChgICAke2FyZ05hbWV9LiR7ZGVmLnR5cGV9KCR7YWNjZXNzTWVzc2FnZUZpZWxkfVtpXSk7YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5lcy5wdXNoKFwifVwiKTsgLy8gY2xvc2UgdGhlIGZvci1sb29wXHJcbiAgICAgIH0gZWxzZSBpZiAoZGVmLmlzQ29tcGxleCkge1xyXG4gICAgICAgIGNvbnN0IGRlZlR5cGUgPSBmaW5kVHlwZUJ5TmFtZSh0eXBlcywgZGVmLnR5cGUpO1xyXG4gICAgICAgIGxpbmVzLnB1c2goYCR7ZnJpZW5kbHlOYW1lKGRlZlR5cGUubmFtZSl9KCR7YXJnTmFtZX0sICR7YWNjZXNzTWVzc2FnZUZpZWxkfSk7YCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQ2FsbCBwcmltaXRpdmVzIGRpcmVjdGx5LlxyXG4gICAgICAgIGxpbmVzLnB1c2goYCR7YXJnTmFtZX0uJHtkZWYudHlwZX0oJHthY2Nlc3NNZXNzYWdlRmllbGR9KTtgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbGluZXMuam9pbihcIlxcbiAgICBcIik7XHJcbiAgfTtcclxuXHJcbiAgbGV0IHdyaXRlckpzID0gXCJcIjtcclxuICBsZXQgY2FsY3VsYXRlU2l6ZUpzID0gXCJcIjtcclxuXHJcbiAgbmVzdGVkVHlwZXMuZm9yRWFjaCgodCkgPT4ge1xyXG4gICAgd3JpdGVySnMgKz0gYFxyXG4gIGZ1bmN0aW9uICR7ZnJpZW5kbHlOYW1lKHQubmFtZSl9KHdyaXRlciwgbWVzc2FnZSkge1xyXG4gICAgJHtjb25zdHJ1Y3RvckJvZHkodCwgXCJ3cml0ZXJcIil9XHJcbiAgfTtcXG5gO1xyXG4gICAgY2FsY3VsYXRlU2l6ZUpzICs9IGBcclxuICBmdW5jdGlvbiAke2ZyaWVuZGx5TmFtZSh0Lm5hbWUpfShvZmZzZXRDYWxjdWxhdG9yLCBtZXNzYWdlKSB7XHJcbiAgICAke2NvbnN0cnVjdG9yQm9keSh0LCBcIm9mZnNldENhbGN1bGF0b3JcIil9XHJcbiAgfTtcXG5gO1xyXG4gIH0pO1xyXG5cclxuICB3cml0ZXJKcyArPSBgXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyaXRlKHdyaXRlciwgbWVzc2FnZSkge1xyXG4gICAgJHtjb25zdHJ1Y3RvckJvZHkodG9wTGV2ZWxUeXBlLCBcIndyaXRlclwiKX1cclxuICAgIHJldHVybiB3cml0ZXIuYnVmZmVyO1xyXG4gIH07YDtcclxuICBjYWxjdWxhdGVTaXplSnMgKz0gYFxyXG4gIHJldHVybiBmdW5jdGlvbiBjYWxjdWxhdGVTaXplKG9mZnNldENhbGN1bGF0b3IsIG1lc3NhZ2UpIHtcclxuICAgICR7Y29uc3RydWN0b3JCb2R5KHRvcExldmVsVHlwZSwgXCJvZmZzZXRDYWxjdWxhdG9yXCIpfVxyXG4gICAgcmV0dXJuIG9mZnNldENhbGN1bGF0b3Iub2Zmc2V0O1xyXG4gIH07YDtcclxuXHJcbiAgbGV0IF93cml0ZTogKHdyaXRlcjogU3RhbmRhcmRUeXBlV3JpdGVyLCBtZXNzYWdlOiB1bmtub3duKSA9PiBCdWZmZXI7XHJcblxyXG4gIGxldCBfY2FsY3VsYXRlU2l6ZTogKG9mZnNldENhbGN1bGF0b3I6IFN0YW5kYXJkVHlwZU9mZnNldENhbGN1bGF0b3IsIG1lc3NhZ2U6IHVua25vd24pID0+IG51bWJlcjtcclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1ldmFsXHJcbiAgICBfd3JpdGUgPSBldmFsKGAoZnVuY3Rpb24gYnVpbGRXcml0ZXIoKSB7ICR7d3JpdGVySnN9IH0pKClgKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiZXJyb3IgYnVpbGRpbmcgd3JpdGVyOlwiLCB3cml0ZXJKcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxyXG5cclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV2YWxcclxuICAgIF9jYWxjdWxhdGVTaXplID0gZXZhbChgKGZ1bmN0aW9uIGJ1aWxkU2l6ZUNhbGN1bGF0b3IoKSB7ICR7Y2FsY3VsYXRlU2l6ZUpzfSB9KSgpYCk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgY29uc29sZS5lcnJvcihcImVycm9yIGJ1aWxkaW5nIHNpemUgY2FsY3VsYXRvcjpcIiwgY2FsY3VsYXRlU2l6ZUpzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXHJcblxyXG4gICAgdGhyb3cgZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB3cml0ZXIobWVzc2FnZTogdW5rbm93biwgYnVmZmVyOiBCdWZmZXIpOiBCdWZmZXIge1xyXG4gICAgICBjb25zdCB3cml0ZXIgPSBuZXcgU3RhbmRhcmRUeXBlV3JpdGVyKGJ1ZmZlcik7XHJcbiAgICAgIHJldHVybiBfd3JpdGUod3JpdGVyLCBtZXNzYWdlKTtcclxuICAgIH0sXHJcblxyXG4gICAgYnVmZmVyU2l6ZUNhbGN1bGF0b3IobWVzc2FnZTogdW5rbm93bik6IG51bWJlciB7XHJcbiAgICAgIGNvbnN0IG9mZnNldENhbGN1bGF0b3IgPSBuZXcgU3RhbmRhcmRUeXBlT2Zmc2V0Q2FsY3VsYXRvcigpO1xyXG4gICAgICByZXR1cm4gX2NhbGN1bGF0ZVNpemUob2Zmc2V0Q2FsY3VsYXRvciwgbWVzc2FnZSk7XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlV3JpdGVyIHtcclxuICB3cml0ZXI6IChtZXNzYWdlOiB1bmtub3duLCBidWZmZXJUb1dyaXRlOiBCdWZmZXIpID0+IEJ1ZmZlcjtcclxuICBidWZmZXJTaXplQ2FsY3VsYXRvcjogKG1lc3NhZ2U6IHVua25vd24pID0+IG51bWJlcjtcclxuXHJcbiAgLy8gdGFrZXMgYW4gb2JqZWN0IHN0cmluZyBtZXNzYWdlIGRlZmluaXRpb24gYW5kIHJldHVybnNcclxuICAvLyBhIG1lc3NhZ2Ugd3JpdGVyIHdoaWNoIGNhbiBiZSB1c2VkIHRvIHdyaXRlIG1lc3NhZ2VzIGJhc2VkXHJcbiAgLy8gb24gdGhlIG1lc3NhZ2UgZGVmaW5pdGlvblxyXG4gIGNvbnN0cnVjdG9yKGRlZmluaXRpb25zOiBSb3NNc2dEZWZpbml0aW9uW10sIHR5cGVOYW1lOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHsgd3JpdGVyLCBidWZmZXJTaXplQ2FsY3VsYXRvciB9ID0gY3JlYXRlV3JpdGVyQW5kU2l6ZUNhbGN1bGF0b3IoZGVmaW5pdGlvbnMsIHR5cGVOYW1lKTtcclxuICAgIHRoaXMud3JpdGVyID0gd3JpdGVyO1xyXG4gICAgdGhpcy5idWZmZXJTaXplQ2FsY3VsYXRvciA9IGJ1ZmZlclNpemVDYWxjdWxhdG9yO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2FsY3VsYXRlcyB0aGUgYnVmZmVyIHNpemUgbmVlZGVkIHRvIHdyaXRlIHRoaXMgbWVzc2FnZSBpbiBieXRlcy5cclxuICBjYWxjdWxhdGVCdWZmZXJTaXplKG1lc3NhZ2U6IHVua25vd24pIHtcclxuICAgIHJldHVybiB0aGlzLmJ1ZmZlclNpemVDYWxjdWxhdG9yKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLy8gYnVmZmVyVG9Xcml0ZSBpcyBvcHRpb25hbCAtIGlmIGl0IGlzIG5vdCBwcm92aWRlZCwgYSBidWZmZXIgd2lsbCBiZSBnZW5lcmF0ZWQuXHJcbiAgd3JpdGVNZXNzYWdlKG1lc3NhZ2U6IHVua25vd24sIGJ1ZmZlclRvV3JpdGU/OiBCdWZmZXIpIHtcclxuICAgIGxldCBidWZmZXIgPSBidWZmZXJUb1dyaXRlO1xyXG5cclxuICAgIGlmICghYnVmZmVyKSB7XHJcbiAgICAgIGNvbnN0IGJ1ZmZlclNpemUgPSB0aGlzLmNhbGN1bGF0ZUJ1ZmZlclNpemUobWVzc2FnZSk7XHJcbiAgICAgIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShidWZmZXJTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy53cml0ZXIobWVzc2FnZSwgYnVmZmVyKTtcclxuICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcclxuXHJcbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcclxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHR5cGUgeyBUaW1lIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgcmVzdWx0IHBhc3NlZCB0byB0aGUgY2FsbGJhY2sgZnJvbSB0aGUgaGlnaC1sZXZlbCBjYWxsOlxyXG4gKiBgYmFnLnJlYWRNZXNzYWdlcyh7IG9wdHM6IGFueSB9LCBjYWxsYmFjazogKFJlYWRSZXN1bHQpID0+IHZvaWQpID0+IFByb21pc2U8dm9pZD5gXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFkUmVzdWx0PFQ+IHtcclxuICB0b3BpYzogc3RyaW5nO1xyXG4gIG1lc3NhZ2U6IFQ7XHJcbiAgdGltZXN0YW1wOiBUaW1lO1xyXG4gIGRhdGE6IEJ1ZmZlcjtcclxuICBjaHVua09mZnNldDogbnVtYmVyO1xyXG4gIHRvdGFsQ2h1bmtzOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgdG9waWM6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IFQsXHJcbiAgICB0aW1lc3RhbXA6IFRpbWUsXHJcbiAgICBkYXRhOiBCdWZmZXIsXHJcbiAgICBjaHVua09mZnNldDogbnVtYmVyLFxyXG4gICAgdG90YWxDaHVua3M6IG51bWJlcixcclxuICAgIGZyZWV6ZT86IGJvb2xlYW5cclxuICApIHtcclxuICAgIC8vIHN0cmluZzogdGhlIHRvcGljIHRoZSBtZXNzYWdlIHdhcyBvblxyXG4gICAgdGhpcy50b3BpYyA9IHRvcGljO1xyXG5cclxuICAgIC8vIGFueTogdGhlIHBhcnNlZCBib2R5IG9mIHRoZSBtZXNzYWdlIGJhc2VkIG9uIGNvbm5lY3Rpb24ubWVzc2FnZURlZmluaXRpb25cclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG4gICAgLy8gdGltZTogdGhlIHRpbWVzdGFtcCBvZiB0aGUgbWVzc2FnZVxyXG4gICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XHJcblxyXG4gICAgLy8gYnVmZmVyOiByYXcgYnVmZmVyIGRhdGEgb2YgdGhlIG1lc3NhZ2VcclxuICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgLy8gdGhlIG9mZnNldCBvZiB0aGUgY3VycmVudGx5IHJlYWQgY2h1bmtcclxuICAgIHRoaXMuY2h1bmtPZmZzZXQgPSBjaHVua09mZnNldDtcclxuXHJcbiAgICAvLyB0aGUgdG90YWwgbnVtYmVyIG9mIGNodW5rcyBpbiB0aGUgcmVhZCBvcGVyYXRpb25cclxuICAgIHRoaXMudG90YWxDaHVua3MgPSB0b3RhbENodW5rcztcclxuXHJcbiAgICBpZiAoZnJlZXplKSB7XHJcbiAgICAgIE9iamVjdC5mcmVlemUodGltZXN0YW1wKTtcclxuICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcclxuXHJcbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcclxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHR5cGUgeyBUaW1lIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmcm9tRGF0ZShkYXRlOiBEYXRlKSB7XHJcbiAgY29uc3Qgc2VjID0gTWF0aC5mbG9vcihkYXRlLmdldFRpbWUoKSAvIDEwMDApO1xyXG4gIGNvbnN0IG5zZWMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpICogMWU2O1xyXG4gIHJldHVybiB7XHJcbiAgICBzZWMsXHJcbiAgICBuc2VjLFxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZSh0aW1lOiBUaW1lKSB7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWUuc2VjICogMWUzICsgdGltZS5uc2VjIC8gMWU2KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXBhcmUgdHdvIHRpbWVzIHJldHVybmluZyBhIG5lZ2F0aXZlIHZhbHVlIGlmIHRoZSByaWdodCBpcyBncmVhdGVyLFxyXG4gKiBhIHBvc2l0aXZlIHZhbHVlIGlmIHRoZSBsZWZ0IGlzIGdyZWF0ZXIsIG9yIDAgaWYgdGhlIHRpbWVzIGFyZSBlcXVhbC5cclxuICpcclxuICogVXNlZnVsIHRvIHN1cHBseSB0byBgQXJyYXkucHJvdG90eXBlLnNvcnRgLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmUobGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcclxuICBjb25zdCBzZWNEaWZmID0gbGVmdC5zZWMgLSByaWdodC5zZWM7XHJcbiAgcmV0dXJuIHNlY0RpZmYgfHwgbGVmdC5uc2VjIC0gcmlnaHQubnNlYztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbGVmdCB0aW1lIGlzIGxlc3MgdGhhbiB0aGUgcmlnaHQgdGltZSwgb3RoZXJ3aXNlIGZhbHNlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTGVzc1RoYW4obGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcclxuICByZXR1cm4gY29tcGFyZShsZWZ0LCByaWdodCkgPCAwO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBsZWZ0IHRpbWUgaXMgZ3JlYXRlciB0aGFuIHRoZSByaWdodCB0aW1lLCBvdGhlcndpc2UgZmFsc2UuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNHcmVhdGVyVGhhbihsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xyXG4gIHJldHVybiBjb21wYXJlKGxlZnQsIHJpZ2h0KSA+IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYm90aCB0aW1lcyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBzZWNvbmRzIGFuZCBuYW5vc2Vjb25kcy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcmVTYW1lKGxlZnQ6IFRpbWUsIHJpZ2h0OiBUaW1lKSB7XHJcbiAgcmV0dXJuIGxlZnQuc2VjID09PSByaWdodC5zZWMgJiYgbGVmdC5uc2VjID09PSByaWdodC5uc2VjO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b1N0cmluZyh0aW1lOiBUaW1lKSB7XHJcbiAgcmV0dXJuIGB7JHt0aW1lLnNlY30sICR7dGltZS5uc2VjfX1gO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZXMgdGhlIHN1bSBvZiB0d28gdGltZXMgb3IgZHVyYXRpb25zIGFuZCByZXR1cm5zIGEgbmV3IHRpbWUuXHJcbiAqXHJcbiAqIFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHJlc3VsdGluZyB0aW1lIGlzIG5lZ2F0aXZlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZChsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xyXG4gIGNvbnN0IGR1cmF0aW9uTmFub3MgPSBsZWZ0Lm5zZWMgKyByaWdodC5uc2VjO1xyXG4gIGNvbnN0IHNlY3NGcm9tTmFub3MgPSBNYXRoLmZsb29yKGR1cmF0aW9uTmFub3MgLyAxZTkpO1xyXG4gIGNvbnN0IG5ld1NlY3MgPSBsZWZ0LnNlYyArIHJpZ2h0LnNlYyArIHNlY3NGcm9tTmFub3M7XHJcbiAgY29uc3QgcmVtYWluaW5nRHVyYXRpb25OYW5vcyA9IGR1cmF0aW9uTmFub3MgJSAxZTk7XHJcbiAgLy8gdXNlIE1hdGguYWJzIGhlcmUgdG8gcHJldmVudCAtMCB3aGVuIHRoZXJlIGlzIGV4YWN0bHkgMSBzZWNvbmQgb2YgbmVnYXRpdmUgbmFub3NlY29uZHMgcGFzc2VkIGluXHJcbiAgY29uc3QgbmV3TmFub3MgPSBNYXRoLmFicyhcclxuICAgIE1hdGguc2lnbihyZW1haW5pbmdEdXJhdGlvbk5hbm9zKSA9PT0gLTEgPyAxZTkgKyByZW1haW5pbmdEdXJhdGlvbk5hbm9zIDogcmVtYWluaW5nRHVyYXRpb25OYW5vc1xyXG4gICk7XHJcbiAgY29uc3QgcmVzdWx0ID0ge1xyXG4gICAgc2VjOiBuZXdTZWNzLFxyXG4gICAgbnNlYzogbmV3TmFub3MsXHJcbiAgfTtcclxuXHJcbiAgaWYgKHJlc3VsdC5zZWMgPCAwIHx8IHJlc3VsdC5uc2VjIDwgMCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICBgSW52YWxpZCB0aW1lOiAke3RvU3RyaW5nKHJlc3VsdCl9IHByb2R1Y2VkIGZyb20gVGltZVV0aWwuYWRkKCR7dG9TdHJpbmcobGVmdCl9LCAke3RvU3RyaW5nKHJpZ2h0KX19KWBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXHJcblxyXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXHJcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHJcbmltcG9ydCB0eXBlIHsgRGVjb21wcmVzcyB9IGZyb20gXCIuL0JhZ1JlYWRlclwiO1xyXG5pbXBvcnQgQmFnUmVhZGVyIGZyb20gXCIuL0JhZ1JlYWRlclwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlUmVhZGVyIH0gZnJvbSBcIi4vTWVzc2FnZVJlYWRlclwiO1xyXG5pbXBvcnQgUmVhZFJlc3VsdCBmcm9tIFwiLi9SZWFkUmVzdWx0XCI7XHJcbmltcG9ydCB7IEJhZ0hlYWRlciwgQ2h1bmtJbmZvLCBDb25uZWN0aW9uLCBNZXNzYWdlRGF0YSB9IGZyb20gXCIuL3JlY29yZFwiO1xyXG5pbXBvcnQgdHlwZSB7IFRpbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5pbXBvcnQgKiBhcyBUaW1lVXRpbCBmcm9tIFwiLi9UaW1lVXRpbFwiO1xyXG5pbXBvcnQgeyBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uIH0gZnJvbSBcIi4vcGFyc2VNZXNzYWdlRGVmaW5pdGlvblwiO1xyXG5cclxuZXhwb3J0IHR5cGUgUmVhZE9wdGlvbnMgPSB7XHJcbiAgZGVjb21wcmVzcz86IERlY29tcHJlc3M7XHJcbiAgbm9QYXJzZT86IGJvb2xlYW47XHJcbiAgdG9waWNzPzogc3RyaW5nW107XHJcbiAgc3RhcnRUaW1lPzogVGltZTtcclxuICBlbmRUaW1lPzogVGltZTtcclxuICBmcmVlemU/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBiYWcgdGhhdCBoYXMgYmVlbiBvcGVuZWQsIHdoaWNoIGd1YXJhbnRlZXMgY2VydGFpbiBwcm9wZXJ0aWVzIGFyZSBhdmFpbGFibGUuXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcclxuZXhwb3J0IGludGVyZmFjZSBPcGVuQmFnIGV4dGVuZHMgQmFnIHtcclxuICBoZWFkZXI6IEJhZ0hlYWRlcjtcclxuICBjb25uZWN0aW9uczogUmVjb3JkPG51bWJlciwgQ29ubmVjdGlvbj47XHJcbiAgY2h1bmtJbmZvczogQ2h1bmtJbmZvW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgaGlnaCBsZXZlbCByb3NiYWcgaW50ZXJmYWNlLlxyXG4gKlxyXG4gKiBDcmVhdGUgYSBuZXcgYmFnIGJ5IGNhbGxpbmc6XHJcbiAqIGBjb25zdCBiYWcgPSBhd2FpdCBCYWcub3BlbignLi9wYXRoLXRvLWZpbGUuYmFnJylgIGluIG5vZGUgb3JcclxuICogYGNvbnN0IGJhZyA9IGF3YWl0IEJhZy5vcGVuKGZpbGVzWzBdKWAgaW4gdGhlIGJyb3dzZXIuXHJcbiAqXHJcbiAqIEFmdGVyIHRoYXQgeW91IGNhbiBjb25zdW1lIG1lc3NhZ2VzIGJ5IGNhbGxpbmdcclxuICogYGF3YWl0IGJhZy5yZWFkTWVzc2FnZXMoeyB0b3BpY3M6IFsnL2ZvbyddIH0sXHJcbiAqICAgIChyZXN1bHQpID0+IGNvbnNvbGUubG9nKHJlc3VsdC50b3BpYywgcmVzdWx0Lm1lc3NhZ2UpKWBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhZyB7XHJcbiAgcmVhZGVyOiBCYWdSZWFkZXI7XHJcbiAgaGVhZGVyPzogQmFnSGVhZGVyO1xyXG4gIGNvbm5lY3Rpb25zPzogUmVjb3JkPG51bWJlciwgQ29ubmVjdGlvbj47XHJcbiAgY2h1bmtJbmZvcz86IENodW5rSW5mb1tdO1xyXG4gIHN0YXJ0VGltZT86IFRpbWU7XHJcbiAgZW5kVGltZT86IFRpbWU7XHJcblxyXG4gIC8vIHlvdSBjYW4gb3B0aW9uYWxseSBjcmVhdGUgYSBiYWcgbWFudWFsbHkgcGFzc2luZyBpbiBhIGJhZ1JlYWRlciBpbnN0YW5jZVxyXG4gIGNvbnN0cnVjdG9yKGJhZ1JlYWRlcjogQmFnUmVhZGVyKSB7XHJcbiAgICB0aGlzLnJlYWRlciA9IGJhZ1JlYWRlcjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBvcGVuID0gKF9maWxlOiBGaWxlIHwgc3RyaW5nKTogUHJvbWlzZTxPcGVuQmFnPiA9PlxyXG4gICAgUHJvbWlzZS5yZWplY3QoXHJcbiAgICAgIG5ldyBFcnJvcihcclxuICAgICAgICBcIlRoaXMgbWV0aG9kIHNob3VsZCBoYXZlIGJlZW4gb3ZlcnJpZGRlbiBiYXNlZCBvbiB0aGUgZW52aXJvbm1lbnQuIE1ha2Ugc3VyZSB5b3UgYXJlIGNvcnJlY3RseSBpbXBvcnRpbmcgdGhlIG5vZGUgb3Igd2ViIHZlcnNpb24gb2YgQmFnLlwiXHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxyXG4gIHByaXZhdGUgYXNzZXJ0T3BlbigpOiBhc3NlcnRzIHRoaXMgaXMgT3BlbkJhZyB7XHJcbiAgICBpZiAoIXRoaXMuaGVhZGVyIHx8ICF0aGlzLmNvbm5lY3Rpb25zIHx8ICF0aGlzLmNodW5rSW5mb3MpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFnIG5lZWRzIHRvIGJlIG9wZW5lZFwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRoZSBiYWcgaXMgbWFudWFsbHkgY3JlYXRlZCB3aXRoIHRoZSBjb25zdHJ1Y3RvciwgeW91IG11c3QgY2FsbCBgYXdhaXQgb3BlbigpYCBvbiB0aGUgYmFnLlxyXG4gICAqIEdlbmVyYWxseSB0aGlzIGlzIGNhbGxlZCBmb3IgeW91IGlmIHlvdSdyZSB1c2luZyBgY29uc3QgYmFnID0gYXdhaXQgQmFnLm9wZW4oKWAuXHJcbiAgICpcclxuICAgKiBSZXR1cm5zIGB0aGlzYCB3aXRoIHRoZSB0eXBlIG9mIGBPcGVuQmFnYC5cclxuICAgKi9cclxuICBhc3luYyBvcGVuKCk6IFByb21pc2U8T3BlbkJhZz4ge1xyXG4gICAgdGhpcy5oZWFkZXIgPSBhd2FpdCB0aGlzLnJlYWRlci5yZWFkSGVhZGVyQXN5bmMoKTtcclxuICAgIGNvbnN0IHsgY29ubmVjdGlvbkNvdW50LCBjaHVua0NvdW50LCBpbmRleFBvc2l0aW9uIH0gPSB0aGlzLmhlYWRlcjtcclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnJlYWRlci5yZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm9Bc3luYyhpbmRleFBvc2l0aW9uLCBjb25uZWN0aW9uQ291bnQsIGNodW5rQ291bnQpO1xyXG5cclxuICAgIHRoaXMuY29ubmVjdGlvbnMgPSB7fTtcclxuICAgIHJlc3VsdC5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XHJcbiAgICAgIC8vIENvbm5lY3Rpb25zIGlzIGRlZmluaXRseSBhc3NpZ25lZCBhYm92ZVxyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxyXG4gICAgICB0aGlzLmNvbm5lY3Rpb25zIVtjb25uZWN0aW9uLmNvbm5dID0gY29ubmVjdGlvbjtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY2h1bmtJbmZvcyA9IHJlc3VsdC5jaHVua0luZm9zO1xyXG5cclxuICAgIGlmIChjaHVua0NvdW50ID4gMCkge1xyXG4gICAgICAvLyBHZXQgdGhlIGVhcmxpZXN0IHN0YXJ0VGltZSBhbW9uZyBhbGwgY2h1bmtzXHJcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5jaHVua0luZm9zXHJcbiAgICAgICAgLm1hcCgoeCkgPT4geC5zdGFydFRpbWUpXHJcbiAgICAgICAgLnJlZHVjZSgocHJldiwgY3VycmVudCkgPT4gKFRpbWVVdGlsLmNvbXBhcmUocHJldiwgY3VycmVudCkgPD0gMCA/IHByZXYgOiBjdXJyZW50KSk7XHJcbiAgICAgIC8vIEdldCB0aGUgbGF0ZXN0IGVuZFRpbWUgYW1vbmcgYWxsIGNodW5rc1xyXG4gICAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLmNodW5rSW5mb3NcclxuICAgICAgICAubWFwKCh4KSA9PiB4LmVuZFRpbWUpXHJcbiAgICAgICAgLnJlZHVjZSgocHJldiwgY3VycmVudCkgPT4gKFRpbWVVdGlsLmNvbXBhcmUocHJldiwgY3VycmVudCkgPiAwID8gcHJldiA6IGN1cnJlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcyBhcyBPcGVuQmFnO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVhZE1lc3NhZ2VzKG9wdHM6IFJlYWRPcHRpb25zLCBjYWxsYmFjazogKG1zZzogUmVhZFJlc3VsdDx1bmtub3duPikgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5hc3NlcnRPcGVuKCk7XHJcblxyXG4gICAgY29uc3QgeyBjb25uZWN0aW9ucyB9ID0gdGhpcztcclxuICAgIGNvbnN0IHN0YXJ0VGltZSA9IG9wdHMuc3RhcnRUaW1lIHx8IHtcclxuICAgICAgc2VjOiAwLFxyXG4gICAgICBuc2VjOiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGVuZFRpbWUgPSBvcHRzLmVuZFRpbWUgfHwge1xyXG4gICAgICBzZWM6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgIG5zZWM6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdG9waWNzID0gb3B0cy50b3BpY3MgfHwgT2JqZWN0LnZhbHVlcyhjb25uZWN0aW9ucykubWFwKChjb25uZWN0aW9uKSA9PiBjb25uZWN0aW9uLnRvcGljKTtcclxuXHJcbiAgICBjb25zdCBmaWx0ZXJlZENvbm5lY3Rpb25zID0gT2JqZWN0LnZhbHVlcyhjb25uZWN0aW9ucylcclxuICAgICAgLmZpbHRlcigoY29ubmVjdGlvbikgPT4gdG9waWNzLmluZGV4T2YoY29ubmVjdGlvbi50b3BpYykgIT09IC0xKVxyXG4gICAgICAubWFwKChjb25uZWN0aW9uKSA9PiArY29ubmVjdGlvbi5jb25uKTtcclxuXHJcbiAgICBjb25zdCB7IGRlY29tcHJlc3MgPSB7fSB9ID0gb3B0cztcclxuXHJcbiAgICAvLyBmaWx0ZXIgY2h1bmtzIHRvIHRob3NlIHdoaWNoIGZhbGwgd2l0aGluIHRoZSB0aW1lIHJhbmdlIHdlJ3JlIGF0dGVtcHRpbmcgdG8gcmVhZFxyXG4gICAgY29uc3QgY2h1bmtJbmZvcyA9IHRoaXMuY2h1bmtJbmZvcy5maWx0ZXIoXHJcbiAgICAgIChpbmZvKSA9PiBUaW1lVXRpbC5jb21wYXJlKGluZm8uc3RhcnRUaW1lLCBlbmRUaW1lKSA8PSAwICYmIFRpbWVVdGlsLmNvbXBhcmUoc3RhcnRUaW1lLCBpbmZvLmVuZFRpbWUpIDw9IDBcclxuICAgICk7XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VNc2cobXNnOiBNZXNzYWdlRGF0YSwgY2h1bmtPZmZzZXQ6IG51bWJlcik6IFJlYWRSZXN1bHQ8dW5rbm93bj4ge1xyXG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gY29ubmVjdGlvbnNbbXNnLmNvbm5dO1xyXG4gICAgICBjb25zdCB7IHRvcGljLCB0eXBlIH0gPSBjb25uZWN0aW9uO1xyXG4gICAgICBjb25zdCB7IGRhdGEsIHRpbWU6IHRpbWVzdGFtcCB9ID0gbXNnO1xyXG4gICAgICBsZXQgbWVzc2FnZSA9IG51bGw7XHJcblxyXG4gICAgICBpZiAoIW9wdHMubm9QYXJzZSkge1xyXG4gICAgICAgIC8vIGxhemlseSBjcmVhdGUgYSByZWFkZXIgZm9yIHRoaXMgY29ubmVjdGlvbiBpZiBpdCBkb2Vzbid0IGV4aXN0XHJcbiAgICAgICAgY29ubmVjdGlvbi5yZWFkZXIgPVxyXG4gICAgICAgICAgY29ubmVjdGlvbi5yZWFkZXIgfHxcclxuICAgICAgICAgIG5ldyBNZXNzYWdlUmVhZGVyKHBhcnNlTWVzc2FnZURlZmluaXRpb24oY29ubmVjdGlvbi5tZXNzYWdlRGVmaW5pdGlvbiwgdHlwZSksIHR5cGUsIHtcclxuICAgICAgICAgICAgZnJlZXplOiBvcHRzLmZyZWV6ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIG1lc3NhZ2UgPSBjb25uZWN0aW9uLnJlYWRlci5yZWFkTWVzc2FnZShkYXRhKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ldyBSZWFkUmVzdWx0KHRvcGljLCBtZXNzYWdlLCB0aW1lc3RhbXAsIGRhdGEsIGNodW5rT2Zmc2V0LCBjaHVua0luZm9zLmxlbmd0aCwgb3B0cy5mcmVlemUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtJbmZvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBpbmZvID0gY2h1bmtJbmZvc1tpXTtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcclxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCB0aGlzLnJlYWRlci5yZWFkQ2h1bmtNZXNzYWdlc0FzeW5jKFxyXG4gICAgICAgIGluZm8sXHJcbiAgICAgICAgZmlsdGVyZWRDb25uZWN0aW9ucyxcclxuICAgICAgICBzdGFydFRpbWUsXHJcbiAgICAgICAgZW5kVGltZSxcclxuICAgICAgICBkZWNvbXByZXNzXHJcbiAgICAgICk7XHJcbiAgICAgIG1lc3NhZ2VzLmZvckVhY2goKG1zZykgPT4gY2FsbGJhY2socGFyc2VNc2cobXNnLCBpKSkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xyXG5cclxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxyXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgdHlwZSB7IFRpbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuY29uc3QgRVFVQUxTX0NIQVJDT0RFID0gXCI9XCIuY2hhckNvZGVBdCgwKTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyB0aHJvdWdoIGEgYnVmZmVyIGFuZCBleHRyYWN0cyBgeyBba2V5OiBzdHJpbmddOiB2YWx1ZTogc3RyaW5nIH1gXHJcbiAqIHBhaXJzLiBUaGUgYnVmZmVyIGlzIGV4cGVjdGVkIHRvIGhhdmUgbGVuZ3RoIHByZWZpeGVkIHV0Zjggc3RyaW5nc1xyXG4gKiB3aXRoIGEgJz0nIHNlcGFyYXRpbmcgdGhlIGtleSBhbmQgdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RmllbGRzKGJ1ZmZlcjogQnVmZmVyKSB7XHJcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPCA0KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZWFkZXIgZmllbGRzIGFyZSB0cnVuY2F0ZWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgbGV0IGkgPSAwO1xyXG4gIGNvbnN0IGZpZWxkczogUmVjb3JkPHN0cmluZywgQnVmZmVyPiA9IHt9O1xyXG5cclxuICB3aGlsZSAoaSA8IGJ1ZmZlci5sZW5ndGgpIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5yZWFkSW50MzJMRShpKTtcclxuICAgIGkgKz0gNDtcclxuXHJcbiAgICBpZiAoaSArIGxlbmd0aCA+IGJ1ZmZlci5sZW5ndGgpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVyIGZpZWxkcyBhcmUgY29ycnVwdC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUGFzc2luZyBhIG51bWJlciBpbnRvIFwiaW5kZXhPZlwiIGV4cGxpY2l0bHkgdG8gYXZvaWQgQnVmZmVyIHBvbHlmaWxsXHJcbiAgICAvLyBzbG93IHBhdGguIFNlZSBpc3N1ZSAjODcuXHJcbiAgICBjb25zdCBmaWVsZCA9IGJ1ZmZlci5zbGljZShpLCBpICsgbGVuZ3RoKTtcclxuICAgIGNvbnN0IGluZGV4ID0gZmllbGQuaW5kZXhPZihFUVVBTFNfQ0hBUkNPREUpO1xyXG5cclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVyIGZpZWxkIGlzIG1pc3NpbmcgZXF1YWxzIHNpZ24uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpZWxkc1tmaWVsZC5zbGljZSgwLCBpbmRleCkudG9TdHJpbmcoKV0gPSBmaWVsZC5zbGljZShpbmRleCArIDEpO1xyXG4gICAgaSArPSBsZW5ndGg7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmllbGRzO1xyXG59XHJcblxyXG4vKipcclxuICogUmVhZHMgYSBUaW1lIG9iamVjdCBvdXQgb2YgYSBidWZmZXIgYXQgdGhlIGdpdmVuIG9mZnNldC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0VGltZShidWZmZXI6IEJ1ZmZlciwgb2Zmc2V0OiBudW1iZXIpOiBUaW1lIHtcclxuICBjb25zdCBzZWMgPSBidWZmZXIucmVhZFVJbnQzMkxFKG9mZnNldCk7XHJcbiAgY29uc3QgbnNlYyA9IGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0ICsgNCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzZWMsXHJcbiAgICBuc2VjLFxyXG4gIH07XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcclxuXHJcbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcclxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgZXh0cmFjdEZpZWxkcyB9IGZyb20gXCIuL2ZpZWxkc1wiO1xyXG5pbXBvcnQgeyBSb3NiYWdSZWNvcmQsIFJvc2JhZ1JlY29yZENvbnN0cnVjdG9yIH0gZnJvbSBcIi4vcmVjb3JkXCI7XHJcblxyXG4vKipcclxuICogR2l2ZW4gYSBidWZmZXIgcGFyc2VzIG91dCB0aGUgcmVjb3JkIHdpdGhpbiB0aGUgYnVmZmVyXHJcbiAqIGJhc2VkIG9uIHRoZSBvcGNvZGUgdHlwZSBiaXQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIZWFkZXI8VCBleHRlbmRzIFJvc2JhZ1JlY29yZD4oXHJcbiAgYnVmZmVyOiBCdWZmZXIsXHJcbiAgQ2xzOiBSb3NiYWdSZWNvcmRDb25zdHJ1Y3RvcjxUPlxyXG4pOiBSZWNvcmQ8c3RyaW5nLCBCdWZmZXI+IHtcclxuICBjb25zdCBmaWVsZHMgPSBleHRyYWN0RmllbGRzKGJ1ZmZlcik7XHJcblxyXG4gIGlmIChmaWVsZHMub3AgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVyIGlzIG1pc3NpbmcgJ29wJyBmaWVsZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBvcGNvZGUgPSBmaWVsZHMub3AucmVhZFVJbnQ4KDApO1xyXG5cclxuICBpZiAob3Bjb2RlICE9PSBDbHMub3Bjb2RlKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkICR7Q2xzLm5hbWV9ICgke0Nscy5vcGNvZGV9KSBidXQgZm91bmQgJHtvcGNvZGV9YCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmllbGRzO1xyXG59XHJcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXHJcblxyXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXHJcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHJcbmltcG9ydCBCYWdSZWFkZXIgZnJvbSBcIi4vQmFnUmVhZGVyXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VSZWFkZXIgfSBmcm9tIFwiLi9NZXNzYWdlUmVhZGVyXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VXcml0ZXIgfSBmcm9tIFwiLi9NZXNzYWdlV3JpdGVyXCI7XHJcbmltcG9ydCAqIGFzIFRpbWVVdGlsIGZyb20gXCIuL1RpbWVVdGlsXCI7XHJcbmltcG9ydCBCYWcsIHsgT3BlbkJhZyB9IGZyb20gXCIuL2JhZ1wiO1xyXG5pbXBvcnQgeyBleHRyYWN0RmllbGRzLCBleHRyYWN0VGltZSB9IGZyb20gXCIuL2ZpZWxkc1wiO1xyXG5pbXBvcnQgeyBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uLCByb3NQcmltaXRpdmVUeXBlcyB9IGZyb20gXCIuL3BhcnNlTWVzc2FnZURlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgRmlsZWxpa2UgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuY29uc3QgeyBvcGVuIH0gPSBCYWc7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBSZWFkZXIgaW1wbGVtZW50cyBGaWxlbGlrZSB7XHJcbiAgcmVhZCgpOiB2b2lkO1xyXG4gIHNpemUoKTogbnVtYmVyO1xyXG59XHJcblxyXG4vLyBUaGVzZSBleHBvcnRzIG11c3QgbWF0Y2ggbm9kZS9pbmRleC50cyBhbmQgd2ViL2luZGV4LnRzXHJcbmV4cG9ydCAqIGZyb20gXCIuL3R5cGVzXCI7XHJcbmV4cG9ydCB7XHJcbiAgVGltZVV0aWwsXHJcbiAgQmFnLFxyXG4gIE9wZW5CYWcsXHJcbiAgQmFnUmVhZGVyLFxyXG4gIE1lc3NhZ2VSZWFkZXIsXHJcbiAgTWVzc2FnZVdyaXRlcixcclxuICBvcGVuLFxyXG4gIHBhcnNlTWVzc2FnZURlZmluaXRpb24sXHJcbiAgcm9zUHJpbWl0aXZlVHlwZXMsXHJcbiAgZXh0cmFjdEZpZWxkcyxcclxuICBleHRyYWN0VGltZSxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQmFnO1xyXG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xyXG5cclxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxyXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgSGVhcCBmcm9tIFwiaGVhcFwiO1xyXG5cclxuZnVuY3Rpb24gbm1lcmdlPFQ+KGtleTogKGE6IFQsIGI6IFQpID0+IG51bWJlciwgLi4uaXRlcmFibGVzOiBBcnJheTxJdGVyYXRvcjxUPj4pIHtcclxuICB0eXBlIEl0ZW0gPSB7XHJcbiAgICBpOiBudW1iZXI7XHJcbiAgICB2YWx1ZTogVDtcclxuICB9O1xyXG5cclxuICBjb25zdCBoZWFwOiBIZWFwPEl0ZW0+ID0gbmV3IEhlYXAoKGEsIGIpID0+IGtleShhLnZhbHVlLCBiLnZhbHVlKSk7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcmFibGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCB7IHZhbHVlLCBkb25lIH0gPSBpdGVyYWJsZXNbaV0ubmV4dCgpO1xyXG5cclxuICAgIGlmICghZG9uZSkge1xyXG4gICAgICBoZWFwLnB1c2goe1xyXG4gICAgICAgIGksXHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG5leHQ6ICgpID0+IHtcclxuICAgICAgaWYgKGhlYXAuZW1wdHkoKSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBkb25lOiB0cnVlLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHsgaSB9ID0gaGVhcC5mcm9udCgpIGFzIEl0ZW07XHJcbiAgICAgIGNvbnN0IG5leHQgPSBpdGVyYWJsZXNbaV0ubmV4dCgpO1xyXG5cclxuICAgICAgaWYgKG5leHQuZG9uZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB2YWx1ZTogKGhlYXAucG9wKCkgYXMgSXRlbSkudmFsdWUsXHJcbiAgICAgICAgICBkb25lOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbHVlOiBoZWFwLnJlcGxhY2Uoe1xyXG4gICAgICAgICAgaSxcclxuICAgICAgICAgIHZhbHVlOiBuZXh0LnZhbHVlLFxyXG4gICAgICAgIH0pLnZhbHVlLFxyXG4gICAgICAgIGRvbmU6IGZhbHNlLFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBubWVyZ2U7XHJcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXHJcblxyXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXHJcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHJcbmltcG9ydCB0eXBlIHsgUm9zTXNnRmllbGQsIFJvc01zZ0RlZmluaXRpb24gfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuLy8gU2V0IG9mIGJ1aWx0LWluIHJvcyB0eXBlcy4gU2VlIGh0dHA6Ly93aWtpLnJvcy5vcmcvbXNnI0ZpZWxkX1R5cGVzXHJcbmV4cG9ydCBjb25zdCByb3NQcmltaXRpdmVUeXBlczogU2V0PHN0cmluZz4gPSBuZXcgU2V0KFtcclxuICBcInN0cmluZ1wiLFxyXG4gIFwiYm9vbFwiLFxyXG4gIFwiaW50OFwiLFxyXG4gIFwidWludDhcIixcclxuICBcImludDE2XCIsXHJcbiAgXCJ1aW50MTZcIixcclxuICBcImludDMyXCIsXHJcbiAgXCJ1aW50MzJcIixcclxuICBcImZsb2F0MzJcIixcclxuICBcImZsb2F0NjRcIixcclxuICBcImludDY0XCIsXHJcbiAgXCJ1aW50NjRcIixcclxuICBcInRpbWVcIixcclxuICBcImR1cmF0aW9uXCIsXHJcbiAgXCJqc29uXCIsXHJcbl0pO1xyXG5cclxuZnVuY3Rpb24gbm9ybWFsaXplVHlwZSh0eXBlOiBzdHJpbmcpIHtcclxuICAvLyBOb3JtYWxpemUgZGVwcmVjYXRlZCBhbGlhc2VzLlxyXG4gIGxldCBub3JtYWxpemVkVHlwZSA9IHR5cGU7XHJcblxyXG4gIGlmICh0eXBlID09PSBcImNoYXJcIikge1xyXG4gICAgbm9ybWFsaXplZFR5cGUgPSBcInVpbnQ4XCI7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZSA9PT0gXCJieXRlXCIpIHtcclxuICAgIG5vcm1hbGl6ZWRUeXBlID0gXCJpbnQ4XCI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9ybWFsaXplZFR5cGU7XHJcbn1cclxuXHJcbi8vIHJlcHJlc2VudHMgYSBzaW5nbGUgbGluZSBpbiBhIG1lc3NhZ2UgZGVmaW5pdGlvbiB0eXBlXHJcbi8vIGUuZy4gJ3N0cmluZyBuYW1lJyAnQ3VzdG9tVHlwZVtdIGZvbycgJ3N0cmluZ1szXSBuYW1lcydcclxuZnVuY3Rpb24gbmV3QXJyYXlEZWZpbml0aW9uKHR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nLCBhcnJheUxlbmd0aD86IG51bWJlcik6IFJvc01zZ0ZpZWxkIHtcclxuICBjb25zdCBub3JtYWxpemVkVHlwZSA9IG5vcm1hbGl6ZVR5cGUodHlwZSk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IG5vcm1hbGl6ZWRUeXBlLFxyXG4gICAgbmFtZSxcclxuICAgIGlzQXJyYXk6IHRydWUsXHJcbiAgICBhcnJheUxlbmd0aDogYXJyYXlMZW5ndGggPT09IG51bGwgPyB1bmRlZmluZWQgOiBhcnJheUxlbmd0aCxcclxuICAgIGlzQ29tcGxleDogIXJvc1ByaW1pdGl2ZVR5cGVzLmhhcyhub3JtYWxpemVkVHlwZSksXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV3RGVmaW5pdGlvbih0eXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IFJvc01zZ0ZpZWxkIHtcclxuICBjb25zdCBub3JtYWxpemVkVHlwZSA9IG5vcm1hbGl6ZVR5cGUodHlwZSk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IG5vcm1hbGl6ZWRUeXBlLFxyXG4gICAgbmFtZSxcclxuICAgIGlzQXJyYXk6IGZhbHNlLFxyXG4gICAgaXNDb21wbGV4OiAhcm9zUHJpbWl0aXZlVHlwZXMuaGFzKG5vcm1hbGl6ZWRUeXBlKSxcclxuICB9O1xyXG59XHJcblxyXG5jb25zdCB0b2tlbml6ZUxpbmUgPSAobGluZTogc3RyaW5nKSA9PlxyXG4gIGxpbmVcclxuICAgIC5yZXBsYWNlKC8jLiovZ2ksIFwiXCIpXHJcbiAgICAuc3BsaXQoXCIgXCIpXHJcbiAgICAuZmlsdGVyKCh3b3JkKSA9PiB3b3JkKTtcclxuXHJcbmNvbnN0IGJ1aWxkTmFtZWRUeXBlID0gKFxyXG4gIGxpbmVzOiB7XHJcbiAgICBpc0pzb246IGJvb2xlYW47XHJcbiAgICBsaW5lOiBzdHJpbmc7XHJcbiAgfVtdLFxyXG4gIHR5cGVOYW1lOiBzdHJpbmdcclxuKTogUm9zTXNnRGVmaW5pdGlvbiA9PiB7XHJcbiAgY29uc3QgZGVmaW5pdGlvbnM6IFJvc01zZ0ZpZWxkW10gPSBbXTtcclxuICBsaW5lcy5mb3JFYWNoKCh7IGlzSnNvbiwgbGluZSB9KSA9PiB7XHJcbiAgICAvLyByZW1vdmUgY29tbWVudHMgYW5kIGV4dHJhIHdoaXRlc3BhY2UgZnJvbSBlYWNoIGxpbmVcclxuICAgIGNvbnN0IHNwbGl0cyA9IHRva2VuaXplTGluZShsaW5lKTtcclxuXHJcbiAgICBpZiAoIXNwbGl0c1sxXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc3VtZSBjb21tZW50c1xyXG4gICAgY29uc3QgdHlwZSA9IHNwbGl0c1swXS50cmltKCk7XHJcbiAgICBjb25zdCBuYW1lID0gc3BsaXRzWzFdLnRyaW0oKTtcclxuXHJcbiAgICBpZiAobmFtZS5pbmRleE9mKFwiPVwiKSA+IC0xIHx8IHNwbGl0cy5pbmRleE9mKFwiPVwiKSA+IC0xKSB7XHJcbiAgICAgIC8vIGNvbnN0YW50IHR5cGUgcGFyc2luZ1xyXG4gICAgICBjb25zdCBtYXRjaGVzID0gbGluZS5tYXRjaCgvKFxcUyspXFxzKj1cXHMqKC4qKVxccyovKTtcclxuXHJcbiAgICAgIGlmICghbWF0Y2hlcykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTWFsZm9ybWVkIGxpbmU6ICR7bGluZX1gKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuID0gbWF0Y2hlc1syXTtcclxuXHJcbiAgICAgIGlmICh0eXBlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgLy8gaGFuZGxlIHNwZWNpYWwgY2FzZSBvZiBweXRob24gYm9vbCB2YWx1ZXNcclxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1RydWUvZ2ksIFwidHJ1ZVwiKTtcclxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL0ZhbHNlL2dpLCBcImZhbHNlXCIpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlLnJlcGxhY2UoL1xccyojLiovZywgXCJcIikpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvciBpbiB0aGlzIGNvbnN0YW50IGRlZmluaXRpb246ICR7bGluZX1gKTtcclxuICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiYm9vbFwiKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IEJvb2xlYW4odmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCh0eXBlLmluY2x1ZGVzKFwiaW50XCIpICYmICt2YWx1ZSA+IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSB8fCArdmFsdWUgPCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUikge1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICAgICAgY29uc29sZS53YXJuKGBGb3VuZCBpbnRlZ2VyIGNvbnN0YW50IG91dHNpZGUgc2FmZSBpbnRlZ2VyIHJhbmdlOiAke2xpbmV9YCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRlZmluaXRpb25zLnB1c2goe1xyXG4gICAgICAgIHR5cGU6IG5vcm1hbGl6ZVR5cGUodHlwZSksXHJcbiAgICAgICAgbmFtZTogbWF0Y2hlc1sxXSxcclxuICAgICAgICBpc0NvbnN0YW50OiB0cnVlLFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodHlwZS5pbmRleE9mKFwiXVwiKSA9PT0gdHlwZS5sZW5ndGggLSAxKSB7XHJcbiAgICAgIC8vIGFycmF5IHR5cGUgcGFyc2luZ1xyXG4gICAgICBjb25zdCB0eXBlU3BsaXRzID0gdHlwZS5zcGxpdChcIltcIik7XHJcbiAgICAgIGNvbnN0IGJhc2VUeXBlID0gdHlwZVNwbGl0c1swXTtcclxuICAgICAgY29uc3QgbGVuID0gdHlwZVNwbGl0c1sxXS5yZXBsYWNlKFwiXVwiLCBcIlwiKTtcclxuICAgICAgZGVmaW5pdGlvbnMucHVzaChuZXdBcnJheURlZmluaXRpb24oYmFzZVR5cGUsIG5hbWUsIGxlbiA/IHBhcnNlSW50KGxlbiwgMTApIDogdW5kZWZpbmVkKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkZWZpbml0aW9ucy5wdXNoKG5ld0RlZmluaXRpb24oaXNKc29uID8gXCJqc29uXCIgOiB0eXBlLCBuYW1lKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6IHR5cGVOYW1lLFxyXG4gICAgZGVmaW5pdGlvbnMsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkVHlwZSA9IChcclxuICBsaW5lczoge1xyXG4gICAgaXNKc29uOiBib29sZWFuO1xyXG4gICAgbGluZTogc3RyaW5nO1xyXG4gIH1bXVxyXG4pOiBSb3NNc2dEZWZpbml0aW9uID0+IHtcclxuICBpZiAobGluZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFbXB0eSBtZXNzYWdlIGRlZmluaXRpb24uXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFsaW5lc1swXS5saW5lLnN0YXJ0c1dpdGgoXCJNU0c6IFwiKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBNYWxmb3JtZWQgbWVzc2FnZSBkZWZpbml0aW9uIG5hbWU6ICR7bGluZXNbMF0ubGluZX1gKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHR5cGVOYW1lID0gdG9rZW5pemVMaW5lKGxpbmVzWzBdLmxpbmUpWzFdLnRyaW0oKTtcclxuICByZXR1cm4gYnVpbGROYW1lZFR5cGUobGluZXMuc2xpY2UoMSksIHR5cGVOYW1lKTtcclxufTtcclxuXHJcbmNvbnN0IGZpbmRUeXBlQnlOYW1lID0gKHR5cGVzOiBSb3NNc2dEZWZpbml0aW9uW10sIG5hbWU6IHN0cmluZywgcm9zUGFja2FnZTogc3RyaW5nKTogUm9zTXNnRGVmaW5pdGlvbiA9PiB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XHJcbiAgY29uc3QgZnVsbE5hbWUgPSBuYW1lLmluY2x1ZGVzKFwiL1wiKSA/IG5hbWUgOiBuYW1lID09PSBcIkhlYWRlclwiID8gXCJzdGRfbXNncy9IZWFkZXJcIiA6IGAke3Jvc1BhY2thZ2V9LyR7bmFtZX1gO1xyXG4gIGNvbnN0IG1hdGNoZXMgPSB0eXBlcy5maWx0ZXIoKHR5cGUpID0+IHR5cGUubmFtZSA9PT0gZnVsbE5hbWUpO1xyXG5cclxuICBpZiAobWF0Y2hlcy5sZW5ndGggIT09IDEpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgYEV4cGVjdGVkIDEgdG9wIGxldmVsIHR5cGUgZGVmaW5pdGlvbiBmb3IgJyR7bmFtZX0nIGJ1dCBmb3VuZCAke21hdGNoZXMubGVuZ3RofSwgJHtKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgZnVsbE5hbWUsXHJcbiAgICAgICAgazogdHlwZXMubWFwKCh0eXBlKSA9PiB0eXBlLm5hbWUpLFxyXG4gICAgICB9KX1gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1hdGNoZXNbMF07XHJcbn07XHJcblxyXG4vKipcclxuICogR2l2ZW4gYSByYXcgbWVzc2FnZSBkZWZpbml0aW9uIHN0cmluZywgcGFyc2UgaXQgaW50byBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24uXHJcbiAqIFR5cGUgbmFtZXMgaW4gYWxsIHBvc2l0aW9ucyBhcmUgYWx3YXlzIGZ1bGx5LXF1YWxpZmllZC5cclxuICpcclxuICogRXhhbXBsZSByZXR1cm4gdmFsdWU6XHJcbiAqIFt7XHJcbiAqICAgbmFtZTogXCJmb29fbXNncy9CYXJcIixcclxuICogICBkZWZpbml0aW9uczogW1xyXG4gKiAgICAge1xyXG4gKiAgICAgICBhcnJheUxlbmd0aDogdW5kZWZpbmVkLFxyXG4gKiAgICAgICBpc0FycmF5OiBmYWxzZSxcclxuICogICAgICAgaXNDb21wbGV4OiBmYWxzZSxcclxuICogICAgICAgbmFtZTogXCJuYW1lXCIsXHJcbiAqICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAqICAgICB9LCAuLi5cclxuICogICBdLFxyXG4gKiB9LCAuLi4gXVxyXG4gKlxyXG4gKiBTZWUgdW5pdCB0ZXN0cyBmb3IgbW9yZSBleGFtcGxlcy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uKG1lc3NhZ2VEZWZpbml0aW9uOiBzdHJpbmcsIHR5cGVOYW1lOiBzdHJpbmcpIHtcclxuICAvLyByZWFkIGFsbCB0aGUgbGluZXMgYW5kIHJlbW92ZSBlbXB0aWVzXHJcbiAgY29uc3QgYWxsTGluZXMgPSBtZXNzYWdlRGVmaW5pdGlvblxyXG4gICAgLnNwbGl0KFwiXFxuXCIpXHJcbiAgICAubWFwKChsaW5lKSA9PiBsaW5lLnRyaW0oKSlcclxuICAgIC5maWx0ZXIoKGxpbmUpID0+IGxpbmUpO1xyXG4gIGxldCBkZWZpbml0aW9uTGluZXM6IHtcclxuICAgIGlzSnNvbjogYm9vbGVhbjtcclxuICAgIGxpbmU6IHN0cmluZztcclxuICB9W10gPSBbXTtcclxuICBjb25zdCB0eXBlczogUm9zTXNnRGVmaW5pdGlvbltdID0gW107XHJcbiAgbGV0IG5leHREZWZpbml0aW9uSXNKc29uID0gZmFsc2U7XHJcbiAgLy8gZ3JvdXAgbGluZXMgaW50byBpbmRpdmlkdWFsIGRlZmluaXRpb25zXHJcbiAgYWxsTGluZXMuZm9yRWFjaCgobGluZSkgPT4ge1xyXG4gICAgLy8gaWdub3JlIGNvbW1lbnQgbGluZXMgdW5sZXNzIHRoZXkgc3RhcnQgd2l0aCAjcHJhZ21hIHJvc2JhZ19wYXJzZV9qc29uXHJcbiAgICBpZiAobGluZS5zdGFydHNXaXRoKFwiI1wiKSkge1xyXG4gICAgICBpZiAobGluZS5zdGFydHNXaXRoKFwiI3ByYWdtYSByb3NiYWdfcGFyc2VfanNvblwiKSkge1xyXG4gICAgICAgIG5leHREZWZpbml0aW9uSXNKc29uID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRlZmluaXRpb25zIGFyZSBzcGxpdCBieSBlcXVhbCBzaWduc1xyXG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aChcIj09XCIpKSB7XHJcbiAgICAgIG5leHREZWZpbml0aW9uSXNKc29uID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IGRlZmluaXRpb24gPSB0eXBlcy5sZW5ndGggPT09IDAgPyBidWlsZE5hbWVkVHlwZShkZWZpbml0aW9uTGluZXMsIHR5cGVOYW1lKSA6IGJ1aWxkVHlwZShkZWZpbml0aW9uTGluZXMpO1xyXG4gICAgICB0eXBlcy5wdXNoKGRlZmluaXRpb24pO1xyXG4gICAgICBkZWZpbml0aW9uTGluZXMgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRlZmluaXRpb25MaW5lcy5wdXNoKHtcclxuICAgICAgICBpc0pzb246IG5leHREZWZpbml0aW9uSXNKc29uLFxyXG4gICAgICAgIGxpbmUsXHJcbiAgICAgIH0pO1xyXG4gICAgICBuZXh0RGVmaW5pdGlvbklzSnNvbiA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGNvbnN0IHR5cGVEZWZpbml0aW9uID0gdHlwZXMubGVuZ3RoID09PSAwID8gYnVpbGROYW1lZFR5cGUoZGVmaW5pdGlvbkxpbmVzLCB0eXBlTmFtZSkgOiBidWlsZFR5cGUoZGVmaW5pdGlvbkxpbmVzKTtcclxuICB0eXBlcy5wdXNoKHR5cGVEZWZpbml0aW9uKTtcclxuXHJcbiAgLy8gRml4IHVwIGNvbXBsZXggdHlwZSBuYW1lc1xyXG4gIHR5cGVzLmZvckVhY2goKHsgbmFtZSwgZGVmaW5pdGlvbnMgfSkgPT4ge1xyXG4gICAgY29uc3QgdHlwZVBhY2thZ2UgPSBuYW1lLnNwbGl0KFwiL1wiKVswXTtcclxuICAgIGRlZmluaXRpb25zLmZvckVhY2goKGRlZmluaXRpb24pID0+IHtcclxuICAgICAgaWYgKGRlZmluaXRpb24uaXNDb21wbGV4KSB7XHJcbiAgICAgICAgY29uc3QgZm91bmROYW1lID0gZmluZFR5cGVCeU5hbWUodHlwZXMsIGRlZmluaXRpb24udHlwZSwgdHlwZVBhY2thZ2UpLm5hbWU7XHJcblxyXG4gICAgICAgIGlmIChmb3VuZE5hbWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIHR5cGUgZGVmaW5pdGlvbiBmb3IgJHtkZWZpbml0aW9uLnR5cGV9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWZpbml0aW9uLnR5cGUgPSBmb3VuZE5hbWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gdHlwZXM7XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcclxuXHJcbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcclxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IGludDUzIGZyb20gXCJpbnQ1M1wiO1xyXG5pbXBvcnQgeyBleHRyYWN0RmllbGRzLCBleHRyYWN0VGltZSB9IGZyb20gXCIuL2ZpZWxkc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlUmVhZGVyIH0gZnJvbSBcIi4vTWVzc2FnZVJlYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IFRpbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuY29uc3QgcmVhZFVJbnQ2NExFID0gKGJ1ZmZlcjogQnVmZmVyKSA9PiBpbnQ1My5yZWFkVUludDY0TEUoYnVmZmVyLCAwKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBSb3NiYWdSZWNvcmQge1xyXG4gIG9mZnNldDogbnVtYmVyO1xyXG4gIGRhdGFPZmZzZXQ6IG51bWJlcjtcclxuICBlbmQ6IG51bWJlcjtcclxuICBsZW5ndGg6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3Iob2Zmc2V0OiBudW1iZXIsIGRhdGFPZmZzZXQ6IG51bWJlciwgZGF0YUxlbmd0aDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuICAgIHRoaXMuZGF0YU9mZnNldCA9IHRoaXMub2Zmc2V0ICsgZGF0YU9mZnNldDtcclxuICAgIHRoaXMuZW5kID0gdGhpcy5kYXRhT2Zmc2V0ICsgZGF0YUxlbmd0aDtcclxuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5lbmQgLSB0aGlzLm9mZnNldDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUm9zYmFnUmVjb3JkQ29uc3RydWN0b3I8VCBleHRlbmRzIFJvc2JhZ1JlY29yZD4ge1xyXG4gIG9wY29kZTogbnVtYmVyO1xyXG4gIG5ldyAob2Zmc2V0OiBudW1iZXIsIGRhdGFPZmZzZXQ6IG51bWJlciwgZGF0YUxlbmd0aDogbnVtYmVyLCBmaWVsZHM6IFJlY29yZDxzdHJpbmcsIEJ1ZmZlcj4sIGJ1ZmZlcjogQnVmZmVyKTogVDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhZ0hlYWRlciBleHRlbmRzIFJvc2JhZ1JlY29yZCB7XHJcbiAgc3RhdGljIG9wY29kZSA9IDM7XHJcbiAgaW5kZXhQb3NpdGlvbjogbnVtYmVyO1xyXG4gIGNvbm5lY3Rpb25Db3VudDogbnVtYmVyO1xyXG4gIGNodW5rQ291bnQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3Iob2Zmc2V0OiBudW1iZXIsIGRhdGFPZmZzZXQ6IG51bWJlciwgZGF0YUxlbmd0aDogbnVtYmVyLCBmaWVsZHM6IFJlY29yZDxzdHJpbmcsIEJ1ZmZlcj4sIF9idWZmZXI6IEJ1ZmZlcikge1xyXG4gICAgc3VwZXIob2Zmc2V0LCBkYXRhT2Zmc2V0LCBkYXRhTGVuZ3RoKTtcclxuICAgIHRoaXMuaW5kZXhQb3NpdGlvbiA9IHJlYWRVSW50NjRMRShmaWVsZHMuaW5kZXhfcG9zKTtcclxuICAgIHRoaXMuY29ubmVjdGlvbkNvdW50ID0gZmllbGRzLmNvbm5fY291bnQucmVhZEludDMyTEUoMCk7XHJcbiAgICB0aGlzLmNodW5rQ291bnQgPSBmaWVsZHMuY2h1bmtfY291bnQucmVhZEludDMyTEUoMCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2h1bmsgZXh0ZW5kcyBSb3NiYWdSZWNvcmQge1xyXG4gIHN0YXRpYyBvcGNvZGUgPSA1O1xyXG4gIGNvbXByZXNzaW9uOiBzdHJpbmc7XHJcbiAgc2l6ZTogbnVtYmVyO1xyXG4gIGRhdGE6IEJ1ZmZlcjtcclxuXHJcbiAgY29uc3RydWN0b3Iob2Zmc2V0OiBudW1iZXIsIGRhdGFPZmZzZXQ6IG51bWJlciwgZGF0YUxlbmd0aDogbnVtYmVyLCBmaWVsZHM6IFJlY29yZDxzdHJpbmcsIEJ1ZmZlcj4sIGJ1ZmZlcjogQnVmZmVyKSB7XHJcbiAgICBzdXBlcihvZmZzZXQsIGRhdGFPZmZzZXQsIGRhdGFMZW5ndGgpO1xyXG4gICAgdGhpcy5jb21wcmVzc2lvbiA9IGZpZWxkcy5jb21wcmVzc2lvbi50b1N0cmluZygpO1xyXG4gICAgdGhpcy5zaXplID0gZmllbGRzLnNpemUucmVhZFVJbnQzMkxFKDApO1xyXG4gICAgdGhpcy5kYXRhID0gYnVmZmVyO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgZ2V0RmllbGQgPSAoZmllbGRzOiBSZWNvcmQ8c3RyaW5nLCBCdWZmZXI+LCBrZXk6IHN0cmluZykgPT4ge1xyXG4gIGlmIChmaWVsZHNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvbm5lY3Rpb24gaGVhZGVyIGlzIG1pc3NpbmcgJHtrZXl9LmApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZpZWxkc1trZXldLnRvU3RyaW5nKCk7XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvbiBleHRlbmRzIFJvc2JhZ1JlY29yZCB7XHJcbiAgc3RhdGljIG9wY29kZSA9IDc7XHJcbiAgY29ubjogbnVtYmVyO1xyXG4gIHRvcGljOiBzdHJpbmc7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIG1kNXN1bTogc3RyaW5nO1xyXG4gIG1lc3NhZ2VEZWZpbml0aW9uOiBzdHJpbmc7XHJcbiAgY2FsbGVyaWQ/OiBzdHJpbmc7XHJcbiAgbGF0Y2hpbmc/OiBib29sZWFuO1xyXG4gIHJlYWRlcj86IE1lc3NhZ2VSZWFkZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9mZnNldDogbnVtYmVyLCBkYXRhT2Zmc2V0OiBudW1iZXIsIGRhdGFMZW5ndGg6IG51bWJlciwgZmllbGRzOiBSZWNvcmQ8c3RyaW5nLCBCdWZmZXI+LCBidWZmZXI6IEJ1ZmZlcikge1xyXG4gICAgc3VwZXIob2Zmc2V0LCBkYXRhT2Zmc2V0LCBkYXRhTGVuZ3RoKTtcclxuICAgIHRoaXMuY29ubiA9IGZpZWxkcy5jb25uLnJlYWRVSW50MzJMRSgwKTtcclxuICAgIHRoaXMudG9waWMgPSBmaWVsZHMudG9waWMudG9TdHJpbmcoKTtcclxuICAgIHRoaXMubWVzc2FnZURlZmluaXRpb24gPSBcIlwiO1xyXG4gICAgY29uc3QgYnVmZmVyRmllbGRzID0gZXh0cmFjdEZpZWxkcyhidWZmZXIpO1xyXG4gICAgdGhpcy50eXBlID0gZ2V0RmllbGQoYnVmZmVyRmllbGRzLCBcInR5cGVcIik7XHJcbiAgICB0aGlzLm1kNXN1bSA9IGdldEZpZWxkKGJ1ZmZlckZpZWxkcywgXCJtZDVzdW1cIik7XHJcbiAgICB0aGlzLm1lc3NhZ2VEZWZpbml0aW9uID0gZ2V0RmllbGQoYnVmZmVyRmllbGRzLCBcIm1lc3NhZ2VfZGVmaW5pdGlvblwiKTtcclxuXHJcbiAgICBpZiAoYnVmZmVyRmllbGRzLmNhbGxlcmlkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5jYWxsZXJpZCA9IGJ1ZmZlckZpZWxkcy5jYWxsZXJpZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChidWZmZXJGaWVsZHMubGF0Y2hpbmcgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmxhdGNoaW5nID0gYnVmZmVyRmllbGRzLmxhdGNoaW5nLnRvU3RyaW5nKCkgPT09IFwiMVwiO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEYXRhIGV4dGVuZHMgUm9zYmFnUmVjb3JkIHtcclxuICBzdGF0aWMgb3Bjb2RlID0gMjtcclxuICBjb25uOiBudW1iZXI7XHJcbiAgdGltZTogVGltZTtcclxuICBkYXRhOiBCdWZmZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9mZnNldDogbnVtYmVyLCBkYXRhT2Zmc2V0OiBudW1iZXIsIGRhdGFMZW5ndGg6IG51bWJlciwgZmllbGRzOiBSZWNvcmQ8c3RyaW5nLCBCdWZmZXI+LCBidWZmZXI6IEJ1ZmZlcikge1xyXG4gICAgc3VwZXIob2Zmc2V0LCBkYXRhT2Zmc2V0LCBkYXRhTGVuZ3RoKTtcclxuICAgIHRoaXMuY29ubiA9IGZpZWxkcy5jb25uLnJlYWRVSW50MzJMRSgwKTtcclxuICAgIHRoaXMudGltZSA9IGV4dHJhY3RUaW1lKGZpZWxkcy50aW1lLCAwKTtcclxuICAgIHRoaXMuZGF0YSA9IGJ1ZmZlcjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbmRleERhdGEgZXh0ZW5kcyBSb3NiYWdSZWNvcmQge1xyXG4gIHN0YXRpYyBvcGNvZGUgPSA0O1xyXG4gIHZlcjogbnVtYmVyO1xyXG4gIGNvbm46IG51bWJlcjtcclxuICBjb3VudDogbnVtYmVyO1xyXG4gIGluZGljZXM6IEFycmF5PHtcclxuICAgIHRpbWU6IFRpbWU7XHJcbiAgICBvZmZzZXQ6IG51bWJlcjtcclxuICB9PjtcclxuXHJcbiAgY29uc3RydWN0b3Iob2Zmc2V0OiBudW1iZXIsIGRhdGFPZmZzZXQ6IG51bWJlciwgZGF0YUxlbmd0aDogbnVtYmVyLCBmaWVsZHM6IFJlY29yZDxzdHJpbmcsIEJ1ZmZlcj4sIGJ1ZmZlcjogQnVmZmVyKSB7XHJcbiAgICBzdXBlcihvZmZzZXQsIGRhdGFPZmZzZXQsIGRhdGFMZW5ndGgpO1xyXG4gICAgdGhpcy52ZXIgPSBmaWVsZHMudmVyLnJlYWRVSW50MzJMRSgwKTtcclxuICAgIHRoaXMuY29ubiA9IGZpZWxkcy5jb25uLnJlYWRVSW50MzJMRSgwKTtcclxuICAgIHRoaXMuY291bnQgPSBmaWVsZHMuY291bnQucmVhZFVJbnQzMkxFKDApO1xyXG5cclxuICAgIHRoaXMuaW5kaWNlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvdW50OyBpKyspIHtcclxuICAgICAgdGhpcy5pbmRpY2VzLnB1c2goe1xyXG4gICAgICAgIHRpbWU6IGV4dHJhY3RUaW1lKGJ1ZmZlciwgaSAqIDEyKSxcclxuICAgICAgICBvZmZzZXQ6IGJ1ZmZlci5yZWFkVUludDMyTEUoaSAqIDEyICsgOCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gQ2xhc3NlcyBjYW4ndCByZWZlcmVuY2UgdGhlaXIgb3duIHR5cGUgKGluIGBuZXh0Q2h1bmtgKSBidXQgaW50ZXJmYWNlcyBjYW4sIHNvIHRoaXMgaXMgc3BsaXQgb3V0LlxyXG5leHBvcnQgaW50ZXJmYWNlIENodW5rSW5mb0ludGVyZmFjZSB7XHJcbiAgdmVyOiBudW1iZXI7XHJcbiAgY2h1bmtQb3NpdGlvbjogbnVtYmVyO1xyXG4gIHN0YXJ0VGltZTogVGltZTtcclxuICBlbmRUaW1lOiBUaW1lO1xyXG4gIGNvdW50OiBudW1iZXI7XHJcbiAgY29ubmVjdGlvbnM6IHtcclxuICAgIGNvbm46IG51bWJlcjtcclxuICAgIGNvdW50OiBudW1iZXI7XHJcbiAgfVtdO1xyXG4gIG5leHRDaHVuaz86IENodW5rSW5mb0ludGVyZmFjZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENodW5rSW5mbyBleHRlbmRzIFJvc2JhZ1JlY29yZCBpbXBsZW1lbnRzIENodW5rSW5mb0ludGVyZmFjZSB7XHJcbiAgc3RhdGljIG9wY29kZSA9IDY7XHJcbiAgdmVyOiBudW1iZXI7XHJcbiAgY2h1bmtQb3NpdGlvbjogbnVtYmVyO1xyXG4gIHN0YXJ0VGltZTogVGltZTtcclxuICBlbmRUaW1lOiBUaW1lO1xyXG4gIGNvdW50OiBudW1iZXI7XHJcbiAgY29ubmVjdGlvbnM6IHtcclxuICAgIGNvbm46IG51bWJlcjtcclxuICAgIGNvdW50OiBudW1iZXI7XHJcbiAgfVtdO1xyXG4gIG5leHRDaHVuaz86IENodW5rSW5mb0ludGVyZmFjZTtcclxuXHJcbiAgY29uc3RydWN0b3Iob2Zmc2V0OiBudW1iZXIsIGRhdGFPZmZzZXQ6IG51bWJlciwgZGF0YUxlbmd0aDogbnVtYmVyLCBmaWVsZHM6IFJlY29yZDxzdHJpbmcsIEJ1ZmZlcj4sIGJ1ZmZlcjogQnVmZmVyKSB7XHJcbiAgICBzdXBlcihvZmZzZXQsIGRhdGFPZmZzZXQsIGRhdGFMZW5ndGgpO1xyXG4gICAgdGhpcy52ZXIgPSBmaWVsZHMudmVyLnJlYWRVSW50MzJMRSgwKTtcclxuICAgIHRoaXMuY2h1bmtQb3NpdGlvbiA9IHJlYWRVSW50NjRMRShmaWVsZHMuY2h1bmtfcG9zKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gZXh0cmFjdFRpbWUoZmllbGRzLnN0YXJ0X3RpbWUsIDApO1xyXG4gICAgdGhpcy5lbmRUaW1lID0gZXh0cmFjdFRpbWUoZmllbGRzLmVuZF90aW1lLCAwKTtcclxuICAgIHRoaXMuY291bnQgPSBmaWVsZHMuY291bnQucmVhZFVJbnQzMkxFKDApO1xyXG5cclxuICAgIHRoaXMuY29ubmVjdGlvbnMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb3VudDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuY29ubmVjdGlvbnMucHVzaCh7XHJcbiAgICAgICAgY29ubjogYnVmZmVyLnJlYWRVSW50MzJMRShpICogOCksXHJcbiAgICAgICAgY291bnQ6IGJ1ZmZlci5yZWFkVUludDMyTEUoaSAqIDggKyA0KSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXHJcblxyXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXHJcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHJcbi8qKlxyXG4gKiBBIGZ1bmN0aW9uIHRoYXQgbXVzdCBiZSBjYWxsZWQgd2l0aCBlaXRoZXIgYW4gZXJyb3Igb3IgYSB2YWx1ZSwgYnV0IG5vdCBib3RoXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBDYWxsYmFjazxUPiA9IChlcnJvcjogRXJyb3IgfCBudWxsLCB2YWx1ZT86IFQpID0+IHZvaWQ7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIHRpbWVzdGFtcCBiYXNlZCBvbiB0aGUgVU5JWCBlcG9jaCAoMTk3MCBKYW4gMSkuXHJcbiAqIFNlZSBhbHNvOiBodHRwOi8vd2lraS5yb3Mub3JnL3Jvc2NwcC9PdmVydmlldy9UaW1lXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRpbWUge1xyXG4gIC8qKlxyXG4gICAqIFdob2xlIHNlY29uZHMuXHJcbiAgICovXHJcbiAgc2VjOiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogQWRkaXRpb25hbCBuYW5vc2Vjb25kcyBwYXN0IHRoZSBgc2VjYCB2YWx1ZS5cclxuICAgKi9cclxuICBuc2VjOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmlsZWxpa2Uge1xyXG4gIHJlYWQob2Zmc2V0OiBudW1iZXIsIGxlbmd0aDogbnVtYmVyLCBjYWxsYmFjazogQ2FsbGJhY2s8QnVmZmVyPik6IHZvaWQ7XHJcbiAgc2l6ZSgpOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUm9zTXNnRmllbGQge1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgaXNDb21wbGV4PzogYm9vbGVhbjtcclxuXHJcbiAgLy8gRm9yIGFycmF5c1xyXG4gIGlzQXJyYXk/OiBib29sZWFuO1xyXG4gIGFycmF5TGVuZ3RoPzogbnVtYmVyO1xyXG5cclxuICAvLyBGb3IgY29uc3RhbnRzXHJcbiAgaXNDb25zdGFudD86IGJvb2xlYW47XHJcbiAgdmFsdWU/OiB1bmtub3duO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvc01zZ0RlZmluaXRpb24ge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkZWZpbml0aW9uczogUm9zTXNnRmllbGRbXTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xyXG5cclxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxyXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XHJcbmltcG9ydCB7XHJcbiAgTWVzc2FnZVJlYWRlcixcclxuICBNZXNzYWdlV3JpdGVyLFxyXG4gIHBhcnNlTWVzc2FnZURlZmluaXRpb24sXHJcbiAgcm9zUHJpbWl0aXZlVHlwZXMsXHJcbiAgVGltZVV0aWwsXHJcbiAgZXh0cmFjdEZpZWxkcyxcclxuICBleHRyYWN0VGltZSxcclxufSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHR5cGUgeyBDYWxsYmFjayB9IGZyb20gXCIuLi90eXBlc1wiO1xyXG5pbXBvcnQgQmFnLCB7IE9wZW5CYWcgfSBmcm9tIFwiLi4vYmFnXCI7XHJcbmltcG9ydCBCYWdSZWFkZXIgZnJvbSBcIi4uL0JhZ1JlYWRlclwiO1xyXG5cclxuLy8gYnJvd3NlciByZWFkZXIgZm9yIEJsb2J8RmlsZSBvYmplY3RzXHJcbmV4cG9ydCBjbGFzcyBSZWFkZXIge1xyXG4gIF9ibG9iOiBCbG9iO1xyXG4gIF9zaXplOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGJsb2I6IEJsb2IpIHtcclxuICAgIHRoaXMuX2Jsb2IgPSBibG9iO1xyXG4gICAgdGhpcy5fc2l6ZSA9IGJsb2Iuc2l6ZTtcclxuICB9XHJcblxyXG4gIC8vIHJlYWQgbGVuZ3RoIChieXRlcykgc3RhcnRpbmcgZnJvbSBvZmZzZXQgKGJ5dGVzKVxyXG4gIC8vIGNhbGxiYWNrKGVyciwgYnVmZmVyKVxyXG4gIHJlYWQob2Zmc2V0OiBudW1iZXIsIGxlbmd0aDogbnVtYmVyLCBjYjogQ2FsbGJhY2s8QnVmZmVyPikge1xyXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gb25sb2FkKCkge1xyXG4gICAgICByZWFkZXIub25sb2FkID0gbnVsbDtcclxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBudWxsO1xyXG4gICAgICBzZXRUaW1lb3V0KGNiLCAwLCBudWxsLCByZWFkZXIucmVzdWx0ID8gQnVmZmVyLmZyb20ocmVhZGVyLnJlc3VsdCBhcyBBcnJheUJ1ZmZlcikgOiB1bmRlZmluZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uIG9uZXJyb3IoKSB7XHJcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBudWxsO1xyXG4gICAgICByZWFkZXIub25lcnJvciA9IG51bGw7XHJcbiAgICAgIHNldFRpbWVvdXQoY2IsIDAsIG5ldyBFcnJvcihyZWFkZXIuZXJyb3IgPyByZWFkZXIuZXJyb3IubWVzc2FnZSA6IFwiVW5rbm93biByZWFkZXIgZXJyb3IuXCIpKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKHRoaXMuX2Jsb2Iuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBsZW5ndGgpKTtcclxuICB9XHJcblxyXG4gIC8vIHJldHVybiB0aGUgc2l6ZSBvZiB0aGUgZmlsZVxyXG4gIHNpemUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG9wZW4gPSBhc3luYyAoZmlsZTogRmlsZSB8IHN0cmluZyk6IFByb21pc2U8T3BlbkJhZz4gPT4ge1xyXG4gIGlmICghKGZpbGUgaW5zdGFuY2VvZiBCbG9iKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICBcIkV4cGVjdGVkIGZpbGUgdG8gYmUgYSBGaWxlIG9yIEJsb2IuIE1ha2Ugc3VyZSB5b3UgYXJlIGNvcnJlY3RseSBpbXBvcnRpbmcgdGhlIG5vZGUgb3Igd2ViIHZlcnNpb24gb2YgQmFnLlwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYmFnID0gbmV3IEJhZyhuZXcgQmFnUmVhZGVyKG5ldyBSZWFkZXIoZmlsZSkpKTtcclxuICBhd2FpdCBiYWcub3BlbigpO1xyXG4gIHJldHVybiBiYWcgYXMgT3BlbkJhZztcclxufTtcclxuXHJcbkJhZy5vcGVuID0gb3BlbjtcclxuXHJcbi8vIFRoZXNlIGV4cG9ydHMgbXVzdCBtYXRjaCAuLi9pbmRleC50c1xyXG5leHBvcnQgKiBmcm9tIFwiLi4vdHlwZXNcIjtcclxuZXhwb3J0IHtcclxuICBUaW1lVXRpbCxcclxuICBCYWcsXHJcbiAgQmFnUmVhZGVyLFxyXG4gIE1lc3NhZ2VSZWFkZXIsXHJcbiAgTWVzc2FnZVdyaXRlcixcclxuICBvcGVuLFxyXG4gIHBhcnNlTWVzc2FnZURlZmluaXRpb24sXHJcbiAgcm9zUHJpbWl0aXZlVHlwZXMsXHJcbiAgZXh0cmFjdEZpZWxkcyxcclxuICBleHRyYWN0VGltZSxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQmFnO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=