import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import env from '../../../lib/env';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';
import PopUp from '../../../components/DeletePopUp';

export default function CompanyProducts() {
  const { apiUser } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [actualID, setActualID] = useState('0');

  const handleClick = (id) => {
    setIsShown(current => !current);
    setActualID(id);
  };

  const fetchProducts = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/products`, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        console.log('Get products Successful');
        console.log(data.products);
        setProducts(data.products);
      }
    } catch {
      console.log('error while fetching products.');
    }
  };

  const deleteProduct = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${apiUser.token}`,
      },
    };
    try {
      const response = await fetch(`${env.API_URL}/products/${id}`, requestOptions);
      const data = await response.json();
      if (response.status == 200) {
        console.log('deleted product Successfully');
        setIsShown(current => !current);
        fetchProducts();
      }
    } catch {
      console.log('error while deleting product.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout title={'Productos'}>
      <div className='top-1/2 left-1/3 absolute z-30'>
        {isShown && (<PopUp functionHandle={handleClick} functionDelete={() => deleteProduct(actualID)}></PopUp>)}
      </div>
      <div className='flex flex-col'>
        <h1 className='mt-8 mb-8 text-3xl text-center font-nunito-sans text-cyan-q'>
          Productos
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
                Precio
              </th>
              <th scope='col' className='py-3 px-10'>
                Stock
              </th>
              <th scope='col' className='py-3 px-6'>
                Categor??a
              </th>
              <th scope='col' className='py-3 px-6'>
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className='bg-cyan-100 font-nunito-regular border-b border-gray-900 text-gray-700 text-base hover:bg-cyan-500 hover:text-white'>
                <td className='py-4 px-10'>
                  {product.id}
                </td>
                <td className='py-4 px-10'>
                  {product.name}
                </td>
                <td className='py-4 px-10'>
                  {product.currentPrice}
                </td>
                <td className='py-4 px-10'>
                  {product.currentAvailable}
                </td>
                <td className='py-4 px-6'>
                  <Link href={`/admin/categories/${product.categoryId}/`}>
                    <button
                      type='button'
                      className='mt-1 px-5 py-1 w-30 h-10 rounded-lg text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'
                    >
                      Ver categor??a
                    </button>
                  </Link>
                </td>
                <td className='py-4 px-6'>
                  <button
                    type='button'
                    onClick={() => handleClick(product.id)}
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