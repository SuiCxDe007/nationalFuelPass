import React from 'react'

import HeaderNew from '../components/headernew/HeaderNew'
import Footer from '../components/footer/Footer'
import history from '../_helpers/history'

const DefaultLayout = (Children: any) => {
  return class extends React.Component {
    constructor(props: any) {
      super(props)
      this.state = {}
    }

    render() {
      var tokenObject = localStorage.getItem('loginToken')
      const { ...props } = this.props
      if (!!tokenObject) {
        history.push('/dashboard')
      }
      return (
        <div className='main-layout'>
          <HeaderNew />
          <div className='content-layout'>
            <Children {...props} />
          </div>
          <Footer />
        </div>
      )
    }
  }
}

export default DefaultLayout
