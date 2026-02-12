# Comprehensive Testing Plan for Article Publishing System

## Overview
This document outlines the comprehensive testing plan for the enhanced article publishing system with 38 critical test cases covering content preservation, draft management, version control, and system reliability.

---

## Test Environment Setup

### Prerequisites
1. Node.js and npm installed
2. Server running on port 3000 (or configured port)
3. Admin credentials configured
4. Database initialized with schema updates

### Test Data Preparation
- Create backup of database before testing
- Prepare test content with special characters, emojis, and complex HTML
- Have sample images and videos ready for embed testing

---

## A. Content Preservation Tests (CRITICAL - Test First)

### Test 1: Special Characters Test
**Objective:** Ensure special characters are preserved without corruption

**Test Steps:**
1. Login to admin dashboard
2. Create new article with title: "Special Characters Test"
3. Add content with special characters: `© ® ™ € £ ¥ § † ‡ • … ‰ ′ ″ ‹ › « » ' ' " " – —`
4. Save as draft (click "Save as Draft" button)
5. Verify no character loss in database
6. Edit draft and verify characters display correctly
7. Publish article
8. View published HTML file
9. Edit published article and verify characters remain intact

**Expected Results:**
- [ ] All special characters preserved in draft
- [ ] Characters display correctly in editor when reopening
- [ ] Published HTML shows characters correctly
- [ ] No HTML entity corruption

**Status:** ⏳ Pending

---

### Test 2: Emoji Test
**Objective:** Verify emoji support throughout the publishing workflow

**Test Steps:**
1. Create article with title: "Emoji Test"
2. Add emojis: `🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🙈 🙉 🙊`
3. Save, publish, and edit
4. View in different browsers

**Expected Results:**
- [ ] Emojis preserved in database
- [ ] Emojis display correctly in editor
- [ ] Published article shows emojis properly
- [ ] No corruption during edit operations

**Status:** ⏳ Pending

---

### Test 3: Code Block Test
**Objective:** Ensure code blocks with syntax highlighting work correctly

**Test Steps:**
1. Create article titled "Code Block Test"
2. Add JavaScript code block:
   ```javascript
   function test() {
     const x = "hello's world";
     return `<div>${x}</div>`;
   }
   ```
3. Add Python code with special chars
4. Add HTML code with nested tags
5. Publish and verify

**Expected Results:**
- [ ] Code blocks preserved without escaping
- [ ] Syntax highlighting works
- [ ] Special characters in code preserved
- [ ] Code is displayed, not executed
- [ ] Indentation maintained

**Status:** ⏳ Pending

---

### Test 4: Large Content Test
**Objective:** Test performance and content preservation with large articles

**Test Steps:**
1. Create article with 10,000+ words
2. Include 20+ images
3. Include 10+ code blocks
4. Include 5+ tables
5. Save as draft
6. Publish
7. Edit published article
8. Measure operation times

**Expected Results:**
- [ ] Draft save completes in < 5 seconds
- [ ] Publish completes in < 10 seconds
- [ ] No content loss
- [ ] All elements preserved
- [ ] Editor loads in < 3 seconds

**Status:** ⏳ Pending

---

### Test 5: HTML Table Test
**Objective:** Verify complex table structures are preserved

**Test Steps:**
1. Create article with complex table:
   - Merged cells
   - Nested formatting (bold, italic, links)
   - Special characters in cells
2. Save, publish, edit

**Expected Results:**
- [ ] Table structure preserved
- [ ] Merged cells work correctly
- [ ] Nested formatting intact
- [ ] Special characters in cells preserved

**Status:** ⏳ Pending

---

### Test 6: Video Embed Test
**Objective:** Ensure video iframes are preserved and not stripped

**Test Steps:**
1. Create article with YouTube embed:
   ```html
   <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
   ```
2. Add Vimeo embed
3. Save, publish, edit

**Expected Results:**
- [ ] Iframes preserved in draft
- [ ] Iframes preserved in published article
- [ ] Videos display correctly in browser
- [ ] Embed attributes maintained

**Status:** ⏳ Pending

---

### Test 7: Mixed Content Test
**Objective:** Test all content types together in one article

**Test Steps:**
1. Create article with:
   - Special characters
   - Emojis
   - Code blocks (3+ languages)
   - Tables (2+ complex tables)
   - Images (5+)
   - Video embeds (2+)
2. Save as draft
3. Preview draft
4. Publish
5. Edit published article

**Expected Results:**
- [ ] ZERO content loss at any step
- [ ] All formatting preserved
- [ ] Preview matches final output
- [ ] Edit loads without errors

**Status:** ⏳ Pending

---

## B. Draft System Tests (CRITICAL)

### Test 8: Auto-Save Test
**Objective:** Verify automatic draft saving works correctly

**Test Steps:**
1. Create new article as draft
2. Type content
3. Wait 30 seconds without manual save
4. Verify auto-save indicator appears: "Draft saved at [time]"
5. Refresh page
6. Verify content restored
7. Check database: published=0
8. Verify no HTML file generated

**Expected Results:**
- [ ] Auto-save triggers after 30 seconds
- [ ] Indicator shows "Saving..." then "Draft saved at [time]"
- [ ] Content restored after refresh
- [ ] Database shows published=0
- [ ] No HTML file in articles/ folder

**Status:** ⏳ Pending

---

### Test 9: Rapid Edit Auto-Save Test
**Objective:** Test auto-save under continuous editing

**Test Steps:**
1. Create draft
2. Type continuously for 2 minutes
3. Observe auto-save triggers
4. Check for race conditions

**Expected Results:**
- [ ] Auto-save triggers every 30 seconds
- [ ] No content loss during typing
- [ ] No race conditions (multiple simultaneous saves)
- [ ] Final content matches last edit

**Status:** ⏳ Pending

---

### Test 10: Draft Preview Test
**Objective:** Verify draft preview works without publishing

**Test Steps:**
1. Create draft with full formatting
2. Click "Preview Draft" button
3. Verify preview modal opens
4. Check database: published still = 0
5. Check filesystem: no HTML file created
6. Verify preview shows exact formatting

**Expected Results:**
- [ ] Preview opens without publishing
- [ ] Database remains published=0
- [ ] No HTML file generated
- [ ] Preview shows all formatting correctly

**Status:** ⏳ Pending

---

### Test 11: Draft to Published Workflow Test
**Objective:** Test complete draft-to-publish workflow

**Test Steps:**
1. Create draft article
2. Verify database: published=0
3. Click "Publish" button
4. Verify:
   - Database updated to published=1
   - HTML file generated in articles/ folder
   - Sitemap.xml updated
   - Success message displayed
   - Permalink shown

**Expected Results:**
- [ ] Database updated correctly
- [ ] HTML file exists and is correct
- [ ] Sitemap contains new article
- [ ] Success message appears
- [ ] Permalink displayed and valid

**Status:** ⏳ Pending

---

### Test 12: Multiple Drafts Test
**Objective:** Test handling of multiple draft articles

**Test Steps:**
1. Create 5 draft articles without publishing
2. Verify dashboard shows draft count
3. Filter by "Drafts"
4. Verify all 5 shown
5. Edit each draft
6. Verify auto-save works for each
7. Publish one draft
8. Verify draft count decrements

**Expected Results:**
- [ ] Dashboard shows correct draft count
- [ ] Filter shows all drafts
- [ ] Auto-save works independently for each
- [ ] Publishing one doesn't affect others
- [ ] Count updates correctly

**Status:** ⏳ Pending

---

## C. Version History Tests

### Test 13: Version Creation Test
**Objective:** Verify version history is created on publish

**Test Steps:**
1. Create and publish article with content "Version 1"
2. Edit to "Version 2", publish
3. Edit to "Version 3", publish
4. Check database: article_versions table
5. Verify 3 entries exist

**Expected Results:**
- [ ] Version 1 saved in database
- [ ] Version 2 saved in database
- [ ] Version 3 saved in database
- [ ] Each version completely stored

**Status:** ⏳ Pending

---

### Test 14: Version Retrieval Test
**Objective:** Test version history UI

**Test Steps:**
1. Open published article with multiple versions
2. Click "View History" button
3. Verify list shows: v3, v2, v1 with timestamps
4. Preview each version

**Expected Results:**
- [ ] All versions listed correctly
- [ ] Timestamps accurate
- [ ] Most recent version marked as current
- [ ] Preview shows correct content for each

**Status:** ⏳ Pending

---

### Test 15: Version Restore Test
**Objective:** Verify version restoration works correctly

**Test Steps:**
1. Select an older version (v1)
2. Click "Restore This Version"
3. Confirm restoration
4. Verify:
   - Content changed to v1
   - HTML file regenerated
   - Sitemap updated
   - New version created (v4 = copy of v1)

**Expected Results:**
- [ ] Content restored to selected version
- [ ] HTML regenerated correctly
- [ ] New version entry created
- [ ] No data loss

**Status:** ⏳ Pending

---

### Test 16: Version Limit Test
**Objective:** Ensure only last 5 versions are stored

**Test Steps:**
1. Create article
2. Publish 10 updates
3. Check database version count
4. Verify only 5 most recent stored
5. Verify oldest versions deleted

**Expected Results:**
- [ ] Only 5 versions in database
- [ ] Most recent 5 versions kept
- [ ] Oldest versions automatically deleted
- [ ] No orphaned data

**Status:** ⏳ Pending

---

## D. Publishing Workflow Tests

### Test 17: Successful Publish Test
**Objective:** Verify complete publish sequence

**Test Steps:**
1. Create article
2. Click "Publish"
3. Observe sequence:
   - Content validation
   - Database update (published=1)
   - HTML file creation
   - Sitemap update
   - Google notification
   - Success message

**Expected Results:**
- [ ] All steps complete successfully
- [ ] Validation passes
- [ ] Database updated
- [ ] HTML file created
- [ ] Sitemap updated
- [ ] Success message shown

**Status:** ⏳ Pending

---

### Test 18: Rollback on HTML Generation Failure Test
**Objective:** Test rollback when HTML generation fails

**Test Steps:**
1. Make articles/ directory read-only: `chmod 444 articles/`
2. Try to publish article
3. Verify:
   - Error caught
   - Database NOT updated (published=0)
   - Error message shown to user
   - Draft preserved

**Expected Results:**
- [ ] Error detected
- [ ] Database not modified
- [ ] Error message clear
- [ ] Draft data preserved
- [ ] User can retry after fix

**Status:** ⏳ Pending

---

### Test 19: Rollback on Sitemap Update Failure Test
**Objective:** Test rollback when sitemap update fails

**Test Steps:**
1. Mock sitemap write failure
2. Try to publish article
3. Verify rollback: HTML deleted, DB reverted

**Expected Results:**
- [ ] Rollback triggered
- [ ] HTML file removed
- [ ] Database reverted
- [ ] Article remains as draft

**Status:** ⏳ Pending

---

### Test 20: Content Validation Test
**Objective:** Test content validation before publish

**Test Cases:**
1. Empty title → REJECT
2. Empty content → REJECT
3. XSS attempt (`<script>alert('XSS')</script>`) → SANITIZE
4. Malformed HTML → FIX or REJECT

**Expected Results:**
- [ ] Empty title rejected with clear error
- [ ] Empty content rejected with clear error
- [ ] Script tags removed/sanitized
- [ ] Malformed HTML detected
- [ ] User receives actionable feedback

**Status:** ⏳ Pending

---

## E. Error Handling Tests

### Test 21: Database Corruption Test
**Objective:** Handle database errors gracefully

**Test Steps:**
1. Stop server
2. Corrupt database.db file
3. Restart server
4. Try to load articles

**Expected Results:**
- [ ] Graceful error message (not crash)
- [ ] Recovery instructions shown
- [ ] Server doesn't crash
- [ ] Other features still accessible

**Status:** ⏳ Pending

---

### Test 22: Missing HTML File Test
**Objective:** Detect and fix missing HTML files

**Test Steps:**
1. Delete HTML file for published article
2. Run integrity check: GET /api/articles/admin/integrity-check
3. Verify issue detected
4. Click "Regenerate" button
5. Verify HTML restored

**Expected Results:**
- [ ] Missing file detected
- [ ] Issue listed in integrity check
- [ ] Regenerate button offered
- [ ] HTML file restored correctly
- [ ] Article accessible again

**Status:** ⏳ Pending

---

### Test 23: Orphaned HTML File Test
**Objective:** Detect HTML files without database entries

**Test Steps:**
1. Create HTML file manually in articles/
2. Run integrity check
3. Verify orphan detected
4. Offered options: delete or import

**Expected Results:**
- [ ] Orphan detected
- [ ] File path shown
- [ ] Options provided
- [ ] Cleanup successful

**Status:** ⏳ Pending

---

### Test 24: Concurrent Edit Test
**Objective:** Handle multiple users editing same article

**Test Steps:**
1. User A opens article for edit
2. User B opens same article
3. Both make changes
4. User A saves first
5. User B tries to save

**Expected Results:**
- [ ] Conflict detected (if implemented)
- [ ] Warning shown to User B
- [ ] No data loss
- [ ] Users can resolve conflict

**Status:** ⏳ Pending / Optional Feature

---

### Test 25: Network Failure During Publish Test
**Objective:** Ensure publish succeeds even if Google notify fails

**Test Steps:**
1. Block network access temporarily
2. Try to publish article
3. Verify publish completes
4. Verify article published successfully
5. Check error log

**Expected Results:**
- [ ] Article published despite network failure
- [ ] Database updated
- [ ] HTML file created
- [ ] Error logged (non-critical)
- [ ] User notified of successful publish

**Status:** ⏳ Pending

---

## F. Template System Tests

### Test 26: Template Loading Test
**Objective:** Verify template system works

**Test Steps:**
1. Verify `templates/article-template.html` exists
2. Publish article
3. Verify template loaded correctly
4. Verify all variables replaced: {{title}}, {{content}}, etc.

**Expected Results:**
- [ ] Template file exists
- [ ] Template loads successfully
- [ ] All variables replaced
- [ ] No {{variable}} placeholders in output

**Status:** ⏳ Pending

---

### Test 27: Template Customization Test
**Objective:** Test template editing

**Test Steps:**
1. Edit template file (add custom CSS)
2. Publish article
3. Verify custom CSS appears in HTML

**Expected Results:**
- [ ] Template edits reflected in output
- [ ] Custom CSS applied
- [ ] All articles use updated template

**Status:** ⏳ Pending

---

### Test 28: Missing Template Test
**Objective:** Test fallback when template missing

**Test Steps:**
1. Rename or delete template file
2. Try to publish article
3. Verify fallback to inline template
4. Verify warning logged to admin

**Expected Results:**
- [ ] Fallback template used
- [ ] Article still publishes
- [ ] Warning message shown
- [ ] Admin notified

**Status:** ⏳ Pending

---

## G. Dashboard UI Tests

### Test 29: Auto-Save Indicator Test
**Objective:** Verify auto-save indicator displays correctly

**Test Steps:**
1. Edit draft
2. Wait for auto-save
3. Verify indicator shows: "Draft saved at 2:35 PM"
4. Verify indicator updates after each auto-save
5. Verify "Saving..." shows during save

**Expected Results:**
- [ ] Indicator appears when saving
- [ ] Time stamp accurate
- [ ] "Saving..." state shows
- [ ] "Saved" state shows after completion

**Status:** ⏳ Pending

---

### Test 30: Draft/Published Visual Distinction Test
**Objective:** Test visual badges for article status

**Test Steps:**
1. View dashboard with mixed articles
2. Verify drafts show gray "DRAFT" badge
3. Verify published show green "PUBLISHED" badge
4. Verify draft count in stats card

**Expected Results:**
- [ ] Draft badge displays correctly
- [ ] Published badge displays correctly
- [ ] Colors match spec
- [ ] Stats card shows correct draft count

**Status:** ⏳ Pending

---

### Test 31: Filter Test
**Objective:** Test article filtering

**Test Steps:**
1. Click "All" → shows all articles
2. Click "Published" → shows only published
3. Click "Drafts" → shows only drafts
4. Verify counts correct

**Expected Results:**
- [ ] All filter works
- [ ] Published filter works
- [ ] Drafts filter works
- [ ] Counts accurate

**Status:** ⏳ Pending

---

## H. Performance Tests

### Test 32: Large Database Test
**Objective:** Test performance with large dataset

**Test Steps:**
1. Create 1000 articles (500 drafts, 500 published)
2. Load dashboard → should load in < 2 seconds
3. Filter by drafts → should load in < 1 second
4. Search article → should load in < 1 second

**Expected Results:**
- [ ] Dashboard loads in < 2 seconds
- [ ] Filtering is fast (< 1 second)
- [ ] Search is responsive
- [ ] No performance degradation

**Status:** ⏳ Pending

---

### Test 33: Large Article Test
**Objective:** Test handling of very large articles

**Test Steps:**
1. Create 50,000 word article with 100 images
2. Save draft → should complete in < 5 seconds
3. Publish → should complete in < 10 seconds
4. Load in editor → should load in < 3 seconds

**Expected Results:**
- [ ] Draft save completes in time
- [ ] Publish completes in time
- [ ] Editor loads without hanging
- [ ] No timeout errors

**Status:** ⏳ Pending

---

## I. Security Tests

### Test 34: XSS Prevention Test
**Objective:** Ensure XSS attacks are prevented

**Test Steps:**
1. Try to inject: `<script>alert('XSS')</script>`
2. Try: `<img src=x onerror="alert('XSS')">`
3. Try: `javascript:alert('XSS')` in links
4. Publish and verify

**Expected Results:**
- [ ] Script tags removed or escaped
- [ ] Event handlers removed
- [ ] JavaScript protocol blocked
- [ ] Article displays safely

**Status:** ⏳ Pending

---

### Test 35: SQL Injection Test
**Objective:** Verify SQL injection protection

**Test Steps:**
1. Try title: `'; DROP TABLE articles; --`
2. Try content with SQL injection
3. Verify parameterized queries prevent injection

**Expected Results:**
- [ ] SQL injection prevented
- [ ] Queries use parameters
- [ ] No database corruption
- [ ] Error handled gracefully

**Status:** ⏳ Pending

---

### Test 36: File Path Traversal Test
**Objective:** Prevent directory traversal attacks

**Test Steps:**
1. Try slug: `../../etc/passwd`
2. Try slug with special characters
3. Verify path sanitized

**Expected Results:**
- [ ] Path traversal blocked
- [ ] Slug sanitized correctly
- [ ] Files stay in articles/ directory
- [ ] No access to parent directories

**Status:** ⏳ Pending

---

## J. Backward Compatibility Tests

### Test 37: Existing Articles Test
**Objective:** Ensure existing articles still work

**Test Steps:**
1. Load all existing 64+ articles
2. Open each article URL in browser
3. Edit existing article
4. Verify new features work with old data

**Expected Results:**
- [ ] All existing articles load (no 404s)
- [ ] Old articles display correctly
- [ ] Can edit existing articles
- [ ] New features work with old data

**Status:** ⏳ Pending

---

### Test 38: Database Migration Test
**Objective:** Test schema updates don't break data

**Test Steps:**
1. Verify schema updates applied
2. Check existing articles have sensible defaults
3. Verify new columns don't break queries
4. Verify existing articles have published=1

**Expected Results:**
- [ ] New columns added successfully
- [ ] Existing data intact
- [ ] Default values applied
- [ ] No data corruption

**Status:** ⏳ Pending

---

## Test Summary

### By Category
- Content Preservation: Tests 1-7 (7 tests)
- Draft System: Tests 8-12 (5 tests)
- Version History: Tests 13-16 (4 tests)
- Publishing Workflow: Tests 17-20 (4 tests)
- Error Handling: Tests 21-25 (5 tests)
- Template System: Tests 26-28 (3 tests)
- Dashboard UI: Tests 29-31 (3 tests)
- Performance: Tests 32-33 (2 tests)
- Security: Tests 34-36 (3 tests)
- Backward Compatibility: Tests 37-38 (2 tests)

### Status Legend
- ✅ Passed
- ❌ Failed
- ⏳ Pending
- ⚠️ Skipped

### Overall Progress
**Total Tests:** 38  
**Passed:** 0  
**Failed:** 0  
**Pending:** 38  
**Completion:** 0%

---

## Notes

### Test Environment
- Server Version: 1.0.0
- Node Version: (to be filled)
- Database: SQLite
- Test Date: (to be filled)
- Tester: (to be filled)

### Known Issues
(To be documented during testing)

### Recommendations
(To be added after testing)
