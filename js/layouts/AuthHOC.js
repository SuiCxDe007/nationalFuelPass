import React from 'react'

const AuthHOC = (Children) => {
  return class extends React.Component {
    render() {
      var tokenObject = localStorage.getItem('loginToken')
      const { ...props } = this.props
      if (tokenObject == null) {
        props.history.push('/login')
      }
      return <Children {...props} />
    }
  }
}
export default AuthHOC
