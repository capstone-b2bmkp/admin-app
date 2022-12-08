import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import env from '../../../lib/env';
import { Formik, Field, type FormikConfig } from 'formik';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/router';
import { AiOutlineConsoleSql } from 'react-icons/ai';

const initialValues = {
  minimum: 0,
  maximum: 0,
  discount: 0.0
};

export default function CreateDiscountrulePage() {
  const { query } = useRouter();
  const router = useRouter();
  const { id } = query;
  const { apiUser } = useAuth();

  const createDiscountrule: FormikConfig<typeof initialValues>['onSubmit'] = async (discountrule) => {
    console.log('ENTREE A CREATE DISCOUNT FRONT:::');
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiUser.token}`,
      },
      body: JSON.stringify({ discountrule: discountrule }),
    };
    try {
      const response = await fetch(`${env.API_URL}/discountrules/`, requestOptions);
      const data = await response.json();
      if (response.status == 201) {
        console.log('Create discountrule Successfull');
        router.push('/admin/discountrules/');
      }
    } catch {
      console.log('Error in create discountrule');
    }
  };

  // https://bobbyhadz.com/blog/react-disable-button
  const handleClick = event => {
    event.currentTarget.disabled = true;
    console.log('button clicked');
  };

  return (
    <Layout title={'Regla de Descuento'}>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col bg-cyan-100 px-10 py-10 rounded-lg'>
          <h1 className='mt-8 mb-8 text-3xl text-center font-nunito-sans text-cyan-q'>Crea regla de descuento</h1>
          <div className='flex flex-col justify-center items-center'>
            <Formik initialValues={initialValues} onSubmit={createDiscountrule}>
              <Form labelClassName='block text-gray-700 font-nunito-regular' inputClassName='mb-4 rounded-full font-nunito-regular border-2 border-cyan-400 block w-80 text-gray-700' errorClassName='text-red-700'>
                <Input label='Mínimo' name='minimum' type='text'/>
                <Input label='Máximo' name='maximum' type='text'/>
                <Input label='Descuento' name='discount' type='text'/>
                <div className='flex flex-col justify-center items-center'>
                  <button type='submit' className='mt-5 w-40 rounded-lg p-2 text-white bg-gray-700 font-nunito-regular hover:bg-cyan-800'>
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