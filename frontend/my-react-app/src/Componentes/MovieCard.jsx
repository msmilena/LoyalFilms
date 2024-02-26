import "./MovieCard.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function MovieCard(props) {
  const imageUrl = "https://image.tmdb.org/t/p/w342" + props.movie.poster_path;
  const releaseYear = props.movie.release_date.split("-")[0];
  const puntaje = (props.movie.vote_average / 2).toFixed(1);
  const porcentaje = ((puntaje / 5) * 100).toFixed(1);
  return (
    <li className="movieCard">
      <img
        width={230}
        height={345}
        className="movieImage"
        src={imageUrl}
        alt={props.movie.title}
      />
      <div className="rating">
          <CircularProgressbar
            value={porcentaje}
            text={`${puntaje}`}
            background
            strokeWidth={15}
            styles={{
              path: {
                stroke: `rgba(34, 3, 255, ${porcentaje / 100})`,
                transition: "stroke-dashoffset 0.5s ease 0s",
              },
              trail: {
                stroke: "#140294",
              },
              text: {
                fill: "#FFFFFF",
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
              background: {
                fill: "#000000",
              },
            }}
          />
        </div>
      <div className="detalles">
        <p className="titulo">{props.movie.title}</p>
        <p className="year">{releaseYear}</p>

        
      </div>
    </li>
  );
}
