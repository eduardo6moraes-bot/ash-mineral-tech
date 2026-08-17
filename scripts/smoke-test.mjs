const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const response = await fetch(`${baseUrl}/api/spark/status`);
if (!response.ok) {
  throw new Error(`Smoke test failed with HTTP ${response.status}`);
}
const payload = await response.json();
if (payload.status !== "online") {
  throw new Error(`Unexpected gateway status: ${payload.status}`);
}
console.log(`Smoke test passed: ${payload.engine} is ${payload.status}.`);
