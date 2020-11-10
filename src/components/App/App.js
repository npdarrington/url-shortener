import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			urls: [],
			error: ''
		};
	}

	componentDidMount() {
    getUrls()
      .then(urls => {
				if (urls !== 'error') {
					this.setState({ urls: urls.urls, error: '' });
				} else {
					this.setState({ error: 'We were not able to retrieve your shortened urls' });
				}
			});
  }
  
  submitUrl = ({ title, urlToShorten }) => {
    const urlObject = {
      title,
      long_url: urlToShorten
    }
    postUrl(urlObject)
      .then(data => {
        if (data !== 'error') {
          this.setState({ urls: [...this.state.urls, data], error: '' })
        } else {
          this.setState({ error: 'We were not able to save your shortened url' });
        }
      });
	}
	
	deleteUrl = (id) => {
		const filterLocalUrls = this.state.urls.filter(url => url.id !== id);
		deleteUrl(id)
			.then(data => {
				if (data !== 'error') {
					this.setState({ urls: filterLocalUrls, error: '' });
				} else {
					this.setState({ error: 'We were not able to delete your shortened url' });
				}
			});
	}

	render() {
		return (
			<main className='App'>
				<header>
					<h1>URL Shortener</h1>
					{this.state.error && <h2>{this.state.error}</h2>}
					<UrlForm submitUrl={this.submitUrl} />
				</header>

				<UrlContainer urls={this.state.urls} deleteUrl={this.deleteUrl} />
			</main>
		);
	}
}

export default App;
