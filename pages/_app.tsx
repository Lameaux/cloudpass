import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';
import PageLayout from '../components/PageLayout'

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <title>My CloudPass Vault</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </ThemeProvider>
      </Container>
    )
  }
}

export default MyApp;
