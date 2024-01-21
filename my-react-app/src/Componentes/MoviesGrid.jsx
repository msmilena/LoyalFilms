<<<<<<< HEAD
import { MovieCard } from "./MovieCard";
import styles from "./MoviesGrid.module.css";

export function MoviesGrid(props) {
  return (
    <ul className={styles.moviesGrid}>
      {props.movies.map(function(movie) {
        return <MovieCard key={movie.id}  movie={movie}/>;
=======
export function MoviesGrid(props) {
  return (
    <ul>
      {props.movies.map(function(movie) {
        return <li key={movie.id}>{movie.title}</li>;
>>>>>>> 7b2e4eb0ce6b96ce534091d11c8ee889952939e5
      })}
    </ul>
  );
}