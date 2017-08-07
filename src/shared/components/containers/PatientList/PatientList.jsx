import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import styles from './PatientList.css'

@connect((state) => ({
  patients: state.list,
  filters: state.filters,
  sortBy: state.sortBy
}))
export default class PatientList extends Component {
  static propTypes = {
    patients: PropTypes.array,
    filters: PropTypes.object,
    sortBy: PropTypes.string
  }
  getAge(dateString) {
    const today = new Date()
    const birthDate = new Date(dateString)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  genderFilter = (gender) => (patient) => {
    if (!gender) return true
    return patient.gender === gender
  }
  activityFilter = (level) => (patient) => {
    const activity = patient.intensity.moderate + (patient.intensity.vigorous * 2)
    if (level === 'below') {
      return activity < 150
    } else if (level === 'above') {
      return activity >= 150
    }
    return true
  }
  sortPatients(sortBy) {
    if (sortBy === 'age') {
      return (a, b) => this.getAge(a.birthDate) - this.getAge(b.birthDate)
    } else if (sortBy === 'height') {
      return (a, b) => a.heightCm - b.heightCm
    } else if (sortBy === 'weigth') {
      return (a, b) => a.weightKg - b.weightKg
    } else if (sortBy === 'bmi') {
      return (a, b) => a.bmi - b.bmi
    } else if (sortBy === 'activity') {
      return (a, b) =>
        (a.intensity.moderate + a.intensity.vigorous * 2) -
        (b.intensity.moderate + b.intensity.vigorous * 2)
    }
    return () => 0
  }
  renderRow = (patient) => {
    return (
      <tr key={patient.id}>
        <td className={styles['PatientList-td']}>{patient.name}</td>
        <td className={styles['PatientList-td--center']}>{patient.gender}</td>
        <td className={styles['PatientList-td--center']}>{this.getAge(patient.birthDate)}</td>
        <td className={styles['PatientList-td--center']}>{patient.heightCm}</td>
        <td className={styles['PatientList-td--center']}>{patient.weightKg}</td>
        <td className={styles['PatientList-td--center']}>{patient.bmi}</td>
        <td className={styles['PatientList-td--center']}>{patient.intensity.moderate}</td>
        <td className={styles['PatientList-td--center']}>{patient.intensity.vigorous}</td>
      </tr>
    )
  }
  render() {
    const { patients, filters, sortBy } = this.props
    const filteredList = patients
      .filter(this.genderFilter(filters.gender))
      .filter(this.activityFilter(filters.activity))
      .sort(this.sortPatients(sortBy))
    return (
      <table className={styles.PatientList}>
        <thead className={styles['PatientList-thead']}>
          <tr>
            <th className={styles['PatientList-th']} rowSpan="2">Name</th>
            <th className={styles['PatientList-th']} rowSpan="2">Gender</th>
            <th className={styles['PatientList-th']} rowSpan="2">Age</th>
            <th className={styles['PatientList-th']} rowSpan="2">Height (cm)</th>
            <th className={styles['PatientList-th']} rowSpan="2">Weight (kg)</th>
            <th className={styles['PatientList-th']} rowSpan="2">BMI</th>
            <th className={styles['PatientList-th']} colSpan="2">Intensity</th>
          </tr>
          <tr>
            <th className={styles['PatientList-th']}>Moderate</th>
            <th className={styles['PatientList-th']}>Vigorous</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map(this.renderRow)}
        </tbody>
      </table>
    )
  }
}
