export default defineContentScript(
{  
  matches: ["<all_urls>"],
  runAt: 'document_start',
  allFrames: true,
  matchAboutBlank: true,
  main() {
    console.log('Page loaded');
    // check for username and password fields
    const passwords = document.querySelectorAll('input[type="password"]');
    if (passwords.length) {
      console.log('Password fields found:', passwords);
    }
    const usernames = document.querySelectorAll('input[type="email"], input[type="text"]');
    if (usernames.length) {
      console.log('usernames fields found:', usernames);
    }
    
  },
}
);
