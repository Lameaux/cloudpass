import React from 'react'
import App, { Container, AppProps } from 'next/app'
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';
import PageLayout from '../components/PageLayout'

import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { initializeStore } from '../domain/store';

interface Props {
  store: Store
}

class MyApp extends App<Props & AppProps> {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
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
      </Provider>
    )
  }
}

export default withRedux(initializeStore)(MyApp);
