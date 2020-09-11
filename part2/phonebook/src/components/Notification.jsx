import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ msg }) => {
  const { type = null } = msg
  if (!type) {
    return null
  }

  return <div className={`noti ${type}`}>{msg.text}</div>
}

Notification.propTypes = {
  msg: PropTypes.object.isRequired,
}

export default Notification
