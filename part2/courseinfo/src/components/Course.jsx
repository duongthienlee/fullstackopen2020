import React from 'react'
import PropTypes from 'prop-types'

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)

Course.propTypes = {
  course: PropTypes.object.isRequired,
}

export default Course

const Header = ({ course }) => {
  return <h2>{course.name}</h2>
}

const Total = ({ course: { parts } }) => {
  const total = parts.reduce((sum, { exercises }) => sum + exercises, 0)
  return <b>total of {total} exercises </b>
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course: { parts } }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}
