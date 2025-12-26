import admin from "firebase-admin";
import fs from "fs";

let initialized = false;

export function initFirebase() {
  if (initialized) return;

  const databaseURL = process.env.FIREBASE_DATABASE_URL;
  if (!databaseURL) {
    throw new Error("Missing FIREBASE_DATABASE_URL in env");
  }

  const serviceAccountJson = process.env.SERVICE_ACCOUNT_JSON;
  let serviceAccount: any;

  if (serviceAccountJson) {
    serviceAccount = JSON.parse(serviceAccountJson);
    if (serviceAccount?.private_key && typeof serviceAccount.private_key === "string") {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
    }
  } else {
    const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH || "./serviceAccountKey.json";
    if (!fs.existsSync(serviceAccountPath)) {
      throw new Error(
        `Service account file not found at ${serviceAccountPath}. Set SERVICE_ACCOUNT_JSON or SERVICE_ACCOUNT_PATH or create server/serviceAccountKey.json`
      );
    }
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL,
  });

  initialized = true;
}

export function getDatabase() {
  initFirebase();
  return admin.database();
}
