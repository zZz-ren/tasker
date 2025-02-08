import { useAppSelector } from "../../Store/store";
import { baseUrl } from "../../utils/api";

const Login = () => {
  const { error, user } = useAppSelector((state) => state.user);
  console.log("login", user?.name);

  const handleOAuth = () => {
    window.open(`${baseUrl}/auth/google`, "_self");
  };

  return (
    <div className="h-screen w-screen items-center flex flex-col">
      <div className="w-screen h-1/2">
        <div
          role="alert"
          className="alert w-full flex justify-center alert-error"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! {error}</span>
        </div>
      </div>
      <button className="btn   btn-accent" onClick={handleOAuth}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
