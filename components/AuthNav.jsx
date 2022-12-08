import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './../public/png/Logo Quoter.png';
import { CgSearchLoading } from 'react-icons/cg';
import { RiErrorWarningFill } from 'react-icons/ri';

export default function AuthNav() {
  const { user, error, isLoading } = useUser();
  const { handleLogin, logout, apiUser } = useAuth();

  if (isLoading) return (
    <nav className='bg-white px-2 py-2.5'>
      <div className='flex flex-row justify-center items-center'>
        <p className='text-sm text-gray-700 font-nunito-regular mr-2'>Buscando datos del usuario</p>
        <CgSearchLoading size='20px' color='#1f2937'></CgSearchLoading>
      </div>
    </nav>
  );
  if (error) return (
    <nav className='bg-white px-2 py-2.5'>
      <div className='flex flex-row justify-center items-center'>
        <p className='text-sm text-red-700 font-nunito-regular mr-2'>{error.message}</p>
        <RiErrorWarningFill size='20px' color='#1f2937'></RiErrorWarningFill>
      </div>
    </nav>
  );

  /*eslint-disable */

  useEffect(() => {
    if (user && !apiUser){
      handleLogin(user.email);
    }
    else if (!user) {
      logout();
    }
  }, []);

  /*eslint-enable */

  return (
    (user && apiUser ) ? (
      <nav className="bg-white py-2.5 drop-shadow-lg">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div style={{width: '13%', height: 'auto'}}>
            <Link href='/'><h1 className='mt-1.5 font-manguiera text-4xl text-cyan-q'>Quoter</h1></Link>
          </div>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-1 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              <li className='text-base font-nunito-regular text-gray-700'>
                <p className="block pr-2 pl-2" aria-current="page">Bienvenid@, {apiUser.name}</p>
              </li>
              <li className='text-base font-nunito-regular text-gray-700 hover:text-cyan-400'>
                <Link href='/admin' className="block py-1 pr-2 pl-2" aria-current="page">Administración</Link>
              </li>
              <li className='text-base font-nunito-regular text-gray-700 hover:text-cyan-400'>
                <Link href='/api/auth/logout' className="block py-1 pr-2 pl-2" aria-current="page">Cerrar sesión</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    ) : (
      <nav className="bg-white py-2.5 drop-shadow-lg">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div>
            <Link href='/'><h1 className='mt-1.5 font-manguiera text-4xl text-cyan-q'>Quoter</h1></Link>
          </div>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-1 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li className='text-base font-nunito-regular text-gray-700 hover:text-cyan-400'>
                <Link href='/api/auth/login' className="block py-1 pr-2 pl-2" aria-current="page">Iniciar sesión</Link>
              </li>
              <li className='text-base font-nunito-regular text-gray-700 hover:text-cyan-400'>
                <Link href='/api/auth/signup' className="block py-1 pr-2 pl-2" aria-current="page">Registrarse</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  );
}
