import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			urls: [],
		};
	}

	componentDidMount() {
    this.getAllUrls();
  }

  getAllUrls = () => {
    getUrls()
      .then(urls => this.setState({ urls: urls.urls }));
  }
  
  submitUrl = ({ title, urlToShorten }) => {
    const urlObject = {
      title,
      long_url: urlToShorten
    }
    postUrl(urlObject)
      .then(data => {
        if (data !== 'error') {
          this.getAllUrls();
        } else {
          throw new Error('something went wrong');
        }
      });
  }

	render() {
		return (
			<main className='App'>
				<header>
					<h1>URL Shortener</h1>
					<UrlForm submitUrl={this.submitUrl} />
				</header>

				<UrlContainer urls={this.state.urls} />
			</main>
		);
	}
}

export default App;
