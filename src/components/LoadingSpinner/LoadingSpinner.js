import React from 'react'
import { PulseLoader } from 'react-spinners'

import './_loadingspinner.scss'

const LoadingSpinner = React.memo(function Loadingspinner(props) {
  return (
    <div key={0} className="loading-spinner">
      <PulseLoader
        sizeUnit={props.sizeUnit}
        size={props.size}
        color={props.color}
        loading={props.loading}
      />
    </div>
  )
})

export default LoadingSpinner
