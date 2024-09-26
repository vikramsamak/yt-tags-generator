import { chromium } from "playwright";
export async function scrapeRapidTags(title: string) {
  const browser = await chromium.launch(); // Launch a new browser instance
  const page = await browser.newPage(); // Open a new page

  try {
    // Navigate to RapidTags
    await page.goto("https://rapidtags.io/generator");

    // Wait for the input to be available and type the title
    await page.waitForSelector("#searchInput");
    await page.fill("#searchInput", title);

    // Wait for the tags to be generated
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000); // Adjust timeout as necessary

    // Click the "Copy Tags" button
    await page.waitForSelector("button.copy"); // Ensure the copy button is visible
    await page.click("button.copy"); // Click the Copy Tags button

    // Wait for clipboard content to be populated
    await page.waitForTimeout(500); // Give some time for the clipboard operation

    // Wait for the generated tags to be displayed
    await page.waitForSelector(".tagbox"); // Wait for the tagbox to appear

    // Extract tags from the DOM
    const tags = await page.evaluate(() => {
      const tagElements = Array.from(document.querySelectorAll(".tagbox .tag")); // Select all tags
      return tagElements.map(
        (tag) => tag.textContent && tag.textContent.trim()
      ); // Get text content of each tag and trim whitespace
    });

    return tags; // Return tags as an array
  } catch (error) {
    console.error("Error scraping RapidTags:", error);
    return [];
  } finally {
    await browser.close(); // Close the browser instance
  }
}
