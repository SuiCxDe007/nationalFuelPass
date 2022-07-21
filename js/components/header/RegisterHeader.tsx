import TranslateMessage from '../translateManager/TranslateMessage'

const RegisterHeader = (props: any) => {
  return (
    <>
      <h1>
        <TranslateMessage translateKey={'registration'} />
      </h1>
      <h2>
        <TranslateMessage translateKey={'already_have_an_account'} /> {` `}
        <a href='/login'>
          <TranslateMessage translateKey={'login_here'} />
        </a>
      </h2>

      {/* Progress bar  */}
      <div className='progress-bar'>
        <div
          className={
            props.personal_details ? 'progress-item active' : 'progress-item'
          }
        >
          <TranslateMessage translateKey={'personal_details'} />
        </div>
        <div
          className={
            props.vehicle_details ? 'progress-item active' : 'progress-item'
          }
        >
          <TranslateMessage translateKey={'vehicle_details'} />
        </div>
      </div>
    </>
  )
}
export default RegisterHeader
