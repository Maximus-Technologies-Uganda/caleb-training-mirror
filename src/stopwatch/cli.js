#!/usr/bin/env node

/**
 * CLI wrapper for the stopwatch module
 */

const Stopwatch = require('./index');

// Create a global stopwatch instance
const stopwatch = new Stopwatch();

/**
 * Parses and executes stopwatch commands
 * @param {string} command - The command to execute (start, lap, stop)
 */
function executeCommand(command) {
  const cmd = command.toLowerCase().trim();

  try {
    switch (cmd) {
      case 'start':
        stopwatch.start();
        console.log('⏱️  Stopwatch started!');
        break;

      case 'lap': {
        const lapTime = stopwatch.lap();
        const lapNumber = stopwatch.laps.length;
        console.log(`🏁 Lap ${lapNumber}: ${Stopwatch.formatTime(lapTime)}`);
        break;
      }

      case 'stop': {
        const finalTime = stopwatch.stop();
        console.log(`🛑 Stopwatch stopped!`);
        console.log(`Final time: ${Stopwatch.formatTime(finalTime)}`);
        
        if (stopwatch.laps.length > 0) {
          console.log('\nLap times:');
          stopwatch.laps.forEach((lap, index) => {
            const splitTime = index === 0 ? lap : lap - stopwatch.laps[index - 1];
            console.log(`  Lap ${index + 1}: ${Stopwatch.formatTime(lap)} (split: ${Stopwatch.formatTime(splitTime)})`);
          });
        }
        break;
      }

      case 'elapsed': {
        const elapsed = stopwatch.elapsedMs();
        console.log(`⏰ Elapsed: ${Stopwatch.formatTime(elapsed)}`);
        break;
      }

      case 'help':
        printHelp();
        break;

      default:
        console.error(`❌ Unknown command: ${command}`);
        console.error('Run "stopwatch help" for usage information');
        process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Prints help information
 */
function printHelp() {
  console.log(`
⏱️  Stopwatch CLI

Usage: npm run stopwatch <command>
   or: node src/stopwatch/cli.js <command>

Commands:
  start     Start the stopwatch
  lap       Record a lap time
  stop      Stop the stopwatch and display results
  elapsed   Show current elapsed time
  help      Show this help message

Examples:
  npm run stopwatch start
  npm run stopwatch lap
  npm run stopwatch stop
`);
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('❌ No command provided');
  printHelp();
  process.exit(1);
}

const command = args[0];
executeCommand(command);

module.exports = { executeCommand };

