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

const SCRIPTS = {
  REPLACE_TOKENS_WITH_FUNCTIONS: 'replace-tokens-with-functions',
  ENABLE_V2_SPACING: 'enable-v2-spacing',
  DISABLE_V2_SPACING: 'disable-v2-spacing',
};

const GLOBAL_VARIABLE = '$bpk-spacing-v2';

const getFileContents = (fileName) => fs.readFileSync(fileName, 'utf8');

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

const replaceTokensWithFunctions = (scssFiles) => {
  const replacementMappings = generateReplacementMappings();

  let totalOccurrences = 0;

  scssFiles.forEach((fileName) => {
    const contents = getFileContents(fileName);
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
};

const setSpacingSystem = (enableV2, scssFiles) => {
  scssFiles.forEach((fileName) => {
    const contents = getFileContents(fileName);
    let updatedContents;
    if (contents.includes(GLOBAL_VARIABLE)) {
      // Update the variable.
      const regexString = new RegExp(`\\${GLOBAL_VARIABLE}: (true|false)`);
      updatedContents = contents.replace(
        regexString,
        `${GLOBAL_VARIABLE}: ${enableV2}`,
      );
    } else {
      // Variable needs to be added.
      updatedContents = `${GLOBAL_VARIABLE}: ${enableV2};\n\n${contents}`;
    }
    fs.writeFileSync(fileName, updatedContents);
    console.log(
      colors.green(
        `🔁\t Set ${GLOBAL_VARIABLE} to ${colors.yellow(
          enableV2,
        )} in ${fileName}`,
      ),
    );
  });
  console.log(
    colors.green(
      `\n✅\tSet ${GLOBAL_VARIABLE} to ${colors.yellow(enableV2)} in ${
        scssFiles.length
      } ${pluralizeWord('file', scssFiles.length)}.`,
    ),
  );
};

(() => {
  const scriptToRun = process.argv[2];
  const possibleScripts = Object.values(SCRIPTS);
  if (!possibleScripts.includes(scriptToRun)) {
    console.log(
      colors.yellow(
        `Usage: @skyscanner/bpk-token-migration (${possibleScripts.join(
          ' | ',
        )}) directory-name`,
      ),
    );
    process.exit(0);
  }

  const scssFiles = getListOfScssFiles(process.argv[3]);
  if (scssFiles.length === 0) {
    console.log(colors.red('⚠️\tNo files to convert. Bye bye 👋'));
    process.exit(0);
  }

  switch (scriptToRun) {
    case SCRIPTS.REPLACE_TOKENS_WITH_FUNCTIONS:
      replaceTokensWithFunctions(scssFiles);
      break;
    case SCRIPTS.ENABLE_V2_SPACING:
      setSpacingSystem(true, scssFiles);
      break;
    case SCRIPTS.DISABLE_V2_SPACING:
      setSpacingSystem(false, scssFiles);
      break;
    default:
      process.exit(0);
  }
})();
