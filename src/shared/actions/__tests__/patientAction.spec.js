import fetchMock from 'fetch-mock'
import * as actions from '../patientAction'

const fetchAction = actions.fetchPatients()
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
})
