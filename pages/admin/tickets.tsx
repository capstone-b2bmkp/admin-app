import Layout from '../../components/Layout';
import { ImTicket } from 'react-icons/im';

export default function Overview() {
  return (
    <Layout title=''>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='mt-4 mb-8 text-3xl font-nunito-sans text-cyan-q'>
          Tickets
        </h1>
        <ImTicket color='#1f2937' size='300px'></ImTicket>
        <h1 className='mt-4 mb-8 text-lg font-nunito-regular text-gray-700'>En construcción...</h1>
      </div>
    </Layout>
  );
}