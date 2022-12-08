import logo from './../public/png/Logo Pinflag.png';
import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { SiLinkedin } from 'react-icons/si';

export default function Footer() {

  return (
    <>
      <div className='py-5 md:px-5 px-1 bg-slate-900 flex flex-col justify-center items-center'>
        <div className='grid grid-rows-1 grid-cols-4 gap-x-10'>
          <div className='flex flex-col justify-center items-center'>
            <Image src={logo} width='100px' height='75px' quality={100} alt='Logo'></Image>
            <h3 className='mt-1 text-slate-50 font-nunito-regular justify-center content-center'>2021 PinFlag Chile ®</h3>
          </div>

          <div className='justify-start'>
            <h2 className='sm:text-xl font-nunito-sans text-gray-500 my-2'>Compradores</h2>
            <a><h3 className='font-nunito-regular text-sm text-slate-50 my-2 hover:text-cyan-400'>Ingresar</h3></a>
            <a><h3 className='font-nunito-regular text-sm text-slate-50 my-2 hover:text-cyan-400'>Mis compras</h3></a>
          </div>

          <div className='justify-start'>
            <h2 className='sm:text-xl font-nunito-sans text-gray-500 my-2'>Vendedores</h2>
            <a><h3 className='font-nunito-regular text-sm text-slate-50 my-2 hover:text-cyan-400'>Ingresar</h3></a>
            <a><h3 className='font-nunito-regular text-sm text-slate-50 my-2 hover:text-cyan-400'>Mis ventas</h3></a>
          </div>

          <div className='justify-start'>
            <h2 className='sm:text-xl font-nunito-sans text-gray-500 my-2'>Centro de ayuda</h2>
            <a><h3 className='font-nunito-regular text-sm text-slate-50 my-2 hover:text-cyan-400'>¿Qué es Quoter?</h3></a>
            <a><h3 className='font-nunito-regular text-sm text-slate-50 my-2 hover:text-cyan-400'>Preguntas frecuentes</h3></a>
            <a><h3 className='font-nunito-regular text-sm text-slate-50 my-2 hover:text-cyan-400'>Términos y condiciones</h3></a>
            <div className='mt-1 flex justify-between'>
              <a className="cursor-pointer">
                <FaFacebook className='fill-white hover:fill-cyan-400' size="25px" ></FaFacebook>
              </a>

              <a className="cursor-pointer">
                <FaYoutube className='fill-white hover:fill-cyan-400' size="25px" ></FaYoutube>
              </a>

              <a className="cursor-pointer">
                <AiFillInstagram className='fill-white hover:fill-cyan-400' size="25px" ></AiFillInstagram>
              </a>

              <a className="cursor-pointer">
                <SiLinkedin className='fill-white hover:fill-cyan-400' size="25px" ></SiLinkedin>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}