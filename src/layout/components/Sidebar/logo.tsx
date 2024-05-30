import { Link } from 'react-router-dom';

function LogoContainer() {
  return (
    <div className="logoContainer flex-center">
      <Link to="/">
        <span className="title">React Admin</span>
      </Link>
    </div>
  );
}

export default LogoContainer;
