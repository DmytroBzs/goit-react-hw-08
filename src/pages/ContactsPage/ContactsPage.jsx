import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import PageTitle from '../../components/PageTitle/PageTitle';
import SearchBox from '../../components/SearchBox/SearchBox';

const ContactsPage = () => {
  return (
    <div>
      <PageTitle>Your contacts</PageTitle>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
