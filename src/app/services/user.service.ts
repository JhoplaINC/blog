import { Injectable } from '@angular/core';
import axios from 'axios';
import { properties } from '../properties/properties';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    async getUser(idUser: number) {
        return await axios.get(
            properties.API.BASE + properties.API.ENDPOINTS.GET_USER.replace('{idUser}', idUser.toString()),
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        )
    };
}