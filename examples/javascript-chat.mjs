const apiKey = process.env.KS_API_KEY;
const botId = process.env.KS_BOT_ID;

if (!apiKey || !botId) {
  throw new Error("Set KS_API_KEY and KS_BOT_ID before running this example.");
}

const res = await fetch(
  `https://spaces.sprinklenet.com/api/bots/${botId}/chat`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({
      session_id: "quickstart-001",
      text: "Hello Knowledge Spaces",
    }),
  },
);

if (!res.ok) {
  throw new Error(
    `Knowledge Spaces API request failed: ${res.status} ${await res.text()}`,
  );
}

console.log(await res.json());
