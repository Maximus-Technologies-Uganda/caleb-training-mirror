# Stopwatch Module

A pure, test-driven stopwatch implementation with a CLI interface.

## Architecture

The stopwatch module follows a clean architecture pattern:

- **Pure Core Module** (`index.js`): No direct I/O, fully testable
- **Thin CLI Wrapper** (`cli.js`): Handles user interaction and output

## Core API

### `Stopwatch` Class

#### Methods

- `start()` - Starts the stopwatch
  - Throws error if already running
  
- `lap()` - Records a lap time
  - Returns: elapsed time in milliseconds
  - Throws error if not started
  
- `stop()` - Stops the stopwatch
  - Returns: final elapsed time in milliseconds
  - Throws error if not started
  
- `elapsedMs()` - Gets current elapsed time
  - Returns: elapsed time in milliseconds
  - Returns 0 if not started
  
- `Stopwatch.formatTime(ms)` - Static method to format milliseconds
  - Returns: formatted string in `HH:MM:SS.mmm` format

### Usage Example

```javascript
const Stopwatch = require('./stopwatch');

const sw = new Stopwatch();

sw.start();
// ... wait some time ...
const lap1 = sw.lap();
console.log(`Lap 1: ${Stopwatch.formatTime(lap1)}`);

// ... wait some more ...
const finalTime = sw.stop();
console.log(`Final: ${Stopwatch.formatTime(finalTime)}`);
```

## CLI Usage

### Commands

```bash
# Using npm script
npm run stopwatch start    # Start the stopwatch
npm run stopwatch lap      # Record a lap
npm run stopwatch elapsed  # Show current elapsed time
npm run stopwatch stop     # Stop and show results
npm run stopwatch help     # Show help

# Or directly with node
node src/stopwatch/cli.js start
node src/stopwatch/cli.js lap
node src/stopwatch/cli.js stop
```

### Example Session

```bash
$ npm run stopwatch start
⏱️  Stopwatch started!

$ npm run stopwatch lap
🏁 Lap 1: 00:00:05.123

$ npm run stopwatch lap
🏁 Lap 2: 00:00:10.456

$ npm run stopwatch stop
🛑 Stopwatch stopped!
Final time: 00:00:15.789

Lap times:
  Lap 1: 00:00:05.123 (split: 00:00:05.123)
  Lap 2: 00:00:10.456 (split: 00:00:05.333)
```

## Testing

The module has comprehensive test coverage:

```bash
npm test -- stopwatch.test.js
```

### Test Coverage

- ✅ `formatTime()` formatting logic (7 tests)
- ✅ Valid sequences: start → lap → stop (7 tests)
- ✅ Invalid sequences and error handling (6 tests)
- ✅ Total: 20 passing tests

### Test Categories

1. **Format Time Tests**
   - Zero milliseconds
   - Milliseconds only
   - Seconds, minutes, hours
   - Large values and edge cases

2. **Valid Sequence Tests**
   - Starting stopwatch
   - Recording elapsed time
   - Multiple laps
   - Stopping and final time

3. **Invalid Sequence Tests**
   - Lap before start
   - Stop before start
   - Double start
   - Double stop
   - Lap after stop

## Design Decisions

### Pure Core Module
The core `Stopwatch` class has no I/O dependencies, making it:
- Easily testable
- Reusable in different contexts (CLI, web, etc.)
- Deterministic and predictable

### Error Handling
Invalid operations throw descriptive errors:
- Starting when already running
- Lap/stop when not started
- Operating after stopped

### Time Precision
Uses `Date.now()` for millisecond precision, suitable for general timing tasks.

### State Management
Simple boolean flag (`isRunning`) with clear state transitions:
- Not started → Running (via `start()`)
- Running → Stopped (via `stop()`)
- No restart without explicit new instance

## CLI Implementation Note

The CLI uses a global stopwatch instance, which means each command invocation operates independently. For interactive usage, consider implementing a persistent state mechanism or an interactive REPL mode.

