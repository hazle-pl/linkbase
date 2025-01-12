import { GetServerSideProps } from 'next';
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
        Podobne 
        <GenreCarousel genre={movie.genre}/>
      </ContainerContent>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const res = await fetch(`http://localhost:3000/api/media/${id}`);
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
