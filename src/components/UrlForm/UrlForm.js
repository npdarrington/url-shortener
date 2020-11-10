import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: '',
      error: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = () => {
    this.props.submitUrl({
      title: this.state.title,
      urlToShorten: this.state.urlToShorten
    });
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  validateInputs = (e) => {
    e.preventDefault();
    if (!this.state.title || !this.state.urlToShorten) {
      this.setState({ error: 'Both Title and Url to Shorten must be filled in.' });
    } else {
      this.handleSubmit();
      this.setState({ error: '' })
    }
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
        />

        <button onClick={e => this.validateInputs(e)}>
          Shorten Please!
        </button>
        {this.state.error && <h2>{this.state.error}</h2>}
      </form>
    )
  }
}

export default UrlForm;
