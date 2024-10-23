import { CspDirective } from "./csp-directive";
import { DirectiveValue } from "./directive-value";
import { RiskLevel } from "./risk-level";

export const CspDirectives: CspDirective[] = [
  {
    name: "default-src",
    description: "Specifies the default source for all content types",
    value: [],
    recommended: [
      DirectiveValue.NONE,
      DirectiveValue.SELF,
      DirectiveValue.HTTPS_DOMAIN,
      DirectiveValue.HTTP_DOMAIN,
    ],
    riskLevel: RiskLevel.MEDIUM,
    riskScore: 6,
    explanation:
      'Default to "self" limits content to the same origin, reducing the risk of loading malicious content from external sources.',
    technicalExplanation:
      "Ensures only safe, trusted sources are used for loading scripts and styles.",
  },
  {
    name: "script-src",
    description: "Specifies the allowed sources for scripts",
    value: [],
    recommended: [
      DirectiveValue.SELF,
      DirectiveValue.NONCE,
      DirectiveValue.HASH,
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 8,
    explanation:
      "Scripts are a common vector for XSS attacks. Nonces or hashes help mitigate these risks.",
    technicalExplanation:
      "Controls where scripts can load from, preventing harmful code from running.",
  },
  {
    name: "style-src",
    description: "Specifies the allowed sources for stylesheets",
    value: [],
    recommended: [
      DirectiveValue.SELF,
      DirectiveValue.NONCE,
      DirectiveValue.HASH,
    ],
    riskLevel: RiskLevel.MEDIUM,
    riskScore: 6,
    explanation:
      "Restricting stylesheet sources helps prevent unauthorized changes that could introduce vulnerabilities.",
    technicalExplanation:
      "Ensures only trusted sources provide styles, reducing CSS manipulation risks.",
  },
  {
    name: "img-src",
    description: "Specifies the allowed sources for images",
    value: [],
    recommended: [
      DirectiveValue.SELF,
      DirectiveValue.ANY,
      DirectiveValue.HTTPS_DOMAIN,
    ],
    riskLevel: RiskLevel.LOW,
    riskScore: 3,
    explanation:
      "Images are less risky but can be used in phishing attacks. Limiting sources to trusted domains helps reduce risks.",
    technicalExplanation:
      "Ensures images are loaded from safe sources, reducing phishing attempts.",
  },
  {
    name: "base-uri",
    description: "Specifies the allowed base URI values",
    value: [],
    recommended: [DirectiveValue.SELF],
    riskLevel: RiskLevel.MEDIUM,
    riskScore: 5,
    explanation:
      "Prevents manipulation of the base URI, avoiding incorrect URL resolution and potential security risks.",
    technicalExplanation:
      "Ensures that resources and links resolve only to trusted locations.",
  },
  {
    name: "plugin-types",
    description: "Specifies the allowed plugin types",
    value: [],
    recommended: [DirectiveValue.NONE],
    riskLevel: RiskLevel.HIGH,
    riskScore: 7,
    explanation:
      "Restricts the use of vulnerable plugins to prevent XSS or remote code execution.",
    technicalExplanation:
      "Disables risky plugins like Flash or Java, which are often exploited.",
  },
  {
    name: "report-to",
    description: "Specifies the reporting endpoint for CSP violations",
    value: [],
    recommended: [DirectiveValue.SELF, DirectiveValue.HTTPS_DOMAIN],
    riskLevel: RiskLevel.LOW,
    riskScore: 3,
    explanation:
      "Helps monitor CSP violations, though it doesn’t directly enhance security.",
    technicalExplanation:
      "Enables proactive monitoring and reporting for potential issues.",
  },
  {
    name: "require-trusted-types-for",
    description: "Enforces Trusted Types for specific functions (experimental)",
    value: [],
    recommended: [DirectiveValue.ALLOW_SAME_SCRIPT],
    riskLevel: RiskLevel.HIGH,
    riskScore: 9,
    explanation: "Enforcing Trusted Types reduces DOM-based XSS risks.",
    technicalExplanation:
      "Restricts the data types passed to sensitive DOM functions.",
  },
  {
    name: "trusted-types",
    description:
      "Restricts the creation of Trusted Types policies (experimental)",
    value: [],
    recommended: [DirectiveValue.STRICT_DYNAMIC],
    riskLevel: RiskLevel.HIGH,
    riskScore: 9,
    explanation:
      "Trusted Types policies help prevent XSS attacks by controlling data flow to critical functions.",
    technicalExplanation:
      "Ensures only valid, non-spoofable types are passed to critical functions.",
  },
  {
    name: "script-src-elem",
    description: "Specifies valid sources for <script> elements",
    value: [],
    recommended: [
      DirectiveValue.SELF,
      DirectiveValue.NONCE,
      DirectiveValue.HASH,
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 8,
    explanation:
      "Inline scripts are a common attack vector. Using nonces or hashes helps prevent unauthorized code execution.",
    technicalExplanation:
      "Controls which scripts can be executed, ensuring only trusted sources are allowed.",
  },
  {
    name: "script-src-attr",
    description: "Specifies valid sources for inline event handlers",
    value: [],
    recommended: [
      DirectiveValue.SELF,
      DirectiveValue.NONCE,
      DirectiveValue.HASH,
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 8,
    explanation:
      "Restricting inline event handlers reduces the risk of XSS attacks.",
    technicalExplanation:
      "Limits the sources that can trigger JavaScript on user interactions.",
  },
  {
    name: "style-src-elem",
    description: "Specifies valid sources for <style> and <link> elements",
    value: [],
    recommended: [
      DirectiveValue.SELF,
      DirectiveValue.NONCE,
      DirectiveValue.HASH,
    ],
    riskLevel: RiskLevel.MEDIUM,
    riskScore: 6,
    explanation: "Ensures only trusted stylesheets are applied to the site.",
    technicalExplanation:
      "Prevents unauthorized CSS from altering the appearance or behavior of the site.",
  },
  {
    name: "style-src-attr",
    description:
      "Specifies valid sources for inline styles on individual elements",
    value: [],
    recommended: [
      DirectiveValue.SELF,
      DirectiveValue.NONCE,
      DirectiveValue.HASH,
    ],
    riskLevel: RiskLevel.MEDIUM,
    riskScore: 6,
    explanation:
      "Prevents untrusted sources from changing individual elements’ styles.",
    technicalExplanation:
      "Reduces the risk of XSS by restricting styling to trusted sources.",
  },
  {
    name: "upgrade-insecure-requests",
    description: "Upgrades all HTTP URLs to HTTPS",
    value: [],
    recommended: [DirectiveValue.UPGRADE],
    riskLevel: RiskLevel.MEDIUM,
    riskScore: 5,
    explanation:
      "Automatically upgrading requests reduces man-in-the-middle attack risks.",
    technicalExplanation:
      "Forces content to load securely via HTTPS, preventing interception.",
  },
  {
    name: "connect-src",
    description: "Specifies the allowed sources for network connections",
    value: [],
    recommended: [
      DirectiveValue.NONE,
      DirectiveValue.SELF,
      DirectiveValue.HTTPS_DOMAIN,
      DirectiveValue.HTTP_DOMAIN,
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 7,
    explanation:
      'Limits where the site can connect to over the network, reducing the risk of sensitive data being sent to untrusted sources.',
    technicalExplanation:"Restricting network connections helps prevent data exfiltration and reduces the risk of attacks via malicious external resources.",
  },
  {
    name: "font-src",
    description: "Specifies the allowed sources for fonts",
    value: [],
    recommended: [
      DirectiveValue.NONE,
      DirectiveValue.SELF,
      DirectiveValue.HTTPS_DOMAIN,
      DirectiveValue.HTTP_DOMAIN,
    ],
    riskLevel: RiskLevel.LOW,
    riskScore: 3,
    explanation:
      'Fonts are generally low risk, but should still be restricted to trusted sources to avoid potential security risks.',
    technicalExplanation:"Makes sure that the fonts used on the site are only coming from places you trust, avoiding issues with malicious or fake fonts.",
  },
  {
    name: "object-src",
    description: "Specifies the allowed sources for objects",
    value: [],
    recommended: [
      DirectiveValue.NONE,
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 9,
    explanation:
      'Disables loading of certain content types that can be especially dangerous, like Flash or Java objects, which can introduce serious security vulnerabilities.',
    technicalExplanation:`Objects can introduce severe security risks, including XSS and code execution. It's best to disable this by setting it to "none".`,
  },
  {
    name: "media-src",
    description: "Specifies the allowed sources for media (audio, video)",
    value: [],
    recommended: [
        DirectiveValue.NONE,
        DirectiveValue.SELF,
        DirectiveValue.HTTPS_DOMAIN,
        DirectiveValue.HTTP_DOMAIN,
    ],
    riskLevel: RiskLevel.LOW,
    riskScore: 3,
    explanation:
      'Ensures that audio and video files on the site come from safe sources, reducing risks associated with these types of media content.',
    technicalExplanation:`Media sources are generally low risk, but should be restricted to trusted domains to prevent potential issues like phishing.`,
  },
  {
    name: "frame-ancestors",
    description: "Specifies which origins are allowed to frame the page",
    value: [],
    recommended: [
        DirectiveValue.NONE,
        DirectiveValue.SELF,
        DirectiveValue.HTTPS_DOMAIN,
        DirectiveValue.HTTP_DOMAIN,
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 8,
    explanation:
      'Protects against a type of attack where your site could be loaded in a hidden frame by another site, tricking users into clicking on things they didn’t intend to.',
    technicalExplanation:`Prevents clickjacking attacks by ensuring only trusted sources can frame your content.`,
  },
  {
    name: "child-src",
    description: "Specifies the allowed sources for child frames",
    value: [],
    recommended: [
        DirectiveValue.NONE,
        DirectiveValue.SELF,
        DirectiveValue.HTTPS_DOMAIN,
        DirectiveValue.HTTP_DOMAIN,
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 8,
    explanation:
      'Protects against a type of attack where your site could be loaded in a hidden frame by another site, tricking users into clicking on things they didn’t intend to.',
    technicalExplanation:`Prevents clickjacking attacks by ensuring only trusted sources can frame your content.`,
  },
  {
    name: "frame-src",
    description: "Specifies the allowed sources for frames",
    value: [],
    recommended: [
        DirectiveValue.NONE,
        DirectiveValue.SELF,
        DirectiveValue.HTTPS_DOMAIN,
        DirectiveValue.HTTP_DOMAIN,
    ],
    riskLevel: RiskLevel.MEDIUM,
    riskScore: 5,
    explanation:
      'Controls where content inside frames on the site can come from, ensuring that only trusted sources can load such content.',
    technicalExplanation:`Similar to child-src, but specifically for frames, reducing the risk of embedding malicious content.`,
  },
  {
    name: "fenced-frame-src",
    description: "Specifies valid sources for nested browsing contexts loaded into <fencedframe> elements.",
    value: [],
    recommended: [
        DirectiveValue.NONE,
        DirectiveValue.SELF,
        DirectiveValue.HTTPS_DOMAIN,
        DirectiveValue.HTTP_DOMAIN,
    ],
    riskLevel: RiskLevel.MEDIUM,
    riskScore: 5,
    explanation:
      'Protects new and experimental ways of loading content inside your site from being abused by attackers, keeping it safe from untrusted sources.',
    technicalExplanation:`Restricting sources for fenced frames helps mitigate risks associated with embedding untrusted content.`,
  },
  {
    name: "form-action",
    description: "Directive restricts the URLs which can be used as the target of form submissions from a given context",
    value: [],
    recommended: [
        DirectiveValue.NONE,
        DirectiveValue.SELF,
        DirectiveValue.HTTPS_DOMAIN,
        DirectiveValue.HTTP_DOMAIN,
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 8,
    explanation:
      'Ensures that any forms on the site only send data to places you trust, preventing attackers from intercepting the information users submit.',
    technicalExplanation:`Ensures that form submissions are only sent to trusted URLs, mitigating the risk of data exfiltration via form hijacking.`,
  },
  {
    name: "manifest-src",
    description: "Specifies the allowed sources for manifests",
    value: [],
    recommended: [
        DirectiveValue.NONE,
        DirectiveValue.SELF,
        DirectiveValue.HTTPS_DOMAIN,
        DirectiveValue.HTTP_DOMAIN,
    ],
    riskLevel: RiskLevel.LOW,
    riskScore: 3,
    explanation:
      'Ensures that files telling the website how to behave (like for mobile apps) come only from places you trust, preventing unauthorized changes.',
    technicalExplanation:`Manifests are typically low risk, but should still be restricted to prevent unauthorized modifications that could affect PWA behavior.`,
  },
  {
    name: "worker-src",
    description: "Specifies the allowed sources for workers (Service Worker, SharedWorker)",
    value: [],
    recommended: [
        DirectiveValue.NONE,
        DirectiveValue.SELF,
        DirectiveValue.HTTPS_DOMAIN,
        DirectiveValue.HTTP_DOMAIN,
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 7,
    explanation:
      'Makes sure that powerful scripts running in the background of the site only come from trusted sources, protecting against attacks that can run harmful code secretly.',
    technicalExplanation:`Workers can execute scripts, so it's critical to restrict their sources to mitigate XSS and other script-related attacks.`,
  },
  {
    name: "sandbox",
    description: "Specifies a sandbox for the page",
    value: [],
    recommended: [
        DirectiveValue.ALLOW_SAME_ORIGIN,
        DirectiveValue.ALLOW_SAME_SCRIPT
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 7,
    explanation:
      'Puts strict limits on what the site can do, making it harder for attackers to exploit, but you must be careful not to allow too much freedom in the sandbox.',
    technicalExplanation:`Sandboxing a page can significantly mitigate risks, but care must be taken to allow only necessary permissions, as over-permissiveness can nullify its benefits.`,
  },
  {
    name: "require-trusted-types-for",
    description: "Directive instructs user agents to control the data passed to DOM XSS sink functions, like Element.innerHTML setter.",
    value: [],
    recommended: [
        DirectiveValue.SCRIPT,
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 9,
    explanation:
      'Adds extra protection against certain types of attacks that try to inject harmful code into the site by ensuring only safe data types can be used in key places.',
    technicalExplanation:`Enforcing Trusted Types greatly reduces the risk of DOM-based XSS attacks by restricting what types of data can be passed to sensitive functions.`,
  },
  {
    name: "report-sample",
    description: "From which resources may be loaded can use any one of the values listed below. Relevant directives include the fetch directives.",
    value: [],
    recommended: [
        DirectiveValue.NONE,
        DirectiveValue.SELF,
        DirectiveValue.HTTPS_DOMAIN,
        DirectiveValue.HTTP_DOMAIN,
    ],
    riskLevel: RiskLevel.LOW,
    riskScore: 3,
    explanation:
      'Helps with reporting and monitoring, making sure you get useful information about security issues on the site without directly changing how secure it is.',
    technicalExplanation:`This directive is primarily informational and helps with reporting issues; it doesn’t directly affect security but should still be properly configured.`,
  },
];
