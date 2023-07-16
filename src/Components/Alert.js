import React from 'react'

const Alert = (props) => {
  const capitalize = (word)=>{
    var lower = word.toLowerCase()
    if(lower ==='danger'){
     lower='Error'
    }
    return lower.charAt(0).toUpperCase() + lower.slice(1) 
   
  }
  
  
  return (
    <div style= {{height: '50px'}}> {props.alert && 
      <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
  
</div>}
    </div>
  )
}

export default Alert
