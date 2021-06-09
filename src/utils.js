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

const generateReplacementMappings = () => {
  const sizes = ['xs', 'sm', 'md', 'base', 'lg', 'xl', 'xxl'];
  const replacements = {};
  sizes.forEach((size) => {
    const original = `$bpk-spacing-${size}`;
    const replacement = `bpk-spacing-${size}()`;
    replacements[original] = replacement;
  });
  return replacements;
};

const escapeRegex = (inputString) =>
  inputString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const replaceAll = (inputString, mapObject) => {
  const regexString = Object.keys(mapObject).map(escapeRegex).join('|');
  const regex = new RegExp(regexString, 'g');
  let occurrences = 0;
  const updatedString = inputString.replace(regex, (matched) => {
    occurrences += 1;
    return mapObject[matched];
  });
  return {
    occurrences,
    updatedString,
  };
};

const pluralizeWord = (word, amount) => `${word}${amount === 1 ? '' : 's'}`;

module.exports = {
  generateReplacementMappings,
  replaceAll,
  pluralizeWord,
};
