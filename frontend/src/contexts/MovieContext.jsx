import { createContext, useState, useContext, useEffect, startTransition } from "react";

export const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites safely on mount — no ESLint warnings
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (!storedFavs) return;

        startTransition(() => {
            setFavorites(JSON.parse(storedFavs));
        });
    }, []);

    // Save updated favorites
    useEffect(() => {
        if (favorites.length >= 0) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

    // ✔ Prevent adding duplicates
    const addToFavorites = (movie) => {
        setFavorites((prev) => {
            if (prev.some((m) => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
