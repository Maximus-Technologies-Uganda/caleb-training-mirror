<!--
Sync Impact Report
==================
Version change: [NEW] → 1.0.0
Modified principles: N/A (initial constitution)
Added sections: All sections (initial creation)
Removed sections: N/A
Templates requiring updates:
  ✅ plan-template.md - reviewed, aligned with TDD principle
  ✅ spec-template.md - reviewed, aligned with Clean Architecture principle
  ✅ tasks-template.md - reviewed, aligned with Documentation principle
Follow-up TODOs: None
-->

# Maximus 2.0 Constitution

## Core Principles

### I. Test-Driven Development (TDD) — NON-NEGOTIABLE

**All code MUST be developed following strict Test-Driven Development:**

- Tests MUST be written before implementation code
- Implementation MUST NOT begin until tests are written and reviewed
- The Red-Green-Refactor cycle is mandatory:
  1. **Red**: Write failing tests that define expected behavior
  2. **Green**: Write minimal code to make tests pass
  3. **Refactor**: Improve code while keeping tests green
- Test suites MUST include:
  - Happy path scenarios (valid inputs, expected outputs)
  - Edge cases (boundary conditions, extreme values)
  - Error scenarios (invalid inputs, error handling)
  - Round-trip verification where applicable (e.g., conversions)
- All tests MUST pass before code review or merge
- Test coverage should be comprehensive, not just targeting percentage metrics

**Rationale**: TDD ensures code correctness from the start, clarifies requirements before implementation, naturally leads to better design, and provides confidence for refactoring. Every feature in Maximus (hello, stopwatch, temperature) has proven this approach produces higher quality, more maintainable code.

### II. Clean Architecture

**All modules MUST follow clean architecture principles with clear separation of concerns:**

- **Pure Core Modules**: Business logic MUST be implemented as pure functions or classes with:
  - Zero I/O dependencies (no console, file system, network, Date.now() unless injected)
  - No side effects beyond intended state changes
  - Deterministic behavior (same inputs → same outputs)
  - Fully testable in isolation without mocks
- **Thin Wrappers**: User interfaces (CLI, API, UI) MUST be thin layers that:
  - Delegate all business logic to core modules
  - Handle only I/O concerns (parsing arguments, formatting output)
  - Contain minimal logic (if-else for routing, not business rules)
- **Dependency Direction**: Dependencies MUST flow inward:
  - Core modules have zero external dependencies
  - Wrappers depend on core modules, never vice versa
  - Core modules export functions/classes, never execute directly

**Rationale**: Clean architecture makes code 100% testable, reusable across contexts (CLI, web, API), predictable, and easy to maintain. The stopwatch module demonstrates this perfectly: 88-line pure core with 20 tests, wrapped by a 106-line CLI.


**All code should be documented at multiple levels where possible:**

- **Code-Level Documentation**:
  - JSDoc comments for all public functions/methods
  - Inline comments for complex logic or non-obvious decisions
  - Type information in comments where beneficial
- **Feature Documentation**:
  - README.md in feature directory explaining purpose, API, usage
  - Usage examples for common scenarios
  - Error cases and their meanings
  - Architecture decisions and rationale
- **Process Documentation**:
  - Review packets for every pull request (see docs/journals/)
  - Daily journals tracking progress, learning, debugging
  - Decision logs capturing why specific approaches were chosen
- **Maintenance Documentation**:
  - Update README.md immediately after feature changes
  - Keep examples current with actual code behavior
  - Document breaking changes prominently

**Rationale**: Documentation is for your future self and teammates. Review packets capture learning and debugging process. Well-documented code is maintainable code. The stopwatch README (155 lines) demonstrates how comprehensive documentation serves as both user guide and developer reference.

## Development Workflow

### Pull Request Requirements

Every PR MUST include:

1. **Tests First**: Test suite written and reviewed before implementation
2. **All Tests Passing**: 100% of test suite green (npm test)
3. **Linting Clean**: Zero ESLint errors or warnings (npm run lint)
4. **CI Passing**: GitHub Actions checks all green
5. **Documentation Updated**: README.md, code comments, review packet
6. **Review Packet**: Documented in docs/journals/ with:
   - PR information and CI screenshot
   - Changes summary
   - Issues encountered and solutions
   - Testing checklist
   - What was learned

### Code Review Focus

Reviewers MUST verify:

- [ ] Tests were written before implementation (check git history)
- [ ] Core modules are pure (no I/O, no side effects)
- [ ] CLI follows standard conventions (proper flags, error handling, exit codes)
- [ ] No unnecessary external dependencies added
- [ ] Documentation is comprehensive and accurate
- [ ] Review packet is complete and honest

### Quality Gates

Code CANNOT merge until:

- All automated tests pass (CI green)
- Code review approved by at least one reviewer
- Documentation complete (README, review packet, code comments)
- No TODOs or placeholders remain (unless tracked as issues)

## Testing Standards

### Test Organization

- **One test file per module**: `tests/[module-name].test.js`
- **Use describe() blocks**: Group related tests logically
- **Clear test names**: Test descriptions should read as specifications
  - Good: "throws error when stopwatch not started"
  - Bad: "test error case"

### Test Coverage Requirements

Every module MUST test:

- **Happy paths**: Valid inputs produce expected outputs
- **Edge cases**: Boundary values, empty inputs, extreme values
  - Examples: 0ms, negative numbers, very large numbers, -40°C = -40°F
- **Error scenarios**: Invalid inputs throw appropriate errors
  - Examples: missing required arguments, wrong types, invalid ranges
- **State transitions**: For stateful modules (e.g., stopwatch)
  - Valid sequences: start → lap → stop
  - Invalid sequences: lap before start, stop before start, double start

### Test Quality

Tests MUST be:

- **Independent**: Each test runs in isolation, no shared state
- **Fast**: Pure function tests run in milliseconds
- **Deterministic**: Same test, same result, every time
- **Readable**: Anyone should understand what's being tested and why

## Versioning & Release

### Version Format

Use semantic versioning: **MAJOR.MINOR.PATCH**

- **MAJOR**: Breaking changes (API changes, removed features)
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, documentation, refactoring

### Breaking Changes

Before introducing breaking changes:

1. Document the change and rationale
2. Provide migration guide
3. Update all affected documentation
4. Consider deprecation period for major features

## Governance

### Constitution Authority

- This constitution supersedes all other practices and conventions
- All PRs and reviews MUST verify compliance with constitutional principles
- Non-compliance MUST be flagged in code review with specific principle cited

### Amendments

Constitutional changes require:

1. **Proposal**: Written proposal with rationale in GitHub issue
2. **Discussion**: Review by all active contributors
3. **Documentation**: Update to this document with version bump
4. **Migration**: Plan for bringing existing code into compliance
5. **Approval**: Consensus from maintainers


### Compliance

- All development MUST follow these principles
- Complexity MUST be justified and documented
- Simplicity is preferred: YAGNI (You Aren't Gonna Need It)
- When in doubt, refer to existing examples: hello, stopwatch, temperature modules

---

**Version**: 1.0.0 | **Ratified**: 2025-12-10 | **Last Amended**: 2025-12-10
