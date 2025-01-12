import { GetServerSideProps } from 'next';
import Layout from '@/components/Common/Layout';
import HeroBanner from '@/components/Common/HeroBanner';
import ContainerContent from '@/components/Common/ContentWrapper';
import SeriesDetail from '@/components/Common/SeriesDetails';

interface SeriesProps {
  serie: {
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

const SeriesPage: React.FC<SeriesProps> = ({ serie }) => {
  if (!serie) {
    return <div>Series not found!</div>;
  }

  return (
    <Layout>
      <ContainerContent>
        <HeroBanner id={serie._id} />
        <SeriesDetail title={serie.title} />
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

    const serie = await res.json();
    return { props: { serie } };
  } catch (error) {
    console.error('Error fetching series:', error);
    return { notFound: true };
  }
};

export default SeriesPage;
