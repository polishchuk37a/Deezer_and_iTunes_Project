import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArtistDataDeezer} from "../interfaces/artist-data-deezer";
import {AlbumDataDeezer} from "../interfaces/album-data-deezer";

@Injectable({
  providedIn: 'root'
})
export class DeezerService {
  apiArtist = "https://api.deezer.com/search/?q=artist:";
  apiAlbum = "https://api.deezer.com/album/";

  constructor(private readonly http: HttpClient) { }

  getAlbumFromDeezer(nameArtist: string):Observable<ArtistDataDeezer>{
    const url = `${this.apiArtist}"${nameArtist}"&output=jsonp`;
    return this.http.jsonp<ArtistDataDeezer>(url, 'callback');
  }

  getInfoAboutAlbumDeezer(albumId: number):Observable<AlbumDataDeezer>{
    const url = `${this.apiAlbum}${albumId}&output=jsonp`;
    return this.http.jsonp<AlbumDataDeezer>(url, 'callback');
  }
}
