import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  vastTagUrl: string;
  onAdFinished?: () => void;
  redirectUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ vastTagUrl, onAdFinished, redirectUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadAd = async () => {
      try {
        const response = await fetch(vastTagUrl);
        const vastXml = await response.text();
        const parser = new DOMParser();
        const vastDocument = parser.parseFromString(vastXml, "application/xml");

        const mediaFile = vastDocument.querySelector("MediaFile");
        const adUrl = mediaFile?.textContent?.trim();

        if (adUrl && videoRef.current) {
          const video = videoRef.current;
          video.src = adUrl;
          video.play();
          video.onended = () => {
            if (onAdFinished) {
              onAdFinished();
            }
            window.open(redirectUrl, '_blank');
          };
        } else {
          console.error("Brak prawidłowego URL-a reklamy w VAST");
        }
      } catch (error) {
        console.error("Błąd podczas ładowania reklamy VAST:", error);
      }
    };

    loadAd();
  }, [vastTagUrl, onAdFinished, redirectUrl]);

  return (
    <div className="commercial">
      <h2>Po obejrzeniu reklamy zostaniesz automatycznie przeniesiony</h2>
      <video ref={videoRef} controls style={{ width: "100%" }}>
        Przeglądarka nie obsługuje elementu wideo.
      </video>
    </div>
  );
};

export default VideoPlayer;
