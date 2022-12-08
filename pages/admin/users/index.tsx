import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import env from '../../../lib/env';
import Link from 'next/link';
import PopUp from '../../../components/DeletePopUp';

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [actualID, setActualID] = useState('0');

  const handleClick = (id) => {
    setIsShown(current => !current);
    setActualID(id);
  };

  const fetchUsers = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/users/`, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        console.log('Get users Successful');
        console.log(data.data);
        setUsers(data.data);
      }
    } catch {
      console.log('error while fetching users.');
    }
  };

  const deleteUser = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/users/${id}`, requestOptions);
      const data = await response.json();
      if (response.status == 200) {
        console.log('deleted user Successfully');
        fetchUsers();
        setIsShown(current => !current);

      }
    } catch {
      console.log('error while deleting user.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout title={'Usuarios'}>
      <div className='top-1/2 left-1/3 absolute z-30'>
        {isShown && (<PopUp functionHandle={handleClick} functionDelete={() => deleteUser(actualID)}></PopUp>)}
      </div>
      <div className='flex flex-col'>
        <h1 className='mt-8 mb-8 text-3xl text-center font-nunito-sans text-cyan-q'>
          Usuarios registrados
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
              <th scope='col' className='py-3 px-10'>
                Información
              </th>
              <th scope='col' className='py-3 px-6'>
                Ver Compras
              </th>
              <th scope='col' className='py-3 px-10'>
                Ver Ventas
              </th>
              <th scope='col' className='py-3 px-6'>
                Eliminar
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
                  {user.name}
                </td>
                <td className='py-4 px-10'>
                  <Link href={`/admin/users/${user.id}/`}>
                    <button
                      type='button'
                      className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                    >
                      Información
                    </button>
                  </Link>
                </td>
                <td className='py-4 px-6'>
                  <Link href={`/admin/users/${user.id}/purchases`}>
                    <button
                      type='button'
                      className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                    >
                      Compras
                    </button>
                  </Link>
                </td>
                <td className='py-4 px-10'>
                  <Link href={`/admin/users/${user.id}/sales`}>
                    <button
                      type='button'
                      className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                    >
                      Ventas
                    </button>
                  </Link>
                </td>
                <td className='py-4 px-6'>
                  <button
                    type='button'
                    onClick={() => handleClick(user.id)}
                    className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-500 font-nunito-regular hover:bg-cyan-800'
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