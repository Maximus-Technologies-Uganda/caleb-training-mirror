# Maximus 2.0

A project containing CLI tools and utilities with comprehensive documentation and testing. Built with Test-Driven Development (TDD) and clean architecture principles.

---

## 📋 Quick Start

### Available CLI Tools

| Tool | Command | Purpose | Tests |
|------|---------|---------|-------|
| **Hello** | `node src/hello/cli.js` | Greeting generator with optional shout mode | 4 tests |
| **Stopwatch** | `npm run stopwatch` | Timing tool with lap recording | 20 tests |
| **Temperature** | `npm run temp` | Celsius ⟷ Fahrenheit converter | 24 tests |

### Running All Tests

```bash
npm test          # Run all 49 tests
npm run lint      # Check code quality
```

### Test Coverage Summary

- ✅ **49 total tests** across 4 test suites
- ✅ **100% passing** - all tests green
- ✅ **Comprehensive coverage**: conversions, validations, error handling, edge cases

---

## 🛠️ CLI Tools

### Hello CLI

A simple greeting CLI tool that demonstrates proper argument parsing and testing.

#### Installation

No installation required. Just run with Node.js:

```bash
node src/hello/cli.js --name=<name> [--shout]
```

#### Usage Examples

**Basic greeting (lowercase):**
```bash
node src/hello/cli.js --name=Caleb
# Output: Hello, Caleb!
```

**Greeting with shouting (uppercase):**
```bash
node src/hello/cli.js --name=Caleb --shout
# Output: HELLO, Caleb!
```

**Alternative syntax (space-separated):**
```bash
node src/hello/cli.js --name Caleb --shout
# Output: HELLO, Caleb!
```

#### Error Cases

**Missing name (required argument):**
```bash
node src/hello/cli.js --shout
# Output:
# Error: --name is required
# Usage: node src/hello/cli.js --name=<name> [--shout]
# Exit code: 1
```

**No arguments:**
```bash
node src/hello/cli.js
# Output:
# Error: --name is required
# Usage: node src/hello/cli.js --name=<name> [--shout]
# Exit code: 1
```

#### API

The CLI wraps the `formatGreeting` function from `src/hello/index.js`:

```javascript
const { formatGreeting } = require('./src/hello/index.js');

// Returns: "Hello, Alice!"
formatGreeting('Alice', false);

// Returns: "HELLO, Bob!"
formatGreeting('Bob', true);
```

#### Running Tests

```bash
# Run all tests
npm test

# Run hello CLI tests only
npm test -- tests/hello.test.js
```

#### CLI Usage

```bash
# Show help
node src/hello/cli.js --help

# Basic usage
node src/hello/cli.js --name=YourName

# With shout flag
node src/hello/cli.js --name YourName --shout
```

---

### Stopwatch CLI

A feature-rich stopwatch module built with Test-Driven Development (TDD) and clean architecture principles.

#### Features

- ⏱️ Start, stop, and lap timing functionality
- 🎯 Pure core module with no I/O dependencies (fully testable)
- 📊 Formatted time output (HH:MM:SS.mmm)
- 🔒 Robust error handling and state management
- 📝 20 comprehensive tests
- 🎨 User-friendly CLI with emoji indicators

#### Installation

No installation required. Use the npm script:

```bash
npm run stopwatch <command>
```

Or run directly with Node.js:

```bash
node src/stopwatch/cli.js <command>
```

#### Usage Examples

**Display help:**
```bash
npm run stopwatch help
# Shows all available commands and usage
```

**Basic stopwatch flow:**
```bash
# Start the stopwatch
npm run stopwatch start
# Output: ⏱️  Stopwatch started!

# Record a lap time
npm run stopwatch lap
# Output: 🏁 Lap 1: 00:00:05.123

# Record another lap
npm run stopwatch lap
# Output: 🏁 Lap 2: 00:00:10.456

# Check current elapsed time
npm run stopwatch elapsed
# Output: ⏰ Elapsed: 00:00:12.789

# Stop the stopwatch
npm run stopwatch stop
# Output:
# 🛑 Stopwatch stopped!
# Final time: 00:00:15.789
# 
# Lap times:
#   Lap 1: 00:00:05.123 (split: 00:00:05.123)
#   Lap 2: 00:00:10.456 (split: 00:00:05.333)
```

#### Error Handling

The stopwatch validates all operations and provides clear error messages:

**Lap before start:**
```bash
npm run stopwatch lap
# Output: ❌ Error: Cannot lap: stopwatch not started
```

**Stop before start:**
```bash
npm run stopwatch stop
# Output: ❌ Error: Cannot stop: stopwatch not started
```

**Starting twice:**
```bash
npm run stopwatch start
npm run stopwatch start
# Output: ❌ Error: Stopwatch is already running
```

#### API (Programmatic Usage)

The CLI wraps the pure `Stopwatch` class from `src/stopwatch/index.js`:

```javascript
const Stopwatch = require('./src/stopwatch');

// Create a new stopwatch instance
const sw = new Stopwatch();

// Start timing
sw.start();

// ... wait some time ...

// Record a lap (returns elapsed milliseconds)
const lap1 = sw.lap();
console.log(`Lap 1: ${Stopwatch.formatTime(lap1)}`);

// Get current elapsed time
const current = sw.elapsedMs();

// Stop the stopwatch (returns final time in milliseconds)
const finalTime = sw.stop();
console.log(`Final: ${Stopwatch.formatTime(finalTime)}`);

// Access recorded laps
console.log(sw.laps); // Array of lap times in milliseconds
```

#### Available Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `start()` | Starts the stopwatch | `void` |
| `lap()` | Records a lap time | `number` (elapsed ms) |
| `stop()` | Stops the stopwatch | `number` (final ms) |
| `elapsedMs()` | Gets current elapsed time | `number` (ms) |
| `formatTime(ms)` | Formats milliseconds (static) | `string` (HH:MM:SS.mmm) |

#### Architecture

**Clean Architecture Pattern:**
- **Pure Core Module** (`src/stopwatch/index.js`): Business logic with zero I/O dependencies
- **Thin CLI Wrapper** (`src/stopwatch/cli.js`): Handles user interaction and output

**Benefits:**
- ✅ Core module is 100% testable in isolation
- ✅ Reusable in any context (CLI, web, API)
- ✅ Deterministic and predictable behavior
- ✅ Easy to maintain and extend

#### Running Tests

```bash
# Run all tests (includes 20 stopwatch tests)
npm test

# Run stopwatch tests only
npm test -- tests/stopwatch.test.js
```

**Test Coverage:**
- ✅ 7 tests for `formatTime()` formatting logic
- ✅ 7 tests for valid sequences (start → lap → stop)
- ✅ 6 tests for invalid sequences and error handling
- ✅ Total: 20 comprehensive tests, all passing

#### Additional Documentation

For detailed documentation including design decisions, state management, and implementation notes, see:
- [Stopwatch Module Documentation](src/stopwatch/README.md)
- [Review Packet: feat/stopwatch](docs/journals/review-packet-feat-stopwatch.md)

---

### Temperature Converter CLI

A pure function-based temperature converter with comprehensive validation and testing.

#### Features

- 🌡️ Celsius ⟷ Fahrenheit conversion
- ✨ Pure functions (no side effects)
- ✅ Comprehensive validation
- 📝 24 comprehensive tests
- 🎯 Clear error messages

#### Installation

No installation required. Use the npm script:

```bash
npm run temp -- --from <C|F> --to <C|F> <value>
```

Or run directly with Node.js:

```bash
node src/temperature/cli.js --from <C|F> --to <C|F> <value>
```

#### Usage Examples

**Display help:**
```bash
npm run temp -- --help
# Shows all available commands and usage
```

**Convert Celsius to Fahrenheit:**
```bash
npm run temp -- --from C --to F 0
# Output: 0°C = 32°F

npm run temp -- --from C --to F 25
# Output: 25°C = 77°F

npm run temp -- --from C --to F 100
# Output: 100°C = 212°F
```

**Convert Fahrenheit to Celsius:**
```bash
npm run temp -- --from F --to C 32
# Output: 32°F = 0°C

npm run temp -- --from F --to C 98.6
# Output: 98.6°F = 37°C

npm run temp -- --from F --to C 212
# Output: 212°F = 100°C
```

**Alternative syntax (= separator):**
```bash
npm run temp -- --from=C --to=F 37
# Output: 37°C = 98.6°F
```

**Decimal values:**
```bash
npm run temp -- --from C --to F 20.5
# Output: 20.5°C = 68.9°F
```

**Negative temperatures:**
```bash
npm run temp -- --from C --to F -40
# Output: -40°C = -40°F
```

#### Error Handling

The converter validates all inputs and provides clear error messages:

**Same unit conversion:**
```bash
npm run temp -- --from C --to C 25
# Output: ❌ Error: Cannot convert from C to C
```

**Invalid unit:**
```bash
npm run temp -- --from K --to F 0
# Output: ❌ Error: Invalid unit: K. Must be C or F
```

**Missing required argument:**
```bash
npm run temp -- --from C 25
# Output: ❌ Error: Missing required argument: --to
```

**Missing temperature value:**
```bash
npm run temp -- --from C --to F
# Output: ❌ Error: Missing temperature value
```

**Invalid temperature value:**
```bash
npm run temp -- --from C --to F abc
# Output: ❌ Error: Invalid temperature value: abc
```

#### API (Programmatic Usage)

The CLI wraps pure functions from `src/temperature/index.js`:

```javascript
const { cToF, fToC, validateOptions } = require('./src/temperature');

// Convert Celsius to Fahrenheit
const fahrenheit = cToF(25);
console.log(fahrenheit); // 77

// Convert Fahrenheit to Celsius
const celsius = fToC(77);
console.log(celsius); // 25

// Validate conversion options (throws on error)
try {
  validateOptions('C', 'F'); // OK
  validateOptions('C', 'C'); // Throws: Cannot convert from C to C
} catch (error) {
  console.error(error.message);
}
```

#### Available Functions

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `cToF(celsius)` | Converts Celsius to Fahrenheit | `number` | `number` |
| `fToC(fahrenheit)` | Converts Fahrenheit to Celsius | `number` | `number` |
| `validateOptions(from, to)` | Validates conversion options | `string, string` | `void` (throws on error) |

#### Conversion Formulas

**Celsius to Fahrenheit:**
```
F = (C × 9/5) + 32
```

**Fahrenheit to Celsius:**
```
C = (F - 32) × 5/9
```

#### Running Tests

```bash
# Run all tests (includes 24 temperature tests)
npm test

# Run temperature tests only
npm test -- tests/temperature.test.js
```

**Test Coverage:**
- ✅ 6 tests for Celsius to Fahrenheit conversion
- ✅ 6 tests for Fahrenheit to Celsius conversion
- ✅ 10 tests for validation (invalid units, same unit, etc.)
- ✅ 2 tests for round-trip conversions
- ✅ Total: 24 comprehensive tests, all passing

#### Key Test Cases

- **Freezing point**: 0°C = 32°F
- **Boiling point**: 100°C = 212°F
- **Body temperature**: 37°C = 98.6°F
- **Special point**: -40°C = -40°F (same in both scales)
- **Room temperature**: 25°C = 77°F
- **Decimal values**: Handles fractional temperatures
- **Round-trip**: C → F → C returns original value

---

## 📚 Documentation Guide

This directory contains project documentation, including review packets, journals, and workbooks for tracking development progress.

## 📁 Directory Structure

```
docs/
├── README.md                    # This file
├── review-packet-week1.md      # Weekly summary of all PRs
├── journals/                    # Daily logs and detailed PR reviews
│   ├── 2025-12-09.MD           # Daily journal entries
│   └── review-packet-*.md      # Individual PR review packets
└── workbooks/                   # Learning materials and exercises
```

---

## 📝 Review Packets

Review packets are detailed documentation of pull request reviews, including decisions made, issues encountered, and lessons learned.

### Purpose

- **Track Progress**: Document all changes and merges systematically
- **Knowledge Retention**: Capture what you learned during development
- **Quality Assurance**: Ensure thorough review of all changes
- **Training Documentation**: Provide evidence of work completed
- **Decision History**: Record why specific approaches were chosen

---

## 🚀 How to Use Review Packets

### Step 1: Create a Review Packet

When you create or merge a PR, create a new review packet:

```bash
# Name format: review-packet-[branch-name].md
docs/journals/review-packet-chore-bootstrap.md
```

### Step 2: Fill in Required Sections

#### Essential Information
- **PR Information**: Link, title, branches, status
- **CI Status**: Include CI checks link and screenshot
- **Changes Summary**: What was added/changed/removed
- **Testing Checklist**: What tests were run

#### Documentation
- **Issues & Solutions**: Problems encountered and how you solved them
- **Key Decisions**: Why you made specific implementation choices (optional)
- **What I Learned**: New skills, tools, or concepts learned (optional)

### Step 3: Update Master Tracking

Add a row to `review-packet-week1.md` with:
- PR number and link
- Brief summary
- CI status
- Key decisions and issues

---

## 📋 Review Packet Template Sections

### Required Sections

| Section | Description | When to Fill |
|---------|-------------|--------------|
| **PR Information** | Basic PR details and links | At PR creation |
| **CI Status** | Test results and screenshots | After CI completes |
| **Changes Summary** | What changed and why | Before/after merge |
| **Issues & Solutions** | Problems and fixes | As they occur |
| **Testing Checklist** | What was tested | After testing |
| **Review Checklist** | Final verification | Before merge |
| **Outcome** | Final status | After merge |

### Optional Sections

| Section | Description | When to Use |
|---------|-------------|-------------|
| **Key Decisions** | Important choices made | For complex PRs |
| **What I Learned** | New knowledge gained | For learning reflection |
| **Next Steps** | Follow-up tasks | If work continues |
| **Additional Notes** | Extra context | As needed |

---

## ✅ Best Practices

### Do's ✅

- **Be Specific**: Include actual error messages, command outputs, and specific file names
- **Document as You Go**: Don't wait until the end to fill out the review packet
- **Include Screenshots**: Visual evidence is powerful for CI runs and test results
- **Link Everything**: PRs, commits, CI runs, related issues
- **Be Honest**: Document what went wrong and how you fixed it
- **Reflect**: What would you do differently next time?

### Don'ts ❌

- **Don't Copy-Paste Generic Text**: Make it specific to YOUR work
- **Don't Skip Issues**: Document problems even if embarrassing
- **Don't Forget Screenshots**: CI status needs visual proof
- **Don't Leave Placeholders**: Fill in all [bracketed] sections or remove them
- **Don't Write Novels**: Be concise but complete

---

## 📸 Screenshots

### What to Capture

1. **CI Checks Passing** (Required)
   - Green checkmarks
   - All tests passed
   - Build successful

2. **Test Output** (Recommended)
   - Terminal output of `npm test`
   - Coverage reports
   - Linter results

3. **Before/After** (Optional)
   - UI changes
   - Performance improvements
   - Bug fixes

### How to Include Screenshots

1. Save screenshot to project root: `Screenshot YYYY-MM-DD at HH.MM.SS.png`
2. Reference in markdown: `![Description](../Screenshot%202025-12-09%20at%2014.22.02.png)`
3. Add caption: `*Brief description of what screenshot shows*`

---

## 🔄 Weekly Workflow

### Daily Tasks

1. ✅ Work on features/fixes
2. ✅ Create PR when ready
3. ✅ Fill out review packet as you work
4. ✅ Take CI screenshots
5. ✅ Merge PR
6. ✅ Complete review packet

### Weekly Tasks

1. ✅ Update `review-packet-week1.md` with all PRs
2. ✅ Fill in weekly statistics
3. ✅ Review "What I Learned" across all PRs
4. ✅ Set goals for next week
5. ✅ Self-assessment

---

## 📊 Example Review Packet

See `journals/review-packet-chore-bootstrap.md` for a complete example of:
- ✅ Proper PR documentation
- ✅ Issue tracking with ESLint misconfiguration
- ✅ CI screenshot integration
- ✅ Testing checklist
- ✅ Complete outcome summary

---

## 🎯 Quick Reference

### Creating New Review Packet

```bash
# Copy template (if you create one)
cp docs/journals/review-packet-template.md docs/journals/review-packet-[feature-name].md

# Or start from scratch with these sections:
# 1. PR Information (table with links)
# 2. CI Status (with screenshot)
# 3. Changes Summary
# 4. Issues & Solutions
# 5. Testing Checklist
# 6. Review Checklist
# 7. Outcome
```

### Filling Out While Working

```
1. Start review packet when creating PR
2. Add CI link when checks run
3. Document issues as they happen
4. Take screenshot when CI passes
5. Complete final sections after merge
6. Update weekly tracking document
```

---


---

## 📚 Additional Resources

- [PR Template](../.github/PULL_REQUEST_TEMPLATE.md)
- [CI/CD Workflows](../.github/workflows/)
- [Daily Journal Example](./journals/2025-12-09.MD)

---

**Remember**: Review packets are for YOUR benefit. They help you:
- Track your progress
- Remember what you learned
- Debug similar issues faster
- Demonstrate your work quality
- Build a portfolio of problem-solving

Make them useful for your future self! 🚀
