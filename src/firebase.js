import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId added after enabling Google Analytics in Firebase Console:
  // https://console.firebase.google.com/project/tariqiqbal-portfolio/analytics
};

let analytics = null;

export function initAnalytics() {
  try {
    const app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
  } catch (e) {
    // Fail silently — ad blockers, private browsing, etc.
  }
}

export function trackPageView(pageName) {
  try {
    if (analytics) logEvent(analytics, "page_view", { page_title: pageName });
  } catch (e) {}
}
