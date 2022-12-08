import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import env from '../../../lib/env';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';
import Loading from '../../../components/Loading';
import PopUp from '../../../components/DeletePopUp';

export default function AdminCompanies() {
  const { apiUser } = useAuth();
  const [validatedCompanies, setValidatedCompanies] = useState<Company[]>([]);
  const [pending, setPending] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [actualID, setActualID] = useState('0');

  const handleClick = (id) => {
    setIsShown(current => !current);
    setActualID(id);
  };

  const fetchValidatedCompanies = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/validatedcompanies/`, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        console.log('Get validated companies Successful');
        console.log(data.validatedcompanies);
        setValidatedCompanies(data.validatedcompanies);
        for (let i = 0; i < data.validatedcompanies.length; i++){
          if (data.validatedcompanies[i][1] === false){
            setPending(true);
            break;
          }
        }
      }
      console.log(pending);
    } catch {
      console.log('error while fetching validated companies.');
    }
  };

  const validateCompany = async (id) => {
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/validatedcompanies/${id}`, requestOptions);
      const data = await response.json();
      if (response.status == 200) {
        console.log('updated validated company Successfully');
        setPending(false);
        fetchValidatedCompanies();
      }
    } catch {
      console.log('error while updating validated company code.');
    }
  };

  const deleteCompany = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${apiUser.token}`,
      },
    };
    try {
      const response = await fetch(`${env.API_URL}/companies/${id}`, requestOptions);
      const data = await response.json();
      if (response.status == 200) {
        console.log('deleted company Successfully');
        setPending(false);
        fetchValidatedCompanies();
        setIsShown(current => !current);
      }
    } catch {
      console.log('error while deleting company code.');
    }
  };

  /*eslint-disable */
  useEffect(() => {
    fetchValidatedCompanies();
  }, []);
  /*eslint-enable */

  return (
    <Layout title={'Empresas'}>
      <div className='top-1/2 left-1/3 absolute z-30'>
        {isShown && (<PopUp functionHandle={handleClick} functionDelete={() => deleteCompany(actualID)}></PopUp>)}
      </div>
      <div className='flex flex-col'>
        { validatedCompanies.length > 0 ?
          (<div>
            <h1 className='mt-8 mb-8 text-3xl text-center font-nunito-sans text-cyan-q'>
              Empresas registradas
            </h1>
            <table className='w-full text-left'>
              <thead className='text-base text-white uppercase font-nunito-bold bg-gray-700 border-b border-gray-900'>
                <tr>
                  <th scope='col' className='py-3 px-10'>
                    ID
                  </th>
                  <th scope='col' className='py-3 px-10'>
                    Nombre
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Ver información
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Ver productos
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Ver compras
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Ver ventas
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Eliminar
                  </th>
                </tr>
              </thead>
              <tbody>
                {validatedCompanies.map((company) => (
                  <tr key={company.id} className='bg-cyan-100 font-nunito-regular border-b border-gray-900 text-gray-700 text-base hover:bg-cyan-500 hover:text-white'>
                    {company[1]
                      ?
                      <>
                        <td className='py-4 px-10'>
                          {company[0].id}
                        </td>
                        <td className='py-4 px-10'>
                          {company[0].name}
                        </td>
                        <td className='py-4 px-6'>
                          <Link href={`/admin/companies/${company[0].id}/`}>
                            <button
                              type='button'
                              className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                            >
                            Información
                            </button>
                          </Link>
                        </td>
                        <td className='py-4 px-6'>
                          <Link href={`/admin/companies/${company[0].id}/products`}>
                            <button
                              type='button'
                              className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                            >
                            Productos
                            </button>
                          </Link>
                        </td>
                        <td className='py-4 px-6'>
                          <Link href={`/admin/companies/${company[0].id}/purchases`}>
                            <button
                              type='button'
                              className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                            >
                            Compras
                            </button>
                          </Link>
                        </td>
                        <td className='py-4 px-6'>
                          <Link href={`/admin/companies/${company[0].id}/sales`}>
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
                            onClick={() => handleClick(company[0].id)}
                            className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-500 font-nunito-regular hover:bg-cyan-800'
                          >
                          Eliminar
                          </button>
                        </td>
                      </>
                      : <></>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)
          :(
            <div>
              <h1 className='mt-8 mb-8 text-3xl text-center font-nunito-sans text-cyan-q'>
                Empresas registradas
              </h1>
              <Loading></Loading>
            </div>
          )}

        {pending ?
          <div>
            <h1 className='mt-8 mb-4 text-2xl font-nunito-sans text-cyan-q'>
            Validaciones pendientes
            </h1>
            <table className='w-full text-left text-gray-500'>
              <thead className='text-base text-white uppercase font-nunito-bold bg-gray-700 border-b border-gray-900'>
                <tr>
                  <th scope='col' className='py-3 px-10'>
                  Nombre
                  </th>
                  <th scope='col' className='py-3 px-10'>
                  Email
                  </th>
                  <th scope='col' className='py-3 px-6'>
                  Validar
                  </th>
                  <th scope='col' className='py-3 px-6'>
                  Eliminar
                  </th>
                </tr>
              </thead>
              <tbody>
                {validatedCompanies.map((validatedCompany) => (
                  <tr key={validatedCompany.id} className='bg-cyan-100 font-nunito-regular border-b border-gray-900 text-gray-700 text-base hover:bg-cyan-500 hover:text-white'>
                    {!validatedCompany[1]
                      ?
                      <>
                        <td className='py-4 px-10'>
                          {validatedCompany[0].name}
                        </td>
                        <td className='py-4 px-10'>
                          {validatedCompany[0].email}
                        </td>
                        <td className='py-4 px-6'>
                          <button
                            type='button'
                            onClick={() => validateCompany(validatedCompany[0].id)}
                            className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                          >
                          Validar
                          </button>
                        </td>
                        <td className='py-4 px-6'>
                          <button
                            type='button'
                            onClick={() => handleClick(validatedCompany[0].id)}
                            className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-500 font-nunito-regular hover:bg-cyan-800'
                          >
                          Eliminar
                          </button>
                        </td>
                      </>
                      : <></>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          :(
            <div>
              <h1 className='mt-8 mb-4 text-2xl font-nunito-sans text-cyan-q'>
            Validaciones pendientes
              </h1>
              <h1 className='mt-2 mb-4 text-lg font-nunito-regular text-gray-700'>
            Sin validaciones pendientes
              </h1>
            </div>
          )}
      </div>
    </Layout>
  );
}