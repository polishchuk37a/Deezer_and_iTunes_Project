import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataITunes} from "../interfaces/data-itunes";

@Injectable({
  providedIn: 'root'
})
export class ITunesService {
  apiArtist = "https://itunes.apple.com/search?term=";

  constructor(private readonly http: HttpClient) { }

  getAlbumFromITunes(nameArtist: string):Observable<DataITunes>{
    const url = `${this.apiArtist}${nameArtist}&attribute=artistTerm`;
    return this.http.jsonp<DataITunes>(url, 'callback');
  }
}
