import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Sort.css'

export default class Sort extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string
  }
  render() {
    const { options, onChange, value } = this.props
    return (
      <div className={styles.Sort}>
        <select
          className={styles['Sort-select']}
          name="sort"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option disabled value="">select to sort</option>
          {options.map((option) => {
            return (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}
