import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import env from '../../../../lib/env';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loading from '../../../../public/gif/Cargando.gif';

export default function Company() {
  const { query } = useRouter();
  const { id } = query;
  const [company, setCompany] = useState<Company>();

  const fetchCompany = async (id) => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/companies/${id}`, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        console.log('Get company Successful');
        console.log(data.company);
        setCompany(data.company);
      }
    } catch {
      console.log('error while fetching company.');
    }
  };

  useEffect(() => {
    fetchCompany(id);
  }, [id]);

  return (
    <Layout title={'Empresa'}>
      {company ?
        <div className='flex flex-col'>
          <h1 className='mt-8 mb-8 text-2xl text-center font-nunito-sans text-cyan-q'>
          Información de {company.name.toUpperCase()}
          </h1>
          <table className='w-full text-left text-gray-500'>
            <thead className='text-base text-white uppercase font-nunito-bold bg-gray-700 border-b border-gray-900'>
              <tr>
                <th scope='col' className='py-3 px-10'>
                ID
                </th>
                <th scope='col' className='py-3 px-10'>
                Nombre
                </th>
                <th scope='col' className='py-3 px-6'>
                Correo
                </th>
                <th scope='col' className='py-3 px-6'>
                RUT
                </th>
                <th scope='col' className='py-3 px-6'>
                Número de Contacto
                </th>
                <th scope='col' className='py-3 px-6'>
                Ver Empleados
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-cyan-100 font-nunito-regular border-b border-gray-900 text-gray-700 text-base hover:bg-cyan-500 hover:text-white'>
                {company
                  ?
                  <>
                    <td className='py-4 px-10'>
                      {company.id}
                    </td>
                    <td className='py-4 px-10'>
                      {company.name}
                    </td>
                    <td className='py-4 px-6'>
                      {company.email}
                    </td>
                    <td className='py-4 px-6'>
                      {company.rut}
                    </td>
                    <td className='py-4 px-6'>
                      {company.phoneNumber}
                    </td>
                    <td className='py-4 px-6'>
                      <Link href={`/admin/companies/${company.id}/users`}>
                        <button
                          type='button'
                          className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                        >
                        Empleados
                        </button>
                      </Link>
                    </td>
                  </>
                  : <></>}
              </tr>
            </tbody>
          </table>
        </div>
        :<div>
        </div>}
    </Layout>
  );
}