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
  name: '',
};

export default function EditCategoryPage() {
  const { query } = useRouter();
  const router = useRouter();
  const { id } = query;
  const { apiUser } = useAuth();
  const [category, setCategory] = useState<Category>();

  const fetchCategory = async (id) => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/categories/${id}`, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        console.log('Get categories Successful');
        console.log(data.category);
        setCategory(data.category);
      }
    } catch {
      console.log('error while fetching categories.');
    }
  };

  const updateCategory: FormikConfig<typeof initialValues>['onSubmit'] = async (updated_category) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiUser.token}`,
      },
      body: JSON.stringify({ id, name: updated_category.name }),
    };
    try {
      const response = await fetch(`${env.API_URL}/categories/${id}`, requestOptions);
      const data = await response.json();
      if (response.status == 201) {
        console.log('Update Category Successfull');
        router.push('/admin/categories/');
      }
    } catch {
      console.log('Error in update category');
    }
  };

  // https://bobbyhadz.com/blog/react-disable-button
  const handleClick = event => {
    event.currentTarget.disabled = true;
    console.log('button clicked');
  };

  useEffect(() => {
    fetchCategory(id);
  }, [id]);


  return (
    <Layout title={'Categorías'}>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col px-20 my-4 w-1/2 py-10 bg-cyan-100 rounded-lg'>
          <h1 className='mb-4 text-center text-3xl font-nunito-sans text-gray-700'>Editar categoría</h1>
          <div className='flex flex-col justify-center items-center'>
            <Formik initialValues={initialValues} onSubmit={updateCategory}>
              <Form labelClassName='block text-blue-900 text-gray-700 font-nunito-regular' inputClassName='rounded-full font-nunito-regular border-2 border-cyan-400 block w-80 text-gray-700' errorClassName='text-red-700'>
                <Input label='Nombre' name='name' type='text' placeholder={category ? category.name : ''} />
                <div className='flex flex-col justify-center items-center'>
                  <button type='submit' className='mt-5 w-40 rounded-lg p-2 text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800' onClick={handleClick}>
                    Actualizar
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