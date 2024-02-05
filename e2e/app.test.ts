/* eslint-disable playwright/expect-expect */

import { test } from "@playwright/test";

test.fixme("should display initial search results on page load", () => {
	// TODO:
});

test.fixme("should allow filtering search results by kind", () => {
	// TODO:
});

test.fixme("should display a loading spinner while fetching search results", () => {
	// TODO:
});

test.fixme("should display an error when fetching search results failed", async ({ page }) => {
	// TODO:
});

test.fixme("should set lang attribute on html element", () => {
	// TODO: test if the html element has a lang="en" attribute
});

test.fixme("should have a skiplink", () => {
	// TODO: test if the first keyboard-focusable element is a link, which jumps to `<main>`
});

test.fixme("should have a favicon", () => {
	// TODO: test if a request to favicon.ico returns a success http status code
});

test.fixme("should have schema.org metadata", () => {
	// TODO: test if page includes a `<script type="application/json+ld">` with metadata
});
