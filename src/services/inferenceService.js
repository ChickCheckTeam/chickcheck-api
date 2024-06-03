import { InputError } from './ClientError.js';
import tf from '@tensorflow/tfjs-node';

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([150, 150])
            .expandDims()
            .toFloat().div(tf.scalar(255));

        const prediction = model.predict(tensor);
        
        // from dicoding
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
        const classResult = tf.argMax(prediction, 1).dataSync()[0];

        const predictionLabel = ['Coccidiosis', 'Healthy', 'Newcastle Disease', 'Salmonella'];
        const predictResult = predictionLabel[classResult];

        return { predictResult, confidenceScore };
    } catch (error) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }
}

export default predictClassification;
