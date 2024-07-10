import Image from "next/image";
import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }) => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 w-full gap-4 bg-white rounded-md shadow-md p-6">
          <div className="text-lg font-bold mb-6 border-b">
            <h3 className="">Property Images</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 justify-around items-center">
            <Gallery>
              {images.map((image, index) => (
                <div className="w-full h-auto max-h-[300px] overflow-hidden rounded-md" key={index}>
                <Item
                  original={image}
                  thumbnail={image}
                  key={index}
                  width="1024"
                  height="768"
                  objectFit="contain"
                >
                  {({ ref, open }) => (
                    <Image
                      key={index}
                      src={image}
                      ref={ref}
                      onClick={open}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="rounded-md shadow-md w-full max-h-fit object-contain cursor-pointer duration-300 ease-in-out "
                      priority={true}
                    />
                  )}
                </Item></div>
              ))}
            </Gallery>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyImages;
