import React from 'react'

import HeaderNew from '../components/headernew/HeaderNew'
import Footer from '../components/footer/Footer'

const AuthLayout = (Children: any) => {
  return class extends React.Component {
    constructor(props: any) {
      super(props)
      this.state = {}
    }

    render() {
      const { ...props } = this.props
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

export default AuthLayout
