import React from 'react'
import PropTypes from 'prop-types'
import Part from 'components/Part'

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </div>
)

Content.propTypes = {
  parts: PropTypes.array.isRequired,
}

export default Content
