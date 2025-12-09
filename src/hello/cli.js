#!/usr/bin/env node

/**
 * CLI wrapper for hello greeting
 */

const { formatGreeting } = require('./index.js');

/**
 * Prints help information
 */
function printHelp() {
    console.log(`
👋 Hello CLI

Usage: node src/hello/cli.js --name=<name> [--shout]

Options:
  --name <name>   Name to greet (required)
  --shout         Output greeting in uppercase
  --help, -h      Show this help message

Examples:
  node src/hello/cli.js --name=Caleb
  # Output: Hello, Caleb!

  node src/hello/cli.js --name Caleb --shout
  # Output: HELLO, Caleb!
`);
}

/**
 * Parses command line arguments
 * @param {string[]} argv - Command line arguments
 * @returns {object} Parsed arguments {name, shout}
 */
function parseArgs(argv) {
    const args = { name: '', shout: false };
    
    for (let i = 2; i < argv.length; i++) {
        const arg = argv[i];
        
        if (arg === '--help' || arg === '-h') {
            printHelp();
            process.exit(0);
        } else if (arg.startsWith('--name=')) {
            args.name = arg.split('=')[1];
        } else if (arg === '--name' && i + 1 < argv.length) {
            args.name = argv[i + 1];
            i++;
        } else if (arg === '--shout') {
            args.shout = true;
        }
    }
    
    return args;
}

/**
 * Main CLI entry point
 */
function main() {
    try {
        const args = parseArgs(process.argv);
        
        // Validate required arguments
        if (!args.name) {
            throw new Error('Missing required argument: --name');
        }
        
        const result = formatGreeting(args.name, args.shout);
        console.log(result);
        
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

module.exports = { parseArgs, printHelp, main };