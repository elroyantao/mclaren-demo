import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PatientList from '../PatientList/PatientList'
import Filters from '../Filters/Filters'

import { fetchPatients, fetchPatientsActivity, generatePatientList } from '../../../actions/patientAction'
import { fetchActiviyDef } from '../../../actions/activityAction'

import styles from './Main.css'

@connect((state) => ({
  isLoading: !!state.loading.isLoading
}), { fetchPatients, fetchActiviyDef, fetchPatientsActivity, generatePatientList })
export default class Main extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fetchPatients: PropTypes.func.isRequired,
    fetchPatientsActivity: PropTypes.func.isRequired,
    fetchActiviyDef: PropTypes.func.isRequired,
    generatePatientList: PropTypes.func.isRequired
  }
  componentWillMount() {
    const { fetchPatients, fetchActiviyDef, fetchPatientsActivity } = this.props
    fetchPatients()
    fetchActiviyDef()
    fetchPatientsActivity()
  }
  componentDidMount() {
    const { generatePatientList } = this.props
    setTimeout(generatePatientList, 2000)
  }
  render() {
    const { isLoading } = this.props
    return (
      <div className="Main">
        {isLoading
          ? <div> loading ... </div>
          : <div>
            <Filters />
            <PatientList />
          </div>
        }
      </div>
    )
  }
}
