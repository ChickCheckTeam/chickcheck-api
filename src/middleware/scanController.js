import { db } from "../services/dataService.js";
import { authCheck } from "./authCheck.js";
// import predictClassification from "../services/inferenceService.js";

async function storeScan(request, h) {
    try {
        const { image } = request.payload;
        const { model } = request.server.app;

        const id = authCheck(request.headers.authorization);

        const { predictResult, confidenceScore } = await predictClassification(model, image);
        
        const scan = db.collection('users').doc(id).collection('scan_history').doc();

        const scanStructure = {
            title: predictResult,
            createdAt: new Date().toISOString(),
            results: `Result of the scan is ${predictResult} with confidence score ${Math.floor(confidenceScore)}%`,
            suggestion: `Suggestion for ${predictResult} is to do this and that`,
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

        return h.response({
            status: 'success',
            message: resultMsg,
            data: scanStructure
        }).code(201);
    } catch (error) {
        return h.response(error).code(500);
    }
}

export default { storeScan }