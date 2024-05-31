import dataService from "../services/dataService.js";
// import inferenceService from "../services/inferenceService.js";

async function storeScan(request, h) {
    try {
        const { image } = request.payload;
        const { model } = request.server.app;
        // const getUser = await dataService.getUserById(request.payload.params.id);

        // const { prediction } = await predictClassification(model, image);

        // if (getUser.code === 404) {
        //     return h.response({
        //         status: 'fail',
        //         message: getUser.message
        //     }).code(404);
        // }

        return h.response({
            status: 'success',
            prediction
        }).code(201);
    } catch (error) {
        return h.response(error).code(500);
    }
}

export default { storeScan }