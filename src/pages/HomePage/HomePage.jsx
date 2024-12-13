import PageTitle from '../../components/PageTitle/PageTitle';
import DinoGame from 'react-chrome-dino';

export default function HomePage() {
  return (
    <div>
      <PageTitle>
        Welcome{' '}
        <span role="img" aria-label="Greeting icon">
          💁‍♀️
        </span>
      </PageTitle>
      <h3>
        On this site you can save and search all your contacts. Everything you
        need is just simple registration
      </h3>
      <p>
        This website will help you store and quickly find all your contacts.
        Just sign up and get access to a convenient tool for managing your
        contacts!
      </p>
      <h3>Play a game while you’re here!</h3>

      <DinoGame />
    </div>
  );
}
