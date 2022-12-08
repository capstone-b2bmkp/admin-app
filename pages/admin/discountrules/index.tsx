import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import env from '../../../lib/env';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';
import PopUp from '../../../components/DeletePopUp';

export default function IndexDiscountrules() {
  const { apiUser } = useAuth();
  const [discountrules, setDiscountrules] = useState<Discountrule[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [actualID, setActualID] = useState('0');

  const handleClick = (id) => {
    setIsShown(current => !current);
    setActualID(id);
  };

  const fetchDiscountrules = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/discountrules/`, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        console.log('Get discountrules Successful');
        console.log(data.discountrules);
        setDiscountrules(data.discountrules);
      }
    } catch {
      console.log('error while fetching discountrules.');
    }
  };

  const deleteDiscountrule = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${apiUser.token}`,
      },
    };
    try {
      const response = await fetch(`${env.API_URL}/discountrules/${id}`, requestOptions);
      const data = await response.json();
      if (response.status == 200) {
        console.log('deleted discountrule Successfully');
        fetchDiscountrules();
        setIsShown(current => !current);
      }
    } catch {
      console.log('error while deleting discountrule.');
    }
  };

  useEffect(() => {
    fetchDiscountrules();
  }, []);

  return (
    <Layout title={'Categorías'}>
      <div className='top-1/2 left-1/3 absolute z-30'>
        {isShown && (<PopUp functionHandle={handleClick} functionDelete={() => deleteDiscountrule(actualID)}></PopUp>)}
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <h1 className='mt-8 mb-8 text-3xl text-center font-nunito-sans text-cyan-q'>
            Reglas de descuento
          </h1>
          <Link href='/admin/discountrules/new'>
            <button
              type='button'
              className='mb-8 px-5 py-1 w-60 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
            >
              Crear regla de descuento
            </button>
          </Link>
        </div>
        <table className='w-full text-left text-gray-500'>
          <thead className='text-base text-white uppercase font-nunito-bold bg-gray-700 border-b border-gray-900'>
            <tr>
              <th scope='col' className='py-3 px-10'>
                ID
              </th>
              <th scope='col' className='py-3 px-10'>
                Mínimo
              </th>
              <th scope='col' className='py-3 px-10'>
                Máximo
              </th>
              <th scope='col' className='py-3 px-10'>
                Descuento
              </th>
              <th scope='col' className='py-3 px-6'>
                Editar
              </th>
              <th scope='col' className='py-3 px-6'>
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {discountrules.map((discountrule) => (
              <tr key={discountrule.id} className='bg-cyan-100 font-nunito-regular border-b border-gray-900 text-gray-700 text-base hover:bg-cyan-500 hover:text-white'>
                <td className='py-4 px-10'>
                  {discountrule.id}
                </td>
                <td className='py-4 px-10'>
                  {discountrule.minimum}
                </td>
                <td className='py-4 px-10'>
                  {discountrule.maximum}
                </td>
                <td className='py-4 px-10'>
                  {discountrule.discount}
                </td>
                <td className='py-4 px-6'>
                  <Link href={`/admin/discountrules/${discountrule.id}/edit`}>
                    <button
                      type='button'
                      className='mt-1 w-40 rounded-lg p-2 text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                    >
                      Editar
                    </button>
                  </Link>
                </td>
                <td className='py-4 px-6'>
                  <button
                    type='button'
                    onClick={() => handleClick(discountrule.id)}
                    className='mt-1 w-40 rounded-lg p-2 text-white bg-gray-500 font-nunito-regular hover:bg-cyan-800'
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}