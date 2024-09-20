const Notification = ({ message, isSuccessful }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={isSuccessful === true ? 'added' : 'error'}>
        {message}
      </div>
    )
  }

  export default Notification