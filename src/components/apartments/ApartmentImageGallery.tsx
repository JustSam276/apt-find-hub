
import { useState } from 'react';

interface ApartmentImageGalleryProps {
  images: string[];
  title: string;
}

const ApartmentImageGallery = ({ images, title }: ApartmentImageGalleryProps) => {
  const [activeImage, setActiveImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main large image */}
      <div className="relative overflow-hidden rounded-lg h-72 md:h-96">
        <img
          src={images[activeImage]}
          alt={`${title} - Image ${activeImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                activeImage === index ? 'border-realty-primary' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApartmentImageGallery;
