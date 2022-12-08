import Head from 'next/head';
import React, { useContext } from 'react';
import Footer from './Footer';
import AuthNav from './AuthNav';
import Link from 'next/link';
import { VscGraph } from 'react-icons/vsc';
import { BsBoxSeam, BsSliders, BsReceiptCutoff, BsCardChecklist } from 'react-icons/bs';
import { RiFileInfoLine, RiAdminLine } from 'react-icons/ri';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BiStore } from 'react-icons/bi';
import { useRouter } from 'next/router';

export default function Layout({ title, children }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title ? title + ' - Quoter' : 'Quoter'}</title>
        <meta name='description' content='Ecommerce Website' />
      </Head>

      <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <div>
            <AuthNav />
          </div>
        </header>
        <div className='bg-cyan-500 p-2 h-10'>
          <Link href='/admin'>
            <div className='flex justify-center'>
              <RiAdminLine color='#ffffff' size='25px'></RiAdminLine>
              <h1 className='ml-2 text-white font-nunito-regular text-lg font-semibold cursor-pointer'>
                Panel del administrador
              </h1>
            </div>
          </Link>
        </div>

        <div className='ml-5 mr-20 my-2 flex gap-1'>
          <div className='my-4 w-1/4 bg-cyan-100 rounded'>
            <div className='mt-3 ml-3 p-2 text-left flex justify-beetween hover:bg-sky-300'>
              <VscGraph color='#2FC4ED' size='32px'></VscGraph>
              <h1 className='ml-3 text-2xl font-light text-cyan-q hover:text-white font-nunito-regular'>
                <Link href='/admin/overview'>
                  <a>
                    Resumen
                  </a>
                </Link>
              </h1>
            </div>

            <div className='mt-3 ml-3 p-2 text-left flex justify-beetween hover:bg-sky-300'>
              <BiStore color='#1f2937' size='32px'></BiStore>
              <h1 className='ml-3 text-2xl font-light text-gray-700 font-nunito-regular hover:text-cyan-100'>
                <Link href='/admin/companies'>
                  <a>
                    Empresas
                  </a>
                </Link>
              </h1>
            </div>

            <div className='mt-3 ml-3 p-2 text-left flex justify-beetween hover:bg-sky-300'>
              <HiOutlineUserGroup
                color='#1f2937'
                size='32px'
              ></HiOutlineUserGroup>
              <h1 className='ml-3 text-2xl font-light text-gray-700 font-nunito-regular hover:text-cyan-100'><Link href='/admin/users'>Usuarios</Link></h1>
            </div>

            <div className='mt-3 ml-3 p-2 text-left flex justify-beetween hover:bg-sky-300'>
              <RiFileInfoLine color='#1f2937' size='32px'></RiFileInfoLine>
              <h1 className='ml-3 text-2xl font-light text-gray-700 font-nunito-regular hover:text-cyan-100'>
                <Link href='/admin/categories'>Categorías</Link>
              </h1>
            </div>

            <div className='mt-3 ml-3 p-2 text-left flex justify-beetween hover:bg-sky-300'>
              <BsBoxSeam color='#1f2937' size='32px'></BsBoxSeam>
              <h1 className='ml-3 text-2xl font-light text-gray-700 font-nunito-regular hover:text-cyan-100'>
                <Link href='/admin/products'>Productos</Link>
              </h1>
            </div>

            <div className='mt-3 ml-3 p-2 text-left flex justify-beetween hover:bg-sky-300'>
              <BsCardChecklist color='#2FC4ED' size='32px'></BsCardChecklist>
              <h1 className='ml-3 text-2xl font-light text-cyan-q hover:text-white font-nunito-regular'>
                <Link href='/admin/tickets'>Tickets</Link>
              </h1>
            </div>

            <div className='mt-3 ml-3 p-2 text-left flex justify-beetween hover:bg-sky-300'>
              <BsReceiptCutoff color='#2FC4ED' size='32px'></BsReceiptCutoff>
              <h1 className='ml-3 text-2xl font-light text-cyan-q hover:text-white font-nunito-regular'>
                <Link href='/admin/invoices'>Facturas</Link>
              </h1>
            </div>

            <div className='mt-3 mb-3 ml-3 p-2 text-left flex justify-beetween hover:bg-sky-300'>
              <BsSliders color='#1f2937' size='32px'></BsSliders>
              <h1 className='ml-3 text-2xl font-light text-gray-700 font-nunito-regular hover:text-cyan-100'>
                <Link href='/admin/discountrules'>Reglas de descuento</Link>
              </h1>
            </div>
          </div>
          <div className='my-4 ml-5 w-3/4'>
            <button
              className='px-5 py-1 w-30 h-8 text-base font-nunito-regular bg-gray-700 rounded-lg text-white hover:bg-cyan-800'
              onClick={() => router.back()}
            >
              Volver
            </button>
            <main>{children}</main>
          </div>
        </div>
        <footer className='shadow-inner'>
          <Footer></Footer>
        </footer>
      </div>
    </>
  );
}
