import React, { Component } from 'react';
import config from '../config';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';
import CircleButton from '../CircleButton/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class AddFolder extends Component {
    static contextType = ApiContext;

    state = {
        folderName: ''
    };

    validateName() {
        const name = this.state.folderName;
        if (name.length === 0) {
            return 'Name is required';
        } else if (name.length < 5) {
            return 'Name must be at least 5 characters long';
        } else if (name.length >= 10) {
            throw new Error('ERROR!!!');
        }
    }

    handleFolderChange(e) {
        this.setState({ folderName: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { folderName } = this.state;
        console.log('Folder Name', folderName);
        const body = JSON.stringify({
            name: folderName
        });
        const opts = {
            body,
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        };
        fetch(`${config.API_ENDPOINT}/folders`, opts)
            .then(response => response.json())
            .then(responseJson => this.context.addFolder(responseJson));
        this.props.history.push('/');
    };

    render() {
        const nameError = this.validateName();
        return (
            <div>
                <div className='NotePageNav'>
                    <CircleButton
                        tag='button'
                        role='link'
                        onClick={() => this.props.history.goBack()}
                        className='NoteListNav__add-folder-button'
                    >
                        <FontAwesomeIcon icon='chevron-left' />
                        <br />
                        Back
                    </CircleButton>
                </div>
                <form className='newfolder' onSubmit={this.handleSubmit}>
                    <h2>New Folder</h2>
                    <div className='form-group'>
                        <label htmlFor='name'>Name: </label>
                        <input
                            onChange={e => this.handleFolderChange(e)}
                            type='text'
                            className='folderName'
                            name='folderName'
                            id='folderName'
                        />
                        <ValidationError message={nameError} />
                    </div>
                    <button
                        type='submit'
                        className='folderButton'
                        disabled={this.validateName()}
                    >
                        Save
                    </button>
                </form>
            </div>
        );
    }
}
