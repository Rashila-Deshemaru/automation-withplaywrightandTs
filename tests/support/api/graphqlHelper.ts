import { Page } from "@playwright/test";

export async function waitForGraphQL(
  page: Page,
  expectedStatus?: "active" | "inactive"
) {
  console.log(`Waiting for GraphQL request with status: ${expectedStatus || "any"}`);

  const response = await page.waitForResponse(
    (resp) => {
      try {
        if (resp.request().method() !== "POST") return false;
        if (!resp.url().includes("/cms-api/auth")) return false;

        const postData = resp.request().postData();
        if (!postData) return false;

        const parsed = JSON.parse(postData);

        const statusInRequest = parsed.variables?.input?.status?.toLowerCase();
        if (expectedStatus && statusInRequest !== expectedStatus.toLowerCase()) {
          console.log(`Skipping request with status: ${statusInRequest}`);
          return false;
        }

        console.log(`Matched GraphQL request for status: ${statusInRequest}`);
        return true;
      } catch (err) {
        console.log("Error parsing request:", err);
        return false;
      }
    },
    { timeout: 30000 }
  );

  const data = await response.json();
  console.log(`GraphQL response received`);
  return data;
}