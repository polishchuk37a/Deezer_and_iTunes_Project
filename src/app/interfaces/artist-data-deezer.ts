export interface ArtistDataDeezer {
  data:{
    title: string
    artist:{
      name: string
    }
    album:{
      id: number,
      title: string,
      cover: string,
    }
    link: string
  }[]
}