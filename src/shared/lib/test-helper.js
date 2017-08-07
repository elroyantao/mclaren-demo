import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const renderComponentHelper = (Component, mountOptions = {}) => {
  return ({ children, ...props } = {}) => {
    const wrapper = shallow(
      <Component {...props}>{ children }</Component>,
      mountOptions
    )

    const component = {
      wrapper,
      instance: wrapper.instance(),
      getTree: () => toJson(wrapper),
      getTreeFor: (selectedWrapper) => toJson(selectedWrapper)
    }

    return component
  }
}

export default renderComponentHelper
