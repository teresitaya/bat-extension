import StorageHelper from "@/src/helpers/StorageHelper";
import saasService from "../src/services/saas.service";
import { AppData, StorageKey } from "../src/dto";

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Received message', message, sender);
    sendResponse();
  });


  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if(tab && changeInfo.status && changeInfo.status === 'loading'){
      const appInfo: AppData = {
        name: tab.title || '',
        icon:tab.favIconUrl || ''
      };
      StorageHelper.set(`local:${StorageKey.APP_DATA}`, appInfo);
      console.log('APP_DATA', appInfo);
    }
  });

  browser.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      const isUrlValid =!details.url.startsWith("chrome://") && !details.url.startsWith("chrome-extension://");
      if (details.type !== "main_frame" || !isUrlValid) return;
      console.log('onBeforeSendHeaders', details);
    },
    { urls: ["<all_urls>"] },
    ["requestHeaders"]
  );

  browser.webRequest.onHeadersReceived.addListener(
    (details) => {
      const isUrlValid = !details.url.startsWith("chrome://") && !details.url.startsWith("chrome-extension://");
      if (details.type !== "main_frame" || !isUrlValid) return;
      console.log('onHeadersReceived', details);
      if (details.responseHeaders) {
      if(details.responseHeaders.length === 0) return;
        for (var i = 0; i < details.responseHeaders.length; ++i) {
          if(details.responseHeaders[i].name.toLowerCase().includes('content-security-policy')){
            const directivesArray = details.responseHeaders[i].value?.split(';').filter(directive => directive.trim().length > 0) || [];
            const directives = directivesArray.map(directive => {
              const [name, ...valueParts] = directive.trim().split(' ');
              const value = valueParts.join(' ');
              return {
                name: name,
                value: value,
              };
            });
           const resultDirectives = directives.map(directive => {
              return saasService.checkDirective(directive.name, directive.value);
            }).filter(directive =>  directive && directive.value.length === 0);
            StorageHelper.set(`local:${StorageKey.CSP_DIRECTIVES}`, resultDirectives);
          }   
          if (details.responseHeaders[i].name.toLowerCase().includes('permissions-policy')) {
            console.log('permissions-policy', details.responseHeaders[i].value);
             const permissionArray = details.responseHeaders[i].value?.split(',').filter(directive => directive.trim().length > 0) || [];
            const permission = permissionArray.map(directive => {
              const [name, ...valueParts] = directive.trim().split('=');
              const value = valueParts.join(' ');
              return {
                name: name,
                value: value,
              };
            });
           const resultDirectives = permission.map(directive => {
              return saasService.checkPermissionPolicy(directive.name, directive.value);
            }).filter(directive =>  directive && directive.value.length === 0);
            StorageHelper.set(`local:${StorageKey.PERMISSIONS_DIRECTIVES}`, resultDirectives);
            console.log('permission policy', resultDirectives);
          }
          /*
          if(details.responseHeaders[i].name.toLowerCase().includes('x-frame-options')){
            console.log('x-frame-options', details.responseHeaders[i].value);
          }
          if(details.responseHeaders[i].name.toLowerCase().includes('x-content-type-options')){
            console.log('x-content-type-options', details.responseHeaders[i].value);
          }
          if(details.responseHeaders[i].name.toLowerCase().includes('x-xss-protection')){
            console.log('x-xss-protection', details.responseHeaders[i].value);
          }*/
      }
    }
    },
    { urls: ["<all_urls>"] },
    ["responseHeaders"]
  );


});
