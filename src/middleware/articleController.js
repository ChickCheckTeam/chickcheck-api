import dataService from "../services/dataService.js"

async function getArticles(request, h) {
    try {

        //await db.collection("nama koleksi firestore").doc(article.id).set(article);
        const article = {
            "id": "",
            "title": "",
            "author": "",
            "createdAt": "",
            "updatedAt": "",
            "content": ""
        
    };

    await dataService.storeArticle(article);
    
    return h.response(article).code(200);
    } catch (error) {

        console.error("Error fetching article.", error);
        return h.response(error).code(500);
    }

}


export default { getArticles };