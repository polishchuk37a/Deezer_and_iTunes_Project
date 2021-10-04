import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeezerService } from "../services/deezer.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ArtistDataDeezer } from "../interfaces/artist-data-deezer";
import { ITunesService } from "../services/i-tunes.service";
import { forkJoin, Subject } from "rxjs";
import { DataITunes } from "../interfaces/data-itunes";
import { takeUntil } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})

export class ArtistsComponent implements OnInit, OnDestroy  {

  destroy = new Subject();

  form: FormGroup;
  artistDeezer: ArtistDataDeezer["data"] = [];
  artistITunes: DataITunes["results"] = [];

  constructor(private readonly deezerService: DeezerService, private readonly iTunesService: ITunesService, private formBuilder: FormBuilder,private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      artistName: ['']
    })
  }

  ngOnInit(): void {}

  getArtistAlbumFromDeezer(name: string){
    let deezer$ = this.deezerService.getAlbumFromDeezer(name);
    let iTunes$ = this.iTunesService.getAlbumFromITunes(name);

    forkJoin([deezer$, iTunes$])
        .pipe(takeUntil(this.destroy))
        .subscribe(([deezer, itunes]) =>{
          this.artistDeezer = deezer.data;
          this.artistITunes = itunes.results;
        })
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

}
