import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "../assignment-04-backend-firebase-adminsdk-fbsvc-cba40b260b.json";
import { getAuth, Auth } from "firebase-admin/auth"

initializeApp({
	credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();
const auth: Auth = getAuth();
export { db, auth };