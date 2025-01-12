import { GetServerSideProps } from 'next';
import Script from 'next/script';
import Layout from '@/components/Common/Layout';
import HeroBanner from '@/components/Common/HeroBanner';
import ContainerContent from '@/components/Common/ContentWrapper';
import GenreCarousel from '@/components/Common/GenreCarousel';

interface MovieProps {
  movie: {
    _id: string;
    title: string;
    genre: string;
    coverImage: string;
    backgroundImage: string;
    description: string;
    type: string;
    season?: number;
    episode?: number;
  };
}

const MoviePage: React.FC<MovieProps> = ({ movie }) => {
  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <Layout>
      <ContainerContent>
        <HeroBanner id={movie._id} />
        <p>Podobne</p>

        {/* Skrypt zewnętrzny */}
        <Script
          src="https://a.magsrv.com/ad-provider.js"
          strategy="lazyOnload"
          async
        />

        {/* Reklama */}
        <ins className="eas6a97888e37" data-zoneid="5515014"></ins>

        {/* Kod inicjujący AdProvider */}
        <Script
          id="ad-provider-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(AdProvider = window.AdProvider || []).push({"serve": {}});`,
          }}
        />

        <GenreCarousel genre={movie.genre} />
      </ContainerContent>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  // Dynamically determine API URL based on environment
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/media/${id}`);
    if (!res.ok) {
      return { notFound: true };
    }

    const movie = await res.json();
    return { props: { movie } };
  } catch (error) {
    console.error('Error fetching movie:', error);
    return { notFound: true };
  }
};

export default MoviePage;
