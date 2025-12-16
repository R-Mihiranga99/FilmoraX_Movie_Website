
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../MovieList/MovieDetails.css';

const API_KEY = "8fecb4316444cff1506fb5be4d47a694";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        setMovie(movieResponse.data);
        const trailerVideo = videosResponse.data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailer(trailerVideo ? trailerVideo.key : null);
        setError(null);
      } catch (err) {
        setError('Failed to load movie details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="movie-details-container"><p>Loading...</p></div>;

  if (error)
    return (
      <div className="movie-details-container" style={{ textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );

  if (!movie)
    return (
      <div className="movie-details-container" style={{ textAlign: 'center' }}>
        <p>Movie not found.</p>
      </div>
    );

  return (
    <div className="movie-details-container">
      <div className="movie-details-grid">
        <div className="movie-poster-card">
          <img
            className="movie-poster"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                : 'https://via.placeholder.com/200x300?text=No+Image'
            }
            alt={movie.title}
          />
        </div>
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-subtext">Release Date: {movie.release_date || 'N/A'}</p>
          <p className="movie-subtext">
            Rating: {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
          </p>
          <p className="movie-overview">{movie.overview || 'No overview available.'}</p>

          {trailer && (
            <div className="trailer-wrapper">
              <iframe
                className="trailer-iframe"
                title={`${movie.title} trailer`}
                src={`https://www.youtube.com/embed/${trailer}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <Link to="/" className="back-button">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
