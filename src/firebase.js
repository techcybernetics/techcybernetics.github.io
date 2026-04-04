import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB5M7Yg1ENsiGcfRKZuC4fvdDry9wsEM4Q",
  authDomain: "tariqiqbal-portfolio.firebaseapp.com",
  projectId: "tariqiqbal-portfolio",
  storageBucket: "tariqiqbal-portfolio.firebasestorage.app",
  messagingSenderId: "191813434638",
  appId: "1:191813434638:web:d64c8f697427a34fbb6b5f",
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
