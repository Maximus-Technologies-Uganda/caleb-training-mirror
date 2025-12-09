# Maximus 2.0

A project containing CLI tools and utilities with comprehensive documentation and testing.

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

## 🤝 Questions?

If you're unsure about:
- **What to document**: Document anything that took more than 5 minutes to figure out
- **How detailed**: Enough that you could recreate your steps in 6 months
- **What screenshots**: Any visual proof of success (CI, tests, features)

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
