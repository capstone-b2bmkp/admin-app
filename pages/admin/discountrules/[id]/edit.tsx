import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import env from '../../../../lib/env';
import { Formik, Field, type FormikConfig } from 'formik';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import { useAuth } from '../../../../hooks/useAuth';
import { useRouter } from 'next/router';

const initialValues = {
  minimum: '',
  maximum: '',
  discount: ''
};

export default function EditDiscountrulePage() {
  const { query } = useRouter();
  const router = useRouter();
  const { id } = query;
  const { apiUser } = useAuth();
  const [discountrule, setDiscountrule] = useState<Discountrule>();

  const fetchDiscountrule = async (id) => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(`${env.API_URL}/discountrules/${id}`, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        console.log('Get discountrule Successful');
        console.log(data.discountrule);
        setDiscountrule(data.discountrule);
      }
    } catch {
      console.log('error while fetching discountrule.');
    }
  };

  const updateDiscountrule: FormikConfig<typeof initialValues>['onSubmit'] = async (updatedDiscountrule) => {
    console.log('HOOLAA::::');
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiUser.token}`,
      },
      body: JSON.stringify({ updatedDiscountrule }),
    };
    try {
      const response = await fetch(`${env.API_URL}/discountrules/${id}`, requestOptions);
      const data = await response.json();
      if (response.status == 200) {
        console.log('Update Discountrule Successfull');
        router.push('/admin/discountrules/');
      }
    } catch {
      console.log('Error in update discountrule');
    }
  };

  // https://bobbyhadz.com/blog/react-disable-button
  const handleClick = event => {
    event.currentTarget.disabled = true;
    console.log('button clicked');
  };

  useEffect(() => {
    fetchDiscountrule(id);
  }, [id]);


  return (
    <Layout title={'Regla de Descuento'}>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col bg-cyan-100 px-10 py-10 rounded-lg'>
          <h1 className='mt-4 mb-8 text-3xl text-center font-nunito-sans text-cyan-q'>Editar regla de descuento</h1>
          <div className='flex flex-col justify-center items-center'>
            <Formik initialValues={initialValues} onSubmit={updateDiscountrule}>
              <Form labelClassName='block text-gray-700 font-nunito-regular' inputClassName='mb-4 rounded-full font-nunito-regular border-2 border-cyan-400 block w-80 text-gray-700' errorClassName='text-red-700'>
                <Input label='Mínimo' name='minimum' type='text' placeholder={discountrule ? discountrule.minimum.toString() : ''} />
                <Input label='Máximo' name='maximum' type='text' placeholder={discountrule ? discountrule.maximum.toString() : ''} />
                <Input label='Descuento' name='discount' type='text' placeholder={discountrule ? discountrule.discount : ''} />
                <div className='flex flex-col justify-center items-center'>
                  <button type='submit' className='mt-5 w-40 rounded-lg p-2 text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'>
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