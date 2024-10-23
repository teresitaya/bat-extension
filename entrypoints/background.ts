import StorageHelper from "@/src/helpers/StorageHelper";
import saasService from "../src/services/saas.service";
import { StorageKey } from "../src/dto";

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Received message', message, sender);
    sendResponse();
  });


  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    console.log('Tab updated', tabId, changeInfo, tab);
    const injectionResults = await browser.scripting.executeScript({
      target: { tabId: tabId, allFrames: false },
      func: checkMetaTag,
    });

    for (const frameResult of injectionResults) {
     console.log('Frame result', frameResult);
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
      //const whitelist= ['X-Dropbox-allowed-Team-Ids', "x-dropbox-response-origin", 'x-dropbox-response-origin', 'X-GooGApps-Allowed-Domains', 'Restrict-Access-To-Tenants', 'Restrict-Access-Context', 'YouTube-Restrict'];
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
          }
          if(whitelist.includes(details.responseHeaders[i].name)){
            console.log('SaaS Custom Headers', details.responseHeaders[i].name, details.responseHeaders[i].value);
          } */
      }
    }
    },
    { urls: ["<all_urls>"] },
    ["responseHeaders"]
  );

  async function checkMetaTag() {
    const metaTagType = document.querySelector('meta[property="og:type"][content="article"]');
    const metaTagTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    const titleContent = metaTagTitle ? metaTagTitle.content : '';
    const metaTags = Array.from(document.getElementsByTagName('meta')).map(tag => {
      return {
        name: tag.name,
        content: tag.content,
      };
    });
    const links = Array.from(document.getElementsByTagName('link')).map(link => {
      return {
        rel: link.rel,
        href: link.href,
      };
    });
    const scripts = Array.from(document.getElementsByTagName('script'))
    const isAPwa = links.some(link => link.rel === 'manifest');

    const body = document.body;
    return {
      isDocument: metaTagType !== null,
      titleContent: titleContent,
      isAPwa: isAPwa,
      head: {
        metaTags,
        links,
        scripts
      },
      body: {
        iframes: Array.from(body.getElementsByTagName('iframe')).map(iframe => {
          return {
            src: iframe.src,
          };
        }, []).filter(iframe => iframe.src),
        images: Array.from(body.getElementsByTagName('img')).map(img => {
          return {
            src: img.src,
          };
        }),
        links: Array.from(body.getElementsByTagName('a')).map(a => {
          return {
            href: a.href,
            text: a.text,
          };
        }),
      }
    };
  }

});
