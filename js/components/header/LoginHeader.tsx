import TranslateMessage from '../translateManager/TranslateMessage'

const LoginHeader = () => {
  return (
    <>
      <h1>
        <TranslateMessage translateKey={'login'} />
      </h1>
      <h2>
        <TranslateMessage translateKey={'dont_have_an_account'} />
        <a href='/register'>
          {' '}
          <TranslateMessage translateKey={'register_here'} />
        </a>
      </h2>
    </>
  )
}
export default LoginHeader
