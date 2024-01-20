export function MoviesGrid(props) {
  return (
    <ul>
      {props.movies.map(function(movie) {
        return <li key={movie.id}>{movie.title}</li>;
      })}
    </ul>
  );
}