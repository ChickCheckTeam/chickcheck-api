import admin from "firebase-admin";
import { Storage } from "@google-cloud/storage";
import { readFile } from 'fs/promises';
import { randomUUID } from 'crypto';

const serviceAccount = JSON.parse(
    await readFile(new URL('./key.json', import.meta.url))
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const storage = new Storage({
    projectId: "chickcheck-backend",
    keyFilename: "./src/services/key.json"
})

export function getBucket(name) {
    const bucket = storage.bucket(name);
    return bucket;
}

export async function uploadImage(image, filename = "scan_result") {
    const bucket = getBucket("tensorflowjs-chickcheck-model");
    const buffer = Buffer.from(image, 'base64');

    const id = randomUUID();

    const name = filename.toLowerCase() + "_" + id;
    let response = {};

    const file = bucket.file(`scan-result/${name}.jpg`);

    // alternatif method
    // file.save(buffer, {
    //     metadata: {
    //         contentType: 'image/jpeg', // Adjust content type as needed
    //         cacheControl: 'public, max-age=31536000',
    //     },
    // });

    return new Promise((resolve, reject) => {
        const stream = file.createWriteStream({
            metadata: {
                contentType: 'image/jpeg', // Adjust content type as needed
                cacheControl: 'public, max-age=31536000',
            },
        });
    
        stream.on('error', (err) => {
            console.error('ERROR:', err);
            reject({
                code: 500,
                message: 'Failed to upload image.',
            });
        });
    
        stream.on('finish', () => {
            console.log(` uploaded to bucket.`);
            resolve({
                code: 201,
                message: 'Image uploaded successfully.',
                url: `https://storage.googleapis.com/tensorflowjs-chickcheck-model/scan-result/${name}.jpg`
            });
        });
    
        stream.end(buffer);
    })

}

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

export async function getArticleByTitle(title) {
    let articles = db.collection("articles");
    let article;

    switch (title) {
        case "Salmonellosis":
            article = (await articles.where("title", "==", "Salmonellosis").get()).docs[0];
            break;

        case "New Castle Disease":
            article = (await articles.where("title", "==", "New Castle Disease").get()).docs[0];
            break;

        case "Healthy":
            article = (await articles.where("title", "==", "Healthy").get()).docs[0];
            break;

        case "Coccidiosis":
            article = (await articles.where("title", "==", "Coccidiosis").get()).docs[0];
            break;
    
        default:
            break;
    }

    article = {
        id: article.id,
        ...article.data()
    }

    return article;
}

export default { getUsers, getUserById, createUser };