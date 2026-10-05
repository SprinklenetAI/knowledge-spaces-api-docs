// Node.js 18 or later.
const apiKey = process.env.KS_API_KEY;
const botId = process.env.KS_BOT_ID;

if (!apiKey || !botId) {
  throw new Error("Set KS_API_KEY and KS_BOT_ID before running this example.");
}

// One new UUID per conversation. Reuse it to continue the same conversation.
const sessionId = process.env.KS_SESSION_ID || crypto.randomUUID();

const res = await fetch(
  `https://spaces.sprinklenet.com/api/bots/${botId}/chat`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({
      session_id: sessionId,
      text: "What should I read first?",
    }),
  },
);

if (!res.ok) {
  throw new Error(
    `Knowledge Spaces API request failed: ${res.status} ${await res.text()}`,
  );
}

const data = await res.json();
console.log(`session_id: ${sessionId}`);
console.log(data.text.content);
for (const source of data.text.resources ?? []) {
  console.log("source:", source.document?.title ?? source.url?.url);
}
