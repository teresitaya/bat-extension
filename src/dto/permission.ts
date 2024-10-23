import { PermissionPolicy } from "./permission-policy";
import { PermissionPolicyValue } from "./policy-value";
import { RiskLevel } from "./risk-level";

export const PermissionPolicies: PermissionPolicy[] = [
  {
    name: "accelerometer",
    description: "Controls whether the current document is allowed to gather information about the acceleration of the device through the Accelerometer interface.",
    value: [],
    recommended: [
      PermissionPolicyValue.DISALLOWED
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 8,
    explanation:
      'Restricting access prevents apps from detecting how your device moves, which could be used to track your behavior.',
    technicalExplanation:
      "Allowing access to the accelerometer could lead to privacy invasion by tracking device movements and inferring user activity.",
  },
  {
    name: "ambient-light-sensor",
    description: "Controls whether the current document is allowed to gather information about the amount of light in the environment around the device through the AmbientLightSensor interface.",
    value: [],
    recommended: [
      PermissionPolicyValue.DISALLOWED
    ],
    riskLevel: RiskLevel.MEDIUM,
    riskScore: 6,
    explanation:
      'Disabling this prevents apps from detecting the light around you, protecting your privacy.',
    technicalExplanation:
      "Access to ambient light sensor data can be used to infer user surroundings or monitor user activity without consent.",
  },
  {
    name: "autoplay",
    description: "Controls whether the current document is allowed to autoplay media requested through the HTMLMediaElement interface. When this policy is disabled and there were no user gestures, the Promise returned by HTMLMediaElement.play() will reject with a NotAllowedError DOMException. The autoplay attribute on <audio> and <video> elements will be ignored",
    value: [],
    recommended: [
      PermissionPolicyValue.ALLOWED
    ],
    riskLevel: RiskLevel.LOW,
    riskScore: 2,
    explanation:
      'Preventing access to Bluetooth helps protect your connected devices from unauthorized control or data access.',
    technicalExplanation:
      "Autoplaying media can be disruptive but poses a low security risk.",
  },
  {
    name: "bluetooth",
    description: "Controls whether the use of the Web Bluetooth API is allowed. When this policy is disabled, the methods of the Bluetooth object returned by Navigator.bluetooth will either return false or reject the returned Promise with a SecurityError DOMException.",
    value: [],
    recommended: [
      PermissionPolicyValue.DISALLOWED
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 9,
    explanation:
      'Preventing access to Bluetooth helps protect your connected devices from unauthorized control or data access.',
    technicalExplanation:
      "Unauthorized access to Bluetooth can expose connected devices to attacks or data leakage.",
  },
  {
    name: "browsing-topics",
    description: "Controls access to the Topics API. Where a policy specifically disallows the use of the Topics API, any attempts to call the Document.browsingTopics() method or send a request with a Sec-Browsing-Topics header will fail with a NotAllowedError DOMException.",
    value: [],
    recommended: [
      PermissionPolicyValue.DISALLOWED
    ],
    riskLevel: RiskLevel.MEDIUM,
    riskScore: 5,
    explanation:
      'Disabling this stops websites from gathering information about your interests to target ads.',
    technicalExplanation:
      "Allowing access to the Topics API can lead to detailed profiling of users for targeted advertising, which raises privacy concerns.",
  },
  {
    name: "camera",
    description: "Controls whether the current document is allowed to use video input devices. When this policy is disabled, the Promise returned by getUserMedia() will reject with a NotAllowedError DOMException.",
    value: [],
    recommended: [
      PermissionPolicyValue.DISALLOWED
    ],
    riskLevel: RiskLevel.HIGH,
    riskScore: 10,
    explanation:
      'Disabling camera access prevents websites from recording or streaming video without your permission.',
    technicalExplanation:
      "Unauthorized camera access can lead to privacy violations, including unwanted video recording.",
  },
  {
    "name": "accelerometer",
    "description": "Controls whether the current document is allowed to gather information about the acceleration of the device through the Accelerometer interface.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 8,
    "explanation": "Restricting access prevents apps from detecting how your device moves, which could be used to track your behavior.",
    "technicalExplanation": "Allowing access to the accelerometer could lead to privacy invasion by tracking device movements and inferring user activity."
  },
  {
    "name": "display-capture",
    "description": "Controls whether or not the current document is permitted to use the getDisplayMedia() method to capture screen contents. When this policy is disabled, the promise returned by getDisplayMedia() will reject with a NotAllowedError DOMException if permission is not obtained to capture the display's contents.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 9,
    "explanation": "Screen capturing can lead to the exposure of sensitive information displayed on the screen, such as passwords or private documents.",
    "technicalExplanation": "Disabling this stops apps from recording or streaming your screen, protecting your private information."
  },
  {
    "name": "document-domain",
    "description": "Controls whether the current document is allowed to set document.domain. When this policy is disabled, attempting to set document.domain will fail and cause a SecurityError DOMException to be thrown.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.MEDIUM,
    "riskScore": 5,
    "explanation": "Restricting the ability to set document.domain reduces the risk of cross-site scripting (XSS) attacks.",
    "technicalExplanation": "Disabling this limits some cross-site features but enhances overall website security."
  },
  {
    "name": "encrypted-media",
    "description": "Controls whether the current document is allowed to use the Encrypted Media Extensions API (EME). When this policy is disabled, the Promise returned by Navigator.requestMediaKeySystemAccess() will reject with a SecurityError DOMException.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.ALLOWED
    ],
    "riskLevel": RiskLevel.LOW,
    "riskScore": 3,
    "explanation": "EME is necessary for DRM-protected content, and poses low risk, but could limit user access to media if disabled.",
    "technicalExplanation": "Allowing this is needed to play protected content like movies or music."
  },
  {
    "name": "fullscreen",
    "description": "Controls whether the current document is allowed to use Element.requestFullscreen(). When this policy is disabled, the returned Promise rejects with a TypeError.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.ALLOWED
    ],
    "riskLevel": RiskLevel.LOW,
    "riskScore": 2,
    "explanation": "Fullscreen mode could be misused for phishing but generally poses a low risk if combined with other security measures.",
    "technicalExplanation": "Allowing fullscreen makes it possible to watch videos or interact with content without distractions."
  },
  {
    "name": "gamepad",
    "description": "Controls whether the current document is allowed to use the Gamepad API. When this policy is disabled, calls to Navigator.getGamepads() will throw a SecurityError DOMException, and the gamepadconnected and gamepaddisconnected events will not fire.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.ALLOWED
    ],
    "riskLevel": RiskLevel.LOW,
    "riskScore": 3,
    "explanation": "Gamepad access is generally safe but could be exploited for unauthorized input or tracking user activity.",
    "technicalExplanation": "Allowing this enables game controllers to work properly when playing web-based games."
  },
  {
    "name": "geolocation",
    "description": "Controls whether the current document is allowed to use the Geolocation Interface. When this policy is disabled, calls to getCurrentPosition() and watchPosition() will cause those functions' callbacks to be invoked with a GeolocationPositionError code of PERMISSION_DENIED.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 10,
    "explanation": "Geolocation access can expose the user's physical location, leading to privacy and safety concerns.",
    "technicalExplanation": "Disabling this prevents websites from knowing your exact location, protecting your privacy and safety."
  },
  {
    "name": "gyroscope",
    "description": "Controls whether the current document is allowed to gather information about the orientation of the device through the Gyroscope interface.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 8,
    "explanation": "Access to gyroscope data can be used to infer sensitive information about the user’s activity or environment.",
    "technicalExplanation": "Restricting access stops apps from detecting how your device is oriented, which could be used to monitor your actions."
  },
  {
    "name": "hid",
    "description": "Controls whether the current document is allowed to use the WebHID API to connect to uncommon or exotic human interface devices such as alternative keyboards or gamepads.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 7,
    "explanation": "Allowing HID access can expose connected devices to unauthorized interaction or data leakage.",
    "technicalExplanation": "Disabling this helps protect connected devices like specialized keyboards from unauthorized use or data breaches."
  },
  {
    "name": "identity-credentials-get",
    "description": "Controls whether the current document is allowed to use the Federated Credential Management API (FedCM), and more specifically the navigator.credentials.get() method with an identity option. Where this policy forbids use of the API, the Promise returned by the get() call will reject with a NotAllowedError DOMException.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 9,
    "explanation": "Unauthorized access to identity credentials can lead to account compromise or identity theft.",
    "technicalExplanation": "Blocking this helps prevent unauthorized apps from accessing your identity or login information."
  },
  {
    "name": "idle-detection",
    "description": "Controls whether the current document is allowed to use the Idle Detection API to detect when users are interacting with their devices, for example to report 'available'/'away' status in chat applications.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.MEDIUM,
    "riskScore": 6,
    "explanation": "Idle detection can be used to track user activity or inactivity, leading to privacy concerns.",
    "technicalExplanation": "Disabling this stops websites from knowing when you're away from your device, protecting your privacy."
  },
  {
    "name": "local-fonts",
    "description": "Controls whether the current document is allowed to gather data on the user's locally-installed fonts via the Window.queryLocalFonts() method (see also the Local Font Access API).",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.MEDIUM,
    "riskScore": 6,
    "explanation": "Access to local fonts can be used for fingerprinting, making it easier to track users across sites.",
    "technicalExplanation": "Blocking this prevents websites from using your installed fonts to track you online."
  },
  {
    "name": "magnetometer",
    "description": "Controls whether the current document is allowed to gather information about the orientation of the device through the Magnetometer interface.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.MEDIUM,
    "riskScore": 7,
    "explanation": "Magnetometer data can be used to infer the user’s orientation and surroundings, potentially leading to privacy issues.",
    "technicalExplanation": "Restricting this prevents apps from detecting the magnetic fields around you, protecting your privacy."
  },
  {
    "name": "microphone",
    "description": "Controls whether the current document is allowed to use audio input devices. When this policy is disabled, the Promise returned by MediaDevices.getUserMedia() will reject with a NotAllowedError DOMException.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 10,
    "explanation": "Unauthorized microphone access can lead to eavesdropping and severe privacy breaches.",
    "technicalExplanation": "Disabling this stops websites from recording audio without your permission, protecting your conversations."
  },
  {
    "name": "midi",
    "description": "Controls whether the current document is allowed to use the Web MIDI API. When this policy is disabled, the Promise returned by Navigator.requestMIDIAccess() will reject with a SecurityError DOMException.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.MEDIUM,
    "riskScore": 5,
    "explanation": "MIDI access poses low to moderate risk but can be exploited for unauthorized input or tracking of user interactions.",
    "technicalExplanation": "Disabling this limits apps from interacting with musical instruments or MIDI devices connected to your computer."
  },
  {
    "name": "otp-credentials",
    "description": "Controls whether the current document is allowed to use the WebOTP API to request a one-time password (OTP) from a specially-formatted SMS message sent by the app's server, i.e., via navigator.credentials.get({otp: ..., ...}).",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 9,
    "explanation": "Unauthorized access to OTP credentials can lead to account takeover or phishing attacks.",
    "technicalExplanation": "Blocking this helps protect your accounts by preventing unauthorized access to your SMS-based OTPs."
  },
  {
    "name": "payment",
    "description": "Controls whether the current document is allowed to use the Payment Request API. When this policy is enabled, the PaymentRequest() constructor will throw a SecurityError DOMException.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 8,
    "explanation": "Allowing the Payment Request API could expose sensitive payment information if misused.",
    "technicalExplanation": "Disabling this protects your payment information from being accessed or misused by websites."
  },
  {
    "name": "picture-in-picture",
    "description": "Controls whether the current document is allowed to play a video in a Picture-in-Picture mode via the corresponding API.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.ALLOWED
    ],
    "riskLevel": RiskLevel.LOW,
    "riskScore": 2,
    "explanation": "Picture-in-Picture poses a low security risk and is generally useful for multitasking.",
    "technicalExplanation": "Allowing this lets you watch videos in a small window while using other apps."
  },
  {
    "name": "publickey-credentials-create",
    "description": "Controls whether the current document is allowed to use the Web Authentication API to create new asymmetric key credentials, i.e., via navigator.credentials.create({publicKey: ..., ...}).",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 8,
    "explanation": "Unauthorized creation of credentials can lead to identity theft or unauthorized access to secure services.",
    "technicalExplanation": "Blocking this prevents websites from creating new login methods or credentials without your consent."
  },
  {
    "name": "publickey-credentials-get",
    "description": "Controls whether the current document is allowed to use the Web Authentication API to retrieve already stored public-key credentials, i.e., via navigator.credentials.get({publicKey: ..., ...}).",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 8,
    "explanation": "Unauthorized retrieval of credentials can lead to account compromise or unauthorized access to secure services.",
    "technicalExplanation": "Disabling this prevents unauthorized access to your stored security credentials."
  },
  {
    "name": "screen-wake-lock",
    "description": "Controls whether the current document is allowed to use Screen Wake Lock API to indicate that device should not turn off or dim the screen.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.LOW,
    "riskScore": 3,
    "explanation": "Keeping the screen awake can drain battery life, but poses minimal security risk.",
    "technicalExplanation": "Prevents websites from keeping your screen on longer than you might want, saving battery life."
  },
  {
    "name": "serial",
    "description": "Controls whether the current document is allowed to use the Web Serial API to communicate with serial devices, either directly connected via a serial port, or via USB or Bluetooth devices emulating a serial port.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 8,
    "explanation": "This API could allow websites to interact with connected devices in potentially insecure ways, exposing your devices to manipulation or data breaches.",
    "technicalExplanation": "Stops websites from directly accessing connected devices like a printer or a microcontroller, keeping your devices safer."
  },
  {
    "name": "speaker-selection",
    "description": "Controls whether the current document is allowed to use the Audio Output Devices API to list and select speakers.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 6,
    "explanation": "If enabled, websites could choose which speaker to play audio through, which could be used to invade privacy or manipulate audio playback in unauthorized ways.",
    "technicalExplanation": "Stops websites from choosing which speaker or headphones your audio plays through, preventing potential misuse."
  },
  {
    "name": "storage-access",
    "description": "Controls whether a document loaded in a third-party context (i.e. embedded in an <iframe>) is allowed to use the Storage Access API to request access to unpartitioned cookies.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 8,
    "explanation": "Disabling this helps prevent third-party embedded content from tracking users by accessing cookies, reducing cross-site tracking risks.",
    "technicalExplanation": "Protects your privacy by stopping embedded content (like ads) from tracking you across different websites."
  },
  {
    "name": "usb",
    "description": "Controls whether the current document is allowed to use the WebUSB API.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.HIGH,
    "riskScore": 8,
    "explanation": "Allowing access to USB devices could enable websites to interact with your USB-connected devices, which could expose sensitive data or lead to device manipulation.",
    "technicalExplanation": "Prevents websites from accessing USB devices connected to your computer, keeping them safer from potential misuse."
  },
  {
    "name": "web-share",
    "description": "Controls whether or not the current document is allowed to use the Navigator.share() of Web Share API to share text, links, images, and other content to arbitrary destinations of user's choice, e.g. mobile apps.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.LOW,
    "riskScore": 4,
    "explanation": "While generally low-risk, the API could potentially be misused to trigger unwanted shares, leading to minor privacy or annoyance issues.",
    "technicalExplanation": "Stops websites from automatically sharing things on your device without your explicit consent, preventing potential annoyances."
  },
  {
    "name": "window-management",
    "description": "Controls whether or not the current document is allowed to use the Window Management API to manage windows on multiple displays.",
    "value": [],
    "recommended": [
      PermissionPolicyValue.DISALLOWED
    ],
    "riskLevel": RiskLevel.MEDIUM,
    "riskScore": 5,
    "explanation": "This API could be used to manipulate window positions across multiple displays, potentially leading to user confusion or misuse in multi-monitor setups.",
    "technicalExplanation": "Prevents websites from moving or resizing windows across your screens, so they don’t disrupt your workspace."
  },
  {
    "name": "xr-spatial-tracking",
    "description": "Controls whether or not the current document is allowed to use the WebXR Device API to interact with a WebXR session.",
    "value": [],
    "recommended": [PermissionPolicyValue.DISALLOWED],
    riskLevel: RiskLevel.HIGH,
    riskScore:7,
    explanation:"Stops websites from accessing VR or AR tracking data, which could otherwise be used to figure out your movements or location in virtual spaces.",
    technicalExplanation:"This API provides access to spatial tracking data in virtual or augmented reality sessions, which could expose sensitive movement or location data if misused.        "
  }
  
];
