import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_BASE_URL} from "../shared/constants";
import {User} from "../model/dto/user";
import {UserCredential} from "../model/dto/user-credential";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    insert(user: User): Observable<User> {
        return this.httpClient.post<User>(API_BASE_URL + '/users', user);
    }

    login(userCredential: UserCredential): Observable<boolean> {
        return this.httpClient.post<boolean>(API_BASE_URL + '/users/login', userCredential);
    }

}
