import React from 'react'

import Icon from '@material-tailwind/react/Icon';

function Page404() {
  return (
    <div className="flex flex-col items-center">
      <Icon name="warning" size="12x12" />warning
      <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">404</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Page not found. Check the address or{' '}
        <a className="text-blue-600 hover:underline dark:text-blue-300" href="../index.html">
          go back
        </a>
        .
      </p>
    </div>
  )
}

export default Page404
