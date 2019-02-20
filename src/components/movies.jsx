import React, {Component} from "react";
// import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup"
import Pagination from "./common/pagination";
import Like from "./common/like";
import {getMovies} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import {paginate} from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: {path: 'title', order: 'asc'}
    };

    componentDidMount() {
        const genres = [{_id: '', name: "All Genres"}, ...getGenres()];
        this.setState({movies: getMovies(), genres: genres});
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };

    handlePageChange = (page) => {
        this.setState({currentPage: page})
    };

    handleGenreSelect = (genre) => {
        this.setState({selectedGenre: genre, currentPage: 1});
    };

    handleSort = (path) => {
        const sortColumn = { ...this.state.sortColumn };
        if (sortColumn.path === path)
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        this.setState({sortColumn})
    };

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, sortColumn, selectedGenre, movies: allMovies} = this.state;

        if (count === 0)
            return <p>There are no movies in the database.</p>;

        const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <p>Showing {filtered.length} movies in the database.</p>
                    {/*<MoviesTable*/}
                        {/*movies={movies}*/}
                        {/*onLike={this.handleLike}*/}
                        {/*onDelete={this.handleDelete}*/}
                        {/*onSort={this.handleSort}*/}
                    {/*/>*/}
                    <table className="table">
                        <thead>
                        <tr>
                            <th onClick={() => this.handleSort('title')}>Title</th>
                            <th onClick={() => this.handleSort('genre.name')}>Genre</th>
                            <th onClick={() => this.handleSort('numberInStock')}>Stock</th>
                            <th onClick={() => this.handleSort('dailyRentalRate')}>Rate</th>
                        </tr>
                        </thead>
                        <tbody>
                        {movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like
                                        liked={movie.liked}
                                        onClick={() => this.handleLike(movie)}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        )
    }

}

export default Movies;