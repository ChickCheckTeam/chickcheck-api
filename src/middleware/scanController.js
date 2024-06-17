import { db, uploadImage, getArticleByTitle } from "../services/dataService.js";
import { authCheck } from './authCheck.js'
import predictClassification from "../services/inferenceService.js";

async function storeScan(request, h) {
    try {
        const { image } = request.payload;
        const { model } = request.server.app;

        const id = authCheck(request.headers.authorization);

        const { predictResult, confidenceScore } = await predictClassification(model, image);
        
        const scan = db.collection('users').doc(id).collection('scan_history').doc();

        const uploadImg = await uploadImage(image, predictResult)

        if(uploadImg.code != 201) {
            return h.response(uploadImg).code(uploadImg.code);
        }

        const scanStructure = {
            title: predictResult,
            createdAt: new Date().toISOString(),
            results: `Result of the scan is ${predictResult}`,
            imageUrl: uploadImg.url
        }

        await scan.set(scanStructure);

        let resultMsg = '';
        if(confidenceScore > 90) {
            resultMsg = 'Model is predicted successfully';
        } else if(confidenceScore > 75) {
            resultMsg = 'Model is predicted successfully but under 90% confidence score. Use better quality image for better result';
        } else if(confidenceScore > 50) {
            resultMsg = 'Model is predicted successfully but under 75% confidence score. It might be invalid result. Use better quality image for better result';
        } else {
            resultMsg = 'Model is predicted successfully but under 50% confidence score. Invalid result, use better quality image for better result';
        }

        let article = await getArticleByTitle(predictResult)

        return h.response({
            status: 'success',
            message: resultMsg,
            data: scanStructure,
            article
        }).code(201);
    } catch (error) {
        return h.response(error).code(500);
    }
}

async function getScans(request, h) {
    try {
        const id = authCheck(request.headers.authorization);
        const users = db.collection('users').doc(id).collection('scan_history').orderBy("createdAt", 'desc').limit(10);
        
        const data = await users.get()
        let scans = [];

        data.forEach(doc => {
            let scan = {
                id: doc.id,
                ...doc.data(),
            }
            scans.push(scan)
        })

        const scanWithArti = async () => {
            const scansWithArticles = await Promise.all(scans.map(async scan => {
                const arti = await getArticleByTitle(scan.title);
                return {
                    ...scan,
                    article: arti
                };
            }));
            return scansWithArticles;
        }

        const dataScan = await scanWithArti();
        return h.response({
            message: "Fetched 10 latest scanned image",
            data: dataScan
        });
    } catch (error) {
        return h.response(error).code(500);
    }
}

export default { storeScan, getScans }