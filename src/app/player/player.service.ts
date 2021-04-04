import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class PlayerService {
    constructor(private http: HttpClient) {}

    getStatus = () => {
        return this.http.get("https://server2.ejeserver.com:2199/rpc/areitoradio/streaminfo.get");
    };
}
