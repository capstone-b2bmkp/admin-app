import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import env from '../../../lib/env';
import { Formik, Field, type FormikConfig } from 'formik';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/router';

const initialValues = {
  name: '',
  parentId: 1,
};

export default function CreateCategoryPage() {
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

  const createCategory: FormikConfig<typeof initialValues>['onSubmit'] = async (category) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiUser.token}`,
      },
      body: JSON.stringify({ category: category }),
    };
    try {
      const response = await fetch(`${env.API_URL}/categories/`, requestOptions);
      const data = await response.json();
      if (response.status == 201) {
        console.log('Create Category Successfull');
        router.push('/admin/categories/');
      }
    } catch {
      console.log('Error in create category');
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
        <div className='flex flex-col bg-cyan-100 px-10 py-10 rounded-lg'>
          <h1 className='mb-4 text-center text-3xl font-nunito-sans text-gray-700'>Crear categoría</h1>
          <div className='flex flex-col justify-center items-center'>
            <Formik initialValues={initialValues} onSubmit={createCategory}>
              <Form labelClassName='block text-gray-700 font-nunito-regular' inputClassName='rounded-full font-nunito-regular border-2 border-cyan-400 block w-80 text-gray-700' errorClassName='text-red-700'>
                <Input label='Nombre' name='name' type='text'/>
                <div className='mt-5 mb-2'>
                  <label className="text-gray-700 font-nunito-regular" htmlFor="category">Elige la categoría padre</label>
                </div>
                <div className='my-2'>
                  <Field className="block w-full text-base text-white font-nunito-regular bg-gray-800 rounded-lg border border-gray-800 focus:ring-blue-500 focus:border-blue-500" as="select" name="parentId">
                    <option disabled value="">
                    (Selecciona una categoría)
                    </option>
                    <option value={1}>
                    (Categoría de Primer Nivel)
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
                <div className='flex flex-col justify-center items-center'>
                  <button type='submit' className='mt-5 w-40 rounded-lg p-2 text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800' onClick={handleClick}>
                  Crear
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