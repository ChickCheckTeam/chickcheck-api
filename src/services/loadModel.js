import tf from '@tensorflow/tfjs-node';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

export async function loadModel() {
    return tf.loadGraphModel(env.MODEL_URL);
}