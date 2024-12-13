import { Toaster } from 'react-hot-toast';
import AppBar from '../AppBar/AppBar';

const Layout = ({ children }) => {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
      <AppBar />
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Layout;
