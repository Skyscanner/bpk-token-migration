# bpk-token-migration

[![npm version](https://badge.fury.io/js/%40skyscanner%2Fbpk-token-migration.svg)](https://badge.fury.io/js/%40skyscanner%2Fbpk-token-migration)

Replaces all instances of [Backpack tokens](https://github.com/Skyscanner/backpack-foundations) in `.scss` files from the old variable-based format, to the new function-based format.

## Example

### Before

```scss
.my-component {
  margin: $bpk-spacing-sm;
  padding: $bpk-spacing-md $bpk-spacing-base;
}
```

### After

```scss
.my-component {
  margin: bpk-spacing-sm();
  padding: bpk-spacing-md() bpk-spacing-base();
}
```

## Usage

```sh
# Run on the current directory
npx @skyscanner/bpk-token-migration

# Run on a specific directory
npx @skyscanner/bpk-token-migration src/packages
```

Scans directories recursively, looking for all files ending in `.scss`. Your `.gitignore` file is respected, no files listed in there will be included.

## Contributing

```sh
# Run the code locally
node index.js directory/to/test/on

# Run tests
npm test
```
