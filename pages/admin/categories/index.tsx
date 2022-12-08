import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import env from '../../../lib/env';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';

export default function IndexCategories() {
  const { apiUser } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/categories/`, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        console.log('Get categories Successful');
        console.log(data.category.subCategories);
        setCategories(data.category.subCategories);
      }
    } catch {
      console.log('error while fetching categories.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout title={'Categorías'}>
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <h1 className='mt-8 mb-8 text-3xl text-center font-nunito-sans text-cyan-q'>
            Categorías
          </h1>
          <Link href='/admin/categories/new'>
            <button
              type='button'
              className='mb-8 px-5 py-1 w-60 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
            >
              Crear nueva categoría
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
                Nombre
              </th>
              <th scope='col' className='py-3 px-10'>
                Categoría Padre [ID]
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
            {categories.map((category) => (
              <tr key={category.id} className='bg-cyan-100 font-nunito-regular border-b border-gray-900 text-gray-700 text-base hover:bg-cyan-500 hover:text-white'>
                <td className='py-4 px-10'>
                  {category.id}
                </td>
                <td className='py-4 px-10'>
                  {category.name}
                </td>
                <td className='py-4 px-10'>
                  {category.parentId}
                </td>
                <td className='py-4 px-6'>
                  <Link href={`/admin/categories/${category.id}/edit`}>
                    <button
                      type='button'
                      className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                    >
                      Editar
                    </button>
                  </Link>
                </td>
                {category.subCategories.length === 0
                  ?
                  <td className='py-4 px-6'>
                    <Link href={`/admin/categories/${category.id}/delete`}>
                      <button
                        type='button'
                        className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-500 font-nunito-regular hover:bg-cyan-800'
                      >
                        Eliminar
                      </button>
                    </Link>
                  </td>
                  :
                  <td className='py-4 px-6'>
                    <Link href={`/admin/categories/${category.id}/`}>
                      <button
                        type='button'
                        className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                      >
                        Ver subcategorías
                      </button>
                    </Link>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}