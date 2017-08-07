import fetchMock from 'fetch-mock'
import * as actions from '../patientAction'

const fetchAction = actions.fetchPatients()
const fetchPatientsActivity = actions.fetchPatientsActivity()
const dispatch = jest.fn()

describe('patient actions', () => {
  it('fetchPatientsRequest()', () => {
    expect(actions.fetchPatientsRequest()).toMatchSnapshot()
  })
  it('fetchPatientsFailure()', () => {
    expect(actions.fetchPatientsFailure()).toMatchSnapshot()
  })
  it('fetchPatientsResponse()', () => {
    expect(actions.fetchPatientsResponse([1, 2, 3])).toMatchSnapshot()
  })
  describe('fetchPatients() ', () => {
    // fetch.mockResponse(JSON.stringify({ access_token: '12345' }))
    afterEach(() => {
      fetchMock.restore()
      jest.clearAllMocks()
    })
    it('a successful fetch', () => {
      fetchMock.get('/api/patients', {
        data: [1, 2, 3]
      })
      expect.assertions(3)
      return fetchAction(dispatch).then(() => {
        expect(fetchMock.lastCall()).toEqual(['/api/patients', { method: 'GET' }])
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(dispatch.mock.calls).toMatchSnapshot()
      })
    })
    it('an unsuccessful fetch', () => {
      fetchMock.get('/api/patients', 402)
      expect.assertions(3)
      return fetchAction(dispatch).then(() => {
        expect(fetchMock.lastCall()).toEqual(['/api/patients', { method: 'GET' }])
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(dispatch.mock.calls).toMatchSnapshot()
      })
    })
  })

  it('fetchPatientsActivityRequest()', () => {
    expect(actions.fetchPatientsActivityRequest()).toMatchSnapshot()
  })
  it('fetchPatientsActivityFailure()', () => {
    expect(actions.fetchPatientsActivityFailure()).toMatchSnapshot()
  })
  it('fetchPatientsActivityResponse()', () => {
    expect(actions.fetchPatientsActivityResponse([1, 2, 3])).toMatchSnapshot()
  })
  describe('fetchPatientsActivity() ', () => {
    // fetch.mockResponse(JSON.stringify({ access_token: '12345' }))
    afterEach(() => {
      fetchMock.restore()
      jest.clearAllMocks()
    })
    it('a successful fetch', () => {
      fetchMock.get('/api/activity', {
        data: [1, 2, 3]
      })
      expect.assertions(3)
      return fetchPatientsActivity(dispatch).then(() => {
        expect(fetchMock.lastCall()).toEqual(['/api/activity', { method: 'GET' }])
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(dispatch.mock.calls).toMatchSnapshot()
      })
    })
    it('an unsuccessful fetch', () => {
      fetchMock.get('/api/activity', 402)
      expect.assertions(3)
      return fetchPatientsActivity(dispatch).then(() => {
        expect(fetchMock.lastCall()).toEqual(['/api/activity', { method: 'GET' }])
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(dispatch.mock.calls).toMatchSnapshot()
      })
    })
  })
  it('setList', () => {
    expect(actions.setList([1, 2, 3])).toMatchSnapshot()
  })
  it('generatePatientIntensity', () => {
    const patientActivity = [
      {
        activity: 'sleeping',
        minutes: 540
      },
      {
        activity: 'walking',
        minutes: 60
      },
      {
        activity: 'stationary-awake',
        minutes: 770
      },
      {
        activity: 'running',
        minutes: 45
      },
      {
        activity: 'swimming',
        minutes: 45
      }
    ]
    const activities = {
      sleeping: 'none',
      'stationary-awake': 'low',
      walking: 'moderate',
      cycling: 'moderate',
      swimming: 'vigorous',
      running: 'vigorous'
    }
    expect(actions.generatePatientIntensity(patientActivity, activities)).toEqual({
      moderate: 60,
      vigorous: 90
    })
  })
})
