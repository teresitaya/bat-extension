import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "BAT Extension",
    description: "BAT Extension",
    version: "0.0.1",
    action: {
      default_title: "BAT Extension",
    },
    web_accessible_resources: [
      {
        matches: ["<all_urls>"],
        resources: ["icon/*.png"],
      },
    ],
    permissions: [
      "storage",
      "tabs",
      "activeTab",
      "scripting",
      "declarativeNetRequest",
      "declarativeNetRequestWithHostAccess",
      "webRequest",
      "webRequestBlocking",
      "contentSettings"
    ],
    host_permissions: [
      "https:/\/*/*",
      "http:/\/*/*"
    ],
  },
  modules: ["@wxt-dev/module-react"],
});
