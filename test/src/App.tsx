import {Routes, Route} from 'react-router-dom'
import { AppProvider } from './component/mycontext';
import Layout from './component/Layout';
import Logon from './component/Logon';
import AlbumList from './component/AlbumList';
import PhotoList from './component/PhotoList';

function App() {
  return (
    <div>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout/>} >
              <Route index element={<Logon/>} ></Route>
              <Route path="/album/list" element={<AlbumList/>} ></Route>
              <Route path="/photo/list" element={<PhotoList/>} ></Route>
          </Route>
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
