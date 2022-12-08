import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import env from '../../../../lib/env';
import { useRouter } from 'next/router';

export default function User() {
  const { query } = useRouter();
  const { id } = query;
  const [user, setUser] = useState<User>();
  const [company, setCompany] = useState<Company>();
  const [isSeller, setSeller] = useState(false);
  const [isBuyer, setBuyer] = useState(false);

  const fetchUser = async (id) => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/users/${id}`, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        console.log('Get user Successful');
        setUser(data.user);
        setCompany(data.company);
        setSeller(data.seller);
        setBuyer(data.buyer);
      }
    } catch {
      console.log('error while fetching user.');
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  return (
    <Layout title={'Usuario'}>
      <div className='flex flex-col'>
        {user && company
          ?
          <h1 className='mt-8 mb-8 text-2xl text-center font-nunito-sans text-cyan-q'>
            {user.name} - {company.name}
          </h1>
          : <h1 className='mt-8 mb-8 text-2xl text-center font-nunito-sans text-cyan-q'>Administrador</h1>}

        <table className='w-full text-left text-gray-500'>
          <thead className='text-base text-white uppercase font-nunito-bold bg-gray-700 border-b border-gray-900'>
            <tr>
              <th scope='col' className='py-2 px-6'>
                ID
              </th>
              <th scope='col' className='py-2 px-6'>
                Correo
              </th>
              <th scope='col' className='py-2 px-10'>
                RUT
              </th>
              <th scope='col' className='py-2 px-6'>
                Cargo
              </th>
              <th scope='col' className='py-2 px-6'>
                Número de Contacto
              </th>
              <th scope='col' className='py-2 px-6'>
                Rol de Comprador
              </th>
              <th scope='col' className='py-2 px-6'>
                Rol de Vendedor
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-cyan-100 font-nunito-regular border-b border-gray-900 text-gray-700 text-base hover:bg-cyan-500 hover:text-white'>
              {user
                ?
                <>
                  <td className='py-2 px-6 text-sm'>
                    {user.id}
                  </td>
                  <td className='py-2 px-6 text-sm'>
                    {user.email}
                  </td>
                  <td className='py-2 px-4 text-sm'>
                    {user.rut}
                  </td>
                  <td className='py-2 px-6 text-sm'>
                    {user.position}
                  </td>
                  <td className='py-2 px-6 text-sm'>
                    {user.phoneNumber}
                  </td>
                  {isBuyer
                    ?
                    <td className='py-4 px-6 text-sm'>
                      Si
                    </td>
                    :
                    <td className='py-4 px-6 text-sm'>
                      No
                    </td>}
                  {isSeller
                    ?
                    <td className='py-4 px-6 text-sm'>
                      Si
                    </td>
                    :
                    <td className='py-4 px-6 text-sm'>
                      No
                    </td>}
                </>
                : <></>}
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}