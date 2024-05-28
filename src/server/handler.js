import dataService from '../services/dataService.js';
import db from '../services/dataService.js';

async function home(request, h) {
    return {
        message: 'Hello World!',
    };
}

async function getUsers(request, h) {
    try {
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

        const result = usersWithScanHistory;
  
        return h.response({
            messages: 'All User Retrieved Successfully',
            data: result
        }).code(200);
    } catch (error) {
        return h.response({ 
            error
        }).code(400)
    }
}

async function getUserDetail(request, h) {
    try {
        const userId = request.params.id;
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return h.response({
                message: 'User not found'
            }).code(404);
        }

        const userData = userDoc.data();

        const scanHistoryRef = userRef.collection('scan_history');
        const scanHistorySnapshot = await scanHistoryRef.get();

        const scanHistory = scanHistorySnapshot.docs.map((doc) => {
            const scan = doc.data();
            return {
                id: doc.id,
                ...scan,
            }
        });

        const result = {
            id: userId,
            ...userData,
            scanHistory,
        };

        return h.response({
            message: 'User Retrieved Successfully',
            data: result
        }).code(200);
    } catch (error) {
        return h.response({
            error
        }).code(400)
    }
}

export default { home, getUsers, getUserDetail };