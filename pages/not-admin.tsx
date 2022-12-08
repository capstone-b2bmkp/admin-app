import Link from 'next/link';
import Image from 'next/image';
import Escudo from './../public/png/Escudo Admin.png';
import Footer from '../components/Footer';

export default function NotAdmin() {
  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='my-4 text-2xl font-nunito-bold text-gray-700'>
          No eres administrador! Por favor ingresa con tu cuenta de administrador
        </h1>
        <Image src={Escudo} width='658px' height='666px' quality={100} alt='Escudo admin'></Image>
        <button className='mb-10 px-5 py-1 w-30 h-8 font-nunito-regular text-base bg-gray-700 rounded-lg text-white hover:bg-cyan-800'><Link href="/api/auth/logout">Cerrar sesión</Link></button>
      </div>
      <Footer></Footer>
    </div>
  );
}