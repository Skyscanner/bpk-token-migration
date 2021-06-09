/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {
  generateReplacementMappings,
  replaceAll,
  pluralizeWord,
} = require('./utils');

describe('generateReplacementMappings', () => {
  test('Correctly generates mappings', () => {
    const expected = {
      '$bpk-spacing-xs': 'bpk-spacing-xs()',
      '$bpk-spacing-sm': 'bpk-spacing-sm()',
      '$bpk-spacing-md': 'bpk-spacing-md()',
      '$bpk-spacing-base': 'bpk-spacing-base()',
      '$bpk-spacing-lg': 'bpk-spacing-lg()',
      '$bpk-spacing-xl': 'bpk-spacing-xl()',
      '$bpk-spacing-xxl': 'bpk-spacing-xxl()',
    };

    expect(generateReplacementMappings()).toStrictEqual(expected);
  });
});

describe('pluralizeWord', () => {
  test('Pluralizes when amount is not 1', () => {
    expect(pluralizeWord('word', 2)).toBe('words');
  });

  test('Does not pluralize when amount is 1', () => {
    expect(pluralizeWord('word', 1)).toBe('word');
  });
});

describe('replaceAll', () => {
  test('Correctly replaces all occurrences', () => {
    const inputString = `
    It was the best of times, it was the worst of times.

    It was a bright cold day in April, and the clocks were striking thirteen.

    width: $foo;
    `;

    const mappings = {
      worst: 'blurst',
      thirteen: 'twelve',
      $foo: 'foo()',
    };

    const expectedOuput = `
    It was the best of times, it was the blurst of times.

    It was a bright cold day in April, and the clocks were striking twelve.

    width: foo();
    `;

    const { occurrences, updatedString } = replaceAll(inputString, mappings);

    expect(occurrences).toBe(3);
    expect(updatedString).toBe(expectedOuput);
  });
});
