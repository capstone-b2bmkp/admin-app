import Image from 'next/image';
import { useState, useEffect } from 'react';
import gif from '../public/gif/Cargando.gif';

export default function Loading() {
  return (
    <div className="my-8 flex flex-col justify-center items-center">
      <div>
        <Image alt='gif' height="405px" width="720px" src={gif} quality="100"></Image>
      </div>
      <h1 className="text-blue-900 font-semibold text-4xl">Buscando...</h1>
    </div>
  );}