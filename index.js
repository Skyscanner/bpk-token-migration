#!/usr/bin/env node

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

/* eslint-disable no-console */

const fs = require('fs');

const colors = require('colors');
const glob = require('glob-fs')();

const {
  generateReplacementMappings,
  replaceAll,
  pluralizeWord,
} = require('./src/utils');

const getListOfScssFiles = (folder = '.') => {
  const pattern = `./${folder}/**/*.scss`;
  console.log(
    colors.yellow(
      `🔍\tLooking for .scss files using glob pattern '${pattern}'`,
    ),
  );
  const files = glob.readdirSync(pattern, {});
  console.log(colors.green(`ℹ️\tFound ${files.length} scss files.`));
  return files;
};

(() => {
  const scssFiles = getListOfScssFiles(process.argv[2]);
  if (scssFiles.length === 0) {
    console.log(colors.red('⚠️\tNo files to convert. Bye bye 👋'));
    process.exit(0);
  }

  const replacementMappings = generateReplacementMappings();

  let totalOccurrences = 0;

  scssFiles.forEach((fileName) => {
    const contents = fs.readFileSync(fileName, 'utf8');
    const { updatedString, occurrences } = replaceAll(
      contents,
      replacementMappings,
    );
    totalOccurrences += occurrences;
    fs.writeFileSync(fileName, updatedString);
    console.log(
      colors.green(
        `🔁\t Replaced ${occurrences} ${pluralizeWord(
          'occurrence',
          occurrences,
        )} in ${fileName}`,
      ),
    );
  });

  console.log(
    colors.green(
      `\n✅\tReplaced ${totalOccurrences} ${pluralizeWord(
        'occurrence',
        totalOccurrences,
      )} in ${scssFiles.length} ${pluralizeWord('file', scssFiles.length)}.`,
    ),
  );
})();
