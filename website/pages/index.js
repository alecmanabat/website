import Link from 'next/link'
import React from 'react';
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline';
const https = require("https");

setInterval(function() {
    https.get("https://alec-website.herokuapp.com");
}, 300000);
//

const linkStyle = {
  marginLeft: 15
}

const Index = () => (
  <div>
    <Head>
      <title>Homepage</title>
      <meta name="viewport"
            content="user-scalable=0, initial-scale=1, minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
    </Head>
      <React.Fragment>
        <CssBaseline />
        {
          <div>
            <Link href="/lights">
                <a style={linkStyle}>Light Controls</a>
                </Link>
            <p>Hello</p>
            <img src="/static/bug.jpg" alt=">:[" height="300" width="350"/>
          </div>
        }
      </React.Fragment>
  </div>
)

export default Index
