import React from 'react';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-6">There seems to be an error on this page.</p>
      <img src="path/to/your/error-image.jpg" alt="Error image" className="w-48 h-48 mb-4" />
      {/* You can also use an emoji instead of an image */}
      {/* <p className="text-4xl">😭</p> */}
      <button className="bg-white text-red-500 px-4 py-2 rounded-md hover:bg-red-100">Try Again</button>
    </div>
  );
};

export default Error;