import ContainerContent from "@/components/Common/ContentWrapper";
import Layout from "@/components/Common/Layout";
import MediaGrid from "@/components/Common/MediaGrid";

const Movies: React.FC = () => {
  return (
    <Layout>
      <ContainerContent>
        <MediaGrid type="movie"/>
      </ContainerContent>
    </Layout>
  );
};

export default Movies;
