import React from 'react'

const Container = ({children}) => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-28 mx-auto max-w-screen-2xl">
      {children}
    </div>
  );
}

export default Container
