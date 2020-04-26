import React, { Component } from 'react';
import ValidationError from '../ValidationError';
import config from '../config';
import ApiContext from '../ApiContext';

export default class AddNote extends Component {
    static contextType = ApiContext;

    static defaultProps = { folders: [] };

    constructor(props) {
        super(props);
        this.state = {
            noteName: '',
            noteContent: '',
            folderId: 'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1',
        };
    }

    handleNoteName(e) {
        this.setState({
            noteName: e.target.value,
        });
    }

    handleNoteContent(e) {
        this.setState({
            noteContent: e.target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { noteName, noteContent, folderId } = this.state;
        const body = JSON.stringify({
            name: noteName,
            content: noteContent,
            folderId,
        });
        const opts = {
            body,
            method: 'POST',
            headers: { 'content-type': 'application/json' },
        };
        fetch(`${config.API_ENDPOINT}/notes`, opts)
            .then((response) => response.json())
            .then((responseJson) => this.context.addNote(responseJson));
        this.props.history.push('/');
    };

    idChange = (folderId) => {
        console.log('What event is this?', folderId);
        this.setState({ folderId });
    };

    validateName() {
        const name = this.state.noteName;
        if (name.length === 0) {
            return 'Name is required';
        } else if (name.length < 5) {
            return 'Name must be at least 5 characters long';
        }
    }

    validateContent() {
        const content = this.state.noteContent;
        if (content.length === 0) {
            return 'Content is required';
        } else if (content.length < 20) {
            return 'Minimum is 20 characters.';
        }
    }

    validateFolder() {
        const folderId = this.state.folderId;
        if (folderId === null) {
            return 'Folder selection required';
        }
    }

    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent();

        return (
            <form className='newnote' onSubmit={this.handleSubmit}>
                <h2>New Note</h2>
                <div className='form-group'>
                    <label htmlFor='noteName'>Name: </label>
                    <input
                        onChange={(e) => this.handleNoteName(e)}
                        type='text'
                        className='noteName'
                        name='noteName'
                        id='noteName'
                    />
                    <ValidationError message={nameError} />
                    <br />
                    <label htmlFor='noteContent'>Content: </label>
                    <input
                        onChange={(e) => this.handleNoteContent(e)}
                        type='noteContent'
                        className='noteContent'
                        name='noteContent'
                        id='noteContent'
                    />
                    <ValidationError message={contentError} />
                    <br />
                    <select
                        id='note-folder-select'
                        name='folder'
                        value={this.state.folderId}
                        onChange={(event) => {
                            this.idChange(event.target.value);
                        }}
                    >
                        {this.context.folders.map((folder) => (
                            <option key={folder.name} value={folder.id}>
                                {folder.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button
                        type='submit'
                        className='noteButton'
                        disabled={
                            this.validateName() ||
                            this.validateContent() ||
                            this.validateFolder()
                        }
                    >
                        Save
                    </button>
                </div>
            </form>
        );
    }
}
