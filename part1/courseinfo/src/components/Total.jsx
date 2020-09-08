import React from 'react'
import PropTypes from 'prop-types'

const Total = ({ parts }) => {
  const total = parts.reduce((sum, { exercises }) => sum + exercises, 0)

  return <p>Number of exercises {total}</p>
}

Total.propTypes = {
  parts: PropTypes.array.isRequired,
}

export default Total
