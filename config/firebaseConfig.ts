import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore, FieldValue } from "firebase-admin/firestore";
import dotenv from "dotenv";
import { getAuth, Auth} from "firebase-admin/auth"
dotenv.config();
 
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not defined in the .env file");
}
 
const serviceAccount: ServiceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string, "base64").toString("utf-8")
);
 
initializeApp({
  credential: cert(serviceAccount),
});
 
 
const db: Firestore = getFirestore();
const auth: Auth = getAuth();
 
export { auth, db, FieldValue };