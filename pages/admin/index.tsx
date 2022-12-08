import { RiAdminFill } from 'react-icons/ri';
import Layout from '../../components/Layout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Admin() {
  return (
    <Layout title=''>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='mt-4 mb-8 text-3xl font-nunito-sans text-cyan-q'>
          Bienvenido al panel del administrador
        </h1>
        <RiAdminFill color='#1f2937' size='400px'></RiAdminFill>
        <h1 className='mt-4 mb-8 text-lg font-nunito-regular text-gray-700'>
          Haga click en el panel para ver información útil
        </h1>
      </div>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
