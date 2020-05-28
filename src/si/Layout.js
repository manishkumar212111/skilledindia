'use strict';

import React from 'react';
import MobiHeader ,{ DesktopHeader} from './components/widgets/Header';
import  Footer ,{ MobiFooter} from './components/widgets/Footer';
import detect from './utils/detect'
export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
          {detect.isMobile() ?  <MobiHeader /> : <DesktopHeader />}
          <div className="app-content">{this.props.children}</div>
          {detect.isMobile() ? <MobiFooter currentRoutes={this.props.location.pathname} /> : <Footer />}
      </div>
    );
  }
}
