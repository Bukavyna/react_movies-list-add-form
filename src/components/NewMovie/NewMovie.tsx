import React, { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  description: string;
};

type Props = {
  onAddMovie: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAddMovie }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isFormValid = [title, imageUrl, imdbUrl, imdbId].every(field =>
    field.trim(),
  );

  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?://)?)(?:[-;:&=+$,w]+@)?[A-Za-z0-9.-]+|' +
      '(?:www.|[-;:&=+$,w]+@)[A-Za-z0-9.-]+)' +
      '(/[+~%/.w-_]*)???[-+=&;%@,.w_]*#?[,.!/\\w]*)?$',
  );

  const validateUrl = (value: string) => pattern.test(value.trim());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title: title.trim(),
      imgUrl: imageUrl.trim(),
      imdb: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAddMovie(newMovie);

    setTitle('');
    setImdbId('');
    setImageUrl('');
    setImdbUrl('');
    setDescription('');

    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageUrl}
        onChange={setImageUrl}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
