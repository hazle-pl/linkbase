import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import Layout from '@/components/Common/Layout';
import ContainerContent from '@/components/Common/ContentWrapper';
import VideoPlayer from '@/components/Common/VideoPlayer';
import { useRouter } from 'next/router';

const Watch: React.FC = () => {
  const router = useRouter();
  const { videoLink } = router.query;

  // Dynamically load scripts when the component mounts
  useEffect(() => {
    // Load the first ad script
    const script1 = document.createElement('script');
    script1.src = 'https://a.magsrv.com/ad-provider.js';
    script1.async = true;
    script1.type = 'application/javascript';
    document.body.appendChild(script1);

    // Load the second ad script
    const script2 = document.createElement('script');
    script2.innerHTML = `(AdProvider = window.AdProvider || []).push({"serve": {}});`;
    document.body.appendChild(script2);

    // Load the third ad script
    const script3 = document.createElement('script');
    script3.src = 'https://js.wpnsrv.com/pn.php';
    script3.type = 'application/javascript';
    document.body.appendChild(script3);

    // Load the additional ad script
    const script4 = document.createElement('script');
    script4.src = 'https://a.pemsrv.com/ad-provider.js';
    script4.async = true;
    script4.type = 'application/javascript';
    document.body.appendChild(script4);

    // Load the additional ad script for the ins tag
    const script5 = document.createElement('script');
    script5.innerHTML = `(AdProvider = window.AdProvider || []).push({"serve": {}});`;
    document.body.appendChild(script5);

    // Cleanup by removing the scripts when the component unmounts
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
      document.body.removeChild(script4);
      document.body.removeChild(script5);
    };
  }, []);

  if (!videoLink) {
    return <div>No video link provided!</div>;
  }

  return (
    <Layout>
      <ContainerContent>
        <ins className="eas6a97888e6" data-zoneid="5515050"></ins>
        <ins className="eas6a97888e35" data-zoneid="5515052"></ins> 
        <VideoPlayer
          vastTagUrl="https://s.magsrv.com/v1/vast.php?idzone=5515016"
          redirectUrl={videoLink as string}
        />
      </ContainerContent>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

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

export default Watch;
