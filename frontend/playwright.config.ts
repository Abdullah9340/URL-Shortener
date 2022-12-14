import type { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  //   retries: 3,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    baseURL: "http://localhost:3000",
  },
};
export default config;
