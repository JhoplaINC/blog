import { Injectable } from '@angular/core';
import axios from 'axios';
import { properties } from '../properties/properties';

@Injectable({
    providedIn: 'root'
})

export class PostService {
    async getPosts() {
        return await axios.get(
            properties.API.BASE + properties.API.ENDPOINTS.POSTS,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        )
    };

    async getPost(idPost: number) {
        return await axios.get(
            properties.API.BASE + properties.API.ENDPOINTS.POST.replace('{idPost}', idPost.toString()),
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        )
    }
}