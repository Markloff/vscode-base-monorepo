'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.Cookie = void 0;
(function (Cookie) {
    function filterXss(str) {
        if (!str)
            return str;
        let _str = str;
        for (; _str != decodeURIComponent(str);) {
            _str = decodeURIComponent(str);
        }
        const r = ['<', '>', "'", '"', '%3c', '%3e', '%27', '%22', '%253c', '%253e', '%2527', '%2522'];
        const n = [
            '&#x3c;',
            '&#x3e;',
            '&#x27;',
            '&#x22;',
            '%26%23x3c%3B',
            '%26%23x3e%3B',
            '%26%23x27%3B',
            '%26%23x22%3B',
            '%2526%2523x3c%253B',
            '%2526%2523x3e%253B',
            '%2526%2523x27%253B',
            '%2526%2523x22%253B'
        ];
        for (let i = 0; i < r.length; i++) {
            _str = _str.replace(new RegExp(r[i], 'gi'), n[i]);
        }
        return _str;
    }
    function get(name) {
        const match = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)'); // See https://stackoverflow.com/a/25490531
        return match ? filterXss(match.pop()) : undefined;
    }
    Cookie.get = get;
    /**
     * 设置一个cookie,还有一点需要注意的，在qq.com下是无法获取qzone.qq.com的cookie，反正qzone.qq.com下能获取到qq.com的所有cookie.
     * 简单得说，子域可以获取根域下的cookie, 但是根域无法获取子域下的cookie.
     *
     * @param {String} name cookie名称
     * @param {String} value cookie值
     * @param {String} domain 所在域名
     * @param {String} path 所在路径
     * @param {Number} expire 存活时间，单位:小时
     * @return {Boolean} 是否成功
     * @example
     *  cookie.set('value1',$('t1').value,"qzone.qq.com","/v5",24); // 设置cookie
     */
    function set(name, value, domain, path, expire) {
        const expireTime = new Date();
        if (expire) {
            expireTime.setTime(expireTime.getTime() + 3600000 * expire);
        }
        document.cookie = `${name}=${value}; ${expire ? `expires=${expireTime.toUTCString()};` : ''}domain=${domain || window.location.host};` + `path=${path || '/'};`;
    }
    Cookie.set = set;
    function deleteCookie(name, domain, path) {
        document.cookie = `${name}=; expires=Mon, 26 Jul 1997 05:00:00 GMT;path=${path || '/'};domain=${domain || window.location.host};`;
    }
    Cookie.deleteCookie = deleteCookie;
    function setDirect(str) {
        const value = filterXss(str);
        if (value) {
            document.cookie = value;
        }
    }
    Cookie.setDirect = setDirect;
    function getCRSFToken() {
        const skey = get('qqmusic_key');
        let hash = 5381;
        if (skey) {
            for (let i = 0, len = skey.length; i < len; ++i) {
                hash += (hash << 5) + skey.charCodeAt(i);
            }
        }
        return hash & 0x7fffffff;
    }
    Cookie.getCRSFToken = getCRSFToken;
})(exports.Cookie || (exports.Cookie = {}));
exports.User = void 0;
(function (User) {
    let uin = 0;
    function getUin() {
        if (uin) {
            return uin;
        }
        let _uin = exports.Cookie.get('uin') || 0;
        if (typeof _uin === 'string') {
            if (_uin.indexOf('o') === 0) {
                _uin = _uin.substring(1, _uin.length);
            }
        }
        else {
            if (_uin < 10000) {
                _uin = 0;
            }
        }
        uin = _uin;
        return _uin;
    }
    User.getUin = getUin;
})(exports.User || (exports.User = {}));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}

function illegalState(name) {
    if (name) {
        return new Error(`Illegal state: ${name}`);
    }
    else {
        return new Error('Illegal state');
    }
}
class ErrorHandler {
    constructor() {
        this.listeners = [];
        this.unexpectedErrorHandler = function (e) {
            setTimeout(() => {
                if (e.stack) {
                    throw new Error(e.message + '\n\n' + e.stack);
                }
                throw e;
            }, 0);
        };
    }
    addListener(listener) {
        this.listeners.push(listener);
        return () => {
            this._removeListener(listener);
        };
    }
    emit(e) {
        this.listeners.forEach((listener) => {
            listener(e);
        });
    }
    _removeListener(listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    }
    setUnexpectedErrorHandler(newUnexpectedErrorHandler) {
        this.unexpectedErrorHandler = newUnexpectedErrorHandler;
    }
    getUnexpectedErrorHandler() {
        return this.unexpectedErrorHandler;
    }
    onUnexpectedError(e) {
        this.unexpectedErrorHandler(e);
        this.emit(e);
    }
    onUnexpectedExternalError(e) {
        this.unexpectedErrorHandler(e);
    }
}
const errorHandler = new ErrorHandler();
function setUnexpectedErrorHandler(newUnexpectedErrorHandler) {
    errorHandler.setUnexpectedErrorHandler(newUnexpectedErrorHandler);
}
function onUnexpectedError(e) {
    if (!isPromiseCanceledError(e)) {
        errorHandler.onUnexpectedError(e);
    }
    return undefined;
}
const canceledName = 'Canceled';
/**
 * Returns an error that signals cancellation.
 */
function canceled() {
    const error = new Error(canceledName);
    error.name = error.message;
    return error;
}
/**
 * Checks if the given error is a promise in canceled state
 */
function isPromiseCanceledError(error) {
    return error instanceof Error && error.name === canceledName && error.message === canceledName;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Returns the last element of an array.
 * @param array The array.
 * @param n Which element from the end (default is zero).
 */
function tail(array, n = 0) {
    return array[array.length - (1 + n)];
}
function tail2(arr) {
    if (arr.length === 0) {
        throw new Error('Invalid tail call');
    }
    return [arr.slice(0, arr.length - 1), arr[arr.length - 1]];
}
function equals(one, other, itemEquals = (a, b) => a === b) {
    if (one === other) {
        return true;
    }
    if (!one || !other) {
        return false;
    }
    if (one.length !== other.length) {
        return false;
    }
    for (let i = 0, len = one.length; i < len; i++) {
        if (!itemEquals(one[i], other[i])) {
            return false;
        }
    }
    return true;
}
function binarySearch(array, key, comparator) {
    let low = 0, high = array.length - 1;
    while (low <= high) {
        const mid = ((low + high) / 2) | 0;
        const comp = comparator(array[mid], key);
        if (comp < 0) {
            low = mid + 1;
        }
        else if (comp > 0) {
            high = mid - 1;
        }
        else {
            return mid;
        }
    }
    return -(low + 1);
}
/**
 * Takes a sorted array and a function p. The array is sorted in such a way that all elements where p(x) is false
 * are located before all elements where p(x) is true.
 * @returns the least x for which p(x) is true or array.length if no element fullfills the given function.
 */
function findFirstInSorted(array, p) {
    let low = 0, high = array.length;
    if (high === 0) {
        return 0; // no children
    }
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (p(array[mid])) {
            high = mid;
        }
        else {
            low = mid + 1;
        }
    }
    return low;
}
function quickSelect(nth, data, compare) {
    nth = nth | 0;
    if (nth >= data.length) {
        throw new TypeError('invalid index');
    }
    let pivotValue = data[Math.floor(data.length * Math.random())];
    let lower = [];
    let higher = [];
    let pivots = [];
    for (let value of data) {
        const val = compare(value, pivotValue);
        if (val < 0) {
            lower.push(value);
        }
        else if (val > 0) {
            higher.push(value);
        }
        else {
            pivots.push(value);
        }
    }
    if (nth < lower.length) {
        return quickSelect(nth, lower, compare);
    }
    else if (nth < lower.length + pivots.length) {
        return pivots[0];
    }
    else {
        return quickSelect(nth - (lower.length + pivots.length), higher, compare);
    }
}
function groupBy(data, compare) {
    const result = [];
    let currentGroup = undefined;
    for (const element of data.slice(0).sort(compare)) {
        if (!currentGroup || compare(currentGroup[0], element) !== 0) {
            currentGroup = [element];
            result.push(currentGroup);
        }
        else {
            currentGroup.push(element);
        }
    }
    return result;
}
/**
 * Diffs two *sorted* arrays and computes the splices which apply the diff.
 */
function sortedDiff(before, after, compare) {
    const result = [];
    function pushSplice(start, deleteCount, toInsert) {
        if (deleteCount === 0 && toInsert.length === 0) {
            return;
        }
        const latest = result[result.length - 1];
        if (latest && latest.start + latest.deleteCount === start) {
            latest.deleteCount += deleteCount;
            latest.toInsert.push(...toInsert);
        }
        else {
            result.push({ start, deleteCount, toInsert });
        }
    }
    let beforeIdx = 0;
    let afterIdx = 0;
    while (true) {
        if (beforeIdx === before.length) {
            pushSplice(beforeIdx, 0, after.slice(afterIdx));
            break;
        }
        if (afterIdx === after.length) {
            pushSplice(beforeIdx, before.length - beforeIdx, []);
            break;
        }
        const beforeElement = before[beforeIdx];
        const afterElement = after[afterIdx];
        const n = compare(beforeElement, afterElement);
        if (n === 0) {
            // equal
            beforeIdx += 1;
            afterIdx += 1;
        }
        else if (n < 0) {
            // beforeElement is smaller -> before element removed
            pushSplice(beforeIdx, 1, []);
            beforeIdx += 1;
        }
        else if (n > 0) {
            // beforeElement is greater -> after element added
            pushSplice(beforeIdx, 0, [afterElement]);
            afterIdx += 1;
        }
    }
    return result;
}
/**
 * Takes two *sorted* arrays and computes their delta (removed, added elements).
 * Finishes in `Math.min(before.length, after.length)` steps.
 */
function delta(before, after, compare) {
    const splices = sortedDiff(before, after, compare);
    const removed = [];
    const added = [];
    for (const splice of splices) {
        removed.push(...before.slice(splice.start, splice.start + splice.deleteCount));
        added.push(...splice.toInsert);
    }
    return { removed, added };
}
/**
 * Returns the top N elements from the array.
 *
 * Faster than sorting the entire array when the array is a lot larger than N.
 *
 * @param array The unsorted array.
 * @param compare A sort function for the elements.
 * @param n The number of elements to return.
 * @return The first n elemnts from array when sorted with compare.
 */
function top(array, compare, n) {
    if (n === 0) {
        return [];
    }
    const result = array.slice(0, n).sort(compare);
    topStep(array, compare, result, n, array.length);
    return result;
}
/**
 * Asynchronous variant of `top()` allowing for splitting up work in batches between which the event loop can run.
 *
 * Returns the top N elements from the array.
 *
 * Faster than sorting the entire array when the array is a lot larger than N.
 *
 * @param array The unsorted array.
 * @param compare A sort function for the elements.
 * @param n The number of elements to return.
 * @param batch The number of elements to examine before yielding to the event loop.
 * @return The first n elemnts from array when sorted with compare.
 */
function topAsync(array, compare, n, batch, token) {
    if (n === 0) {
        return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const o = array.length;
            const result = array.slice(0, n).sort(compare);
            for (let i = n, m = Math.min(n + batch, o); i < o; i = m, m = Math.min(m + batch, o)) {
                if (i > n) {
                    yield new Promise(resolve => setTimeout(resolve)); // nextTick() would starve I/O.
                }
                if (token && token.isCancellationRequested) {
                    throw canceled();
                }
                topStep(array, compare, result, i, m);
            }
            return result;
        }))()
            .then(resolve, reject);
    });
}
function topStep(array, compare, result, i, m) {
    for (const n = result.length; i < m; i++) {
        const element = array[i];
        if (compare(element, result[n - 1]) < 0) {
            result.pop();
            const j = findFirstInSorted(result, e => compare(element, e) < 0);
            result.splice(j, 0, element);
        }
    }
}
/**
 * @returns New array with all falsy values removed. The original array IS NOT modified.
 */
function coalesce(array) {
    return array.filter(e => !!e);
}
/**
 * Remove all falsey values from `array`. The original array IS modified.
 */
function coalesceInPlace(array) {
    let to = 0;
    for (let i = 0; i < array.length; i++) {
        if (!!array[i]) {
            array[to] = array[i];
            to += 1;
        }
    }
    array.length = to;
}
/**
 * Moves the element in the array for the provided positions.
 */
function move(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
}
/**
 * @returns false if the provided object is an array and not empty.
 */
function isFalsyOrEmpty(obj) {
    return !Array.isArray(obj) || obj.length === 0;
}
function isNonEmptyArray(obj) {
    return Array.isArray(obj) && obj.length > 0;
}
/**
 * Removes duplicates from the given array. The optional keyFn allows to specify
 * how elements are checked for equalness by returning a unique string for each.
 */
function distinct(array, keyFn) {
    if (!keyFn) {
        return array.filter((element, position) => {
            return array.indexOf(element) === position;
        });
    }
    const seen = Object.create(null);
    return array.filter((elem) => {
        const key = keyFn(elem);
        if (seen[key]) {
            return false;
        }
        seen[key] = true;
        return true;
    });
}
function distinctES6(array) {
    const seen = new Set();
    return array.filter(element => {
        if (seen.has(element)) {
            return false;
        }
        seen.add(element);
        return true;
    });
}
function uniqueFilter(keyFn) {
    const seen = Object.create(null);
    return element => {
        const key = keyFn(element);
        if (seen[key]) {
            return false;
        }
        seen[key] = true;
        return true;
    };
}
function lastIndex(array, fn) {
    for (let i = array.length - 1; i >= 0; i--) {
        const element = array[i];
        if (fn(element)) {
            return i;
        }
    }
    return -1;
}
function firstOrDefault(array, notFoundValue) {
    return array.length > 0 ? array[0] : notFoundValue;
}
function commonPrefixLength$1(one, other, equals = (a, b) => a === b) {
    let result = 0;
    for (let i = 0, len = Math.min(one.length, other.length); i < len && equals(one[i], other[i]); i++) {
        result++;
    }
    return result;
}
function flatten(arr) {
    return [].concat(...arr);
}
function range(arg, to) {
    let from = typeof to === 'number' ? arg : 0;
    if (typeof to === 'number') {
        from = arg;
    }
    else {
        from = 0;
        to = arg;
    }
    const result = [];
    if (from <= to) {
        for (let i = from; i < to; i++) {
            result.push(i);
        }
    }
    else {
        for (let i = from; i > to; i--) {
            result.push(i);
        }
    }
    return result;
}
function index(array, indexer, mapper) {
    return array.reduce((r, t) => {
        r[indexer(t)] = mapper ? mapper(t) : t;
        return r;
    }, Object.create(null));
}
/**
 * Inserts an element into an array. Returns a function which, when
 * called, will remove that element from the array.
 */
function insert(array, element) {
    array.push(element);
    return () => remove(array, element);
}
/**
 * Removes an element from an array if it can be found.
 */
function remove(array, element) {
    const index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
        return element;
    }
    return undefined;
}
/**
 * Insert `insertArr` inside `target` at `insertIndex`.
 * Please don't touch unless you understand https://jsperf.com/inserting-an-array-within-an-array
 */
function arrayInsert(target, insertIndex, insertArr) {
    const before = target.slice(0, insertIndex);
    const after = target.slice(insertIndex);
    return before.concat(insertArr, after);
}
/**
 * Uses Fisher-Yates shuffle to shuffle the given array
 */
function shuffle(array, _seed) {
    let rand;
    if (typeof _seed === 'number') {
        let seed = _seed;
        // Seeded random number generator in JS. Modified from:
        // https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
        rand = () => {
            const x = Math.sin(seed++) * 179426549; // throw away most significant digits and reduce any potential bias
            return x - Math.floor(x);
        };
    }
    else {
        rand = Math.random;
    }
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(rand() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
/**
 * Pushes an element to the start of the array, if found.
 */
function pushToStart(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
        arr.unshift(value);
    }
}
/**
 * Pushes an element to the end of the array, if found.
 */
function pushToEnd(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
        arr.push(value);
    }
}
function mapArrayOrNot(items, fn) {
    return Array.isArray(items) ?
        items.map(fn) :
        fn(items);
}
function asArray(x) {
    return Array.isArray(x) ? x : [x];
}
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
/**
 * Returns the first mapped value of the array which is not undefined.
 */
function mapFind(array, mapFn) {
    for (const value of array) {
        const mapped = mapFn(value);
        if (mapped !== undefined) {
            return mapped;
        }
    }
    return undefined;
}
/**
 * Insert the new items in the array.
 * @param array The original array.
 * @param start The zero-based location in the array from which to start inserting elements.
 * @param newItems The items to be inserted
 */
function insertInto(array, start, newItems) {
    const startIdx = getActualStartIndex(array, start);
    const originalLength = array.length;
    const newItemsLength = newItems.length;
    array.length = originalLength + newItemsLength;
    // Move the items after the start index, start from the end so that we don't overwrite any value.
    for (let i = originalLength - 1; i >= startIdx; i--) {
        array[i + newItemsLength] = array[i];
    }
    for (let i = 0; i < newItemsLength; i++) {
        array[i + startIdx] = newItems[i];
    }
}
/**
 * Removes elements from an array and inserts new elements in their place, returning the deleted elements. Alternative to the native Array.splice method, it
 * can only support limited number of items due to the maximum call stack size limit.
 * @param array The original array.
 * @param start The zero-based location in the array from which to start removing elements.
 * @param deleteCount The number of elements to remove.
 * @returns An array containing the elements that were deleted.
 */
function splice(array, start, deleteCount, newItems) {
    const index = getActualStartIndex(array, start);
    const result = array.splice(index, deleteCount);
    insertInto(array, index, newItems);
    return result;
}
/**
 * Determine the actual start index (same logic as the native splice() or slice())
 * If greater than the length of the array, start will be set to the length of the array. In this case, no element will be deleted but the method will behave as an adding function, adding as many element as item[n*] provided.
 * If negative, it will begin that many elements from the end of the array. (In this case, the origin -1, meaning -n is the index of the nth last element, and is therefore equivalent to the index of array.length - n.) If array.length + start is less than 0, it will begin from index 0.
 * @param array The target array.
 * @param start The operation index.
 */
function getActualStartIndex(array, start) {
    return start < 0 ? Math.max(start + array.length, 0) : Math.min(start, array.length);
}
/**
 * Like Math.min with a delegate, and returns the winning index
 */
function minIndex(array, fn) {
    let minValue = Number.MAX_SAFE_INTEGER;
    let minIdx = 0;
    array.forEach((value, i) => {
        const thisValue = fn(value);
        if (thisValue < minValue) {
            minValue = thisValue;
            minIdx = i;
        }
    });
    return minIdx;
}
/**
 * Like Math.max with a delegate, and returns the winning index
 */
function maxIndex(array, fn) {
    let minValue = Number.MIN_SAFE_INTEGER;
    let maxIdx = 0;
    array.forEach((value, i) => {
        const thisValue = fn(value);
        if (thisValue > minValue) {
            minValue = thisValue;
            maxIdx = i;
        }
    });
    return maxIdx;
}
class ArrayQueue {
    /**
     * Constructs a queue that is backed by the given array. Runtime is O(1).
    */
    constructor(items) {
        this.items = items;
        this.firstIdx = 0;
        this.lastIdx = this.items.length - 1;
    }
    get length() {
        return this.lastIdx - this.firstIdx + 1;
    }
    /**
     * Consumes elements from the beginning of the queue as long as the predicate returns true.
     * If no elements were consumed, `null` is returned. Has a runtime of O(result.length).
    */
    takeWhile(predicate) {
        // P(k) := k <= this.lastIdx && predicate(this.items[k])
        // Find s := min { k | k >= this.firstIdx && !P(k) } and return this.data[this.firstIdx...s)
        let startIdx = this.firstIdx;
        while (startIdx < this.items.length && predicate(this.items[startIdx])) {
            startIdx++;
        }
        const result = startIdx === this.firstIdx ? null : this.items.slice(this.firstIdx, startIdx);
        this.firstIdx = startIdx;
        return result;
    }
    /**
     * Consumes elements from the end of the queue as long as the predicate returns true.
     * If no elements were consumed, `null` is returned.
     * The result has the same order as the underlying array!
    */
    takeFromEndWhile(predicate) {
        // P(k) := this.firstIdx >= k && predicate(this.items[k])
        // Find s := max { k | k <= this.lastIdx && !P(k) } and return this.data(s...this.lastIdx]
        let endIdx = this.lastIdx;
        while (endIdx >= 0 && predicate(this.items[endIdx])) {
            endIdx--;
        }
        const result = endIdx === this.lastIdx ? null : this.items.slice(endIdx + 1, this.lastIdx + 1);
        this.lastIdx = endIdx;
        return result;
    }
}

function once(fn) {
    const _this = this;
    let didCall = false;
    let result;
    return function () {
        if (didCall) {
            return result;
        }
        didCall = true;
        result = fn.apply(_this, arguments);
        return result;
    };
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
exports.Iterable = void 0;
(function (Iterable) {
    function is(thing) {
        return thing && typeof thing === 'object' && typeof thing[Symbol.iterator] === 'function';
    }
    Iterable.is = is;
    const _empty = Object.freeze([]);
    function empty() {
        return _empty;
    }
    Iterable.empty = empty;
    function* single(element) {
        yield element;
    }
    Iterable.single = single;
    function from(iterable) {
        return iterable || _empty;
    }
    Iterable.from = from;
    function isEmpty(iterable) {
        return !iterable || iterable[Symbol.iterator]().next().done === true;
    }
    Iterable.isEmpty = isEmpty;
    function first(iterable) {
        return iterable[Symbol.iterator]().next().value;
    }
    Iterable.first = first;
    function some(iterable, predicate) {
        for (const element of iterable) {
            if (predicate(element)) {
                return true;
            }
        }
        return false;
    }
    Iterable.some = some;
    function find(iterable, predicate) {
        for (const element of iterable) {
            if (predicate(element)) {
                return element;
            }
        }
        return undefined;
    }
    Iterable.find = find;
    function* filter(iterable, predicate) {
        for (const element of iterable) {
            if (predicate(element)) {
                yield element;
            }
        }
    }
    Iterable.filter = filter;
    function* map(iterable, fn) {
        let index = 0;
        for (const element of iterable) {
            yield fn(element, index++);
        }
    }
    Iterable.map = map;
    function* concat(...iterables) {
        for (const iterable of iterables) {
            for (const element of iterable) {
                yield element;
            }
        }
    }
    Iterable.concat = concat;
    function* concatNested(iterables) {
        for (const iterable of iterables) {
            for (const element of iterable) {
                yield element;
            }
        }
    }
    Iterable.concatNested = concatNested;
    function reduce(iterable, reducer, initialValue) {
        let value = initialValue;
        for (const element of iterable) {
            value = reducer(value, element);
        }
        return value;
    }
    Iterable.reduce = reduce;
    /**
     * Returns an iterable slice of the array, with the same semantics as `array.slice()`.
     */
    function* slice(arr, from, to = arr.length) {
        if (from < 0) {
            from += arr.length;
        }
        if (to < 0) {
            to += arr.length;
        }
        else if (to > arr.length) {
            to = arr.length;
        }
        for (; from < to; from++) {
            yield arr[from];
        }
    }
    Iterable.slice = slice;
    /**
     * Consumes `atMost` elements from iterable and returns the consumed elements,
     * and an iterable for the rest of the elements.
     */
    function consume(iterable, atMost = Number.POSITIVE_INFINITY) {
        const consumed = [];
        if (atMost === 0) {
            return [consumed, iterable];
        }
        const iterator = iterable[Symbol.iterator]();
        for (let i = 0; i < atMost; i++) {
            const next = iterator.next();
            if (next.done) {
                return [consumed, Iterable.empty()];
            }
            consumed.push(next.value);
        }
        return [consumed, { [Symbol.iterator]() { return iterator; } }];
    }
    Iterable.consume = consume;
    /**
     * Returns whether the iterables are the same length and all items are
     * equal using the comparator function.
     */
    function equals(a, b, comparator = (at, bt) => at === bt) {
        const ai = a[Symbol.iterator]();
        const bi = b[Symbol.iterator]();
        while (true) {
            const an = ai.next();
            const bn = bi.next();
            if (an.done !== bn.done) {
                return false;
            }
            else if (an.done) {
                return true;
            }
            else if (!comparator(an.value, bn.value)) {
                return false;
            }
        }
    }
    Iterable.equals = equals;
})(exports.Iterable || (exports.Iterable = {}));

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
let disposableTracker = null;
function setDisposableTracker(tracker) {
    disposableTracker = tracker;
}
function trackDisposable(x) {
    disposableTracker === null || disposableTracker === void 0 ? void 0 : disposableTracker.trackDisposable(x);
    return x;
}
function markAsDisposed(disposable) {
    disposableTracker === null || disposableTracker === void 0 ? void 0 : disposableTracker.markAsDisposed(disposable);
}
function setParentOfDisposable(child, parent) {
    disposableTracker === null || disposableTracker === void 0 ? void 0 : disposableTracker.setParent(child, parent);
}
function setParentOfDisposables(children, parent) {
    if (!disposableTracker) {
        return;
    }
    for (const child of children) {
        disposableTracker.setParent(child, parent);
    }
}
/**
 * Indicates that the given object is a singleton which does not need to be disposed.
 */
function markAsSingleton(singleton) {
    disposableTracker === null || disposableTracker === void 0 ? void 0 : disposableTracker.markAsSingleton(singleton);
    return singleton;
}
class MultiDisposeError extends Error {
    constructor(errors) {
        super(`Encountered errors while disposing of store. Errors: [${errors.join(', ')}]`);
        this.errors = errors;
    }
}
function isDisposable(thing) {
    return typeof thing.dispose === 'function' && thing.dispose.length === 0;
}
function dispose(arg) {
    if (exports.Iterable.is(arg)) {
        let errors = [];
        for (const d of arg) {
            if (d) {
                try {
                    d.dispose();
                }
                catch (e) {
                    errors.push(e);
                }
            }
        }
        if (errors.length === 1) {
            throw errors[0];
        }
        else if (errors.length > 1) {
            throw new MultiDisposeError(errors);
        }
        return Array.isArray(arg) ? [] : arg;
    }
    else if (arg) {
        arg.dispose();
        return arg;
    }
}
function combinedDisposable(...disposables) {
    const parent = toDisposable(() => dispose(disposables));
    setParentOfDisposables(disposables, parent);
    return parent;
}
function toDisposable(fn) {
    const self = trackDisposable({
        dispose: once(() => {
            markAsDisposed(self);
            fn();
        })
    });
    return self;
}
class DisposableStore {
    constructor() {
        this._toDispose = new Set();
        this._isDisposed = false;
        trackDisposable(this);
    }
    /**
     * Dispose of all registered disposables and mark this object as disposed.
     *
     * Any future disposables added to this object will be disposed of on `add`.
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        markAsDisposed(this);
        this._isDisposed = true;
        this.clear();
    }
    /**
     * Dispose of all registered disposables but do not mark this object as disposed.
     */
    clear() {
        try {
            dispose(this._toDispose.values());
        }
        finally {
            this._toDispose.clear();
        }
    }
    add(o) {
        if (!o) {
            return o;
        }
        if (o === this) {
            throw new Error('Cannot register a disposable on itself!');
        }
        setParentOfDisposable(o, this);
        if (this._isDisposed) {
            if (!DisposableStore.DISABLE_DISPOSED_WARNING) {
                console.warn(new Error('Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!').stack);
            }
        }
        else {
            this._toDispose.add(o);
        }
        return o;
    }
}
DisposableStore.DISABLE_DISPOSED_WARNING = false;
class Disposable {
    constructor() {
        this._store = new DisposableStore();
        trackDisposable(this);
        setParentOfDisposable(this._store, this);
    }
    dispose() {
        markAsDisposed(this);
        this._store.dispose();
    }
    _register(o) {
        if (o === this) {
            throw new Error('Cannot register a disposable on itself!');
        }
        return this._store.add(o);
    }
}
Disposable.None = Object.freeze({ dispose() { } });
/**
 * Manages the lifecycle of a disposable value that may be changed.
 *
 * This ensures that when the disposable value is changed, the previously held disposable is disposed of. You can
 * also register a `MutableDisposable` on a `Disposable` to ensure it is automatically cleaned up.
 */
class MutableDisposable {
    constructor() {
        this._isDisposed = false;
        trackDisposable(this);
    }
    get value() {
        return this._isDisposed ? undefined : this._value;
    }
    set value(value) {
        var _a;
        if (this._isDisposed || value === this._value) {
            return;
        }
        (_a = this._value) === null || _a === void 0 ? void 0 : _a.dispose();
        if (value) {
            setParentOfDisposable(value, this);
        }
        this._value = value;
    }
    clear() {
        this.value = undefined;
    }
    dispose() {
        var _a;
        this._isDisposed = true;
        markAsDisposed(this);
        (_a = this._value) === null || _a === void 0 ? void 0 : _a.dispose();
        this._value = undefined;
    }
    /**
     * Clears the value, but does not dispose it.
     * The old value is returned.
     */
    clearAndLeak() {
        const oldValue = this._value;
        this._value = undefined;
        if (oldValue) {
            setParentOfDisposable(oldValue, null);
        }
        return oldValue;
    }
}
class RefCountedDisposable {
    constructor(_disposable) {
        this._disposable = _disposable;
        this._counter = 1;
    }
    acquire() {
        this._counter++;
        return this;
    }
    release() {
        if (--this._counter === 0) {
            this._disposable.dispose();
        }
        return this;
    }
}
class ReferenceCollection {
    constructor() {
        this.references = new Map();
    }
    acquire(key, ...args) {
        let reference = this.references.get(key);
        if (!reference) {
            reference = { counter: 0, object: this.createReferencedObject(key, ...args) };
            this.references.set(key, reference);
        }
        const { object } = reference;
        const dispose = once(() => {
            if (--reference.counter === 0) {
                this.destroyReferencedObject(key, reference.object);
                this.references.delete(key);
            }
        });
        reference.counter++;
        return { object, dispose };
    }
}
/**
 * Unwraps a reference collection of promised values. Makes sure
 * references are disposed whenever promises get rejected.
 */
class AsyncReferenceCollection {
    constructor(referenceCollection) {
        this.referenceCollection = referenceCollection;
    }
    acquire(key, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.referenceCollection.acquire(key, ...args);
            try {
                const object = yield ref.object;
                return {
                    object,
                    dispose: () => ref.dispose()
                };
            }
            catch (error) {
                ref.dispose();
                throw error;
            }
        });
    }
}
class ImmortalReference {
    constructor(object) {
        this.object = object;
    }
    dispose() { }
}

class Node$1 {
    constructor(element) {
        this.element = element;
        this.next = Node$1.Undefined;
        this.prev = Node$1.Undefined;
    }
}
Node$1.Undefined = new Node$1(undefined);
class LinkedList {
    constructor() {
        this._first = Node$1.Undefined;
        this._last = Node$1.Undefined;
        this._size = 0;
    }
    get size() {
        return this._size;
    }
    isEmpty() {
        return this._first === Node$1.Undefined;
    }
    shift() {
        if (this._first === Node$1.Undefined) {
            return undefined;
        }
        else {
            const res = this._first.element;
            this._remove(this._first);
            return res;
        }
    }
    pop() {
        if (this._last === Node$1.Undefined) {
            return undefined;
        }
        else {
            const res = this._last.element;
            this._remove(this._last);
            return res;
        }
    }
    clear() {
        let node = this._first;
        while (node !== Node$1.Undefined) {
            const next = node.next;
            node.prev = Node$1.Undefined;
            node.next = Node$1.Undefined;
            node = next;
        }
        this._first = Node$1.Undefined;
        this._last = Node$1.Undefined;
        this._size = 0;
    }
    unshift(element) {
        return this._insert(element, false);
    }
    push(element) {
        return this._insert(element, true);
    }
    _insert(element, atTheEnd) {
        const newNode = new Node$1(element);
        if (this._first === Node$1.Undefined) {
            this._first = newNode;
            this._last = newNode;
        }
        else if (atTheEnd) {
            const oldLast = this._last;
            this._last = newNode;
            newNode.prev = oldLast;
            oldLast.next = newNode;
        }
        else {
            const oldFirst = this._first;
            this._first = newNode;
            newNode.next = oldFirst;
            oldFirst.prev = newNode;
        }
        this._size += 1;
        let didRemove = false;
        return () => {
            if (!didRemove) {
                didRemove = true;
                this._remove(newNode);
            }
        };
    }
    _remove(node) {
        if (node.prev !== Node$1.Undefined && node.next !== Node$1.Undefined) {
            // middle
            const anchor = node.prev;
            anchor.next = node.next;
            node.next.prev = anchor;
        }
        else if (node.prev === Node$1.Undefined && node.next === Node$1.Undefined) {
            // only node
            this._first = Node$1.Undefined;
            this._last = Node$1.Undefined;
        }
        else if (node.next === Node$1.Undefined) {
            // last
            this._last = this._last.prev;
            this._last.next = Node$1.Undefined;
        }
        else if (node.prev === Node$1.Undefined) {
            // first
            this._first = this._first.next;
            this._first.prev = Node$1.Undefined;
        }
        // done
        this._size -= 1;
    }
    *[Symbol.iterator]() {
        let node = this._first;
        while (node !== Node$1.Undefined) {
            yield node.element;
            node = node.next;
        }
    }
}

var _a$1;
let _isWindows = false;
let _isMacintosh = false;
let _isLinux = false;
let _isLinuxSnap = false;
let _isNative = false;
let _isWeb = false;
let _isIOS = false;
let _isAndroid = false;
let _isMusic = false;
let _userAgent = undefined;
const globals = (typeof self === 'object' ? self : typeof global === 'object' ? global : {});
let nodeProcess = undefined;
if (typeof globals.qqmusic !== 'undefined' && typeof globals.qqmusic.process !== 'undefined') {
    // Native environment (sandboxed)
    nodeProcess = globals.qqmusic.process;
}
else if (typeof process !== 'undefined') {
    // Native environment (non-sandboxed)
    nodeProcess = process;
}
const isElectronRenderer = typeof ((_a$1 = nodeProcess === null || nodeProcess === void 0 ? void 0 : nodeProcess.versions) === null || _a$1 === void 0 ? void 0 : _a$1.electron) === 'string' && nodeProcess.type === 'renderer';
const setImmediate = (function defineSetImmediate() {
    if (globals.setImmediate) {
        return globals.setImmediate.bind(globals);
    }
    if (typeof globals.postMessage === 'function' && !globals.importScripts) {
        let pending = [];
        globals.addEventListener('message', (e) => {
            if (e.data && e.data.vscodeSetImmediateId) {
                for (let i = 0, len = pending.length; i < len; i++) {
                    const candidate = pending[i];
                    if (candidate.id === e.data.vscodeSetImmediateId) {
                        pending.splice(i, 1);
                        candidate.callback();
                        return;
                    }
                }
            }
        });
        let lastId = 0;
        return (callback) => {
            const myId = ++lastId;
            pending.push({
                id: myId,
                callback: callback
            });
            globals.postMessage({ vscodeSetImmediateId: myId }, '*');
        };
    }
    if (typeof (nodeProcess === null || nodeProcess === void 0 ? void 0 : nodeProcess.nextTick) === 'function') {
        return nodeProcess.nextTick.bind(nodeProcess);
    }
    const _promise = Promise.resolve();
    return (callback) => _promise.then(callback);
})();
// Web environment
if (typeof navigator === 'object' && !isElectronRenderer) {
    _userAgent = navigator.userAgent;
    _isWindows = _userAgent.indexOf('Windows') >= 0;
    _isMacintosh = _userAgent.indexOf('Macintosh') >= 0;
    _isIOS = (_userAgent.indexOf('Macintosh') >= 0 || _userAgent.indexOf('iPad') >= 0 || _userAgent.indexOf('iPhone') >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
    _isLinux = _userAgent.indexOf('Linux') >= 0;
    _isAndroid = _userAgent.indexOf('Android') >= 0;
    _isMusic = Boolean(_userAgent.match(/\bQQMUSIC\/(\d[\.\d]*)/i)) || Boolean(_userAgent.match(/QQMUSIC\/(\d[\.\d]*)/i));
    _isWeb = true;
}
else if (typeof nodeProcess === 'object') {
    _isWindows = (nodeProcess.platform === 'win32');
    _isMacintosh = (nodeProcess.platform === 'darwin');
    _isLinux = (nodeProcess.platform === 'linux');
    _isLinuxSnap = _isLinux && !!nodeProcess.env['SNAP'] && !!nodeProcess.env['SNAP_REVISION'];
    _isNative = true;
}
exports.Platform = void 0;
(function (Platform) {
    Platform[Platform["Web"] = 0] = "Web";
    Platform[Platform["Mac"] = 1] = "Mac";
    Platform[Platform["Linux"] = 2] = "Linux";
    Platform[Platform["Windows"] = 3] = "Windows";
})(exports.Platform || (exports.Platform = {}));
function PlatformToString(platform) {
    switch (platform) {
        case 0 /* Web */: return 'Web';
        case 1 /* Mac */: return 'Mac';
        case 2 /* Linux */: return 'Linux';
        case 3 /* Windows */: return 'Windows';
    }
}
let _platform = 0 /* Web */;
if (_isMacintosh) {
    _platform = 1 /* Mac */;
}
else if (_isWindows) {
    _platform = 3 /* Windows */;
}
else if (_isLinux) {
    _platform = 2 /* Linux */;
}
const isWindows = _isWindows;
const isMacintosh = _isMacintosh;
const isLinux = _isLinux;
const isLinuxSnap = _isLinuxSnap;
const isNative = _isNative;
const isWeb = _isWeb;
const isIOS = _isIOS;
const isAndroid = _isAndroid;
const platform$1 = _platform;
const userAgent = _userAgent;
const isMusic = _isMusic;
const isMobile = isIOS || isAndroid;
let _isLittleEndian = true;
let _isLittleEndianComputed = false;
function isLittleEndian() {
    if (!_isLittleEndianComputed) {
        _isLittleEndianComputed = true;
        const test = new Uint8Array(2);
        test[0] = 1;
        test[1] = 2;
        const view = new Uint16Array(test.buffer);
        _isLittleEndian = (view[0] === (2 << 8) + 1);
    }
    return _isLittleEndian;
}

/**
 * performance提供高精度的时间精度，Date只能精确到千分之一秒，performance可以拿到毫秒的千分之一精度
 */
const hasPerformanceNow = (globals.performance && typeof globals.performance.now === 'function');
class StopWatch {
    constructor(highResolution) {
        this._highResolution = hasPerformanceNow && highResolution;
        this._startTime = this._now();
        this._stopTime = -1;
    }
    static create(highResolution = true) {
        return new StopWatch(highResolution);
    }
    _now() {
        return this._highResolution ? globals.performance.now() : Date.now();
    }
    stop() {
        this._stopTime = this._now();
    }
    elapsed() {
        if (this._stopTime !== -1) {
            return this._stopTime - this._startTime;
        }
        return this._now() - this._startTime;
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
exports.Event = void 0;
(function (Event) {
    Event.None = () => Disposable.None;
    /**
     * Given an event, returns another event which only fires once.
     */
    function once(event) {
        return (listener, thisArgs = null, disposables) => {
            // we need this, in case the event fires during the listener call
            let didFire = false;
            let result;
            result = event(e => {
                if (didFire) {
                    return;
                }
                else if (result) {
                    result.dispose();
                }
                else {
                    didFire = true;
                }
                return listener.call(thisArgs, e);
            }, null, disposables);
            if (didFire) {
                result.dispose();
            }
            return result;
        };
    }
    Event.once = once;
    /**
     * @deprecated DO NOT use, this leaks memory
     */
    function map(event, map) {
        return snapshot((listener, thisArgs = null, disposables) => event(i => listener.call(thisArgs, map(i)), null, disposables));
    }
    Event.map = map;
    /**
     * @deprecated DO NOT use, this leaks memory
     */
    function forEach(event, each) {
        return snapshot((listener, thisArgs = null, disposables) => event(i => { each(i); listener.call(thisArgs, i); }, null, disposables));
    }
    Event.forEach = forEach;
    function filter(event, filter) {
        return snapshot((listener, thisArgs = null, disposables) => event(e => filter(e) && listener.call(thisArgs, e), null, disposables));
    }
    Event.filter = filter;
    /**
     * Given an event, returns the same event but typed as `Event<void>`.
     */
    function signal(event) {
        return event;
    }
    Event.signal = signal;
    function any(...events) {
        return (listener, thisArgs = null, disposables) => combinedDisposable(...events.map(event => event(e => listener.call(thisArgs, e), null, disposables)));
    }
    Event.any = any;
    /**
     * @deprecated DO NOT use, this leaks memory
     */
    function reduce(event, merge, initial) {
        let output = initial;
        return map(event, e => {
            output = merge(output, e);
            return output;
        });
    }
    Event.reduce = reduce;
    /**
     * @deprecated DO NOT use, this leaks memory
     */
    function snapshot(event) {
        let listener;
        const emitter = new Emitter({
            onFirstListenerAdd() {
                listener = event(emitter.fire, emitter);
            },
            onLastListenerRemove() {
                listener.dispose();
            }
        });
        return emitter.event;
    }
    /**
     * @deprecated DO NOT use, this leaks memory
     */
    function debounce(event, merge, delay = 100, leading = false, leakWarningThreshold) {
        let subscription;
        let output = undefined;
        let handle = undefined;
        let numDebouncedCalls = 0;
        const emitter = new Emitter({
            leakWarningThreshold,
            onFirstListenerAdd() {
                subscription = event(cur => {
                    numDebouncedCalls++;
                    output = merge(output, cur);
                    if (leading && !handle) {
                        emitter.fire(output);
                        output = undefined;
                    }
                    clearTimeout(handle);
                    handle = setTimeout(() => {
                        const _output = output;
                        output = undefined;
                        handle = undefined;
                        if (!leading || numDebouncedCalls > 1) {
                            emitter.fire(_output);
                        }
                        numDebouncedCalls = 0;
                    }, delay);
                });
            },
            onLastListenerRemove() {
                subscription.dispose();
            }
        });
        return emitter.event;
    }
    Event.debounce = debounce;
    /**
     * @deprecated DO NOT use, this leaks memory
     */
    function latch(event, equals = (a, b) => a === b) {
        let firstCall = true;
        let cache;
        return filter(event, value => {
            const shouldEmit = firstCall || !equals(value, cache);
            firstCall = false;
            cache = value;
            return shouldEmit;
        });
    }
    Event.latch = latch;
    /**
     * @deprecated DO NOT use, this leaks memory
     */
    function split(event, isT) {
        return [
            Event.filter(event, isT),
            Event.filter(event, e => !isT(e)),
        ];
    }
    Event.split = split;
    /**
     * @deprecated DO NOT use, this leaks memory
     */
    function buffer(event, nextTick = false, _buffer = []) {
        let buffer = _buffer.slice();
        let listener = event(e => {
            if (buffer) {
                buffer.push(e);
            }
            else {
                emitter.fire(e);
            }
        });
        const flush = () => {
            if (buffer) {
                buffer.forEach(e => emitter.fire(e));
            }
            buffer = null;
        };
        const emitter = new Emitter({
            onFirstListenerAdd() {
                if (!listener) {
                    listener = event(e => emitter.fire(e));
                }
            },
            onFirstListenerDidAdd() {
                if (buffer) {
                    if (nextTick) {
                        setTimeout(flush);
                    }
                    else {
                        flush();
                    }
                }
            },
            onLastListenerRemove() {
                if (listener) {
                    listener.dispose();
                }
                listener = null;
            }
        });
        return emitter.event;
    }
    Event.buffer = buffer;
    class ChainableEvent {
        constructor(event) {
            this.event = event;
        }
        map(fn) {
            return new ChainableEvent(map(this.event, fn));
        }
        forEach(fn) {
            return new ChainableEvent(forEach(this.event, fn));
        }
        filter(fn) {
            return new ChainableEvent(filter(this.event, fn));
        }
        reduce(merge, initial) {
            return new ChainableEvent(reduce(this.event, merge, initial));
        }
        latch() {
            return new ChainableEvent(latch(this.event));
        }
        debounce(merge, delay = 100, leading = false, leakWarningThreshold) {
            return new ChainableEvent(debounce(this.event, merge, delay, leading, leakWarningThreshold));
        }
        on(listener, thisArgs, disposables) {
            return this.event(listener, thisArgs, disposables);
        }
        once(listener, thisArgs, disposables) {
            return once(this.event)(listener, thisArgs, disposables);
        }
    }
    /**
     * @deprecated DO NOT use, this leaks memory
     */
    function chain(event) {
        return new ChainableEvent(event);
    }
    Event.chain = chain;
    function fromNodeEventEmitter(emitter, eventName, map = id => id) {
        const fn = (...args) => result.fire(map(...args));
        const onFirstListenerAdd = () => emitter.on(eventName, fn);
        const onLastListenerRemove = () => emitter.removeListener(eventName, fn);
        const result = new Emitter({ onFirstListenerAdd, onLastListenerRemove });
        return result.event;
    }
    Event.fromNodeEventEmitter = fromNodeEventEmitter;
    function fromDOMEventEmitter(emitter, eventName, map = id => id) {
        const fn = (...args) => result.fire(map(...args));
        const onFirstListenerAdd = () => emitter.addEventListener(eventName, fn);
        const onLastListenerRemove = () => emitter.removeEventListener(eventName, fn);
        const result = new Emitter({ onFirstListenerAdd, onLastListenerRemove });
        return result.event;
    }
    Event.fromDOMEventEmitter = fromDOMEventEmitter;
    function toPromise(event) {
        return new Promise(resolve => once(event)(resolve));
    }
    Event.toPromise = toPromise;
})(exports.Event || (exports.Event = {}));
class EventProfiling {
    constructor(name) {
        this._listenerCount = 0;
        this._invocationCount = 0;
        this._elapsedOverall = 0;
        this._name = `${name}_${EventProfiling._idPool++}`;
    }
    start(listenerCount) {
        this._stopWatch = new StopWatch(true);
        this._listenerCount = listenerCount;
    }
    stop() {
        if (this._stopWatch) {
            const elapsed = this._stopWatch.elapsed();
            this._elapsedOverall += elapsed;
            this._invocationCount += 1;
            console.info(`did FIRE ${this._name}: elapsed_ms: ${elapsed.toFixed(5)}, listener: ${this._listenerCount} (elapsed_overall: ${this._elapsedOverall.toFixed(2)}, invocations: ${this._invocationCount})`);
            this._stopWatch = undefined;
        }
    }
}
EventProfiling._idPool = 0;
let _globalLeakWarningThreshold = -1;
function setGlobalLeakWarningThreshold(n) {
    const oldValue = _globalLeakWarningThreshold;
    _globalLeakWarningThreshold = n;
    return {
        dispose() {
            _globalLeakWarningThreshold = oldValue;
        }
    };
}
class LeakageMonitor {
    constructor(customThreshold, name = Math.random().toString(18).slice(2, 5)) {
        this.customThreshold = customThreshold;
        this.name = name;
        this._warnCountdown = 0;
    }
    dispose() {
        if (this._stacks) {
            this._stacks.clear();
        }
    }
    check(listenerCount) {
        let threshold = _globalLeakWarningThreshold;
        if (typeof this.customThreshold === 'number') {
            threshold = this.customThreshold;
        }
        if (threshold <= 0 || listenerCount < threshold) {
            return undefined;
        }
        if (!this._stacks) {
            this._stacks = new Map();
        }
        const stack = new Error().stack.split('\n').slice(3).join('\n');
        const count = (this._stacks.get(stack) || 0);
        this._stacks.set(stack, count + 1);
        this._warnCountdown -= 1;
        if (this._warnCountdown <= 0) {
            // only warn on first exceed and then every time the limit
            // is exceeded by 50% again
            this._warnCountdown = threshold * 0.5;
            // find most frequent listener and print warning
            let topStack;
            let topCount = 0;
            for (const [stack, count] of this._stacks) {
                if (!topStack || topCount < count) {
                    topStack = stack;
                    topCount = count;
                }
            }
            console.warn(`[${this.name}] potential listener LEAK detected, having ${listenerCount} listeners already. MOST frequent listener (${topCount}):`);
            console.warn(topStack);
        }
        return () => {
            const count = (this._stacks.get(stack) || 0);
            this._stacks.set(stack, count - 1);
        };
    }
}
/**
 * The Emitter can be used to expose an Event to the public
 * to fire it from the insides.
 * Sample:
    class Document {

        private readonly _onDidChange = new Emitter<(value:string)=>any>();

        public onDidChange = this._onDidChange.event;

        // getter-style
        // get onDidChange(): Event<(value:string)=>any> {
        // 	return this._onDidChange.event;
        // }

        private _doIt() {
            //...
            this._onDidChange.fire(value);
        }
    }
 */
class Emitter {
    constructor(options) {
        var _a;
        this._disposed = false;
        this._options = options;
        this._leakageMon = _globalLeakWarningThreshold > 0 ? new LeakageMonitor(this._options && this._options.leakWarningThreshold) : undefined;
        this._perfMon = ((_a = this._options) === null || _a === void 0 ? void 0 : _a._profName) ? new EventProfiling(this._options._profName) : undefined;
    }
    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */
    get event() {
        if (!this._event) {
            this._event = (listener, thisArgs, disposables) => {
                var _a;
                if (!this._listeners) {
                    this._listeners = new LinkedList();
                }
                const firstListener = this._listeners.isEmpty();
                if (firstListener && this._options && this._options.onFirstListenerAdd) {
                    this._options.onFirstListenerAdd(this);
                }
                const remove = this._listeners.push(!thisArgs ? listener : [listener, thisArgs]);
                if (firstListener && this._options && this._options.onFirstListenerDidAdd) {
                    this._options.onFirstListenerDidAdd(this);
                }
                if (this._options && this._options.onListenerDidAdd) {
                    this._options.onListenerDidAdd(this, listener, thisArgs);
                }
                // check and record this emitter for potential leakage
                const removeMonitor = (_a = this._leakageMon) === null || _a === void 0 ? void 0 : _a.check(this._listeners.size);
                const result = toDisposable(() => {
                    if (removeMonitor) {
                        removeMonitor();
                    }
                    if (!this._disposed) {
                        remove();
                        if (this._options && this._options.onLastListenerRemove) {
                            const hasListeners = (this._listeners && !this._listeners.isEmpty());
                            if (!hasListeners) {
                                this._options.onLastListenerRemove(this);
                            }
                        }
                    }
                });
                if (disposables instanceof DisposableStore) {
                    disposables.add(result);
                }
                else if (Array.isArray(disposables)) {
                    disposables.push(result);
                }
                return result;
            };
        }
        return this._event;
    }
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    fire(event) {
        var _a, _b;
        if (this._listeners) {
            // put all [listener,event]-pairs into delivery queue
            // then emit all event. an inner/nested event might be
            // the driver of this
            if (!this._deliveryQueue) {
                this._deliveryQueue = new LinkedList();
            }
            for (let listener of this._listeners) {
                this._deliveryQueue.push([listener, event]);
            }
            // start/stop performance insight collection
            (_a = this._perfMon) === null || _a === void 0 ? void 0 : _a.start(this._deliveryQueue.size);
            while (this._deliveryQueue.size > 0) {
                const [listener, event] = this._deliveryQueue.shift();
                try {
                    if (typeof listener === 'function') {
                        listener.call(undefined, event);
                    }
                    else {
                        listener[0].call(listener[1], event);
                    }
                }
                catch (e) {
                    onUnexpectedError(e);
                }
            }
            (_b = this._perfMon) === null || _b === void 0 ? void 0 : _b.stop();
        }
    }
    dispose() {
        var _a, _b, _c, _d, _e;
        if (!this._disposed) {
            this._disposed = true;
            (_a = this._listeners) === null || _a === void 0 ? void 0 : _a.clear();
            (_b = this._deliveryQueue) === null || _b === void 0 ? void 0 : _b.clear();
            (_d = (_c = this._options) === null || _c === void 0 ? void 0 : _c.onLastListenerRemove) === null || _d === void 0 ? void 0 : _d.call(_c);
            (_e = this._leakageMon) === null || _e === void 0 ? void 0 : _e.dispose();
        }
    }
}
class AsyncEmitter extends Emitter {
    fireAsync(data, token, promiseJoin) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._listeners) {
                return;
            }
            if (!this._asyncDeliveryQueue) {
                this._asyncDeliveryQueue = new LinkedList();
            }
            for (const listener of this._listeners) {
                this._asyncDeliveryQueue.push([listener, data]);
            }
            while (this._asyncDeliveryQueue.size > 0 && !token.isCancellationRequested) {
                const [listener, data] = this._asyncDeliveryQueue.shift();
                const thenables = [];
                const event = Object.assign(Object.assign({}, data), { waitUntil: (p) => {
                        if (Object.isFrozen(thenables)) {
                            throw new Error('waitUntil can NOT be called asynchronous');
                        }
                        if (promiseJoin) {
                            p = promiseJoin(p, typeof listener === 'function' ? listener : listener[0]);
                        }
                        thenables.push(p);
                    } });
                try {
                    if (typeof listener === 'function') {
                        listener.call(undefined, event);
                    }
                    else {
                        listener[0].call(listener[1], event);
                    }
                }
                catch (e) {
                    onUnexpectedError(e);
                    continue;
                }
                // freeze thenables-collection to enforce sync-calls to
                // wait until and then wait for all thenables to resolve
                Object.freeze(thenables);
                yield Promise.allSettled(thenables).then(values => {
                    for (const value of values) {
                        if (value.status === 'rejected') {
                            onUnexpectedError(value.reason);
                        }
                    }
                });
            }
        });
    }
}
class PauseableEmitter extends Emitter {
    constructor(options) {
        super(options);
        this._isPaused = 0;
        this._eventQueue = new LinkedList();
        this._mergeFn = options === null || options === void 0 ? void 0 : options.merge;
    }
    pause() {
        this._isPaused++;
    }
    resume() {
        if (this._isPaused !== 0 && --this._isPaused === 0) {
            if (this._mergeFn) {
                // use the merge function to create a single composite
                // event. make a copy in case firing pauses this emitter
                const events = Array.from(this._eventQueue);
                this._eventQueue.clear();
                super.fire(this._mergeFn(events));
            }
            else {
                // no merging, fire each event individually and test
                // that this emitter isn't paused halfway through
                while (!this._isPaused && this._eventQueue.size !== 0) {
                    super.fire(this._eventQueue.shift());
                }
            }
        }
    }
    fire(event) {
        if (this._listeners) {
            if (this._isPaused !== 0) {
                this._eventQueue.push(event);
            }
            else {
                super.fire(event);
            }
        }
    }
}
class DebounceEmitter extends PauseableEmitter {
    constructor(options) {
        var _a;
        super(options);
        this._delay = (_a = options.delay) !== null && _a !== void 0 ? _a : 100;
    }
    fire(event) {
        if (!this._handle) {
            this.pause();
            this._handle = setTimeout(() => {
                this._handle = undefined;
                this.resume();
            }, this._delay);
        }
        super.fire(event);
    }
}
class EventMultiplexer {
    constructor() {
        this.hasListeners = false;
        this.events = [];
        this.emitter = new Emitter({
            onFirstListenerAdd: () => this.onFirstListenerAdd(),
            onLastListenerRemove: () => this.onLastListenerRemove()
        });
    }
    get event() {
        return this.emitter.event;
    }
    add(event) {
        const e = { event: event, listener: null };
        this.events.push(e);
        if (this.hasListeners) {
            this.hook(e);
        }
        const dispose = () => {
            if (this.hasListeners) {
                this.unhook(e);
            }
            const idx = this.events.indexOf(e);
            this.events.splice(idx, 1);
        };
        return toDisposable(once(dispose));
    }
    onFirstListenerAdd() {
        this.hasListeners = true;
        this.events.forEach(e => this.hook(e));
    }
    onLastListenerRemove() {
        this.hasListeners = false;
        this.events.forEach(e => this.unhook(e));
    }
    hook(e) {
        e.listener = e.event(r => this.emitter.fire(r));
    }
    unhook(e) {
        if (e.listener) {
            e.listener.dispose();
        }
        e.listener = null;
    }
    dispose() {
        this.emitter.dispose();
    }
}
/**
 * The EventBufferer is useful in situations in which you want
 * to delay firing your events during some code.
 * You can wrap that code and be sure that the event will not
 * be fired during that wrap.
 *
 * ```
 * const emitter: Emitter;
 * const delayer = new EventDelayer();
 * const delayedEvent = delayer.wrapEvent(emitter.event);
 *
 * delayedEvent(console.log);
 *
 * delayer.bufferEvents(() => {
 *   emitter.fire(); // event will not be fired yet
 * });
 *
 * // event will only be fired at this point
 * ```
 */
class EventBufferer {
    constructor() {
        this.buffers = [];
    }
    wrapEvent(event) {
        return (listener, thisArgs, disposables) => {
            return event(i => {
                const buffer = this.buffers[this.buffers.length - 1];
                if (buffer) {
                    buffer.push(() => listener.call(thisArgs, i));
                }
                else {
                    listener.call(thisArgs, i);
                }
            }, undefined, disposables);
        };
    }
    bufferEvents(fn) {
        const buffer = [];
        this.buffers.push(buffer);
        const r = fn();
        this.buffers.pop();
        buffer.forEach(flush => flush());
        return r;
    }
}
/**
 * A Relay is an event forwarder which functions as a replugabble event pipe.
 * Once created, you can connect an input event to it and it will simply forward
 * events from that input event through its own `event` property. The `input`
 * can be changed at any point in time.
 */
class Relay {
    constructor() {
        this.listening = false;
        this.inputEvent = exports.Event.None;
        this.inputEventListener = Disposable.None;
        this.emitter = new Emitter({
            onFirstListenerDidAdd: () => {
                this.listening = true;
                this.inputEventListener = this.inputEvent(this.emitter.fire, this.emitter);
            },
            onLastListenerRemove: () => {
                this.listening = false;
                this.inputEventListener.dispose();
            }
        });
        this.event = this.emitter.event;
    }
    set input(event) {
        this.inputEvent = event;
        if (this.listening) {
            this.inputEventListener.dispose();
            this.inputEventListener = event(this.emitter.fire, this.emitter);
        }
    }
    dispose() {
        this.inputEventListener.dispose();
        this.emitter.dispose();
    }
}

const shortcutEvent = Object.freeze(function (callback, context) {
    const handle = setTimeout(callback.bind(context), 0);
    return { dispose() { clearTimeout(handle); } };
});
class MutableToken {
    constructor() {
        this._isCancelled = false;
        this._emitter = null;
    }
    cancel() {
        if (!this._isCancelled) {
            this._isCancelled = true;
            if (this._emitter) {
                this._emitter.fire(undefined);
                this.dispose();
            }
        }
    }
    get isCancellationRequested() {
        return this._isCancelled;
    }
    get onCancellationRequested() {
        if (this._isCancelled) {
            return shortcutEvent;
        }
        if (!this._emitter) {
            this._emitter = new Emitter();
        }
        return this._emitter.event;
    }
    dispose() {
        if (this._emitter) {
            this._emitter.dispose();
            this._emitter = null;
        }
    }
}
exports.CancellationToken = void 0;
(function (CancellationToken) {
    function isCancellationToken(thing) {
        if (thing === CancellationToken.None || thing === CancellationToken.Cancelled) {
            return true;
        }
        if (thing instanceof MutableToken) {
            return true;
        }
        if (!thing || typeof thing !== 'object') {
            return false;
        }
        return typeof thing.isCancellationRequested === 'boolean' &&
            typeof thing.onCancellationRequested === 'function';
    }
    CancellationToken.isCancellationToken = isCancellationToken;
    CancellationToken.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: exports.Event.None,
    });
    CancellationToken.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: shortcutEvent,
    });
})(exports.CancellationToken || (exports.CancellationToken = {}));
class CancellationTokenSource {
    constructor(parent) {
        this._token = undefined;
        this._parentListener = undefined;
        this._parentListener = parent && parent.onCancellationRequested(this.cancel, this);
    }
    get token() {
        if (!this._token) {
            this._token = new MutableToken();
        }
        return this._token;
    }
    cancel() {
        if (!this._token) {
            this._token = exports.CancellationToken.Cancelled;
        }
        else if (this._token instanceof MutableToken) {
            this._token.cancel();
        }
    }
    dispose(cancel = false) {
        if (cancel) {
            this.cancel();
        }
        if (this._parentListener) {
            this._parentListener.dispose();
        }
        if (!this._token) {
            this._token = exports.CancellationToken.None;
        }
        else if (this._token instanceof MutableToken) {
            this._token.dispose();
        }
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function isFalsyOrWhitespace(str) {
    if (!str || typeof str !== 'string') {
        return true;
    }
    return str.trim().length === 0;
}
const _formatRegexp = /{(\d+)}/g;
/**
 * Helper to produce a string with a variable number of arguments. Insert variable segments
 * into the string using the {n} notation where N is the index of the argument following the string.
 * @param value string to which formatting is applied
 * @param args replacements for {n}-entries
 */
function format$1(value, ...args) {
    if (args.length === 0) {
        return value;
    }
    return value.replace(_formatRegexp, function (match, group) {
        const idx = parseInt(group, 10);
        return isNaN(idx) || idx < 0 || idx >= args.length ?
            match :
            args[idx];
    });
}
const _format2Regexp = /{([^}]+)}/g;
/**
 * Helper to create a string from a template and a string record.
 * Similar to `format` but with objects instead of positional arguments.
 */
function format2(template, values) {
    return template.replace(_format2Regexp, (match, group) => { var _a; return ((_a = values[group]) !== null && _a !== void 0 ? _a : match); });
}
/**
 * Converts HTML characters inside the string to use entities instead. Makes the string safe from
 * being used e.g. in HTMLElement.innerHTML.
 */
function escape(html) {
    return html.replace(/[<>&]/g, function (match) {
        switch (match) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            default: return match;
        }
    });
}
/**
 * Escapes regular expression characters in a given string
 */
function escapeRegExpCharacters(value) {
    return value.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&');
}
/**
 * Counts how often `character` occurs inside `value`.
 */
function count(value, character) {
    let result = 0;
    const ch = character.charCodeAt(0);
    for (let i = value.length - 1; i >= 0; i--) {
        if (value.charCodeAt(i) === ch) {
            result++;
        }
    }
    return result;
}
function truncate(value, maxLength, suffix = '…') {
    if (value.length <= maxLength) {
        return value;
    }
    return `${value.substr(0, maxLength)}${suffix}`;
}
/**
 * Removes all occurrences of needle from the beginning and end of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim (default is a blank)
 */
function trim(haystack, needle = ' ') {
    const trimmed = ltrim(haystack, needle);
    return rtrim(trimmed, needle);
}
/**
 * Removes all occurrences of needle from the beginning of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim
 */
function ltrim(haystack, needle) {
    if (!haystack || !needle) {
        return haystack;
    }
    const needleLen = needle.length;
    if (needleLen === 0 || haystack.length === 0) {
        return haystack;
    }
    let offset = 0;
    while (haystack.indexOf(needle, offset) === offset) {
        offset = offset + needleLen;
    }
    return haystack.substring(offset);
}
/**
 * Removes all occurrences of needle from the end of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim
 */
function rtrim(haystack, needle) {
    if (!haystack || !needle) {
        return haystack;
    }
    const needleLen = needle.length, haystackLen = haystack.length;
    if (needleLen === 0 || haystackLen === 0) {
        return haystack;
    }
    let offset = haystackLen, idx = -1;
    while (true) {
        idx = haystack.lastIndexOf(needle, offset - 1);
        if (idx === -1 || idx + needleLen !== offset) {
            break;
        }
        if (idx === 0) {
            return '';
        }
        offset = idx;
    }
    return haystack.substring(0, offset);
}
function convertSimple2RegExpPattern(pattern) {
    return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
}
function stripWildcards(pattern) {
    return pattern.replace(/\*/g, '');
}
function createRegExp(searchString, isRegex, options = {}) {
    if (!searchString) {
        throw new Error('Cannot create regex from empty string');
    }
    if (!isRegex) {
        searchString = escapeRegExpCharacters(searchString);
    }
    if (options.wholeWord) {
        if (!/\B/.test(searchString.charAt(0))) {
            searchString = '\\b' + searchString;
        }
        if (!/\B/.test(searchString.charAt(searchString.length - 1))) {
            searchString = searchString + '\\b';
        }
    }
    let modifiers = '';
    if (options.global) {
        modifiers += 'g';
    }
    if (!options.matchCase) {
        modifiers += 'i';
    }
    if (options.multiline) {
        modifiers += 'm';
    }
    if (options.unicode) {
        modifiers += 'u';
    }
    return new RegExp(searchString, modifiers);
}
function regExpLeadsToEndlessLoop(regexp) {
    // Exit early if it's one of these special cases which are meant to match
    // against an empty string
    if (regexp.source === '^' || regexp.source === '^$' || regexp.source === '$' || regexp.source === '^\\s*$') {
        return false;
    }
    // We check against an empty string. If the regular expression doesn't advance
    // (e.g. ends in an endless loop) it will match an empty string.
    const match = regexp.exec('');
    return !!(match && regexp.lastIndex === 0);
}
function regExpContainsBackreference(regexpValue) {
    return !!regexpValue.match(/([^\\]|^)(\\\\)*\\\d+/);
}
function regExpFlags(regexp) {
    return (regexp.global ? 'g' : '')
        + (regexp.ignoreCase ? 'i' : '')
        + (regexp.multiline ? 'm' : '')
        + (regexp /* standalone editor compilation */.unicode ? 'u' : '');
}
function splitLines(str) {
    return str.split(/\r\n|\r|\n/);
}
/**
 * Returns first index of the string that is not whitespace.
 * If string is empty or contains only whitespaces, returns -1
 */
function firstNonWhitespaceIndex(str) {
    for (let i = 0, len = str.length; i < len; i++) {
        const chCode = str.charCodeAt(i);
        if (chCode !== 32 /* Space */ && chCode !== 9 /* Tab */) {
            return i;
        }
    }
    return -1;
}
/**
 * Returns the leading whitespace of the string.
 * If the string contains only whitespaces, returns entire string
 */
function getLeadingWhitespace(str, start = 0, end = str.length) {
    for (let i = start; i < end; i++) {
        const chCode = str.charCodeAt(i);
        if (chCode !== 32 /* Space */ && chCode !== 9 /* Tab */) {
            return str.substring(start, i);
        }
    }
    return str.substring(start, end);
}
/**
 * Returns last index of the string that is not whitespace.
 * If string is empty or contains only whitespaces, returns -1
 */
function lastNonWhitespaceIndex(str, startIndex = str.length - 1) {
    for (let i = startIndex; i >= 0; i--) {
        const chCode = str.charCodeAt(i);
        if (chCode !== 32 /* Space */ && chCode !== 9 /* Tab */) {
            return i;
        }
    }
    return -1;
}
function compare(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    else {
        return 0;
    }
}
function compareSubstring(a, b, aStart = 0, aEnd = a.length, bStart = 0, bEnd = b.length) {
    for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
        let codeA = a.charCodeAt(aStart);
        let codeB = b.charCodeAt(bStart);
        if (codeA < codeB) {
            return -1;
        }
        else if (codeA > codeB) {
            return 1;
        }
    }
    const aLen = aEnd - aStart;
    const bLen = bEnd - bStart;
    if (aLen < bLen) {
        return -1;
    }
    else if (aLen > bLen) {
        return 1;
    }
    return 0;
}
function compareIgnoreCase(a, b) {
    return compareSubstringIgnoreCase(a, b, 0, a.length, 0, b.length);
}
function compareSubstringIgnoreCase(a, b, aStart = 0, aEnd = a.length, bStart = 0, bEnd = b.length) {
    for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
        let codeA = a.charCodeAt(aStart);
        let codeB = b.charCodeAt(bStart);
        if (codeA === codeB) {
            // equal
            continue;
        }
        const diff = codeA - codeB;
        if (diff === 32 && isUpperAsciiLetter(codeB)) { //codeB =[65-90] && codeA =[97-122]
            continue;
        }
        else if (diff === -32 && isUpperAsciiLetter(codeA)) { //codeB =[97-122] && codeA =[65-90]
            continue;
        }
        if (isLowerAsciiLetter(codeA) && isLowerAsciiLetter(codeB)) {
            //
            return diff;
        }
        else {
            return compareSubstring(a.toLowerCase(), b.toLowerCase(), aStart, aEnd, bStart, bEnd);
        }
    }
    const aLen = aEnd - aStart;
    const bLen = bEnd - bStart;
    if (aLen < bLen) {
        return -1;
    }
    else if (aLen > bLen) {
        return 1;
    }
    return 0;
}
function isLowerAsciiLetter(code) {
    return code >= 97 /* a */ && code <= 122 /* z */;
}
function isUpperAsciiLetter(code) {
    return code >= 65 /* A */ && code <= 90 /* Z */;
}
function isAsciiLetter(code) {
    return isLowerAsciiLetter(code) || isUpperAsciiLetter(code);
}
function equalsIgnoreCase(a, b) {
    return a.length === b.length && doEqualsIgnoreCase(a, b);
}
function doEqualsIgnoreCase(a, b, stopAt = a.length) {
    for (let i = 0; i < stopAt; i++) {
        const codeA = a.charCodeAt(i);
        const codeB = b.charCodeAt(i);
        if (codeA === codeB) {
            continue;
        }
        // a-z A-Z
        if (isAsciiLetter(codeA) && isAsciiLetter(codeB)) {
            const diff = Math.abs(codeA - codeB);
            if (diff !== 0 && diff !== 32) {
                return false;
            }
        }
        // Any other charcode
        else {
            if (String.fromCharCode(codeA).toLowerCase() !== String.fromCharCode(codeB).toLowerCase()) {
                return false;
            }
        }
    }
    return true;
}
function startsWithIgnoreCase(str, candidate) {
    const candidateLength = candidate.length;
    if (candidate.length > str.length) {
        return false;
    }
    return doEqualsIgnoreCase(str, candidate, candidateLength);
}
/**
 * @returns the length of the common prefix of the two strings.
 */
function commonPrefixLength(a, b) {
    let i, len = Math.min(a.length, b.length);
    for (i = 0; i < len; i++) {
        if (a.charCodeAt(i) !== b.charCodeAt(i)) {
            return i;
        }
    }
    return len;
}
/**
 * @returns the length of the common suffix of the two strings.
 */
function commonSuffixLength(a, b) {
    let i, len = Math.min(a.length, b.length);
    const aLastIndex = a.length - 1;
    const bLastIndex = b.length - 1;
    for (i = 0; i < len; i++) {
        if (a.charCodeAt(aLastIndex - i) !== b.charCodeAt(bLastIndex - i)) {
            return i;
        }
    }
    return len;
}
/**
 * See http://en.wikipedia.org/wiki/Surrogate_pair
 */
function isHighSurrogate(charCode) {
    return (0xD800 <= charCode && charCode <= 0xDBFF);
}
/**
 * See http://en.wikipedia.org/wiki/Surrogate_pair
 */
function isLowSurrogate(charCode) {
    return (0xDC00 <= charCode && charCode <= 0xDFFF);
}
/**
 * See http://en.wikipedia.org/wiki/Surrogate_pair
 */
function computeCodePoint(highSurrogate, lowSurrogate) {
    return ((highSurrogate - 0xD800) << 10) + (lowSurrogate - 0xDC00) + 0x10000;
}
/**
 * get the code point that begins at offset `offset`
 */
function getNextCodePoint(str, len, offset) {
    const charCode = str.charCodeAt(offset);
    if (isHighSurrogate(charCode) && offset + 1 < len) {
        const nextCharCode = str.charCodeAt(offset + 1);
        if (isLowSurrogate(nextCharCode)) {
            return computeCodePoint(charCode, nextCharCode);
        }
    }
    return charCode;
}
/**
 * get the code point that ends right before offset `offset`
 */
function getPrevCodePoint(str, offset) {
    const charCode = str.charCodeAt(offset - 1);
    if (isLowSurrogate(charCode) && offset > 1) {
        const prevCharCode = str.charCodeAt(offset - 2);
        if (isHighSurrogate(prevCharCode)) {
            return computeCodePoint(prevCharCode, charCode);
        }
    }
    return charCode;
}
function nextCharLength(str, offset) {
    const graphemeBreakTree = GraphemeBreakTree.getInstance();
    const initialOffset = offset;
    const len = str.length;
    const initialCodePoint = getNextCodePoint(str, len, offset);
    offset += (initialCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
    let graphemeBreakType = graphemeBreakTree.getGraphemeBreakType(initialCodePoint);
    while (offset < len) {
        const nextCodePoint = getNextCodePoint(str, len, offset);
        const nextGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(nextCodePoint);
        if (breakBetweenGraphemeBreakType(graphemeBreakType, nextGraphemeBreakType)) {
            break;
        }
        offset += (nextCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
        graphemeBreakType = nextGraphemeBreakType;
    }
    return (offset - initialOffset);
}
function prevCharLength(str, offset) {
    const graphemeBreakTree = GraphemeBreakTree.getInstance();
    const initialOffset = offset;
    const initialCodePoint = getPrevCodePoint(str, offset);
    offset -= (initialCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
    let graphemeBreakType = graphemeBreakTree.getGraphemeBreakType(initialCodePoint);
    while (offset > 0) {
        const prevCodePoint = getPrevCodePoint(str, offset);
        const prevGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(prevCodePoint);
        if (breakBetweenGraphemeBreakType(prevGraphemeBreakType, graphemeBreakType)) {
            break;
        }
        offset -= (prevCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
        graphemeBreakType = prevGraphemeBreakType;
    }
    return (initialOffset - offset);
}
function _getCharContainingOffset(str, offset) {
    const graphemeBreakTree = GraphemeBreakTree.getInstance();
    const len = str.length;
    const initialOffset = offset;
    const initialCodePoint = getNextCodePoint(str, len, offset);
    const initialGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(initialCodePoint);
    offset += (initialCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
    // extend to the right
    let graphemeBreakType = initialGraphemeBreakType;
    while (offset < len) {
        const nextCodePoint = getNextCodePoint(str, len, offset);
        const nextGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(nextCodePoint);
        if (breakBetweenGraphemeBreakType(graphemeBreakType, nextGraphemeBreakType)) {
            break;
        }
        offset += (nextCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
        graphemeBreakType = nextGraphemeBreakType;
    }
    const endOffset = offset;
    // extend to the left
    offset = initialOffset;
    graphemeBreakType = initialGraphemeBreakType;
    while (offset > 0) {
        const prevCodePoint = getPrevCodePoint(str, offset);
        const prevGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(prevCodePoint);
        if (breakBetweenGraphemeBreakType(prevGraphemeBreakType, graphemeBreakType)) {
            break;
        }
        offset -= (prevCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
        graphemeBreakType = prevGraphemeBreakType;
    }
    return [offset, endOffset];
}
function getCharContainingOffset(str, offset) {
    if (offset > 0 && isLowSurrogate(str.charCodeAt(offset))) {
        return _getCharContainingOffset(str, offset - 1);
    }
    return _getCharContainingOffset(str, offset);
}
/**
 * A manual encoding of `str` to UTF8.
 * Use only in environments which do not offer native conversion methods!
 */
function encodeUTF8(str) {
    const strLen = str.length;
    // See https://en.wikipedia.org/wiki/UTF-8
    // first loop to establish needed buffer size
    let neededSize = 0;
    let strOffset = 0;
    while (strOffset < strLen) {
        const codePoint = getNextCodePoint(str, strLen, strOffset);
        strOffset += (codePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
        if (codePoint < 0x0080) {
            neededSize += 1;
        }
        else if (codePoint < 0x0800) {
            neededSize += 2;
        }
        else if (codePoint < 0x10000) {
            neededSize += 3;
        }
        else {
            neededSize += 4;
        }
    }
    // second loop to actually encode
    const arr = new Uint8Array(neededSize);
    strOffset = 0;
    let arrOffset = 0;
    while (strOffset < strLen) {
        const codePoint = getNextCodePoint(str, strLen, strOffset);
        strOffset += (codePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
        if (codePoint < 0x0080) {
            arr[arrOffset++] = codePoint;
        }
        else if (codePoint < 0x0800) {
            arr[arrOffset++] = 0b11000000 | ((codePoint & 0b00000000000000000000011111000000) >>> 6);
            arr[arrOffset++] = 0b10000000 | ((codePoint & 0b00000000000000000000000000111111) >>> 0);
        }
        else if (codePoint < 0x10000) {
            arr[arrOffset++] = 0b11100000 | ((codePoint & 0b00000000000000001111000000000000) >>> 12);
            arr[arrOffset++] = 0b10000000 | ((codePoint & 0b00000000000000000000111111000000) >>> 6);
            arr[arrOffset++] = 0b10000000 | ((codePoint & 0b00000000000000000000000000111111) >>> 0);
        }
        else {
            arr[arrOffset++] = 0b11110000 | ((codePoint & 0b00000000000111000000000000000000) >>> 18);
            arr[arrOffset++] = 0b10000000 | ((codePoint & 0b00000000000000111111000000000000) >>> 12);
            arr[arrOffset++] = 0b10000000 | ((codePoint & 0b00000000000000000000111111000000) >>> 6);
            arr[arrOffset++] = 0b10000000 | ((codePoint & 0b00000000000000000000000000111111) >>> 0);
        }
    }
    return arr;
}
/**
 * A manual decoding of a UTF8 string.
 * Use only in environments which do not offer native conversion methods!
 */
function decodeUTF8(buffer) {
    // https://en.wikipedia.org/wiki/UTF-8
    const len = buffer.byteLength;
    const result = [];
    let offset = 0;
    while (offset < len) {
        const v0 = buffer[offset];
        let codePoint;
        if (v0 >= 0b11110000 && offset + 3 < len) {
            // 4 bytes
            codePoint = ((((buffer[offset++] & 0b00000111) << 18) >>> 0)
                | (((buffer[offset++] & 0b00111111) << 12) >>> 0)
                | (((buffer[offset++] & 0b00111111) << 6) >>> 0)
                | (((buffer[offset++] & 0b00111111) << 0) >>> 0));
        }
        else if (v0 >= 0b11100000 && offset + 2 < len) {
            // 3 bytes
            codePoint = ((((buffer[offset++] & 0b00001111) << 12) >>> 0)
                | (((buffer[offset++] & 0b00111111) << 6) >>> 0)
                | (((buffer[offset++] & 0b00111111) << 0) >>> 0));
        }
        else if (v0 >= 0b11000000 && offset + 1 < len) {
            // 2 bytes
            codePoint = ((((buffer[offset++] & 0b00011111) << 6) >>> 0)
                | (((buffer[offset++] & 0b00111111) << 0) >>> 0));
        }
        else {
            // 1 byte
            codePoint = buffer[offset++];
        }
        if ((codePoint >= 0 && codePoint <= 0xD7FF) || (codePoint >= 0xE000 && codePoint <= 0xFFFF)) {
            // Basic Multilingual Plane
            result.push(String.fromCharCode(codePoint));
        }
        else if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
            // Supplementary Planes
            const uPrime = codePoint - 0x10000;
            const w1 = 0xD800 + ((uPrime & 0b11111111110000000000) >>> 10);
            const w2 = 0xDC00 + ((uPrime & 0b00000000001111111111) >>> 0);
            result.push(String.fromCharCode(w1));
            result.push(String.fromCharCode(w2));
        }
        else {
            // illegal code point
            result.push(String.fromCharCode(0xFFFD));
        }
    }
    return result.join('');
}
/**
 * Generated using https://github.com/alexdima/unicode-utils/blob/master/generate-rtl-test.js
 */
const CONTAINS_RTL = /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
/**
 * Returns true if `str` contains any Unicode character that is classified as "R" or "AL".
 */
function containsRTL(str) {
    return CONTAINS_RTL.test(str);
}
/**
 * Generated using https://github.com/alexdima/unicode-utils/blob/master/generate-emoji-test.js
 */
const CONTAINS_EMOJI = /(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD00-\uDDFF\uDE70-\uDED6])/;
function containsEmoji(str) {
    return CONTAINS_EMOJI.test(str);
}
const IS_BASIC_ASCII = /^[\t\n\r\x20-\x7E]*$/;
/**
 * Returns true if `str` contains only basic ASCII characters in the range 32 - 126 (including 32 and 126) or \n, \r, \t
 */
function isBasicASCII(str) {
    return IS_BASIC_ASCII.test(str);
}
const UNUSUAL_LINE_TERMINATORS = /[\u2028\u2029]/; // LINE SEPARATOR (LS) or PARAGRAPH SEPARATOR (PS)
/**
 * Returns true if `str` contains unusual line terminators, like LS or PS
 */
function containsUnusualLineTerminators(str) {
    return UNUSUAL_LINE_TERMINATORS.test(str);
}
function containsFullWidthCharacter(str) {
    for (let i = 0, len = str.length; i < len; i++) {
        if (isFullWidthCharacter(str.charCodeAt(i))) {
            return true;
        }
    }
    return false;
}
function isFullWidthCharacter(charCode) {
    // Do a cheap trick to better support wrapping of wide characters, treat them as 2 columns
    // http://jrgraphix.net/research/unicode_blocks.php
    //          2E80 — 2EFF   CJK Radicals Supplement
    //          2F00 — 2FDF   Kangxi Radicals
    //          2FF0 — 2FFF   Ideographic Description Characters
    //          3000 — 303F   CJK Symbols and Punctuation
    //          3040 — 309F   Hiragana
    //          30A0 — 30FF   Katakana
    //          3100 — 312F   Bopomofo
    //          3130 — 318F   Hangul Compatibility Jamo
    //          3190 — 319F   Kanbun
    //          31A0 — 31BF   Bopomofo Extended
    //          31F0 — 31FF   Katakana Phonetic Extensions
    //          3200 — 32FF   Enclosed CJK Letters and Months
    //          3300 — 33FF   CJK Compatibility
    //          3400 — 4DBF   CJK Unified Ideographs Extension A
    //          4DC0 — 4DFF   Yijing Hexagram Symbols
    //          4E00 — 9FFF   CJK Unified Ideographs
    //          A000 — A48F   Yi Syllables
    //          A490 — A4CF   Yi Radicals
    //          AC00 — D7AF   Hangul Syllables
    // [IGNORE] D800 — DB7F   High Surrogates
    // [IGNORE] DB80 — DBFF   High Private Use Surrogates
    // [IGNORE] DC00 — DFFF   Low Surrogates
    // [IGNORE] E000 — F8FF   Private Use Area
    //          F900 — FAFF   CJK Compatibility Ideographs
    // [IGNORE] FB00 — FB4F   Alphabetic Presentation Forms
    // [IGNORE] FB50 — FDFF   Arabic Presentation Forms-A
    // [IGNORE] FE00 — FE0F   Variation Selectors
    // [IGNORE] FE20 — FE2F   Combining Half Marks
    // [IGNORE] FE30 — FE4F   CJK Compatibility Forms
    // [IGNORE] FE50 — FE6F   Small Form Variants
    // [IGNORE] FE70 — FEFF   Arabic Presentation Forms-B
    //          FF00 — FFEF   Halfwidth and Fullwidth Forms
    //               [https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms]
    //               of which FF01 - FF5E fullwidth ASCII of 21 to 7E
    // [IGNORE]    and FF65 - FFDC halfwidth of Katakana and Hangul
    // [IGNORE] FFF0 — FFFF   Specials
    charCode = +charCode; // @perf
    return ((charCode >= 0x2E80 && charCode <= 0xD7AF)
        || (charCode >= 0xF900 && charCode <= 0xFAFF)
        || (charCode >= 0xFF01 && charCode <= 0xFF5E));
}
/**
 * A fast function (therefore imprecise) to check if code points are emojis.
 * Generated using https://github.com/alexdima/unicode-utils/blob/master/generate-emoji-test.js
 */
function isEmojiImprecise(x) {
    return ((x >= 0x1F1E6 && x <= 0x1F1FF) || (x === 8986) || (x === 8987) || (x === 9200)
        || (x === 9203) || (x >= 9728 && x <= 10175) || (x === 11088) || (x === 11093)
        || (x >= 127744 && x <= 128591) || (x >= 128640 && x <= 128764)
        || (x >= 128992 && x <= 129003) || (x >= 129280 && x <= 129535)
        || (x >= 129648 && x <= 129750));
}
/**
 * Given a string and a max length returns a shorted version. Shorting
 * happens at favorable positions - such as whitespace or punctuation characters.
 */
function lcut(text, n) {
    if (text.length < n) {
        return text;
    }
    const re = /\b/g;
    let i = 0;
    while (re.test(text)) {
        if (text.length - re.lastIndex < n) {
            break;
        }
        i = re.lastIndex;
        re.lastIndex += 1;
    }
    return text.substring(i).replace(/^\s/, '');
}
// Escape codes
// http://en.wikipedia.org/wiki/ANSI_escape_code
const EL = /\x1B\x5B[12]?K/g; // Erase in line
const COLOR_START = /\x1b\[\d+m/g; // Color
const COLOR_END = /\x1b\[0?m/g; // Color
function removeAnsiEscapeCodes(str) {
    if (str) {
        str = str.replace(EL, '');
        str = str.replace(COLOR_START, '');
        str = str.replace(COLOR_END, '');
    }
    return str;
}
// -- UTF-8 BOM
const UTF8_BOM_CHARACTER = String.fromCharCode(65279 /* UTF8_BOM */);
function startsWithUTF8BOM(str) {
    return !!(str && str.length > 0 && str.charCodeAt(0) === 65279 /* UTF8_BOM */);
}
function stripUTF8BOM(str) {
    return startsWithUTF8BOM(str) ? str.substr(1) : str;
}
/**
 * Checks if the characters of the provided query string are included in the
 * target string. The characters do not have to be contiguous within the string.
 */
function fuzzyContains(target, query) {
    if (!target || !query) {
        return false; // return early if target or query are undefined
    }
    if (target.length < query.length) {
        return false; // impossible for query to be contained in target
    }
    const queryLen = query.length;
    const targetLower = target.toLowerCase();
    let index = 0;
    let lastIndexOf = -1;
    while (index < queryLen) {
        const indexOf = targetLower.indexOf(query[index], lastIndexOf + 1);
        if (indexOf < 0) {
            return false;
        }
        lastIndexOf = indexOf;
        index++;
    }
    return true;
}
function containsUppercaseCharacter(target, ignoreEscapedChars = false) {
    if (!target) {
        return false;
    }
    if (ignoreEscapedChars) {
        target = target.replace(/\\./g, '');
    }
    return target.toLowerCase() !== target;
}
function uppercaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function getNLines(str, n = 1) {
    if (n === 0) {
        return '';
    }
    let idx = -1;
    do {
        idx = str.indexOf('\n', idx + 1);
        n--;
    } while (n > 0 && idx >= 0);
    if (idx === -1) {
        return str;
    }
    if (str[idx - 1] === '\r') {
        idx--;
    }
    return str.substr(0, idx);
}
/**
 * Produces 'a'-'z', followed by 'A'-'Z'... followed by 'a'-'z', etc.
 */
function singleLetterHash(n) {
    const LETTERS_CNT = (90 /* Z */ - 65 /* A */ + 1);
    n = n % (2 * LETTERS_CNT);
    if (n < LETTERS_CNT) {
        return String.fromCharCode(97 /* a */ + n);
    }
    return String.fromCharCode(65 /* A */ + n - LETTERS_CNT);
}
//#region Unicode Grapheme Break
function getGraphemeBreakType(codePoint) {
    const graphemeBreakTree = GraphemeBreakTree.getInstance();
    return graphemeBreakTree.getGraphemeBreakType(codePoint);
}
function breakBetweenGraphemeBreakType(breakTypeA, breakTypeB) {
    // http://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundary_Rules
    // !!! Let's make the common case a bit faster
    if (breakTypeA === 0 /* Other */) {
        // see https://www.unicode.org/Public/13.0.0/ucd/auxiliary/GraphemeBreakTest-13.0.0d10.html#table
        return (breakTypeB !== 5 /* Extend */ && breakTypeB !== 7 /* SpacingMark */);
    }
    // Do not break between a CR and LF. Otherwise, break before and after controls.
    // GB3                                        CR × LF
    // GB4                       (Control | CR | LF) ÷
    // GB5                                           ÷ (Control | CR | LF)
    if (breakTypeA === 2 /* CR */) {
        if (breakTypeB === 3 /* LF */) {
            return false; // GB3
        }
    }
    if (breakTypeA === 4 /* Control */ || breakTypeA === 2 /* CR */ || breakTypeA === 3 /* LF */) {
        return true; // GB4
    }
    if (breakTypeB === 4 /* Control */ || breakTypeB === 2 /* CR */ || breakTypeB === 3 /* LF */) {
        return true; // GB5
    }
    // Do not break Hangul syllable sequences.
    // GB6                                         L × (L | V | LV | LVT)
    // GB7                                  (LV | V) × (V | T)
    // GB8                                 (LVT | T) × T
    if (breakTypeA === 8 /* L */) {
        if (breakTypeB === 8 /* L */ || breakTypeB === 9 /* V */ || breakTypeB === 11 /* LV */ || breakTypeB === 12 /* LVT */) {
            return false; // GB6
        }
    }
    if (breakTypeA === 11 /* LV */ || breakTypeA === 9 /* V */) {
        if (breakTypeB === 9 /* V */ || breakTypeB === 10 /* T */) {
            return false; // GB7
        }
    }
    if (breakTypeA === 12 /* LVT */ || breakTypeA === 10 /* T */) {
        if (breakTypeB === 10 /* T */) {
            return false; // GB8
        }
    }
    // Do not break before extending characters or ZWJ.
    // GB9                                           × (Extend | ZWJ)
    if (breakTypeB === 5 /* Extend */ || breakTypeB === 13 /* ZWJ */) {
        return false; // GB9
    }
    // The GB9a and GB9b rules only apply to extended grapheme clusters:
    // Do not break before SpacingMarks, or after Prepend characters.
    // GB9a                                          × SpacingMark
    // GB9b                                  Prepend ×
    if (breakTypeB === 7 /* SpacingMark */) {
        return false; // GB9a
    }
    if (breakTypeA === 1 /* Prepend */) {
        return false; // GB9b
    }
    // Do not break within emoji modifier sequences or emoji zwj sequences.
    // GB11    \p{Extended_Pictographic} Extend* ZWJ × \p{Extended_Pictographic}
    if (breakTypeA === 13 /* ZWJ */ && breakTypeB === 14 /* Extended_Pictographic */) {
        // Note: we are not implementing the rule entirely here to avoid introducing states
        return false; // GB11
    }
    // GB12                          sot (RI RI)* RI × RI
    // GB13                        [^RI] (RI RI)* RI × RI
    if (breakTypeA === 6 /* Regional_Indicator */ && breakTypeB === 6 /* Regional_Indicator */) {
        // Note: we are not implementing the rule entirely here to avoid introducing states
        return false; // GB12 & GB13
    }
    // GB999                                     Any ÷ Any
    return true;
}
var GraphemeBreakType;
(function (GraphemeBreakType) {
    GraphemeBreakType[GraphemeBreakType["Other"] = 0] = "Other";
    GraphemeBreakType[GraphemeBreakType["Prepend"] = 1] = "Prepend";
    GraphemeBreakType[GraphemeBreakType["CR"] = 2] = "CR";
    GraphemeBreakType[GraphemeBreakType["LF"] = 3] = "LF";
    GraphemeBreakType[GraphemeBreakType["Control"] = 4] = "Control";
    GraphemeBreakType[GraphemeBreakType["Extend"] = 5] = "Extend";
    GraphemeBreakType[GraphemeBreakType["Regional_Indicator"] = 6] = "Regional_Indicator";
    GraphemeBreakType[GraphemeBreakType["SpacingMark"] = 7] = "SpacingMark";
    GraphemeBreakType[GraphemeBreakType["L"] = 8] = "L";
    GraphemeBreakType[GraphemeBreakType["V"] = 9] = "V";
    GraphemeBreakType[GraphemeBreakType["T"] = 10] = "T";
    GraphemeBreakType[GraphemeBreakType["LV"] = 11] = "LV";
    GraphemeBreakType[GraphemeBreakType["LVT"] = 12] = "LVT";
    GraphemeBreakType[GraphemeBreakType["ZWJ"] = 13] = "ZWJ";
    GraphemeBreakType[GraphemeBreakType["Extended_Pictographic"] = 14] = "Extended_Pictographic";
})(GraphemeBreakType || (GraphemeBreakType = {}));
class GraphemeBreakTree {
    constructor() {
        this._data = getGraphemeBreakRawData();
    }
    static getInstance() {
        if (!GraphemeBreakTree._INSTANCE) {
            GraphemeBreakTree._INSTANCE = new GraphemeBreakTree();
        }
        return GraphemeBreakTree._INSTANCE;
    }
    getGraphemeBreakType(codePoint) {
        // !!! Let's make 7bit ASCII a bit faster: 0..31
        if (codePoint < 32) {
            if (codePoint === 10 /* LineFeed */) {
                return 3 /* LF */;
            }
            if (codePoint === 13 /* CarriageReturn */) {
                return 2 /* CR */;
            }
            return 4 /* Control */;
        }
        // !!! Let's make 7bit ASCII a bit faster: 32..126
        if (codePoint < 127) {
            return 0 /* Other */;
        }
        const data = this._data;
        const nodeCount = data.length / 3;
        let nodeIndex = 1;
        while (nodeIndex <= nodeCount) {
            if (codePoint < data[3 * nodeIndex]) {
                // go left
                nodeIndex = 2 * nodeIndex;
            }
            else if (codePoint > data[3 * nodeIndex + 1]) {
                // go right
                nodeIndex = 2 * nodeIndex + 1;
            }
            else {
                // hit
                return data[3 * nodeIndex + 2];
            }
        }
        return 0 /* Other */;
    }
}
GraphemeBreakTree._INSTANCE = null;
function getGraphemeBreakRawData() {
    // generated using https://github.com/alexdima/unicode-utils/blob/master/generate-grapheme-break.js
    return JSON.parse('[0,0,0,51592,51592,11,44424,44424,11,72251,72254,5,7150,7150,7,48008,48008,11,55176,55176,11,128420,128420,14,3276,3277,5,9979,9980,14,46216,46216,11,49800,49800,11,53384,53384,11,70726,70726,5,122915,122916,5,129320,129327,14,2558,2558,5,5906,5908,5,9762,9763,14,43360,43388,8,45320,45320,11,47112,47112,11,48904,48904,11,50696,50696,11,52488,52488,11,54280,54280,11,70082,70083,1,71350,71350,7,73111,73111,5,127892,127893,14,128726,128727,14,129473,129474,14,2027,2035,5,2901,2902,5,3784,3789,5,6754,6754,5,8418,8420,5,9877,9877,14,11088,11088,14,44008,44008,5,44872,44872,11,45768,45768,11,46664,46664,11,47560,47560,11,48456,48456,11,49352,49352,11,50248,50248,11,51144,51144,11,52040,52040,11,52936,52936,11,53832,53832,11,54728,54728,11,69811,69814,5,70459,70460,5,71096,71099,7,71998,71998,5,72874,72880,5,119149,119149,7,127374,127374,14,128335,128335,14,128482,128482,14,128765,128767,14,129399,129400,14,129680,129685,14,1476,1477,5,2377,2380,7,2759,2760,5,3137,3140,7,3458,3459,7,4153,4154,5,6432,6434,5,6978,6978,5,7675,7679,5,9723,9726,14,9823,9823,14,9919,9923,14,10035,10036,14,42736,42737,5,43596,43596,5,44200,44200,11,44648,44648,11,45096,45096,11,45544,45544,11,45992,45992,11,46440,46440,11,46888,46888,11,47336,47336,11,47784,47784,11,48232,48232,11,48680,48680,11,49128,49128,11,49576,49576,11,50024,50024,11,50472,50472,11,50920,50920,11,51368,51368,11,51816,51816,11,52264,52264,11,52712,52712,11,53160,53160,11,53608,53608,11,54056,54056,11,54504,54504,11,54952,54952,11,68108,68111,5,69933,69940,5,70197,70197,7,70498,70499,7,70845,70845,5,71229,71229,5,71727,71735,5,72154,72155,5,72344,72345,5,73023,73029,5,94095,94098,5,121403,121452,5,126981,127182,14,127538,127546,14,127990,127990,14,128391,128391,14,128445,128449,14,128500,128505,14,128752,128752,14,129160,129167,14,129356,129356,14,129432,129442,14,129648,129651,14,129751,131069,14,173,173,4,1757,1757,1,2274,2274,1,2494,2494,5,2641,2641,5,2876,2876,5,3014,3016,7,3262,3262,7,3393,3396,5,3570,3571,7,3968,3972,5,4228,4228,7,6086,6086,5,6679,6680,5,6912,6915,5,7080,7081,5,7380,7392,5,8252,8252,14,9096,9096,14,9748,9749,14,9784,9786,14,9833,9850,14,9890,9894,14,9938,9938,14,9999,9999,14,10085,10087,14,12349,12349,14,43136,43137,7,43454,43456,7,43755,43755,7,44088,44088,11,44312,44312,11,44536,44536,11,44760,44760,11,44984,44984,11,45208,45208,11,45432,45432,11,45656,45656,11,45880,45880,11,46104,46104,11,46328,46328,11,46552,46552,11,46776,46776,11,47000,47000,11,47224,47224,11,47448,47448,11,47672,47672,11,47896,47896,11,48120,48120,11,48344,48344,11,48568,48568,11,48792,48792,11,49016,49016,11,49240,49240,11,49464,49464,11,49688,49688,11,49912,49912,11,50136,50136,11,50360,50360,11,50584,50584,11,50808,50808,11,51032,51032,11,51256,51256,11,51480,51480,11,51704,51704,11,51928,51928,11,52152,52152,11,52376,52376,11,52600,52600,11,52824,52824,11,53048,53048,11,53272,53272,11,53496,53496,11,53720,53720,11,53944,53944,11,54168,54168,11,54392,54392,11,54616,54616,11,54840,54840,11,55064,55064,11,65438,65439,5,69633,69633,5,69837,69837,1,70018,70018,7,70188,70190,7,70368,70370,7,70465,70468,7,70712,70719,5,70835,70840,5,70850,70851,5,71132,71133,5,71340,71340,7,71458,71461,5,71985,71989,7,72002,72002,7,72193,72202,5,72281,72283,5,72766,72766,7,72885,72886,5,73104,73105,5,92912,92916,5,113824,113827,4,119173,119179,5,121505,121519,5,125136,125142,5,127279,127279,14,127489,127490,14,127570,127743,14,127900,127901,14,128254,128254,14,128369,128370,14,128400,128400,14,128425,128432,14,128468,128475,14,128489,128494,14,128715,128720,14,128745,128745,14,128759,128760,14,129004,129023,14,129296,129304,14,129340,129342,14,129388,129392,14,129404,129407,14,129454,129455,14,129485,129487,14,129659,129663,14,129719,129727,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2363,2363,7,2402,2403,5,2507,2508,7,2622,2624,7,2691,2691,7,2786,2787,5,2881,2884,5,3006,3006,5,3072,3072,5,3170,3171,5,3267,3268,7,3330,3331,7,3406,3406,1,3538,3540,5,3655,3662,5,3897,3897,5,4038,4038,5,4184,4185,5,4352,4447,8,6068,6069,5,6155,6157,5,6448,6449,7,6742,6742,5,6783,6783,5,6966,6970,5,7042,7042,7,7143,7143,7,7212,7219,5,7412,7412,5,8206,8207,4,8294,8303,4,8596,8601,14,9410,9410,14,9742,9742,14,9757,9757,14,9770,9770,14,9794,9794,14,9828,9828,14,9855,9855,14,9882,9882,14,9900,9903,14,9929,9933,14,9963,9967,14,9987,9988,14,10006,10006,14,10062,10062,14,10175,10175,14,11744,11775,5,42607,42607,5,43043,43044,7,43263,43263,5,43444,43445,7,43569,43570,5,43698,43700,5,43766,43766,5,44032,44032,11,44144,44144,11,44256,44256,11,44368,44368,11,44480,44480,11,44592,44592,11,44704,44704,11,44816,44816,11,44928,44928,11,45040,45040,11,45152,45152,11,45264,45264,11,45376,45376,11,45488,45488,11,45600,45600,11,45712,45712,11,45824,45824,11,45936,45936,11,46048,46048,11,46160,46160,11,46272,46272,11,46384,46384,11,46496,46496,11,46608,46608,11,46720,46720,11,46832,46832,11,46944,46944,11,47056,47056,11,47168,47168,11,47280,47280,11,47392,47392,11,47504,47504,11,47616,47616,11,47728,47728,11,47840,47840,11,47952,47952,11,48064,48064,11,48176,48176,11,48288,48288,11,48400,48400,11,48512,48512,11,48624,48624,11,48736,48736,11,48848,48848,11,48960,48960,11,49072,49072,11,49184,49184,11,49296,49296,11,49408,49408,11,49520,49520,11,49632,49632,11,49744,49744,11,49856,49856,11,49968,49968,11,50080,50080,11,50192,50192,11,50304,50304,11,50416,50416,11,50528,50528,11,50640,50640,11,50752,50752,11,50864,50864,11,50976,50976,11,51088,51088,11,51200,51200,11,51312,51312,11,51424,51424,11,51536,51536,11,51648,51648,11,51760,51760,11,51872,51872,11,51984,51984,11,52096,52096,11,52208,52208,11,52320,52320,11,52432,52432,11,52544,52544,11,52656,52656,11,52768,52768,11,52880,52880,11,52992,52992,11,53104,53104,11,53216,53216,11,53328,53328,11,53440,53440,11,53552,53552,11,53664,53664,11,53776,53776,11,53888,53888,11,54000,54000,11,54112,54112,11,54224,54224,11,54336,54336,11,54448,54448,11,54560,54560,11,54672,54672,11,54784,54784,11,54896,54896,11,55008,55008,11,55120,55120,11,64286,64286,5,66272,66272,5,68900,68903,5,69762,69762,7,69817,69818,5,69927,69931,5,70003,70003,5,70070,70078,5,70094,70094,7,70194,70195,7,70206,70206,5,70400,70401,5,70463,70463,7,70475,70477,7,70512,70516,5,70722,70724,5,70832,70832,5,70842,70842,5,70847,70848,5,71088,71089,7,71102,71102,7,71219,71226,5,71231,71232,5,71342,71343,7,71453,71455,5,71463,71467,5,71737,71738,5,71995,71996,5,72000,72000,7,72145,72147,7,72160,72160,5,72249,72249,7,72273,72278,5,72330,72342,5,72752,72758,5,72850,72871,5,72882,72883,5,73018,73018,5,73031,73031,5,73109,73109,5,73461,73462,7,94031,94031,5,94192,94193,7,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,126976,126979,14,127184,127231,14,127344,127345,14,127405,127461,14,127514,127514,14,127561,127567,14,127778,127779,14,127896,127896,14,127985,127986,14,127995,127999,5,128326,128328,14,128360,128366,14,128378,128378,14,128394,128397,14,128405,128406,14,128422,128423,14,128435,128443,14,128453,128464,14,128479,128480,14,128484,128487,14,128496,128498,14,128640,128709,14,128723,128724,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129096,129103,14,129292,129292,14,129311,129311,14,129329,129330,14,129344,129349,14,129360,129374,14,129394,129394,14,129402,129402,14,129413,129425,14,129445,129450,14,129466,129471,14,129483,129483,14,129511,129535,14,129653,129655,14,129667,129670,14,129705,129711,14,129731,129743,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2307,2307,7,2366,2368,7,2382,2383,7,2434,2435,7,2497,2500,5,2519,2519,5,2563,2563,7,2631,2632,5,2677,2677,5,2750,2752,7,2763,2764,7,2817,2817,5,2879,2879,5,2891,2892,7,2914,2915,5,3008,3008,5,3021,3021,5,3076,3076,5,3146,3149,5,3202,3203,7,3264,3265,7,3271,3272,7,3298,3299,5,3390,3390,5,3402,3404,7,3426,3427,5,3535,3535,5,3544,3550,7,3635,3635,7,3763,3763,7,3893,3893,5,3953,3966,5,3981,3991,5,4145,4145,7,4157,4158,5,4209,4212,5,4237,4237,5,4520,4607,10,5970,5971,5,6071,6077,5,6089,6099,5,6277,6278,5,6439,6440,5,6451,6456,7,6683,6683,5,6744,6750,5,6765,6770,7,6846,6846,5,6964,6964,5,6972,6972,5,7019,7027,5,7074,7077,5,7083,7085,5,7146,7148,7,7154,7155,7,7222,7223,5,7394,7400,5,7416,7417,5,8204,8204,5,8233,8233,4,8288,8292,4,8413,8416,5,8482,8482,14,8986,8987,14,9193,9203,14,9654,9654,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9775,14,9792,9792,14,9800,9811,14,9825,9826,14,9831,9831,14,9852,9853,14,9872,9873,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9936,9936,14,9941,9960,14,9974,9974,14,9982,9985,14,9992,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10145,10145,14,11013,11015,14,11503,11505,5,12334,12335,5,12951,12951,14,42612,42621,5,43014,43014,5,43047,43047,7,43204,43205,5,43335,43345,5,43395,43395,7,43450,43451,7,43561,43566,5,43573,43574,5,43644,43644,5,43710,43711,5,43758,43759,7,44005,44005,5,44012,44012,7,44060,44060,11,44116,44116,11,44172,44172,11,44228,44228,11,44284,44284,11,44340,44340,11,44396,44396,11,44452,44452,11,44508,44508,11,44564,44564,11,44620,44620,11,44676,44676,11,44732,44732,11,44788,44788,11,44844,44844,11,44900,44900,11,44956,44956,11,45012,45012,11,45068,45068,11,45124,45124,11,45180,45180,11,45236,45236,11,45292,45292,11,45348,45348,11,45404,45404,11,45460,45460,11,45516,45516,11,45572,45572,11,45628,45628,11,45684,45684,11,45740,45740,11,45796,45796,11,45852,45852,11,45908,45908,11,45964,45964,11,46020,46020,11,46076,46076,11,46132,46132,11,46188,46188,11,46244,46244,11,46300,46300,11,46356,46356,11,46412,46412,11,46468,46468,11,46524,46524,11,46580,46580,11,46636,46636,11,46692,46692,11,46748,46748,11,46804,46804,11,46860,46860,11,46916,46916,11,46972,46972,11,47028,47028,11,47084,47084,11,47140,47140,11,47196,47196,11,47252,47252,11,47308,47308,11,47364,47364,11,47420,47420,11,47476,47476,11,47532,47532,11,47588,47588,11,47644,47644,11,47700,47700,11,47756,47756,11,47812,47812,11,47868,47868,11,47924,47924,11,47980,47980,11,48036,48036,11,48092,48092,11,48148,48148,11,48204,48204,11,48260,48260,11,48316,48316,11,48372,48372,11,48428,48428,11,48484,48484,11,48540,48540,11,48596,48596,11,48652,48652,11,48708,48708,11,48764,48764,11,48820,48820,11,48876,48876,11,48932,48932,11,48988,48988,11,49044,49044,11,49100,49100,11,49156,49156,11,49212,49212,11,49268,49268,11,49324,49324,11,49380,49380,11,49436,49436,11,49492,49492,11,49548,49548,11,49604,49604,11,49660,49660,11,49716,49716,11,49772,49772,11,49828,49828,11,49884,49884,11,49940,49940,11,49996,49996,11,50052,50052,11,50108,50108,11,50164,50164,11,50220,50220,11,50276,50276,11,50332,50332,11,50388,50388,11,50444,50444,11,50500,50500,11,50556,50556,11,50612,50612,11,50668,50668,11,50724,50724,11,50780,50780,11,50836,50836,11,50892,50892,11,50948,50948,11,51004,51004,11,51060,51060,11,51116,51116,11,51172,51172,11,51228,51228,11,51284,51284,11,51340,51340,11,51396,51396,11,51452,51452,11,51508,51508,11,51564,51564,11,51620,51620,11,51676,51676,11,51732,51732,11,51788,51788,11,51844,51844,11,51900,51900,11,51956,51956,11,52012,52012,11,52068,52068,11,52124,52124,11,52180,52180,11,52236,52236,11,52292,52292,11,52348,52348,11,52404,52404,11,52460,52460,11,52516,52516,11,52572,52572,11,52628,52628,11,52684,52684,11,52740,52740,11,52796,52796,11,52852,52852,11,52908,52908,11,52964,52964,11,53020,53020,11,53076,53076,11,53132,53132,11,53188,53188,11,53244,53244,11,53300,53300,11,53356,53356,11,53412,53412,11,53468,53468,11,53524,53524,11,53580,53580,11,53636,53636,11,53692,53692,11,53748,53748,11,53804,53804,11,53860,53860,11,53916,53916,11,53972,53972,11,54028,54028,11,54084,54084,11,54140,54140,11,54196,54196,11,54252,54252,11,54308,54308,11,54364,54364,11,54420,54420,11,54476,54476,11,54532,54532,11,54588,54588,11,54644,54644,11,54700,54700,11,54756,54756,11,54812,54812,11,54868,54868,11,54924,54924,11,54980,54980,11,55036,55036,11,55092,55092,11,55148,55148,11,55216,55238,9,65056,65071,5,65529,65531,4,68097,68099,5,68159,68159,5,69446,69456,5,69688,69702,5,69808,69810,7,69815,69816,7,69821,69821,1,69888,69890,5,69932,69932,7,69957,69958,7,70016,70017,5,70067,70069,7,70079,70080,7,70089,70092,5,70095,70095,5,70191,70193,5,70196,70196,5,70198,70199,5,70367,70367,5,70371,70378,5,70402,70403,7,70462,70462,5,70464,70464,5,70471,70472,7,70487,70487,5,70502,70508,5,70709,70711,7,70720,70721,7,70725,70725,7,70750,70750,5,70833,70834,7,70841,70841,7,70843,70844,7,70846,70846,7,70849,70849,7,71087,71087,5,71090,71093,5,71100,71101,5,71103,71104,5,71216,71218,7,71227,71228,7,71230,71230,7,71339,71339,5,71341,71341,5,71344,71349,5,71351,71351,5,71456,71457,7,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123628,123631,5,125252,125258,5,126980,126980,14,127183,127183,14,127245,127247,14,127340,127343,14,127358,127359,14,127377,127386,14,127462,127487,6,127491,127503,14,127535,127535,14,127548,127551,14,127568,127569,14,127744,127777,14,127780,127891,14,127894,127895,14,127897,127899,14,127902,127984,14,127987,127989,14,127991,127994,14,128000,128253,14,128255,128317,14,128329,128334,14,128336,128359,14,128367,128368,14,128371,128377,14,128379,128390,14,128392,128393,14,128398,128399,14,128401,128404,14,128407,128419,14,128421,128421,14,128424,128424,14,128433,128434,14,128444,128444,14,128450,128452,14,128465,128467,14,128476,128478,14,128481,128481,14,128483,128483,14,128488,128488,14,128495,128495,14,128499,128499,14,128506,128591,14,128710,128714,14,128721,128722,14,128725,128725,14,128728,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129664,129666,14,129671,129679,14,129686,129704,14,129712,129718,14,129728,129730,14,129744,129750,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2259,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3134,3136,5,3142,3144,5,3157,3158,5,3201,3201,5,3260,3260,5,3263,3263,5,3266,3266,5,3270,3270,5,3274,3275,7,3285,3286,5,3328,3329,5,3387,3388,5,3391,3392,7,3398,3400,7,3405,3405,5,3415,3415,5,3457,3457,5,3530,3530,5,3536,3537,7,3542,3542,5,3551,3551,5,3633,3633,5,3636,3642,5,3761,3761,5,3764,3772,5,3864,3865,5,3895,3895,5,3902,3903,7,3967,3967,7,3974,3975,5,3993,4028,5,4141,4144,5,4146,4151,5,4155,4156,7,4182,4183,7,4190,4192,5,4226,4226,5,4229,4230,5,4253,4253,5,4448,4519,9,4957,4959,5,5938,5940,5,6002,6003,5,6070,6070,7,6078,6085,7,6087,6088,7,6109,6109,5,6158,6158,4,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6848,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7673,5,8203,8203,4,8205,8205,13,8232,8232,4,8234,8238,4,8265,8265,14,8293,8293,4,8400,8412,5,8417,8417,5,8421,8432,5,8505,8505,14,8617,8618,14,9000,9000,14,9167,9167,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9776,9783,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9935,14,9937,9937,14,9939,9940,14,9961,9962,14,9968,9973,14,9975,9978,14,9981,9981,14,9986,9986,14,9989,9989,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10084,14,10133,10135,14,10160,10160,14,10548,10549,14,11035,11036,14,11093,11093,14,11647,11647,5,12330,12333,5,12336,12336,14,12441,12442,5,12953,12953,14,42608,42610,5,42654,42655,5,43010,43010,5,43019,43019,5,43045,43046,5,43052,43052,5,43188,43203,7,43232,43249,5,43302,43309,5,43346,43347,7,43392,43394,5,43443,43443,5,43446,43449,5,43452,43453,5,43493,43493,5,43567,43568,7,43571,43572,7,43587,43587,5,43597,43597,7,43696,43696,5,43703,43704,5,43713,43713,5,43756,43757,5,43765,43765,7,44003,44004,7,44006,44007,7,44009,44010,7,44013,44013,5,44033,44059,12,44061,44087,12,44089,44115,12,44117,44143,12,44145,44171,12,44173,44199,12,44201,44227,12,44229,44255,12,44257,44283,12,44285,44311,12,44313,44339,12,44341,44367,12,44369,44395,12,44397,44423,12,44425,44451,12,44453,44479,12,44481,44507,12,44509,44535,12,44537,44563,12,44565,44591,12,44593,44619,12,44621,44647,12,44649,44675,12,44677,44703,12,44705,44731,12,44733,44759,12,44761,44787,12,44789,44815,12,44817,44843,12,44845,44871,12,44873,44899,12,44901,44927,12,44929,44955,12,44957,44983,12,44985,45011,12,45013,45039,12,45041,45067,12,45069,45095,12,45097,45123,12,45125,45151,12,45153,45179,12,45181,45207,12,45209,45235,12,45237,45263,12,45265,45291,12,45293,45319,12,45321,45347,12,45349,45375,12,45377,45403,12,45405,45431,12,45433,45459,12,45461,45487,12,45489,45515,12,45517,45543,12,45545,45571,12,45573,45599,12,45601,45627,12,45629,45655,12,45657,45683,12,45685,45711,12,45713,45739,12,45741,45767,12,45769,45795,12,45797,45823,12,45825,45851,12,45853,45879,12,45881,45907,12,45909,45935,12,45937,45963,12,45965,45991,12,45993,46019,12,46021,46047,12,46049,46075,12,46077,46103,12,46105,46131,12,46133,46159,12,46161,46187,12,46189,46215,12,46217,46243,12,46245,46271,12,46273,46299,12,46301,46327,12,46329,46355,12,46357,46383,12,46385,46411,12,46413,46439,12,46441,46467,12,46469,46495,12,46497,46523,12,46525,46551,12,46553,46579,12,46581,46607,12,46609,46635,12,46637,46663,12,46665,46691,12,46693,46719,12,46721,46747,12,46749,46775,12,46777,46803,12,46805,46831,12,46833,46859,12,46861,46887,12,46889,46915,12,46917,46943,12,46945,46971,12,46973,46999,12,47001,47027,12,47029,47055,12,47057,47083,12,47085,47111,12,47113,47139,12,47141,47167,12,47169,47195,12,47197,47223,12,47225,47251,12,47253,47279,12,47281,47307,12,47309,47335,12,47337,47363,12,47365,47391,12,47393,47419,12,47421,47447,12,47449,47475,12,47477,47503,12,47505,47531,12,47533,47559,12,47561,47587,12,47589,47615,12,47617,47643,12,47645,47671,12,47673,47699,12,47701,47727,12,47729,47755,12,47757,47783,12,47785,47811,12,47813,47839,12,47841,47867,12,47869,47895,12,47897,47923,12,47925,47951,12,47953,47979,12,47981,48007,12,48009,48035,12,48037,48063,12,48065,48091,12,48093,48119,12,48121,48147,12,48149,48175,12,48177,48203,12,48205,48231,12,48233,48259,12,48261,48287,12,48289,48315,12,48317,48343,12,48345,48371,12,48373,48399,12,48401,48427,12,48429,48455,12,48457,48483,12,48485,48511,12,48513,48539,12,48541,48567,12,48569,48595,12,48597,48623,12,48625,48651,12,48653,48679,12,48681,48707,12,48709,48735,12,48737,48763,12,48765,48791,12,48793,48819,12,48821,48847,12,48849,48875,12,48877,48903,12,48905,48931,12,48933,48959,12,48961,48987,12,48989,49015,12,49017,49043,12,49045,49071,12,49073,49099,12,49101,49127,12,49129,49155,12,49157,49183,12,49185,49211,12,49213,49239,12,49241,49267,12,49269,49295,12,49297,49323,12,49325,49351,12,49353,49379,12,49381,49407,12,49409,49435,12,49437,49463,12,49465,49491,12,49493,49519,12,49521,49547,12,49549,49575,12,49577,49603,12,49605,49631,12,49633,49659,12,49661,49687,12,49689,49715,12,49717,49743,12,49745,49771,12,49773,49799,12,49801,49827,12,49829,49855,12,49857,49883,12,49885,49911,12,49913,49939,12,49941,49967,12,49969,49995,12,49997,50023,12,50025,50051,12,50053,50079,12,50081,50107,12,50109,50135,12,50137,50163,12,50165,50191,12,50193,50219,12,50221,50247,12,50249,50275,12,50277,50303,12,50305,50331,12,50333,50359,12,50361,50387,12,50389,50415,12,50417,50443,12,50445,50471,12,50473,50499,12,50501,50527,12,50529,50555,12,50557,50583,12,50585,50611,12,50613,50639,12,50641,50667,12,50669,50695,12,50697,50723,12,50725,50751,12,50753,50779,12,50781,50807,12,50809,50835,12,50837,50863,12,50865,50891,12,50893,50919,12,50921,50947,12,50949,50975,12,50977,51003,12,51005,51031,12,51033,51059,12,51061,51087,12,51089,51115,12,51117,51143,12,51145,51171,12,51173,51199,12,51201,51227,12,51229,51255,12,51257,51283,12,51285,51311,12,51313,51339,12,51341,51367,12,51369,51395,12,51397,51423,12,51425,51451,12,51453,51479,12,51481,51507,12,51509,51535,12,51537,51563,12,51565,51591,12,51593,51619,12,51621,51647,12,51649,51675,12,51677,51703,12,51705,51731,12,51733,51759,12,51761,51787,12,51789,51815,12,51817,51843,12,51845,51871,12,51873,51899,12,51901,51927,12,51929,51955,12,51957,51983,12,51985,52011,12,52013,52039,12,52041,52067,12,52069,52095,12,52097,52123,12,52125,52151,12,52153,52179,12,52181,52207,12,52209,52235,12,52237,52263,12,52265,52291,12,52293,52319,12,52321,52347,12,52349,52375,12,52377,52403,12,52405,52431,12,52433,52459,12,52461,52487,12,52489,52515,12,52517,52543,12,52545,52571,12,52573,52599,12,52601,52627,12,52629,52655,12,52657,52683,12,52685,52711,12,52713,52739,12,52741,52767,12,52769,52795,12,52797,52823,12,52825,52851,12,52853,52879,12,52881,52907,12,52909,52935,12,52937,52963,12,52965,52991,12,52993,53019,12,53021,53047,12,53049,53075,12,53077,53103,12,53105,53131,12,53133,53159,12,53161,53187,12,53189,53215,12,53217,53243,12,53245,53271,12,53273,53299,12,53301,53327,12,53329,53355,12,53357,53383,12,53385,53411,12,53413,53439,12,53441,53467,12,53469,53495,12,53497,53523,12,53525,53551,12,53553,53579,12,53581,53607,12,53609,53635,12,53637,53663,12,53665,53691,12,53693,53719,12,53721,53747,12,53749,53775,12,53777,53803,12,53805,53831,12,53833,53859,12,53861,53887,12,53889,53915,12,53917,53943,12,53945,53971,12,53973,53999,12,54001,54027,12,54029,54055,12,54057,54083,12,54085,54111,12,54113,54139,12,54141,54167,12,54169,54195,12,54197,54223,12,54225,54251,12,54253,54279,12,54281,54307,12,54309,54335,12,54337,54363,12,54365,54391,12,54393,54419,12,54421,54447,12,54449,54475,12,54477,54503,12,54505,54531,12,54533,54559,12,54561,54587,12,54589,54615,12,54617,54643,12,54645,54671,12,54673,54699,12,54701,54727,12,54729,54755,12,54757,54783,12,54785,54811,12,54813,54839,12,54841,54867,12,54869,54895,12,54897,54923,12,54925,54951,12,54953,54979,12,54981,55007,12,55009,55035,12,55037,55063,12,55065,55091,12,55093,55119,12,55121,55147,12,55149,55175,12,55177,55203,12,55243,55291,10,65024,65039,5,65279,65279,4,65520,65528,4,66045,66045,5,66422,66426,5,68101,68102,5,68152,68154,5,68325,68326,5,69291,69292,5,69632,69632,7,69634,69634,7,69759,69761,5]');
}
//#endregion
/**
 * Computes the offset after performing a left delete on the given string,
 * while considering unicode grapheme/emoji rules.
 */
function getLeftDeleteOffset(offset, str) {
    if (offset === 0) {
        return 0;
    }
    // Try to delete emoji part.
    const emojiOffset = getOffsetBeforeLastEmojiComponent(offset, str);
    if (emojiOffset !== undefined) {
        return emojiOffset;
    }
    // Otherwise, just skip a single code point.
    const codePoint = getPrevCodePoint(str, offset);
    offset -= getUTF16Length(codePoint);
    return offset;
}
function getOffsetBeforeLastEmojiComponent(offset, str) {
    // See https://www.unicode.org/reports/tr51/tr51-14.html#EBNF_and_Regex for the
    // structure of emojis.
    let codePoint = getPrevCodePoint(str, offset);
    offset -= getUTF16Length(codePoint);
    // Skip modifiers
    while ((isEmojiModifier(codePoint) || codePoint === 65039 /* emojiVariantSelector */ || codePoint === 8419 /* enclosingKeyCap */)) {
        if (offset === 0) {
            // Cannot skip modifier, no preceding emoji base.
            return undefined;
        }
        codePoint = getPrevCodePoint(str, offset);
        offset -= getUTF16Length(codePoint);
    }
    // Expect base emoji
    if (!isEmojiImprecise(codePoint)) {
        // Unexpected code point, not a valid emoji.
        return undefined;
    }
    if (offset >= 0) {
        // Skip optional ZWJ code points that combine multiple emojis.
        // In theory, we should check if that ZWJ actually combines multiple emojis
        // to prevent deleting ZWJs in situations we didn't account for.
        const optionalZwjCodePoint = getPrevCodePoint(str, offset);
        if (optionalZwjCodePoint === 8205 /* zwj */) {
            offset -= getUTF16Length(optionalZwjCodePoint);
        }
    }
    return offset;
}
function getUTF16Length(codePoint) {
    return codePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1;
}
function isEmojiModifier(codePoint) {
    return 0x1F3FB <= codePoint && codePoint <= 0x1F3FF;
}
var CodePoint;
(function (CodePoint) {
    CodePoint[CodePoint["zwj"] = 8205] = "zwj";
    /**
     * Variation Selector-16 (VS16)
     */
    CodePoint[CodePoint["emojiVariantSelector"] = 65039] = "emojiVariantSelector";
    /**
     * Combining Enclosing Keycap
     */
    CodePoint[CodePoint["enclosingKeyCap"] = 8419] = "enclosingKeyCap";
})(CodePoint || (CodePoint = {}));

var strings = /*#__PURE__*/Object.freeze({
	__proto__: null,
	isFalsyOrWhitespace: isFalsyOrWhitespace,
	format: format$1,
	format2: format2,
	escape: escape,
	escapeRegExpCharacters: escapeRegExpCharacters,
	count: count,
	truncate: truncate,
	trim: trim,
	ltrim: ltrim,
	rtrim: rtrim,
	convertSimple2RegExpPattern: convertSimple2RegExpPattern,
	stripWildcards: stripWildcards,
	createRegExp: createRegExp,
	regExpLeadsToEndlessLoop: regExpLeadsToEndlessLoop,
	regExpContainsBackreference: regExpContainsBackreference,
	regExpFlags: regExpFlags,
	splitLines: splitLines,
	firstNonWhitespaceIndex: firstNonWhitespaceIndex,
	getLeadingWhitespace: getLeadingWhitespace,
	lastNonWhitespaceIndex: lastNonWhitespaceIndex,
	compare: compare,
	compareSubstring: compareSubstring,
	compareIgnoreCase: compareIgnoreCase,
	compareSubstringIgnoreCase: compareSubstringIgnoreCase,
	isLowerAsciiLetter: isLowerAsciiLetter,
	isUpperAsciiLetter: isUpperAsciiLetter,
	equalsIgnoreCase: equalsIgnoreCase,
	startsWithIgnoreCase: startsWithIgnoreCase,
	commonPrefixLength: commonPrefixLength,
	commonSuffixLength: commonSuffixLength,
	isHighSurrogate: isHighSurrogate,
	isLowSurrogate: isLowSurrogate,
	computeCodePoint: computeCodePoint,
	getNextCodePoint: getNextCodePoint,
	nextCharLength: nextCharLength,
	prevCharLength: prevCharLength,
	getCharContainingOffset: getCharContainingOffset,
	encodeUTF8: encodeUTF8,
	decodeUTF8: decodeUTF8,
	containsRTL: containsRTL,
	containsEmoji: containsEmoji,
	isBasicASCII: isBasicASCII,
	UNUSUAL_LINE_TERMINATORS: UNUSUAL_LINE_TERMINATORS,
	containsUnusualLineTerminators: containsUnusualLineTerminators,
	containsFullWidthCharacter: containsFullWidthCharacter,
	isFullWidthCharacter: isFullWidthCharacter,
	isEmojiImprecise: isEmojiImprecise,
	lcut: lcut,
	removeAnsiEscapeCodes: removeAnsiEscapeCodes,
	UTF8_BOM_CHARACTER: UTF8_BOM_CHARACTER,
	startsWithUTF8BOM: startsWithUTF8BOM,
	stripUTF8BOM: stripUTF8BOM,
	fuzzyContains: fuzzyContains,
	containsUppercaseCharacter: containsUppercaseCharacter,
	uppercaseFirstLetter: uppercaseFirstLetter,
	getNLines: getNLines,
	singleLetterHash: singleLetterHash,
	getGraphemeBreakType: getGraphemeBreakType,
	breakBetweenGraphemeBreakType: breakBetweenGraphemeBreakType,
	get GraphemeBreakType () { return GraphemeBreakType; },
	getLeftDeleteOffset: getLeftDeleteOffset
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
let safeProcess;
// Native sandbox environment
if (typeof globals.vscode !== 'undefined' && typeof globals.vscode.process !== 'undefined') {
    const sandboxProcess = globals.vscode.process;
    safeProcess = {
        get platform() { return sandboxProcess.platform; },
        get env() { return sandboxProcess.env; },
        cwd() { return sandboxProcess.cwd(); },
        nextTick(callback) { return setImmediate(callback); }
    };
}
// Native node.js environment
else if (typeof process !== 'undefined') {
    safeProcess = {
        get platform() { return process.platform; },
        get env() { return process.env; },
        cwd() { return process.env['VSCODE_CWD'] || process.cwd(); },
        nextTick(callback) { return process.nextTick(callback); }
    };
}
// Web environment
else {
    safeProcess = {
        // Supported
        get platform() { return isWindows ? 'win32' : isMacintosh ? 'darwin' : 'linux'; },
        nextTick(callback) { return setImmediate(callback); },
        // Unsupported
        get env() { return {}; },
        cwd() { return '/'; }
    };
}
/**
 * Provides safe access to the `cwd` property in node.js, sandboxed or web
 * environments.
 *
 * Note: in web, this property is hardcoded to be `/`.
 */
const cwd = safeProcess.cwd;
/**
 * Provides safe access to the `env` property in node.js, sandboxed or web
 * environments.
 *
 * Note: in web, this property is hardcoded to be `{}`.
 */
const env = safeProcess.env;
/**
 * Provides safe access to the `platform` property in node.js, sandboxed or web
 * environments.
 */
const platform = safeProcess.platform;
/**
 * Provides safe access to the `nextTick` method in node.js, sandboxed or web
 * environments.
 */
const nextTick = safeProcess.nextTick;

var process$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	cwd: cwd,
	env: env,
	platform: platform,
	nextTick: nextTick
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const CHAR_UPPERCASE_A = 65; /* A */
const CHAR_LOWERCASE_A = 97; /* a */
const CHAR_UPPERCASE_Z = 90; /* Z */
const CHAR_LOWERCASE_Z = 122; /* z */
const CHAR_DOT = 46; /* . */
const CHAR_FORWARD_SLASH = 47; /* / */
const CHAR_BACKWARD_SLASH = 92; /* \ */
const CHAR_COLON = 58; /* : */
const CHAR_QUESTION_MARK = 63; /* ? */
class ErrorInvalidArgType extends Error {
    constructor(name, expected, actual) {
        // determiner: 'must be' or 'must not be'
        let determiner;
        if (typeof expected === 'string' && expected.indexOf('not ') === 0) {
            determiner = 'must not be';
            expected = expected.replace(/^not /, '');
        }
        else {
            determiner = 'must be';
        }
        const type = name.indexOf('.') !== -1 ? 'property' : 'argument';
        let msg = `The "${name}" ${type} ${determiner} of type ${expected}`;
        msg += `. Received type ${typeof actual}`;
        super(msg);
        this.code = 'ERR_INVALID_ARG_TYPE';
    }
}
function validateString(value, name) {
    if (typeof value !== 'string') {
        throw new ErrorInvalidArgType(name, 'string', value);
    }
}
function isPathSeparator$1(code) {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
}
function isPosixPathSeparator(code) {
    return code === CHAR_FORWARD_SLASH;
}
function isWindowsDeviceRoot(code) {
    return code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z ||
        code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z;
}
// Resolves . and .. elements in a path with directory names
function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
    let res = '';
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code = 0;
    for (let i = 0; i <= path.length; ++i) {
        if (i < path.length) {
            code = path.charCodeAt(i);
        }
        else if (isPathSeparator(code)) {
            break;
        }
        else {
            code = CHAR_FORWARD_SLASH;
        }
        if (isPathSeparator(code)) {
            if (lastSlash === i - 1 || dots === 1) ;
            else if (dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 ||
                    res.charCodeAt(res.length - 1) !== CHAR_DOT ||
                    res.charCodeAt(res.length - 2) !== CHAR_DOT) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = '';
                            lastSegmentLength = 0;
                        }
                        else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                    else if (res.length !== 0) {
                        res = '';
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    res += res.length > 0 ? `${separator}..` : '..';
                    lastSegmentLength = 2;
                }
            }
            else {
                if (res.length > 0) {
                    res += `${separator}${path.slice(lastSlash + 1, i)}`;
                }
                else {
                    res = path.slice(lastSlash + 1, i);
                }
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        }
        else if (code === CHAR_DOT && dots !== -1) {
            ++dots;
        }
        else {
            dots = -1;
        }
    }
    return res;
}
function _format(sep, pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
        throw new ErrorInvalidArgType('pathObject', 'Object', pathObject);
    }
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base ||
        `${pathObject.name || ''}${pathObject.ext || ''}`;
    if (!dir) {
        return base;
    }
    return dir === pathObject.root ? `${dir}${base}` : `${dir}${sep}${base}`;
}
const win32 = {
    // path.resolve([from ...], to)
    resolve(...pathSegments) {
        let resolvedDevice = '';
        let resolvedTail = '';
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= -1; i--) {
            let path;
            if (i >= 0) {
                path = pathSegments[i];
                validateString(path, 'path');
                // Skip empty entries
                if (path.length === 0) {
                    continue;
                }
            }
            else if (resolvedDevice.length === 0) {
                path = cwd();
            }
            else {
                // Windows has the concept of drive-specific current working
                // directories. If we've resolved a drive letter but not yet an
                // absolute path, get cwd for that drive, or the process cwd if
                // the drive cwd is not available. We're sure the device is not
                // a UNC path at this points, because UNC paths are always absolute.
                path = env[`=${resolvedDevice}`] || cwd();
                // Verify that a cwd was found and that it actually points
                // to our drive. If not, default to the drive's root.
                if (path === undefined ||
                    path.slice(0, 2).toLowerCase() !== resolvedDevice.toLowerCase() &&
                        path.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
                    path = `${resolvedDevice}\\`;
                }
            }
            const len = path.length;
            let rootEnd = 0;
            let device = '';
            let isAbsolute = false;
            const code = path.charCodeAt(0);
            // Try to match a root
            if (len === 1) {
                if (isPathSeparator$1(code)) {
                    // `path` contains just a path separator
                    rootEnd = 1;
                    isAbsolute = true;
                }
            }
            else if (isPathSeparator$1(code)) {
                // Possible UNC root
                // If we started with a separator, we know we at least have an
                // absolute path of some kind (UNC or otherwise)
                isAbsolute = true;
                if (isPathSeparator$1(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    while (j < len && !isPathSeparator$1(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        while (j < len && isPathSeparator$1(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            while (j < len && !isPathSeparator$1(path.charCodeAt(j))) {
                                j++;
                            }
                            if (j === len || j !== last) {
                                // We matched a UNC root
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                }
                else {
                    rootEnd = 1;
                }
            }
            else if (isWindowsDeviceRoot(code) &&
                path.charCodeAt(1) === CHAR_COLON) {
                // Possible device root
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2 && isPathSeparator$1(path.charCodeAt(2))) {
                    // Treat separator following drive name as an absolute path
                    // indicator
                    isAbsolute = true;
                    rootEnd = 3;
                }
            }
            if (device.length > 0) {
                if (resolvedDevice.length > 0) {
                    if (device.toLowerCase() !== resolvedDevice.toLowerCase()) {
                        // This path points to another device so it is not applicable
                        continue;
                    }
                }
                else {
                    resolvedDevice = device;
                }
            }
            if (resolvedAbsolute) {
                if (resolvedDevice.length > 0) {
                    break;
                }
            }
            else {
                resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
                resolvedAbsolute = isAbsolute;
                if (isAbsolute && resolvedDevice.length > 0) {
                    break;
                }
            }
        }
        // At this point the path should be resolved to a full absolute path,
        // but handle relative paths to be safe (might happen when process.cwd()
        // fails)
        // Normalize the tail path
        resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, '\\', isPathSeparator$1);
        return resolvedAbsolute ?
            `${resolvedDevice}\\${resolvedTail}` :
            `${resolvedDevice}${resolvedTail}` || '.';
    },
    normalize(path) {
        validateString(path, 'path');
        const len = path.length;
        if (len === 0) {
            return '.';
        }
        let rootEnd = 0;
        let device;
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        // Try to match a root
        if (len === 1) {
            // `path` contains just a single char, exit early to avoid
            // unnecessary work
            return isPosixPathSeparator(code) ? '\\' : path;
        }
        if (isPathSeparator$1(code)) {
            // Possible UNC root
            // If we started with a separator, we know we at least have an absolute
            // path of some kind (UNC or otherwise)
            isAbsolute = true;
            if (isPathSeparator$1(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                while (j < len && !isPathSeparator$1(path.charCodeAt(j))) {
                    j++;
                }
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    while (j < len && isPathSeparator$1(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        while (j < len && !isPathSeparator$1(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j === len) {
                            // We matched a UNC root only
                            // Return the normalized version of the UNC root since there
                            // is nothing left to process
                            return `\\\\${firstPart}\\${path.slice(last)}\\`;
                        }
                        if (j !== last) {
                            // We matched a UNC root with leftovers
                            device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                            rootEnd = j;
                        }
                    }
                }
            }
            else {
                rootEnd = 1;
            }
        }
        else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
            // Possible device root
            device = path.slice(0, 2);
            rootEnd = 2;
            if (len > 2 && isPathSeparator$1(path.charCodeAt(2))) {
                // Treat separator following drive name as an absolute path
                // indicator
                isAbsolute = true;
                rootEnd = 3;
            }
        }
        let tail = rootEnd < len ?
            normalizeString(path.slice(rootEnd), !isAbsolute, '\\', isPathSeparator$1) :
            '';
        if (tail.length === 0 && !isAbsolute) {
            tail = '.';
        }
        if (tail.length > 0 && isPathSeparator$1(path.charCodeAt(len - 1))) {
            tail += '\\';
        }
        if (device === undefined) {
            return isAbsolute ? `\\${tail}` : tail;
        }
        return isAbsolute ? `${device}\\${tail}` : `${device}${tail}`;
    },
    isAbsolute(path) {
        validateString(path, 'path');
        const len = path.length;
        if (len === 0) {
            return false;
        }
        const code = path.charCodeAt(0);
        return isPathSeparator$1(code) ||
            // Possible device root
            len > 2 &&
                isWindowsDeviceRoot(code) &&
                path.charCodeAt(1) === CHAR_COLON &&
                isPathSeparator$1(path.charCodeAt(2));
    },
    join(...paths) {
        if (paths.length === 0) {
            return '.';
        }
        let joined;
        let firstPart;
        for (let i = 0; i < paths.length; ++i) {
            const arg = paths[i];
            validateString(arg, 'path');
            if (arg.length > 0) {
                if (joined === undefined) {
                    joined = firstPart = arg;
                }
                else {
                    joined += `\\${arg}`;
                }
            }
        }
        if (joined === undefined) {
            return '.';
        }
        // Make sure that the joined path doesn't start with two slashes, because
        // normalize() will mistake it for an UNC path then.
        //
        // This step is skipped when it is very clear that the user actually
        // intended to point at an UNC path. This is assumed when the first
        // non-empty string arguments starts with exactly two slashes followed by
        // at least one more non-slash character.
        //
        // Note that for normalize() to treat a path as an UNC path it needs to
        // have at least 2 components, so we don't filter for that here.
        // This means that the user can use join to construct UNC paths from
        // a server name and a share name; for example:
        //   path.join('//server', 'share') -> '\\\\server\\share\\')
        let needsReplace = true;
        let slashCount = 0;
        if (typeof firstPart === 'string' && isPathSeparator$1(firstPart.charCodeAt(0))) {
            ++slashCount;
            const firstLen = firstPart.length;
            if (firstLen > 1 && isPathSeparator$1(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator$1(firstPart.charCodeAt(2))) {
                        ++slashCount;
                    }
                    else {
                        // We matched a UNC path in the first part
                        needsReplace = false;
                    }
                }
            }
        }
        if (needsReplace) {
            // Find any more consecutive slashes we need to replace
            while (slashCount < joined.length &&
                isPathSeparator$1(joined.charCodeAt(slashCount))) {
                slashCount++;
            }
            // Replace the slashes if needed
            if (slashCount >= 2) {
                joined = `\\${joined.slice(slashCount)}`;
            }
        }
        return win32.normalize(joined);
    },
    // It will solve the relative path from `from` to `to`, for instance:
    //  from = 'C:\\orandea\\test\\aaa'
    //  to = 'C:\\orandea\\impl\\bbb'
    // The output of the function should be: '..\\..\\impl\\bbb'
    relative(from, to) {
        validateString(from, 'from');
        validateString(to, 'to');
        if (from === to) {
            return '';
        }
        const fromOrig = win32.resolve(from);
        const toOrig = win32.resolve(to);
        if (fromOrig === toOrig) {
            return '';
        }
        from = fromOrig.toLowerCase();
        to = toOrig.toLowerCase();
        if (from === to) {
            return '';
        }
        // Trim any leading backslashes
        let fromStart = 0;
        while (fromStart < from.length &&
            from.charCodeAt(fromStart) === CHAR_BACKWARD_SLASH) {
            fromStart++;
        }
        // Trim trailing backslashes (applicable to UNC paths only)
        let fromEnd = from.length;
        while (fromEnd - 1 > fromStart &&
            from.charCodeAt(fromEnd - 1) === CHAR_BACKWARD_SLASH) {
            fromEnd--;
        }
        const fromLen = fromEnd - fromStart;
        // Trim any leading backslashes
        let toStart = 0;
        while (toStart < to.length &&
            to.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
            toStart++;
        }
        // Trim trailing backslashes (applicable to UNC paths only)
        let toEnd = to.length;
        while (toEnd - 1 > toStart &&
            to.charCodeAt(toEnd - 1) === CHAR_BACKWARD_SLASH) {
            toEnd--;
        }
        const toLen = toEnd - toStart;
        // Compare paths to find the longest common path from root
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for (; i < length; i++) {
            const fromCode = from.charCodeAt(fromStart + i);
            if (fromCode !== to.charCodeAt(toStart + i)) {
                break;
            }
            else if (fromCode === CHAR_BACKWARD_SLASH) {
                lastCommonSep = i;
            }
        }
        // We found a mismatch before the first common path separator was seen, so
        // return the original `to`.
        if (i !== length) {
            if (lastCommonSep === -1) {
                return toOrig;
            }
        }
        else {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
                    // We get here if `from` is the exact base path for `to`.
                    // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
                    return toOrig.slice(toStart + i + 1);
                }
                if (i === 2) {
                    // We get here if `from` is the device root.
                    // For example: from='C:\\'; to='C:\\foo'
                    return toOrig.slice(toStart + i);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH) {
                    // We get here if `to` is the exact base path for `from`.
                    // For example: from='C:\\foo\\bar'; to='C:\\foo'
                    lastCommonSep = i;
                }
                else if (i === 2) {
                    // We get here if `to` is the device root.
                    // For example: from='C:\\foo\\bar'; to='C:\\'
                    lastCommonSep = 3;
                }
            }
            if (lastCommonSep === -1) {
                lastCommonSep = 0;
            }
        }
        let out = '';
        // Generate the relative path based on the path difference between `to` and
        // `from`
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
                out += out.length === 0 ? '..' : '\\..';
            }
        }
        toStart += lastCommonSep;
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0) {
            return `${out}${toOrig.slice(toStart, toEnd)}`;
        }
        if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
            ++toStart;
        }
        return toOrig.slice(toStart, toEnd);
    },
    toNamespacedPath(path) {
        // Note: this will *probably* throw somewhere.
        if (typeof path !== 'string') {
            return path;
        }
        if (path.length === 0) {
            return '';
        }
        const resolvedPath = win32.resolve(path);
        if (resolvedPath.length <= 2) {
            return path;
        }
        if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH) {
            // Possible UNC root
            if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== CHAR_QUESTION_MARK && code !== CHAR_DOT) {
                    // Matched non-long UNC root, convert the path to a long UNC path
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        }
        else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0)) &&
            resolvedPath.charCodeAt(1) === CHAR_COLON &&
            resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
            // Matched device root, convert the path to a long UNC path
            return `\\\\?\\${resolvedPath}`;
        }
        return path;
    },
    dirname(path) {
        validateString(path, 'path');
        const len = path.length;
        if (len === 0) {
            return '.';
        }
        let rootEnd = -1;
        let offset = 0;
        const code = path.charCodeAt(0);
        if (len === 1) {
            // `path` contains just a path separator, exit early to avoid
            // unnecessary work or a dot.
            return isPathSeparator$1(code) ? path : '.';
        }
        // Try to match a root
        if (isPathSeparator$1(code)) {
            // Possible UNC root
            rootEnd = offset = 1;
            if (isPathSeparator$1(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                while (j < len && !isPathSeparator$1(path.charCodeAt(j))) {
                    j++;
                }
                if (j < len && j !== last) {
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    while (j < len && isPathSeparator$1(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        while (j < len && !isPathSeparator$1(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j === len) {
                            // We matched a UNC root only
                            return path;
                        }
                        if (j !== last) {
                            // We matched a UNC root with leftovers
                            // Offset by 1 to include the separator after the UNC root to
                            // treat it as a "normal root" on top of a (UNC) root
                            rootEnd = offset = j + 1;
                        }
                    }
                }
            }
            // Possible device root
        }
        else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
            rootEnd = len > 2 && isPathSeparator$1(path.charCodeAt(2)) ? 3 : 2;
            offset = rootEnd;
        }
        let end = -1;
        let matchedSlash = true;
        for (let i = len - 1; i >= offset; --i) {
            if (isPathSeparator$1(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }
        if (end === -1) {
            if (rootEnd === -1) {
                return '.';
            }
            end = rootEnd;
        }
        return path.slice(0, end);
    },
    basename(path, ext) {
        if (ext !== undefined) {
            validateString(ext, 'ext');
        }
        validateString(path, 'path');
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2 &&
            isWindowsDeviceRoot(path.charCodeAt(0)) &&
            path.charCodeAt(1) === CHAR_COLON) {
            start = 2;
        }
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext === path) {
                return '';
            }
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= start; --i) {
                const code = path.charCodeAt(i);
                if (isPathSeparator$1(code)) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        }
                        else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end) {
                end = firstNonSlashEnd;
            }
            else if (end === -1) {
                end = path.length;
            }
            return path.slice(start, end);
        }
        for (i = path.length - 1; i >= start; --i) {
            if (isPathSeparator$1(path.charCodeAt(i))) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            }
            else if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // path component
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) {
            return '';
        }
        return path.slice(start, end);
    },
    extname(path) {
        validateString(path, 'path');
        let start = 0;
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2 &&
            path.charCodeAt(1) === CHAR_COLON &&
            isWindowsDeviceRoot(path.charCodeAt(0))) {
            start = startPart = 2;
        }
        for (let i = path.length - 1; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (isPathSeparator$1(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) {
                    startDot = i;
                }
                else if (preDotState !== 1) {
                    preDotState = 1;
                }
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 &&
                startDot === end - 1 &&
                startDot === startPart + 1)) {
            return '';
        }
        return path.slice(startDot, end);
    },
    format: _format.bind(null, '\\'),
    parse(path) {
        validateString(path, 'path');
        const ret = { root: '', dir: '', base: '', ext: '', name: '' };
        if (path.length === 0) {
            return ret;
        }
        const len = path.length;
        let rootEnd = 0;
        let code = path.charCodeAt(0);
        if (len === 1) {
            if (isPathSeparator$1(code)) {
                // `path` contains just a path separator, exit early to avoid
                // unnecessary work
                ret.root = ret.dir = path;
                return ret;
            }
            ret.base = ret.name = path;
            return ret;
        }
        // Try to match a root
        if (isPathSeparator$1(code)) {
            // Possible UNC root
            rootEnd = 1;
            if (isPathSeparator$1(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                while (j < len && !isPathSeparator$1(path.charCodeAt(j))) {
                    j++;
                }
                if (j < len && j !== last) {
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    while (j < len && isPathSeparator$1(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        while (j < len && !isPathSeparator$1(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j === len) {
                            // We matched a UNC root only
                            rootEnd = j;
                        }
                        else if (j !== last) {
                            // We matched a UNC root with leftovers
                            rootEnd = j + 1;
                        }
                    }
                }
            }
        }
        else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
            // Possible device root
            if (len <= 2) {
                // `path` contains just a drive root, exit early to avoid
                // unnecessary work
                ret.root = ret.dir = path;
                return ret;
            }
            rootEnd = 2;
            if (isPathSeparator$1(path.charCodeAt(2))) {
                if (len === 3) {
                    // `path` contains just a drive root, exit early to avoid
                    // unnecessary work
                    ret.root = ret.dir = path;
                    return ret;
                }
                rootEnd = 3;
            }
        }
        if (rootEnd > 0) {
            ret.root = path.slice(0, rootEnd);
        }
        let startDot = -1;
        let startPart = rootEnd;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Get non-dir info
        for (; i >= rootEnd; --i) {
            code = path.charCodeAt(i);
            if (isPathSeparator$1(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) {
                    startDot = i;
                }
                else if (preDotState !== 1) {
                    preDotState = 1;
                }
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (end !== -1) {
            if (startDot === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                    startDot === end - 1 &&
                    startDot === startPart + 1)) {
                ret.base = ret.name = path.slice(startPart, end);
            }
            else {
                ret.name = path.slice(startPart, startDot);
                ret.base = path.slice(startPart, end);
                ret.ext = path.slice(startDot, end);
            }
        }
        // If the directory is the root, use the entire root as the `dir` including
        // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
        // trailing slash (`C:\abc\def` -> `C:\abc`).
        if (startPart > 0 && startPart !== rootEnd) {
            ret.dir = path.slice(0, startPart - 1);
        }
        else {
            ret.dir = ret.root;
        }
        return ret;
    },
    sep: '\\',
    delimiter: ';',
    win32: null,
    posix: null
};
const posix = {
    // path.resolve([from ...], to)
    resolve(...pathSegments) {
        let resolvedPath = '';
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            const path = i >= 0 ? pathSegments[i] : cwd();
            validateString(path, 'path');
            // Skip empty entries
            if (path.length === 0) {
                continue;
            }
            resolvedPath = `${path}/${resolvedPath}`;
            resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        // Normalize the path
        resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, '/', isPosixPathSeparator);
        if (resolvedAbsolute) {
            return `/${resolvedPath}`;
        }
        return resolvedPath.length > 0 ? resolvedPath : '.';
    },
    normalize(path) {
        validateString(path, 'path');
        if (path.length === 0) {
            return '.';
        }
        const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        const trailingSeparator = path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH;
        // Normalize the path
        path = normalizeString(path, !isAbsolute, '/', isPosixPathSeparator);
        if (path.length === 0) {
            if (isAbsolute) {
                return '/';
            }
            return trailingSeparator ? './' : '.';
        }
        if (trailingSeparator) {
            path += '/';
        }
        return isAbsolute ? `/${path}` : path;
    },
    isAbsolute(path) {
        validateString(path, 'path');
        return path.length > 0 && path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    },
    join(...paths) {
        if (paths.length === 0) {
            return '.';
        }
        let joined;
        for (let i = 0; i < paths.length; ++i) {
            const arg = paths[i];
            validateString(arg, 'path');
            if (arg.length > 0) {
                if (joined === undefined) {
                    joined = arg;
                }
                else {
                    joined += `/${arg}`;
                }
            }
        }
        if (joined === undefined) {
            return '.';
        }
        return posix.normalize(joined);
    },
    relative(from, to) {
        validateString(from, 'from');
        validateString(to, 'to');
        if (from === to) {
            return '';
        }
        // Trim leading forward slashes.
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to) {
            return '';
        }
        const fromStart = 1;
        const fromEnd = from.length;
        const fromLen = fromEnd - fromStart;
        const toStart = 1;
        const toLen = to.length - toStart;
        // Compare paths to find the longest common path from root
        const length = (fromLen < toLen ? fromLen : toLen);
        let lastCommonSep = -1;
        let i = 0;
        for (; i < length; i++) {
            const fromCode = from.charCodeAt(fromStart + i);
            if (fromCode !== to.charCodeAt(toStart + i)) {
                break;
            }
            else if (fromCode === CHAR_FORWARD_SLASH) {
                lastCommonSep = i;
            }
        }
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH) {
                    // We get here if `from` is the exact base path for `to`.
                    // For example: from='/foo/bar'; to='/foo/bar/baz'
                    return to.slice(toStart + i + 1);
                }
                if (i === 0) {
                    // We get here if `from` is the root
                    // For example: from='/'; to='/foo'
                    return to.slice(toStart + i);
                }
            }
            else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH) {
                    // We get here if `to` is the exact base path for `from`.
                    // For example: from='/foo/bar/baz'; to='/foo/bar'
                    lastCommonSep = i;
                }
                else if (i === 0) {
                    // We get here if `to` is the root.
                    // For example: from='/foo/bar'; to='/'
                    lastCommonSep = 0;
                }
            }
        }
        let out = '';
        // Generate the relative path based on the path difference between `to`
        // and `from`.
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                out += out.length === 0 ? '..' : '/..';
            }
        }
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts.
        return `${out}${to.slice(toStart + lastCommonSep)}`;
    },
    toNamespacedPath(path) {
        // Non-op on posix systems
        return path;
    },
    dirname(path) {
        validateString(path, 'path');
        if (path.length === 0) {
            return '.';
        }
        const hasRoot = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        let end = -1;
        let matchedSlash = true;
        for (let i = path.length - 1; i >= 1; --i) {
            if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }
        if (end === -1) {
            return hasRoot ? '/' : '.';
        }
        if (hasRoot && end === 1) {
            return '//';
        }
        return path.slice(0, end);
    },
    basename(path, ext) {
        if (ext !== undefined) {
            validateString(ext, 'ext');
        }
        validateString(path, 'path');
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext === path) {
                return '';
            }
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= 0; --i) {
                const code = path.charCodeAt(i);
                if (code === CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        }
                        else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end) {
                end = firstNonSlashEnd;
            }
            else if (end === -1) {
                end = path.length;
            }
            return path.slice(start, end);
        }
        for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            }
            else if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // path component
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) {
            return '';
        }
        return path.slice(start, end);
    },
    extname(path) {
        validateString(path, 'path');
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        for (let i = path.length - 1; i >= 0; --i) {
            const code = path.charCodeAt(i);
            if (code === CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) {
                    startDot = i;
                }
                else if (preDotState !== 1) {
                    preDotState = 1;
                }
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 &&
                startDot === end - 1 &&
                startDot === startPart + 1)) {
            return '';
        }
        return path.slice(startDot, end);
    },
    format: _format.bind(null, '/'),
    parse(path) {
        validateString(path, 'path');
        const ret = { root: '', dir: '', base: '', ext: '', name: '' };
        if (path.length === 0) {
            return ret;
        }
        const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        let start;
        if (isAbsolute) {
            ret.root = '/';
            start = 1;
        }
        else {
            start = 0;
        }
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Get non-dir info
        for (; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (code === CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) {
                    startDot = i;
                }
                else if (preDotState !== 1) {
                    preDotState = 1;
                }
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (end !== -1) {
            const start = startPart === 0 && isAbsolute ? 1 : startPart;
            if (startDot === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                    startDot === end - 1 &&
                    startDot === startPart + 1)) {
                ret.base = ret.name = path.slice(start, end);
            }
            else {
                ret.name = path.slice(start, startDot);
                ret.base = path.slice(start, end);
                ret.ext = path.slice(startDot, end);
            }
        }
        if (startPart > 0) {
            ret.dir = path.slice(0, startPart - 1);
        }
        else if (isAbsolute) {
            ret.dir = '/';
        }
        return ret;
    },
    sep: '/',
    delimiter: ':',
    win32: null,
    posix: null
};
posix.win32 = win32.win32 = win32;
posix.posix = win32.posix = posix;
const normalize = (platform === 'win32' ? win32.normalize : posix.normalize);
const isAbsolute = (platform === 'win32' ? win32.isAbsolute : posix.isAbsolute);
const join = (platform === 'win32' ? win32.join : posix.join);
const resolve = (platform === 'win32' ? win32.resolve : posix.resolve);
const relative = (platform === 'win32' ? win32.relative : posix.relative);
const dirname$1 = (platform === 'win32' ? win32.dirname : posix.dirname);
const basename$1 = (platform === 'win32' ? win32.basename : posix.basename);
const extname$1 = (platform === 'win32' ? win32.extname : posix.extname);
const format = (platform === 'win32' ? win32.format : posix.format);
const parse$1 = (platform === 'win32' ? win32.parse : posix.parse);
const toNamespacedPath = (platform === 'win32' ? win32.toNamespacedPath : posix.toNamespacedPath);
const sep = (platform === 'win32' ? win32.sep : posix.sep);
const delimiter = (platform === 'win32' ? win32.delimiter : posix.delimiter);

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @returns whether the provided parameter is a JavaScript Array or not.
 */
function isArray(array) {
    return Array.isArray(array);
}
/**
 * @returns whether the provided parameter is a JavaScript String or not.
 */
function isString(str) {
    return (typeof str === 'string');
}
/**
 * @returns whether the provided parameter is a JavaScript Array and each element in the array is a string.
 */
function isStringArray(value) {
    return Array.isArray(value) && value.every(elem => isString(elem));
}
/**
 *
 * @returns whether the provided parameter is of type `object` but **not**
 *	`null`, an `array`, a `regexp`, nor a `date`.
 */
function isObject(obj) {
    // The method can't do a type cast since there are type (like strings) which
    // are subclasses of any put not positvely matched by the function. Hence type
    // narrowing results in wrong results.
    return typeof obj === 'object'
        && obj !== null
        && !Array.isArray(obj)
        && !(obj instanceof RegExp)
        && !(obj instanceof Date);
}
/**
 * In **contrast** to just checking `typeof` this will return `false` for `NaN`.
 * @returns whether the provided parameter is a JavaScript Number or not.
 */
function isNumber(obj) {
    return (typeof obj === 'number' && !isNaN(obj));
}
/**
 * @returns whether the provided parameter is an Iterable, casting to the given generic
 */
function isIterable(obj) {
    return !!obj && typeof obj[Symbol.iterator] === 'function';
}
/**
 * @returns whether the provided parameter is a JavaScript Boolean or not.
 */
function isBoolean(obj) {
    return (obj === true || obj === false);
}
/**
 * @returns whether the provided parameter is undefined.
 */
function isUndefined(obj) {
    return (typeof obj === 'undefined');
}
/**
 * @returns whether the provided parameter is defined.
 */
function isDefined(arg) {
    return !isUndefinedOrNull(arg);
}
/**
 * @returns whether the provided parameter is undefined or null.
 */
function isUndefinedOrNull(obj) {
    return (isUndefined(obj) || obj === null);
}
function assertType(condition, type) {
    if (!condition) {
        throw new Error(type ? `Unexpected type, expected '${type}'` : 'Unexpected type');
    }
}
/**
 * Asserts that the argument passed in is neither undefined nor null.
 */
function assertIsDefined(arg) {
    if (isUndefinedOrNull(arg)) {
        throw new Error('Assertion Failed: argument is undefined or null');
    }
    return arg;
}
function assertAllDefined(...args) {
    const result = [];
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (isUndefinedOrNull(arg)) {
            throw new Error(`Assertion Failed: argument at index ${i} is undefined or null`);
        }
        result.push(arg);
    }
    return result;
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @returns whether the provided parameter is an empty JavaScript Object or not.
 */
function isEmptyObject(obj) {
    if (!isObject(obj)) {
        return false;
    }
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
/**
 * @returns whether the provided parameter is a JavaScript Function or not.
 */
function isFunction(obj) {
    return (typeof obj === 'function');
}
/**
 * @returns whether the provided parameters is are JavaScript Function or not.
 */
function areFunctions(...objects) {
    return objects.length > 0 && objects.every(isFunction);
}
function validateConstraints(args, constraints) {
    const len = Math.min(args.length, constraints.length);
    for (let i = 0; i < len; i++) {
        validateConstraint(args[i], constraints[i]);
    }
}
function validateConstraint(arg, constraint) {
    if (isString(constraint)) {
        if (typeof arg !== constraint) {
            throw new Error(`argument does not match constraint: typeof ${constraint}`);
        }
    }
    else if (isFunction(constraint)) {
        try {
            if (arg instanceof constraint) {
                return;
            }
        }
        catch (_a) {
            // ignore
        }
        if (!isUndefinedOrNull(arg) && arg.constructor === constraint) {
            return;
        }
        if (constraint.length === 1 && constraint.call(undefined, arg) === true) {
            return;
        }
        throw new Error(`argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true`);
    }
}
function getAllPropertyNames(obj) {
    let res = [];
    let proto = Object.getPrototypeOf(obj);
    while (Object.prototype !== proto) {
        res = res.concat(Object.getOwnPropertyNames(proto));
        proto = Object.getPrototypeOf(proto);
    }
    return res;
}
function getAllMethodNames(obj) {
    const methods = [];
    for (const prop of getAllPropertyNames(obj)) {
        if (typeof obj[prop] === 'function') {
            methods.push(prop);
        }
    }
    return methods;
}
function createProxyObject(methodNames, invoke) {
    const createProxyMethod = (method) => {
        return function () {
            const args = Array.prototype.slice.call(arguments, 0);
            return invoke(method, args);
        };
    };
    let result = {};
    for (const methodName of methodNames) {
        result[methodName] = createProxyMethod(methodName);
    }
    return result;
}
/**
 * Converts null to undefined, passes all other values through.
 */
function withNullAsUndefined(x) {
    return x === null ? undefined : x;
}
/**
 * Converts undefined to null, passes all other values through.
 */
function withUndefinedAsNull(x) {
    return typeof x === 'undefined' ? null : x;
}
function NotImplementedProxy(name) {
    return class {
        constructor() {
            return new Proxy({}, {
                get(target, prop) {
                    if (target[prop]) {
                        return target[prop];
                    }
                    throw new Error(`Not Implemented: ${name}->${String(prop)}`);
                }
            });
        }
    };
}
function assertNever(value, message = 'Unreachable') {
    throw new Error(message);
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function isPathSeparator(code) {
    return code === 47 /* Slash */ || code === 92 /* Backslash */;
}
/**
 * Takes a Windows OS path and changes backward slashes to forward slashes.
 * This should only be done for OS paths from Windows (or user provided paths potentially from Windows).
 * Using it on a Linux or MaxOS path might change it.
 */
function toSlashes(osPath) {
    return osPath.replace(/[\\/]/g, posix.sep);
}
/**
 * Takes a Windows OS path (using backward or forward slashes) and turns it into a posix path:
 * - turns backward slashes into forward slashes
 * - makes it absolute if it starts with a drive letter
 * This should only be done for OS paths from Windows (or user provided paths potentially from Windows).
 * Using it on a Linux or MaxOS path might change it.
 */
function toPosixPath(osPath) {
    if (osPath.indexOf('/') === -1) {
        osPath = toSlashes(osPath);
    }
    if (/^[a-zA-Z]:(\/|$)/.test(osPath)) { // starts with a drive letter
        osPath = '/' + osPath;
    }
    return osPath;
}
/**
 * Computes the _root_ this path, like `getRoot('c:\files') === c:\`,
 * `getRoot('files:///files/path') === files:///`,
 * or `getRoot('\\server\shares\path') === \\server\shares\`
 */
function getRoot(path, sep = posix.sep) {
    if (!path) {
        return '';
    }
    const len = path.length;
    const firstLetter = path.charCodeAt(0);
    if (isPathSeparator(firstLetter)) {
        if (isPathSeparator(path.charCodeAt(1))) {
            // UNC candidate \\localhost\shares\ddd
            //               ^^^^^^^^^^^^^^^^^^^
            if (!isPathSeparator(path.charCodeAt(2))) {
                let pos = 3;
                const start = pos;
                for (; pos < len; pos++) {
                    if (isPathSeparator(path.charCodeAt(pos))) {
                        break;
                    }
                }
                if (start !== pos && !isPathSeparator(path.charCodeAt(pos + 1))) {
                    pos += 1;
                    for (; pos < len; pos++) {
                        if (isPathSeparator(path.charCodeAt(pos))) {
                            return path.slice(0, pos + 1) // consume this separator
                                .replace(/[\\/]/g, sep);
                        }
                    }
                }
            }
        }
        // /user/far
        // ^
        return sep;
    }
    else if (isWindowsDriveLetter(firstLetter)) {
        // check for windows drive letter c:\ or c:
        if (path.charCodeAt(1) === 58 /* Colon */) {
            if (isPathSeparator(path.charCodeAt(2))) {
                // C:\fff
                // ^^^
                return path.slice(0, 2) + sep;
            }
            else {
                // C:
                // ^^
                return path.slice(0, 2);
            }
        }
    }
    // check for URI
    // scheme://authority/path
    // ^^^^^^^^^^^^^^^^^^^
    let pos = path.indexOf('://');
    if (pos !== -1) {
        pos += 3; // 3 -> "://".length
        for (; pos < len; pos++) {
            if (isPathSeparator(path.charCodeAt(pos))) {
                return path.slice(0, pos + 1); // consume this separator
            }
        }
    }
    return '';
}
/**
 * Check if the path follows this pattern: `\\hostname\sharename`.
 *
 * @see https://msdn.microsoft.com/en-us/library/gg465305.aspx
 * @return A boolean indication if the path is a UNC path, on none-windows
 * always false.
 */
function isUNC(path) {
    if (!isWindows) {
        // UNC is a windows concept
        return false;
    }
    if (!path || path.length < 5) {
        // at least \\a\b
        return false;
    }
    let code = path.charCodeAt(0);
    if (code !== 92 /* Backslash */) {
        return false;
    }
    code = path.charCodeAt(1);
    if (code !== 92 /* Backslash */) {
        return false;
    }
    let pos = 2;
    const start = pos;
    for (; pos < path.length; pos++) {
        code = path.charCodeAt(pos);
        if (code === 92 /* Backslash */) {
            break;
        }
    }
    if (start === pos) {
        return false;
    }
    code = path.charCodeAt(pos + 1);
    if (isNaN(code) || code === 92 /* Backslash */) {
        return false;
    }
    return true;
}
// Reference: https://en.wikipedia.org/wiki/Filename
const WINDOWS_INVALID_FILE_CHARS = /[\\/:\*\?"<>\|]/g;
const UNIX_INVALID_FILE_CHARS = /[\\/]/g;
const WINDOWS_FORBIDDEN_NAMES = /^(con|prn|aux|clock\$|nul|lpt[0-9]|com[0-9])(\.(.*?))?$/i;
function isValidBasename(name, isWindowsOS = isWindows) {
    const invalidFileChars = isWindowsOS ? WINDOWS_INVALID_FILE_CHARS : UNIX_INVALID_FILE_CHARS;
    if (!name || name.length === 0 || /^\s+$/.test(name)) {
        return false; // require a name that is not just whitespace
    }
    invalidFileChars.lastIndex = 0; // the holy grail of software development
    if (invalidFileChars.test(name)) {
        return false; // check for certain invalid file characters
    }
    if (isWindowsOS && WINDOWS_FORBIDDEN_NAMES.test(name)) {
        return false; // check for certain invalid file names
    }
    if (name === '.' || name === '..') {
        return false; // check for reserved values
    }
    if (isWindowsOS && name[name.length - 1] === '.') {
        return false; // Windows: file cannot end with a "."
    }
    if (isWindowsOS && name.length !== name.trim().length) {
        return false; // Windows: file cannot end with a whitespace
    }
    if (name.length > 255) {
        return false; // most file systems do not allow files > 255 length
    }
    return true;
}
function isEqual$1(pathA, pathB, ignoreCase) {
    const identityEquals = (pathA === pathB);
    if (!ignoreCase || identityEquals) {
        return identityEquals;
    }
    if (!pathA || !pathB) {
        return false;
    }
    return equalsIgnoreCase(pathA, pathB);
}
function isEqualOrParent$1(base, parentCandidate, ignoreCase, separator = sep) {
    if (base === parentCandidate) {
        return true;
    }
    if (!base || !parentCandidate) {
        return false;
    }
    if (parentCandidate.length > base.length) {
        return false;
    }
    if (ignoreCase) {
        const beginsWith = startsWithIgnoreCase(base, parentCandidate);
        if (!beginsWith) {
            return false;
        }
        if (parentCandidate.length === base.length) {
            return true; // same path, different casing
        }
        let sepOffset = parentCandidate.length;
        if (parentCandidate.charAt(parentCandidate.length - 1) === separator) {
            sepOffset--; // adjust the expected sep offset in case our candidate already ends in separator character
        }
        return base.charAt(sepOffset) === separator;
    }
    if (parentCandidate.charAt(parentCandidate.length - 1) !== separator) {
        parentCandidate += separator;
    }
    return base.indexOf(parentCandidate) === 0;
}
function isWindowsDriveLetter(char0) {
    return char0 >= 65 /* A */ && char0 <= 90 /* Z */ || char0 >= 97 /* a */ && char0 <= 122 /* z */;
}
function sanitizeFilePath(candidate, cwd) {
    // Special case: allow to open a drive letter without trailing backslash
    if (isWindows && candidate.endsWith(':')) {
        candidate += sep;
    }
    // Ensure absolute
    if (!isAbsolute(candidate)) {
        candidate = join(cwd, candidate);
    }
    // Ensure normalized
    candidate = normalize(candidate);
    // Ensure no trailing slash/backslash
    if (isWindows) {
        candidate = rtrim(candidate, sep);
        // Special case: allow to open drive root ('C:\')
        if (candidate.endsWith(':')) {
            candidate += sep;
        }
    }
    else {
        candidate = rtrim(candidate, sep);
        // Special case: allow to open root ('/')
        if (!candidate) {
            candidate = sep;
        }
    }
    return candidate;
}
function isRootOrDriveLetter(path) {
    const pathNormalized = normalize(path);
    if (isWindows) {
        if (path.length > 3) {
            return false;
        }
        return hasDriveLetter(pathNormalized) &&
            (path.length === 2 || pathNormalized.charCodeAt(2) === 92 /* Backslash */);
    }
    return pathNormalized === posix.sep;
}
function hasDriveLetter(path) {
    if (isWindows) {
        return isWindowsDriveLetter(path.charCodeAt(0)) && path.charCodeAt(1) === 58 /* Colon */;
    }
    return false;
}
function getDriveLetter(path) {
    return hasDriveLetter(path) ? path[0] : undefined;
}
function indexOfPath(path, candidate, ignoreCase) {
    if (candidate.length > path.length) {
        return -1;
    }
    if (path === candidate) {
        return 0;
    }
    if (ignoreCase) {
        path = path.toLowerCase();
        candidate = candidate.toLowerCase();
    }
    return path.indexOf(candidate);
}
function parseLineAndColumnAware(rawPath) {
    const segments = rawPath.split(':'); // C:\file.txt:<line>:<column>
    let path = undefined;
    let line = undefined;
    let column = undefined;
    segments.forEach(segment => {
        const segmentAsNumber = Number(segment);
        if (!isNumber(segmentAsNumber)) {
            path = !!path ? [path, segment].join(':') : segment; // a colon can well be part of a path (e.g. C:\...)
        }
        else if (line === undefined) {
            line = segmentAsNumber;
        }
        else if (column === undefined) {
            column = segmentAsNumber;
        }
    });
    if (!path) {
        throw new Error('Format for `--goto` should be: `FILE:LINE(:COLUMN)`');
    }
    return {
        path,
        line: line !== undefined ? line : undefined,
        column: column !== undefined ? column : line !== undefined ? 1 : undefined // if we have a line, make sure column is also set
    };
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 *--------------------------------------------------------------------------------------------*/
const _schemePattern = /^\w[\w\d+.-]*$/;
const _singleSlashStart = /^\//;
const _doubleSlashStart = /^\/\//;
function _validateUri(ret, _strict) {
    // scheme, must be set
    if (!ret.scheme && _strict) {
        throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${ret.authority}", path: "${ret.path}", query: "${ret.query}", fragment: "${ret.fragment}"}`);
    }
    // scheme, https://tools.ietf.org/html/rfc3986#section-3.1
    // ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
    if (ret.scheme && !_schemePattern.test(ret.scheme)) {
        throw new Error('[UriError]: Scheme contains illegal characters.');
    }
    // path, http://tools.ietf.org/html/rfc3986#section-3.3
    // If a URI contains an authority component, then the path component
    // must either be empty or begin with a slash ("/") character.  If a URI
    // does not contain an authority component, then the path cannot begin
    // with two slash characters ("//").
    if (ret.path) {
        if (ret.authority) {
            if (!_singleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            }
        }
        else {
            if (_doubleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
            }
        }
    }
}
// for a while we allowed uris *without* schemes and this is the migration
// for them, e.g. an uri without scheme and without strict-mode warns and falls
// back to the file-scheme. that should cause the least carnage and still be a
// clear warning
function _schemeFix(scheme, _strict) {
    if (!scheme && !_strict) {
        return 'file';
    }
    return scheme;
}
// implements a bit of https://tools.ietf.org/html/rfc3986#section-5
function _referenceResolution(scheme, path) {
    // the slash-character is our 'default base' as we don't
    // support constructing URIs relative to other URIs. This
    // also means that we alter and potentially break paths.
    // see https://tools.ietf.org/html/rfc3986#section-5.1.4
    switch (scheme) {
        case 'https':
        case 'http':
        case 'file':
            if (!path) {
                path = _slash;
            }
            else if (path[0] !== _slash) {
                path = _slash + path;
            }
            break;
    }
    return path;
}
const _empty = '';
const _slash = '/';
const _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
/**
 * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
 * This class is a simple parser which creates the basic component parts
 * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
 * and encoding.
 *
 * ```txt
 *       foo://example.com:8042/over/there?name=ferret#nose
 *       \_/   \______________/\_________/ \_________/ \__/
 *        |           |            |            |        |
 *     scheme     authority       path        query   fragment
 *        |   _____________________|__
 *       / \ /                        \
 *       urn:example:animal:ferret:nose
 * ```
 */
class URI {
    /**
     * @internal
     */
    constructor(schemeOrData, authority, path, query, fragment, _strict = false) {
        if (typeof schemeOrData === 'object') {
            this.scheme = schemeOrData.scheme || _empty;
            this.authority = schemeOrData.authority || _empty;
            this.path = schemeOrData.path || _empty;
            this.query = schemeOrData.query || _empty;
            this.fragment = schemeOrData.fragment || _empty;
            // no validation because it's this URI
            // that creates uri components.
            // _validateUri(this);
        }
        else {
            this.scheme = _schemeFix(schemeOrData, _strict);
            this.authority = authority || _empty;
            this.path = _referenceResolution(this.scheme, path || _empty);
            this.query = query || _empty;
            this.fragment = fragment || _empty;
            _validateUri(this, _strict);
        }
    }
    static isUri(thing) {
        if (thing instanceof URI) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return typeof thing.authority === 'string'
            && typeof thing.fragment === 'string'
            && typeof thing.path === 'string'
            && typeof thing.query === 'string'
            && typeof thing.scheme === 'string'
            && typeof thing.fsPath === 'string'
            && typeof thing.with === 'function'
            && typeof thing.toString === 'function';
    }
    // ---- filesystem path -----------------------
    /**
     * Returns a string representing the corresponding file system path of this URI.
     * Will handle UNC paths, normalizes windows drive letters to lower-case, and uses the
     * platform specific path separator.
     *
     * * Will *not* validate the path for invalid characters and semantics.
     * * Will *not* look at the scheme of this URI.
     * * The result shall *not* be used for display purposes but for accessing a file on disk.
     *
     *
     * The *difference* to `URI#path` is the use of the platform specific separator and the handling
     * of UNC paths. See the below sample of a file-uri with an authority (UNC path).
     *
     * ```ts
        const u = URI.parse('file://server/c$/folder/file.txt')
        u.authority === 'server'
        u.path === '/shares/c$/file.txt'
        u.fsPath === '\\server\c$\folder\file.txt'
    ```
     *
     * Using `URI#path` to read a file (using fs-apis) would not be enough because parts of the path,
     * namely the server name, would be missing. Therefore `URI#fsPath` exists - it's sugar to ease working
     * with URIs that represent files on disk (`file` scheme).
     */
    get fsPath() {
        // if (this.scheme !== 'file') {
        // 	console.warn(`[UriError] calling fsPath with scheme ${this.scheme}`);
        // }
        return uriToFsPath(this, false);
    }
    // ---- modify to new -------------------------
    with(change) {
        if (!change) {
            return this;
        }
        let { scheme, authority, path, query, fragment } = change;
        if (scheme === undefined) {
            scheme = this.scheme;
        }
        else if (scheme === null) {
            scheme = _empty;
        }
        if (authority === undefined) {
            authority = this.authority;
        }
        else if (authority === null) {
            authority = _empty;
        }
        if (path === undefined) {
            path = this.path;
        }
        else if (path === null) {
            path = _empty;
        }
        if (query === undefined) {
            query = this.query;
        }
        else if (query === null) {
            query = _empty;
        }
        if (fragment === undefined) {
            fragment = this.fragment;
        }
        else if (fragment === null) {
            fragment = _empty;
        }
        if (scheme === this.scheme
            && authority === this.authority
            && path === this.path
            && query === this.query
            && fragment === this.fragment) {
            return this;
        }
        return new Uri(scheme, authority, path, query, fragment);
    }
    // ---- parse & validate ------------------------
    /**
     * Creates a new URI from a string, e.g. `http://www.msft.com/some/path`,
     * `file:///usr/home`, or `scheme:with/path`.
     *
     * @param value A string which represents an URI (see `URI#toString`).
     */
    static parse(value, _strict = false) {
        const match = _regexp.exec(value);
        if (!match) {
            return new Uri(_empty, _empty, _empty, _empty, _empty);
        }
        return new Uri(match[2] || _empty, percentDecode(match[4] || _empty), percentDecode(match[5] || _empty), percentDecode(match[7] || _empty), percentDecode(match[9] || _empty), _strict);
    }
    /**
     * Creates a new URI from a file system path, e.g. `c:\my\files`,
     * `/usr/home`, or `\\server\share\some\path`.
     *
     * The *difference* between `URI#parse` and `URI#file` is that the latter treats the argument
     * as path, not as stringified-uri. E.g. `URI.file(path)` is **not the same as**
     * `URI.parse('file://' + path)` because the path might contain characters that are
     * interpreted (# and ?). See the following sample:
     * ```ts
    const good = URI.file('/coding/c#/project1');
    good.scheme === 'file';
    good.path === '/coding/c#/project1';
    good.fragment === '';
    const bad = URI.parse('file://' + '/coding/c#/project1');
    bad.scheme === 'file';
    bad.path === '/coding/c'; // path is now broken
    bad.fragment === '/project1';
    ```
     *
     * @param path A file system path (see `URI#fsPath`)
     */
    static file(path) {
        let authority = _empty;
        // normalize to fwd-slashes on windows,
        // on other systems bwd-slashes are valid
        // filename character, eg /f\oo/ba\r.txt
        if (isWindows) {
            path = path.replace(/\\/g, _slash);
        }
        // check for authority as used in UNC shares
        // or use the path as given
        if (path[0] === _slash && path[1] === _slash) {
            const idx = path.indexOf(_slash, 2);
            if (idx === -1) {
                authority = path.substring(2);
                path = _slash;
            }
            else {
                authority = path.substring(2, idx);
                path = path.substring(idx) || _slash;
            }
        }
        return new Uri('file', authority, path, _empty, _empty);
    }
    static from(components) {
        const result = new Uri(components.scheme, components.authority, components.path, components.query, components.fragment);
        _validateUri(result, true);
        return result;
    }
    /**
     * Join a URI path with path fragments and normalizes the resulting path.
     *
     * @param uri The input URI.
     * @param pathFragment The path fragment to add to the URI path.
     * @returns The resulting URI.
     */
    static joinPath(uri, ...pathFragment) {
        if (!uri.path) {
            throw new Error(`[UriError]: cannot call joinPath on URI without path`);
        }
        let newPath;
        if (isWindows && uri.scheme === 'file') {
            newPath = URI.file(win32.join(uriToFsPath(uri, true), ...pathFragment)).path;
        }
        else {
            newPath = posix.join(uri.path, ...pathFragment);
        }
        return uri.with({ path: newPath });
    }
    static appendParams(url, params) {
        const uri = URI.parse(url);
        let query;
        console.log(uri.query, typeof URLSearchParams);
        if (typeof URLSearchParams !== 'undefined') {
            query = this._appendParamsInBrowser(uri, params);
        }
        else {
            query = this._appendParamsInCommon(uri, params);
        }
        return uri.with({ query }).toString();
    }
    static _appendParamsInBrowser(uri, params) {
        const urlSearchParams = new URLSearchParams(uri.query);
        if (typeof params === 'object') {
            for (const paramKey in params) {
                if (Object.prototype.hasOwnProperty.call(params, paramKey)) {
                    urlSearchParams.append(paramKey, params[paramKey]);
                }
            }
        }
        else {
            return `${urlSearchParams.toString()}${params}`;
        }
        return urlSearchParams.toString();
    }
    static _appendParamsInCommon(uri, params) {
        const paramList = [];
        if (typeof params === 'object') {
            for (const paramKey in params) {
                if (Object.prototype.hasOwnProperty.call(params, paramKey)) {
                    paramList.push(`${encodeURIComponentFast(paramKey, true)}=${encodeURIComponentFast(params[paramKey], true)}`);
                }
            }
        }
        return `${uri.query}&${paramList.join('&')}`;
    }
    // ---- printing/externalize ---------------------------
    /**
     * Creates a string representation for this URI. It's guaranteed that calling
     * `URI.parse` with the result of this function creates an URI which is equal
     * to this URI.
     *
     * * The result shall *not* be used for display purposes but for externalization or transport.
     * * The result will be encoded using the percentage encoding and encoding happens mostly
     * ignore the scheme-specific encoding rules.
     *
     * @param skipEncoding Do not encode the result, default is `false`
     */
    toString(skipEncoding = false) {
        return _asFormatted(this, skipEncoding);
    }
    toJSON() {
        return this;
    }
    static revive(data) {
        if (!data) {
            return data;
        }
        else if (data instanceof URI) {
            return data;
        }
        else {
            const result = new Uri(data);
            result._formatted = data.external;
            result._fsPath = data._sep === _pathSepMarker ? data.fsPath : null;
            return result;
        }
    }
}
const _pathSepMarker = isWindows ? 1 : undefined;
class Uri extends URI {
    constructor() {
        super(...arguments);
        this._formatted = null;
        this._fsPath = null;
    }
    get fsPath() {
        if (!this._fsPath) {
            this._fsPath = uriToFsPath(this, false);
        }
        return this._fsPath;
    }
    toString(skipEncoding = false) {
        if (!skipEncoding) {
            if (!this._formatted) {
                this._formatted = _asFormatted(this, false);
            }
            return this._formatted;
        }
        else {
            // we don't cache that
            return _asFormatted(this, true);
        }
    }
    toJSON() {
        const res = {
            $mid: 1 /* Uri */
        };
        // cached state
        if (this._fsPath) {
            res.fsPath = this._fsPath;
            res._sep = _pathSepMarker;
        }
        if (this._formatted) {
            res.external = this._formatted;
        }
        // uri components
        if (this.path) {
            res.path = this.path;
        }
        if (this.scheme) {
            res.scheme = this.scheme;
        }
        if (this.authority) {
            res.authority = this.authority;
        }
        if (this.query) {
            res.query = this.query;
        }
        if (this.fragment) {
            res.fragment = this.fragment;
        }
        return res;
    }
}
// reserved characters: https://tools.ietf.org/html/rfc3986#section-2.2
const encodeTable = {
    [58 /* Colon */]: '%3A',
    [47 /* Slash */]: '%2F',
    [63 /* QuestionMark */]: '%3F',
    [35 /* Hash */]: '%23',
    [91 /* OpenSquareBracket */]: '%5B',
    [93 /* CloseSquareBracket */]: '%5D',
    [64 /* AtSign */]: '%40',
    [33 /* ExclamationMark */]: '%21',
    [36 /* DollarSign */]: '%24',
    [38 /* Ampersand */]: '%26',
    [39 /* SingleQuote */]: '%27',
    [40 /* OpenParen */]: '%28',
    [41 /* CloseParen */]: '%29',
    [42 /* Asterisk */]: '%2A',
    [43 /* Plus */]: '%2B',
    [44 /* Comma */]: '%2C',
    [59 /* Semicolon */]: '%3B',
    [61 /* Equals */]: '%3D',
    [32 /* Space */]: '%20',
};
function encodeURIComponentFast(uriComponent, allowSlash) {
    let res = undefined;
    let nativeEncodePos = -1;
    for (let pos = 0; pos < uriComponent.length; pos++) {
        const code = uriComponent.charCodeAt(pos);
        // unreserved characters: https://tools.ietf.org/html/rfc3986#section-2.3
        if ((code >= 97 /* a */ && code <= 122 /* z */)
            || (code >= 65 /* A */ && code <= 90 /* Z */)
            || (code >= 48 /* Digit0 */ && code <= 57 /* Digit9 */)
            || code === 45 /* Dash */
            || code === 46 /* Period */
            || code === 95 /* Underline */
            || code === 126 /* Tilde */
            || (allowSlash && code === 47 /* Slash */)) {
            // check if we are delaying native encode
            if (nativeEncodePos !== -1) {
                res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                nativeEncodePos = -1;
            }
            // check if we write into a new string (by default we try to return the param)
            if (res !== undefined) {
                res += uriComponent.charAt(pos);
            }
        }
        else {
            // encoding needed, we need to allocate a new string
            if (res === undefined) {
                res = uriComponent.substr(0, pos);
            }
            // check with default table first
            const escaped = encodeTable[code];
            if (escaped !== undefined) {
                // check if we are delaying native encode
                if (nativeEncodePos !== -1) {
                    res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                    nativeEncodePos = -1;
                }
                // append escaped variant to result
                res += escaped;
            }
            else if (nativeEncodePos === -1) {
                // use native encode only when needed
                nativeEncodePos = pos;
            }
        }
    }
    if (nativeEncodePos !== -1) {
        res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
    }
    return res !== undefined ? res : uriComponent;
}
function encodeURIComponentMinimal(path) {
    let res = undefined;
    for (let pos = 0; pos < path.length; pos++) {
        const code = path.charCodeAt(pos);
        if (code === 35 /* Hash */ || code === 63 /* QuestionMark */) {
            if (res === undefined) {
                res = path.substr(0, pos);
            }
            res += encodeTable[code];
        }
        else {
            if (res !== undefined) {
                res += path[pos];
            }
        }
    }
    return res !== undefined ? res : path;
}
/**
 * Compute `fsPath` for the given uri
 */
function uriToFsPath(uri, keepDriveLetterCasing) {
    let value;
    if (uri.authority && uri.path.length > 1 && uri.scheme === 'file') {
        // unc path: file://shares/c$/far/boo
        value = `//${uri.authority}${uri.path}`;
    }
    else if (uri.path.charCodeAt(0) === 47 /* Slash */
        && (uri.path.charCodeAt(1) >= 65 /* A */ && uri.path.charCodeAt(1) <= 90 /* Z */ || uri.path.charCodeAt(1) >= 97 /* a */ && uri.path.charCodeAt(1) <= 122 /* z */)
        && uri.path.charCodeAt(2) === 58 /* Colon */) {
        if (!keepDriveLetterCasing) {
            // windows drive letter: file:///c:/far/boo
            value = uri.path[1].toLowerCase() + uri.path.substr(2);
        }
        else {
            value = uri.path.substr(1);
        }
    }
    else {
        // other path
        value = uri.path;
    }
    if (isWindows) {
        value = value.replace(/\//g, '\\');
    }
    return value;
}
/**
 * Create the external version of a uri
 */
function _asFormatted(uri, skipEncoding) {
    const encoder = !skipEncoding
        ? encodeURIComponentFast
        : encodeURIComponentMinimal;
    let res = '';
    let { scheme, authority, path, query, fragment } = uri;
    if (scheme) {
        res += scheme;
        res += ':';
    }
    if (authority || scheme === 'file') {
        res += _slash;
        res += _slash;
    }
    if (authority) {
        let idx = authority.indexOf('@');
        if (idx !== -1) {
            // <user>@<auth>
            const userinfo = authority.substr(0, idx);
            authority = authority.substr(idx + 1);
            idx = userinfo.indexOf(':');
            if (idx === -1) {
                res += encoder(userinfo, false);
            }
            else {
                // <user>:<pass>@<auth>
                res += encoder(userinfo.substr(0, idx), false);
                res += ':';
                res += encoder(userinfo.substr(idx + 1), false);
            }
            res += '@';
        }
        authority = authority.toLowerCase();
        idx = authority.indexOf(':');
        if (idx === -1) {
            res += encoder(authority, false);
        }
        else {
            // <auth>:<port>
            res += encoder(authority.substr(0, idx), false);
            res += authority.substr(idx);
        }
    }
    if (path) {
        // lower-case windows drive letters in /C:/fff or C:/fff
        if (path.length >= 3 && path.charCodeAt(0) === 47 /* Slash */ && path.charCodeAt(2) === 58 /* Colon */) {
            const code = path.charCodeAt(1);
            if (code >= 65 /* A */ && code <= 90 /* Z */) {
                path = `/${String.fromCharCode(code + 32)}:${path.substr(3)}`; // "/c:".length === 3
            }
        }
        else if (path.length >= 2 && path.charCodeAt(1) === 58 /* Colon */) {
            const code = path.charCodeAt(0);
            if (code >= 65 /* A */ && code <= 90 /* Z */) {
                path = `${String.fromCharCode(code + 32)}:${path.substr(2)}`; // "/c:".length === 3
            }
        }
        // encode the rest of the path
        res += encoder(path, true);
    }
    if (query) {
        res += '?';
        res += encoder(query, false);
    }
    if (fragment) {
        res += '#';
        res += !skipEncoding ? encodeURIComponentFast(fragment, false) : fragment;
    }
    return res;
}
// --- decode
function decodeURIComponentGraceful(str) {
    try {
        return decodeURIComponent(str);
    }
    catch (_a) {
        if (str.length > 3) {
            return str.substr(0, 3) + decodeURIComponentGraceful(str.substr(3));
        }
        else {
            return str;
        }
    }
}
const _rEncodedAsHex = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
function percentDecode(str) {
    if (!str.match(_rEncodedAsHex)) {
        return str;
    }
    return str.replace(_rEncodedAsHex, (match) => decodeURIComponentGraceful(match));
}

exports.Schemas = void 0;
(function (Schemas) {
    /**
     * A schema that is used for models that exist in memory
     * only and that have no correspondence on a server or such.
     */
    Schemas.inMemory = 'inmemory';
    /**
     * A schema that is used for setting files
     */
    Schemas.qqmusic = 'qqmusic';
    /**
     * A schema that is used for internal private files
     */
    Schemas.internal = 'private';
    /**
     * A walk-through document.
     */
    Schemas.walkThrough = 'walkThrough';
    /**
     * An embedded code snippet.
     */
    Schemas.walkThroughSnippet = 'walkThroughSnippet';
    Schemas.http = 'http';
    Schemas.https = 'https';
    Schemas.file = 'file';
    Schemas.mailto = 'mailto';
    Schemas.untitled = 'untitled';
    Schemas.data = 'data';
    Schemas.command = 'command';
    Schemas.qqmusicRemote = 'qqmusic-remote';
    Schemas.qqmusicRemoteResource = 'qqmusic-remote-resource';
    Schemas.userData = 'qqmusic-userdata';
    Schemas.qqmusicSettings = 'qqmusic-settings';
    Schemas.qqmusicTerminal = 'qqmusic-terminal';
    Schemas.webviewPanel = 'webview-panel';
    /**
     * Scheme used for loading the wrapper html and script in webviews.
     */
    Schemas.qqmusicWebview = 'qqmusic-webview';
    /**
     * Scheme used for extension pages
     */
    Schemas.extension = 'extension';
    /**
     * Scheme used as a replacement of `file` scheme to load
     * files with our custom protocol handler (desktop only).
     */
    Schemas.qqmusicFileResource = 'qqmusic-file';
    /**
     * Scheme used for temporary resources
     */
    Schemas.tmp = 'tmp';
})(exports.Schemas || (exports.Schemas = {}));
class RemoteAuthoritiesImpl {
    constructor() {
        this._hosts = Object.create(null);
        this._ports = Object.create(null);
        this._connectionTokens = Object.create(null);
        this._preferredWebSchema = 'http';
        this._delegate = null;
    }
    setPreferredWebSchema(schema) {
        this._preferredWebSchema = schema;
    }
    setDelegate(delegate) {
        this._delegate = delegate;
    }
    set(authority, host, port) {
        this._hosts[authority] = host;
        this._ports[authority] = port;
    }
    setConnectionToken(authority, connectionToken) {
        this._connectionTokens[authority] = connectionToken;
    }
    rewrite(uri) {
        if (this._delegate) {
            return this._delegate(uri);
        }
        const authority = uri.authority;
        let host = this._hosts[authority];
        if (host && host.indexOf(':') !== -1) {
            host = `[${host}]`;
        }
        const port = this._ports[authority];
        const connectionToken = this._connectionTokens[authority];
        let query = `path=${encodeURIComponent(uri.path)}`;
        if (typeof connectionToken === 'string') {
            query += `&tkn=${encodeURIComponent(connectionToken)}`;
        }
        return URI.from({
            scheme: isWeb ? this._preferredWebSchema : exports.Schemas.qqmusicRemoteResource,
            authority: `${host}:${port}`,
            path: `/qqmusic-remote-resource`,
            query
        });
    }
}
const RemoteAuthorities = new RemoteAuthoritiesImpl();
class FileAccessImpl {
    constructor() {
        this.FALLBACK_AUTHORITY = 'qqmusic-app';
    }
    asBrowserUri(uriOrModule, moduleIdToUrl, __forceCodeFileUri) {
        const uri = this.toUri(uriOrModule, moduleIdToUrl);
        // Handle remote URIs via `RemoteAuthorities`
        if (uri.scheme === exports.Schemas.qqmusicRemote) {
            return RemoteAuthorities.rewrite(uri);
        }
        let convertToQqmusicFileResource = false;
        // Only convert the URI if we are in a native context and it has `file:` scheme
        // and we have explicitly enabled the conversion (sandbox, or qqmusic_BROWSER_CODE_LOADING)
        if (isNative && __forceCodeFileUri && uri.scheme === exports.Schemas.file) {
            convertToQqmusicFileResource = true;
        }
        // Also convert `file:` URIs in the web worker extension host (running in desktop) case
        if (uri.scheme === exports.Schemas.file && typeof globals.importScripts === 'function' && globals.origin === 'qqmusic-file://qqmusic-app') {
            convertToQqmusicFileResource = true;
        }
        if (convertToQqmusicFileResource) {
            return uri.with({
                scheme: exports.Schemas.qqmusicFileResource,
                // We need to provide an authority here so that it can serve
                // as origin for network and loading matters in chromium.
                // If the URI is not coming with an authority already, we
                // add our own
                authority: uri.authority || this.FALLBACK_AUTHORITY,
                query: null,
                fragment: null
            });
        }
        return uri;
    }
    asFileUri(uriOrModule, moduleIdToUrl) {
        const uri = this.toUri(uriOrModule, moduleIdToUrl);
        // Only convert the URI if it is `qqmusic-file:` scheme
        if (uri.scheme === exports.Schemas.qqmusicFileResource) {
            return uri.with({
                scheme: exports.Schemas.file,
                // Only preserve the `authority` if it is different from
                // our fallback authority. This ensures we properly preserve
                // Windows UNC paths that come with their own authority.
                authority: uri.authority !== this.FALLBACK_AUTHORITY ? uri.authority : null,
                query: null,
                fragment: null
            });
        }
        return uri;
    }
    toUri(uriOrModule, moduleIdToUrl) {
        if (URI.isUri(uriOrModule)) {
            return uriOrModule;
        }
        return URI.parse(moduleIdToUrl.toUrl(uriOrModule));
    }
}
const FileAccess = new FileAccessImpl();

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function originalFSPath(uri) {
    return uriToFsPath(uri, true);
}
class ExtUri {
    constructor(_ignorePathCasing) {
        this._ignorePathCasing = _ignorePathCasing;
    }
    compare(uri1, uri2, ignoreFragment = false) {
        if (uri1 === uri2) {
            return 0;
        }
        return compare(this.getComparisonKey(uri1, ignoreFragment), this.getComparisonKey(uri2, ignoreFragment));
    }
    isEqual(uri1, uri2, ignoreFragment = false) {
        if (uri1 === uri2) {
            return true;
        }
        if (!uri1 || !uri2) {
            return false;
        }
        return this.getComparisonKey(uri1, ignoreFragment) === this.getComparisonKey(uri2, ignoreFragment);
    }
    getComparisonKey(uri, ignoreFragment = false) {
        return uri.with({
            path: this._ignorePathCasing(uri) ? uri.path.toLowerCase() : undefined,
            fragment: ignoreFragment ? null : undefined
        }).toString();
    }
    ignorePathCasing(uri) {
        return this._ignorePathCasing(uri);
    }
    isEqualOrParent(base, parentCandidate, ignoreFragment = false) {
        if (base.scheme === parentCandidate.scheme) {
            if (base.scheme === exports.Schemas.file) {
                return isEqualOrParent$1(originalFSPath(base), originalFSPath(parentCandidate), this._ignorePathCasing(base)) && base.query === parentCandidate.query && (ignoreFragment || base.fragment === parentCandidate.fragment);
            }
            if (isEqualAuthority(base.authority, parentCandidate.authority)) {
                return isEqualOrParent$1(base.path, parentCandidate.path, this._ignorePathCasing(base), '/') && base.query === parentCandidate.query && (ignoreFragment || base.fragment === parentCandidate.fragment);
            }
        }
        return false;
    }
    // --- path math
    joinPath(resource, ...pathFragment) {
        return URI.joinPath(resource, ...pathFragment);
    }
    basenameOrAuthority(resource) {
        return basename(resource) || resource.authority;
    }
    basename(resource) {
        return posix.basename(resource.path);
    }
    extname(resource) {
        return posix.extname(resource.path);
    }
    dirname(resource) {
        if (resource.path.length === 0) {
            return resource;
        }
        let dirname;
        if (resource.scheme === exports.Schemas.file) {
            dirname = URI.file(dirname$1(originalFSPath(resource))).path;
        }
        else {
            dirname = posix.dirname(resource.path);
            if (resource.authority && dirname.length && dirname.charCodeAt(0) !== 47 /* Slash */) {
                console.error(`dirname("${resource.toString})) resulted in a relative path`);
                dirname = '/'; // If a URI contains an authority component, then the path component must either be empty or begin with a CharCode.Slash ("/") character
            }
        }
        return resource.with({
            path: dirname
        });
    }
    normalizePath(resource) {
        if (!resource.path.length) {
            return resource;
        }
        let normalizedPath;
        if (resource.scheme === exports.Schemas.file) {
            normalizedPath = URI.file(normalize(originalFSPath(resource))).path;
        }
        else {
            normalizedPath = posix.normalize(resource.path);
        }
        return resource.with({
            path: normalizedPath
        });
    }
    relativePath(from, to) {
        if (from.scheme !== to.scheme || !isEqualAuthority(from.authority, to.authority)) {
            return undefined;
        }
        if (from.scheme === exports.Schemas.file) {
            const relativePath = relative(originalFSPath(from), originalFSPath(to));
            return isWindows ? toSlashes(relativePath) : relativePath;
        }
        let fromPath = from.path || '/', toPath = to.path || '/';
        if (this._ignorePathCasing(from)) {
            // make casing of fromPath match toPath
            let i = 0;
            for (const len = Math.min(fromPath.length, toPath.length); i < len; i++) {
                if (fromPath.charCodeAt(i) !== toPath.charCodeAt(i)) {
                    if (fromPath.charAt(i).toLowerCase() !== toPath.charAt(i).toLowerCase()) {
                        break;
                    }
                }
            }
            fromPath = toPath.substr(0, i) + fromPath.substr(i);
        }
        return posix.relative(fromPath, toPath);
    }
    resolvePath(base, path) {
        if (base.scheme === exports.Schemas.file) {
            const newURI = URI.file(resolve(originalFSPath(base), path));
            return base.with({
                authority: newURI.authority,
                path: newURI.path
            });
        }
        path = toPosixPath(path); // we allow path to be a windows path
        return base.with({
            path: posix.resolve(base.path, path)
        });
    }
    // --- misc
    isAbsolutePath(resource) {
        return !!resource.path && resource.path[0] === '/';
    }
    isEqualAuthority(a1, a2) {
        return a1 === a2 || equalsIgnoreCase(a1, a2);
    }
    hasTrailingPathSeparator(resource, sep$1 = sep) {
        if (resource.scheme === exports.Schemas.file) {
            const fsp = originalFSPath(resource);
            return fsp.length > getRoot(fsp).length && fsp[fsp.length - 1] === sep$1;
        }
        else {
            const p = resource.path;
            return (p.length > 1 && p.charCodeAt(p.length - 1) === 47 /* Slash */) && !(/^[a-zA-Z]:(\/$|\\$)/.test(resource.fsPath)); // ignore the slash at offset 0
        }
    }
    removeTrailingPathSeparator(resource, sep$1 = sep) {
        // Make sure that the path isn't a drive letter. A trailing separator there is not removable.
        if (hasTrailingPathSeparator(resource, sep$1)) {
            return resource.with({ path: resource.path.substr(0, resource.path.length - 1) });
        }
        return resource;
    }
    addTrailingPathSeparator(resource, sep$1 = sep) {
        let isRootSep = false;
        if (resource.scheme === exports.Schemas.file) {
            const fsp = originalFSPath(resource);
            isRootSep = ((fsp !== undefined) && (fsp.length === getRoot(fsp).length) && (fsp[fsp.length - 1] === sep$1));
        }
        else {
            sep$1 = '/';
            const p = resource.path;
            isRootSep = p.length === 1 && p.charCodeAt(p.length - 1) === 47 /* Slash */;
        }
        if (!isRootSep && !hasTrailingPathSeparator(resource, sep$1)) {
            return resource.with({ path: resource.path + '/' });
        }
        return resource;
    }
}
/**
 * Unbiased utility that takes uris "as they are". This means it can be interchanged with
 * uri#toString() usages. The following is true
 * ```
 * assertEqual(aUri.toString() === bUri.toString(), exturi.isEqual(aUri, bUri))
 * ```
 */
const extUri = new ExtUri(() => false);
/**
 * BIASED utility that _mostly_ ignored the case of urs paths. ONLY use this util if you
 * understand what you are doing.
 *
 * This utility is INCOMPATIBLE with `uri.toString()`-usages and both CANNOT be used interchanged.
 *
 * When dealing with uris from files or documents, `extUri` (the unbiased friend)is sufficient
 * because those uris come from a "trustworthy source". When creating unknown uris it's always
 * better to use `IUriIdentityService` which exposes an `IExtUri`-instance which knows when path
 * casing matters.
 */
const extUriBiasedIgnorePathCase = new ExtUri(uri => {
    // A file scheme resource is in the same platform as code, so ignore case for non linux platforms
    // Resource can be from another platform. Lowering the case as an hack. Should come from File system provider
    return uri.scheme === exports.Schemas.file ? !isLinux : true;
});
/**
 * BIASED utility that always ignores the casing of uris paths. ONLY use this util if you
 * understand what you are doing.
 *
 * This utility is INCOMPATIBLE with `uri.toString()`-usages and both CANNOT be used interchanged.
 *
 * When dealing with uris from files or documents, `extUri` (the unbiased friend)is sufficient
 * because those uris come from a "trustworthy source". When creating unknown uris it's always
 * better to use `IUriIdentityService` which exposes an `IExtUri`-instance which knows when path
 * casing matters.
 */
const extUriIgnorePathCase = new ExtUri(_ => true);
const isEqual = extUri.isEqual.bind(extUri);
const isEqualOrParent = extUri.isEqualOrParent.bind(extUri);
const getComparisonKey = extUri.getComparisonKey.bind(extUri);
const basenameOrAuthority = extUri.basenameOrAuthority.bind(extUri);
const basename = extUri.basename.bind(extUri);
const extname = extUri.extname.bind(extUri);
const dirname = extUri.dirname.bind(extUri);
const joinPath = extUri.joinPath.bind(extUri);
const normalizePath = extUri.normalizePath.bind(extUri);
const relativePath = extUri.relativePath.bind(extUri);
const resolvePath = extUri.resolvePath.bind(extUri);
const isAbsolutePath = extUri.isAbsolutePath.bind(extUri);
const isEqualAuthority = extUri.isEqualAuthority.bind(extUri);
const hasTrailingPathSeparator = extUri.hasTrailingPathSeparator.bind(extUri);
const removeTrailingPathSeparator = extUri.removeTrailingPathSeparator.bind(extUri);
const addTrailingPathSeparator = extUri.addTrailingPathSeparator.bind(extUri);
//#endregion
function distinctParents(items, resourceAccessor) {
    const distinctParents = [];
    for (let i = 0; i < items.length; i++) {
        const candidateResource = resourceAccessor(items[i]);
        if (items.some((otherItem, index) => {
            if (index === i) {
                return false;
            }
            return isEqualOrParent(candidateResource, resourceAccessor(otherItem));
        })) {
            continue;
        }
        distinctParents.push(items[i]);
    }
    return distinctParents;
}
/**
 * Data URI related helpers.
 */
var DataUri;
(function (DataUri) {
    DataUri.META_DATA_LABEL = 'label';
    DataUri.META_DATA_DESCRIPTION = 'description';
    DataUri.META_DATA_SIZE = 'size';
    DataUri.META_DATA_MIME = 'mime';
    function parseMetaData(dataUri) {
        const metadata = new Map();
        // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
        // the metadata is: size:2313;label:SomeLabel;description:SomeDescription
        const meta = dataUri.path.substring(dataUri.path.indexOf(';') + 1, dataUri.path.lastIndexOf(';'));
        meta.split(';').forEach(property => {
            const [key, value] = property.split(':');
            if (key && value) {
                metadata.set(key, value);
            }
        });
        // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
        // the mime is: image/png
        const mime = dataUri.path.substring(0, dataUri.path.indexOf(';'));
        if (mime) {
            metadata.set(DataUri.META_DATA_MIME, mime);
        }
        return metadata;
    }
    DataUri.parseMetaData = parseMetaData;
})(DataUri || (DataUri = {}));
function toLocalResource(resource, authority, localScheme) {
    if (authority) {
        let path = resource.path;
        if (path && path[0] !== posix.sep) {
            path = posix.sep + path;
        }
        return resource.with({ scheme: localScheme, authority, path });
    }
    return resource.with({ scheme: localScheme });
}

var resources = /*#__PURE__*/Object.freeze({
	__proto__: null,
	originalFSPath: originalFSPath,
	ExtUri: ExtUri,
	extUri: extUri,
	extUriBiasedIgnorePathCase: extUriBiasedIgnorePathCase,
	extUriIgnorePathCase: extUriIgnorePathCase,
	isEqual: isEqual,
	isEqualOrParent: isEqualOrParent,
	getComparisonKey: getComparisonKey,
	basenameOrAuthority: basenameOrAuthority,
	basename: basename,
	extname: extname,
	dirname: dirname,
	joinPath: joinPath,
	normalizePath: normalizePath,
	relativePath: relativePath,
	resolvePath: resolvePath,
	isAbsolutePath: isAbsolutePath,
	isEqualAuthority: isEqualAuthority,
	hasTrailingPathSeparator: hasTrailingPathSeparator,
	removeTrailingPathSeparator: removeTrailingPathSeparator,
	addTrailingPathSeparator: addTrailingPathSeparator,
	distinctParents: distinctParents,
	get DataUri () { return DataUri; },
	toLocalResource: toLocalResource
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function isThenable(obj) {
    return !!obj && typeof obj.then === 'function';
}
function createCancelablePromise(callback) {
    const source = new CancellationTokenSource();
    const thenable = callback(source.token);
    const promise = new Promise((resolve, reject) => {
        const subscription = source.token.onCancellationRequested(() => {
            subscription.dispose();
            source.dispose();
            reject(canceled());
        });
        Promise.resolve(thenable).then(value => {
            subscription.dispose();
            source.dispose();
            resolve(value);
        }, err => {
            subscription.dispose();
            source.dispose();
            reject(err);
        });
    });
    return new class {
        cancel() {
            source.cancel();
        }
        then(resolve, reject) {
            return promise.then(resolve, reject);
        }
        catch(reject) {
            return this.then(undefined, reject);
        }
        finally(onfinally) {
            return promise.finally(onfinally);
        }
    };
}
function raceCancellation(promise, token, defaultValue) {
    return Promise.race([promise, new Promise(resolve => token.onCancellationRequested(() => resolve(defaultValue)))]);
}
/**
 * Returns as soon as one of the promises is resolved and cancels remaining promises
 */
function raceCancellablePromises(cancellablePromises) {
    return __awaiter(this, void 0, void 0, function* () {
        let resolvedPromiseIndex = -1;
        const promises = cancellablePromises.map((promise, index) => promise.then(result => { resolvedPromiseIndex = index; return result; }));
        const result = yield Promise.race(promises);
        cancellablePromises.forEach((cancellablePromise, index) => {
            if (index !== resolvedPromiseIndex) {
                cancellablePromise.cancel();
            }
        });
        return result;
    });
}
function raceTimeout(promise, timeout, onTimeout) {
    let promiseResolve = undefined;
    const timer = setTimeout(() => {
        promiseResolve === null || promiseResolve === void 0 ? void 0 : promiseResolve(undefined);
        onTimeout === null || onTimeout === void 0 ? void 0 : onTimeout();
    }, timeout);
    return Promise.race([
        promise.finally(() => clearTimeout(timer)),
        new Promise(resolve => promiseResolve = resolve)
    ]);
}
function asPromise(callback) {
    return new Promise((resolve, reject) => {
        const item = callback();
        if (isThenable(item)) {
            item.then(resolve, reject);
        }
        else {
            resolve(item);
        }
    });
}
/**
 * A helper to prevent accumulation of sequential async tasks.
 *
 * Imagine a mail man with the sole task of delivering letters. As soon as
 * a letter submitted for delivery, he drives to the destination, delivers it
 * and returns to his base. Imagine that during the trip, N more letters were submitted.
 * When the mail man returns, he picks those N letters and delivers them all in a
 * single trip. Even though N+1 submissions occurred, only 2 deliveries were made.
 *
 * The throttler implements this via the queue() method, by providing it a task
 * factory. Following the example:
 *
 * 		const throttler = new Throttler();
 * 		const letters = [];
 *
 * 		function deliver() {
 * 			const lettersToDeliver = letters;
 * 			letters = [];
 * 			return makeTheTrip(lettersToDeliver);
 * 		}
 *
 * 		function onLetterReceived(l) {
 * 			letters.push(l);
 * 			throttler.queue(deliver);
 * 		}
 */
class Throttler {
    constructor() {
        this.activePromise = null;
        this.queuedPromise = null;
        this.queuedPromiseFactory = null;
    }
    queue(promiseFactory) {
        if (this.activePromise) {
            this.queuedPromiseFactory = promiseFactory;
            if (!this.queuedPromise) {
                const onComplete = () => {
                    this.queuedPromise = null;
                    const result = this.queue(this.queuedPromiseFactory);
                    this.queuedPromiseFactory = null;
                    return result;
                };
                this.queuedPromise = new Promise(resolve => {
                    this.activePromise.then(onComplete, onComplete).then(resolve);
                });
            }
            return new Promise((resolve, reject) => {
                this.queuedPromise.then(resolve, reject);
            });
        }
        this.activePromise = promiseFactory();
        return new Promise((resolve, reject) => {
            this.activePromise.then((result) => {
                this.activePromise = null;
                resolve(result);
            }, (err) => {
                this.activePromise = null;
                reject(err);
            });
        });
    }
}
class Sequencer {
    constructor() {
        this.current = Promise.resolve(null);
    }
    queue(promiseTask) {
        return this.current = this.current.then(() => promiseTask(), () => promiseTask());
    }
}
class SequencerByKey {
    constructor() {
        this.promiseMap = new Map();
    }
    queue(key, promiseTask) {
        var _a;
        const runningPromise = (_a = this.promiseMap.get(key)) !== null && _a !== void 0 ? _a : Promise.resolve();
        const newPromise = runningPromise
            .catch(() => { })
            .then(promiseTask)
            .finally(() => {
            if (this.promiseMap.get(key) === newPromise) {
                this.promiseMap.delete(key);
            }
        });
        this.promiseMap.set(key, newPromise);
        return newPromise;
    }
}
/**
 * A helper to delay (debounce) execution of a task that is being requested often.
 *
 * Following the throttler, now imagine the mail man wants to optimize the number of
 * trips proactively. The trip itself can be long, so he decides not to make the trip
 * as soon as a letter is submitted. Instead he waits a while, in case more
 * letters are submitted. After said waiting period, if no letters were submitted, he
 * decides to make the trip. Imagine that N more letters were submitted after the first
 * one, all within a short period of time between each other. Even though N+1
 * submissions occurred, only 1 delivery was made.
 *
 * The delayer offers this behavior via the trigger() method, into which both the task
 * to be executed and the waiting period (delay) must be passed in as arguments. Following
 * the example:
 *
 * 		const delayer = new Delayer(WAITING_PERIOD);
 * 		const letters = [];
 *
 * 		function letterReceived(l) {
 * 			letters.push(l);
 * 			delayer.trigger(() => { return makeTheTrip(); });
 * 		}
 */
class Delayer {
    constructor(defaultDelay) {
        this.defaultDelay = defaultDelay;
        this.timeout = null;
        this.completionPromise = null;
        this.doResolve = null;
        this.doReject = null;
        this.task = null;
    }
    trigger(task, delay = this.defaultDelay) {
        this.task = task;
        this.cancelTimeout();
        if (!this.completionPromise) {
            this.completionPromise = new Promise((resolve, reject) => {
                this.doResolve = resolve;
                this.doReject = reject;
            }).then(() => {
                this.completionPromise = null;
                this.doResolve = null;
                if (this.task) {
                    const task = this.task;
                    this.task = null;
                    return task();
                }
                return undefined;
            });
        }
        this.timeout = setTimeout(() => {
            this.timeout = null;
            if (this.doResolve) {
                this.doResolve(null);
            }
        }, delay);
        return this.completionPromise;
    }
    isTriggered() {
        return this.timeout !== null;
    }
    cancel() {
        this.cancelTimeout();
        if (this.completionPromise) {
            if (this.doReject) {
                this.doReject(canceled());
            }
            this.completionPromise = null;
        }
    }
    cancelTimeout() {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    dispose() {
        this.cancel();
    }
}
/**
 * A helper to delay execution of a task that is being requested often, while
 * preventing accumulation of consecutive executions, while the task runs.
 *
 * The mail man is clever and waits for a certain amount of time, before going
 * out to deliver letters. While the mail man is going out, more letters arrive
 * and can only be delivered once he is back. Once he is back the mail man will
 * do one more trip to deliver the letters that have accumulated while he was out.
 */
class ThrottledDelayer {
    constructor(defaultDelay) {
        this.delayer = new Delayer(defaultDelay);
        this.throttler = new Throttler();
    }
    trigger(promiseFactory, delay) {
        return this.delayer.trigger(() => this.throttler.queue(promiseFactory), delay);
    }
    isTriggered() {
        return this.delayer.isTriggered();
    }
    cancel() {
        this.delayer.cancel();
    }
    dispose() {
        this.delayer.dispose();
    }
}
/**
 * A barrier that is initially closed and then becomes opened permanently.
 */
class Barrier {
    constructor() {
        this._isOpen = false;
        this._promise = new Promise((c, e) => {
            this._completePromise = c;
        });
    }
    isOpen() {
        return this._isOpen;
    }
    open() {
        this._isOpen = true;
        this._completePromise(true);
    }
    wait() {
        return this._promise;
    }
}
/**
 * A barrier that is initially closed and then becomes opened permanently after a certain period of
 * time or when open is called explicitly
 */
class AutoOpenBarrier extends Barrier {
    constructor(autoOpenTimeMs) {
        super();
        this._timeout = setTimeout(() => this.open(), autoOpenTimeMs);
    }
    open() {
        clearTimeout(this._timeout);
        super.open();
    }
}
function timeout(millis, token) {
    if (!token) {
        return createCancelablePromise(token => timeout(millis, token));
    }
    return new Promise((resolve, reject) => {
        const handle = setTimeout(() => {
            disposable.dispose();
            resolve();
        }, millis);
        const disposable = token.onCancellationRequested(() => {
            clearTimeout(handle);
            disposable.dispose();
            reject(canceled());
        });
    });
}
function disposableTimeout(handler, timeout = 0) {
    const timer = setTimeout(handler, timeout);
    return toDisposable(() => clearTimeout(timer));
}
/**
 * Runs the provided list of promise factories in sequential order. The returned
 * promise will complete to an array of results from each promise.
 */
function sequence(promiseFactories) {
    const results = [];
    let index = 0;
    const len = promiseFactories.length;
    function next() {
        return index < len ? promiseFactories[index++]() : null;
    }
    function thenHandler(result) {
        if (result !== undefined && result !== null) {
            results.push(result);
        }
        const n = next();
        if (n) {
            return n.then(thenHandler);
        }
        return Promise.resolve(results);
    }
    return Promise.resolve(null).then(thenHandler);
}
function first(promiseFactories, shouldStop = t => !!t, defaultValue = null) {
    let index = 0;
    const len = promiseFactories.length;
    const loop = () => {
        if (index >= len) {
            return Promise.resolve(defaultValue);
        }
        const factory = promiseFactories[index++];
        const promise = Promise.resolve(factory());
        return promise.then(result => {
            if (shouldStop(result)) {
                return Promise.resolve(result);
            }
            return loop();
        });
    };
    return loop();
}
function firstParallel(promiseList, shouldStop = t => !!t, defaultValue = null) {
    if (promiseList.length === 0) {
        return Promise.resolve(defaultValue);
    }
    let todo = promiseList.length;
    const finish = () => {
        var _a, _b;
        todo = -1;
        for (const promise of promiseList) {
            (_b = (_a = promise).cancel) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
    };
    return new Promise((resolve, reject) => {
        for (const promise of promiseList) {
            promise.then(result => {
                if (--todo >= 0 && shouldStop(result)) {
                    finish();
                    resolve(result);
                }
                else if (todo === 0) {
                    resolve(defaultValue);
                }
            })
                .catch(err => {
                if (--todo >= 0) {
                    finish();
                    reject(err);
                }
            });
        }
    });
}
/**
 * A helper to queue N promises and run them all with a max degree of parallelism. The helper
 * ensures that at any time no more than M promises are running at the same time.
 */
class Limiter {
    constructor(maxDegreeOfParalellism) {
        this._size = 0;
        this.maxDegreeOfParalellism = maxDegreeOfParalellism;
        this.outstandingPromises = [];
        this.runningPromises = 0;
        this._onFinished = new Emitter();
    }
    get onFinished() {
        return this._onFinished.event;
    }
    get size() {
        return this._size;
    }
    queue(factory) {
        this._size++;
        return new Promise((c, e) => {
            this.outstandingPromises.push({ factory, c, e });
            this.consume();
        });
    }
    consume() {
        while (this.outstandingPromises.length && this.runningPromises < this.maxDegreeOfParalellism) {
            const iLimitedTask = this.outstandingPromises.shift();
            this.runningPromises++;
            const promise = iLimitedTask.factory();
            promise.then(iLimitedTask.c, iLimitedTask.e);
            promise.then(() => this.consumed(), () => this.consumed());
        }
    }
    consumed() {
        this._size--;
        this.runningPromises--;
        if (this.outstandingPromises.length > 0) {
            this.consume();
        }
        else {
            this._onFinished.fire();
        }
    }
    dispose() {
        this._onFinished.dispose();
    }
}
/**
 * A queue is handles one promise at a time and guarantees that at any time only one promise is executing.
 */
class Queue extends Limiter {
    constructor() {
        super(1);
    }
}
/**
 * A helper to organize queues per resource. The ResourceQueue makes sure to manage queues per resource
 * by disposing them once the queue is empty.
 */
class ResourceQueue {
    constructor() {
        this.queues = new Map();
    }
    queueFor(resource, extUri$1 = extUri) {
        const key = extUri$1.getComparisonKey(resource);
        let queue = this.queues.get(key);
        if (!queue) {
            queue = new Queue();
            exports.Event.once(queue.onFinished)(() => {
                queue === null || queue === void 0 ? void 0 : queue.dispose();
                this.queues.delete(key);
            });
            this.queues.set(key, queue);
        }
        return queue;
    }
    dispose() {
        this.queues.forEach(queue => queue.dispose());
        this.queues.clear();
    }
}
class TimeoutTimer {
    constructor(runner, timeout) {
        this._token = -1;
        if (typeof runner === 'function' && typeof timeout === 'number') {
            this.setIfNotSet(runner, timeout);
        }
    }
    dispose() {
        this.cancel();
    }
    cancel() {
        if (this._token !== -1) {
            clearTimeout(this._token);
            this._token = -1;
        }
    }
    cancelAndSet(runner, timeout) {
        this.cancel();
        this._token = setTimeout(() => {
            this._token = -1;
            runner();
        }, timeout);
    }
    setIfNotSet(runner, timeout) {
        if (this._token !== -1) {
            // timer is already set
            return;
        }
        this._token = setTimeout(() => {
            this._token = -1;
            runner();
        }, timeout);
    }
}
class IntervalTimer {
    constructor() {
        this._token = -1;
    }
    dispose() {
        this.cancel();
    }
    cancel() {
        if (this._token !== -1) {
            clearInterval(this._token);
            this._token = -1;
        }
    }
    cancelAndSet(runner, interval) {
        this.cancel();
        this._token = setInterval(() => {
            runner();
        }, interval);
    }
}
class RunOnceScheduler {
    constructor(runner, delay) {
        this.timeoutToken = -1;
        this.runner = runner;
        this.timeout = delay;
        this.timeoutHandler = this.onTimeout.bind(this);
    }
    /**
     * Dispose RunOnceScheduler
     */
    dispose() {
        this.cancel();
        this.runner = null;
    }
    /**
     * Cancel current scheduled runner (if any).
     */
    cancel() {
        if (this.isScheduled()) {
            clearTimeout(this.timeoutToken);
            this.timeoutToken = -1;
        }
    }
    /**
     * Cancel previous runner (if any) & schedule a new runner.
     */
    schedule(delay = this.timeout) {
        this.cancel();
        this.timeoutToken = setTimeout(this.timeoutHandler, delay);
    }
    get delay() {
        return this.timeout;
    }
    set delay(value) {
        this.timeout = value;
    }
    /**
     * Returns true if scheduled.
     */
    isScheduled() {
        return this.timeoutToken !== -1;
    }
    onTimeout() {
        this.timeoutToken = -1;
        if (this.runner) {
            this.doRun();
        }
    }
    doRun() {
        if (this.runner) {
            this.runner();
        }
    }
}
class RunOnceWorker extends RunOnceScheduler {
    constructor(runner, timeout) {
        super(runner, timeout);
        this.units = [];
    }
    work(unit) {
        this.units.push(unit);
        if (!this.isScheduled()) {
            this.schedule();
        }
    }
    doRun() {
        const units = this.units;
        this.units = [];
        if (this.runner) {
            this.runner(units);
        }
    }
    dispose() {
        this.units = [];
        super.dispose();
    }
}
/**
 * The `ThrottledWorker` will accept units of work `T`
 * to handle. The contract is:
 * * there is a maximum of units the worker can handle at once (via `chunkSize`)
 * * after having handled units, the worker needs to rest (via `throttleDelay`)
 */
class ThrottledWorker extends Disposable {
    constructor(maxWorkChunkSize, maxPendingWork, throttleDelay, handler) {
        super();
        this.maxWorkChunkSize = maxWorkChunkSize;
        this.maxPendingWork = maxPendingWork;
        this.throttleDelay = throttleDelay;
        this.handler = handler;
        this.pendingWork = [];
        this.throttler = this._register(new MutableDisposable());
        this.disposed = false;
    }
    /**
     * The number of work units that are pending to be processed.
     */
    get pending() { return this.pendingWork.length; }
    /**
     * Add units to be worked on. Use `pending` to figure out
     * how many units are not yet processed after this method
     * was called.
     *
     * @returns whether the work was accepted or not. If the
     * worker is disposed, it will not accept any more work.
     * If the number of pending units would become larger
     * than `maxPendingWork`, more work will also not be accepted.
     */
    work(units) {
        if (this.disposed) {
            return false; // work not accepted: disposed
        }
        // Check for reaching maximum of pending work
        if (typeof this.maxPendingWork === 'number') {
            // Throttled: simple check if pending + units exceeds max pending
            if (this.throttler.value) {
                if (this.pending + units.length > this.maxPendingWork) {
                    return false; // work not accepted: too much pending work
                }
            }
            // Unthrottled: same as throttled, but account for max chunk getting
            // worked on directly without being pending
            else {
                if (this.pending + units.length - this.maxWorkChunkSize > this.maxPendingWork) {
                    return false; // work not accepted: too much pending work
                }
            }
        }
        // Add to pending units first
        this.pendingWork.push(...units);
        // If not throttled, start working directly
        // Otherwise, when the throttle delay has
        // past, pending work will be worked again.
        if (!this.throttler.value) {
            this.doWork();
        }
        return true; // work accepted
    }
    doWork() {
        // Extract chunk to handle and handle it
        this.handler(this.pendingWork.splice(0, this.maxWorkChunkSize));
        // If we have remaining work, schedule it after a delay
        if (this.pendingWork.length > 0) {
            this.throttler.value = new RunOnceScheduler(() => {
                this.throttler.clear();
                this.doWork();
            }, this.throttleDelay);
            this.throttler.value.schedule();
        }
    }
    dispose() {
        super.dispose();
        this.disposed = true;
    }
}
/**
 * Execute the callback the next time the browser is idle
 */
exports.runWhenIdle = void 0;
(function () {
    if (typeof requestIdleCallback !== 'function' || typeof cancelIdleCallback !== 'function') {
        const dummyIdle = Object.freeze({
            didTimeout: true,
            timeRemaining() { return 15; }
        });
        exports.runWhenIdle = (runner) => {
            const handle = setTimeout(() => runner(dummyIdle));
            let disposed = false;
            return {
                dispose() {
                    if (disposed) {
                        return;
                    }
                    disposed = true;
                    clearTimeout(handle);
                }
            };
        };
    }
    else {
        exports.runWhenIdle = (runner, timeout) => {
            const handle = requestIdleCallback(runner, typeof timeout === 'number' ? { timeout } : undefined);
            let disposed = false;
            return {
                dispose() {
                    if (disposed) {
                        return;
                    }
                    disposed = true;
                    cancelIdleCallback(handle);
                }
            };
        };
    }
})();
/**
 * An implementation of the "idle-until-urgent"-strategy as introduced
 * here: https://philipwalton.com/articles/idle-until-urgent/
 */
class IdleValue {
    constructor(executor) {
        this._didRun = false;
        this._executor = () => {
            try {
                this._value = executor();
            }
            catch (err) {
                this._error = err;
            }
            finally {
                this._didRun = true;
            }
        };
        this._handle = exports.runWhenIdle(() => this._executor());
    }
    dispose() {
        this._handle.dispose();
    }
    get value() {
        if (!this._didRun) {
            this._handle.dispose();
            this._executor();
        }
        if (this._error) {
            throw this._error;
        }
        return this._value;
    }
}
//#endregion
function retry(task, delay, retries) {
    return __awaiter(this, void 0, void 0, function* () {
        let lastError;
        for (let i = 0; i < retries; i++) {
            try {
                return yield task();
            }
            catch (error) {
                lastError = error;
                yield timeout(delay);
            }
        }
        throw lastError;
    });
}
class TaskSequentializer {
    hasPending(taskId) {
        if (!this._pending) {
            return false;
        }
        if (typeof taskId === 'number') {
            return this._pending.taskId === taskId;
        }
        return !!this._pending;
    }
    get pending() {
        return this._pending ? this._pending.promise : undefined;
    }
    cancelPending() {
        var _a;
        (_a = this._pending) === null || _a === void 0 ? void 0 : _a.cancel();
    }
    setPending(taskId, promise, onCancel) {
        this._pending = { taskId, cancel: () => onCancel === null || onCancel === void 0 ? void 0 : onCancel(), promise };
        promise.then(() => this.donePending(taskId), () => this.donePending(taskId));
        return promise;
    }
    donePending(taskId) {
        if (this._pending && taskId === this._pending.taskId) {
            // only set pending to done if the promise finished that is associated with that taskId
            this._pending = undefined;
            // schedule the next task now that we are free if we have any
            this.triggerNext();
        }
    }
    triggerNext() {
        if (this._next) {
            const next = this._next;
            this._next = undefined;
            // Run next task and complete on the associated promise
            next.run().then(next.promiseResolve, next.promiseReject);
        }
    }
    setNext(run) {
        // this is our first next task, so we create associated promise with it
        // so that we can return a promise that completes when the task has
        // completed.
        if (!this._next) {
            let promiseResolve;
            let promiseReject;
            const promise = new Promise((resolve, reject) => {
                promiseResolve = resolve;
                promiseReject = reject;
            });
            this._next = {
                run,
                promise,
                promiseResolve: promiseResolve,
                promiseReject: promiseReject
            };
        }
        // we have a previous next task, just overwrite it
        else {
            this._next.run = run;
        }
        return this._next.promise;
    }
}
//#endregion
//#region
/**
 * The `IntervalCounter` allows to count the number
 * of calls to `increment()` over a duration of
 * `interval`. This utility can be used to conditionally
 * throttle a frequent task when a certain threshold
 * is reached.
 */
class IntervalCounter {
    constructor(interval) {
        this.interval = interval;
        this.lastIncrementTime = 0;
        this.value = 0;
    }
    increment() {
        const now = Date.now();
        // We are outside of the range of `interval` and as such
        // start counting from 0 and remember the time
        if (now - this.lastIncrementTime > this.interval) {
            this.lastIncrementTime = now;
            this.value = 0;
        }
        this.value++;
        return this.value;
    }
}
/**
 * Creates a promise whose resolution or rejection can be controlled imperatively.
 */
class DeferredPromise {
    constructor() {
        this.rejected = false;
        this.resolved = false;
        this.p = new Promise((c, e) => {
            this.completeCallback = c;
            this.errorCallback = e;
        });
    }
    get isRejected() {
        return this.rejected;
    }
    get isResolved() {
        return this.resolved;
    }
    get isSettled() {
        return this.rejected || this.resolved;
    }
    complete(value) {
        return new Promise(resolve => {
            this.completeCallback(value);
            this.resolved = true;
            resolve();
        });
    }
    error(err) {
        return new Promise(resolve => {
            this.errorCallback(err);
            this.rejected = true;
            resolve();
        });
    }
    cancel() {
        new Promise(resolve => {
            this.errorCallback(canceled());
            this.rejected = true;
            resolve();
        });
    }
}
//#endregion
//#region Promises
exports.Promises = void 0;
(function (Promises) {
    /**
     * A drop-in replacement for `Promise.all` with the only difference
     * that the method awaits every promise to either fulfill or reject.
     *
     * Similar to `Promise.all`, only the first error will be returned
     * if any.
     */
    function settled(promises) {
        return __awaiter(this, void 0, void 0, function* () {
            let firstError = undefined;
            const result = yield Promise.all(promises.map(promise => promise.then(value => value, error => {
                if (!firstError) {
                    firstError = error;
                }
                return undefined; // do not rethrow so that other promises can settle
            })));
            if (typeof firstError !== 'undefined') {
                throw firstError;
            }
            return result; // cast is needed and protected by the `throw` above
        });
    }
    Promises.settled = settled;
})(exports.Promises || (exports.Promises = {}));
//#endregion

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function isReadableStream(obj) {
    const candidate = obj;
    if (!candidate) {
        return false;
    }
    return [candidate.on, candidate.pause, candidate.resume, candidate.destroy].every(fn => typeof fn === 'function');
}
function isReadableBufferedStream(obj) {
    const candidate = obj;
    if (!candidate) {
        return false;
    }
    return isReadableStream(candidate.stream) && Array.isArray(candidate.buffer) && typeof candidate.ended === 'boolean';
}
function newWriteableStream(reducer, options) {
    return new WriteableStreamImpl(reducer, options);
}
class WriteableStreamImpl {
    constructor(reducer, options) {
        this.reducer = reducer;
        this.options = options;
        this.state = {
            flowing: false,
            ended: false,
            destroyed: false
        };
        this.buffer = {
            data: [],
            error: []
        };
        this.listeners = {
            data: [],
            error: [],
            end: []
        };
        this.pendingWritePromises = [];
    }
    pause() {
        if (this.state.destroyed) {
            return;
        }
        this.state.flowing = false;
    }
    resume() {
        if (this.state.destroyed) {
            return;
        }
        if (!this.state.flowing) {
            this.state.flowing = true;
            // emit buffered events
            this.flowData();
            this.flowErrors();
            this.flowEnd();
        }
    }
    write(data) {
        var _a;
        if (this.state.destroyed) {
            return;
        }
        // flowing: directly send the data to listeners
        if (this.state.flowing) {
            this.emitData(data);
        }
        // not yet flowing: buffer data until flowing
        else {
            this.buffer.data.push(data);
            // highWaterMark: if configured, signal back when buffer reached limits
            if (typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.highWaterMark) === 'number' && this.buffer.data.length > this.options.highWaterMark) {
                return new Promise(resolve => this.pendingWritePromises.push(resolve));
            }
        }
    }
    error(error) {
        if (this.state.destroyed) {
            return;
        }
        // flowing: directly send the error to listeners
        if (this.state.flowing) {
            this.emitError(error);
        }
        // not yet flowing: buffer errors until flowing
        else {
            this.buffer.error.push(error);
        }
    }
    end(result) {
        if (this.state.destroyed) {
            return;
        }
        // end with data if provided
        if (typeof result !== 'undefined') {
            this.write(result);
        }
        // flowing: send end event to listeners
        if (this.state.flowing) {
            this.emitEnd();
            this.destroy();
        }
        // not yet flowing: remember state
        else {
            this.state.ended = true;
        }
    }
    emitData(data) {
        this.listeners.data.slice(0).forEach(listener => listener(data)); // slice to avoid listener mutation from delivering event
    }
    emitError(error) {
        if (this.listeners.error.length === 0) {
            onUnexpectedError(error); // nobody listened to this error so we log it as unexpected
        }
        else {
            this.listeners.error.slice(0).forEach(listener => listener(error)); // slice to avoid listener mutation from delivering event
        }
    }
    emitEnd() {
        this.listeners.end.slice(0).forEach(listener => listener()); // slice to avoid listener mutation from delivering event
    }
    on(event, callback) {
        if (this.state.destroyed) {
            return;
        }
        switch (event) {
            case 'data':
                this.listeners.data.push(callback);
                // switch into flowing mode as soon as the first 'data'
                // listener is added and we are not yet in flowing mode
                this.resume();
                break;
            case 'end':
                this.listeners.end.push(callback);
                // emit 'end' event directly if we are flowing
                // and the end has already been reached
                //
                // finish() when it went through
                if (this.state.flowing && this.flowEnd()) {
                    this.destroy();
                }
                break;
            case 'error':
                this.listeners.error.push(callback);
                // emit buffered 'error' events unless done already
                // now that we know that we have at least one listener
                if (this.state.flowing) {
                    this.flowErrors();
                }
                break;
        }
    }
    removeListener(event, callback) {
        if (this.state.destroyed) {
            return;
        }
        let listeners = undefined;
        switch (event) {
            case 'data':
                listeners = this.listeners.data;
                break;
            case 'end':
                listeners = this.listeners.end;
                break;
            case 'error':
                listeners = this.listeners.error;
                break;
        }
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }
    flowData() {
        if (this.buffer.data.length > 0) {
            const fullDataBuffer = this.reducer(this.buffer.data);
            this.emitData(fullDataBuffer);
            this.buffer.data.length = 0;
            // When the buffer is empty, resolve all pending writers
            const pendingWritePromises = [...this.pendingWritePromises];
            this.pendingWritePromises.length = 0;
            pendingWritePromises.forEach(pendingWritePromise => pendingWritePromise());
        }
    }
    flowErrors() {
        if (this.listeners.error.length > 0) {
            for (const error of this.buffer.error) {
                this.emitError(error);
            }
            this.buffer.error.length = 0;
        }
    }
    flowEnd() {
        if (this.state.ended) {
            this.emitEnd();
            return this.listeners.end.length > 0;
        }
        return false;
    }
    destroy() {
        if (!this.state.destroyed) {
            this.state.destroyed = true;
            this.state.ended = true;
            this.buffer.data.length = 0;
            this.buffer.error.length = 0;
            this.listeners.data.length = 0;
            this.listeners.error.length = 0;
            this.listeners.end.length = 0;
            this.pendingWritePromises.length = 0;
        }
    }
}
/**
 * Helper to fully read a T readable into a T.
 */
function consumeReadable(readable, reducer) {
    const chunks = [];
    let chunk;
    while ((chunk = readable.read()) !== null) {
        chunks.push(chunk);
    }
    return reducer(chunks);
}
/**
 * Helper to read a T readable up to a maximum of chunks. If the limit is
 * reached, will return a readable instead to ensure all data can still
 * be read.
 */
function peekReadable(readable, reducer, maxChunks) {
    const chunks = [];
    let chunk = undefined;
    while ((chunk = readable.read()) !== null && chunks.length < maxChunks) {
        chunks.push(chunk);
    }
    // If the last chunk is null, it means we reached the end of
    // the readable and return all the data at once
    if (chunk === null && chunks.length > 0) {
        return reducer(chunks);
    }
    // Otherwise, we still have a chunk, it means we reached the maxChunks
    // value and as such we return a new Readable that first returns
    // the existing read chunks and then continues with reading from
    // the underlying readable.
    return {
        read: () => {
            // First consume chunks from our array
            if (chunks.length > 0) {
                return chunks.shift();
            }
            // Then ensure to return our last read chunk
            if (typeof chunk !== 'undefined') {
                const lastReadChunk = chunk;
                // explicitly use undefined here to indicate that we consumed
                // the chunk, which could have either been null or valued.
                chunk = undefined;
                return lastReadChunk;
            }
            // Finally delegate back to the Readable
            return readable.read();
        }
    };
}
function consumeStream(stream, reducer) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        listenStream(stream, {
            onData: chunk => {
                if (reducer) {
                    chunks.push(chunk);
                }
            },
            onError: error => {
                if (reducer) {
                    reject(error);
                }
                else {
                    resolve(undefined);
                }
            },
            onEnd: () => {
                if (reducer) {
                    resolve(reducer(chunks));
                }
                else {
                    resolve(undefined);
                }
            }
        });
    });
}
/**
 * Helper to listen to all events of a T stream in proper order.
 */
function listenStream(stream, listener) {
    stream.on('error', error => listener.onError(error));
    stream.on('end', () => listener.onEnd());
    // Adding the `data` listener will turn the stream
    // into flowing mode. As such it is important to
    // add this listener last (DO NOT CHANGE!)
    stream.on('data', data => listener.onData(data));
}
/**
 * Helper to peek up to `maxChunks` into a stream. The return type signals if
 * the stream has ended or not. If not, caller needs to add a `data` listener
 * to continue reading.
 */
function peekStream(stream, maxChunks) {
    return new Promise((resolve, reject) => {
        const streamListeners = new DisposableStore();
        const buffer = [];
        // Data Listener
        const dataListener = (chunk) => {
            // Add to buffer
            buffer.push(chunk);
            // We reached maxChunks and thus need to return
            if (buffer.length > maxChunks) {
                // Dispose any listeners and ensure to pause the
                // stream so that it can be consumed again by caller
                streamListeners.dispose();
                stream.pause();
                return resolve({ stream, buffer, ended: false });
            }
        };
        // Error Listener
        const errorListener = (error) => {
            return reject(error);
        };
        // End Listener
        const endListener = () => {
            return resolve({ stream, buffer, ended: true });
        };
        streamListeners.add(toDisposable(() => stream.removeListener('error', errorListener)));
        stream.on('error', errorListener);
        streamListeners.add(toDisposable(() => stream.removeListener('end', endListener)));
        stream.on('end', endListener);
        // Important: leave the `data` listener last because
        // this can turn the stream into flowing mode and we
        // want `error` events to be received as well.
        streamListeners.add(toDisposable(() => stream.removeListener('data', dataListener)));
        stream.on('data', dataListener);
    });
}
/**
 * Helper to create a readable stream from an existing T.
 */
function toStream(t, reducer) {
    const stream = newWriteableStream(reducer);
    stream.end(t);
    return stream;
}
/**
 * Helper to create an empty stream
 */
function emptyStream() {
    const stream = newWriteableStream(() => { throw new Error('not supported'); });
    stream.end();
    return stream;
}
/**
 * Helper to convert a T into a Readable<T>.
 */
function toReadable(t) {
    let consumed = false;
    return {
        read: () => {
            if (consumed) {
                return null;
            }
            consumed = true;
            return t;
        }
    };
}
/**
 * Helper to transform a readable stream into another stream.
 */
function transform(stream, transformer, reducer) {
    const target = newWriteableStream(reducer);
    listenStream(stream, {
        onData: data => target.write(transformer.data(data)),
        onError: error => target.error(transformer.error ? transformer.error(error) : error),
        onEnd: () => target.end()
    });
    return target;
}
/**
 * Helper to take an existing readable that will
 * have a prefix injected to the beginning.
 */
function prefixedReadable(prefix, readable, reducer) {
    let prefixHandled = false;
    return {
        read: () => {
            const chunk = readable.read();
            // Handle prefix only once
            if (!prefixHandled) {
                prefixHandled = true;
                // If we have also a read-result, make
                // sure to reduce it to a single result
                if (chunk !== null) {
                    return reducer([prefix, chunk]);
                }
                // Otherwise, just return prefix directly
                return prefix;
            }
            return chunk;
        }
    };
}
/**
 * Helper to take an existing stream that will
 * have a prefix injected to the beginning.
 */
function prefixedStream(prefix, stream, reducer) {
    let prefixHandled = false;
    const target = newWriteableStream(reducer);
    listenStream(stream, {
        onData: data => {
            // Handle prefix only once
            if (!prefixHandled) {
                prefixHandled = true;
                return target.write(reducer([prefix, data]));
            }
            return target.write(data);
        },
        onError: error => target.error(error),
        onEnd: () => {
            // Handle prefix only once
            if (!prefixHandled) {
                prefixHandled = true;
                target.write(prefix);
            }
            target.end();
        }
    });
    return target;
}

const hasBuffer = (typeof Buffer !== 'undefined');
const hasTextEncoder = (typeof TextEncoder !== 'undefined');
const hasTextDecoder = (typeof TextDecoder !== 'undefined');
let textEncoder;
let textDecoder;
class QMBuffer {
    constructor(buffer) {
        this.buffer = buffer;
        this.byteLength = this.buffer.length;
    }
    static alloc(byteLength) {
        if (hasBuffer) {
            return new QMBuffer(Buffer.allocUnsafe(byteLength));
        }
        else {
            return new QMBuffer(new Uint8Array(byteLength));
        }
    }
    static wrap(actual) {
        if (hasBuffer && (!Buffer.isBuffer(actual))) {
            actual = Buffer.from(actual.buffer, actual.byteOffset, actual.byteLength);
        }
        return new QMBuffer(actual);
    }
    static fromString(source, options) {
        const dontUseNodeBuffer = (options === null || options === void 0 ? void 0 : options.dontUseNodeBuffer) || false;
        if (!dontUseNodeBuffer && hasBuffer) {
            return new QMBuffer(Buffer.from(source));
        }
        else if (hasTextEncoder) {
            if (!textEncoder) {
                textEncoder = new TextEncoder();
            }
            return new QMBuffer(textEncoder.encode(source));
        }
        else {
            return new QMBuffer(encodeUTF8(source));
        }
    }
    static concat(buffers, totalLength) {
        if (typeof totalLength === 'undefined') {
            totalLength = 0;
            for (let i = 0, len = buffers.length; i < len; i++) {
                totalLength += buffers[i].byteLength;
            }
        }
        const ret = QMBuffer.alloc(totalLength);
        let offset = 0;
        for (let i = 0, len = buffers.length; i < len; i++) {
            const element = buffers[i];
            ret.set(element, offset);
            offset += element.byteLength;
        }
        return ret;
    }
    toString() {
        if (hasBuffer) {
            return this.buffer.toString();
        }
        else if (hasTextDecoder) {
            if (!textDecoder) {
                textDecoder = new TextDecoder();
            }
            return textDecoder.decode(this.buffer);
        }
        else {
            return decodeUTF8(this.buffer);
        }
    }
    slice(start, end) {
        return new QMBuffer(this.buffer.subarray(start, end));
    }
    set(array, offset) {
        if (array instanceof QMBuffer) {
            this.buffer.set(array.buffer, offset);
        }
        else {
            this.buffer.set(array, offset);
        }
    }
    readUInt32BE(offset) {
        return readUInt32BE(this.buffer, offset);
    }
    writeUInt32BE(value, offset) {
        writeUInt32BE(this.buffer, value, offset);
    }
    readUInt32LE(offset) {
        return readUInt32LE(this.buffer, offset);
    }
    writeUInt32LE(value, offset) {
        writeUInt32LE(this.buffer, value, offset);
    }
    readUInt8(offset) {
        return readUInt8(this.buffer, offset);
    }
    writeUInt8(value, offset) {
        writeUInt8(this.buffer, value, offset);
    }
}
function readUInt16LE(source, offset) {
    return (((source[offset + 0] << 0) >>> 0) |
        ((source[offset + 1] << 8) >>> 0));
}
function writeUInt16LE(destination, value, offset) {
    destination[offset + 0] = (value & 0b11111111);
    value = value >>> 8;
    destination[offset + 1] = (value & 0b11111111);
}
function readUInt32BE(source, offset) {
    return (source[offset] * Math.pow(2, 24)
        + source[offset + 1] * Math.pow(2, 16)
        + source[offset + 2] * Math.pow(2, 8)
        + source[offset + 3]);
}
function writeUInt32BE(destination, value, offset) {
    destination[offset + 3] = value;
    value = value >>> 8;
    destination[offset + 2] = value;
    value = value >>> 8;
    destination[offset + 1] = value;
    value = value >>> 8;
    destination[offset] = value;
}
function readUInt32LE(source, offset) {
    return (((source[offset + 0] << 0) >>> 0) |
        ((source[offset + 1] << 8) >>> 0) |
        ((source[offset + 2] << 16) >>> 0) |
        ((source[offset + 3] << 24) >>> 0));
}
function writeUInt32LE(destination, value, offset) {
    destination[offset + 0] = (value & 0b11111111);
    value = value >>> 8;
    destination[offset + 1] = (value & 0b11111111);
    value = value >>> 8;
    destination[offset + 2] = (value & 0b11111111);
    value = value >>> 8;
    destination[offset + 3] = (value & 0b11111111);
}
function readUInt8(source, offset) {
    return source[offset];
}
function writeUInt8(destination, value, offset) {
    destination[offset] = value;
}
function readableToBuffer(readable) {
    return consumeReadable(readable, chunks => QMBuffer.concat(chunks));
}
function bufferToReadable(buffer) {
    return toReadable(buffer);
}
function streamToBuffer(stream) {
    return consumeStream(stream, chunks => QMBuffer.concat(chunks));
}
function bufferedStreamToBuffer(bufferedStream) {
    return __awaiter(this, void 0, void 0, function* () {
        if (bufferedStream.ended) {
            return QMBuffer.concat(bufferedStream.buffer);
        }
        return QMBuffer.concat([
            // Include already read chunks...
            ...bufferedStream.buffer,
            // ...and all additional chunks
            yield streamToBuffer(bufferedStream.stream)
        ]);
    });
}
function bufferToStream(buffer) {
    return toStream(buffer, chunks => QMBuffer.concat(chunks));
}
function streamToBufferReadableStream(stream) {
    return transform(stream, { data: data => typeof data === 'string' ? QMBuffer.fromString(data) : QMBuffer.wrap(data) }, chunks => QMBuffer.concat(chunks));
}
function newWriteableBufferStream(options) {
    return newWriteableStream(chunks => QMBuffer.concat(chunks), options);
}
function prefixedBufferReadable(prefix, readable) {
    return prefixedReadable(prefix, readable, chunks => QMBuffer.concat(chunks));
}
function prefixedBufferStream(prefix, stream) {
    return prefixedStream(prefix, stream, chunks => QMBuffer.concat(chunks));
}

exports.CharCode = void 0;
(function (CharCode) {
    CharCode[CharCode["Null"] = 0] = "Null";
    /**
     * The `\b` character.
     */
    CharCode[CharCode["Backspace"] = 8] = "Backspace";
    /**
     * The `\t` character.
     */
    CharCode[CharCode["Tab"] = 9] = "Tab";
    /**
     * The `\n` character.
     */
    CharCode[CharCode["LineFeed"] = 10] = "LineFeed";
    /**
     * The `\r` character.
     */
    CharCode[CharCode["CarriageReturn"] = 13] = "CarriageReturn";
    CharCode[CharCode["Space"] = 32] = "Space";
    /**
     * The `!` character.
     */
    CharCode[CharCode["ExclamationMark"] = 33] = "ExclamationMark";
    /**
     * The `"` character.
     */
    CharCode[CharCode["DoubleQuote"] = 34] = "DoubleQuote";
    /**
     * The `#` character.
     */
    CharCode[CharCode["Hash"] = 35] = "Hash";
    /**
     * The `$` character.
     */
    CharCode[CharCode["DollarSign"] = 36] = "DollarSign";
    /**
     * The `%` character.
     */
    CharCode[CharCode["PercentSign"] = 37] = "PercentSign";
    /**
     * The `&` character.
     */
    CharCode[CharCode["Ampersand"] = 38] = "Ampersand";
    /**
     * The `'` character.
     */
    CharCode[CharCode["SingleQuote"] = 39] = "SingleQuote";
    /**
     * The `(` character.
     */
    CharCode[CharCode["OpenParen"] = 40] = "OpenParen";
    /**
     * The `)` character.
     */
    CharCode[CharCode["CloseParen"] = 41] = "CloseParen";
    /**
     * The `*` character.
     */
    CharCode[CharCode["Asterisk"] = 42] = "Asterisk";
    /**
     * The `+` character.
     */
    CharCode[CharCode["Plus"] = 43] = "Plus";
    /**
     * The `,` character.
     */
    CharCode[CharCode["Comma"] = 44] = "Comma";
    /**
     * The `-` character.
     */
    CharCode[CharCode["Dash"] = 45] = "Dash";
    /**
     * The `.` character.
     */
    CharCode[CharCode["Period"] = 46] = "Period";
    /**
     * The `/` character.
     */
    CharCode[CharCode["Slash"] = 47] = "Slash";
    CharCode[CharCode["Digit0"] = 48] = "Digit0";
    CharCode[CharCode["Digit1"] = 49] = "Digit1";
    CharCode[CharCode["Digit2"] = 50] = "Digit2";
    CharCode[CharCode["Digit3"] = 51] = "Digit3";
    CharCode[CharCode["Digit4"] = 52] = "Digit4";
    CharCode[CharCode["Digit5"] = 53] = "Digit5";
    CharCode[CharCode["Digit6"] = 54] = "Digit6";
    CharCode[CharCode["Digit7"] = 55] = "Digit7";
    CharCode[CharCode["Digit8"] = 56] = "Digit8";
    CharCode[CharCode["Digit9"] = 57] = "Digit9";
    /**
     * The `:` character.
     */
    CharCode[CharCode["Colon"] = 58] = "Colon";
    /**
     * The `;` character.
     */
    CharCode[CharCode["Semicolon"] = 59] = "Semicolon";
    /**
     * The `<` character.
     */
    CharCode[CharCode["LessThan"] = 60] = "LessThan";
    /**
     * The `=` character.
     */
    CharCode[CharCode["Equals"] = 61] = "Equals";
    /**
     * The `>` character.
     */
    CharCode[CharCode["GreaterThan"] = 62] = "GreaterThan";
    /**
     * The `?` character.
     */
    CharCode[CharCode["QuestionMark"] = 63] = "QuestionMark";
    /**
     * The `@` character.
     */
    CharCode[CharCode["AtSign"] = 64] = "AtSign";
    CharCode[CharCode["A"] = 65] = "A";
    CharCode[CharCode["B"] = 66] = "B";
    CharCode[CharCode["C"] = 67] = "C";
    CharCode[CharCode["D"] = 68] = "D";
    CharCode[CharCode["E"] = 69] = "E";
    CharCode[CharCode["F"] = 70] = "F";
    CharCode[CharCode["G"] = 71] = "G";
    CharCode[CharCode["H"] = 72] = "H";
    CharCode[CharCode["I"] = 73] = "I";
    CharCode[CharCode["J"] = 74] = "J";
    CharCode[CharCode["K"] = 75] = "K";
    CharCode[CharCode["L"] = 76] = "L";
    CharCode[CharCode["M"] = 77] = "M";
    CharCode[CharCode["N"] = 78] = "N";
    CharCode[CharCode["O"] = 79] = "O";
    CharCode[CharCode["P"] = 80] = "P";
    CharCode[CharCode["Q"] = 81] = "Q";
    CharCode[CharCode["R"] = 82] = "R";
    CharCode[CharCode["S"] = 83] = "S";
    CharCode[CharCode["T"] = 84] = "T";
    CharCode[CharCode["U"] = 85] = "U";
    CharCode[CharCode["V"] = 86] = "V";
    CharCode[CharCode["W"] = 87] = "W";
    CharCode[CharCode["X"] = 88] = "X";
    CharCode[CharCode["Y"] = 89] = "Y";
    CharCode[CharCode["Z"] = 90] = "Z";
    /**
     * The `[` character.
     */
    CharCode[CharCode["OpenSquareBracket"] = 91] = "OpenSquareBracket";
    /**
     * The `\` character.
     */
    CharCode[CharCode["Backslash"] = 92] = "Backslash";
    /**
     * The `]` character.
     */
    CharCode[CharCode["CloseSquareBracket"] = 93] = "CloseSquareBracket";
    /**
     * The `^` character.
     */
    CharCode[CharCode["Caret"] = 94] = "Caret";
    /**
     * The `_` character.
     */
    CharCode[CharCode["Underline"] = 95] = "Underline";
    /**
     * The ``(`)`` character.
     */
    CharCode[CharCode["BackTick"] = 96] = "BackTick";
    CharCode[CharCode["a"] = 97] = "a";
    CharCode[CharCode["b"] = 98] = "b";
    CharCode[CharCode["c"] = 99] = "c";
    CharCode[CharCode["d"] = 100] = "d";
    CharCode[CharCode["e"] = 101] = "e";
    CharCode[CharCode["f"] = 102] = "f";
    CharCode[CharCode["g"] = 103] = "g";
    CharCode[CharCode["h"] = 104] = "h";
    CharCode[CharCode["i"] = 105] = "i";
    CharCode[CharCode["j"] = 106] = "j";
    CharCode[CharCode["k"] = 107] = "k";
    CharCode[CharCode["l"] = 108] = "l";
    CharCode[CharCode["m"] = 109] = "m";
    CharCode[CharCode["n"] = 110] = "n";
    CharCode[CharCode["o"] = 111] = "o";
    CharCode[CharCode["p"] = 112] = "p";
    CharCode[CharCode["q"] = 113] = "q";
    CharCode[CharCode["r"] = 114] = "r";
    CharCode[CharCode["s"] = 115] = "s";
    CharCode[CharCode["t"] = 116] = "t";
    CharCode[CharCode["u"] = 117] = "u";
    CharCode[CharCode["v"] = 118] = "v";
    CharCode[CharCode["w"] = 119] = "w";
    CharCode[CharCode["x"] = 120] = "x";
    CharCode[CharCode["y"] = 121] = "y";
    CharCode[CharCode["z"] = 122] = "z";
    /**
     * The `{` character.
     */
    CharCode[CharCode["OpenCurlyBrace"] = 123] = "OpenCurlyBrace";
    /**
     * The `|` character.
     */
    CharCode[CharCode["Pipe"] = 124] = "Pipe";
    /**
     * The `}` character.
     */
    CharCode[CharCode["CloseCurlyBrace"] = 125] = "CloseCurlyBrace";
    /**
     * The `~` character.
     */
    CharCode[CharCode["Tilde"] = 126] = "Tilde";
    CharCode[CharCode["U_Combining_Grave_Accent"] = 768] = "U_Combining_Grave_Accent";
    CharCode[CharCode["U_Combining_Acute_Accent"] = 769] = "U_Combining_Acute_Accent";
    CharCode[CharCode["U_Combining_Circumflex_Accent"] = 770] = "U_Combining_Circumflex_Accent";
    CharCode[CharCode["U_Combining_Tilde"] = 771] = "U_Combining_Tilde";
    CharCode[CharCode["U_Combining_Macron"] = 772] = "U_Combining_Macron";
    CharCode[CharCode["U_Combining_Overline"] = 773] = "U_Combining_Overline";
    CharCode[CharCode["U_Combining_Breve"] = 774] = "U_Combining_Breve";
    CharCode[CharCode["U_Combining_Dot_Above"] = 775] = "U_Combining_Dot_Above";
    CharCode[CharCode["U_Combining_Diaeresis"] = 776] = "U_Combining_Diaeresis";
    CharCode[CharCode["U_Combining_Hook_Above"] = 777] = "U_Combining_Hook_Above";
    CharCode[CharCode["U_Combining_Ring_Above"] = 778] = "U_Combining_Ring_Above";
    CharCode[CharCode["U_Combining_Double_Acute_Accent"] = 779] = "U_Combining_Double_Acute_Accent";
    CharCode[CharCode["U_Combining_Caron"] = 780] = "U_Combining_Caron";
    CharCode[CharCode["U_Combining_Vertical_Line_Above"] = 781] = "U_Combining_Vertical_Line_Above";
    CharCode[CharCode["U_Combining_Double_Vertical_Line_Above"] = 782] = "U_Combining_Double_Vertical_Line_Above";
    CharCode[CharCode["U_Combining_Double_Grave_Accent"] = 783] = "U_Combining_Double_Grave_Accent";
    CharCode[CharCode["U_Combining_Candrabindu"] = 784] = "U_Combining_Candrabindu";
    CharCode[CharCode["U_Combining_Inverted_Breve"] = 785] = "U_Combining_Inverted_Breve";
    CharCode[CharCode["U_Combining_Turned_Comma_Above"] = 786] = "U_Combining_Turned_Comma_Above";
    CharCode[CharCode["U_Combining_Comma_Above"] = 787] = "U_Combining_Comma_Above";
    CharCode[CharCode["U_Combining_Reversed_Comma_Above"] = 788] = "U_Combining_Reversed_Comma_Above";
    CharCode[CharCode["U_Combining_Comma_Above_Right"] = 789] = "U_Combining_Comma_Above_Right";
    CharCode[CharCode["U_Combining_Grave_Accent_Below"] = 790] = "U_Combining_Grave_Accent_Below";
    CharCode[CharCode["U_Combining_Acute_Accent_Below"] = 791] = "U_Combining_Acute_Accent_Below";
    CharCode[CharCode["U_Combining_Left_Tack_Below"] = 792] = "U_Combining_Left_Tack_Below";
    CharCode[CharCode["U_Combining_Right_Tack_Below"] = 793] = "U_Combining_Right_Tack_Below";
    CharCode[CharCode["U_Combining_Left_Angle_Above"] = 794] = "U_Combining_Left_Angle_Above";
    CharCode[CharCode["U_Combining_Horn"] = 795] = "U_Combining_Horn";
    CharCode[CharCode["U_Combining_Left_Half_Ring_Below"] = 796] = "U_Combining_Left_Half_Ring_Below";
    CharCode[CharCode["U_Combining_Up_Tack_Below"] = 797] = "U_Combining_Up_Tack_Below";
    CharCode[CharCode["U_Combining_Down_Tack_Below"] = 798] = "U_Combining_Down_Tack_Below";
    CharCode[CharCode["U_Combining_Plus_Sign_Below"] = 799] = "U_Combining_Plus_Sign_Below";
    CharCode[CharCode["U_Combining_Minus_Sign_Below"] = 800] = "U_Combining_Minus_Sign_Below";
    CharCode[CharCode["U_Combining_Palatalized_Hook_Below"] = 801] = "U_Combining_Palatalized_Hook_Below";
    CharCode[CharCode["U_Combining_Retroflex_Hook_Below"] = 802] = "U_Combining_Retroflex_Hook_Below";
    CharCode[CharCode["U_Combining_Dot_Below"] = 803] = "U_Combining_Dot_Below";
    CharCode[CharCode["U_Combining_Diaeresis_Below"] = 804] = "U_Combining_Diaeresis_Below";
    CharCode[CharCode["U_Combining_Ring_Below"] = 805] = "U_Combining_Ring_Below";
    CharCode[CharCode["U_Combining_Comma_Below"] = 806] = "U_Combining_Comma_Below";
    CharCode[CharCode["U_Combining_Cedilla"] = 807] = "U_Combining_Cedilla";
    CharCode[CharCode["U_Combining_Ogonek"] = 808] = "U_Combining_Ogonek";
    CharCode[CharCode["U_Combining_Vertical_Line_Below"] = 809] = "U_Combining_Vertical_Line_Below";
    CharCode[CharCode["U_Combining_Bridge_Below"] = 810] = "U_Combining_Bridge_Below";
    CharCode[CharCode["U_Combining_Inverted_Double_Arch_Below"] = 811] = "U_Combining_Inverted_Double_Arch_Below";
    CharCode[CharCode["U_Combining_Caron_Below"] = 812] = "U_Combining_Caron_Below";
    CharCode[CharCode["U_Combining_Circumflex_Accent_Below"] = 813] = "U_Combining_Circumflex_Accent_Below";
    CharCode[CharCode["U_Combining_Breve_Below"] = 814] = "U_Combining_Breve_Below";
    CharCode[CharCode["U_Combining_Inverted_Breve_Below"] = 815] = "U_Combining_Inverted_Breve_Below";
    CharCode[CharCode["U_Combining_Tilde_Below"] = 816] = "U_Combining_Tilde_Below";
    CharCode[CharCode["U_Combining_Macron_Below"] = 817] = "U_Combining_Macron_Below";
    CharCode[CharCode["U_Combining_Low_Line"] = 818] = "U_Combining_Low_Line";
    CharCode[CharCode["U_Combining_Double_Low_Line"] = 819] = "U_Combining_Double_Low_Line";
    CharCode[CharCode["U_Combining_Tilde_Overlay"] = 820] = "U_Combining_Tilde_Overlay";
    CharCode[CharCode["U_Combining_Short_Stroke_Overlay"] = 821] = "U_Combining_Short_Stroke_Overlay";
    CharCode[CharCode["U_Combining_Long_Stroke_Overlay"] = 822] = "U_Combining_Long_Stroke_Overlay";
    CharCode[CharCode["U_Combining_Short_Solidus_Overlay"] = 823] = "U_Combining_Short_Solidus_Overlay";
    CharCode[CharCode["U_Combining_Long_Solidus_Overlay"] = 824] = "U_Combining_Long_Solidus_Overlay";
    CharCode[CharCode["U_Combining_Right_Half_Ring_Below"] = 825] = "U_Combining_Right_Half_Ring_Below";
    CharCode[CharCode["U_Combining_Inverted_Bridge_Below"] = 826] = "U_Combining_Inverted_Bridge_Below";
    CharCode[CharCode["U_Combining_Square_Below"] = 827] = "U_Combining_Square_Below";
    CharCode[CharCode["U_Combining_Seagull_Below"] = 828] = "U_Combining_Seagull_Below";
    CharCode[CharCode["U_Combining_X_Above"] = 829] = "U_Combining_X_Above";
    CharCode[CharCode["U_Combining_Vertical_Tilde"] = 830] = "U_Combining_Vertical_Tilde";
    CharCode[CharCode["U_Combining_Double_Overline"] = 831] = "U_Combining_Double_Overline";
    CharCode[CharCode["U_Combining_Grave_Tone_Mark"] = 832] = "U_Combining_Grave_Tone_Mark";
    CharCode[CharCode["U_Combining_Acute_Tone_Mark"] = 833] = "U_Combining_Acute_Tone_Mark";
    CharCode[CharCode["U_Combining_Greek_Perispomeni"] = 834] = "U_Combining_Greek_Perispomeni";
    CharCode[CharCode["U_Combining_Greek_Koronis"] = 835] = "U_Combining_Greek_Koronis";
    CharCode[CharCode["U_Combining_Greek_Dialytika_Tonos"] = 836] = "U_Combining_Greek_Dialytika_Tonos";
    CharCode[CharCode["U_Combining_Greek_Ypogegrammeni"] = 837] = "U_Combining_Greek_Ypogegrammeni";
    CharCode[CharCode["U_Combining_Bridge_Above"] = 838] = "U_Combining_Bridge_Above";
    CharCode[CharCode["U_Combining_Equals_Sign_Below"] = 839] = "U_Combining_Equals_Sign_Below";
    CharCode[CharCode["U_Combining_Double_Vertical_Line_Below"] = 840] = "U_Combining_Double_Vertical_Line_Below";
    CharCode[CharCode["U_Combining_Left_Angle_Below"] = 841] = "U_Combining_Left_Angle_Below";
    CharCode[CharCode["U_Combining_Not_Tilde_Above"] = 842] = "U_Combining_Not_Tilde_Above";
    CharCode[CharCode["U_Combining_Homothetic_Above"] = 843] = "U_Combining_Homothetic_Above";
    CharCode[CharCode["U_Combining_Almost_Equal_To_Above"] = 844] = "U_Combining_Almost_Equal_To_Above";
    CharCode[CharCode["U_Combining_Left_Right_Arrow_Below"] = 845] = "U_Combining_Left_Right_Arrow_Below";
    CharCode[CharCode["U_Combining_Upwards_Arrow_Below"] = 846] = "U_Combining_Upwards_Arrow_Below";
    CharCode[CharCode["U_Combining_Grapheme_Joiner"] = 847] = "U_Combining_Grapheme_Joiner";
    CharCode[CharCode["U_Combining_Right_Arrowhead_Above"] = 848] = "U_Combining_Right_Arrowhead_Above";
    CharCode[CharCode["U_Combining_Left_Half_Ring_Above"] = 849] = "U_Combining_Left_Half_Ring_Above";
    CharCode[CharCode["U_Combining_Fermata"] = 850] = "U_Combining_Fermata";
    CharCode[CharCode["U_Combining_X_Below"] = 851] = "U_Combining_X_Below";
    CharCode[CharCode["U_Combining_Left_Arrowhead_Below"] = 852] = "U_Combining_Left_Arrowhead_Below";
    CharCode[CharCode["U_Combining_Right_Arrowhead_Below"] = 853] = "U_Combining_Right_Arrowhead_Below";
    CharCode[CharCode["U_Combining_Right_Arrowhead_And_Up_Arrowhead_Below"] = 854] = "U_Combining_Right_Arrowhead_And_Up_Arrowhead_Below";
    CharCode[CharCode["U_Combining_Right_Half_Ring_Above"] = 855] = "U_Combining_Right_Half_Ring_Above";
    CharCode[CharCode["U_Combining_Dot_Above_Right"] = 856] = "U_Combining_Dot_Above_Right";
    CharCode[CharCode["U_Combining_Asterisk_Below"] = 857] = "U_Combining_Asterisk_Below";
    CharCode[CharCode["U_Combining_Double_Ring_Below"] = 858] = "U_Combining_Double_Ring_Below";
    CharCode[CharCode["U_Combining_Zigzag_Above"] = 859] = "U_Combining_Zigzag_Above";
    CharCode[CharCode["U_Combining_Double_Breve_Below"] = 860] = "U_Combining_Double_Breve_Below";
    CharCode[CharCode["U_Combining_Double_Breve"] = 861] = "U_Combining_Double_Breve";
    CharCode[CharCode["U_Combining_Double_Macron"] = 862] = "U_Combining_Double_Macron";
    CharCode[CharCode["U_Combining_Double_Macron_Below"] = 863] = "U_Combining_Double_Macron_Below";
    CharCode[CharCode["U_Combining_Double_Tilde"] = 864] = "U_Combining_Double_Tilde";
    CharCode[CharCode["U_Combining_Double_Inverted_Breve"] = 865] = "U_Combining_Double_Inverted_Breve";
    CharCode[CharCode["U_Combining_Double_Rightwards_Arrow_Below"] = 866] = "U_Combining_Double_Rightwards_Arrow_Below";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_A"] = 867] = "U_Combining_Latin_Small_Letter_A";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_E"] = 868] = "U_Combining_Latin_Small_Letter_E";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_I"] = 869] = "U_Combining_Latin_Small_Letter_I";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_O"] = 870] = "U_Combining_Latin_Small_Letter_O";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_U"] = 871] = "U_Combining_Latin_Small_Letter_U";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_C"] = 872] = "U_Combining_Latin_Small_Letter_C";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_D"] = 873] = "U_Combining_Latin_Small_Letter_D";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_H"] = 874] = "U_Combining_Latin_Small_Letter_H";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_M"] = 875] = "U_Combining_Latin_Small_Letter_M";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_R"] = 876] = "U_Combining_Latin_Small_Letter_R";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_T"] = 877] = "U_Combining_Latin_Small_Letter_T";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_V"] = 878] = "U_Combining_Latin_Small_Letter_V";
    CharCode[CharCode["U_Combining_Latin_Small_Letter_X"] = 879] = "U_Combining_Latin_Small_Letter_X";
    /**
     * Unicode Character 'LINE SEPARATOR' (U+2028)
     * http://www.fileformat.info/info/unicode/char/2028/index.htm
     */
    CharCode[CharCode["LINE_SEPARATOR"] = 8232] = "LINE_SEPARATOR";
    /**
     * Unicode Character 'PARAGRAPH SEPARATOR' (U+2029)
     * http://www.fileformat.info/info/unicode/char/2029/index.htm
     */
    CharCode[CharCode["PARAGRAPH_SEPARATOR"] = 8233] = "PARAGRAPH_SEPARATOR";
    /**
     * Unicode Character 'NEXT LINE' (U+0085)
     * http://www.fileformat.info/info/unicode/char/0085/index.htm
     */
    CharCode[CharCode["NEXT_LINE"] = 133] = "NEXT_LINE";
    // http://www.fileformat.info/info/unicode/category/Sk/list.htm
    CharCode[CharCode["U_CIRCUMFLEX"] = 94] = "U_CIRCUMFLEX";
    CharCode[CharCode["U_GRAVE_ACCENT"] = 96] = "U_GRAVE_ACCENT";
    CharCode[CharCode["U_DIAERESIS"] = 168] = "U_DIAERESIS";
    CharCode[CharCode["U_MACRON"] = 175] = "U_MACRON";
    CharCode[CharCode["U_ACUTE_ACCENT"] = 180] = "U_ACUTE_ACCENT";
    CharCode[CharCode["U_CEDILLA"] = 184] = "U_CEDILLA";
    CharCode[CharCode["U_MODIFIER_LETTER_LEFT_ARROWHEAD"] = 706] = "U_MODIFIER_LETTER_LEFT_ARROWHEAD";
    CharCode[CharCode["U_MODIFIER_LETTER_RIGHT_ARROWHEAD"] = 707] = "U_MODIFIER_LETTER_RIGHT_ARROWHEAD";
    CharCode[CharCode["U_MODIFIER_LETTER_UP_ARROWHEAD"] = 708] = "U_MODIFIER_LETTER_UP_ARROWHEAD";
    CharCode[CharCode["U_MODIFIER_LETTER_DOWN_ARROWHEAD"] = 709] = "U_MODIFIER_LETTER_DOWN_ARROWHEAD";
    CharCode[CharCode["U_MODIFIER_LETTER_CENTRED_RIGHT_HALF_RING"] = 722] = "U_MODIFIER_LETTER_CENTRED_RIGHT_HALF_RING";
    CharCode[CharCode["U_MODIFIER_LETTER_CENTRED_LEFT_HALF_RING"] = 723] = "U_MODIFIER_LETTER_CENTRED_LEFT_HALF_RING";
    CharCode[CharCode["U_MODIFIER_LETTER_UP_TACK"] = 724] = "U_MODIFIER_LETTER_UP_TACK";
    CharCode[CharCode["U_MODIFIER_LETTER_DOWN_TACK"] = 725] = "U_MODIFIER_LETTER_DOWN_TACK";
    CharCode[CharCode["U_MODIFIER_LETTER_PLUS_SIGN"] = 726] = "U_MODIFIER_LETTER_PLUS_SIGN";
    CharCode[CharCode["U_MODIFIER_LETTER_MINUS_SIGN"] = 727] = "U_MODIFIER_LETTER_MINUS_SIGN";
    CharCode[CharCode["U_BREVE"] = 728] = "U_BREVE";
    CharCode[CharCode["U_DOT_ABOVE"] = 729] = "U_DOT_ABOVE";
    CharCode[CharCode["U_RING_ABOVE"] = 730] = "U_RING_ABOVE";
    CharCode[CharCode["U_OGONEK"] = 731] = "U_OGONEK";
    CharCode[CharCode["U_SMALL_TILDE"] = 732] = "U_SMALL_TILDE";
    CharCode[CharCode["U_DOUBLE_ACUTE_ACCENT"] = 733] = "U_DOUBLE_ACUTE_ACCENT";
    CharCode[CharCode["U_MODIFIER_LETTER_RHOTIC_HOOK"] = 734] = "U_MODIFIER_LETTER_RHOTIC_HOOK";
    CharCode[CharCode["U_MODIFIER_LETTER_CROSS_ACCENT"] = 735] = "U_MODIFIER_LETTER_CROSS_ACCENT";
    CharCode[CharCode["U_MODIFIER_LETTER_EXTRA_HIGH_TONE_BAR"] = 741] = "U_MODIFIER_LETTER_EXTRA_HIGH_TONE_BAR";
    CharCode[CharCode["U_MODIFIER_LETTER_HIGH_TONE_BAR"] = 742] = "U_MODIFIER_LETTER_HIGH_TONE_BAR";
    CharCode[CharCode["U_MODIFIER_LETTER_MID_TONE_BAR"] = 743] = "U_MODIFIER_LETTER_MID_TONE_BAR";
    CharCode[CharCode["U_MODIFIER_LETTER_LOW_TONE_BAR"] = 744] = "U_MODIFIER_LETTER_LOW_TONE_BAR";
    CharCode[CharCode["U_MODIFIER_LETTER_EXTRA_LOW_TONE_BAR"] = 745] = "U_MODIFIER_LETTER_EXTRA_LOW_TONE_BAR";
    CharCode[CharCode["U_MODIFIER_LETTER_YIN_DEPARTING_TONE_MARK"] = 746] = "U_MODIFIER_LETTER_YIN_DEPARTING_TONE_MARK";
    CharCode[CharCode["U_MODIFIER_LETTER_YANG_DEPARTING_TONE_MARK"] = 747] = "U_MODIFIER_LETTER_YANG_DEPARTING_TONE_MARK";
    CharCode[CharCode["U_MODIFIER_LETTER_UNASPIRATED"] = 749] = "U_MODIFIER_LETTER_UNASPIRATED";
    CharCode[CharCode["U_MODIFIER_LETTER_LOW_DOWN_ARROWHEAD"] = 751] = "U_MODIFIER_LETTER_LOW_DOWN_ARROWHEAD";
    CharCode[CharCode["U_MODIFIER_LETTER_LOW_UP_ARROWHEAD"] = 752] = "U_MODIFIER_LETTER_LOW_UP_ARROWHEAD";
    CharCode[CharCode["U_MODIFIER_LETTER_LOW_LEFT_ARROWHEAD"] = 753] = "U_MODIFIER_LETTER_LOW_LEFT_ARROWHEAD";
    CharCode[CharCode["U_MODIFIER_LETTER_LOW_RIGHT_ARROWHEAD"] = 754] = "U_MODIFIER_LETTER_LOW_RIGHT_ARROWHEAD";
    CharCode[CharCode["U_MODIFIER_LETTER_LOW_RING"] = 755] = "U_MODIFIER_LETTER_LOW_RING";
    CharCode[CharCode["U_MODIFIER_LETTER_MIDDLE_GRAVE_ACCENT"] = 756] = "U_MODIFIER_LETTER_MIDDLE_GRAVE_ACCENT";
    CharCode[CharCode["U_MODIFIER_LETTER_MIDDLE_DOUBLE_GRAVE_ACCENT"] = 757] = "U_MODIFIER_LETTER_MIDDLE_DOUBLE_GRAVE_ACCENT";
    CharCode[CharCode["U_MODIFIER_LETTER_MIDDLE_DOUBLE_ACUTE_ACCENT"] = 758] = "U_MODIFIER_LETTER_MIDDLE_DOUBLE_ACUTE_ACCENT";
    CharCode[CharCode["U_MODIFIER_LETTER_LOW_TILDE"] = 759] = "U_MODIFIER_LETTER_LOW_TILDE";
    CharCode[CharCode["U_MODIFIER_LETTER_RAISED_COLON"] = 760] = "U_MODIFIER_LETTER_RAISED_COLON";
    CharCode[CharCode["U_MODIFIER_LETTER_BEGIN_HIGH_TONE"] = 761] = "U_MODIFIER_LETTER_BEGIN_HIGH_TONE";
    CharCode[CharCode["U_MODIFIER_LETTER_END_HIGH_TONE"] = 762] = "U_MODIFIER_LETTER_END_HIGH_TONE";
    CharCode[CharCode["U_MODIFIER_LETTER_BEGIN_LOW_TONE"] = 763] = "U_MODIFIER_LETTER_BEGIN_LOW_TONE";
    CharCode[CharCode["U_MODIFIER_LETTER_END_LOW_TONE"] = 764] = "U_MODIFIER_LETTER_END_LOW_TONE";
    CharCode[CharCode["U_MODIFIER_LETTER_SHELF"] = 765] = "U_MODIFIER_LETTER_SHELF";
    CharCode[CharCode["U_MODIFIER_LETTER_OPEN_SHELF"] = 766] = "U_MODIFIER_LETTER_OPEN_SHELF";
    CharCode[CharCode["U_MODIFIER_LETTER_LOW_LEFT_ARROW"] = 767] = "U_MODIFIER_LETTER_LOW_LEFT_ARROW";
    CharCode[CharCode["U_GREEK_LOWER_NUMERAL_SIGN"] = 885] = "U_GREEK_LOWER_NUMERAL_SIGN";
    CharCode[CharCode["U_GREEK_TONOS"] = 900] = "U_GREEK_TONOS";
    CharCode[CharCode["U_GREEK_DIALYTIKA_TONOS"] = 901] = "U_GREEK_DIALYTIKA_TONOS";
    CharCode[CharCode["U_GREEK_KORONIS"] = 8125] = "U_GREEK_KORONIS";
    CharCode[CharCode["U_GREEK_PSILI"] = 8127] = "U_GREEK_PSILI";
    CharCode[CharCode["U_GREEK_PERISPOMENI"] = 8128] = "U_GREEK_PERISPOMENI";
    CharCode[CharCode["U_GREEK_DIALYTIKA_AND_PERISPOMENI"] = 8129] = "U_GREEK_DIALYTIKA_AND_PERISPOMENI";
    CharCode[CharCode["U_GREEK_PSILI_AND_VARIA"] = 8141] = "U_GREEK_PSILI_AND_VARIA";
    CharCode[CharCode["U_GREEK_PSILI_AND_OXIA"] = 8142] = "U_GREEK_PSILI_AND_OXIA";
    CharCode[CharCode["U_GREEK_PSILI_AND_PERISPOMENI"] = 8143] = "U_GREEK_PSILI_AND_PERISPOMENI";
    CharCode[CharCode["U_GREEK_DASIA_AND_VARIA"] = 8157] = "U_GREEK_DASIA_AND_VARIA";
    CharCode[CharCode["U_GREEK_DASIA_AND_OXIA"] = 8158] = "U_GREEK_DASIA_AND_OXIA";
    CharCode[CharCode["U_GREEK_DASIA_AND_PERISPOMENI"] = 8159] = "U_GREEK_DASIA_AND_PERISPOMENI";
    CharCode[CharCode["U_GREEK_DIALYTIKA_AND_VARIA"] = 8173] = "U_GREEK_DIALYTIKA_AND_VARIA";
    CharCode[CharCode["U_GREEK_DIALYTIKA_AND_OXIA"] = 8174] = "U_GREEK_DIALYTIKA_AND_OXIA";
    CharCode[CharCode["U_GREEK_VARIA"] = 8175] = "U_GREEK_VARIA";
    CharCode[CharCode["U_GREEK_OXIA"] = 8189] = "U_GREEK_OXIA";
    CharCode[CharCode["U_GREEK_DASIA"] = 8190] = "U_GREEK_DASIA";
    CharCode[CharCode["U_OVERLINE"] = 8254] = "U_OVERLINE";
    /**
     * UTF-8 BOM
     * Unicode Character 'ZERO WIDTH NO-BREAK SPACE' (U+FEFF)
     * http://www.fileformat.info/info/unicode/char/feff/index.htm
     */
    CharCode[CharCode["UTF8_BOM"] = 65279] = "UTF8_BOM";
})(exports.CharCode || (exports.CharCode = {}));

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;
function fromNow(date, appendAgoLabel) {
    if (typeof date !== 'number') {
        date = date.getTime();
    }
    const seconds = Math.round((new Date().getTime() - date) / 1000);
    if (seconds < -30) {
        return `date.fromNow.in, in ${fromNow(new Date().getTime() + seconds * 1000, false)}`;
    }
    if (seconds < 30) {
        return 'now';
    }
    let value;
    if (seconds < minute) {
        value = seconds;
        if (appendAgoLabel) {
            return value === 1
                ? `${value} sec ago`
                : `${value} secs ago`;
        }
        else {
            return value === 1
                ? `${value} sec`
                : `${value} secs`;
        }
    }
    if (seconds < hour) {
        value = Math.floor(seconds / minute);
        if (appendAgoLabel) {
            return value === 1
                ? `${value} min ago`
                : `${value} mins ago`;
        }
        else {
            return value === 1
                ? `${value} min`
                : `${value} mins`;
        }
    }
    if (seconds < day) {
        value = Math.floor(seconds / hour);
        if (appendAgoLabel) {
            return value === 1
                ? `${value} hr ago`
                : `${value} hrs ago`;
        }
        else {
            return value === 1
                ? `${value} hr`
                : `${value} hrs`;
        }
    }
    if (seconds < week) {
        value = Math.floor(seconds / day);
        if (appendAgoLabel) {
            return value === 1
                ? `${value} day ago`
                : `${value} days ago`;
        }
        else {
            return value === 1
                ? `${value} day`
                : `${value} days`;
        }
    }
    if (seconds < month) {
        value = Math.floor(seconds / week);
        if (appendAgoLabel) {
            return value === 1
                ? `${value} wk ago`
                : `${value} wks ago`;
        }
        else {
            return value === 1
                ? `${value} wk`
                : `${value} wks`;
        }
    }
    if (seconds < year) {
        value = Math.floor(seconds / month);
        if (appendAgoLabel) {
            return value === 1
                ? `${value} mo ago`
                : `${value} mos ago`;
        }
        else {
            return value === 1
                ? `${value} mo`
                : `${value} mos`;
        }
    }
    value = Math.floor(seconds / year);
    if (appendAgoLabel) {
        return value === 1
            ? `${value} yr ago`
            : `${value} yrs ago`;
    }
    else {
        return value === 1
            ? `${value} yr`
            : `${value} yrs`;
    }
}
function toLocalISOString(date) {
    return date.getFullYear() +
        '-' + String(date.getMonth() + 1).padStart(2, '0') +
        '-' + String(date.getDate()).padStart(2, '0') +
        'T' + String(date.getHours()).padStart(2, '0') +
        ':' + String(date.getMinutes()).padStart(2, '0') +
        ':' + String(date.getSeconds()).padStart(2, '0') +
        '.' + (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        'Z';
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function exceptionToErrorMessage(exception, verbose) {
    if (verbose && (exception.stack || exception.stacktrace)) {
        return `${detectSystemErrorMessage(exception)}: ${stackToString(exception.stack) || stackToString(exception.stacktrace)}`;
    }
    return detectSystemErrorMessage(exception);
}
function stackToString(stack) {
    if (Array.isArray(stack)) {
        return stack.join('\n');
    }
    return stack;
}
function detectSystemErrorMessage(exception) {
    // See https://nodejs.org/api/errors.html#errors_class_system_error
    if (typeof exception.code === 'string' && typeof exception.errno === 'number' && typeof exception.syscall === 'string') {
        return `A system error occurred (${exception.message})`;
    }
    return exception.message || "An unknown error occurred. Please consult the log for more details.";
}
/**
 * Tries to generate a human readable error message out of the error. If the verbose parameter
 * is set to true, the error message will include stacktrace details if provided.
 *
 * @returns A string containing the error message.
 */
function toErrorMessage(error = null, verbose = false) {
    if (!error) {
        return "An unknown error occurred. Please consult the log for more details.";
    }
    if (Array.isArray(error)) {
        const errors = coalesce(error);
        const msg = toErrorMessage(errors[0], verbose);
        if (errors.length > 1) {
            return `${msg} (${errors.length} errors in total)`;
        }
        return msg;
    }
    if (isString(error)) {
        return error;
    }
    if (error.detail) {
        const detail = error.detail;
        if (detail.error) {
            return exceptionToErrorMessage(detail.error, verbose);
        }
        if (detail.exception) {
            return exceptionToErrorMessage(detail.exception, verbose);
        }
    }
    if (error.stack) {
        return exceptionToErrorMessage(error, verbose);
    }
    if (error.message) {
        return error.message;
    }
    return "An unknown error occurred. Please consult the log for more details.";
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var _a, _b, _ReadonlyMapView_source;
function getOrSet(map, key, value) {
    let result = map.get(key);
    if (result === undefined) {
        result = value;
        map.set(key, result);
    }
    return result;
}
function mapToString(map) {
    const entries = [];
    map.forEach((value, key) => {
        entries.push(`${key} => ${value}`);
    });
    return `Map(${map.size}) {${entries.join(', ')}}`;
}
function setToString(set) {
    const entries = [];
    set.forEach(value => {
        entries.push(value);
    });
    return `Set(${set.size}) {${entries.join(', ')}}`;
}
class StringIterator {
    constructor() {
        this._value = '';
        this._pos = 0;
    }
    reset(key) {
        this._value = key;
        this._pos = 0;
        return this;
    }
    next() {
        this._pos += 1;
        return this;
    }
    hasNext() {
        return this._pos < this._value.length - 1;
    }
    cmp(a) {
        const aCode = a.charCodeAt(0);
        const thisCode = this._value.charCodeAt(this._pos);
        return aCode - thisCode;
    }
    value() {
        return this._value[this._pos];
    }
}
class ConfigKeysIterator {
    constructor(_caseSensitive = true) {
        this._caseSensitive = _caseSensitive;
    }
    reset(key) {
        this._value = key;
        this._from = 0;
        this._to = 0;
        return this.next();
    }
    hasNext() {
        return this._to < this._value.length;
    }
    next() {
        // this._data = key.split(/[\\/]/).filter(s => !!s);
        this._from = this._to;
        let justSeps = true;
        for (; this._to < this._value.length; this._to++) {
            const ch = this._value.charCodeAt(this._to);
            if (ch === 46 /* Period */) {
                if (justSeps) {
                    this._from++;
                }
                else {
                    break;
                }
            }
            else {
                justSeps = false;
            }
        }
        return this;
    }
    cmp(a) {
        return this._caseSensitive
            ? compareSubstring(a, this._value, 0, a.length, this._from, this._to)
            : compareSubstringIgnoreCase(a, this._value, 0, a.length, this._from, this._to);
    }
    value() {
        return this._value.substring(this._from, this._to);
    }
}
class PathIterator {
    constructor(_splitOnBackslash = true, _caseSensitive = true) {
        this._splitOnBackslash = _splitOnBackslash;
        this._caseSensitive = _caseSensitive;
    }
    reset(key) {
        this._value = key.replace(/\\$|\/$/, '');
        this._from = 0;
        this._to = 0;
        return this.next();
    }
    hasNext() {
        return this._to < this._value.length;
    }
    next() {
        // this._data = key.split(/[\\/]/).filter(s => !!s);
        this._from = this._to;
        let justSeps = true;
        for (; this._to < this._value.length; this._to++) {
            const ch = this._value.charCodeAt(this._to);
            if (ch === 47 /* Slash */ || this._splitOnBackslash && ch === 92 /* Backslash */) {
                if (justSeps) {
                    this._from++;
                }
                else {
                    break;
                }
            }
            else {
                justSeps = false;
            }
        }
        return this;
    }
    cmp(a) {
        return this._caseSensitive
            ? compareSubstring(a, this._value, 0, a.length, this._from, this._to)
            : compareSubstringIgnoreCase(a, this._value, 0, a.length, this._from, this._to);
    }
    value() {
        return this._value.substring(this._from, this._to);
    }
}
var UriIteratorState;
(function (UriIteratorState) {
    UriIteratorState[UriIteratorState["Scheme"] = 1] = "Scheme";
    UriIteratorState[UriIteratorState["Authority"] = 2] = "Authority";
    UriIteratorState[UriIteratorState["Path"] = 3] = "Path";
    UriIteratorState[UriIteratorState["Query"] = 4] = "Query";
    UriIteratorState[UriIteratorState["Fragment"] = 5] = "Fragment";
})(UriIteratorState || (UriIteratorState = {}));
class UriIterator {
    constructor(_ignorePathCasing) {
        this._ignorePathCasing = _ignorePathCasing;
        this._states = [];
        this._stateIdx = 0;
    }
    reset(key) {
        this._value = key;
        this._states = [];
        if (this._value.scheme) {
            this._states.push(1 /* Scheme */);
        }
        if (this._value.authority) {
            this._states.push(2 /* Authority */);
        }
        if (this._value.path) {
            this._pathIterator = new PathIterator(false, !this._ignorePathCasing(key));
            this._pathIterator.reset(key.path);
            if (this._pathIterator.value()) {
                this._states.push(3 /* Path */);
            }
        }
        if (this._value.query) {
            this._states.push(4 /* Query */);
        }
        if (this._value.fragment) {
            this._states.push(5 /* Fragment */);
        }
        this._stateIdx = 0;
        return this;
    }
    next() {
        if (this._states[this._stateIdx] === 3 /* Path */ && this._pathIterator.hasNext()) {
            this._pathIterator.next();
        }
        else {
            this._stateIdx += 1;
        }
        return this;
    }
    hasNext() {
        return (this._states[this._stateIdx] === 3 /* Path */ && this._pathIterator.hasNext())
            || this._stateIdx < this._states.length - 1;
    }
    cmp(a) {
        if (this._states[this._stateIdx] === 1 /* Scheme */) {
            return compareIgnoreCase(a, this._value.scheme);
        }
        else if (this._states[this._stateIdx] === 2 /* Authority */) {
            return compareIgnoreCase(a, this._value.authority);
        }
        else if (this._states[this._stateIdx] === 3 /* Path */) {
            return this._pathIterator.cmp(a);
        }
        else if (this._states[this._stateIdx] === 4 /* Query */) {
            return compare(a, this._value.query);
        }
        else if (this._states[this._stateIdx] === 5 /* Fragment */) {
            return compare(a, this._value.fragment);
        }
        throw new Error();
    }
    value() {
        if (this._states[this._stateIdx] === 1 /* Scheme */) {
            return this._value.scheme;
        }
        else if (this._states[this._stateIdx] === 2 /* Authority */) {
            return this._value.authority;
        }
        else if (this._states[this._stateIdx] === 3 /* Path */) {
            return this._pathIterator.value();
        }
        else if (this._states[this._stateIdx] === 4 /* Query */) {
            return this._value.query;
        }
        else if (this._states[this._stateIdx] === 5 /* Fragment */) {
            return this._value.fragment;
        }
        throw new Error();
    }
}
class TernarySearchTreeNode {
    isEmpty() {
        return !this.left && !this.mid && !this.right && !this.value;
    }
}
class TernarySearchTree {
    constructor(segments) {
        this._iter = segments;
    }
    static forUris(ignorePathCasing = () => false) {
        return new TernarySearchTree(new UriIterator(ignorePathCasing));
    }
    static forPaths() {
        return new TernarySearchTree(new PathIterator());
    }
    static forStrings() {
        return new TernarySearchTree(new StringIterator());
    }
    static forConfigKeys() {
        return new TernarySearchTree(new ConfigKeysIterator());
    }
    clear() {
        this._root = undefined;
    }
    set(key, element) {
        const iter = this._iter.reset(key);
        let node;
        if (!this._root) {
            this._root = new TernarySearchTreeNode();
            this._root.segment = iter.value();
        }
        node = this._root;
        while (true) {
            const val = iter.cmp(node.segment);
            if (val > 0) {
                // left
                if (!node.left) {
                    node.left = new TernarySearchTreeNode();
                    node.left.segment = iter.value();
                }
                node = node.left;
            }
            else if (val < 0) {
                // right
                if (!node.right) {
                    node.right = new TernarySearchTreeNode();
                    node.right.segment = iter.value();
                }
                node = node.right;
            }
            else if (iter.hasNext()) {
                // mid
                iter.next();
                if (!node.mid) {
                    node.mid = new TernarySearchTreeNode();
                    node.mid.segment = iter.value();
                }
                node = node.mid;
            }
            else {
                break;
            }
        }
        const oldElement = node.value;
        node.value = element;
        node.key = key;
        return oldElement;
    }
    get(key) {
        var _c;
        return (_c = this._getNode(key)) === null || _c === void 0 ? void 0 : _c.value;
    }
    _getNode(key) {
        const iter = this._iter.reset(key);
        let node = this._root;
        while (node) {
            const val = iter.cmp(node.segment);
            if (val > 0) {
                // left
                node = node.left;
            }
            else if (val < 0) {
                // right
                node = node.right;
            }
            else if (iter.hasNext()) {
                // mid
                iter.next();
                node = node.mid;
            }
            else {
                break;
            }
        }
        return node;
    }
    has(key) {
        const node = this._getNode(key);
        return !((node === null || node === void 0 ? void 0 : node.value) === undefined && (node === null || node === void 0 ? void 0 : node.mid) === undefined);
    }
    delete(key) {
        return this._delete(key, false);
    }
    deleteSuperstr(key) {
        return this._delete(key, true);
    }
    _delete(key, superStr) {
        const iter = this._iter.reset(key);
        const stack = [];
        let node = this._root;
        // find and unset node
        while (node) {
            const val = iter.cmp(node.segment);
            if (val > 0) {
                // left
                stack.push([1, node]);
                node = node.left;
            }
            else if (val < 0) {
                // right
                stack.push([-1, node]);
                node = node.right;
            }
            else if (iter.hasNext()) {
                // mid
                iter.next();
                stack.push([0, node]);
                node = node.mid;
            }
            else {
                if (superStr) {
                    // remove children
                    node.left = undefined;
                    node.mid = undefined;
                    node.right = undefined;
                }
                else {
                    // remove element
                    node.value = undefined;
                }
                // clean up empty nodes
                while (stack.length > 0 && node.isEmpty()) {
                    let [dir, parent] = stack.pop();
                    switch (dir) {
                        case 1:
                            parent.left = undefined;
                            break;
                        case 0:
                            parent.mid = undefined;
                            break;
                        case -1:
                            parent.right = undefined;
                            break;
                    }
                    node = parent;
                }
                break;
            }
        }
    }
    findSubstr(key) {
        const iter = this._iter.reset(key);
        let node = this._root;
        let candidate = undefined;
        while (node) {
            const val = iter.cmp(node.segment);
            if (val > 0) {
                // left
                node = node.left;
            }
            else if (val < 0) {
                // right
                node = node.right;
            }
            else if (iter.hasNext()) {
                // mid
                iter.next();
                candidate = node.value || candidate;
                node = node.mid;
            }
            else {
                break;
            }
        }
        return node && node.value || candidate;
    }
    findSuperstr(key) {
        const iter = this._iter.reset(key);
        let node = this._root;
        while (node) {
            const val = iter.cmp(node.segment);
            if (val > 0) {
                // left
                node = node.left;
            }
            else if (val < 0) {
                // right
                node = node.right;
            }
            else if (iter.hasNext()) {
                // mid
                iter.next();
                node = node.mid;
            }
            else {
                // collect
                if (!node.mid) {
                    return undefined;
                }
                else {
                    return this._entries(node.mid);
                }
            }
        }
        return undefined;
    }
    forEach(callback) {
        for (const [key, value] of this) {
            callback(value, key);
        }
    }
    *[Symbol.iterator]() {
        yield* this._entries(this._root);
    }
    *_entries(node) {
        // DFS
        if (!node) {
            return;
        }
        const stack = [node];
        while (stack.length > 0) {
            const node = stack.pop();
            if (node) {
                if (node.value) {
                    yield [node.key, node.value];
                }
                if (node.left) {
                    stack.push(node.left);
                }
                if (node.mid) {
                    stack.push(node.mid);
                }
                if (node.right) {
                    stack.push(node.right);
                }
            }
        }
    }
}
class ResourceMap {
    constructor(mapOrKeyFn, toKey) {
        this[_a] = 'ResourceMap';
        if (mapOrKeyFn instanceof ResourceMap) {
            this.map = new Map(mapOrKeyFn.map);
            this.toKey = toKey !== null && toKey !== void 0 ? toKey : ResourceMap.defaultToKey;
        }
        else {
            this.map = new Map();
            this.toKey = mapOrKeyFn !== null && mapOrKeyFn !== void 0 ? mapOrKeyFn : ResourceMap.defaultToKey;
        }
    }
    set(resource, value) {
        this.map.set(this.toKey(resource), value);
        return this;
    }
    get(resource) {
        return this.map.get(this.toKey(resource));
    }
    has(resource) {
        return this.map.has(this.toKey(resource));
    }
    get size() {
        return this.map.size;
    }
    clear() {
        this.map.clear();
    }
    delete(resource) {
        return this.map.delete(this.toKey(resource));
    }
    forEach(clb, thisArg) {
        if (typeof thisArg !== 'undefined') {
            clb = clb.bind(thisArg);
        }
        for (let [index, value] of this.map) {
            clb(value, URI.parse(index), this);
        }
    }
    values() {
        return this.map.values();
    }
    *keys() {
        for (let key of this.map.keys()) {
            yield URI.parse(key);
        }
    }
    *entries() {
        for (let tuple of this.map.entries()) {
            yield [URI.parse(tuple[0]), tuple[1]];
        }
    }
    *[(_a = Symbol.toStringTag, Symbol.iterator)]() {
        for (let item of this.map) {
            yield [URI.parse(item[0]), item[1]];
        }
    }
}
ResourceMap.defaultToKey = (resource) => resource.toString();
exports.Touch = void 0;
(function (Touch) {
    Touch[Touch["None"] = 0] = "None";
    Touch[Touch["AsOld"] = 1] = "AsOld";
    Touch[Touch["AsNew"] = 2] = "AsNew";
})(exports.Touch || (exports.Touch = {}));
class LinkedMap {
    constructor() {
        this[_b] = 'LinkedMap';
        this._map = new Map();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state = 0;
    }
    clear() {
        this._map.clear();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state++;
    }
    isEmpty() {
        return !this._head && !this._tail;
    }
    get size() {
        return this._size;
    }
    get first() {
        var _c;
        return (_c = this._head) === null || _c === void 0 ? void 0 : _c.value;
    }
    get last() {
        var _c;
        return (_c = this._tail) === null || _c === void 0 ? void 0 : _c.value;
    }
    has(key) {
        return this._map.has(key);
    }
    get(key, touch = 0 /* None */) {
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        if (touch !== 0 /* None */) {
            this.touch(item, touch);
        }
        return item.value;
    }
    set(key, value, touch = 0 /* None */) {
        let item = this._map.get(key);
        if (item) {
            item.value = value;
            if (touch !== 0 /* None */) {
                this.touch(item, touch);
            }
        }
        else {
            item = { key, value, next: undefined, previous: undefined };
            switch (touch) {
                case 0 /* None */:
                    this.addItemLast(item);
                    break;
                case 1 /* AsOld */:
                    this.addItemFirst(item);
                    break;
                case 2 /* AsNew */:
                    this.addItemLast(item);
                    break;
                default:
                    this.addItemLast(item);
                    break;
            }
            this._map.set(key, item);
            this._size++;
        }
        return this;
    }
    delete(key) {
        return !!this.remove(key);
    }
    remove(key) {
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    shift() {
        if (!this._head && !this._tail) {
            return undefined;
        }
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    forEach(callbackfn, thisArg) {
        const state = this._state;
        let current = this._head;
        while (current) {
            if (thisArg) {
                callbackfn.bind(thisArg)(current.value, current.key, this);
            }
            else {
                callbackfn(current.value, current.key, this);
            }
            if (this._state !== state) {
                throw new Error(`LinkedMap got modified during iteration.`);
            }
            current = current.next;
        }
    }
    keys() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]() {
                return iterator;
            },
            next() {
                if (map._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: current.key, done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    values() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]() {
                return iterator;
            },
            next() {
                if (map._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: current.value, done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    entries() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]() {
                return iterator;
            },
            next() {
                if (map._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: [current.key, current.value], done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    [(_b = Symbol.toStringTag, Symbol.iterator)]() {
        return this.entries();
    }
    trimOld(newSize) {
        if (newSize >= this.size) {
            return;
        }
        if (newSize === 0) {
            this.clear();
            return;
        }
        let current = this._head;
        let currentSize = this.size;
        while (current && currentSize > newSize) {
            this._map.delete(current.key);
            current = current.next;
            currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        if (current) {
            current.previous = undefined;
        }
        this._state++;
    }
    addItemFirst(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._tail = item;
        }
        else if (!this._head) {
            throw new Error('Invalid list');
        }
        else {
            item.next = this._head;
            this._head.previous = item;
        }
        this._head = item;
        this._state++;
    }
    addItemLast(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._head = item;
        }
        else if (!this._tail) {
            throw new Error('Invalid list');
        }
        else {
            item.previous = this._tail;
            this._tail.next = item;
        }
        this._tail = item;
        this._state++;
    }
    removeItem(item) {
        if (item === this._head && item === this._tail) {
            this._head = undefined;
            this._tail = undefined;
        }
        else if (item === this._head) {
            // This can only happen if size === 1 which is handled
            // by the case above.
            if (!item.next) {
                throw new Error('Invalid list');
            }
            item.next.previous = undefined;
            this._head = item.next;
        }
        else if (item === this._tail) {
            // This can only happen if size === 1 which is handled
            // by the case above.
            if (!item.previous) {
                throw new Error('Invalid list');
            }
            item.previous.next = undefined;
            this._tail = item.previous;
        }
        else {
            const next = item.next;
            const previous = item.previous;
            if (!next || !previous) {
                throw new Error('Invalid list');
            }
            next.previous = previous;
            previous.next = next;
        }
        item.next = undefined;
        item.previous = undefined;
        this._state++;
    }
    touch(item, touch) {
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        if ((touch !== 1 /* AsOld */ && touch !== 2 /* AsNew */)) {
            return;
        }
        if (touch === 1 /* AsOld */) {
            if (item === this._head) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item
            if (item === this._tail) {
                // previous must be defined since item was not head but is tail
                // So there are more than on item in the map
                previous.next = undefined;
                this._tail = previous;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            // Insert the node at head
            item.previous = undefined;
            item.next = this._head;
            this._head.previous = item;
            this._head = item;
            this._state++;
        }
        else if (touch === 2 /* AsNew */) {
            if (item === this._tail) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item.
            if (item === this._head) {
                // next must be defined since item was not tail but is head
                // So there are more than on item in the map
                next.previous = undefined;
                this._head = next;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            item.next = undefined;
            item.previous = this._tail;
            this._tail.next = item;
            this._tail = item;
            this._state++;
        }
    }
    toJSON() {
        const data = [];
        this.forEach((value, key) => {
            data.push([key, value]);
        });
        return data;
    }
    fromJSON(data) {
        this.clear();
        for (const [key, value] of data) {
            this.set(key, value);
        }
    }
}
class LRUCache extends LinkedMap {
    constructor(limit, ratio = 1) {
        super();
        this._limit = limit;
        this._ratio = Math.min(Math.max(0, ratio), 1);
    }
    get limit() {
        return this._limit;
    }
    set limit(limit) {
        this._limit = limit;
        this.checkTrim();
    }
    get ratio() {
        return this._ratio;
    }
    set ratio(ratio) {
        this._ratio = Math.min(Math.max(0, ratio), 1);
        this.checkTrim();
    }
    get(key, touch = 2 /* AsNew */) {
        return super.get(key, touch);
    }
    peek(key) {
        return super.get(key, 0 /* None */);
    }
    set(key, value) {
        super.set(key, value, 2 /* AsNew */);
        this.checkTrim();
        return this;
    }
    checkTrim() {
        if (this.size > this._limit) {
            this.trimOld(Math.round(this._limit * this._ratio));
        }
    }
}
/**
 * Wraps the map in type that only implements readonly properties. Useful
 * in the extension host to prevent the consumer from making any mutations.
 */
class ReadonlyMapView {
    constructor(source) {
        _ReadonlyMapView_source.set(this, void 0);
        __classPrivateFieldSet(this, _ReadonlyMapView_source, source);
    }
    get size() {
        return __classPrivateFieldGet(this, _ReadonlyMapView_source).size;
    }
    forEach(callbackfn, thisArg) {
        __classPrivateFieldGet(this, _ReadonlyMapView_source).forEach(callbackfn, thisArg);
    }
    get(key) {
        return __classPrivateFieldGet(this, _ReadonlyMapView_source).get(key);
    }
    has(key) {
        return __classPrivateFieldGet(this, _ReadonlyMapView_source).has(key);
    }
    entries() {
        return __classPrivateFieldGet(this, _ReadonlyMapView_source).entries();
    }
    keys() {
        return __classPrivateFieldGet(this, _ReadonlyMapView_source).keys();
    }
    values() {
        return __classPrivateFieldGet(this, _ReadonlyMapView_source).values();
    }
    [(_ReadonlyMapView_source = new WeakMap(), Symbol.iterator)]() {
        return __classPrivateFieldGet(this, _ReadonlyMapView_source).entries();
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function getEmptyExpression() {
    return Object.create(null);
}
const GLOBSTAR = '**';
const GLOB_SPLIT = '/';
const PATH_REGEX = '[/\\\\]'; // any slash or backslash
const NO_PATH_REGEX = '[^/\\\\]'; // any non-slash and non-backslash
const ALL_FORWARD_SLASHES = /\//g;
function starsToRegExp(starCount) {
    switch (starCount) {
        case 0:
            return '';
        case 1:
            return `${NO_PATH_REGEX}*?`; // 1 star matches any number of characters except path separator (/ and \) - non greedy (?)
        default:
            // Matches:  (Path Sep OR Path Val followed by Path Sep OR Path Sep followed by Path Val) 0-many times
            // Group is non capturing because we don't need to capture at all (?:...)
            // Overall we use non-greedy matching because it could be that we match too much
            return `(?:${PATH_REGEX}|${NO_PATH_REGEX}+${PATH_REGEX}|${PATH_REGEX}${NO_PATH_REGEX}+)*?`;
    }
}
function splitGlobAware(pattern, splitChar) {
    if (!pattern) {
        return [];
    }
    const segments = [];
    let inBraces = false;
    let inBrackets = false;
    let curVal = '';
    for (const char of pattern) {
        switch (char) {
            case splitChar:
                if (!inBraces && !inBrackets) {
                    segments.push(curVal);
                    curVal = '';
                    continue;
                }
                break;
            case '{':
                inBraces = true;
                break;
            case '}':
                inBraces = false;
                break;
            case '[':
                inBrackets = true;
                break;
            case ']':
                inBrackets = false;
                break;
        }
        curVal += char;
    }
    // Tail
    if (curVal) {
        segments.push(curVal);
    }
    return segments;
}
function parseRegExp(pattern) {
    if (!pattern) {
        return '';
    }
    let regEx = '';
    // Split up into segments for each slash found
    const segments = splitGlobAware(pattern, GLOB_SPLIT);
    // Special case where we only have globstars
    if (segments.every(s => s === GLOBSTAR)) {
        regEx = '.*';
    }
    // Build regex over segments
    else {
        let previousSegmentWasGlobStar = false;
        segments.forEach((segment, index) => {
            // Globstar is special
            if (segment === GLOBSTAR) {
                // if we have more than one globstar after another, just ignore it
                if (!previousSegmentWasGlobStar) {
                    regEx += starsToRegExp(2);
                    previousSegmentWasGlobStar = true;
                }
                return;
            }
            // States
            let inBraces = false;
            let braceVal = '';
            let inBrackets = false;
            let bracketVal = '';
            for (const char of segment) {
                // Support brace expansion
                if (char !== '}' && inBraces) {
                    braceVal += char;
                    continue;
                }
                // Support brackets
                if (inBrackets && (char !== ']' || !bracketVal) /* ] is literally only allowed as first character in brackets to match it */) {
                    let res;
                    // range operator
                    if (char === '-') {
                        res = char;
                    }
                    // negation operator (only valid on first index in bracket)
                    else if ((char === '^' || char === '!') && !bracketVal) {
                        res = '^';
                    }
                    // glob split matching is not allowed within character ranges
                    // see http://man7.org/linux/man-pages/man7/glob.7.html
                    else if (char === GLOB_SPLIT) {
                        res = '';
                    }
                    // anything else gets escaped
                    else {
                        res = escapeRegExpCharacters(char);
                    }
                    bracketVal += res;
                    continue;
                }
                switch (char) {
                    case '{':
                        inBraces = true;
                        continue;
                    case '[':
                        inBrackets = true;
                        continue;
                    case '}':
                        const choices = splitGlobAware(braceVal, ',');
                        // Converts {foo,bar} => [foo|bar]
                        const braceRegExp = `(?:${choices.map(c => parseRegExp(c)).join('|')})`;
                        regEx += braceRegExp;
                        inBraces = false;
                        braceVal = '';
                        break;
                    case ']':
                        regEx += ('[' + bracketVal + ']');
                        inBrackets = false;
                        bracketVal = '';
                        break;
                    case '?':
                        regEx += NO_PATH_REGEX; // 1 ? matches any single character except path separator (/ and \)
                        continue;
                    case '*':
                        regEx += starsToRegExp(1);
                        continue;
                    default:
                        regEx += escapeRegExpCharacters(char);
                }
            }
            // Tail: Add the slash we had split on if there is more to come and the remaining pattern is not a globstar
            // For example if pattern: some/**/*.js we want the "/" after some to be included in the RegEx to prevent
            // a folder called "something" to match as well.
            // However, if pattern: some/**, we tolerate that we also match on "something" because our globstar behaviour
            // is to match 0-N segments.
            if (index < segments.length - 1 && (segments[index + 1] !== GLOBSTAR || index + 2 < segments.length)) {
                regEx += PATH_REGEX;
            }
            // reset state
            previousSegmentWasGlobStar = false;
        });
    }
    return regEx;
}
// regexes to check for trival glob patterns that just check for String#endsWith
const T1 = /^\*\*\/\*\.[\w\.-]+$/; // **/*.something
const T2 = /^\*\*\/([\w\.-]+)\/?$/; // **/something
const T3 = /^{\*\*\/[\*\.]?[\w\.-]+\/?(,\*\*\/[\*\.]?[\w\.-]+\/?)*}$/; // {**/*.something,**/*.else} or {**/package.json,**/project.json}
const T3_2 = /^{\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?(,\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?)*}$/; // Like T3, with optional trailing /**
const T4 = /^\*\*((\/[\w\.-]+)+)\/?$/; // **/something/else
const T5 = /^([\w\.-]+(\/[\w\.-]+)*)\/?$/; // something/else
const CACHE = new LRUCache(10000); // bounded to 10000 elements
const FALSE = function () {
    return false;
};
const NULL = function () {
    return null;
};
function parsePattern(arg1, options) {
    if (!arg1) {
        return NULL;
    }
    // Handle IRelativePattern
    let pattern;
    if (typeof arg1 !== 'string') {
        pattern = arg1.pattern;
    }
    else {
        pattern = arg1;
    }
    // Whitespace trimming
    pattern = pattern.trim();
    // Check cache
    const patternKey = `${pattern}_${!!options.trimForExclusions}`;
    let parsedPattern = CACHE.get(patternKey);
    if (parsedPattern) {
        return wrapRelativePattern(parsedPattern, arg1);
    }
    // Check for Trivias
    let match;
    if (T1.test(pattern)) { // common pattern: **/*.txt just need endsWith check
        const base = pattern.substr(4); // '**/*'.length === 4
        parsedPattern = function (path, basename) {
            return typeof path === 'string' && path.endsWith(base) ? pattern : null;
        };
    }
    else if (match = T2.exec(trimForExclusions(pattern, options))) { // common pattern: **/some.txt just need basename check
        parsedPattern = trivia2(match[1], pattern);
    }
    else if ((options.trimForExclusions ? T3_2 : T3).test(pattern)) { // repetition of common patterns (see above) {**/*.txt,**/*.png}
        parsedPattern = trivia3(pattern, options);
    }
    else if (match = T4.exec(trimForExclusions(pattern, options))) { // common pattern: **/something/else just need endsWith check
        parsedPattern = trivia4and5(match[1].substr(1), pattern, true);
    }
    else if (match = T5.exec(trimForExclusions(pattern, options))) { // common pattern: something/else just need equals check
        parsedPattern = trivia4and5(match[1], pattern, false);
    }
    // Otherwise convert to pattern
    else {
        parsedPattern = toRegExp(pattern);
    }
    // Cache
    CACHE.set(patternKey, parsedPattern);
    return wrapRelativePattern(parsedPattern, arg1);
}
function wrapRelativePattern(parsedPattern, arg2) {
    if (typeof arg2 === 'string') {
        return parsedPattern;
    }
    return function (path, basename) {
        if (!isEqualOrParent$1(path, arg2.base)) {
            return null;
        }
        return parsedPattern(relative(arg2.base, path), basename);
    };
}
function trimForExclusions(pattern, options) {
    return options.trimForExclusions && pattern.endsWith('/**') ? pattern.substr(0, pattern.length - 2) : pattern; // dropping **, tailing / is dropped later
}
// common pattern: **/some.txt just need basename check
function trivia2(base, originalPattern) {
    const slashBase = `/${base}`;
    const backslashBase = `\\${base}`;
    const parsedPattern = function (path, basename) {
        if (typeof path !== 'string') {
            return null;
        }
        if (basename) {
            return basename === base ? originalPattern : null;
        }
        return path === base || path.endsWith(slashBase) || path.endsWith(backslashBase) ? originalPattern : null;
    };
    const basenames = [base];
    parsedPattern.basenames = basenames;
    parsedPattern.patterns = [originalPattern];
    parsedPattern.allBasenames = basenames;
    return parsedPattern;
}
// repetition of common patterns (see above) {**/*.txt,**/*.png}
function trivia3(pattern, options) {
    const parsedPatterns = aggregateBasenameMatches(pattern.slice(1, -1).split(',')
        .map(pattern => parsePattern(pattern, options))
        .filter(pattern => pattern !== NULL), pattern);
    const n = parsedPatterns.length;
    if (!n) {
        return NULL;
    }
    if (n === 1) {
        return parsedPatterns[0];
    }
    const parsedPattern = function (path, basename) {
        for (let i = 0, n = parsedPatterns.length; i < n; i++) {
            if (parsedPatterns[i](path, basename)) {
                return pattern;
            }
        }
        return null;
    };
    const withBasenames = parsedPatterns.find(pattern => !!pattern.allBasenames);
    if (withBasenames) {
        parsedPattern.allBasenames = withBasenames.allBasenames;
    }
    const allPaths = parsedPatterns.reduce((all, current) => current.allPaths ? all.concat(current.allPaths) : all, []);
    if (allPaths.length) {
        parsedPattern.allPaths = allPaths;
    }
    return parsedPattern;
}
// common patterns: **/something/else just need endsWith check, something/else just needs and equals check
function trivia4and5(targetPath, pattern, matchPathEnds) {
    const usingPosixSep = sep === posix.sep;
    const nativePath = usingPosixSep ? targetPath : targetPath.replace(ALL_FORWARD_SLASHES, sep);
    const nativePathEnd = sep + nativePath;
    const targetPathEnd = posix.sep + targetPath;
    const parsedPattern = matchPathEnds ? function (testPath, basename) {
        return typeof testPath === 'string' &&
            ((testPath === nativePath || testPath.endsWith(nativePathEnd))
                || !usingPosixSep && (testPath === targetPath || testPath.endsWith(targetPathEnd)))
            ? pattern : null;
    } : function (testPath, basename) {
        return typeof testPath === 'string' &&
            (testPath === nativePath
                || (!usingPosixSep && testPath === targetPath))
            ? pattern : null;
    };
    parsedPattern.allPaths = [(matchPathEnds ? '*/' : './') + targetPath];
    return parsedPattern;
}
function toRegExp(pattern) {
    try {
        const regExp = new RegExp(`^${parseRegExp(pattern)}$`);
        return function (path) {
            regExp.lastIndex = 0; // reset RegExp to its initial state to reuse it!
            return typeof path === 'string' && regExp.test(path) ? pattern : null;
        };
    }
    catch (error) {
        return NULL;
    }
}
function match(arg1, path, hasSibling) {
    if (!arg1 || typeof path !== 'string') {
        return false;
    }
    return parse(arg1)(path, undefined, hasSibling);
}
function parse(arg1, options = {}) {
    if (!arg1) {
        return FALSE;
    }
    // Glob with String
    if (typeof arg1 === 'string' || isRelativePattern(arg1)) {
        const parsedPattern = parsePattern(arg1, options);
        if (parsedPattern === NULL) {
            return FALSE;
        }
        const resultPattern = function (path, basename) {
            return !!parsedPattern(path, basename);
        };
        if (parsedPattern.allBasenames) {
            resultPattern.allBasenames = parsedPattern.allBasenames;
        }
        if (parsedPattern.allPaths) {
            resultPattern.allPaths = parsedPattern.allPaths;
        }
        return resultPattern;
    }
    // Glob with Expression
    return parsedExpression(arg1, options);
}
function hasSiblingPromiseFn(siblingsFn) {
    if (!siblingsFn) {
        return undefined;
    }
    let siblings;
    return (name) => {
        if (!siblings) {
            siblings = (siblingsFn() || Promise.resolve([]))
                .then(list => list ? listToMap(list) : {});
        }
        return siblings.then(map => !!map[name]);
    };
}
function hasSiblingFn(siblingsFn) {
    if (!siblingsFn) {
        return undefined;
    }
    let siblings;
    return (name) => {
        if (!siblings) {
            const list = siblingsFn();
            siblings = list ? listToMap(list) : {};
        }
        return !!siblings[name];
    };
}
function listToMap(list) {
    const map = {};
    for (const key of list) {
        map[key] = true;
    }
    return map;
}
function isRelativePattern(obj) {
    const rp = obj;
    return rp && typeof rp.base === 'string' && typeof rp.pattern === 'string';
}
function getBasenameTerms(patternOrExpression) {
    return patternOrExpression.allBasenames || [];
}
function getPathTerms(patternOrExpression) {
    return patternOrExpression.allPaths || [];
}
function parsedExpression(expression, options) {
    const parsedPatterns = aggregateBasenameMatches(Object.getOwnPropertyNames(expression)
        .map(pattern => parseExpressionPattern(pattern, expression[pattern], options))
        .filter(pattern => pattern !== NULL));
    const n = parsedPatterns.length;
    if (!n) {
        return NULL;
    }
    if (!parsedPatterns.some(parsedPattern => !!parsedPattern.requiresSiblings)) {
        if (n === 1) {
            return parsedPatterns[0];
        }
        const resultExpression = function (path, basename) {
            for (let i = 0, n = parsedPatterns.length; i < n; i++) {
                // Pattern matches path
                const result = parsedPatterns[i](path, basename);
                if (result) {
                    return result;
                }
            }
            return null;
        };
        const withBasenames = parsedPatterns.find(pattern => !!pattern.allBasenames);
        if (withBasenames) {
            resultExpression.allBasenames = withBasenames.allBasenames;
        }
        const allPaths = parsedPatterns.reduce((all, current) => current.allPaths ? all.concat(current.allPaths) : all, []);
        if (allPaths.length) {
            resultExpression.allPaths = allPaths;
        }
        return resultExpression;
    }
    const resultExpression = function (path, basename, hasSibling) {
        let name = undefined;
        for (let i = 0, n = parsedPatterns.length; i < n; i++) {
            // Pattern matches path
            const parsedPattern = parsedPatterns[i];
            if (parsedPattern.requiresSiblings && hasSibling) {
                if (!basename) {
                    basename = basename$1(path);
                }
                if (!name) {
                    name = basename.substr(0, basename.length - extname$1(path).length);
                }
            }
            const result = parsedPattern(path, basename, name, hasSibling);
            if (result) {
                return result;
            }
        }
        return null;
    };
    const withBasenames = parsedPatterns.find(pattern => !!pattern.allBasenames);
    if (withBasenames) {
        resultExpression.allBasenames = withBasenames.allBasenames;
    }
    const allPaths = parsedPatterns.reduce((all, current) => current.allPaths ? all.concat(current.allPaths) : all, []);
    if (allPaths.length) {
        resultExpression.allPaths = allPaths;
    }
    return resultExpression;
}
function parseExpressionPattern(pattern, value, options) {
    if (value === false) {
        return NULL; // pattern is disabled
    }
    const parsedPattern = parsePattern(pattern, options);
    if (parsedPattern === NULL) {
        return NULL;
    }
    // Expression Pattern is <boolean>
    if (typeof value === 'boolean') {
        return parsedPattern;
    }
    // Expression Pattern is <SiblingClause>
    if (value) {
        const when = value.when;
        if (typeof when === 'string') {
            const result = (path, basename, name, hasSibling) => {
                if (!hasSibling || !parsedPattern(path, basename)) {
                    return null;
                }
                const clausePattern = when.replace('$(basename)', name);
                const matched = hasSibling(clausePattern);
                return isThenable(matched) ?
                    matched.then(m => m ? pattern : null) :
                    matched ? pattern : null;
            };
            result.requiresSiblings = true;
            return result;
        }
    }
    // Expression is Anything
    return parsedPattern;
}
function aggregateBasenameMatches(parsedPatterns, result) {
    const basenamePatterns = parsedPatterns.filter(parsedPattern => !!parsedPattern.basenames);
    if (basenamePatterns.length < 2) {
        return parsedPatterns;
    }
    const basenames = basenamePatterns.reduce((all, current) => {
        const basenames = current.basenames;
        return basenames ? all.concat(basenames) : all;
    }, []);
    let patterns;
    if (result) {
        patterns = [];
        for (let i = 0, n = basenames.length; i < n; i++) {
            patterns.push(result);
        }
    }
    else {
        patterns = basenamePatterns.reduce((all, current) => {
            const patterns = current.patterns;
            return patterns ? all.concat(patterns) : all;
        }, []);
    }
    const aggregate = function (path, basename) {
        if (typeof path !== 'string') {
            return null;
        }
        if (!basename) {
            let i;
            for (i = path.length; i > 0; i--) {
                const ch = path.charCodeAt(i - 1);
                if (ch === 47 /* Slash */ || ch === 92 /* Backslash */) {
                    break;
                }
            }
            basename = path.substr(i);
        }
        const index = basenames.indexOf(basename);
        return index !== -1 ? patterns[index] : null;
    };
    aggregate.basenames = basenames;
    aggregate.patterns = patterns;
    aggregate.allBasenames = basenames;
    const aggregatedPatterns = parsedPatterns.filter(parsedPattern => !parsedPattern.basenames);
    aggregatedPatterns.push(aggregate);
    return aggregatedPatterns;
}

var glob = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getEmptyExpression: getEmptyExpression,
	splitGlobAware: splitGlobAware,
	match: match,
	parse: parse,
	hasSiblingPromiseFn: hasSiblingPromiseFn,
	hasSiblingFn: hasSiblingFn,
	isRelativePattern: isRelativePattern,
	getBasenameTerms: getBasenameTerms,
	getPathTerms: getPathTerms
});

exports.MarshalledId = void 0;
(function (MarshalledId) {
    MarshalledId[MarshalledId["Uri"] = 1] = "Uri";
    MarshalledId[MarshalledId["Regexp"] = 2] = "Regexp";
    MarshalledId[MarshalledId["ScmResource"] = 3] = "ScmResource";
    MarshalledId[MarshalledId["ScmResourceGroup"] = 4] = "ScmResourceGroup";
    MarshalledId[MarshalledId["ScmProvider"] = 5] = "ScmProvider";
    MarshalledId[MarshalledId["CommentController"] = 6] = "CommentController";
    MarshalledId[MarshalledId["CommentThread"] = 7] = "CommentThread";
    MarshalledId[MarshalledId["CommentThreadReply"] = 8] = "CommentThreadReply";
    MarshalledId[MarshalledId["CommentNode"] = 9] = "CommentNode";
    MarshalledId[MarshalledId["CommentThreadNode"] = 10] = "CommentThreadNode";
    MarshalledId[MarshalledId["TimelineActionContext"] = 11] = "TimelineActionContext";
    MarshalledId[MarshalledId["NotebookCellActionContext"] = 12] = "NotebookCellActionContext";
    MarshalledId[MarshalledId["TestItemContext"] = 13] = "TestItemContext";
})(exports.MarshalledId || (exports.MarshalledId = {}));

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class Sequence {
    constructor() {
        this.elements = [];
        this._onDidSplice = new Emitter();
        this.onDidSplice = this._onDidSplice.event;
    }
    splice(start, deleteCount, toInsert = []) {
        this.elements.splice(start, deleteCount, ...toInsert);
        this._onDidSplice.fire({ start, deleteCount, toInsert });
    }
}
class SimpleSequence {
    constructor(elements, onDidAdd, onDidRemove) {
        this._elements = [...elements];
        this.onDidSplice = exports.Event.any(exports.Event.map(onDidAdd, e => ({ start: this.elements.length, deleteCount: 0, toInsert: [e] })), exports.Event.map(exports.Event.filter(exports.Event.map(onDidRemove, e => this.elements.indexOf(e)), i => i > -1), i => ({ start: i, deleteCount: 1, toInsert: [] })));
        this.disposable = this.onDidSplice(({ start, deleteCount, toInsert }) => this._elements.splice(start, deleteCount, ...toInsert));
    }
    get elements() { return this._elements; }
    dispose() {
        this.disposable.dispose();
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
exports.ScrollbarVisibility = void 0;
(function (ScrollbarVisibility) {
    ScrollbarVisibility[ScrollbarVisibility["Auto"] = 1] = "Auto";
    ScrollbarVisibility[ScrollbarVisibility["Hidden"] = 2] = "Hidden";
    ScrollbarVisibility[ScrollbarVisibility["Visible"] = 3] = "Visible";
})(exports.ScrollbarVisibility || (exports.ScrollbarVisibility = {}));
class ScrollState {
    constructor(width, scrollWidth, scrollLeft, height, scrollHeight, scrollTop) {
        this._scrollStateBrand = undefined;
        width = width | 0;
        scrollWidth = scrollWidth | 0;
        scrollLeft = scrollLeft | 0;
        height = height | 0;
        scrollHeight = scrollHeight | 0;
        scrollTop = scrollTop | 0;
        this.rawScrollLeft = scrollLeft; // before validation
        this.rawScrollTop = scrollTop; // before validation
        if (width < 0) {
            width = 0;
        }
        if (scrollLeft + width > scrollWidth) {
            scrollLeft = scrollWidth - width;
        }
        if (scrollLeft < 0) {
            scrollLeft = 0;
        }
        if (height < 0) {
            height = 0;
        }
        if (scrollTop + height > scrollHeight) {
            scrollTop = scrollHeight - height;
        }
        if (scrollTop < 0) {
            scrollTop = 0;
        }
        this.width = width;
        this.scrollWidth = scrollWidth;
        this.scrollLeft = scrollLeft;
        this.height = height;
        this.scrollHeight = scrollHeight;
        this.scrollTop = scrollTop;
    }
    equals(other) {
        return (this.rawScrollLeft === other.rawScrollLeft
            && this.rawScrollTop === other.rawScrollTop
            && this.width === other.width
            && this.scrollWidth === other.scrollWidth
            && this.scrollLeft === other.scrollLeft
            && this.height === other.height
            && this.scrollHeight === other.scrollHeight
            && this.scrollTop === other.scrollTop);
    }
    withScrollDimensions(update, useRawScrollPositions) {
        return new ScrollState((typeof update.width !== 'undefined' ? update.width : this.width), (typeof update.scrollWidth !== 'undefined' ? update.scrollWidth : this.scrollWidth), useRawScrollPositions ? this.rawScrollLeft : this.scrollLeft, (typeof update.height !== 'undefined' ? update.height : this.height), (typeof update.scrollHeight !== 'undefined' ? update.scrollHeight : this.scrollHeight), useRawScrollPositions ? this.rawScrollTop : this.scrollTop);
    }
    withScrollPosition(update) {
        return new ScrollState(this.width, this.scrollWidth, (typeof update.scrollLeft !== 'undefined' ? update.scrollLeft : this.rawScrollLeft), this.height, this.scrollHeight, (typeof update.scrollTop !== 'undefined' ? update.scrollTop : this.rawScrollTop));
    }
    createScrollEvent(previous, inSmoothScrolling) {
        const widthChanged = (this.width !== previous.width);
        const scrollWidthChanged = (this.scrollWidth !== previous.scrollWidth);
        const scrollLeftChanged = (this.scrollLeft !== previous.scrollLeft);
        const heightChanged = (this.height !== previous.height);
        const scrollHeightChanged = (this.scrollHeight !== previous.scrollHeight);
        const scrollTopChanged = (this.scrollTop !== previous.scrollTop);
        return {
            inSmoothScrolling: inSmoothScrolling,
            oldWidth: previous.width,
            oldScrollWidth: previous.scrollWidth,
            oldScrollLeft: previous.scrollLeft,
            width: this.width,
            scrollWidth: this.scrollWidth,
            scrollLeft: this.scrollLeft,
            oldHeight: previous.height,
            oldScrollHeight: previous.scrollHeight,
            oldScrollTop: previous.scrollTop,
            height: this.height,
            scrollHeight: this.scrollHeight,
            scrollTop: this.scrollTop,
            widthChanged: widthChanged,
            scrollWidthChanged: scrollWidthChanged,
            scrollLeftChanged: scrollLeftChanged,
            heightChanged: heightChanged,
            scrollHeightChanged: scrollHeightChanged,
            scrollTopChanged: scrollTopChanged,
        };
    }
}
class Scrollable extends Disposable {
    constructor(smoothScrollDuration, scheduleAtNextAnimationFrame) {
        super();
        this._scrollableBrand = undefined;
        this._onScroll = this._register(new Emitter());
        this.onScroll = this._onScroll.event;
        this._smoothScrollDuration = smoothScrollDuration;
        this._scheduleAtNextAnimationFrame = scheduleAtNextAnimationFrame;
        this._state = new ScrollState(0, 0, 0, 0, 0, 0);
        this._smoothScrolling = null;
    }
    dispose() {
        if (this._smoothScrolling) {
            this._smoothScrolling.dispose();
            this._smoothScrolling = null;
        }
        super.dispose();
    }
    setSmoothScrollDuration(smoothScrollDuration) {
        this._smoothScrollDuration = smoothScrollDuration;
    }
    validateScrollPosition(scrollPosition) {
        return this._state.withScrollPosition(scrollPosition);
    }
    getScrollDimensions() {
        return this._state;
    }
    setScrollDimensions(dimensions, useRawScrollPositions) {
        const newState = this._state.withScrollDimensions(dimensions, useRawScrollPositions);
        this._setState(newState, Boolean(this._smoothScrolling));
        // Validate outstanding animated scroll position target
        if (this._smoothScrolling) {
            this._smoothScrolling.acceptScrollDimensions(this._state);
        }
    }
    /**
     * Returns the final scroll position that the instance will have once the smooth scroll animation concludes.
     * If no scroll animation is occurring, it will return the current scroll position instead.
     */
    getFutureScrollPosition() {
        if (this._smoothScrolling) {
            return this._smoothScrolling.to;
        }
        return this._state;
    }
    /**
     * Returns the current scroll position.
     * Note: This result might be an intermediate scroll position, as there might be an ongoing smooth scroll animation.
     */
    getCurrentScrollPosition() {
        return this._state;
    }
    setScrollPositionNow(update) {
        // no smooth scrolling requested
        const newState = this._state.withScrollPosition(update);
        // Terminate any outstanding smooth scrolling
        if (this._smoothScrolling) {
            this._smoothScrolling.dispose();
            this._smoothScrolling = null;
        }
        this._setState(newState, false);
    }
    setScrollPositionSmooth(update, reuseAnimation) {
        if (this._smoothScrollDuration === 0) {
            // Smooth scrolling not supported.
            return this.setScrollPositionNow(update);
        }
        if (this._smoothScrolling) {
            // Combine our pending scrollLeft/scrollTop with incoming scrollLeft/scrollTop
            update = {
                scrollLeft: (typeof update.scrollLeft === 'undefined' ? this._smoothScrolling.to.scrollLeft : update.scrollLeft),
                scrollTop: (typeof update.scrollTop === 'undefined' ? this._smoothScrolling.to.scrollTop : update.scrollTop)
            };
            // Validate `update`
            const validTarget = this._state.withScrollPosition(update);
            if (this._smoothScrolling.to.scrollLeft === validTarget.scrollLeft && this._smoothScrolling.to.scrollTop === validTarget.scrollTop) {
                // No need to interrupt or extend the current animation since we're going to the same place
                return;
            }
            let newSmoothScrolling;
            if (reuseAnimation) {
                newSmoothScrolling = new SmoothScrollingOperation(this._smoothScrolling.from, validTarget, this._smoothScrolling.startTime, this._smoothScrolling.duration);
            }
            else {
                newSmoothScrolling = this._smoothScrolling.combine(this._state, validTarget, this._smoothScrollDuration);
            }
            this._smoothScrolling.dispose();
            this._smoothScrolling = newSmoothScrolling;
        }
        else {
            // Validate `update`
            const validTarget = this._state.withScrollPosition(update);
            this._smoothScrolling = SmoothScrollingOperation.start(this._state, validTarget, this._smoothScrollDuration);
        }
        // Begin smooth scrolling animation
        this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
            if (!this._smoothScrolling) {
                return;
            }
            this._smoothScrolling.animationFrameDisposable = null;
            this._performSmoothScrolling();
        });
    }
    _performSmoothScrolling() {
        if (!this._smoothScrolling) {
            return;
        }
        const update = this._smoothScrolling.tick();
        const newState = this._state.withScrollPosition(update);
        this._setState(newState, true);
        if (!this._smoothScrolling) {
            // Looks like someone canceled the smooth scrolling
            // from the scroll event handler
            return;
        }
        if (update.isDone) {
            this._smoothScrolling.dispose();
            this._smoothScrolling = null;
            return;
        }
        // Continue smooth scrolling animation
        this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
            if (!this._smoothScrolling) {
                return;
            }
            this._smoothScrolling.animationFrameDisposable = null;
            this._performSmoothScrolling();
        });
    }
    _setState(newState, inSmoothScrolling) {
        const oldState = this._state;
        if (oldState.equals(newState)) {
            // no change
            return;
        }
        this._state = newState;
        this._onScroll.fire(this._state.createScrollEvent(oldState, inSmoothScrolling));
    }
}
class SmoothScrollingUpdate {
    constructor(scrollLeft, scrollTop, isDone) {
        this.scrollLeft = scrollLeft;
        this.scrollTop = scrollTop;
        this.isDone = isDone;
    }
}
function createEaseOutCubic(from, to) {
    const delta = to - from;
    return function (completion) {
        return from + delta * easeOutCubic(completion);
    };
}
function createComposed(a, b, cut) {
    return function (completion) {
        if (completion < cut) {
            return a(completion / cut);
        }
        return b((completion - cut) / (1 - cut));
    };
}
class SmoothScrollingOperation {
    constructor(from, to, startTime, duration) {
        this.from = from;
        this.to = to;
        this.duration = duration;
        this.startTime = startTime;
        this.animationFrameDisposable = null;
        this._initAnimations();
    }
    _initAnimations() {
        this.scrollLeft = this._initAnimation(this.from.scrollLeft, this.to.scrollLeft, this.to.width);
        this.scrollTop = this._initAnimation(this.from.scrollTop, this.to.scrollTop, this.to.height);
    }
    _initAnimation(from, to, viewportSize) {
        const delta = Math.abs(from - to);
        if (delta > 2.5 * viewportSize) {
            let stop1, stop2;
            if (from < to) {
                // scroll to 75% of the viewportSize
                stop1 = from + 0.75 * viewportSize;
                stop2 = to - 0.75 * viewportSize;
            }
            else {
                stop1 = from - 0.75 * viewportSize;
                stop2 = to + 0.75 * viewportSize;
            }
            return createComposed(createEaseOutCubic(from, stop1), createEaseOutCubic(stop2, to), 0.33);
        }
        return createEaseOutCubic(from, to);
    }
    dispose() {
        if (this.animationFrameDisposable !== null) {
            this.animationFrameDisposable.dispose();
            this.animationFrameDisposable = null;
        }
    }
    acceptScrollDimensions(state) {
        this.to = state.withScrollPosition(this.to);
        this._initAnimations();
    }
    tick() {
        return this._tick(Date.now());
    }
    _tick(now) {
        const completion = (now - this.startTime) / this.duration;
        if (completion < 1) {
            const newScrollLeft = this.scrollLeft(completion);
            const newScrollTop = this.scrollTop(completion);
            return new SmoothScrollingUpdate(newScrollLeft, newScrollTop, false);
        }
        return new SmoothScrollingUpdate(this.to.scrollLeft, this.to.scrollTop, true);
    }
    combine(from, to, duration) {
        return SmoothScrollingOperation.start(from, to, duration);
    }
    static start(from, to, duration) {
        // +10 / -10 : pretend the animation already started for a quicker response to a scroll request
        duration = duration + 10;
        const startTime = Date.now() - 10;
        return new SmoothScrollingOperation(from, to, startTime, duration);
    }
}
function easeInCubic(t) {
    return Math.pow(t, 3);
}
function easeOutCubic(t) {
    return 1 - easeInCubic(1 - t);
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
exports.Constants = void 0;
(function (Constants) {
    /**
     * MAX SMI (SMall Integer) as defined in v8.
     * one bit is lost for boxing/unboxing flag.
     * one bit is lost for sign flag.
     * See https://thibaultlaurens.github.io/javascript/2013/04/29/how-the-v8-engine-works/#tagged-values
     */
    Constants[Constants["MAX_SAFE_SMALL_INTEGER"] = 1073741824] = "MAX_SAFE_SMALL_INTEGER";
    /**
     * MIN SMI (SMall Integer) as defined in v8.
     * one bit is lost for boxing/unboxing flag.
     * one bit is lost for sign flag.
     * See https://thibaultlaurens.github.io/javascript/2013/04/29/how-the-v8-engine-works/#tagged-values
     */
    Constants[Constants["MIN_SAFE_SMALL_INTEGER"] = -1073741824] = "MIN_SAFE_SMALL_INTEGER";
    /**
     * Max unsigned integer that fits on 8 bits.
     */
    Constants[Constants["MAX_UINT_8"] = 255] = "MAX_UINT_8";
    /**
     * Max unsigned integer that fits on 16 bits.
     */
    Constants[Constants["MAX_UINT_16"] = 65535] = "MAX_UINT_16";
    /**
     * Max unsigned integer that fits on 32 bits.
     */
    Constants[Constants["MAX_UINT_32"] = 4294967295] = "MAX_UINT_32";
    Constants[Constants["UNICODE_SUPPLEMENTARY_PLANE_BEGIN"] = 65536] = "UNICODE_SUPPLEMENTARY_PLANE_BEGIN";
})(exports.Constants || (exports.Constants = {}));
function toUint8(v) {
    if (v < 0) {
        return 0;
    }
    if (v > 255 /* MAX_UINT_8 */) {
        return 255 /* MAX_UINT_8 */;
    }
    return v | 0;
}
function toUint32(v) {
    if (v < 0) {
        return 0;
    }
    if (v > 4294967295 /* MAX_UINT_32 */) {
        return 4294967295 /* MAX_UINT_32 */;
    }
    return v | 0;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isUUID(value) {
    return _UUIDPattern.test(value);
}
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
// prep-work
const _data = new Uint8Array(16);
const _hex = [];
for (let i = 0; i < 256; i++) {
    _hex.push(i.toString(16).padStart(2, '0'));
}
// todo@jrieken - with node@15 crypto#getRandomBytes is available everywhere, https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues#browser_compatibility
let _fillRandomValues;
if (typeof crypto === 'object' && typeof crypto.getRandomValues === 'function') {
    // browser
    _fillRandomValues = crypto.getRandomValues.bind(crypto);
}
else {
    _fillRandomValues = function (bucket) {
        for (let i = 0; i < bucket.length; i++) {
            bucket[i] = Math.floor(Math.random() * 256);
        }
        return bucket;
    };
}
function generateUuid(joinChar = '-') {
    // get data
    _fillRandomValues(_data);
    // set version bits
    _data[6] = (_data[6] & 0x0f) | 0x40;
    _data[8] = (_data[8] & 0x3f) | 0x80;
    // print as string
    let i = 0;
    let result = '';
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += joinChar;
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += joinChar;
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += joinChar;
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += joinChar;
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    return result;
}

/**
 * 这里是存储生成的装饰器的，避免重复生成
 * DI means Dependency Injection 依赖注入
 * DI_TARGET和DI_DEPENDENCIES是自定义的两个key
 */
exports._util = void 0;
(function (_util) {
    _util.servicesIds = new Map();
    _util.DI_TARGET = '$di$target';
    _util.DI_DEPENDENCIES = '$di$dependencies';
    function getServiceDependencies(ctor) {
        return ctor[_util.DI_DEPENDENCIES] || [];
    }
    _util.getServiceDependencies = getServiceDependencies;
})(exports._util || (exports._util = {}));
function storeServiceDependency(id, target, index, optional) {
    if (target[exports._util.DI_TARGET] === target) {
        target[exports._util.DI_DEPENDENCIES].push({ id, index, optional });
    }
    else {
        target[exports._util.DI_DEPENDENCIES] = [{ id, index, optional }];
        target[exports._util.DI_TARGET] = target;
    }
}
function createDecorator(serviceId) {
    if (exports._util.servicesIds.has(serviceId)) {
        return exports._util.servicesIds.get(serviceId);
    }
    const id = function (target, propertyKey, parameterIndex) {
        if (arguments.length !== 3) {
            throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
        }
        storeServiceDependency(id, target, parameterIndex, false);
    };
    id.toString = () => serviceId;
    exports._util.servicesIds.set(serviceId, id);
    return id;
}
function refineServiceDecorator(serviceIdentifier) {
    return serviceIdentifier;
}
/**
 * Mark a service dependency as optional.
 */
function optional(serviceIdentifier) {
    return function (target, key, index) {
        if (arguments.length !== 3) {
            throw new Error('@optional-decorator can only be used to decorate a parameter');
        }
        storeServiceDependency(serviceIdentifier, target, index, true);
    };
}
const IInstantiationService = createDecorator('instantiationService');

class SyncDescriptor {
    constructor(ctor, staticArguments = [], supportDelayedInstantiation = false) {
        this.ctor = ctor;
        this.staticArguments = staticArguments;
        this.supportDelayedInstantiation = supportDelayedInstantiation;
    }
}
const createSyncDescriptor = (ctor, ...staticArguments) => {
    return new SyncDescriptor(ctor, staticArguments);
};

const _registry = [];
function registerSingleton(id, ctorDescriptor, supportsDelayedInstantiation) {
    if (!(ctorDescriptor instanceof SyncDescriptor)) {
        ctorDescriptor = new SyncDescriptor(ctorDescriptor, [], supportsDelayedInstantiation);
    }
    _registry.push([id, ctorDescriptor]);
}
function getSingletonServiceDescriptors() {
    return _registry;
}

const ICommandService = createDecorator('commandService');
const CommandsRegistry = new class {
    constructor() {
        this._commands = new Map();
        this._onDidRegisterCommand = new Emitter();
        this.onDidRegisterCommand = this._onDidRegisterCommand.event;
    }
    registerCommand(idOrCommand, handler) {
        if (!idOrCommand) {
            throw new Error('invalid Command');
        }
        if (typeof idOrCommand === 'string') {
            if (!handler) {
                throw new Error(`invalid command`);
            }
            return this.registerCommand({ id: idOrCommand, handler });
        }
        if (idOrCommand.description) {
            const constrains = [];
            for (let arg of idOrCommand.description.args) {
                constrains.push(arg.constraint);
            }
            const actualHandler = idOrCommand.handler;
            idOrCommand.handler = function (accessor, ...args) {
                validateConstraints(args, constrains);
                return actualHandler(accessor, ...args);
            };
        }
        const { id } = idOrCommand;
        let commands = this._commands.get(id);
        if (!commands) {
            commands = new LinkedList();
            this._commands.set(id, commands);
        }
        let removeFn = commands.unshift(idOrCommand);
        let ret = toDisposable(() => {
            removeFn();
            const command = this._commands.get(id);
            if (command === null || command === void 0 ? void 0 : command.isEmpty()) {
                this._commands.delete(id);
            }
        });
        this._onDidRegisterCommand.fire(id);
        return ret;
    }
    registerCommandAlias(oldId, newId) {
        return CommandsRegistry.registerCommand(oldId, (accessor, args) => accessor.get(ICommandService).executeCommand(newId, ...args));
    }
    getCommand(id) {
        const list = this._commands.get(id);
        if (!list || list.isEmpty()) {
            return undefined;
        }
        return exports.Iterable.first(list);
    }
    getCommands() {
        const result = new Map();
        for (const key of this._commands.keys()) {
            const command = this.getCommand(key);
            if (command) {
                result.set(key, command);
            }
        }
        return result;
    }
};
exports.CommandService = class CommandService extends Disposable {
    constructor(_instantiationService) {
        super();
        this._instantiationService = _instantiationService;
        this._onWillExecuteCommand = this._register(new Emitter());
        this.onWillExecuteCommand = this._onWillExecuteCommand.event;
        this._onDidExecuteCommand = new Emitter();
        this.onDidExecuteCommand = this._onDidExecuteCommand.event;
    }
    executeCommand(id, ...args) {
        return this._tryExecuteCommand(id, args);
    }
    _tryExecuteCommand(id, ...args) {
        const command = CommandsRegistry.getCommand(id);
        if (!command) {
            return Promise.reject(new Error(`command ${id} not found`));
        }
        try {
            this._onWillExecuteCommand.fire({ commandId: id, args });
            const result = this._instantiationService.invokeFunction(command.handler, ...args);
            this._onDidExecuteCommand.fire({ commandId: id, args });
            return Promise.resolve(result);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
};
exports.CommandService = __decorate([
    __param(0, IInstantiationService),
    __metadata("design:paramtypes", [Object])
], exports.CommandService);
registerSingleton(ICommandService, exports.CommandService, true);

class ServiceCollection {
    constructor(...entries) {
        this._entries = new Map();
        for (let [id, service] of entries) {
            this.set(id, service);
        }
    }
    set(id, instanceOrDescriptor) {
        const result = this._entries.get(id);
        this._entries.set(id, instanceOrDescriptor);
        return result;
    }
    has(id) {
        return this._entries.has(id);
    }
    get(id) {
        return this._entries.get(id);
    }
}

class Node {
    constructor(data) {
        this.incoming = new Map();
        this.outgoing = new Map();
        this.data = data;
    }
}
class Graph {
    constructor(_hasFn) {
        this._hasFn = _hasFn;
        this._nodes = new Map();
    }
    roots() {
        const ret = [];
        for (let node of this._nodes.values()) {
            if (node.outgoing.size === 0) {
                ret.push(node);
            }
        }
        return ret;
    }
    insertEdge(from, to) {
        const fromNode = this.lookupOrInsertNode(from);
        const toNode = this.lookupOrInsertNode(to);
        fromNode.outgoing.set(this._hasFn(to), toNode);
        toNode.incoming.set(this._hasFn(from), fromNode);
    }
    removeNode(data) {
        const key = this._hasFn(data);
        this._nodes.delete(key);
        for (let node of this._nodes.values()) {
            node.outgoing.delete(key);
            node.incoming.delete(key);
        }
    }
    ;
    lookupOrInsertNode(data) {
        const key = this._hasFn(data);
        let node = this._nodes.get(key);
        if (!node) {
            node = new Node(data);
            this._nodes.set(key, node);
        }
        return node;
    }
    ;
    lookup(data) {
        return this._nodes.get(this._hasFn(data));
    }
    ;
    isEmpty() {
        return this._nodes.size === 0;
    }
    toString() {
        let data = [];
        for (let [key, value] of this._nodes) {
            data.push(`${key}, (incoming)[${[...value.incoming.keys()].join(', ')}], (outgoing)[${[...value.outgoing.keys()].join(', ')}]`);
        }
        return data.join('\n');
    }
    findCycleSlow() {
        for (let [id, node] of this._nodes) {
            const seen = new Set([id]);
            const res = this._findCycle(node, seen);
            if (res) {
                return res;
            }
        }
        return undefined;
    }
    _findCycle(node, seen) {
        for (let [id, outgoing] of node.outgoing) {
            if (seen.has(id)) {
                return [...seen, id].join(' -> ');
            }
            seen.add(id);
            const value = this._findCycle(outgoing, seen);
            if (value) {
                return value;
            }
            seen.delete(id);
        }
        return undefined;
    }
}

class CyclicDependencyError extends Error {
    constructor(graph) {
        var _a;
        super('cycle dependency between services');
        this.message = (_a = graph.findCycleSlow()) !== null && _a !== void 0 ? _a : `UNABLE to detect cycle, dumping graph: \n${graph.toString()}`;
    }
}
class InstantiationService {
    constructor(services = new ServiceCollection(), strict = false, parent) {
        this._activeInstantiations = new Set();
        this._services = services;
        this._strict = strict;
        this._parent = parent;
        this._services.set(IInstantiationService, this);
    }
    createChild(services) {
        return new InstantiationService(services, this._strict, this);
    }
    invokeFunction(fn, ...args) {
        let _trace = Trace.traceCreation(fn);
        let _done = false;
        try {
            const accessor = {
                get: (id, isOptional) => {
                    if (_done) {
                        throw illegalState('service accessor is only valid during the invocation of its target method');
                    }
                    const result = this._getOrCreateServiceInstance(id, _trace);
                    if (!result && isOptional !== optional) {
                        throw new Error(`[invokeFunction] unknown service ${id}`);
                    }
                    return result;
                }
            };
            return fn(accessor, ...args);
        }
        finally {
            _done = true;
            _trace.stop();
        }
    }
    createInstance(ctorOrDescriptor, ...rest) {
        let _trace;
        let result;
        if (ctorOrDescriptor instanceof SyncDescriptor) {
            _trace = Trace.traceCreation(ctorOrDescriptor.ctor);
            result = this._createInstance(ctorOrDescriptor.ctor, ctorOrDescriptor.staticArguments.concat(rest), _trace);
        }
        else {
            _trace = Trace.traceCreation(ctorOrDescriptor);
            result = this._createInstance(ctorOrDescriptor, rest, _trace);
        }
        _trace.stop();
        return result;
    }
    _createInstance(ctor, args = [], _trace) {
        let serviceDependencies = exports._util.getServiceDependencies(ctor).sort((a, b) => a.index - b.index);
        let serviceArgs = [];
        for (const dependency of serviceDependencies) {
            let service = this._getOrCreateServiceInstance(dependency.id, _trace);
            if (!service && this._strict && !dependency.optional) {
                throw new Error(`[createInstance] ${ctor.name}`);
            }
            serviceArgs.push(service);
        }
        let firstServiceArgPos = serviceDependencies.length > 0 ? serviceDependencies[0].index : args.length;
        if (args.length !== firstServiceArgPos) {
            console.warn(`[createInstance First service dependency of ${ctor.name}] at position ${firstServiceArgPos + 1} conflicts with ${args.length} static arguments`);
            let delta = firstServiceArgPos - args.length;
            if (delta > 0) {
                args = args.concat(new Array(delta));
            }
            else {
                args = args.slice(0, firstServiceArgPos);
            }
        }
        return new ctor(...[...args, ...serviceArgs]);
    }
    _setServiceInstance(id, instance) {
        if (this._services.get(id) instanceof SyncDescriptor) {
            this._services.set(id, instance);
        }
        else if (this._parent) {
            this._parent._setServiceInstance(id, instance);
        }
        else {
            throw new Error('illegalState - setting UNKNOWN service instance');
        }
    }
    _getServiceInstanceOrDescriptor(id) {
        let instanceOrDesc = this._services.get(id);
        if (!instanceOrDesc && this._parent) {
            return this._parent._getServiceInstanceOrDescriptor(id);
        }
        else {
            return instanceOrDesc;
        }
    }
    _getOrCreateServiceInstance(id, _trace) {
        let thing = this._getServiceInstanceOrDescriptor(id);
        if (thing instanceof SyncDescriptor) {
            return this._safeCreateAndCacheServiceInstance(id, thing, _trace.branch(id, true));
        }
        else {
            _trace.branch(id, false);
            return thing;
        }
    }
    _safeCreateAndCacheServiceInstance(id, desc, _trace) {
        if (this._activeInstantiations.has(id)) {
            // 递归创建
            throw new Error(`illegal state - RECURSIVELY instantiating service '${id}'`);
        }
        this._activeInstantiations.add(id);
        try {
            return this._createAndCacheServiceInstance(id, desc, _trace);
        }
        finally {
            this._activeInstantiations.delete(id);
        }
    }
    _createAndCacheServiceInstance(id, desc, _trace) {
        const graph = new Graph(data => data.id.toString());
        let cycleCount = 0;
        const stack = [{ id, desc, _trace }];
        while (stack.length) {
            const item = stack.pop();
            graph.lookupOrInsertNode(item);
            if (cycleCount++ > 1000) {
                throw new CyclicDependencyError(graph);
            }
            for (let dependency of exports._util.getServiceDependencies(item.desc.ctor)) {
                let instanceOrDesc = this._getServiceInstanceOrDescriptor(dependency.id);
                if (!instanceOrDesc && !instanceOrDesc.optional) {
                    console.warn(`[createInstance] ${id} depends on ${dependency.id} which is NOT registered.`);
                }
                if (instanceOrDesc instanceof SyncDescriptor) {
                    const node = { id: dependency.id, desc: instanceOrDesc, _trace: item._trace.branch(dependency.id, true) };
                    graph.insertEdge(item, node);
                    stack.push(node);
                }
            }
        }
        while (true) {
            const roots = graph.roots();
            // 没有根节点，但是不为空，说明是循环依赖
            if (roots.length === 0) {
                if (!graph.isEmpty()) {
                    throw new CyclicDependencyError(graph);
                }
                break;
            }
            for (const { data } of roots) {
                const instanceOrDesc = this._getServiceInstanceOrDescriptor(data.id);
                if (instanceOrDesc instanceof SyncDescriptor) {
                    const instance = this._createServiceInstanceWithOwner(data.id, data.desc.ctor, data.desc.staticArguments, data.desc.supportDelayedInstantiation, data._trace);
                    this._setServiceInstance(data.id, instance);
                }
                graph.removeNode(data);
            }
        }
        return this._getServiceInstanceOrDescriptor(id);
    }
    _createServiceInstanceWithOwner(id, ctor, args = [], supportDelayedInstantiation, _trace) {
        if (this._services.get(id) instanceof SyncDescriptor) {
            return this._createServiceInstance(ctor, args, supportDelayedInstantiation, _trace);
        }
        else if (this._parent) {
            return this._parent._createServiceInstanceWithOwner(id, ctor, args, supportDelayedInstantiation, _trace);
        }
        else {
            throw new Error(`illegalState - creating UNKNOWN service instance ${ctor.name}`);
        }
    }
    _createServiceInstance(ctor, args = [], _supportDelayedInstantiation, _trace) {
        if (!_supportDelayedInstantiation) {
            return this._createInstance(ctor, args, _trace);
        }
        else {
            const idle = new IdleValue(() => this._createInstance(ctor, args, _trace));
            return new Proxy(Object.create(null), {
                get(target, propertyKey) {
                    if (propertyKey in target) {
                        return target[propertyKey];
                    }
                    let obj = idle.value;
                    let prop = obj[propertyKey];
                    if (typeof prop !== 'function') {
                        return prop;
                    }
                    prop = prop.bind(obj);
                    target[propertyKey] = prop;
                    return prop;
                },
                set(target, propertyKey, value) {
                    idle.value[propertyKey] = value;
                    return true;
                }
            });
        }
    }
}
var TraceType;
(function (TraceType) {
    TraceType[TraceType["Creation"] = 0] = "Creation";
    TraceType[TraceType["Invocation"] = 1] = "Invocation";
    TraceType[TraceType["Branch"] = 2] = "Branch";
})(TraceType || (TraceType = {}));
class Trace {
    constructor(type, name) {
        this.type = type;
        this.name = name;
        this._start = Date.now();
        this._dep = [];
    }
    static traceInvocation(ctor) {
        return Trace._None ;
    }
    static traceCreation(ctor) {
        return Trace._None ;
    }
    branch(id, first) {
        let child = new Trace(2 /* Branch */, id.toString());
        this._dep.push([id, first, child]);
        return child;
    }
    stop() {
        let dur = Date.now() - this._start;
        Trace._totals += dur;
        let causedCreation = false;
        function printChild(n, trace) {
            let res = [];
            let prefix = new Array(n + 1).join('\t');
            for (const [id, first, child] of trace._dep) {
                if (first && child) {
                    causedCreation = true;
                    res.push(`${prefix}CREATES -> ${id}`);
                    let nested = printChild(n + 1, child);
                    if (nested) {
                        res.push(nested);
                    }
                }
                else {
                    res.push(`${prefix}uses -> ${id}`);
                }
            }
            return res.join('\n');
        }
        let lines = [
            `${this.type === 0 /* Creation */ ? 'CREATE' : 'CALL'} ${this.name}`,
            `${printChild(1, this)}`,
            `DONE, took ${dur.toFixed(2)}ms (grand total ${Trace._totals.toFixed(2)}ms)`
        ];
        if (dur > 2 || causedCreation) {
            console.log(lines.join('\n'));
        }
    }
}
Trace._None = new class extends Trace {
    constructor() {
        super(-1, null);
    }
    stop() { }
    branch() { return this; }
};
Trace._totals = 0;

exports.ArrayQueue = ArrayQueue;
exports.AsyncEmitter = AsyncEmitter;
exports.AsyncReferenceCollection = AsyncReferenceCollection;
exports.AutoOpenBarrier = AutoOpenBarrier;
exports.Barrier = Barrier;
exports.CancellationTokenSource = CancellationTokenSource;
exports.CommandsRegistry = CommandsRegistry;
exports.ConfigKeysIterator = ConfigKeysIterator;
exports.DebounceEmitter = DebounceEmitter;
exports.DeferredPromise = DeferredPromise;
exports.Delayer = Delayer;
exports.Disposable = Disposable;
exports.DisposableStore = DisposableStore;
exports.Emitter = Emitter;
exports.ErrorHandler = ErrorHandler;
exports.EventBufferer = EventBufferer;
exports.EventMultiplexer = EventMultiplexer;
exports.FileAccess = FileAccess;
exports.ICommandService = ICommandService;
exports.IInstantiationService = IInstantiationService;
exports.IdleValue = IdleValue;
exports.ImmortalReference = ImmortalReference;
exports.InstantiationService = InstantiationService;
exports.IntervalCounter = IntervalCounter;
exports.IntervalTimer = IntervalTimer;
exports.LRUCache = LRUCache;
exports.Limiter = Limiter;
exports.LinkedList = LinkedList;
exports.LinkedMap = LinkedMap;
exports.MultiDisposeError = MultiDisposeError;
exports.MutableDisposable = MutableDisposable;
exports.NotImplementedProxy = NotImplementedProxy;
exports.PathIterator = PathIterator;
exports.PauseableEmitter = PauseableEmitter;
exports.PlatformToString = PlatformToString;
exports.QMBuffer = QMBuffer;
exports.Queue = Queue;
exports.ReadonlyMapView = ReadonlyMapView;
exports.RefCountedDisposable = RefCountedDisposable;
exports.ReferenceCollection = ReferenceCollection;
exports.Relay = Relay;
exports.RemoteAuthorities = RemoteAuthorities;
exports.ResourceMap = ResourceMap;
exports.ResourceQueue = ResourceQueue;
exports.RunOnceScheduler = RunOnceScheduler;
exports.RunOnceWorker = RunOnceWorker;
exports.ScrollState = ScrollState;
exports.Scrollable = Scrollable;
exports.Sequence = Sequence;
exports.Sequencer = Sequencer;
exports.SequencerByKey = SequencerByKey;
exports.ServiceCollection = ServiceCollection;
exports.SimpleSequence = SimpleSequence;
exports.SmoothScrollingOperation = SmoothScrollingOperation;
exports.SmoothScrollingUpdate = SmoothScrollingUpdate;
exports.StopWatch = StopWatch;
exports.StringIterator = StringIterator;
exports.SyncDescriptor = SyncDescriptor;
exports.TaskSequentializer = TaskSequentializer;
exports.TernarySearchTree = TernarySearchTree;
exports.ThrottledDelayer = ThrottledDelayer;
exports.ThrottledWorker = ThrottledWorker;
exports.Throttler = Throttler;
exports.TimeoutTimer = TimeoutTimer;
exports.URI = URI;
exports.UriIterator = UriIterator;
exports.areFunctions = areFunctions;
exports.arrayInsert = arrayInsert;
exports.asArray = asArray;
exports.asPromise = asPromise;
exports.assertAllDefined = assertAllDefined;
exports.assertIsDefined = assertIsDefined;
exports.assertNever = assertNever;
exports.assertType = assertType;
exports.basename = basename$1;
exports.binarySearch = binarySearch;
exports.bufferToReadable = bufferToReadable;
exports.bufferToStream = bufferToStream;
exports.bufferedStreamToBuffer = bufferedStreamToBuffer;
exports.canceled = canceled;
exports.coalesce = coalesce;
exports.coalesceInPlace = coalesceInPlace;
exports.combinedDisposable = combinedDisposable;
exports.commonPrefixLength = commonPrefixLength$1;
exports.consumeReadable = consumeReadable;
exports.consumeStream = consumeStream;
exports.createCancelablePromise = createCancelablePromise;
exports.createDecorator = createDecorator;
exports.createProxyObject = createProxyObject;
exports.createSyncDescriptor = createSyncDescriptor;
exports.delimiter = delimiter;
exports.delta = delta;
exports.dirname = dirname$1;
exports.disposableTimeout = disposableTimeout;
exports.dispose = dispose;
exports.distinct = distinct;
exports.distinctES6 = distinctES6;
exports.emptyStream = emptyStream;
exports.equals = equals;
exports.errorHandler = errorHandler;
exports.extname = extname$1;
exports.findFirstInSorted = findFirstInSorted;
exports.first = first;
exports.firstOrDefault = firstOrDefault;
exports.firstParallel = firstParallel;
exports.flatten = flatten;
exports.format = format;
exports.fromNow = fromNow;
exports.generateUuid = generateUuid;
exports.getAllMethodNames = getAllMethodNames;
exports.getAllPropertyNames = getAllPropertyNames;
exports.getDriveLetter = getDriveLetter;
exports.getOrSet = getOrSet;
exports.getRandomElement = getRandomElement;
exports.getRoot = getRoot;
exports.getSingletonServiceDescriptors = getSingletonServiceDescriptors;
exports.glob = glob;
exports.globals = globals;
exports.groupBy = groupBy;
exports.hasDriveLetter = hasDriveLetter;
exports.illegalState = illegalState;
exports.index = index;
exports.indexOfPath = indexOfPath;
exports.insert = insert;
exports.insertInto = insertInto;
exports.isAbsolute = isAbsolute;
exports.isAndroid = isAndroid;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isDefined = isDefined;
exports.isDisposable = isDisposable;
exports.isEmptyObject = isEmptyObject;
exports.isEqual = isEqual$1;
exports.isEqualOrParent = isEqualOrParent$1;
exports.isFalsyOrEmpty = isFalsyOrEmpty;
exports.isFunction = isFunction;
exports.isIOS = isIOS;
exports.isIterable = isIterable;
exports.isLinux = isLinux;
exports.isLinuxSnap = isLinuxSnap;
exports.isLittleEndian = isLittleEndian;
exports.isMacintosh = isMacintosh;
exports.isMobile = isMobile;
exports.isMusic = isMusic;
exports.isNative = isNative;
exports.isNonEmptyArray = isNonEmptyArray;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isPathSeparator = isPathSeparator;
exports.isPromiseCanceledError = isPromiseCanceledError;
exports.isReadableBufferedStream = isReadableBufferedStream;
exports.isReadableStream = isReadableStream;
exports.isRootOrDriveLetter = isRootOrDriveLetter;
exports.isString = isString;
exports.isStringArray = isStringArray;
exports.isThenable = isThenable;
exports.isUNC = isUNC;
exports.isUUID = isUUID;
exports.isUndefined = isUndefined;
exports.isUndefinedOrNull = isUndefinedOrNull;
exports.isValidBasename = isValidBasename;
exports.isWeb = isWeb;
exports.isWindows = isWindows;
exports.isWindowsDriveLetter = isWindowsDriveLetter;
exports.join = join;
exports.lastIndex = lastIndex;
exports.listenStream = listenStream;
exports.mapArrayOrNot = mapArrayOrNot;
exports.mapFind = mapFind;
exports.mapToString = mapToString;
exports.markAsSingleton = markAsSingleton;
exports.maxIndex = maxIndex;
exports.minIndex = minIndex;
exports.move = move;
exports.newWriteableBufferStream = newWriteableBufferStream;
exports.newWriteableStream = newWriteableStream;
exports.normalize = normalize;
exports.onUnexpectedError = onUnexpectedError;
exports.once = once;
exports.optional = optional;
exports.parse = parse$1;
exports.parseLineAndColumnAware = parseLineAndColumnAware;
exports.peekReadable = peekReadable;
exports.peekStream = peekStream;
exports.platform = platform$1;
exports.posix = posix;
exports.prefixedBufferReadable = prefixedBufferReadable;
exports.prefixedBufferStream = prefixedBufferStream;
exports.prefixedReadable = prefixedReadable;
exports.prefixedStream = prefixedStream;
exports.process = process$1;
exports.pushToEnd = pushToEnd;
exports.pushToStart = pushToStart;
exports.quickSelect = quickSelect;
exports.raceCancellablePromises = raceCancellablePromises;
exports.raceCancellation = raceCancellation;
exports.raceTimeout = raceTimeout;
exports.range = range;
exports.readUInt16LE = readUInt16LE;
exports.readUInt32BE = readUInt32BE;
exports.readUInt32LE = readUInt32LE;
exports.readUInt8 = readUInt8;
exports.readableToBuffer = readableToBuffer;
exports.refineServiceDecorator = refineServiceDecorator;
exports.registerSingleton = registerSingleton;
exports.relative = relative;
exports.remove = remove;
exports.resolve = resolve;
exports.resources = resources;
exports.retry = retry;
exports.sanitizeFilePath = sanitizeFilePath;
exports.sep = sep;
exports.sequence = sequence;
exports.setDisposableTracker = setDisposableTracker;
exports.setGlobalLeakWarningThreshold = setGlobalLeakWarningThreshold;
exports.setImmediate = setImmediate;
exports.setToString = setToString;
exports.setUnexpectedErrorHandler = setUnexpectedErrorHandler;
exports.shuffle = shuffle;
exports.sortedDiff = sortedDiff;
exports.splice = splice;
exports.streamToBuffer = streamToBuffer;
exports.streamToBufferReadableStream = streamToBufferReadableStream;
exports.strings = strings;
exports.tail = tail;
exports.tail2 = tail2;
exports.timeout = timeout;
exports.toDisposable = toDisposable;
exports.toErrorMessage = toErrorMessage;
exports.toLocalISOString = toLocalISOString;
exports.toNamespacedPath = toNamespacedPath;
exports.toPosixPath = toPosixPath;
exports.toReadable = toReadable;
exports.toSlashes = toSlashes;
exports.toStream = toStream;
exports.toUint32 = toUint32;
exports.toUint8 = toUint8;
exports.top = top;
exports.topAsync = topAsync;
exports.transform = transform;
exports.uniqueFilter = uniqueFilter;
exports.uriToFsPath = uriToFsPath;
exports.userAgent = userAgent;
exports.validateConstraint = validateConstraint;
exports.validateConstraints = validateConstraints;
exports.win32 = win32;
exports.withNullAsUndefined = withNullAsUndefined;
exports.withUndefinedAsNull = withUndefinedAsNull;
exports.writeUInt16LE = writeUInt16LE;
exports.writeUInt32BE = writeUInt32BE;
exports.writeUInt32LE = writeUInt32LE;
exports.writeUInt8 = writeUInt8;
