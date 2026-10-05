// Node.js 18 or later. Streams an answer as Server-Sent Events.
const apiKey = process.env.KS_API_KEY;
const botId = process.env.KS_BOT_ID;

if (!apiKey || !botId) {
  throw new Error("Set KS_API_KEY and KS_BOT_ID before running this example.");
}

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
      text: "Summarize our onboarding process.",
      stream: true,
    }),
  },
);

if (!res.ok) {
  throw new Error(
    `Knowledge Spaces API request failed: ${res.status} ${await res.text()}`,
  );
}

const decoder = new TextDecoder();
let buffer = "";
let answer = "";

for await (const chunk of res.body) {
  buffer += decoder.decode(chunk, { stream: true });

  // SSE events are separated by a blank line.
  let boundary;
  while ((boundary = buffer.indexOf("\n\n")) !== -1) {
    const raw = buffer.slice(0, boundary);
    buffer = buffer.slice(boundary + 2);

    let event = "message";
    let data = "";
    for (const line of raw.split("\n")) {
      if (line.startsWith("event:")) event = line.slice(6).trim();
      if (line.startsWith("data:")) data += line.slice(5).trim();
    }

    if (event === "receive-message") {
      // content is the full answer so far, not a delta.
      const frame = JSON.parse(data);
      process.stdout.write(frame.content.slice(answer.length));
      answer = frame.content;
    } else if (event === "error") {
      throw new Error(JSON.parse(data).message);
    } else if (event === "done") {
      process.stdout.write("\n");
    }
  }
}
