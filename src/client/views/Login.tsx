import * as React from "react";
import { useHistory } from "react-router";
import { apiService, setAccessToken } from "../utils/apiService";

const Login: React.FC<ILoginProps> = ({ setIsAdmin }) => {
  const history: any = useHistory();
  const [feedback, setFeedback] = React.useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    let body = {
      email,
      password,
    };

    try {
      let result = await apiService("/auth/login", "POST", body);
      if (result) {
        setAccessToken(result.token, {
          userid: result.userid,
          role: result.role,
        });
        setIsAdmin(true);
        history.goBack();
      } else {
        // Display feedback
        setFeedback(
          "Unable to login. Email or password may or may not be incorrect."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="container">
      <h1>Login</h1>
      <p>{feedback}</p>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </main>
  );
};

interface ILoginProps {
  setIsAdmin: any;
}

export default Login;
