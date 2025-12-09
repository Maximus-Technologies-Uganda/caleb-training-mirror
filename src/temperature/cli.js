#!/usr/bin/env node

/**
 * CLI wrapper for temperature conversion
 */

const { cToF, fToC, validateOptions } = require('./index');

/**
 * Parses command line arguments
 * @returns {object} Parsed arguments {from, to, value}
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    from: null,
    to: null,
    value: null
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--from') {
      parsed.from = args[i + 1];
      i++;
    } else if (arg.startsWith('--from=')) {
      parsed.from = arg.split('=')[1];
    } else if (arg === '--to') {
      parsed.to = args[i + 1];
      i++;
    } else if (arg.startsWith('--to=')) {
      parsed.to = arg.split('=')[1];
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (!arg.startsWith('--')) {
      // Assume it's the temperature value
      parsed.value = arg;
    }
  }

  return parsed;
}

/**
 * Validates required arguments
 * @param {object} args - Parsed arguments
 * @throws {Error} If required arguments are missing
 */
function validateArgs(args) {
  if (!args.from) {
    throw new Error('Missing required argument: --from');
  }

  if (!args.to) {
    throw new Error('Missing required argument: --to');
  }

  if (args.value === null) {
    throw new Error('Missing temperature value');
  }

  const valueNum = parseFloat(args.value);
  if (isNaN(valueNum)) {
    throw new Error(`Invalid temperature value: ${args.value}`);
  }

  return valueNum;
}

/**
 * Converts temperature based on arguments
 * @param {string} from - Source unit
 * @param {string} to - Target unit
 * @param {number} value - Temperature value
 * @returns {number} Converted temperature
 */
function convert(from, to, value) {
  validateOptions(from, to);

  if (from === 'C' && to === 'F') {
    return cToF(value);
  } else if (from === 'F' && to === 'C') {
    return fToC(value);
  }
}

/**
 * Formats the result for display
 * @param {number} input - Input temperature
 * @param {string} fromUnit - Source unit
 * @param {number} result - Converted temperature
 * @param {string} toUnit - Target unit
 * @returns {string} Formatted result
 */
function formatResult(input, fromUnit, result, toUnit) {
  const roundedResult = Math.round(result * 100) / 100;
  return `${input}°${fromUnit} = ${roundedResult}°${toUnit}`;
}

/**
 * Prints help message
 */
function printHelp() {
  console.log(`
🌡️  Temperature Converter

Usage: npm run temp -- --from <C|F> --to <C|F> <value>
   or: node src/temperature/cli.js --from <C|F> --to <C|F> <value>

Options:
  --from <C|F>    Source temperature unit (C = Celsius, F = Fahrenheit)
  --to <C|F>      Target temperature unit (C = Celsius, F = Fahrenheit)
  <value>         Temperature value to convert
  --help, -h      Show this help message

Examples:
  npm run temp -- --from C --to F 0
  # Output: 0°C = 32°F

  npm run temp -- --from=F --to=C 98.6
  # Output: 98.6°F = 37°C

  npm run temp -- --from C --to F 25
  # Output: 25°C = 77°F
`);
}

/**
 * Main CLI entry point
 */
function main() {
  try {
    // Parse arguments
    const args = parseArgs();

    // Validate arguments
    const value = validateArgs(args);

    // Convert temperature
    const result = convert(args.from, args.to, value);

    // Print result
    console.log(formatResult(value, args.from, result, args.to));

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.error('\nRun with --help for usage information');
    process.exit(1);
  }
}

// Only run if called directly (not imported)
if (require.main === module) {
  main();
}

module.exports = { parseArgs, validateArgs, convert, formatResult, main };

