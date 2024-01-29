import FormData from 'form-data';
import type { BinaryFileType, JsonObject } from 'src/interfaces/generic';
import { ApplicationError } from 'src/errors/application.error';

/* The line `const readStreamClasses = new Set(['ReadStream', 'Readable', 'ReadableStream']);` is
creating a new Set called `readStreamClasses` and populating it with three string values:
'ReadStream', 'Readable', and 'ReadableStream'. This set is used later in the code to check if an
object is a ReadStream, Readable, or ReadableStream. */
const readStreamClasses = new Set(['ReadStream', 'Readable', 'ReadableStream']);

// NOTE: BigInt.prototype.toJSON is not available, which causes JSON.stringify to throw an error
// as well as the flatted stringify method. This is a workaround for that.
/* The above code is adding a new method called `toJSON` to the `BigInt` prototype in TypeScript. This
method converts a `BigInt` value to a string representation. */
BigInt.prototype.toJSON = function () {
	return this.toString();
};

/**
 * The function `isObjectEmpty` checks if an object is empty, taking into account various types of
 * objects.
 * @param {object | null | undefined} obj - The `obj` parameter is of type `object | null | undefined`.
 * This means it can accept an object, `null`, or `undefined` as its value.
 * @returns a boolean value.
 */
export const isObjectEmpty = (obj: object | null | undefined): boolean => {
	if (obj === undefined || obj === null) return true;
	if (typeof obj === 'object') {
		if (obj instanceof FormData) return obj.getLengthSync() === 0;
		if (Array.isArray(obj)) return obj.length === 0;
		if (obj instanceof Set || obj instanceof Map) return obj.size === 0;
		if (ArrayBuffer.isView(obj) || obj instanceof ArrayBuffer) return obj.byteLength === 0;
		if (Symbol.iterator in obj || readStreamClasses.has(obj.constructor.name)) return false;
		return Object.keys(obj).length === 0;
	}
	return true;
};

export type Primitives = string | number | boolean | bigint | symbol | null | undefined;

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument */
/**
 * The `deepCopy` function is a TypeScript implementation that creates a deep copy of an object,
 * including handling primitives, arrays, and objects with a `toJSON` method.
 * @param {T} source - The `source` parameter is the object or value that you want to make a deep copy
 * of.
 * @param hash - The `hash` parameter is an optional `WeakMap` object that is used to keep track of
 * objects that have already been copied. This is used to handle circular references and prevent
 * infinite recursion. If a `hash` object is provided, it will be used to store and retrieve copied
 * objects. If
 * @param [path] - The `path` parameter is a string that represents the current path of the object
 * being copied. It is used internally to keep track of nested objects and arrays.
 * @returns The function `deepCopy` returns a deep copy of the input `source` object.
 */
export const deepCopy = <T extends ((object | Date) & { toJSON?: () => string }) | Primitives>(
	source: T,
	hash = new WeakMap(),
	path = '',
): T => {
	const hasOwnProp = Object.prototype.hasOwnProperty.bind(source);
	// Primitives & Null & Function
	if (typeof source !== 'object' || source === null || typeof source === 'function') {
		return source;
	}
	// Date and other objects with toJSON method
	// TODO: remove this when other code parts not expecting objects with `.toJSON` method called and add back checking for Date and cloning it properly
	if (typeof source.toJSON === 'function') {
		return source.toJSON() as T;
	}
	if (hash.has(source)) {
		return hash.get(source);
	}
	// Array
	if (Array.isArray(source)) {
		const clone = [];
		const len = source.length;
		for (let i = 0; i < len; i++) {
			clone[i] = deepCopy(source[i], hash, path + `[${i}]`);
		}
		return clone as T;
	}
	// Object
	const clone = Object.create(Object.getPrototypeOf({}));
	hash.set(source, clone);
	for (const i in source) {
		if (hasOwnProp(i)) {
			clone[i] = deepCopy((source as any)[i], hash, path + `.${i}`);
		}
	}
	return clone;
};
// eslint-enable

type MutuallyExclusive<T, U> =
	| (T & { [k in Exclude<keyof U, keyof T>]?: never })
	| (U & { [k in Exclude<keyof T, keyof U>]?: never });

type JSONParseOptions<T> = MutuallyExclusive<{ errorMessage: string }, { fallbackValue: T }>;

/**
 * The `jsonParse` function is a TypeScript function that parses a JSON string into a specified type,
 * with options for fallback values and error handling.
 * @param {string} jsonString - The `jsonString` parameter is a string that represents a JSON object or
 * array.
 * @param [options] - The `options` parameter is an optional object that can contain the following
 * properties:
 * @returns The function `jsonParse` returns a value of type `T`.
 */
export const jsonParse = <T>(jsonString: string, options?: JSONParseOptions<T>): T => {
	try {
		return JSON.parse(jsonString) as T;
	} catch (error) {
		if (options?.fallbackValue !== undefined) {
			return options.fallbackValue;
		} else if (options?.errorMessage) {
			throw new ApplicationError(options.errorMessage);
		}

		throw error;
	}
};

/**
 * The above type defines options for the JSON.stringify function, including the ability to replace
 * circular references.
 * @property {boolean} replaceCircularRefs - A boolean value that determines whether circular
 * references should be replaced with a placeholder value during the JSON stringification process. If
 * set to true, circular references will be replaced with the string "[Circular]". If set to false or
 * not provided, an error will be thrown if a circular reference is encountered.
 */
type JSONStringifyOptions = {
	replaceCircularRefs?: boolean;
};

/**
 * The function `replaceCircularReferences` recursively replaces circular references in an object with
 * the string '[Circular Reference]'.
 * @param {T} value - The `value` parameter represents the value that you want to replace circular
 * references in. It can be of any type, but typically it would be an object or an array.
 * @param knownObjects - The `knownObjects` parameter is a `WeakSet` that keeps track of objects that
 * have already been visited during the recursive traversal of the input object. It is used to detect
 * circular references in the object graph.
 * @returns a modified version of the input value with any circular references replaced with the string
 * '[Circular Reference]'.
 */
export const replaceCircularReferences = <T>(value: T, knownObjects = new WeakSet()): T => {
	if (typeof value !== 'object' || value === null || value instanceof RegExp) return value;
	if ('toJSON' in value && typeof value.toJSON === 'function') return value.toJSON() as T;
	if (knownObjects.has(value)) return '[Circular Reference]' as T;
	knownObjects.add(value);
	const copy = (Array.isArray(value) ? [] : {}) as T;
	for (const key in value) {
		copy[key] = replaceCircularReferences(value[key], knownObjects);
	}
	knownObjects.delete(value);
	return copy;
};

/**
 * The function `jsonStringify` is a TypeScript function that converts an object to a JSON string, with
 * an option to replace circular references.
 * @param {unknown} obj - The `obj` parameter is the object that you want to convert to a JSON string.
 * It can be of any type, such as an array, object, string, number, boolean, or null.
 * @param {JSONStringifyOptions} options - The `options` parameter is an optional object that allows
 * you to customize the behavior of the `jsonStringify` function. It has the following properties:
 * @returns a string representation of the input object, using JSON.stringify(). If the
 * "replaceCircularRefs" option is set to true, circular references in the object will be replaced
 * before stringifying.
 */
export const jsonStringify = (obj: unknown, options: JSONStringifyOptions = {}): string => {
	return JSON.stringify(options?.replaceCircularRefs ? replaceCircularReferences(obj) : obj);
};

/**
 * The `sleep` function is a TypeScript function that returns a promise that resolves after a specified
 * number of milliseconds.
 * @param {number} ms - The parameter `ms` is the number of milliseconds to wait before resolving the
 * promise.
 */
export const sleep = async (ms: number): Promise<void> =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

/**
 * The function `fileTypeFromMimeType` takes a MIME type as input and returns the corresponding binary
 * file type (e.g., json, html, image, audio, video, text, pdf) or undefined if no match is found.
 * @param {string} mimeType - The `mimeType` parameter is a string that represents the MIME type of a
 * file. MIME types are used to identify the type and format of a file on the internet. Examples of
 * MIME types include `application/json`, `text/html`, `image/png`, `audio/mp3`, etc.
 * @returns a BinaryFileType or undefined.
 */
export function fileTypeFromMimeType(mimeType: string): BinaryFileType | undefined {
	if (mimeType.startsWith('application/json')) return 'json';
	if (mimeType.startsWith('text/html')) return 'html';
	if (mimeType.startsWith('image/')) return 'image';
	if (mimeType.startsWith('audio/')) return 'audio';
	if (mimeType.startsWith('video/')) return 'video';
	if (mimeType.startsWith('text/') || mimeType.startsWith('application/javascript')) return 'text';
	if (mimeType.startsWith('application/pdf')) return 'pdf';
	return;
}

/**
 * The `assert` function is used to throw an error if a given condition is not true.
 * @param {T} condition - The `condition` parameter is the expression that will be evaluated. If the
 * condition is falsy, an error will be thrown. If the condition is truthy, the function will return
 * without throwing an error.
 * @param {string} [msg] - The `msg` parameter is an optional string that represents the error message
 * to be displayed if the assertion fails. If no message is provided, a default message of "Invalid
 * assertion" will be used.
 */
export function assert<T>(condition: T, msg?: string): asserts condition {
	if (!condition) {
		const error = new Error(msg ?? 'Invalid assertion');
		// hide assert stack frame if supported
		if (Error.hasOwnProperty('captureStackTrace')) {
			// V8 only - https://nodejs.org/api/errors.html#errors_error_capturestacktrace_targetobject_constructoropt
			Error.captureStackTrace(error, assert);
		} else if (error.stack) {
			// fallback for IE and Firefox
			error.stack = error.stack
				.split('\n')
				.slice(1) // skip assert function from stack frames
				.join('\n');
		}
		throw error;
	}
}

/**
 * The function checks if a value is a non-empty object.
 * @param {any} value - The `value` parameter is the input value that we want to check if it is a
 * traversable object.
 * @returns a boolean value.
 */
export const isTraversableObject = (value: any): value is JsonObject => {
	return value && typeof value === 'object' && !Array.isArray(value) && !!Object.keys(value).length;
};

/**
 * The function `removeCircularRefs` recursively removes circular references from a JSON object.
 * @param {JsonObject} obj - The `obj` parameter is a JSON object that may contain circular references.
 * @param seen - The `seen` parameter is a Set object that keeps track of objects that have already
 * been visited during the traversal. It is used to detect circular references in the object graph.
 */
export const removeCircularRefs = (obj: JsonObject, seen = new Set()) => {
	seen.add(obj);
	Object.entries(obj).forEach(([key, value]) => {
		if (isTraversableObject(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			seen.has(value) ? (obj[key] = { circularReference: true }) : removeCircularRefs(value, seen);
			return;
		}
		if (Array.isArray(value)) {
			value.forEach((val, index) => {
				if (seen.has(val)) {
					value[index] = { circularReference: true };
					return;
				}
				if (isTraversableObject(val)) {
					removeCircularRefs(val, seen);
				}
			});
		}
	});
};
