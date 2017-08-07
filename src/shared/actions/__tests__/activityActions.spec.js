import fetchMock from 'fetch-mock'
import * as actions from '../activityAction'

const fetchAction = actions.fetchActiviyDef()
const dispatch = jest.fn()

describe('activity actions', () => {
  it('fetchActiviyDefRequest()', () => {
    expect(actions.fetchActiviyDefRequest()).toMatchSnapshot()
  })
  it('fetchActiviyDefFailure()', () => {
    expect(actions.fetchActiviyDefFailure()).toMatchSnapshot()
  })
  it('fetchActiviyDefResponse()', () => {
    expect(actions.fetchActiviyDefResponse([1, 2, 3])).toMatchSnapshot()
  })
  describe('fetchActiviyDef() ', () => {
    // fetch.mockResponse(JSON.stringify({ access_token: '12345' }))
    afterEach(() => {
      fetchMock.restore()
      jest.clearAllMocks()
    })
    it('a successful fetch', () => {
      fetchMock.get('/api/activity-definition', {
        data: [1, 2, 3]
      })
      expect.assertions(3)
      return fetchAction(dispatch).then(() => {
        expect(fetchMock.lastCall()).toEqual(['/api/activity-definition', { method: 'GET' }])
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(dispatch.mock.calls).toMatchSnapshot()
      })
    })
    it('an unsuccessful fetch', () => {
      fetchMock.get('/api/activity-definition', 402)
      expect.assertions(3)
      return fetchAction(dispatch).then(() => {
        expect(fetchMock.lastCall()).toEqual(['/api/activity-definition', { method: 'GET' }])
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(dispatch.mock.calls).toMatchSnapshot()
      })
    })
  })
})
