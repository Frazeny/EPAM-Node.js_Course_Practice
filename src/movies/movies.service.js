import BadRequest from '../errors/bad-request.js';

class MoviesService {
  constructor() {
    this.movies = [
      {
        __id: '1',
        title: 'Barbie',
        description: 'She\'s everything. He\'s just Ken. The reaction of most of the men who watched was as follows: "It\'s literally me, Ryan Gosling."',
        releaseDate: new Date(2023, 6, 9),
        genre: ['Fantasy', 'Adventures', 'Comedies', 'Melodramas'],
      },
      {
        __id: '2',
        title: 'Berserk',
        description: 'The world of the Middle Ages, brutal and bloody battles, lavish balls, noble intrigue.',
        releaseDate: new Date(1997, 9, 17),
        genre: ['Adventures', 'Action', 'Fantasy', 'Dramas'],
      },
    ];
  }

  getAllMovies() {
    return new Promise((resolve) => {
      // Simulate an asynchronous operation, e.g., fetching movies from a db.
      setTimeout(() => {
        const response = this.movies;
        resolve(response);
      }, 1000);
    });
  }

  async getMovie(id) {
    if (!id) {
      throw new BadRequest('id is not specified');
    }
    const result = this.movies.find((movie) => movie.__id === id);
    if (!result) {
      throw new BadRequest(`Movie with id:${id} was not found :(`);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 1000);
    });
  }
}

export default new MoviesService();
