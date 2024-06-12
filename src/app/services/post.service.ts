import { Injectable } from '@angular/core';
import axios from 'axios';
import { properties } from '../properties/properties';

@Injectable({
    providedIn: 'root'
})

export class PostService {
    async getPosts() {
        return await axios.get(
            properties.API.BASE + properties.API.ENDPOINTS.GET_POSTS,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        )
    };

    async getPost(idPost: number) {
        return await axios.get(
            properties.API.BASE + properties.API.ENDPOINTS.GET_POST.replace('{idPost}', idPost.toString()),
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        )
    }

    async getPostsByTag(tag: any) {
        return await axios.get(
            properties.API.BASE + properties.API.ENDPOINTS.GET_POSTS_BY_TAG.replace('{tag}', tag.toString()),
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        )
    }
}