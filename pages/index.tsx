import { useState, useEffect } from 'react';
import Head from 'next/head';
import env from '../lib/env';
import AuthNav from '../components/AuthNav';
import Footer from '../components/Footer';
import Image from 'next/image';
import Escudo from './../public/png/Escudo Admin.png';

export default function Home() {
  const [cart, setCart] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <>
      <Head>
        <title>{'Quoter'}</title>
        <meta name='description' content='Ecommerce Website' />
      </Head>
      <div>
        <div className='justify-end'>
          <AuthNav />
        </div>
        <div className='bg-gray-200 flex flex-col justify-center items-center'>
          <h1 className='mt-10 mb-2 text-4xl font-nunito-bold text-cyan-q'>
              Administración del portal Quoter
          </h1>
          <Image src={Escudo} width='658px' height='666px' quality={100} alt='Escudo admin'></Image>
        </div>
      </div>
      <footer className='shadow-inner'>
        <Footer></Footer>
      </footer>
    </>
  );
}
