import { useEffect, useState } from 'react';

export default function PopUp({functionDelete, functionHandle}) {
  return (
    <div className='z-30 bg-cyan-50 px-5 py-10 rounded-lg border-2 border-cyan-500 hover:border-dotted opacity-90'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-2xl text-gray-700 font-nunito-bold'>¿Estás seguro/a de que lo quieres eliminar?</h1>
        <div className='mt-8 mb-2 flex flex-row'>
          <button onClick={functionHandle} className='w-24 h-10 font-nunito-regular bg-gray-700 text-white hover:bg-cyan-800 rounded-lg'>No borrar</button>
          <button onClick={functionDelete} className='ml-4 w-24 h-10 font-nunito-regular bg-gray-500 text-white hover:bg-cyan-800 rounded-lg'>Confirmar</button>
        </div>
      </div>
    </div>
  );
}