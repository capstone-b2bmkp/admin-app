import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {RiStarFill} from 'react-icons/ri';


export default function Comment() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const onClickHandler = () => {
    setComments((comments) => [...comments, comment]);
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };
  return (

    <div class='my-2 w-full rounded-lg'>
      {comments.map((text) => (
        <div key={text.id} className='my-4 w-full h-20 p-2 border-2 border-sky-900 text-sky-900 rounded'>
          <div className='text-left mb-2 flex justify-beetween'>
            <RiStarFill size='15px'></RiStarFill>
            <RiStarFill size='15px'></RiStarFill>
            <RiStarFill size='15px'></RiStarFill>
            <RiStarFill size='15px'></RiStarFill>
            <RiStarFill size='15px'></RiStarFill>
          </div>
          {text}
        </div>
      ))}

      <div className='mb-2'>
        <label htmlFor='comment' className='my-2 text-base text-blue-900'>Añade un comentario</label>
        <textarea
          value={comment}
          onChange={onChangeHandler}
          className='w-full h-20 p-2 text-blue-800 border-1 border-sky-900 rounded'
          name='comment'
          placeholder=''></textarea>
      </div>
      <div>
        <button onClick={onClickHandler} className='px-1 py-2 font-medium rounded text-sm w-20 border-2 border-blue-600 text-blue-100 bg-blue-600 hover:bg-sky-900 hover:text-slate-50 hover:border-sky-900 cursor-pointer'>
          Comentar
        </button>
        <button
          className='ml-4 px-1 py-2 font-medium rounded text-sm w-20 bg-blue-50 text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-slate-50 cursor-pointer'>
          Cancelar
        </button>
      </div>
    </div>
  );
}