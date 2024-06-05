import { db } from "../services/dataService.js";
import dataService from "../services/dataService.js"
import { authCheck } from "./authCheck.js";

// retrieve all articles
async function getArticles(request, h) {
    try {
        const articles = await db.collection('articles').get();
        const articlesData = articles.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return h.response({
            status: 'success',
            data: articlesData
        }).code(200)
    } catch (error) {
        return h.response({
            status: 'fail',
            error
        }).code(500);
    }
}

// store article
async function storeArticle(request, h) {
    try {
        const { title, content } = request.payload;

        const id = authCheck(request.headers.authorization);
        const user = (await dataService.getUserById(id)).data;
        if (user.code === 404) {
            return h.response({
                status: 'fail',
                message: 'User not found'
            }).code(404);
        }

        const article = {
            title,
            author: {
                id: user.id,
                name: user.name
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content,
        }

        const newArticle = db.collection('articles').doc();
        await newArticle.set(article);

        return h.response({
            status: 'success',
            message: 'Article created successfully',
            data: article
        }).code(201);
    } catch (error) {
        return h.response({
            status: 'fail',
            error
        }).code(500);
    }
}

// retrieve article by id
async function getArticleById(request, h) {
    try {
        const article = await db.collection('articles').doc(request.params.id).get();

        return h.response({
            status: 'success',
            data: {
                id: article.id,
                ...article.data()
            }
        }).code(200);
    } catch (error) {
        return h.response({
            status: 'fail',
            error
        }).code(500);
    }
}

// update article
async function updateArticle(request, h) {
    try {
        let { title, content } = request.payload;
        const article = db.collection('articles').doc(request.params.id)
        const oldArticle = (await article.get()).data();

        if(title === undefined && content === undefined) {
            return h.response({
                status: 'fail',
                message: 'No data to update'
            }).code(400);
        }

        if(title === undefined) title = oldArticle.title;
        if(content === undefined) content = oldArticle.content;

        if(!article) {
            return h.response({
                status: 'fail',
                message: 'Article not found'
            }).code(404);
        }

        let newArticle = {
            title: title ?? oldArticle.title,
            content: content ?? oldArticle.content,
            updatedAt: new Date().toISOString()
        }
        await article.update(newArticle);

        newArticle = (await article.get()).data();
        return h.response({
            status: 'success',
            message: 'Article updated successfully',
            data: newArticle
        }).code(200);
    } catch (error) {
        return h.response({
            status: 'fail',
            error
        }).code(500);
    }
}

// delete article
async function deleteArticle(request, h) {
    try {
        const article = db.collection('articles').doc(request.params.id)
        
        await article.delete();

        return h.response({
            status: 'success',
            message: 'Article deleted successfully'
        }).code(200);
    } catch (error) {
        return h.response({
            status: 'fail',
            error
        }).code(500);
    }
}



export default { getArticles, storeArticle, getArticleById, updateArticle, deleteArticle };