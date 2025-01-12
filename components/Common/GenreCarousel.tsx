import React, { useEffect, useRef, useState } from "react";

interface MediaItem {
  _id: string;
  title: string;
  genre: string;
  coverImage: string;
  description: string;
  type: string; // "series" | "movie"
  popularity: number;
  season?: number;
  episode?: number;
}

interface GenreCarouselProps {
  genre?: string;
  type?: string;
  sortByPopularity?: boolean;
  limit?: number;
}

const GenreCarousel: React.FC<GenreCarouselProps> = ({
  genre,
  type = "all",
  sortByPopularity = false,
  limit = 10,
}) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [itemsPerRow, setItemsPerRow] = useState(2); // Default for mobile screens
  const [currentPage, setCurrentPage] = useState(0);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [deltaX, setDeltaX] = useState<number>(0);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const query = new URLSearchParams({
          ...(genre ? { genre } : {}),
          ...(type && type !== "all" ? { type } : {}),
          limit: limit.toString(),
        }).toString();

        const response = await fetch(`/api/media/genre?${query}`);
        if (response.ok) {
          let data = await response.json();

          data = data.filter((item: MediaItem) => {
            if (item.type === "serie") {
              return item.season === 0 && item.episode === 0;
            }
            return true;
          });

          if (sortByPopularity) {
            data = data.sort((a: MediaItem, b: MediaItem) => b.popularity - a.popularity);
          }

          setMediaItems(data);
        } else {
          console.error("Failed to fetch media:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchMedia();
  }, [genre, type, sortByPopularity, limit]);

  useEffect(() => {
    const updateItemsPerRow = () => {
      const width = window.innerWidth;
      if (width <= 768) setItemsPerRow(2);
      else if (width <= 1400) setItemsPerRow(4);
      else if (width <= 1920) setItemsPerRow(6);
      else setItemsPerRow(8);
    };

    window.addEventListener("resize", updateItemsPerRow);
    updateItemsPerRow();

    return () => {
      window.removeEventListener("resize", updateItemsPerRow);
    };
  }, []);

  const maxPages = Math.max(mediaItems.length - itemsPerRow, 0);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, maxPages));
  };

  const calculateTranslateX = () => {
    const itemWidth = 100 / itemsPerRow;
    return currentPage * itemWidth;
  };

  // Touch Events for Swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setDeltaX(0); // Reset delta
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX !== null) {
      setDeltaX(e.touches[0].clientX - startX);
    }
  };

  const handleTouchEnd = () => {
    if (startX !== null) {
      if (deltaX > 50) handlePrev();
      else if (deltaX < -50) handleNext();
    }
    setStartX(null);
    setDeltaX(0);
  };

  return (
    <div className="container">
      <h2 className="title">
        {genre || sortByPopularity || type !== "all"
          ? `${genre || "All"} ${type !== "all" ? `(${type})` : ""}`
          : "Most Popular Media"}
      </h2>
      <div
        className="slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className="nav-button left" onClick={handlePrev} disabled={currentPage === 0}>
          <i className="fa-solid fa-arrow-left" />
        </button>
        <div className="slider-track-wrapper">
          <div
            ref={sliderTrackRef}
            className="slider-track"
            style={{
              transform: `translateX(-${calculateTranslateX()}%)`,
            }}
          >
            {mediaItems.map((item, index) => (
              <a
                href={`/${item.type}/${item._id}`}
                key={item._id}
                className={`grid-item ${index === currentPage ? "highlighted" : ""}`}
              >
                <div className="aspect-ratio">
                  <img src={item.coverImage} alt={item.title} className="image" />
                </div>
              </a>
            ))}
          </div>
        </div>
        <button
          className="nav-button right"
          onClick={handleNext}
          disabled={currentPage === maxPages}
        >
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default GenreCarousel;
