import { Component, OnInit } from '@angular/core';
import { ITunesService } from "../services/i-tunes.service";
import { DeezerService } from "../services/deezer.service";
import { AlbumDataDeezer} from "../interfaces/album-data-deezer";
import {map, tap} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})

export class AlbumComponent implements OnInit {

  albumDeezer: AlbumDataDeezer | null = null;

  constructor(private readonly deezerService: DeezerService, private readonly iTunesService: ITunesService, private formBuilder: FormBuilder,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAlbumDeezer();
  }

  getAlbumDeezer(){
    let id_deezer = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    this.deezerService.getInfoAboutAlbumDeezer(id_deezer).pipe(
        tap(item => this.albumDeezer = item)
    ).subscribe()
  }

}
