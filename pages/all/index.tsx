import ContainerContent from "@/components/Common/ContentWrapper";
import Layout from "@/components/Common/Layout";
import MediaGrid from "@/components/Common/MediaGrid";

const All: React.FC = () => {
  return (
    <Layout>
      <ContainerContent>
        <MediaGrid type="all"/>
      </ContainerContent>
    </Layout>
  );
};

export default All;
