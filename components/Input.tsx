import React from 'react';
import {Path, UseFormRegister} from "react-hook-form";
import {IFormValues} from "@/app/login/page";

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  id: string;
  type: string;
  autoComplete: string;
  required: boolean;
}

const Input = ({label, id, type, autoComplete, required, register}: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-white">
        {id}
      </label>
      <div className="mt-2">
        <input
          type={type}
          autoComplete={autoComplete}
          {...register(label, {required: required})}
          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default Input;