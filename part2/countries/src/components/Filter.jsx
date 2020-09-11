import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({ keyword, setNewKeyword }) => {
  return (
    <div>
      find countries{' '}
      <input value={keyword} onChange={(e) => setNewKeyword(e.target.value)} />
    </div>
  )
}

Filter.propTypes = {
  keyword: PropTypes.string.isRequired,
  setNewKeyword: PropTypes.func.isRequired,
}

export default Filter
