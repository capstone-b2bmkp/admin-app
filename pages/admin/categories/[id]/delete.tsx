import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import env from '../../../../lib/env';
import { Formik, Field, type FormikConfig } from 'formik';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import { useAuth } from '../../../../hooks/useAuth';
import { useRouter } from 'next/router';
import Link from 'next/link';

const initialValues = {
  backUpCategoryId: 0,
};

export default function DeleteCategoryPage() {
  const { query } = useRouter();
  const router = useRouter();
  const { id } = query;
  const { apiUser } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async (id) => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/categories/array`, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        console.log('Get categories Successful');
        console.log(data.categories);
        setCategories(data.categories);
      }
    } catch {
      console.log('error while fetching categories.');
    }
  };

  const deleteCategory: FormikConfig<typeof initialValues>['onSubmit'] = async (backUpCategoryId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${apiUser.token}`,
      },
      body: JSON.stringify({ backUpCategoryId: backUpCategoryId }),
    };
    try {
      const response = await fetch(`${env.API_URL}/categories/${id}`, requestOptions);
      const data = await response.json();
      if (response.status == 200) {
        console.log('Category Deleted!!');
        router.push('/admin/categories');
      }
    } catch {
      console.log('error while deleting category.');
    }
  };

  // https://bobbyhadz.com/blog/react-disable-button
  const handleClick = event => {
    event.currentTarget.disabled = true;
    console.log('button clicked');
  };

  useEffect(() => {
    fetchCategories(id);
  }, [id]);

  return (
    <Layout title={'Categorías'}>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col px-20 my-4 w-1/2 py-10 bg-cyan-100 rounded-lg'>
          <h1 className='mb-4 text-center text-3xl font-nunito-sans text-gray-700'>Elimina una categoría</h1>
          <div className='flex flex-col justify-center items-center'>
            <Formik initialValues={initialValues} onSubmit={deleteCategory}>
              <Form labelClassName='block text-blue-900' inputClassName='rounded-full border-2 border-blue-900 block w-80 text-blue-800' errorClassName='text-red-700'>
                <div className="my-4">
                  <label className="text-gray-700 font-nunito-regular" htmlFor="category">Elige la categoría a la que quieres transferir los productos y empresas </label>
                  <div className='my-5'>
                    <Field className="block w-full text-base text-white font-nunito-regular bg-gray-800 rounded-lg border border-gray-800 focus:ring-blue-500 focus:border-blue-500" as="select" name="backUpCategoryId">
                      <option disabled value="">
                        (Selecciona una categoría)
                      </option>
                      {categories.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.id === Number(id)
                            ? item.name + ' (por eliminar)'
                            : item.name
                          }
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  <button type="submit" className="mt-5 w-40 rounded-lg p-2 text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800" onClick={handleClick}>
                    Eliminar categoría
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
};