import Image from "next/image";

const PropertyImages = ({ images }) => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 w-full gap-4 bg-white rounded-lg shadow-md p-6">
          <div className="">
            <h3 className="text-lg font-bold mb-6">Property Images</h3>
          </div>
          <div className="grid grid-cols-3 gap-2 justify-around items-center">
              {images.map((image, index) => (
                  <Image
                  key={index}
                  src={image}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="rounded-md shadow-md m-1 w-auto h-auto"
                  priority={true}
                />
                
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyImages;
