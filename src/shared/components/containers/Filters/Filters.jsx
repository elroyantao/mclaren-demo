import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Filter from '../../common/Filter/Filter'
import Sort from '../../common/Sort/Sort'
import { changeFilter, changeSort } from '../../../actions/filterAction'
import styles from './Filters.css'

@connect((state) => ({
  sortBy: state.sortBy,
  genderFilter: state.filters.gender,
  activityFilter: state.filters.activity
}), { changeFilter, changeSort })
export default class Filters extends Component {
  static propTypes = {
    sortBy: PropTypes.string.isRequired,
    genderFilter: PropTypes.oneOf(['male', 'female']),
    activityFilter: PropTypes.oneOf(['above', 'below']),
    changeFilter: PropTypes.func,
    changeSort: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.genderOptions = ['male', 'female']
    this.activityOptions = ['above', 'below']
    this.sortOptions = ['activity', 'age', 'height', 'weigth', 'bmi']
  }

  render() {
    const { genderFilter, activityFilter, changeFilter, changeSort, sortBy } = this.props
    return (
      <div className={styles.Filters}>
        Select a filter
        <div className={styles['Filters-filter']}>
          <Filter
            name="gender"
            options={this.genderOptions}
            value={genderFilter}
            onChange={changeFilter}
          />
          <Filter
            name="activity"
            options={this.activityOptions}
            value={activityFilter}
            onChange={changeFilter}
          />
        </div>
        <div className={styles['Filters-sort']}>
          <Sort
            options={this.sortOptions}
            onChange={changeSort}
            value={sortBy}
          />
        </div>
      </div>
    )
  }
}
