import Layout from '../../components/Layout';
import { BsFileEarmarkBarGraphFill } from 'react-icons/bs';

export default function Overview() {
  return (
    <Layout title=''>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='mt-4 mb-8 text-3xl font-nunito-sans text-cyan-q'>
          Resumen
        </h1>
        <BsFileEarmarkBarGraphFill color='#1f2937' size='300px'></BsFileEarmarkBarGraphFill>
        <h1 className='mt-4 mb-8 text-lg font-nunito-regular text-gray-700'>En construcción...</h1>
      </div>
    </Layout>
  );
}