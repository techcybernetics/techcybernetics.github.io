#!/usr/bin/env node
/**
 * Fetches latest AI/robotics news using Claude API and updates public/news.json
 * Run: node scripts/fetch-news.js
 * Requires: ANTHROPIC_API_KEY environment variable
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const today = new Date().toISOString().split("T")[0];

const prompt = `Today is ${today}. Generate a curated list of 8 real, recent AI and tech news articles covering AI breakthroughs, robotics, and innovation. 

For each article use your knowledge of recent developments (within the last few weeks). Return ONLY valid JSON with this exact structure, no markdown:

{
  "lastUpdated": "${today}",
  "articles": [
    {
      "id": "1",
      "title": "Article headline",
      "summary": "2-3 sentence summary of the development and why it matters",
      "source": "Publication name",
      "url": "https://publication-url.com",
      "category": "AI",
      "date": "${today}"
    }
  ]
}

Categories must be exactly one of: "AI", "Robotics", "Innovation"
Include a mix: at least 3 AI, 2 Robotics, 2 Innovation articles.
Make the summaries informative and technically accurate for a senior engineer audience.`;

function callClaudeAPI(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const options = {
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) reject(new Error(parsed.error.message));
          else resolve(parsed.content[0].text);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log(`Fetching AI news for ${today}...`);

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY not set");
    process.exit(1);
  }

  const text = await callClaudeAPI(prompt);

  // Extract JSON from the response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in response");

  const newsData = JSON.parse(jsonMatch[0]);

  // Validate structure
  if (!newsData.articles || !Array.isArray(newsData.articles)) {
    throw new Error("Invalid news data structure");
  }

  // Ensure IDs are strings
  newsData.articles = newsData.articles.map((a, i) => ({
    ...a,
    id: String(i + 1),
  }));

  const outputPath = path.join(__dirname, "../public/news.json");
  fs.writeFileSync(outputPath, JSON.stringify(newsData, null, 2));

  console.log(`✓ Updated ${outputPath} with ${newsData.articles.length} articles`);
}

main().catch((err) => {
  console.error("Failed to fetch news:", err.message);
  process.exit(1);
});
