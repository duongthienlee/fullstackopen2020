import React from 'react'
import PropTypes from 'prop-types'

const Part = ({ part: { name, exercises } }) => (
  <p>
    {name} {exercises}
  </p>
)

Part.propTypes = {
  part: PropTypes.shape({
    name: PropTypes.string.isRequired,
    exercises: PropTypes.number.isRequired,
  }),
}

export default Part
