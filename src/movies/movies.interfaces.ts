export interface IMovieParamsRequest {
  id: string
}

export interface IMovie {
  __id: string
  title: string
  description: string
  releaseDate: Date
  genre: string[]
}
