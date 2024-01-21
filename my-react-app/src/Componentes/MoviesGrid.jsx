import { MovieCard } from "./MovieCard";
import styles from "./MoviesGrid.module.css";

export function MoviesGrid(props) {
  return (
    <ul className={styles.moviesGrid}>
      {props.movies.map(function(movie) {
        return <MovieCard key={movie.id}  movie={movie}/>;
      })}
    </ul>
  );
}