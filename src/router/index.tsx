import { Routes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
import Loading from '../components/Loading';

const [Login] = [() => import('../views/Login/index')].map((item) => {
  return loadable(item, {
    fallback: <Loading />,
  });
});

function RouterCom(): JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  );
}
export default RouterCom;
