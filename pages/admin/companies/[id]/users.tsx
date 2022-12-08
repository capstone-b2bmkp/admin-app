import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import env from '../../../../lib/env';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CompanyUsers() {
  const { query } = useRouter();
  const { id } = query;
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async (id) => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/companies/${id}/users`, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        console.log('Get users Successful');
        console.log(data.users);
        setUsers(data.users);
      }
    } catch {
      console.log('error while fetching users.');
    }
  };

  useEffect(() => {
    fetchUsers(id);
  }, [id]);

  return (
    <Layout title={'Usuarios'}>
      <div className='flex flex-col'>
        <h1 className='mt-8 mb-8 text-2xl text-center font-nunito-sans text-cyan-q'>
          Empleados
        </h1>

        <table className='w-full text-left text-gray-500'>
          <thead className='text-base text-white uppercase font-nunito-bold bg-gray-700 border-b border-gray-900'>
            <tr>
              <th scope='col' className='py-3 px-10'>
                ID
              </th>
              <th scope='col' className='py-3 px-10'>
                RUT
              </th>
              <th scope='col' className='py-3 px-10'>
                Nombre
              </th>
              <th scope='col' className='py-3 px-6'>
                Cargo
              </th>
              <th scope='col' className='py-3 px-6'>
                Ver Información
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='bg-cyan-100 font-nunito-regular border-b border-gray-900 text-gray-700 text-base hover:bg-cyan-500 hover:text-white'>
                <td className='py-4 px-10'>
                  {user.id}
                </td>
                <td className='py-4 px-10'>
                  {user.rut}
                </td>
                <td className='py-4 px-10'>
                  {user.name}
                </td>
                <td className='py-4 px-6'>
                  {user.position}
                </td>
                <td className='py-4 px-6'>
                  <Link href={`/admin/users/${user.id}/`}>
                    <button
                      type='button'
                      className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                    >
                      Información
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}