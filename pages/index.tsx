import GenreCarousel from "@/components/Common/GenreCarousel";
import Layout from "@/components/Common/Layout";
import HeroBanner from "@/components/Common/HeroBanner";

const Home: React.FC = () => {
  return (
    <Layout>
        <HeroBanner/>
        <GenreCarousel sortByPopularity={true} type="movie" limit={10} />
        <GenreCarousel sortByPopularity={true} type="serie" limit={10} />
        <GenreCarousel genre="Horror" />
        <GenreCarousel genre="Dramat" />
    </Layout>
  );
};

export default Home;
