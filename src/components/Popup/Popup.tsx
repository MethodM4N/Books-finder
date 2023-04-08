import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import './popup.scss';
import { observer } from 'mobx-react-lite';
import booksSlice from '../../store/booksSlice';

type TFormValues = {
  apiKey: string;
};

type TChildrenProp = {
  isOpen: boolean;
  onClose: () => void;
};

const Popup: React.FC<TChildrenProp> = observer(({ isOpen, onClose }) => {
  const {
    register,
    getValues,
    formState: { errors },
    reset,
    setValue,
    setFocus,
  } = useForm<TFormValues>({
    mode: 'onChange',
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { apiKey } = getValues();
    const json = JSON.stringify(apiKey);
    localStorage.setItem('apiKey', json);
    booksSlice.setApiKey(apiKey);
    reset();
    onClose();
  }

  useEffect(() => {
    setFocus('apiKey');
  }, [isOpen]);

  useEffect(() => {
    setValue('apiKey', booksSlice.apiKey);
  }, [booksSlice.apiKey]);

  return (
    <div
      className={`popup ${isOpen ? 'popup_open' : ''}`}
      onClick={() => {
        onClose();
      }}>
      <div
        className="popup__container"
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className="popup__flex">
          <h2 className="popup__title">Google Books Api Key</h2>
          <button className="popup__close-button" type="button" onClick={onClose}>
            ×
          </button>
        </div>
        <form className="popup__form" onSubmit={(e) => onSubmit(e)}>
          <div className="popup__bottom-container">
            <p>При необходимости можете воспользоваться личным ключом.</p>
            <span>Образец ключа: AIzaSyCAA-skye0CJ824BfyN1M7NdlVJTvOdmm0</span>
            <br></br>
            <p>
              Для того чтобы воспользоваться приложением без ключа, оставьте пустую строку и нажмите
              сохранить
            </p>
            <input
              type="text"
              {...register('apiKey', {
                maxLength: { value: 40, message: 'Максимум 40 символов' },
              })}></input>
            <br></br>
            <label className={`${errors ? 'popup__error_visible' : ''}`}>
              {errors?.apiKey?.message}
            </label>
          </div>
          <button className="popup__save-button" type="submit" aria-label="Сохранить">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
});

export default Popup;
