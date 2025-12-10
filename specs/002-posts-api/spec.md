# Feature Specification: Blog Posts REST API

**Feature Branch**: `002-posts-api`  
**Created**: 2025-12-10  
**Status**: Draft  
**Input**: User description: "Create a spec.md for a Blog Posts REST API. This is Chapter 5 of my backend training — building a production-shaped REST API with spec-driven development. A simple CRUD API for managing blog posts with health check, create, list, get by ID, update, and delete endpoints. Data model includes id (uuid), title (1-200 chars), body (1-10000 chars), slug (derived from title), createdAt, updatedAt. Requirements include validation (400 errors), rate limiting (100 req/15 min per IP, 429 errors), consistent error shape, and slug collision handling with numeric suffix."

## Problem Statement

Backend developers need practical experience building production-ready REST APIs that follow industry best practices for validation, error handling, and rate limiting. This feature provides a learning platform for understanding how to design and implement a robust CRUD API with proper constraints and error management.

The system must provide a simple blog post management API that demonstrates:
- RESTful endpoint design
- Input validation with descriptive error messages
- Rate limiting to prevent abuse
- Consistent error response formatting
- Automatic slug generation with collision handling

## User Scenarios & Testing

### User Story 1 - Health Check Monitoring (Priority: P1)

Operations teams need to verify the API service is running and responsive before allowing traffic to reach it.

**Why this priority**: Health checks are critical infrastructure that must be implemented first to enable monitoring, load balancing, and deployment automation. Without this, the service cannot be deployed safely.

**Independent Test**: Can be fully tested by sending a GET request to /health and verifying it returns a 200 status with `{"status": "ok"}`. Delivers immediate operational visibility.

**Acceptance Scenarios**:

1. **Given** the API service is running, **When** a GET request is sent to /health, **Then** the response is 200 OK with body `{"status": "ok"}`
2. **Given** the API service is under load, **When** a GET request is sent to /health, **Then** the health check responds immediately without queuing

---

### User Story 2 - Create and Publish Blog Posts (Priority: P1)

Content creators need to publish new blog posts with a title and body, receiving a unique identifier and URL-friendly slug for sharing.

**Why this priority**: Creating content is the core value proposition of a blog API. Without the ability to create posts, no other functionality has value. This is the minimal viable product.

**Independent Test**: Can be fully tested by posting valid data to /posts endpoint and verifying the response includes generated id, slug, and timestamps. Delivers immediate content creation capability.

**Acceptance Scenarios**:

1. **Given** a valid post with title "My First Post" and body content, **When** POST /posts is called, **Then** a 201 response is returned with the created post including id (uuid), slug "my-first-post", title, body, createdAt, and updatedAt
2. **Given** a post with title "Hello World!", **When** POST /posts is called, **Then** the slug is generated as "hello-world" (lowercase, hyphens replace spaces, special chars removed)
3. **Given** a post with invalid data (missing title), **When** POST /posts is called, **Then** a 400 error is returned with error details specifying "title is required"
4. **Given** a post with title exceeding 200 characters, **When** POST /posts is called, **Then** a 400 error is returned with details specifying "title must be 1-200 characters"
5. **Given** a post with body exceeding 10000 characters, **When** POST /posts is called, **Then** a 400 error is returned with details specifying "body must be 1-10000 characters"

---

### User Story 3 - Handle Duplicate Slugs Automatically (Priority: P2)

Content creators can publish posts with identical titles without manual intervention, as the system automatically generates unique slugs by appending numeric suffixes.

**Why this priority**: This prevents user frustration and data conflicts when similar titles are used. It's a quality-of-life feature that makes the API more robust but isn't required for basic functionality.

**Independent Test**: Can be fully tested by creating multiple posts with the same title and verifying each receives a unique slug (e.g., "my-post", "my-post-2", "my-post-3").

**Acceptance Scenarios**:

1. **Given** a post exists with slug "my-post", **When** a new post is created with the same title, **Then** the new post receives slug "my-post-2"
2. **Given** posts exist with slugs "my-post", "my-post-2", and "my-post-3", **When** a new post is created with the same title, **Then** the new post receives slug "my-post-4"
3. **Given** posts exist with slugs "my-post" and "my-post-3", **When** a new post is created with the same title, **Then** the new post receives slug "my-post-4" (finds the highest number and increments)

---

### User Story 4 - Browse All Published Posts (Priority: P2)

Readers and content managers need to view all published blog posts in the system to browse available content.

**Why this priority**: Listing posts is essential for content discovery but secondary to creation. A blog with posts but no list view still has value for direct URL access.

**Independent Test**: Can be fully tested by creating several posts, then calling GET /posts and verifying all posts are returned in the response array.

**Acceptance Scenarios**:

1. **Given** multiple posts exist in the system, **When** GET /posts is called, **Then** a 200 response returns an array containing all posts with their full details
2. **Given** no posts exist in the system, **When** GET /posts is called, **Then** a 200 response returns an empty array `[]`

---

### User Story 5 - View Individual Post Details (Priority: P2)

Readers need to retrieve a specific blog post by its unique identifier to view its full content.

**Why this priority**: Individual post retrieval is important for direct access and sharing but secondary to creation and listing. Posts can still be found via the list endpoint if needed.

**Independent Test**: Can be fully tested by creating a post, extracting its id, then calling GET /posts/{id} and verifying the correct post is returned.

**Acceptance Scenarios**:

1. **Given** a post exists with id "123e4567-e89b-12d3-a456-426614174000", **When** GET /posts/123e4567-e89b-12d3-a456-426614174000 is called, **Then** a 200 response returns the post with all its details
2. **Given** no post exists with id "00000000-0000-0000-0000-000000000000", **When** GET /posts/00000000-0000-0000-0000-000000000000 is called, **Then** a 404 error is returned with message "Post not found"
3. **Given** an invalid id format "abc123", **When** GET /posts/abc123 is called, **Then** a 400 error is returned with message "Invalid post ID format"

---

### User Story 6 - Update Existing Posts (Priority: P3)

Content creators need to edit and update their published blog posts to fix errors or add new information.

**Why this priority**: Updates are valuable for maintaining content quality but not required for initial functionality. New posts can be created instead if updates aren't available.

**Independent Test**: Can be fully tested by creating a post, then calling PATCH /posts/{id} with updated data and verifying the changes are persisted and updatedAt timestamp changes.

**Acceptance Scenarios**:

1. **Given** a post exists, **When** PATCH /posts/{id} is called with updated title and/or body, **Then** a 200 response returns the updated post with new updatedAt timestamp
2. **Given** a post exists, **When** PATCH /posts/{id} is called with an updated title, **Then** the slug is regenerated based on the new title
3. **Given** a post exists, **When** PATCH /posts/{id} is called with invalid data (title too long), **Then** a 400 error is returned with validation details
4. **Given** no post exists with the specified id, **When** PATCH /posts/{id} is called, **Then** a 404 error is returned

---

### User Story 7 - Remove Unwanted Posts (Priority: P3)

Content managers need to delete blog posts that are no longer relevant or were created in error.

**Why this priority**: Deletion is important for data management but least critical for initial functionality. Posts that need removal can simply be ignored if deletion isn't available yet.

**Independent Test**: Can be fully tested by creating a post, calling DELETE /posts/{id}, then verifying the post no longer appears in the list and cannot be retrieved.

**Acceptance Scenarios**:

1. **Given** a post exists with id "123e4567-e89b-12d3-a456-426614174000", **When** DELETE /posts/123e4567-e89b-12d3-a456-426614174000 is called, **Then** a 204 No Content response is returned and the post is removed
2. **Given** no post exists with the specified id, **When** DELETE /posts/{id} is called, **Then** a 404 error is returned
3. **Given** a post was deleted, **When** GET /posts/{id} is called with the deleted post's id, **Then** a 404 error is returned

---

### User Story 8 - Rate Limiting Protection (Priority: P1)

The API must protect itself from abuse by limiting each IP address to 100 requests per 15-minute window, returning clear retry guidance when limits are exceeded.

**Why this priority**: Rate limiting is critical infrastructure that must be implemented early to prevent abuse in production. Without it, the service is vulnerable to denial-of-service attacks.

**Independent Test**: Can be fully tested by sending 101 requests from the same IP within 15 minutes and verifying the 101st request returns a 429 error with Retry-After header.

**Acceptance Scenarios**:

1. **Given** an IP has made 99 requests in the current 15-minute window, **When** the 100th request is made, **Then** a successful response is returned
2. **Given** an IP has made 100 requests in the current 15-minute window, **When** the 101st request is made, **Then** a 429 Too Many Requests error is returned with Retry-After header indicating seconds until limit resets
3. **Given** an IP exceeded the rate limit, **When** 15 minutes pass and a new request is made, **Then** the request succeeds and the rate limit counter resets
4. **Given** multiple IPs are making requests, **When** each IP stays within their limit, **Then** all requests succeed (rate limits are per-IP, not global)

---

### Edge Cases

- What happens when a post title contains only special characters (e.g., "!@#$%")? System should generate a fallback slug or return a validation error indicating title must contain at least one alphanumeric character.
- What happens when a post title is only whitespace? System should return a 400 validation error indicating title cannot be empty or whitespace-only.
- What happens when the same IP makes requests exactly at the rate limit boundary (e.g., request #100 and #101 arrive simultaneously)? System must handle race conditions correctly to prevent exceeding the limit.
- What happens when a PATCH request includes fields that shouldn't be modified (e.g., id, createdAt)? System should ignore read-only fields and only update allowed fields (title, body).
- What happens when slug generation results in an extremely long slug (from a 200-char title)? System should truncate slugs to a reasonable length (e.g., 100 characters) while maintaining uniqueness.
- What happens when a DELETE request is made for an already-deleted post? System should return 404 (idempotent behavior - the resource doesn't exist).
- What happens when the request body is malformed JSON? System should return 400 with error message "Invalid JSON in request body".

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide a GET /health endpoint that returns `{"status": "ok"}` with 200 status code
- **FR-002**: System MUST provide a POST /posts endpoint that creates a new blog post with title and body
- **FR-003**: System MUST provide a GET /posts endpoint that returns an array of all blog posts
- **FR-004**: System MUST provide a GET /posts/{id} endpoint that returns a single post by its unique identifier
- **FR-005**: System MUST provide a PATCH /posts/{id} endpoint that updates an existing post's title and/or body
- **FR-006**: System MUST provide a DELETE /posts/{id} endpoint that removes a post from the system
- **FR-007**: System MUST generate a unique UUID for each created post
- **FR-008**: System MUST automatically generate a URL-friendly slug from the post title (lowercase, hyphenated, special characters removed)
- **FR-009**: System MUST handle slug collisions by appending a numeric suffix (e.g., "my-post-2", "my-post-3")
- **FR-010**: System MUST record createdAt timestamp when a post is created
- **FR-011**: System MUST record updatedAt timestamp when a post is created or modified
- **FR-012**: System MUST validate that post title is between 1 and 200 characters
- **FR-013**: System MUST validate that post body is between 1 and 10000 characters
- **FR-014**: System MUST return 400 Bad Request with detailed error information when validation fails
- **FR-015**: System MUST implement rate limiting of 100 requests per 15-minute window per IP address
- **FR-016**: System MUST return 429 Too Many Requests when rate limit is exceeded
- **FR-017**: System MUST include Retry-After header in 429 responses indicating seconds until limit resets
- **FR-018**: System MUST return errors in consistent shape: `{ error: { code, message, details[] } }`
- **FR-019**: System MUST return 404 Not Found when a requested post ID does not exist
- **FR-020**: System MUST return 201 Created for successful POST /posts requests
- **FR-021**: System MUST return 200 OK for successful GET, PATCH requests
- **FR-022**: System MUST return 204 No Content for successful DELETE requests
- **FR-023**: System MUST regenerate slug when post title is updated via PATCH

### Key Entities

- **Post**: Represents a blog post with unique identifier (UUID), human-readable title, content body, URL-friendly slug for sharing, creation timestamp, and last modification timestamp
  - **Relationships**: Posts are independent entities with no relationships to other entities in this phase
  - **Key Attributes**: 
    - id: Unique identifier (UUID format)
    - title: Required text between 1-200 characters
    - body: Required text between 1-10000 characters
    - slug: Auto-generated URL-friendly string derived from title, guaranteed unique through numeric suffixes
    - createdAt: ISO 8601 timestamp of creation
    - updatedAt: ISO 8601 timestamp of last modification

## Success Criteria

### Measurable Outcomes

- **SC-001**: API responds to health checks in under 100 milliseconds under normal load
- **SC-002**: Users can successfully create a blog post and receive a unique identifier in under 1 second
- **SC-003**: Users can retrieve an individual post by ID in under 500 milliseconds
- **SC-004**: Users can list all posts in under 1 second (for collections under 1000 posts)
- **SC-005**: System successfully handles 100 requests from the same IP in 15 minutes without errors
- **SC-006**: System blocks the 101st request from the same IP within 15 minutes with appropriate 429 response
- **SC-007**: All validation errors return descriptive messages that clearly indicate what field failed and why
- **SC-008**: Slug collisions are resolved automatically 100% of the time without user intervention
- **SC-009**: The API handles 100 concurrent requests without response time degradation beyond 2x baseline
- **SC-010**: All error responses follow the consistent error shape format 100% of the time

## API Endpoints

| Method | Endpoint | Purpose | Success Response | Error Responses |
|--------|----------|---------|------------------|-----------------|
| GET | /health | Health check for monitoring and load balancing | 200 OK: `{"status": "ok"}` | N/A |
| POST | /posts | Create a new blog post | 201 Created: Post object with id, title, body, slug, createdAt, updatedAt | 400: Validation error<br>429: Rate limit exceeded |
| GET | /posts | Retrieve all blog posts | 200 OK: Array of post objects | 429: Rate limit exceeded |
| GET | /posts/{id} | Retrieve a single post by ID | 200 OK: Post object | 400: Invalid ID format<br>404: Post not found<br>429: Rate limit exceeded |
| PATCH | /posts/{id} | Update an existing post | 200 OK: Updated post object | 400: Validation error<br>404: Post not found<br>429: Rate limit exceeded |
| DELETE | /posts/{id} | Delete a post | 204 No Content | 404: Post not found<br>429: Rate limit exceeded |

## Data Model

### Post Entity

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "My First Blog Post",
  "body": "This is the content of my blog post...",
  "slug": "my-first-blog-post",
  "createdAt": "2025-12-10T14:30:00.000Z",
  "updatedAt": "2025-12-10T14:30:00.000Z"
}
```

**Field Specifications**:
- **id**: UUID v4 format, generated by system, immutable
- **title**: String, 1-200 characters, required, mutable
- **body**: String, 1-10000 characters, required, mutable
- **slug**: String, derived from title, auto-generated, guaranteed unique via numeric suffixes, regenerated on title updates
- **createdAt**: ISO 8601 timestamp, generated by system, immutable
- **updatedAt**: ISO 8601 timestamp, generated by system, automatically updated on modifications

## Error Response Shape

All error responses must follow this consistent structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "title",
        "issue": "Title must be between 1 and 200 characters"
      }
    ]
  }
}
```

### Error Codes

- **VALIDATION_ERROR** (400): Input validation failed
- **NOT_FOUND** (404): Requested resource does not exist
- **RATE_LIMIT_EXCEEDED** (429): Too many requests from this IP
- **INVALID_JSON** (400): Request body contains malformed JSON
- **INVALID_ID_FORMAT** (400): Provided ID is not a valid UUID

### Error Response Examples

**Validation Error (400)**:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "title",
        "issue": "Title must be between 1 and 200 characters"
      },
      {
        "field": "body",
        "issue": "Body is required"
      }
    ]
  }
}
```

**Not Found (404)**:
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Post not found",
    "details": []
  }
}
```

**Rate Limit Exceeded (429)**:
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": []
  }
}
```
*Note: 429 responses must also include `Retry-After` header with seconds until reset*

## Non-Goals

The following are explicitly **out of scope** for this feature:

- **Authentication and Authorization**: No user accounts, login, or permission systems
- **Multi-tenancy**: All posts are stored in a single shared space
- **Cloud Deployment**: Local development environment only, no production hosting
- **File Uploads**: Posts support text only, no images or attachments
- **Comments**: No commenting system or user interactions
- **Pagination**: GET /posts returns all posts without pagination controls
- **Search and Filtering**: No search functionality or query parameters for filtering posts
- **Categories or Tags**: Posts have no classification or taxonomy system
- **Rich Text Formatting**: Body content is plain text, no markdown or HTML support
- **Soft Deletes**: Deleted posts are permanently removed, no recovery mechanism
- **Audit Logging**: No tracking of who created/modified posts or when (beyond createdAt/updatedAt)
- **Draft Mode**: All created posts are immediately "published", no draft state

## Assumptions

- API will be accessed by trusted developers in a learning environment, not production users
- Rate limiting by IP address is sufficient (no need for authenticated user rate limits)
- Slug uniqueness can be guaranteed within a single system instance (no distributed coordination required)
- English character set is sufficient for slug generation (no internationalization requirements)
- 10000 character limit for post body is sufficient for typical blog post length
- Synchronous request/response pattern is acceptable (no async/queue requirements)
- JSON is the only supported content type for requests and responses
- System clock is reliable for timestamp generation

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Slug collision detection fails under high concurrency | High - duplicate slugs break uniqueness guarantee | Medium | Implement atomic operations for slug generation and validation; test with concurrent requests |
| Rate limiting is bypassed by IP spoofing or rotating IPs | Medium - API becomes vulnerable to abuse | Medium | Document that IP-based rate limiting is a learning exercise; note that production systems should use additional strategies (API keys, authentication) |
| Large request bodies cause memory issues | Medium - service crashes or slows down | Low | Enforce maximum request body size at HTTP server level (e.g., 1MB limit) before reaching validation logic |
| UUID generation collisions | High - duplicate IDs corrupt data | Very Low | Use industry-standard UUID v4 library with cryptographically strong random number generator |
| Time zone inconsistencies in timestamps | Low - confusing timestamps | Low | Store all timestamps in UTC (ISO 8601 format), document this requirement |
| Malicious input in title/body (XSS, SQL injection) | High - if displayed in web UI without escaping | Low (no UI in scope) | Document that output encoding is responsibility of consuming applications; API stores and returns data as-is |

## Acceptance Evidence

The feature is considered complete when all of the following evidence can be demonstrated:

1. **Health Check Verification**:
   - Screenshot or log showing `curl http://localhost:PORT/health` returning `{"status": "ok"}` with 200 status

2. **Post Creation**:
   - Screenshot or log showing successful POST /posts with valid data returning 201 with complete post object including generated UUID and slug
   - Screenshot or log showing POST /posts with invalid data (missing title) returning 400 with error details

3. **Slug Generation**:
   - Screenshot or log showing post created with title "Hello World!" generates slug "hello-world"
   - Screenshot or log showing second post with same title generates slug "hello-world-2"

4. **Post Retrieval**:
   - Screenshot or log showing GET /posts returning array of all created posts
   - Screenshot or log showing GET /posts/{valid-id} returning single post
   - Screenshot or log showing GET /posts/{invalid-id} returning 404 error

5. **Post Update**:
   - Screenshot or log showing PATCH /posts/{id} with updated title successfully modifies post and regenerates slug
   - Screenshot or log showing updatedAt timestamp changes after update

6. **Post Deletion**:
   - Screenshot or log showing DELETE /posts/{id} returning 204
   - Screenshot or log showing subsequent GET /posts/{id} returning 404

7. **Rate Limiting**:
   - Screenshot or automated test output showing 100 requests from same IP succeed
   - Screenshot or automated test output showing 101st request returns 429 with Retry-After header
   - Log showing rate limit resets after 15 minutes

8. **Error Consistency**:
   - Screenshots demonstrating all error types (400, 404, 429) follow the defined error shape with code, message, and details

9. **Automated Test Suite**:
   - Test results showing all acceptance scenarios from User Stories pass
   - Test coverage report showing validation, rate limiting, and CRUD operations are tested

## Rollback Plan

Since this is a learning project without production users or data, the rollback strategy is straightforward:

1. **Immediate Rollback**: Switch back to previous branch or commit
   - Command: `git checkout <previous-branch>` or `git revert <commit-hash>`
   - Impact: Zero - no users or production data affected

2. **Data Loss**: Not applicable
   - All data exists in local development environment
   - No persistent storage requirements beyond local database/file system

3. **Rollback Triggers**:
   - Implementation fails to meet specification requirements
   - Mentor feedback requires significant architectural changes
   - Discovered requirements were misunderstood

4. **Testing Before Deploy**: 
   - Run full test suite before considering feature complete
   - Have mentor review working implementation via demo
   - Verify all acceptance evidence can be produced

5. **Communication**: 
   - Update mentor if rolling back to adjust approach
   - Document lessons learned for future iterations
