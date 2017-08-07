import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Filter.css'

export default class Filters extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string
  }
  render() {
    const { options, onChange, name, value } = this.props
    return (
      <div className={styles.Filter}>
        {options.map((option) => {
          return (
            <button
              key={option}
              className={value === option ? styles['Filter-button--active'] : styles['Filter-button']}
              onClick={() => onChange(name, option)}
            >
              {option}
            </button>
          )
        })}
      </div>
    )
  }
}
