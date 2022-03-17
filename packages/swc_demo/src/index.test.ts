import { transformSync } from '@swc/core';
import { suite, test } from 'mocha';
import assert from 'assert';
import ConsoleStripper from './visitor';

suite('should strip console call', () => {

	test("aaa", () => {
		const output = transformSync(`console.log('Foo')`, {
			plugin: (m) => (new ConsoleStripper()).visitProgram(m),
		});
		assert.strictEqual(output.code.replace(/\n/g, ''), 'void 0;');
	})
})
