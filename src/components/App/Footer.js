import React, { Component } from 'react'
import {grey50, grey200, grey800} from 'material-ui/styles/colors'
import {FOOTER_HEIGHT} from '../../constants'

const footerStyle = {
  color: grey200,
  backgroundColor: grey800,
  boxSizing: 'border-box',
  display:'block',
  textAlign: 'center',
  position: 'absolute',
  bottom:'0',
  left:'0',
  right:'0',
  height: FOOTER_HEIGHT,
  width:'100%',
}

export default class Footer extends Component {
  render () {
    const ReactLink = (
      <a href='https://facebook.github.io/react/' style={{color: grey50}}>React</a>
    )
    const MaterialUILink = (
      <a href='https://github.com/callemall/material-ui' style={{color: grey50}}>Material UI</a>
    )
    const MobxLink = (
      <a href='https://github.com/mobxjs/mobx' style={{color: grey50}}>MobX</a>
    )
    const MexenizLink = (
      <a href='https://github.com/mexeniz' style={{color: grey50}}>Mexeniz</a>
    )
    const MeetiesLink = (
      <a href='https://meeties.me/' style={{color: grey50}}>Meeties</a>
    )
    //   <p>Get Mma's location and take photos with him :)</p>
    //   <p>Powered by {ReactLink} {MaterialUILink} {MobxLink}</p>
    //   <p>Created by {MexenizLink}</p>
    return (
      <div className='footer' style={footerStyle}>
        <p>Powered by {ReactLink} {MaterialUILink} {MobxLink} {MeetiesLink}</p>
      </div>
    )
  }
}
