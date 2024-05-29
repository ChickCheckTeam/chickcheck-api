import admin from "firebase-admin";
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
    await readFile(new URL('./key.json', import.meta.url))
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();

async function getUsers() {
    const snapshotUser = await db.collection('users').get();

    const usersWithScanHistory = await Promise.all(
        snapshotUser.docs.map(async (doc) => {
            const data = doc.data();
            const userId = doc.id; // Store the user ID for clarity

            // Get the subcollection reference efficiently
            const scanHistoryRef = db.collection('users').doc(userId).collection('scan_history');

            // Fetch scan history data using a separate get() call
            const scanHistorySnapshot = await scanHistoryRef.get();

            // Extract scan history documents using a concise map
            const scanHistory = scanHistorySnapshot.docs.map((scanDoc) => {
                const scan = scanDoc.data();
                return {
                    id: scanDoc.id,
                    ...scan,
                }
            });

            return { id: userId, ...data, scanHistory }; // Include scanHistory in the user object
        })
    );

    return usersWithScanHistory;
}

async function getUserById(param) {
    const userId = param;
    const userRef = db.collection('users').doc(param);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
        return {
            code: 404,
            message: 'User not found'
        };
    }

    const users = await getUsers();
    const user = users.find(user => user.id === param);
    
    return {
        code: 200,
        message: 'User retrieved successfully',
        data: user
    };
}

async function createUser(data) {
    const user = {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password
    };

    const userRef = db.collection('users').doc();
    await userRef.set(user);

    return {
        code: 201,
        message: 'User created successfully',
        data: user
    };
}

export default { getUsers, getUserById, createUser };