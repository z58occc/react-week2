import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/App.css";

function Home() {
  const api = import.meta.env.VITE_APP_API_BASE;
  const path = import.meta.env.VITE_APP_API_PATH;

  // 請自行替換 API_PATH

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (target) => {
    const { id, value } = target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/v2/admin/signin`, formData);
      // 登入

      const { token, expired } = res.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;

      navigate("/productList");
    } catch (error) {
      alert(`${error.response.data.message} 請再試一次`);
    }
  }

  return (
    <>
      <div className="container ">
        <div className="row justify-content-center">
          <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>
          <div className="col-8">
            <form id="form" className="form-signin" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  name="username"
                  type="email"
                  className="form-control"
                  id="username"
                  placeholder="name@example.com"
                  value={formData.username}
                  onChange={(e) => handleInputChange(e.target)}
                  required
                  autoFocus
                />
                <label htmlFor="username">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => {
                    handleInputChange(e.target);
                  }}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <button
                className="btn btn-lg btn-primary w-100 mt-3"
                type="submit"
              >
                登入
              </button>
            </form>
          </div>
        </div>
        <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
      </div>
    </>
  );
}

export default Home;
