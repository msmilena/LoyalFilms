import styles from "./MovieCard.module.css";

export function MovieCard(props) {
    const imageUrl = "https://image.tmdb.org/t/p/w342" + props.movie.poster_path;
  return (
    <li className={styles.movieCard}>
      <img
        width={230}
        height={345}
        className={styles.movieImage}
        src={imageUrl}
        alt={props.movie.title}
      />
      <h2>{props.movie.title}</h2>
    </li>
  );
}