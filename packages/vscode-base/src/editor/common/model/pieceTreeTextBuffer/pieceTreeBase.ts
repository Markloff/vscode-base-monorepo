import { CharCode } from '../../../../core/base/common';
import { TreeNode } from './rbTreeBase';


export const AverageBufferSize = 65536;

export function createUintArray(arr: number[]): Uint32Array | Uint16Array {
	let ret: Uint16Array | Uint32Array;
	if (arr[arr.length - 1] < 65536) {
		ret = new Uint16Array(arr.length);
	} else {
		ret = new Uint32Array(arr.length);
	}
	ret.set(arr, 0);
	return ret;
}

export class LineStarts {
	constructor(
		public readonly lineStarts: Uint32Array | Uint16Array | number[],
		public readonly cr: number,
		public readonly lf: number,
		public readonly crlf: number,
		public readonly isBasicASCII: boolean,
	) { }
}

export function createLineStartsFast(str: string, readonly: boolean = true): Uint32Array | Uint16Array | number[] {
	let ret: number[] = [0];
	let retLength = 1;

	for (let i = 0, len = str.length; i < len; i++) {
		const chr = str.charCodeAt(i);

		if (chr === CharCode.CarriageReturn) {
			if (i + 1 < len && str.charCodeAt(i + 1) === CharCode.LineFeed) {
				ret[retLength ++] = i + 2;
				i ++;
			} else {
				ret[retLength ++] = i + 1;
			}
		} else if (chr === CharCode.LineFeed) {
			ret[retLength++] = i + 1;
		}
	}
	if (readonly) {
		return createUintArray(ret);
	} else {
		return ret;
	}
}

export function createLineStarts(r: number[], str: string): LineStarts {
	r.length = 0;
	r[0] = 0;
	let rLength = 1;
	let cr = 0, lf = 0, crlf = 0;
	let isBasicASCII = true;
	for (let i = 0, len = str.length; i < len; i++) {
		const chr = str.charCodeAt(i);

		if (chr === CharCode.CarriageReturn) {
			if (i + 1 < len && str.charCodeAt(i + 1) === CharCode.LineFeed) {
				// \r\n... case
				crlf++;
				r[rLength++] = i + 2;
				i++; // skip \n
			} else {
				cr++;
				// \r... case
				r[rLength++] = i + 1;
			}
		} else if (chr === CharCode.LineFeed) {
			lf++;
			r[rLength++] = i + 1;
		} else {
			if (isBasicASCII) {
				if (chr !== CharCode.Tab && (chr < 32 || chr > 126)) {
					isBasicASCII = false;
				}
			}
		}
	}
	const result = new LineStarts(createUintArray(r), cr, lf, crlf, isBasicASCII);
	r.length = 0;

	return result;
}

export interface NodePosition {
	node: TreeNode;
	remainder: number;
	nodeStartOffset: number;
}

export interface BufferCursor {
	line: number;
	column: number;
}

export class Piece {
	readonly bufferIndex: number;
	readonly start: BufferCursor;
	readonly end: BufferCursor;
	readonly length: number;
	readonly lineFeedCnt: number;

	constructor(bufferIndex: number, start: BufferCursor, end: BufferCursor, lineFeedCnt: number, length: number) {
		this.bufferIndex = bufferIndex;
		this.start = start;
		this.end = end;
		this.lineFeedCnt = lineFeedCnt;
		this.length = length;
	}
}








