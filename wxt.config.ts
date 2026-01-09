import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "RPX Extension",
    description: "RPX Extension",
    version: "0.0.2",
    action: {
      default_title: "RPX Extension",
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
      "webRequest",
    ],
    host_permissions: [
      "https:/\/*/*",
      "http:/\/*/*"
    ],
  },
  modules: ["@wxt-dev/module-react"],
});
