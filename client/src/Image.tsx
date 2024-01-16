import { useEffect, useState } from 'react';

const Image = ({ image }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = function () {
      setImageSrc(reader.result);
    };
  }, [image]);
  return <img src={imageSrc} className="max-w-full h-auto" alt="logo" />;
};

export default Image;
