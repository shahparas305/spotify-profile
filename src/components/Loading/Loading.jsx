import React from 'react'
import './Loading.css'

function Loading() {
  return (
    <div className='container__loading'>
      <div class="bars dance">
          <div class="bar one"></div>
          <div class="bar two"></div>
          <div class="bar three"></div>
          <div class="bar four"></div>
          <div class="bar five"></div>
      </div>
    </div>
  )
}

export default Loading